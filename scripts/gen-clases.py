#!/usr/bin/env python3
"""Parsea el código C# de Horarios-develop y genera src/app/data/clases-data.ts.

Extrae los tipos (class/record/interface/enum/struct), sus miembros y las
relaciones entre ellos (herencia, implementación, uso por tipo de miembro y
dependencias inyectadas por constructor), y precalcula el layout del grafo
igual que gen-erd.py: clusters por proyecto y separación de rectángulos.
"""
import math
import re
from collections import defaultdict
from pathlib import Path

import numpy as np

FUENTE = Path("/home/ordson/Documentos/Universidad/HORARIOS/Horarios-develop/src")
OUT = Path("/home/ordson/Documentos/presentacion-sprint04/src/app/data/clases-data.ts")
OUT_DOCS = Path("/home/ordson/Documentos/presentacion-sprint04/src/app/data/clases-docs.ts")

# proyecto -> capa
# El motor (Horarios.Scheduler / Horarios.Motor) se dejó fuera del deck el
# 2026-08-29; no se mapea para que sus .cs no entren en el diagrama.
CAPAS = {
    "Horarios.Dominio": "dominio",
    "Horarios.Contratos": "contratos",
    "Horarios.Aplicacion": "aplicacion",
    "Horarios.Infraestructura": "infraestructura",
    "Horarios.Blazor": "blazor",
}
ORDEN = ["dominio", "contratos", "aplicacion", "infraestructura", "blazor"]

META = {
    "dominio":         ("Dominio",         "Entidades y enums del negocio: sin dependencias hacia fuera.",                 "#3f6fd6"),
    "contratos":       ("Contratos",       "DTOs, puertos e interfaces que atraviesan las capas.",                         "#0f8a94"),
    "aplicacion":      ("Aplicación",      "Casos de uso: orquestan repositorios, validan y aplican reglas.",              "#2a9468"),
    "infraestructura": ("Infraestructura", "Adaptadores a Supabase/PostgREST que implementan los puertos.",                "#b5791b"),
    "blazor":          ("Blazor",          "Interfaz web: componentes, estado de sesión y arranque de la app.",            "#c2504b"),
}

PALABRAS = {
    "var", "new", "return", "if", "else", "for", "foreach", "while", "switch", "case",
    "get", "set", "init", "value", "this", "base", "null", "true", "false", "await",
    "async", "public", "private", "protected", "internal", "static", "readonly",
    "sealed", "abstract", "partial", "override", "virtual", "required", "record",
    "class", "struct", "interface", "enum", "namespace", "using", "where", "when",
    "throw", "try", "catch", "finally", "do", "in", "out", "ref", "is", "as", "default",
}

PRIMITIVOS = {
    "void", "int", "long", "short", "byte", "bool", "string", "char", "decimal",
    "double", "float", "object", "Guid", "DateTime", "DateTimeOffset", "DateOnly",
    "TimeOnly", "TimeSpan", "Task", "ValueTask", "List", "IList", "IReadOnlyList",
    "IEnumerable", "ICollection", "IReadOnlyCollection", "Dictionary", "IDictionary",
    "IReadOnlyDictionary", "ImmutableArray", "ImmutableList", "ImmutableDictionary",
    "ImmutableHashSet", "HashSet", "ISet", "Array", "Span", "ReadOnlySpan", "Nullable",
    "CancellationToken", "Exception", "Type", "Uri", "Stream", "T", "TKey", "TValue",
}

# ------------------------------------------------------------------ parseo

BLOQUE = re.compile(r"/\*.*?\*/", re.S)
LINEA = re.compile(r"//[^\n]*")
CADENA = re.compile(r'@?"(?:[^"\\]|\\.)*"')

DECL = re.compile(
    r"(?:^|\n)[ \t]*(?P<mods>(?:public|internal|private|protected|sealed|static|abstract|partial|file|readonly|new)[ \t]+)*"
    r"(?P<kind>record[ \t]+struct|class|record|struct|interface|enum)[ \t]+(?P<name>[A-Za-z_]\w*)"
)

PROP = re.compile(
    r"^[ \t]*(?:(?:public|internal|protected|private|static|virtual|override|required|sealed|new|readonly)[ \t]+)*"
    r"(?P<t>[\w<>?\[\],. ]+?)[ \t]+(?P<n>\w+)[ \t]*(?:\{[ \t]*(?:get|set|init)|=>)"
)
METODO = re.compile(
    r"^[ \t]*(?:(?:public|internal|protected|private|static|async|virtual|override|sealed|new|partial|extern)[ \t]+)*"
    r"(?P<t>[\w<>?\[\],. ]+?)[ \t]+(?P<n>\w+)[ \t]*\((?P<args>[^;{)]*)\)[ \t]*(?:\{|=>|;|$)"
)


SENTENCIAS = ("return", "await", "throw", "yield", "new", "if", "else", "for",
              "foreach", "while", "switch", "case", "using", "lock", "try", "catch",
              "finally", "do", "goto", "var", "=>", "base", "this")


def unir(cuerpo: str) -> list[str]:
    """Une las líneas de una firma partida en varias, para poder leerla entera."""
    salida, buffer, prof = [], "", 0
    for linea in cuerpo.split("\n"):
        buffer = linea if not buffer else buffer + " " + linea.strip()
        prof = buffer.count("(") - buffer.count(")")
        prof_g = buffer.count("<") - buffer.count(">")
        if prof > 0 and len(buffer) < 600:
            continue
        salida.append(buffer)
        buffer = ""
    if buffer:
        salida.append(buffer)
    return salida


def es_sentencia(linea: str) -> bool:
    izq = linea.strip()
    return any(izq.startswith(p + " ") or izq.startswith(p + "(") for p in SENTENCIAS)


CAMPO = re.compile(
    r"^[ \t]*(?:public|internal|protected)[ \t]+(?:(?:const|static|readonly|new)[ \t]+)+"
    r"(?P<t>[\w<>?\[\],. ]+?)[ \t]+(?P<n>\w+)[ \t]*="
)


def _espacios(m: re.Match) -> str:
    return "".join("\n" if c == "\n" else " " for c in m.group(0))


