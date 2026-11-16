#!/usr/bin/env node
/**
 * Parsea docs/esquema-app.sql (export de Supabase, esquema `public`) y genera
 * src/app/data/erd-app-data.ts con layout precalculado. Misma salida que
 * gen-erd.py, pero para el esquema de la app de rutas.
 *
 * El export trae las FK dentro del CREATE TABLE; una FK compuesta aparece como
 * varias líneas con el mismo nombre y se funde en una sola relación.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SQL = join(RAIZ, 'docs', 'esquema-app.sql');
const OUT = join(RAIZ, 'src', 'app', 'data', 'erd-app-data.ts');

const DOMINIOS = {
  identidad: ['usuario', 'perfil_usuario', 'localizacion_usuario', 'nacionalidad', 'pais',
    'departamento', 'municipio', 'detalle_empleado', 'solicitud_eliminacion', 'medicion_corporal'],
  avatar: ['avatar_sexo', 'avatar_usuario', 'avatar_configuracion', 'avatar_recurso',
    'avatar_seleccion', 'avatar_item_recurso', 'avatar_equipamiento_accesorio'],
  tienda: ['categoria_item', 'item_tienda', 'inventario_usuario'],
  progreso: ['logro', 'usuario_logro', 'recompensa_logro', 'usuario_recompensa_logro',
    'aporte_recorrido', 'racha_usuario', 'racha_dia', 'racha_operacion'],
  rutas: ['routes', 'ruta_comunidad', 'comentario_ruta', 'valoracion_ruta'],
  moderacion: ['denuncia_comentario', 'denuncia_contenido', 'moderacion_permiso',
    'moderacion_comentario_auditoria', 'moderacion_contenido_auditoria', 'usuario_bloqueo',
    'admin_permiso', 'comunidad_normas_aceptacion', 'auditoria_admin'],
};
const META = {
  identidad: ['Identidad', 'Usuarios, perfil, ubicación geográfica, empleados y mediciones corporales.', '#3f6fd6'],
  avatar: ['Avatar', 'Catálogo de recursos gráficos y lo que cada usuario lleva puesto.', '#8b52d9'],
  tienda: ['Tienda', 'Ítems comprables, categorías e inventario de cada usuario.', '#b5791b'],
  progreso: ['Progreso', 'Logros, recompensas, rachas diarias y aportes de recorrido.', '#2a9468'],
  rutas: ['Rutas', 'Recorridos GPS, rutas de la comunidad, comentarios y valoraciones.', '#c2504b'],
  moderacion: ['Moderación', 'Denuncias, permisos, bloqueos y bitácoras de auditoría.', '#5a6474'],
};
const ordenDom = Object.keys(DOMINIOS);
const DOM_DE = {};
for (const [d, ts] of Object.entries(DOMINIOS)) for (const t of ts) DOM_DE[t] = d;

// ------------------------------------------------------------------ parseo

const sql = readFileSync(SQL, 'utf8').replace(/\r/g, '');

const limpiaTipo = (t) =>
  t.trim()
    .replace('character varying', 'varchar')
    .replace('timestamp with time zone', 'timestamptz')
    .replace('timestamp without time zone', 'timestamp')
    .replace('double precision', 'float8')
    .replace('USER-DEFINED', 'user-defined');
const lista = (s) => s.split(',').map((c) => c.trim().replace(/"/g, ''));

const tablas = {};
const aristasPorId = new Map();
const externas = [];
for (const m of sql.matchAll(/CREATE TABLE public\.(\w+) \(([\s\S]*?)\n\);/g)) {
  const [, nombre, cuerpo] = m;
  const cols = [];
  let pk = [];
  const fks = [];
  for (let linea of cuerpo.split('\n')) {
    linea = linea.trim().replace(/,$/, '');
    if (!linea) continue;
    if (linea.startsWith('CONSTRAINT')) {
      const mp = linea.match(/^CONSTRAINT \w+ PRIMARY KEY \(([^)]+)\)/);
      if (mp) pk = lista(mp[1]);
      const mf = linea.match(/^CONSTRAINT (\w+) FOREIGN KEY \((\w+)\) REFERENCES (\w+)\.(\w+)\((\w+)\)/);
      if (mf) {
        const [, cid, col, esq, dest] = mf;
        fks.push(col);
        if (esq !== 'public') externas.push({ de: nombre, col, esquema: esq, tabla: dest });
        else if (aristasPorId.has(cid)) {
          const a = aristasPorId.get(cid);
          if (!a.cols.includes(col)) a.cols.push(col);
        } else aristasPorId.set(cid, { id: cid, de: nombre, a: dest, cols: [col], onDelete: 'NO ACTION' });
      }
      continue;
    }
    const mc = linea.match(/^(\w+)\s+(.*)$/);
    if (!mc) continue;
    const [, col, resto] = mc;
    const tipo = resto.split(/\s+(?:DEFAULT|NOT NULL|GENERATED|CHECK|UNIQUE|COLLATE)\b/)[0];
    cols.push({ n: col, t: limpiaTipo(tipo), nn: resto.includes('NOT NULL'),
      gen: resto.includes('GENERATED ALWAYS'), enum: false });
  }
  tablas[nombre] = { cols, pk, fks };
}
const aristas = [...aristasPorId.values()];

const faltan = Object.keys(tablas).filter((t) => !(t in DOM_DE));
if (faltan.length) throw new Error(`SIN DOMINIO: ${faltan} — clasifícalas en DOMINIOS antes de generar`);
const sueltas = Object.values(DOMINIOS).flat().filter((t) => !(t in tablas));
if (sueltas.length) throw new Error(`EN MAPA PERO NO EN SQL: ${sueltas}`);
for (const e of aristas) if (!(e.a in tablas)) throw new Error(`FK a tabla inexistente: ${e.id}`);

// ------------------------------------------------------------------ layout

// PRNG determinista (mulberry32) para que el diagrama no cambie entre corridas.
let semilla = 7;
const rand = () => {
  semilla = (semilla + 0x6d2b79f5) | 0;
  let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const uniform = (a, b) => a + (b - a) * rand();

const nombres = Object.keys(tablas).sort();
const idx = Object.fromEntries(nombres.map((n, i) => [n, i]));
const N = nombres.length;

const CHAR_W = 7.4;
const dims = (n) => [
  Math.max(150, n.length * CHAR_W + 34),
  34 + Math.min(tablas[n].cols.length, 7) * 4 + 14,
];
const W = nombres.map((n) => dims(n)[0]);
const H = nombres.map((n) => dims(n)[1]);

const grados = {};
for (const e of aristas) {
  grados[e.de] = (grados[e.de] ?? 0) + 1;
  grados[e.a] = (grados[e.a] ?? 0) + 1;
}

const pesoDom = new Map();
for (const e of aristas) {
  const a = DOM_DE[e.de], b = DOM_DE[e.a];
  if (a !== b) {
    const k = [a, b].sort().join('|');
    pesoDom.set(k, (pesoDom.get(k) ?? 0) + 1);
  }
}
const wDom = (a, b) => pesoDom.get([a, b].sort().join('|')) ?? 0;

const gradoDom = Object.fromEntries(
  ordenDom.map((d) => [d, ordenDom.filter((o) => o !== d).reduce((s, o) => s + wDom(d, o), 0)]));
const centro = ordenDom.reduce((m, d) => (gradoDom[d] > gradoDom[m] ? d : m));
const anillo = ordenDom.filter((d) => d !== centro);

function* permutaciones(arr) {
  if (arr.length <= 1) { yield arr; return; }
  for (let i = 0; i < arr.length; i++) {
    const resto = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of permutaciones(resto)) yield [arr[i], ...p];
  }
}
const coste = (perm) => {
  const k = perm.length;
  let total = 0;
  for (let i = 0; i < k; i++) for (let j = i + 1; j < k; j++)
    total += wDom(perm[i], perm[j]) * Math.min(j - i, k - (j - i));
  return total;
};
let mejor = null, mejorCoste = Infinity;
for (const p of permutaciones(anillo.slice(1))) {
  const perm = [anillo[0], ...p];
  const c = coste(perm);
  if (c < mejorCoste) { mejorCoste = c; mejor = perm; }
}

const RX = 1500, RY = 560;
const anclas = { [centro]: [0, 0] };
mejor.forEach((d, i) => {
  const ang = (2 * Math.PI * i) / mejor.length - Math.PI / 2;
  anclas[d] = [RX * Math.cos(ang), RY * Math.sin(ang)];
});

const radioDom = {};
for (const d of ordenDom) {
  const area = nombres.filter((n) => DOM_DE[n] === d)
    .reduce((s, n) => s + dims(n)[0] * dims(n)[1], 0);
  radioDom[d] = Math.sqrt(area / Math.PI) * 1.6;
}

const pos = [];
const cuenta = {};
for (const n of nombres) {
  const d = DOM_DE[n];
  const [ax, ay] = anclas[d];
  const k = (cuenta[d] = (cuenta[d] ?? -1) + 1);
  const totalD = DOMINIOS[d].length;
  const ang = (2 * Math.PI * k) / Math.max(totalD, 1);
  const r = radioDom[d] * (totalD <= 4 ? 0.35 : 0.7);
  pos.push([ax + r * Math.cos(ang) + uniform(-30, 30), ay + r * Math.sin(ang) + uniform(-30, 30)]);
}

const vecinos = nombres.map(() => []);
for (const e of aristas) if (e.de !== e.a) {
  vecinos[idx[e.de]].push(idx[e.a]);
  vecinos[idx[e.a]].push(idx[e.de]);
}

const K_REP = 46000, K_ATR = 0.006, K_ANCLA = 0.028, ITERS = 1600;
for (let it = 0; it < ITERS; it++) {
  const t = 1 - it / ITERS;
  const fx = new Array(N).fill(0), fy = new Array(N).fill(0);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const dx = pos[i][0] - pos[j][0], dy = pos[i][1] - pos[j][1];
    const d2 = dx * dx + dy * dy + 0.01;
    const mult = DOM_DE[nombres[i]] === DOM_DE[nombres[j]] ? 1 : 2.4;
    const f = (K_REP * mult) / d2, d = Math.sqrt(d2);
    fx[i] += (f * dx) / d; fy[i] += (f * dy) / d;
    fx[j] -= (f * dx) / d; fy[j] -= (f * dy) / d;
  }
  for (let i = 0; i < N; i++) for (const j of vecinos[i]) {
    const dx = pos[j][0] - pos[i][0], dy = pos[j][1] - pos[i][1];
    const d = Math.hypot(dx, dy) + 0.01;
    const mismo = DOM_DE[nombres[i]] === DOM_DE[nombres[j]];
    const f = K_ATR * (d - (mismo ? 175 : 340)) * (mismo ? 1 : 0.28);
    fx[i] += ((f * dx) / d) * 0.5;
    fy[i] += ((f * dy) / d) * 0.5;
  }
  for (let i = 0; i < N; i++) {
    const [ax, ay] = anclas[DOM_DE[nombres[i]]];
    const dx = ax - pos[i][0], dy = ay - pos[i][1];
    const d = Math.hypot(dx, dy);
    const holgura = radioDom[DOM_DE[nombres[i]]];
    if (d > holgura) {
      const k = (K_ANCLA * (d - holgura)) / d;
      fx[i] += dx * k; fy[i] += dy * k;
    }
  }
  const lim = 26 * t + 1.5;
  for (let i = 0; i < N; i++) {
    const d = Math.hypot(fx[i], fy[i]);
    if (d > lim) { fx[i] *= lim / d; fy[i] *= lim / d; }
    pos[i][0] += fx[i]; pos[i][1] += fy[i];
  }
}

const PAD_X = 26, PAD_Y = 22;
for (let rep = 0; rep < 320; rep++) {
  let movio = false;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const dx = pos[j][0] - pos[i][0], dy = pos[j][1] - pos[i][1];
    const solX = (W[i] + W[j]) / 2 + PAD_X - Math.abs(dx);
    const solY = (H[i] + H[j]) / 2 + PAD_Y - Math.abs(dy);
    if (solX > 0 && solY > 0) {
      movio = true;
      if (solX < solY) {
        const s = (dx < 0 ? -1 : 1) * (solX / 2 + 0.5);
        pos[i][0] -= s; pos[j][0] += s;
      } else {
        const s = (dy < 0 ? -1 : 1) * (solY / 2 + 0.5);
        pos[i][1] -= s; pos[j][1] += s;
      }
    }
  }
  if (!movio) break;
}

const M = 70;
const minx = Math.min(...pos.map((p, i) => p[0] - W[i] / 2));
const miny = Math.min(...pos.map((p, i) => p[1] - H[i] / 2));
for (const p of pos) { p[0] += M - minx; p[1] += M - miny; }
const ancho = Math.max(...pos.map((p, i) => p[0] + W[i] / 2)) + M;
const alto = Math.max(...pos.map((p, i) => p[1] + H[i] / 2)) + M;

const REG_PAD = 34;
const regiones = {};
for (const d of ordenDom) {
  const ids = nombres.map((_, i) => i).filter((i) => DOM_DE[nombres[i]] === d);
  const x0 = Math.min(...ids.map((i) => pos[i][0] - W[i] / 2)) - REG_PAD;
  const y0 = Math.min(...ids.map((i) => pos[i][1] - H[i] / 2)) - REG_PAD;
  const x1 = Math.max(...ids.map((i) => pos[i][0] + W[i] / 2)) + REG_PAD;
  const y1 = Math.max(...ids.map((i) => pos[i][1] + H[i] / 2)) + REG_PAD;
  regiones[d] = [x0, y0, x1 - x0, y1 - y0];
}

// ------------------------------------------------------------------ salida

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
const r = (v) => Math.round(v * 10) / 10;

const L = [];
L.push('// GENERADO — no editar a mano.');
L.push('// Fuente: docs/esquema-app.sql · script: scripts/gen-erd-app.mjs');
L.push(`// ${N} tablas · ${aristas.length} claves foráneas\n`);
L.push('export type DominioId =\n  | ' + ordenDom.map((d) => `'${d}'`).join('\n  | ') + ';\n');
L.push(`export interface Columna {
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
`);
L.push('export const DOMINIOS: Dominio[] = [');
for (const d of ordenDom) {
  const [label, desc, color] = META[d];
  const [rx, ry, rw, rh] = regiones[d];
  L.push(`  { id: '${d}', label: '${esc(label)}', descripcion: '${esc(desc)}', color: '${color}', tablas: ${DOMINIOS[d].length}, x: ${r(rx)}, y: ${r(ry)}, w: ${r(rw)}, h: ${r(rh)} },`);
}
L.push('];\n');
L.push('export const TABLAS: Tabla[] = [');
nombres.forEach((n, i) => {
  const t = tablas[n];
  const pk = new Set(t.pk), fk = new Set(t.fks);
  L.push('  {');
  L.push(`    id: '${n}', dominio: '${DOM_DE[n]}',`);
  L.push(`    x: ${r(pos[i][0])}, y: ${r(pos[i][1])}, w: ${r(W[i])}, h: ${r(H[i])}, grado: ${grados[n] ?? 0},`);
  L.push('    cols: [');
  for (const c of t.cols)
    L.push(`      { n: '${c.n}', t: '${esc(c.t)}', pk: ${pk.has(c.n)}, fk: ${fk.has(c.n)}, nn: ${c.nn}, gen: ${c.gen}, enum: ${c.enum} },`);
  L.push('    ],');
  L.push('  },');
});
L.push('];\n');
L.push('export const RELACIONES: Relacion[] = [');
for (const e of [...aristas].sort((a, b) => (a.de + a.a).localeCompare(b.de + b.a)))
  L.push(`  { id: '${e.id}', de: '${e.de}', a: '${e.a}', cols: [${e.cols.map((c) => `'${c}'`).join(', ')}], onDelete: '${e.onDelete}' },`);
L.push('];\n');
L.push('/** FK que salen del esquema `public` (no se dibujan en el grafo). */');
L.push('export const REFERENCIAS_EXTERNAS: { de: string; col: string; destino: string }[] = [');
for (const x of externas) L.push(`  { de: '${x.de}', col: '${x.col}', destino: '${x.esquema}.${x.tabla}' },`);
L.push('];\n');
L.push(`export const LIENZO = { ancho: ${r(ancho)}, alto: ${r(alto)} };`);
L.push(`export const TOTAL_COLUMNAS = ${Object.values(tablas).reduce((s, t) => s + t.cols.length, 0)};`);
L.push(`export const TOTAL_FK = ${aristas.length + externas.length};`);

writeFileSync(OUT, L.join('\n') + '\n', 'utf8');
console.log(`OK ${N} tablas, ${aristas.length} FK, ${externas.length} externas, lienzo ${r(ancho)}x${r(alto)}`);
