#!/usr/bin/env python3
"""Parsea docs/preguntas-respuestas.md y genera src/app/data/preguntas-data.ts.

El documento entero entra en la slide: las preguntas con su cuerpo completo
(párrafos, tablas, código, listas y notas), los bloques del glosario término por
término, las introducciones de cada sección y las fuentes citadas. El script
verifica la cobertura al final: si alguna línea del markdown no acabó dentro de un
elemento, lo dice.

Uso: python3 scripts/gen-preguntas.py
"""
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MD = ROOT / "docs" / "preguntas-respuestas.md"
OUT = ROOT / "src" / "app" / "data" / "preguntas-data.ts"

# ---------------------------------------------------------------- secciones

SECCIONES = [
    ("doc", "El documento", "#8c8171"),
    ("s1", "Generales", "#3f6fd6"),
    ("s2", "Base de datos", "#0f8a94"),
    ("s3", "Arquitectura", "#7a3fa8"),
    ("s4", "Módulos", "#2f8f4e"),
    ("s5", "Incómodas", "#c0392b"),
    ("s6", "Glosario", "#4a6b8a"),
    ("fuentes", "Fuentes", "#6b6153"),
]
LABEL_SEC = dict((i, l) for i, l, _ in SECCIONES)

# ---------------------------------------------------------------- resaltado

KW_SQL = (
    "CREATE|OR|REPLACE|TABLE|VIEW|INDEX|UNIQUE|TRIGGER|FUNCTION|SCHEMA|EXTENSION|TYPE|ENUM|"
    "POLICY|ALTER|ADD|DROP|ONLY|RETURNS|LANGUAGE|AS|BEGIN|END|DECLARE|IF|THEN|ELSE|LOOP|"
    "RAISE|EXCEPTION|RETURN|SELECT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|FROM|WHERE|JOIN|LEFT|"
    "RIGHT|INNER|ON|AND|NOT|NULL|IS|IN|EXISTS|ORDER|BY|GROUP|LIMIT|DISTINCT|CASE|WHEN|"
    "CONSTRAINT|PRIMARY|KEY|FOREIGN|REFERENCES|CASCADE|RESTRICT|DEFAULT|CHECK|EXCLUDE|USING|"
    "ENABLE|ROW|LEVEL|SECURITY|DEFINER|INVOKER|FOR|TO|WITH|GENERATED|ALWAYS|STORED|BEFORE|"
    "AFTER|EACH|EXECUTE|DO|CONFLICT|RETURNING|COALESCE|TRUE|FALSE|STABLE|VOLATILE|IMMUTABLE|"
    "ASC|DESC|GRANT|REVOKE|OF|CONCURRENTLY|COMMENT"
)
TIPOS_SQL = (
    "uuid|text|jsonb|json|boolean|integer|bigint|smallint|numeric|date|timestamptz|timestamp|"
    "time|zone|bytea|varchar|int4range|trigger|void|record|serial|gist|btree|sql|plpgsql"
)
RE_SQL = re.compile(
    r"(--[^\n]*)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|\b(%s)\b|\b(%s)\b" % (KW_SQL, TIPOS_SQL),
    re.IGNORECASE,
)

KW_CS = (
    "public|private|protected|internal|static|readonly|const|class|record|struct|interface|"
    "enum|namespace|using|var|new|return|await|async|if|else|foreach|for|while|throw|try|"
    "catch|finally|switch|case|null|true|false|this|base|override|virtual|sealed|partial|get|"
    "set|init|string|int|long|bool|decimal|double|void|Task|params"
)
RE_CS = re.compile(
    r"(//[^\n]*)|(\"(?:[^\"\\]|\\.)*\")|(\b\d+(?:\.\d+)?\b)|\b(%s)\b" % KW_CS
)
RE_SH = re.compile(r"(#[^\n]*)|('[^']*'|\"[^\"]*\")|\b(pnpm|dotnet|npm|docker|git|cd|exec)\b")


