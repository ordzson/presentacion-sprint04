/**
 * Utilidades de exportación de los diagramas (esquema de base de datos y
 * diagrama de clases). Nada de esto participa en el pintado normal de las
 * slides: son funciones sueltas que se invocan al pulsar los botones.
 */

/** Propiedades que hay que fijar para que un SVG suelto se vea igual que en pantalla. */
const PROPS = [
  'fill',
  'fill-opacity',
  'fill-rule',
  'stroke',
  'stroke-width',
  'stroke-opacity',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-family',
  'font-size',
  'font-weight',
  'font-style',
  'letter-spacing',
  'text-anchor',
  'dominant-baseline',
  'paint-order',
  'visibility',
  'display',
];

/** Las que no heredan hay que escribirlas siempre (salvo si valen lo de por defecto). */
const NO_HEREDA = new Set(['opacity', 'display', 'dominant-baseline']);

const POR_DEFECTO: Record<string, string> = {
  opacity: '1',
  display: 'inline',
  'dominant-baseline': 'auto',
};

/**
 * Copia el estilo calculado del original sobre el clon. Es lo que resuelve las
 * `var(--x)` y los `color-mix(...)` de las hojas de estilo de componente, que
 * de otro modo no viajan con el SVG serializado.
 *
 * Para las propiedades que heredan sólo se escribe el valor cuando difiere del
 * padre: sin eso el archivo pesa varias veces más sin cambiar de aspecto.
 */
export function inlinarEstilos(origen: Element, clon: Element): void {
  const a: Element[] = [origen, ...origen.querySelectorAll('*')];
  const b: Element[] = [clon, ...clon.querySelectorAll('*')];
  if (a.length !== b.length) return;

  for (let i = 0; i < a.length; i++) {
    const propio = getComputedStyle(a[i]);
    const padre = a[i].parentElement ? getComputedStyle(a[i].parentElement!) : null;
    const destino = (b[i] as SVGElement | HTMLElement).style;

    for (const p of PROPS) {
      const v = propio.getPropertyValue(p);
      if (!v) continue;
      if (NO_HEREDA.has(p)) {
        if (v === POR_DEFECTO[p]) continue;
      } else if (padre && padre.getPropertyValue(p) === v) {
        continue;
      }
      destino.setProperty(p, v);
    }
  }
}

/** Serializa un SVG ya autónomo a texto de archivo. */
export function serializar(svg: SVGSVGElement): string {
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
  return `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(svg)}`;
}

/** Rasteriza un SVG autónomo. `factor` multiplica el tamaño lógico. */
export function svgAPng(svg: string, ancho: number, alto: number, factor: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => {
      const cv = document.createElement('canvas');
      cv.width = Math.max(1, Math.round(ancho * factor));
      cv.height = Math.max(1, Math.round(alto * factor));
      const ctx = cv.getContext('2d')!;
      ctx.drawImage(img, 0, 0, cv.width, cv.height);
      URL.revokeObjectURL(url);
      cv.toBlob((b) => (b ? resolve(b) : reject(new Error('el lienzo no devolvió imagen'))), 'image/png');
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('el SVG no se pudo rasterizar'));
    };
    img.src = url;
  });
}

/** Dispara la descarga de un blob con el nombre dado. */
export function descargar(blob: Blob, nombre: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}

/**
 * Escala segura para un PNG: respeta el deseo del usuario pero no pasa de los
 * límites de lienzo del navegador (lado y área máximos).
 */
export function escalaSegura(ancho: number, alto: number, deseada: number): number {
  const LADO_MAX = 16_000;
  const AREA_MAX = 60e6;
  return Math.min(
    deseada,
    LADO_MAX / Math.max(ancho, alto),
    Math.sqrt(AREA_MAX / (ancho * alto)),
  );
}

/** Dos cuadros: tiempo suficiente para que el DOM refleje los signals cambiados. */
export function esperarPintado(): Promise<void> {
  return new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
}