def limpiar(texto: str) -> str:
    """Neutraliza comentarios y cadenas sin mover ni un carácter de sitio.

    Conservar las posiciones permite localizar cada tipo en el texto original y,
    con eso, atribuir los comentarios /// al tipo y al miembro que documentan.
    """
    texto = BLOQUE.sub(_espacios, texto)
    texto = LINEA.sub(_espacios, texto)
    return CADENA.sub(_espacios, texto)


def equilibrar(texto: str, i: int, abre: str, cierra: str) -> int:
    """Devuelve el índice justo tras el cierre que equilibra al abre en i."""
    prof = 0
    while i < len(texto):
        c = texto[i]
        if c == abre:
            prof += 1
        elif c == cierra:
            prof -= 1
            if prof == 0:
                return i + 1
        i += 1
    return len(texto)


def saltar(texto: str, i: int) -> int:
    while i < len(texto) and texto[i] in " \t\r\n":
        i += 1
    return i


def partir(args: str) -> list[str]:
    """Separa una lista de parámetros/bases por comas de nivel cero."""
    partes, prof, actual = [], 0, []
    for c in args:
        if c in "<([{":
            prof += 1
        elif c in ">)]}":
            prof -= 1
        if c == "," and prof == 0:
            partes.append("".join(actual).strip())
            actual = []
        else:
            actual.append(c)
    if "".join(actual).strip():
        partes.append("".join(actual).strip())
    return partes


def tipos_de(texto: str) -> list[str]:
    """Identificadores de tipo mencionados en una firma."""
    return [w for w in re.findall(r"[A-Za-z_]\w*", texto) if w not in PALABRAS]


def param(p: str) -> tuple[str, str] | None:
    """('Guid', 'Id') a partir de un parámetro posicional o de constructor."""
    p = re.sub(r"\[[^\]]*\]", " ", p).strip()          # atributos
    p = re.sub(r"^(?:params|ref|out|in|this|scoped)\s+", "", p)
    p = p.split("=")[0].strip()                         # valor por defecto
    m = re.match(r"^(?P<t>.+?)\s+(?P<n>\w+)$", p, re.S)
    if not m:
        return None
    return re.sub(r"\s+", "", m.group("t")), m.group("n")


# ------------------------------------------------------- documentación XML

# Los /// se leen del texto original, antes de limpiarlo. Cada bloque se ata a
# la declaración que le sigue y, por posición, al tipo que la contiene.

SECCIONES = re.compile(r"<(summary|param|exception|returns|remarks|example)\b.*?</\1>", re.S | re.I)
RESTO_TAG = re.compile(r"</?\w+[^>]*>")
CIERRA_FIRMA = ("{", ";", ")", "=>")

docs_tipo: dict[str, dict] = {}
docs_miembro: dict[str, dict[str, dict]] = {}


def inline(s: str) -> str:
    """Marcas de una línea a texto plano; las referencias quedan entre acentos graves."""
    s = re.sub(r'<see\s+cref="(?:\w:)?([^"]+)"\s*/?>',
               lambda m: "`" + m.group(1).split("(")[0].split(".")[-1] + "`", s)
    s = re.sub(r'<(?:see\s+langword|paramref\s+name|typeparamref\s+name)="([^"]+)"\s*/?>', r"`\1`", s)
    s = re.sub(r"<c>(.*?)</c>", r"`\1`", s, flags=re.S)
    s = RESTO_TAG.sub(" ", s)
    for ent, ch in (("&lt;", "<"), ("&gt;", ">"), ("&quot;", '"'), ("&apos;", "'"), ("&amp;", "&")):
        s = s.replace(ent, ch)
    return s


def normalizar(s: str) -> str:
    """Une los renglones de cada párrafo y conserva los saltos entre párrafos."""
    partes = [re.sub(r"[ \t]+", " ", p.replace("\n", " ")).strip()
              for p in re.split(r"\n[ \t]*\n", inline(s))]
    return "\n\n".join(p for p in partes if p)


def parsear_doc(cuerpo: list[str]) -> dict | None:
    txt = "\n".join(cuerpo)
    doc: dict = {}

    m = re.search(r"<summary>(.*?)</summary>", txt, re.S | re.I)
    if m:
        doc["s"] = normalizar(m.group(1))
    m = re.search(r"<returns>(.*?)</returns>", txt, re.S | re.I)
    if m:
        doc["r"] = normalizar(m.group(1))
    m = re.search(r"<remarks>(.*?)</remarks>", txt, re.S | re.I)
    if m and normalizar(m.group(1)):
        doc["s"] = (doc.get("s", "") + "\n\n" + normalizar(m.group(1))).strip()

    params = [(n, normalizar(d))
              for n, d in re.findall(r'<param\s+name="([^"]+)"\s*>(.*?)</param>', txt, re.S | re.I)]
    params = [(n, d) for n, d in params if d]
    if params:
        doc["p"] = params

    excs = [(t.split("(")[0].split(".")[-1], normalizar(d))
            for t, d in re.findall(r'<exception\s+cref="(?:\w:)?([^"]+)"\s*>(.*?)</exception>',
                                   txt, re.S | re.I)]
    if excs:
        doc["e"] = excs

    if "s" not in doc:                          # doc suelta, sin <summary>
        suelto = normalizar(SECCIONES.sub("", txt))
        if suelto:
            doc["s"] = suelto
    return doc or None


def bloques_doc(raw: str):
    """(líneas ///, offset de la declaración, nº de línea, firma) de cada bloque."""
    lineas = raw.split("\n")
    offs, acc = [], 0
    for l in lineas:
        offs.append(acc)
        acc += len(l) + 1

    salida, i, n = [], 0, len(lineas)
    while i < n:
        if not lineas[i].lstrip().startswith("///"):
            i += 1
            continue
        cuerpo = []
        while i < n and lineas[i].lstrip().startswith("///"):
            cuerpo.append(lineas[i].lstrip()[3:])
            i += 1
        k = i
        while k < n and (not lineas[k].strip() or lineas[k].lstrip().startswith("[")):
            k += 1
        if k >= n:
            continue
        firma = []
        for l in lineas[k: k + 10]:
            recorte = l.strip()
            if firma and recorte.startswith("///"):   # empezó otro bloque: la firma ya acabó
                break
            firma.append(recorte)
            unida = " ".join(firma)
            if unida.count("(") > unida.count(")"):
                continue
            # un valor de enum termina en la coma que lo separa del siguiente,
            # o en la llave que cierra el tipo cuando es el último
            if unida.endswith(CIERRA_FIRMA) or unida.endswith((",", "}")):
                break
        salida.append((cuerpo, offs[k], k + 1, " ".join(firma)))
    return salida


