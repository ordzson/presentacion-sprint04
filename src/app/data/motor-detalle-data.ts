// Sub-slides de la slide 5 «Motor»: los cuatro procesos que la slide del recorrido
// nombra pero no abre —asignación de aulas, docente duplicado, aula ocupada y cruce de
// horarios— más la lectura del horario ya guardado.
//
// Fuente: código real del repositorio Horarios-develop (rama integration/E0-05-P5),
// leído el 2026-08-31:
//
//   src/Horarios.Motor/Reglas/{ReglasAula,ReglasDocente,ReglasCohorte}.cs
//   src/Horarios.Motor/Ocupacion/{RegistroOcupacion,RegistroCarga,RegistroContinuidad}.cs
//   src/Horarios.Motor/Tiempo/RejillaTiempo.cs
//   src/Horarios.Motor/Construccion/{Precalculo,OrdenDeTrabajo,ColocadorVoraz}.cs
//   src/Horarios.Motor/Expansion/ExpansorAsignaciones.cs
//   src/Horarios.Motor/Verificacion/VerificadorHorario.cs
//   src/Horarios.Infraestructura/Motor/PreparadorInstantaneaMotorPostgres.cs  (C-5)
//   src/Horarios.Infraestructura/Planes/DatosGeneracionesPostgres.cs
//   src/Horarios.Infraestructura/Consultas/DatosConsultasPostgres.cs
//   src/Horarios.Aplicacion/{Aulas,Consultas,Motor}/
//   src/Horarios.Contratos/{Motor/ContratoMotor.cs, Consultas/, Planes/}
//   src/Horarios.Blazor/Components/Pages/{Planes,Consultas,Aulas,InicioDocente}.razor
//   docs/database.sql  (pg_dump de PostgreSQL 17.6)
//
// Los códigos D-nn y P-nn son los de docs/motor-v2-fase1.md del repositorio fuente:
// 43 reglas, D-01…D-35 duras del SQL y P-01…P-08 del proyecto. No hay ninguno inventado
// aquí, y los números de línea de database.sql son los que el propio código cita.

/** Los cinco carriles del mapa. El quinto es la base, que no es una capa del .NET. */
export type CapaDetalleId = 'blazor' | 'aplicacion' | 'infraestructura' | 'motor' | 'postgres';

export interface CapaDetalle {
  id: CapaDetalleId;
  titulo: string;
  proyecto: string;
}

export const CAPAS_DETALLE: CapaDetalle[] = [
  { id: 'blazor', titulo: 'Pantalla y hospedaje', proyecto: 'Horarios.Blazor' },
  { id: 'aplicacion', titulo: 'Casos de uso', proyecto: 'Horarios.Aplicacion' },
  { id: 'infraestructura', titulo: 'Adaptadores', proyecto: 'Horarios.Infraestructura' },
  { id: 'motor', titulo: 'Motor', proyecto: 'Horarios.Motor' },
  { id: 'postgres', titulo: 'Base de datos', proyecto: 'supabase · horarios' },
];

/** Qué hilo ejecuta la banda. El tercero no es un hilo del .NET: es el servidor de la base. */
export type HiloDetalleId = 'web' | 'fondo' | 'base';

export interface HiloDetalle {
  id: HiloDetalleId;
  titulo: string;
  quien: string;
}

export const HILOS_DETALLE: HiloDetalle[] = [
  {
    id: 'web',
    titulo: 'Hilo de la petición',
    quien: 'El circuito Blazor de quien pulsó el botón. Mientras dura, la persona espera mirando la pantalla.',
  },
  {
    id: 'fondo',
    titulo: 'Hilo de fondo',
    quien: 'ProcesadorTrabajosPesados: un BackgroundService único, de un solo consumidor, que arranca con la aplicación.',
  },
  {
    id: 'base',
    titulo: 'Dentro de Postgres',
    quien: 'Disparadores y restricciones que corren en la transacción de la RPC, no en el .NET.',
  },
];

/** Qué separa a quien pregunta de quien responde. */
export type FronteraDetalleId = 'proceso' | 'memoria' | 'hilo' | 'sql' | 'rpc' | 'render';

export const FRONTERAS_DETALLE: Record<FronteraDetalleId, string> = {
  proceso: 'llamada en proceso',
  memoria: 'lectura en memoria',
  hilo: 'cambio de hilo',
  sql: 'SQL crudo',
  rpc: 'JSON por RPC',
  render: 'a pantalla',
};

/** Una banda del mapa: un tramo de tiempo entero, con lo que lo arranca y lo cierra. */
export interface BandaDetalle {
  id: string;
  titulo: string;
  hilo: HiloDetalleId;
  /** La acción concreta que lo pone en marcha. */
  disparo: string;
  /** Cómo se sabe que terminó, con el número que lo acota si lo hay. */
  fin: string;
  color: string;
}

/** Un paso del mapa: una clase, en una capa, haciendo una cosa. */
export interface PasoDetalle {
  n: number;
  /** A qué banda pertenece. */
  banda: string;
  capa: CapaDetalleId;
  proyecto: string;
  clase: string;
  archivo: string;
  /** El método exacto, tal como se llama. */
  metodo: string;
  /** Qué hace, en una línea. */
  hace: string;
  entra: string;
  sale: string;
  /** Qué toca de la base, si toca algo. */
  base?: string;
  reglas?: string[];
  /** Qué ocurre cuando no puede seguir. */
  siFalla?: string;
}

/** Qué información se pide, a quién, y por qué contrato viaja. */
export interface Peticion {
  quien: string;
  aQuien: string;
  /** El tipo, método o consulta exacta. */
  contrato: string;
  frontera: FronteraDetalleId;
  pide: string;
  devuelve: string;
  nota: string;
}

/** En qué momento se comprueba la regla. */
export type MomentoReglaId = 'previa' | 'bucle' | 'fijada' | 'verificacion' | 'base';

export const MOMENTOS_REGLA: Record<MomentoReglaId, string> = {
  previa: 'antes de colocar nada',
  bucle: 'dentro del bucle',
  fijada: 'sobre las fijadas',
  verificacion: 'segunda opinión',
  base: 'al guardar',
};

export interface ReglaDetalle {
  codigo: string;
  nombre: string;
  momento: MomentoReglaId;
  /** El punto exacto del código. */
  donde: string;
  cuando: string;
  /** La pregunta que responde, en llano. */
  pregunta: string;
  /** El SQL del que es espejo, con su línea de database.sql. */
  espejo: string;
  siNo: string;
}

/** Una estructura viva: lo que se consulta y se actualiza miles de veces. */
export interface EstructuraDetalle {
  clase: string;
  archivo: string;
  /** El tipo del estado que guarda, literal. */
  guarda: string;
  /** Con qué clave se pregunta. */
  clave: string;
  responde: string;
  cambia: string;
  porque: string;
}

/** Un orden de preferencia: no optimiza, ordena. */
export interface OrdenDetalle {
  que: string;
  donde: string;
  criterios: string[];
  porque: string;
}

/** El mismo tramo leído dos veces: un dato suelto y el lote entero. */
export interface LecturaDetalle {
  titulo: string;
  individual: { unidad: string; pasos: string[] };
  lote: { unidad: string; pasos: string[] };
  cardinalidad: string;
}

/** Quién produce el fallo. */
export type OrigenFalloId = 'aplicacion' | 'motor' | 'verificador' | 'base';

export const ORIGENES_FALLO: Record<OrigenFalloId, string> = {
  aplicacion: 'caso de uso',
  motor: 'motor',
  verificador: 'verificador',
  base: 'Postgres',
};

export interface FalloDetalle {
  codigo: string;
  origen: OrigenFalloId;
  cuando: string;
  /** El texto tal como sale. */
  mensaje: string;
  arreglo: string;
}

export interface DetalleMotor {
  id: string;
  /** El número de sub-slide, para la navegación. */
  numero: string;
  eyebrow: string;
  titulo: string;
  subtitulo: string;
  bandas: BandaDetalle[];
  pasos: PasoDetalle[];
  piePasos: string;
  peticionesPista: string;
  peticiones: Peticion[];
  reglasPista: string;
  reglas: ReglaDetalle[];
  estructurasPista?: string;
  estructuras?: EstructuraDetalle[];
  ordenesPista?: string;
  ordenes?: OrdenDetalle[];
  lecturasPista: string;
  lecturas: LecturaDetalle[];
  fallosPista: string;
  fallos: FalloDetalle[];
  cifras: { valor: string; que: string; nota: string }[];
}

const COLOR_WEB = '#3f6fd6';
const COLOR_FONDO = '#b5791b';
const COLOR_LECTURA = '#2a9468';
const COLOR_BASE = '#7a4ea8';

// ══════════════════════════════════════════════════════ 5.1 · asignación de aulas

