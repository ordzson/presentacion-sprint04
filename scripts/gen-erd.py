#!/usr/bin/env python3
"""Parsea docs/database.sql y genera src/app/data/erd-data.ts con layout precalculado.

El volcado es un `pg_dump` (PostgreSQL 17.6): entrecomilla todos los
identificadores y usa `CREATE TABLE IF NOT EXISTS`, así que el parseo tolera
comillas en nombres de esquema, tabla, columna y tipo.
"""
import math
import random
import re
from collections import defaultdict
from pathlib import Path

FUENTE = Path("/home/ordson/Documentos/Universidad/HORARIOS/Horarios-develop")
SQL = FUENTE / "docs" / "database.sql"
OUT = Path(__file__).resolve().parent.parent / "src" / "app" / "data" / "erd-data.ts"

DOMINIOS = {
    "academico": [
        "facultades", "carreras", "pensums", "cursos", "cursos_en_pensum",
        "curso_comun", "curso_comun_cursos", "cohortes", "cohorte_periodos",
        "periodos_academicos", "jornadas", "jornada_descansos", "carrera_jornadas",
        "agrupaciones_area_comun", "agrupacion_area_comun_cursos",
        "agrupacion_area_comun_cohortes",
    ],
    "infraestructura": ["aulas", "recursos", "aula_recursos", "curso_recursos_requeridos"],
    "docentes": [
        "docentes", "docente_facultades", "asignaciones_docente_curso",
        "disponibilidades_docente", "disponibilidad_docente_slots",
        "ventanas_disponibilidad", "eventos_sustitucion",
    ],
    "motor": [
        "configuraciones_motor", "configuracion_motor_restricciones", "restricciones_horario",
        "generaciones", "mensajes_generacion", "sesiones_no_asignadas", "sugerencias_seccion",
        "plan_carreras", "plan_jornadas",
    ],
    "horarios": [
        "horarios", "versiones_horario", "historial_estados_horario", "sesiones",
        "sesion_cohortes", "conflictos", "conflicto_sesiones", "resultados_edicion",
        "resultado_edicion_conflictos", "cambios_detectados",
    ],
    "importacion": ["importaciones", "importacion_errores", "plantillas_importacion"],
    "seguridad": ["usuarios", "roles", "permisos_acceso", "rol_permisos", "usuario_roles",
                  "usuario_facultades"],
    "operacion": ["notificaciones", "plantillas_notificacion", "auditoria", "reportes"],
}
DOM_DE = {t: d for d, ts in DOMINIOS.items() for t in ts}

# ------------------------------------------------------------------ parseo

sql = SQL.read_text(encoding="utf-8")

# `"horarios"."tabla"` o `horarios.tabla`: el volcado entrecomilla, los scripts
# escritos a mano no.
def q(nombre):
    return r'"?' + nombre + r'"?'

CAL = q("horarios") + r"\." + q(r"(\w+)")

enums = set(re.findall(r"CREATE TYPE " + CAL + r" AS ENUM", sql))

def limpia_tipo(t):
    t = re.sub(r'"(\w+)"', r"\1", t).strip()
    t = re.sub(r"\bhorarios\.", "", t)
    t = t.replace("character varying", "varchar")
    t = t.replace("timestamp with time zone", "timestamptz")
    t = t.replace("timestamp without time zone", "timestamp")
    t = t.replace("double precision", "float8")
    return t.strip()

tablas = {}
for m in re.finditer(
    r"CREATE TABLE (?:IF NOT EXISTS )?" + CAL + r" \((.*?)\n\);", sql, re.S
):
    nombre, cuerpo = m.group(1), m.group(2)
    cols = []
    for linea in cuerpo.split("\n"):
        linea = linea.strip().rstrip(",")
        # el volcado mete los CHECK dentro del cuerpo; no son columnas
        if not linea or linea.startswith("CONSTRAINT") or linea.startswith("CHECK"):
            continue
        partes = re.match(r'"?(\w+)"?\s+(.*)$', linea)
        if not partes:
            continue
        col, resto = partes.group(1), partes.group(2)
        nn = "NOT NULL" in resto
        generada = "GENERATED ALWAYS" in resto
        tipo = re.split(r"\s+(?:DEFAULT|NOT NULL|GENERATED|COLLATE)\b", resto)[0]
        tipo = limpia_tipo(tipo)
        cols.append({"n": col, "t": tipo, "nn": nn, "gen": generada,
                     "enum": tipo.split("(")[0] in enums})
    tablas[nombre] = {"cols": cols, "pk": [], "fks": []}

