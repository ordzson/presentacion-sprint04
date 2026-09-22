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
      'La portada no es un panel de métricas: es una guía de inicio. Seis tarjetas numeradas en el mismo orden que el menú lateral, con saludo y fecha arriba.',
    imagen: 'capturas/inicio.png',
    puntos: [
      'El menú lateral agrupa «Preparar datos» (1–5, con 4b para jornadas extraordinarias) y «Generar y revisar» (6–8).',
      'Cada tarjeta termina en un enlace «Ir a …»: la portada es el índice del proceso.',
      'Arriba a la derecha, la campana de notificaciones con el contador de no leídas.',
    ],
    archivo: 'Components/Pages/Home.razor · Layout/NavMenu.razor',
  },
  {
    id: 'periodos',
    ruta: '/periodos',
    titulo: 'Períodos · paso 1',
    resumen:
      'Primera pantalla del flujo. Tres partes en pestañas: el período, las cohortes que lo cursan y los cursos que se programarán.',
    imagen: 'capturas/periodos.png',
    puntos: [
      'Patrón fijo de encabezado: eyebrow («Configuración · paso 1») + h1 + una línea de explicación + «Continuar a …».',
      'Contador en chip («7 períodos») y estado como chip, no como texto suelto.',
      'La tercera pestaña enseña qué cursos saldrán del pensum × semestre antes de generar nada.',
    ],
    archivo: 'Components/Pages/Periodos.razor',
  },
  {
    id: 'aulas',
    ruta: '/aulas',
    titulo: 'Jornadas y espacios · paso 2',
    resumen:
      'Definir una jornada es aritmética de horas. Se resolvió con una vista previa que se recalcula mientras se escribe, y ahora con un tipo: regular o extraordinaria.',
    imagen: 'capturas/aulas.png',
    puntos: [
      'Panel oscuro de vista previa: muestra los períodos ya calculados antes de guardar nada.',
      'El receso aparece resaltado con borde punteado porque desplaza las horas siguientes.',
      '«Tipo de jornada»: una extraordinaria cuelga de una regular y debe tener bloques de la misma duración.',
    ],
    archivo: 'Components/Pages/Aulas.razor',
  },
  {
    id: 'academia',
    ruta: '/academia',
    titulo: 'Academia · paso 3',
    resumen:
      'Siete entidades académicas en una sola página, en pestañas numeradas: facultades, carreras, pensums, malla, cursos comunes, cohortes y áreas comunes.',
    imagen: 'capturas/academia.png',
    puntos: [
      'Alta a la izquierda, listado buscable y paginado a la derecha: el mismo esquema en todas las entidades.',
      'Paginador reutilizable (Mostrar 10 por página · Anterior · Siguiente) en vez de tablas infinitas.',
      'El código interno se genera solo: la persona escribe nombres, no claves.',
    ],
    archivo: 'Components/Pages/Academia.razor · Shared/Paginador.razor',
  },
  {
    id: 'docentes',
    ruta: '/docentes',
    titulo: 'Docentes · paso 4',
    resumen:
      'El alta del docente crea también su cuenta: correo y contraseña inicial, que tendrá que cambiar en su primer ingreso.',
    imagen: 'capturas/docentes.png',
    puntos: [
      'La carga máxima se explica en la propia tarjeta: es un límite obligatorio para el motor.',
      'Facultades opcionales: sin marcar ninguna, el docente queda compartido entre todas.',
      'Acción de continuidad arriba a la derecha: «Configurar disponibilidad →».',
    ],
    archivo: 'Components/Pages/Docentes.razor',
  },
  {
    id: 'jornadas-extraordinarias',
    ruta: '/jornadas-extraordinarias',
    titulo: 'Jornadas extraordinarias · paso 4b',
    resumen:
      'Pantalla nueva. Por período, se elige contra qué horario regular corre en paralelo la jornada extraordinaria y qué docentes dan clase en ella.',
    imagen: 'capturas/jornadas-extraordinarias.png',
    puntos: [
      'Es un «4b» y no un paso 5: no cambia el orden del recorrido, se intercala.',
      'Los bloques en que el docente ya da clase en el horario de referencia salen «Ocupado» en su disponibilidad.',
      'La base impide que un plan mezcle jornadas regulares y extraordinarias.',
    ],
    archivo: 'Components/Pages/JornadasExtraordinarias.razor',
  },
  {
    id: 'disponibilidad',
    ruta: '/docentes/disponibilidad',
    titulo: 'Disponibilidad · paso 5',
    resumen:
      'Primero el contexto —docente, período y jornada— y solo entonces la matriz. Los tres selectores son combobox con búsqueda.',
    imagen: 'capturas/disponibilidad.png',
    puntos: [
      'ComboboxBuscable: se escribe para filtrar docentes, períodos o jornadas en vez de recorrer un select largo.',
      'La matriz muestra solo los períodos reales de esa jornada, con su hora.',
      'El docente también la llena desde su propia cuenta, en /docente/disponibilidad.',
    ],
    archivo: 'Components/Pages/DisponibilidadDocente.razor · Shared/ComboboxBuscable.razor',
  },
  {
    id: 'planes',
    ruta: '/planes',
    titulo: 'Planes · la rejilla generada',
    resumen:
      'El horario ya no se revisa en una lista: cada carrera y semestre es una rejilla de días por slots, con el receso como fila propia y lo que no se colocó debajo, con su motivo.',
    imagen: 'capturas/planes.png',
    puntos: [
      'Cada clase lleva curso, docente, aula y, si es de área común, cuántas cohortes la cursan juntas.',
      'Chips por grupo: clases, cursos completos y cursos sin colocar.',
      'La fila «Sin colocar» cita el motivo del motor en palabras, con nombres y horas.',
    ],
    archivo: 'Components/Pages/Planes.razor · Shared/RejillaHorario.razor',
  },
  {
    id: 'editor',
    ruta: '/planes · Editar clase',
    titulo: 'Planes · edición manual',
    resumen:
      'Pulsar una clase abre el editor: se cambia día, hora, aula o docente, se fijan esas casillas y el motor reacomoda el resto. Nada se guarda hasta aplicar la propuesta.',
    imagen: 'capturas/editor.png',
    puntos: [
      '<dialog> nativo con un módulo JS pequeño (EditorSesionModal.razor.js) para abrirlo, cerrarlo y devolver el foco.',
      'A la derecha, «Estas casillas quedarán fijas»: el alcance del cambio se ve antes de buscar.',
      'En un área común avisa que el cambio vale para todas sus cohortes y carreras.',
    ],
    archivo: 'Components/Shared/EditorSesionModal.razor · PropuestaEdicion.razor',
  },
  {
    id: 'notificaciones',
    ruta: '/notificaciones',
    titulo: 'Notificaciones · paso 8',
    resumen:
      'Pantalla nueva. La coordinación escribe un mensaje con prioridad y elige docentes, o todos los activos con cuenta; cada docente lo recibe en su bandeja.',
    imagen: 'capturas/notificaciones.png',
    puntos: [
      'El contenido se guarda una vez; el estado leído o descartado vive por destinatario.',
      'Contador 0/5000 y buscador de docentes por nombre o correo.',
      'Debajo, el historial con cuántos lo leyeron, cuántos no y cuántos lo descartaron.',
    ],
    archivo: 'Components/Pages/Notificaciones.razor · Shared/CampanaNotificaciones.razor',
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
      'Al lado, SweetAlert2 para las alertas y confirmaciones, servido desde wwwroot/lib, sin CDN.',
      'Clases que sí se usan: container-fluid, row/col, table, form-control, form-select, btn, alert, d-flex, gap-*, mb-*.',
    ],
  },
  {
    titulo: 'Capa propia',
    fuente: 'wwwroot/app.css · 2 270 líneas',
    texto:
      'Encima de Bootstrap va una hoja propia con las piezas que Bootstrap no trae y que el flujo de horarios necesita repetir en todas las pantallas.',
    detalles: [
      'Tipografía Inter con respaldo del sistema y escala propia de h1/h2/h3. Creció con la rejilla del horario, los combobox, la paginación y el inicio docente.',
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
      'RejillaHorario, EditorSesionModal, PropuestaEdicion, CampanaNotificaciones: 12 hojas aisladas, 989 líneas.',
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
      'Generar un horario tiene un orden obligatorio. Por eso todo está numerado: 1 a 5 para preparar datos —con el 4b de jornadas extraordinarias— y 6 a 8 para generar, consultar y avisar. El menú, la portada, los encabezados y los botones de «continuar a…» dicen lo mismo.',
  },
  {
    titulo: 'Una sola plantilla de página',
    texto:
      'Toda pantalla repite el mismo esqueleto: eyebrow, título, una línea de contexto, acción de continuidad y tarjetas .workspace-card numeradas. Aprender una pantalla es aprender las demás.',
  },
  {
    titulo: 'El menú muestra solo lo permitido',
    texto:
      'Cada entrada va envuelta en un AuthorizeView con su política (academia:leer, docentes:actualizar, planes:leer, notificaciones:leer). Un usuario sin permiso no ve la opción deshabilitada: no la ve. El docente tiene su propio menú: inicio, disponibilidad y bandeja.',
  },
  {
    titulo: 'JavaScript solo donde Blazor no llega',
    texto:
      'Tres archivos, 189 líneas: las alertas de SweetAlert2, la recuperación de contraseña y el <dialog> del editor manual (foco y cierre). Todo lo demás es InteractiveServer sobre SignalR; el menú móvil se abre con un checkbox y CSS.',
  },
  {
    titulo: 'Vista previa antes de guardar',
    texto:
      'En jornadas, el panel oscuro calcula y muestra los períodos y el receso mientras se escribe. Se evita el ciclo «guardar, mirar mal, corregir».',
  },
  {
    titulo: 'Errores en español llano',
    texto:
      'PresentacionErroresCatalogo traduce el error técnico antes de pintarlo, y AlertasService lo muestra con el mismo formato en todas las pantallas. La franja #blazor-error-ui queda solo para lo imprevisto.',
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
  { valor: '17', etiqueta: 'páginas con ruta' },
  { valor: '2 270', etiqueta: 'líneas de CSS propio' },
  { valor: '189', etiqueta: 'líneas de JavaScript propio' },
];
