// Fuente: código real del repositorio Horarios-develop (rama integration/E0-05-P5),
// leído el 2026-08-30:
//
//   src/Horarios.Motor/            14 archivos, 2 547 líneas — el motor v2
//   src/Horarios.Aplicacion/Motor/  4 archivos — casos de uso y puertos
//   src/Horarios.Infraestructura/Motor/PreparadorInstantaneaMotorPostgres.cs — las 7 consultas
//   src/Horarios.Infraestructura/Planes/DatosGeneracionesPostgres.cs — las 4 RPC
//   src/Horarios.Contratos/Motor/ContratoMotor.cs — los tipos que viajan
//   src/Horarios.Blazor/{Program.cs, ColaGeneracionesEnMemoria.cs, TrabajosPesados.cs}
//
// La especificación que gobierna el código es docs/motor-v2-fase1.md del mismo
// repositorio: 43 reglas (D-01…D-35 duras, del SQL; P-01…P-08 del proyecto).
// Los códigos D-nn y P-nn de este archivo son los suyos, no inventados aquí.
//
// El motor v1 (Horarios.Scheduler) ya no existe: el proyecto está vacío. Nada de
// lo que dice este archivo describe aquel motor.
//
// Estado verificado el 2026-08-30: 137 pruebas de Horarios.Motor.Tests en verde.

/** Los tres tiempos del recorrido; el corte entre ellos es lo que más confunde. */
export type FaseId = 'peticion' | 'fondo' | 'lectura';

export interface Fase {
  id: FaseId;
  titulo: string;
  /** Qué caracteriza a este tramo y por qué está separado del anterior. */
  explicacion: string;
  /** Qué hilo lo ejecuta. */
  hilo: HiloId;
  /** La acción concreta que lo pone en marcha. */
  disparo: string;
  /** Cómo se sabe que terminó, con el número que lo acota. */
  fin: string;
  color: string;
}

export const FASES: Fase[] = [
  {
    id: 'peticion',
    titulo: 'La petición web · el usuario espera',
    explicacion:
      'Todo esto ocurre mientras la persona mira la pantalla, así que tiene que ser corto. Se valida, se saca la foto de los datos, se abre el expediente y se encola el trabajo. No se coloca ni una sola clase todavía.',
    hilo: 'web',
    disparo: 'El clic en «Generar» de Planes.razor, en un plan en borrador.',
    fin: 'Cuando cola.Encolar devuelve. La respuesta llega a la pantalla sin horario dentro.',
    color: '#3f6fd6',
  },
  {
    id: 'fondo',
    titulo: 'El segundo plano · el motor trabaja solo',
    explicacion:
      'La petición web ya respondió. Un servicio de fondo saca el trabajo de la cola, abre su propio ámbito de dependencias y ejecuta el motor con un límite de tiempo. Aquí es donde se decide el horario entero.',
    hilo: 'fondo',
    disparo:
      'cola.Encolar(«generacion:{plan:N}») en la etapa 7. El consumidor lo recoge en 250 ms como mucho, porque es lo que duerme cuando la cola está vacía.',
    fin: 'Cuando finalizar_generacion cierra el expediente, o cuando CancelAfter vence a los 300 s (Motor:TiempoMaximoSegundos).',
    color: '#b5791b',
  },
  {
    id: 'lectura',
    titulo: 'La lectura · lo que se pinta después',
    explicacion:
      'El horario ya está guardado. La pantalla, que llevaba todo este rato sondeando el estado del plan, lo lee por una ruta distinta: otra RPC, otro DTO, ninguna clase del motor.',
    hilo: 'web',
    disparo: 'El sondeo ve que el plan dejó de estar en Generando y para; la pantalla pide el horario.',
    fin: 'Cuando llega el HorarioGeneradoDto, paginado de 500 en 500.',
    color: '#2a9468',
  },
];

/** Un dato que entra o sale de una etapa: el tipo exacto y qué lleva dentro. */
export interface Dato {
  /** Tipo tal como está escrito en el código. */
  tipo: string;
  /** Qué lleva dentro, en lenguaje llano. */
  que: string;
}

export interface Etapa {
  id: string;
  n: number;
  fase: FaseId;
  /** Clase o archivo, tal como se llama en la solución. */
  clase: string;
  proyecto: string;
  archivo: string;
  /** Qué hace, en tres palabras. */
  titulo: string;
  /** Una frase para quien no programa. */
  analogia: string;
  /** Quién la invoca. */
  llamadoPor: string;
  entra: Dato[];
  hace: string[];
  sale: Dato[];
  /** A quién le devuelve lo que produce. */
  devuelveA: string;
  /** Qué pasa cuando no puede seguir. */
  siFalla?: string;
  /** Reglas de la especificación que se resuelven aquí. */
  reglas?: string[];
  /** Advertencia de lectura: lo que la etapa NO hace, y suele darse por hecho. */
  noHace?: string;
}