const AULAS: DetalleMotor = {
  id: 'aulas',
  numero: '5.1',
  eyebrow: 'Motor · 5.1',
  titulo: 'Asignación de aulas: de qué tiene el aula a qué aula ocupa la clase',
  subtitulo:
    'El aula es lo último que se decide y lo primero que se filtra. Cuatro reglas duras la descartan antes de colocar nada, tres criterios la ordenan, y el bucle solo pregunta si está libre. Aquí está el recorrido entero: quién declara la capacidad y los recursos, qué consulta los trae, qué clase los une, quién filtra, quién ordena, quién elige y quién lo vuelve a comprobar.',
  bandas: [
    {
      id: 'catalogo',
      titulo: 'Antes de generar · alguien declara qué tiene cada aula',
      hilo: 'web',
      disparo: 'Un usuario con permiso aulas:crear guarda un aula o le asigna un recurso en Aulas.razor.',
      fin: 'Cuando la fila queda en horarios.aulas y en horarios.aula_recursos. No hay motor de por medio.',
      color: COLOR_WEB,
    },
    {
      id: 'foto',
      titulo: 'La foto · las aulas entran a la instantánea',
      hilo: 'web',
      disparo: 'El clic en «Generar» de Planes.razor. Es la etapa 3 del recorrido de la slide 5.',
      fin: 'Cuando CargarAulasAsync devuelve el ImmutableArray<Aula>. Después de esto nadie vuelve a leer aulas de la base.',
      color: COLOR_WEB,
    },
    {
      id: 'motor',
      titulo: 'El segundo plano · filtrar, ordenar y elegir',
      hilo: 'fondo',
      disparo:
        'ProcesadorTrabajosPesados saca el trabajo de la cola: 250 ms como mucho, que es lo que duerme cuando está vacía.',
      fin: 'Cuando el colocador devuelve su Resultado, o cuando CancelAfter vence a los 300 s.',
      color: COLOR_FONDO,
    },
    {
      id: 'guardado',
      titulo: 'El guardado · la base vuelve a comprobarlo todo',
      hilo: 'base',
      disparo: 'La RPC finalizar_generacion, en una sola transacción.',
      fin: 'Cuando guardar_resultado_generacion devuelve cuántas sesiones quedaron insertadas.',
      color: COLOR_BASE,
    },
  ],
  pasos: [
    {
      n: 1,
      banda: 'catalogo',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Aulas.razor',
      archivo: 'Components/Pages/Aulas.razor',
      metodo: 'CrearAula.EjecutarAsync · GestionarRecursosAulas.AsignarAsync',
      hace: 'Da de alta el aula con su capacidad y su tipo, y le declara qué recursos tiene y cuántos.',
      entra: 'CrearAulaSolicitud(Codigo, CapacidadMaxima, Tipo, TipoLaboratorioDisponible, Piso, NumeroAula)',
      sale: 'AsignarRecursoAulaSolicitud(AulaId, RecursoId, Cantidad)',
      siFalla: 'La pantalla muestra el error del caso de uso; no se crea nada a medias.',
    },
    {
      n: 2,
      banda: 'catalogo',
      capa: 'aplicacion',
      proyecto: 'Horarios.Aplicacion',
      clase: 'CrearAula · GestionarRecursosAulas',
      archivo: 'Aulas/CrearAula.cs · Aulas/GestionarRecursosAulas.cs',
      metodo: 'AutorizacionAplicacion.Exigir(contexto, "aulas", "crear")',
      hace: 'Exige el permiso, normaliza el código a mayúsculas y delega en el puerto.',
      entra: 'CrearAulaSolicitud · CrearRecursoAulaSolicitud',
      sale: 'Aula · RecursoAula (tipos del dominio)',
      reglas: ['aulas:crear'],
      siFalla: 'UnauthorizedAccessException. El caso de uso no conoce Postgres: solo habla por IDatosAulas.',
    },
    {
      n: 3,
      banda: 'catalogo',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'DatosAulasPostgres · DatosRecursosAulasPostgres',
      archivo: 'Aulas/DatosAulasPostgres.cs · Aulas/DatosRecursosAulasPostgres.cs',
      metodo: 'IDatosAulas · IDatosRecursosAulas',
      hace: 'Escribe la fila del aula y las de su inventario. La cantidad se guarda por recurso, no como un sí o un no.',
      entra: 'Aula · RecursoAsignadoAula',
      sale: 'filas persistidas',
      base: 'aulas · aula_recursos',
    },
    {
      n: 4,
      banda: 'foto',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'PreparadorInstantaneaMotorPostgres',
      archivo: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
      metodo: 'CargarAulasAsync — la consulta C-5',
      hace:
        'Trae todas las aulas activas con capacidad, tipo, tipo de laboratorio y sus recursos con cantidad, agregados en dos arreglos paralelos.',
      entra: 'ninguna: la consulta no lleva parámetros',
      sale: 'ImmutableArray<Aula>, ordenada por Id',
      base:
        'select a.id, a.capacidad_maxima, a.tipo, a.tipo_laboratorio_disponible, array_agg(ar.recurso_id), array_agg(ar.cantidad) … left join aula_recursos … where a.esta_activa and a.eliminado_en is null group by a.id order by a.id',
      reglas: ['D-23', 'P-05'],
      siFalla:
        'Sin aulas activas no lanza: la lista queda vacía y todas las asignaciones caerán con SIN_AULA_FACTIBLE.',
    },
    {
      n: 5,
      banda: 'foto',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ExpansorAsignaciones',
      archivo: 'Expansion/ExpansorAsignaciones.cs',
      metodo: 'Expandir — la unión de exigencias de aula',
      hace:
        'Une lo que exigen los cursos visibles de todas las cohortes de la sesión: laboratorio con un OR, tipo de laboratorio único, y de cada recurso el máximo, no la suma.',
      entra: 'RequisitoCargado[] agrupados por ClaveAsignacion',
      sale: 'SesionRequerida.RequiereLaboratorio · TipoLaboratorioRequerido · Recursos',
      reglas: ['D-24', 'D-25', 'D-26'],
      siFalla:
        'Dos tipos de laboratorio distintos en la misma sesión lanzan InvalidOperationException: una sesión ocupa un aula sola, así que no se elige ninguno de los dos.',
    },
    {
      n: 6,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'Precalculo',
      archivo: 'Construccion/Precalculo.cs',
      metodo: 'Calcular → AsignacionPrecalculada.AulasFactibles',
      hace:
        'Filtra el catálogo entero con las cuatro reglas puras de aula, una sola vez por asignación, antes de intentar colocar nada.',
      entra: 'Instantanea.Aulas + la sesión de referencia de la asignación',
      sale: 'ImmutableArray<Aula> factibles, ordenada por Id',
      reglas: ['D-24', 'D-25', 'D-26', 'D-27'],
      siFalla:
        'Lista vacía: emite el diagnóstico SIN_AULA_FACTIBLE con el filtro exacto que la vació, y sigue. No lanza.',
    },
    {
      n: 7,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'OrdenDeTrabajo',
      archivo: 'Construccion/OrdenDeTrabajo.cs',
      metodo: 'Asignaciones — la dificultad',
      hace:
        'Multiplica docentes × aulas × colocaciones factibles: cuantas menos aulas le queden a una asignación, antes se atiende.',
      entra: 'AsignacionPrecalculada[]',
      sale: 'las mismas, de la más difícil a la más fácil',
      reglas: ['§9.1'],
    },
    {
      n: 8,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'OrdenDeTrabajo',
      archivo: 'Construccion/OrdenDeTrabajo.cs',
      metodo: 'Aulas(asignacion.AulasFactibles, libres[0])',
      hace:
        'Ordena las aulas que pasaron el filtro: primero la más ajustada. Se calcula una vez por asignación, fuera del bucle de sesiones.',
      entra: 'ImmutableArray<Aula> factibles + una sesión cualquiera de la asignación',
      sale: 'ImmutableArray<Aula> ordenada',
      reglas: ['§9.3'],
    },
    {
      n: 9,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'ColocarUna — el bucle interno de aulas',
      hace:
        'Con el día, la hora y el docente ya decididos, recorre las aulas ordenadas y se queda con la primera libre. El aula es lo único que obliga a recorrer una lista.',
      entra: 'SesionRequerida + Docente + Colocacion + aulas ordenadas',
      sale: 'SesionColocada(SesionId, DocenteId, AulaId, Colocacion)',
      reglas: ['D-29'],
      siFalla:
        'Ninguna libre: cuenta un rechazo D-29 por cada aula probada y pasa a la siguiente colocación.',
    },
    {
      n: 10,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'OcuparFijadas → VerificarFila',
      hace:
        'Las sesiones que alguien fijó a mano traen su aula ya elegida: se les exigen las mismas cuatro reglas antes de ocupar nada.',
      entra: 'Instantanea.Fijadas (consulta C-7)',
      sale: 'ocupación previa, inamovible',
      reglas: ['P-04', 'D-24', 'D-25', 'D-26', 'D-27'],
      siFalla:
        'InvalidOperationException nombrando el aula y la sesión: no se mueve una fijada ni se degrada en silencio a pendiente.',
    },
    {
      n: 11,
      banda: 'motor',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'VerificadorHorario',
      archivo: 'Verificacion/VerificadorHorario.cs',
      metodo: 'VerificarFila',
      hace:
        'Segunda opinión sobre el resultado: vuelve a pasar las cuatro reglas de aula sobre cada sesión emitida, sin fiarse de quién la produjo.',
      entra: 'Instantanea + Resultado',
      sale: 'Violacion[] con cinco códigos posibles de aula',
      reglas: ['D-24', 'D-25', 'D-26', 'D-27'],
      siFalla: 'Cualquier violación cierra la generación como Inviable en vez de Completada.',
    },
    {
      n: 12,
      banda: 'guardado',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'DatosGeneracionesPostgres',
      archivo: 'Planes/DatosGeneracionesPostgres.cs',
      metodo: 'HorarioAGuardar → p_sesiones',
      hace: 'Traduce cada SesionColocada a JSON: aula_id entre sus once campos, ordenado por SesionId.',
      entra: 'Resultado.Colocadas',
      sale: 'p_sesiones: [{ sesion_id, curso_id, docente_id, aula_id, jornada_id, dia, … }]',
      base: 'RPC finalizar_generacion',
    },
    {
      n: 13,
      banda: 'guardado',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'guardar_resultado_generacion',
      archivo: 'docs/database.sql:2475',
      metodo: 'insert into horarios.sesiones … aula_id',
      hace:
        'Borra el horario anterior del plan entero e inserta el nuevo. Cada inserción dispara la validación del aula contra el curso visible de cada cohorte.',
      entra: 'p_sesiones · p_pendientes · p_conflictos',
      sale: 'cuántas sesiones quedaron insertadas',
      base: 'sesiones · sesion_cohortes → trigger completar_sesion_cohorte + EXCLUDE sesiones_aula_no_solapada',
      reglas: ['D-24', 'D-25', 'D-26', 'D-27', 'D-29'],
      siFalla:
        'La excepción del trigger revienta la transacción entera: o se guarda el horario completo o no se guarda nada.',
    },
  ],
  piePasos:
    'Cinco de los trece pasos comprueban lo mismo. No es redundancia por descuido: el precálculo filtra para no perder tiempo, el colocador confía en el filtro, el verificador no confía en nadie, y la base es la única que no se puede saltar.',
  peticionesPista:
    'Quién le pregunta qué a quién, y qué separa a los dos. Dentro del motor no hay ninguna consulta: todo lo que se pregunta ya está en memoria, dentro de la instantánea.',
  peticiones: [
    {
      quien: 'PreparadorInstantaneaMotorPostgres',
      aQuien: 'Postgres',
      contrato: 'C-5 · SQL crudo por NpgsqlDataSource',
      frontera: 'sql',
      pide: 'Todas las aulas activas con capacidad, tipo, tipo de laboratorio y sus recursos con cantidad.',
      devuelve: 'ImmutableArray<Aula>, ordenada por Id',
      nota:
        'El join a aula_recursos es externo a propósito: un aula sin recursos declarados sigue siendo usable. No se filtra por facultad, carrera ni jornada (P-05).',
    },
    {
      quien: 'ExpansorAsignaciones',
      aQuien: 'RequisitoCargado (consulta C-3)',
      contrato: 'RequiereLaboratorio · TipoLaboratorioRequerido · Recursos',
      frontera: 'memoria',
      pide: 'Qué exige el curso visible de cada cohorte que va a compartir la clase.',
      devuelve: 'una sola exigencia por sesión: OR, valor único y máximo por recurso',
      nota:
        'Por eso el aula que pasa las cuatro reglas contra la sesión pasa también las de cada curso visible por separado, que es lo que comprueba el SQL.',
    },
    {
      quien: 'Precalculo',
      aQuien: 'ReglasAula',
      contrato: 'AulaAdmiteLaboratorio · AulaTieneTipoDeLaboratorio · AulaTieneRecursos · AulaTieneCapacidad',
      frontera: 'proceso',
      pide: '¿Este aula sirve para esta sesión?',
      devuelve: 'bool',
      nota:
        'Las cuatro son estáticas y puras: solo miran el aula y la sesión. Por eso el colocador y el verificador pueden compartirlas sin arriesgar dos respuestas distintas para el mismo par.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'AsignacionPrecalculada',
      contrato: 'AulasFactibles (ImmutableArray<Aula>)',
      frontera: 'memoria',
      pide: '¿Qué aulas puedo siquiera intentar para esta asignación?',
      devuelve: 'la lista ya filtrada, sin volver a evaluar ninguna regla',
      nota: 'El colocador nunca llama a ReglasAula: confía en el filtro del precálculo, que no depende del estado acumulado.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'RegistroOcupacion (instancia de aulas)',
      contrato: 'Libre(aulaId, jornadaId, colocacion, duracionSlots) → bool',
      frontera: 'memoria',
      pide: '¿Tiene esta aula libres todos los minutos que ocuparía la clase?',
      devuelve: 'bool',
      nota: 'Es la única pregunta sobre el aula que depende de lo ya colocado. Se detalla en la sub-slide 5.3.',
    },
    {
      quien: 'DatosGeneracionesPostgres',
      aQuien: 'Postgres',
      contrato: 'finalizar_generacion(p_sesiones …)',
      frontera: 'rpc',
      pide: 'Guarda estas sesiones con este aula_id.',
      devuelve: 'GeneracionHorarioDto',
      nota: 'Las cuatro listas viajan en la misma llamada porque la base las inserta en una sola transacción.',
    },
  ],
  reglasPista:
    'Las cinco reglas duras que deciden el aula, con el SQL del que cada una es espejo. Ninguna se comprueba dos veces con dos códigos distintos: los cuatro filtros son puros y se resuelven una vez por asignación; el quinto es el único que mira lo ya colocado.',
  reglas: [
    {
      codigo: 'D-23',
      nombre: 'El aula existe y está activa',
      momento: 'previa',
      donde: 'PreparadorInstantaneaMotorPostgres · CargarAulasAsync',
      cuando: 'Al cargar C-5, como cláusula where.',
      pregunta: '¿El aula está activa y no está borrada?',
      espejo: 'completar_sesion_cohorte, database.sql:1059 — a.eliminado_en is not null or not a.esta_activa',
      siNo: 'No entra a la instantánea. Para el motor, un aula inactiva no existe.',
    },
    {
      codigo: 'D-24',
      nombre: 'Laboratorio si el curso lo exige',
      momento: 'previa',
      donde: 'ReglasAula.AulaAdmiteLaboratorio',
      cuando: 'Precálculo, una vez por (aula, asignación); y otra vez en el verificador.',
      pregunta:
        '¿Si algún curso visible de la sesión exige laboratorio, el aula es de tipo laboratorio o mixta?',
      espejo: 'completar_sesion_cohorte, database.sql:1061 — c.requiere_laboratorio and a.tipo not in (…)',
      siNo: 'El aula se descarta. Fuera de esta regla, el tipo de aula no filtra nada (P-03).',
    },
    {
      codigo: 'D-25',
      nombre: 'El tipo de laboratorio es idéntico',
      momento: 'previa',
      donde: 'ReglasAula.AulaTieneTipoDeLaboratorio',
      cuando: 'Precálculo, junto a D-24.',
      pregunta: '¿El aula ofrece exactamente el tipo de laboratorio que el curso pide?',
      espejo:
        'completar_sesion_cohorte, database.sql:1063 — a.tipo_laboratorio_disponible is distinct from c.tipo_laboratorio_requerido',
      siNo:
        'Se descarta. El SQL usa is distinct from: un aula sin tipo declarado no sirve para un curso que sí lo exige.',
    },
    {
      codigo: 'D-26',
      nombre: 'Los recursos alcanzan, en cantidad',
      momento: 'previa',
      donde: 'ReglasAula.AulaTieneRecursos',
      cuando: 'Precálculo, por cada recurso requerido.',
      pregunta: '¿Por cada recurso que el curso pide, el aula lo declara con cantidad suficiente?',
      espejo: 'completar_sesion_cohorte, database.sql:1078 — ar.cantidad >= crr.cantidad',
      siNo:
        'Se descarta. El motor v1 comparaba solo el código del recurso y daba por buena un aula con un proyector donde el curso pedía tres.',
    },
    {
      codigo: 'D-27',
      nombre: 'La capacidad cubre a todas las cohortes',
      momento: 'previa',
      donde: 'ReglasAula.AulaTieneCapacidad',
      cuando: 'Precálculo, sumando la matrícula de todas las participaciones.',
      pregunta: '¿La capacidad del aula cubre la suma de matrículas de todas las cohortes de la sesión?',
      espejo: 'completar_sesion_cohorte, database.sql:1116 — v_matricula_total > v_capacidad_aula',
      siNo:
        'Se descarta. En área común comparten aula, así que la cohorte que cabe sola puede no caber acompañada.',
    },
    {
      codigo: 'D-29',
      nombre: 'El aula está libre a esa hora',
      momento: 'bucle',
      donde: 'RegistroOcupacion.Libre · instancia de aulas',
      cuando: 'Dentro del bucle, por cada aula candidata de cada colocación candidata.',
      pregunta: '¿Tiene el aula libres todos los minutos de esa colocación, ese día?',
      espejo: 'EXCLUDE USING gist sesiones_aula_no_solapada, database.sql:6224',
      siNo: 'Se prueba la siguiente aula de la lista, y se cuenta un rechazo D-29.',
    },
  ],
  ordenesPista:
    'El aula no se elige por puntaje: se ordena. Tres criterios en cascada que terminan en un desempate por Id, así que el orden es total y dos corridas sobre la misma instantánea eligen la misma aula.',
  ordenes: [
    {
      que: 'Qué aula se prueba antes',
      donde: 'OrdenDeTrabajo.Aulas · §9.3',
      criterios: [
        'Menor capacidad primero. Todas las que llegan aquí ya caben, así que gastar un auditorio de 200 en un grupo de 20 solo se lo quita a la cohorte grande que viene después.',
        'Menos recursos de sobra: aula.Recursos.Length − sesion.Recursos.Length.',
        'Por Id, que no elige nada y solo cierra el orden.',
      ],
      porque:
        'Esto es lo que sustituye al evaluador de restricciones blandas del motor v1. No hay pesos que sumar ni puntajes que comparar.',
    },
    {
      que: 'Qué asignación se atiende antes',
      donde: 'OrdenDeTrabajo.Asignaciones · §9.1',
      criterios: [
        'Menor dificultad primero, y la dificultad es el producto docentes × aulas × colocaciones.',
        'Producto y no suma: lo que se agota es el producto cartesiano, y una asignación con una sola aula no se salva porque le sobren docentes.',
        'Una dificultad de cero va primero: falla de inmediato y deja libre el resto del horario.',
      ],
      porque:
        'Lo más restringido primero es la única decisión algorítmica de la Fase 1, y es la que el motor v1 ya tenía bien.',
    },
  ],
  lecturasPista:
    'El mismo proceso leído dos veces: qué le pasa a un aula suelta y qué le pasa al catálogo entero. El bucle de una está metido dentro del bucle del otro.',
  lecturas: [
    {
      titulo: 'El filtro del precálculo',
      individual: {
        unidad: 'un aula del catálogo',
        pasos: [
          'Se le pregunta D-24: ¿es de laboratorio, si la sesión lo exige?',
          'Luego D-25, D-26 y D-27, en ese orden, sin cortocircuito por regla: es un único Where encadenado.',
          'Si pasa las cuatro, entra en AulasFactibles de esa asignación. Si no, no vuelve a aparecer.',
          'Ninguna de las cuatro preguntas mira el reloj ni lo ya colocado, así que la respuesta no cambia durante la generación.',
        ],
      },
      lote: {
        unidad: 'el catálogo entero, por asignación',
        pasos: [
          'Se recorre completo una vez por asignación, no por sesión: las N sesiones semanales de una asignación exigen lo mismo.',
          'Si el resultado es vacío, se busca en cascada cuál de los cuatro filtros lo vació, y se nombra solo ese.',
          'Si el culpable es un recurso, se nombra el recurso; si ninguno lo vacía solo pero juntos sí, se nombran todos.',
          'El tamaño de la lista es un tercio de la dificultad de la asignación, así que decide su turno.',
        ],
      },
      cardinalidad: 'A aulas × G asignaciones → G listas factibles, cada una de 0 a A aulas',
    },
    {
      titulo: 'La elección dentro del bucle',
      individual: {
        unidad: 'una aula candidata',
        pasos: [
          'Se pregunta si está libre en esa colocación, con esa duración.',
          'Si lo está, se acabó la búsqueda: se emite la SesionColocada y se ocupan las tres entidades a la vez.',
          'Si no, se cuenta un rechazo D-29 y se pasa a la siguiente aula.',
          'Nunca se compara «cuál es mejor»: la lista ya venía ordenada por preferencia.',
        ],
      },
      lote: {
        unidad: 'las N sesiones semanales de una asignación',
        pasos: [
          'La lista ordenada se calcula una vez, fuera del bucle de sesiones, y se reutiliza para las N.',
          'Cada sesión puede acabar en un aula distinta: el aula no es continua, a diferencia del docente.',
          'Si una sola de las N no encuentra sitio, se liberan las aulas de las que sí lo encontraron (P-08).',
          'O entran todas, o ninguna: media asignación ocupa el aula que otra sí habría podido aprovechar.',
        ],
      },
      cardinalidad: '1 asignación → 1 lista ordenada → N sesiones → hasta A aulas probadas por colocación',
    },
  ],
  fallosPista:
    'Ninguno de estos avisos es un fallo del motor: todos describen los datos. El único que lanza es la contradicción de una sesión fijada, porque mover lo que alguien fijó a mano sería tirar su trabajo sin decírselo.',
  fallos: [
    {
      codigo: 'SIN_AULA_FACTIBLE',
      origen: 'motor',
      cuando: 'Precálculo, antes de intentar nada.',
      mensaje:
        '«Ninguna aula sirve para el curso X de la cohorte Y: exige 3 del recurso Z (D-26) y ninguna de las 14 aulas lo tiene en esa cantidad.»',
      arreglo: 'Declarar el recurso en un aula con esa cantidad, o bajar la exigencia del curso.',
    },
    {
      codigo: '0 candidatos',
      origen: 'motor',
      cuando: 'Al dejar la asignación pendiente sin haber probado ni un candidato.',
      mensaje: '«0 candidatos: la asignación no tiene ninguna aula factible.»',
      arreglo:
        'Es la misma causa que el diagnóstico anterior, repetida en la fila de sesiones_no_asignadas para que se explique sola: la columna motivo_no_asignacion es NOT NULL.',
    },
    {
      codigo: 'N por D-29',
      origen: 'motor',
      cuando: 'Al dejar la asignación pendiente después de recorrer candidatos.',
      mensaje: '«17 candidatos: 12 rechazados por D-29 (aula ocupada), 5 por D-28 (docente ocupado).»',
      arreglo:
        'El motivo se cuenta mientras se recorre, no se reconstruye después con la ocupación ya cambiada: es la causa real, no la que quedó a la vista al final.',
    },
    {
      codigo: 'Fijada incompatible',
      origen: 'motor',
      cuando: 'OcuparFijadas, antes de colocar la primera sesión libre.',
      mensaje:
        '«La sesión fijada X no se puede respetar: el aula A no tiene capacidad para sus 96 estudiantes (D-27).»',
      arreglo: 'Cambiar el aula de la sesión fijada, o dejar de fijarla. El motor no la mueve por su cuenta.',
    },
    {
      codigo: 'TIPO_AULA_INCOMPATIBLE · TIPO_LABORATORIO_INCOMPATIBLE · RECURSO_AULA_FALTANTE · CAPACIDAD_AULA_INSUFICIENTE · AULA_DESCONOCIDA',
      origen: 'verificador',
      cuando: 'Con el horario ya decidido y antes de tocar la base.',
      mensaje: '«El aula A no cubre todos los recursos de la sesión S.»',
      arreglo:
        'Que aparezca uno solo significa un defecto del motor, no de los datos: el precálculo tenía que haber descartado esa aula. La generación se cierra como Inviable.',
    },
    {
      codigo: 'raise exception',
      origen: 'base',
      cuando: 'Al insertar cada fila de sesion_cohortes, dentro de la transacción del guardado.',
      mensaje: '«La sesion S supera la capacidad del aula A: 96 estudiantes para 40 lugares»',
      arreglo:
        'La base comprueba contra el curso visible de cada cohorte, no contra el de la sesión: es la última red, y revienta la transacción entera.',
    },
  ],
  cifras: [
    { valor: '4', que: 'reglas puras de aula', nota: 'D-24 a D-27, todas espejo de completar_sesion_cohorte' },
    { valor: '1', que: 'vez que se filtra el catálogo', nota: 'por asignación, no por sesión ni por colocación' },
    { valor: '3', que: 'criterios de orden', nota: 'capacidad, recursos de sobra, Id' },
    { valor: '5', que: 'lugares que lo comprueban', nota: 'precálculo, fijadas, verificador, trigger y restricción' },
    { valor: 'máx', que: 'no suma, en área común', nota: 'de cada recurso se pide el máximo: es la misma clase' },
  ],
};

