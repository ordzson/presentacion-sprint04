// Fuente: código real de src/Horarios.Scheduler (MotorHorario, OcupacionHorario,
// ReglasDuras, ExpansorSesiones, EvaluadorRestriccionesBlandas, CostoBlandoIncremental,
// VerificadorHorario) y src/Horarios.Contratos/Motor/ContratoMotor.cs.
//
// El caso de ejemplo está reducido a un solo día para que quepa en pantalla, pero los
// pasos, las llamadas y la aritmética del puntaje son los que produce ese código.

export type PiezaId =
  | 'expansor'
  | 'instantanea'
  | 'motor'
  | 'verificador'
  | 'reglas'
  | 'ocupacion'
  | 'catalogo'
  | 'evaluador'
  | 'costo';

export interface Pieza {
  id: PiezaId;
  clase: string;
  archivo: string;
  /** Cómo se le llama en lenguaje llano. */
  rol: string;
  color: string;
  /** Qué le entra. */
  recibe: string;
  /** Qué sale de ella. */
  devuelve: string;
  llano: string;
  detalles: string[];
}

export const PIEZAS: Pieza[] = [
  {
    id: 'expansor',
    clase: 'ExpansorSesiones',
    archivo: 'Horarios.Scheduler/ExpansorSesiones.cs',
    rol: 'Cuántas clases hay que colocar',
    color: '#b5791b',
    recibe: 'Guid planId + RequisitoCursoMotor[]',
    devuelve: 'SesionRequeridaMotor[]',
    llano:
      'Convierte «este curso lleva 3 sesiones por semana» en tres sesiones concretas, cada una con su propio identificador.',
    detalles: [
      'El identificador sale de plan + grupo + número, así que es el mismo en cada regeneración: el plan reescribe sus propias filas en vez de duplicarlas.',
      'Los cursos de un área común se juntan en una sola sesión, porque se dictan a la vez y exigen un docente autorizado en todos ellos.',
      'Suma los alumnos de todas las cohortes del grupo: ese número es el que después le exige capacidad al aula.',
    ],
  },
  {
    id: 'instantanea',
    clase: 'InstantaneaMotor',
    archivo: 'Horarios.Contratos/Motor/ContratoMotor.cs',
    rol: 'La fotografía congelada',
    color: '#5c7a99',
    recibe: 'Docentes, aulas, cohortes, bloques, sesiones, ponderaciones y topes',
    devuelve: 'Se pasa entera a MotorHorario.Ejecutar',
    llano:
      'Todo lo que el motor va a mirar cabe en este único objeto. Al construirse copia las listas a arreglos inmutables.',
    detalles: [
      'Si alguien edita un docente mientras la generación corre, la generación no cambia: trabaja con la copia que tomó al inicio.',
      'Trae también los topes de la fase de mejora: 100 pasadas y 15 segundos por defecto.',
      'Es el único tipo que el motor necesita conocer, y por eso el motor se puede probar entero sin base de datos.',
    ],
  },
  {
    id: 'motor',
    clase: 'MotorHorario',
    archivo: 'Horarios.Scheduler/MotorHorario.cs',
    rol: 'El que coloca',
    color: '#2a9468',
    recibe: 'InstantaneaMotor + CancellationToken',
    devuelve:
      'ResultadoMotor(SesionesAsignadas, SesionesPendientes, Diagnosticos, PuntajeInicial, PuntajeFinal)',
    llano:
      'Trabaja en dos fases: primero coloca todas las sesiones empezando por la más difícil, después mejora lo colocado sin romper nada.',
    detalles: [
      'Fase 1, construcción: ordena las sesiones por «más restringido primero» y toma la primera combinación legal de cada una.',
      'Fase 2, mejora: solo arranca si la construcción no dejó ninguna sesión pendiente.',
      'Comprueba la cancelación dentro del bucle de candidatos, así que el tope de tiempo lo detiene de verdad.',
      'Nunca devuelve un horario a medias: lo que no pudo colocar sale como pendiente, con el motivo escrito.',
    ],
  },
  {
    id: 'verificador',
    clase: 'VerificadorHorario',
    archivo: 'Horarios.Scheduler/VerificadorHorario.cs',
    rol: 'El segundo par de ojos',
    color: '#c0522d',
    recibe: 'InstantaneaMotor + ResultadoMotor',
    devuelve: 'ResultadoVerificacion(Violaciones, EsValido)',
    llano:
      'Revisa el horario terminado como si no supiera quién lo hizo. Una sola violación dura y el resultado no vale.',
    detalles: [
      'Veinte códigos de violación: COLISION_DOCENTE, CAPACIDAD_AULA_INSUFICIENTE, BLOQUE_FUERA_DE_JORNADA, CONTINUIDAD_DOCENTE, CARGA_DOCENTE_EXCEDIDA…',
      'Comparte ReglasDuras con el motor, así que no puede rechazar un horario por un criterio que el motor no conocía.',
      'También reclama las sesiones que no aparecen ni asignadas ni pendientes: nada puede desaparecer en el camino.',
    ],
  },
  {
    id: 'catalogo',
    clase: 'CatalogoCandidatos',
    archivo: 'Horarios.Scheduler/MotorHorario.cs',
    rol: 'Las opciones de cada sesión',
    color: '#3f6fd6',
    recibe: 'InstantaneaMotor + OcupacionHorario',
    devuelve: 'Candidatos(Docentes, Aulas, Bloques) y su número de Combinaciones',
    llano:
      'Antes de colocar nada resuelve, de una vez, qué docentes, qué aulas y qué bloques puede usar cada sesión.',
    detalles: [
      'Las sesiones equivalentes comparten la misma lista: las dos sesiones semanales de un curso se filtran una sola vez, no una por bloque.',
      'Combinaciones = docentes × aulas × bloques. Ese número es el que decide el orden de colocación.',
      'Docentes ordenados por prioridad, aulas por capacidad de menor a mayor, bloques por día y hora.',
    ],
  },
  {
    id: 'reglas',
    clase: 'ReglasDuras',
    archivo: 'Horarios.Scheduler/ReglasDuras.cs',
    rol: 'Qué es legal',
    color: '#8b52d9',
    recibe: 'Un docente o un aula, más la sesión',
    devuelve: 'bool',
    llano:
      'La única definición de lo que se puede y lo que no. La usan el motor para elegir, el reparador para proponer y el verificador para aceptar.',
    detalles: [
      'Cuando cada uno llevaba su propia copia se desincronizaron: el verificador rechazaba horarios que el motor daba por buenos.',
      'Aquí viven docente autorizado, capacidad del aula, recursos, tipo de aula y tipo de laboratorio.',
      'ClaveCurso define la unidad que debe conservar el mismo docente y la que cuenta para su carga: curso + cohortes.',
    ],
  },
  {
    id: 'ocupacion',
    clase: 'OcupacionHorario',
    archivo: 'Horarios.Scheduler/OcupacionHorario.cs',
    rol: 'Quién está ocupado y cuándo',
    color: '#1f8a8a',
    recibe: '(docenteId | aulaId | cohorteId, bloque, duración)',
    devuelve: 'bool — y Ocupar / Liberar marcan o borran esas casillas',
    llano:
      'Un tablero de casillas por docente, por aula y por cohorte. Responde «¿está libre?» sin recorrer las sesiones ya colocadas.',
    detalles: [
      'Cada par (día, período) es una posición fija de un arreglo; la semana entera son 7 días × períodos por día.',
      'Preguntar si un candidato cabe cuesta lo mismo con 4 sesiones que con 4 000.',
      'Una sesión de dos períodos exige las dos casillas libres, no solo la primera.',
      'CabeEnLaJornada impide que una sesión cruce el receso: esos períodos no existen dentro de la instantánea.',
    ],
  },
  {
    id: 'evaluador',
    clase: 'EvaluadorRestriccionesBlandas',
    archivo: 'Horarios.Scheduler/EvaluadorRestriccionesBlandas.cs',
    rol: 'Qué tan cómodo es el horario',
    color: '#a3527d',
    recibe: 'InstantaneaMotor + las asignaciones',
    devuelve: 'EvaluacionRestriccionesBlandas(Penalizaciones, ViolacionesConsecutividad, VentanasMuertas…)',
    llano:
      'Le pone un número al horario. Ya no discute si es legal —eso está resuelto—, sino cuánto molesta.',
    detalles: [
      'Cinco penalizaciones con peso: consecutividad 10, ventanas 8, ventanas al final 3, desplazamiento 2, balance de carga 5.',
      'Se usa dos veces, antes y después de la mejora, y las dos cifras quedan guardadas en la bitácora de la generación.',
      'Solo puntúa lo que la instantánea reconoce por completo, la misma condición que aplica el cálculo incremental.',
    ],
  },
  {
    id: 'costo',
    clase: 'CostoBlandoIncremental',
    archivo: 'Horarios.Scheduler/CostoBlandoIncremental.cs',
    rol: 'El mismo número, pero rápido',
    color: '#6b6153',
    recibe: 'Mover(sesionId, docenteId, aulaId, bloqueId)',
    devuelve: 'Total — el puntaje ya actualizado',
    llano:
      'Da exactamente el mismo total que el evaluador, pero recalculando solo los grupos que el movimiento tocó.',
    detalles: [
      'La fase de mejora prueba cientos de miles de candidatos; volver a puntuar el horario completo en cada uno era inviable.',
      'Cada sesión, bloque, aula, docente y cohorte recibe una posición densa: a partir de ahí todo es aritmética sobre arreglos y buffers reutilizados.',
      'Su total debe coincidir siempre con el del evaluador: descartan las mismas asignaciones y agrupan igual. '
        + 'Hoy esa igualdad se sostiene por construcción, no por una prueba automática.',
    ],
  },
];

