// Fuente: código real del repositorio (src/Horarios.*), referencias de proyecto de los
// .csproj y el registro de dependencias de src/Horarios.Blazor/Program.cs.

export type CapaId =
  | 'blazor'
  | 'aplicacion'
  | 'dominio'
  | 'contratos'
  | 'scheduler'
  | 'infraestructura'
  | 'datos';

export interface ArchivoReal {
  ruta: string;
  nota: string;
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
  noHace: string[];
  /** Con quién habla y en qué dirección. */
  habla: string;
  archivos: ArchivoReal[];
}

export const CAPAS: Capa[] = [
  {
    id: 'blazor',
    proyecto: 'Horarios.Blazor',
    rol: 'La pantalla',
    color: '#3f6fd6',
    analogia:
      'El mostrador de atención: recibe a la persona, muestra lo que hay y toma la solicitud. No decide nada por su cuenta.',
    hace: [
      'Dibuja las páginas y responde a los clics: Planes, Docentes, Aulas, Academia, Períodos, Acceso.',
      'Traduce errores técnicos a frases entendibles antes de mostrarlos.',
      'Arma el tablero de conexiones en Program.cs: dice qué pieza concreta cumple cada interfaz.',
      'Guarda los trabajos pesados en una cola y los ejecuta en segundo plano para no congelar la pantalla.',
    ],
    noHace: [
      'No consulta la base de datos por su cuenta.',
      'No contiene reglas del negocio: pregunta, muestra y avisa.',
    ],
    habla: 'Llama a los casos de uso de Aplicación y usa Contratos para leer la respuesta.',
    archivos: [
      { ruta: 'Components/Pages/Planes.razor', nota: 'La pantalla donde se genera el horario.' },
      { ruta: 'Program.cs', nota: 'Conecta cada interfaz con su implementación real.' },
      { ruta: 'ColaGeneracionesEnMemoria.cs', nota: 'Encola la generación con el token del usuario.' },
      { ruta: 'ProcesadorTrabajosPesados.cs', nota: 'Servicio de fondo que va sacando trabajos de la cola.' },
      { ruta: 'Acceso/ContextoUsuarioHttp.cs', nota: 'Responde quién es el usuario y qué permisos tiene.' },
    ],
  },
  {
    id: 'aplicacion',
    proyecto: 'Horarios.Aplicacion',
    rol: 'El que lleva el trámite',
    color: '#b5791b',
    analogia:
      'El funcionario que atiende: pide los papeles, comprueba que estén completos, aplica el procedimiento en orden y manda a archivar. Él mismo no guarda nada.',
    hace: [
      'Un archivo por caso de uso: GenerarHorarioPlan, CrearDocente, RevisarDatosPlan, IniciarSesion, CrearPlan…',
      'Comprueba permisos antes de actuar: IContextoUsuario.TienePermiso(PermisosMotor.Generar).',
      'Ordena los pasos y decide qué error se lanza cuando algo falta (DatosPlanIncompletosException).',
      'Declara lo que necesita como interfaces: IDatosPlanes, IDatosGeneraciones, IPreparadorInstantaneaMotor, IColaGeneraciones.',
    ],
    noHace: [
      'No sabe si los datos viven en Supabase, en PostgreSQL o en otro lado.',
      'No calcula el horario: eso es del motor.',
    ],
    habla: 'Usa Dominio y Contratos. Pide datos por interfaz; otra capa cumple esa interfaz.',
    archivos: [
      { ruta: 'Motor/GenerarHorarioPlan.cs', nota: 'Solicita la generación: permiso, revisión, instantánea y cola.' },
      { ruta: 'Motor/EjecutarGeneracionPlan.cs', nota: 'Corre el motor, verifica y cierra la generación.' },
      { ruta: 'Planes/RevisarDatosPlan.cs', nota: 'Dice si al plan le falta algo para poder generarse.' },
      { ruta: 'Docentes/CrearDocente.cs', nota: 'Ejemplo de caso de uso simple del mismo estilo.' },
    ],
  },
  {
    id: 'dominio',
    proyecto: 'Horarios.Dominio',
    rol: 'Las reglas de la institución',
    color: '#8b52d9',
    analogia:
      'El reglamento escrito en código: qué es un plan, en qué estados puede estar y qué cambios de estado son legales.',
    hace: [
      'Define las entidades: PlanHorario, Docente, Aula, Jornada, Carrera, Facultad, Usuario.',
      'Define los estados y sus transiciones: Borrador → Generando → Generado, Inviable o Fallido.',
      'Concentra las reglas que valen siempre, sin importar la pantalla ni la base de datos.',
    ],
    noHace: ['No conoce HTTP, ni SQL, ni Supabase. Es el único proyecto que no referencia a ningún otro.'],
    habla: 'Nadie le manda: las demás capas lo usan como referencia.',
    archivos: [
      { ruta: 'Planes/PlanHorario.cs', nota: 'La entidad central del sprint; CambiarEstado vive aquí.' },
      { ruta: 'Planes/EstadoHorario.cs', nota: 'Los estados válidos de un plan.' },
      { ruta: 'Docentes/Docente.cs', nota: 'Carga máxima, prioridad y datos del docente.' },
      { ruta: 'Aulas/Aula.cs', nota: 'Capacidad, tipo y recursos del aula.' },
    ],
  },
  {
    id: 'contratos',
    proyecto: 'Horarios.Contratos',
    rol: 'El idioma común',
    color: '#5c7a99',
    analogia:
      'Los formularios oficiales: fijan exactamente qué campos viajan de una oficina a otra. Ninguna capa inventa su propio formato.',
    hace: [
      'Solicitudes de entrada: CrearPlanSolicitud, CrearDocenteSolicitud, AutorizarCursoDocenteSolicitud.',
      'Respuestas de salida: GeneracionHorarioDto, HorarioGeneradoDto, RevisionPlanDto, DocenteResumenDto.',
      'El contrato del motor: InstantaneaMotor entra, ResultadoMotor y ResultadoVerificacion salen.',
      'Son registros inmutables: una vez armados, nadie los modifica a mitad de camino.',
    ],
    noHace: ['No tiene lógica ni decisiones: solo describe la forma de los datos.'],
    habla: 'Lo usan todas las capas. Es el único proyecto que el motor necesita.',
    archivos: [
      { ruta: 'Motor/ContratoMotor.cs', nota: 'InstantaneaMotor, ResultadoMotor, IMotorHorarios, IVerificadorHorario.' },
      { ruta: 'Planes/GeneracionHorarioDtos.cs', nota: 'El comprobante de generación y el horario ya armado.' },
      { ruta: 'Planes/RevisionPlanDto.cs', nota: 'PuedeGenerarse + lista de datos faltantes.' },
    ],
  },
  {
    id: 'scheduler',
    proyecto: 'Horarios.Scheduler',
    rol: 'El motor de cálculo',
    color: '#2a9468',
    analogia:
      'La calculadora: recibe una fotografía de los datos, hace las cuentas y devuelve una propuesta. Con la misma foto da el mismo resultado.',
    hace: [
      'MotorHorario: coloca primero lo más difícil («más restringido primero») y luego mejora lo colocado, con tope de tiempo y de pasadas.',
      'ReglasDuras: una sola definición de lo que es legal — docente autorizado, capacidad del aula, recursos, laboratorio.',
      'VerificadorHorario: revisa el resultado por separado; si encuentra una violación dura, la generación queda Inviable.',
      'ExpansorSesiones: convierte «este curso lleva 3 sesiones por semana» en sesiones concretas con identificador estable.',
    ],
    noHace: ['No abre conexiones, no lee la base, no sabe de usuarios ni de pantallas.'],
    habla: 'Solo depende de Contratos. Por eso se puede probar entero sin base de datos.',
    archivos: [
      { ruta: 'MotorHorario.cs', nota: 'Construcción voraz + mejora local.' },
      { ruta: 'ReglasDuras.cs', nota: 'Lo que nunca se puede violar.' },
      { ruta: 'VerificadorHorario.cs', nota: 'Segundo par de ojos sobre el resultado.' },
      { ruta: 'ExpansorSesiones.cs', nota: 'Requisitos del pensum → sesiones a colocar.' },
    ],
  },
  {
    id: 'infraestructura',
    proyecto: 'Horarios.Infraestructura',
    rol: 'El puente a los datos',
    color: '#c0522d',
    analogia:
      'El archivo y el mensajero: sabe dónde está guardado cada papel y cómo pedirlo. Cumple, en concreto, lo que Aplicación pidió por interfaz.',
    hace: [
      'Implementa los puertos: DatosPlanesPostgres cumple IDatosPlanes, DatosGeneracionesPostgres cumple IDatosGeneraciones.',
      'ClienteDatosSupabase: un único lugar que habla HTTP con Supabase sobre el esquema horarios y llama sus funciones RPC.',
      'PreparadorInstantaneaMotorPostgres: arma la fotografía que consume el motor con consultas directas a PostgreSQL.',
      'Traduce errores de base a errores del negocio: un duplicado 23505 se convierte en GeneracionPlanEnCursoException.',
    ],
    noHace: ['No decide reglas ni valida procedimientos: trae, guarda y traduce.'],
    habla: 'Aplicación no la conoce por nombre; la recibe ya conectada desde Program.cs.',
    archivos: [
      { ruta: 'Supabase/ClienteDatosSupabase.cs', nota: 'Consultar, insertar, actualizar y RPC.' },
      { ruta: 'Planes/DatosGeneracionesPostgres.cs', nota: 'iniciar_generacion, finalizar_generacion, historial.' },
      { ruta: 'Motor/PreparadorInstantaneaMotorPostgres.cs', nota: 'Cohortes, bloques, docentes, aulas y requisitos.' },
      { ruta: 'Planes/DatosPlanesPostgres.cs', nota: 'Alta, consulta y cambio de estado del plan.' },
    ],
  },
  {
    id: 'datos',
    proyecto: 'Supabase / PostgreSQL',
    rol: 'La bodega',
    color: '#6b6153',
    analogia:
      'El archivo central de la universidad: guarda todo y, además, vuelve a comprobar en la puerta quién está pidiendo qué.',
    hace: [
      'Guarda las 57 tablas del esquema horarios con sus 110 claves foráneas (ver slide 2).',
      'Ejecuta funciones RPC que resuelven un trámite completo en un solo viaje: iniciar_generacion, finalizar_generacion, conteos_revision_plan.',
      'Aplica políticas de acceso por fila con el token del usuario: la seguridad no depende solo de la pantalla.',
      'Todo el esquema está versionado en supabase/migrations, así cualquier equipo levanta la misma base.',
    ],
    noHace: ['No contiene la lógica de generación: eso vive en el motor.'],
    habla: 'Solo recibe llamadas de Infraestructura.',
    archivos: [
      { ruta: 'supabase/migrations/', nota: 'Tablas, funciones y políticas versionadas.' },
      { ruta: 'docs/database.sql', nota: 'Esquema completo usado para el diagrama del slide 2.' },
    ],
  },
];