def doc_antes(raw: str, off: int) -> list[str]:
    """Bloque /// pegado justo encima de la declaración que empieza en off."""
    if raw[off: off + 1] == "\n":
        off += 1
    lineas = raw[:off].split("\n")
    j = len(lineas) - 1
    while j >= 0 and (not lineas[j].strip() or lineas[j].lstrip().startswith("[")):
        j -= 1
    cuerpo = []
    while j >= 0 and lineas[j].lstrip().startswith("///"):
        cuerpo.append(lineas[j].lstrip()[3:])
        j -= 1
    return cuerpo[::-1]


def nombre_miembro(firma: str) -> str | None:
    """El identificador que se declara: lo último antes de los parámetros o del cuerpo."""
    corte = len(firma)
    for marca in ("{", "=>", ";"):
        pos = firma.find(marca)
        if pos >= 0:
            corte = min(corte, pos)
    # campo con inicializador: el nombre está antes del '=', no dentro de la
    # expresión que lo llena (`... JsonSerializerOptions Json = Crear()`)
    igual = re.search(r"(?<![=!<>+\-*/%&|^])=(?!=|>)", firma)
    if igual and igual.start() < corte:
        corte = igual.start()
    par = firma.find("(")
    cabeza = firma[:par] if 0 <= par < corte else firma[:corte]
    cabeza = re.sub(r"<[^<>]*>\s*$", "", cabeza.strip())     # método genérico
    ids = re.findall(r"[A-Za-z_]\w*", cabeza)
    return ids[-1] if ids else None


def firma_limpia(firma: str) -> str:
    """La declaración sin el cuerpo, en una línea."""
    s = re.sub(r"\s+", " ", firma).strip()
    m = re.search(r"\{\s*(get|set|init)\b", s)
    if m:
        fin = s.find("}", m.start())
        return s[: fin + 1] if fin > 0 else s
    for marca in ("=>", "{"):
        pos = s.find(marca)
        if pos > 0:
            s = s[:pos]
            break
    # la firma venía partida en varias líneas: al unirla quedan huecos junto a
    # los paréntesis y las comas que en una sola línea se leen mal
    s = re.sub(r"\(\s+", "(", s)
    s = re.sub(r"\s+\)", ")", s)
    s = re.sub(r"\s+,", ",", s)
    return s.rstrip(" ;,").strip()


def leer_docs(raw: str, del_archivo: list[str]) -> None:
    """Ata los bloques /// del archivo a su tipo y a su miembro."""
    for clave in del_archivo:
        cuerpo = doc_antes(raw, tipos[clave]["_ini"])
        if cuerpo:
            doc = parsear_doc(cuerpo)
            if doc:
                docs_tipo[clave] = doc

    # de rango más pequeño a más grande: para un offset, gana el tipo más interno
    rangos = sorted(
        ((tipos[c]["_cini"], tipos[c]["_cfin"], c) for c in del_archivo),
        key=lambda t: t[1] - t[0],
    )

    for cuerpo, off, num, firma in bloques_doc(raw):
        if DECL.match("\n" + firma):                  # es la doc de un tipo
            continue
        doc = parsear_doc(cuerpo)
        if not doc:
            continue
        clave = next((c for ini, fin, c in rangos if ini <= off < fin), None)
        if clave is None:
            continue
        nom = nombre_miembro(firma)
        if not nom or nom == tipos[clave]["nombre"]:  # constructor: sin fila propia
            continue
        # en un enum la «firma» es el nombre a secas: no aporta nada al panel
        if tipos[clave]["kind"] != "enum":
            doc["f"] = firma_limpia(firma)
        doc["l"] = num
        docs_miembro.setdefault(clave, {}).setdefault(nom, doc)


tipos: dict[str, dict] = {}
orden_archivo: list[str] = []

for cs in sorted(FUENTE.rglob("*.cs")):
    partes = cs.relative_to(FUENTE).parts
    if "obj" in partes or "bin" in partes or cs.name.endswith(".g.cs"):
        continue
    proyecto = partes[0]
    capa = CAPAS.get(proyecto)
    if capa is None:
        continue
    # el motor v2 vive ahora en sub-namespaces .Motor de los proyectos mapeados
    # (Horarios.Contratos.Motor, .Aplicacion.Motor…); fuera del deck desde el
    # 2026-08-29, igual que la antigua capa Scheduler.
    if "Motor" in cs.relative_to(FUENTE).parts or "Scheduler" in cs.relative_to(FUENTE).parts:
        continue
    raw = cs.read_text(encoding="utf-8", errors="replace")
    texto = limpiar(raw)
    ns = "?"
    del_archivo: list[str] = []
    mns = re.search(r"\bnamespace\s+([\w.]+)", texto)
    if mns:
        ns = mns.group(1)
    if "Motor" in ns.split(".") or "Scheduler" in ns.split("."):
        continue

    for m in DECL.finditer(texto):
        kind = re.sub(r"\s+", " ", m.group("kind"))
        nombre = m.group("name")
        mods = texto[m.start(): m.start("kind")]
        i = m.end()
        if i < len(texto) and texto[i] == "<":            # genéricos
            i = equilibrar(texto, i, "<", ">")
        i = saltar(texto, i)

        posicionales: list[str] = []
        if i < len(texto) and texto[i] == "(":
            fin = equilibrar(texto, i, "(", ")")
            posicionales = partir(texto[i + 1: fin - 1])
            i = saltar(texto, fin)

        bases: list[str] = []
        if i < len(texto) and texto[i] == ":":
            j = i + 1
            prof = 0
            while j < len(texto):
                c = texto[j]
                if c in "<([":
                    prof += 1
                elif c in ">)]":
                    prof -= 1
                elif prof == 0 and (c in "{;" or texto.startswith("where", j)):
                    break
                j += 1
            bases = [b.split("<")[0].strip() for b in partir(texto[i + 1: j])]
            i = saltar(texto, j)

        cuerpo, ini_cuerpo, fin_cuerpo = "", i, i
        if i < len(texto) and texto[i] == "{":
            fin_cuerpo = equilibrar(texto, i, "{", "}")
            ini_cuerpo = i + 1
            cuerpo = texto[ini_cuerpo: fin_cuerpo - 1]

        clave = f"{ns}.{nombre}"
        if clave in tipos:                                 # partial repetida
            continue
        tipos[clave] = {
            "id": clave, "nombre": nombre, "ns": ns, "capa": capa, "kind": kind,
            "abst": "abstract" in mods, "estatico": "static" in mods,
            "archivo": str(cs.relative_to(FUENTE)),
            "posicionales": posicionales, "bases": bases, "cuerpo": cuerpo,
            "_ini": m.start(), "_cini": ini_cuerpo, "_cfin": fin_cuerpo,
        }
        del_archivo.append(clave)
        orden_archivo.append(clave)

    # los tipos anidados se vacían del cuerpo del contenedor: son nodos propios
    for clave in del_archivo:
        t = tipos[clave]
        if not t["cuerpo"]:
            continue
        trozos, corte = [], t["_cini"]
        for otra in del_archivo:
            o = tipos[otra]
            if otra != clave and t["_cini"] <= o["_ini"] < t["_cfin"] and o["_cfin"] <= t["_cfin"]:
                if o["_ini"] >= corte:
                    trozos.append(texto[corte: o["_ini"]])
                    corte = o["_cfin"]
        if trozos:
            trozos.append(texto[corte: t["_cfin"] - 1])
            t["cuerpo"] = "\n".join(trozos)

    leer_docs(raw, del_archivo)

