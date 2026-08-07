// Fuente: código real de src/Horarios.Blazor (wwwroot/app.css, Components/**/*.razor
// y los .razor.css aislados). Las capturas de public/capturas salen del programa
// corriendo en local con el usuario de prueba y los datos sembrados.

export interface Captura {
  id: string;
  /** Ruta de la pantalla dentro de la app. */
  ruta: string;
  titulo: string;
  /** Qué se ve y por qué se diseñó así. */
  resumen: string;
  imagen: string;
  /** Elementos de diseño que conviene señalar al presentar. */
  puntos: string[];
  /** Archivo del repositorio donde vive esa pantalla. */
  archivo: string;
}

export const CAPTURAS: Captura[] = [
  {
    id: 'inicio',
    ruta: '/',
    titulo: 'Inicio · recorrido de 6 pasos',
    resumen:
      'La portada no es un panel de métricas: es el mapa del proceso. Seis tarjetas numeradas en el mismo orden que el menú lateral.',
    imagen: 'capturas/inicio.png',
    puntos: [
      'Bloque .hero-panel con degradado propio y la pregunta directa «¿Qué necesitas hacer?».',
      '.workflow-grid de 6 columnas; la flecha entre tarjetas es un ::after, no una imagen.',
      'Menú lateral con los mismos números 1–6, así el usuario nunca pierde en qué paso está.',
    ],
    archivo: 'Components/Pages/Home.razor',
  },
  {
    id: 'periodos',
    ruta: '/periodos',
    titulo: 'Períodos · paso 1',
    resumen:
      'Primera pantalla del flujo. Formulario y tabla conviven en la misma tarjeta para que crear y revisar sea un solo movimiento.',
    imagen: 'capturas/periodos.png',
    puntos: [
      'Patrón fijo de encabezado: .eyebrow («Configuración · paso 1») + h1 + una línea de explicación.',
      'Sub-navegación en píldoras (.section-tabs) para las tres partes del paso.',
      'Contador .status-chip («1 períodos») y estado «Borrador» como chip, no como texto suelto.',
    ],
    archivo: 'Components/Pages/Periodos.razor',
  },
  {
    id: 'aulas',
    ruta: '/aulas',
    titulo: 'Jornadas y espacios · paso 2',
    resumen:
      'El caso más difícil de la interfaz: definir una jornada es aritmética de horas. Se resolvió con una vista previa que se recalcula mientras se escribe.',
    imagen: 'capturas/aulas.png',
    puntos: [
      '.preview-panel oscuro y sticky: muestra los períodos ya calculados antes de guardar nada.',
      'El receso aparece resaltado en ámbar con borde punteado (.break-row) porque desplaza las horas siguientes.',
      'Días activos como .choice-pill; el estado marcado se pinta con :has(input:checked), sin JavaScript.',
    ],
    archivo: 'Components/Pages/Aulas.razor',
  },
  {
    id: 'academia',
    ruta: '/academia',
    titulo: 'Academia · paso 3',
    resumen:
      'Siete entidades académicas en una sola página. Las pestañas propias evitan siete rutas distintas y mantienen el contexto.',
    imagen: 'capturas/academia.png',
    puntos: [
      '.academia-tab con el conteo real dentro de cada pestaña (Cursos 607) para dar escala.',
      'Alta a la izquierda, listado buscable a la derecha: el mismo esquema en todas las entidades.',
      'La tabla scrollea dentro de la tarjeta (.academia-scroll) con encabezado sticky; la página no crece.',
    ],
    archivo: 'Components/Pages/Academia.razor · Academia.razor.css',
  },
  {
    id: 'docentes',
    ruta: '/docentes',
    titulo: 'Docentes · paso 4',
    resumen:
      'CRUD sobre 55 registros. La jerarquía de acciones se comunica solo con color: azul crea, gris edita, rojo da de baja.',
    imagen: 'capturas/docentes.png',
    puntos: [
      'Buscador reutilizable <BarraBusqueda /> con icono SVG en línea y botón de limpiar.',
      'La carga («1–4 cursos») se muestra en la tabla porque es una restricción dura del motor.',
      'Acción de continuidad arriba a la derecha: «Configurar disponibilidad →» encadena con el paso 5.',
    ],
    archivo: 'Components/Pages/Docentes.razor · Shared/BarraBusqueda.razor',
  },
  {
    id: 'disponibilidad',
    ruta: '/docentes/disponibilidad',
    titulo: 'Disponibilidad · paso 5',
    resumen:
      'Una matriz de días por períodos. Es la pantalla más usada y por eso es la más simple: tres selectores y casillas.',
    imagen: 'capturas/disponibilidad.png',
    puntos: [
      '.availability-table con accent-color: #1b6ec2 y casillas de 1.25rem para poder marcar rápido.',
      'La cabecera lleva la hora real de cada período (08:00–08:45), no solo su número.',
      'Contador vivo «12 períodos marcados» + atajos «Marcar todo» / «Limpiar selección».',
    ],
    archivo: 'Components/Pages/DisponibilidadDocente.razor',
  },
  {
    id: 'planes',
    ruta: '/planes',
    titulo: 'Planes de horario · paso 6',
    resumen:
      'Donde se dispara el motor. El alcance se elige con casillas explícitas para que quede claro qué entra en la generación.',
    imagen: 'capturas/planes.png',
    puntos: [
      'Cada bloque es un .workspace-card numerado con .step-number: crear, revisar, generar.',
      'Alcance por carreras y jornadas en dos columnas; vacío significa «todo el período» y se dice en texto.',
      'Los errores del motor se traducen a español llano antes de mostrarse (PresentacionErroresCatalogo).',
    ],
    archivo: 'Components/Pages/Planes.razor',
  },
];