// ══════════════════════════════════════════════════ 5.2 · docente duplicado

const DOCENTE: DetalleMotor = {
  id: 'docente',
  numero: '5.2',
  eyebrow: 'Motor · 5.2 · validación de conflictos',
  titulo: 'Docente duplicado: un docente por paquete, y un docente en un solo sitio a la vez',
  subtitulo:
    '«Docente duplicado» son dos cosas distintas y las dos se resuelven aquí. La primera es el mismo curso de la misma cohorte repartido entre dos docentes, que el motor no comprueba: lo hace imposible eligiendo un docente por asignación y no dejando cambiarlo. La segunda es el mismo docente en dos clases que se pisan, que sí se pregunta, y se pregunta en franjas de minutos. Añadido: la carga máxima, que es lo que impide que un docente acapare los cursos.',
  bandas: [
    {
      id: 'foto',
      titulo: 'La foto · quién puede dar qué, y cuándo',
      hilo: 'web',
      disparo: 'El clic en «Generar»: la consulta C-4 se lanza junto con las otras seis.',
      fin: 'Cuando CargarDocentesAsync devuelve el ImmutableArray<Docente>, con sus autorizaciones y su disponibilidad.',
      color: COLOR_WEB,
    },
    {
      id: 'previo',
      titulo: 'El segundo plano · quién es candidato, antes de decidir',
      hilo: 'fondo',
      disparo: 'ProcesadorTrabajosPesados recoge el trabajo y llama a MotorHorarios.Ejecutar.',
      fin: 'Cuando el precálculo deja las cuatro columnas de cada asignación calculadas.',
      color: COLOR_FONDO,
    },
    {
      id: 'bucle',
      titulo: 'El bucle · elegir uno y no cambiarlo',
      hilo: 'fondo',
      disparo: 'Atender(asignacion), una vez por asignación, en orden de dificultad.',
      fin: 'Cuando la asignación queda confirmada con su docente, o pendiente con el motivo contado.',
      color: COLOR_FONDO,
    },
    {
      id: 'cierre',
      titulo: 'La segunda opinión y la base',
      hilo: 'base',
      disparo: 'El resultado ya decidido entra al verificador; después, finalizar_generacion.',
      fin: 'Cuando la transacción del guardado cierra, o cuando la excepción la revienta.',
      color: COLOR_BASE,
    },
  ],
  pasos: [
    {
      n: 1,
      banda: 'foto',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'PreparadorInstantaneaMotorPostgres',
      archivo: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
      metodo: 'CargarDocentesAsync — la consulta C-4',
      hace:
        'Trae los docentes activos con su carga máxima, su nivel de prioridad, sus autorizaciones completas y su disponibilidad confirmada, slot a slot.',
      entra: 'ninguna: el alcance del plan no filtra docentes',
      sale: 'ImmutableArray<Docente>, ordenada por Id',
      base: 'docentes · asignaciones_docente_curso · disponibilidad_docente_slots',
      reglas: ['D-17', 'D-20', 'D-21'],
    },
    {
      n: 2,
      banda: 'foto',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'PreparadorInstantaneaMotorPostgres',
      archivo: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
      metodo: 'CargarEquivalenciasAsync — la consulta C-6',
      hace:
        'Trae qué cursos valen por cuál, para que un docente autorizado por el curso equivalente no se descarte.',
      entra: 'los cursos de C-3 y los que pertenecen a un curso_comun',
      sale: 'ImmutableDictionary<Guid, ImmutableHashSet<Guid>>',
      base: 'función cursos_equivalentes, database.sql:2102',
      reglas: ['D-17'],
      siFalla: 'Un curso ausente del diccionario equivale solo a sí mismo, que es lo que devuelve el SQL.',
    },
    {
      n: 3,
      banda: 'previo',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ReglasDocente',
      archivo: 'Reglas/ReglasDocente.cs',
      metodo: 'DocenteAutorizado(docente, sesion, instantanea)',
      hace:
        'Comprueba que el docente esté autorizado para el curso visible de cada participación —o para un equivalente suyo— y con la jornada correcta, donde el nulo es comodín.',
      entra: 'Docente + SesionRequerida + Instantanea.Equivalencias',
      sale: 'bool',
      reglas: ['D-17'],
      siFalla: 'No es candidato de esa asignación. No lanza.',
    },
    {
      n: 4,
      banda: 'previo',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'Precalculo',
      archivo: 'Construccion/Precalculo.cs',
      metodo: 'Calcular → DocentesFactibles',
      hace:
        'Se queda con los autorizados que además tengan disponibilidad confirmada en alguna colocación de la jornada. Autorizado pero sin horas no es candidato.',
      entra: 'Instantanea.Docentes + las colocaciones factibles de la jornada',
      sale: 'ImmutableArray<Docente>, ordenada por Id',
      reglas: ['D-17', 'D-20', 'P-01'],
      siFalla:
        'Lista vacía: diagnóstico SIN_DOCENTE_FACTIBLE, con tres redacciones distintas según cuál de las tres causas sea.',
    },
    {
      n: 5,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'Candidatos(asignacion)',
      hace:
        'Si la asignación ya tiene docente elegido —porque una sesión fijada lo trajo, o porque ya se confirmó—, el único candidato es ese. Si no, se prueban todos sus factibles en orden.',
      entra: 'RegistroContinuidad.DocenteDe(clave)',
      sale: 'ImmutableArray<Docente>: uno solo, o todos los factibles ordenados',
      reglas: ['D-18', 'D-19', 'P-04'],
      siFalla:
        'Aquí es donde «docente duplicado» deja de ser posible: no hay rama del código que devuelva dos docentes para la misma clave.',
    },
    {
      n: 6,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RegistroCarga',
      archivo: 'Ocupacion/RegistroCarga.cs',
      metodo: 'Anotada(docenteId, clave) · Cuenta(docenteId)',
      hace:
        'Antes de probar nada, compara cuántas asignaciones distintas lleva el docente con su carga_maxima_cursos. Volver a tomar una que ya lleva no le sube la carga.',
      entra: 'Guid docenteId + ClaveAsignacion',
      sale: 'int · bool',
      reglas: ['D-21'],
      siFalla: 'Se cuenta un rechazo D-21 y se pasa al siguiente docente, sin probar ni una colocación.',
    },
    {
      n: 7,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ReglasDocente',
      archivo: 'Reglas/ReglasDocente.cs',
      metodo: 'DocenteDisponible(docente, sesion, colocacion)',
      hace:
        'Comprueba que la disponibilidad confirmada cubra todos los slots que la sesión ocupa, uno por uno, en esa jornada y ese día. Cubrir el primero no basta.',
      entra: 'Docente.Disponibles: HashSet<(Jornada, Dia, Slot)>',
      sale: 'bool',
      reglas: ['D-20', 'P-01'],
      siFalla: 'Rechazo D-20 y se prueba la siguiente colocación.',
    },
    {
      n: 8,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RegistroOcupacion',
      archivo: 'Ocupacion/RegistroOcupacion.cs',
      metodo: 'Libre(docenteId, jornadaId, colocacion, duracionSlots)',
      hace:
        'Pregunta si el docente tiene libres esos minutos ese día. Es la comprobación de «docente duplicado» en su segundo sentido: el mismo docente en dos sitios a la vez.',
      entra: 'la instancia de docentes del registro',
      sale: 'bool',
      reglas: ['D-28'],
      siFalla: 'Rechazo D-28 y se prueba la siguiente colocación. El mecanismo de franjas está en la sub-slide 5.4.',
    },
    {
      n: 9,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'Confirmar(asignacion, docente, puestas)',
      hace:
        'Con todas las sesiones libres colocadas, emite el paquete, deja al docente elegido para siempre y le anota una unidad de carga. Una sola, no una por sesión.',
      entra: 'la lista de sesiones puestas',
      sale: 'colocadas + continuidad.Elegir + carga.Anotar',
      reglas: ['D-18', 'D-19', 'D-21'],
      siFalla:
        'Si alguna de las sesiones no cupo, no se llega aquí: se liberan las que sí cupieron y se prueba el siguiente docente (P-08).',
    },
    {
      n: 10,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'VerificarContinuidadYCarga(fijada, docente)',
      hace:
        'Sobre las sesiones fijadas a mano: si dos de la misma asignación traen docentes distintos, lanza nombrando a los dos y la sesión afectada.',
      entra: 'Instantanea.Fijadas (consulta C-7)',
      sale: 'continuidad.Elegir + carga.Anotar, o excepción',
      reglas: ['P-04', 'D-18', 'D-19', 'D-21'],
      siFalla:
        'InvalidOperationException: «Las sesiones fijadas de X traen dos docentes distintos, A y B: sus sesiones son un solo paquete.»',
    },
    {
      n: 11,
      banda: 'cierre',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'VerificadorHorario',
      archivo: 'Verificacion/VerificadorHorario.cs',
      metodo: 'VerificarContinuidad · VerificarAreasComunes · VerificarCarga',
      hace:
        'Reconstruye las reglas globales desde la salida: agrupa por (cohorte, curso visible) y cuenta docentes distintos; agrupa por agrupación de área común; cuenta claves distintas por docente.',
      entra: 'Resultado.Colocadas + Instantanea',
      sale: 'CONTINUIDAD_DOCENTE · AREA_COMUN_VARIOS_DOCENTES · CARGA_DOCENTE_EXCEDIDA',
      reglas: ['D-18', 'D-19', 'D-21'],
      siFalla:
        'No comparte con el colocador ninguna de estas tres: las recalcula desde cero, que es lo que hace que sea una segunda opinión y no un eco.',
    },
    {
      n: 12,
      banda: 'cierre',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'completar_sesion_cohorte',
      archivo: 'docs/database.sql:1040',
      metodo: 'trigger sobre sesion_cohortes',
      hace:
        'Al insertar cada participación, comprueba que la agrupación de área común no tenga ya sesiones con otro docente.',
      entra: 'la fila que se está insertando',
      sale: 'la fila completada, o excepción',
      base: 'sesiones · sesion_cohortes',
      reglas: ['D-19'],
      siFalla: '«La agrupacion de area comun X ya tiene sesiones con otro docente.»',
    },
    {
      n: 13,
      banda: 'cierre',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'validar_horario_publicable',
      archivo: 'docs/database.sql:3400 · :3496 · :3578 · :3596',
      metodo: 'al publicar el horario, no al generarlo',
      hace:
        'La última red: autorización (D-17), disponibilidad (D-20), continuidad por cohorte-curso (D-18), un docente por área común (D-19) y carga máxima (D-21).',
      entra: 'el horario ya guardado',
      sale: 'permite publicar, o lo impide',
      base: 'validar_horario_publicable',
      reglas: ['D-17', 'D-18', 'D-19', 'D-20', 'D-21'],
      siFalla:
        'P-01 es exactamente esto adelantado: el motor no coloca nunca fuera de la disponibilidad confirmada, aunque la base solo lo revise al publicar.',
    },
  ],
  piePasos:
    'D-18 y D-19 no aparecen como funciones en ninguna parte, y esa ausencia es el diseño: son consecuencias de que el colocador elija un docente por asignación y no lo pueda cambiar. Las únicas que sí se preguntan son D-20, D-21 y D-28.',
  peticionesPista:
    'Qué se pregunta sobre el docente, a quién, y qué devuelve. Las dos primeras son puras y se responden mirando solo al docente; las tres siguientes miran estado acumulado y por eso viven en registros, no en reglas.',
  peticiones: [
    {
      quien: 'Precalculo · VerificadorHorario',
      aQuien: 'ReglasDocente',
      contrato: 'DocenteAutorizado(docente, sesion, instantanea) → bool',
      frontera: 'proceso',
      pide: '¿Puede este docente dar este curso, en esta jornada?',
      devuelve: 'bool',
      nota:
        'Resuelve equivalencias: el motor v1 comparaba el curso de la sesión sin mirarlas y descartaba docentes autorizados por su curso equivalente.',
    },
    {
      quien: 'Precalculo · ColocadorVoraz · VerificadorHorario',
      aQuien: 'ReglasDocente',
      contrato: 'DocenteDisponible(docente, sesion, colocacion) → bool',
      frontera: 'proceso',
      pide: '¿Tiene confirmadas todas las horas que esta clase ocuparía?',
      devuelve: 'bool',
      nota:
        'Recorre slot a slot desde SlotInicio hasta SlotInicio + DuracionSlots − 1, igual que el generate_series del SQL.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'RegistroContinuidad',
      contrato: 'DocenteDe(ClaveAsignacion) → Guid?',
      frontera: 'memoria',
      pide: '¿Esta asignación ya tiene docente elegido?',
      devuelve: 'el Guid, o nulo',
      nota: 'Nulo significa «pruébalos todos»; un valor significa «ese es el único». No hay tercer caso.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'RegistroCarga',
      contrato: 'Cuenta(docenteId) → int · Anotada(docenteId, clave) → bool',
      frontera: 'memoria',
      pide: '¿Cuántas asignaciones distintas lleva ya, y esta es una de ellas?',
      devuelve: 'int · bool',
      nota:
        'La unidad es la clave, no la sesión: un área común pesa uno aunque la cursen cinco cohortes y se reparta en cuatro clases semanales.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'RegistroOcupacion (instancia de docentes)',
      contrato: 'Libre(docenteId, jornadaId, colocacion, duracionSlots) → bool',
      frontera: 'memoria',
      pide: '¿Está el docente libre en esos minutos, ese día?',
      devuelve: 'bool',
      nota: 'Compara franjas de minutos, no índices de slot: dos jornadas distintas se pisan en el reloj real.',
    },
    {
      quien: 'OrdenDeTrabajo.Docentes',
      aQuien: 'RegistroCarga',
      contrato: 'Ocupacion(docente, carga) = Cuenta / CargaMaximaCursos (double)',
      frontera: 'memoria',
      pide: '¿Qué proporción de su carga lleva ya?',
      devuelve: 'double',
      nota:
        'El orden cambia a medida que se reparte: es un registro vivo, no una foto. 2/4 va después de 1/3, que es lo que reparte en vez de amontonar.',
    },
  ],
  reglasPista:
    'Cinco reglas duras sobre el docente. Dos son funciones puras, una es una cuenta, y dos son estructurales: no se comprueban en ninguna parte porque el diseño las hace imposibles de romper.',
  reglas: [
    {
      codigo: 'D-17',
      nombre: 'Docente autorizado',
      momento: 'previa',
      donde: 'ReglasDocente.DocenteAutorizado',
      cuando: 'Precálculo, una vez por (docente, asignación); y otra en el verificador, por participación.',
      pregunta:
        '¿Está autorizado para el curso visible de cada cohorte —o para un equivalente— y con la jornada de la autorización?',
      espejo: 'completar_sesion_cohorte, database.sql:1018 — adc.curso_id in (select … cursos_equivalentes(…))',
      siNo: 'No entra en DocentesFactibles. Si ninguno entra: diagnóstico SIN_DOCENTE_FACTIBLE.',
    },
    {
      codigo: 'D-20 · P-01',
      nombre: 'Disponibilidad confirmada',
      momento: 'bucle',
      donde: 'ReglasDocente.DocenteDisponible',
      cuando: 'En el precálculo para saber si es candidato, y en el bucle para cada colocación concreta.',
      pregunta: '¿Cubre su disponibilidad confirmada todos los slots de esa colocación?',
      espejo: 'validar_horario_publicable, database.sql:3496 — generate_series(slot_inicio, slot_inicio + duracion − 1)',
      siNo: 'Rechazo D-20: «docente sin disponibilidad confirmada» en el motivo de la pendiente.',
    },
    {
      codigo: 'D-21',
      nombre: 'Carga máxima de cursos',
      momento: 'bucle',
      donde: 'RegistroCarga + la comparación en ColocadorVoraz.Atender',
      cuando: 'Antes de probar la primera colocación de cada docente candidato.',
      pregunta: '¿Le cabe una asignación más, contando claves distintas y no clases?',
      espejo: 'validar_horario_publicable, database.sql:3596 — count(*) sobre las llaves distintas',
      siNo:
        'Rechazo D-21: «docente con la carga llena». Una asignación puede quedarse fuera sin haber llegado a probar ni una colocación, y por eso también se cuenta.',
    },
    {
      codigo: 'D-18',
      nombre: 'Un solo docente por cohorte y curso',
      momento: 'previa',
      donde: 'RegistroContinuidad · estructural, no es una función',
      cuando: 'Siempre: no hay un momento en que se compruebe.',
      pregunta: '¿La misma cohorte tiene el mismo curso visible con dos docentes distintos?',
      espejo: 'validar_horario_publicable, database.sql:3578',
      siNo:
        'No puede pasar: la clave CURSO:{visible}:COHORTE:{cohorte} tiene un solo docente en el diccionario, y Elegir lanza si se intenta cambiar.',
    },
    {
      codigo: 'D-19',
      nombre: 'Un solo docente por área común',
      momento: 'previa',
      donde: 'RegistroContinuidad · estructural, misma clase',
      cuando: 'Siempre, por la misma razón.',
      pregunta: '¿Un área común entera está repartida entre varios docentes?',
      espejo: 'validar_horario_publicable, database.sql:3481',
      siNo:
        'No puede pasar: la clave AREA:{agrupación} es una sola entrada del mismo diccionario. Por eso basta un diccionario y no hacen falta dos registros.',
    },
    {
      codigo: 'D-28',
      nombre: 'El docente no se solapa consigo mismo',
      momento: 'bucle',
      donde: 'RegistroOcupacion.Libre · instancia de docentes',
      cuando: 'Dentro del bucle, después de las cohortes, P-02 y la disponibilidad.',
      pregunta: '¿Está dando otra clase en esos mismos minutos?',
      espejo: 'EXCLUDE USING gist sesiones_docente_no_solapado, database.sql:6232',
      siNo: 'Rechazo D-28: «docente ocupado». Se prueba la siguiente colocación.',
    },
  ],
  estructurasPista:
    'Las dos piezas que hacen de la continuidad y la carga algo estructural. Ninguna aparece en el mapa del recorrido, porque ninguna se llama una vez: se consultan y se actualizan mientras el bucle avanza.',
  estructuras: [
    {
      clase: 'RegistroContinuidad',
      archivo: 'Ocupacion/RegistroContinuidad.cs',
      guarda: 'Dictionary<ClaveAsignacion, Guid>',
      clave: 'AREA:{agrupación} · CURSO:{visible}:COHORTE:{cohorte}',
      responde: '¿Qué docente quedó elegido para esta asignación? Nulo si todavía ninguno.',
      cambia:
        'Elegir(clave, docente) al confirmar la asignación, y antes de todo eso al ocupar cada sesión fijada.',
      porque:
        'La clave es exactamente el paquete que D-18 y D-19 protegen. Volver a elegir al mismo no hace nada; elegir a otro lanza, porque sería justo el horario que la base rechaza al publicarlo.',
    },
    {
      clase: 'RegistroCarga',
      archivo: 'Ocupacion/RegistroCarga.cs',
      guarda: 'Dictionary<Guid, ImmutableHashSet<ClaveAsignacion>>',
      clave: 'docenteId → el conjunto de sus asignaciones',
      responde: '¿Cuántas asignaciones distintas lleva? ¿Ya lleva esta?',
      cambia: 'Anotar(docente, clave) una vez por asignación confirmada, nunca por sesión.',
      porque:
        'El conjunto es inmutable a propósito: anotar dos veces la misma clave no puede cambiar la cuenta. Contar sesiones —lo que hacía el motor v1— dejaba a un docente fuera de un curso que la base sí le permitía dar.',
    },
  ],
  ordenesPista:
    'A quién se le ofrece antes la asignación. Como en las aulas: no hay puntaje, hay criterios en cascada que terminan en un desempate por Id.',
  ordenes: [
    {
      que: 'Qué docente se prueba antes',
      donde: 'OrdenDeTrabajo.Docentes · §9.3',
      criterios: [
        'Mayor nivel de prioridad primero: docentes.nivel_prioridad, tal como está en la base.',
        'Entre iguales, menos carga en proporción a la suya: Cuenta / CargaMaximaCursos, comparado como double.',
        'Una carga máxima de cero queda al final —infinito— en vez de romper el orden dividiendo por cero.',
        'Por Id, que cierra el orden y lo hace total.',
      ],
      porque:
        'Comparar solo la cuenta pondría al de carga máxima 3 detrás de uno que ya está casi lleno. La proporción reparte; la cuenta amontona.',
    },
  ],
  lecturasPista:
    'Un docente candidato contra el reparto entero. Aquí se ve por qué el retroceso del motor es de un solo nivel.',
  lecturas: [
    {
      titulo: 'Probar un docente',
      individual: {
        unidad: 'un docente candidato',
        pasos: [
          'Se mira su carga: si ya está llena y esta asignación no la lleva, se descarta sin probar nada más.',
          'Se le intentan colocar todas las sesiones libres de la asignación, una tras otra.',
          'Si todas caben, se confirma: se emite el paquete, se le anota la carga y queda elegido para siempre.',
          'Si una sola no cabe, se liberan las que sí cupieron y se pasa al siguiente docente, que parte del mismo horario.',
        ],
      },
      lote: {
        unidad: 'la asignación entera, con sus N sesiones semanales',
        pasos: [
          'Las N sesiones son un solo paquete: o entran todas con el mismo docente, o ninguna (P-08).',
          'Media asignación incumple la cobertura igual que cero, y encima ocupa el aula y el docente que otra sí habría aprovechado.',
          'Las sesiones fijadas no entran en el bucle, pero cuentan para decidir si la asignación quedó completa.',
          'Cuando las hay, ya eligieron el docente: el único candidato es ese.',
        ],
      },
      cardinalidad: '1 asignación → hasta D docentes probados → N sesiones cada uno → todas o ninguna',
    },
    {
      titulo: 'La carga a lo largo de la generación',
      individual: {
        unidad: 'una unidad de carga',
        pasos: [
          'Se anota una sola vez, al confirmar la asignación completa.',
          'Un área común pesa uno aunque la cursen cinco cohortes.',
          'Un curso normal pesa uno por cohorte: son claves distintas.',
          'Cuatro clases semanales del mismo curso pesan una, no cuatro.',
        ],
      },
      lote: {
        unidad: 'el reparto entre todos los docentes',
        pasos: [
          'El orden de preferencia se recalcula en cada asignación, porque el registro va cambiando.',
          'El resultado es un reparto proporcional, no un óptimo: nadie compara dos repartos entre sí.',
          'Un docente con la carga llena sigue siendo factible en el precálculo; lo descarta el bucle, no el filtro.',
          'Y por eso los rechazos por D-21 se cuentan: si no, la pendiente diría «0 candidatos» siendo falso.',
        ],
      },
      cardinalidad: 'G asignaciones → 1 anotación de carga cada una → D docentes con su cuenta',
    },
  ],
  fallosPista:
    'Los cinco códigos del verificador que hablan del docente, más las dos excepciones. Que aparezca cualquiera de los del verificador significa un defecto del motor, no un problema de los datos.',
  fallos: [
    {
      codigo: 'SIN_DOCENTE_FACTIBLE',
      origen: 'motor',
      cuando: 'Precálculo, antes de intentar nada.',
      mensaje:
        '«Ninguno de los 4 docentes autorizados para el curso X de la cohorte Y tiene disponibilidad confirmada en alguna de las 32 colocaciones de la jornada J.»',
      arreglo:
        'Son tres causas distintas con tres redacciones distintas, porque arreglarlas cuesta cosas distintas: autorizar a alguien, confirmarle disponibilidad, o corregir la jornada.',
    },
    {
      codigo: 'N por D-21',
      origen: 'motor',
      cuando: 'Al dejar la asignación pendiente.',
      mensaje: '«6 candidatos: 4 rechazados por D-21 (docente con la carga llena), 2 por D-20 (…).»',
      arreglo: 'Subir carga_maxima_cursos a alguien, o autorizar a más docentes para ese curso.',
    },
    {
      codigo: 'CONTINUIDAD_DOCENTE',
      origen: 'verificador',
      cuando: 'Agrupando el resultado por (cohorte, curso visible).',
      mensaje: '«La cohorte C tiene el curso X con varios docentes.»',
      arreglo:
        'Es D-18 vista desde la salida. Si aparece, el registro de continuidad falló, porque el colocador no tiene forma de producirlo.',
    },
    {
      codigo: 'AREA_COMUN_VARIOS_DOCENTES',
      origen: 'verificador',
      cuando: 'Agrupando por agrupación de área común.',
      mensaje: '«La agrupación A tiene sesiones con varios docentes.»',
      arreglo: 'Lo mismo para D-19. También lo comprueba el trigger al insertar, con su propio mensaje.',
    },
    {
      codigo: 'CARGA_DOCENTE_EXCEDIDA',
      origen: 'verificador',
      cuando: 'Contando claves distintas por docente sobre el resultado.',
      mensaje: '«El docente D tiene 5 asignaciones y admite 4.»',
      arreglo: 'Cuenta claves distintas, igual que el SQL: si contara sesiones, saltaría con horarios correctos.',
    },
    {
      codigo: 'Dos fijadas contradictorias',
      origen: 'motor',
      cuando: 'OcuparFijadas, antes de colocar la primera sesión libre.',
      mensaje:
        '«Las sesiones fijadas de CURSO:x:COHORTE:y traen dos docentes distintos, A y B: sus sesiones son un solo paquete (D-18, D-19).»',
      arreglo:
        'Es la única contradicción que lanza en vez de degradarse a pendiente: mover una fijada o descartarla en silencio sería tirar el trabajo de una persona sin decírselo.',
    },
  ],
  cifras: [
    { valor: '2', que: 'reglas estructurales', nota: 'D-18 y D-19: no hay función que las compruebe' },
    { valor: '1', que: 'docente por asignación', nota: 'elegido una vez y ya no cambia' },
    { valor: '1', que: 'unidad de carga por clave', nota: 'no por sesión, no por cohorte' },
    { valor: '1 nivel', que: 'de retroceso', nota: 'probar el siguiente docente; no hay más marcha atrás' },
    { valor: '3', que: 'redacciones de SIN_DOCENTE_FACTIBLE', nota: 'una por cada causa distinta' },
  ],
};