# módulo: el segmento del namespace que sigue al proyecto (Academia, Docentes…).
# Es la unidad funcional dentro de cada capa; los tipos sueltos van a "Núcleo".
def modulo_de(ns: str) -> str:
    partes = ns.split(".")
    return partes[2] if len(partes) > 2 else "Núcleo"


for t in tipos.values():
    t["modulo"] = modulo_de(t["ns"])

# índice por nombre simple, para resolver referencias
por_nombre: dict[str, list[str]] = defaultdict(list)
for clave, t in tipos.items():
    por_nombre[t["nombre"]].append(clave)


def resolver(nombre: str, desde: str) -> str | None:
    cands = por_nombre.get(nombre)
    if not cands:
        return None
    if len(cands) == 1:
        return cands[0]
    yo = tipos[desde]
    mismo_ns = [c for c in cands if tipos[c]["ns"] == yo["ns"]]
    if mismo_ns:
        return mismo_ns[0]
    misma_capa = [c for c in cands if tipos[c]["capa"] == yo["capa"]]
    return (misma_capa or cands)[0]


# ------------------------------------------------------- miembros y relaciones

relaciones: dict[tuple[str, str, str], set[str]] = defaultdict(set)


def anotar(de: str, tipo_texto: str, via: str, clase_rel: str) -> None:
    for nombre in tipos_de(tipo_texto):
        if nombre in PRIMITIVOS:
            continue
        destino = resolver(nombre, de)
        if destino and destino != de:
            relaciones[(de, destino, clase_rel)].add(via)


for clave, t in tipos.items():
    miembros = []
    cuerpo = t["cuerpo"]
    es_ctor_primario = t["kind"] in ("class", "struct") and t["posicionales"]

    for p in t["posicionales"]:
        par = param(p)
        if not par:
            continue
        tp, nom = par
        if es_ctor_primario:
            anotar(clave, tp, nom, "depende")
        else:
            miembros.append({"n": nom, "t": tp, "k": "prop", "est": False})
            anotar(clave, tp, nom, "usa")

    if t["kind"] == "enum":
        for v in partir(cuerpo):
            nom = v.split("=")[0].strip()
            if re.fullmatch(r"[A-Za-z_]\w*", nom):
                miembros.append({"n": nom, "t": "", "k": "valor", "est": False})
    else:
        vistos = {m["n"] for m in miembros}
        for linea in unir(cuerpo):
            linea = linea.rstrip()
            if not linea.strip() or linea.strip().startswith("[") or es_sentencia(linea):
                continue
            if DECL.match("\n" + linea):        # declaración anidada: nodo aparte
                continue
            mm = METODO.match(linea)
            if mm and mm.group("n") not in ("if", "while", "for", "foreach", "switch", "lock", "using", "return", "catch"):
                nom, tp, args = mm.group("n"), re.sub(r"\s+", "", mm.group("t")), mm.group("args")
                if nom == t["nombre"] or tp in ("return", "=") or not re.fullmatch(r"[\w<>?\[\],.]+", tp):
                    if nom == t["nombre"]:                 # constructor: dependencias
                        for p in partir(args):
                            par = param(p)
                            if par:
                                anotar(clave, par[0], par[1], "depende")
                    continue
                if (nom, "m") in vistos:
                    continue
                vistos.add((nom, "m"))
                firma = ", ".join(
                    (param(p) or ("", ""))[0] for p in partir(args) if param(p)
                )
                miembros.append({"n": f"{nom}({firma})", "t": tp, "k": "metodo",
                                 "est": " static " in f" {linea} "})
                anotar(clave, tp, nom, "usa")
                anotar(clave, args, nom, "usa")
                continue
            mc = CAMPO.match(linea)
            if mc and mc.group("n") not in vistos:
                nom, tp = mc.group("n"), re.sub(r"\s+", "", mc.group("t"))
                if re.fullmatch(r"[\w<>?\[\],.]+", tp):
                    vistos.add(nom)
                    miembros.append({"n": nom, "t": tp, "k": "prop", "est": True})
                    anotar(clave, tp, nom, "usa")
                    continue
            mp = PROP.match(linea)
            if mp and mp.group("n") not in vistos:
                nom, tp = mp.group("n"), re.sub(r"\s+", "", mp.group("t"))
                if tp in ("return", "=") or not re.fullmatch(r"[\w<>?\[\],.]+", tp):
                    continue
                vistos.add(nom)
                miembros.append({"n": nom, "t": tp, "k": "prop",
                                 "est": " static " in f" {linea} "})
                anotar(clave, tp, nom, "usa")

    t["miembros"] = miembros

    for b in t["bases"]:
        destino = resolver(b, clave)
        if not destino or destino == clave:
            t.setdefault("externas", []).append(b)
            continue
        clase_rel = "implementa" if tipos[destino]["kind"] == "interface" else "hereda"
        relaciones[(clave, destino, clase_rel)].add(b)