export const PIEZAS_POR_ID: Record<PiezaId, Pieza> = Object.fromEntries(
  PIEZAS.map((p) => [p.id, p]),
) as Record<PiezaId, Pieza>;

/** Piezas que forman la cadena principal, de arriba hacia abajo. */
export const CADENA: PiezaId[] = ['expansor', 'instantanea', 'motor', 'verificador'];

/** Piezas que el motor consulta mientras trabaja. */
export const HERRAMIENTAS: PiezaId[] = ['catalogo', 'reglas', 'ocupacion', 'evaluador', 'costo'];

/* ══════════════════════════════════════════════════ el caso de ejemplo */

export interface FichaEntrada {
  titulo: string;
  filas: { nombre: string; detalle: string }[];
}

export const ENTRADA: FichaEntrada[] = [
  {
    titulo: 'Jornada y grupos',
    filas: [
      { nombre: 'Lunes · 4 períodos de 45 min', detalle: '4 BloqueMotor: 07:00, 07:45, 08:30, 09:15' },
      { nombre: 'Cohorte 1A', detalle: '30 alumnos' },
      { nombre: 'Cohorte 1B', detalle: '28 alumnos' },
    ],
  },
  {
    titulo: 'Docentes',
    filas: [
      { nombre: 'Ana', detalle: 'autorizada en Programación I · tope 2 cursos · disponible Lun·1 y Lun·4' },
      { nombre: 'Luis', detalle: 'autorizado en Matemática I · tope 3 cursos · disponible todo el lunes' },
    ],
  },
  {
    titulo: 'Aulas',
    filas: [
      { nombre: 'LAB-1', detalle: 'laboratorio · 32 asientos · piso 3' },
      { nombre: 'A-102', detalle: 'teórica · 35 asientos · piso 1' },
      { nombre: 'A-101', detalle: 'teórica · 40 asientos · piso 1' },
    ],
  },
  {
    titulo: 'Lo que hay que dictar',
    filas: [
      { nombre: 'Programación I → 1A', detalle: '2 sesiones por semana · exige laboratorio' },
      { nombre: 'Matemática I → 1A', detalle: '1 sesión por semana' },
      { nombre: 'Matemática I → 1B', detalle: '1 sesión por semana' },
    ],
  },
];