def tokens(texto, lang):
    """Trocea un bloque de código para colorearlo. Las clases son las mismas
    que usa la slide del catálogo (kw, tip, str, num, com)."""
    if lang == "sql":
        pares = ((RE_SQL, ["com", "str", "num", "kw", "tip"]),)
    elif lang == "csharp":
        pares = ((RE_CS, ["com", "str", "num", "kw"]),)
    elif lang == "bash":
        pares = ((RE_SH, ["com", "str", "kw"]),)
    else:
        return [{"t": texto, "c": ""}]
    patron, clases = pares[0]
    salida = []
    ultimo = 0
    for m in patron.finditer(texto):
        if m.start() > ultimo:
            salida.append({"t": texto[ultimo:m.start()], "c": ""})
        clase = ""
        for i, c in enumerate(clases, start=1):
            if m.group(i):
                clase = c
                break
        salida.append({"t": m.group(0), "c": clase})
        ultimo = m.end()
    if ultimo < len(texto):
        salida.append({"t": texto[ultimo:], "c": ""})
    return salida


# ---------------------------------------------------------------- inline

RE_CODE = re.compile(r"`([^`]+)`")
RE_MARCA = re.compile(r"\*\*(.+?)\*\*|\*([^*]+?)\*|\[([^\]]+)\]\(([^)]+)\)", re.DOTALL)
SEP = "\x00"


def ancla_a_ref(url):
    """Traduce el ancla de un enlace interno al identificador del elemento."""
    u = url.lstrip("#")
    m = re.match(r"^p(\d+)", u)
    if m:
        return "p" + m.group(1)
    m = re.match(r"^(\d+)-", u)
    if m:
        d = m.group(1)
        return ("s" + d + "-intro") if len(d) == 1 else "sub" + d
    return ""


def inline(texto):
    """Trocea una frase en marcas de negrita, cursiva, código y referencias."""
    codigos = []

    def enmascarar(m):
        codigos.append(m.group(1))
        return "%s%d%s" % (SEP, len(codigos) - 1, SEP)

    plano = RE_CODE.sub(enmascarar, texto)
    salida = []
    _andar(plano, salida, codigos, False, False, "")
    # une trozos contiguos con las mismas marcas
    unido = []
    for t in salida:
        if not t["t"]:
            continue
        if unido and all(unido[-1].get(k) == t.get(k) for k in ("b", "i", "c", "r")):
            unido[-1]["t"] += t["t"]
        else:
            unido.append(t)
    return unido


def _andar(texto, salida, codigos, b, i, r):
    pos = 0
    for m in RE_MARCA.finditer(texto):
        if m.start() < pos:
            continue
        _llano(texto[pos:m.start()], salida, codigos, b, i, r)
        if m.group(1) is not None:
            _andar(m.group(1), salida, codigos, True, i, r)
        elif m.group(2) is not None:
            _andar(m.group(2), salida, codigos, b, True, r)
        else:
            _andar(m.group(3), salida, codigos, b, i, ancla_a_ref(m.group(4)) or r)
        pos = m.end()
    _llano(texto[pos:], salida, codigos, b, i, r)


def _llano(texto, salida, codigos, b, i, r):
    """Vuelca texto sin marcas, restituyendo los trozos de código enmascarados."""
    for j, parte in enumerate(re.split(SEP + r"(\d+)" + SEP, texto)):
        if not parte:
            continue
        if j % 2 == 1:
            t = {"t": codigos[int(parte)], "c": 1}
        else:
            t = {"t": parte.replace("\n", " ")}
        if b:
            t["b"] = 1
        if i:
            t["i"] = 1
        if r:
            t["r"] = r
        salida.append(t)


def texto_plano(trozos):
    return "".join(t["t"] for t in trozos)


def slug(texto):
    """Identificador estable para un término del glosario."""
    base = unicodedata.normalize("NFD", texto)
    base = "".join(c for c in base if unicodedata.category(c) != "Mn").lower()
    base = re.sub(r"[^a-z0-9]+", "-", base).strip("-")
    return base