export const ETAPAS: Etapa[] = [
  {
    id: 'pantalla',
    n: 1,
    fase: 'peticion',
    clase: 'Planes.razor',
    proyecto: 'Horarios.Blazor',
    archivo: 'Components/Pages/Planes.razor',
    titulo: 'Alguien pulsa «Generar»',
    analogia:
      'El mostrador. Toma la solicitud, la pasa y se queda mirando el número del turno hasta que cambia.',
    llamadoPor: 'Una persona con el permiso Motor/generar, en un plan que está en borrador.',
    entra: [{ tipo: 'Guid planId', que: 'El plan de horario que se está mirando; nada más.' }],
    hace: [
      'Inyecta tres casos de uso y no llama a nada más: GenerarHorarioPlan, ListarGeneracionesPlan y ConsultarHorarioGenerado.',
      'Llama a GenerarHorario.EjecutarAsync(planId) y recibe la fila de la generación recién abierta.',
      'Arranca un seguimiento: mientras el plan siga en «Generando», vuelve a preguntar cada pocos segundos y muestra «Generando el horario…».',
      'El seguimiento se cancela al salir de la página y se retoma al volver, para que un plan no quede congelado en «Generando».',
    ],
    sale: [
      {
        tipo: 'GeneracionHorarioDto',
        que: 'La fila del intento: id, estado, cuándo empezó, versión del motor.',
      },
    ],
    devuelveA: 'La propia pantalla, que a partir de ahí solo sondea.',
    noHace:
      'No espera al horario. Cuando esta llamada devuelve, no hay ni una clase colocada todavía.',
  },
  {
    id: 'generar',
    n: 2,
    fase: 'peticion',
    clase: 'GenerarHorarioPlan',
    proyecto: 'Horarios.Aplicacion',
    archivo: 'Motor/GenerarHorarioPlan.cs',
    titulo: 'El portero: valida, abre y encola',
    analogia:
      'El funcionario que atiende: comprueba que los papeles estén completos antes de mandar nada al taller.',
    llamadoPor: 'Planes.razor',
    entra: [{ tipo: 'Guid planId', que: 'El plan a generar.' }],
    hace: [
      'Exige sesión iniciada y el permiso Motor/generar, preguntándole a IContextoUsuario.',
      'Carga el plan con IDatosPlanes.ObtenerAsync y exige que su estado sea Borrador.',
      'Corre RevisarDatosPlan: si la revisión dice que faltan datos, devuelve la lista de qué falta y no sigue.',
      'Le pide la foto de los datos a IPreparadorInstantaneaMotor y exige que traiga al menos una sesión.',
      'Abre la generación con IDatosGeneraciones.IniciarAsync, sellándola con la versión del motor: «motor-v2-fase1».',
      'Cambia el plan a Generando y encola la solicitud con IColaGeneraciones.',
    ],
    sale: [
      {
        tipo: 'GeneracionHorarioDto',
        que: 'El expediente abierto, para que la pantalla lo siga.',
      },
      {
        tipo: 'SolicitudGeneracionEncolada',
        que: 'GeneracionId, el plan ya en Generando, la Instantanea entera y quién la pidió.',
      },
    ],
    devuelveA: 'El DTO vuelve a la pantalla; la solicitud entra en la cola.',
    siFalla:
      'UnauthorizedAccessException sin permiso · KeyNotFoundException si el plan no existe · DatosPlanIncompletosException con la lista exacta de datos faltantes · GeneracionPlanEnCursoException si ese plan ya tiene una generación activa.',
    noHace:
      'No conoce Postgres ni el motor. Habla con cuatro interfaces y no sabe qué clase hay detrás de cada una.',
  },
  {
    id: 'cargador',
    n: 3,
    fase: 'peticion',
    clase: 'PreparadorInstantaneaMotorPostgres',
    proyecto: 'Horarios.Infraestructura',
    archivo: 'Motor/PreparadorInstantaneaMotorPostgres.cs',
    titulo: 'La foto de la base de datos',
    analogia:
      'El archivo que baja todos los expedientes de golpe. Después de esto se cierra la puerta: el motor no vuelve a bajar por nada.',
    llamadoPor: 'GenerarHorarioPlan, a través del puerto IPreparadorInstantaneaMotor.',
    entra: [
      {
        tipo: 'PlanHorario',
        que: 'De él salen el período y el alcance: PeriodoId, CarreraIds y JornadaIds. Arreglo vacío significa «sin filtro».',
      },
    ],
    hace: [
      'C-1 · jornadas activas del alcance con sus descansos, crudas: sin bloques ni minutos calculados.',
      'C-2 · cohortes activas del período dentro del alcance, con su matrícula estimada.',
      'C-3 · los requisitos: qué cursa cada cohorte, con su curso visible, bloques semanales, duración, recursos y agrupación de área común.',
      'Membresías de agrupación: para saber si el alcance del plan deja fuera cohortes de un área común (D-15).',
      'C-4 · docentes activos con sus autorizaciones y su disponibilidad confirmada, slot a slot.',
      'C-5 · aulas activas con capacidad, tipo, tipo de laboratorio y recursos con cantidad.',
      'C-6 · equivalencias de curso, resueltas por horarios.cursos_equivalentes.',
      'C-7 · las sesiones que alguien fijó a mano en este plan, con todo lo necesario para reemitirlas.',
      'Encadena el expansor y el reconciliador, y monta la Instantanea.',
    ],
    sale: [
      {
        tipo: 'Instantanea',
        que: 'Plan, alcance, jornadas, docentes, aulas, sesiones ya expandidas, fijadas ya reconciliadas, cohortes válidas, equivalencias y diagnósticos de carga.',
      },
    ],
    devuelveA: 'GenerarHorarioPlan, que la mete en la cola sin mirarla.',
    reglas: ['D-01', 'D-08', 'D-09', 'D-11', 'D-12', 'D-13', 'D-14', 'D-15', 'D-22', 'D-23'],
    siFalla:
      'Diagnostica en vez de lanzar cuando el alcance está vacío: CARGA_SIN_COHORTES si no hay cohortes activas, CARGA_SIN_REQUISITOS si las hay pero su pensum no declara cursos para su semestre.',
    noHace:
      'No emite minutos ni slots: trae las jornadas crudas y deja que la rejilla los derive. Es el único adaptador del proyecto que habla Npgsql y SQL crudo en vez de PostgREST, porque estas consultas cruzan cinco tablas y agregan arreglos por fila.',
  },
  {
    id: 'expansor',
    n: 4,
    fase: 'peticion',
    clase: 'ExpansorAsignaciones',
    proyecto: 'Horarios.Motor',
    archivo: 'Expansion/ExpansorAsignaciones.cs',
    titulo: 'De «qué cursa cada quién» a «qué clases hay que colocar»',
    analogia:
      'El que convierte el plan de estudios en un montón de fichas: una ficha por clase de la semana.',
    llamadoPor: 'El cargador, que lo instancia directamente; no se inyecta.',
    entra: [
      {
        tipo: 'RequisitoCargado[]',
        que: 'Una fila por par cohorte–curso: pensum, semestre, jornada, curso visible, matrícula, bloques semanales, duración, laboratorio, recursos y agrupación.',
      },
    ],
    hace: [
      'Agrupa por clave de asignación —el paquete que un docente toma entero—: AREA:{agrupación} si hay área común, CURSO:{visible}:COHORTE:{cohorte} si no.',
      'Reparte los bloques semanales en sesiones enteras: cantidad = bloques_semanales ÷ duracion_slots, y la división tiene que ser exacta.',
      'Funde en una sola sesión a las cohortes que comparten área común, cada una conservando su propio curso visible.',
      'Del grupo toma el máximo de cada recurso —no la suma: comparten la misma clase— y exige laboratorio si alguna cohorte lo exige.',
      'Da a cada sesión un identificador determinista: UUID v5 derivado de SHA-256 sobre «plan:{plan}:{clave}:{ordinal}».',
    ],
    sale: [
      {
        tipo: 'ImmutableArray<SesionRequerida>',
        que: 'Las clases que hay que colocar, ordenadas por (Asignación, Ordinal).',
      },
    ],
    devuelveA: 'ReconciliadorFijadas.',
    reglas: ['D-10', 'D-24', 'D-25', 'D-26', 'D-31'],
    siFalla:
      'Lanza nombrando a la agrupación culpable si dos requisitos de un mismo grupo discrepan en jornada, duración, cantidad de sesiones, curso de la sesión o tipo de laboratorio. Quedarse con el primero —lo que hacía el motor v1— produce un horario que la base rechaza al guardarlo.',
    noHace:
      'No elige nada. Cuando dos datos se contradicen no arbitra: lanza, porque cualquier arbitraje sería una invención.',
  },
  {
    id: 'reconciliador',
    n: 5,
    fase: 'peticion',
    clase: 'ReconciliadorFijadas',
    proyecto: 'Horarios.Motor',
    archivo: 'Expansion/ReconciliadorFijadas.cs',
    titulo: 'Las clases que alguien ya colocó a mano',
    analogia:
      'El que reconoce, entre las fichas nuevas, las que ya estaban puestas sobre la mesa, y les pone una chincheta para que nadie las mueva.',
    llamadoPor: 'El cargador, justo después del expansor.',
    entra: [
      { tipo: 'SesionRequerida[]', que: 'Las sesiones recién expandidas.' },
      {
        tipo: 'SesionFijada[]',
        que: 'Las de C-7: docente, aula, día y slot ya persistidos, con sus cohortes y su curso visible.',
      },
    ],
    hace: [
      'Cruza unas con otras por (Asignación, Ordinal): las sesiones semanales son intercambiables antes de colocarse, así que el ordinal basta.',
      'Conserva el SesionId persistido y marca EstaFijada, para que el guardado no pierda la marca ni cambie el identificador.',
      'Comprueba que la fijada siga describiendo lo mismo que el pensum pide hoy: curso, jornada, duración, agrupación y cohortes.',
    ],
    sale: [
      {
        tipo: '(Sesiones, Fijadas)',
        que: 'Las mismas sesiones con las fijadas incorporadas, y las fijadas aparte para el colocador.',
      },
    ],
    devuelveA: 'El cargador, que ya puede construir la Instantanea.',
    reglas: ['P-04'],
    siFalla:
      'Lanza si una fijada no tiene requisito, si dos ocupan el mismo ordinal, si a una asignación le sobran fijadas o si una describe algo distinto de lo que el pensum pide hoy. Seguir significaría emitir un horario que contradice lo guardado.',
  },
  {
    id: 'iniciar',
    n: 6,
    fase: 'peticion',
    clase: 'DatosGeneracionesPostgres.IniciarAsync',
    proyecto: 'Horarios.Infraestructura',
    archivo: 'Planes/DatosGeneracionesPostgres.cs',
    titulo: 'Se abre el expediente',
    analogia: 'El sello de entrada: queda constancia de qué se pidió y con qué datos exactos.',
    llamadoPor: 'GenerarHorarioPlan, por el puerto IDatosGeneraciones.',
    entra: [
      { tipo: 'PlanHorario', que: 'Período, tipo de plan y versión de fila.' },
      { tipo: 'Instantanea', que: 'La foto entera, que se guarda como JSON de entrada.' },
      { tipo: 'string versionMotor', que: '«motor-v2-fase1».' },
    ],
    hace: [
      'Llama a la RPC iniciar_generacion pasándole p_instantanea_entrada con la instantánea completa: dos corridas sobre la misma entrada son comparables después.',
      'Usa p_clave_solicitud = «{plan}:v{versión de fila}» como llave de idempotencia.',
    ],
    sale: [{ tipo: 'GeneracionHorarioDto', que: 'La fila creada, en estado «en curso».' }],
    devuelveA: 'GenerarHorarioPlan.',
    siFalla:
      'Si Postgres responde 23505 o menciona generacion_activa, lo traduce a GeneracionPlanEnCursoException: ese plan ya tiene una generación corriendo.',
  },
  {
    id: 'cola',
    n: 7,
    fase: 'peticion',
    clase: 'ColaGeneracionesEnMemoria',
    proyecto: 'Horarios.Blazor',
    archivo: 'ColaGeneracionesEnMemoria.cs',
    titulo: 'Aquí termina la petición web',
    analogia:
      'La bandeja de trabajos pendientes. Se deja el sobre, se cierra la ventanilla y el cliente se va.',
    llamadoPor: 'GenerarHorarioPlan, por el puerto IColaGeneraciones.',
    entra: [
      {
        tipo: 'SolicitudGeneracionEncolada',
        que: 'Todo lo necesario para terminar una generación ya abierta.',
      },
    ],
    hace: [
      'Guarda el token de Supabase del usuario que la pidió, para que las políticas de acceso sigan aplicando cuando el trabajo corra sin él.',
      'Encola en ColaTrabajosPesados —un Channel acotado a 100— bajo el nombre «generacion:{plan}».',
      'Deja escrito que el trabajo abrirá su propio ámbito de dependencias, porque los adaptadores de datos son por petición y esta ya habrá terminado.',
      'Le pone límite de tiempo: Motor:TiempoMaximoSegundos, 300 segundos por defecto.',
    ],
    sale: [{ tipo: 'void', que: 'Nada. La pantalla ya tiene su DTO y sigue sondeando.' }],
    devuelveA: 'Nadie. El hilo de la petición web muere aquí.',
  },
  {
    id: 'procesador',
    n: 8,
    fase: 'fondo',
    clase: 'ProcesadorTrabajosPesados',
    proyecto: 'Horarios.Blazor',
    archivo: 'ProcesadorTrabajosPesados.cs',
    titulo: 'El turno de noche',
    analogia: 'El operario que va vaciando la bandeja, de uno en uno y sin prisa.',
    llamadoPor: 'Nadie: es un BackgroundService que arranca con la aplicación.',
    entra: [{ tipo: 'TrabajoPesado', que: 'Lo que haya en la cola, en orden de llegada.' }],
    hace: [
      'Un solo consumidor a propósito: los trabajos son intensivos en CPU y correr varios a la vez solo se quitarían tiempo entre ellos.',
      'Si no hay nada que hacer espera 250 ms antes de volver a mirar, en lugar de girar en vacío.',
      'Un trabajo que falla no puede tumbar el bucle: registra el error, espera un segundo y sigue.',
    ],
    sale: [
      { tipo: 'Task', que: 'La ejecución del trabajo, con su propio ámbito y su propio límite.' },
    ],
    devuelveA: 'EjecutarGeneracionPlan.',
  },
  {
    id: 'ejecutar',
    n: 9,
    fase: 'fondo',
    clase: 'EjecutarGeneracionPlan',
    proyecto: 'Horarios.Aplicacion',
    archivo: 'Motor/EjecutarGeneracionPlan.cs',
    titulo: 'Cronometra, verifica y decide el estado',
    analogia:
      'El supervisor: no coloca nada, pero mira el reloj, revisa el trabajo terminado y firma con qué resultado se cierra.',
    llamadoPor: 'El trabajo de la cola, dentro de su propio ámbito de dependencias.',
    entra: [
      {
        tipo: 'SolicitudGeneracionEncolada',
        que: 'La generación abierta, el plan y la instantánea que ya viajaba con ella.',
      },
    ],
    hace: [
      'Arranca un Stopwatch y llama a IMotorHorarios.Ejecutar con la instantánea y el token.',
      'Pasa el resultado por IVerificadorHorario.Verificar: una segunda opinión que no comparte estado con el colocador.',
      'Decide: completa = el verificador no encontró violaciones duras Y no quedó ninguna asignación pendiente.',
      'Completa ⇒ generación Completada y plan Generado. Incompleta ⇒ Inviable e Inviable. Cancelada ⇒ Cancelada y Fallido.',
      'Cierra y guarda con CerrarYGuardarHorarioAsync, y después cambia el estado del plan.',
    ],
    sale: [
      { tipo: 'GeneracionHorarioDto', que: 'El expediente cerrado, con duración y contadores.' },
    ],
    devuelveA:
      'El trabajo de la cola, que solo lo registra. Quien lo lee de verdad es la pantalla, releyendo el historial.',
    siFalla:
      'Ante cualquier excepción cierra la generación como Fallida con el mensaje del error y deja el plan en Fallido, y vuelve a lanzar. Un plan nunca se queda colgado en «Generando».',
    noHace:
      'No abre transacciones ni escribe tablas: el horario se guarda dentro de la RPC, que cierra la generación y guarda el resultado en la misma transacción.',
  },
  {
    id: 'motor',
    n: 10,
    fase: 'fondo',
    clase: 'MotorHorarios',
    proyecto: 'Horarios.Motor',
    archivo: 'MotorHorarios.cs',
    titulo: 'La puerta del motor · 37 líneas que no deciden nada',
    analogia:
      'El jefe de taller que solo reparte herramientas: arma la regla del reloj, encarga el estudio previo y le entrega las dos cosas a quien coloca.',
    llamadoPor: 'EjecutarGeneracionPlan, por la interfaz IMotorHorarios.',
    entra: [
      { tipo: 'Instantanea', que: 'La foto inmutable del plan, ya expandida y reconciliada.' },
      { tipo: 'CancellationToken', que: 'El límite de tiempo del trabajo.' },
    ],
    hace: [
      'Construye una RejillaTiempo con las jornadas de la instantánea.',
      'Construye un Precalculo con esa instantánea y esa rejilla.',
      'Se los entrega al ColocadorVoraz y devuelve lo que este produzca.',
    ],
    sale: [
      {
        tipo: 'Resultado',
        que: 'Colocadas, Pendientes con su motivo, Diagnósticos y FueCancelado.',
      },
    ],
    devuelveA: 'EjecutarGeneracionPlan.',
    noHace:
      'Las tres piezas comparten UNA sola rejilla a propósito: dos rejillas distintas numerarían las franjas distinto y los veredictos de solape dejarían de compararse entre el precálculo y la colocación.',
  },
  {
    id: 'rejilla',
    n: 11,
    fase: 'fondo',
    clase: 'RejillaTiempo',
    proyecto: 'Horarios.Motor',
    archivo: 'Tiempo/RejillaTiempo.cs',
    titulo: 'El reloj común de todas las jornadas',
    analogia:
      'La regla graduada. Traduce «bloque 3 de la jornada nocturna» a minutos reales, para que dos jornadas distintas se puedan comparar.',
    llamadoPor:
      'MotorHorarios la construye; la usan el precálculo, los tres registros y el verificador.',
    entra: [
      {
        tipo: 'ImmutableArray<Jornada>',
        que: 'Jornadas crudas: hora de inicio y fin en minutos, duración del bloque, bloques por día, días activos, receso y descansos.',
      },
    ],
    hace: [
      'Calcula los minutos [inicio, fin) de cualquier colocación, desplazándolos si cruza el receso.',
      'Numera todas las fronteras de minuto de todas las jornadas y les da un índice: la franja canónica.',
      'ColocacionesDe(jornada, duración) devuelve, en caché, las colocaciones válidas ordenadas por día y slot.',
    ],
    sale: [
      { tipo: '(int Inicio, int Fin)', que: 'Minutos que ocupa una colocación.' },
      {
        tipo: '(int Desde, int Hasta)',
        que: 'Franjas canónicas: el índice con el que los tres registros comparan solapes.',
      },
      {
        tipo: 'ImmutableArray<Colocacion>',
        que: 'Los pares (día, slot inicial) donde esa duración cabe en esa jornada.',
      },
    ],
    devuelveA: 'Quien pregunte. No guarda ocupación ni conoce sesiones.',
    reglas: ['D-02', 'D-03', 'D-04', 'D-05', 'D-06'],
    noHace:
      'La franja canónica no sale de aquí: no se guarda, no se muestra y no aparece en ningún contrato. Es lo que hace exacto el veredicto cuando dos jornadas se pisan; el motor v1 comparaba índices de slot y daba por libre a un docente que a esa hora estaba dando clase en la otra jornada.',
  },
  {
    id: 'precalculo',
    n: 12,
    fase: 'fondo',
    clase: 'Precalculo',
    proyecto: 'Horarios.Motor',
    archivo: 'Construccion/Precalculo.cs',
    titulo: 'Lo que ya se sabe antes de colocar nada',
    analogia:
      'El estudio previo. Antes de mover una ficha, mira para cada clase qué docentes podrían darla, en qué aulas cabe y a qué horas, y avisa de las que son imposibles.',
    llamadoPor: 'MotorHorarios.',
    entra: [
      { tipo: 'Instantanea', que: 'Sesiones, docentes, aulas y equivalencias.' },
      { tipo: 'RejillaTiempo', que: 'La misma rejilla que usará el colocador.' },
    ],
    hace: [
      'Agrupa las sesiones por clave de asignación y, para cada grupo, calcula cuatro cosas de una vez.',
      'ColocacionesFactibles: las que la rejilla admite para su jornada y duración.',
      'DocentesFactibles: los autorizados para el curso visible de cada participación (D-17) que además tengan disponibilidad confirmada en alguna de esas colocaciones (D-20).',
      'AulasFactibles: las que pasan los cuatro filtros de aula en cascada (D-24, D-25, D-26, D-27).',
      'AplicaP02: si la asignación pide más sesiones que días con colocación factible, la preferencia «una por día» se apaga sola (P-07).',
      'Emite el diagnóstico de cada lista vacía, nombrando la causa exacta y el filtro que la vació.',
      'Avisa aparte de las cohortes que piden más slots semanales de los que su jornada tiene.',
    ],
    sale: [
      {
        tipo: 'ImmutableArray<AsignacionPrecalculada>',
        que: 'Por asignación: sus sesiones, sus tres listas factibles y si P-02 sigue en pie.',
      },
      {
        tipo: 'ImmutableArray<Diagnostico>',
        que: 'SIN_DOCENTE_FACTIBLE · SIN_AULA_FACTIBLE · SIN_COLOCACION_FACTIBLE · P02_RELAJADA · SEMESTRE_NO_CABE, ordenados por código y mensaje.',
      },
    ],
    devuelveA: 'ColocadorVoraz.',
    reglas: ['D-17', 'D-20', 'D-24', 'D-25', 'D-26', 'D-27', 'P-07'],
    noHace:
      'Nada de esto lanza: un curso sin docente autorizado es un problema de los datos, no un defecto del motor. Diagnosticarlo aquí y no dentro del bucle es lo que hace que la causa sea la real y no la que quedó a la vista después de ocupar medio horario.',
  },
  {
    id: 'orden',
    n: 13,
    fase: 'fondo',
    clase: 'OrdenDeTrabajo',
    proyecto: 'Horarios.Motor',
    archivo: 'Construccion/OrdenDeTrabajo.cs',
    titulo: 'En qué orden se prueba todo',
    analogia:
      'La lista de prioridades. No puntúa a nadie: ordena. Lo más difícil primero, y a igualdad, un criterio de desempate tras otro.',
    llamadoPor: 'ColocadorVoraz, cuatro veces: una por asignación, docente, aula y colocación.',
    entra: [
      { tipo: 'AsignacionPrecalculada[]', que: 'Todas las asignaciones del plan.' },
      {
        tipo: 'RegistroCarga',
        que: 'El registro vivo: el orden de docentes cambia según se reparte.',
      },
      { tipo: 'AgendaDeCohortes', que: 'Lo que las cohortes ya tienen tomado.' },
    ],
    hace: [
      'Asignaciones: de la más difícil a la más fácil, donde dificultad = docentes × aulas × colocaciones. Producto y no suma, porque lo que se agota es el producto cartesiano.',
      'Docentes: mayor nivel de prioridad primero y, entre iguales, el que lleve menos carga en proporción a la suya.',
      'Aulas: la más ajustada primero, para no gastar un auditorio de 200 en un grupo de 20.',
      'Colocaciones: primero el día en que las cohortes tienen menos clases, y dentro del día el hueco más pegado a lo que ya tienen.',
    ],
    sale: [
      {
        tipo: 'ImmutableArray<T>',
        que: 'La misma lista, reordenada. Los cuatro órdenes son totales: terminan siempre en un desempate por identidad.',
      },
    ],
    devuelveA: 'ColocadorVoraz.',
    noHace:
      'Esto sustituye al evaluador de restricciones blandas del motor v1. No hay puntajes ni pesos que sumar y comparar, y por eso dos ejecuciones sobre la misma instantánea dan exactamente el mismo horario.',
  },
  {
    id: 'colocador',
    n: 14,
    fase: 'fondo',
    clase: 'ColocadorVoraz',
    proyecto: 'Horarios.Motor',
    archivo: 'Construccion/ColocadorVoraz.cs',
    titulo: 'El corazón: coloca, o dice por qué no pudo',
    analogia:
      'Quien pone las fichas en el tablero. Empieza por la clase con menos alternativas y no vuelve atrás salvo para deshacer un intento entero.',
    llamadoPor: 'MotorHorarios.',
    entra: [
      { tipo: 'Instantanea', que: 'Las sesiones, las fijadas y los catálogos.' },
      { tipo: 'Precalculo', que: 'Las listas factibles de cada asignación.' },
      { tipo: 'RejillaTiempo', que: 'La misma rejilla, obligatoriamente.' },
    ],
    hace: [
      'Primero ocupa las sesiones fijadas a mano, verificándolas con las mismas reglas que el verificador usará después (P-04).',
      'Recorre las asignaciones en el orden de dificultad y, para cada una, prueba sus docentes candidatos uno a uno.',
      'Para cada docente comprueba la carga y luego intenta colocar todas sus sesiones libres; si alguna no cabe, deshace las que ya había puesto y pasa al siguiente docente.',
      'Al colocar una sesión pregunta en orden fijo: cohortes libres, la preferencia del día, disponibilidad del docente, docente libre y por último aula libre.',
      'Cuando una asignación entra completa, deja al docente elegido para siempre y le anota un punto de carga.',
      'Si ninguno pudo, la deja pendiente con el motivo contado durante el recorrido real, no reconstruido después.',
    ],
    sale: [
      {
        tipo: 'Resultado',
        que: 'Colocadas (fijadas incluidas), Pendientes con motivo, Diagnósticos y FueCancelado.',
      },
    ],
    devuelveA: 'MotorHorarios.',
    reglas: ['D-18', 'D-19', 'D-20', 'D-21', 'D-28', 'D-29', 'D-30', 'P-02', 'P-04', 'P-08'],
    siFalla:
      'Lanza solo si dos sesiones fijadas se contradicen entre sí: mover una fijada o degradarla en silencio a pendiente significa tirar el trabajo de una persona sin decírselo. Cancelar no lanza: devuelve lo colocado, el resto pendiente y FueCancelado = true.',
    noHace:
      'No vuelve atrás. El único retroceso es de un nivel —probar el siguiente docente— y la reversión de todo o nada. Ni puntajes, ni mejora local, ni intercambio de pares: es una heurística voraz, y lo es a propósito.',
  },
  {
    id: 'verificador',
    n: 15,
    fase: 'fondo',
    clase: 'VerificadorHorario',
    proyecto: 'Horarios.Motor',
    archivo: 'Verificacion/VerificadorHorario.cs',
    titulo: 'La segunda opinión',
    analogia:
      'El revisor que no estuvo en la sala. Recibe la instantánea y el horario terminado, y los compara sin saber cómo se llegó a él.',
    llamadoPor: 'EjecutarGeneracionPlan, por la interfaz IVerificadorHorario.',
    entra: [
      { tipo: 'Instantanea', que: 'Lo que se pedía.' },
      { tipo: 'Resultado', que: 'Lo que el colocador produjo.' },
    ],
    hace: [
      'Comprueba que cada sesión requerida aparezca exactamente una vez, colocada o pendiente.',
      'Revisa fila a fila: cohortes del alcance, jornada, docente autorizado y disponible, las cuatro reglas de aula y que la colocación quepa en su jornada.',
      'Reconstruye desde la salida las reglas globales: continuidad de docente, área común con un solo docente, carga máxima y los tres tipos de colisión.',
      'Cuenta la cobertura: por cohorte y curso del pensum, cuántos slots pedía y cuántos obtuvo.',
    ],
    sale: [
      {
        tipo: 'ResultadoVerificacion',
        que: 'ViolacionesNivel1 (20 códigos posibles, en orden fijo) y CoberturaNivel2 (COBERTURA_INCOMPLETA).',
      },
    ],
    devuelveA: 'EjecutarGeneracionPlan, que con EsCorrecto decide el estado.',
    reglas: ['D-31', 'D-32'],
    noHace:
      'Solo comparte con el colocador las reglas puras por fila. Todo lo demás lo recalcula desde la salida: si compartiera los registros de ocupación, un error en ellos pasaría desapercibido dos veces.',
  },
  {
    id: 'guardar',
    n: 16,
    fase: 'fondo',
    clase: 'DatosGeneracionesPostgres.CerrarYGuardarHorarioAsync',
    proyecto: 'Horarios.Infraestructura',
    archivo: 'Planes/DatosGeneracionesPostgres.cs',
    titulo: 'Cerrar y guardar, en una sola transacción',
    analogia:
      'El sello de salida. Cierra el expediente y archiva el horario en el mismo movimiento: o entran las dos cosas, o no entra ninguna.',
    llamadoPor: 'EjecutarGeneracionPlan, por el puerto IDatosGeneraciones.',
    entra: [
      { tipo: 'Resultado', que: 'Lo colocado y lo pendiente.' },
      { tipo: 'ResultadoVerificacion', que: 'Las violaciones y la cobertura.' },
      { tipo: 'long duracionMs', que: 'Lo que tardó el motor.' },
    ],
    hace: [
      'Traduce cada sesión colocada al contrato de la base: sesion_id, curso_id de la sesión, docente, aula, jornada, día en minúsculas, slot base 1, duración, agrupación, esta_fijada y el arreglo de cohortes.',
      'Traduce cada asignación pendiente a una fila por participación, con el curso visible de esa cohorte y el motivo.',
      'Traduce cada violación dura a un conflicto con su tipo, descripción y sesiones.',
      'Llama a la RPC finalizar_generacion, que por dentro llama a guardar_resultado_generacion en la misma transacción.',
    ],
    sale: [
      {
        tipo: 'GeneracionHorarioDto',
        que: 'El expediente cerrado, con estado, duración y contadores.',
      },
    ],
    devuelveA: 'EjecutarGeneracionPlan.',
    noHace:
      'El motor no emite minutos ni curso visible: los calcula la base al insertar. Si los emitiera, habría dos fuentes de verdad. En esta fase tampoco hay puntajes: van en nulo.',
  },
  {
    id: 'estado',
    n: 17,
    fase: 'fondo',
    clase: 'IDatosPlanes.GuardarCambioEstadoAsync',
    proyecto: 'Horarios.Aplicacion',
    archivo: 'Motor/EjecutarGeneracionPlan.cs',
    titulo: 'El plan cambia de estado',
    analogia: 'El cartel de la puerta: deja de decir «Generando» y dice en qué quedó.',
    llamadoPor: 'EjecutarGeneracionPlan, después de guardar.',
    entra: [
      { tipo: 'PlanHorario', que: 'Releído antes de tocarlo, con su versión de fila vigente.' },
      { tipo: 'EstadoHorario', que: 'Generado, Inviable o Fallido, con el motivo escrito.' },
    ],
    hace: [
      'Vuelve a leer el plan por si cambió mientras el motor trabajaba, y guarda el cambio con control de versión optimista.',
      'Escribe el motivo: «La generación terminó completa y sin violaciones duras» o «terminó inviable; consulte sus diagnósticos».',
    ],
    sale: [{ tipo: 'PlanHorario', que: 'El plan en su estado nuevo.' }],
    devuelveA: 'Nadie más. La pantalla lo verá en el siguiente sondeo.',
  },
  {
    id: 'consultar',
    n: 18,
    fase: 'lectura',
    clase: 'ConsultarHorarioGenerado',
    proyecto: 'Horarios.Aplicacion',
    archivo: 'Motor/ConsultasGeneraciones.cs',
    titulo: 'Y por fin se pinta',
    analogia:
      'El tablón de anuncios. El horario ya está guardado; esto solo va a buscarlo y lo trae en la forma que la pantalla sabe dibujar.',
    llamadoPor:
      'Planes.razor y Consultas.razor, cuando el sondeo ve que el plan salió de «Generando».',
    entra: [{ tipo: 'Guid planId', que: 'El plan cuyo horario se quiere ver.' }],
    hace: [
      'Llama a IDatosHorarioGenerado, que ejecuta la RPC consultar_revision_horario con paginación de 500.',
      'Junto a él, ListarGeneracionesPlan trae el historial de intentos por listar_generaciones_plan: cuándo se corrió cada uno, cuánto tardó, con qué versión de motor, cuántas pendientes y cuántas violaciones.',
    ],
    sale: [
      {
        tipo: 'HorarioGeneradoDto',
        que: 'Las clases listas para pintar, los conflictos y las sesiones que quedaron sin asignar con su motivo.',
      },
    ],
    devuelveA: 'La pantalla.',
    noHace:
      'Ninguna clase del motor participa en esta lectura. El horario se lee de las tablas, no del Resultado, que ya no existe en memoria.',
  },
];