// ═════════════════════════════════════════════════════ 5.3 · aula ocupada

const OCUPACION: DetalleMotor = {
  id: 'ocupacion',
  numero: '5.3',
  eyebrow: 'Motor · 5.3 · validación de conflictos',
  titulo: 'Aula ocupada: una sola clase de tres líneas, con tres estados',
  subtitulo:
    'Que un aula esté ocupada, que un docente lo esté y que una cohorte lo esté son la misma pregunta hecha sobre tres identificadores distintos. Por eso hay una sola clase, RegistroOcupacion, instanciada tres veces, y no un diccionario de diccionarios. Aquí está qué guarda, cómo se pregunta, cuándo se ocupa, cómo se deshace, y las tres redes que hay detrás por si el motor se equivocara.',
  bandas: [
    {
      id: 'preparar',
      titulo: 'Preparar · tres registros vacíos sobre una sola rejilla',
      hilo: 'fondo',
      disparo: 'El constructor de ColocadorVoraz, antes de colocar nada.',
      fin: 'Cuando los tres quedan creados. Comparten la misma RejillaTiempo, obligatoriamente.',
      color: COLOR_FONDO,
    },
    {
      id: 'previa',
      titulo: 'La ocupación previa · lo que alguien fijó a mano',
      hilo: 'fondo',
      disparo: 'OcuparFijadas, la primera llamada de Colocar.',
      fin: 'Cuando todas las fijadas de C-7 están ocupadas, o cuando dos se contradicen y lanza.',
      color: COLOR_FONDO,
    },
    {
      id: 'bucle',
      titulo: 'El bucle · preguntar, ocupar y a veces deshacer',
      hilo: 'fondo',
      disparo: 'Cada colocación candidata de cada sesión libre.',
      fin: 'Cuando la asignación queda confirmada, o cuando se revierte entera.',
      color: COLOR_FONDO,
    },
    {
      id: 'redes',
      titulo: 'Las redes de después · verificador y base',
      hilo: 'base',
      disparo: 'El resultado ya decidido; después, el insert de cada sesión.',
      fin: 'Cuando la restricción de exclusión acepta la fila, o la rechaza y revienta la transacción.',
      color: COLOR_BASE,
    },
  ],
  pasos: [
    {
      n: 1,
      banda: 'preparar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      metodo: 'new RejillaTiempo(instantanea.Jornadas)',
      hace:
        'Numera las fronteras de minuto de todas las jornadas juntas y las convierte en franjas canónicas comparables entre jornadas.',
      entra: 'ImmutableArray<Jornada>',
      sale: 'la rejilla del plan',
      reglas: ['D-04', 'D-06'],
      siFalla: 'Dos jornadas con el mismo Id lanzan ArgumentException al construirla.',
    },
    {
      n: 2,
      banda: 'preparar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'new RegistroOcupacion(rejilla) × 3',
      hace:
        'Crea los tres registros: docentes, aulas y cohortes. Misma clase, tres estados; lo único que cambia es qué identificador recibe cada uno.',
      entra: 'la rejilla, la misma para los tres',
      sale: 'ocupacionDocentes · ocupacionAulas · ocupacionCohortes',
      reglas: ['D-28', 'D-29', 'D-30'],
      siFalla:
        'Dos rejillas distintas numerarían las franjas distinto y los veredictos de solape dejarían de compararse.',
    },
    {
      n: 3,
      banda: 'previa',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'OcuparFijadas → VerificarSolape',
      hace:
        'Antes de ocupar cada fijada, comprueba que no se pise con otra ya ocupada, para el aula, para el docente y para cada cohorte.',
      entra: 'Instantanea.Fijadas',
      sale: 'las tres entidades ocupadas, o excepción',
      reglas: ['P-04', 'D-28', 'D-29', 'D-30'],
      siFalla:
        'Lanza nombrando a las dos sesiones. CulpableDe recorre lo ya ocupado solo para el mensaje: el veredicto lo dio el registro.',
    },
    {
      n: 4,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RegistroOcupacion',
      archivo: 'Ocupacion/RegistroOcupacion.cs',
      metodo: 'Libre(entidadId, jornadaId, colocacion, duracionSlots)',
      hace:
        'Traduce la colocación a franjas con la rejilla y mira si alguna de ellas está en el conjunto. Recorre [desde, hasta), no un rango entero.',
      entra: '(Guid entidad, Guid jornada, Colocacion, int duración)',
      sale: 'bool',
      reglas: ['D-28', 'D-29', 'D-30'],
      siFalla:
        'Una colocación que no cabe en la jornada lanza ArgumentOutOfRangeException: el colocador solo usa las que da la rejilla, así que llegar aquí con otra es un defecto del motor.',
    },
    {
      n: 5,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'ColocarUna — el orden de las preguntas',
      hace:
        'Pregunta en un orden que no se reordena: cohortes, P-02, disponibilidad, docente, y por último el aula dentro de su propio bucle.',
      entra: 'las colocaciones factibles ya ordenadas',
      sale: 'SesionColocada, o nulo',
      reglas: ['D-30', 'P-02', 'D-20', 'D-28', 'D-29'],
      siFalla:
        'Cada rechazo se cuenta con su código. Ese contador es el que acaba redactando el motivo de la pendiente.',
    },
    {
      n: 6,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RegistroOcupacion',
      archivo: 'Ocupacion/RegistroOcupacion.cs',
      metodo: 'Ocupar(entidadId, jornadaId, colocacion, duracionSlots)',
      hace: 'Añade al conjunto todas las franjas de la colocación, una por una.',
      entra: 'la misma tupla que Libre',
      sale: 'estado mutado',
      siFalla:
        'Si alguna ya estaba tomada, lanza InvalidOperationException. No es un problema de datos: es un defecto del motor, y se corta aquí para que Liberar siga siendo su inverso exacto.',
    },
    {
      n: 7,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'Ocupar(sesion, puesta)',
      hace:
        'Ocupa las tres entidades a la vez —cada cohorte, el docente y el aula— y además anota la clase en la agenda de las cohortes.',
      entra: 'SesionRequerida + SesionColocada',
      sale: 'los tres registros y la agenda actualizados',
      reglas: ['D-28', 'D-29', 'D-30', 'P-02'],
    },
    {
      n: 8,
      banda: 'bucle',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'ColocadorVoraz',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'Liberar(sesion, puesta)',
      hace:
        'Inverso exacto: devuelve las franjas de las tres entidades y borra la clase de la agenda. Es lo que hace posible revertir una asignación entera.',
      entra: 'las mismas dos cosas',
      sale: 'la ocupación igual que antes de probar ese docente',
      reglas: ['P-08'],
      siFalla:
        'Si Ocupar y Liberar no fueran inversos exactos, el siguiente docente partiría de un horario distinto y el resultado dejaría de ser reproducible.',
    },
    {
      n: 9,
      banda: 'redes',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'VerificadorHorario',
      archivo: 'Verificacion/VerificadorHorario.cs',
      metodo: 'VerificarColisiones',
      hace:
        'Compara todos los pares de sesiones colocadas: mismo día y rangos de minutos que se cruzan. Si además comparten aula, docente o cohorte, emite el código correspondiente.',
      entra: 'Resultado.Colocadas ordenadas',
      sale: 'COLISION_AULA · COLISION_DOCENTE · COLISION_COHORTE',
      reglas: ['D-28', 'D-29', 'D-30'],
      siFalla:
        'No reutiliza los registros del colocador: construye su propia rejilla y recalcula los minutos desde la salida.',
    },
    {
      n: 10,
      banda: 'redes',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'sesiones_aula_no_solapada',
      archivo: 'docs/database.sql:6224',
      metodo: 'EXCLUDE USING gist',
      hace:
        'La base lo impide físicamente: horario_id =, aula_id =, fecha =, dia =, y rango_minutos && (se solapan).',
      entra: 'la fila que se está insertando',
      sale: 'aceptada, o error 23P01',
      base: 'sesiones.rango_minutos, int4range generado siempre a partir de minuto_inicio_dia y minuto_fin_dia',
      reglas: ['D-29'],
      siFalla: 'Revienta la transacción del guardado entera. No hay horario a medias.',
    },
  ],
  piePasos:
    'La ocupación es por horario: las tres restricciones llevan horario_id en la clave, y el motor solo carga las sesiones fijadas de su propio plan. Dos planes distintos pueden usar la misma aula a la misma hora sin que nadie proteste, y eso es una decisión, no un descuido.',
  peticionesPista:
    'La pregunta es siempre la misma y siempre en memoria: no hay ni una consulta a la base dentro del bucle. El registro no sabe de reglas: no mira autorizaciones, ni capacidad, ni carga. Solo responde si esos minutos están tomados.',
  peticiones: [
    {
      quien: 'RegistroOcupacion',
      aQuien: 'RejillaTiempo',
      contrato: 'Franjas(jornadaId, slotInicio, duracionSlots) → (Desde, Hasta)',
      frontera: 'proceso',
      pide: '¿Qué franjas canónicas ocupa esta colocación?',
      devuelve: 'un par de índices, semiabierto',
      nota:
        'La franja no se guarda, no se muestra y no aparece en ningún contrato: nace y muere dentro del motor.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'ocupacionAulas',
      contrato: 'Libre(aulaId, …) → bool',
      frontera: 'memoria',
      pide: '¿El aula candidata está libre?',
      devuelve: 'bool',
      nota: 'Es la última pregunta del bucle y la única que obliga a recorrer una lista.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'ocupacionDocentes',
      contrato: 'Libre(docenteId, …) → bool',
      frontera: 'memoria',
      pide: '¿El docente ya elegido está libre?',
      devuelve: 'bool',
      nota: 'Va antes que el aula porque descarta la colocación entera y cuesta una sola consulta.',
    },
    {
      quien: 'ColocadorVoraz',
      aQuien: 'ocupacionCohortes',
      contrato: 'Libre(cohorteId, …) → bool, por cada participación',
      frontera: 'memoria',
      pide: '¿Todas las cohortes de la sesión están libres?',
      devuelve: 'bool',
      nota:
        'Es la primera de todas: las cohortes son las que menos margen tienen, así que es la que más descarta por el mismo precio.',
    },
    {
      quien: 'VerificadorHorario',
      aQuien: 'RejillaTiempo (una nueva)',
      contrato: 'Minutos(jornadaId, slotInicio, duracionSlots) → (Inicio, Fin)',
      frontera: 'proceso',
      pide: '¿En qué minutos del día cae esta sesión?',
      devuelve: 'un rango de minutos',
      nota:
        'Compara rangos de minutos directamente, no franjas: rangoA.Inicio < rangoB.Fin && rangoB.Inicio < rangoA.Fin, y solo si es el mismo día.',
    },
  ],
  reglasPista:
    'Las tres reglas de no solapamiento son la misma línea de código con tres identificadores. En la base son tres restricciones de exclusión con la misma forma.',
  reglas: [
    {
      codigo: 'D-29',
      nombre: 'Aula ocupada',
      momento: 'bucle',
      donde: 'ocupacionAulas.Libre',
      cuando: 'Dentro del bucle de aulas, después de haber fijado día, hora y docente.',
      pregunta: '¿Hay otra clase de este horario en esta aula, este día, en esos minutos?',
      espejo: 'EXCLUDE USING gist sesiones_aula_no_solapada, database.sql:6224',
      siNo: 'Rechazo D-29 y se prueba la siguiente aula de la lista ordenada.',
    },
    {
      codigo: 'D-28',
      nombre: 'Docente ocupado',
      momento: 'bucle',
      donde: 'ocupacionDocentes.Libre',
      cuando: 'Antes de entrar al bucle de aulas: descarta la colocación entera.',
      pregunta: '¿El docente ya elegido está dando otra clase en esos minutos?',
      espejo: 'EXCLUDE USING gist sesiones_docente_no_solapado, database.sql:6232',
      siNo: 'Rechazo D-28 y se prueba la siguiente colocación.',
    },
    {
      codigo: 'D-30',
      nombre: 'Cohorte ocupada',
      momento: 'bucle',
      donde: 'ocupacionCohortes.Libre, por cada participación',
      cuando: 'La primera pregunta de todas, sobre la colocación candidata.',
      pregunta: '¿Alguna de las cohortes de la sesión ya tiene clase en esos minutos?',
      espejo: 'EXCLUDE USING gist sesion_cohortes_no_solapadas, database.sql:6208',
      siNo: 'Rechazo D-30 y se prueba la siguiente colocación.',
    },
    {
      codigo: 'P-08',
      nombre: 'O todas, o ninguna',
      momento: 'bucle',
      donde: 'ColocadorVoraz.Atender · Liberar',
      cuando: 'Cuando un docente no consigue colocar todas las sesiones libres de la asignación.',
      pregunta: '¿Qué se hace con las que sí colocó?',
      espejo: 'preferencia del proyecto; el SQL no la impone.',
      siNo:
        'Se liberan todas. Media asignación incumple la cobertura igual que cero, y encima ocupa recursos que otra sí habría aprovechado.',
    },
  ],
  estructurasPista:
    'Una sola clase, noventa y seis líneas, tres instancias. Es la pieza más consultada del motor y la única que guarda todo el estado del reloj.',
  estructuras: [
    {
      clase: 'RegistroOcupacion',
      archivo: 'Ocupacion/RegistroOcupacion.cs',
      guarda: 'HashSet<(Guid Entidad, DiaSemana Dia, int Franja)>',
      clave: '(entidad, día, franja canónica)',
      responde: 'Libre → ¿están libres todas las franjas de esta colocación?',
      cambia: 'Ocupar al emitir una sesión; Liberar al revertir una asignación entera.',
      porque:
        'La franja la da la rejilla y no sale de aquí. Es lo que hace exacto el veredicto cuando dos jornadas se pisan: el motor v1 comparaba índices de slot y daba por libre a un docente que a esa hora estaba dando clase en la otra jornada.',
    },
    {
      clase: 'AgendaDeCohortes',
      archivo: 'Construccion/ColocadorVoraz.cs',
      guarda: 'Dictionary<(Guid Cohorte, DiaSemana Dia), ImmutableList<Clase>>',
      clave: '(cohorte, día) → curso visible, slot inicio, slot fin',
      responde:
        'TieneElCursoEseDia (P-02), ClasesDelDia y DistanciaMasCorta: cuántas y a qué distancia, en slots.',
      cambia: 'Anotar y Borrar a la par de los tres registros, para que revertir la deje como estaba.',
      porque:
        'No decide nada y no es una regla: el registro de ocupación responde sí o no sobre franjas, y las preferencias del §9.3 preguntan otra cosa. Preguntarlo en slots es exacto porque D-10 obliga a que toda sesión de una cohorte sea de su jornada.',
    },
  ],
  lecturasPista:
    'Una franja suelta contra la ocupación de todo el plan. La segunda columna es la que explica por qué revertir tiene que ser exacto.',
  lecturas: [
    {
      titulo: 'Preguntar y ocupar',
      individual: {
        unidad: 'una franja de minutos',
        pasos: [
          'Es una tupla (entidad, día, franja) dentro de un HashSet: la respuesta es constante, no una búsqueda.',
          'Una sesión de dos slots ocupa dos franjas, y las dos se preguntan antes de tomar ninguna.',
          'Una sesión que cruza el receso también se lo come, porque la rejilla ya lo incluyó en su rango.',
          'La franja no tiene nombre para nadie fuera del motor: no se guarda ni se muestra.',
        ],
      },
      lote: {
        unidad: 'los tres registros del plan entero',
        pasos: [
          'Se llenan en el mismo orden en que el colocador decide, y ese orden es determinista.',
          'Al ocupar una sesión se tocan tres registros y una agenda: cohortes, docente, aula, agenda.',
          'Al revertir se tocan los mismos cuatro, en sentido contrario y con los mismos argumentos.',
          'Al terminar, los tres se tiran: no se guardan, no se comparten y no se reutilizan entre generaciones.',
        ],
      },
      cardinalidad: '1 sesión → C+2 entidades ocupadas × F franjas cada una',
    },
    {
      titulo: 'La ocupación previa de las fijadas',
      individual: {
        unidad: 'una sesión fijada',
        pasos: [
          'Se le exigen las reglas de fila, la continuidad, la carga y el solape, en ese orden.',
          'Solo entonces se ocupa, y desde ese momento es inamovible para el resto de la generación.',
          'Su docente queda elegido para toda su asignación: las libres del mismo paquete no tienen otro candidato.',
          'Se reemite al guardar, porque guardar_resultado_generacion borra y reinserta el plan entero.',
        ],
      },
      lote: {
        unidad: 'todas las fijadas del plan (consulta C-7)',
        pasos: [
          'Se ocupan todas antes de colocar la primera sesión libre.',
          'Si dos se contradicen entre sí, lanza y la generación se cierra como fallida.',
          'No se degrada ninguna a pendiente ni se mueve: las dos cosas significan tirar el trabajo de una persona.',
          'El resto del horario se construye alrededor de ellas, no al revés.',
        ],
      },
      cardinalidad: 'F fijadas → F ocupaciones previas → el bucle parte de un horario ya medio lleno',
    },
  ],
  fallosPista:
    'Cuatro salidas distintas para la misma situación, según quién la detecte. Solo la primera es normal; las otras tres significan que algo anterior falló.',
  fallos: [
    {
      codigo: 'N por D-29',
      origen: 'motor',
      cuando: 'Durante el bucle, contando rechazos.',
      mensaje: '«23 candidatos: 18 rechazados por D-29 (aula ocupada), 5 por D-30 (cohorte ocupada).»',
      arreglo:
        'Es el caso normal y no es un error: significa que a esa hora ya no queda aula. Se arregla con más aulas, o con más horas en la jornada.',
    },
    {
      codigo: 'InvalidOperationException al ocupar',
      origen: 'motor',
      cuando: 'Ocupar sobre una franja ya tomada.',
      mensaje:
        '«La entidad E ya está ocupada el martes desde el slot 4 de la jornada J durante 2 slots: hay que preguntar por Libre antes de ocupar.»',
      arreglo:
        'Es un defecto del motor, no de los datos. Se corta ahí a propósito, para que Liberar siga siendo el inverso exacto de Ocupar.',
    },
    {
      codigo: 'Dos fijadas que se pisan',
      origen: 'motor',
      cuando: 'OcuparFijadas.',
      mensaje:
        '«Dos sesiones fijadas se pisan en el reloj: el aula A ya está ocupada el lunes desde el slot 3 (D-29). Sesiones afectadas: S1, S2.»',
      arreglo: 'Corregir a mano una de las dos. El mensaje nombra las dos justamente para eso.',
    },
    {
      codigo: 'COLISION_AULA · COLISION_DOCENTE · COLISION_COHORTE',
      origen: 'verificador',
      cuando: 'Comparando todos los pares del resultado.',
      mensaje: '«Las sesiones S1 y S2 solapan en la misma aula.»',
      arreglo:
        'Si aparece, el registro de ocupación falló: el colocador no tiene forma de emitir dos sesiones solapadas. La generación se cierra como Inviable y no se publica.',
    },
    {
      codigo: '23P01 · exclusion_violation',
      origen: 'base',
      cuando: 'Al insertar la fila, dentro de la transacción del guardado.',
      mensaje: 'conflicting key value violates exclusion constraint "sesiones_aula_no_solapada"',
      arreglo:
        'La última red y la única que no se puede saltar. Si salta, no se guarda nada: la transacción entera se deshace.',
    },
  ],
  cifras: [
    { valor: '3', que: 'instancias de la misma clase', nota: 'docentes, aulas, cohortes' },
    { valor: '96', que: 'líneas de RegistroOcupacion', nota: 'toda la lógica de solape del motor' },
    { valor: '1', que: 'rejilla compartida', nota: 'dos rejillas harían incomparables los veredictos' },
    { valor: '3', que: 'restricciones EXCLUDE gist', nota: 'la misma forma, con horario_id en la clave' },
    { valor: '0', que: 'consultas dentro del bucle', nota: 'todo se responde en memoria' },
  ],
};