export interface Token {
  nombre: string;
  valor: string;
  uso: string;
}

export const PALETA: Token[] = [
  { nombre: 'Navy institucional', valor: '#173b57', uso: 'Menú lateral y paneles de vista previa' },
  { nombre: 'Fondo de trabajo', valor: '#f5f7f8', uso: 'Lienzo de la aplicación' },
  { nombre: 'Azul de acción', valor: '#1b6ec2', uso: 'Botón primario y casillas' },
  { nombre: 'Azul de dato', valor: '#175b86', uso: 'Números de paso, métricas, pestaña activa' },
  { nombre: 'Texto', valor: '#1f2d38', uso: 'Cuerpo y títulos' },
  { nombre: 'Texto secundario', valor: '#657681', uso: 'Descripciones y ayudas' },
  { nombre: 'Borde', valor: '#dce3e7', uso: 'Tarjetas, tablas y campos' },
  { nombre: 'Ámbar de aviso', valor: '#ffd991', uso: 'Recesos dentro de la jornada' },
];

export interface Capa {
  titulo: string;
  fuente: string;
  texto: string;
  detalles: string[];
}

export const CAPAS_CSS: Capa[] = [
  {
    titulo: 'Bootstrap 5.3.3',
    fuente: 'wwwroot/lib/bootstrap/dist/css/bootstrap.min.css',
    texto:
      'Se usa como base: rejilla, tablas, formularios, botones y utilidades de espaciado. Se cargó la versión que trae la plantilla de Blazor, sin CDN.',
    detalles: [
      'Solo la hoja de estilos: el bundle JS de Bootstrap no se carga.',
      'No hay ni un solo atributo data-bs-* en el proyecto.',
      'Clases que sí se usan: container-fluid, row/col, table, form-control, form-select, btn, alert, d-flex, gap-*, mb-*.',
    ],
  },
  {
    titulo: 'Capa propia',
    fuente: 'wwwroot/app.css · 129 líneas',
    texto:
      'Encima de Bootstrap va una hoja corta con las piezas que Bootstrap no trae y que el flujo de horarios necesita repetir en todas las pantallas.',
    detalles: [
      'Tipografía Inter con respaldo del sistema y escala propia de h1/h2/h3.',
      '.workspace-card, .step-number, .status-chip, .preview-panel, .workflow-step, .choice-pill, .metric-card, .empty-state, .search-box, .availability-table.',
      'Se redefinen .btn, .form-control y .form-label para ganar altura de toque y peso tipográfico.',
    ],
  },
  {
    titulo: 'CSS aislado por componente',
    fuente: '*.razor.css → Horarios.Blazor.styles.css',
    texto:
      'Blazor genera un atributo único por componente, así que estos estilos no se filtran al resto de la aplicación. Se usa donde el estilo pertenece a una sola pantalla.',
    detalles: [
      'MainLayout.razor.css: rejilla de página, barra superior y franja de error.',
      'NavMenu.razor.css: menú lateral, marca y estados del enlace activo.',
      'Academia.razor.css: pestañas y áreas con scroll propio de esa página.',
      'Para cruzar el límite del componente se usa ::deep (por ejemplo, en los NavLink).',
    ],
  },
];

export interface Decision {
  titulo: string;
  texto: string;
}

export const DECISIONES: Decision[] = [
  {
    titulo: 'La interfaz enseña el proceso',
    texto:
      'Generar un horario tiene un orden obligatorio. Por eso todo está numerado del 1 al 6: el menú, la portada, los encabezados y los botones de «continuar a…». La navegación es el manual de uso.',
  },
  {
    titulo: 'Una sola plantilla de página',
    texto:
      'Toda pantalla repite el mismo esqueleto: eyebrow, título, una línea de contexto, acción de continuidad y tarjetas .workspace-card numeradas. Aprender una pantalla es aprender las siete.',
  },
  {
    titulo: 'El menú muestra solo lo permitido',
    texto:
      'Cada entrada va envuelta en un AuthorizeView con su política (academia:leer, docentes:actualizar, planes:leer). Un usuario sin permiso no ve la opción deshabilitada: no la ve.',
  },
  {
    titulo: 'Sin JavaScript propio',
    texto:
      'Cero archivos .js escritos por el equipo y cero llamadas a IJSRuntime. La interactividad es InteractiveServer sobre SignalR; el menú móvil se abre con un checkbox y CSS.',
  },
  {
    titulo: 'Vista previa antes de guardar',
    texto:
      'En jornadas, el panel oscuro calcula y muestra los períodos y el receso mientras se escribe. Se evita el ciclo «guardar, mirar mal, corregir».',
  },
  {
    titulo: 'Errores en español llano',
    texto:
      'PresentacionErroresCatalogo traduce el error técnico antes de pintarlo. La franja #blazor-error-ui queda solo para lo imprevisto.',
  },
  {
    titulo: 'Buscar sin acentos ni mayúsculas',
    texto:
      'BarraBusqueda es un componente reutilizable enlazado con @bind-Valor; filtra en vivo con Busqueda.Coincide, insensible a acentos, porque los nombres se escriben de las dos formas.',
  },
  {
    titulo: 'Responsivo por necesidad, no por moda',
    texto:
      'Tres cortes: 1000px reacomoda el recorrido, 641px colapsa el menú lateral y 640px apila encabezados y rejillas. Las tablas largas scrollean dentro de su tarjeta.',
  },
];

export interface Metrica {
  valor: string;
  etiqueta: string;
}

export const METRICAS: Metrica[] = [
  { valor: '7', etiqueta: 'pantallas del flujo' },
  { valor: '129', etiqueta: 'líneas de CSS propio' },
  { valor: '0', etiqueta: 'JavaScript propio' },
];