// ══════════════════════════════════════════ la memoria que el colocador lleva

/**
 * Las seis piezas de estado del colocador y las tres clases de reglas puras.
 * Ninguna aparece como etapa del recorrido porque ninguna se llama una vez:
 * se consultan y se actualizan miles de veces mientras el bucle avanza.
 */
export interface Pieza {
  id: string;
  clase: string;
  archivo: string;
  /** Registro con estado, o regla pura sin él. */
  tipo: 'registro' | 'regla';
  titulo: string;
  /** La pregunta exacta que responde. */
  pregunta: string;
  /** Qué guarda dentro, con la forma real de la estructura. */
  guarda: string;
  /** Cómo lo actualiza el colocador. */
  actualiza: string;
  reglas: string[];
  /** Por qué está así y no de otra manera. */
  porque: string;
}

export const PIEZAS: Pieza[] = [
  {
    id: 'ocupacion',
    clase: 'RegistroOcupacion',
    archivo: 'Ocupacion/RegistroOcupacion.cs',
    tipo: 'registro',
    titulo: 'Qué tiene tomado del reloj cada quien',
    pregunta: '¿Tiene libre esta entidad todos los minutos que ocuparía esta clase?',
    guarda: 'HashSet<(Entidad, Día, Franja)> — la franja la da la rejilla, no el índice de slot.',
    actualiza:
      'Ocupar toma todas las franjas de la colocación; Liberar las devuelve. Liberar es su inverso exacto, y es lo que permite deshacer una asignación entera.',
    reglas: ['D-28', 'D-29', 'D-30'],
    porque:
      'Se instancia tres veces —docentes, aulas y cohortes— en vez de ser un diccionario de diccionarios: la misma clase con tres estados. Lo único que cambia entre las tres es qué identificador recibe, y eso lo decide quien la usa. Ocupar algo ya ocupado lanza: no es un dato malo, es un defecto del motor, y hay que preguntar por Libre antes.',
  },
  {
    id: 'carga',
    clase: 'RegistroCarga',
    archivo: 'Ocupacion/RegistroCarga.cs',
    tipo: 'registro',
    titulo: 'Cuántas asignaciones lleva cada docente',
    pregunta: '¿Le cabe una más, o ya llegó a su carga máxima?',
    guarda: 'Dictionary<DocenteId, ImmutableHashSet<ClaveAsignacion>> — claves, no sesiones.',
    actualiza:
      'Se anota una sola vez por asignación, cuando la asignación entera quedó colocada; nunca por sesión.',
    reglas: ['D-21'],
    porque:
      'La unidad de carga es la clave de asignación, igual que en el SQL: un área común pesa uno aunque la cursen cinco cohortes y se reparta en cuatro sesiones semanales. Contar sesiones —lo que hacía el motor v1— dejaba a un docente fuera de un curso que la base sí le permitía dar.',
  },
  {
    id: 'continuidad',
    clase: 'RegistroContinuidad',
    archivo: 'Ocupacion/RegistroContinuidad.cs',
    tipo: 'registro',
    titulo: 'Qué docente quedó elegido para cada asignación',
    pregunta: '¿Esta asignación ya tiene dueño, o puedo probar con todos sus candidatos?',
    guarda: 'Dictionary<ClaveAsignacion, DocenteId>.',
    actualiza:
      'Se elige una vez y ya no se puede cambiar. Volver a elegir al mismo no hace nada; elegir a otro lanza.',
    reglas: ['D-18', 'D-19'],
    porque:
      'Esto es lo que hace estructurales a D-18 y D-19: no son funciones que se comprueben, son consecuencias de que el colocador elija un docente por asignación. La clave de asignación es exactamente el paquete que las dos reglas protegen, y por eso basta un diccionario y no hacen falta dos registros. Es también por donde entran las fijadas: su docente se elige antes de colocar nada.',
  },
  {
    id: 'agenda',
    clase: 'AgendaDeCohortes',
    archivo: 'Construccion/ColocadorVoraz.cs',
    tipo: 'registro',
    titulo: 'Qué clases ya tiene cada cohorte, y a qué hora',
    pregunta: '¿Cuántas clases tienen ese día, y a qué distancia queda el hueco más cercano?',
    guarda:
      'Dictionary<(Cohorte, Día), ImmutableList<Clase>>, donde cada clase lleva su curso visible y el tramo de slots que ocupa.',
    actualiza:
      'Se anota y se borra a la par de los tres registros de ocupación. Borrar quita una sola de las clases iguales, no todas.',
    reglas: ['P-02'],
    porque:
      'El registro de ocupación responde sí o no sobre franjas, y las dos preferencias del proyecto preguntan otra cosa: cuántas y a qué distancia, en slots. Preguntarlo en slots es exacto porque una cohorte solo tiene sesiones de su propia jornada, así que para ella el índice de slot ya identifica la hora.',
  },
  {
    id: 'reglas-docente',
    clase: 'ReglasDocente',
    archivo: 'Reglas/ReglasDocente.cs',
    tipo: 'regla',
    titulo: 'Autorización y disponibilidad',
    pregunta:
      '¿Está autorizado para el curso visible de cada cohorte de esta sesión? ¿Su disponibilidad confirmada cubre todos los slots?',
    guarda: 'Nada: son dos funciones estáticas sin estado.',
    actualiza:
      'No se actualiza. Se llama desde el precálculo, desde el bucle y desde el verificador, con el mismo resultado siempre.',
    reglas: ['D-17', 'D-20', 'P-01'],
    porque:
      'La autorización se comprueba contra los cursos equivalentes del curso visible, no contra el curso de la sesión: en área común cada cohorte ve un curso distinto. Una autorización sin jornada funciona como comodín.',
  },
  {
    id: 'reglas-aula',
    clase: 'ReglasAula',
    archivo: 'Reglas/ReglasAula.cs',
    tipo: 'regla',
    titulo: 'Los cuatro filtros del aula',
    pregunta:
      '¿Admite laboratorio? ¿Es del tipo exigido? ¿Tiene los recursos en la cantidad pedida? ¿Le caben todos los estudiantes?',
    guarda: 'Nada: cuatro funciones estáticas sin estado.',
    actualiza:
      'No se actualiza. El precálculo las aplica una vez y el verificador las repite al final.',
    reglas: ['D-24', 'D-25', 'D-26', 'D-27'],
    porque:
      'Los cuatro se aplican en cascada y en el mismo orden que el SQL, así que el que vacía la lista es el que hay que arreglar. La capacidad se compara contra la suma de matrículas de todas las participaciones, que en área común son varias cohortes.',
  },
  {
    id: 'reglas-cohorte',
    clase: 'ReglasCohorte',
    archivo: 'Reglas/ReglasCohorte.cs',
    tipo: 'regla',
    titulo: 'Coherencia de la sesión con sus cohortes',
    pregunta:
      '¿Todas sus cohortes son de la jornada de la sesión? ¿Cada pensum resuelve a un solo curso visible? ¿El curso visible es el de la sesión cuando no hay área común?',
    guarda: 'Nada: tres funciones estáticas sin estado.',
    actualiza:
      'No se actualiza. Solo se llama al verificar sesiones fijadas y al verificar el resultado: en las sesiones libres, el expansor ya lo garantizó al construirlas.',
    reglas: ['D-10', 'D-13', 'D-14'],
    porque:
      'Que una cohorte solo tenga sesiones de su propia jornada es lo que hace que todo el manejo del tiempo funcione: para ella, el índice de slot ya identifica la hora.',
  },
];