// ══════════════════════════════════════════════════ 5.4 · cruce de horarios

const CRUCE: DetalleMotor = {
  id: 'cruce',
  numero: '5.4',
  eyebrow: 'Motor · 5.4 · validación de conflictos',
  titulo: 'Cruce de horarios: por qué se comparan minutos y no números de bloque',
  subtitulo:
    'Dos clases se cruzan si comparten minutos del mismo día. Suena obvio, y es justo lo que el motor anterior hacía mal: comparaba índices de slot, que solo significan lo mismo dentro de una jornada. El bloque 3 de la mañana y el bloque 3 de la tarde son el mismo número y horas distintas; el bloque 3 con receso de por medio y sin él tampoco empiezan a la misma hora. Esta sub-slide es la máquina que convierte «día y bloque» en «minutos», y de ahí en franjas comparables.',
  bandas: [
    {
      id: 'construir',
      titulo: 'Construir la rejilla · una sola vez por generación',
      hilo: 'fondo',
      disparo: 'MotorHorarios.Ejecutar, antes del precálculo.',
      fin: 'Cuando el diccionario de fronteras queda cerrado. A partir de ahí es de solo lectura.',
      color: COLOR_FONDO,
    },
    {
      id: 'catalogar',
      titulo: 'Catalogar las colocaciones posibles',
      hilo: 'fondo',
      disparo: 'La primera vez que alguien pide ColocacionesDe(jornada, duración).',
      fin: 'Se memoriza por (jornada, duración): la segunda llamada devuelve la lista guardada.',
      color: COLOR_FONDO,
    },
    {
      id: 'comparar',
      titulo: 'Comparar · durante todo el bucle',
      hilo: 'fondo',
      disparo: 'Cada pregunta Libre de cualquiera de los tres registros.',
      fin: 'Cuando el colocador devuelve su Resultado.',
      color: COLOR_FONDO,
    },
    {
      id: 'recalcular',
      titulo: 'Recalcular · verificador y base, cada uno por su cuenta',
      hilo: 'base',
      disparo: 'El resultado ya decidido; después, el disparador de cada insert.',
      fin: 'Cuando la fila queda insertada con sus minutos ya calculados por la base.',
      color: COLOR_BASE,
    },
  ],
  pasos: [
    {
      n: 1,
      banda: 'construir',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'PreparadorInstantaneaMotorPostgres',
      archivo: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
      metodo: 'CargarJornadasAsync — la consulta C-1',
      hace:
        'Trae las jornadas activas del alcance con sus días activos, su hora de inicio y fin en minutos, su duración de bloque, sus bloques por día, su receso y sus descansos.',
      entra: 'el alcance del plan',
      sale: 'ImmutableArray<Jornada>, ordenada por Id',
      base: 'jornadas · jornada_descansos',
      reglas: ['D-02', 'D-05'],
    },
    {
      n: 2,
      banda: 'construir',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      metodo: 'constructor · indiceFronteraPorMinuto',
      hace:
        'Para cada jornada y cada bloque calcula su minuto de inicio y de fin, mete todos esos minutos en un SortedSet común y los numera. Ese número es la franja.',
      entra: 'todas las jornadas de la instantánea, juntas',
      sale: 'ImmutableDictionary<int minuto, int franja>',
      reglas: ['D-04', 'D-06'],
      siFalla:
        'Como el conjunto es común a todas las jornadas, dos jornadas que empiezan a la misma hora comparten frontera, y por eso sus franjas son comparables.',
    },
    {
      n: 3,
      banda: 'construir',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      metodo: 'CalcularMinutos(jornada, slotInicio, duracionSlots)',
      hace:
        'inicio = minutoInicio + (slot − 1) × duracionBloque; fin = minutoInicio + últimoSlot × duracionBloque; y se suma el receso a lo que quede detrás de él.',
      entra: 'la jornada y la colocación',
      sale: '(Inicio, Fin) en minutos desde medianoche',
      reglas: ['D-06'],
      siFalla:
        'Es el mismo cálculo que hace el disparador aplicar_receso_a_sesion en la base, línea por línea.',
    },
    {
      n: 4,
      banda: 'catalogar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      metodo: 'ColocacionesDe(jornadaId, duracionSlots)',
      hace:
        'Genera el producto días activos × bloques, y se queda con los que sobreviven a cuatro filtros de forma temporal. El resultado se memoriza.',
      entra: '(Guid jornada, int duración)',
      sale: 'ImmutableArray<Colocacion>, ordenada por día y slot',
      reglas: ['D-02', 'D-03', 'D-04', 'D-05', 'D-06'],
      siFalla:
        'Una duración mayor que los bloques del día devuelve lista vacía, no excepción: es un dato, no un defecto.',
    },
    {
      n: 5,
      banda: 'catalogar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'Precalculo',
      archivo: 'Construccion/Precalculo.cs',
      metodo: 'Calcular → ColocacionesFactibles + P-07',
      hace:
        'Guarda esa lista en la asignación y cuenta cuántos días distintos tienen al menos una colocación. Si la asignación pide más sesiones que días, apaga P-02 para ella.',
      entra: 'la lista de colocaciones de su jornada y duración',
      sale: 'ColocacionesFactibles + AplicaP02',
      reglas: ['P-07'],
      siFalla:
        'Contar DiasActivos sería incorrecto: D-04 y D-05 pueden dejar un día activo sin ninguna colocación válida.',
    },
    {
      n: 6,
      banda: 'comparar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      metodo: 'Franjas(jornadaId, slotInicio, duracionSlots)',
      hace: 'Traduce los minutos a índices de franja: (Desde, Hasta), semiabierto.',
      entra: 'la colocación candidata',
      sale: '(int Desde, int Hasta)',
      siFalla: 'Una jornada que no pertenece a la rejilla lanza ArgumentException.',
    },
    {
      n: 7,
      banda: 'comparar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'RegistroOcupacion',
      archivo: 'Ocupacion/RegistroOcupacion.cs',
      metodo: 'Libre · Ocupar · Liberar',
      hace: 'Recorre de Desde a Hasta y pregunta, toma o devuelve cada franja. Nada más.',
      entra: 'entidad, día, franjas',
      sale: 'bool, o estado mutado',
      reglas: ['D-28', 'D-29', 'D-30'],
    },
    {
      n: 8,
      banda: 'comparar',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'AgendaDeCohortes',
      archivo: 'Construccion/ColocadorVoraz.cs',
      metodo: 'ClasesDelDia · DistanciaMasCorta · TieneElCursoEseDia',
      hace:
        'La otra lectura del tiempo, en slots y no en franjas: cuántas clases tiene ya la cohorte ese día y a cuántos slots está la más cercana.',
      entra: 'la sesión y la colocación candidata',
      sale: 'int · int · bool',
      reglas: ['P-02'],
      siFalla:
        'Cero significa contigua —o solapada, que lo descarta D-30 un paso después—; int.MaxValue significa que ese día está vacío.',
    },
    {
      n: 9,
      banda: 'recalcular',
      capa: 'motor',
      proyecto: 'Horarios.Motor',
      clase: 'VerificadorHorario',
      archivo: 'Verificacion/VerificadorHorario.cs',
      metodo: 'SeSolapan(a, b, rejilla)',
      hace:
        'Con su propia rejilla, recalcula los minutos de las dos sesiones y compara los rangos: mismo día y rangoA.Inicio < rangoB.Fin && rangoB.Inicio < rangoA.Fin.',
      entra: 'dos sesiones colocadas',
      sale: 'bool',
      reglas: ['D-28', 'D-29', 'D-30'],
      siFalla: 'Una jornada ausente devuelve falso en vez de lanzar: el código correspondiente ya lo dijo aparte.',
    },
    {
      n: 10,
      banda: 'recalcular',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'aplicar_receso_a_sesion',
      archivo: 'docs/database.sql:544',
      metodo: 'trigger BEFORE INSERT OR UPDATE sobre sesiones',
      hace:
        'Antes de guardar, recalcula minuto_inicio_dia y minuto_fin_dia sumando el receso, y lanza si la sesión se pasa del fin de la jornada.',
      entra: 'la fila con jornada, slot inicial y duración',
      sale: 'la misma fila con sus minutos corregidos',
      base: 'trigger zz_sesiones_aplicar_receso_trg',
      reglas: ['D-06', 'D-04'],
      siFalla: '«La sesión excede el fin de la jornada al considerar el receso.»',
    },
    {
      n: 11,
      banda: 'recalcular',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'sesiones.rango_minutos',
      archivo: 'docs/database.sql:5371',
      metodo: 'GENERATED ALWAYS AS int4range(minuto_inicio_dia, minuto_fin_dia, «[)») STORED',
      hace:
        'La columna que las tres restricciones de exclusión comparan. Es un rango semiabierto, igual que las franjas del motor.',
      entra: 'los dos minutos ya corregidos',
      sale: 'int4range almacenado e indexado por gist',
      reglas: ['D-28', 'D-29', 'D-30'],
    },
  ],
  piePasos:
    'El mismo cálculo existe tres veces: en la rejilla del motor, en la rejilla nueva del verificador y en el disparador de la base. Que las tres den lo mismo es lo que hace que el horario que el motor promete sea el que la base acepta.',
  peticionesPista:
    'Todo lo temporal se le pregunta a la rejilla, y la rejilla no le pregunta nada a nadie: se construye con las jornadas de la instantánea y a partir de ahí es de solo lectura.',
  peticiones: [
    {
      quien: 'MotorHorarios',
      aQuien: 'Instantanea.Jornadas',
      contrato: 'new RejillaTiempo(jornadas)',
      frontera: 'memoria',
      pide: 'Todas las jornadas del plan, con sus descansos.',
      devuelve: 'la rejilla del plan, una sola para las tres piezas',
      nota:
        'Las tres piezas —rejilla, precálculo y colocador— comparten una a propósito: dos numerarían las franjas distinto.',
    },
    {
      quien: 'Precalculo',
      aQuien: 'RejillaTiempo',
      contrato: 'ColocacionesDe(jornadaId, duracionSlots) → ImmutableArray<Colocacion>',
      frontera: 'proceso',
      pide: '¿Dónde cabe una sesión de esta duración en esta jornada?',
      devuelve: 'la lista de (día, slot) válidos, ordenada',
      nota:
        'Memorizada por (jornada, duración): todas las asignaciones de la misma jornada y duración comparten la misma lista.',
    },
    {
      quien: 'RegistroOcupacion',
      aQuien: 'RejillaTiempo',
      contrato: 'Franjas(jornadaId, slotInicio, duracionSlots) → (Desde, Hasta)',
      frontera: 'proceso',
      pide: '¿Qué trozos del reloj común ocupa esto?',
      devuelve: 'dos índices',
      nota: 'Es la única traducción entre «bloque de una jornada» y «hora del día» que existe en el motor.',
    },
    {
      quien: 'Precalculo',
      aQuien: 'RejillaTiempo',
      contrato: 'Minutos(jornadaId, slot, duracionSlots) → (Inicio, Fin)',
      frontera: 'proceso',
      pide: '¿Cabe la sesión antes de que termine la jornada, empiece donde empiece?',
      devuelve: 'un rango de minutos',
      nota: 'Se usa para redactar el motivo de SIN_COLOCACION_FACTIBLE, que distingue D-03 de D-04 de D-05.',
    },
    {
      quien: 'la pantalla',
      aQuien: 'sesiones.minuto_inicio_dia · minuto_fin_dia',
      contrato: 'SesionHorarioGeneradoDto.MinutoInicio · MinutoFin',
      frontera: 'render',
      pide: '¿A qué hora empieza y termina esta clase?',
      devuelve: 'dos enteros, minutos desde medianoche',
      nota:
        'Van calculados en la fila para que la pantalla ubique la clase sin conocer la jornada ni el receso. Es la única forma en que las franjas salen del servidor, y ya convertidas.',
    },
  ],
  reglasPista:
    'Las cinco reglas de forma temporal se resuelven todas en la rejilla, antes de que el colocador exista. Después, ninguna se vuelve a mirar: lo que la rejilla devuelve ya es válido por construcción.',
  reglas: [
    {
      codigo: 'D-02',
      nombre: 'Solo días activos',
      momento: 'previa',
      donde: 'RejillaTiempo.ColocacionesDe · jornada.DiasActivos',
      cuando: 'Al generar el catálogo de colocaciones.',
      pregunta: '¿La jornada trabaja ese día?',
      espejo: 'validar_sesion_en_jornada, database.sql:3796',
      siNo: 'Ese día no produce ninguna colocación.',
    },
    {
      codigo: 'D-03',
      nombre: 'Cabe en los bloques del día',
      momento: 'previa',
      donde: 'RejillaTiempo.EsValida · ValidarRangoSlots',
      cuando: 'Al generar el catálogo, y al traducir cualquier colocación a minutos.',
      pregunta: '¿El último slot de la sesión sigue dentro de bloques_por_dia?',
      espejo: 'validar_sesion_en_jornada, database.sql:3800',
      siNo:
        'Se descarta. Una duración mayor que los bloques del día deja la lista vacía y produce el diagnóstico correspondiente.',
    },
    {
      codigo: 'D-04',
      nombre: 'Termina antes que la jornada',
      momento: 'previa',
      donde: 'RejillaTiempo.EsValida · fin > jornada.MinutoFin',
      cuando: 'Al generar el catálogo, ya con el receso sumado.',
      pregunta: '¿El minuto final de la sesión pasa de la hora de fin?',
      espejo: 'validar_sesion_en_jornada, database.sql:3813',
      siNo: 'Se descarta. También lo comprueba el disparador de la base al insertar.',
    },
    {
      codigo: 'D-05',
      nombre: 'No pisa un descanso',
      momento: 'previa',
      donde: 'RejillaTiempo.EsValida · jornada.Descansos',
      cuando: 'Al generar el catálogo.',
      pregunta: '¿El tramo de la sesión se cruza con algún descanso de ese día?',
      espejo: 'validar_sesion_en_jornada, database.sql:3817',
      siNo:
        'Se descarta. La comparación es de rangos semiabiertos: descanso.SlotDesde < finExclusivo && slotInicio < descanso.SlotHasta.',
    },
    {
      codigo: 'D-06',
      nombre: 'El receso corre el reloj',
      momento: 'previa',
      donde: 'RejillaTiempo.CalcularMinutos',
      cuando: 'En cada traducción de bloque a minutos.',
      pregunta: '¿La sesión empieza o termina después del receso?',
      espejo: 'aplicar_receso_a_sesion, database.sql:552',
      siNo:
        'Si empieza después, se le suma el receso al inicio y al fin; si solo termina después, solo al fin. Una sesión que cruza el receso se lo come.',
    },
    {
      codigo: 'D-10',
      nombre: 'Una cohorte, una jornada',
      momento: 'previa',
      donde: 'ReglasCohorte.CohortesEnLaJornadaDeLaSesion',
      cuando: 'Al expandir, y otra vez en el verificador.',
      pregunta: '¿Toda cohorte de la sesión cursa la jornada de la sesión?',
      espejo: 'completar_sesion_cohorte, database.sql:945',
      siNo:
        'Es la regla que sostiene todo el razonamiento en slots: como una cohorte solo tiene sesiones de su propia jornada, para ella el índice de slot ya identifica la hora.',
    },
  ],
  estructurasPista:
    'La rejilla guarda tres cosas y ninguna cambia después de construirse. La tercera es una memoria: la misma pregunta no se calcula dos veces.',
  estructuras: [
    {
      clase: 'RejillaTiempo',
      archivo: 'Tiempo/RejillaTiempo.cs',
      guarda: 'ImmutableDictionary<Guid, Jornada> · ImmutableDictionary<int, int> · Dictionary<(Guid, int), ImmutableArray<Colocacion>>',
      clave: 'jornada por Id · minuto de frontera → franja · (jornada, duración) → colocaciones',
      responde: 'Minutos, Franjas y ColocacionesDe.',
      cambia:
        'Solo el tercero, y solo añadiendo: la primera llamada calcula la lista y la guarda; las siguientes la devuelven.',
      porque:
        'Las fronteras salen de un SortedSet común a todas las jornadas, así que dos jornadas que comparten una hora comparten su número. Eso es lo que hace comparables los veredictos entre jornadas.',
    },
  ],
  lecturasPista:
    'Una colocación candidata contra el catálogo entero. La segunda columna explica por qué el catálogo se calcula una vez y no en cada intento.',
  lecturas: [
    {
      titulo: 'De bloque a minutos',
      individual: {
        unidad: 'una colocación (día, slot inicial)',
        pasos: [
          'Se le suma (slot − 1) × duración de bloque al minuto de inicio de la jornada.',
          'Si empieza pasado el receso, se le suma también la duración del receso.',
          'El fin se calcula igual, con el último slot, y se le suma el receso si queda detrás de él.',
          'Esos dos minutos se buscan en el diccionario de fronteras y salen dos índices de franja.',
        ],
      },
      lote: {
        unidad: 'el catálogo de una (jornada, duración)',
        pasos: [
          'Se hace el producto días activos × bloques por día, ordenado por día y por slot.',
          'Se filtra con D-03, D-04 y D-05, en ese orden, y lo que queda es el catálogo.',
          'Se guarda en el diccionario: todas las asignaciones de la misma jornada y duración lo comparten.',
          'De ahí sale la tercera cifra de la dificultad, que decide el turno de la asignación.',
        ],
      },
      cardinalidad: 'J jornadas × D duraciones → J×D catálogos, cada uno de días × bloques colocaciones',
    },
    {
      titulo: 'Detectar el cruce',
      individual: {
        unidad: 'un par de sesiones',
        pasos: [
          'En el colocador no hay pares: se pregunta al conjunto si la franja está tomada, y eso es constante.',
          'En el verificador sí los hay: se recorren todos los pares y se comparan sus rangos de minutos.',
          'Distinto día, no hay cruce, y se corta antes de calcular nada.',
          'Mismo día y rangos que se cortan: se mira si comparten aula, docente o alguna cohorte.',
        ],
      },
      lote: {
        unidad: 'el horario entero',
        pasos: [
          'El colocador nunca compara dos sesiones entre sí: por eso puede colocar miles sin que crezca el coste.',
          'El verificador sí, y a propósito: reconstruye la regla desde la salida, sin fiarse de quién la produjo.',
          'La base lo hace una tercera vez, con un índice gist sobre el rango, y esa es la única insaltable.',
          'Las tres tienen que coincidir; que coincidan es lo que hace publicable el horario.',
        ],
      },
      cardinalidad: 'S sesiones → S preguntas al conjunto en el colocador, y S×(S−1)/2 pares en el verificador',
    },
  ],
  fallosPista:
    'El cruce casi nunca aparece como error: aparece como una asignación pendiente, porque el motor pregunta antes de ocupar. Los demás casos son la red de seguridad.',
  fallos: [
    {
      codigo: 'SIN_COLOCACION_FACTIBLE',
      origen: 'motor',
      cuando: 'Precálculo, cuando el catálogo de esa (jornada, duración) sale vacío.',
      mensaje:
        '«No hay ninguna colocación factible para el curso X de la cohorte Y: la sesión de 3 slots termina después de la hora de fin de la jornada J empiece donde empiece (D-04), ni siquiera antes del receso de 20 minutos (D-06).»',
      arreglo:
        'Se pregunta en el orden en que la rejilla las aplica, de la más gruesa a la más fina, para nombrar solo la regla que de verdad vació la lista.',
    },
    {
      codigo: 'P02_RELAJADA',
      origen: 'motor',
      cuando: 'Precálculo, cuando la asignación pide más sesiones que días con colocación.',
      mensaje:
        '«Se permite más de una sesión por día para el curso X de la cohorte Y: pide 5 sesiones y solo tiene 4 días con colocaciones factibles.»',
      arreglo:
        'P-07 apaga sola la preferencia P-02 para esa asignación. Sin eso, quedaría pendiente por una preferencia, no por una regla.',
    },
    {
      codigo: 'SEMESTRE_NO_CABE',
      origen: 'motor',
      cuando: 'Precálculo, sumando los slots semanales que pide cada cohorte.',
      mensaje:
        '«La cohorte C pide 46 slots semanales y la jornada J tiene 40; faltan 6 slots, equivalentes a por lo menos 3 sesiones. Es un ajuste del pensum o de la jornada, no del horario.»',
      arreglo:
        'Es aritmética, no búsqueda: se sabe antes de intentar nada. El plan se genera igual, con esas sesiones pendientes.',
    },
    {
      codigo: 'COLOCACION_FUERA_DE_JORNADA',
      origen: 'verificador',
      cuando: 'Sobre cada sesión emitida.',
      mensaje: '«La colocación de la sesión S no cabe en su jornada.»',
      arreglo:
        'Comprueba que la colocación esté en el catálogo de la rejilla. Si aparece, el colocador usó una colocación que no salió de ColocacionesDe.',
    },
    {
      codigo: 'raise exception',
      origen: 'base',
      cuando: 'En el disparador, antes de insertar la fila.',
      mensaje: '«La sesión excede el fin de la jornada al considerar el receso.»',
      arreglo:
        'Significa que el cálculo del motor y el de la base no coincidieron. Es la comprobación que hace que las dos fórmulas tengan que ser la misma.',
    },
  ],
  cifras: [
    { valor: '5', que: 'reglas de forma temporal', nota: 'D-02 a D-06, todas resueltas en la rejilla' },
    { valor: '1', que: 'conjunto de fronteras', nota: 'común a todas las jornadas del plan' },
    { valor: '[ )', que: 'rangos semiabiertos', nota: 'en el motor y en int4range de la base' },
    { valor: '3', que: 'veces que se calcula lo mismo', nota: 'motor, verificador y disparador de la base' },
    { valor: '1', que: 'lista memorizada', nota: 'por (jornada, duración), no por asignación' },
  ],
};