def desentrecomilla(lista):
    return [c.strip().strip('"') for c in lista.split(",")]

for m in re.finditer(
    r"ALTER TABLE ONLY " + CAL + r"\s*\n\s*ADD CONSTRAINT \"?\w+\"? PRIMARY KEY \(([^)]+)\);", sql
):
    if m.group(1) in tablas:
        tablas[m.group(1)]["pk"] = desentrecomilla(m.group(2))

externas = []
for m in re.finditer(
    r"ALTER TABLE ONLY " + CAL + r"\s*\n\s*ADD CONSTRAINT \"?\w+\"? FOREIGN KEY \(([^)]+)\)"
    r' REFERENCES (?!"?horarios"?\.)"?(\w+)"?\."?(\w+)"?\(', sql
):
    externas.append({"de": m.group(1), "col": desentrecomilla(m.group(2))[0],
                     "esquema": m.group(3), "tabla": m.group(4)})

aristas = []
for m in re.finditer(
    r"ALTER TABLE ONLY " + CAL + r"\s*\n\s*ADD CONSTRAINT \"?(\w+)\"? FOREIGN KEY \(([^)]+)\)"
    r" REFERENCES " + CAL + r"\(([^)]+)\)([^;]*);", sql
):
    origen, constraint, cols, destino, _, cola = m.groups()
    onde = re.search(r"ON DELETE (CASCADE|RESTRICT|SET NULL|SET DEFAULT|NO ACTION)", cola)
    cols = desentrecomilla(cols)
    if origen in tablas:
        tablas[origen]["fks"].extend(cols)
    aristas.append({"id": constraint, "de": origen, "a": destino, "cols": cols,
                    "onDelete": onde.group(1) if onde else "NO ACTION"})

faltan = [t for t in tablas if t not in DOM_DE]
if faltan:
    raise SystemExit(f"SIN DOMINIO: {faltan} — clasifícalas en DOMINIOS antes de generar")
sueltas = [t for d in DOMINIOS.values() for t in d if t not in tablas]
if sueltas:
    raise SystemExit(f"EN MAPA PERO NO EN SQL: {sueltas} — el volcado ya no las trae")

# ------------------------------------------------------------------ layout

nombres = sorted(tablas)
idx = {n: i for i, n in enumerate(nombres)}
N = len(nombres)

CHAR_W = 7.4
def dims(n):
    filas = len(tablas[n]["cols"])
    w = max(150.0, len(n) * CHAR_W + 34)
    h = 34 + min(filas, 7) * 4.0 + 14      # cabecera + banda proporcional a columnas
    return w, h

W = [dims(n)[0] for n in nombres]
H = [dims(n)[1] for n in nombres]

grados = defaultdict(int)
for e in aristas:
    grados[e["de"]] += 1
    grados[e["a"]] += 1

orden_dom = ["academico", "infraestructura", "docentes", "motor", "horarios",
             "importacion", "seguridad", "operacion"]

# --- anclas de dominio: cubo central + resto en elipse ancha ---------------
# La elipse es mucho mas ancha que alta para que el lienzo tenga la proporcion
# de una pantalla de presentacion y "Ajustar" no desperdicie los laterales.

peso_dom = defaultdict(float)
for e in aristas:
    a, b = DOM_DE[e["de"]], DOM_DE[e["a"]]
    if a != b:
        peso_dom[tuple(sorted((a, b)))] += 1