// ═══════════════════════════════════════════ la cadena de datos, tipo a tipo

/** Un eslabón de la cadena: en qué se convierte el dato y quién lo hace. */
export interface Eslabon {
  id: string;
  tipo: string;
  archivo: string;
  /** De dónde sale este dato. */
  origen: string;
  /** Quién lo produce. */
  producidoPor: string;
  /** Quién lo consume. */
  consumidoPor: string;
  /** Los campos que importan y de dónde sale cada uno. */
  campos: { nombre: string; de: string }[];
  /** Qué se gana o se pierde en este paso. */
  transformacion: string;
}

export const CADENA: Eslabon[] = [
  {
    id: 'requisito',
    tipo: 'RequisitoCargado',
    archivo: 'Contratos/Motor/ContratoMotor.cs',
    origen:
      'La consulta C-3: cohorte_periodos × cohortes × cursos_en_pensum × cursos, con las agrupaciones de área común cruzadas de lado.',
    producidoPor: 'PreparadorInstantaneaMotorPostgres',
    consumidoPor: 'ExpansorAsignaciones',
    campos: [
      { nombre: 'CohorteId, PensumId, Semestre, JornadaId', de: 'cohortes y cohorte_periodos' },
      { nombre: 'CursoVisibleId', de: 'el curso que esa cohorte ve, resuelto por su pensum' },
      {
        nombre: 'CursoIdSesion',
        de: 'el curso que irá en sesiones.curso_id; en área común, el principal',
      },
      { nombre: 'CursoEnPensumId', de: 'cursos_en_pensum.id — la unidad de la cobertura' },
      { nombre: 'Matricula', de: 'cohorte_periodos.matricula_estimada' },
      { nombre: 'BloquesSemanalesExactos, DuracionSlots', de: 'cursos_en_pensum' },
      { nombre: 'RequiereLaboratorio, TipoLaboratorioRequerido', de: 'cursos' },
      { nombre: 'Recursos', de: 'curso_recursos_requeridos, agregados por fila' },
      {
        nombre: 'AgrupacionAreaComunId',
        de: 'agrupaciones_area_comun, si la cohorte pertenece a una',
      },
    ],
    transformacion:
      'Es una fila por par cohorte–curso. Todavía no es una clase: es «esta cohorte cursa esto, tantos bloques a la semana».',
  },
  {
    id: 'sesion',
    tipo: 'SesionRequerida',
    archivo: 'Contratos/Motor/ContratoMotor.cs',
    origen: 'La expansión de los requisitos, agrupados por clave de asignación.',
    producidoPor: 'ExpansorAsignaciones, corregido por ReconciliadorFijadas',
    consumidoPor: 'Precalculo, ColocadorVoraz y VerificadorHorario',
    campos: [
      {
        nombre: 'Id',
        de: 'UUID v5 determinista de «plan:{plan}:{clave}:{ordinal}», o el persistido si es fijada',
      },
      { nombre: 'Asignacion', de: 'AREA:{agrupación} o CURSO:{visible}:COHORTE:{cohorte}' },
      { nombre: 'Ordinal', de: 'su posición entre las N sesiones semanales, base 1' },
      { nombre: 'JornadaId, DuracionSlots', de: 'iguales en todas las sesiones de la asignación' },
      {
        nombre: 'Participantes',
        de: 'una ParticipacionCohorte por cohorte, ordenadas por CohorteId',
      },
      { nombre: 'Recursos', de: 'el máximo de cada recurso entre las cohortes del grupo' },
      { nombre: 'EstaFijada', de: 'lo pone el reconciliador cuando la cruza con una de C-7' },
    ],
    transformacion:
      'Aquí «4 bloques semanales de 2 slots» se convierte en dos sesiones concretas, y cinco cohortes de un área común se funden en una sola clase que las reúne a todas.',
  },
  {
    id: 'instantanea',
    tipo: 'Instantanea',
    archivo: 'Contratos/Motor/ContratoMotor.cs',
    origen: 'Las siete consultas más la expansión y la reconciliación.',
    producidoPor: 'PreparadorInstantaneaMotorPostgres',
    consumidoPor:
      'MotorHorarios, VerificadorHorario y la RPC iniciar_generacion, que la archiva entera',
    campos: [
      { nombre: 'PlanId, Alcance', de: 'el plan: período, carreras y jornadas' },
      { nombre: 'Jornadas, Docentes, Aulas', de: 'C-1, C-4 y C-5, ordenados por Id' },
      {
        nombre: 'Sesiones, Fijadas',
        de: 'el expansor y el reconciliador, ordenadas por (Asignación, Ordinal)',
      },
      {
        nombre: 'CohortesValidas',
        de: 'C-2, para que el verificador detecte una cohorte fuera del alcance',
      },
      {
        nombre: 'Equivalencias',
        de: 'C-6, que D-17 necesita para autorizar por curso equivalente',
      },
      { nombre: 'DiagnosticosDeCarga', de: 'lo que el cargador vio y no pudo arreglar' },
    ],
    transformacion:
      'Es la frontera del motor: a partir de aquí nadie vuelve a tocar la base. Se valida a sí misma al construirse —orden, no repetidos, y que cada fijada coincida con el requisito que reemplaza— así que una instantánea mal armada no llega al colocador.',
  },
  {
    id: 'precalculada',
    tipo: 'AsignacionPrecalculada',
    archivo: 'Motor/Construccion/Precalculo.cs',
    origen: 'Las sesiones de la instantánea, cruzadas con las reglas puras y la rejilla.',
    producidoPor: 'Precalculo',
    consumidoPor: 'OrdenDeTrabajo y ColocadorVoraz',
    campos: [
      { nombre: 'Asignacion, Sesiones', de: 'el grupo de sesiones que un docente toma entero' },
      {
        nombre: 'DocentesFactibles',
        de: 'los que pasan D-17 y tienen disponibilidad en alguna colocación',
      },
      { nombre: 'AulasFactibles', de: 'las que pasan los cuatro filtros de aula' },
      {
        nombre: 'ColocacionesFactibles',
        de: 'lo que la rejilla admite para esa jornada y duración',
      },
      { nombre: 'AplicaP02', de: 'falso si la asignación pide más sesiones que días disponibles' },
    ],
    transformacion:
      'Aquí el problema deja de ser «todo contra todo». La dificultad de una asignación es el tamaño del producto de estas tres listas, y ese número es lo que decide el orden del bucle.',
  },
  {
    id: 'colocada',
    tipo: 'SesionColocada',
    archivo: 'Contratos/Motor/ContratoMotor.cs',
    origen: 'Una decisión del colocador que pasó las seis comprobaciones.',
    producidoPor: 'ColocadorVoraz',
    consumidoPor: 'VerificadorHorario y DatosGeneracionesPostgres',
    campos: [
      { nombre: 'SesionId', de: 'el de la sesión requerida, intacto' },
      { nombre: 'DocenteId', de: 'el candidato que pudo con todas las sesiones de la asignación' },
      { nombre: 'AulaId', de: 'la primera aula libre de la lista ordenada por ajuste' },
      { nombre: 'Colocacion', de: 'día y slot inicial; la duración ya la sabe la sesión' },
    ],
    transformacion:
      'Cuatro campos. Todo lo demás —minutos, curso visible, curso en pensum— lo derivan la rejilla al decidir y la base al guardar, y por eso no se emiten.',
  },
  {
    id: 'resultado',
    tipo: 'Resultado',
    archivo: 'Contratos/Motor/ContratoMotor.cs',
    origen: 'Todo lo que el colocador consiguió y todo lo que no.',
    producidoPor: 'ColocadorVoraz',
    consumidoPor: 'VerificadorHorario, EjecutarGeneracionPlan y la RPC finalizar_generacion',
    campos: [
      { nombre: 'Colocadas', de: 'en el orden de la instantánea, con las fijadas reemitidas' },
      {
        nombre: 'Pendientes',
        de: 'una entrada por asignación, con sus sesiones y el motivo contado',
      },
      { nombre: 'Diagnosticos', de: 'los de la carga y los del precálculo, juntos y ordenados' },
      { nombre: 'FueCancelado', de: 'true si se acabó el tiempo; lo colocado se conserva igual' },
    ],
    transformacion:
      'Un horario incompleto es un resultado, no un error. Por eso cancelar no lanza y por eso cada pendiente lleva su motivo: la columna de la base es obligatoria, y un motivo vacío no pierde una fila, pierde la generación entera.',
  },
  {
    id: 'json',
    tipo: 'JSON de guardar_resultado_generacion',
    archivo: 'Infraestructura/Planes/DatosGeneracionesPostgres.cs',
    origen: 'La traducción del Resultado y la Verificación al contrato de la base.',
    producidoPor: 'DatosGeneracionesPostgres',
    consumidoPor: 'La función guardar_resultado_generacion, dentro de finalizar_generacion',
    campos: [
      {
        nombre: 'p_sesiones',
        de: 'sesion_id, curso_id, docente, aula, jornada, día, slot, duración, agrupación, esta_fijada y cohortes',
      },
      {
        nombre: 'p_pendientes',
        de: 'una fila por participación: curso visible de esa cohorte, cohorte y motivo',
      },
      { nombre: 'p_conflictos', de: 'tipo, descripción y sesiones de cada violación dura' },
      { nombre: 'p_mensajes', de: 'los diagnósticos, que acaban en mensajes_generacion' },
    ],
    transformacion:
      'La base borra y reinserta el plan entero, así que las sesiones fijadas hay que reemitirlas: es lo único que las conserva. Los minutos y el curso visible los calculan los disparadores al insertar.',
  },
];

