// Fuente: código real del repositorio (src/Horarios.*), las referencias declaradas en los
// .csproj y el registro de dependencias de src/Horarios.Blazor/Program.cs.
//
// Los cuatro recorridos de RECORRIDOS son casos de uso reales y verificables. Están
// elegidos para que se vean juntos: el mismo esqueleto relleno de cuatro maneras
// distintas. Quien entienda uno debería poder predecir los otros tres.

export type CapaId =
  'blazor' | 'aplicacion' | 'dominio' | 'contratos' | 'scheduler' | 'infraestructura' | 'datos';

export interface Nodo {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface Capa {
  id: CapaId;
  /** Nombre del proyecto tal como aparece en la solución. */
  proyecto: string;
  /** Cómo se le llama en lenguaje llano. */
  rol: string;
  color: string;
  /** Una frase para quien no programa. */
  analogia: string;
  hace: string[];
  noHace: string;
  /** Referencias de proyecto reales, tal cual están en el .csproj. */
  referencia: string;
  /** Quién la referencia a ella. */
  referidaPor: string;
  archivos: { ruta: string; nota: string }[];
  /** Caja en el diagrama de dependencias. */
  nodo?: Nodo;
}

export const CAPAS: Capa[] = [
  {
    id: 'blazor',
    proyecto: 'Horarios.Blazor',
    rol: 'La pantalla',
    color: '#3f6fd6',
    analogia:
      'El mostrador: recibe a la persona, muestra lo que hay, toma la solicitud y la pasa. No decide nada por su cuenta.',
    hace: [
      'Dibuja las páginas y responde a los clics: Planes, Docentes, Aulas, Academia, Períodos, Acceso.',
      'Es el único lugar donde se decide qué clase concreta cumple cada interfaz: Program.cs.',
      'Aporta tres piezas que cumplen puertos de Aplicación: ContextoUsuarioHttp, ColaGeneracionesEnMemoria y ProcesadorTrabajosPesados.',
    ],
    noHace: 'No consulta la base por su cuenta ni contiene reglas del negocio.',
    referencia: 'Aplicacion · Contratos · Infraestructura · Scheduler',
    referidaPor: 'Nadie. Es el borde de fuera.',
    archivos: [
      {
        ruta: 'Program.cs',
        nota: 'Las ~80 líneas que conectan cada interfaz con su implementación.',
      },
      {
        ruta: 'Components/Pages/Planes.razor',
        nota: 'Inyecta 11 casos de uso y no llama a nada más.',
      },
      {
        ruta: 'Acceso/ContextoUsuarioHttp.cs',
        nota: 'Cumple IContextoUsuario leyendo la sesión HTTP.',
      },
      {
        ruta: 'ProcesadorTrabajosPesados.cs',
        nota: 'Servicio de fondo que saca trabajos de la cola.',
      },
    ],
    nodo: { x: 90, y: 16, w: 260, h: 62 },
  },
  {
    id: 'aplicacion',
    proyecto: 'Horarios.Aplicacion',
    rol: 'Los casos de uso',
    color: '#b5791b',
    analogia:
      'El funcionario que atiende: pide los papeles, comprueba que estén completos, aplica el procedimiento en orden y manda a archivar. Él no guarda nada.',
    hace: [
      '34 archivos, un trámite cada uno: CrearDocente, ListarAulas, IniciarSesion, RevisarDatosPlan, GenerarHorarioPlan…',
      'Declara 21 interfaces —los puertos— con todo lo que necesita del mundo exterior.',
      'Exige permisos siempre por el mismo sitio: AutorizacionAplicacion.Exigir(contexto, recurso, acción).',
    ],
    noHace: 'No sabe si los datos están en Supabase, en un archivo o en memoria.',
    referencia: 'Dominio · Contratos',
    referidaPor: 'Blazor e Infraestructura.',
    archivos: [
      {
        ruta: 'Docentes/IDatosDocentes.cs',
        nota: 'Un puerto: lo que Aplicación necesita, sin decir cómo.',
      },
      { ruta: 'Docentes/CrearDocente.cs', nota: 'Permiso, normalización, validación y alta.' },
      {
        ruta: 'Motor/GenerarHorarioPlan.cs',
        nota: 'El caso de uso más largo: 5 puertos en juego.',
      },
      { ruta: 'Acceso/AutorizacionAplicacion.cs', nota: 'Un solo sitio para comprobar permisos.' },
    ],
    nodo: { x: 90, y: 138, w: 260, h: 62 },
  },
  {
    id: 'dominio',
    proyecto: 'Horarios.Dominio',
    rol: 'Las reglas',
    color: '#8b52d9',
    analogia:
      'El reglamento escrito en código: qué es un plan, en qué estados puede estar y qué cambios de estado son legales.',
    hace: [
      'Define las entidades: PlanHorario, Docente, Aula, Jornada, Carrera, Facultad, Usuario.',
      'Define los estados y sus transiciones: Borrador → Generando → Generado, Inviable o Fallido.',
      'Concentra lo que vale siempre, sin importar la pantalla ni la base.',
    ],
    noHace: 'No conoce HTTP, ni SQL, ni Supabase.',
    referencia: 'Nada. Su .csproj no tiene una sola ProjectReference.',
    referidaPor: 'Aplicación e Infraestructura.',
    archivos: [
      { ruta: 'Planes/PlanHorario.cs', nota: 'La entidad central; CambiarEstado vive aquí.' },
      { ruta: 'Planes/EstadoHorario.cs', nota: 'Los estados válidos de un plan.' },
      { ruta: 'Docentes/Docente.cs', nota: 'Carga máxima, prioridad y facultades del docente.' },
    ],
    nodo: { x: 470, y: 138, w: 250, h: 62 },
  },
  {
    id: 'contratos',
    proyecto: 'Horarios.Contratos',
    rol: 'El idioma común',
    color: '#5c7a99',
    analogia:
      'Los formularios oficiales: fijan qué campos viajan de una oficina a otra. Ninguna capa inventa su propio formato.',
    hace: [
      'Entradas: CrearDocenteSolicitud, CrearPlanSolicitud, AutorizarCursoDocenteSolicitud.',
      'Salidas: GeneracionHorarioDto, HorarioGeneradoDto, RevisionPlanDto, DocenteResumenDto.',
      'El contrato del motor: InstantaneaMotor entra; ResultadoMotor y ResultadoVerificacion salen.',
    ],
    noHace: 'No tiene lógica ni decisiones: solo describe la forma de los datos.',
    referencia: 'Nada. Igual que Dominio, no referencia a nadie.',
    referidaPor: 'Las otras cuatro capas.',
    archivos: [
      { ruta: 'Motor/ContratoMotor.cs', nota: 'InstantaneaMotor, ResultadoMotor, IMotorHorarios.' },
      {
        ruta: 'Planes/GeneracionHorarioDtos.cs',
        nota: 'El comprobante de generación y el horario armado.',
      },
    ],
    nodo: { x: 470, y: 240, w: 250, h: 62 },
  },
  {
    id: 'scheduler',
    proyecto: 'Horarios.Scheduler',
    rol: 'El motor de cálculo',
    color: '#2a9468',
    analogia:
      'La calculadora: recibe una fotografía de los datos, hace las cuentas y devuelve una propuesta. Con la misma foto da el mismo resultado.',
    hace: [
      'MotorHorario: coloca primero lo más restringido y después mejora lo colocado.',
      'ReglasDuras: una sola definición de lo que es legal.',
      'VerificadorHorario: revisa el resultado por separado; una violación dura deja la generación Inviable.',
    ],
    noHace: 'No abre conexiones, no lee la base, no sabe de usuarios ni de pantallas.',
    referencia: 'Contratos, y nada más.',
    referidaPor: 'Blazor (para registrarlo) e Infraestructura (ExpansorSesiones).',
    archivos: [
      { ruta: 'MotorHorario.cs', nota: 'Construcción voraz + mejora local.' },
      { ruta: 'ReglasDuras.cs', nota: 'Lo que nunca se puede violar.' },
      { ruta: 'VerificadorHorario.cs', nota: 'Segundo par de ojos sobre el resultado.' },
    ],
    nodo: { x: 470, y: 358, w: 250, h: 62 },
  },
  {
    id: 'infraestructura',
    proyecto: 'Horarios.Infraestructura',
    rol: 'Los adaptadores',
    color: '#c0522d',
    analogia:
      'El archivo y el mensajero: sabe dónde está guardado cada papel y cómo pedirlo. Cumple, en concreto, lo que Aplicación pidió por interfaz.',
    hace: [
      '15 adaptadores, cada uno cumpliendo un puerto: DatosDocentesPostgres es IDatosDocentes.',
      'ClienteDatosSupabase: el único sitio que habla HTTP con Supabase y llama sus funciones RPC.',
      'Traduce errores de base a errores del negocio: un duplicado 23505 sale como GeneracionPlanEnCursoException.',
    ],
    noHace: 'No decide reglas ni ordena procedimientos: trae, guarda y traduce.',
    referencia: 'Aplicacion · Dominio · Contratos · Scheduler',
    referidaPor: 'Solo Blazor, y solo desde Program.cs.',
    archivos: [
      { ruta: 'Supabase/ClienteDatosSupabase.cs', nota: 'Consultar, insertar, actualizar y RPC.' },
      { ruta: 'Docentes/DatosDocentesPostgres.cs', nota: 'El adaptador de IDatosDocentes.' },
      {
        ruta: 'Acceso/AutenticadorSupabase.cs',
        nota: 'Un adaptador que no es base de datos: es Supabase Auth.',
      },
      {
        ruta: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
        nota: 'Arma la fotografía que consume el motor.',
      },
    ],
    nodo: { x: 90, y: 336, w: 260, h: 62 },
  },
  {
    id: 'datos',
    proyecto: 'Supabase / PostgreSQL',
    rol: 'La fuente',
    color: '#6b6153',
    analogia:
      'El archivo central de la universidad: guarda todo y vuelve a comprobar en la puerta quién está pidiendo qué.',
    hace: [
      'Guarda las 57 tablas del esquema horarios con sus 110 claves foráneas.',
      'Resuelve trámites enteros en un viaje con funciones RPC: iniciar_generacion, conteos_revision_plan.',
      'Aplica políticas por fila con el token del usuario: la seguridad no depende solo de la pantalla.',
    ],
    noHace: 'No contiene la lógica de generación.',
    referencia: 'No es un proyecto de la solución: es un servicio externo.',
    referidaPor: 'Solo Infraestructura le habla.',
    archivos: [
      { ruta: 'supabase/migrations/', nota: 'Tablas, funciones y políticas versionadas.' },
    ],
    nodo: { x: 90, y: 458, w: 260, h: 54 },
  },
];

export const CAPAS_POR_ID: Record<CapaId, Capa> = Object.fromEntries(
  CAPAS.map((c) => [c.id, c]),
) as Record<CapaId, Capa>;

/* ─────────────────────────────────────────────────── 01 · mapa de dependencias */

export type TipoArista = 'llamada' | 'declara' | 'implementa' | 'referencia';

export interface Arista {
  id: string;
  de: CapaId | 'puertos';
  a: CapaId | 'puertos';
  tipo: TipoArista;
  d: string;
  etiqueta: string;
  /** Posición de la etiqueta. */
  lx: number;
  ly: number;
  anclaje: 'start' | 'middle' | 'end';
  rot?: number;
}

/** La banda de puertos: no es un proyecto, es la costura entre dos capas. */
export const PUERTOS_NODO: Nodo = { x: 90, y: 232, w: 260, h: 52 };

/**
 * Solo las relaciones que definen la forma. Las referencias completas de cada proyecto
 * están en el panel de la capa; dibujarlas todas convertía el diagrama en una maraña.
 */
export const ARISTAS: Arista[] = [
  {
    id: 'blazor-aplicacion',
    de: 'blazor',
    a: 'aplicacion',
    tipo: 'llamada',
    d: 'M220,78 L220,132',
    etiqueta: 'llama al caso de uso',
    lx: 232,
    ly: 109,
    anclaje: 'start',
  },
  {
    id: 'aplicacion-puertos',
    de: 'aplicacion',
    a: 'puertos',
    tipo: 'declara',
    d: 'M160,200 L160,226',
    etiqueta: 'declara lo que necesita',
    lx: 148,
    ly: 216,
    anclaje: 'end',
  },
  {
    id: 'infra-puertos',
    de: 'infraestructura',
    a: 'puertos',
    tipo: 'implementa',
    d: 'M280,336 L280,290',
    etiqueta: 'implementa · la flecha que sube',
    lx: 292,
    ly: 314,
    anclaje: 'start',
  },
  {
    id: 'infra-datos',
    de: 'infraestructura',
    a: 'datos',
    tipo: 'llamada',
    d: 'M220,398 L220,452',
    etiqueta: 'HTTP + SQL',
    lx: 232,
    ly: 429,
    anclaje: 'start',
  },
  {
    id: 'aplicacion-dominio',
    de: 'aplicacion',
    a: 'dominio',
    tipo: 'referencia',
    d: 'M350,158 L464,158',
    etiqueta: 'usa las entidades',
    lx: 407,
    ly: 150,
    anclaje: 'middle',
  },
  {
    id: 'aplicacion-contratos',
    de: 'aplicacion',
    a: 'contratos',
    tipo: 'referencia',
    d: 'M350,184 C400,184 420,262 464,266',
    etiqueta: 'habla en DTOs',
    lx: 398,
    ly: 232,
    anclaje: 'middle',
  },
  {
    id: 'scheduler-contratos',
    de: 'scheduler',
    a: 'contratos',
    tipo: 'referencia',
    d: 'M595,358 L595,308',
    etiqueta: 'su única referencia',
    lx: 607,
    ly: 336,
    anclaje: 'start',
  },
  {
    id: 'infra-scheduler',
    de: 'infraestructura',
    a: 'scheduler',
    tipo: 'referencia',
    d: 'M350,378 L464,384',
    etiqueta: 'ExpansorSesiones',
    lx: 407,
    ly: 400,
    anclaje: 'middle',
  },
  {
    id: 'blazor-infra',
    de: 'blazor',
    a: 'infraestructura',
    tipo: 'referencia',
    d: 'M90,47 C26,47 26,367 84,367',
    etiqueta: 'solo Program.cs',
    lx: 34,
    ly: 207,
    anclaje: 'middle',
    rot: -90,
  },
  {
    id: 'blazor-scheduler',
    de: 'blazor',
    a: 'scheduler',
    tipo: 'referencia',
    d: 'M350,47 C770,47 770,389 726,389',
    etiqueta: 'registra IMotorHorarios',
    lx: 782,
    ly: 218,
    anclaje: 'middle',
    rot: -90,
  },
];

export const LEYENDA_ARISTAS: { tipo: TipoArista; texto: string }[] = [
  { tipo: 'llamada', texto: 'Llamada en tiempo de ejecución' },
  { tipo: 'declara', texto: 'Declara el puerto (la interfaz)' },
  { tipo: 'implementa', texto: 'Lo cumple: la única flecha que sube' },
  { tipo: 'referencia', texto: 'Referencia de proyecto en el .csproj' },
];

/* ───────────────────────────────────────────────────────── 02 · el patrón */

export type RanuraId = 'pantalla' | 'uso' | 'dominio' | 'puerto' | 'adaptador' | 'fuente';

export interface Ranura {
  id: RanuraId;
  titulo: string;
  capa: CapaId;
  /** La pregunta que esta ranura contesta siempre, en cualquier caso de uso. */
  pregunta: string;
  siempre: string;
  cambia: string;
  /** Cómo se reconoce que algo está en la ranura equivocada. */
  senal: string;
  /** Nombre corto para la cabecera del carril, cuando el del proyecto no cabe. */
  corta?: string;
  /** Posición en el diagrama del patrón. */
  x: number;
}

export const RANURAS: Ranura[] = [
  {
    id: 'pantalla',
    titulo: 'Pantalla',
    capa: 'blazor',
    pregunta: '¿Quién lo pide y cómo se le contesta?',
    siempre:
      'Una página .razor inyecta el caso de uso y lo llama con datos sueltos o con una solicitud de Contratos. Después traduce la excepción a un mensaje.',
    cambia: 'Qué página, qué formulario y qué se dibuja con la respuesta.',
    senal:
      'Si la .razor arma un JSON, construye un filtro o menciona una tabla, se saltó tres ranuras de golpe.',
    x: 70,
  },
  {
    id: 'uso',
    titulo: 'Caso de uso',
    capa: 'aplicacion',
    pregunta: '¿En qué orden pasan las cosas y qué se rechaza?',
    siempre:
      'Una clase con un EjecutarAsync. Exige el permiso, normaliza y valida la entrada, ordena los pasos y elige qué excepción se lanza.',
    cambia:
      'Cuántos pasos hay y cuántos puertos toca: de uno (ListarAulas) a cinco (GenerarHorarioPlan).',
    senal:
      'Si nombra a Supabase, a Postgres o a un HttpClient, la dependencia se coló hacia adentro.',
    x: 210,
  },
  {
    id: 'dominio',
    titulo: 'Reglas',
    capa: 'dominio',
    pregunta: '¿Qué es legal, independientemente de todo lo demás?',
    siempre:
      'Entidades con las reglas que valen siempre. Se usa cuando hay una decisión del negocio; muchos casos de uso solo la atraviesan de vuelta como tipo de retorno.',
    cambia: 'Si el trámite decide algo (CambiarEstado) o solo mueve datos.',
    senal: 'Si una regla académica está escrita en un if de la .razor, está fuera de sitio.',
    x: 350,
  },
  {
    id: 'puerto',
    titulo: 'Puerto',
    capa: 'aplicacion',
    pregunta: '¿Qué necesito de fuera, dicho sin decir de dónde?',
    siempre:
      'Una interfaz declarada dentro de Aplicación. Es el único vocabulario con el que el caso de uso pide algo al mundo exterior. Hay 21 en el proyecto.',
    cambia:
      'A qué apunta: una base (IDatosAulas), un servicio de identidad (IAutenticadorSupabase), la sesión web (IContextoUsuario) o una cola (IColaGeneraciones).',
    senal:
      'Si un caso de uso recibe una clase concreta en el constructor, no hay puerto: hay atadura.',
    x: 490,
  },
  {
    id: 'adaptador',
    titulo: 'Adaptador',
    capa: 'infraestructura',
    pregunta: '¿Quién cumple ese puerto, en concreto?',
    siempre:
      'Una clase que implementa la interfaz. Program.cs decide cuál, en una línea. Cambiarla no toca ningún caso de uso.',
    cambia:
      'Dónde vive: casi siempre en Infraestructura, pero ContextoUsuarioHttp y ColaGeneracionesEnMemoria están en Blazor, y MotorHorario en Scheduler.',
    senal:
      'Si dos adaptadores distintos repiten la misma traducción de errores, falta un sitio común.',
    x: 630,
  },
  {
    id: 'fuente',
    titulo: 'Fuente',
    capa: 'datos',
    pregunta: '¿De dónde salen de verdad los datos?',
    siempre:
      'Lo que hay al otro lado: PostgREST, una función RPC, Supabase Auth, una cola en memoria o el motor calculando.',
    cambia: 'Todo. Es lo único que el resto del sistema no tiene por qué conocer.',
    corta: 'Supabase · motor',
    senal:
      'Si para cambiar de proveedor hay que tocar más de un proyecto, el puerto estaba mal dibujado.',
    x: 770,
  },
];

export const RANURAS_POR_ID: Record<RanuraId, Ranura> = Object.fromEntries(
  RANURAS.map((r) => [r.id, r]),
) as Record<RanuraId, Ranura>;

/* ─────────────────────────────────────────────── 03 · cuatro recorridos */

export interface PasoRecorrido {
  n: number;
  de: RanuraId;
  a: RanuraId;
  /** Etiqueta corta, la que va sobre la flecha. */
  etiqueta: string;
  /** Vuelta hacia atrás: se dibuja punteada. */
  vuelta?: boolean;
  /** Fuera de la petición web. */
  fondo?: boolean;
  /** Detalle que se lee al seleccionar el paso. */
  detalle: string;
  archivo: string;
}

export interface Recorrido {
  id: string;
  nombre: string;
  /** Qué tipo de trámite representa. */
  clase: string;
  color: string;
  resumen: string;
  /** Lo que este recorrido enseña y los otros no. */
  loNuevo: string;
  /** Advertencia de lectura del diagrama, cuando comprime saltos. */
  nota?: string;
  pasos: PasoRecorrido[];
}

export const RECORRIDOS: Recorrido[] = [
  {
    id: 'aulas',
    nombre: 'Listar aulas',
    clase: 'Lectura simple · el esqueleto desnudo',
    color: '#2a9468',
    resumen:
      'El caso de uso más corto del proyecto: una línea de cuerpo. Sirve para ver el esqueleto sin nada encima.',
    loNuevo:
      'Que incluso el trámite más tonto atraviesa las cinco ranuras. Nadie se salta el puerto por ser una consulta trivial.',
    pasos: [
      {
        n: 1,
        de: 'pantalla',
        a: 'uso',
        etiqueta: 'ListarAulas.EjecutarAsync()',
        detalle:
          'Aulas.razor inyecta el caso de uso como cualquier otro servicio. No sabe que detrás hay una base de datos.',
        archivo: 'Horarios.Blazor/Components/Pages/Aulas.razor',
      },
      {
        n: 2,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosAulas.ListarAulasActivasAsync',
        detalle:
          'El caso de uso entero es esta línea: devuelve lo que el puerto devuelva. Aun así el puerto existe, porque es lo que permite probarlo y cambiar de origen de datos.',
        archivo: 'Horarios.Aplicacion/Aulas/ListarAulas.cs',
      },
      {
        n: 3,
        de: 'puerto',
        a: 'adaptador',
        etiqueta: 'Program.cs eligió DatosAulasPostgres',
        detalle:
          'builder.Services.AddScoped<IDatosAulas, DatosAulasPostgres>(). Esta línea es la única que ata la aplicación a Supabase.',
        archivo: 'Horarios.Blazor/Program.cs',
      },
      {
        n: 4,
        de: 'adaptador',
        a: 'fuente',
        etiqueta: 'GET aulas?esta_activa=eq.true',
        detalle:
          'Se filtra por activa y sin eliminar, ordenando por código. El filtro es del adaptador, no del caso de uso.',
        archivo: 'Horarios.Infraestructura/Aulas/DatosAulasPostgres.cs',
      },
      {
        n: 5,
        de: 'fuente',
        a: 'adaptador',
        etiqueta: 'AulaFila[] — filas en crudo',
        vuelta: true,
        detalle:
          'La forma de la fila (nombres en snake_case, columnas sueltas) muere aquí. Más adentro nadie la ve.',
        archivo: 'Horarios.Infraestructura/Aulas/DatosAulasPostgres.cs',
      },
      {
        n: 6,
        de: 'adaptador',
        a: 'uso',
        etiqueta: 'Aula[] — entidades de Dominio',
        vuelta: true,
        detalle:
          'fila.ADominio() es la traducción. De aquí para adentro solo circulan entidades y DTOs.',
        archivo: 'Horarios.Dominio/Aulas/Aula.cs',
      },
      {
        n: 7,
        de: 'uso',
        a: 'pantalla',
        etiqueta: 'IReadOnlyList<Aula>',
        vuelta: true,
        detalle:
          'La página dibuja la tabla. Si mañana las aulas vinieran de un CSV, esta línea no cambia.',
        archivo: 'Horarios.Blazor/Components/Pages/Aulas.razor',
      },
    ],
  },
  {
    id: 'docente',
    nombre: 'Crear docente',
    clase: 'Escritura · permiso, normalización y validación',
    color: '#b5791b',
    resumen:
      'El mismo esqueleto, pero el caso de uso ahora decide: exige permiso, limpia la entrada y rechaza lo imposible antes de tocar la base.',
    loNuevo:
      'Que un puerto no siempre apunta a la base: IContextoUsuario lo cumple ContextoUsuarioHttp, que vive en la capa de pantalla.',
    pasos: [
      {
        n: 1,
        de: 'pantalla',
        a: 'uso',
        etiqueta: 'CrearDocente.EjecutarAsync(solicitud)',
        detalle:
          'El formulario se convierte en un CrearDocenteSolicitud, un registro de Contratos. La página no manda campos sueltos.',
        archivo: 'Horarios.Blazor/Components/Pages/Docentes.razor',
      },
      {
        n: 2,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IContextoUsuario.TienePermiso',
        detalle:
          'AutorizacionAplicacion.Exigir(contexto, "docentes", "actualizar"). El permiso se comprueba aquí, no solo en el botón: la pantalla puede esconder el botón, pero no es quien decide.',
        archivo: 'Horarios.Aplicacion/Acceso/AutorizacionAplicacion.cs',
      },
      {
        n: 3,
        de: 'puerto',
        a: 'adaptador',
        etiqueta: 'ContextoUsuarioHttp — vive en Blazor',
        detalle:
          'Aquí el adaptador no está en Infraestructura: la sesión es cosa de la web. El puerto sigue declarado en Aplicación, que es lo que importa.',
        archivo: 'Horarios.Blazor/Acceso/ContextoUsuarioHttp.cs',
      },
      {
        n: 4,
        de: 'uso',
        a: 'uso',
        etiqueta: 'normaliza y valida',
        detalle:
          'Código a mayúsculas, correo a minúsculas, facultades normalizadas. Si falta el nombre o la carga máxima es menor que la mínima, sale ArgumentException y no se llega a la base.',
        archivo: 'Horarios.Aplicacion/Docentes/CrearDocente.cs',
      },
      {
        n: 5,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosDocentes.CrearAsync(solicitud limpia)',
        detalle:
          'Al puerto le llega la solicitud ya normalizada. El adaptador nunca recibe basura que tenga que limpiar por su cuenta.',
        archivo: 'Horarios.Aplicacion/Docentes/IDatosDocentes.cs',
      },
      {
        n: 6,
        de: 'puerto',
        a: 'adaptador',
        etiqueta: 'DatosDocentesPostgres',
        detalle: 'AddScoped<IDatosDocentes, DatosDocentesPostgres>(), otra vez en Program.cs.',
        archivo: 'Horarios.Blazor/Program.cs',
      },
      {
        n: 7,
        de: 'adaptador',
        a: 'fuente',
        etiqueta: 'INSERT docentes + docente_facultades',
        detalle:
          'Dos pasos: la fila del docente por la Data API y sus facultades por una rutina que reemplaza el conjunto entero. Esa complicación es del adaptador; el caso de uso no la conoce.',
        archivo: 'Horarios.Infraestructura/Docentes/DatosDocentesPostgres.cs',
      },
      {
        n: 8,
        de: 'adaptador',
        a: 'uso',
        etiqueta: 'Docente — entidad ya guardada',
        vuelta: true,
        detalle: 'fila.ADominio(facultades). Vuelve un Docente de Dominio, no una fila.',
        archivo: 'Horarios.Dominio/Docentes/Docente.cs',
      },
      {
        n: 9,
        de: 'uso',
        a: 'pantalla',
        etiqueta: 'Docente · o la excepción traducida',
        vuelta: true,
        detalle:
          'Si algo falló, la página convierte la excepción en una frase. Esa traducción es lo único de manejo de errores que vive en la pantalla.',
        archivo: 'Horarios.Blazor/PresentacionErroresCatalogo.cs',
      },
    ],
  },
  {
    id: 'sesion',
    nombre: 'Iniciar sesión',
    clase: 'Dos puertos · uno no es la base de datos',
    color: '#3f6fd6',
    resumen:
      'Un trámite con dos comprobaciones seguidas contra dos servicios distintos, coordinadas por el caso de uso.',
    loNuevo:
      'Que la fuente no tiene por qué ser PostgreSQL: aquí es Supabase Auth por HTTP. El esqueleto no cambia por eso.',
    nota: 'Los saltos 6 y 8 se dibujan solo hasta el puerto. Detrás de cada uno hay un adaptador y una fuente, igual que en los pasos 3 y 4.',
    pasos: [
      {
        n: 1,
        de: 'pantalla',
        a: 'uso',
        etiqueta: 'IniciarSesion.EjecutarAsync(correo, clave)',
        detalle:
          'El formulario de acceso llama al caso de uso. No conoce ni a Supabase ni al esquema de usuarios.',
        archivo: 'Horarios.Blazor/Acceso/EndpointsAcceso.cs',
      },
      {
        n: 2,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IAutenticadorSupabase.IniciarSesionAsync',
        detalle:
          'Un puerto que no apunta a datos: apunta a «alguien que sepa comprobar contraseñas». La aplicación nunca guarda ni verifica contraseñas.',
        archivo: 'Horarios.Aplicacion/Acceso/IAutenticadorSupabase.cs',
      },
      {
        n: 3,
        de: 'puerto',
        a: 'adaptador',
        etiqueta: 'AutenticadorSupabase (HttpClient)',
        detalle:
          'Se registra con AddHttpClient<IAutenticadorSupabase, AutenticadorSupabase>. El adaptador además deja el token en el contexto de la petición.',
        archivo: 'Horarios.Infraestructura/Acceso/AutenticadorSupabase.cs',
      },
      {
        n: 4,
        de: 'adaptador',
        a: 'fuente',
        etiqueta: 'POST auth/v1/token?grant_type=password',
        detalle:
          'Un 400 y un 401 se traducen los dos a «credenciales inválidas»: distinguirlos diría a un atacante qué correos existen.',
        archivo: 'Horarios.Infraestructura/Acceso/AutenticadorSupabase.cs',
      },
      {
        n: 5,
        de: 'adaptador',
        a: 'uso',
        etiqueta: 'SesionSupabase(AuthUserId, tokens)',
        vuelta: true,
        detalle: 'Autenticado sí, autorizado todavía no. Eso lo decide el paso siguiente.',
        archivo: 'Horarios.Aplicacion/Acceso/IAutenticadorSupabase.cs',
      },
      {
        n: 6,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosAcceso.ObtenerPorAuthUserId',
        detalle:
          'Segundo puerto, segundo adaptador: DatosAccesoPostgres. Se busca el usuario propio del sistema con el identificador que devolvió Supabase.',
        archivo: 'Horarios.Aplicacion/Acceso/IDatosAcceso.cs',
      },
      {
        n: 7,
        de: 'uso',
        a: 'uso',
        etiqueta: 'si no está activo, cierra la sesión abierta',
        detalle:
          'Pasar la primera comprobación no basta. Si la cuenta no está dada de alta aquí o no está activa, se invalida el token recién emitido y se lanza UnauthorizedAccessException. Esta decisión no vive en ninguno de los dos adaptadores: es del caso de uso.',
        archivo: 'Horarios.Aplicacion/Acceso/IniciarSesion.cs',
      },
      {
        n: 8,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosAcceso.ListarRoles + ListarPermisos',
        detalle:
          'Se resuelven de una vez para que ninguna pantalla tenga que volver a consultarlos en cada página.',
        archivo: 'Horarios.Aplicacion/Acceso/IDatosAcceso.cs',
      },
      {
        n: 9,
        de: 'uso',
        a: 'pantalla',
        etiqueta: 'ResultadoInicioSesion',
        vuelta: true,
        detalle:
          'Usuario, sesión, roles y permisos. Con eso ContextoUsuarioHttp podrá contestar el TienePermiso del recorrido anterior.',
        archivo: 'Horarios.Aplicacion/Acceso/IniciarSesion.cs',
      },
    ],
  },
  {
    id: 'generar',
    nombre: 'Generar horario',
    clase: 'El largo · dominio, motor y segundo plano',
    color: '#8b52d9',
    resumen:
      'Cinco puertos, una decisión de Dominio y una salida de la petición web. Es el mismo esqueleto, repetido varias veces dentro de un solo trámite.',
    loNuevo:
      'Que un caso de uso largo no es una excepción a la regla: es la regla aplicada cinco veces seguidas, más un corte en el que la petición web termina y el trabajo sigue.',
    nota: 'Para no repetir el mismo tramo catorce veces, cada salto se dibuja solo hasta el puerto: detrás de todos hay un adaptador y una fuente, como en el recorrido 1.',
    pasos: [
      {
        n: 1,
        de: 'pantalla',
        a: 'uso',
        etiqueta: 'GenerarHorarioPlan.EjecutarAsync(planId)',
        detalle:
          'El botón solo aparece si la revisión previa salió en verde. Se envía únicamente el identificador del plan.',
        archivo: 'Horarios.Blazor/Components/Pages/Planes.razor',
      },
      {
        n: 2,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IContextoUsuario.TienePermiso(Motor:generar)',
        detalle:
          'Mismo puerto y mismo adaptador que en «Crear docente». Cambia el permiso, no el mecanismo.',
        archivo: 'Horarios.Aplicacion/Motor/IContextoUsuario.cs',
      },
      {
        n: 3,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosPlanes.ObtenerAsync(planId)',
        detalle:
          'Devuelve un PlanHorario de Dominio, con su Estado y su VersionFila. Solo un plan en Borrador puede generar.',
        archivo: 'Horarios.Infraestructura/Planes/DatosPlanesPostgres.cs',
      },
      {
        n: 4,
        de: 'uso',
        a: 'uso',
        etiqueta: 'RevisarDatosPlan — ¿falta algo?',
        detalle:
          'Un caso de uso llamando a otro caso de uso. Cuenta cohortes, aulas, docentes autorizados y disponibilidad con la RPC conteos_revision_plan; si falta algo sale DatosPlanIncompletosException con la lista exacta, antes de gastar minutos de cálculo.',
        archivo: 'Horarios.Aplicacion/Planes/RevisarDatosPlan.cs',
      },
      {
        n: 5,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IPreparadorInstantaneaMotor.PrepararAsync',
        detalle:
          'Se congela una fotografía: docentes, aulas, cohortes, bloques y sesiones. Aunque alguien edite datos mientras tanto, la generación usa lo que vio al inicio.',
        archivo: 'Horarios.Infraestructura/Motor/PreparadorInstantaneaMotorPostgres.cs',
      },
      {
        n: 6,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosGeneraciones.IniciarAsync → RPC',
        detalle:
          'iniciar_generacion deja constancia de quién pidió qué, con qué versión del motor y con qué entrada. Si el plan ya tenía una generación activa, la base la rechaza y sale GeneracionPlanEnCursoException.',
        archivo: 'Horarios.Infraestructura/Planes/DatosGeneracionesPostgres.cs',
      },
      {
        n: 7,
        de: 'uso',
        a: 'dominio',
        etiqueta: 'plan.CambiarEstado(Generando)',
        detalle:
          'La única ranura que los otros tres recorridos no usan. El cambio de estado lo decide la entidad, y al guardar viaja la VersionFila: si alguien más tocó el plan, el guardado se rechaza en vez de pisarlo.',
        archivo: 'Horarios.Dominio/Planes/PlanHorario.cs',
      },
      {
        n: 8,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IColaGeneraciones.Encolar(...)',
        detalle:
          'El adaptador es ColaGeneracionesEnMemoria, que vive en Blazor. Otro puerto que no apunta a la base.',
        archivo: 'Horarios.Blazor/ColaGeneracionesEnMemoria.cs',
      },
      {
        n: 9,
        de: 'uso',
        a: 'pantalla',
        etiqueta: 'GeneracionHorarioDto — Pendiente',
        vuelta: true,
        detalle:
          'Aquí termina la petición web. La persona ve «Generando» y la página consulta sola cómo va, en vez de quedarse congelada.',
        archivo: 'Horarios.Contratos/Planes/GeneracionHorarioDtos.cs',
      },
      {
        n: 10,
        de: 'adaptador',
        a: 'uso',
        etiqueta: 'ProcesadorTrabajosPesados → EjecutarGeneracionPlan',
        fondo: true,
        detalle:
          'Un servicio de fondo saca el trabajo de la cola. Como la petición web ya terminó, abre sus propias conexiones y vuelve a poner el token del usuario, para que la base siga aplicando sus mismos permisos. Tope de 300 s.',
        archivo: 'Horarios.Blazor/ProcesadorTrabajosPesados.cs',
      },
      {
        n: 11,
        de: 'uso',
        a: 'fuente',
        etiqueta: 'IMotorHorarios.Generar(InstantaneaMotor)',
        fondo: true,
        detalle:
          'El motor es otro adaptador más: cumple un puerto declarado en Contratos y se registra en Program.cs igual que una base de datos. Calcula todo en memoria.',
        archivo: 'Horarios.Scheduler/MotorHorario.cs',
      },
      {
        n: 12,
        de: 'uso',
        a: 'fuente',
        etiqueta: 'IVerificadorHorario.Verificar',
        fondo: true,
        detalle:
          'Segundo par de ojos, separado del motor. Si encuentra una violación dura, la generación queda Inviable aunque el motor la diera por buena.',
        archivo: 'Horarios.Scheduler/VerificadorHorario.cs',
      },
      {
        n: 13,
        de: 'uso',
        a: 'puerto',
        etiqueta: 'IDatosGeneraciones.FinalizarAsync → RPC',
        fondo: true,
        detalle:
          'finalizar_generacion guarda horario, mensajes, duración y puntaje. Completada e Inviable son dos cierres normales: los dos dejan bitácora.',
        archivo: 'Horarios.Infraestructura/Planes/DatosGeneracionesPostgres.cs',
      },
      {
        n: 14,
        de: 'pantalla',
        a: 'uso',
        etiqueta: 'ListarGeneracionesPlan (sondeo) → horario',
        detalle:
          'La página, que iba consultando, ve que el plan dejó de estar «Generando» y abre la cuadrícula con curso, docente, aula, día y hora.',
        archivo: 'Horarios.Aplicacion/Motor/GenerarHorarioPlan.cs',
      },
    ],
  },
];

/* ───────────────────────────────────── la misma forma, distinto relleno */

export interface FilaMatriz {
  pregunta: string;
  /** Una celda por recorrido, en el mismo orden que RECORRIDOS. */
  celdas: string[];
  /** Lo que se ve al comparar la fila entera. */
  lectura: string;
}

export const MATRIZ: FilaMatriz[] = [
  {
    pregunta: '¿Quién lo dispara?',
    celdas: ['Aulas.razor', 'Docentes.razor', 'EndpointsAcceso', 'Planes.razor'],
    lectura:
      'Siempre la capa de pantalla, y siempre inyectando el caso de uso como un servicio más.',
  },
  {
    pregunta: 'Caso de uso',
    celdas: ['ListarAulas', 'CrearDocente', 'IniciarSesion', 'GenerarHorarioPlan'],
    lectura: 'Una clase, un EjecutarAsync. El nombre es el trámite, no la tecnología.',
  },
  {
    pregunta: '¿Cuántos puertos usa?',
    celdas: ['1', '2', '2', '5'],
    lectura:
      'La diferencia entre un caso de uso corto y uno largo es cuántos puertos toca, no cómo está armado.',
  },
  {
    pregunta: 'Puertos',
    celdas: [
      'IDatosAulas',
      'IContextoUsuario · IDatosDocentes',
      'IAutenticadorSupabase · IDatosAcceso',
      'IContextoUsuario · IDatosPlanes · IPreparadorInstantaneaMotor · IDatosGeneraciones · IColaGeneraciones',
    ],
    lectura:
      'Todos son interfaces declaradas dentro de Aplicación. Ninguna menciona Supabase en su nombre.',
  },
  {
    pregunta: '¿Quién cumple el puerto?',
    celdas: [
      'DatosAulasPostgres',
      'ContextoUsuarioHttp (Blazor) · DatosDocentesPostgres',
      'AutenticadorSupabase · DatosAccesoPostgres',
      'Infraestructura, Blazor y Scheduler a la vez',
    ],
    lectura:
      'El adaptador no vive siempre en Infraestructura. Lo que nunca cambia es que se elige en Program.cs.',
  },
  {
    pregunta: '¿Toca Dominio?',
    celdas: [
      'Solo de vuelta: Aula',
      'Solo de vuelta: Docente',
      'Usuario y EstadoUsuario',
      'Sí: plan.CambiarEstado',
    ],
    lectura:
      'Dominio aparece cuando hay una decisión del negocio; si no, solo presta los tipos que viajan.',
  },
  {
    pregunta: '¿Qué regresa?',
    celdas: ['Aula[]', 'Docente', 'ResultadoInicioSesion', 'GeneracionHorarioDto'],
    lectura:
      'Entidades de Dominio o registros de Contratos. Nunca una fila de base ni un JSON crudo.',
  },
  {
    pregunta: '¿Dónde termina?',
    celdas: [
      'En la misma petición',
      'En la misma petición',
      'En la misma petición',
      'En segundo plano, minutos después',
    ],
    lectura:
      'Lo único que de verdad rompe el molde: cuando el trabajo es lento, sale de la petición por un puerto más.',
  },
];

/* ────────────────────────────────────────────────────── 04 · por qué así */

export interface Regla {
  titulo: string;
  texto: string;
  prueba: string;
}

export const REGLAS: Regla[] = [
  {
    titulo: 'Las flechas apuntan hacia adentro',
    texto:
      'La pantalla y la base dependen del centro; el centro no depende de ellas. Aplicación no tiene una sola referencia a Infraestructura.',
    prueba: 'Compruébalo: Horarios.Aplicacion.csproj solo referencia Dominio y Contratos.',
  },
  {
    titulo: 'Se pide por interfaz, se cumple por fuera',
    texto:
      'Aplicación declara 21 puertos. Quién los cumple se decide en un solo archivo, y cambiarlo no toca ningún caso de uso.',
    prueba:
      'Compruébalo: las ~80 líneas AddScoped de Program.cs son la lista completa de decisiones.',
  },
  {
    titulo: 'Lo que viaja está escrito',
    texto:
      'Todo lo que cruza de una capa a otra es una entidad de Dominio o un registro de Contratos, con campos fijos.',
    prueba: 'Compruébalo: las clases *Fila de Infraestructura no salen nunca de su adaptador.',
  },
  {
    titulo: 'Lo lento no bloquea',
    texto:
      'Una generación puede tardar minutos, así que sale de la petición web por un puerto —IColaGeneraciones— y corre con su propio tope de tiempo.',
    prueba:
      'Compruébalo: EjecutarGeneracionPlan lo llama ProcesadorTrabajosPesados, no una página.',
  },
];

export interface DondeTocar {
  quiero: string;
  toco: string;
  noToco: string;
}

export const DONDE_TOCAR: DondeTocar[] = [
  {
    quiero: 'Agregar un campo a docente',
    toco: 'Contratos (la solicitud), Dominio (la entidad), el adaptador y la pantalla.',
    noToco: 'El caso de uso, salvo que el campo necesite validación propia.',
  },
  {
    quiero: 'Cambiar de Supabase a otra base',
    toco: 'Los 15 adaptadores de Infraestructura y las líneas de Program.cs.',
    noToco: 'Ni un caso de uso, ni una entidad, ni el motor, ni una página.',
  },
  {
    quiero: 'Añadir una regla académica nueva',
    toco: 'Dominio si vale siempre; ReglasDuras si es sobre lo que el motor considera legal.',
    noToco:
      'Las pantallas: una regla escrita en un if de la .razor se pierde en cuanto haya otra pantalla.',
  },
  {
    quiero: 'Crear una pantalla nueva',
    toco: 'Solo Blazor: se inyectan los casos de uso que ya existen.',
    noToco:
      'Nada más, si el trámite ya estaba. Si no, se agrega un caso de uso, no lógica en el HTML.',
  },
  {
    quiero: 'Probar el motor sin base de datos',
    toco: 'Se arma una InstantaneaMotor a mano y se le pasa a MotorHorario.',
    noToco: 'No hace falta servidor, ni base, ni usuarios: Scheduler solo referencia Contratos.',
  },
  {
    quiero: 'Averiguar por qué salió mal una generación',
    toco: 'La bitácora: entrada, resultado, duración y diagnóstico por sesión no asignada.',
    noToco: 'No hay que reproducir nada a mano: la instantánea de entrada quedó guardada.',
  },
];