def w_dom(a, b):
    return peso_dom.get(tuple(sorted((a, b))), 0.0)

# el dominio con mas relaciones cruzadas va al centro: es el eje de lectura
grado_dom = {d: sum(w_dom(d, o) for o in orden_dom if o != d) for d in orden_dom}
centro = max(orden_dom, key=lambda d: grado_dom[d])
anillo = [d for d in orden_dom if d != centro]

# orden en la elipse por fuerza bruta: minimiza peso x distancia angular
def coste(perm):
    k = len(perm)
    total = 0.0
    for i in range(k):
        for j in range(i + 1, k):
            salto = min(j - i, k - (j - i))
            total += w_dom(perm[i], perm[j]) * salto
    return total

mejor = min(
    ([anillo[0]] + list(p) for p in __import__("itertools").permutations(anillo[1:])),
    key=coste,
)

RX, RY = 1980.0, 520.0
anclas = {centro: (0.0, 0.0)}
for i, d in enumerate(mejor):
    ang = 2 * math.pi * i / len(mejor) - math.pi / 2
    anclas[d] = (RX * math.cos(ang), RY * math.sin(ang))

# radio propio de cada cluster, por area de sus tablas
radio_dom = {}
for d in orden_dom:
    area = sum(dims(n)[0] * dims(n)[1] for n in nombres if DOM_DE[n] == d)
    radio_dom[d] = math.sqrt(area / math.pi) * 1.6

rnd = random.Random(7)
pos = []
cuenta = defaultdict(int)
for n in nombres:
    d = DOM_DE[n]
    ax, ay = anclas[d]
    k = cuenta[d]
    cuenta[d] += 1
    total_d = sum(1 for m in nombres if DOM_DE[m] == d)
    ang = 2 * math.pi * k / max(total_d, 1)
    r = radio_dom[d] * (0.35 if total_d <= 4 else 0.7)
    pos.append([ax + r * math.cos(ang) + rnd.uniform(-30, 30),
                ay + r * math.sin(ang) + rnd.uniform(-30, 30)])

vecinos = defaultdict(list)
for e in aristas:
    if e["de"] in idx and e["a"] in idx and e["de"] != e["a"]:
        vecinos[idx[e["de"]]].append(idx[e["a"]])
        vecinos[idx[e["a"]]].append(idx[e["de"]])

K_REP, K_ATR, K_ANCLA = 46000.0, 0.006, 0.028
ITERS = 1600
for it in range(ITERS):
    t = 1.0 - it / ITERS
    fx = [0.0] * N
    fy = [0.0] * N
    for i in range(N):
        for j in range(i + 1, N):
            dx = pos[i][0] - pos[j][0]
            dy = pos[i][1] - pos[j][1]
            d2 = dx * dx + dy * dy + 0.01
            # repulsion mas fuerte entre dominios distintos: separa los clusters
            mult = 1.0 if DOM_DE[nombres[i]] == DOM_DE[nombres[j]] else 2.4
            f = K_REP * mult / d2
            d = math.sqrt(d2)
            fx[i] += f * dx / d; fy[i] += f * dy / d
            fx[j] -= f * dx / d; fy[j] -= f * dy / d
    for i in range(N):
        for j in vecinos[i]:
            dx = pos[j][0] - pos[i][0]
            dy = pos[j][1] - pos[i][1]
            d = math.hypot(dx, dy) + 0.01
            # las FK entre dominios tiran menos: si no, deshacen los clusters
            mismo = DOM_DE[nombres[i]] == DOM_DE[nombres[j]]
            ideal = 175.0 if mismo else 340.0
            f = K_ATR * (d - ideal) * (1.0 if mismo else 0.28)
            fx[i] += f * dx / d * 0.5
            fy[i] += f * dy / d * 0.5
    # el tiron al ancla domina: mantiene cada dominio en su region de la elipse
    for i in range(N):
        ax, ay = anclas[DOM_DE[nombres[i]]]
        dx = ax - pos[i][0]
        dy = ay - pos[i][1]
        d = math.hypot(dx, dy)
        holgura = radio_dom[DOM_DE[nombres[i]]]
        if d > holgura:
            k = K_ANCLA * (d - holgura) / d
            fx[i] += dx * k
            fy[i] += dy * k
    lim = 26.0 * t + 1.5
    for i in range(N):
        d = math.hypot(fx[i], fy[i])
        if d > lim:
            fx[i] *= lim / d; fy[i] *= lim / d
        pos[i][0] += fx[i]
        pos[i][1] += fy[i]