def texto_cuerpo(bloques):
    """Todo el texto de un cuerpo, para el índice de búsqueda a fondo."""
    trozos = []
    for b in bloques:
        if b["k"] == "p":
            trozos.append(b.get("rot", ""))
            trozos.append(texto_plano(b["t"]))
        elif b["k"] == "code":
            trozos.append("".join(t["t"] for t in b["tk"]))
        elif b["k"] == "tabla":
            for celda in b["cab"]:
                trozos.append(texto_plano(celda))
            for fila in b["filas"]:
                for celda in fila:
                    trozos.append(texto_plano(celda))
        elif b["k"] == "lista":
            for it in b["it"]:
                trozos.append(texto_plano(it["t"]))
        elif b["k"] == "cita":
            trozos.append(texto_cuerpo(b["b"]))
    return " ".join(t for t in trozos if t)


# ---------------------------------------------------------------- bloques

RE_ITEM = re.compile(r"^(?:\d+\.|[-*]) +")
RE_SUBITEM = re.compile(r"^\s{2,}(?:\d+\.|[-*]) +")
ROTULOS = re.compile(r"^\*\*([^*]{2,70}\.)\*\*(?:\s+(.+))?$", re.DOTALL)


def parse_bloques(cuerpo):
    """cuerpo: lista de líneas ya sin la marca de cita. Devuelve los bloques."""
    bl = []
    i, n = 0, len(cuerpo)
    while i < n:
        linea = cuerpo[i]
        s = linea.strip()
        if not s or s == "---":
            i += 1
            continue

        if s.startswith("```"):
            lang = s[3:].strip()
            j, buf = i + 1, []
            while j < n and cuerpo[j].strip() != "```":
                buf.append(cuerpo[j])
                j += 1
            texto = "\n".join(buf)
            bl.append({"k": "code", "lang": lang, "tk": tokens(texto, lang)})
            i = j + 1
            continue

        if s.startswith("|"):
            j, filas = i, []
            while j < n and cuerpo[j].strip().startswith("|"):
                filas.append(cuerpo[j].strip())
                j += 1
            bl.append(parse_tabla(filas))
            i = j
            continue

        if s.startswith(">"):
            j, dentro = i, []
            while j < n and cuerpo[j].strip().startswith(">"):
                dentro.append(re.sub(r"^\s*>\s?", "", cuerpo[j]))
                j += 1
            bl.append({"k": "cita", "b": parse_bloques(dentro)})
            i = j
            continue

        if RE_ITEM.match(s) and not RE_SUBITEM.match(linea):
            ord_ = bool(re.match(r"^\d+\.", s))
            items, j = [], i
            while j < n and cuerpo[j].strip():
                l2 = cuerpo[j]
                if RE_SUBITEM.match(l2):
                    items.append({"n": 1, "t": [RE_ITEM.sub("", l2.strip())]})
                elif RE_ITEM.match(l2.strip()) and not l2.startswith("   "):
                    items.append({"n": 0, "t": [RE_ITEM.sub("", l2.strip())]})
                elif items:
                    items[-1]["t"].append(l2.strip())
                else:
                    break
                j += 1
            bl.append(
                {
                    "k": "lista",
                    "ord": ord_,
                    "it": [{"n": it["n"], "t": inline(" ".join(it["t"]))} for it in items],
                }
            )
            i = j
            continue

        # párrafo: hasta la línea en blanco o el comienzo de otro bloque
        j, buf = i, []
        while j < n and cuerpo[j].strip():
            s2 = cuerpo[j].strip()
            if j > i and (s2.startswith("|") or s2.startswith("```") or s2.startswith(">")):
                break
            buf.append(s2)
            j += 1
        texto = " ".join(buf)
        rot = ROTULOS.match(texto)
        if rot:
            bl.append({"k": "p", "rot": rot.group(1), "t": inline(rot.group(2) or "")})
        else:
            bl.append({"k": "p", "t": inline(texto)})
        i = j
    return bl


def celdas(fila):
    partes = fila.strip().strip("|").split("|")
    return [p.strip() for p in partes]


def parse_tabla(filas):
    cab = [inline(c) for c in celdas(filas[0])]
    cuerpo = [[inline(c) for c in celdas(f)] for f in filas[2:]]
    return {"k": "tabla", "cab": cab, "filas": cuerpo}