// ═══════════════════════════════════════════════ 5.5 · consulta de horarios

const CONSULTA: DetalleMotor = {
  id: 'consulta',
  numero: '5.5',
  eyebrow: 'Motor · 5.5',
  titulo: 'Consultar horarios: dos caminos distintos que no comparten ni una clase',
  subtitulo:
    'Leer el horario no pasa por el motor. Hay dos rutas: la revisión del plan, que lee el horario vivo con sus conflictos y sus pendientes, y el reporte, que lee una generación ya completada y devuelve una tabla genérica. Las dos son consultas del hilo web, sin cola ni segundo plano; las dos resuelven los nombres y los minutos dentro de la base para que la pantalla no vuelva a preguntar. Aquí están los dos recorridos completos, con sus filtros, su paginación y sus reglas de acceso.',
  bandas: [
    {
      id: 'revision',
      titulo: 'Camino A · la revisión del plan, desde Planes.razor',
      hilo: 'web',
      disparo: 'El botón «Ver horario» de un plan, o el fin del sondeo cuando la generación termina.',
      fin: 'Cuando llega el HorarioGeneradoDto: 500 sesiones por página, y los conflictos y pendientes enteros.',
      color: COLOR_LECTURA,
    },
    {
      id: 'reporte',
      titulo: 'Camino B · el reporte, desde Consultas.razor',
      hilo: 'web',
      disparo: 'El botón «Consultar reporte», con plan, generación, vista y filtro ya elegidos.',
      fin: 'Cuando llega el ReportePreliminarDto con sus encabezados y sus filas.',
      color: COLOR_LECTURA,
    },
    {
      id: 'sondeo',
      titulo: 'Mientras tanto · el sondeo que decide cuándo hay algo que leer',
      hilo: 'web',
      disparo: 'La generación queda encolada: la pantalla arranca su PeriodicTimer.',
      fin: 'Cuando el plan deja de estar en Generando, o al pasar del presupuesto del motor más 20 s de margen.',
      color: COLOR_WEB,
    },
  ],
  pasos: [
    {
      n: 1,
      banda: 'revision',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Planes.razor',
      archivo: 'Components/Pages/Planes.razor',
      metodo: 'VerHorario(planId)',
      hace:
        'Limpia lo anterior, marca cargandoHorario y llama al caso de uso con el identificador del plan. Nada más: la pantalla no manda estado.',
      entra: 'Guid planId',
      sale: 'HorarioGeneradoDto en el campo horario',
      siFalla: 'InvalidOperationException se muestra tal cual en la barra de mensajes.',
    },
    {
      n: 2,
      banda: 'revision',
      capa: 'aplicacion',
      proyecto: 'Horarios.Aplicacion',
      clase: 'ConsultarHorarioGenerado',
      archivo: 'Motor/ConsultasGeneraciones.cs',
      metodo: 'EjecutarAsync(planId)',
      hace: 'Comprueba que el plan no sea Guid.Empty y delega en el puerto. No hace nada más.',
      entra: 'Guid planId',
      sale: 'Task<HorarioGeneradoDto>',
      siFalla: 'ArgumentException: «El plan es obligatorio.»',
    },
    {
      n: 3,
      banda: 'revision',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'DatosGeneracionesPostgres',
      archivo: 'Planes/DatosGeneracionesPostgres.cs',
      metodo: 'ConsultarAsync — implementa IDatosHorarioGenerado',
      hace:
        'Llama a la RPC con cuatro parámetros: el plan como horario, página 1, tamaño 500 y ver todo en verdadero.',
      entra: 'Guid planId',
      sale: 'HorarioGeneradoDto deserializado del jsonb',
      base: 'RPC consultar_revision_horario',
      siFalla:
        'La función acepta once parámetros, ocho de ellos filtros; la aplicación hoy solo usa cuatro y pasa p_ver_todo := true, así que el recorte por facultad o por docente que la función soporta no se ejerce desde aquí.',
    },
    {
      n: 4,
      banda: 'revision',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'consultar_revision_horario',
      archivo: 'docs/database.sql:1544',
      metodo: 'LANGUAGE sql STABLE · tres CTE y un jsonb_build_object',
      hace:
        'sesiones_filtradas une sesiones con curso, docente, aula, jornada, cohorte y carrera; pagina la ordena y la recorta; conflictos y pendientes se leen enteros.',
      entra: 'p_horario_id + ocho filtros opcionales + paginación',
      sale: 'jsonb: sesiones, conflictos, pendientes, total_sesiones, pagina, tamano_pagina',
      base: 'sesiones · sesion_cohortes · conflictos · conflicto_sesiones · sesiones_no_asignadas',
      siFalla:
        'Un filtro en nulo no filtra: cada condición es «p_x is null or columna = p_x». El total se cuenta sobre las filtradas, no sobre la página.',
    },
    {
      n: 5,
      banda: 'revision',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Planes.razor',
      archivo: 'Components/Pages/Planes.razor',
      metodo: 'SesionesFiltradas · Hora(minuto) · NombreDia(dia)',
      hace:
        'Pinta la tabla de día, hora, curso, cohorte, docente, aula y jornada, con un filtro de texto en cliente sobre lo ya traído, y los chips de totales.',
      entra: 'HorarioGeneradoDto',
      sale: 'la tabla, los chips y la lista de diagnósticos',
      siFalla:
        'El filtro de la barra de búsqueda no vuelve al servidor: recorta las 500 filas que ya están en memoria.',
    },
    {
      n: 6,
      banda: 'reporte',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Consultas.razor',
      archivo: 'Components/Pages/Consultas.razor',
      metodo: 'OnInitializedAsync · Task.WhenAll(4)',
      hace:
        'Carga en paralelo planes, docentes, aulas y cohortes para llenar los desplegables. El botón no se habilita hasta que hay generación y, si la vista lo pide, filtro.',
      entra: 'ninguna',
      sale: 'las cuatro listas del formulario',
      siFalla: 'Cualquier excepción de las cuatro se muestra como error y deja el formulario vacío.',
    },
    {
      n: 7,
      banda: 'reporte',
      capa: 'aplicacion',
      proyecto: 'Horarios.Aplicacion',
      clase: 'ConsultarReporte',
      archivo: 'Consultas/ConsultarReporte.cs',
      metodo: 'EjecutarAsync(solicitud)',
      hace:
        'Exige el permiso consultas:leer, normaliza la vista a minúsculas, comprueba que sea una de las cuatro permitidas y que las tres que lo requieren traigan filtro.',
      entra: 'ConsultarReporteSolicitud(GeneracionId, Vista, FiltroId, …)',
      sale: 'la misma solicitud normalizada, hacia el puerto',
      reglas: ['consultas:leer'],
      siFalla:
        'ArgumentException: «La vista de reporte no es válida» o «La vista seleccionada requiere un filtro». En la vista diagnóstico el filtro se anula.',
    },
    {
      n: 8,
      banda: 'reporte',
      capa: 'infraestructura',
      proyecto: 'Horarios.Infraestructura',
      clase: 'DatosConsultasPostgres',
      archivo: 'Consultas/DatosConsultasPostgres.cs',
      metodo: 'ConsultarReporteAsync',
      hace: 'Traduce la solicitud a los diez parámetros de la RPC, uno a uno. Treinta líneas y ninguna decisión.',
      entra: 'ConsultarReporteSolicitud',
      sale: 'Task<ReportePreliminarDto>',
      base: 'RPC consultar_datos_reporte',
    },
    {
      n: 9,
      banda: 'reporte',
      capa: 'postgres',
      proyecto: 'supabase',
      clase: 'consultar_datos_reporte',
      archivo: 'docs/database.sql:1373',
      metodo: 'LANGUAGE plpgsql STABLE',
      hace:
        'Resuelve el plan y el estado de la generación; si la vista es diagnóstico lee mensajes_generacion, y si no, arma nueve columnas fijas uniendo por el curso visible de cada cohorte.',
      entra: 'p_generacion_id, p_vista, p_filtro_id y siete filtros más',
      sale: 'jsonb: horario_id, generacion_id, titulo, encabezados, filas',
      base: 'generaciones · mensajes_generacion · sesiones · sesion_cohortes · cohortes · carreras · cursos',
      siFalla:
        '«No se encontro la generacion solicitada» si no existe; «Solo una generacion completada puede exportarse» si su estado no es completada.',
    },
    {
      n: 10,
      banda: 'reporte',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Consultas.razor',
      archivo: 'Components/Pages/Consultas.razor',
      metodo: 'la tabla genérica',
      hace:
        'Pinta los encabezados que vengan y las celdas que vengan, con un guion largo donde haya vacío. La pantalla no sabe qué columnas son.',
      entra: 'ReportePreliminarDto',
      sale: 'la tabla y el conteo de filas',
      siFalla:
        'Cero filas tiene dos mensajes distintos: en diagnóstico significa que todo está bien, y en las demás vistas que no hay datos para esos filtros.',
    },
    {
      n: 11,
      banda: 'sondeo',
      capa: 'blazor',
      proyecto: 'Horarios.Blazor',
      clase: 'Planes.razor',
      archivo: 'Components/Pages/Planes.razor',
      metodo: 'SeguirAsync · PeriodicTimer(2 s)',
      hace:
        'Cada dos segundos vuelve a listar planes y generaciones, y muestra cuánto lleva contra el presupuesto del motor y contra el intento anterior.',
      entra: 'ninguna',
      sale: 'PlanHorario[] · GeneracionHorarioDto[]',
      base: 'RPC listar_generaciones_plan',
      siFalla:
        'Para en cuanto el plan deja de estar en Generando; con 20 s de margen sobre los 300 s del motor, declara que no respondió.',
    },
    {
      n: 12,
      banda: 'sondeo',
      capa: 'aplicacion',
      proyecto: 'Horarios.Aplicacion',
      clase: 'ObtenerAlcanceUsuario',
      archivo: 'Acceso/ObtenerAlcanceUsuario.cs',
      metodo: 'EjecutarAsync(usuarioId)',
      hace:
        'Resuelve qué puede ver el usuario: si es docente, cuál es su DocenteId. Es lo que la pantalla del docente usa para saber de quién es el espacio.',
      entra: 'Guid usuarioId',
      sale: 'AlcanceUsuario',
      base: 'RPC obtener_alcance_usuario',
      siFalla: '«No se encontró un docente relacionado con este usuario.»',
    },
  ],
  piePasos:
    'Ninguno de los doce pasos toca el motor, la cola ni el hilo de fondo: leer un horario es una consulta corriente del hilo web. Lo único que corre en segundo plano es la generación, y la lectura solo espera a que termine mirando el estado del plan cada dos segundos.',
  peticionesPista:
    'Qué se pide, con qué contrato y hasta dónde llega. Los dos caminos devuelven todo resuelto —nombres, minutos, totales— para que la pantalla no tenga que volver a consultar por cada fila.',
  peticiones: [
    {
      quien: 'Planes.razor',
      aQuien: 'ConsultarHorarioGenerado',
      contrato: 'EjecutarAsync(Guid planId)',
      frontera: 'proceso',
      pide: 'El horario vivo de este plan.',
      devuelve: 'HorarioGeneradoDto',
      nota: 'La pantalla manda un identificador y nada más: si mandara el plan, mandaría el que tenía cargado.',
    },
    {
      quien: 'ConsultarHorarioGenerado',
      aQuien: 'IDatosHorarioGenerado',
      contrato: 'ConsultarAsync(planId) → HorarioGeneradoDto',
      frontera: 'proceso',
      pide: 'Lo mismo, por el puerto.',
      devuelve: 'el DTO ya armado',
      nota:
        'El caso de uso no sabe que detrás hay una RPC: por eso el mismo contrato serviría con otra base.',
    },
    {
      quien: 'DatosGeneracionesPostgres',
      aQuien: 'Postgres',
      contrato: 'consultar_revision_horario(p_horario_id, p_pagina := 1, p_tamano_pagina := 500, p_ver_todo := true)',
      frontera: 'rpc',
      pide: 'Sesiones paginadas, y conflictos y pendientes enteros.',
      devuelve: 'un solo jsonb con seis claves',
      nota:
        'Las sesiones se paginan porque un período completo son miles; los conflictos y pendientes no, porque son pocos y hay que verlos todos.',
    },
    {
      quien: 'Consultas.razor',
      aQuien: 'ConsultarReporte',
      contrato: 'ConsultarReporteSolicitud(GeneracionId, Vista, FiltroId)',
      frontera: 'proceso',
      pide: 'La tabla de una generación completada, por docente, cohorte, aula o diagnóstico.',
      devuelve: 'ReportePreliminarDto',
      nota:
        'La solicitud tiene diez campos y la pantalla solo usa tres: los otros siete son filtros que la función ya acepta.',
    },
    {
      quien: 'DatosConsultasPostgres',
      aQuien: 'Postgres',
      contrato: 'consultar_datos_reporte(p_generacion_id, p_vista, p_filtro_id, …)',
      frontera: 'rpc',
      pide: 'Encabezados y filas, ya formateados.',
      devuelve: 'jsonb: horario_id, generacion_id, titulo, encabezados, filas',
      nota:
        'El título lo arma la base: «Horario por » || initcap(vista). La pantalla no conoce ni las columnas ni el nombre del reporte.',
    },
    {
      quien: 'Planes.razor (sondeo)',
      aQuien: 'ListarGeneracionesPlan',
      contrato: 'listar_generaciones_plan(p_plan_id) → GeneracionHorarioDto[]',
      frontera: 'rpc',
      pide: 'El historial de intentos: cuándo, cuánto tardó y cómo salió cada uno.',
      devuelve: 'la lista de expedientes con sus mensajes',
      nota:
        'Es el mismo tipo que devuelven abrir y cerrar una generación. La pantalla no conoce ningún otro.',
    },
  ],
  reglasPista:
    'Qué se valida al leer, y dónde. Casi todo ocurre antes de la consulta —permisos y forma de la solicitud— o dentro de la función, que es quien decide qué generaciones se pueden mirar.',
  reglas: [
    {
      codigo: 'consultas:leer',
      nombre: 'Permiso de consulta',
      momento: 'previa',
      donde: 'ConsultarReporte · AutorizacionAplicacion.Exigir',
      cuando: 'Lo primero del caso de uso, antes de mirar la solicitud.',
      pregunta: '¿Tiene el usuario permiso para leer consultas?',
      espejo: 'La página además declara @attribute [Authorize(Policy = "consultas:leer")].',
      siNo: 'UnauthorizedAccessException. La comprobación está en los dos sitios a propósito.',
    },
    {
      codigo: 'Vista válida',
      nombre: 'Solo cuatro vistas',
      momento: 'previa',
      donde: 'ConsultarReporte · VistasPermitidas',
      cuando: 'Antes de llamar al puerto.',
      pregunta: '¿La vista es docente, cohorte, aula o diagnóstico?',
      espejo: 'Comparación sin distinguir mayúsculas; la vista se normaliza a minúsculas antes de viajar.',
      siNo: 'ArgumentException: «La vista de reporte no es válida.»',
    },
    {
      codigo: 'Filtro obligatorio',
      nombre: 'Tres vistas exigen filtro',
      momento: 'previa',
      donde: 'ConsultarReporte · requiereFiltro',
      cuando: 'Junto a la validación de la vista.',
      pregunta: '¿Docente, cohorte o aula traen su identificador?',
      espejo: 'En la vista diagnóstico el filtro se pone a nulo aunque venga con valor.',
      siNo: 'ArgumentException: «La vista seleccionada requiere un filtro.»',
    },
    {
      codigo: 'Generación completada',
      nombre: 'Solo se exporta lo terminado',
      momento: 'base',
      donde: 'consultar_datos_reporte',
      cuando: 'Lo primero de la función, tras resolver el plan.',
      pregunta: '¿El estado de la generación es completada?',
      espejo: 'select estado from horarios.generaciones where id = p_generacion_id',
      siNo: '«Solo una generacion completada puede exportarse.»',
    },
    {
      codigo: 'Alcance',
      nombre: 'Qué sesiones puede ver quien pregunta',
      momento: 'base',
      donde: 'consultar_revision_horario · la cláusula de alcance',
      cuando: 'Dentro de la CTE, sobre cada fila.',
      pregunta: '¿Ve todo, es el docente de la sesión, o la carrera es de una de sus facultades?',
      espejo: 'p_ver_todo or (p_docente_alcance_id is not null and d.id = …) or ca.facultad_id = any(p_facultad_ids)',
      siNo:
        'La fila no aparece. Hoy la aplicación llama siempre con p_ver_todo := true, así que este recorte está disponible pero no se usa desde la pantalla de planes.',
    },
    {
      codigo: 'Curso visible',
      nombre: 'El reporte nombra el curso de la cohorte',
      momento: 'base',
      donde: 'consultar_datos_reporte · join cursos on cu.id = sc.curso_visible_id',
      cuando: 'Al armar las filas de las vistas que no son diagnóstico.',
      pregunta: '¿Qué curso se le enseña a cada cohorte de esa clase?',
      espejo: 'La revisión, en cambio, une por s.curso_id: el curso de la sesión.',
      siNo:
        'En área común no son el mismo curso, así que cada cohorte ve el nombre que le corresponde en su pensum.',
    },
  ],
  estructurasPista:
    'Los dos contratos de salida. Ninguno de los dos es un tipo del motor: la lectura tiene sus propios DTO, hechos para pintar.',
  estructuras: [
    {
      clase: 'HorarioGeneradoDto',
      archivo: 'Contratos/Planes/GeneracionHorarioDtos.cs',
      guarda: 'SesionHorarioGeneradoDto[] · IncidenciaHorarioGeneradoDto[] ×2 · TotalSesiones, Pagina, TamanoPagina',
      clave: 'una fila por sesión, con nombre e identificador de cada cosa',
      responde: 'Qué clases hay, a qué hora, con quién y dónde; y qué salió mal.',
      cambia: 'Nunca: es una foto de lectura.',
      porque:
        'Trae el nombre para mostrar y el identificador para filtrar sin volver a consultar, y los minutos ya calculados para ubicar la clase sin conocer la jornada.',
    },
    {
      clase: 'ReportePreliminarDto',
      archivo: 'Contratos/Consultas/ReporteDtos.cs',
      guarda: 'HorarioId, GeneracionId, Titulo, string[] Encabezados, ReporteFilaDto[] Filas',
      clave: 'una lista de celdas por fila, sin nombres de columna',
      responde: 'La misma tabla para las cuatro vistas.',
      cambia: 'Nunca.',
      porque:
        'Es deliberadamente genérico: la vista de diagnóstico tiene tres columnas y las otras nueve, y la pantalla pinta las dos con el mismo código.',
    },
  ],
  lecturasPista:
    'Una fila contra la consulta entera. La segunda columna es donde se ve por qué las sesiones se paginan y los conflictos no.',
  lecturas: [
    {
      titulo: 'La revisión del plan',
      individual: {
        unidad: 'una sesión de la página',
        pasos: [
          'Sale de un join de siete tablas: curso, docente, aula, jornada, cohorte, carrera y la sesión.',
          'Trae el nombre y el identificador de cada cosa: el nombre para mostrar, el identificador para filtrar.',
          'Trae minuto_inicio y minuto_fin ya calculados, con el receso incluido por el disparador de la base.',
          'La pantalla la pinta como una fila de siete columnas, sin preguntar nada más.',
        ],
      },
      lote: {
        unidad: 'la consulta entera',
        pasos: [
          'Las sesiones se ordenan por día, slot, carrera, año y sección, y se recortan a 500.',
          'Los conflictos vienen de dos tablas unidas y ordenados por dureza y por fecha, sin paginar.',
          'Los pendientes vienen de sesiones_no_asignadas con el código fijo SESION_PENDIENTE y severidad alta.',
          'total_sesiones se cuenta sobre las filtradas, no sobre la página: es el número que sale en el chip.',
        ],
      },
      cardinalidad: '1 plan → 1 RPC → 500 sesiones + todos los conflictos + todos los pendientes',
    },
    {
      titulo: 'El reporte de una generación',
      individual: {
        unidad: 'una fila del reporte',
        pasos: [
          'Es un jsonb_build_array de nueve textos, o de tres si la vista es diagnóstico.',
          'La cohorte se arma como año de ingreso más sección; el curso como código más nombre.',
          'Ninguna celda lleva tipo: todo va como texto, ya formateado.',
          'La pantalla pinta un guion largo donde la celda venga vacía.',
        ],
      },
      lote: {
        unidad: 'la vista completa',
        pasos: [
          'La vista decide qué se lee: diagnóstico va a mensajes_generacion, las demás a las sesiones.',
          'El filtro se aplica solo a su propia vista: el de docente no filtra en la vista de aula.',
          'No hay paginación: la vista devuelve todas las filas que pasen los filtros.',
          'El título lo arma la base con initcap, así que la pantalla no lo compone.',
        ],
      },
      cardinalidad: '1 generación completada + 1 vista + 1 filtro → 1 tabla de 3 o 9 columnas',
    },
  ],
  fallosPista:
    'Los errores de lectura son de dos clases: los que la aplicación atrapa antes de salir, y los que la función lanza porque solo ella puede saberlos.',
  fallos: [
    {
      codigo: 'El plan es obligatorio',
      origen: 'aplicacion',
      cuando: 'ConsultarHorarioGenerado, con Guid.Empty.',
      mensaje: 'ArgumentException: «El plan es obligatorio.»',
      arreglo: 'No llega a la base. Es la única validación del caso de uso de revisión.',
    },
    {
      codigo: 'La vista de reporte no es válida',
      origen: 'aplicacion',
      cuando: 'ConsultarReporte, con una vista fuera de las cuatro.',
      mensaje: 'ArgumentException, antes de llamar al puerto.',
      arreglo:
        'La lista blanca está en el caso de uso, no en la pantalla: cambiar el desplegable no abre vistas nuevas.',
    },
    {
      codigo: 'No se encontro la generacion solicitada',
      origen: 'base',
      cuando: 'consultar_datos_reporte, al resolver el plan.',
      mensaje: 'raise exception dentro de la función.',
      arreglo: 'Llega a la pantalla como mensaje de error y limpia el resultado anterior.',
    },
    {
      codigo: 'Solo una generacion completada puede exportarse',
      origen: 'base',
      cuando: 'Cuando el estado no es completada.',
      mensaje: 'raise exception dentro de la función.',
      arreglo:
        'Una generación cancelada, fallida o inviable no se exporta, aunque haya dejado sesiones guardadas.',
    },
    {
      codigo: 'Esta generación no tiene sesiones asignadas para mostrar',
      origen: 'aplicacion',
      cuando: 'Cuando la lista viene vacía.',
      mensaje: 'El estado vacío de Planes.razor.',
      arreglo:
        'No es un error: puede ser un plan inviable, cuyos pendientes sí aparecen abajo con su motivo.',
    },
    {
      codigo: 'Todo está bien',
      origen: 'aplicacion',
      cuando: 'Vista diagnóstico con cero filas.',
      mensaje: '«Todo está bien: la generación no registró diagnósticos ni conflictos.»',
      arreglo:
        'La misma tabla vacía significa dos cosas opuestas según la vista, y por eso el mensaje cambia.',
    },
  ],
  cifras: [
    { valor: '2', que: 'caminos de lectura', nota: 'revisión del plan y reporte; no comparten ninguna clase' },
    { valor: '500', que: 'sesiones por página', nota: 'el tamaño que pide la aplicación, de un máximo de 100 por defecto' },
    { valor: '4', que: 'vistas de reporte', nota: 'docente, cohorte, aula y diagnóstico' },
    { valor: '2 s', que: 'de sondeo', nota: 'PeriodicTimer, hasta que el plan deja de estar en Generando' },
    { valor: '0', que: 'procesos de fondo', nota: 'leer un horario no encola nada' },
  ],
};

export const SUBSLIDES_MOTOR: DetalleMotor[] = [AULAS, DOCENTE, OCUPACION, CRUCE, CONSULTA];