# --- herencia de documentación -------------------------------------------
# Los puertos llevan la explicación y los adaptadores la dan por sabida: un
# miembro sin doc propia toma la del primer tipo base que sí la documente.


def bases_resueltas(clave: str) -> list[str]:
    salida = []
    for b in tipos[clave]["bases"]:
        destino = resolver(b, clave)
        if destino and destino != clave:
            salida.append(destino)
    return salida


for clave, t in tipos.items():
    propios = docs_miembro.setdefault(clave, {})

    # los parámetros posicionales de un record se documentan en el propio tipo
    for nom, texto_p in docs_tipo.get(clave, {}).get("p", []):
        propios.setdefault(nom, {"s": texto_p})

    vistos_b, cola = {clave}, bases_resueltas(clave)
    while cola:
        b = cola.pop(0)
        if b in vistos_b:
            continue
        vistos_b.add(b)
        cola.extend(bases_resueltas(b))
        for nom, doc in docs_miembro.get(b, {}).items():
            if nom not in propios:
                propios[nom] = {**doc, "h": b}

# una sola arista por par+clase; 'hereda'/'implementa' pisan a 'usa'/'depende'
prioridad = {"hereda": 0, "implementa": 1, "depende": 2, "usa": 3}
mejor: dict[tuple[str, str], tuple[str, list[str]]] = {}
for (de, a, clase_rel), vias in relaciones.items():
    par = (de, a)
    actual = mejor.get(par)
    if actual is None or prioridad[clase_rel] < prioridad[actual[0]]:
        mejor[par] = (clase_rel, sorted(vias))

aristas = [
    {"id": f"{de}->{a}", "de": de, "a": a, "tipo": clase_rel, "via": vias[:6]}
    for (de, a), (clase_rel, vias) in sorted(mejor.items())
]

# ------------------------------------------------------------------ layout

nombres = sorted(tipos, key=lambda c: (ORDEN.index(tipos[c]["capa"]), c))
idx = {n: i for i, n in enumerate(nombres)}
N = len(nombres)

CHAR_W = 7.6


def dims(clave: str) -> tuple[float, float]:
    t = tipos[clave]
    w = max(150.0, len(t["nombre"]) * CHAR_W + 40)
    h = 34 + min(len(t["miembros"]), 7) * 4.0 + 14
    return w, h


W = np.array([dims(n)[0] for n in nombres])
H = np.array([dims(n)[1] for n in nombres])

grados: dict[str, int] = defaultdict(int)
for e in aristas:
    grados[e["de"]] += 1
    grados[e["a"]] += 1

peso_capa: dict[tuple[str, str], float] = defaultdict(float)
for e in aristas:
    a, b = tipos[e["de"]]["capa"], tipos[e["a"]]["capa"]
    if a != b:
        peso_capa[tuple(sorted((a, b)))] += 1

# anclas: las capas se colocan en elipse ancha siguiendo el orden del flujo
RX, RY = 3450.0, 1560.0
anclas = {}
for i, c in enumerate(ORDEN):
    ang = 2 * math.pi * i / len(ORDEN) - math.pi / 2
    anclas[c] = (RX * math.cos(ang), RY * math.sin(ang))

radio_capa = {}
for c in ORDEN:
    area = sum(dims(n)[0] * dims(n)[1] for n in nombres if tipos[n]["capa"] == c)
    radio_capa[c] = math.sqrt(area / math.pi) * 1.15

# dentro de cada capa, un ancla por módulo: los tipos de Docentes gravitan
# juntos, aparte de los de Academia, y así con el resto.
grupos: dict[tuple[str, str], list[str]] = defaultdict(list)
for n in nombres:
    grupos[(tipos[n]["capa"], tipos[n]["modulo"])].append(n)

# por capa, los módulos ordenados de mayor a menor: el grande queda al centro
modulos_capa: dict[str, list[str]] = {
    c: sorted(
        {tipos[n]["modulo"] for n in nombres if tipos[n]["capa"] == c},
        key=lambda m: (-len(grupos[(c, m)]), m),
    )
    for c in ORDEN
}

radio_mod = {}
for (c, m), ids in grupos.items():
    area = sum(dims(n)[0] * dims(n)[1] for n in ids)
    radio_mod[(c, m)] = math.sqrt(area / math.pi) * 1.2

anclas_mod = {}
for c in ORDEN:
    ms = modulos_capa[c]
    ax, ay = anclas[c]
    if len(ms) == 1:
        anclas_mod[(c, ms[0])] = (ax, ay)
        continue
    # anillo cuyo perímetro da sitio a todos los módulos sin solaparse
    anillo = sum(2 * radio_mod[(c, m)] for m in ms) / (2 * math.pi) * 1.25
    for k, m in enumerate(ms):
        ang = 2 * math.pi * k / len(ms) - math.pi / 2
        anclas_mod[(c, m)] = (ax + anillo * math.cos(ang), ay + anillo * math.sin(ang))

rng = np.random.default_rng(7)
pos = np.zeros((N, 2))
cuenta: dict[tuple[str, str], int] = defaultdict(int)
for i, n in enumerate(nombres):
    clave_g = (tipos[n]["capa"], tipos[n]["modulo"])
    total_g = len(grupos[clave_g])
    k = cuenta[clave_g]
    cuenta[clave_g] += 1
    ang = 2 * math.pi * k / max(total_g, 1)
    r = radio_mod[clave_g] * (0.35 if total_g <= 4 else 0.68)
    ax, ay = anclas_mod[clave_g]
    pos[i] = [ax + r * math.cos(ang) + rng.uniform(-30, 30),
              ay + r * math.sin(ang) + rng.uniform(-30, 30)]