# ---------------------------------------------------------------- recorrido

RE_HEAD = re.compile(r"^(#{1,4}) +(.*)$")
lineas = MD.read_text(encoding="utf-8").split("\n")
usado = [False] * len(lineas)

crudos = []          # elementos con su cuerpo sin parsear
sec, grupo = "doc", ""
actual = None


def abrir(kind, ident, titulo, linea, grupo_):
    global actual
    actual = {
        "kind": kind,
        "id": ident,
        "titulo": titulo,
        "seccion": sec,
        "grupo": grupo_,
        "linea": linea + 1,
        "cuerpo": [],
    }
    crudos.append(actual)
    return actual


en_codigo = False

for idx, linea in enumerate(lineas):
    # Un bloque de código puede contener líneas que empiezan con '#' (comentarios de
    # shell); sin este interruptor se leerían como encabezados y partirían el documento.
    if linea.strip().startswith("```"):
        en_codigo = not en_codigo

    m = None if en_codigo else RE_HEAD.match(linea)
    if not m:
        if linea.strip() in ("---", ""):
            usado[idx] = True
        if actual is not None:
            actual["cuerpo"].append(linea)
            usado[idx] = True
        continue

    usado[idx] = True
    nivel, txt = len(m.group(1)), m.group(2).strip()

    if nivel == 1:
        sec, grupo = "doc", "El documento"
        abrir("nota", "doc", "Para qué sirve este documento", idx, grupo)
        continue

    if nivel == 2:
        if txt == "Índice":
            # el índice del markdown lo reemplaza el índice navegable de la slide
            actual = {"kind": "omitido", "cuerpo": []}
            crudos.append(actual)
            continue
        mm = re.match(r"^(\d+)\. +(.*)$", txt)
        if mm:
            sec = "s" + mm.group(1)
            grupo = mm.group(2)
            abrir("nota", sec + "-intro", grupo, idx, grupo)
            continue
        if txt == "Fuentes citadas":
            sec, grupo = "fuentes", txt
            abrir("nota", "fuentes", txt, idx, grupo)
            continue
        raise SystemExit("encabezado de nivel 2 no reconocido: " + txt)

    mp = re.match(r"^P(\d+)\. +(.*)$", txt)
    if mp:
        abrir("pregunta", "p" + mp.group(1), mp.group(2), idx, grupo)
        actual["n"] = int(mp.group(1))
        continue

    ms = re.match(r"^(\d+)\.(\d+) +(.*)$", txt)
    if ms:
        grupo = "%s.%s %s" % (ms.group(1), ms.group(2), ms.group(3))
        kind = "glosario" if sec == "s6" else "nota"
        abrir(kind, "sub%s%s" % (ms.group(1), ms.group(2)), ms.group(3), idx, grupo)
        continue

    raise SystemExit("encabezado no reconocido: " + txt)

# ---------------------------------------------------------------- elementos

items = []


def resumen_de(bloques):
    for b in bloques:
        if b["k"] == "p":
            t = texto_plano(b["t"])
            return t if len(t) <= 190 else t[:187].rsplit(" ", 1)[0] + "…"
        if b["k"] == "cita":
            for c in b["b"]:
                if c["k"] == "p":
                    t = texto_plano(c["t"])
                    return t if len(t) <= 190 else t[:187].rsplit(" ", 1)[0] + "…"
    return ""