# separacion de rectangulos: empuja hasta que no se solapen
PAD_X, PAD_Y = 26.0, 22.0
for _ in range(320):
    movio = False
    for i in range(N):
        for j in range(i + 1, N):
            dx = pos[j][0] - pos[i][0]
            dy = pos[j][1] - pos[i][1]
            solX = (W[i] + W[j]) / 2 + PAD_X - abs(dx)
            solY = (H[i] + H[j]) / 2 + PAD_Y - abs(dy)
            if solX > 0 and solY > 0:
                movio = True
                if solX < solY:
                    s = math.copysign(solX / 2 + 0.5, dx or 1)
                    pos[i][0] -= s; pos[j][0] += s
                else:
                    s = math.copysign(solY / 2 + 0.5, dy or 1)
                    pos[i][1] -= s; pos[j][1] += s
    if not movio:
        break

minx = min(pos[i][0] - W[i] / 2 for i in range(N))
miny = min(pos[i][1] - H[i] / 2 for i in range(N))
M = 70.0
for p in pos:
    p[0] += M - minx
    p[1] += M - miny
ancho = max(pos[i][0] + W[i] / 2 for i in range(N)) + M
alto = max(pos[i][1] + H[i] / 2 for i in range(N)) + M

# region envolvente de cada dominio: se pinta detras del grafo como telon de
# fondo, para que alejado se lea la arquitectura y no una maraña de cajas
REG_PAD = 34.0
regiones = {}
for d in orden_dom:
    ids = [i for i in range(N) if DOM_DE[nombres[i]] == d]
    x0 = min(pos[i][0] - W[i] / 2 for i in ids) - REG_PAD
    y0 = min(pos[i][1] - H[i] / 2 for i in ids) - REG_PAD
    x1 = max(pos[i][0] + W[i] / 2 for i in ids) + REG_PAD
    y1 = max(pos[i][1] + H[i] / 2 for i in ids) + REG_PAD
    regiones[d] = (x0, y0, x1 - x0, y1 - y0)

# ------------------------------------------------------------------ salida

def esc(s):
    return s.replace("\\", "\\\\").replace("'", "\\'")

def r(v):
    return round(v, 1)

META = {
    "academico":      ("Académico",       "Catálogo institucional: facultades, carreras, pensums, cursos, cohortes y calendario.", "#3f6fd6"),
    "infraestructura":("Infraestructura", "Aulas, recursos físicos y los requisitos de recurso que exige cada curso.",             "#2a9468"),
    "docentes":       ("Docentes",        "Plantilla docente, asignación a cursos, disponibilidad declarada y sustituciones.",     "#b5791b"),
    "motor":          ("Motor",           "Configuración del generador, restricciones, planes y trazas de cada corrida.",          "#8b52d9"),
    "horarios":       ("Horarios",        "Resultado: horarios, versiones, sesiones ubicadas y sus conflictos.",                   "#c2504b"),
    "importacion":    ("Importación",     "Cargas masivas desde archivo, plantillas y errores por fila.",                          "#0f8a94"),
    "seguridad":      ("Seguridad",       "Usuarios, roles, permisos y alcance por facultad.",                                     "#5a6474"),
    "operacion":      ("Operación",       "Notificaciones, reportes y bitácora de auditoría.",                                     "#a1568c"),
}