capa_de = np.array([ORDEN.index(tipos[n]["capa"]) for n in nombres])
claves_mod = sorted(grupos)
mod_idx = {k: i for i, k in enumerate(claves_mod)}
mod_de = np.array([mod_idx[(tipos[n]["capa"], tipos[n]["modulo"])] for n in nombres])
anc = np.array([anclas_mod[(tipos[n]["capa"], tipos[n]["modulo"])] for n in nombres])
hol = np.array([radio_mod[(tipos[n]["capa"], tipos[n]["modulo"])] for n in nombres])

pares = [(idx[e["de"]], idx[e["a"]]) for e in aristas if e["de"] != e["a"]]
EI = np.array([p[0] for p in pares])
EJ = np.array([p[1] for p in pares])
misma_capa_ar = capa_de[EI] == capa_de[EJ]
mismo_mod_ar = mod_de[EI] == mod_de[EJ]
ideal = np.where(mismo_mod_ar, 175.0, np.where(misma_capa_ar, 330.0, 520.0))
fuerza_arista = np.where(mismo_mod_ar, 1.0, np.where(misma_capa_ar, 0.45, 0.14))

K_REP, K_ATR, K_ANCLA = 52000.0, 0.006, 0.085
ITERS = 1400
for it in range(ITERS):
    t = 1.0 - it / ITERS
    d = pos[:, None, :] - pos[None, :, :]
    d2 = (d ** 2).sum(-1) + 0.01
    np.fill_diagonal(d2, np.inf)
    mult = np.where(
        mod_de[:, None] == mod_de[None, :],
        1.0,
        np.where(capa_de[:, None] == capa_de[None, :], 1.9, 3.2),
    )
    f = (K_REP * mult / d2 / np.sqrt(d2))[:, :, None] * d
    fuerzas = f.sum(1)

    dv = pos[EJ] - pos[EI]
    dist = np.hypot(dv[:, 0], dv[:, 1]) + 0.01
    fa = (K_ATR * (dist - ideal) * fuerza_arista / dist * 0.5)[:, None] * dv
    np.add.at(fuerzas, EI, fa)
    np.add.at(fuerzas, EJ, -fa)

    da = anc - pos
    dist_a = np.hypot(da[:, 0], da[:, 1]) + 1e-6
    fuera = dist_a > hol
    fuerzas += np.where(fuera[:, None], da * (K_ANCLA * (dist_a - hol) / dist_a)[:, None], 0)

    lim = 26.0 * t + 1.5
    norma = np.hypot(fuerzas[:, 0], fuerzas[:, 1]) + 1e-9
    escala = np.minimum(1.0, lim / norma)
    pos += fuerzas * escala[:, None]

# separación de rectángulos
PAD_X, PAD_Y = 26.0, 20.0
for _ in range(600):
    movio = False
    dx = pos[:, 0][:, None] - pos[:, 0][None, :]
    dy = pos[:, 1][:, None] - pos[:, 1][None, :]
    solX = (W[:, None] + W[None, :]) / 2 + PAD_X - np.abs(dx)
    solY = (H[:, None] + H[None, :]) / 2 + PAD_Y - np.abs(dy)
    choque = (solX > 0) & (solY > 0)
    np.fill_diagonal(choque, False)
    if not choque.any():
        break
    movio = True
    horizontal = choque & (solX < solY)
    vertical = choque & ~(solX < solY)
    sx = np.where(horizontal, np.copysign(solX / 2 + 0.5, np.where(dx == 0, 1.0, dx)), 0.0)
    sy = np.where(vertical, np.copysign(solY / 2 + 0.5, np.where(dy == 0, 1.0, dy)), 0.0)
    pos[:, 0] += sx.sum(1) / np.maximum(choque.sum(1), 1)
    pos[:, 1] += sy.sum(1) / np.maximum(choque.sum(1), 1)
    if not movio:
        break

# empaquetado de clusters, en dos niveles: primero los módulos dentro de su
# capa, luego las capas entre sí. Cada bloque se mueve rígido, en filas, y así
# el lienzo queda compacto con la proporción de una pantalla.
GAP = 130.0
GAP_MOD = 76.0
ASPECTO = 4.6
ASPECTO_MOD = 1.5


def caja_de(ids: list[int]) -> tuple[float, float, float, float]:
    return (
        (pos[ids, 0] - W[ids] / 2).min(), (pos[ids, 1] - H[ids] / 2).min(),
        (pos[ids, 0] + W[ids] / 2).max(), (pos[ids, 1] + H[ids] / 2).max(),
    )


def empaquetar(cajas: list[tuple], gap: float, aspecto: float) -> dict:
    """Coloca cajas (clave, x0, y0, x1, y1) en filas; devuelve clave -> esquina."""
    area_total = sum((x1 - x0) * (y1 - y0) for _, x0, y0, x1, y1 in cajas)
    ancho_objetivo = math.sqrt(area_total * aspecto) * 0.92

    filas: list[list[tuple]] = [[]]
    ancho_fila = 0.0
    for caja in cajas:
        w_c = caja[3] - caja[1]
        if filas[-1] and ancho_fila + gap + w_c > ancho_objetivo:
            filas.append([])
            ancho_fila = 0.0
        filas[-1].append(caja)
        ancho_fila += (gap if len(filas[-1]) > 1 else 0.0) + w_c

    anchos = [
        sum(c[3] - c[1] for c in fila) + gap * (len(fila) - 1) for fila in filas
    ]
    ancho_max = max(anchos)

    destino = {}
    cursor_y = 0.0
    for fila, ancho in zip(filas, anchos):
        # cada fila se centra: así el bloque que sobra no descuadra el conjunto
        cursor_x = (ancho_max - ancho) / 2
        alto_fila = max(c[4] - c[2] for c in fila)
        for clave, x0, y0, x1, y1 in fila:
            # dentro de la fila, los bloques bajos se centran verticalmente
            destino[clave] = (cursor_x, cursor_y + (alto_fila - (y1 - y0)) / 2)
            cursor_x += (x1 - x0) + gap
        cursor_y += alto_fila + gap
    return destino