for cr in crudos:
    if cr["kind"] == "omitido":
        continue
    bloques = parse_bloques(cr["cuerpo"])

    if cr["kind"] == "glosario":
        # la subsección del glosario es una nota (su cita de encabezado, si la
        # tiene) más un elemento por término de la tabla
        tablas = [b for b in bloques if b["k"] == "tabla"]
        otros = [b for b in bloques if b["k"] != "tabla"]
        if otros:
            items.append(
                {
                    "id": cr["id"],
                    "kind": "n",
                    "n": 0,
                    "tit": inline(cr["titulo"]),
                    "titulo": cr["titulo"],
                    "resumen": resumen_de(otros),
                    "seccion": cr["seccion"],
                    "grupo": cr["grupo"],
                    "bloques": otros,
                    "linea": cr["linea"],
                }
            )
        for t in tablas:
            for fila in t["filas"]:
                termino = texto_plano(fila[0]).strip()
                qué, aquí = fila[1], fila[2] if len(fila) > 2 else []
                items.append(
                    {
                        "id": "g-" + slug(termino),
                        "kind": "g",
                        "n": 0,
                        "tit": fila[0],
                        "titulo": termino,
                        "resumen": texto_plano(qué),
                        "seccion": cr["seccion"],
                        "grupo": cr["grupo"],
                        "bloques": [
                            {"k": "p", "rot": "Qué es.", "t": qué},
                            {"k": "p", "rot": "En este proyecto.", "t": aquí},
                        ],
                        "linea": cr["linea"],
                    }
                )
        continue

    if not bloques:
        continue

    items.append(
        {
            "id": cr["id"],
            "kind": "p" if cr["kind"] == "pregunta" else "n",
            "n": cr.get("n", 0),
            "tit": inline(cr["titulo"]),
            "titulo": re.sub(r"[*`]", "", cr["titulo"]),
            "resumen": resumen_de(bloques),
            "seccion": cr["seccion"],
            "grupo": cr["grupo"],
            "bloques": bloques,
            "linea": cr["linea"],
        }
    )

# ---------------------------------------------------------------- claves

# términos por los que alguien va a buscar y que no aparecen literales en el texto
ALIAS = {
    "p9": "llave primaria pk identificador",
    "p11": "soft delete borrado logico",
    "p12": "optimistic lock concurrencia",
    "p13": "solape choque colision",
    "p16": "row level security permisos fila",
    "p22": "clean architecture hexagonal capas",
    "p26": "di ioc contenedor",
    "p28": "signalr websocket wasm",
    "p43": "estados fsm ciclo de vida",
    "p47": "login autenticacion cookie",
    "p49": "rbac roles permisos",
    "p60": "verificador calidad",
    "p61": "np completo complejidad combinaciones fuerza bruta",
    "p62": "ia inteligencia artificial genetico voraz greedy busqueda local",
    "p63": "por donde empezar orden de lectura clases principales",
    "p64": "snapshot instantanea inmutable",
    "p65": "expansor uuid hash determinista",
    "p66": "construccion voraz bucle candidatos",
    "p67": "mrv fail first dsatur heuristica",
    "p68": "mejora local optimo local first improvement",
    "p69": "verificador independencia diversidad",
    "p70": "duras blandas restricciones",
    "p71": "reglasduras duplicacion desincronizacion",
    "p72": "pesos ponderaciones puntaje costo",
    "p73": "bitset tablero ocupacion arreglo",
    "p74": "catalogo candidatos cache precalculo",
    "p75": "costo incremental rendimiento",
    "p76": "pruebas equivalencia test",
    "p77": "determinismo reproducible azar random",
    "p78": "pendiente diagnostico motivo",
    "p79": "limites optimalidad backtracking",
    "p80": "tiempo cola timeout reinicio",
    "p81": "flecha lambda expression bodied",
    "p82": "ternario null coalescing nullable",
    "p83": "readonly const inmutable",
    "p84": "internal private sealed modificadores de acceso encapsulacion",
    "p85": "record with igualdad por valor",
    "p86": "sintaxis simbolos operadores async",
    "p87": "decimal double coma flotante precision",
    "p88": "immutablearray list ienumerable linq",
    "p89": "cancellationtoken cancelacion timeout",
}

for it in items:
    partes = [it["titulo"], it["grupo"], LABEL_SEC.get(it["seccion"], ""), ALIAS.get(it["id"], "")]
    if it["n"]:
        partes.append("P%d pregunta %d" % (it["n"], it["n"]))
    it["claves"] = " ".join(p for p in partes if p)
    it["texto"] = " ".join([it["claves"], texto_cuerpo(it["bloques"])])

# ---------------------------------------------------------------- cobertura