export const CAPAS_POR_ID: Record<CapaId, Capa> = Object.fromEntries(
  CAPAS.map((c) => [c.id, c]),
) as Record<CapaId, Capa>;

export interface PasoFlujo {
  n: number;
  capa: CapaId;
  /** Qué pasa, en lenguaje de todos los días. */
  titulo: string;
  llano: string;
  archivo: string;
  /** Qué se manda hacia adelante. */
  envia: string;
  /** Qué regresa. */
  devuelve: string;
  nota?: string;
}

/**
 * Flujo real de «generar el horario de un plan», de punta a punta.
 * Cada paso es verificable en el archivo indicado.
 */
export const FLUJO: PasoFlujo[] = [
  {
    n: 1,
    capa: 'blazor',
    titulo: 'La persona hace clic en «Generar horario»',
    llano:
      'El botón solo aparece si antes se corrió la revisión previa y salió en verde. Nada más se envía el identificador del plan.',
    archivo: 'Horarios.Blazor/Components/Pages/Planes.razor',
    envia: 'Generar(plan.Id) → GenerarHorarioPlan.EjecutarAsync(Guid planId)',
    devuelve: 'GeneracionHorarioDto — el comprobante de que la generación quedó abierta',
  },
  {
    n: 2,
    capa: 'aplicacion',
    titulo: '¿Esta persona tiene permiso?',
    llano:
      'Lo primero que hace el caso de uso es preguntar si hay sesión iniciada y si el usuario tiene el permiso «Motor/generar». Si no, se detiene ahí.',
    archivo: 'Horarios.Aplicacion/Motor/GenerarHorarioPlan.cs',
    envia: 'IContextoUsuario.TienePermiso(PermisosMotor.Generar)',
    devuelve: 'true / false — si es false, UnauthorizedAccessException',
    nota: 'Quien responde de verdad es ContextoUsuarioHttp, en la capa de pantalla, que lee la sesión del navegador.',
  },
  {
    n: 3,
    capa: 'infraestructura',
    titulo: 'Traer el plan y mirar su estado',
    llano:
      'Aplicación pide el plan por interfaz. Quien va a buscarlo es el adaptador de Supabase. Solo un plan en Borrador puede generar, y esa regla es del Dominio.',
    archivo: 'IDatosPlanes.ObtenerAsync → Horarios.Infraestructura/Planes/DatosPlanesPostgres.cs',
    envia: 'Guid planId',
    devuelve: 'PlanHorario (entidad de Dominio, con Estado y VersionFila)',
  },
  {
    n: 4,
    capa: 'aplicacion',
    titulo: 'Revisión previa: ¿están todos los datos?',
    llano:
      'Se cuenta lo que hace falta —cohortes, aulas, docentes autorizados, disponibilidad— antes de gastar tiempo de cálculo. Si falta algo, la pantalla lo dice con nombre y apellido.',
    archivo: 'Horarios.Aplicacion/Planes/RevisarDatosPlan.cs → RPC conteos_revision_plan',
    envia: 'Guid planId',
    devuelve: 'RevisionPlanDto(PuedeGenerarse, DatosFaltantes)',
    nota: 'Si PuedeGenerarse es false se lanza DatosPlanIncompletosException con la lista exacta de lo que falta.',
  },
  {
    n: 5,
    capa: 'infraestructura',
    titulo: 'Se toma la fotografía de los datos',
    llano:
      'Se leen cohortes, bloques de horario, disponibilidad docente, docentes, aulas y requisitos del período, respetando el alcance del plan (sus carreras y sus jornadas). Esa foto queda congelada: aunque alguien edite datos mientras tanto, la generación usa lo que vio al inicio.',
    archivo: 'Horarios.Infraestructura/Motor/PreparadorInstantaneaMotorPostgres.cs + ExpansorSesiones',
    envia: 'PlanHorario',
    devuelve: 'InstantaneaMotor — docentes, aulas, cohortes, bloques y sesiones, en listas inmutables',
  },
  {
    n: 6,
    capa: 'infraestructura',
    titulo: 'Se abre la generación en la base',
    llano:
      'Queda registrado que este plan empezó a generarse, con quién lo pidió, con qué versión del motor y con qué datos de entrada. Sirve de bitácora y evita generaciones duplicadas.',
    archivo: 'Horarios.Infraestructura/Planes/DatosGeneracionesPostgres.cs → RPC iniciar_generacion',
    envia: 'p_plan_id, p_periodo_id, p_tipo_plan, p_version_motor "motor-hibrido-1", p_clave_solicitud "plan:vN", p_instantanea_entrada',
    devuelve: 'GeneracionHorarioDto(Id, Estado = Pendiente, IniciadaEn…)',
    nota: 'Si el plan ya tenía una generación activa, la base lo rechaza y sale GeneracionPlanEnCursoException.',
  },
  {
    n: 7,
    capa: 'dominio',
    titulo: 'El plan pasa a «Generando»',
    llano:
      'El cambio de estado lo decide la entidad, no la pantalla. Al guardar se envía también el número de versión de la fila: si alguien más tocó ese plan mientras tanto, el guardado se rechaza en vez de pisar su trabajo.',
    archivo: 'plan.CambiarEstado(EstadoHorario.Generando) → IDatosPlanes.GuardarCambioEstadoAsync',
    envia: 'PlanHorario nuevo + estado anterior + VersionFila',
    devuelve: 'PlanHorario ya en estado Generando',
  },
  {
    n: 8,
    capa: 'blazor',
    titulo: 'Se encola el trabajo y la pantalla queda libre',
    llano:
      'Aquí termina la petición web. El usuario no se queda mirando una pantalla congelada: ve el estado «Generando» y la página consulta sola cómo va.',
    archivo: 'IColaGeneraciones.Encolar → Horarios.Blazor/ColaGeneracionesEnMemoria.cs',
    envia: 'SolicitudGeneracionEncolada(GeneracionId, PlanEnGeneracion, Instantanea, SolicitadaPorId)',
    devuelve: 'Nada. El control vuelve de inmediato a la pantalla con el comprobante del paso 6',
  },
  {
    n: 9,
    capa: 'blazor',
    titulo: 'Un proceso de fondo toma el trabajo',
    llano:
      'Un servicio que corre siempre va sacando trabajos de la cola. Como la petición web ya terminó, abre sus propias conexiones y vuelve a poner el token del usuario que lo pidió, para que la base siga aplicando sus mismos permisos. Tiene un tope de tiempo (300 s por defecto).',
    archivo: 'Horarios.Blazor/ProcesadorTrabajosPesados.cs → EjecutarGeneracionPlan.EjecutarAsync',
    envia: 'SolicitudGeneracionEncolada + límite de cancelación',
    devuelve: 'ResultadoGeneracionPlanDto al terminar',
  },
  {
    n: 10,
    capa: 'scheduler',
    titulo: 'El motor arma el horario',
    llano:
      'Coloca primero las sesiones con menos opciones posibles y después intenta mejorar lo colocado: menos huecos muertos, clases más seguidas, carga más pareja. Todo ocurre en memoria, sin tocar la base.',
    archivo: 'Horarios.Scheduler/MotorHorario.cs',
    envia: 'InstantaneaMotor',
    devuelve: 'ResultadoMotor(SesionesAsignadas, SesionesPendientes, Diagnosticos, PuntajeInicial, PuntajeFinal)',
  },
  {
    n: 11,
    capa: 'scheduler',
    titulo: 'Un segundo par de ojos revisa el resultado',
    llano:
      'El verificador vuelve a comprobar el horario contra las mismas reglas duras, por separado del motor. Si algo se coló —un docente en dos lados, un aula sin capacidad—, el resultado no se da por bueno.',
    archivo: 'Horarios.Scheduler/VerificadorHorario.cs',
    envia: 'InstantaneaMotor + ResultadoMotor',
    devuelve: 'ResultadoVerificacion(Violaciones, EsValido)',
  },
  {
    n: 12,
    capa: 'infraestructura',
    titulo: 'Se guarda todo y se cierra la generación',
    llano:
      'Se graban el horario, los mensajes, la duración y el puntaje. Si la verificación pasó, queda Completada y el plan Generado; si no, queda Inviable con el diagnóstico de cada sesión que no se pudo colocar.',
    archivo: 'DatosGeneracionesPostgres.FinalizarAsync → RPC finalizar_generacion',
    envia: 'generacionId, estado, duracionMs, instantánea, ResultadoMotor, ResultadoVerificacion',
    devuelve: 'GeneracionHorarioDto final (Completada / Inviable / Fallida / Cancelada)',
  },
  {
    n: 13,
    capa: 'blazor',
    titulo: 'La pantalla se entera y muestra el horario',
    llano:
      'La página, que iba consultando el estado, ve que el plan dejó de estar «Generando», escribe el resumen de cierre y ya se puede abrir la cuadrícula con curso, docente, aula, día y hora.',
    archivo: 'ListarGeneracionesPlan + ConsultarHorarioGenerado → RPC listar_generaciones_plan, consultar_revision_horario',
    envia: 'Guid planId',
    devuelve: 'GeneracionHorarioDto[] (historial) y HorarioGeneradoDto (sesiones, conflictos y pendientes)',
  },
];