indices_mod = {k: [idx[n] for n in ids] for k, ids in grupos.items()}
indices_capa = {c: [i for i in range(N) if tipos[nombres[i]]["capa"] == c] for c in ORDEN}

# nivel 1: los módulos de cada capa, del mayor al menor
for c in ORDEN:
    ms = modulos_capa[c]
    if len(ms) < 2:
        continue
    cajas = [((c, m), *caja_de(indices_mod[(c, m)])) for m in ms]
    destino_mod = empaquetar(cajas, GAP_MOD, ASPECTO_MOD)
    for clave, x0, y0, _, _ in cajas:
        dx, dy = destino_mod[clave][0] - x0, destino_mod[clave][1] - y0
        pos[indices_mod[clave], 0] += dx
        pos[indices_mod[clave], 1] += dy

# nivel 2: las capas, en el orden del flujo (dominio → contratos → … → blazor)
caja_capa = {c: caja_de(indices_capa[c]) for c in ORDEN}
destino = empaquetar([(c, *caja_capa[c]) for c in ORDEN], GAP, ASPECTO)

for c in ORDEN:
    x0, y0, _, _ = caja_capa[c]
    dx, dy = destino[c][0] - x0, destino[c][1] - y0
    pos[indices_capa[c], 0] += dx
    pos[indices_capa[c], 1] += dy

minx = (pos[:, 0] - W / 2).min()
miny = (pos[:, 1] - H / 2).min()
M = 70.0
pos[:, 0] += M - minx
pos[:, 1] += M - miny
ancho = (pos[:, 0] + W / 2).max() + M
alto = (pos[:, 1] + H / 2).max() + M

REG_PAD = 34.0
MOD_PAD = 15.0


def envolver(ids: list[int], pad: float) -> tuple[float, float, float, float]:
    x0 = min(pos[i][0] - W[i] / 2 for i in ids) - pad
    y0 = min(pos[i][1] - H[i] / 2 for i in ids) - pad
    x1 = max(pos[i][0] + W[i] / 2 for i in ids) + pad
    y1 = max(pos[i][1] + H[i] / 2 for i in ids) + pad
    return (x0, y0, x1 - x0, y1 - y0)


regiones = {c: envolver(indices_capa[c], REG_PAD) for c in ORDEN}
# subregión por módulo; en las capas de un solo módulo no aporta nada
regiones_mod = {
    (c, m): envolver(indices_mod[(c, m)], MOD_PAD)
    for c in ORDEN
    for m in modulos_capa[c]
    if len(modulos_capa[c]) > 1
}

# ------------------------------------------------------------------ salida