export interface Celda {
  curso: string;
  docente: string;
  aula: string;
  /** Marca la casilla que cambió en este paso. */
  cambio?: boolean;
}

/** Dos cohortes × los cuatro períodos del lunes. */
export type Grilla = (Celda | null)[][];

export const COHORTES_GRILLA = ['Cohorte 1A', 'Cohorte 1B'];
export const PERIODOS_GRILLA = ['Lun · 1', 'Lun · 2', 'Lun · 3', 'Lun · 4'];
export const HORAS_GRILLA = ['07:00', '07:45', '08:30', '09:15'];

const prog: Celda = { curso: 'Programación I', docente: 'Ana', aula: 'LAB-1' };
const matLab: Celda = { curso: 'Matemática I', docente: 'Luis', aula: 'LAB-1' };
const matAula: Celda = { curso: 'Matemática I', docente: 'Luis', aula: 'A-102' };

function grilla(celdas: [number, number, Celda][]): Grilla {
  const salida: Grilla = [
    [null, null, null, null],
    [null, null, null, null],
  ];
  for (const [fila, columna, celda] of celdas) salida[fila][columna] = celda;
  return salida;
}

const G0 = grilla([]);
const G5 = grilla([[0, 0, { ...prog, cambio: true }]]);
const G6 = grilla([
  [0, 0, prog],
  [0, 3, { ...prog, cambio: true }],
]);
const G7 = grilla([
  [0, 0, prog],
  [0, 1, { ...matLab, cambio: true }],
  [0, 3, prog],
]);
const G8 = grilla([
  [0, 0, prog],
  [0, 1, matLab],
  [0, 3, prog],
  [1, 0, { ...matAula, cambio: true }],
]);
const G9 = grilla([
  [0, 0, prog],
  [0, 1, matLab],
  [0, 3, prog],
  [1, 0, matAula],
]);
const G10 = grilla([
  [0, 0, prog],
  [0, 1, { ...matAula, cambio: true }],
  [0, 3, prog],
  [1, 0, matAula],
]);
const G11 = grilla([
  [0, 0, prog],
  [0, 1, matAula],
  [0, 3, prog],
  [1, 0, matAula],
]);