// ═══════════════════════════════════════════════ el bucle, decisión a decisión

/** Una comprobación dentro del bucle, en el orden exacto en que se hace. */
export interface Comprobacion {
  n: number;
  codigo: string;
  nombre: string;
  /** En qué nivel del bucle se pregunta. */
  nivel: 'asignacion' | 'colocacion' | 'aula';
  pregunta: string;
  /** Qué pasa si dice que no. */
  siNo: string;
}

export const BUCLE: Comprobacion[] = [
  {
    n: 1,
    codigo: 'D-21',
    nombre: 'La carga del docente',
    nivel: 'asignacion',
    pregunta:
      '¿Le cabe una asignación más? Solo se pregunta si todavía no lleva esta: volver a tomarla no le sube la carga.',
    siNo: 'Se descarta al docente entero sin probar ni una colocación, y se cuenta el rechazo.',
  },
  {
    n: 2,
    codigo: 'D-30',
    nombre: 'La cohorte está libre',
    nivel: 'colocacion',
    pregunta: '¿Todas las cohortes de la sesión tienen libres esos minutos?',
    siNo: 'Se descarta la colocación. Va primero porque es lo que menos margen tiene y descarta más rápido.',
  },
  {
    n: 3,
    codigo: 'P-02',
    nombre: 'La cohorte ya tiene ese curso ese día',
    nivel: 'colocacion',
    pregunta:
      '¿Alguna de sus cohortes ya tiene su curso visible ese día? Solo si el precálculo no relajó la regla para esta asignación.',
    siNo: 'Se descarta la colocación. Es la única preferencia del proyecto que descarta, y se apaga sola cuando haría imposible el horario.',
  },
  {
    n: 4,
    codigo: 'D-20',
    nombre: 'El docente tiene disponibilidad confirmada',
    nivel: 'colocacion',
    pregunta: '¿Su disponibilidad cubre todos los slots que ocuparía la sesión?',
    siNo: 'Se descarta la colocación para ese docente.',
  },
  {
    n: 5,
    codigo: 'D-28',
    nombre: 'El docente está libre',
    nivel: 'colocacion',
    pregunta: '¿Tiene libres esos minutos en el reloj, contando lo ya colocado?',
    siNo: 'Se descarta la colocación para ese docente.',
  },
  {
    n: 6,
    codigo: 'D-29',
    nombre: 'El aula está libre',
    nivel: 'aula',
    pregunta:
      '¿Hay alguna aula de la lista factible libre a esa hora? Se prueban en orden de ajuste: la más pequeña que sirva, primero.',
    siNo: 'Se prueba la siguiente aula; si ninguna sirve, se descarta la colocación.',
  },
];

/** Los cuatro órdenes que sustituyen al evaluador de restricciones blandas del v1. */
export interface Orden {
  id: string;
  que: string;
  criterios: string[];
  porque: string;
}

export const ORDENES: Orden[] = [
  {
    id: 'asignaciones',
    que: 'Las asignaciones · en qué orden se atienden',
    criterios: [
      'Dificultad ascendente = docentes × aulas × colocaciones. La más restringida primero.',
      'Más sesiones semanales primero.',
      'Más cohortes participantes primero.',
      'Más recursos exigidos primero.',
      'Más estudiantes primero.',
      'Sesión más larga primero.',
      'Y a igualdad, por la clave de asignación.',
    ],
    porque:
      'Es la única decisión algorítmica de esta fase, y es la que el motor v1 ya tenía bien: una asignación con dos docentes posibles y tres huecos tiene que elegir antes que una con veinte de cada. Producto y no suma, porque lo que se agota es el producto cartesiano: a una asignación con un solo docente no la salvan las aulas que le sobren.',
  },
  {
    id: 'docentes',
    que: 'Los docentes · a quién se le ofrece primero',
    criterios: [
      'Mayor nivel de prioridad primero.',
      'Menor proporción de carga usada: cuenta ÷ carga máxima.',
      'Y a igualdad, por Id.',
    ],
    porque:
      'La proporción se compara como número real a propósito: 2 de 4 tiene que ir después de 1 de 3, y comparar solo la cuenta pondría al de carga máxima 3 al final por llevar un curso más que uno que ya está casi lleno. Es lo que reparte los cursos en vez de amontonarlos en el primero de la lista.',
  },
  {
    id: 'aulas',
    que: 'Las aulas · cuál se prueba primero',
    criterios: [
      'Menor capacidad primero.',
      'Menos recursos de sobra primero.',
      'Y a igualdad, por Id.',
    ],
    porque:
      'Todas las que llegan aquí ya sirven, así que gastar un auditorio de 200 en un grupo de 20 solo le quita el aula a la cohorte grande que viene después.',
  },
  {
    id: 'colocaciones',
    que: 'Las horas · dónde se intenta primero',
    criterios: [
      'El día en que las cohortes tienen menos clases.',
      'El hueco más pegado a lo que ya tienen ese día.',
      'Y a igualdad, por día y por slot.',
    ],
    porque:
      'Son las dos únicas cosas que el horario le debe a quien lo cursa y que ninguna regla dura impone: repartir la semana en vez de amontonar el lunes, y no dejar una hora libre en medio de la mañana.',
  },
];

/** Lo que el motor dice cuando algo no cabe, y qué hay que arreglar en cada caso. */
export interface Aviso {
  codigo: string;
  origen: 'carga' | 'precalculo' | 'pendiente' | 'verificador';
  significa: string;
  arreglo: string;
}

export const AVISOS: Aviso[] = [
  {
    codigo: 'CARGA_SIN_COHORTES',
    origen: 'carga',
    significa: 'El período no tiene cohortes activas dentro del alcance del plan.',
    arreglo: 'Activar cohortes en el período, o ampliar las carreras y jornadas del plan.',
  },
  {
    codigo: 'CARGA_SIN_REQUISITOS',
    origen: 'carga',
    significa: 'Hay cohortes, pero su pensum no declara cursos para el semestre que cursan.',
    arreglo: 'Completar cursos_en_pensum para ese semestre.',
  },
  {
    codigo: 'SIN_DOCENTE_FACTIBLE',
    origen: 'precalculo',
    significa:
      'Nadie puede dar ese curso. El mensaje distingue tres causas: nadie autorizado, autorizados sin disponibilidad, o la jornada no deja ninguna hora.',
    arreglo: 'Autorizar a alguien, confirmarle disponibilidad, o corregir la jornada.',
  },
  {
    codigo: 'SIN_AULA_FACTIBLE',
    origen: 'precalculo',
    significa:
      'Ninguna aula sirve. El mensaje nombra el filtro que vació la lista y, si es un recurso, cuál.',
    arreglo: 'Habilitar un aula del tipo pedido, añadirle el recurso, o revisar la matrícula.',
  },
  {
    codigo: 'SIN_COLOCACION_FACTIBLE',
    origen: 'precalculo',
    significa: 'La jornada no deja ni una hora donde esa sesión quepa.',
    arreglo: 'Revisar días activos, bloques por día, hora de fin, receso o descansos.',
  },
  {
    codigo: 'P02_RELAJADA',
    origen: 'precalculo',
    significa:
      'La asignación pide más sesiones que días con hueco, así que se permite más de una el mismo día.',
    arreglo: 'Nada urgente: es el motor evitando dejar algo fuera por una preferencia.',
  },
  {
    codigo: 'SEMESTRE_NO_CABE',
    origen: 'precalculo',
    significa:
      'Una cohorte pide más slots semanales de los que su jornada tiene. El mensaje dice cuántos faltan y cuántas sesiones son.',
    arreglo: 'Es un ajuste del pensum o de la jornada, no del horario.',
  },
  {
    codigo: 'N candidatos: …',
    origen: 'pendiente',
    significa:
      'El motivo de una asignación pendiente, contado durante el recorrido: cuántos candidatos se probaron y qué regla rechazó a cada uno, de más rechazos a menos.',
    arreglo: 'La regla que más rechaza es la que hay que atacar primero.',
  },
  {
    codigo: 'COBERTURA_INCOMPLETA',
    origen: 'verificador',
    significa:
      'Una cohorte no reunió los slots que su pensum pide para un curso. Es nivel 2: incompleto, no inválido.',
    arreglo:
      'Se reporta y no se garantiza: depende de que existan docentes, aulas y horas suficientes.',
  },
];