def esc(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


def r(v) -> float:
    return round(float(v), 1)


KIND = {"class": "clase", "record": "record", "record struct": "record",
        "interface": "interfaz", "struct": "struct", "enum": "enum"}

lineas: list[str] = []
lineas.append("// GENERADO — no editar a mano.")
lineas.append("// Fuente: Horarios-develop/src/**/*.cs · script: scripts/gen-clases.py")
lineas.append(f"// {N} tipos · {len(aristas)} relaciones\n")
lineas.append("export type CapaId =")
lineas.append("  | " + "\n  | ".join(f"'{c}'" for c in ORDEN) + ";\n")
lineas.append("""export type TipoClase = 'clase' | 'record' | 'interfaz' | 'enum' | 'struct';
export type TipoRelacion = 'hereda' | 'implementa' | 'depende' | 'usa';

export interface Miembro {
  /** Nombre; en métodos incluye la firma abreviada. */
  n: string;
  /** Tipo devuelto o del campo. Vacío en los valores de un enum. */
  t: string;
  k: 'prop' | 'metodo' | 'valor';
  /** Miembro estático. */
  est: boolean;
}

export interface Clase {
  /** Nombre completo con namespace: identificador único. */
  id: string;
  nombre: string;
  ns: string;
  capa: CapaId;
  /** Módulo funcional dentro de la capa: Academia, Docentes, Aulas… */
  modulo: string;
  kind: TipoClase;
  abst: boolean;
  /** Ruta del archivo dentro de src/. */
  archivo: string;
  x: number;
  y: number;
  w: number;
  h: number;
  grado: number;
  miembros: Miembro[];
}

export interface Relacion {
  id: string;
  de: string;
  a: string;
  tipo: TipoRelacion;
  /** Miembros o bases que motivan la relación. */
  via: string[];
}

export interface Capa {
  id: CapaId;
  label: string;
  descripcion: string;
  color: string;
  clases: number;
  /** Caja envolvente del cluster en el lienzo. */
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Subregión dentro de una capa: los tipos de un mismo módulo funcional. */
export interface Modulo {
  id: string;
  capa: CapaId;
  label: string;
  clases: number;
  x: number;
  y: number;
  w: number;
  h: number;
}
""")

lineas.append("export const CAPAS: Capa[] = [")
for c in ORDEN:
    label, desc, color = META[c]
    cnt = sum(1 for n in nombres if tipos[n]["capa"] == c)
    rx, ry, rw, rh = regiones[c]
    lineas.append(
        f"  {{ id: '{c}', label: '{esc(label)}', descripcion: '{esc(desc)}', color: '{color}',"
        f" clases: {cnt}, x: {r(rx)}, y: {r(ry)}, w: {r(rw)}, h: {r(rh)} }},"
    )
lineas.append("];\n")

lineas.append("export const MODULOS: Modulo[] = [")
for c in ORDEN:
    for m in modulos_capa[c]:
        if (c, m) not in regiones_mod:
            continue
        rx, ry, rw, rh = regiones_mod[(c, m)]
        lineas.append(
            f"  {{ id: '{c}:{esc(m)}', capa: '{c}', label: '{esc(m)}',"
            f" clases: {len(grupos[(c, m)])}, x: {r(rx)}, y: {r(ry)}, w: {r(rw)}, h: {r(rh)} }},"
        )
lineas.append("];\n")

lineas.append("export const CLASES: Clase[] = [")
for i, n in enumerate(nombres):
    t = tipos[n]
    lineas.append("  {")
    lineas.append(f"    id: '{esc(n)}', nombre: '{esc(t['nombre'])}', ns: '{esc(t['ns'])}',")
    lineas.append(
        f"    capa: '{t['capa']}', modulo: '{esc(t['modulo'])}', kind: '{KIND[t['kind']]}',"
        f" abst: {str(t['abst']).lower()},"
        f" archivo: '{esc(t['archivo'])}',"
    )
    lineas.append(f"    x: {r(pos[i][0])}, y: {r(pos[i][1])}, w: {r(W[i])}, h: {r(H[i])}, grado: {grados[n]},")
    lineas.append("    miembros: [")
    for m in t["miembros"]:
        lineas.append(
            f"      {{ n: '{esc(m['n'])}', t: '{esc(m['t'])}', k: '{m['k']}',"
            f" est: {str(m['est']).lower()} }},"
        )
    lineas.append("    ],")
    lineas.append("  },")
lineas.append("];\n")

lineas.append("export const RELACIONES: Relacion[] = [")
for e in aristas:
    via = ", ".join(f"'{esc(v)}'" for v in e["via"])
    lineas.append(
        f"  {{ id: '{esc(e['id'])}', de: '{esc(e['de'])}', a: '{esc(e['a'])}',"
        f" tipo: '{e['tipo']}', via: [{via}] }},"
    )
lineas.append("];\n")

lineas.append(f"export const LIENZO = {{ ancho: {r(ancho)}, alto: {r(alto)} }};")
lineas.append(f"export const TOTAL_MIEMBROS = {sum(len(t['miembros']) for t in tipos.values())};")
lineas.append(f"export const TOTAL_RELACIONES = {len(aristas)};")

OUT.write_text("\n".join(lineas) + "\n", encoding="utf-8")
print(f"OK {N} tipos, {len(aristas)} relaciones, lienzo {r(ancho)}x{r(alto)} -> {OUT}")

# ------------------------------------------------------- salida: documentación
#
# La doc va en su propio archivo, no en clases-data.ts: el grafo se pinta sin
# ella y son cientos de miles de caracteres de prosa. Así el paquete que arranca
# la slide no crece y el navegador solo se trae los textos cuando hacen falta.
# Un miembro que hereda la doc de su puerto se emite como referencia al puerto
# (h), no como copia del texto.


def cad(s: str) -> str:
    """Cadena JS de una línea: los saltos de párrafo viajan como \\n."""
    return "'" + (
        s.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n")
    ) + "'"


def pares(items) -> str:
    return "[" + ", ".join(f"[{cad(a)}, {cad(b)}]" for a, b in items) + "]"


def campos_miembro(doc: dict) -> str:
    """Los campos con contenido, en orden de lectura."""
    partes = []
    if doc.get("h"):                              # doc del puerto: solo la referencia
        partes.append(f"h: {cad(doc['h'])}")
        return "{ " + ", ".join(partes) + " }"
    if doc.get("f"):
        partes.append(f"f: {cad(doc['f'])}")
    if doc.get("s"):
        partes.append(f"s: {cad(doc['s'])}")
    if doc.get("p"):
        partes.append(f"p: {pares(doc['p'])}")
    if doc.get("e"):
        partes.append(f"e: {pares(doc['e'])}")
    if doc.get("r"):
        partes.append(f"r: {cad(doc['r'])}")
    if doc.get("l"):
        partes.append(f"l: {doc['l']}")
    return "{ " + ", ".join(partes) + " }"


docs_lineas: list[str] = []
docs_lineas.append("// GENERADO — no editar a mano.")
docs_lineas.append("// Fuente: los comentarios /// de Horarios-develop/src/**/*.cs")
docs_lineas.append("// script: scripts/gen-clases.py\n")
docs_lineas.append("""/** Documentación de un miembro, tal como la escribió quien lo programó. */
export interface DocMiembro {
  /** Firma declarada, en una línea. */
  f?: string;
  /** Resumen. Los párrafos van separados por un salto de línea. */
  s?: string;
  /** [nombre, explicación] de cada parámetro documentado. */
  p?: [string, string][];
  /** [excepción, cuándo se lanza]. */
  e?: [string, string][];
  /** Qué devuelve. */
  r?: string;
  /** Línea del archivo donde empieza la declaración. */
  l?: number;
  /**
   * El miembro no se documenta aquí: hereda la doc del tipo indicado, que es
   * donde vive la explicación (el puerto, no el adaptador).
   */
  h?: string;
}

export interface DocClase {
  s?: string;
  /** Por nombre de miembro, sin la lista de parámetros. */
  m?: Record<string, DocMiembro>;
}
""")

docs_lineas.append("export const DOCS: Record<string, DocClase> = {")
n_clases_doc = n_miembros_doc = 0
for n in nombres:
    dt = docs_tipo.get(n, {})
    resumen = dt.get("s", "")
    # solo lo que el diagrama enseña: un /// mal atado (una palabra suelta de la
    # doc de un enum, por ejemplo) no tiene fila donde mostrarse
    filas = {m["n"].split("(")[0] for m in tipos[n]["miembros"]}
    miembros_doc = {
        nom: d
        for nom, d in sorted(docs_miembro.get(n, {}).items())
        if nom in filas and (d.get("s") or d.get("p") or d.get("e") or d.get("r") or d.get("h"))
    }
    if not resumen and not miembros_doc:
        continue
    n_clases_doc += 1
    n_miembros_doc += len(miembros_doc)
    docs_lineas.append(f"  {cad(n)}: {{")
    if resumen:
        docs_lineas.append(f"    s: {cad(resumen)},")
    if miembros_doc:
        docs_lineas.append("    m: {")
        for nom, d in miembros_doc.items():
            docs_lineas.append(f"      {cad(nom)}: {campos_miembro(d)},")
        docs_lineas.append("    },")
    docs_lineas.append("  },")
docs_lineas.append("};\n")
docs_lineas.append(f"export const TOTAL_CLASES_DOC = {n_clases_doc};")
docs_lineas.append(f"export const TOTAL_MIEMBROS_DOC = {n_miembros_doc};")

OUT_DOCS.write_text("\n".join(docs_lineas) + "\n", encoding="utf-8")
print(f"OK doc de {n_clases_doc} tipos y {n_miembros_doc} miembros -> {OUT_DOCS}")