export interface PasoMotor {
  n: number;
  pieza: PiezaId;
  titulo: string;
  /** La llamada que se hace, con sus argumentos. */
  envia: string;
  /** Lo que esa llamada devuelve. */
  devuelve: string;
  llano: string;
  nota?: string;
  grilla?: Grilla;
}

export const PASOS: PasoMotor[] = [
  {
    n: 1,
    pieza: 'expansor',
    titulo: 'Los requisitos se vuelven sesiones',
    envia: 'ExpansorSesiones.Expandir(planId, RequisitoCursoMotor[3])',
    devuelve:
      'SesionRequeridaMotor[4] → S1 y S2 (Programación I · 1A), S3 (Matemática I · 1A), S4 (Matemática I · 1B)',
    llano:
      'El pensum dice «2 sesiones por semana»; el motor necesita dos cosas que colocar. Cada sesión nace con un identificador derivado del plan, del grupo y del número de sesión, no con uno al azar.',
    nota: 'Por eso volver a generar el mismo plan reescribe sus propias filas en vez de acumular horarios repetidos.',
    grilla: G0,
  },
  {
    n: 2,
    pieza: 'ocupacion',
    titulo: 'Se arma el tablero de casillas',
    envia: 'new OcupacionHorario(instantanea)',
    devuelve:
      'Cuatro mapas de casillas: docente ocupado, aula ocupada, cohorte ocupada y docente disponible',
    llano:
      'Cada par (día, período) pasa a ser una posición fija de un arreglo. La disponibilidad declarada por cada docente se marca de antemano: en las casillas de Ana solo quedan encendidas Lun·1 y Lun·4.',
    nota: 'A partir de aquí, «¿el aula está libre a esa hora?» se responde mirando una casilla, no recorriendo las sesiones ya colocadas.',
    grilla: G0,
  },
  {
    n: 3,
    pieza: 'catalogo',
    titulo: 'Cada sesión averigua sus opciones',
    envia: 'new CatalogoCandidatos(instantanea, ocupacion) → pregunta a ReglasDuras por cada docente y cada aula',
    devuelve:
      'Programación I: 1 docente × 1 aula × 4 bloques = 4 · Matemática I·1A: 1 × 3 × 4 = 12 · Matemática I·1B: 1 × 3 × 4 = 12',
    llano:
      'Programación I exige laboratorio, así que de las tres aulas solo sobrevive LAB-1, y solo Ana está autorizada en ese curso: apenas 4 combinaciones. Matemática I cabe en las tres aulas, así que tiene 12.',
    nota: 'El filtro se hace una sola vez por perfil: S1 y S2 son el mismo curso para la misma cohorte y comparten la lista.',
    grilla: G0,
  },
  {
    n: 4,
    pieza: 'motor',
    titulo: 'Se coloca primero lo más difícil',
    envia: 'OrdenarMasRestringidaPrimero(instantanea, catalogo)',
    devuelve: 'S1, S2 (4 combinaciones) → S3 (12, con 30 alumnos) → S4 (12, con 28 alumnos)',
    llano:
      'Menos salidas, más urgencia. Si dos sesiones empatan en combinaciones, pasa antes la que junta más cohortes, luego la que exige más recursos y luego la que tiene más alumnos.',
    nota: 'Dejar lo difícil para el final es exactamente lo que produce sesiones que ya no caben en ningún lado.',
    grilla: G0,
  },
  {
    n: 5,
    pieza: 'motor',
    titulo: 'S1 · la primera combinación que pasa se toma',
    envia:
      'Buscar(S1, …) recorre bloque → docente → aula preguntando CohortesLibres, DocenteDisponible, DocenteLibre y AulaLibre',
    devuelve: 'SesionAsignadaMotor(S1, Ana, LAB-1, Lun·1)',
    llano:
      'En Lun·1 la cohorte 1A está libre, Ana está disponible y libre, y LAB-1 está libre. Las cuatro preguntas dan sí, y ahí se queda: no se buscan más opciones ni se comparan entre ellas.',
    nota: 'Después ocupacion.Ocupar(...) enciende esas casillas y se anota docentePorCurso["ProgI·1A"] = Ana.',
    grilla: G5,
  },
  {
    n: 6,
    pieza: 'motor',
    titulo: 'S2 · el curso ya tiene docente',
    envia: 'Buscar(S2, …) con docentePorCurso["ProgI·1A"] ya fijado en Ana',
    devuelve: 'SesionAsignadaMotor(S2, Ana, LAB-1, Lun·4)',
    llano:
      'Como el curso ya tiene quien lo dicte, el resto de docentes queda descartado de entrada: un curso lo lleva una sola persona toda la semana. Lun·1 lo ocupa la propia cohorte, y en Lun·2 y Lun·3 Ana no está disponible. Queda Lun·4.',
    grilla: G6,
  },
  {
    n: 7,
    pieza: 'motor',
    titulo: 'S3 · el aula más pequeña que sirve',
    envia: 'Buscar(S3, …) con las aulas ordenadas por capacidad de menor a mayor',
    devuelve: 'SesionAsignadaMotor(S3, Luis, LAB-1, Lun·2)',
    llano:
      'Lun·1 lo tiene ocupado 1A. En Lun·2 las tres aulas sirven, y se prueba primero la más pequeña: LAB-1, con 32 asientos, se lleva la clase antes que A-102 o A-101. Es a propósito, para no gastar las aulas grandes en grupos chicos.',
    grilla: G7,
  },
  {
    n: 8,
    pieza: 'motor',
    titulo: 'S4 · el laboratorio ya está tomado',
    envia: 'Buscar(S4, …) — LAB-1 está ocupada en Lun·1, se pasa a la siguiente aula',
    devuelve: 'SesionAsignadaMotor(S4, Luis, A-102, Lun·1)',
    llano:
      'La cohorte 1B sí está libre en Lun·1 y Luis también, pero LAB-1 la está usando Programación I. Se baja a la siguiente aula por capacidad, A-102. La construcción termina con las cuatro sesiones colocadas y ninguna pendiente.',
    nota: 'Si aquí no hubiera quedado ninguna combinación, la sesión saldría como SesionPendienteMotor con el motivo exacto, y no habría fase de mejora.',
    grilla: G8,
  },
  {
    n: 9,
    pieza: 'evaluador',
    titulo: 'El horario es legal; ahora se mide si es cómodo',
    envia: 'EvaluadorRestriccionesBlandas.Evaluar(instantanea, 4 asignaciones)',
    devuelve:
      'Ventanas 1 × 8 = 8 · Ventanas al final 1 × 3 = 3 · Desplazamiento 4 × 2 = 8 · Balance de carga 0,17 × 5 = 0,83 → Total 19,83',
    llano:
      'Lo que más pesa es el desplazamiento: Luis da Lun·1 en A-102, que está en el piso 1, y Lun·2 en LAB-1, que está en el piso 3. Son dos clases pegadas con dos pisos en medio, y cada piso cuenta doble.',
    nota: 'Esta medición solo ocurre porque no quedó ninguna sesión pendiente. Un horario incompleto no se optimiza: se reporta.',
    grilla: G9,
  },
  {
    n: 10,
    pieza: 'costo',
    titulo: 'La mejora: misma hora, otra aula',
    envia:
      'Se libera S3, se prueban sus huecos con costo.Mover(S3, Luis, A-102, Lun·2) y se compara costo.Total',
    devuelve: 'SesionAsignadaMotor(S3, Luis, A-102, Lun·2) → Total 11,83',
    llano:
      'Se saca una sesión del tablero, se prueban sus huecos y se acepta el primero que baje el total; si ninguno baja, el movimiento se deshace y la sesión vuelve a su sitio. S3 pasa de LAB-1 a A-102 sin cambiar de hora, y Luis deja de cruzar dos pisos entre clase y clase.',
    nota: 'El docente nunca cambia en esta fase: cambiarlo rompería la continuidad del curso, que es una regla dura. Se repite hasta 100 pasadas o hasta agotar 15 segundos, y se corta en cuanto una pasada entera no mejora nada.',
    grilla: G10,
  },
  {
    n: 11,
    pieza: 'motor',
    titulo: 'El motor devuelve su propuesta',
    envia: 'MotorHorario.Ejecutar(instantanea) termina',
    devuelve:
      'ResultadoMotor(SesionesAsignadas: 4, SesionesPendientes: 0, Diagnosticos: 2, PuntajeInicial: 19,83, PuntajeFinal: 11,83)',
    llano:
      'Los diagnósticos son el rastro legible de lo que pasó: HORARIO_FACTIBLE y MEJORA_RESTRICCIONES_BLANDAS con el puntaje antes y después, los movimientos hechos y el tiempo gastado.',
    nota: 'Quedan 11,83 puntos y no es un error: 1A tiene un hueco en Lun·3 porque Ana solo puede a primera y a última hora. Ese hueco no se arregla moviendo aulas — haría falta otro docente, y cambiar de docente está prohibido.',
    grilla: G11,
  },
  {
    n: 12,
    pieza: 'verificador',
    titulo: 'Alguien más revisa el resultado',
    envia: 'VerificadorHorario.Verificar(instantanea, resultado)',
    devuelve: 'ResultadoVerificacion(Violaciones: 0, EsValido: true)',
    llano:
      'El verificador recorre el horario terminado sin confiar en lo que dijo el motor: colisiones, capacidad, recursos, disponibilidad, continuidad y carga, todo de nuevo. Con EsValido en verdadero la generación se cierra como Completada y el plan queda en Generado.',
    nota: 'Una sola violación dura lo dejaría en Inviable, con el detalle de qué sesión y por qué.',
    grilla: G11,
  },
];