/** Los veinte códigos de violación dura, en el orden fijo en que se reportan. */
export const CODIGOS_VERIFICADOR: string[] = [
  'SESION_SIN_RESULTADO',
  'SESION_DUPLICADA',
  'COHORTE_DESCONOCIDA',
  'DOCENTE_DESCONOCIDO',
  'AULA_DESCONOCIDA',
  'COHORTE_JORNADA_DISTINTA',
  'DOCENTE_NO_AUTORIZADO',
  'DOCENTE_NO_DISPONIBLE',
  'CONTINUIDAD_DOCENTE',
  'AREA_COMUN_VARIOS_DOCENTES',
  'AREA_COMUN_INCOMPLETA',
  'CARGA_DOCENTE_EXCEDIDA',
  'TIPO_AULA_INCOMPATIBLE',
  'TIPO_LABORATORIO_INCOMPATIBLE',
  'RECURSO_AULA_FALTANTE',
  'CAPACIDAD_AULA_INSUFICIENTE',
  'COLOCACION_FUERA_DE_JORNADA',
  'COLISION_DOCENTE',
  'COLISION_AULA',
  'COLISION_COHORTE',
];

/** Los dos niveles de la regla de oro: qué se garantiza y qué solo se diagnostica. */
export const NIVELES = [
  {
    nivel: 'Nivel 1 · Corrección',
    promesa: 'El motor la garantiza.',
    texto:
      'Toda sesión que emite es aceptada por la base: pasa las reglas de jornada, receso, coherencia de cohorte y las tres restricciones de solape. Reglas D-01 a D-30 y P-01 a P-08. Si el motor produjo algo, se puede guardar.',
  },
  {
    nivel: 'Nivel 2 · Cobertura',
    promesa: 'El motor la diagnostica.',
    texto:
      'Que cada cohorte quede completa depende de los datos: reglas D-31 y D-32. Un horario incompleto no es inválido, es incompleto, y eso se reporta con nombres y números.',
  },
];

/** Cifras verificadas contra el código el 2026-08-30. */
export const CIFRAS = [
  { valor: '14', que: 'archivos en Horarios.Motor', nota: '2 547 líneas' },
  { valor: '7', que: 'consultas de entrada', nota: 'C-1 a C-7, una sola vez por generación' },
  { valor: '43', que: 'reglas especificadas', nota: '35 duras del SQL, 8 del proyecto' },
  { valor: '20', que: 'códigos de violación dura', nota: 'los que el verificador puede emitir' },
  { valor: '137', que: 'pruebas en verde', nota: 'Horarios.Motor.Tests, 2026-08-30' },
  {
    valor: '300 s',
    que: 'límite por generación',
    nota: 'configurable en Motor:TiempoMaximoSegundos',
  },
];

// ═══════════════════════════════════════════════ el mapa: capas y frontera

/** Las cuatro capas por las que pasa la información, en el orden en que se cruzan. */
export type CapaId = 'blazor' | 'aplicacion' | 'infraestructura' | 'motor';

export interface Capa {
  id: CapaId;
  titulo: string;
  /** El proyecto tal como se llama en la solución. */
  proyecto: string;
  /** Qué puede y qué no puede hacer esta capa. */
  nota: string;
}

export const CAPAS: Capa[] = [
  {
    id: 'blazor',
    titulo: 'Pantalla y hospedaje',
    proyecto: 'Horarios.Blazor',
    nota: 'Pide y sondea. También es donde vive la cola y el hilo de fondo.',
  },
  {
    id: 'aplicacion',
    titulo: 'Casos de uso',
    proyecto: 'Horarios.Aplicacion',
    nota: 'Decide el qué. Habla solo por interfaces: no conoce Postgres ni el motor.',
  },
  {
    id: 'infraestructura',
    titulo: 'Adaptadores',
    proyecto: 'Horarios.Infraestructura',
    nota: 'Lo único que sabe SQL. Traduce filas a tipos del contrato y al revés.',
  },
  {
    id: 'motor',
    titulo: 'Motor',
    proyecto: 'Horarios.Motor',
    nota: 'Cálculo puro. Sin base, sin red, sin reloj: la misma entrada da la misma salida.',
  },
];

/** De qué proyecto es cada carril del mapa. */
export const CAPA_DE_PROYECTO: Record<string, CapaId> = {
  'Horarios.Blazor': 'blazor',
  'Horarios.Aplicacion': 'aplicacion',
  'Horarios.Infraestructura': 'infraestructura',
  'Horarios.Motor': 'motor',
};

/**
 * Los cinco puntos del recorrido donde alguien habla con Postgres, y qué hace allí.
 * Todo lo demás —las once etapas del centro— ocurre en memoria.
 */
export const TOCA_BASE: Record<string, string> = {
  cargador: '7 consultas de lectura · C-1…C-7',
  iniciar: 'RPC iniciar_generacion',
  guardar: 'RPC finalizar_generacion',
  estado: 'UPDATE planes.estado',
  consultar: 'RPC consultar_revision_horario',
};

// ═══════════════════════════ qué le pasa a la información: uno a uno y en lote

/**
 * Un tramo del recorrido leído dos veces: qué le pasa a un dato suelto y qué le
 * pasa al conjunto entero. Son las dos lecturas que no se ven en el mismo sitio
 * mirando solo el código, porque el bucle de uno está dentro del bucle del otro.
 */
export interface Tramo {
  id: string;
  titulo: string;
  /** Las etapas del mapa que cubre. */
  etapas: number[];
  fase: FaseId;
  entra: string;
  sale: string;
  /** Qué le pasa a UNA unidad suelta. */
  individual: { unidad: string; pasos: string[] };
  /** Qué le pasa al conjunto, que casi nunca es «lo mismo N veces». */
  lote: { unidad: string; pasos: string[] };
  /** Cómo cambia la cuenta de cosas al cruzar el tramo. */
  cardinalidad: string;
}

export const TRAMOS: Tramo[] = [
  {
    id: 'extraccion',
    titulo: 'Extracción · la base se lee una vez y no se vuelve',
    etapas: [3],
    fase: 'peticion',
    entra: 'PlanHorario',
    sale: 'RequisitoCargado[] · Docente[] · Aula[] · Jornada[]',
    individual: {
      unidad: 'una fila de C-3',
      pasos: [
        'Es un par cohorte–curso: «esta cohorte cursa esto, tantos bloques a la semana».',
        'Llega con sus recursos ya agregados por fila, no en una segunda consulta por cada uno.',
        'Trae su curso visible y su curso de sesión por separado, porque en área común no son el mismo.',
        'Todavía no es una clase: no tiene día, ni hora, ni docente, ni aula.',
      ],
    },
    lote: {
      unidad: 'las siete consultas',
      pasos: [
        'C-1 a C-7 se lanzan una sola vez por generación, con el alcance del plan como filtro.',
        'Un arreglo de alcance vacío no significa «nada»: significa «sin filtro».',
        'Después de esto se cierra la puerta: ninguna etapa posterior vuelve a la base hasta guardar.',
        'Lo que el alcance dejó fuera no se lanza: se anota como diagnóstico de carga y el plan sigue.',
      ],
    },
    cardinalidad: '1 plan → 7 consultas → N filas por consulta',
  },
  {
    id: 'expansion',
    titulo: 'Expansión · de «qué se cursa» a «qué clases hay»',
    etapas: [4, 5],
    fase: 'peticion',
    entra: 'RequisitoCargado[]',
    sale: 'ImmutableArray<SesionRequerida>',
    individual: {
      unidad: 'un requisito',
      pasos: [
        'Sus bloques semanales se dividen entre la duración: 4 bloques de 2 slots son 2 sesiones.',
        'La división tiene que ser exacta; si no, no hay sesión entera que emitir.',
        'Cada sesión recibe un identificador determinista: UUID v5 sobre «plan:{plan}:{clave}:{ordinal}».',
        'Si el reconciliador la cruza con una fijada de C-7, conserva el identificador ya persistido.',
      ],
    },
    lote: {
      unidad: 'el grupo de área común',
      pasos: [
        'Las filas se agrupan por clave de asignación: AREA:{agrupación}, o CURSO:{visible}:COHORTE:{cohorte}.',
        'Cinco cohortes de un área común no dan cinco clases: dan una sola que las reúne a las cinco.',
        'Del grupo se toma el máximo de cada recurso, no la suma: es la misma clase, no cinco.',
        'Si dos filas del grupo discrepan en jornada, duración o cantidad, se lanza en vez de arbitrar.',
      ],
    },
    cardinalidad: 'N requisitos → M asignaciones → S sesiones, con M ≤ N y S ≥ M',
  },
  {
    id: 'traspaso',
    titulo: 'Traspaso · la frontera, y el cambio de hilo',
    etapas: [6, 7, 8, 9],
    fase: 'peticion',
    entra: 'Instantanea',
    sale: 'Instantanea, intacta, en otro hilo',
    individual: {
      unidad: 'un dato cualquiera',
      pasos: [
        'No le pasa nada: nada se transforma aquí, y ese es justo el punto.',
        'Cruza la frontera dentro de la instantánea, que es inmutable y se valida al construirse.',
        'Se archiva tal cual como JSON de entrada de la generación, campo p_instantanea_entrada.',
        'Por eso dos corridas sobre la misma entrada son comparables después, dato a dato.',
      ],
    },
    lote: {
      unidad: 'la instantánea entera',
      pasos: [
        'Viaja como un solo objeto por un Channel acotado a 100 trabajos.',
        'La petición web muere aquí; el hilo de fondo abre su propio ámbito de dependencias.',
        'Un único consumidor a propósito: son trabajos de CPU y varios a la vez solo se quitan tiempo.',
        'El trabajo lleva su propio límite: 300 s por defecto, en Motor:TiempoMaximoSegundos.',
      ],
    },
    cardinalidad: '1 instantánea → 1 trabajo en cola → 1 ejecución cronometrada',
  },
  {
    id: 'precalculo',
    titulo: 'Precálculo · qué es posible antes de decidir nada',
    etapas: [11, 12, 13],
    fase: 'fondo',
    entra: 'Instantanea',
    sale: 'AsignacionPrecalculada[]',
    individual: {
      unidad: 'una sesión',
      pasos: [
        'Por sí sola no se precalcula: hereda las cuatro listas de su asignación.',
        'Su jornada y su duración se traducen a colocaciones factibles sobre la rejilla común.',
        'Lo que aquí se descarta no se vuelve a mirar: ninguna regla dura podría aceptarlo.',
      ],
    },
    lote: {
      unidad: 'una asignación',
      pasos: [
        'Se calculan sus docentes factibles (D-17, D-20), sus aulas (D-24 a D-27) y sus colocaciones.',
        'Su dificultad es el producto de los tamaños de esas tres listas.',
        'Las asignaciones se ordenan de más difícil a más fácil: quien tiene menos margen elige antes.',
        'Una lista vacía no lanza: emite un diagnóstico con la causa real, antes de ocupar medio horario.',
      ],
    },
    cardinalidad: 'S sesiones → M asignaciones, cada una con |docentes| × |aulas| × |colocaciones|',
  },
  {
    id: 'colocacion',
    titulo: 'Colocación · el bucle dentro del bucle',
    etapas: [14],
    fase: 'fondo',
    entra: 'AsignacionPrecalculada[]',
    sale: 'Resultado',
    individual: {
      unidad: 'una sesión · ColocarUna',
      pasos: [
        'Recorre sus colocaciones factibles en orden y para en la primera que pasa las seis preguntas.',
        'Cohortes libres, P-02, disponibilidad del docente y docente libre descartan la colocación entera.',
        'El aula es lo último, porque es lo único que obliga a recorrer una lista.',
        'Devuelve una SesionColocada de cuatro campos, o nada: si no cabe, no cabe.',
      ],
    },
    lote: {
      unidad: 'una asignación · Atender',
      pasos: [
        'Prueba docente a docente, en orden de preferencia; si hay una fijada, ese docente es el único.',
        'O entran todas sus sesiones libres, o ninguna (P-08): media asignación incumple igual que cero.',
        'Al fallar una, se liberan las ya puestas de ese docente y el siguiente parte del mismo horario.',
        'La carga se anota una vez por asignación, no por sesión: la unidad de carga_maxima_cursos es la clave.',
      ],
    },
    cardinalidad:
      'M asignaciones × candidatos × sesiones × colocaciones × aulas, cortando en el primer sí',
  },
  {
    id: 'verificacion',
    titulo: 'Verificación · la segunda opinión, desde cero',
    etapas: [15],
    fase: 'fondo',
    entra: 'Resultado + Instantanea',
    sale: 'Verificacion',
    individual: {
      unidad: 'una sesión colocada',
      pasos: [
        'Se vuelve a comprobar contra las reglas duras, sin fiarse de que el colocador ya lo hizo.',
        'Cada violación nombra su código y las sesiones implicadas, no solo el hecho.',
      ],
    },
    lote: {
      unidad: 'el horario entero',
      pasos: [
        'Recalcula la ocupación desde la salida: no comparte los registros del colocador.',
        'Compartirlos haría que un error en ellos pasara desapercibido dos veces.',
        'Los veinte códigos se reportan en un orden fijo, para que dos corridas se puedan comparar.',
        'Un horario incompleto no es una violación: las pendientes van aparte, con su motivo contado.',
      ],
    },
    cardinalidad: 'C colocadas → 0…20 tipos de violación dura, cada uno con sus sesiones',
  },
  {
    id: 'guardado',
    titulo: 'Guardado · vuelta a la base, en una transacción',
    etapas: [16, 17],
    fase: 'fondo',
    entra: 'Resultado + Verificacion',
    sale: 'filas en horarios.sesiones',
    individual: {
      unidad: 'una SesionColocada',
      pasos: [
        'Se traduce a una fila de p_sesiones: sesión, curso, docente, aula, jornada, día, slot y duración.',
        'Los minutos y el curso visible no se envían: los calculan los disparadores al insertar.',
        'Si era fijada hay que reemitirla igual: es lo único que la conserva.',
        'Cada pendiente va con su motivo; la columna es obligatoria y un motivo vacío pierde la generación.',
      ],
    },
    lote: {
      unidad: 'el plan entero',
      pasos: [
        'La base borra y reinserta el plan completo dentro de finalizar_generacion.',
        'Sesiones, pendientes, conflictos y mensajes entran en la misma llamada y en la misma transacción.',
        'El plan cambia de estado según lo que salió: nada a medias, ni un horario sin su expediente cerrado.',
      ],
    },
    cardinalidad: 'C colocadas + P pendientes + V conflictos + D mensajes → 1 transacción',
  },
  {
    id: 'lectura',
    titulo: 'Lectura · por otra puerta',
    etapas: [18],
    fase: 'lectura',
    entra: 'Guid planId',
    sale: 'HorarioGeneradoDto',
    individual: {
      unidad: 'una fila guardada',
      pasos: [
        'Vuelve ya con sus minutos y su curso visible, que la puso la base y no el motor.',
        'Se convierte en una celda pintada, o en una línea de «sin asignar» con su motivo.',
      ],
    },
    lote: {
      unidad: 'la revisión del plan',
      pasos: [
        'Otra RPC, consultar_revision_horario, paginada de 500 en 500.',
        'Ninguna clase del motor participa: el Resultado ya no existe en memoria.',
        'Al lado, el historial de intentos: cuánto tardó cada uno, con qué versión y con cuántas pendientes.',
      ],
    },
    cardinalidad: '1 plan → páginas de 500 filas → 1 DTO para pintar',
  },
];