sin_usar = [(i + 1, l) for i, l in enumerate(lineas) if not usado[i] and l.strip()]
total = sum(1 for l in lineas if l.strip())
cubierto = total - len(sin_usar)
if sin_usar:
    print("AVISO: %d líneas sin recoger" % len(sin_usar))
    for num, l in sin_usar[:20]:
        print("  %d: %s" % (num, l[:90]))

preguntas = [i for i in items if i["kind"] == "p"]
terminos = [i for i in items if i["kind"] == "g"]
notas = [i for i in items if i["kind"] == "n"]

cuentas = {}
for it in items:
    cuentas[it["seccion"]] = cuentas.get(it["seccion"], 0) + 1

META = {
    "archivo": "docs/preguntas-respuestas.md",
    "lineas": len(lineas),
    "preguntas": len(preguntas),
    "terminos": len(terminos),
    "notas": len(notas),
    "cobertura": round(100.0 * cubierto / total, 1),
}

# ---------------------------------------------------------------- salida

def js(valor):
    return json.dumps(valor, ensure_ascii=False, separators=(",", ":"))


cab = '''// GENERADO — no editar a mano.
// Fuente: %s · script: scripts/gen-preguntas.py
// %d preguntas · %d términos de glosario · %d notas · cobertura %.1f%% del documento

/** Trozo de una frase, con sus marcas de pintado. */
export interface Inline {
  t: string;
  /** Negrita. */
  b?: 1;
  /** Cursiva. */
  i?: 1;
  /** Venía entre acentos graves: es código o un identificador. */
  c?: 1;
  /** Referencia interna: el id del elemento al que salta. */
  r?: string;
}

export interface ItemLista {
  /** 0 es el primer nivel; 1, una viñeta anidada. */
  n: number;
  t: Inline[];
}

/** Trozo de código con su clase de resaltado. */
export interface Token {
  t: string;
  c: string;
}

/**
 * Un bloque del cuerpo de una respuesta. Se usa una sola forma con campos
 * opcionales porque así la plantilla puede recorrerlos sin conversiones.
 */
export interface Bloque {
  k: 'p' | 'code' | 'tabla' | 'lista' | 'cita';
  /** Párrafo: rótulo inicial en negrita («Qué.», «Cómo.», «Por qué.»). */
  rot?: string;
  t?: Inline[];
  lang?: string;
  tk?: Token[];
  cab?: Inline[][];
  filas?: Inline[][][];
  ord?: boolean;
  it?: ItemLista[];
  b?: Bloque[];
}

/** `p` es pregunta; `g`, término del glosario; `n`, nota de sección. */
export type ItemKind = 'p' | 'g' | 'n';

export interface Item {
  id: string;
  kind: ItemKind;
  /** Número de pregunta; 0 en lo que no es pregunta. */
  n: number;
  /** Título ya troceado, para pintar el código que lleva dentro. */
  tit: Inline[];
  /** Título en texto llano. */
  titulo: string;
  /** Primera frase, para el índice. */
  resumen: string;
  seccion: string;
  /** Encabezado bajo el que se agrupa en el índice. */
  grupo: string;
  bloques: Bloque[];
  /** Términos extra que hacen que la búsqueda lo encuentre. */
  claves: string;
  /** Todo el texto del elemento, para la búsqueda a fondo. */
  texto: string;
  /** Línea donde empieza en el documento. */
  linea: number;
}

export interface Seccion {
  id: string;
  label: string;
  color: string;
  n: number;
}

export const META = %s;

export const SECCIONES: Seccion[] = %s;

export const ITEMS: Item[] = [
%s
];
''' % (
    META["archivo"],
    META["preguntas"],
    META["terminos"],
    META["notas"],
    META["cobertura"],
    js(META),
    js([{"id": i, "label": l, "color": c, "n": cuentas.get(i, 0)} for i, l, c in SECCIONES]),
    ",\n".join("  " + js(it) for it in items),
)

OUT.write_text(cab, encoding="utf-8")
print(
    "%s · %d elementos (%d preguntas, %d términos, %d notas) · cobertura %.1f%%"
    % (OUT.relative_to(ROOT), len(items), len(preguntas), len(terminos), len(notas), META["cobertura"])
)