/* ══════════════════════════════════════════════════ reglas */

export interface ReglaDura {
  llamada: string;
  texto: string;
}

export const REGLAS_DURAS: ReglaDura[] = [
  {
    llamada: 'ReglasDuras.DocenteAutorizado',
    texto:
      'El docente tiene que estar autorizado en el curso. Si la sesión junta varios cursos de un área común, en todos ellos.',
  },
  {
    llamada: 'ReglasDuras.CapacidadSuficiente',
    texto: 'El aula tiene que caber a todos los alumnos que la sesión reúne.',
  },
  {
    llamada: 'ReglasDuras.TieneLosRecursos',
    texto: 'El aula tiene que tener los recursos que el curso pide, sin importar mayúsculas ni tildes.',
  },
  {
    llamada: 'ReglasDuras.TipoDeAulaCompatible · LaboratorioCompatible',
    texto: 'Si la sesión exige laboratorio, el aula debe serlo, y del tipo de laboratorio pedido.',
  },
  {
    llamada: 'OcupacionHorario.CohortesLibres',
    texto: 'Un grupo no puede estar en dos clases a la misma hora.',
  },
  {
    llamada: 'OcupacionHorario.DocenteLibre',
    texto: 'Un docente no puede estar en dos clases a la misma hora.',
  },
  {
    llamada: 'OcupacionHorario.AulaLibre',
    texto: 'Un aula no puede tener dos clases a la misma hora.',
  },
  {
    llamada: 'OcupacionHorario.DocenteDisponible',
    texto:
      'La hora tiene que caer dentro de lo que el docente declaró, y en todos los períodos que dura la sesión, no solo en el primero.',
  },
  {
    llamada: 'OcupacionHorario.CabeEnLaJornada',
    texto:
      'La sesión tiene que caber entera dentro de la jornada de su cohorte, sin cruzar el receso.',
  },
  {
    llamada: 'docentePorCurso (continuidad)',
    texto: 'Un curso lo dicta el mismo docente todas las semanas, no uno distinto cada vez.',
  },
  {
    llamada: 'CargaMaximaAlcanzada',
    texto: 'Ningún docente pasa del tope de cursos que tiene registrado.',
  },
];