// ═══════════════════════════ los dos hilos, y qué corre a la vez que qué

/** Quién ejecuta la etapa: el hilo de la petición web o el servicio de fondo. */
export type HiloId = 'web' | 'fondo';

export interface Hilo {
  id: HiloId;
  titulo: string;
  /** Quién es ese hilo, en una línea. */
  quien: string;
}

export const HILOS: Hilo[] = [
  {
    id: 'web',
    titulo: 'Hilo de la petición',
    quien: 'El circuito Blazor de la persona que pulsó «Generar». Vive mientras la página esté abierta.',
  },
  {
    id: 'fondo',
    titulo: 'Hilo de fondo',
    quien: 'ProcesadorTrabajosPesados: un BackgroundService único que arranca con la aplicación.',
  },
];

/**
 * Lo que el hilo web sigue haciendo MIENTRAS el hilo de fondo trabaja. Es lo que un
 * mapa lineal de 18 etapas no puede enseñar: estas dos cosas ocurren a la vez.
 */
export interface Paralelo {
  hilo: HiloId;
  /** Entre qué etapas del otro hilo transcurre. */
  durante: [number, number];
  titulo: string;
  /** El reloj que lo gobierna, tal como está en el código. */
  reloj: string;
  pasos: string[];
  /** Qué hace contra Postgres mientras tanto. */
  base: string;
  /** Cuándo se detiene. */
  termina: string;
}

export const PARALELO: Paralelo = {
  hilo: 'web',
  durante: [8, 17],
  titulo: 'La pantalla sondea',
  reloj: 'PeriodicTimer(2 s)',
  pasos: [
    'SeguirAsync llama a ListarPlanes y a ListarGeneracionesPlan cada dos segundos.',
    'Muestra «lleva X de un máximo de Y», con Y leído de la misma configuración que usa el motor.',
    'Compara con el intento anterior: «la generación previa tardó Z», sacado de su DuracionMs.',
    'El sondeo se cancela al salir de la página y se retoma solo al volver, contando desde IniciadaEn.',
  ],
  base: 'listar_generaciones_plan',
  termina:
    'Cuando el plan deja de estar en Generando, o al pasar del presupuesto del motor más 20 s de margen, y entonces declara «no respondió».',
};

// ═══════════════════════════ qué dispara qué, y con qué reloj se mide

/**
 * Los relojes del recorrido. Todo número de aquí está en el código: no hay
 * estimaciones. Son los que contestan «¿cuándo termina esto?».
 */
export interface Disparador {
  id: string;
  /** Qué acción concreta lo pone en marcha. */
  dispara: string;
  /** Quién arranca a raíz de eso. */
  arranca: string;
  /** El mecanismo exacto, con su tipo. */
  mecanismo: string;
  /** El número, y de dónde sale. */
  reloj: string;
  /** Cómo termina, o cómo se sabe que terminó. */
  fin: string;
  /** Qué pasa si el mecanismo se satura o falla. */
  limite: string;
}

export const DISPARADORES: Disparador[] = [
  {
    id: 'clic',
    dispara: 'La persona pulsa «Generar» en Planes.razor.',
    arranca: 'GenerarHorarioPlan, en el mismo hilo de la petición.',
    mecanismo: 'Llamada directa en proceso: EjecutarAsync(planId).',
    reloj: 'Sin reloj: es síncrono. Lo que tarda es lo que tardan las 7 consultas de C-1…C-7.',
    fin: 'Devuelve un GeneracionHorarioDto en estado Pendiente. El horario aún no existe.',
    limite:
      'Cualquier validación que no pase lanza y no deja nada a medias: no hay generación abierta ni plan movido.',
  },
  {
    id: 'encolar',
    dispara: 'La última línea de GenerarHorarioPlan: cola.Encolar(solicitud).',
    arranca: 'La cola de trabajos pesados, que guarda el trabajo y devuelve al instante.',
    mecanismo:
      'ColaTrabajosPesados: Channel.CreateBounded<TrabajoPesado>(100), nombre «generacion:{plan:N}».',
    reloj: 'Capacidad 100. TryWrite no espera: si no cabe, falla ya.',
    fin: 'El hilo de la petición muere aquí. Lo encolado es un Func<CancellationToken, Task>.',
    limite:
      'Cola llena → InvalidOperationException «La cola de trabajos pesados está llena; reintente cuando terminen los trabajos en curso.»',
  },
  {
    id: 'consumir',
    dispara: 'Nadie: el consumidor ya estaba girando desde que arrancó la aplicación.',
    arranca: 'ProcesadorTrabajosPesados.ExecuteAsync toma el trabajo y lo ejecuta.',
    mecanismo: 'BackgroundService con un solo consumidor, a propósito: el motor es trabajo de CPU.',
    reloj:
      'Cola vacía → Task.Delay(250 ms) antes de volver a mirar. Ese cuarto de segundo es la latencia máxima de recogida.',
    fin: 'ProcesarSiguienteAsync devuelve true cuando ejecutó algo, false cuando no había nada.',
    limite:
      'Un trabajo que revienta no tumba el procesador: registra el error y espera 1 s antes de seguir. Solo el apagado de la aplicación corta el bucle.',
  },
  {
    id: 'ambito',
    dispara: 'El trabajo empieza a ejecutarse dentro del hilo de fondo.',
    arranca:
      'Un ámbito de dependencias nuevo, porque los adaptadores de datos son por petición y aquella ya terminó.',
    mecanismo:
      'IServiceScopeFactory.CreateScope() y se copia el token de Supabase del usuario que la pidió.',
    reloj: 'El token viaja con el trabajo para que las políticas de acceso sigan aplicando.',
    fin: 'El ámbito se libera al terminar el trabajo, pase lo que pase.',
    limite: 'Sin ese token, la generación de fondo escribiría sin identidad y las políticas la rechazarían.',
  },
  {
    id: 'presupuesto',
    dispara: 'El mismo trabajo, justo antes de llamar a EjecutarGeneracionPlan.',
    arranca: 'El presupuesto de tiempo del motor.',
    mecanismo:
      'CancellationTokenSource.CreateLinkedTokenSource(...).CancelAfter(TiempoMaximoSegundos()).',
    reloj: 'Motor:TiempoMaximoSegundos de la configuración; 300 s cuando no está puesto.',
    fin: 'Al vencer, el token se cancela y el colocador devuelve un Resultado con FueCancelado = true.',
    limite:
      'La cancelación no es destructiva: se cierra la generación como Cancelada con lo que llevaba, y el plan pasa a Fallido.',
  },
  {
    id: 'sondeo',
    dispara: 'La misma llamada que abrió la generación: IniciarSeguimiento(planId, solicitada).',
    arranca: 'El sondeo de la pantalla, en paralelo a todo lo anterior.',
    mecanismo: 'PeriodicTimer(2 s) en SeguirAsync, con su propio CancellationTokenSource.',
    reloj:
      'Intervalo 2 s. Margen de 20 s sobre el presupuesto del motor antes de declararla sin respuesta.',
    fin: 'RefrescarSeguimientoAsync devuelve false en cuanto el plan deja de estar en Generando.',
    limite:
      'Pasado el presupuesto más el margen, la página deja de sondear y avisa: el plan se quedó en Generando, que es un estado sin salida.',
  },
  {
    id: 'cierre',
    dispara: 'El motor devuelve, con horario o sin él.',
    arranca: 'El cierre: EjecutarGeneracionPlan escribe el desenlace.',
    mecanismo:
      'RPC finalizar_generacion con la duración medida por Stopwatch, y después CambiarEstado del plan.',
    reloj: 'DuracionMs se mide de reloj de pared, desde antes de motor.Ejecutar hasta después de verificar.',
    fin: 'Completada + Generado si la verificación pasa y no quedan pendientes; Inviable si no; Fallida o Cancelada si reventó.',
    limite:
      'El cierre usa CancellationToken.None cuando ya hubo cancelación: el registro de por qué terminó se escribe igual.',
  },
];

// ═══════════════════════════ los contratos: qué tipo transporta qué, y hasta dónde

/** Qué frontera cruza el dato dentro de ese tipo. */
export type FronteraId = 'proceso' | 'hilo' | 'rpc' | 'sql' | 'render';

export interface Contrato {
  tipo: string;
  /** Dónde está declarado. */
  proyecto: string;
  de: string;
  a: string;
  frontera: FronteraId;
  /** Los campos que de verdad importan. */
  lleva: string;
  /** Por qué es ese tipo y no otro. */
  nota: string;
}

export const FRONTERAS: Record<FronteraId, string> = {
  proceso: 'llamada en proceso',
  hilo: 'cambio de hilo',
  rpc: 'JSON por RPC',
  sql: 'SQL crudo',
  render: 'a pantalla',
};

