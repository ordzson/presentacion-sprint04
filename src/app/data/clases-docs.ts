// GENERADO — no editar a mano.
// Fuente: los comentarios /// de Horarios-develop/src/**/*.cs
// script: scripts/gen-clases.py

/** Documentación de un miembro, tal como la escribió quien lo programó. */
export interface DocMiembro {
  /** Firma declarada, en una línea. */
  f?: string;
  /** Resumen. Los párrafos van separados por un salto de línea. */
  s?: string;
  /** [nombre, explicación] de cada parámetro documentado. */
  p?: [string, string][];
  /** [excepción, cuándo se lanza]. */
  e?: [string, string][];
  /** Qué devuelve. */
  r?: string;
  /** Línea del archivo donde empieza la declaración. */
  l?: number;
  /**
   * El miembro no se documenta aquí: hereda la doc del tipo indicado, que es
   * donde vive la explicación (el puerto, no el adaptador).
   */
  h?: string;
}

export interface DocClase {
  s?: string;
  /** Por nombre de miembro, sin la lista de parámetros. */
  m?: Record<string, DocMiembro>;
}

export const DOCS: Record<string, DocClase> = {
  'Horarios.Dominio.Academia.AgrupacionAreaComun': {
    s: 'Conjunto de cursos de área común que se dictan juntos en un período: varias cohortes comparten la misma sesión, con un solo docente y una sola aula. El motor programa la agrupación una vez en lugar de programar cada curso por separado.',
    m: {
      'CohorteIds': { s: 'Cohortes que asisten. Todas quedan ocupadas a la vez, así que ninguna puede tener otra clase en ese horario.' },
      'CursoIds': { s: 'Todos los cursos que se funden en la agrupación, incluido el principal.' },
      'CursoPrincipalId': { s: 'Curso que representa al grupo. Es el que se muestra y el que da nombre a la sesión resultante.' },
    },
  },
  'Horarios.Dominio.Academia.Carrera': {
    s: 'Carrera que ofrece una facultad. De ella cuelgan los pensums y, a través de ellos, los cursos que hay que programar.',
    m: {
      'Codigo': { s: 'Identificador corto y legible de la carrera. Es único.' },
      'DuracionEnSemestres': { s: 'Cuántos semestres dura el plan de estudios. Marca hasta qué semestre puede avanzar una cohorte de esta carrera.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'EstaActiva': { s: 'Una carrera inactiva conserva su historia pero ya no se ofrece al crear cohortes ni planes nuevos.' },
      'NivelAcademico': { s: 'Nivel al que pertenece la carrera, en texto («Licenciatura», «Maestría», …). Es dato descriptivo: el motor no lo usa.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas. Ver `Facultad`.' },
    },
  },
  'Horarios.Dominio.Academia.Cohorte': {
    s: 'Grupo de estudiantes que entró junto a una carrera y avanza junto por el pensum. Es la unidad que recibe clases: dos sesiones no pueden chocar en la misma cohorte.',
    m: {
      'AnioIngreso': { s: 'Año en que entró. Con la carrera y la sección forma el nombre con que se la conoce.' },
      'JornadaId': { s: 'Jornada en que estudia la cohorte (matutina, vespertina, …). Limita las horas en que se le puede programar clase.' },
      'MatriculaEstimada': { s: 'Cuántos estudiantes se esperan. El motor lo usa para descartar aulas que no alcanzan.' },
      'Seccion': { s: 'Letra o clave que separa dos grupos del mismo año e igual carrera («A», «B», …).' },
    },
  },
  'Horarios.Dominio.Academia.CohorteActivaPeriodo': {
    s: 'Estado de una cohorte dentro de un período concreto. La cohorte avanza de semestre período a período, y su matrícula real cambia; esta fila guarda ese dato por período en lugar de sobrescribir el de la cohorte.',
    m: {
      'SemestreAsignado': { s: 'Semestre que cursa la cohorte en este período. Es lo que decide qué cursos del pensum le tocan.' },
    },
  },
  'Horarios.Dominio.Academia.CursoAcademico': {
    s: 'Curso de un pensum. La fila pertenece al pensum en que se creó y no se ve desde ningún otro: dos carreras que enseñan «Matemática I» tienen cada una su propia fila.\n\nQue dos de esas filas sean en realidad el mismo curso se declara aparte, con un `CursoComun`.',
    m: {
      'EsAreaComun': { s: 'Habilita al curso para agruparse con los equivalentes de otras carreras. Sin esta marca el curso solo se dicta a las cohortes de su pensum.' },
      'PensumId': { s: 'Pensum dueño de la fila. No cambia: mover un curso de carrera sería crear otro.' },
      'RequiereLaboratorio': { s: 'Si es verdadero, el motor solo puede colocarlo en aulas de laboratorio.' },
      'TipoLaboratorioRequerido': { s: 'Qué clase de laboratorio necesita («Química», «Redes», …). En nulo significa que cualquier laboratorio sirve.' },
    },
  },
  'Horarios.Dominio.Academia.CursoComun': {
    s: 'Grupo de cursos de pensums distintos que son el mismo curso. Es una declaración permanente del catálogo, no de un período: dice que la «Matemática I» de Arquitectura y la de Ingeniería son la misma materia.\n\nDe aquí salen las `AgrupacionAreaComun` de cada período, que es lo que el motor programa como una sola sesión compartida.',
    m: {
      'CursoIds': { s: 'Cursos que se declaran equivalentes; uno por pensum.' },
    },
  },
  'Horarios.Dominio.Academia.CursoCubiertoPeriodo': {
    s: 'Un curso que se va a programar en un período, con la cohorte que lo trae. No sale de una relación curso-período: es el cruce entre el pensum de la cohorte y el semestre en que esa cohorte está durante el período, la misma regla que aplica el motor al preparar su instantánea.',
    m: {
      'BloquesSemanalesExactos': { s: 'Cuántas sesiones semanales exige el curso.' },
      'DuracionSlots': { s: 'Cuántos bloques seguidos de la jornada ocupa cada sesión. Uno significa una sesión de la duración normal del bloque.' },
    },
  },
  'Horarios.Dominio.Academia.CursoDePensum': {
    s: 'Un curso con la carga que lleva en su pensum. Las dos filas se crean y se editan en la misma operación, así que se devuelven juntas.',
  },
  'Horarios.Dominio.Academia.CursoEnPensum': {
    s: 'La carga programable de un curso: en qué semestre se cursa y cuánta clase semanal exige. Hay exactamente una por curso —el curso ya pertenece al pensum—, así que las dos filas se crean, se editan y se borran juntas.',
    m: {
      'BloquesSemanalesExactos': { s: 'Cuántas sesiones por semana hay que colocar. Es exacto, no un mínimo: el motor coloca esa cantidad ni más ni menos.' },
      'DuracionSlots': { s: 'Cuántos bloques seguidos de la jornada ocupa cada sesión. Uno significa una sesión de la duración normal del bloque.' },
      'PrefiereBloquesConsecutivos': { s: 'Preferencia, no obligación: si se puede, el motor junta las sesiones del curso en días u horas seguidas.' },
      'SemestreAsignado': { s: 'Semestre de la carrera en que toca este curso.' },
    },
  },
  'Horarios.Dominio.Academia.EstadoPensum': {
    s: 'Etapa en que se encuentra un pensum.',
    m: {
      'Borrador': { s: 'Se está armando; todavía no se le asignan cohortes.', l: 38 },
      'EnRetiro': { s: 'Ya no recibe cohortes nuevas, pero las que lo cursan lo terminan.', l: 44 },
      'Retirado': { s: 'Nadie lo cursa; queda solo como historia.', l: 47 },
      'Vigente': { s: 'Es el pensum con que ingresan las cohortes nuevas.', l: 41 },
    },
  },
  'Horarios.Dominio.Academia.EstadoPeriodo': {
    s: 'Etapa en que se encuentra un período académico.',
    m: {
      'Archivado': { s: 'Se guarda solo como historia y no aparece en las listas de trabajo.', l: 18 },
      'Borrador': { s: 'Se está armando: aún se cargan cohortes, cursos y datos base.', l: 9 },
      'Cerrado': { s: 'Terminó. Se conserva para consulta, pero ya no admite cambios.', l: 15 },
      'Vigente': { s: 'Es el período en curso; sobre él se generan y publican horarios.', l: 12 },
    },
  },
  'Horarios.Dominio.Academia.Facultad': {
    s: 'Unidad académica mayor de la universidad. Agrupa carreras y es la frontera de alcance del decano: lo que un decano ve y edita se decide por la facultad.',
    m: {
      'Codigo': { s: 'Identificador corto y legible (por ejemplo «FIA»). Es único y se usa en pantallas y archivos de importación, donde el `Id` no sirve.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico. En nulo mientras la fila vive; no se borran filas físicamente para no romper referencias históricas.' },
      'EstaActiva': { s: 'Una facultad inactiva sigue existiendo y conserva su historia, pero no se ofrece al crear carreras ni planes nuevos.' },
      'VersionFila': { s: 'Contador que la base de datos incrementa en cada actualización. Se envía de vuelta al guardar para detectar ediciones simultáneas: si no coincide, otra persona modificó la fila primero y la escritura se rechaza.' },
    },
  },
  'Horarios.Dominio.Academia.Pensum': {
    s: 'Plan de estudios de una carrera para un año de ingreso determinado. Una carrera tiene varios pensums a la vez porque las cohortes viejas terminan con el pensum con que entraron.',
    m: {
      'AnioCreacion': { s: 'Año desde el cual rige este pensum. Junto con la carrera es lo que distingue una versión del plan de estudios de otra.' },
    },
  },
  'Horarios.Dominio.Academia.PeriodoAcademico': {
    s: 'Ciclo lectivo (por ejemplo «2026 - Primer semestre»). Es el marco temporal de todo: las cohortes están activas en un período y los planes de horario se generan para uno.',
  },
  'Horarios.Dominio.Acceso.EstadoUsuario': {
    s: 'Situación de la cuenta de un usuario frente al ingreso al sistema.',
    m: {
      'Activo': { s: 'Puede iniciar sesión y trabajar con normalidad.', l: 9 },
      'Bloqueado': { s: 'Acceso suspendido a propósito, sin dar de baja la cuenta.', l: 15 },
      'Inactivo': { s: 'Ya no usa el sistema (baja, traslado). Se conserva por su historia.', l: 12 },
    },
  },
  'Horarios.Dominio.Acceso.TipoUsuario': {
    s: 'Rol del usuario en el sistema. Decide qué puede hacer y sobre qué datos: el alcance (qué facultades y carreras ve) se deriva del tipo más los vínculos del usuario.',
    m: {
      'Alumno': { s: 'Consulta el horario publicado de su cohorte.', l: 22 },
      'CoordinadorAcademico': { s: 'Arma los períodos, los planes y los horarios de las carreras a su cargo.', l: 13 },
      'Decano': { s: 'Manda sobre su facultad: ve y aprueba lo de las carreras que dependen de ella.', l: 16 },
      'Docente': { s: 'Consulta su horario y declara su disponibilidad.', l: 19 },
      'Superadministrador': { s: 'Ve y administra todo el sistema, sin límite de facultad.', l: 10 },
    },
  },
  'Horarios.Dominio.Acceso.Usuario': {
    s: 'Persona que usa el sistema. Es la identidad propia de la aplicación; la contraseña y el inicio de sesión los maneja Supabase, no esta tabla.',
    m: {
      'AuthUserId': { s: 'Vínculo con la cuenta de Supabase que autentica a esta persona. En nulo cuando el registro existe pero todavía nadie lo ha reclamado.' },
      'CorreoInstitucional': { s: 'Correo con que ingresa. Es único y es la llave que une el registro con su cuenta de Supabase.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la cuenta vive.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Aulas.Aula': {
    s: 'Espacio donde se dicta clase. El motor le asigna sesiones cuidando dos cosas: que el tipo sirva para el curso y que el cupo alcance para la cohorte.',
    m: {
      'CapacidadMaxima': { s: 'Cuántos estudiantes caben. Una cohorte más grande que esto no se puede colocar aquí.' },
      'Codigo': { s: 'Nombre corto con que se la conoce («LAB-201»). Es único.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'EstaActiva': { s: 'Un aula inactiva (en obra, prestada) conserva su historia pero el motor no la usa.' },
      'NumeroAula': { s: 'Número dentro del piso. En nulo cuando el espacio no lo tiene, como un aula virtual.' },
      'TipoLaboratorioDisponible': { s: 'Qué clase de laboratorio es («Química», «Redes», …). En nulo cuando el aula no es laboratorio o sirve para cualquiera.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Aulas.BloqueHorario': {
    s: 'Una franja concreta del horario: qué día, qué bloque de la jornada y a qué hora del reloj empieza y termina.\n\nEl índice y la hora dicen lo mismo de dos maneras. El índice es con lo que trabaja el motor, porque comparar enteros es barato; la hora es la que se muestra a las personas. Se calculan juntos, en `Crear`, para que no puedan quedar en desacuerdo.',
    m: {
      'Crear': { f: 'public static BloqueHorario Crear(Jornada jornada, int indice)', s: 'Crea el bloque en el primer día activo de la jornada. Atajo para cuando el día no importa, como al mostrar a qué hora cae un bloque.', e: [['InvalidOperationException', 'La jornada no tiene días activos.']], l: 27 },
      'DuracionSlots': { s: 'Cuántos bloques seguidos ocupa.' },
      'Indice': { s: 'Número del primer bloque ocupado, contando desde 1 en el inicio de la jornada.' },
    },
  },
  'Horarios.Dominio.Aulas.DescansoJornada': {
    s: 'Franja de una jornada en la que no se da clase, más allá del receso general: almuerzo de un día concreto, hora cívica, reunión fija. Bloquea esos slots para todos.',
    m: {
      'DuracionSlots': { s: 'Cuántos bloques seguidos abarca.' },
      'IndiceSlotFin': { f: 'public int IndiceSlotFin', s: 'Primer bloque que ya queda libre después del descanso. Es el fin sin incluirlo, para que comparar rangos sea una resta y no haya que sumar o restar uno.', l: 21 },
      'IndiceSlotInicio': { s: 'Primer bloque ocupado por el descanso, numerado desde 1 igual que en la jornada.' },
      'SeSolapa': { f: 'public bool SeSolapa(int indiceSlotInicio, int duracionSlots)', s: 'Indica si el rango dado pisa este descanso. Los rangos que apenas se tocan por el borde —uno termina donde el otro empieza— no se consideran solapados.', l: 27 },
    },
  },
  'Horarios.Dominio.Aulas.DiaSemana': {
    s: 'Día de la semana en que puede haber clase. El orden de los valores es el orden real de la semana, y el motor se apoya en él para ubicar cada sesión en su columna.',
  },
  'Horarios.Dominio.Aulas.Jornada': {
    s: 'Turno de estudio (matutina, vespertina, nocturna, …). Define la rejilla de horas sobre la que se arma el horario: qué días hay clase, a qué hora empieza y termina, cuánto dura cada bloque y dónde cae el receso.',
    m: {
      'BloquesPorDia': { s: 'Cuántos bloques caben en un día de esta jornada. Los bloques se numeran desde 1 hasta este valor.' },
      'DiasActivos': { s: 'Días en que esta jornada tiene clase. Fuera de ellos no se puede programar nada.' },
      'DuracionBloqueMinutos': { s: 'Cuánto dura un bloque de clase. Es la unidad mínima de tiempo: todo se mide en múltiplos de esto.' },
      'DuracionRecesoMinutos': { s: 'Cuánto dura ese receso. Empuja la hora de todos los bloques que vienen después.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'EstaActiva': { s: 'Una jornada inactiva conserva sus horarios pasados pero ya no se ofrece al crear cohortes ni planes nuevos.' },
      'RecesoDespuesDelBloque': { s: 'Número del bloque tras el cual cae el receso general. Cero significa que la jornada no tiene receso.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Aulas.RecursoAsignadoAula': {
    s: 'Un recurso presente en un aula concreta, con cuántos hay. Lleva copiados el código y el nombre para poder mostrar el inventario del aula sin volver al catálogo.',
    m: {
      'Cantidad': { s: 'Cuántas unidades hay en esa aula.' },
    },
  },
  'Horarios.Dominio.Aulas.RecursoAula': {
    s: 'Equipo que un aula puede tener y un curso puede exigir (proyector, pizarra interactiva, microscopios…). Es el catálogo: la lista de recursos que existen.',
    m: {
      'Codigo': { s: 'Clave corta y estable del recurso. Es lo que comparan el curso y el aula cuando el motor decide si el espacio sirve.' },
    },
  },
  'Horarios.Dominio.Aulas.TipoAula': {
    s: 'Para qué sirve un aula. El motor lo cruza con lo que pide el curso: un curso con laboratorio no cabe en un aula solo teórica.',
    m: {
      'Laboratorio': { s: 'Laboratorio; el tipo concreto va en el aula misma.', l: 13 },
      'Mixta': { s: 'Sirve para clase teórica y para práctica.', l: 16 },
      'Teorica': { s: 'Solo clase expositiva.', l: 10 },
      'Virtual': { s: 'No es un espacio físico: clase en línea, sin límite real de cupo.', l: 19 },
    },
  },
  'Horarios.Dominio.Docentes.AsignacionDocenteCurso': {
    s: 'Autorización para que un docente imparta un curso. El motor solo le asigna cursos que tenga autorizados y vigentes.\n\nCarrera, facultad y jornada acotan la autorización: en nulo significa «cualquiera». Así se distingue entre autorizar un curso en general y autorizarlo solo para una carrera o un turno.',
    m: {
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'EstaVigente': { s: 'Una autorización se puede revocar sin borrarla, para dejar constancia de que en su momento existió.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Docentes.Docente': {
    s: 'Profesor a quien el motor puede asignarle clases.\n\n`FacultadIds` son todas las facultades a las que pertenece el docente; la relación es N:M y vive en la tabla puente `docente_facultades`. La lista vacía significa «sin facultad específica», que es lo que antes expresaba la columna `facultad_id` en nulo.',
    m: {
      'CargaMaximaCursos': { s: 'Tope de cursos que puede recibir.' },
      'CargaMinimaCursos': { s: 'Cuántos cursos se espera que reciba como mínimo.' },
      'Codigo': { s: 'Clave corta del docente. Es única y es la que se usa en los archivos de importación.' },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'EsCompartido': { f: 'public bool EsCompartido', s: 'Un docente sin facultades declaradas no queda fuera del alcance de nadie: es el docente compartido entre facultades.', l: 41 },
      'EstaActivo': { s: 'Un docente inactivo (de licencia, dado de baja) conserva su historia pero el motor no le asigna nada.' },
      'NivelPrioridad': { s: 'Cuánta preferencia tiene al repartir la carga: a mayor número, antes se le asignan cursos. Es una preferencia del motor, no una regla dura.' },
      'PerteneceAAlguna': { f: 'public bool PerteneceAAlguna(IEnumerable<Guid> facultadIds)', s: 'Regla única de alcance por facultad. La usan la autorización de cursos y la disponibilidad: basta una facultad en común para que el decano lo alcance.', l: 47 },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Planes.EstadoHorario': {
    s: 'Etapa en que se encuentra un plan de horario, desde que se crea hasta que se archiva. Los saltos permitidos entre estados están en `PlanHorario`; aquí solo se nombra qué significa cada uno.',
    m: {
      'Aprobado': { s: 'Aprobado, pero todavía no visible para docentes y alumnos.', l: 26 },
      'Archivado': { s: 'Retirado de circulación; se guarda solo como historia.', l: 32 },
      'Borrador': { s: 'Recién creado: se elige su alcance y se revisan los datos base.', l: 11 },
      'EnRevision': { s: 'Alguien lo está revisando y puede ajustarlo a mano.', l: 20 },
      'Fallido': { s: 'La generación se cayó por un error. Se puede volver a borrador y reintentar.', l: 35 },
      'Generado': { s: 'El motor terminó y produjo un horario completo.', l: 17 },
      'Generando': { s: 'El motor está trabajando en él. Es un estado pasajero.', l: 14 },
      'Inviable': { s: 'El motor terminó bien pero no existe horario posible con estos datos: faltan aulas, docentes u horas. Hay que corregir los datos y reintentar.', l: 39 },
      'PendienteAprobacion': { s: 'Listo y esperando la firma de quien aprueba.', l: 23 },
      'Publicado': { s: 'Publicado: es el horario oficial que todos consultan.', l: 29 },
    },
  },
  'Horarios.Dominio.Planes.PlanHorario': {
    s: 'Encargo de armar un horario: qué período cubre, qué parte de él y en qué etapa va. Es el objeto que el usuario crea, manda a generar, revisa y publica.',
    m: {
      'CambiarEstado': { f: 'public PlanHorario CambiarEstado(EstadoHorario nuevoEstado, string motivo)', s: 'Devuelve una copia del plan en el estado nuevo, si el salto está permitido. No modifica el plan original ni guarda nada: eso queda del lado de quien persiste.', p: [['motivo', 'Explicación del cambio. Es obligatoria porque es lo único que queda escrito de por qué se movió el plan.']], e: [['ArgumentException', 'El motivo viene vacío o solo con espacios.'], ['InvalidOperationException', 'El salto de estado no está permitido.']], l: 69 },
      'CarreraIds': { s: 'Carreras que cubre el plan. Vacío significa todas las del período; ver `CubreTodoElPeriodo`.' },
      'CubreTodoElPeriodo': { f: 'public bool CubreTodoElPeriodo', s: 'Un plan sin carreras ni jornadas elegidas cubre todo el período. Es el comportamiento histórico y el valor por omisión al crear un borrador.', l: 37 },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'HorarioOrigenId': { s: 'Plan del que se derivó este, cuando es una versión nueva de otro. En nulo cuando se creó desde cero.' },
      'JornadaIds': { s: 'Jornadas que cubre el plan. Vacío significa todas.' },
      'MotivoEstado': { s: 'Por qué está en el estado actual. Lo escribe quien hace el cambio y es obligatorio, para que el historial se pueda leer después.' },
      'NumeroVersion': { s: 'Cuál versión es dentro de su cadena de derivados. Empieza en 1 y sube con cada versión nueva.' },
      'VersionFila': { s: 'Contador de versión para detectar ediciones simultáneas.' },
    },
  },
  'Horarios.Dominio.Planes.TipoPlanHorario': {
    s: 'Para qué es el plan de horario. Ambos tipos se generan igual, pero cubren calendarios distintos: uno el semestre entero, el otro la semana de evaluaciones.',
    m: {
      'Clases': { s: 'Horario semanal de clases del período.', l: 10 },
      'Examenes': { s: 'Calendario del período de exámenes.', l: 13 },
    },
  },
  'Horarios.Contratos.Academia.ActivarCohortePeriodoSolicitud': {
    s: 'Datos para declarar que una cohorte cursa en un período y en qué semestre va. Sin esta declaración la cohorte no entra en la generación de ese período.',
    m: {
      'MatriculaEstimada': { s: 'Matrícula esperada para este período, que puede diferir de la que tenía al ingresar.' },
      'SemestreAsignado': { s: 'Semestre que cursa la cohorte en este período; decide qué cursos del pensum le tocan.' },
    },
  },
  'Horarios.Contratos.Academia.ActualizarAgrupacionAreaComunSolicitud': {
    s: 'Datos para editar una agrupación de área común. Las listas reemplazan por completo a las anteriores: lo que no venga deja de pertenecer a la agrupación.',
  },
  'Horarios.Contratos.Academia.ActualizarCarreraSolicitud': {
    s: 'Datos para editar una carrera. Se envían todos los campos.',
    m: {
      'EstaActiva': { s: 'Ponerla en falso la retira de las listas de trabajo sin borrarla.' },
      'FacultadId': { s: 'Permite mover la carrera a otra facultad.' },
    },
  },
  'Horarios.Contratos.Academia.ActualizarCohorteSolicitud': {
    s: 'Datos para editar una cohorte. La carrera, el pensum y el año de ingreso no se pueden cambiar: son lo que define a la cohorte.',
  },
  'Horarios.Contratos.Academia.ActualizarCursoComunSolicitud': {
    s: 'Datos para editar un grupo de cursos equivalentes. La lista reemplaza por completo a la anterior.',
  },
  'Horarios.Contratos.Academia.ActualizarCursoEnPensumSolicitud': {
    s: 'Datos para editar un curso y su carga en la malla. Se envían todos los campos. El pensum no se puede cambiar: mover un curso a otra carrera sería crear otro curso.\n\nQuitar la marca de área común saca al curso del grupo de equivalentes en que estuviera: si ya no se cursa junto con otras carreras, la equivalencia dejó de ser cierta.',
    m: {
      'Id': { s: 'Identificador del curso, no el de la fila de la malla.' },
    },
  },
  'Horarios.Contratos.Academia.ActualizarFacultadSolicitud': {
    s: 'Datos para editar una facultad. Se envían todos los campos.',
    m: {
      'EstaActiva': { s: 'Ponerla en falso la retira de las listas de trabajo sin borrarla.' },
    },
  },
  'Horarios.Contratos.Academia.ActualizarPensumSolicitud': {
    s: 'Datos para editar un pensum. La carrera no se puede cambiar: un pensum pertenece de por vida a la carrera con que se creó.',
  },
  'Horarios.Contratos.Academia.ActualizarPeriodoSolicitud': {
    s: 'Datos para editar un período. Se envían todos los campos, no solo los que cambian: lo que llegue reemplaza a lo que había.',
  },
  'Horarios.Contratos.Academia.CrearAgrupacionAreaComunSolicitud': {
    s: 'Datos para unir varios cursos de área común en una sola clase compartida por varias cohortes durante un período.',
    m: {
      'CohorteIds': { s: 'Cohortes que asisten. Todas quedan ocupadas a la vez.' },
      'CreadaPorId': { s: 'Usuario que arma la agrupación, para dejar constancia.' },
      'CursoIds': { s: 'Todos los cursos que se funden, incluido el principal.' },
      'CursoPrincipalId': { s: 'Curso que representa al grupo y le da nombre a la sesión resultante.' },
    },
  },
  'Horarios.Contratos.Academia.CrearCarreraSolicitud': {
    s: 'Datos para dar de alta una carrera dentro de una facultad. El identificador lo pone el sistema, y la carrera nace activa.',
    m: {
      'Codigo': { s: 'Clave corta y única de la carrera.' },
      'DuracionEnSemestres': { s: 'Cuántos semestres dura el plan de estudios.' },
      'NivelAcademico': { s: 'Nivel al que pertenece, en texto («Licenciatura», «Maestría», …).' },
    },
  },
  'Horarios.Contratos.Academia.CrearCohorteSolicitud': {
    s: 'Datos para registrar un grupo de estudiantes que entra junto a una carrera.',
    m: {
      'JornadaId': { s: 'Turno en que estudia; limita las horas en que se le puede programar clase.' },
      'MatriculaEstimada': { s: 'Cuántos estudiantes se esperan; se usa para descartar aulas que no alcanzan.' },
      'PensumId': { s: 'Plan de estudios con que entra la cohorte y con el que se gradúa, aunque después la carrera cambie de pensum.' },
      'Seccion': { s: 'Letra o clave que la separa de otro grupo del mismo año e igual carrera («A», «B», …).' },
    },
  },
  'Horarios.Contratos.Academia.CrearCursoComunSolicitud': {
    s: 'Datos para declarar que varios cursos de pensums distintos son el mismo curso. La lista reemplaza por completo a la anterior: lo que no venga deja de pertenecer al grupo.',
    m: {
      'CursoIds': { s: 'Cursos equivalentes; al menos dos, todos marcados como área común y cada uno de un pensum distinto.' },
    },
  },
  'Horarios.Contratos.Academia.CrearCursoEnPensumSolicitud': {
    s: 'Datos para crear un curso dentro de un pensum. No hay alta de curso fuera de un pensum: el curso nace donde se va a cursar y solo ahí se ve.',
    m: {
      'BloquesSemanalesExactos': { s: 'Cuántas sesiones por semana hay que colocar. Es exacto, no un mínimo.' },
      'Codigo': { s: 'Clave corta y única del curso.' },
      'DuracionSlots': { s: 'Cuántos bloques seguidos de la jornada ocupa cada sesión.' },
      'EsAreaComun': { s: 'Habilita al curso para agruparse con sus equivalentes de otras carreras mediante un `CrearCursoComunSolicitud`.' },
      'PensumId': { s: 'Pensum dueño del curso.' },
      'PrefiereBloquesConsecutivos': { s: 'Preferencia, no obligación: si se puede, el motor junta las sesiones del curso.' },
      'RequiereLaboratorio': { s: 'Si es verdadero, solo se podrá programar en aulas de laboratorio.' },
      'SemestreAsignado': { s: 'Semestre de la carrera en que toca el curso.' },
      'TipoLaboratorioRequerido': { s: 'Qué clase de laboratorio necesita. En nulo significa que cualquiera sirve.' },
    },
  },
  'Horarios.Contratos.Academia.CrearFacultadSolicitud': {
    s: 'Datos para dar de alta una facultad. El identificador lo pone el sistema, y la facultad nace activa.',
    m: {
      'Codigo': { s: 'Clave corta y única de la facultad (por ejemplo «FIA»).' },
      'NombreDecano': { s: 'Nombre de quien la dirige. Opcional: sirve para mostrarlo en pantalla y no tiene relación con el usuario decano que inicia sesión.' },
    },
  },
  'Horarios.Contratos.Academia.CrearPensumSolicitud': {
    s: 'Datos para crear una versión del plan de estudios de una carrera. Nace en borrador.',
    m: {
      'AnioCreacion': { s: 'Año desde el cual rige. Junto con la carrera distingue una versión del pensum de otra.' },
    },
  },
  'Horarios.Contratos.Academia.CrearPeriodoSolicitud': {
    s: 'Datos para abrir un período académico. Nace en borrador.',
  },
  'Horarios.Contratos.Academia.EstadoPensumDto': {
    s: 'Estado de un pensum tal como viaja hacia y desde la interfaz. Es copia de `EstadoPensum` del dominio.',
  },
  'Horarios.Contratos.Academia.EstadoPeriodoDto': {
    s: 'Estado de un período tal como viaja hacia y desde la interfaz. Es copia de `EstadoPeriodo` del dominio: los contratos no dependen del dominio para que un cambio interno no rompa a quien los consume.',
  },
  'Horarios.Contratos.Academia.SolicitudSugerenciaSeccionDto': {
    s: 'Propuesta de partir una cohorte en una sección más porque no cabe en ninguna aula disponible. Se registra como sugerencia, no se aplica sola: alguien tiene que decidir.',
    m: {
      'CapacidadMaximaDisponible': { s: 'Cupo del aula más grande que se podía usar. Debe ser menor que la matrícula; si cabe, no hay nada que sugerir.' },
      'CursoId': { s: 'Curso concreto en que no cupo, cuando el problema es de un solo curso. En nulo cuando afecta a la cohorte entera.' },
      'HorarioId': { s: 'Plan de horario donde se detectó el problema.' },
      'MatriculaDetectada': { s: 'Cuántos estudiantes hay que sentar.' },
      'Motivo': { s: 'Explicación en texto de por qué se propone.' },
      'SeccionSugerida': { s: 'Letra o clave propuesta para la sección nueva.' },
    },
  },
  'Horarios.Contratos.Academia.SugerenciaSeccionDto': {
    s: 'Sugerencia de sección ya registrada, tal como se muestra en pantalla.',
    m: {
      'Estado': { s: 'En qué va la sugerencia (pendiente, aceptada, rechazada). Viaja como texto porque quien la resuelve es la base de datos, no esta capa.' },
    },
  },
  'Horarios.Contratos.Acceso.CrearUsuarioInicialSolicitud': {
    s: 'Datos para crear la primera cuenta administrativa de una instalación nueva, cuando todavía no hay nadie que pueda dar de alta a otros.',
    m: {
      'AuthUserId': { s: 'Cuenta de Supabase que autentica a la persona. En nulo cuando el registro se crea antes de que la persona se dé de alta.' },
      'CorreoInstitucional': { s: 'Correo con que ingresa; es la llave que une este registro con su cuenta de Supabase.' },
      'Rol': { s: 'Rol que se le concede en la tabla de permisos. Va aparte del `Tipo`: el tipo dice qué es la persona, el rol qué puede hacer.' },
    },
  },
  'Horarios.Contratos.Acceso.TipoUsuarioDto': {
    s: 'Tipos de usuario que se pueden crear por esta vía. Es a propósito más corto que el `TipoUsuario` del dominio: la cuenta inicial siempre es administrativa, nunca un docente ni un alumno.',
  },
  'Horarios.Contratos.Aulas.ActualizarAulaSolicitud': {
    s: 'Datos para editar un aula. Se envían todos los campos, no solo los que cambian.',
    m: {
      'EstaActiva': { s: 'Ponerla en falso (obra, préstamo) la saca de la generación sin borrarla ni perder su historia.' },
    },
  },
  'Horarios.Contratos.Aulas.ActualizarDescansoJornadaSolicitud': {
    s: 'Datos para mover o redimensionar un descanso. La jornada no se puede cambiar: para eso se borra el descanso y se crea otro.',
  },
  'Horarios.Contratos.Aulas.ActualizarJornadaSolicitud': {
    s: 'Datos para editar una jornada. Se envían todos los campos.\n\nCambiar los bloques o las horas altera la rejilla de todo lo que ya estaba programado en esa jornada, así que conviene hacerlo antes de generar.',
  },
  'Horarios.Contratos.Aulas.ActualizarRecursoAulaSolicitud': {
    s: 'Datos para editar un recurso del catálogo.',
  },
  'Horarios.Contratos.Aulas.AsignarRecursoAulaSolicitud': {
    s: 'Datos para declarar que un aula tiene cierto recurso, y cuántas unidades.',
  },
  'Horarios.Contratos.Aulas.CrearAulaSolicitud': {
    s: 'Datos para dar de alta un aula. Nace activa.',
    m: {
      'CapacidadMaxima': { s: 'Cuántos estudiantes caben.' },
      'Codigo': { s: 'Clave corta y única con que se la conoce («LAB-201»).' },
      'NumeroAula': { s: 'Número dentro del piso. En nulo cuando el espacio no lo tiene, como un aula virtual.' },
      'TipoLaboratorioDisponible': { s: 'Qué clase de laboratorio es. En nulo cuando no lo es o cuando sirve para cualquiera.' },
    },
  },
  'Horarios.Contratos.Aulas.CrearDescansoJornadaSolicitud': {
    s: 'Datos para bloquear una franja de la jornada en la que no se dará clase, aparte del receso general: almuerzo de un día concreto, hora cívica, reunión fija.',
    m: {
      'DuracionSlots': { s: 'Cuántos bloques seguidos abarca.' },
      'IndiceSlotInicio': { s: 'Primer bloque ocupado por el descanso, numerado desde 1 igual que en la jornada.' },
    },
  },
  'Horarios.Contratos.Aulas.CrearJornadaSolicitud': {
    s: 'Datos para dar de alta una jornada, es decir la rejilla de horas sobre la que se arma el horario. Nace activa.',
    m: {
      'BloquesPorDia': { s: 'Cuántos bloques caben en un día. Se numeran desde 1.' },
      'DiasActivos': { s: 'Días en que hay clase. Fuera de ellos no se programa nada.' },
      'DuracionBloqueMinutos': { s: 'Cuánto dura un bloque; es la unidad mínima de tiempo del horario.' },
      'DuracionRecesoMinutos': { s: 'Cuánto dura ese receso; empuja la hora de todos los bloques siguientes sin gastar bloques.' },
      'RecesoDespuesDelBloque': { s: 'Número del bloque tras el cual cae el receso general. Cero significa sin receso.' },
    },
  },
  'Horarios.Contratos.Aulas.CrearRecursoAulaSolicitud': {
    s: 'Datos para agregar un equipo al catálogo de recursos que un aula puede tener y un curso puede exigir.',
    m: {
      'Codigo': { s: 'Clave corta y estable. Es lo que comparan el curso y el aula cuando el motor decide si el espacio sirve.' },
    },
  },
  'Horarios.Contratos.Aulas.DesasignarRecursoAulaSolicitud': {
    s: 'Datos para quitarle un recurso a un aula. El recurso sigue existiendo en el catálogo.',
  },
  'Horarios.Contratos.Aulas.DiaSemanaDto': {
    s: 'Día de la semana tal como viaja hacia y desde la interfaz. Es copia de `DiaSemana` del dominio.',
  },
  'Horarios.Contratos.Aulas.TipoAulaDto': {
    s: 'Tipo de aula tal como viaja hacia y desde la interfaz. Es copia de `TipoAula` del dominio: los contratos no dependen del dominio.',
  },
  'Horarios.Contratos.Docentes.ActualizarDocenteSolicitud': {
    s: 'Datos para editar un docente. Se envían todos los campos, no solo los que cambian.\n\n`FacultadIds` reemplaza el conjunto completo de facultades del docente: lo que no venga en la lista se desasigna. Vacía o nula lo deja sin facultad específica.',
    m: {
      'EstaActivo': { s: 'Ponerlo en falso (licencia, baja) hace que el motor deje de asignarle clases, sin borrar su historia.' },
      'NivelPrioridad': { s: 'Cuánta preferencia tiene al repartir la carga: a mayor número, antes se le asignan cursos.' },
    },
  },
  'Horarios.Contratos.Docentes.AutorizarCursoDocenteSolicitud': {
    s: 'Datos para autorizar a un docente a impartir un curso. Sin esta autorización el motor nunca le asignará ese curso.\n\nCarrera, facultad y jornada acotan la autorización; en nulo significan «cualquiera». Así se distingue autorizar un curso en general de autorizarlo solo para una carrera o un turno.',
  },
  'Horarios.Contratos.Docentes.CrearDocenteSolicitud': {
    s: 'Datos para dar de alta un docente. Nace activo.\n\n`FacultadIds` son las facultades a las que se asigna el docente. Vacía o nula significa «sin facultad específica», el mismo sentido que tenía el antiguo `FacultadId` en nulo.',
    m: {
      'CargaMaximaCursos': { s: 'Tope de cursos que puede recibir.' },
      'CargaMinimaCursos': { s: 'Cuántos cursos se espera que reciba como mínimo.' },
      'Codigo': { s: 'Clave corta y única del docente; es la que se usa en los archivos de importación.' },
      'NivelPrioridad': { s: 'Cuánta preferencia tiene al repartir la carga: a mayor número, antes se le asignan cursos. Es preferencia, no regla dura.' },
    },
  },
  'Horarios.Contratos.Docentes.DisponibilidadDocenteDto': {
    s: 'Disponibilidad ya declarada por un docente para un período, tal como se lee.',
    m: {
      'EstaConfirmada': { s: 'Si el docente ya cerró su declaración. Mientras esté en falso, la generación está trabajando con datos que aún pueden cambiar.' },
    },
  },
  'Horarios.Contratos.Docentes.DocenteResumenDto': {
    s: 'Docente tal como se muestra en listas y fichas. Es la versión de lectura: trae lo que la pantalla necesita, sin fechas de auditoría ni versión de fila.\n\n`FacultadIds` trae todas las facultades del docente. Lista vacía = sin facultad específica.',
  },
  'Horarios.Contratos.Docentes.GuardarDisponibilidadDocenteSolicitud': {
    s: 'Datos para guardar la disponibilidad de un docente en un período.\n\n`Slots` reemplaza la rejilla completa: lo que no venga en la lista queda como estaba antes de esta declaración.',
    m: {
      'Confirmar': { s: 'Verdadero cierra la declaración: el docente da por terminada su respuesta. Falso la guarda como avance, para seguir después.' },
    },
  },
  'Horarios.Contratos.Docentes.SlotDisponibilidadDto': {
    s: 'Una casilla de la rejilla semanal, con la respuesta del docente sobre si puede dar clase en ella.',
    m: {
      'EstaDisponible': { s: 'Falso marca la casilla como no disponible; el motor no colocará nada del docente ahí.' },
      'IndiceSlot': { s: 'Número del bloque dentro del día, contando desde 1.' },
    },
  },
  'Horarios.Contratos.Importaciones.ArchivoImportacionDto': {
    s: 'Datos del archivo que se está importando, sin su contenido. Sirve para validar de antemano lo barato —nombre, extensión, tamaño, plantilla declarada— antes de gastar tiempo leyendo los bytes.',
    m: {
      'CodigoPlantilla': { s: 'Qué plantilla dice seguir el archivo.' },
      'TamanoBytes': { s: 'Tamaño del archivo. Cero se rechaza como archivo vacío.' },
      'TipoArchivo': { s: 'Formato declarado. Se comprueba que coincida con la extensión del nombre.' },
      'VersionPlantilla': { s: 'Con qué versión del formato se armó.' },
    },
  },
  'Horarios.Contratos.Importaciones.ErrorImportacionDto': {
    s: 'Un problema encontrado al validar un archivo de importación, ubicado con la precisión que se tenga: el archivo entero, una hoja, una fila o una celda.\n\nLos campos de ubicación van en nulo cuando el error no es de ahí. Un archivo sin columnas obligatorias, por ejemplo, no tiene fila.',
    m: {
      'Codigo': { s: 'Clave estable del error, de `CodigosErrorImportacion`. Es lo que se compara en el código; el mensaje es para leer.' },
      'Columna': { s: 'Nombre de la columna con el problema.' },
      'Fila': { s: 'Número de fila del archivo, contando la de encabezados.' },
      'Hoja': { s: 'Hoja del libro, en archivos XLSX. En nulo para CSV.' },
      'Mensaje': { s: 'Explicación en español para quien está importando.' },
      'ValorRecibido': { s: 'Lo que traía la celda, para que se vea qué hay que corregir. En nulo cuando el error no es de un valor.' },
    },
  },
  'Horarios.Contratos.Importaciones.FilaVistaPreviaImportacionDto': {
    s: 'Una fila leída del archivo, con sus valores tal cual venían: sin convertir a números ni a fechas. La vista previa muestra lo que hay, no lo que se guardaría.',
    m: {
      'Hoja': { s: 'Hoja de la que salió, en archivos XLSX. En nulo para CSV.' },
      'NumeroFila': { s: 'Fila del archivo, para poder señalarla al reportar errores.' },
      'Valores': { s: 'Valor de cada columna, indexado por el nombre de la columna.' },
    },
  },
  'Horarios.Contratos.Importaciones.PlantillaImportacionDto': {
    s: 'Identifica una plantilla de importación: qué se está cargando y con qué versión del formato. Es la referencia mínima; la lista de columnas vive en `PlantillaImportacionVersionadaDto`.',
    m: {
      'Codigo': { s: 'Qué se importa («DOCENTES», «ALUMNOS», …).' },
      'Version': { s: 'Versión del formato. Se guarda con cada archivo para poder leer mañana un archivo hecho con la plantilla de hoy.' },
    },
  },
  'Horarios.Contratos.Importaciones.PlantillaImportacionVersionadaDto': {
    s: 'Definición completa de una versión de plantilla: qué columnas espera y en qué formato. Es contra esto que se valida un archivo cargado.',
    m: {
      'Columnas': { s: 'Nombres de columna esperados, en el orden en que deben venir.' },
    },
  },
  'Horarios.Contratos.Importaciones.ResultadoValidacionImportacionDto': {
    s: 'Veredicto de validar un archivo contra su plantilla.',
    m: {
      'EsValido': { s: 'Verdadero solo si no hay ni un error. La validación no se detiene en el primero: recorre todo para reportar de una vez lo que hay que corregir.' },
    },
  },
  'Horarios.Contratos.Importaciones.ResultadoVistaPreviaImportacionDto': {
    s: 'Resultado de una vista previa: las columnas que se detectaron, las primeras filas y los errores encontrados al leer.',
    m: {
      'EsValido': { s: 'Falso cuando hay errores. Aun así pueden venir filas: se muestran para que se entienda de dónde salió el problema.' },
    },
  },
  'Horarios.Contratos.Importaciones.TipoArchivoImportacion': {
    s: 'Formato del archivo que se importa. Decide cómo se lee el contenido: el CSV se lee como texto y el XLSX como libro de Excel.',
  },
  'Horarios.Contratos.Importaciones.VistaPlantillaImportacionDto': {
    s: 'Plantilla lista para mostrarle a quien va a importar: lo mismo que `PlantillaImportacionVersionadaDto` más el nombre legible.',
    m: {
      'NombrePlantilla': { s: 'Título en español para la pantalla («Plantilla de Docentes»). Se deriva del código, no se guarda.' },
    },
  },
  'Horarios.Contratos.Importaciones.VistaPreviaCsvSolicitud': {
    s: 'Petición de vista previa para un archivo CSV, cuyo contenido ya viene como texto. El equivalente binario es `VistaPreviaImportacionSolicitud`.',
    m: {
      'MaximoFilas': { s: 'Tope de filas a devolver.' },
    },
  },
  'Horarios.Contratos.Importaciones.VistaPreviaImportacionSolicitud': {
    s: 'Petición de leer un archivo binario (XLSX) y devolver sus primeras filas, para que quien importa vea qué se entendió antes de confirmar nada.',
    m: {
      'MaximoFilas': { s: 'Tope de filas a devolver. La vista previa es para revisar, no para cargar el archivo entero en pantalla.' },
    },
  },
  'Horarios.Contratos.Planes.ActualizarPlanSolicitud': {
    s: 'Datos para editar un plan de horario.\n\nEl alcance se reemplaza por completo con cada actualización: lo que no venga en las listas deja de pertenecer al plan. Vacías vuelven a «todo el período».',
  },
  'Horarios.Contratos.Planes.CambiarEstadoPlanSolicitud': {
    s: 'Datos para mover un plan de una etapa a otra. No todo salto está permitido: el recorrido válido lo decide `PlanHorario` en el dominio.',
    m: {
      'CambiadoPorId': { s: 'Usuario que lo hace, para el historial.' },
      'Motivo': { s: 'Por qué se hace el cambio. Es obligatorio: es lo único que queda escrito de la decisión.' },
    },
  },
  'Horarios.Contratos.Planes.ConteosRevisionPlan': {
    s: 'Cuánto hay cargado de cada cosa que la generación necesita. Son los números que respaldan el veredicto de `ResultadoRevisionPlanDto`: en vez de decir solo «faltan docentes», se puede ver cuántos hay.',
    m: {
      'AulasActivas': { s: 'Cuántas aulas hay disponibles para colocar clases.' },
      'CohortesActivas': { s: 'Cuántas cohortes cursan en el período, dentro del alcance del plan. Sin ninguna no hay nada que programar.' },
      'CohortesSinCursos': { s: 'Cuántas de esas cohortes no tienen ni un curso que cursar. Suele delatar un pensum incompleto o un semestre mal asignado.' },
      'DocentesAutorizados': { s: 'Cuántos docentes tienen al menos un curso autorizado. Sin autorización el motor no les puede asignar nada.' },
      'DocentesConDisponibilidad': { s: 'Cuántos declararon sus horas. Un docente autorizado pero sin disponibilidad tampoco sirve.' },
      'ExistePeriodo': { s: 'Falso si el plan apunta a un período que ya no está.' },
    },
  },
  'Horarios.Contratos.Planes.CrearPlanSolicitud': {
    s: 'Datos para crear un plan de horario. Nace en borrador; generarlo es un paso aparte.\n\n`CarreraIds` y `JornadaIds` delimitan el alcance. Vacías o nulas significan «todo el período»: la generación toma todas las carreras y jornadas con cohortes activas, que es el comportamiento histórico.',
    m: {
      'HorarioOrigenId': { s: 'Plan del que se deriva este, cuando es una versión nueva de otro. En nulo cuando se crea desde cero.' },
    },
  },
  'Horarios.Contratos.Planes.EstadoGeneracionDto': {
    s: 'En qué va una corrida del motor. Es aparte del estado del plan: una generación es un intento concreto, y un plan puede acumular varios.',
    m: {
      'Cancelada': { s: 'Alguien la detuvo antes de que terminara.', l: 25 },
      'Completada': { s: 'Terminó y produjo un horario.', l: 16 },
      'Fallida': { s: 'Se cayó por un error. El detalle está en los mensajes.', l: 19 },
      'Generando': { s: 'El motor está trabajando.', l: 13 },
      'Inviable': { s: 'Terminó bien pero no hay horario posible con estos datos.', l: 22 },
      'Pendiente': { s: 'Encolada, todavía no empieza.', l: 10 },
    },
  },
  'Horarios.Contratos.Planes.EstadoHorarioDto': {
    s: 'Etapa de un plan tal como viaja hacia y desde la interfaz. Es copia de `EstadoHorario` del dominio, donde está explicado qué significa cada valor.',
  },
  'Horarios.Contratos.Planes.GeneracionHorarioDto': {
    s: 'Registro de una corrida del motor: cuándo fue, cuánto tardó, cómo salió y qué avisó. Queda guardado para poder comparar intentos y auditar qué se hizo.',
    m: {
      'DuracionMs': { s: 'Cuánto tardó de reloj; en nulo si aún no termina.' },
      'FinalizadaEn': { s: 'En nulo mientras la generación sigue en curso.' },
      'PuntajeDesglose': { s: 'De dónde viene el puntaje final, preferencia por preferencia.' },
      'PuntajeFinal': { s: 'Calidad al terminar; comparado con el inicial dice cuánto ganó la fase de mejora.' },
      'PuntajeInicial': { s: 'Calidad de la primera colocación. Menos es mejor.' },
      'TotalSesionesPendientes': { s: 'Cuántas clases no se pudieron colocar.' },
      'TotalViolacionesDuras': { s: 'Cuántas reglas duras quedaron rotas. Debería ser cero: si no lo es, el horario no se puede publicar.' },
      'VersionMotor': { s: 'Versión del motor que corrió. Un resultado solo se puede comparar de verdad con otro de la misma versión.' },
    },
  },
  'Horarios.Contratos.Planes.HorarioGeneradoDto': {
    s: 'Una página del horario generado, con sus problemas al lado.\n\nLas clases vienen paginadas porque un período completo son miles; los conflictos y pendientes, en cambio, vienen enteros: son pocos y hay que verlos todos.',
    m: {
      'Conflictos': { s: 'Reglas rotas en el horario. Con cualquiera, no se publica.' },
      'Pendientes': { s: 'Clases que no se pudieron colocar.' },
      'TotalSesiones': { s: 'Total de clases del horario, no de esta página.' },
    },
  },
  'Horarios.Contratos.Planes.IncidenciaHorarioGeneradoDto': {
    s: 'Un problema del horario generado, listo para mostrar.',
    m: {
      'EsRestriccionDura': { s: 'Verdadero cuando es una regla rota, no una preferencia incumplida. Separa lo que impide publicar de lo que solo se puede mejorar.' },
    },
  },
  'Horarios.Contratos.Planes.MensajeGeneracionDto': {
    s: 'Aviso producido durante una generación, ya listo para mostrar.',
    m: {
      'Codigo': { s: 'Clave estable del aviso, para tratarlo en código.' },
      'SesionId': { s: 'Sesión a la que se refiere, si es de una sola.' },
      'Severidad': { s: 'Qué tan grave es («alta», «media», «baja»). Viaja como texto porque quien la clasifica es la base de datos.' },
    },
  },
  'Horarios.Contratos.Planes.ResultadoRevisionPlanDto': {
    s: 'Diagnóstico previo a generar: dice si vale la pena arrancar el motor y qué falta si no. Evita esperar una generación completa para descubrir que faltaban datos base.',
    m: {
      'DatosFaltantes': { s: 'Lista en español de lo que falta, para mostrar tal cual.' },
      'PuedeGenerarse': { s: 'Verdadero cuando están todos los datos indispensables. No promete que salga un horario completo, solo que hay con qué intentarlo.' },
    },
  },
  'Horarios.Contratos.Planes.SesionHorarioGeneradoDto': {
    s: 'Una clase del horario generado, lista para pintar en pantalla.\n\nTrae el nombre y el identificador de cada cosa: el nombre para mostrar y el identificador para poder filtrar o navegar sin volver a consultar la base de datos.',
    m: {
      'Dia': { s: 'Día en texto, como se muestra.' },
      'DuracionSlots': { s: 'Cuántos slots ocupa.' },
      'IndiceSlotInicio': { s: 'Primer slot ocupado dentro del día.' },
      'MinutoFin': { s: 'Minuto del día en que termina.' },
      'MinutoInicio': { s: 'Minuto del día en que empieza, contando desde medianoche. Va calculado para que la pantalla ubique la clase sin conocer la jornada.' },
    },
  },
  'Horarios.Contratos.Planes.TipoPlanHorarioDto': {
    s: 'Para qué es el plan, tal como viaja hacia y desde la interfaz. Es copia de `TipoPlanHorario` del dominio.',
  },
  'Horarios.Aplicacion.Academia.CrearCarrera': {
    s: 'Da de alta una carrera dentro de una facultad. Normaliza el código a mayúsculas y comprueba que no haya otra activa con ese código antes de escribir.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Carrera> EjecutarAsync(CrearCarreraSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea la carrera y la devuelve ya guardada.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta la facultad, el código, el nombre o el nivel.'], ['ArgumentOutOfRangeException', 'La duración en semestres no es positiva.'], ['InvalidOperationException', 'Ya hay una carrera activa con ese código.']], l: 30 },
    },
  },
  'Horarios.Aplicacion.Academia.CrearFacultad': {
    s: 'Da de alta una facultad. Normaliza el código a mayúsculas y comprueba que no haya otra activa con ese código antes de escribir.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Facultad> EjecutarAsync(CrearFacultadSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea la facultad y la devuelve ya guardada.\n\nLa comprobación de código repetido es una cortesía para dar un mensaje claro, no la garantía: quien la sostiene es la restricción de unicidad de la base de datos, que además cubre el caso de dos altas a la vez.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta el código o el nombre.'], ['InvalidOperationException', 'Ya hay una facultad activa con ese código.']], l: 33 },
    },
  },
  'Horarios.Aplicacion.Academia.GeneradorCodigosAcademicos': {
    s: 'Genera identificadores internos legibles sin pedirle al usuario que invente uno. Conserva los códigos históricos y ocupa el primer consecutivo disponible de cada tipo.',
    m: {
      'Carrera': { f: 'public static string Carrera(IEnumerable<string> existentes)', s: 'Siguiente código libre de carrera, con la forma «CAR-001».', l: 14 },
      'Curso': { f: 'public static string Curso(IEnumerable<string> existentes)', s: 'Siguiente código libre de curso, con la forma «CUR-0001».', l: 18 },
      'Facultad': { f: 'public static string Facultad(IEnumerable<string> existentes)', s: 'Siguiente código libre de facultad, con la forma «FAC-001».', l: 10 },
      'Siguiente': { f: 'private static string Siguiente(string prefijo, IEnumerable<string> existentes, int digitos)', s: 'Busca desde el 1 el primer número que no esté ocupado. Rellenar huecos, en vez de seguir desde el mayor, mantiene los códigos cortos aunque se borren filas.\n\nLa comparación no distingue mayúsculas, para que «fac-001» no vuelva a entregarse como si estuviera libre.', e: [['InvalidOperationException', 'Se agotaron los códigos de ese prefijo.']], l: 29 },
    },
  },
  'Horarios.Aplicacion.Academia.GestionarAcademia': {
    s: 'Alta, edición, baja y consulta del catálogo académico: pensums, cursos, cohortes y agrupaciones de área común. Están juntos porque comparten permiso y se editan desde la misma pantalla.\n\nLos códigos y las secciones se guardan siempre en mayúsculas y sin espacios sobrantes, para que buscar por ellos sea una comparación exacta.',
    m: {
      'ActivarCohorteAsync': { f: 'public Task ActivarCohorteAsync(ActivarCohortePeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que una cohorte cursa en un período y en qué semestre va. Sin esto, la cohorte no entra en la generación de ese período.', l: 108 },
      'ActualizarAgrupacionAsync': { f: 'public Task<AgrupacionAreaComun> ActualizarAgrupacionAsync(ActualizarAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una agrupación, con las mismas reglas que el alta.', l: 268 },
      'ActualizarCohorteAsync': { f: 'public Task<Cohorte> ActualizarCohorteAsync(ActualizarCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una cohorte.', l: 253 },
      'ActualizarCursoAsync': { f: 'public Task<CursoDePensum> ActualizarCursoAsync(ActualizarCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un curso y de su carga en la malla, con las mismas reglas que el alta. El pensum no viaja: no se puede cambiar.', l: 217 },
      'ActualizarCursoComunAsync': { f: 'public Task<CursoComun> ActualizarCursoComunAsync(ActualizarCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un grupo de cursos equivalentes.', l: 237 },
      'ActualizarPensumAsync': { f: 'public Task<Pensum> ActualizarPensumAsync(ActualizarPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un pensum.', l: 203 },
      'CrearAgrupacionAsync': { f: 'public Task<AgrupacionAreaComun> CrearAgrupacionAsync(CrearAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Une varios cursos de área común en una clase compartida.\n\nEl curso principal se agrega a la lista de cursos por si no venía, y se exigen al menos dos cohortes: con una sola no hay nada que compartir y bastaría el curso normal.', l: 139 },
      'CrearCohorteAsync': { f: 'public Task<Cohorte> CrearCohorteAsync(CrearCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Registra un grupo de estudiantes. La matrícula puede ser cero —una cohorte declarada antes de la inscripción— pero nunca negativa.', l: 93 },
      'CrearCursoAsync': { f: 'public Task<CursoDePensum> CrearCursoAsync(CrearCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea un curso dentro de un pensum. No hay alta de curso suelta: un curso sin pensum no se puede programar y volvería a ser el catálogo compartido que se quitó.\n\nExigir un tipo de laboratorio sin exigir laboratorio se rechaza: sería una condición que el motor nunca miraría, y quien la escribió creería que sí.', l: 48 },
      'CrearCursoComunAsync': { f: 'public Task<CursoComun> CrearCursoComunAsync(CrearCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que varios cursos de pensums distintos son el mismo curso.\n\nSe exigen al menos dos: con uno solo no hay nada que declarar equivalente. Que cada curso esté marcado como área común y venga de un pensum distinto lo comprueba la base, que es la que ve las filas.', l: 74 },
      'CrearPensumAsync': { f: 'public Task<Pensum> CrearPensumAsync(CrearPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea una versión del plan de estudios de una carrera. El año se exige de 1900 en adelante para atajar el error de teclear un año de dos cifras.', l: 33 },
      'CursosDistintos': { f: 'private static IReadOnlyList<Guid> CursosDistintos(IReadOnlyList<Guid>? cursos)', s: 'Quita repetidos y vacíos de una lista de cursos.', l: 343 },
      'DesactivarCohorteAsync': { f: 'public async Task DesactivarCohorteAsync(Guid cohorteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Saca una cohorte de un período.', e: [['KeyNotFoundException', 'La cohorte no estaba activa en ese período.']], l: 121 },
      'EliminarAsync': { f: 'private async Task EliminarAsync(Guid id, Func<Guid, CancellationToken, Task<bool>> eliminar, string entidad, CancellationToken cancellationToken)', s: 'Baja compartida por todas las entidades del catálogo. La persistencia devuelve si borró algo; aquí eso se convierte en un error con el nombre de la entidad, para no repetir cinco veces el mismo bloque.', e: [['KeyNotFoundException', 'No se indicó identificador, o no había nada que borrar.']], l: 359 },
      'ExigirEdicion': { f: 'private void ExigirEdicion()', s: 'Toda escritura del catálogo pide el mismo permiso; las consultas no piden ninguno, porque lo que cada usuario alcanza ya lo filtra la base de datos.', l: 350 },
      'ListarCursosAsync': { f: 'public Task<IReadOnlyList<CursoAcademico>> ListarCursosAsync(Guid? pensumId = null, CancellationToken cancellationToken = default)', s: 'Cursos de un pensum. Sin pensum devuelve los de todos, que es lo que necesitan las pantallas que cruzan carreras —autorizaciones docentes, cursos comunes—, no un catálogo del que elegir al armar una malla.', l: 166 },
      'NormalizarCurso': { f: 'private static CrearCursoEnPensumSolicitud NormalizarCurso(CrearCursoEnPensumSolicitud solicitud)', s: 'Deja el código en mayúsculas y sin espacios sobrantes, para que buscar por él sea una comparación exacta, y recorta el resto de textos.', l: 302 },
      'ValidarCurso': { f: 'private static void ValidarCurso(string codigo, string nombre, bool requiereLaboratorio, string? tipoLaboratorio, int semestre, int bloques, int duracionSlots)', s: 'Reglas comunes al alta y a la edición de un curso. Sin bloques semanales no habría nada que programar, así que se exigen mayores que cero.', e: [['ArgumentException', 'Falta un dato obligatorio, o se exige un tipo de laboratorio sin exigir laboratorio.']], l: 325 },
    },
  },
  'Horarios.Aplicacion.Academia.GestionarCatalogosAcademicos': {
    s: 'Edición y baja de facultades y carreras. Las altas viven aparte, en `CrearFacultad` y `CrearCarrera`.',
    m: {
      'ActualizarCarreraAsync': { f: 'public async Task<Carrera> ActualizarCarreraAsync(ActualizarCarreraSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una carrera, incluido moverla a otra facultad.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta algún dato obligatorio, o la duración no es positiva.'], ['KeyNotFoundException', 'La carrera no existe.']], l: 56 },
      'ActualizarFacultadAsync': { f: 'public async Task<Facultad> ActualizarFacultadAsync(ActualizarFacultadSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una facultad. Se relee primero para dar un error claro si ya no existe, en vez de dejar que falle la escritura.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta el identificador, el código o el nombre.'], ['KeyNotFoundException', 'La facultad no existe.']], l: 30 },
      'EliminarCarreraAsync': { f: 'public async Task EliminarCarreraAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borra una carrera.', e: [['KeyNotFoundException', 'No se indicó identificador, o la carrera no existe.']], l: 99 },
      'EliminarFacultadAsync': { f: 'public async Task EliminarFacultadAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borra una facultad, si no le quedan carreras activas. El borrado es lógico y no dispara las llaves foráneas, así que la comprobación tiene que hacerse aquí.', e: [['InvalidOperationException', 'Todavía tiene carreras activas.'], ['KeyNotFoundException', 'La facultad no existe.']], l: 83 },
      'ExigirPermiso': { f: 'private void ExigirPermiso()', s: 'Editar y borrar piden el mismo permiso que crear.', l: 107 },
    },
  },
  'Horarios.Aplicacion.Academia.GestionarPeriodosAcademicos': {
    s: 'Alta, edición y baja de períodos académicos. Sin esto no se puede activar una cohorte, registrar disponibilidad ni crear un plan, así que el período es el primer dato del flujo aunque la base ya permitiera escribirlo.',
    m: {
      'ActualizarAsync': { f: 'public async Task<PeriodoAcademico> ActualizarAsync(ActualizarPeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un período. Se relee primero para dar un error claro si ya no existe, en vez de dejar que falle la escritura.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta el identificador o el nombre, o las fechas están al revés.'], ['KeyNotFoundException', 'El período no existe.'], ['InvalidOperationException', 'Otro período ya usa ese nombre.']], l: 56 },
      'CrearAsync': { f: 'public async Task<PeriodoAcademico> CrearAsync(CrearPeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Abre un período nuevo, en borrador.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'Falta el nombre, o la fecha de fin es anterior a la de inicio.'], ['InvalidOperationException', 'Ya existe un período con ese nombre.']], l: 33 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borra el período, si nada cuelga de él.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear.'], ['ArgumentException', 'No se indicó el período.'], ['InvalidOperationException', 'Tiene cohortes activas o planes.'], ['KeyNotFoundException', 'El período no existe.']], l: 82 },
      'ExigirNombreLibreAsync': { f: 'private async Task ExigirNombreLibreAsync(string nombre, Guid? excluirId, CancellationToken cancellationToken)', s: 'Falla si el nombre ya está tomado. Al editar se excluye el propio período, que si no chocaría contra sí mismo.', l: 126 },
      'ExigirPermiso': { f: 'private void ExigirPermiso()', s: 'Escribir períodos usa el mismo permiso que el resto de altas de academia; leer la cobertura, en cambio, solo pide academia:leer.', l: 139 },
      'ListarCoberturaAsync': { f: 'public Task<IReadOnlyList<CursoCubiertoPeriodo>> ListarCoberturaAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Cursos que se van a programar en el período. Es el mismo conjunto que arma el motor, expuesto antes de generar para que el error se vea en los datos y no en un plan vacío.', l: 103 },
      'ValidarNombreYFechas': { f: 'private static void ValidarNombreYFechas(string nombre, DateOnly inicio, DateOnly fin)', s: 'Reglas comunes al alta y a la edición, para que no se separen.', l: 114 },
    },
  },
  'Horarios.Aplicacion.Academia.IDatosAcademia': {
    s: 'Puerto hacia la persistencia de facultades y carreras.\n\nLos métodos con cuerpo por omisión lanzan `NotSupportedException` a propósito: se fueron agregando después, y así un adaptador viejo —o un doble de prueba— sigue compilando y avisa con claridad si alguien llama a lo que no implementa, en vez de devolver algo vacío que parezca correcto.',
    m: {
      'ActualizarCarreraAsync': { f: 'Task<Carrera> ActualizarCarreraAsync(ActualizarCarreraSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una carrera y devuelve cómo quedó.', l: 65 },
      'ActualizarFacultadAsync': { f: 'Task<Facultad> ActualizarFacultadAsync(ActualizarFacultadSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una facultad y devuelve cómo quedó.', l: 59 },
      'CrearCarreraAsync': { f: 'Task<Carrera> CrearCarreraAsync(CrearCarreraSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta la carrera y devuelve la fila creada.', l: 32 },
      'CrearFacultadAsync': { f: 'Task<Facultad> CrearFacultadAsync(CrearFacultadSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta la facultad y devuelve la fila creada.', l: 27 },
      'EliminarCarreraAsync': { f: 'Task<bool> EliminarCarreraAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una carrera. Falso si no había nada que borrar.', l: 75 },
      'EliminarFacultadAsync': { f: 'Task<bool> EliminarFacultadAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una facultad. Falso si no había nada que borrar.', l: 71 },
      'ExisteCarreraConCodigoAsync': { f: 'Task<bool> ExisteCarreraConCodigoAsync(string codigo, CancellationToken cancellationToken = default)', s: 'Si ya hay una carrera activa con ese código.', l: 22 },
      'ExisteFacultadConCodigoAsync': { f: 'Task<bool> ExisteFacultadConCodigoAsync(string codigo, CancellationToken cancellationToken = default)', s: 'Si ya hay una facultad activa con ese código.', l: 17 },
      'ListarCarrerasActivasAsync': { f: 'Task<IReadOnlyList<Carrera>> ListarCarrerasActivasAsync(Guid facultadId, CancellationToken cancellationToken = default)', s: 'Carreras activas de una facultad.', l: 41 },
      'ListarFacultadesActivasAsync': { f: 'Task<IReadOnlyList<Facultad>> ListarFacultadesActivasAsync(CancellationToken cancellationToken = default)', s: 'Facultades activas, sin las borradas ni las desactivadas.', l: 37 },
      'ObtenerCarreraAsync': { f: 'Task<Carrera?> ObtenerCarreraAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Una carrera por su identificador, o nulo si no existe.', l: 55 },
      'ObtenerFacultadAsync': { f: 'Task<Facultad?> ObtenerFacultadAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Una facultad por su identificador, o nulo si no existe.', l: 51 },
    },
  },
  'Horarios.Aplicacion.Academia.IDatosGestionAcademica': {
    s: 'Puerto hacia la persistencia del catálogo académico: pensums, cursos, cohortes y agrupaciones de área común.\n\nLos métodos con cuerpo por omisión lanzan `NotSupportedException` a propósito: se fueron agregando después, y así un adaptador que no los implemente avisa con claridad en vez de devolver algo vacío que parezca correcto.',
    m: {
      'ActivarCohortePeriodoAsync': { f: 'Task ActivarCohortePeriodoAsync(ActivarCohortePeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que una cohorte cursa en un período y en qué semestre va.', l: 28 },
      'ActualizarAgrupacionAsync': { f: 'Task<AgrupacionAreaComun> ActualizarAgrupacionAsync(ActualizarAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una agrupación de área común.', l: 74 },
      'ActualizarCohorteAsync': { f: 'Task<Cohorte> ActualizarCohorteAsync(ActualizarCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una cohorte.', l: 71 },
      'ActualizarCursoComunAsync': { f: 'Task<CursoComun> ActualizarCursoComunAsync(ActualizarCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un grupo de cursos equivalentes.', l: 68 },
      'ActualizarCursoEnPensumAsync': { f: 'Task<CursoDePensum> ActualizarCursoEnPensumAsync(ActualizarCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un curso y de su carga en la malla.', l: 65 },
      'ActualizarPensumAsync': { f: 'Task<Pensum> ActualizarPensumAsync(ActualizarPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un pensum.', l: 62 },
      'CrearAgrupacionAsync': { f: 'Task<AgrupacionAreaComun> CrearAgrupacionAsync(CrearAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Une varios cursos de área común en una sola clase compartida.', l: 33 },
      'CrearCohorteAsync': { f: 'Task<Cohorte> CrearCohorteAsync(CrearCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta una cohorte y devuelve la fila creada.', l: 26 },
      'CrearCursoComunAsync': { f: 'Task<CursoComun> CrearCursoComunAsync(CrearCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que varios cursos de pensums distintos son el mismo curso.', l: 23 },
      'CrearCursoEnPensumAsync': { f: 'Task<CursoDePensum> CrearCursoEnPensumAsync(CrearCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea un curso dentro de un pensum, junto con su fila de malla.', l: 21 },
      'CrearPensumAsync': { f: 'Task<Pensum> CrearPensumAsync(CrearPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta un pensum y devuelve la fila creada.', l: 19 },
      'DesactivarCohortePeriodoAsync': { f: 'Task<bool> DesactivarCohortePeriodoAsync(Guid cohorteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Saca una cohorte de un período. Falso si no estaba activa ahí.', l: 30 },
      'EliminarAgrupacionAsync': { f: 'Task<bool> EliminarAgrupacionAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Deshace una agrupación de área común. Falso si no existía.', l: 90 },
      'EliminarCohorteAsync': { f: 'Task<bool> EliminarCohorteAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una cohorte. Falso si no había nada que borrar.', l: 87 },
      'EliminarCursoAsync': { f: 'Task<bool> EliminarCursoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un curso y de su fila de malla. Falso si no había nada que borrar.', l: 81 },
      'EliminarCursoComunAsync': { f: 'Task<bool> EliminarCursoComunAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Deshace un grupo de cursos equivalentes. Falso si no existía.', l: 84 },
      'EliminarPensumAsync': { f: 'Task<bool> EliminarPensumAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un pensum. Falso si no había nada que borrar.', l: 77 },
      'ListarAgrupacionesAsync': { f: 'Task<IReadOnlyList<AgrupacionAreaComun>> ListarAgrupacionesAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Agrupaciones de área común de un período.', l: 57 },
      'ListarCohortesActivasAsync': { f: 'Task<IReadOnlyList<CohorteActivaPeriodo>> ListarCohortesActivasAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Cohortes que cursan en un período, con el semestre y la matrícula de ese período.', l: 55 },
      'ListarCohortesAsync': { f: 'Task<IReadOnlyList<Cohorte>> ListarCohortesAsync(CancellationToken cancellationToken = default)', s: 'Todas las cohortes.', l: 52 },
      'ListarCursosAsync': { f: 'Task<IReadOnlyList<CursoAcademico>> ListarCursosAsync(Guid? pensumId = null, CancellationToken cancellationToken = default)', s: 'Cursos de un pensum. Sin pensumId devuelve los de todos.', l: 39 },
      'ListarCursosComunesAsync': { f: 'Task<IReadOnlyList<CursoComun>> ListarCursosComunesAsync(CancellationToken cancellationToken = default)', s: 'Todos los grupos de cursos equivalentes.', l: 44 },
      'ListarCursosPensumAsync': { f: 'Task<IReadOnlyList<CursoEnPensum>> ListarCursosPensumAsync(Guid? pensumId = null, CancellationToken cancellationToken = default)', s: 'Cursos colocados en pensums. Sin pensumId devuelve los de todos.', l: 47 },
      'ListarPensumsAsync': { f: 'Task<IReadOnlyList<Pensum>> ListarPensumsAsync(CancellationToken cancellationToken = default)', s: 'Todos los pensums.', l: 37 },
    },
  },
  'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos': {
    s: 'Puerto hacia la persistencia de períodos académicos.',
    m: {
      'ActualizarAsync': { f: 'Task<PeriodoAcademico> ActualizarAsync(ActualizarPeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios y devuelve cómo quedó el período.', l: 33 },
      'CrearAsync': { f: 'Task<PeriodoAcademico> CrearAsync(CrearPeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta el período y devuelve la fila creada.', l: 28 },
      'EliminarAsync': { f: 'Task<bool> EliminarAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico. Falso si no había nada que borrar.', l: 38 },
      'ExisteConNombreAsync': { f: 'Task<bool> ExisteConNombreAsync(string nombre, Guid? excluirId = null, CancellationToken cancellationToken = default)', s: 'Si ya hay un período con ese nombre. `excluirId` deja fuera de la comparación al propio período que se está editando, para que no choque consigo mismo.', l: 22 },
      'ListarAsync': { f: 'Task<IReadOnlyList<PeriodoAcademico>> ListarAsync(CancellationToken cancellationToken = default)', s: 'Todos los períodos, del más reciente al más antiguo.', l: 12 },
      'ListarCoberturaAsync': { f: 'Task<IReadOnlyList<CursoCubiertoPeriodo>> ListarCoberturaAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Cursos que se van a programar en el período, cruzando el pensum de cada cohorte con el semestre que cursa.', l: 50 },
      'ObtenerAsync': { f: 'Task<PeriodoAcademico?> ObtenerAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un período por su identificador, o nulo si no existe.', l: 16 },
      'TieneDependenciasAsync': { f: 'Task<bool> TieneDependenciasAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Cohortes activas y planes que cuelgan del período. El borrado es lógico y no dispara las llaves foráneas, así que la comprobación va aquí.', l: 44 },
    },
  },
  'Horarios.Aplicacion.Academia.IDatosSugerenciasSeccion': {
    s: 'Puerto hacia la persistencia de sugerencias de sección.',
  },
  'Horarios.Aplicacion.Academia.ListarCarrerasActivas': {
    s: 'Catálogo completo de carreras activas. Lo usan las pantallas que eligen carreras sin partir de una facultad, como el alcance de un plan.',
  },
  'Horarios.Aplicacion.Academia.ListarCarrerasPorFacultad': {
    s: 'Devuelve las carreras activas de una facultad.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<Carrera>> EjecutarAsync(Guid facultadId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó la facultad.']], l: 18 },
    },
  },
  'Horarios.Aplicacion.Academia.ListarFacultades': {
    s: 'Devuelve las facultades activas. Es el catálogo que alimenta los desplegables de toda la aplicación.',
  },
  'Horarios.Aplicacion.Academia.ListarPeriodosAcademicos': {
    s: 'Alimenta los selectores de período de la interfaz para que nadie tenga que escribir un identificador a mano.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<PeriodoAcademico>> EjecutarAsync(CancellationToken cancellationToken = default)', s: 'Devuelve los períodos, sin filtrar por estado.', l: 69 },
    },
  },
  'Horarios.Aplicacion.Academia.SugerirNuevaSeccion': {
    s: 'Registra la propuesta de partir una cohorte en una sección más porque no cabe en ninguna aula disponible.\n\nSolo deja constancia: no crea la sección ni toca el horario. Quien decide es una persona.',
    m: {
      'EjecutarAsync': { f: 'public Task<SugerenciaSeccionDto> EjecutarAsync(SolicitudSugerenciaSeccionDto solicitud, CancellationToken cancellationToken = default)', s: 'Guarda la sugerencia a nombre del usuario de la sesión.\n\nSe rechaza sugerir cuando la matrícula sí cabe: una sugerencia sin problema real solo haría ruido en la bandeja de quien tiene que decidir.', e: [['UnauthorizedAccessException', 'Sin el permiso academia:crear, o la sesión no identifica al usuario.'], ['ArgumentException', 'Falta el horario, la cohorte, la sección propuesta o el motivo.'], ['InvalidOperationException', 'La matrícula cabe en un aula disponible.']], l: 46 },
    },
  },
  'Horarios.Aplicacion.Acceso.AlcanceUsuario': {
    s: 'Hasta dónde llega un usuario. Los permisos dicen qué acciones puede hacer; el alcance dice sobre qué datos, y las dos cosas se comprueban juntas.',
    m: {
      'DocenteId': { s: 'Docente que es esta persona, cuando lo es. Sirve para que un docente solo vea lo suyo. En nulo cuando el usuario no imparte clases.' },
      'FacultadIds': { s: 'Facultades que alcanza. Es lo que limita a un decano a lo suyo. Lista vacía en quien no está atado a ninguna facultad.' },
    },
  },
  'Horarios.Aplicacion.Acceso.AutorizacionAplicacion': {
    s: 'Comprobación de permisos compartida por los casos de uso. Existe para que todos exijan permiso de la misma forma y con el mismo mensaje.',
    m: {
      'Exigir': { f: 'public static void Exigir(IContextoUsuario contexto, string recurso, string accion)', s: 'Comprueba el permiso en la capa de aplicación, no solo en la interfaz (contexto.md §13). Sin contexto de usuario la operación se rechaza: un caso de uso registrado sin contexto debe fallar de inmediato, no quedar sin protección.', e: [['UnauthorizedAccessException', 'No hay sesión, o la sesión no tiene ese permiso.']], l: 18 },
    },
  },
  'Horarios.Aplicacion.Acceso.CerrarSesion': {
    s: 'Salida del sistema: invalida la sesión en Supabase para que el token deje de servir.',
    m: {
      'EjecutarAsync': { f: 'public Task EjecutarAsync(string tokenAcceso, CancellationToken cancellationToken = default)', s: 'Cierra la sesión. Sin token no hay nada que cerrar y no se considera error: cerrar sesión debe funcionar siempre, aunque la sesión ya se hubiera perdido.', l: 19 },
    },
  },
  'Horarios.Aplicacion.Acceso.CrearUsuarioInicial': {
    s: 'Crea la primera cuenta administrativa de una instalación nueva, cuando todavía no hay nadie que pueda dar de alta a otros.\n\nEs la única alta de usuario que no exige permiso previo, así que se acota por otro lado: solo admite roles administrativos, nunca un docente ni un alumno.',
    m: {
      'EjecutarAsync': { f: 'public Task<Usuario> EjecutarAsync(CrearUsuarioInicialSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Da de alta la cuenta. El correo se guarda en minúsculas para que buscar por él sea siempre una comparación exacta, sin importar cómo lo escribieron.', e: [['ArgumentException', 'Falta el nombre o el correo, o el rol no está entre los permitidos.']], l: 40 },
    },
  },
  'Horarios.Aplicacion.Acceso.IAutenticadorSupabase': {
    s: 'Puerto hacia el servicio que comprueba contraseñas: Supabase. La aplicación nunca guarda ni verifica contraseñas por su cuenta, solo pide que alguien más lo haga.\n\nLa interfaz vive aquí y su implementación en Infraestructura, para que la aplicación no dependa de Supabase y se pueda probar con un doble.',
    m: {
      'CerrarSesionAsync': { f: 'Task CerrarSesionAsync(string tokenAcceso, CancellationToken cancellationToken = default)', s: 'Invalida la sesión del lado de Supabase.', l: 23 },
      'IniciarSesionAsync': { f: 'Task<SesionSupabase> IniciarSesionAsync(string correo, string contrasena, CancellationToken cancellationToken = default)', s: 'Comprueba las credenciales y abre una sesión. Que salga bien solo dice que la persona es quien dice ser; si además tiene permiso de entrar al sistema de horarios lo decide `IniciarSesion`.', l: 17 },
    },
  },
  'Horarios.Aplicacion.Acceso.IDatosAcceso': {
    s: 'Puerto hacia la persistencia de usuarios, roles y permisos. La aplicación declara aquí qué necesita saber; Infraestructura resuelve cómo obtenerlo.',
    m: {
      'CrearUsuarioInicialAsync': { f: 'Task<Usuario> CrearUsuarioInicialAsync(CrearUsuarioInicialSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Da de alta la primera cuenta administrativa de una instalación nueva.', l: 13 },
      'ListarPermisosAsync': { f: 'Task<IReadOnlyList<PermisoUsuario>> ListarPermisosAsync(Guid usuarioId, CancellationToken cancellationToken = default)', s: 'Todos los permisos que le llegan al usuario por sus roles, ya resueltos. Se leen de una vez al iniciar sesión para no consultar la base en cada comprobación.', l: 40 },
      'ListarRolesAsync': { f: 'Task<IReadOnlyList<string>> ListarRolesAsync(Guid usuarioId, CancellationToken cancellationToken = default)', s: 'Roles concedidos al usuario, por nombre.', l: 32 },
      'ObtenerPorAuthUserIdAsync': { f: 'Task<Usuario?> ObtenerPorAuthUserIdAsync(Guid authUserId, CancellationToken cancellationToken = default)', s: 'Busca el usuario que corresponde a una cuenta de Supabase. Es el paso que une la identidad autenticada con la identidad del sistema; devuelve nulo si la cuenta existe en Supabase pero no está dada de alta aquí.', l: 27 },
      'ObtenerPorCorreoAsync': { f: 'Task<Usuario?> ObtenerPorCorreoAsync(string correoInstitucional, CancellationToken cancellationToken = default)', s: 'Busca un usuario por su correo. Devuelve nulo si no existe.', l: 18 },
      'SigueVigenteAsync': { f: 'Task<bool> SigueVigenteAsync(Guid usuarioId, long versionFila, CancellationToken cancellationToken = default)', s: 'Dice si el usuario sigue como estaba cuando se abrió la sesión, comparando la versión de su fila. Sirve para que una cuenta bloqueada o con permisos recortados deje de valer sin esperar a que caduque el token.\n\nLa implementación por omisión devuelve falso, es decir «no lo puedo confirmar», para que un adaptador que no lo soporte no conceda acceso por descuido.', l: 62 },
      'TienePermisoAsync': { f: 'Task<bool> TienePermisoAsync(Guid usuarioId, string recurso, string accion, CancellationToken cancellationToken = default)', s: 'Comprueba un permiso concreto contra la base de datos, sin usar lo que se cargó en la sesión. Es la comprobación autoritativa para operaciones delicadas.', l: 48 },
    },
  },
  'Horarios.Aplicacion.Acceso.IDatosAlcanceUsuario': {
    s: 'Puerto hacia la consulta del alcance de un usuario.',
  },
  'Horarios.Aplicacion.Acceso.IniciarSesion': {
    s: 'Entrada al sistema. Son dos comprobaciones seguidas: Supabase dice si la contraseña es correcta, y este sistema dice si esa persona tiene cuenta activa aquí.\n\nPasar la primera no basta. Si la segunda falla se cierra la sesión que se acababa de abrir, para no dejar un token válido en manos de quien no puede entrar.',
    m: {
      'EjecutarAsync': { f: 'public async Task<ResultadoInicioSesion> EjecutarAsync(string correo, string contrasena, CancellationToken cancellationToken = default)', s: 'Autentica y devuelve todo lo que hace falta para armar la sesión: el usuario, los tokens, sus roles y sus permisos.', e: [['ArgumentException', 'Falta el correo o la contraseña.'], ['UnauthorizedAccessException', 'La cuenta autenticó bien pero no está dada de alta aquí, o no está activa.']], l: 32 },
    },
  },
  'Horarios.Aplicacion.Acceso.ObtenerAlcanceUsuario': {
    s: 'Averigua el alcance de un usuario. Se consulta al armar la sesión y sirve después para filtrar listas y comprobar si puede tocar cierta fila.',
    m: {
      'EjecutarAsync': { f: 'public Task<AlcanceUsuario> EjecutarAsync(Guid usuarioId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó el usuario.']], l: 35 },
    },
  },
  'Horarios.Aplicacion.Acceso.PermisoUsuario': {
    s: 'Un permiso concreto: qué se puede hacer y sobre qué. Se compara en pares recurso-acción, siempre en minúsculas.',
    m: {
      'ToString': { f: 'public override string ToString()', s: 'Forma corta «recurso:accion», la que se usa en mensajes y registros.', l: 76 },
    },
  },
  'Horarios.Aplicacion.Acceso.ResultadoInicioSesion': {
    s: 'Todo lo que deja un inicio de sesión correcto. Los roles y permisos vienen resueltos para que la interfaz no tenga que volver a consultarlos en cada pantalla.',
  },
  'Horarios.Aplicacion.Acceso.SesionSupabase': {
    s: 'Sesión abierta en Supabase.',
    m: {
      'AuthUserId': { s: 'Identificador de la cuenta en Supabase. Es la llave con que se busca el usuario propio del sistema.' },
      'ExpiraEnSegundos': { s: 'Cuánto le queda de vida al token de acceso.' },
      'TokenAcceso': { s: 'Credencial con que se llama a la base de datos. Viaja en cada consulta y es lo que hace valer las políticas de acceso por fila.' },
      'TokenRenovacion': { s: 'Sirve para conseguir un token de acceso nuevo cuando el actual caduca, sin volver a pedir la contraseña.' },
    },
  },
  'Horarios.Aplicacion.Acceso.VerificarPermiso': {
    s: 'Pregunta a la base de datos si un usuario tiene cierto permiso, sin fiarse de lo que se cargó al iniciar sesión. Se usa cuando el dato tiene que estar al día, por ejemplo si al usuario le acaban de quitar un rol.',
    m: {
      'EjecutarAsync': { f: 'public Task<bool> EjecutarAsync(Guid usuarioId, string recurso, string accion, CancellationToken cancellationToken = default)', s: 'Devuelve si el usuario tiene el permiso. Con datos incompletos responde que no: en una comprobación de acceso, la duda se resuelve negando.', l: 21 },
    },
  },
  'Horarios.Aplicacion.Aulas.ActualizarAula': {
    s: 'Guarda los cambios de un aula, con las mismas reglas que el alta.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Aula> EjecutarAsync(ActualizarAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Actualiza el aula y la devuelve ya guardada. Se relee primero para dar un error claro si ya no existe, y al comprobar el piso se excluye ella misma para que no choque consigo misma.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta el identificador, el código o el número.'], ['ArgumentOutOfRangeException', 'La capacidad no es positiva.'], ['KeyNotFoundException', 'El aula no existe.'], ['InvalidOperationException', 'Otra aula ya ocupa ese piso y número.']], l: 32 },
    },
  },
  'Horarios.Aplicacion.Aulas.ActualizarJornada': {
    s: 'Guarda los cambios de una jornada, con las mismas reglas que el alta más una: encogerla no puede dejar descansos apuntando a bloques o días que ya no existen.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Jornada> EjecutarAsync(ActualizarJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Actualiza la jornada y la devuelve ya guardada.\n\nCuando la jornada se reduce —menos días o menos bloques— se revisan antes los descansos. Si alguno quedaría fuera de rango se rechaza el cambio en vez de arrastrar filas rotas: quién sobra y quién no es una decisión de quien administra, no del código.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Los mismos casos que al crear, más falta del identificador.'], ['KeyNotFoundException', 'La jornada no existe.'], ['InvalidOperationException', 'El cambio dejaría descansos fuera de rango.']], l: 36 },
    },
  },
  'Horarios.Aplicacion.Aulas.CrearAula': {
    s: 'Da de alta un aula. Comprueba que el piso y el número no estén ya ocupados por otra.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Aula> EjecutarAsync(CrearAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea el aula y la devuelve ya guardada.\n\nEl número de aula es obligatorio aquí aunque el contrato lo admita en nulo: quien la da de alta a mano siempre lo conoce, y sin él no se puede comprobar que no choque con otra del mismo piso.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta el código o el número de aula.'], ['ArgumentOutOfRangeException', 'La capacidad no es positiva.'], ['InvalidOperationException', 'Ese piso y número ya están ocupados.']], l: 33 },
    },
  },
  'Horarios.Aplicacion.Aulas.CrearDescansoJornada': {
    s: 'Bloquea una franja de la jornada en la que no se dará clase: almuerzo de un día concreto, hora cívica, reunión fija.',
    m: {
      'EjecutarAsync': { f: 'public async Task<DescansoJornada> EjecutarAsync(CrearDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea el descanso y lo devuelve ya guardado.\n\nLa llamada a `Crear` se hace solo por sus comprobaciones: el bloque resultante se descarta, pero de paso confirma que el día pertenece a la jornada y que el rango cabe dentro de ella. Así la regla vive en un solo sitio en lugar de repetirse aquí.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta la jornada, o el rango no es válido, o el día no pertenece a la jornada.'], ['KeyNotFoundException', 'La jornada no existe.'], ['InvalidOperationException', 'Se solapa con otro descanso del mismo día.']], l: 36 },
    },
  },
  'Horarios.Aplicacion.Aulas.CrearJornada': {
    s: 'Da de alta una jornada, es decir la rejilla de horas sobre la que se arma el horario.\n\nEs el caso de uso con más validación del módulo, porque una jornada mal definida no falla al guardarse: falla mucho después, al generar, y con un error que no señala la causa.',
    m: {
      'EjecutarAsync': { f: 'public Task<Jornada> EjecutarAsync(CrearJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea la jornada y la devuelve ya guardada.\n\nTres reglas sobre el receso: si dura cero minutos no puede estar ubicado en ningún bloque, si dura algo tiene que caer entre dos bloques —ni antes del primero ni después del último, donde no sería un receso— y nunca puede durar negativo. Al final se comprueba lo más importante: que los bloques más el receso quepan de verdad entre la hora de entrada y la de salida.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta el nombre o los días; el rango de horas o la duración no son válidos; el receso está mal ubicado; o todo junto no cabe en la jornada.']], l: 39 },
    },
  },
  'Horarios.Aplicacion.Aulas.EliminarAula': {
    s: 'Baja lógica: marca `eliminado_en` y desactiva el aula. El esquema conserva la fila porque los horarios ya generados la referencian.',
    m: {
      'EjecutarAsync': { f: 'public async Task EjecutarAsync(Guid aulaId, CancellationToken cancellationToken = default)', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'No se indicó el aula.'], ['KeyNotFoundException', 'El aula no existe.']], l: 24 },
    },
  },
  'Horarios.Aplicacion.Aulas.EliminarJornada': {
    s: 'Baja lógica de la jornada. Los descansos cuelgan de ella y se retiran en la misma operación para no dejar filas apuntando a una jornada dada de baja.',
    m: {
      'EjecutarAsync': { f: 'public async Task EjecutarAsync(Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Retira los descansos de la jornada y luego la da de baja. Ese orden importa: si fallara al final, quedarían descansos sueltos pero ninguna jornada viva apuntando a ellos, que es el estado menos dañino de los dos.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'No se indicó la jornada.'], ['KeyNotFoundException', 'La jornada no existe.']], l: 29 },
    },
  },
  'Horarios.Aplicacion.Aulas.GestionarDescansoJornada': {
    s: 'Edición y baja de descansos. El alta vive aparte, en `CrearDescansoJornada`.',
    m: {
      'ActualizarAsync': { f: 'public async Task<DescansoJornada> ActualizarAsync(ActualizarDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Mueve o redimensiona un descanso dentro de su jornada.\n\nLa jornada se saca del propio descanso, no de la solicitud: un descanso no se puede mudar de jornada, y así no hay forma de intentarlo.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta el identificador, el rango no es válido, o el resultado queda fuera de los días o bloques de la jornada.'], ['KeyNotFoundException', 'El descanso o su jornada no existen.']], l: 32 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid descansoId, CancellationToken cancellationToken = default)', s: 'Borra un descanso, con lo que sus casillas vuelven a quedar disponibles.', e: [['KeyNotFoundException', 'No se indicó identificador, o el descanso no existe.']], l: 57 },
    },
  },
  'Horarios.Aplicacion.Aulas.GestionarRecursosAulas': {
    s: 'Catálogo de equipo de las aulas: qué recursos existen y cuáles tiene cada aula.\n\nEl motor usa estos datos para descartar aulas que no cumplen lo que el curso exige, comparando por código de recurso.',
    m: {
      'ActualizarAsync': { f: 'public Task<RecursoAula> ActualizarAsync(ActualizarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un recurso, con las mismas reglas que el alta.', l: 82 },
      'AsignarAsync': { f: 'public Task AsignarAsync(AsignarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que un aula tiene cierto recurso. La cantidad tiene que ser positiva: cero unidades es no tenerlo, y para eso está desasignar.', l: 70 },
      'CrearAsync': { f: 'public Task<RecursoAula> CrearAsync(CrearRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Agrega un recurso al catálogo. El código se guarda en mayúsculas porque es lo que se compara contra lo que exige el curso.', l: 52 },
      'DesasignarAsync': { f: 'public async Task DesasignarAsync(DesasignarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Quita un recurso de un aula; el recurso sigue en el catálogo.', e: [['KeyNotFoundException', 'El recurso no estaba asignado a esa aula.']], l: 114 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid recursoId, CancellationToken cancellationToken = default)', s: 'Borra un recurso del catálogo.', e: [['KeyNotFoundException', 'No se indicó identificador, o el recurso no existe.']], l: 103 },
      'ListarPorAulaAsync': { f: 'public Task<IReadOnlyList<RecursoAsignadoAula>> ListarPorAulaAsync(Guid aulaId, CancellationToken cancellationToken = default)', s: 'Inventario de un aula. Sin aula devuelve lista vacía en vez de fallar, porque la pantalla la llama mientras todavía no hay ninguna seleccionada.', l: 129 },
    },
  },
  'Horarios.Aplicacion.Aulas.IDatosAulas': {
    s: 'Puerto hacia la persistencia de aulas, jornadas y descansos.',
    m: {
      'ActualizarAulaAsync': { f: 'Task<Aula> ActualizarAulaAsync(ActualizarAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un aula y devuelve cómo quedó.', l: 46 },
      'ActualizarDescansoAsync': { f: 'Task<DescansoJornada> ActualizarDescansoAsync(ActualizarDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un descanso y devuelve cómo quedó.', l: 70 },
      'ActualizarJornadaAsync': { f: 'Task<Jornada> ActualizarJornadaAsync(ActualizarJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una jornada y devuelve cómo quedó.', l: 56 },
      'CrearAulaAsync': { f: 'Task<Aula> CrearAulaAsync(CrearAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta el aula y devuelve la fila creada.', l: 12 },
      'CrearDescansoAsync': { f: 'Task<DescansoJornada> CrearDescansoAsync(CrearDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta un descanso y devuelve la fila creada.', l: 31 },
      'CrearJornadaAsync': { f: 'Task<Jornada> CrearJornadaAsync(CrearJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta la jornada y devuelve la fila creada.', l: 14 },
      'EliminarAulaAsync': { f: 'Task<bool> EliminarAulaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un aula. Falso si no había nada que borrar.', l: 52 },
      'EliminarDescansoAsync': { f: 'Task<bool> EliminarDescansoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borra un descanso. Falso si no había nada que borrar.', l: 76 },
      'EliminarJornadaAsync': { f: 'Task<bool> EliminarJornadaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una jornada. Falso si no había nada que borrar.', l: 62 },
      'ExisteAulaEnPisoAsync': { f: 'Task<bool> ExisteAulaEnPisoAsync(int piso, int numeroAula, Guid? excluirAulaId = null, CancellationToken cancellationToken = default)', s: 'Si ya hay un aula con ese número en ese piso. `excluirAulaId` deja fuera de la comparación a la propia aula que se está editando.', l: 21 },
      'ListarAulasActivasAsync': { f: 'Task<IReadOnlyList<Aula>> ListarAulasActivasAsync(CancellationToken cancellationToken = default)', s: 'Aulas activas, sin las borradas ni las desactivadas.', l: 16 },
      'ListarDescansosAsync': { f: 'Task<IReadOnlyList<DescansoJornada>> ListarDescansosAsync(Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Descansos declarados en una jornada.', l: 35 },
      'ListarJornadasActivasAsync': { f: 'Task<IReadOnlyList<Jornada>> ListarJornadasActivasAsync(CancellationToken cancellationToken = default)', s: 'Jornadas activas.', l: 27 },
      'ObtenerAulaAsync': { f: 'Task<Aula?> ObtenerAulaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un aula por su identificador, o nulo si no existe.', l: 42 },
      'ObtenerDescansoAsync': { f: 'Task<DescansoJornada?> ObtenerDescansoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un descanso por su identificador, o nulo si no existe.', l: 66 },
      'ObtenerJornadaAsync': { f: 'Task<Jornada?> ObtenerJornadaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Una jornada por su identificador, o nulo si no existe.', l: 29 },
    },
  },
  'Horarios.Aplicacion.Aulas.IDatosRecursosAulas': {
    s: 'Puerto hacia la persistencia del catálogo de recursos y de su asignación a las aulas.',
    m: {
      'ActualizarAsync': { f: 'Task<RecursoAula> ActualizarAsync(ActualizarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un recurso del catálogo.', l: 22 },
      'AsignarAsync': { f: 'Task AsignarAsync(AsignarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que un aula tiene cierto recurso, con su cantidad.', l: 16 },
      'CrearAsync': { f: 'Task<RecursoAula> CrearAsync(CrearRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta un recurso en el catálogo y devuelve la fila creada.', l: 14 },
      'DesasignarAsync': { f: 'Task<bool> DesasignarAsync(DesasignarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Quita un recurso de un aula. Falso si no estaba asignado.', l: 26 },
      'EliminarAsync': { f: 'Task<bool> EliminarAsync(Guid recursoId, CancellationToken cancellationToken = default)', s: 'Borra un recurso del catálogo. Falso si no había nada que borrar.', l: 24 },
      'ListarAsync': { f: 'Task<IReadOnlyList<RecursoAula>> ListarAsync(CancellationToken cancellationToken = default)', s: 'Todo el catálogo de recursos.', l: 18 },
      'ListarPorAulaAsync': { f: 'Task<IReadOnlyList<RecursoAsignadoAula>> ListarPorAulaAsync(Guid aulaId, CancellationToken cancellationToken = default)', s: 'Inventario de un aula: qué recursos tiene y cuántos.', l: 20 },
    },
  },
  'Horarios.Aplicacion.Aulas.ListarAulas': {
    s: 'Devuelve las aulas activas. Es el catálogo que alimenta los desplegables y el que el motor puede usar.',
  },
  'Horarios.Aplicacion.Aulas.ListarBloquesJornada': {
    s: 'Despliega la rejilla de una jornada: todas las casillas donde de verdad se puede dar clase, ya descontados los descansos.\n\nEs la vista que usan la pantalla de disponibilidad del docente y la preparación de la instantánea del motor, para que ambas partan de la misma rejilla.',
    m: {
      'EjecutarAsync': { f: 'public async Task<IReadOnlyList<BloqueHorario>> EjecutarAsync(Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Cruza los días activos con los bloques del día y descarta los que pisa un descanso. Cada casilla sale ya con su hora de reloj calculada por `Crear`.', e: [['ArgumentException', 'No se indicó la jornada.'], ['KeyNotFoundException', 'La jornada no existe.']], l: 28 },
    },
  },
  'Horarios.Aplicacion.Aulas.ListarDescansosJornada': {
    s: 'Devuelve los descansos declarados en una jornada.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<DescansoJornada>> EjecutarAsync(Guid jornadaId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó la jornada.']], l: 18 },
    },
  },
  'Horarios.Aplicacion.Aulas.ListarJornadas': {
    s: 'Devuelve las jornadas activas. Es el catálogo que alimenta los desplegables de turno.',
  },
  'Horarios.Aplicacion.Docentes.AutorizarCursoDocente': {
    s: 'Autoriza a un docente a impartir un curso. Sin esta autorización el motor nunca le asignará ese curso.\n\nA diferencia de otros casos de uso, aquí no basta un permiso: hace falta además que el docente esté dentro del alcance de quien autoriza.',
    m: {
      'EjecutarAsync': { f: 'public async Task<AsignacionDocenteCurso> EjecutarAsync(AutorizarCursoDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Registra la autorización y la devuelve ya guardada.', e: [['ArgumentException', 'Falta el docente o el curso.'], ['KeyNotFoundException', 'El docente o el curso no existen, o no están activos.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien autoriza.']], l: 34 },
      'PuedeAutorizar': { f: 'private static bool PuedeAutorizar(IContextoGestionDocentes contexto, Docente docente, Guid? facultadSolicitada)', s: 'Decide si quien pide puede autorizar a ese docente. El administrador siempre puede; quien no es decano, nunca; y el decano solo dentro de sus facultades, y además solo puede acotar la autorización a una facultad suya.', l: 64 },
    },
  },
  'Horarios.Aplicacion.Docentes.ConsultarDisponibilidadDeDocente': {
    s: 'Consulta la disponibilidad del docente que inició sesión. El identificador del docente nunca se recibe desde la pantalla.',
  },
  'Horarios.Aplicacion.Docentes.CrearDocente': {
    s: 'Da de alta un docente. Es la puerta por la que entran los datos que después usa el motor: la carga que puede recibir y las facultades a las que pertenece.',
    m: {
      'EjecutarAsync': { f: 'public async Task<Docente> EjecutarAsync(CrearDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea el docente y lo devuelve ya guardado.\n\nEl código va en mayúsculas y el correo en minúsculas para que buscar por cualquiera de los dos sea siempre una comparación exacta. Las facultades pasan por `Normalizar`, así que una lista vacía y una nula acaban significando lo mismo: docente compartido.', e: [['UnauthorizedAccessException', 'Sin el permiso docentes:actualizar.'], ['ArgumentException', 'Falta el código, el nombre o el correo; la carga mínima es menor que 1; o la máxima es menor que la mínima.']], l: 36 },
    },
  },
  'Horarios.Aplicacion.Docentes.FacultadesDocente': {
    s: 'Un docente puede pertenecer a N facultades. Las solicitudes llegan de formularios y de importaciones, así que el conjunto se normaliza en un solo sitio antes de tocar la persistencia: sin nulos, sin `Empty` —que es lo que manda un desplegable sin elegir— y sin repetidos, que la clave primaria de `docente_facultades` rechazaría.',
    m: {
      'Normalizar': { f: 'public static IReadOnlyList<Guid> Normalizar(IReadOnlyList<Guid>? facultadIds)', s: 'Devuelve el conjunto limpio. Nula y vacía dan el mismo resultado: lista vacía, que es como se representa el docente compartido entre facultades.', l: 16 },
    },
  },
  'Horarios.Aplicacion.Docentes.GestionarDisponibilidadDocente': {
    s: 'Declaración y consulta de las horas en que un docente puede dar clase durante un período. Es lo que el motor toma como límite: fuera de ahí no le coloca nada.',
    m: {
      'GuardarAsync': { f: 'public async Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda la jornada declarada sin perder las jornadas ya almacenadas.\n\nSe rechazan las casillas repetidas antes de escribir: dos filas para la misma casilla se contradirían y no habría forma de saber cuál vale. La persistencia reemplaza la rejilla completa, por lo que antes de guardar se recuperan los bloques existentes y se sustituyen únicamente los de la jornada recibida.', e: [['ArgumentException', 'Falta el docente o el período, hay una casilla mal formada, o hay casillas repetidas.'], ['KeyNotFoundException', 'El docente no existe o no está activo.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien pide.']], l: 78 },
      'ObtenerAsync': { f: 'public async Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Devuelve lo declarado, o nulo si el docente aún no ha respondido. Consultar exige el mismo alcance que escribir: la disponibilidad es un dato personal.', e: [['KeyNotFoundException', 'El docente no existe o no está activo.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien pide.']], l: 120 },
      'PuedeGestionar': { f: 'private bool PuedeGestionar(Docente docente)', s: 'Decide el alcance: el administrador siempre; el propio docente sobre lo suyo; el decano si comparte al menos una facultad con él; nadie más.', l: 136 },
    },
  },
  'Horarios.Aplicacion.Docentes.GestionarDocentes': {
    s: 'Edición y baja de docentes. El alta vive aparte, en `CrearDocente`.',
    m: {
      'ActualizarAsync': { f: 'public async Task<Docente> ActualizarAsync(ActualizarDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un docente. Se relee primero para dar un error claro si ya no existe.\n\nLas facultades se reemplazan por completo: lo que no venga en la lista se desasigna.', e: [['UnauthorizedAccessException', 'Sin el permiso docentes:actualizar.'], ['ArgumentException', 'Falta algún dato obligatorio, o las cargas no son coherentes.'], ['KeyNotFoundException', 'El docente no existe.']], l: 32 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'Baja lógica del docente. La fila se conserva porque los horarios ya generados la referencian.', e: [['KeyNotFoundException', 'No se indicó identificador, o el docente no existe.']], l: 59 },
      'Validar': { f: 'private static void Validar(Guid id, string codigo, string nombre, string correo, int cargaMinima, int cargaMaxima)', s: 'Reglas comunes, iguales a las del alta para que no se separen.', l: 67 },
    },
  },
  'Horarios.Aplicacion.Docentes.IContextoGestionDocentes': {
    s: 'Quién está pidiendo la operación, en los términos que importan para docentes: si manda sobre todo, si es decano, qué docente es y qué facultades alcanza.\n\nEs aparte de `IContextoUsuario` porque aquí no basta con tener un permiso: la decisión depende de a quién se está tocando.',
    m: {
      'DocenteId': { f: 'Guid? DocenteId { get; }', s: 'Docente que es esta persona, si lo es. Cada quien alcanza lo suyo.', l: 43 },
      'EsAdministrador': { f: 'bool EsAdministrador { get; }', s: 'Alcanza a todos los docentes, sin límite de facultad.', l: 39 },
      'EsDecano': { f: 'bool EsDecano { get; }', s: 'Alcanza a los docentes de sus facultades.', l: 41 },
      'FacultadIds': { f: 'IReadOnlySet<Guid> FacultadIds { get; }', s: 'Facultades que alcanza.', l: 45 },
    },
  },
  'Horarios.Aplicacion.Docentes.IDatosDisponibilidadDocente': {
    s: 'Puerto hacia la persistencia de la disponibilidad declarada por los docentes.',
    m: {
      'GuardarAsync': { f: 'Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda la rejilla declarada y devuelve cómo quedó.', l: 17 },
      'ObtenerAsync': { f: 'Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'La disponibilidad de un docente en un período, o nulo si todavía no declaró nada.', l: 23 },
      'ObtenerDocenteAsync': { f: 'Task<Docente?> ObtenerDocenteAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'El docente, para comprobar el alcance antes de leer o escribir su disponibilidad. Nulo si no existe o no está activo.', l: 15 },
    },
  },
  'Horarios.Aplicacion.Docentes.IDatosDocentes': {
    s: 'Puerto hacia la persistencia de docentes y de los cursos que tienen autorizados.',
    m: {
      'ActualizarAsync': { f: 'Task<Docente> ActualizarAsync(ActualizarDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un docente y devuelve cómo quedó.', l: 64 },
      'AutorizarCursoAsync': { f: 'Task<AsignacionDocenteCurso> AutorizarCursoAsync(AutorizarCursoDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Registra la autorización y devuelve la fila creada.', l: 47 },
      'CrearAsync': { f: 'Task<Docente> CrearAsync(CrearDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta el docente, con sus facultades, y devuelve la fila creada.', l: 12 },
      'EliminarAsync': { f: 'Task<bool> EliminarAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un docente. Falso si no había nada que borrar.', l: 70 },
      'ExisteCursoActivoAsync': { f: 'Task<bool> ExisteCursoActivoAsync(Guid cursoId, CancellationToken cancellationToken = default)', s: 'Si el curso existe y sigue activo en el catálogo.', l: 42 },
      'ListarActivosAsync': { f: 'Task<IReadOnlyList<Docente>> ListarActivosAsync(CancellationToken cancellationToken = default)', s: 'Docentes activos, sin los dados de baja.', l: 17 },
      'ListarCursosAutorizadosAsync': { f: 'Task<IReadOnlyList<AsignacionDocenteCurso>> ListarCursosAutorizadosAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'Cursos que un docente tiene autorizados.', l: 52 },
      'ListarPorFacultadAsync': { f: 'Task<IReadOnlyList<Docente>> ListarPorFacultadAsync(Guid facultadId, CancellationToken cancellationToken = default)', s: 'Docentes que alcanzan a una facultad. Incluye a los compartidos, que no están atados a ninguna.', l: 37 },
      'ObtenerPorCodigoAsync': { f: 'Task<Docente?> ObtenerPorCodigoAsync(string codigo, CancellationToken cancellationToken = default)', s: 'Un docente por su código. Es la búsqueda que usan las importaciones, donde no se conocen los identificadores internos.', l: 29 },
      'ObtenerPorIdAsync': { f: 'Task<Docente?> ObtenerPorIdAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un docente por su identificador, o nulo si no existe.', l: 21 },
      'RevocarCursoAutorizadoAsync': { f: 'Task<bool> RevocarCursoAutorizadoAsync(Guid asignacionId, CancellationToken cancellationToken = default)', s: 'Deja sin vigencia una autorización, sin borrarla. Falso si no había nada que revocar.', l: 59 },
    },
  },
  'Horarios.Aplicacion.Docentes.ListarCursosAutorizadosDocente': {
    s: 'Devuelve los cursos que un docente tiene autorizados, incluidas las autorizaciones ya revocadas, que se distinguen por su marca de vigencia.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<AsignacionDocenteCurso>> EjecutarAsync(Guid docenteId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó el docente.']], l: 19 },
    },
  },
  'Horarios.Aplicacion.Docentes.ListarDocentes': {
    s: 'Devuelve los docentes activos en la forma que se muestra en pantalla.',
  },
  'Horarios.Aplicacion.Docentes.ObtenerDocente': {
    s: 'Busca un docente concreto, por identificador o por código, y lo devuelve en la forma que se muestra en pantalla.',
    m: {
      'ConvertirADto': { f: 'private static DocenteResumenDto ConvertirADto(Docente docente)', s: 'Deja fuera lo que la pantalla no necesita: fechas de auditoría y versión.', l: 72 },
      'PorCodigoAsync': { f: 'public async Task<DocenteResumenDto?> PorCodigoAsync(string codigo, CancellationToken cancellationToken = default)', s: 'Busca por código, normalizándolo a mayúsculas antes para que dé igual cómo lo hayan escrito. Es la búsqueda que usan las importaciones.', e: [['ArgumentException', 'No se indicó el código.']], l: 49 },
      'PorIdAsync': { f: 'public async Task<DocenteResumenDto?> PorIdAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Busca por identificador interno. Devuelve nulo si no existe: no encontrarlo es una respuesta válida, no un error.', e: [['ArgumentException', 'No se indicó el docente.']], l: 24 },
    },
  },
  'Horarios.Aplicacion.Docentes.RevocarCursoAutorizadoDocente': {
    s: 'Quita la vigencia de una autorización, sin borrarla: queda constancia de que en su momento existió, y el motor deja de considerar ese curso para el docente.',
    m: {
      'EjecutarAsync': { f: 'public async Task EjecutarAsync(Guid asignacionId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó la autorización.'], ['KeyNotFoundException', 'No hay una autorización vigente con ese identificador.']], l: 19 },
    },
  },
  'Horarios.Aplicacion.Importaciones.CodigosErrorImportacion': {
    s: 'Claves de los errores que puede dar una importación.\n\nSon cadenas estables y en mayúsculas: el mensaje se puede reescribir o traducir sin romper nada, porque quien compara —las pruebas y la interfaz— lo hace por el código.',
    m: {
      'ArchivoExtensionNoCoincideConTipo': { f: 'public const string ArchivoExtensionNoCoincideConTipo = "ARCHIVO_EXTENSION_NO_COINCIDE_CON_TIPO"', s: 'La extensión contradice el tipo declarado: un .csv anunciado como XLSX, o al revés.', l: 36 },
      'ArchivoExtensionNoSoportada': { f: 'public const string ArchivoExtensionNoSoportada = "ARCHIVO_EXTENSION_NO_SOPORTADA"', s: 'La extensión no es .csv ni .xlsx.', l: 16 },
      'ArchivoNombreRequerido': { f: 'public const string ArchivoNombreRequerido = "ARCHIVO_NOMBRE_REQUERIDO"', s: 'El archivo llegó sin nombre.', l: 12 },
      'ArchivoTipoNoSoportado': { f: 'public const string ArchivoTipoNoSoportado = "ARCHIVO_TIPO_NO_SOPORTADO"', s: 'El tipo de archivo declarado no se sabe leer.', l: 20 },
      'ArchivoVacio': { f: 'public const string ArchivoVacio = "ARCHIVO_VACIO"', s: 'El archivo no trae contenido.', l: 24 },
      'ColumnaDuplicada': { f: 'public const string ColumnaDuplicada = "COLUMNA_DUPLICADA"', s: 'El encabezado repite un nombre de columna, así que no se sabría cuál usar.', l: 64 },
      'ColumnaRequerida': { f: 'public const string ColumnaRequerida = "COLUMNA_REQUERIDA"', s: 'Falta una columna que la plantilla exige.', l: 40 },
      'ColumnasInconsistentes': { f: 'public const string ColumnasInconsistentes = "COLUMNAS_INCONSISTENTES"', s: 'Las hojas del libro no coinciden entre sí en sus columnas.', l: 76 },
      'CsvCantidadColumnasInvalida': { f: 'public const string CsvCantidadColumnasInvalida = "CSV_CANTIDAD_COLUMNAS_INVALIDA"', s: 'Una fila trae más o menos columnas que el encabezado.', l: 60 },
      'CsvFormatoInvalido': { f: 'public const string CsvFormatoInvalido = "CSV_FORMATO_INVALIDO"', s: 'El CSV no se puede leer: comillas sin cerrar, separadores rotos.', l: 56 },
      'FormulaNoPermitida': { f: 'public const string FormulaNoPermitida = "FORMULA_NO_PERMITIDA"', s: 'Una celda empieza por «=», «+», «-» o «@». Se rechaza porque al abrir el archivo en una hoja de cálculo se ejecutaría como fórmula.', l: 68 },
      'PlantillaCodigoRequerido': { f: 'public const string PlantillaCodigoRequerido = "PLANTILLA_CODIGO_REQUERIDO"', s: 'No se declaró qué plantilla sigue el archivo.', l: 28 },
      'PlantillaVersionRequerida': { f: 'public const string PlantillaVersionRequerida = "PLANTILLA_VERSION_REQUERIDA"', s: 'No se declaró con qué versión de la plantilla se armó.', l: 32 },
      'ReferenciaNoEncontrada': { f: 'public const string ReferenciaNoEncontrada = "REFERENCIA_NO_ENCONTRADA"', s: 'La celda apunta a algo que no existe: un código de facultad o de curso que no está dado de alta.', l: 52 },
      'ValorFormatoInvalido': { f: 'public const string ValorFormatoInvalido = "VALOR_FORMATO_INVALIDO"', s: 'La celda trae algo que no se puede interpretar: texto donde va un número, una fecha mal escrita.', l: 48 },
      'ValorRequerido': { f: 'public const string ValorRequerido = "VALOR_REQUERIDO"', s: 'Una celda obligatoria vino vacía.', l: 44 },
      'XlsxFormatoInvalido': { f: 'public const string XlsxFormatoInvalido = "XLSX_FORMATO_INVALIDO"', s: 'El XLSX no se puede abrir o no tiene la estructura esperada.', l: 72 },
    },
  },
  'Horarios.Aplicacion.Importaciones.GenerarPlantillaImportacion': {
    s: 'Prepara la plantilla para mostrarla a quien va a importar: le añade el nombre legible a la definición de columnas.',
    m: {
      'ObtenerNombrePlantilla': { f: 'private static string ObtenerNombrePlantilla(string codigo)', s: 'Título en español según el código. El caso por omisión cubre las plantillas que aún no tienen nombre propio, para que la pantalla nunca quede sin título.', l: 26 },
    },
  },
  'Horarios.Aplicacion.Importaciones.GenerarVistaPreviaCsv': {
    s: 'Lee un CSV y devuelve sus primeras filas para que quien importa vea qué se entendió antes de confirmar nada. No guarda nada.\n\nTrae su propio lector de CSV en vez de usar una biblioteca porque el formato que se admite es corto y cerrado: coma como separador, comillas dobles para escapar, y comilla repetida para una comilla literal.',
    m: {
      'Ejecutar': { f: 'public ResultadoVistaPreviaImportacionDto Ejecutar(VistaPreviaCsvSolicitud solicitud)', s: 'Valida, lee y devuelve columnas, filas y errores.\n\nSi el archivo ni siquiera pasa la revisión externa se devuelve sin leer nada: leer un archivo que ya se sabe malo solo añadiría errores derivados que confunden.\n\nEl tope de filas limita lo que se devuelve, no lo que se revisa: el archivo entero se recorre igual, porque un error en la fila mil hay que reportarlo aunque no se muestre esa fila.', e: [['ArgumentOutOfRangeException', 'El máximo de filas no es positivo.']], l: 34 },
      'Error': { f: 'private static ErrorImportacionDto Error(string archivo, int? fila, string? columna, string codigo, string mensaje, string? valor)', s: 'Arma un error de CSV. La hoja va siempre en nulo: un CSV no tiene hojas.', l: 245 },
      'EsFormula': { f: 'private static bool EsFormula(string valor)', s: 'Detecta los valores que una hoja de cálculo ejecutaría como fórmula al abrir el archivo. Se rechazan por seguridad: es la inyección de fórmulas en CSV.', l: 241 },
      'Parsear': { f: 'private static List<RegistroCsv> Parsear(string archivo, string contenido, ICollection<ErrorImportacionDto> errores)', s: 'Recorre el texto carácter a carácter y lo parte en registros.\n\nDentro de comillas, los saltos de línea son parte del valor y no cortan el registro: por eso se llevan dos contadores, `linea` para la línea física del archivo y `lineaRegistro` para dónde empezó el registro actual, que es lo que se reporta.\n\nSe admiten finales de línea de Windows y de Unix. Unas comillas sin cerrar al terminar el texto se reportan como error, y lo que quedara pendiente se emite igual como último registro para no perder datos que quizá se puedan leer.', l: 126 },
      'ValidarColumnas': { f: 'private static void ValidarColumnas(string archivo, IReadOnlyList<string> columnas, int fila, ICollection<ErrorImportacionDto> errores)', s: 'Revisa el encabezado: ninguna columna puede venir sin nombre, y ninguno se puede repetir, porque los valores se indexan por nombre y una repetición pisaría a la otra.', l: 211 },
    },
  },
  'Horarios.Aplicacion.Importaciones.GenerarVistaPreviaImportacion': {
    s: 'Vista previa común de un archivo de importación, sea CSV o XLSX. El CSV lo delega en `GenerarVistaPreviaCsv`; el XLSX lo lee aquí mismo.\n\nEl XLSX se abre a mano —es un ZIP con XML dentro— en vez de con una biblioteca de hojas de cálculo: solo hace falta leer texto de celdas, y así no se añade una dependencia grande ni se corre el riesgo de que ejecute contenido del archivo.',
    m: {
      'Ejecutar': { f: 'public ResultadoVistaPreviaImportacionDto Ejecutar(VistaPreviaImportacionSolicitud solicitud)', s: 'Devuelve columnas, filas y errores del archivo.\n\nUn XLSX corrupto es un dato malo, no un fallo del programa: los errores de ZIP y de XML se atrapan y se devuelven como error de importación, con un mensaje que quien importa pueda entender.', e: [['ArgumentOutOfRangeException', 'El máximo de filas no es positivo.']], l: 37 },
      'Error': { f: 'private static ErrorImportacionDto Error(string archivo, string? hoja, int? fila, string? columna, string codigo, string mensaje, string? valor)', s: 'Arma un error de XLSX, que sí lleva hoja además de fila y columna.', l: 288 },
      'HastaUltimaCelda': { f: 'private static IReadOnlyList<string> HastaUltimaCelda(IReadOnlyDictionary<int, string> celdas)', s: 'Convierte las celdas indexadas en una lista continua, rellenando con cadena vacía los huecos que el XLSX se saltó. Así el resto del código puede recorrer las columnas por posición sin preocuparse por los saltos.', l: 260 },
      'IndiceColumna': { f: 'private static int IndiceColumna(string letras)', s: 'Traduce la letra de columna de Excel a un índice desde cero: A da 0, Z da 25, AA da 26. Es numeración en base 26, pero sin cero, así que cada letra vale su posición en el alfabeto empezando en 1.', l: 247 },
      'LeerFila': { f: 'private static Dictionary<int, string> LeerFila(XElement fila, IReadOnlyList<string> compartidos, string archivo, string hoja, ICollection<ErrorImportacionDto> errores, bool admitirFormulas)', s: 'Lee una fila y devuelve sus celdas indexadas por número de columna.\n\nSe indexa por número, no por posición en la lista, porque el XLSX omite las celdas vacías: la fila puede saltar de la columna A a la D sin nada en medio.\n\nLas celdas de tipo «s» no traen el texto sino un número que apunta a la tabla de textos compartidos del libro, así que hay que resolverlo ahí.', p: [['admitirFormulas', 'En falso, cada celda con fórmula genera un error. Las fórmulas no se evalúan nunca; se rechazan.']], l: 149 },
      'LeerTextosCompartidos': { f: 'private static IReadOnlyList<string> LeerTextosCompartidos(ZipArchive zip)', s: 'Lee la tabla de textos compartidos del libro, donde Excel guarda una sola vez cada cadena repetida. Un libro sin esa tabla es válido: significa que no hay texto que compartir.', l: 186 },
      'LeerXlsx': { f: 'private static ResultadoVistaPreviaImportacionDto LeerXlsx(VistaPreviaImportacionSolicitud solicitud, List<ErrorImportacionDto> errores)', s: 'Recorre todas las hojas del libro y junta lo que encuentra.\n\nLas columnas se acumulan de todas las hojas sin repetir, porque un libro puede repartir los datos en varias. Cada fila conserva de qué hoja salió, para poder señalarla.\n\nUna hoja vacía se reporta y se sigue con las demás, en vez de abandonar el archivo entero.', e: [['InvalidDataException', 'El libro no tiene hojas, o falta una que dice tener.']], l: 80 },
      'NormalizarRutaHoja': { f: 'private static string NormalizarRutaHoja(string ruta)', s: 'Convierte la ruta relativa que declara el libro en una ruta absoluta dentro del ZIP, resolviendo «.» y «..» y unificando las barras.\n\nResolver «..» aquí, además de ser necesario para encontrar la hoja, evita que una ruta preparada se escape del archivo.', l: 230 },
      'ResolverHojas': { f: 'private static IReadOnlyList<HojaXlsx> ResolverHojas(ZipArchive zip)', s: 'Averigua qué hojas tiene el libro y en qué archivo está cada una.\n\nHace falta cruzar dos archivos: `workbook.xml` da el nombre de cada hoja y un identificador de relación, y `workbook.xml.rels` traduce ese identificador a la ruta real dentro del ZIP.', e: [['InvalidDataException', 'Falta alguno de los dos archivos.']], l: 205 },
      'ValidarColumnas': { f: 'private static void ValidarColumnas(string archivo, string hoja, IReadOnlyList<string> columnas, ICollection<ErrorImportacionDto> errores)', s: 'Revisa el encabezado de una hoja: ninguna columna sin nombre y ninguna repetida. Mismas reglas que en el CSV.', l: 272 },
    },
  },
  'Horarios.Aplicacion.Importaciones.HojaXlsx': {
    s: 'Una hoja del libro: el nombre que ve la persona y la ruta del archivo dentro del ZIP.',
  },
  'Horarios.Aplicacion.Importaciones.RegistroCsv': {
    s: 'Una fila ya partida en campos, con la línea del archivo en que empezó, para poder señalarla al reportar errores.',
  },
  'Horarios.Aplicacion.Importaciones.ValidarArchivoImportacion': {
    s: 'Primera revisión de un archivo de importación, hecha solo con sus datos externos: nombre, extensión, tamaño y plantilla declarada. No abre el contenido.\n\nSirve para rechazar temprano y barato lo que no vale la pena leer, y para dar un mensaje claro en vez de un error al intentar interpretar los bytes.',
    m: {
      'CrearError': { f: 'private static ErrorImportacionDto CrearError(string archivo, string codigo, string mensaje, string? valorRecibido)', s: 'Arma un error de archivo entero. Hoja, fila y columna van en nulo: en esta etapa todavía no se ha mirado dentro del archivo, así que no hay dónde señalar.', l: 114 },
      'Ejecutar': { f: 'public ResultadoValidacionImportacionDto Ejecutar(ArchivoImportacionDto archivo)', s: 'Revisa todo y devuelve el veredicto con la lista completa de problemas.\n\nNo se detiene en el primer error a propósito: quien está importando corrige de una vez en lugar de descubrir los fallos uno por uno.', l: 20 },
      'ExtensionCoincideConTipo': { f: 'private static bool ExtensionCoincideConTipo(string extension, TipoArchivoImportacion tipo)', s: 'Si la extensión del nombre concuerda con el tipo declarado. Se comprueban las dos cosas porque cualquiera de ellas puede venir mal por separado.', l: 98 },
    },
  },
  'Horarios.Aplicacion.Importaciones.ValidarImportacionPlantilla': {
    s: 'Compara la plantilla que trae un archivo contra la que el sistema espera: versión, tipo y columnas, en su orden.\n\nEs lo que impide que un archivo armado con una plantilla vieja se cargue como si fuera de la nueva, donde las columnas podrían significar otra cosa.',
    m: {
      'Ejecutar': { f: 'public IReadOnlyList<ErrorImportacionDto> Ejecutar(PlantillaImportacionVersionadaDto plantillaEsperada, PlantillaImportacionVersionadaDto plantillaRecibida)', s: 'Devuelve todo lo que no cuadra; lista vacía significa que la plantilla es la correcta.\n\nSi la cantidad de columnas ya no coincide se corta ahí: comparar una a una columnas desalineadas produciría un error por cada una y ninguno señalaría el problema real.\n\nLos nombres se comparan sin distinguir mayúsculas, porque las hojas de cálculo suelen cambiarlas al guardar.', l: 23 },
    },
  },
  'Horarios.Aplicacion.Planes.AlcancePlan': {
    s: 'Reglas comunes del alcance de un plan. El alcance vacío es válido y significa «todo el período»; lo que no se admite es un identificador vacío colado en la lista, porque acabaría filtrando por una carrera que no existe y dejaría la generación sin sesiones sin decir por qué.',
    m: {
      'Normalizar': { f: 'public static IReadOnlyList<Guid> Normalizar(IReadOnlyList<Guid>? ids, string nombre)', s: 'Limpia una lista de alcance: nula o vacía dan lista vacía, y los repetidos se quitan.', p: [['nombre', 'Cómo se llama esta lista en el mensaje de error («carreras», «jornadas»), para que se entienda cuál de las dos falló.']], e: [['ArgumentException', 'La lista trae un identificador vacío.']], l: 19 },
    },
  },
  'Horarios.Aplicacion.Planes.CambiarEstadoPlan': {
    s: 'Mueve un plan de una etapa a otra. Qué saltos son válidos lo decide el dominio; aquí se comprueba quién puede hacerlos y con qué condiciones.',
    m: {
      'EjecutarAsync': { f: 'public async Task<PlanHorario> EjecutarAsync(CambiarEstadoPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Aplica el cambio de estado y lo deja anotado.\n\nEl permiso depende del destino: aprobar y publicar piden el suyo propio, y el resto de movimientos se conforman con planes:actualizar. Un mismo caso de uso, tres puertas distintas.\n\nAntes de dejar un plan listo para aprobar, aprobado o publicado se comprueba que su horario esté completo y sin violaciones duras: es el punto donde deja de ser un borrador de trabajo y pasa a valer para todos.', e: [['KeyNotFoundException', 'El plan no existe.'], ['UnauthorizedAccessException', 'Sin el permiso que pide ese destino, o se intenta atribuir el cambio a otra persona.'], ['InvalidOperationException', 'El salto de estado no está permitido, o el horario no está en condiciones de avanzar.'], ['ArgumentException', 'Falta el motivo del cambio.']], l: 40 },
    },
  },
  'Horarios.Aplicacion.Planes.ConsultarPlan': {
    s: 'Devuelve un plan por su identificador. A diferencia de la consulta de la persistencia, aquí no encontrarlo es un error: quien llama ya venía con un plan concreto en mente.',
    m: {
      'EjecutarAsync': { f: 'public async Task<PlanHorario> EjecutarAsync(Guid planId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó el plan.'], ['KeyNotFoundException', 'El plan no existe.']], l: 20 },
    },
  },
  'Horarios.Aplicacion.Planes.CrearPlan': {
    s: 'Crea un plan de horario, en borrador. Generar es un paso aparte.',
    m: {
      'EjecutarAsync': { f: 'public Task<PlanHorario> EjecutarAsync(CrearPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea el plan y lo devuelve ya guardado.', e: [['UnauthorizedAccessException', 'Sin el permiso planes:crear.'], ['ArgumentException', 'Falta el período, o el alcance trae un identificador vacío.']], l: 28 },
    },
  },
  'Horarios.Aplicacion.Planes.GestionarPlanes': {
    s: 'Edición y baja de planes. El alta vive en `CrearPlan` y los cambios de estado en `CambiarEstadoPlan`.',
    m: {
      'ActualizarAsync': { f: 'public async Task<PlanHorario> ActualizarAsync(ActualizarPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un plan.\n\nSolo se edita en borrador: una vez generado, cambiar el alcance dejaría el horario existente sin relación con lo que el plan dice cubrir.', e: [['UnauthorizedAccessException', 'Sin el permiso planes:actualizar.'], ['ArgumentException', 'Falta el plan o el período, el alcance trae un identificador vacío, o el plan se declara origen de sí mismo.'], ['KeyNotFoundException', 'El plan no existe.'], ['InvalidOperationException', 'El plan ya no está en borrador.']], l: 34 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Borra un plan que todavía no ha avanzado.\n\nSolo se admite en borrador o recién generado: a partir de revisión el plan ya entró en un circuito de aprobación del que tiene que quedar rastro, y para eso está archivarlo.', e: [['UnauthorizedAccessException', 'Sin el permiso planes:actualizar.'], ['KeyNotFoundException', 'El plan no existe.'], ['InvalidOperationException', 'El plan ya pasó de generado.']], l: 62 },
    },
  },
  'Horarios.Aplicacion.Planes.IDatosPlanes': {
    s: 'Puerto hacia la persistencia de planes de horario.',
    m: {
      'ActualizarAsync': { f: 'Task<PlanHorario> ActualizarAsync(ActualizarPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un plan y devuelve cómo quedó.', l: 37 },
      'CrearAsync': { f: 'Task<PlanHorario> CrearAsync(CrearPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta el plan en borrador y devuelve la fila creada.', l: 12 },
      'EliminarAsync': { f: 'Task<bool> EliminarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Borrado lógico del plan. Falso si no había nada que borrar.', l: 43 },
      'EsCompletoYValidoAsync': { f: 'Task<bool> EsCompletoYValidoAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Si el horario del plan está completo y sin violaciones duras, es decir si se puede aprobar y publicar.\n\nLa implementación por omisión devuelve verdadero para no bloquear a los dobles de prueba, que no tienen horario que revisar.', l: 55 },
      'GuardarCambioEstadoAsync': { f: 'Task<PlanHorario> GuardarCambioEstadoAsync(PlanHorario plan, EstadoHorario estadoAnterior, long versionAnterior, Guid? cambiadoPorId, CancellationToken cancellationToken = default)', s: 'Guarda el cambio de estado y lo deja anotado en el historial.\n\n`versionAnterior` es el control de concurrencia: si la fila cambió desde que se leyó, la escritura se rechaza en vez de pisar el trabajo de otro. El estado anterior se guarda para que el historial diga de dónde a dónde se movió.', l: 29 },
      'ListarAsync': { f: 'Task<IReadOnlyList<PlanHorario>> ListarAsync(Guid? periodoId, TipoPlanHorario? tipo, CancellationToken cancellationToken = default)', s: 'Planes, filtrados por período y tipo. Ambos filtros en nulo devuelven todos.', l: 18 },
      'ObtenerAsync': { f: 'Task<PlanHorario?> ObtenerAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un plan por su identificador, o nulo si no existe.', l: 14 },
    },
  },
  'Horarios.Aplicacion.Planes.IDatosRevisionPlanes': {
    s: 'Puerto hacia los conteos que se necesitan para saber si un plan se puede generar.',
    m: {
      'ObtenerConteosAsync': { f: 'Task<ConteosRevisionPlan> ObtenerConteosAsync(Guid periodoId, IReadOnlyList<Guid> carreraIds, IReadOnlyList<Guid> jornadaIds, CancellationToken cancellationToken = default)', s: 'Los conteos se limitan al alcance del plan. Listas vacías equivalen a todo el período.', l: 13 },
    },
  },
  'Horarios.Aplicacion.Planes.ListarPlanes': {
    s: 'Devuelve los planes, con filtros opcionales por período y por tipo.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<PlanHorario>> EjecutarAsync(Guid? periodoId = null, TipoPlanHorarioDto? tipo = null, CancellationToken cancellationToken = default)', s: 'Sin filtros devuelve todos los planes. Un período nulo significa «cualquiera», pero un período vacío es un error: delata un desplegable sin elegir, no una intención de no filtrar.', e: [['ArgumentException', 'Se pasó un período vacío.']], l: 24 },
    },
  },
  'Horarios.Aplicacion.Planes.RevisarDatosPlan': {
    s: 'Diagnóstico previo a generar: cuenta lo que hay y dice qué falta, en español.\n\nExiste para que el error se vea en los datos y no en un horario vacío media hora después. Lo llama la pantalla antes de ofrecer el botón de generar, y lo vuelve a llamar `GenerarHorarioPlan` antes de arrancar el motor.',
    m: {
      'EjecutarAsync': { f: 'public async Task<ResultadoRevisionPlanDto> EjecutarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Revisa el plan y devuelve el veredicto con la lista de lo que falta.\n\nCuando no hay cohortes, el mensaje cambia según el plan cubra todo el período o solo una parte: no es lo mismo que el período esté vacío que haber elegido un alcance donde no cae nadie, y confundirlos lleva a buscar el problema en el sitio equivocado.', e: [['ArgumentException', 'No se indicó el plan.'], ['InvalidOperationException', 'El plan no existe.']], l: 47 },
    },
  },
  'Horarios.Infraestructura.Academia.CarreraFila': {
    s: 'La fila de `carreras` tal como viene de la base.',
    m: {
      'ADominio': { f: 'public Carrera ADominio()', s: 'Convierte la fila en la carrera del dominio.', l: 235 },
    },
  },
  'Horarios.Infraestructura.Academia.DatosAcademiaPostgres': {
    s: 'Persistencia de facultades y carreras sobre Supabase. Qué hace cada método está explicado en `IDatosAcademia`; aquí solo está el cómo.\n\nDos costumbres se repiten en todas las consultas: el filtro `eliminado_en is null`, porque el borrado es lógico y la fila sigue ahí, y el paso por un tipo `*Fila` intermedio, para que el dominio no dependa de cómo se llaman las columnas.',
    m: {
      'ActualizarCarreraAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ActualizarFacultadAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'CrearCarreraAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'CrearFacultadAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'EliminarAsync': { f: 'private async Task<bool> EliminarAsync(string tabla, Guid id, CancellationToken cancellationToken)', s: 'Borrado lógico: marca la fecha y desactiva, en vez de borrar de verdad, porque los horarios ya generados siguen apuntando a estas filas.\n\nEl filtro exige que no estuviera ya borrada, así que un segundo intento devuelve falso en lugar de volver a marcarla con otra fecha.', l: 188 },
      'EliminarCarreraAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'EliminarFacultadAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ExisteCarreraConCodigoAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ExisteCodigoAsync': { f: 'private async Task<bool> ExisteCodigoAsync(string tabla, string codigo, CancellationToken cancellationToken)', s: 'Si una tabla ya tiene ese código sin borrar. Pide solo la columna del identificador: lo único que importa es si la fila existe.', l: 167 },
      'ExisteFacultadConCodigoAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ListarCarrerasActivasAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ListarFacultadesActivasAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ObtenerCarreraAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
      'ObtenerFacultadAsync': { h: 'Horarios.Aplicacion.Academia.IDatosAcademia' },
    },
  },
  'Horarios.Infraestructura.Academia.DatosGestionAcademicaPostgres': {
    s: 'Persistencia del catálogo académico sobre Supabase: pensums, cursos, cohortes y agrupaciones. Qué hace cada método está explicado en `IDatosGestionAcademica`.\n\nLo que se lee en dos pasos o cruza varias tablas —cohortes activas, agrupaciones— sale de vistas y funciones de la base, no de consultas armadas aquí.',
    m: {
      'AEstado': { f: 'private static EstadoPensum AEstado(string estado)', s: 'Traduce el estado del pensum. `en_retiro` se trata aparte porque su nombre en la base lleva guion bajo y el análisis por nombre no lo reconocería.', l: 285 },
      'ActivarCohortePeriodoAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ActualizarAgrupacionAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ActualizarCohorteAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ActualizarCursoComunAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ActualizarCursoEnPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ActualizarPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'CrearAgrupacionAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'CrearCohorteAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'CrearCursoComunAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'CrearCursoEnPensumAsync': { f: 'public Task<CursoDePensum> CrearCursoEnPensumAsync(CrearCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Va por función de la base porque el alta toca dos tablas —el curso y su fila de malla— y las dos tienen que quedar o no quedar juntas.', l: 33 },
      'CrearPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'DesactivarCohortePeriodoAsync': { f: 'public async Task<bool> DesactivarCohortePeriodoAsync(Guid cohorteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Baja lógica de la activación: el disparador de validación solo exige cursos en el pensum cuando la fila queda activa, así que apagarla siempre procede.', l: 87 },
      'EliminarAgrupacionAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EliminarAsync': { f: 'private async Task<bool> EliminarAsync(string tabla, Guid id, CancellationToken cancellationToken)', s: 'Borrado lógico compartido. Exigir que no estuviera borrada hace que un segundo intento devuelva falso en lugar de volver a marcarla con otra fecha.', l: 305 },
      'EliminarCohorteAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EliminarCursoAsync': { f: 'public Task<bool> EliminarCursoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'La baja también toca dos tablas y además saca al curso del grupo de equivalentes en que estuviera, así que va por función de la base.', l: 243 },
      'EliminarCursoComunAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EliminarPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'FiltrosActivos': { f: 'private static KeyValuePair<string, string?>[] FiltrosActivos(Guid id)', s: 'Los dos filtros que lleva toda escritura sobre una fila: que sea esa, y que no esté ya borrada.', l: 295 },
      'ListarAgrupacionesAsync': { f: 'public async Task<IReadOnlyList<AgrupacionAreaComun>> ListarAgrupacionesAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Va por función de la base porque cada agrupación arrastra dos listas —cursos y cohortes— y armarlas aquí serían varias consultas más.', l: 273 },
      'ListarCohortesActivasAsync': { f: 'public async Task<IReadOnlyList<CohorteActivaPeriodo>> ListarCohortesActivasAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Lee la vista `api_cohortes_activas`, que ya trae el semestre y la matrícula del período en vez de los de la cohorte.', l: 260 },
      'ListarCohortesAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarCursosAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarCursosComunesAsync': { f: 'public async Task<IReadOnlyList<CursoComun>> ListarCursosComunesAsync(CancellationToken cancellationToken = default)', s: 'Va por función de la base por lo mismo que las agrupaciones: cada grupo arrastra su lista de cursos y armarla aquí serían varias consultas más.', l: 145 },
      'ListarCursosPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarPensumsAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
    },
  },
  'Horarios.Infraestructura.Academia.DatosPeriodosAcademicosPostgres': {
    s: 'Persistencia de períodos académicos sobre Supabase. Qué hace cada método está explicado en `IDatosPeriodosAcademicos`.',
    m: {
      'ActualizarAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'CrearAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'EliminarAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'ExisteConNombreAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'ListarAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'ListarCoberturaAsync': { f: 'public async Task<IReadOnlyList<CursoCubiertoPeriodo>> ListarCoberturaAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Lee la vista `api_cursos_periodo`, que ya hace el cruce entre cohortes, pensums y semestres. Es la misma vista que usa el motor, y por eso lo que aquí se muestra es exactamente lo que se va a programar.', l: 132 },
      'ObtenerAsync': { h: 'Horarios.Aplicacion.Academia.IDatosPeriodosAcademicos' },
      'TieneDependenciasAsync': { f: 'public async Task<bool> TieneDependenciasAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Busca lo primero que cuelgue del período: una cohorte activa o un plan. Basta con encontrar uno, así que la consulta de planes ni siquiera se lanza si ya hubo cohorte.', l: 106 },
    },
  },
  'Horarios.Infraestructura.Academia.DatosSugerenciasSeccionPostgres': {
    s: 'Guarda las sugerencias de sección. El estado inicial y la fecha los pone la base de datos, no esta capa.',
  },
  'Horarios.Infraestructura.Academia.FacultadFila': {
    s: 'La fila de `facultades` tal como viene de la base.',
    m: {
      'ADominio': { f: 'public Facultad ADominio()', s: 'Convierte la fila en la facultad del dominio.', l: 215 },
    },
  },
  'Horarios.Infraestructura.Academia.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Academia.PensumFila': {
    s: 'La fila de `pensums`, con el estado todavía como texto.',
    m: {
      'ADominio': { f: 'public Pensum ADominio()', s: 'Convierte la fila en el pensum del dominio.', l: 315 },
    },
  },
  'Horarios.Infraestructura.Academia.PeriodoFila': {
    s: 'La fila de `periodos_academicos`. El estado sí llega ya convertido, porque su nombre en la base coincide con el del dominio.',
    m: {
      'ADominio': { f: 'public PeriodoAcademico ADominio()', s: 'Convierte la fila en el período del dominio.', l: 157 },
    },
  },
  'Horarios.Infraestructura.Acceso.AutenticadorSupabase': {
    s: 'Autenticación contra Supabase Auth. Es el adaptador de `IAutenticadorSupabase`.\n\nAdemás de devolver la sesión, deja el token en el contexto de la petición para que las consultas que vengan después salgan ya a nombre del usuario.',
    m: {
      'CerrarSesionAsync': { f: 'public async Task CerrarSesionAsync(string tokenAcceso, CancellationToken cancellationToken = default)', s: 'Invalida la sesión en Supabase y borra el token del contexto.\n\nUn 401 se acepta como éxito: significa que el token ya no valía, y eso es justo lo que se quería conseguir.', l: 67 },
      'IniciarSesionAsync': { f: 'public async Task<SesionSupabase> IniciarSesionAsync(string correo, string contrasena, CancellationToken cancellationToken = default)', s: 'Cambia correo y contraseña por una sesión.\n\nUn 400 y un 401 se traducen los dos a credenciales inválidas: Supabase distingue entre «no existe» y «contraseña incorrecta», y repetir esa distinción hacia fuera diría a un atacante qué correos están dados de alta.', e: [['UnauthorizedAccessException', 'El correo o la contraseña no valen.'], ['InvalidOperationException', 'Supabase respondió, pero sin sesión o sin los datos que hacen falta.']], l: 30 },
    },
  },
  'Horarios.Infraestructura.Acceso.DatosAccesoPostgres': {
    s: 'Persistencia de usuarios, roles y permisos sobre Supabase.\n\nLas consultas simples van por la API de datos; lo que exige cruzar tablas de roles y permisos va por funciones de la base, que resuelven la jerarquía en una sola llamada.',
    m: {
      'ATipo': { f: 'private static TipoUsuario ATipo(string tipo)', s: 'Traduce el tipo que guarda la base al del dominio. `coordinador_academico` se trata aparte porque su nombre en la base lleva guion bajo y el análisis por nombre no lo reconocería.', l: 119 },
      'CrearUsuarioInicialAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
      'ListarPermisosAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
      'ListarRolesAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
      'ObtenerPorAuthUserIdAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
      'ObtenerPorCorreoAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
      'SigueVigenteAsync': { f: 'public async Task<bool> SigueVigenteAsync(Guid usuarioId, long versionFila, CancellationToken cancellationToken = default)', s: 'Comprueba en una sola consulta que el usuario siga activo, sin borrar y con la misma versión de fila. Todo va como filtro: si algo no cuadra la fila no vuelve, y eso ya es la respuesta.', l: 90 },
      'TienePermisoAsync': { h: 'Horarios.Aplicacion.Acceso.IDatosAcceso' },
    },
  },
  'Horarios.Infraestructura.Acceso.DatosAlcanceUsuarioPostgres': {
    s: 'Consulta el alcance de un usuario. Lo resuelve una función de la base de datos porque hay que cruzar varias tablas —usuario, docente, facultades— y conviene hacerlo de una vez, cerca de los datos.',
  },
  'Horarios.Infraestructura.Acceso.IdFila': {
    s: 'Fila de la que solo interesa que exista. Se pide una sola columna porque el resto no se va a mirar.',
  },
  'Horarios.Infraestructura.Acceso.RespuestaSesion': {
    s: 'La respuesta de Supabase Auth. Lleva sus nombres declarados uno a uno porque este extremo usa nombres propios que no siguen la convención del resto de la API.',
  },
  'Horarios.Infraestructura.Acceso.UsuarioFila': {
    s: 'La fila tal como viene de la base, con el tipo y el estado todavía como texto. Existe para que el dominio no tenga que saber cómo se escriben esos valores en Postgres.',
    m: {
      'ADominio': { f: 'public Usuario ADominio()', s: 'Convierte la fila en el usuario del dominio.', l: 148 },
    },
  },
  'Horarios.Infraestructura.Acceso.UsuarioSupabase': {
    s: 'Del usuario que devuelve Supabase solo interesa su identificador.',
  },
  'Horarios.Infraestructura.Aulas.AulaFila': {
    s: 'La fila de `aulas`, con el tipo todavía como texto.',
    m: {
      'ADominio': { f: 'public Aula ADominio()', s: 'Convierte la fila en el aula del dominio.', l: 287 },
    },
  },
  'Horarios.Infraestructura.Aulas.DatosAulasPostgres': {
    s: 'Persistencia de aulas, jornadas y descansos sobre Supabase. Qué hace cada método está explicado en `IDatosAulas`.\n\nAulas y jornadas se dan de baja lógicamente porque los horarios generados las referencian; los descansos, en cambio, se borran de verdad.',
    m: {
      'AClaseDia': { f: 'private static DiaSemana AClaseDia(string valor)', s: 'Traduce el día desde el texto de la base, que lo guarda en minúsculas.', l: 268 },
      'AClaseTipo': { f: 'private static TipoAula AClaseTipo(string valor)', s: 'Traduce el tipo de aula desde el texto de la base. Un valor desconocido falla en vez de caer en un valor por omisión: sería un tipo nuevo en la base que este código todavía no sabe tratar, y adivinar llevaría a colocar clases donde no deben ir.', e: [['InvalidOperationException', 'La base trae un tipo que no se reconoce.']], l: 256 },
      'ActualizarAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ActualizarDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ActualizarJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ExisteAulaEnPisoAsync': { f: 'public async Task<bool> ExisteAulaEnPisoAsync(int piso, int numeroAula, Guid? excluirAulaId = null, CancellationToken cancellationToken = default)', s: 'Busca otra aula en el mismo piso y número. El filtro de exclusión solo se añade al editar, para que el aula no choque consigo misma.', l: 94 },
      'ListarAulasActivasAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ListarDescansosAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ListarJornadasActivasAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
    },
  },
  'Horarios.Infraestructura.Aulas.DatosRecursosAulasPostgres': {
    s: 'Persistencia del catálogo de recursos y de su asignación a las aulas. Qué hace cada método está explicado en `IDatosRecursosAulas`.\n\nLos recursos se dan de baja lógicamente, pero desasignar un recurso de un aula sí borra la fila: la asignación no tiene historia que conservar.',
    m: {
      'ActualizarAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosRecursosAulas' },
      'AsignarAsync': { f: 'public Task AsignarAsync(AsignarRecursoAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Va por función de la base porque asignar es «insertar o actualizar la cantidad», y esa decisión se toma mejor donde está la restricción de unicidad.', l: 34 },
      'CrearAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosRecursosAulas' },
      'DesasignarAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosRecursosAulas' },
      'EliminarAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosRecursosAulas' },
      'ListarAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosRecursosAulas' },
      'ListarPorAulaAsync': { f: 'public async Task<IReadOnlyList<RecursoAsignadoAula>> ListarPorAulaAsync(Guid aulaId, CancellationToken cancellationToken = default)', s: 'Lee la vista `api_recursos_aula`, que ya cruza la asignación con el catálogo y trae el código y el nombre junto a la cantidad.', l: 58 },
    },
  },
  'Horarios.Infraestructura.Aulas.DescansoFila': {
    s: 'La fila de descansos, con el día todavía como texto.',
    m: {
      'ADominio': { f: 'public DescansoJornada ADominio()', s: 'Convierte la fila en el descanso del dominio.', l: 328 },
    },
  },
  'Horarios.Infraestructura.Aulas.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Aulas.JornadaFila': {
    s: 'La fila de `jornadas`. Los días vienen como arreglo de texto, tal como los guarda Postgres.',
    m: {
      'ADominio': { f: 'public Jornada ADominio()', s: 'Convierte la fila en la jornada del dominio.', l: 313 },
    },
  },
  'Horarios.Infraestructura.Docentes.DatosDisponibilidadDocentePostgres': {
    s: 'Persistencia de la disponibilidad docente.\n\nGuardar y leer pasan por funciones de la base: reemplazar la rejilla entera son muchas escrituras que tienen que ocurrir juntas o no ocurrir.',
    m: {
      'GuardarAsync': { f: 'public Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Reemplaza la rejilla del docente en ese período.\n\nEl día se manda en minúsculas porque así se llama el valor en el tipo enumerado de Postgres.', l: 33 },
      'ObtenerAsync': { f: 'public Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Devuelve lo declarado, o nulo si el docente aún no ha respondido: que no haya nada es una respuesta normal, no un error.', l: 54 },
      'ObtenerDocenteAsync': { f: 'public Task<Docente?> ObtenerDocenteAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'Reutiliza la consulta de docentes en vez de repetirla aquí, para que ambos módulos vean exactamente el mismo docente.', l: 22 },
    },
  },
  'Horarios.Infraestructura.Docentes.DatosDocentesPostgres': {
    s: 'Persistencia de docentes y de sus cursos autorizados. Qué hace cada método está explicado en `IDatosDocentes`.\n\nLa particularidad de este adaptador es la relación N:M con facultades, que vive en la tabla puente `docente_facultades`: se lee embebida y se escribe con una rutina que reemplaza el conjunto entero.',
    m: {
      'AArreglo': { f: 'private static Guid[] AArreglo(IReadOnlyList<Guid>? ids)', s: 'Lista nula o con repetidos a arreglo limpio, que es lo que espera la rutina.', l: 215 },
      'ActualizarAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'AutorizarCursoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ConsultarActivosAsync': { f: 'private async Task<IReadOnlyList<Docente>> ConsultarActivosAsync(IEnumerable<KeyValuePair<string, string?>> adicionales, CancellationToken cancellationToken)', s: 'Consulta base de docentes activos, a la que cada llamador añade sus propios filtros. Tener los filtros comunes en un solo sitio evita que una consulta se olvide de descartar los dados de baja.', l: 183 },
      'ConsultarUnoActivoAsync': { f: 'private async Task<Docente?> ConsultarUnoActivoAsync(KeyValuePair<string, string?> filtro, CancellationToken cancellationToken)', s: 'La misma consulta base, para cuando se espera un solo docente.', l: 200 },
      'CrearAsync': { f: 'public async Task<Docente> CrearAsync(CrearDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Alta en dos pasos, como `DatosPlanesPostgres.ActualizarAsync`: la fila del docente por la Data API y sus facultades por la rutina que reemplaza el conjunto entero. Si el segundo paso fallara, el docente queda sin facultades, que es un estado válido —el docente compartido— y no una fila a medio escribir.', l: 24 },
      'EliminarAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ExisteCursoActivoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'FijarFacultadesAsync': { f: 'private Task FijarFacultadesAsync(Guid docenteId, IReadOnlyList<Guid> facultadIds, CancellationToken cancellationToken)', s: 'Reemplaza de una vez las facultades del docente. Es una función de la base porque hay que borrar e insertar juntos, dentro de la misma transacción.', l: 168 },
      'ListarActivosAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ListarCursosAutorizadosAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ListarPorFacultadAsync': { f: 'public async Task<IReadOnlyList<Docente>> ListarPorFacultadAsync(Guid facultadId, CancellationToken cancellationToken = default)', s: 'Se resuelve en dos peticiones a propósito. Filtrar por la tabla puente embebida (`docente_facultades!inner`) traería un solo viaje, pero PostgREST aplicaría el filtro también al recurso embebido y cada docente volvería declarando una sola facultad: justo la mentira que esta relación N:M vino a eliminar.', l: 65 },
      'ObtenerPorCodigoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ObtenerPorIdAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'RevocarCursoAutorizadoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
    },
  },
  'Horarios.Infraestructura.Docentes.DocenteFila': {
    s: 'La fila de `docentes`, con sus facultades embebidas cuando la consulta las pidió.',
    m: {
      'ADominio': { f: 'public Docente ADominio()', s: 'Convierte usando las facultades que vinieron embebidas. Sin ellas queda como docente compartido, que es lo correcto: es lo mismo que decir que no pertenece a ninguna.', l: 259 },
    },
  },
  'Horarios.Infraestructura.Docentes.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Docentes.PertenenciaFacultadFila': {
    s: 'Una facultad embebida en la fila del docente.',
  },
  'Horarios.Infraestructura.Docentes.PertenenciaFila': {
    s: 'Fila de la tabla puente leída al revés: qué docentes hay en una facultad.',
  },
  'Horarios.Infraestructura.Planes.CarreraAlcanceFila': {
    s: 'Una carrera del alcance, embebida en la fila del plan.',
  },
  'Horarios.Infraestructura.Planes.DatosGeneracionesPostgres': {
    s: 'Persistencia transaccional de generaciones y horarios.',
  },
  'Horarios.Infraestructura.Planes.DatosPlanesPostgres': {
    s: 'Persistencia de planes de horario sobre Supabase. Qué hace cada método está explicado en `IDatosPlanes`.\n\nEl alcance del plan —sus carreras y jornadas— vive en dos tablas puente. Se lee embebido y se escribe con una rutina que reemplaza el conjunto entero.',
    m: {
      'AArreglo': { f: 'private static Guid[] AArreglo(IReadOnlyList<Guid>? ids)', s: 'Lista nula o con repetidos a arreglo limpio, que es lo que espera la rutina.', l: 182 },
      'AEstado': { f: 'private static EstadoHorario AEstado(string estado)', s: 'Traduce el estado desde el texto de la base. Los dos valores con guion bajo se tratan aparte porque el análisis por nombre no los reconocería.', l: 194 },
      'ActualizarAsync': { f: 'public async Task<PlanHorario> ActualizarAsync(ActualizarPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Edición en dos pasos: la fila del plan por la API de datos y su alcance por la rutina que lo reemplaza entero.\n\nEl estado borrador va como filtro, no como comprobación previa: así la condición la verifica la propia base al escribir, y no queda hueco entre mirar y actuar.', e: [['KeyNotFoundException', 'No hay un plan en borrador con ese identificador.']], l: 112 },
      'CrearAsync': { h: 'Horarios.Aplicacion.Planes.IDatosPlanes' },
      'EliminarAsync': { f: 'public async Task<bool> EliminarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Borrado suave. Solo alcanza a los planes que aún no entraron al flujo de revisión: borrador y generado. A partir de «en revisión» la salida es archivar.', l: 146 },
      'EsCompletoYValidoAsync': { h: 'Horarios.Aplicacion.Planes.IDatosPlanes' },
      'GuardarCambioEstadoAsync': { f: 'public async Task<PlanHorario> GuardarCambioEstadoAsync(PlanHorario plan, EstadoHorario estadoAnterior, long versionAnterior, Guid? cambiadoPorId, CancellationToken cancellationToken = default)', s: 'Cambia el estado por función de la base, que en la misma transacción comprueba la versión, actualiza la fila y anota el movimiento en el historial.\n\nEl conflicto de versión llega como un error genérico de Supabase; aquí se reconoce por su marca y se vuelve a lanzar con un mensaje que quien lo lea pueda entender y actuar: alguien más tocó el plan, hay que reintentar.', e: [['InvalidOperationException', 'El plan cambió desde que se leyó.']], l: 74 },
      'ListarAsync': { h: 'Horarios.Aplicacion.Planes.IDatosPlanes' },
      'ObtenerAsync': { h: 'Horarios.Aplicacion.Planes.IDatosPlanes' },
    },
  },
  'Horarios.Infraestructura.Planes.DatosRevisionPlanesPostgres': {
    s: 'Consulta los conteos previos a generar. Van todos en una sola función de la base porque son media docena de cuentas sobre tablas distintas: traerlas por separado sería media docena de viajes por la red para pintar una sola pantalla.\n\nLas listas de alcance vacías las interpreta la propia función como «todo el período».',
    m: {
      'ObtenerConteosAsync': { h: 'Horarios.Aplicacion.Planes.IDatosRevisionPlanes' },
    },
  },
  'Horarios.Infraestructura.Planes.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Planes.JornadaAlcanceFila': {
    s: 'Una jornada del alcance, embebida en la fila del plan.',
  },
  'Horarios.Infraestructura.Planes.PlanFila': {
    s: 'La fila de `horarios`, con su alcance embebido cuando la consulta lo pidió.',
    m: {
      'ADominio': { f: 'public PlanHorario ADominio()', s: 'Convierte usando el alcance que vino embebido. Sin él queda como plan que cubre todo el período, que es lo que significa el alcance vacío.', l: 223 },
    },
  },
  'Horarios.Infraestructura.Supabase.ClienteDatosSupabase': {
    s: 'Cliente de la API de datos de Supabase (PostgREST) y de su almacenamiento de archivos.\n\nEs la única pieza del proyecto que habla HTTP con Supabase; todos los adaptadores de persistencia pasan por aquí. Se llama a la API REST en vez de conectarse a Postgres directamente para que las políticas de acceso por fila se apliquen con el token del usuario, no con una credencial de servicio.',
    m: {
      'CrearOpcionesJson': { f: 'private static JsonSerializerOptions CrearOpcionesJson()', s: 'Configura el JSON para que encaje con Postgres: nombres en `snake_case`, lectura tolerante a mayúsculas, enumeraciones como texto y horas en `HH:mm:ss`.', l: 315 },
      'CrearRuta': { f: 'private static string CrearRuta(string recurso, IEnumerable<KeyValuePair<string, string?>>? parametros = null)', s: 'Arma la ruta con su cadena de consulta. Los parámetros con valor nulo se omiten, para que un filtro opcional sin valor simplemente no filtre.', l: 261 },
      'Desplazar': { f: 'public static KeyValuePair<string, string?> Desplazar(int cantidad)', s: 'Cuántas filas saltar. Con el límite, es la paginación.', l: 191 },
      'EliminarAsync': { f: 'public async Task<bool> EliminarAsync(string recurso, IEnumerable<KeyValuePair<string, string?>> filtros, CancellationToken cancellationToken = default)', s: 'Borra las filas que casan con los filtros. Devuelve si borró algo, mirando si la respuesta trae filas: se pide la representación justamente para poder distinguir entre «no existía» y «se borró».', l: 99 },
      'EnviarAsync': { f: 'private async Task<HttpResponseMessage> EnviarAsync(HttpMethod metodo, string ruta, object? contenido, CancellationToken cancellationToken, bool devolverRepresentacion = false)', s: 'Punto único por donde sale toda petición: pone el esquema, el token si lo hay, y convierte cualquier respuesta de error en una excepción con el código y el detalle, para que quien la vea sepa qué rechazó Supabase.', p: [['devolverRepresentacion', 'Pide a PostgREST que devuelva las filas afectadas. Sin esto, una escritura responde vacío.']], e: [['InvalidOperationException', 'Supabase respondió con un código de error.']], l: 230 },
      'EscaparRuta': { f: 'private static string EscaparRuta(string ruta)', s: 'Escapa cada tramo de la ruta por separado, para que las barras sigan separando carpetas en lugar de convertirse en parte de un nombre.', l: 290 },
      'EscaparValorConsulta': { f: 'private static string EscaparValorConsulta(string valor)', s: 'Escapa el valor pero devuelve tal cual la coma, los paréntesis y el asterisco: son la sintaxis de PostgREST —listas `in.(a,b)` y comodines de `like`— y escapados dejarían de significar lo que significan.', l: 279 },
      'Filtro': { f: 'public static KeyValuePair<string, string?> Filtro(string columna, string operador, object? valor)', s: 'Arma un filtro de PostgREST, con la forma `columna=operador.valor`.\n\nUn valor nulo se traduce a `is.null`, no a «igual a nada»: en SQL nada es igual a nulo, así que el operador que se pidió no serviría.', l: 181 },
      'Formatear': { f: 'public static string Formatear(object valor)', s: 'Convierte un valor al texto que entiende PostgREST. Es la única conversión de enumeraciones del proyecto: usa la misma política `snake_case` que `Json`, así que el valor de un filtro y el del cuerpo que lo escribió no pueden desalinearse. Público porque algún filtro necesita componer el texto a mano, como el `in.(a,b)` de los estados de plan.', l: 301 },
      'Json': { f: 'public static readonly JsonSerializerOptions Json = CrearOpcionesJson()', s: 'Opciones de JSON compartidas. Son públicas porque algunos adaptadores serializan por su cuenta y tienen que usar exactamente las mismas reglas.', l: 31 },
      'Limitar': { f: 'public static KeyValuePair<string, string?> Limitar(int cantidad)', s: 'Cuántas filas traer como mucho.', l: 189 },
      'Ordenar': { f: 'public static KeyValuePair<string, string?> Ordenar(string columnas)', s: 'Por qué columnas ordenar.', l: 187 },
      'RpcAsync': { f: 'public Task<T> RpcAsync<T>(string funcion, object? parametros = null, CancellationToken cancellationToken = default)', s: 'Llama a una función de la base de datos y devuelve su resultado. Muchas operaciones viven en funciones de Postgres porque necesitan hacer varias escrituras dentro de una misma transacción.', l: 116 },
      'Seleccionar': { f: 'public static KeyValuePair<string, string?> Seleccionar(string columnas)', s: 'Qué columnas traer. Admite la sintaxis de PostgREST para tablas relacionadas.', l: 185 },
      'SubirArchivoAsync': { f: 'public async Task<string> SubirArchivoAsync(string bucket, string ruta, byte[] contenido, string tipoContenido, CancellationToken cancellationToken = default)', s: 'Sube un archivo al almacenamiento y devuelve su ruta.\n\nVa con `x-upsert: false`: si la ruta ya existe, la subida falla en vez de pisar el archivo anterior.', e: [['InvalidOperationException', 'Supabase rechazó la subida; el mensaje lleva el código y el detalle que devolvió.']], l: 154 },
    },
  },
  'Horarios.Infraestructura.Supabase.ContextoTokenSupabase': {
    s: 'Implementación simple: un campo que se escribe y se lee dentro de la misma petición.',
    m: {
      'TokenAcceso': { h: 'Horarios.Infraestructura.Supabase.IContextoTokenSupabase' },
    },
  },
  'Horarios.Infraestructura.Supabase.IContextoTokenSupabase': {
    s: 'Guarda el token con que se llama a Supabase durante una petición.\n\nExiste para que el cliente de datos no tenga que recibir el token en cada llamada: se deja aquí al empezar la petición y el cliente lo lee cuando le toca. Se registra por ámbito de petición, así que cada usuario trabaja con el suyo.',
    m: {
      'TokenAcceso': { f: 'string? TokenAcceso { get; set; }', s: 'Token del usuario actual. En nulo se llama sin credencial, y Supabase responde con los permisos del rol anónimo.', l: 16 },
    },
  },
  'Horarios.Infraestructura.Supabase.TimeOnlyJsonConverter': {
    s: 'Traduce entre `TimeOnly` y el tipo `time` de Postgres. Se escribe con segundos y sin zona horaria, que es lo que esa columna guarda; sin este conversor, el formato por omisión de .NET no lo acepta.',
  },
  '?.Program': {
    s: 'Declaración explícita para que las pruebas de integración puedan levantar esta misma aplicación con `WebApplicationFactory<Program>`. Con instrucciones de nivel superior, la clase generada sería interna y las pruebas no la verían.',
  },
  'Horarios.Blazor.Acceso.AlmacenSesionesServidor': {
    s: 'Implementación en memoria del proceso. Al reiniciar la aplicación se pierden las sesiones guardadas, y en varias instancias cada una tendría las suyas; sirve mientras se despliegue una sola instancia.\n\nHoy la aplicación no lo usa ni lo registra en el contenedor: el inicio de sesión guarda los tokens como claims dentro de la cookie de autenticación (ver `EndpointsAcceso`). Solo lo instancian las pruebas de integración, que lo ejercitan como la alternativa a esa decisión.',
    m: {
      'Eliminar': { h: 'Horarios.Blazor.Acceso.IAlmacenSesionesServidor' },
      'Guardar': { f: 'public Guid Guardar(SesionSupabase sesion)', s: 'Calcula el vencimiento a partir de la duración que informó Supabase. Se fuerza un mínimo de un segundo para que una duración cero o negativa no genere una entrada ya vencida al momento de crearse.', l: 43 },
      'IntentarObtener': { f: 'public bool IntentarObtener(Guid id, out SesionSupabase? sesion)', s: 'Además de responder, aprovecha para borrar la entrada si ya venció: no hay proceso de limpieza aparte, la caducidad se cobra al consultar.', l: 55 },
    },
  },
  'Horarios.Blazor.Acceso.ContextoGestionDocentesHttp': {
    s: 'Responde las preguntas de la capa de aplicación sobre quién está gestionando docentes, leyéndolas de los claims de la petición actual.\n\nLos datos salen de la cookie que se firmó al iniciar sesión, no de la base de datos: la consulta ya se hizo una vez en `EndpointsAcceso`. La consecuencia es que un cambio de rol, de facultad o de vínculo con un docente no se nota hasta que la persona vuelve a iniciar sesión.',
    m: {
      'EsDecano': { f: 'public bool EsDecano', s: 'El decano no ve todo: ve los docentes de sus facultades, las de `FacultadIds`.', l: 32 },
    },
  },
  'Horarios.Blazor.Acceso.ContextoTokenSupabaseHttp': {
    s: 'Le dice al cliente de Supabase con qué token firmar cada llamada.\n\nPor defecto usa el token del usuario de la petición, para que las políticas de acceso por fila se apliquen en su nombre. Se registra por ámbito (scoped), así que cada petición tiene el suyo y no hay riesgo de que un usuario herede el token de otro.',
  },
  'Horarios.Blazor.Acceso.ContextoUsuarioHttp': {
    s: 'Identidad y permisos del usuario de la petición actual, tomados de los claims de la cookie de autenticación.\n\nEs el puente entre ASP.NET y la capa de aplicación, que no conoce `HttpContext`. Igual que el resto de contextos, refleja lo que se guardó al iniciar sesión: los cambios de permisos se aplican al volver a entrar.',
    m: {
      'TienePermiso': { f: 'public bool TienePermiso(PermisoAplicacion permiso)', s: 'Comprueba un permiso concreto. El superadministrador pasa siempre, sin mirar la lista: es el rol que existe para no quedar bloqueado por la propia configuración de permisos.\n\nLos permisos se guardaron como claims con el formato `recurso:accion`. La comparación ignora mayúsculas para no depender de cómo se escribieron en la base de datos.', l: 40 },
    },
  },
  'Horarios.Blazor.Acceso.CredencialesFormulario': {
    s: 'Campos del formulario de acceso, enlazados desde el cuerpo de la petición. Los nombres tienen que coincidir con los del formulario de la pantalla de acceso.',
  },
  'Horarios.Blazor.Acceso.EndpointsAcceso': {
    s: 'Endpoints HTTP de inicio y cierre de sesión.\n\nNo son componentes de Blazor porque hay que escribir y borrar la cookie de autenticación, y eso exige tener las cabeceras de la respuesta todavía abiertas: en un circuito interactivo ya se enviaron. Por eso la pantalla de acceso es un formulario que hace POST aquí y se responde con una redirección.',
    m: {
      'CerrarSesionAsync': { f: 'private static async Task<IResult> CerrarSesionAsync(HttpContext contexto, CerrarSesion cerrarSesion, CancellationToken cancellationToken)', s: 'Cierra la sesión en Supabase y borra la cookie.\n\nSi Supabase no responde, se sigue adelante igual: dejar a alguien encerrado en una sesión que quiso cerrar es peor que un token que seguirá vivo en Supabase hasta que caduque solo.', l: 135 },
      'IniciarSesionAsync': { f: 'private static async Task<IResult> IniciarSesionAsync(HttpContext contexto, IniciarSesion iniciarSesion, ObtenerAlcanceUsuario obtenerAlcance, ILoggerFactory loggerFactory, [FromForm] CredencialesFormulario formulario, CancellationToken cancellationToken)', s: 'Valida las credenciales contra Supabase y, si son correctas, arma la cookie de sesión.\n\nDentro de la cookie se guardan los roles, los permisos y el alcance (docente y facultades) además de los tokens de Supabase. Se guardan porque cada pantalla los consulta muchas veces y volver a la base de datos en cada una sería caro; el costo de esa decisión es que un cambio de permisos no se aplica hasta el siguiente inicio de sesión. También se guarda la versión de la fila del usuario, que es lo que después permite invalidar la cookie desde el servidor (ver `Program.cs`, `OnValidatePrincipal`).\n\nLa cookie no es persistente ni se renueva sola, y caduca junto con la sesión de Supabase.\n\nNingún fallo devuelve un error crudo: siempre se redirige a la pantalla de acceso con un código en la URL. Se distingue entre credenciales inválidas —que no se registran, porque son normales— y Supabase caído o respondiendo algo inesperado, que sí se registran con la excepción completa. El mensaje que ve el usuario no dice cuál de los dos datos falló, para no ayudar a averiguar qué correos existen.', l: 50 },
      'Mapear': { f: 'public static void Mapear(WebApplication app)', s: 'Registra las dos rutas. Iniciar sesión es anónimo por necesidad; cerrar sesión exige estar autenticado, porque necesita el token guardado en la cookie para avisarle a Supabase.', l: 24 },
    },
  },
  'Horarios.Blazor.Acceso.EntradaSesion': {
    s: 'Sesión guardada junto al instante en que deja de valer.',
  },
  'Horarios.Blazor.Acceso.IAlmacenSesionesServidor': {
    s: 'Guarda sesiones de Supabase del lado del servidor, entregando a cambio un identificador. Existe para no tener que mandar los tokens al navegador: lo que viaja es el identificador, y los tokens se quedan en el servidor.',
    m: {
      'Eliminar': { f: 'void Eliminar(Guid id)', s: 'Descarta la sesión, por ejemplo al cerrar sesión.', l: 21 },
      'Guardar': { f: 'Guid Guardar(SesionSupabase sesion)', s: 'Guarda la sesión y devuelve el identificador con el que se recupera.', l: 14 },
      'IntentarObtener': { f: 'bool IntentarObtener(Guid id, out SesionSupabase? sesion)', s: 'Devuelve la sesión si existe y no ha vencido. Una sesión vencida se trata igual que una inexistente.', l: 19 },
    },
  },
  'Horarios.Blazor.Busqueda': {
    s: 'Filtro de texto usado por `BarraBusqueda`: ignora acentos y mayúsculas, y trata cada palabra del filtro como un requisito independiente (AND) sobre el conjunto de campos, así "juan perez" encuentra a un docente con Nombre="Juan Pérez" sin importar el orden.',
  },
  'Horarios.Blazor.ColaGeneracionesEnMemoria': {
    s: 'Encola la generación en la cola de trabajos pesados que ya procesa `ProcesadorTrabajosPesados` en segundo plano.\n\nEl trabajo abre su propio ámbito de dependencias porque los adaptadores de datos son por petición y esta ya habrá terminado. El token de Supabase del usuario que solicitó la generación viaja con el trabajo para que las políticas de acceso sigan aplicando.',
  },
  'Horarios.Blazor.ColaTrabajosPesados': {
    s: 'Cola de trabajos que tardan más de lo que una petición web debería esperar, como generar un horario. La página encola y responde; un servicio en segundo plano va vaciando la cola.\n\nLa capacidad está acotada a propósito: si se llena, encolar falla con un mensaje claro en lugar de aceptar trabajo que nunca se va a alcanzar a procesar.',
    m: {
      'Encolar': { f: 'public Guid Encolar(string nombre, Func<CancellationToken, Task> trabajo)', s: 'Deja un trabajo en la cola y devuelve su identificador.', e: [['ArgumentException', 'El nombre viene vacío.'], ['InvalidOperationException', 'La cola está llena.']], l: 25 },
      'ProcesarSiguienteAsync': { f: 'public async Task<bool> ProcesarSiguienteAsync(CancellationToken cancellationToken = default)', s: 'Ejecuta el siguiente trabajo de la cola.', r: 'Falso cuando no había nada que hacer.', l: 45 },
    },
  },
  'Horarios.Blazor.Components.PaginaConMensaje': {
    s: 'Base de las páginas con formulario: concentra el mensaje de resultado y el envoltorio try/catch que cada página repetía por su cuenta.\n\nEstaba copiado en cuatro páginas y las copias ya habían divergido. La de Aulas no capturaba `UnauthorizedAccessException`, así que un usuario con permiso `aulas:leer` pero sin `aulas:crear` pasaba la política de la página y tumbaba el circuito al guardar, porque el permiso se vuelve a exigir en la capa de aplicación (`AutorizacionAplicacion.Exigir`). Las otras tres sí lo capturaban, pero mostraban el texto crudo de la excepción y le filtraban al usuario el nombre del índice de Postgres en vez de la explicación de `PresentacionErroresCatalogo`.',
    m: {
      'Ejecutar': { f: 'protected async Task Ejecutar(Func<Task> accion, string exito, Func<string, Task>? alFallar = null)', s: 'Ejecuta una acción del usuario, recarga y deja el mensaje de resultado.', p: [['alFallar', 'Reacción opcional al mensaje ya traducido. Aulas la usa para limpiar el campo duplicado y devolverle el foco.']], l: 49 },
      'EsEsperado': { f: 'protected static bool EsEsperado(Exception excepcion)', s: 'Errores que la página sabe explicar: validación, conflicto de datos, faltante y permiso denegado. Cualquier otro sube al manejador global, porque un fallo inesperado no debe quedar disfrazado de mensaje de validación.', l: 75 },
      'RecargarAsync': { f: 'protected virtual Task RecargarAsync()', s: 'Recarga que corre después de una acción correcta. Cada página la sobrescribe con su propia consulta; las que no muestran datos recargados no necesitan hacer nada.', l: 28 },
    },
  },
  'Horarios.Blazor.PresentacionErroresCatalogo': {
    s: 'Traduce a lenguaje entendible los errores de restricción única que devuelve la base de datos.\n\nCuando Postgres rechaza una fila repetida, el mensaje que sube trae el nombre del índice (`aulas_codigo_uq` y parecidos). Mostrar eso en pantalla no le sirve a nadie, así que aquí se reconoce el índice y se dice qué fue lo que ya existía. Está en presentación porque son decisiones de redacción, y los textos son constantes públicas para que las pruebas comparen contra ellas y no contra literales copiados.',
    m: {
      'Explicar': { f: 'public static string Explicar(Exception excepcion)', s: 'Devuelve el texto que se le muestra al usuario. Si el error no es de los conocidos, se devuelve el mensaje original: preferimos mostrar algo técnico antes que ocultar un fallo tras una frase genérica.', e: [['ArgumentNullException', 'Si `excepcion` es nula.']], l: 30 },
    },
  },
  'Horarios.Blazor.PresentacionGeneraciones': {
    s: 'Traduce el resultado técnico de una generación al lenguaje de quien arma el horario.\n\nVive en la capa de presentación a propósito: son decisiones de redacción, no de dominio. El motor y la base de datos siguen hablando en códigos; aquí se decide qué ve una coordinadora académica cuando algo sale bien, mal o se queda a medias.',
    m: {
      'Explicar': { f: 'public static string Explicar(MensajeGeneracionDto mensaje)', s: 'Texto que ve el usuario para un mensaje de generación. Los errores de infraestructura llegan con la respuesta HTTP cruda dentro; aquí se reconocen los casos conocidos y se explican con la acción que corresponde, en lugar de mostrar el JSON del servidor.', l: 52 },
      'ResumenFinal': { f: 'public static string ResumenFinal(EstadoHorario estado, GeneracionHorarioDto? generacion, TimeSpan transcurrido)', s: 'Frase de cierre cuando el plan sale del estado «Generando».', l: 95 },
      'ResumenSinRespuesta': { f: 'public static string ResumenSinRespuesta(TimeSpan transcurrido, int limiteSegundos)', s: 'Aviso cuando la generación excede su propio presupuesto de tiempo sin cerrar.', l: 127 },
    },
  },
  'Horarios.Blazor.ProcesadorTrabajosPesados': {
    s: 'Servicio en segundo plano que va vaciando la `ColaTrabajosPesados`.\n\nExiste porque hay trabajos —generar un horario, importar un archivo— que tardan más de lo que una petición HTTP debería esperar. La página encola y responde; este servicio ejecuta. Es un solo consumidor a propósito: los trabajos son intensivos en CPU y correr varios a la vez solo se quitarían tiempo entre ellos.',
    m: {
      'ExecuteAsync': { f: 'protected override async Task ExecuteAsync(CancellationToken stoppingToken)', s: 'Bucle de consumo. Cuando no hay nada que hacer espera 250 ms antes de volver a mirar, en lugar de girar en vacío.\n\nUn trabajo que falla no puede tumbar el procesador: si eso pasara, la aplicación seguiría en pie pero ninguna generación volvería a completarse. Por eso se registra el error y se sigue, con una pausa de un segundo para no entrar en un ciclo de fallos seguidos. La cancelación al apagar la aplicación sí termina el bucle.', l: 24 },
    },
  },
  'Horarios.Blazor.TrabajoPesado': {
    s: 'Un trabajo encolado, con su nombre para poder identificarlo en los registros.',
  },
};

export const TOTAL_CLASES_DOC = 225;
export const TOTAL_MIEMBROS_DOC = 623;