export interface ReglaBlanda {
  nombre: string;
  peso: string;
  texto: string;
}

export const REGLAS_BLANDAS: ReglaBlanda[] = [
  {
    nombre: 'Consecutividad',
    peso: '10',
    texto: 'Las sesiones de un curso que pide continuidad deberían quedar pegadas, el mismo día.',
  },
  {
    nombre: 'Ventanas',
    peso: '8',
    texto: 'Horas muertas en medio de la jornada de un grupo, entre su primera y su última clase.',
  },
  {
    nombre: 'Ventanas al final',
    peso: '3',
    texto: 'Jornadas que se estiran mucho más allá de las clases que el grupo realmente tiene.',
  },
  {
    nombre: 'Desplazamiento',
    peso: '2',
    texto:
      'Lo que un docente recorre entre dos clases seguidas. Cada piso de diferencia cuenta doble; el largo y el ancho, sencillo.',
  },
  {
    nombre: 'Balance de carga',
    peso: '5',
    texto:
      'Distancia entre el docente más cargado y el menos cargado, medida contra el tope de cada uno.',
  },
];

export const DIAGNOSTICOS: string[] = [
  'No existe un docente autorizado para todos los cursos de la sesión.',
  'No existe un aula con capacidad y recursos suficientes.',
  'No existe un bloque válido dentro de la jornada de la cohorte.',
  'Ningún docente autorizado tiene disponibilidad confirmada en la jornada requerida.',
  'El docente que debe conservar la continuidad del curso no tiene un bloque libre.',
  'Todos los docentes autorizados alcanzaron su carga máxima de cursos.',
  'Las combinaciones compatibles colisionan con docente, aula o cohorte ya ocupados.',
];