export const CONTRATOS: Contrato[] = [
  {
    tipo: 'Guid planId',
    proyecto: '—',
    de: 'Planes.razor',
    a: 'GenerarHorarioPlan',
    frontera: 'proceso',
    lleva: 'El identificador del plan. Nada más: todo lo demás se vuelve a leer del servidor.',
    nota: 'La pantalla no manda estado. Si mandara el plan entero, mandaría el que tenía cargado, que puede estar viejo.',
  },
  {
    tipo: 'PlanHorario',
    proyecto: 'Horarios.Dominio',
    de: 'IDatosPlanes',
    a: 'GenerarHorarioPlan y el preparador',
    frontera: 'proceso',
    lleva: 'PeriodoId, Tipo, Estado, MotivoEstado, VersionFila, CarreraIds, JornadaIds.',
    nota: 'Es dominio, no DTO: trae consigo CambiarEstado y la tabla de transiciones. Es el único tipo del recorrido con reglas propias.',
  },
  {
    tipo: 'ResultadoRevisionPlanDto',
    proyecto: 'Horarios.Contratos',
    de: 'RevisarDatosPlan',
    a: 'GenerarHorarioPlan',
    frontera: 'proceso',
    lleva: 'PuedeGenerarse, DatosFaltantes en español y ConteosRevisionPlan con los seis números que lo respaldan.',
    nota: 'Trae los conteos y no solo el veredicto, para poder decir «hay 3 docentes autorizados» en vez de «faltan docentes».',
  },
  {
    tipo: 'RequisitoCargado',
    proyecto: 'Horarios.Contratos',
    de: 'PreparadorInstantaneaMotorPostgres (C-3)',
    a: 'ExpansorAsignaciones',
    frontera: 'sql',
    lleva: 'Cohorte, pensum, semestre, jornada, curso de sesión y curso visible por separado, matrícula, bloques semanales, duración, recursos y agrupación.',
    nota: 'Es la fila cruda, antes de ser clase. Distingue CursoIdSesion de CursoVisibleId porque en área común no son el mismo curso.',
  },
  {
    tipo: 'SesionRequerida',
    proyecto: 'Horarios.Contratos',
    de: 'ExpansorAsignaciones',
    a: 'Precalculo y ColocadorVoraz',
    frontera: 'proceso',
    lleva: 'Id determinista, ClaveAsignacion, Ordinal, jornada, DuracionSlots, participantes, recursos, exigencia de laboratorio y EstaFijada.',
    nota: 'Ya es una clase que hay que colocar, pero todavía sin día, hora, docente ni aula. Valida sus invariantes en el constructor.',
  },
  {
    tipo: 'SesionFijada',
    proyecto: 'Horarios.Contratos',
    de: 'ReconciliadorFijadas (C-7)',
    a: 'ColocadorVoraz, como ocupación previa',
    frontera: 'proceso',
    lleva: 'Lo mismo que la requerida más DocenteId, AulaId y Colocacion(Dia, SlotInicio) ya persistidos.',
    nota: 'Es el único contrato que entra al motor con la decisión ya tomada. El motor la respeta y ocupa a su alrededor (P-04).',
  },
  {
    tipo: 'Instantanea',
    proyecto: 'Horarios.Contratos',
    de: 'PreparadorInstantaneaMotorPostgres',
    a: 'la cola, el motor y el verificador',
    frontera: 'hilo',
    lleva: 'PlanId, AlcancePlan, jornadas, docentes, aulas, sesiones, fijadas, cohortes válidas, equivalencias y diagnósticos de carga.',
    nota: 'El contrato central: todo inmutable y ordenado. Después de construirla, ninguna etapa del motor vuelve a la base.',
  },
  {
    tipo: 'SolicitudGeneracionEncolada',
    proyecto: 'Horarios.Aplicacion',
    de: 'GenerarHorarioPlan',
    a: 'ColaGeneracionesEnMemoria',
    frontera: 'hilo',
    lleva: 'GeneracionId, el PlanHorario ya en Generando, la Instantanea entera y SolicitadaPorId.',
    nota: 'Es el paquete que cruza el hilo. Lleva quién la pidió porque el trabajo de fondo tiene que escribir con su identidad.',
  },
  {
    tipo: 'Resultado',
    proyecto: 'Horarios.Contratos',
    de: 'MotorHorarios',
    a: 'EjecutarGeneracionPlan y el verificador',
    frontera: 'proceso',
    lleva: 'SesionColocada[] de cuatro campos, AsignacionPendiente[] con su motivo, Diagnostico[] y FueCancelado.',
    nota: 'Toda la salida del motor cabe aquí. No trae objetos: solo identificadores, día y slot.',
  },
  {
    tipo: 'ResultadoVerificacion',
    proyecto: 'Horarios.Contratos',
    de: 'VerificadorHorario',
    a: 'EjecutarGeneracionPlan',
    frontera: 'proceso',
    lleva: 'ViolacionesNivel1 con código, mensaje y sesiones implicadas; CoberturaNivel2 como diagnósticos.',
    nota: 'EsCorrecto es lo único que decide entre Completada e Inviable. Es una propiedad calculada, no un campo que alguien ponga.',
  },
  {
    tipo: 'p_instantanea_entrada',
    proyecto: 'JSON de iniciar_generacion',
    de: 'DatosGeneracionesPostgres',
    a: 'Postgres',
    frontera: 'rpc',
    lleva: 'plan_version, NumeroVersion y la Instantanea entera serializada.',
    nota: 'La entrada queda archivada. Es lo que hace que dos corridas se puedan comparar después, dato a dato.',
  },
  {
    tipo: 'p_sesiones · p_pendientes · p_conflictos · p_mensajes',
    proyecto: 'JSON de finalizar_generacion',
    de: 'DatosGeneracionesPostgres',
    a: 'Postgres',
    frontera: 'rpc',
    lleva: 'Estado, DuracionMs, totales de violaciones y pendientes, y las cuatro listas del horario.',
    nota: 'Las cuatro listas viajan en la misma llamada porque la base las inserta en una sola transacción.',
  },
  {
    tipo: 'GeneracionHorarioDto',
    proyecto: 'Horarios.Contratos',
    de: 'las RPC de generación',
    a: 'la pantalla',
    frontera: 'render',
    lleva: 'Estado, VersionMotor, IniciadaEn, FinalizadaEn, DuracionMs, totales de violaciones y pendientes, y MensajeGeneracionDto[].',
    nota: 'Es el expediente del intento, y el mismo tipo que devuelve abrir, cerrar y listar. La pantalla no conoce ningún otro.',
  },
  {
    tipo: 'HorarioGeneradoDto',
    proyecto: 'Horarios.Contratos',
    de: 'RPC consultar_revision_horario',
    a: 'la pantalla',
    frontera: 'render',
    lleva: 'Sesiones con nombre e id de cada cosa, más minuto de inicio y fin; conflictos y pendientes enteros; TotalSesiones y paginación.',
    nota: 'Trae nombres ya resueltos y minutos ya calculados: la pantalla pinta sin volver a consultar y sin conocer la jornada.',
  },
];

// ═══════════════════════════ qué se valida, quién lo valida y cuándo

export interface Validacion {
  id: string;
  /** En qué capa ocurre. */
  capa: string;
  /** El punto exacto del código. */
  donde: string;
  /** El momento del recorrido, referido a las etapas del mapa. */
  cuando: string;
  /** Qué comprueba. */
  que: string[];
  /** Qué ocurre si no pasa. */
  siFalla: string;
}

export const VALIDACIONES: Validacion[] = [
  {
    id: 'permiso',
    capa: 'Aplicación',
    donde: 'GenerarHorarioPlan · IContextoUsuario',
    cuando: 'Etapa 2, antes de leer nada.',
    que: ['Hay sesión iniciada.', 'El usuario tiene el permiso Motor/generar.'],
    siFalla: 'UnauthorizedAccessException. No se abre generación ni se mueve el plan.',
  },
  {
    id: 'estado',
    capa: 'Aplicación',
    donde: 'GenerarHorarioPlan · plan.Estado',
    cuando: 'Etapa 2, justo después de cargar el plan.',
    que: ['El plan existe.', 'Su estado es Borrador y no otro.'],
    siFalla:
      'KeyNotFoundException si no existe; InvalidOperationException «Solo un plan en borrador puede iniciar una generación.»',
  },
  {
    id: 'suficiencia',
    capa: 'Aplicación',
    donde: 'RevisarDatosPlan → ResultadoRevisionPlanDto',
    cuando: 'Etapa 2, antes de sacar la foto.',
    que: [
      'Existe el período.',
      'Hay cohortes activas, y no todas sin cursos.',
      'Hay aulas activas.',
      'Hay docentes autorizados y con disponibilidad declarada.',
    ],
    siFalla:
      'DatosPlanIncompletosException con la lista en español de lo que falta, para mostrarla tal cual.',
  },
  {
    id: 'instantanea-vacia',
    capa: 'Aplicación',
    donde: 'GenerarHorarioPlan · instantanea.Sesiones.IsEmpty',
    cuando: 'Etapa 2, con la foto ya hecha y antes de abrir el expediente.',
    que: ['La instantánea trae al menos una sesión que colocar.'],
    siFalla:
      'DatosPlanIncompletosException: «El paquete de datos no contiene sesiones requeridas.» Arrancar el motor con cero sesiones sería gastar un intento para nada.',
  },
  {
    id: 'invariantes',
    capa: 'Contratos',
    donde: 'ContratoMotor.cs · Validaciones, en el constructor de cada record',
    cuando: 'Etapas 3 a 5, al construir cada tipo. No hay un paso aparte: valida el que construye.',
    que: [
      'Jornada: fin posterior al inicio, al menos un bloque por día, duración de bloque positiva.',
      'SesionRequerida: toda participación en la jornada de la sesión, duración ≥ 1 slot, ordinal ≥ 1, y agrupación de área común si y solo si hay dos cohortes o más.',
      'Participaciones ordenadas por CohorteId, sin repetir y nunca vacías.',
      'Instantanea: jornadas, docentes y aulas ordenados por Id sin repetidos; sesiones y fijadas por (asignación, ordinal).',
      'Cada fijada coincide campo a campo con el requisito que reemplaza.',
    ],
    siFalla:
      'ArgumentException al construir. Un dato mal formado no llega al motor: revienta en la frontera, no a mitad del bucle.',
  },
  {
    id: 'dominio',
    capa: 'Dominio',
    donde: 'PlanHorario.CambiarEstado · tabla Transiciones',
    cuando:
      'Dos veces: etapa 2 (Borrador → Generando) y etapa 17 (Generando → Generado, Fallido o Inviable).',
    que: [
      'El salto está en la tabla de transiciones del plan.',
      'El motivo del cambio no viene vacío: es lo único que queda escrito de por qué se movió.',
      'Devuelve una copia; no modifica el plan ni guarda nada.',
    ],
    siFalla:
      'ArgumentException si falta el motivo; InvalidOperationException «No se permite cambiar de X a Y.»',
  },
  {
    id: 'duras',
    capa: 'Motor',
    donde: 'Precalculo y ColocadorVoraz · reglas D-nn y P-nn',
    cuando: 'Etapas 12 a 14, miles de veces, dentro del bucle.',
    que: [
      'Antes de colocar: qué docentes, aulas y colocaciones son siquiera posibles.',
      'Al colocar: cohortes libres, disponibilidad del docente, docente y aula libres, capacidad y recursos.',
    ],
    siFalla:
      'No lanza: descarta el candidato, o deja la asignación pendiente con su motivo. Un horario incompleto es un resultado, no un error.',
  },
  {
    id: 'verificador',
    capa: 'Motor',
    donde: 'VerificadorHorario · 20 códigos en orden fijo',
    cuando: 'Etapa 15, con el horario ya decidido y antes de tocar la base.',
    que: [
      'Recalcula la ocupación desde la salida, sin reutilizar los registros del colocador.',
      'Comprueba las reglas duras otra vez, desde cero.',
    ],
    siFalla:
      'ViolacionesNivel1 deja de estar vacío, EsCorrecto pasa a falso y la generación se cierra como Inviable en vez de Completada.',
  },
  {
    id: 'concurrencia',
    capa: 'Postgres',
    donde: 'iniciar_generacion · p_clave_solicitud y VersionFila',
    cuando: 'Etapa 6 al abrir, y etapa 17 al guardar el estado.',
    que: [
      'La clave de solicitud es «{plan:N}:v{VersionFila}»: el mismo plan y la misma versión no abren dos generaciones.',
      'El cambio de estado viaja con la VersionFila que se leyó, para detectar ediciones simultáneas.',
    ],
    siFalla:
      'Error 23505 o generacion_activa → GeneracionPlanEnCursoException: «El plan ya tiene una generación activa.»',
  },
];