export interface Regla {
  titulo: string;
  texto: string;
}

export const REGLAS: Regla[] = [
  {
    titulo: 'Las flechas apuntan hacia adentro',
    texto:
      'La pantalla y la base dependen del centro; el centro no depende de ellas. Dominio no referencia a nadie y el motor solo referencia Contratos.',
  },
  {
    titulo: 'Se pide por interfaz, se cumple por fuera',
    texto:
      'Aplicación dice «necesito un IDatosPlanes». Quién lo cumple se decide en un solo archivo, Program.cs. Cambiar de proveedor de datos no toca los casos de uso.',
  },
  {
    titulo: 'Lo que viaja está escrito',
    texto:
      'Todo lo que cruza de una capa a otra tiene un contrato con nombre y campos fijos. No hay datos sueltos ni formatos improvisados.',
  },
  {
    titulo: 'Lo lento no bloquea',
    texto:
      'Una generación puede tardar minutos, así que sale de la petición web y corre en segundo plano con su propio tope de tiempo.',
  },
];

export interface Beneficio {
  titulo: string;
  texto: string;
}

export const BENEFICIOS: Beneficio[] = [
  {
    titulo: 'Cambiar de base de datos',
    texto: 'Se reescribe Infraestructura. Pantallas, casos de uso, reglas y motor quedan intactos.',
  },
  {
    titulo: 'Probar el motor',
    texto: 'Se le pasa una instantánea armada a mano y se revisa el resultado. Sin servidor, sin base, sin usuarios.',
  },
  {
    titulo: 'Cambiar una regla académica',
    texto: 'Si es del negocio, se toca Dominio; si es de lo que el motor considera legal, ReglasDuras. Un solo lugar cada una.',
  },
  {
    titulo: 'Encontrar un problema',
    texto: 'La bitácora de generaciones guarda entrada, resultado, duración y diagnóstico por sesión no asignada.',
  },
  {
    titulo: 'Agregar una pantalla',
    texto: 'Se reutilizan los casos de uso que ya existen; no se duplica lógica en el HTML.',
  },
  {
    titulo: 'Trabajar en paralelo',
    texto: 'Contratos fija el formato, así que motor, pantallas y datos avanzan al mismo tiempo sin chocar.',
  },
];