lineas = []
lineas.append("// GENERADO — no editar a mano.")
lineas.append("// Fuente: docs/database.sql · script: scripts/gen-erd.py")
lineas.append(f"// {N} tablas · {len(aristas)} claves foráneas\n")
lineas.append("export type DominioId =")
lineas.append("  | " + "\n  | ".join(f"'{d}'" for d in orden_dom) + ";\n")
lineas.append("""export interface Columna {
  n: string;
  t: string;
  pk: boolean;
  fk: boolean;
  nn: boolean;
  gen: boolean;
  enum: boolean;
}

export interface Tabla {
  id: string;
  dominio: DominioId;
  x: number;
  y: number;
  w: number;
  h: number;
  grado: number;
  cols: Columna[];
}

export interface Relacion {
  /** Nombre de la constraint: identificador estable y único. */
  id: string;
  de: string;
  a: string;
  cols: string[];
  onDelete: string;
}

export interface Dominio {
  id: DominioId;
  label: string;
  descripcion: string;
  color: string;
  tablas: number;
  /** Caja envolvente del cluster en el lienzo. */
  x: number;
  y: number;
  w: number;
  h: number;
}
""")

lineas.append("export const DOMINIOS: Dominio[] = [")
for d in orden_dom:
    label, desc, color = META[d]
    cnt = sum(1 for n in nombres if DOM_DE[n] == d)
    rx, ry, rw, rh = regiones[d]
    lineas.append(
        f"  {{ id: '{d}', label: '{esc(label)}', descripcion: '{esc(desc)}', color: '{color}',"
        f" tablas: {cnt}, x: {r(rx)}, y: {r(ry)}, w: {r(rw)}, h: {r(rh)} }},"
    )
lineas.append("];\n")

lineas.append("export const TABLAS: Tabla[] = [")
for i, n in enumerate(nombres):
    t = tablas[n]
    pkset, fkset = set(t["pk"]), set(t["fks"])
    lineas.append(f"  {{")
    lineas.append(f"    id: '{n}', dominio: '{DOM_DE[n]}',")
    lineas.append(f"    x: {r(pos[i][0])}, y: {r(pos[i][1])}, w: {r(W[i])}, h: {r(H[i])}, grado: {grados[n]},")
    lineas.append(f"    cols: [")
    for c in t["cols"]:
        lineas.append(
            f"      {{ n: '{c['n']}', t: '{esc(c['t'])}', pk: {str(c['n'] in pkset).lower()},"
            f" fk: {str(c['n'] in fkset).lower()}, nn: {str(c['nn']).lower()},"
            f" gen: {str(c['gen']).lower()}, enum: {str(c['enum']).lower()} }},"
        )
    lineas.append(f"    ],")
    lineas.append(f"  }},")
lineas.append("];\n")

lineas.append("export const RELACIONES: Relacion[] = [")
for e in sorted(aristas, key=lambda x: (x["de"], x["a"])):
    cols = ", ".join(f"'{c}'" for c in e["cols"])
    lineas.append(f"  {{ id: '{e['id']}', de: '{e['de']}', a: '{e['a']}', cols: [{cols}], onDelete: '{e['onDelete']}' }},")
lineas.append("];\n")

lineas.append("/** FK que salen del esquema `horarios` (no se dibujan en el grafo). */")
lineas.append("export const REFERENCIAS_EXTERNAS: { de: string; col: string; destino: string }[] = [")
for x in externas:
    lineas.append(f"  {{ de: '{x['de']}', col: '{x['col']}', destino: '{x['esquema']}.{x['tabla']}' }},")
lineas.append("];\n")

lineas.append(f"export const LIENZO = {{ ancho: {r(ancho)}, alto: {r(alto)} }};")
lineas.append(f"export const TOTAL_COLUMNAS = {sum(len(t['cols']) for t in tablas.values())};")
lineas.append(f"export const TOTAL_FK = {len(aristas) + len(externas)};")

OUT.write_text("\n".join(lineas) + "\n", encoding="utf-8")
print(f"OK {N} tablas, {len(aristas)} FK, lienzo {r(ancho)}x{r(alto)} -> {OUT}")
