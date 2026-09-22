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
  'Horarios.Dominio.Academia.CarreraJornada': {
    s: 'Un par carrera-jornada: la carrera se ofrece en esa jornada. Es lo que decide qué filas tiene la rejilla de cohortes, y existe aunque todavía no haya ninguna cohorte —una carrera puede ofrecerse en vespertina antes de tener grupos ahí—.',
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
      'EstaActivo': { s: 'Los cursos inactivos se conservan para consultas históricas, pero no participan en nuevas autorizaciones ni generaciones.' },
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
      'EsExtraordinaria': { f: 'public bool EsExtraordinaria', s: 'Si corre en paralelo a una jornada regular.', l: 42 },
      'EstaActiva': { s: 'Una jornada inactiva conserva sus horarios pasados pero ya no se ofrece al crear cohortes ni planes nuevos.' },
      'JornadaRegularId': { s: 'Nulo en una jornada regular. Con valor, esta jornada es extraordinaria: corre en paralelo a esa jornada regular, con los mismos docentes y aulas.' },
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
      'AdmiteEdicionManual': { f: 'public bool AdmiteEdicionManual', s: 'Estados en los que se pueden mover clases a mano. Es el único sitio que lo dice: ni la pantalla ni el guardado repiten la lista.\n\nEntran los tres en los que el horario aún no se envió a aprobar: recién generado y completo, en revisión, o inviable con clases sin colocar. Editar nunca deja más clases sin colocar, así que un plan generado sigue completo y puede ir a revisión o a aprobación como antes.', l: 48 },
      'CambiarEstado': { f: 'public PlanHorario CambiarEstado(EstadoHorario nuevoEstado, string motivo)', s: 'Devuelve una copia del plan en el estado nuevo, si el salto está permitido. No modifica el plan original ni guarda nada: eso queda del lado de quien persiste.', p: [['motivo', 'Explicación del cambio. Es obligatoria porque es lo único que queda escrito de por qué se movió el plan.']], e: [['ArgumentException', 'El motivo viene vacío o solo con espacios.'], ['InvalidOperationException', 'El salto de estado no está permitido.']], l: 81 },
      'CarreraIds': { s: 'Carreras que cubre el plan. Vacío significa todas las del período; ver `CubreTodoElPeriodo`.' },
      'CubreTodoElPeriodo': { f: 'public bool CubreTodoElPeriodo', s: 'Un plan sin carreras ni jornadas elegidas cubre todo el período. Es el comportamiento histórico y el valor por omisión al crear un borrador.', l: 38 },
      'EliminadoEn': { s: 'Fecha del borrado lógico; en nulo mientras la fila vive.' },
      'HorarioOrigenId': { s: 'Plan del que se derivó este, cuando es una versión nueva de otro. En nulo cuando se creó desde cero.' },
      'JornadaIds': { s: 'Jornadas que cubre el plan. Vacío significa todas las regulares: una jornada extraordinaria solo entra si se elige, y nunca junto a regulares.' },
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
  'Horarios.Contratos.Academia.GuardarRejillaCohortesSolicitud': {
    s: 'Una fila entera de la rejilla carrera × semestre: qué semestres de una carrera y una jornada cursan en el período. Va completa y en una sola llamada porque marcar y desmarcar casillas es una sola decisión, y guardarla a trozos deja el período a medias.\n\nNo lleva cohortes: cada semestre marcado resuelve la suya con la convención `año de ingreso = año del período − floor((semestre − 1) / 2)`, y solo se crea la que no existía.',
    m: {
      'Matricula': { s: 'Matrícula para las cohortes que se creen o se activen por primera vez. Las que ya estaban activas conservan la suya.' },
      'PensumId': { s: 'Plan de estudios con que se crearán las cohortes que falten. No se adivina: una carrera puede tener varios pensums vigentes a la vez.' },
      'Seccion': { s: 'Sección sobre la que actúa la fila. Otra sección del mismo par carrera-jornada es otra fila y no se ve afectada.' },
      'Semestres': { s: 'Los semestres marcados. Los que estaban activos y no están aquí se desactivan.' },
    },
  },
  'Horarios.Contratos.Academia.ResultadoRejillaCohortes': {
    s: 'Lo que cambió al guardar una fila de la rejilla. Sirve para decirlo en pantalla sin volver a consultarlo.',
    m: {
      'AreasComunesRecalculadas': { s: 'Cuántas agrupaciones de área común se rehicieron. Activar o desactivar una cohorte cambia quién cursa cada clase compartida.' },
    },
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
    m: {
      'JornadaRegularId': { s: 'Nulo para una jornada regular. Con valor, la jornada es extraordinaria y corre en paralelo a esa regular.' },
    },
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
      'JornadaRegularId': { s: 'Nulo para una jornada regular. Con valor, la jornada es extraordinaria y corre en paralelo a esa regular; sus bloques deben durar lo mismo.' },
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
  'Horarios.Contratos.Aulas.JornadaExtraordinariaPeriodoDto': {
    s: 'Cómo se arma una jornada extraordinaria en un período: contra qué horario se compara y qué docentes dan clase en ella. Sirve para leer y para guardar.\n\nEl horario de referencia es un horario ya generado —en cualquier estado, aunque sea inviable—. Sus clases bloquean a los docentes y a las aulas: lo que ya está ocupado ahí no se puede usar en la jornada extraordinaria.',
    m: {
      'DocenteIds': { s: 'La lista completa. Guardar quita a quien no venga en ella.' },
    },
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
  'Horarios.Contratos.Docentes.BloqueosDeDisponibilidadDto': {
    s: 'Lo que la rejilla de disponibilidad necesita saber de una jornada para un docente.\n\nEn una jornada regular no hay nada bloqueado. En una extraordinaria, solo declaran los docentes asignados, y tienen bloqueadas las casillas que se pisan con sus clases del horario de referencia o con el receso de la jornada regular.',
    m: {
      'MotivoDe': { f: 'public string? MotivoDe(DiaSemanaDto dia, int indiceSlot)', s: 'El motivo del bloqueo de esa casilla, o nulo si está libre.', l: 77 },
      'Ninguno': { f: 'public static readonly BloqueosDeDisponibilidadDto Ninguno = new(false, false, [])', s: 'Lo que se usa cuando no hay nada que bloquear.', l: 71 },
      'PuedeDeclarar': { f: 'public bool PuedeDeclarar', s: 'Si el docente puede marcar casillas en esta jornada.', l: 74 },
    },
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
      'Slots': { s: 'Solo las marcas que cuentan. Las de una jornada extraordinaria que hoy están bloqueadas, o de la que el docente ya no es asignado, no vienen aquí.' },
      'SlotsIgnorados': { s: 'Cuántas marcas guardadas se dejaron fuera de `Slots` por eso. No se borran de la base; la pantalla avisa.' },
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
  'Horarios.Contratos.Docentes.SlotBloqueadoDto': {
    s: 'Una casilla que el docente no puede marcar, y por qué.',
    m: {
      'Motivo': { s: 'Frase lista para mostrar: «Ya das «Cálculo I» de 08:00 a 08:45».' },
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
  'Horarios.Contratos.Motor.AlcancePlan': {
    s: 'Período y filtros del plan; arreglos vacíos significan sin filtro.',
    m: {
      'Carreras': { s: 'plan_carreras.carrera_id; vacío desactiva el filtro.' },
      'Jornadas': { s: 'plan_jornadas.jornada_id; vacío desactiva el filtro.' },
      'PeriodoId': { s: 'planes_horario.periodo_id.' },
    },
  },
  'Horarios.Contratos.Motor.AsignacionPendiente': {
    s: 'Asignación pendiente; produce sesiones_no_asignadas, database.sql:5426.',
  },
  'Horarios.Contratos.Motor.Aula': {
    s: 'Espejo de horarios.aulas y aula_recursos.',
    m: {
      'Capacidad': { s: 'aulas.capacidad; AulaConCapacidad, database.sql:1123.' },
      'Recursos': { s: 'aula_recursos agregados; AulaConLosRecursos, database.sql:1147.' },
      'Tipo': { s: 'aulas.tipo; AulaDeLaboratorio, database.sql:1096.' },
      'TipoLaboratorioDisponible': { s: 'aulas.tipo_laboratorio; TipoDeLaboratorioExacto.' },
    },
  },
  'Horarios.Contratos.Motor.AulaOcupada': {
    s: 'Quién tiene tomada un aula a la hora elegida en el modal.',
    m: {
      'Clase': { s: 'La clase que la ocupa, en palabras: «Lógica II (Ingeniería Civil 2.º sección A)».' },
      'SePuedeMover': { s: 'Falso si la búsqueda no la moverá: está fijada, la cursan cohortes fuera del alcance de quien edita o es del horario de referencia.' },
    },
  },
  'Horarios.Contratos.Motor.AutorizacionDocente': {
    s: 'Autorización de asignaciones_docente_curso; DocenteAutorizado, database.sql:3496.',
    m: {
      'JornadaId': { s: 'jornada_id; nulo funciona como comodín.' },
    },
  },
  'Horarios.Contratos.Motor.CambioDeSesion': {
    s: 'Una clase que cambia en la propuesta: dónde estaba, dónde queda y por qué.',
    m: {
      'CambiaDocente': { f: 'public bool CambiaDocente', s: 'Si la clase cambia de docente. Un cambio automático de docente se destaca aparte.', l: 109 },
      'Motivo': { s: 'En palabras, sin nombres de reglas.' },
    },
  },
  'Horarios.Contratos.Motor.CatalogoNombres': {
    s: 'Cómo se llaman, para una persona, las entidades que el motor solo conoce por identificador.\n\nEl motor razona con `Guid` y no debe depender de textos para decidir nada; pero un diagnóstico que dice «la cohorte 13717a38-…» no le sirve a quien tiene que arreglar el dato. Este catálogo es la traducción, y solo se usa al redactar mensajes: si falta una entrada, el mensaje cae al identificador y no se pierde información.',
    m: {
      'Conoce': { f: 'public bool Conoce(Guid id)', s: 'Si el catálogo trae nombre para esa entidad, o si `De` va a caer al identificador.\n\nLo pregunta quien redacta para decidir cuánto contexto añadir: el nombre de una cohorte ya trae su carrera y su semestre, así que repetirlos al lado sobra; cuando el nombre falta y queda un identificador, en cambio, hacen falta.', l: 232 },
      'De': { f: 'public string De(Guid id)', s: 'El nombre de una entidad, o su identificador si nadie lo declaró.', l: 221 },
      'Vacio': { f: 'public static readonly CatalogoNombres Vacio = new(ImmutableDictionary<Guid, string>.Empty)', s: 'Catálogo sin nombres: todo mensaje sale con identificadores, como antes.', l: 218 },
      'Valores': { s: 'Identificador → nombre legible, tal como lo enseña la interfaz.' },
    },
  },
  'Horarios.Contratos.Motor.ClaveAsignacion': {
    s: 'Clave de continuidad de una asignación.',
  },
  'Horarios.Contratos.Motor.Colocacion': {
    s: 'Dónde va una sesión; la jornada la aporta la sesión.',
  },
  'Horarios.Contratos.Motor.Descanso': {
    s: 'Rango de slots no lectivos [desde, hasta), de jornada_descansos.rango_slots.',
    m: {
      'Dia': { s: 'jornada_descansos.dia.' },
      'SlotDesde': { s: 'Límite inferior inclusivo de rango_slots; SesionFueraDeDescansos.' },
      'SlotHasta': { s: 'Límite superior exclusivo de rango_slots; SesionFueraDeDescansos.' },
    },
  },
  'Horarios.Contratos.Motor.DescripcionDeSesion': {
    s: 'Una clase dicha en palabras, para enseñarla en el modal.',
    m: {
      'Cuando': { s: '«el lunes de 14:00 a 15:00».' },
      'CursoDeCadaCohorte': { s: 'El curso con que cada cohorte de `Cohortes` ve la clase, en el mismo orden. En un área común cada pensum puede llamarla distinto.' },
      'EsAreaComun': { s: 'Si la cursan juntas varias cohortes: todo cambio vale para todas.' },
    },
  },
  'Horarios.Contratos.Motor.DiaSemana': {
    s: 'Día de la semana, base 1 para alinearse con los slots.',
  },
  'Horarios.Contratos.Motor.Diagnostico': {
    s: 'Aviso que se persiste en mensajes_generacion por finalizar_generacion.',
  },
  'Horarios.Contratos.Motor.Docente': {
    s: 'Docente activo con carga, autorizaciones y disponibilidad confirmada.',
    m: {
      'Autorizaciones': { s: 'asignaciones_docente_curso; DocenteAutorizado.' },
      'CargaMaximaCursos': { s: 'docentes.carga_maxima_cursos; CargaDocenteMaxima.' },
      'Disponibles': { s: 'disponibilidad_docente_slots confirmados; DocenteDisponible.' },
      'NivelPrioridad': { s: 'docentes.nivel_prioridad; orden del §9.3.' },
    },
  },
  'Horarios.Contratos.Motor.EdicionDeSesion': {
    s: 'Lo que una persona pide cambiar de una clase desde el modal «Editar clase»: el docente, el aula, el día y la hora inicial. Curso, cohortes, jornada y duración no se cambian aquí.',
    m: {
      'AulaId': { s: 'El aula de la clase abierta.' },
      'Colocacion': { s: 'El día y el slot inicial de la clase abierta.' },
      'DocenteId': { s: 'El docente que se quiere. Si es otro, cambia en toda la asignación.' },
      'SesionId': { s: 'La clase que se abrió, con el identificador que tiene guardado.' },
    },
  },
  'Horarios.Contratos.Motor.EstadoReparacion': {
    s: 'Cómo terminó una búsqueda de solución.',
    m: {
      'Cancelada': { s: 'La persona detuvo la búsqueda.', l: 83 },
      'DecisionInvalida': { s: 'Lo que la persona quiere fijar incumple una regla por sí solo: docente sin autorización o sin disponibilidad, aula que no sirve, choque con otra fijada o con el horario de referencia. Mover otras clases no lo arregla; hay que cambiar la decisión.', l: 74 },
      'Lista': { s: 'Hay un horario completo y sin conflictos que respeta todo lo fijado.', l: 67 },
      'SinSolucionEncontrada': { s: 'La búsqueda no encontró un horario completo respetando lo fijado. El motor es voraz: que no lo encuentre no demuestra que no exista.', l: 80 },
      'TiempoAgotado': { s: 'Se acabó el tiempo de la búsqueda.', l: 86 },
    },
  },
  'Horarios.Contratos.Motor.HorarioVigente': {
    s: 'El horario tal como está guardado, listo para editarlo.\n\nLa instantánea es la misma que usaría el motor para generar, con una diferencia que importa: cada sesión lleva el identificador que tiene guardado , no uno recalculado. Así lo que se propone y lo que se guarda hablan de las mismas filas, y las cohortes que comparten una clase de área común siguen compartiéndola. Ninguna sesión viene marcada como fijada ni hay fijadas en la instantánea: quién queda fijo lo decide cada búsqueda.',
    m: {
      'CohortesEditables': { s: 'Las cohortes que quien edita puede modificar. Una clase con alguna cohorte fuera de este conjunto no se mueve: para la búsqueda es tan inamovible como una fijada.' },
      'Colocadas': { s: 'Dónde está hoy cada sesión: docente, aula, día y slot.' },
      'EsEditable': { f: 'public bool EsEditable(SesionRequerida sesion)', s: 'Si la persona puede modificar todas las cohortes de la sesión.', l: 59 },
      'FijadasPrevias': { s: 'Las sesiones que ya estaban fijadas a mano (`esta_fijada`).' },
      'Instantanea': { s: 'Catálogos y sesiones del plan, con los identificadores guardados.' },
    },
  },
  'Horarios.Contratos.Motor.IReparadorHorario': {
    s: 'La edición manual con reconstrucción: fijar lo que la persona decide y reacomodar lo demás.\n\nNo guarda nada ni toca la base. Recibe el horario vigente y devuelve una propuesta; guardarla es trabajo de quien llama, que antes vuelve a comprobarla con `Revalidar`.',
    m: {
      'AulasOcupadas': { f: 'ImmutableDictionary<Guid, AulaOcupada> AulasOcupadas(HorarioVigente vigente, Guid sesionId, Colocacion colocacion)', s: 'Las aulas que otra clase ya tiene tomadas si la sesión empieza en `colocacion`, con la clase que las tiene. Solo informa: elegir una ocupada es válido, la búsqueda intenta mover a la otra. Vacío si la colocación no cabe en la jornada de la sesión.', l: 208 },
      'Decisiones': { f: 'ImmutableArray<SesionColocada> Decisiones(HorarioVigente vigente, EdicionDeSesion edicion)', s: 'Qué sesiones quedan fijadas con esta edición y con qué valores. Cambiar el docente arrastra a toda la asignación, en sus casillas actuales; día, hora y aula solo cambian en la clase abierta. Es la lista que el modal enseña como «Estas casillas quedarán fijas».', l: 198 },
      'Describir': { f: 'DescripcionDeSesion Describir(HorarioVigente vigente, Guid sesionId, SesionColocada? colocada)', s: 'Una clase en palabras: curso, cohortes, jornada, cuándo, aula y docente.', l: 211 },
      'Opciones': { f: 'OpcionesDeEdicion Opciones(HorarioVigente vigente, Guid sesionId)', s: 'Qué días, horas, aulas y docentes se pueden elegir para la clase.', l: 201 },
      'Reparar': { f: 'ResultadoReparacion Reparar(HorarioVigente vigente, EdicionDeSesion edicion, TimeSpan plazo, CancellationToken cancellationToken = default, bool permitirRetirar = false)', s: 'Busca un horario completo que respete la edición y todas las fijaciones.', p: [['plazo', 'Tiempo máximo de la búsqueda; al agotarse termina en `TiempoAgotado`.'], ['cancellationToken', 'La persona pulsó «Detener búsqueda».']], l: 222 },
      'Revalidar': { f: 'ImmutableArray<string> Revalidar(HorarioVigente @base, HorarioVigente actual, ResultadoReparacion propuesta)', s: 'Vuelve a comprobar una propuesta ya revisada contra datos recién leídos, justo antes de guardarla. Devuelve los problemas; vacío significa que se puede guardar tal cual.', p: [['base', 'Cómo estaba el horario cuando se buscó la propuesta.'], ['actual', 'Cómo está ahora, leído dentro de la transacción del guardado.'], ['propuesta', 'La propuesta que la persona revisó.']], l: 236 },
    },
  },
  'Horarios.Contratos.Motor.IdentificadorDeterminista': {
    s: 'Convierte un texto estable en un identificador estable.',
    m: {
      'Crear': { f: 'public static Guid Crear(string valor)', s: 'Deriva un UUID versión 5 de los primeros 128 bits de SHA-256.', l: 11 },
    },
  },
  'Horarios.Contratos.Motor.Instantanea': {
    s: 'Foto inmutable de todo lo que el motor necesita.',
    m: {
      'Alcance': { s: 'Período y filtros de plan_carreras y plan_jornadas.' },
      'Aulas': { s: 'CargaDeAulas, ordenadas por Id.' },
      'CohortesValidas': { s: 'Cohortes del alcance para el verificador.' },
      'DiagnosticosDeCarga': { s: 'Problemas en cualquiera de los pasos del cargador.' },
      'Docentes': { s: 'CargaDeDocentes, ordenados por Id.' },
      'Equivalencias': { s: 'CargaDeEquivalencias, usadas por DocenteAutorizado.' },
      'Fijadas': { s: 'CargaDeSesionesFijadas, ordenadas por (Asignación, Ordinal).' },
      'Jornadas': { s: 'CargaDeJornadas, ordenadas por Id.' },
      'Nombres': { f: 'public CatalogoNombres Nombres { get; init; }', s: 'Nunca nulo: sin catálogo, cada nombre cae a su identificador.', l: 276 },
      'OcupacionesExternas': { f: 'public ImmutableArray<OcupacionExterna> OcupacionesExternas { get; init; }', s: 'Nunca por defecto: sin ocupaciones, un arreglo vacío.', l: 279 },
      'PlanId': { f: 'public Guid PlanId { get; init; }', s: 'Identificador del plan, validado junto con el orden de la instantánea.', l: 272 },
      'Sesiones': { s: 'Expandidas y ordenadas por (Asignación, Ordinal).' },
    },
  },
  'Horarios.Contratos.Motor.Jornada': {
    s: 'Espejo de horarios.jornadas y sus descansos.',
    m: {
      'BloquesPorDia': { f: 'public int BloquesPorDia { get; init; }', s: 'Cantidad de bloques validada junto con el tamaño de cada uno.', l: 65 },
      'Descansos': { s: 'Descansos adicionales; SesionFueraDeDescansos, jornada_descansos.' },
      'DiasActivos': { s: 'Días habilitados; DiaActivoEnJornada, database.sql:3779.' },
      'DuracionBloqueMinutos': { s: 'duracion_bloque_minutos de la jornada.' },
      'DuracionRecesoMinutos': { s: 'Duración del receso de la jornada.' },
      'MinutoInicio': { s: 'hora_inicio en minutos desde medianoche.' },
      'RecesoDespuesBloque': { s: 'Punto del receso; desplaza la geometría del reloj.' },
    },
  },
  'Horarios.Contratos.Motor.OcupacionExterna': {
    s: 'Una clase de otro horario que ya tiene tomados a un docente y a un aula a esa hora.\n\nExiste por las jornadas extraordinarias: corren en paralelo a una jornada regular, así que las clases del horario de referencia de la regular son ocupación previa. El motor no las coloca, no las emite y no las mueve; solo impide poner otra cosa encima.',
    m: {
      'CursoId': { s: 'sesiones.curso_id, para decir qué clase estorba.' },
      'JornadaId': { s: 'La jornada de esa clase, que fija su reloj. Tiene que estar en `Jornadas`.' },
      'SesionId': { s: 'sesiones.id en el horario de referencia; sirve para nombrarla.' },
    },
  },
  'Horarios.Contratos.Motor.OpcionDeColocacion': {
    s: 'Una hora en la que puede empezar la clase, con su hora de reloj.',
    m: {
      'Horas': { s: '«14:00–15:00», como se lee en el selector.' },
    },
  },
  'Horarios.Contratos.Motor.OpcionesDeEdicion': {
    s: 'Lo que el modal ofrece para una clase. Sale de las mismas reglas del motor: no se ofrece un aula que la clase no puede usar ni un docente sin autorización para todas sus cohortes.',
    m: {
      'Aulas': { s: 'Las aulas con el tipo, los recursos y la capacidad que la clase exige.' },
      'Colocaciones': { s: 'Las posiciones que caben en la jornada con esa duración.' },
      'Docentes': { s: 'Los docentes activos autorizados para todas las cohortes.' },
    },
  },
  'Horarios.Contratos.Motor.OrigenCambio': {
    s: 'Por qué cambia una clase en la propuesta.',
    m: {
      'Automatico': { s: 'El motor la movió para acomodar lo fijado; no queda fijada.', l: 96 },
      'Manual': { s: 'La persona la fijó: es su decisión y queda fijada al guardar.', l: 93 },
    },
  },
  'Horarios.Contratos.Motor.ParticipacionCohorte': {
    s: 'Una cohorte dentro de una sesión; espejo de sesion_cohortes, database.sql:5358.',
    m: {
      'CursoEnPensumId': { s: 'sesion_cohortes.curso_en_pensum_id; CursoEnElPensum y BloquesSemanalesCompletos.' },
      'CursoVisibleId': { s: 'sesion_cohortes.curso_visible_id; CursoVisibleUnicoPorCohorte y DocenteAutorizado.' },
      'JornadaId': { s: 'cohortes.jornada_id; CohorteDeLaJornadaDeLaSesion.' },
      'Matricula': { s: 'cohorte_periodos.matricula_estimada; AulaConCapacidad.' },
      'PensumId': { s: 'cohortes.pensum_id; CohorteEnLaAgrupacion.' },
      'Semestre': { s: 'cohortes.semestre; CursoEnLaAgrupacion.' },
    },
  },
  'Horarios.Contratos.Motor.RecursoDisponible': {
    s: 'Recurso y cantidad de aula_recursos; AulaConLosRecursos, database.sql:1147.',
  },
  'Horarios.Contratos.Motor.RecursoRequerido': {
    s: 'Recurso y cantidad de curso_recursos; AulaConLosRecursos, database.sql:1147.',
  },
  'Horarios.Contratos.Motor.RequisitoCargado': {
    s: 'Fila de CargaDeRequisitos antes de expandir requisitos a sesiones.',
    m: {
      'AgrupacionAreaComunId': { s: 'agrupaciones_area_comun.id; DocenteActivo y AulaActiva.' },
      'BloquesSemanalesExactos': { s: 'cursos_en_pensum.bloques_semanales; BloquesSemanalesCompletos.' },
      'CohorteId': { s: 'cohorte_periodos.cohorte_id.' },
      'CursoEnPensumId': { s: 'cursos_en_pensum.id; CursoEnElPensum y BloquesSemanalesCompletos.' },
      'CursoIdSesion': { s: 'Valor futuro de sesiones.curso_id.' },
      'CursoVisibleId': { s: 'Curso visible resuelto por completar_sesion_cohorte; CursoVisibleUnicoPorCohorte.' },
      'DuracionSlots': { s: 'cursos_en_pensum.duracion_slots.' },
      'JornadaId': { s: 'cohortes.jornada_id; CohorteDeLaJornadaDeLaSesion.' },
      'Matricula': { s: 'cohorte_periodos.matricula_estimada; AulaConCapacidad.' },
      'PensumId': { s: 'cohortes.pensum_id; CohorteEnLaAgrupacion.' },
      'Recursos': { s: 'curso_recursos agregados; AulaConLosRecursos.' },
      'RequiereLaboratorio': { s: 'cursos.requiere_laboratorio; AulaDeLaboratorio.' },
      'Semestre': { s: 'cohortes.semestre; CursoEnLaAgrupacion.' },
      'TipoLaboratorioRequerido': { s: 'cursos.tipo_laboratorio; TipoDeLaboratorioExacto.' },
    },
  },
  'Horarios.Contratos.Motor.Resultado': {
    s: 'Salida para finalizar_generacion, incluida la cancelación no destructiva.',
  },
  'Horarios.Contratos.Motor.ResultadoReparacion': {
    s: 'El resultado de una búsqueda: la propuesta, si la hay, y todo lo que la explica.',
    m: {
      'Cambios': { s: 'Las clases que cambian, las fijadas primero. No incluye clases que no cambian.' },
      'Fijadas': { s: 'Las sesiones que la persona fija: son las únicas que se guardan como fijadas.' },
      'Horario': { s: 'El horario completo propuesto, sesión por sesión. Vacío si el estado no es `Lista`.' },
      'Motivos': { s: 'Por qué no hay propuesta, o avisos sobre cómo se encontró.' },
      'NivelAlcance': { s: 'Hasta dónde se amplió la búsqueda: 0 si no hizo falta mover nada, 1 si bastó con las clases que chocaban, 2 con las relacionadas y 3 con todas las editables del plan.' },
      'SinPropuesta': { f: 'public static ResultadoReparacion SinPropuesta(EstadoReparacion estado, ImmutableArray<Guid> fijadas, IEnumerable<string> motivos, int nivelAlcance = 0)', s: 'Un resultado sin propuesta, con los motivos que lo explican.', l: 139 },
    },
  },
  'Horarios.Contratos.Motor.ResultadoVerificacion': {
    s: 'Corrección dura y cobertura para finalizar_generacion.',
  },
  'Horarios.Contratos.Motor.SesionColocada': {
    s: 'Sesión colocada; se traduce al contrato de guardar_resultado_generacion, database.sql:2500.',
  },
  'Horarios.Contratos.Motor.SesionFijada': {
    s: 'Sesión fijada a mano que se recibe como ocupación previa; SesionesFijadasInamovibles y CargaDeSesionesFijadas.',
    m: {
      'AgrupacionAreaComunId': { s: 'agrupacion_area_comun_id persistida.' },
      'Asignacion': { s: 'Unidad de continuidad reconstruida por CargaDeSesionesFijadas.' },
      'AulaId': { s: 'aula_id para AulaSinSolape.' },
      'Colocacion': { s: 'Día y slot inicial persistidos.' },
      'CursoIdSesion': { s: 'Curso de sesiones.curso_id.' },
      'DocenteId': { s: 'docente_id para DocenteUnicoPorCursoDeCohorte, DocenteUnicoPorAreaComun, CargaDocenteMaxima y DocenteSinSolape.' },
      'DuracionSlots': { s: 'duracion_slots persistida.' },
      'JornadaId': { s: 'jornada_id para CohorteDeLaJornadaDeLaSesion.' },
      'Ordinal': { f: 'public int Ordinal { get; init; }', s: 'Posición base 1, validada junto con las participaciones.', l: 177 },
      'Participantes': { s: 'Participaciones de CargaDeSesionesFijadas, ordenadas por CohorteId.' },
    },
  },
  'Horarios.Contratos.Motor.SesionRequerida': {
    s: 'Una clase que el motor debe colocar.',
    m: {
      'AgrupacionAreaComunId': { s: 'agrupacion_area_comun_id; DocenteActivo y AulaActiva.' },
      'Asignacion': { s: 'Unidad de continuidad y carga; DocenteUnicoPorCursoDeCohorte, DocenteUnicoPorAreaComun y CargaDocenteMaxima.' },
      'CursoIdSesion': { s: 'Curso de sesiones.curso_id.' },
      'DuracionSlots': { s: 'duracion_slots usada por SesionCabeEnBloques y BloquesSemanalesCompletos.' },
      'EstaFijada': { s: 'Colocación manual que debe preservarse; SesionesFijadasInamovibles.' },
      'JornadaId': { s: 'Jornada única exigida por CohorteDeLaJornadaDeLaSesion, database.sql:959.' },
      'Ordinal': { f: 'public int Ordinal { get; init; }', s: 'Posición base 1, validada junto con los demás invariantes.', l: 147 },
      'Participantes': { s: 'sesion_cohortes ordenadas por CohorteId.' },
      'Recursos': { s: 'Máximo por recurso, ordenado por RecursoId; AulaConLosRecursos.' },
      'RequiereLaboratorio': { s: 'Exigencia de laboratorio; AulaDeLaboratorio.' },
      'TipoLaboratorioRequerido': { s: 'Tipo exigido; TipoDeLaboratorioExacto.' },
    },
  },
  'Horarios.Contratos.Motor.TipoAula': {
    s: 'Tipo físico o virtual del aula; espejo de horarios.tipo_aula.',
  },
  'Horarios.Contratos.Motor.Validaciones': {
    m: {
      'ValidarOcupacionesExternas': { f: 'public static ImmutableArray<OcupacionExterna> ValidarOcupacionesExternas(ImmutableArray<OcupacionExterna> ocupaciones, ImmutableArray<Jornada> jornadas)', s: 'Cada ocupación externa tiene que caer en una jornada que la rejilla conozca: sin su jornada no se sabe a qué hora es, y el motor no podría compararla con nada.', l: 415 },
    },
  },
  'Horarios.Contratos.Motor.Violacion': {
    s: 'Incumplimiento que se persiste en conflictos y conflicto_sesiones.',
  },
  'Horarios.Contratos.Planes.ActualizarPlanSolicitud': {
    s: 'Datos para editar un plan de horario.\n\nEl alcance se reemplaza por completo con cada actualización: lo que no venga en las listas deja de pertenecer al plan. Vacías vuelven a «todo el período».',
  },
  'Horarios.Contratos.Planes.AjusteAutomaticoDto': {
    s: 'Una clase que el motor movió para acomodar lo fijado.',
    m: {
      'Antes': { s: '«el lunes de 14:00 a 15:00 · aula A-102 · Ana López».' },
      'CambiaDocente': { s: 'Un cambio de docente automático se enseña destacado.' },
      'Despues': { s: 'Lo mismo, como quedaría.' },
      'Motivo': { s: 'Por qué se movió, en palabras.' },
    },
  },
  'Horarios.Contratos.Planes.AulaOcupadaDto': {
    s: 'Un aula que otra clase ya tiene a la hora elegida.',
    m: {
      'Clase': { s: '«Lógica II (Ingeniería Civil 2.º sección A)».' },
      'SePuedeMover': { s: 'Falso si esa clase no se moverá: fijada, fuera de tu alcance o del horario de referencia. Entonces elegir el aula no tiene salida.' },
    },
  },
  'Horarios.Contratos.Planes.CambiarEstadoPlanSolicitud': {
    s: 'Datos para mover un plan de una etapa a otra. No todo salto está permitido: el recorrido válido lo decide `PlanHorario` en el dominio.',
    m: {
      'CambiadoPorId': { s: 'Usuario que lo hace, para el historial.' },
      'Motivo': { s: 'Por qué se hace el cambio. Es obligatorio: es lo único que queda escrito de la decisión.' },
    },
  },
  'Horarios.Contratos.Planes.CasillaDto': {
    s: 'Lo que el modal «Editar clase» pide al servidor. El servidor decide qué sesiones quedan fijadas: aquí solo viaja lo que la persona escribió, nunca una lista de afectadas.',
    m: {
      'Dia': { s: 'El día elegido, como lo guarda la base: «lunes», «miercoles»…' },
    },
  },
  'Horarios.Contratos.Planes.CasillaFijaDto': {
    s: 'Una clase que quedará fijada, con sus valores finales.',
    m: {
      'Cuando': { s: '«el lunes de 14:00 a 15:00».' },
      'EsLaAbierta': { s: 'Si es la clase que se abrió en el modal.' },
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
  'Horarios.Contratos.Planes.EdicionSesionDto': {
    s: 'Todo lo que el modal necesita para abrirse: qué clase es, cómo está hoy y qué se puede elegir. Las opciones salen de las reglas del motor, no de la pantalla.',
    m: {
      'Cohortes': { s: 'Todas las cohortes de la clase: un área común trae varias.' },
      'CursoDeCadaCohorte': { s: 'El curso con que cada cohorte de `Cohortes` ve la clase, en el mismo orden: en un área común cada pensum puede llamarla distinto.' },
      'Duracion': { s: '«2 bloques», dicho para una persona.' },
      'EsAreaComun': { s: 'Si la cursan juntas varias cohortes, quizá de carreras distintas: el modal lo avisa antes de que la persona cambie nada, porque el cambio vale para todas.' },
      'EstaFijada': { s: 'Si la clase ya estaba fijada a mano.' },
      'Horas': { s: 'Las horas iniciales posibles, en orden de día y hora; los días salen de aquí.' },
      'MotivoNoEditable': { s: 'Por qué no se puede editar, o nulo si se puede. El modal se abre igual para explicarlo.' },
      'VersionPlan': { s: 'Versión del plan leída; viaja de vuelta en cada solicitud.' },
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
  'Horarios.Contratos.Planes.EstadoPropuestaDto': {
    s: 'Cómo terminó la búsqueda, con los mismos nombres que usa el motor.',
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
    s: 'Una página del horario generado, con sus problemas al lado.\n\nLa consulta sabe paginar —un período completo son miles de clases—, pero la revisión pide el horario entero y lo reparte por carrera y semestre: agrupado, un recorte deja el último grupo incompleto sin que nada lo advierta. Los conflictos y pendientes vienen enteros siempre: son pocos y hay que verlos todos.',
    m: {
      'Conflictos': { s: 'Reglas rotas en el horario. Con cualquiera, no se publica.' },
      'Pendientes': { s: 'Clases que no se pudieron colocar, cada una ubicada en su carrera y semestre para poder enseñarla dentro del horario.' },
      'TamanoPagina': { s: 'Cuántas clases se pidieron por página; 0 es sin límite.' },
      'TotalSesiones': { s: 'Total de clases del horario, no de esta página. Comparado con las clases recibidas dice si la consulta se quedó corta.' },
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
  'Horarios.Contratos.Planes.OpcionEdicionDto': {
    s: 'Una opción de un selector: su identificador y cómo se lee.',
  },
  'Horarios.Contratos.Planes.OpcionHoraDto': {
    s: 'Una hora inicial posible para la clase, dentro de un día.',
    m: {
      'Dia': { s: 'El día como lo guarda la base: «lunes», «miercoles»…' },
      'Horas': { s: '«14:00–15:00»: cuándo empieza y cuándo termina con su duración.' },
      'NombreDia': { s: 'El día como se lee: «Lunes», «Miércoles»…' },
    },
  },
  'Horarios.Contratos.Planes.PendienteHorarioGeneradoDto': {
    s: 'Una clase que se quedó sin colocar, con el sitio del horario al que le falta.\n\nViene ubicada —carrera, semestre, curso y cohorte, escritos igual que en una sesión colocada— porque el hueco se enseña dentro del horario, en el grupo al que pertenece. Una lista aparte obliga a leerla entera para saber de quién era cada hueco.',
    m: {
      'Motivo': { s: 'Por qué no se pudo colocar, con los candidatos que se probaron y la regla que rechazó a cada uno. Lo escribe el motor.' },
    },
  },
  'Horarios.Contratos.Planes.PropuestaEdicionDto': {
    s: 'La propuesta que se revisa en el modal. Vive en el servidor mientras dure el circuito; su `Id` es lo que «Aplicar» manda de vuelta para guardar exactamente esto.',
    m: {
      'Ajustes': { s: 'Las demás clases que cambian. Vacío si no hizo falta mover nada.' },
      'ClasesSinColocar': { s: 'Clases sin colocar del resultado; una propuesta lista tiene cero.' },
      'CohortesAfectadas': { s: 'Todas las cohortes que ven algún cambio, estén o no a la vista.' },
      'Conflictos': { s: 'Violaciones duras del resultado; una propuesta lista tiene cero.' },
      'Fijadas': { s: 'Las casillas que fija la persona, con sus valores.' },
      'Motivos': { s: 'Por qué no hay propuesta, o avisos de cómo se encontró.' },
      'NivelAlcance': { s: '0 sin mover nada; 1 las que chocaban; 2 las relacionadas; 3 todo lo editable.' },
      'SePuedeAplicar': { f: 'public bool SePuedeAplicar', s: 'Solo una propuesta lista se puede aplicar.', l: 136 },
    },
  },
  'Horarios.Contratos.Planes.ResultadoEdicionDto': {
    s: 'Lo que quedó guardado al aplicar una propuesta.',
    m: {
      'SesionesCambiadas': { s: 'Todas las clases que cambiaron, para resaltarlas en la rejilla.' },
      'VersionPlan': { s: 'La versión nueva del plan.' },
    },
  },
  'Horarios.Contratos.Planes.ResultadoRevisionPlanDto': {
    s: 'Diagnóstico previo a generar: dice si vale la pena arrancar el motor, qué falta si no, y qué quedará pendiente si se genera ya. Evita esperar una generación completa para descubrir que faltaban datos base.',
    m: {
      'Avisos': { s: 'Lo que el precálculo del motor ya sabe que quedará pendiente. No impide generar. Viene vacío también cuando faltan datos base, porque sin ellos no se calcula.' },
      'DatosFaltantes': { s: 'Lista en español de los datos base que faltan, para mostrar tal cual. Si trae algo, no se genera.' },
      'PuedeGenerarse': { s: 'Verdadero cuando están todos los datos indispensables. No promete que salga un horario completo, solo que hay con qué intentarlo.' },
    },
  },
  'Horarios.Contratos.Planes.SesionHorarioGeneradoDto': {
    s: 'Una clase del horario generado, lista para pintar en pantalla.\n\nTrae el nombre y el identificador de cada cosa: el nombre para mostrar y el identificador para poder filtrar o navegar sin volver a consultar la base de datos.',
    m: {
      'Curso': { s: 'El nombre con que esta cohorte ve la clase, el de su pensum. En un área común cambia de una cohorte a otra.' },
      'CursoId': { s: 'El curso con el que esta cohorte ve la clase, el mismo que traen los pendientes, y el que nombra `Curso`. En un área común no es el curso principal de la sesión. Sirve para contar cuántas sesiones de cada curso se colocaron.' },
      'Dia': { s: 'Día en texto, como se muestra.' },
      'DuracionSlots': { s: 'Cuántos slots ocupa.' },
      'EsAreaComun': { s: 'Si varias cohortes, quizá de carreras distintas, cursan esta clase juntas: cualquier cambio vale para todas.' },
      'EstaFijada': { s: 'Si una persona la fijó a mano: el motor no la mueve al reacomodar.' },
      'IndiceSlotInicio': { s: 'Primer slot ocupado dentro del día.' },
      'MinutoFin': { s: 'Minuto del día en que termina.' },
      'MinutoInicio': { s: 'Minuto del día en que empieza, contando desde medianoche. Va calculado para que la pantalla ubique la clase sin conocer la jornada.' },
      'Semestre': { s: 'Semestre que cursaba la cohorte en el período del horario. Es 0 cuando la inscripción de la cohorte al período ya no existe: la clase se sigue mostrando, solo que sin semestre conocido.' },
      'TotalCohortes': { s: 'Cuántas cohortes cursan la clase, contadas en la sesión entera aunque la consulta traiga solo las de una carrera.' },
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
      'ActivarCohorteAsync': { f: 'public async Task ActivarCohorteAsync(ActivarCohortePeriodoSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que una cohorte cursa en un período y en qué semestre va. Sin esto, la cohorte no entra en la generación de ese período.\n\nAntes de guardar comprueba que ese semestre quepa en la jornada de la cohorte.', l: 117 },
      'ActualizarAgrupacionAsync': { f: 'public Task<AgrupacionAreaComun> ActualizarAgrupacionAsync(ActualizarAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una agrupación.\n\nNo exige dos cohortes, a diferencia del alta: al guardar, quién cursa el área común ya lo decidió el período, y una agrupación que este semestre solo lleva una carrera sigue siendo válida.', l: 355 },
      'ActualizarCohorteAsync': { f: 'public Task<Cohorte> ActualizarCohorteAsync(ActualizarCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una cohorte.', l: 336 },
      'ActualizarCursoAsync': { f: 'public async Task<CursoDePensum> ActualizarCursoAsync(ActualizarCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un curso y de su carga en la malla, con las mismas reglas que el alta. El pensum no viaja: no se puede cambiar.', l: 282 },
      'ActualizarCursoComunAsync': { f: 'public Task<CursoComun> ActualizarCursoComunAsync(ActualizarCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un grupo de cursos equivalentes.', l: 320 },
      'ActualizarPensumAsync': { f: 'public Task<Pensum> ActualizarPensumAsync(ActualizarPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un pensum.', l: 268 },
      'CrearAgrupacionAsync': { f: 'public Task<AgrupacionAreaComun> CrearAgrupacionAsync(CrearAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Une varios cursos de área común en una clase compartida.\n\nEl curso principal se agrega a la lista de cursos por si no venía, y se exigen al menos dos cohortes. La regla es solo del alta manual: quien está dando de alta un área común lo hace porque quiere compartirla, y con una sola cohorte bastaría el curso normal. La base ya no lo exige —una agrupación derivada puede quedarse en una— y `ActualizarAgrupacionAsync` tampoco.', l: 196 },
      'CrearCohorteAsync': { f: 'public Task<Cohorte> CrearCohorteAsync(CrearCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Registra un grupo de estudiantes. La matrícula puede ser cero —una cohorte declarada antes de la inscripción— pero nunca negativa.', l: 100 },
      'CrearCursoAsync': { f: 'public async Task<CursoDePensum> CrearCursoAsync(CrearCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea un curso dentro de un pensum. No hay alta de curso suelta: un curso sin pensum no se puede programar y volvería a ser el catálogo compartido que se quitó.\n\nExigir un tipo de laboratorio sin exigir laboratorio se rechaza: sería una condición que el motor nunca miraría, y quien la escribió creería que sí.', l: 53 },
      'CrearCursoComunAsync': { f: 'public Task<CursoComun> CrearCursoComunAsync(CrearCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que varios cursos de pensums distintos son el mismo curso.\n\nSe exigen al menos dos: con uno solo no hay nada que declarar equivalente. Que cada curso esté marcado como área común y venga de un pensum distinto lo comprueba la base, que es la que ve las filas.', l: 81 },
      'CrearPensumAsync': { f: 'public Task<Pensum> CrearPensumAsync(CrearPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea una versión del plan de estudios de una carrera. El año se exige de 1900 en adelante para atajar el error de teclear un año de dos cifras.', l: 38 },
      'CursosDistintos': { f: 'private static IReadOnlyList<Guid> CursosDistintos(IReadOnlyList<Guid>? cursos)', s: 'Quita repetidos y vacíos de una lista de cursos.', l: 538 },
      'DesactivarCohorteAsync': { f: 'public async Task DesactivarCohorteAsync(Guid cohorteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Saca una cohorte de un período.', e: [['KeyNotFoundException', 'La cohorte no estaba activa en ese período.']], l: 175 },
      'EliminarAsync': { f: 'private async Task EliminarAsync(Guid id, Func<Guid, CancellationToken, Task<bool>> eliminar, string entidad, CancellationToken cancellationToken)', s: 'Baja compartida por todas las entidades del catálogo. La persistencia devuelve si borró algo; aquí eso se convierte en un error con el nombre de la entidad, para no repetir cinco veces el mismo bloque.', e: [['KeyNotFoundException', 'No se indicó identificador, o no había nada que borrar.']], l: 554 },
      'EstablecerEstadoCursoAsync': { f: 'public Task<CursoAcademico> EstablecerEstadoCursoAsync(Guid id, bool estaActivo, CancellationToken cancellationToken = default)', s: 'Cambia la disponibilidad futura de un curso. La operación es idempotente en la base: repetir el mismo estado devuelve la fila sin crear una segunda mutación.', l: 307 },
      'ExigirEdicion': { f: 'private void ExigirEdicion()', s: 'Toda escritura del catálogo pide el mismo permiso; las consultas no piden ninguno, porque lo que cada usuario alcanza ya lo filtra la base de datos.', l: 545 },
      'GuardarRejillaCohortesAsync': { f: 'public async Task<ResultadoRejillaCohortes> GuardarRejillaCohortesAsync(GuardarRejillaCohortesSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda una fila entera de la rejilla carrera × semestre.\n\nUna llamada, una transacción: la rutina de base crea las cohortes que falten, activa las marcadas, desactiva las que se desmarcaron y rehace las áreas comunes. Aquí solo se comprueba que la solicitud tenga sentido; lo que decide qué es válido —que el semestre exista en el pensum, que no pase de la duración de la carrera— es de la base, que es donde no se puede esquivar.\n\nUna lista de semestres vacía es válida y significa «esta carrera no cursa este período»: apaga la fila entera.', l: 147 },
      'ListarCarreraJornadasAsync': { f: 'public Task<IReadOnlyList<CarreraJornada>> ListarCarreraJornadasAsync(CancellationToken cancellationToken = default)', s: 'Los pares carrera-jornada que se ofrecen. Son las filas de la rejilla, y existen aunque todavía no haya ninguna cohorte en ese par.', l: 222 },
      'ListarCursosAsync': { f: 'public Task<IReadOnlyList<CursoAcademico>> ListarCursosAsync(Guid? pensumId = null, bool incluirInactivos = false, CancellationToken cancellationToken = default)', s: 'Cursos de un pensum. Sin pensum devuelve los de todos, que es lo que necesitan las pantallas que cruzan carreras —autorizaciones docentes, cursos comunes—, no un catálogo del que elegir al armar una malla.', l: 230 },
      'NormalizarCurso': { f: 'private static CrearCursoEnPensumSolicitud NormalizarCurso(CrearCursoEnPensumSolicitud solicitud)', s: 'Deja el código en mayúsculas y sin espacios sobrantes, para que buscar por él sea una comparación exacta, y recorta el resto de textos.', l: 389 },
      'SlotsLectivos': { f: 'private static int SlotsLectivos(Jornada jornada, IReadOnlyList<DescansoJornada> descansos)', s: 'Bloques por día en cada día activo, menos los que tapa un descanso.', l: 527 },
      'ValidarCurso': { f: 'private static void ValidarCurso(string codigo, string nombre, bool requiereLaboratorio, string? tipoLaboratorio, int semestre, int bloques, int duracionSlots)', s: 'Reglas comunes al alta y a la edición de un curso. Sin bloques semanales no habría nada que programar, así que se exigen mayores que cero.', e: [['ArgumentException', 'Falta un dato obligatorio, se exige un tipo de laboratorio sin exigir laboratorio, o los bloques no dan sesiones enteras (BloquesSemanalesCompletos).']], l: 416 },
      'ValidarCursoContraConfiguracionAsync': { f: 'private async Task ValidarCursoContraConfiguracionAsync(bool requiereLaboratorio, string? tipoLaboratorio, int duracionSlots, CancellationToken cancellationToken)', s: 'Reglas del curso que dependen de lo que ya está cargado: que una sesión quepa en un día de alguna jornada activa (SesionCabeEnBloques) y que el tipo de laboratorio que exige lo declare al menos un aula activa (TipoDeLaboratorioExacto). Con cualquiera de las dos rotas el motor nunca podría colocarlo, así que se frena al guardar y no al generar.\n\nAún no se sabe en qué jornada se cursará, así que se compara con la más larga. El tipo se compara exacto, igual que el motor: «Computo» y «Cómputo» no son el mismo.', l: 448 },
      'ValidarSemestresEnJornadaAsync': { f: 'private async Task ValidarSemestresEnJornadaAsync(Guid pensumId, Guid jornadaId, IReadOnlyList<int> semestres, CancellationToken cancellationToken)', s: 'Lo que ya se puede demostrar al activar una cohorte en un semestre: que cada sesión de ese semestre cabe en un día de su jornada, y que la suma de sus slots no pasa de los slots lectivos de la semana. Es la misma cuenta que hace el precálculo del motor en `Precalculo.SemestresQueNoCaben`; aquí se adelanta al momento de guardar.', l: 487 },
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
      'ActualizarAgrupacionAsync': { f: 'Task<AgrupacionAreaComun> ActualizarAgrupacionAsync(ActualizarAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una agrupación de área común.', l: 89 },
      'ActualizarCohorteAsync': { f: 'Task<Cohorte> ActualizarCohorteAsync(ActualizarCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una cohorte.', l: 86 },
      'ActualizarCursoComunAsync': { f: 'Task<CursoComun> ActualizarCursoComunAsync(ActualizarCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un grupo de cursos equivalentes.', l: 83 },
      'ActualizarCursoEnPensumAsync': { f: 'Task<CursoDePensum> ActualizarCursoEnPensumAsync(ActualizarCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un curso y de su carga en la malla.', l: 77 },
      'ActualizarPensumAsync': { f: 'Task<Pensum> ActualizarPensumAsync(ActualizarPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un pensum.', l: 74 },
      'CrearAgrupacionAsync': { f: 'Task<AgrupacionAreaComun> CrearAgrupacionAsync(CrearAgrupacionAreaComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Une varios cursos de área común en una sola clase compartida.', l: 33 },
      'CrearCohorteAsync': { f: 'Task<Cohorte> CrearCohorteAsync(CrearCohorteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta una cohorte y devuelve la fila creada.', l: 26 },
      'CrearCursoComunAsync': { f: 'Task<CursoComun> CrearCursoComunAsync(CrearCursoComunSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Declara que varios cursos de pensums distintos son el mismo curso.', l: 23 },
      'CrearCursoEnPensumAsync': { f: 'Task<CursoDePensum> CrearCursoEnPensumAsync(CrearCursoEnPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea un curso dentro de un pensum, junto con su fila de malla.', l: 21 },
      'CrearPensumAsync': { f: 'Task<Pensum> CrearPensumAsync(CrearPensumSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta un pensum y devuelve la fila creada.', l: 19 },
      'DesactivarCohortePeriodoAsync': { f: 'Task<bool> DesactivarCohortePeriodoAsync(Guid cohorteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Saca una cohorte de un período. Falso si no estaba activa ahí.', l: 30 },
      'EliminarAgrupacionAsync': { f: 'Task<bool> EliminarAgrupacionAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Deshace una agrupación de área común. Falso si no existía.', l: 105 },
      'EliminarCohorteAsync': { f: 'Task<bool> EliminarCohorteAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una cohorte. Falso si no había nada que borrar.', l: 102 },
      'EliminarCursoAsync': { f: 'Task<bool> EliminarCursoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un curso y de su fila de malla. Falso si no había nada que borrar.', l: 96 },
      'EliminarCursoComunAsync': { f: 'Task<bool> EliminarCursoComunAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Deshace un grupo de cursos equivalentes. Falso si no existía.', l: 99 },
      'EliminarPensumAsync': { f: 'Task<bool> EliminarPensumAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un pensum. Falso si no había nada que borrar.', l: 92 },
      'EstablecerEstadoCursoAsync': { f: 'Task<CursoAcademico> EstablecerEstadoCursoAsync(Guid id, bool estaActivo, CancellationToken cancellationToken = default)', s: 'Activa o desactiva un curso sin borrar su malla ni su historia.', l: 80 },
      'GuardarRejillaCohortesAsync': { f: 'Task<ResultadoRejillaCohortes> GuardarRejillaCohortesAsync(GuardarRejillaCohortesSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda una fila entera de la rejilla carrera × semestre: crea las cohortes que falten, las activa en el período, desactiva las que se desmarcaron y rehace las áreas comunes. Es una sola llamada a propósito: son una transacción.', l: 39 },
      'ListarAgrupacionesAsync': { f: 'Task<IReadOnlyList<AgrupacionAreaComun>> ListarAgrupacionesAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Agrupaciones de área común de un período.', l: 69 },
      'ListarCarreraJornadasAsync': { f: 'Task<IReadOnlyList<CarreraJornada>> ListarCarreraJornadasAsync(CancellationToken cancellationToken = default)', s: 'Los pares carrera-jornada que se ofrecen, haya cohortes o no.', l: 61 },
      'ListarCohortesActivasAsync': { f: 'Task<IReadOnlyList<CohorteActivaPeriodo>> ListarCohortesActivasAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Cohortes que cursan en un período, con el semestre y la matrícula de ese período.', l: 67 },
      'ListarCohortesAsync': { f: 'Task<IReadOnlyList<Cohorte>> ListarCohortesAsync(CancellationToken cancellationToken = default)', s: 'Todas las cohortes.', l: 64 },
      'ListarCursosAsync': { f: 'Task<IReadOnlyList<CursoAcademico>> ListarCursosAsync(Guid? pensumId = null, bool incluirInactivos = false, CancellationToken cancellationToken = default)', s: 'Cursos activos de un pensum. Sin pensumId devuelve los de todos; las consultas históricas pueden solicitar también los inactivos.', l: 47 },
      'ListarCursosComunesAsync': { f: 'Task<IReadOnlyList<CursoComun>> ListarCursosComunesAsync(CancellationToken cancellationToken = default)', s: 'Todos los grupos de cursos equivalentes.', l: 53 },
      'ListarCursosPensumAsync': { f: 'Task<IReadOnlyList<CursoEnPensum>> ListarCursosPensumAsync(Guid? pensumId = null, CancellationToken cancellationToken = default)', s: 'Cursos colocados en pensums. Sin pensumId devuelve los de todos.', l: 56 },
      'ListarPensumsAsync': { f: 'Task<IReadOnlyList<Pensum>> ListarPensumsAsync(CancellationToken cancellationToken = default)', s: 'Todos los pensums.', l: 44 },
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
      'ActualizarContrasenaAsync': { f: 'Task ActualizarContrasenaAsync(string tokenAcceso, string nuevaContrasena, CancellationToken cancellationToken = default)', s: 'Cambia la contraseña usando la sesión temporal incluida en el enlace de recuperación.', l: 33 },
      'CerrarSesionAsync': { f: 'Task CerrarSesionAsync(string tokenAcceso, CancellationToken cancellationToken = default)', s: 'Invalida la sesión del lado de Supabase.', l: 39 },
      'IniciarSesionAsync': { f: 'Task<SesionSupabase> IniciarSesionAsync(string correo, string contrasena, CancellationToken cancellationToken = default)', s: 'Comprueba las credenciales y abre una sesión. Que salga bien solo dice que la persona es quien dice ser; si además tiene permiso de entrar al sistema de horarios lo decide `IniciarSesion`.', l: 17 },
      'SolicitarRecuperacionContrasenaAsync': { f: 'Task SolicitarRecuperacionContrasenaAsync(string correo, Uri uriRetorno, CancellationToken cancellationToken = default)', s: 'Pide a Supabase que envíe el correo con el enlace para recuperar la contraseña.', l: 25 },
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
      'ToString': { f: 'public override string ToString()', s: 'Forma corta «recurso:accion», la que se usa en mensajes y registros.', l: 80 },
    },
  },
  'Horarios.Aplicacion.Acceso.RestablecerContrasena': {
    s: 'Cambia la contraseña mediante el token temporal emitido por Supabase.',
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
  'Horarios.Aplicacion.Acceso.SolicitarRecuperacionContrasena': {
    s: 'Solicita un enlace de recuperación sin consultar primero si el correo existe. De esta forma la respuesta pública no permite enumerar las cuentas registradas.',
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
      'EjecutarAsync': { f: 'public async Task<Jornada> EjecutarAsync(CrearJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Crea la jornada y la devuelve ya guardada.\n\nTres reglas sobre el receso: si dura cero minutos no puede estar ubicado en ningún bloque, si dura algo tiene que caer entre dos bloques —ni antes del primero ni después del último, donde no sería un receso— y nunca puede durar negativo. Al final se comprueba lo más importante: que los bloques más el receso quepan de verdad entre la hora de entrada y la de salida.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta el nombre o los días; el rango de horas o la duración no son válidos; el receso está mal ubicado; o todo junto no cabe en la jornada; o la jornada es extraordinaria y su regular no sirve.']], l: 39 },
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
  'Horarios.Aplicacion.Aulas.GestionarJornadasExtraordinarias': {
    s: 'Elegir, para un período, el horario de referencia de una jornada extraordinaria y los docentes que dan clase en ella.',
    m: {
      'GuardarAsync': { f: 'public async Task GuardarAsync(JornadaExtraordinariaPeriodoDto configuracion, CancellationToken cancellationToken = default)', s: 'Guarda la configuración. Que el horario sea del mismo período lo comprueba la base, que es la única que puede verlo sin traer el horario entero.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:crear.'], ['ArgumentException', 'Falta la jornada, el período o el horario, o la jornada no es extraordinaria.']], l: 51 },
      'ObtenerAsync': { f: 'public Task<JornadaExtraordinariaPeriodoDto?> ObtenerAsync(Guid jornadaId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'La configuración guardada, o nulo si todavía no hay.', e: [['UnauthorizedAccessException', 'Sin el permiso aulas:leer.']], l: 35 },
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
      'ActualizarAulaAsync': { f: 'Task<Aula> ActualizarAulaAsync(ActualizarAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un aula y devuelve cómo quedó.', l: 54 },
      'ActualizarDescansoAsync': { f: 'Task<DescansoJornada> ActualizarDescansoAsync(ActualizarDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un descanso y devuelve cómo quedó.', l: 78 },
      'ActualizarJornadaAsync': { f: 'Task<Jornada> ActualizarJornadaAsync(ActualizarJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de una jornada y devuelve cómo quedó.', l: 64 },
      'CrearAulaAsync': { f: 'Task<Aula> CrearAulaAsync(CrearAulaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta el aula y devuelve la fila creada.', l: 12 },
      'CrearDescansoAsync': { f: 'Task<DescansoJornada> CrearDescansoAsync(CrearDescansoJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta un descanso y devuelve la fila creada.', l: 39 },
      'CrearJornadaAsync': { f: 'Task<Jornada> CrearJornadaAsync(CrearJornadaSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Inserta la jornada y devuelve la fila creada.', l: 14 },
      'EliminarAulaAsync': { f: 'Task<bool> EliminarAulaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de un aula. Falso si no había nada que borrar.', l: 60 },
      'EliminarDescansoAsync': { f: 'Task<bool> EliminarDescansoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borra un descanso. Falso si no había nada que borrar.', l: 84 },
      'EliminarJornadaAsync': { f: 'Task<bool> EliminarJornadaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Borrado lógico de una jornada. Falso si no había nada que borrar.', l: 70 },
      'ExisteAulaEnPisoAsync': { f: 'Task<bool> ExisteAulaEnPisoAsync(int piso, int numeroAula, Guid? excluirAulaId = null, CancellationToken cancellationToken = default)', s: 'Si ya hay un aula con ese número en ese piso. `excluirAulaId` deja fuera de la comparación a la propia aula que se está editando.', l: 21 },
      'ListarAulasActivasAsync': { f: 'Task<IReadOnlyList<Aula>> ListarAulasActivasAsync(CancellationToken cancellationToken = default)', s: 'Aulas activas, sin las borradas ni las desactivadas.', l: 16 },
      'ListarDescansosAsync': { f: 'Task<IReadOnlyList<DescansoJornada>> ListarDescansosAsync(Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Descansos declarados en una jornada.', l: 43 },
      'ListarExtraordinariasDeAsync': { f: 'Task<IReadOnlyList<Jornada>> ListarExtraordinariasDeAsync(Guid jornadaRegularId, CancellationToken cancellationToken = default)', s: 'Las jornadas extraordinarias que cuelgan de una regular, activas o no, sin las borradas: una desactivada también se rompería si la regular cambia.', l: 34 },
      'ListarJornadasActivasAsync': { f: 'Task<IReadOnlyList<Jornada>> ListarJornadasActivasAsync(CancellationToken cancellationToken = default)', s: 'Jornadas activas.', l: 27 },
      'ObtenerAulaAsync': { f: 'Task<Aula?> ObtenerAulaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un aula por su identificador, o nulo si no existe.', l: 50 },
      'ObtenerDescansoAsync': { f: 'Task<DescansoJornada?> ObtenerDescansoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Un descanso por su identificador, o nulo si no existe.', l: 74 },
      'ObtenerJornadaAsync': { f: 'Task<Jornada?> ObtenerJornadaAsync(Guid id, CancellationToken cancellationToken = default)', s: 'Una jornada por su identificador, o nulo si no existe.', l: 29 },
    },
  },
  'Horarios.Aplicacion.Aulas.IDatosJornadasExtraordinarias': {
    s: 'Puerto hacia la configuración por período de las jornadas extraordinarias.',
    m: {
      'GuardarAsync': { f: 'Task GuardarAsync(JornadaExtraordinariaPeriodoDto configuracion, CancellationToken cancellationToken = default)', s: 'Guarda el horario de referencia y reemplaza la lista de docentes.', l: 19 },
      'ObtenerAsync': { f: 'Task<JornadaExtraordinariaPeriodoDto?> ObtenerAsync(Guid jornadaId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'La configuración de esa jornada en ese período, o nulo si todavía no hay.', l: 13 },
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
  'Horarios.Aplicacion.Aulas.ReglasJornadaExtraordinaria': {
    s: 'Las reglas de una jornada extraordinaria, escritas una vez para el alta y la edición. La base las vuelve a comprobar con un trigger; aquí se comprueban antes para dar un mensaje claro.',
    m: {
      'ValidarAsync': { f: 'public static async Task ValidarAsync(IDatosAulas datos, Guid? jornadaRegularId, int duracionBloqueMinutos, Guid? jornadaId, CancellationToken cancellationToken)', s: 'Si `jornadaRegularId` tiene valor, comprueba que apunte a una jornada regular activa, que no sea la misma jornada y que sus bloques duren lo mismo.', p: [['jornadaId', 'La jornada que se edita; nulo al crear.']], e: [['ArgumentException', 'Alguna de las tres reglas no se cumple.']], l: 17 },
      'ValidarCambioDeRegularAsync': { f: 'public static async Task ValidarCambioDeRegularAsync(IDatosAulas datos, Jornada actual, int nuevaDuracionBloqueMinutos, Guid? nuevaJornadaRegularId, CancellationToken cancellationToken)', s: 'Una jornada regular con extraordinarias no puede romperlas: ni cambiar la duración de sus bloques, que dejaría de coincidir con la de ellas, ni volverse extraordinaria. Cuentan también las extraordinarias desactivadas, igual que en la base.', p: [['nuevaJornadaRegularId', 'La regular que la edición le asigna; nulo si sigue siendo regular.']], e: [['InvalidOperationException', 'Tiene extraordinarias y el cambio las rompería.']], l: 48 },
    },
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
    m: {
      'ObtenerBloqueos': { f: 'public Task<BloqueosDeDisponibilidadDto> ObtenerBloqueos(Guid periodoId, Guid jornadaId, CancellationToken tokenCancelacion = default)', s: 'Las casillas de una jornada que el docente que inició sesión no puede marcar. Solo hay bloqueos en las jornadas extraordinarias.', e: [['ArgumentException', 'Falta el período o la jornada.'], ['UnauthorizedAccessException', 'El usuario no es un docente.']], l: 35 },
    },
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
      'GuardarAsync': { f: 'public async Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda la jornada declarada sin perder las jornadas ya almacenadas.\n\nSe rechazan las casillas repetidas antes de escribir: dos filas para la misma casilla se contradirían y no habría forma de saber cuál vale. La persistencia reemplaza la rejilla completa, por lo que antes de guardar se recuperan los bloques existentes y se sustituyen únicamente los de la jornada recibida.', e: [['ArgumentException', 'Falta el docente o el período, hay una casilla mal formada, o hay casillas repetidas.'], ['KeyNotFoundException', 'El docente no existe o no está activo.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien pide.']], l: 86 },
      'ObtenerAsync': { f: 'public async Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Devuelve lo declarado, o nulo si el docente aún no ha respondido. Consultar exige el mismo alcance que escribir: la disponibilidad es un dato personal.', e: [['KeyNotFoundException', 'El docente no existe o no está activo.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien pide.']], l: 128 },
      'ObtenerBloqueosAsync': { f: 'public async Task<BloqueosDeDisponibilidadDto> ObtenerBloqueosAsync(Guid docenteId, Guid periodoId, Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Las casillas de una jornada que el docente no puede marcar. Exige el mismo alcance que consultar su disponibilidad, porque el motivo nombra sus clases.', e: [['KeyNotFoundException', 'El docente no existe o no está activo.'], ['UnauthorizedAccessException', 'El docente queda fuera del alcance de quien pide.']], l: 147 },
      'PuedeGestionar': { f: 'private bool PuedeGestionar(Docente docente)', s: 'Decide el alcance: el administrador siempre; el propio docente sobre lo suyo; el decano si comparte al menos una facultad con él; nadie más.', l: 164 },
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
      'DocenteId': { f: 'Guid? DocenteId { get; }', s: 'Docente que es esta persona, si lo es. Cada quien alcanza lo suyo.', l: 51 },
      'EsAdministrador': { f: 'bool EsAdministrador { get; }', s: 'Alcanza a todos los docentes, sin límite de facultad.', l: 47 },
      'EsDecano': { f: 'bool EsDecano { get; }', s: 'Alcanza a los docentes de sus facultades.', l: 49 },
      'FacultadIds': { f: 'IReadOnlySet<Guid> FacultadIds { get; }', s: 'Facultades que alcanza.', l: 53 },
    },
  },
  'Horarios.Aplicacion.Docentes.IDatosDisponibilidadDeDocente': {
    m: {
      'ObtenerBloqueos': { f: 'Task<BloqueosDeDisponibilidadDto> ObtenerBloqueos(Guid docenteId, Guid periodoId, Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Qué casillas de esa jornada tiene bloqueadas el docente, y por qué.', l: 18 },
    },
  },
  'Horarios.Aplicacion.Docentes.IDatosDisponibilidadDocente': {
    s: 'Puerto hacia la persistencia de la disponibilidad declarada por los docentes.',
    m: {
      'GuardarAsync': { f: 'Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda la rejilla declarada y devuelve cómo quedó.', l: 17 },
      'ObtenerAsync': { f: 'Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'La disponibilidad de un docente en un período, o nulo si todavía no declaró nada.', l: 23 },
      'ObtenerBloqueosAsync': { f: 'Task<BloqueosDeDisponibilidadDto> ObtenerBloqueosAsync(Guid docenteId, Guid periodoId, Guid jornadaId, CancellationToken cancellationToken = default)', s: 'Qué casillas de esa jornada tiene bloqueadas el docente, y por qué.', l: 29 },
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
  'Horarios.Aplicacion.Motor.ConsultarHorarioGenerado': {
    s: 'Devuelve el horario ya generado de un plan, listo para pintar: clases, conflictos y pendientes.',
    m: {
      'EjecutarAsync': { f: 'public Task<HorarioGeneradoDto> EjecutarAsync(Guid planId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó el plan.']], l: 43 },
    },
  },
  'Horarios.Aplicacion.Motor.EjecutarGeneracionPlan': {
    s: 'Corre y verifica una generación ya abierta. El horario se persiste realmente dentro de `CerrarYGuardarHorarioAsync`, cuya RPC cierra la generación y llama a guardar_resultado_generacion en la misma transacción.',
  },
  'Horarios.Aplicacion.Motor.GenerarHorarioPlan': {
    s: 'Valida, abre y encola una generación de horario.',
  },
  'Horarios.Aplicacion.Motor.IColaGeneraciones': {
    s: 'Ejecuta la generación fuera de la petición web.',
  },
  'Horarios.Aplicacion.Motor.IContextoUsuario': {
    s: 'Quién está pidiendo la operación. Es la forma en que un caso de uso conoce al usuario actual sin depender de la web: la implementación de verdad lee la sesión HTTP, y en las pruebas se sustituye por un doble.',
    m: {
      'EstaAutenticado': { f: 'bool EstaAutenticado { get; }', s: 'Si hay una sesión abierta. En falso, todo caso de uso protegido rechaza.', l: 31 },
      'TienePermiso': { f: 'bool TienePermiso(PermisoAplicacion permiso)', s: 'Si la sesión tiene el permiso indicado.', l: 43 },
    },
  },
  'Horarios.Aplicacion.Motor.IDatosGeneraciones': {
    s: 'Persiste el ciclo de vida y el resultado transaccional de una generación.',
    m: {
      'CerrarYGuardarHorarioAsync': { f: 'Task<GeneracionHorarioDto> CerrarYGuardarHorarioAsync(Guid generacionId, EstadoGeneracionDto estado, long duracionMs, Instantanea instantanea, Resultado? resultado, ResultadoVerificacion? verificacion, string? error, CancellationToken cancellationToken = default)', s: 'Cierra la generación y, para estados completada o inviable, guarda el horario mediante finalizar_generacion → guardar_resultado_generacion.', l: 27 },
    },
  },
  'Horarios.Aplicacion.Motor.IDatosHorarioGenerado': {
    s: 'Lee el horario generado en la forma que consume la pantalla.',
  },
  'Horarios.Aplicacion.Motor.IPreparadorInstantaneaMotor': {
    s: 'Arma la instantánea inmutable que consume el motor.',
  },
  'Horarios.Aplicacion.Motor.ListarGeneracionesPlan': {
    s: 'Devuelve el historial de intentos de generación de un plan: cuándo se corrió, cuánto tardó y cómo salió cada uno.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<GeneracionHorarioDto>> EjecutarAsync(Guid planId, CancellationToken cancellationToken = default)', e: [['ArgumentException', 'No se indicó el plan.']], l: 19 },
    },
  },
  'Horarios.Aplicacion.Motor.PermisoAplicacion': {
    s: 'Un permiso, como par recurso-acción. Es struct y de solo lectura porque se crea muchas veces por petición y no vale la pena reservar memoria para cada comprobación.',
  },
  'Horarios.Aplicacion.Motor.PermisosMotor': {
    s: 'Permisos del motor, escritos una sola vez para no repartir cadenas sueltas por el código, donde una errata pasaría desapercibida.',
    m: {
      'Generar': { f: 'public static readonly PermisoAplicacion Generar = new("Motor", "generar")', s: 'Permite mandar a generar el horario de un plan.', l: 18 },
    },
  },
  'Horarios.Aplicacion.Motor.SolicitudGeneracionEncolada': {
    s: 'Todo lo necesario para terminar una generación ya iniciada.',
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
  'Horarios.Aplicacion.Planes.EdicionAGuardar': {
    s: 'Una propuesta revisada, con todo lo que hay que escribir y dejar anotado.',
    m: {
      'Cambios': { s: 'Todas las sesiones que cambian, fijadas por la persona y movidas.' },
      'DuracionBusquedaMs': { s: 'Cuánto tardó la búsqueda que produjo la propuesta.' },
      'Fijadas': { s: 'Las sesiones que quedan con `esta_fijada`.' },
      'NivelAlcance': { s: 'Hasta dónde se amplió la búsqueda, para la auditoría.' },
      'PropuestaId': { s: 'Identifica la propuesta: se guarda como clave de la edición, así que la misma propuesta no puede guardarse dos veces.' },
      'VersionEsperada': { s: 'La versión del plan sobre la que se buscó la propuesta.' },
    },
  },
  'Horarios.Aplicacion.Planes.EdicionHorarioRechazadaException': {
    s: 'La edición no se guardó y no queda nada escrito. Lleva los motivos en palabras para enseñarlos tal cual en el modal.',
  },
  'Horarios.Aplicacion.Planes.EditarSesionHorario': {
    s: 'Editar una clase desde Planes: abrirla, ver qué casillas quedarán fijas, buscar una propuesta que la acomode y guardarla tal cual se revisó.\n\nOrquesta tres piezas y no conoce las reglas de ninguna: el reparador del motor (`IReparadorHorario`) decide qué se fija y busca la propuesta, el puerto (`IDatosEdicionHorario`) lee y guarda, y el contexto dice quién pide.\n\nVive lo que dura el circuito de Blazor (se registra por ámbito). Ahí guarda la última propuesta lista, y «Aplicar» solo acepta esa: si la persona cambia un campo o busca otra vez, la anterior deja de valer. Ninguna búsqueda escribe nada ni deja una transacción abierta.',
    m: {
      'AplicarAsync': { f: 'public async Task<ResultadoEdicionDto> AplicarAsync(Guid propuestaId, SolicitudEdicionSesion solicitud, CancellationToken cancellationToken = default)', s: 'Guarda exactamente la propuesta revisada. Nunca busca otra: si los datos cambiaron, rechaza y pide buscar de nuevo.', p: [['propuestaId', 'El identificador que devolvió `ProponerAsync`.'], ['solicitud', 'Los campos tal como están en el modal al pulsar «Aplicar».']], e: [['EdicionHorarioRechazadaException', 'La propuesta ya no vale o no se pudo guardar.']], l: 204 },
      'AulasOcupadas': { f: 'public IReadOnlyDictionary<Guid, AulaOcupadaDto> AulasOcupadas(Guid sesionId, string dia, int indiceSlotInicio)', s: 'Las aulas que otra clase ya tiene si la clase abierta empieza en ese día y esa hora, para marcarlas en el selector. Usa lo leído al abrir la clase. Vacío si el día o la hora no están elegidos o no existen.', e: [['InvalidOperationException', 'No se abrió ninguna clase antes.']], l: 131 },
      'CasillasQueSeFijan': { f: 'public IReadOnlyList<CasillaFijaDto> CasillasQueSeFijan(SolicitudEdicionSesion solicitud)', s: 'Las casillas que quedarán fijas con estos valores, para enseñarlas antes de buscar. Usa lo leído al abrir la clase y la misma regla que la búsqueda.', e: [['InvalidOperationException', 'No se abrió ninguna clase antes.']], l: 109 },
      'ConsultarAsync': { f: 'public async Task<EdicionSesionDto> ConsultarAsync(Guid planId, Guid sesionId, CancellationToken cancellationToken = default)', s: 'Lo que el modal necesita para abrir una clase.', e: [['UnauthorizedAccessException', 'Sin planes:actualizar y motor:generar.'], ['KeyNotFoundException', 'El plan o la clase no existen.'], ['InvalidOperationException', 'El horario guardado ya no coincide con los datos.']], l: 49 },
      'DescartarPropuesta': { f: 'public void DescartarPropuesta()', s: 'Olvida la propuesta vigente: la persona cambió un campo o cerró el modal.', l: 188 },
      'ExigirPermisos': { f: 'private void ExigirPermisos()', s: 'Editar el horario pide los dos permisos: actualizar el plan y usar el motor.', l: 319 },
      'LiberarFijacionAsync': { f: 'public async Task<long> LiberarFijacionAsync(Guid planId, Guid sesionId, long versionEsperada, string motivo, CancellationToken cancellationToken = default)', s: 'Quita la fijación de una sola clase, sin moverla. Las demás fijaciones no cambian. Devuelve la versión nueva del plan.', l: 256 },
      'MotivoNoEditable': { f: 'private static string? MotivoNoEditable(HorarioParaEditar leido, SesionRequerida sesion)', s: 'Por qué no se puede editar esta clase, o nulo si se puede.', l: 272 },
      'PlazoBusqueda': { f: 'public static readonly TimeSpan PlazoBusqueda = TimeSpan.FromSeconds(15)', s: 'Tiempo máximo de una búsqueda. En E1 (153 sesiones) el motor tarda menos de un segundo por intento, así que quince segundos dan para los tres alcances con holgura.', l: 31 },
      'ProponerAsync': { f: 'public async Task<PropuestaEdicionDto> ProponerAsync(SolicitudEdicionSesion solicitud, CancellationToken cancellationToken = default)', s: 'Busca una propuesta. Lee el horario de nuevo —sin transacción abierta mientras busca—, corre el reparador fuera del hilo de la interfaz y se queda con el resultado si es la búsqueda más reciente. No escribe nada.', p: [['cancellationToken', '«Detener búsqueda».']], e: [['EdicionHorarioRechazadaException', 'El plan ya no está en revisión, cambió de versión o su horario está incompleto.']], l: 149 },
      'PuedeEditar': { f: 'public bool PuedeEditar(PlanHorario plan)', s: 'Si esta persona puede editar clases de este plan: tiene los dos permisos y el plan admite edición manual. Planes lo usa para hacer clicables las clases; los casos de uso lo exigen igual.', l: 42 },
    },
  },
  'Horarios.Aplicacion.Planes.GestionarPlanes': {
    s: 'Edición y baja de planes. El alta vive en `CrearPlan` y los cambios de estado en `CambiarEstadoPlan`.',
    m: {
      'ActualizarAsync': { f: 'public async Task<PlanHorario> ActualizarAsync(ActualizarPlanSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Guarda los cambios de un plan.\n\nSolo se edita en borrador: una vez generado, cambiar el alcance dejaría el horario existente sin relación con lo que el plan dice cubrir.', e: [['UnauthorizedAccessException', 'Sin el permiso planes:actualizar.'], ['ArgumentException', 'Falta el plan o el período, el alcance trae un identificador vacío, o el plan se declara origen de sí mismo.'], ['KeyNotFoundException', 'El plan no existe.'], ['InvalidOperationException', 'El plan ya no está en borrador.']], l: 34 },
      'EliminarAsync': { f: 'public async Task EliminarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Borra un plan que todavía no ha avanzado.\n\nSolo se admite en borrador o recién generado: a partir de revisión el plan ya entró en un circuito de aprobación del que tiene que quedar rastro, y para eso está archivarlo.', e: [['UnauthorizedAccessException', 'Sin el permiso planes:actualizar.'], ['KeyNotFoundException', 'El plan no existe.'], ['InvalidOperationException', 'El plan ya pasó de generado.']], l: 62 },
    },
  },
  'Horarios.Aplicacion.Planes.HorarioParaEditar': {
    s: 'Lo que se lee para editar: el plan y su horario tal como están guardados.',
  },
  'Horarios.Aplicacion.Planes.IDatosEdicionHorario': {
    s: 'Puerto de la edición manual del horario. Es específico de este caso de uso a propósito: lee el horario guardado conservando sus identificadores y guarda una propuesta entera en una sola transacción. No es un repositorio de sesiones.',
    m: {
      'AplicarAsync': { f: 'Task<ResultadoGuardadoEdicion> AplicarAsync(EdicionAGuardar edicion, Func<HorarioVigente, ImmutableArray<string>> revalidar, CancellationToken cancellationToken = default)', s: 'Guarda una propuesta revisada en una única transacción: sesiones, fijaciones, conflictos, versión del plan y auditoría. Antes de escribir vuelve a leer el horario dentro de la misma transacción y se lo pasa a `revalidar`; si devuelve algún problema no se escribe nada.', e: [['EdicionHorarioRechazadaException', 'El plan cambió de estado o de versión, la propuesta dejó de valer, otra transacción chocó con esta o la base rechazó el resultado. En todos los casos no queda nada guardado.'], ['UnauthorizedAccessException', 'El usuario ya no tiene los permisos.']], l: 33 },
      'LeerAsync': { f: 'Task<HorarioParaEditar> LeerAsync(Guid planId, Guid usuarioId, CancellationToken cancellationToken = default)', s: 'El plan y su horario guardado, leídos juntos y de forma consistente, con las cohortes que este usuario puede modificar según su alcance actual en la base. No deja nada abierto.', e: [['KeyNotFoundException', 'El plan no existe o está eliminado.']], l: 20 },
      'LiberarFijacionAsync': { f: 'Task<long> LiberarFijacionAsync(Guid planId, Guid sesionId, long versionEsperada, Guid usuarioId, string motivo, CancellationToken cancellationToken = default)', s: 'Quita la marca de fijada a una sola sesión, sin moverla, y deja constancia en la auditoría. Devuelve la versión nueva del plan.', e: [['EdicionHorarioRechazadaException', 'El plan cambió, la sesión no estaba fijada o no está al alcance del usuario.']], l: 44 },
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
      'ObtenerConteosAsync': { f: 'Task<ConteosRevisionPlan> ObtenerConteosAsync(Guid periodoId, IReadOnlyList<Guid> carreraIds, IReadOnlyList<Guid> jornadaIds, CancellationToken cancellationToken = default)', s: 'Los conteos se limitan al alcance del plan. Listas vacías equivalen a todo el período.', l: 15 },
    },
  },
  'Horarios.Aplicacion.Planes.IRevisorFactibilidadPlan': {
    s: 'Puerto hacia el precálculo del motor sobre los datos reales del plan. A diferencia de los conteos, mira cada asignación concreta: si tiene docente, aula y hora posibles, si su semestre cabe en la jornada y si la carga del único docente que la puede dar alcanza.',
    m: {
      'RevisarAsync': { f: 'Task<IReadOnlyList<Diagnostico>> RevisarAsync(PlanHorario plan, CancellationToken cancellationToken = default)', s: 'Lo que el motor ya sabe que dejaría pendiente, ordenado por código y mensaje.', l: 30 },
    },
  },
  'Horarios.Aplicacion.Planes.ListarPlanes': {
    s: 'Devuelve los planes, con filtros opcionales por período y por tipo.',
    m: {
      'EjecutarAsync': { f: 'public Task<IReadOnlyList<PlanHorario>> EjecutarAsync(Guid? periodoId = null, TipoPlanHorarioDto? tipo = null, CancellationToken cancellationToken = default)', s: 'Sin filtros devuelve todos los planes. Un período nulo significa «cualquiera», pero un período vacío es un error: delata un desplegable sin elegir, no una intención de no filtrar.', e: [['ArgumentException', 'Se pasó un período vacío.']], l: 24 },
    },
  },
  'Horarios.Aplicacion.Planes.PresentacionEdicion': {
    s: 'Traduce lo que devuelve el reparador a lo que enseña el modal. Solo formatea: no decide qué se fija ni qué se mueve. Los nombres y las horas los redacta el motor (`Describir`), aquí solo se juntan.',
    m: {
      'AulaSinElegir': { f: 'public const string AulaSinElegir = "aula sin elegir"', s: 'Lo que se enseña en lugar del aula mientras no se elija.', l: 84 },
      'Casilla': { f: 'public static CasillaFijaDto Casilla(HorarioVigente vigente, SesionColocada colocada, Guid sesionAbierta, IReparadorHorario reparador)', s: 'Una casilla que quedará fijada, con sus valores finales.\n\nAl colocar una clase pendiente, el aula y el docente empiezan sin elegir (`Empty`). Se dice así: el nombre caería al identificador vacío.', l: 66 },
      'Dia': { f: 'public static string Dia(DiaSemana dia)', s: 'El día como lo guarda la base: «lunes», «miercoles»…', l: 94 },
      'DocenteSinElegir': { f: 'public const string DocenteSinElegir = "docente sin elegir"', s: 'Lo que se enseña en lugar del docente mientras no se elija.', l: 87 },
      'Duracion': { f: 'public static string Duracion(int slots)', s: '«2 bloques», o «1 bloque».', l: 105 },
      'Hora': { f: 'public static OpcionHoraDto Hora(OpcionDeColocacion opcion)', s: 'La hora inicial como la ofrece el selector.', l: 90 },
      'NombreDia': { f: 'public static string NombreDia(DiaSemana dia)', s: 'El día como se lee, con mayúscula y tilde.', l: 97 },
      'Propuesta': { f: 'public static PropuestaEdicionDto Propuesta(Guid id, HorarioVigente vigente, ResultadoReparacion resultado, Guid sesionAbierta, IReparadorHorario reparador)', s: 'La propuesta para el modal, con el antes/después de cada clase que cambia.', l: 17 },
      'Recortar': { f: 'private static IReadOnlyList<string> Recortar(IReadOnlyList<string> motivos)', s: 'Los primeros motivos y, si hay más, cuántos quedaron sin enseñar.\n\nLos motivos del verificador empiezan por la clase («el área común …»); aquí se leen como frases sueltas, así que van con mayúscula.', l: 130 },
    },
  },
  'Horarios.Aplicacion.Planes.PropuestaRevisada': {
    s: 'La propuesta lista, con lo necesario para guardarla y revalidarla.',
  },
  'Horarios.Aplicacion.Planes.ResultadoGuardadoEdicion': {
    s: 'Cómo terminó el guardado.',
    m: {
      'YaEstabaGuardada': { s: 'La misma propuesta ya se había guardado antes —un doble clic o un reintento tras perder la respuesta—, así que esta vez no se escribió nada.' },
    },
  },
  'Horarios.Aplicacion.Planes.RevisarDatosPlan': {
    s: 'Diagnóstico previo a generar, en dos niveles.\n\nPrimero los datos base: período, cohortes, cursos, aulas, docentes y disponibilidad. Si falta alguno no hay con qué generar, y eso sí impide generar.\n\nSi están, se arma la instantánea del motor y se corre su precálculo sin colocar nada. Lo que encuentra —un curso sin docente posible, un semestre que no cabe— sale como aviso y no impide generar: el motor genera igual y deja esas asignaciones pendientes, porque un horario parcial se puede revisar y publicar. El aviso sirve para corregir antes.\n\nLo llama la pantalla antes de ofrecer el botón de generar, y lo vuelve a llamar `GenerarHorarioPlan` antes de arrancar el motor.',
    m: {
      'EjecutarAsync': { f: 'public async Task<ResultadoRevisionPlanDto> EjecutarAsync(Guid planId, CancellationToken cancellationToken = default)', s: 'Revisa el plan y devuelve el veredicto, la lista de lo que falta y los avisos.\n\nCuando no hay cohortes, el mensaje cambia según el plan cubra todo el período o solo una parte: no es lo mismo que el período esté vacío que haber elegido un alcance donde no cae nadie, y confundirlos lleva a buscar el problema en el sitio equivocado.', e: [['ArgumentException', 'No se indicó el plan.'], ['InvalidOperationException', 'El plan no existe, o sus datos no se pueden convertir en instantánea.']], l: 75 },
    },
  },
  'Horarios.Motor.Construccion.AgendaDeCohortes': {
    s: 'Lo que las cohortes de una sesión ya tienen tomado cada día: cuántas clases, en qué slots y de qué curso visible.\n\nExiste porque `RegistroOcupacion` responde sí o no sobre franjas de la rejilla canónica, y esas franjas no salen de `Ocupacion/` (§7.4). Las tres preferencias del orden de trabajo —emparejar las sesiones de un mismo curso, repartir la semana y no dejar ventanas— preguntan otra cosa: de qué curso, cuántas y a qué distancia, en slots . Es exacto porque todas las sesiones de una cohorte sean de su jornada, así que para ella el índice de slot ya identifica la hora.\n\nNo decide nada y no es una regla: es el registro de lo colocado que los órdenes consultan. El colocador la anota y la borra a la par de los tres registros de ocupación, de modo que revertir una asignación entera la deja como estaba.',
    m: {
      'Anotar': { f: 'public void Anotar(SesionRequerida sesion, Colocacion colocacion)', s: 'Anota la sesión en el día de todas sus cohortes.', l: 33 },
      'Borrar': { f: 'public void Borrar(SesionRequerida sesion, Colocacion colocacion)', s: 'Deshace un `Anotar`. Borra una sola de las clases iguales, no todas: si el límite diario está relajada, una cohorte puede tener dos clases del mismo curso el mismo día y revertir una no puede llevarse la otra por delante.', l: 50 },
      'ClasesDelDia': { f: 'public int ClasesDelDia(SesionRequerida sesion, DiaSemana dia)', s: 'Cuántas clases tienen ya ese día las cohortes de la sesión. Segundo criterio del orden de colocaciones (§9.3): reparte la semana en vez de amontonar el lunes.', l: 132 },
      'DistanciaMasCorta': { f: 'public int DistanciaMasCorta(SesionRequerida sesion, Colocacion colocacion)', s: 'Cuántos slots libres quedarían entre esta colocación y la clase más cercana que las cohortes ya tienen ese día. Tercer criterio del orden de colocaciones (§9.3): pegarse a lo que ya hay es lo que evita las ventanas.\n\nCero significa contigua o solapada; los solapes se descartan después. `MaxValue` significa que ese día está vacío para estas cohortes; no compite con ningún número real porque el primer criterio ya puso esos días delante.', l: 149 },
      'EmparejaConElMismoCurso': { f: 'public bool EmparejaConElMismoCurso(SesionRequerida sesion, Colocacion colocacion)', s: 'Si esta colocación emparejaría la sesión con otra del mismo curso visible que alguna de sus cohortes ya tiene ese día: pegada a ella, sin un slot de por medio y sin formar un bloque más largo. Primer criterio del orden de colocaciones (§9.3).\n\nDos y no más. Un curso de tres sesiones sale 2+1 y no 3 seguidas, que es lo que dibuja el horario a mano: dos horas juntas valen la venida, tres vacían el día para todo lo demás. El tope no es estético — sin él, un curso que se come el día entero de una cohorte deja sin hueco común a las áreas comunes que vienen después, y el horario pierde sesiones.\n\nEl bloque se mide en slots contra `DuracionSlots`, así que «dos sesiones» significa lo mismo para un curso de un slot que para uno de dos.\n\nSe mira el curso visible y no el curso de la sesión porque en área común cada cohorte ve un curso distinto y lo que se empareja es el suyo.\n\nEs una preferencia y no una condición: cuando ninguna colocación empareja, el orden cae en los criterios siguientes y la sesión se coloca igual, en otro día.', l: 81 },
      'LargoDelBloque': { f: 'private int LargoDelBloque(SesionRequerida sesion, Colocacion colocacion)', s: 'Cuántos slots seguidos del mismo curso visible quedarían si la sesión se colocara aquí, contando los que ya están puestos a ambos lados. Vale `DuracionSlots` cuando la sesión queda sola, que es el caso de la primera sesión de cada curso.\n\nSe toma el bloque más largo de todas las cohortes participantes: si a una sola de ellas le quedara un bloque de tres, el tope ya está superado para la sesión entera.', l: 96 },
    },
  },
  'Horarios.Motor.Construccion.AsignacionPrecalculada': {
    s: 'Todo lo que el colocador necesita saber de una asignación antes de intentar colocarla: con qué docentes, en qué aulas y en qué colocaciones puede caber.\n\nSe calcula una sola vez porque nada de esto depende del estado acumulado: las cuatro listas salen de las condiciones de docentes, aulas y de la rejilla, que no cambian mientras el motor coloca. Es también lo que ordena las asignaciones de más difícil a más fácil (§9.1), donde la dificultad es el producto de los tamaños de las tres primeras.',
    m: {
      'Asignacion': { s: 'La clave del grupo de sesiones que un docente toma completo.' },
      'AulasFactibles': { s: 'Las que cumplen todos los requisitos de la sesión.' },
      'ColocacionesFactibles': { s: 'Las posiciones que caben en su jornada.' },
      'DocentesFactibles': { s: 'Los autorizados y disponibles, ordenados por identificador.' },
      'Imposibilidad': { s: 'Por qué esta asignación ya es imposible, en una frase y sin repetir de qué asignación se habla; nulo si ninguna de sus tres listas está vacía. Lo redacta el precálculo, que es quien aplicó los filtros, y lo reusa el colocador para que la fila de `sesiones_no_asignadas` diga la causa concreta y no solo «no hay aula».' },
      'Sesiones': { s: 'Sus sesiones semanales, fijadas incluidas, ordenadas por ordinal.' },
    },
  },
  'Horarios.Motor.Construccion.Clase': {
    s: 'Una clase ya colocada de una cohorte: su curso visible y el tramo que ocupa.',
  },
  'Horarios.Motor.Construccion.Codigos': {
    s: 'Las claves con que se cuentan los rechazos, escritas una sola vez. Son los nombres de las reglas porque así se leen en el código y en las pruebas, pero nunca salen al texto : a quien arregla el horario un nombre de regla no le dice qué pasó. Cada clave se traduce en `Regla` y en `EnPalabras`.',
  },
  'Horarios.Motor.Construccion.ColocadorVoraz': {
    s: 'El colocador voraz: el corazón del motor. Toma las asignaciones de la más restringida a la menos, y a cada una le busca un docente que pueda con todas sus sesiones libres.\n\nEs voraz y no vuelve atrás. El único retroceso que existe es de un nivel —si un docente no completa la asignación, se prueba el siguiente— y la reversión, que deshace las sesiones que ese docente sí había colocado. Ni puntajes, ni pesos, ni mejora local, ni intercambio de pares: la Fase 1 es una heurística voraz y lo es a propósito (R-6).\n\nEso no cambia porque `MotorHorarios` lo ejecute varias veces (R-6.1): cada vuelta construye un colocador nuevo sobre el horario vacío y lo único que hereda de la anterior es qué asignaciones atender primero. Un colocador no se reutiliza —`ejecutado` lo impide— y ninguna sesión ya colocada se mueve jamás.\n\nLo que sí garantiza es el nivel 1 de la regla de oro (§5.9): toda sesión que emite pasa las reglas duras, porque cada una se comprueba antes de ocupar y ninguna se comprueba dos veces con explicaciones distintas. La rejilla resuelve la forma de la jornada, el precálculo filtra docentes y aulas, y el bucle comprueba carga, disponibilidad y ocupación, de la operación más barata y restrictiva a la más cara.\n\nY garantiza que cada pendiente diga por qué (§9.4), con nombres y horas : el motivo se cuenta mientras se recorre —docente por docente, sesión por sesión y hora por hora— y arrastra consigo la clase concreta que ocupaba cada hora. No se reconstruye después con la ocupación ya cambiada, que es lo que hacía que el motor v1 diera una causa que no era la real.',
    m: {
      'Anotar': { f: 'private void Anotar(AsignacionPrecalculada asignacion, string motivo)', s: 'Anota la pendiente diciendo primero DE QUÉ se habla y después por qué se quedó fuera. La fila de `sesiones_no_asignadas` se lee sola en la pantalla, sin cruzar identificadores contra el catálogo.', l: 964 },
      'Atender': { f: '// Entran todas las sesiones libres de la asignación o ninguna. Dejarla a medias consume // recursos sin completar la carga semanal requerida. private void Atender(AsignacionPrecalculada asignacion)', s: 'Atiende una asignación entera: le busca el primer docente que pueda con todas sus sesiones libres y, si ninguno puede, la deja pendiente con el motivo contado.\n\nLas sesiones fijadas no entran en el bucle porque ya están colocadas y son inamovibles, pero sí cuentan para decidir si la asignación quedó completa y, sobre todo, ya eligieron su docente: cuando las hay, el único candidato es ese.\n\nDe cada docente que se prueba queda un `IntentoDeDocente`: hasta dónde llegó y, si no llegó, qué rechazó cada una de las horas de la sesión que lo frenó. Los rechazos se cuentan por sesión y no de corrido: los de una sesión que al final sí entró no explican nada y, sumados a los de la que falló, dan un número que no cuadra con las horas que tiene la jornada.', l: 618 },
      'AulasPara': { f: 'private ImmutableArray<Aula> AulasPara(SesionRequerida sesion, ImmutableArray<Aula> ordenadas)', s: 'Las aulas de la asignación, con el aula anterior de esta sesión delante al reparar.', l: 703 },
      'Candidatos': { f: 'private ImmutableArray<Docente> Candidatos(AsignacionPrecalculada asignacion)', s: 'Los docentes que se van a probar, en orden de preferencia (§9.3). Si la asignación tiene una sesión fijada, su docente ya está elegido y es el único candidato: cambiarlo rompería la continuidad y movería una sesión que debe permanecer fija.', l: 677 },
      'CargaLlena': { f: 'private string CargaLlena(Docente docente)', s: 'Con qué está llena la carga de un docente: su máximo y qué asignaciones lo cubren. Sin esto, «tiene la carga llena» obliga a abrir el horario para ver con qué; con esto se ve de una si lo que hay que mover es una de ellas o subirle la carga máxima.', l: 1317 },
      'Cohorte': { f: 'private string Cohorte(SesionRequerida sesion, Guid cohorteId)', s: 'La cohorte bloqueada, con su carrera y su semestre. Si la participación no está en la sesión —no puede pasar: el rechazo salió de recorrerlas—, queda el nombre a secas.', l: 1271 },
      'ColocacionesPara': { f: 'private ImmutableArray<Colocacion> ColocacionesPara(AsignacionPrecalculada asignacion, SesionRequerida sesion)', s: 'Las colocaciones de la sesión, con la hora anterior delante al reparar.', l: 709 },
      'Colocar': { f: 'public Resultado Colocar(CancellationToken cancellationToken = default)', s: 'Coloca el plan entero y devuelve lo colocado, lo pendiente con su motivo y los diagnósticos de la carga y del precálculo.', p: [['cancellationToken', 'Se comprueba entre asignaciones , nunca dentro (§9.5). Al cancelarse no se lanza: lo colocado se devuelve, el resto queda pendiente y `FueCancelado` lo dice. Un horario incompleto es un resultado; una excepción no lo es.']], e: [['InvalidOperationException', 'Si dos sesiones fijadas se contradicen entre sí, o si se llama dos veces al mismo colocador: su estado ya está gastado y la segunda pasada no partiría de un horario vacío.']], l: 329 },
      'ColocarUna': { f: 'private SesionColocada? ColocarUna(AsignacionPrecalculada asignacion, SesionRequerida sesion, Docente docente, ImmutableArray<Aula> aulasOrdenadas, RechazosDeUnaSesion rechazos)', s: 'Busca dónde cabe una sesión con ese docente y la ocupa. Devuelve nulo si no cabe en ninguna de sus colocaciones factibles.\n\nEl orden de las comprobaciones no se reordena (§9.2): primero lo que descarta la colocación entera y cuesta menos —las cohortes, que son las que menos margen tienen—, y el aula al final, que es lo único que obliga a recorrer una lista.\n\nCada colocación descartada cuenta una sola vez , por la primera regla que la descartó. El aula no es la excepción: diez aulas ocupadas a la misma hora son una hora perdida, no diez, y contarlas una por una hinchaba AulaSinSolape hasta ponerla siempre primera en el motivo aunque la causa real fuera otra.', l: 730 },
      'Cuantas': { f: 'private static string Cuantas(AsignacionPrecalculada asignacion, ImmutableArray<SesionRequerida> libres)', s: 'Cuántas sesiones quedaron fuera, de cuántas, sin decir «1 de sus 1».', l: 1241 },
      'Desglose': { f: 'private string Desglose(AsignacionPrecalculada asignacion, SesionRequerida sesion, Docente docente, RechazosDeUnaSesion rechazos)', s: 'Cuántas horas descartó cada regla y, de cada una, los ejemplos concretos. Las reglas van de más a menos rechazos, que es el orden en que hay que mirarlas.\n\nUna frase por regla. Los ejemplos de una misma regla ya van separados por «; y», y si las reglas también se separaran con punto y coma no se vería dónde acaba una causa y empieza la siguiente.', l: 1065 },
      'Diagnosticos': { f: 'private ImmutableArray<Diagnostico> Diagnosticos()', s: 'Los avisos de la carga y los del precálculo, juntos y ordenados por `(Código, Mensaje)`. El colocador no añade ninguno propio: lo que él descubre no es un problema de los datos sino el motivo de una pendiente, y ese va en su fila.', l: 1362 },
      'DocenteAnterior': { f: 'private Guid? DocenteAnterior(AsignacionPrecalculada asignacion)', s: 'Al reparar, el docente que la asignación tenía antes; nulo en la generación normal. Todas las sesiones de una asignación tienen el mismo docente, así que basta la primera que se encuentre en la referencia.', l: 695 },
      'Ejemplo': { f: 'private string Ejemplo(string codigo, Rechazo rechazo, SesionRequerida sesion, AsignacionPrecalculada asignacion)', s: 'Una hora descartada, dicha entera: cuándo se intentó y qué había en su lugar.\n\nEsto es lo que convierte un motivo en algo que se puede arreglar sin abrir el horario: no «el docente estaba ocupado», sino qué curso le estaba dando a qué cohorte —con su carrera y su semestre—, a qué hora y en qué aula.', l: 1152 },
      'Emitidas': { f: '// Las sesiones fijadas son ocupación previa inamovible y se conservan en el resultado. private ImmutableArray<SesionColocada> Emitidas()', s: 'Lo colocado, en el orden de la instantánea —por clave de asignación y ordinal—, que es total y no depende del orden en que el colocador fue decidiendo. Incluye las sesiones fijadas. Al guardar se reemplaza el plan entero, así que incluirlas de nuevo es lo único que las conserva.', l: 1343 },
      'EnCuantas': { f: 'private static string EnCuantas(int cuenta, int horas)', s: 'De cuántas de las horas posibles habla la frase. «9 porque…» a secas no dice si son horas, docentes o aulas; «en 9 de ellas», justo después de «ninguna de las 20 horas posibles», sí.\n\nCada hora descartada se cuenta una sola vez y la sesión que falló las probó todas, así que las cuentas de una sesión suman sus horas posibles. Por eso «esa hora» y «todas ellas» solo se dicen cuando la cuenta coincide: si algún día no coincidiera, el número se vería.', l: 1102 },
      'EnPalabras': { f: 'private static string EnPalabras(string codigo)', s: 'Por qué se frenó un docente del resumen, sin nadie a quien nombrar. Va detrás de un número —«2 por no tener disponibilidad confirmada a esas horas»—, así que cada frase sirve igual para uno que para varios.', l: 1134 },
      'ExigirSinSolape': { f: 'private void ExigirSinSolape(RegistroOcupacion registro, Guid entidadId, SesionFijada fijada, SesionRequerida sesion, string choque)', s: 'Lanza si la entidad ya tiene tomada esa hora, diciendo cuál es la otra clase.\n\nEl veredicto lo da `Libre`, que es el único que compara solapes; el ocupante se pregunta después y solo para poder nombrar a las dos sesiones. En este punto lo único ocupado son otras fijadas y, en un plan de jornadas extraordinarias, las clases del horario de referencia. Si la culpable es una de estas, el mensaje lo dice: no son «dos fijadas», y lo que hay que corregir es la fijada o la referencia.', p: [['choque', 'Lo que le pasa a la entidad, ya redactado para ella: «la cohorte … ya tiene otra clase», «el aula … ya está ocupada». Un mismo verbo para las tres no concuerda con ninguna.']], l: 572 },
      'LaFijada': { f: 'private string LaFijada(SesionFijada fijada, SesionRequerida sesion)', s: 'Cómo se nombra una sesión fijada en un error: por su identificador, que es lo que hay que buscar en la base, y por lo que es, que es lo que hay que buscar en la pantalla.', l: 505 },
      'Liberar': { f: 'private void Liberar(SesionRequerida sesion, SesionColocada puesta)', s: 'Inverso exacto de `Ocupar`. Al revertir las sesiones que un docente sí había colocado deja la ocupación igual que antes de probarlo, y el siguiente docente parte del mismo horario.', l: 854 },
      'Linea': { f: 'private string Linea(AsignacionPrecalculada asignacion, ImmutableArray<SesionRequerida> libres, IntentoDeDocente intento)', s: 'Lo que le pasó a un docente, en una frase que empieza por su nombre.', l: 1026 },
      'Motivo': { f: 'private string Motivo(AsignacionPrecalculada asignacion, ImmutableArray<SesionRequerida> libres, List<IntentoDeDocente> intentos)', s: 'El motivo de una asignación pendiente, contado durante el recorrido real (§9.4).\n\n`sesiones_no_asignadas.motivo_no_asignacion` es obligatorio y todo se guarda en una sola transacción: un motivo vacío no pierde una fila, pierde la generación entera. Por eso siempre hay uno.\n\nLo que ya era imposible manda. Cuando el precálculo dejó una lista en cero —ni una hora, ni un docente, ni un aula—, esa es la causa y no hay otra: los rechazos que el bucle pudiera haber contado encima describen consecuencias, y ponerlos delante manda a arreglar el horario cuando lo que falta es un aula. El motor v1 se equivocaba justo así.', l: 986 },
      'Ocupar': { f: 'private void Ocupar(SesionRequerida sesion, SesionColocada puesta)', s: 'Toma el reloj de las tres entidades y anota la clase en la agenda de las cohortes.', l: 818 },
      'OcuparExternas': { f: 'private void OcuparExternas()', s: 'Ocupa el docente y el aula de cada clase del horario de referencia, antes que nada más. Es lo que hace que una jornada extraordinaria corra en paralelo a la regular sin pisarla.\n\nNo toca cohortes, carga ni continuidad: esas clases son de otro horario. Y si dos de ellas ya se pisaban entre sí, la segunda no se vuelve a ocupar —la hora ya está tomada, que es lo único que importa aquí—.', l: 368 },
      'OcuparFijadas': { f: 'private void OcuparFijadas()', s: 'Ocupa las sesiones que alguien fijó a mano, antes de colocar la primera sesión libre Cada una toma su docente, su aula y sus cohortes, deja elegido el docente de su asignación, consume su carga y ocupa el día para limitar sesiones repetidas.\n\nAntes de ocupar ninguna se verifican con las mismas reglas con las que el verificador mira el resultado: las de fila, la continuidad, la carga y el solape. Una contradicción entre dos fijadas lanza : no se mueve una fijada ni se degrada en silencio a pendiente, porque las dos cosas significan tirar el trabajo de una persona sin decírselo.', e: [['InvalidOperationException', 'Si dos fijadas se contradicen, o si una es incoherente con su requisito.']], l: 394 },
      'Pendientes': { f: 'private ImmutableArray<AsignacionPendiente> Pendientes()', s: 'Lo pendiente, una entrada por asignación y ordenado por su clave.', l: 1352 },
      'Que': { f: 'private string Que(SesionRequerida culpable, AsignacionPrecalculada asignacion, Guid cohorteYaDicha)', s: 'Qué clase es la que estorba. Cuando es otra sesión de esta misma asignación se dice así y no se repite el curso: el caso es distinto y el arreglo también —no hay con quién negociar la hora, lo que falta es semana— y ver dos veces el mismo nombre de curso en la misma frase se lee como un defecto del mensaje.', l: 1212 },
      'RecursosQueFaltan': { f: 'private string RecursosQueFaltan(Aula aula, SesionRequerida sesion)', s: 'Los recursos que un aula no tiene en la cantidad que la sesión pide, por su nombre: «3 de «Canonera»». «No tiene los recursos» a secas obliga a comparar las dos listas a mano.', l: 494 },
      'Regla': { f: 'private string Regla(string codigo, AsignacionPrecalculada asignacion, Docente docente)', s: 'Qué pasó en esas horas, con el nombre de quien las descartó. Es lo que va en lugar del nombre de la regla: la causa dicha como la diría una persona.', l: 1111 },
      'ReglaQueMasFreno': { f: 'private static string ReglaQueMasFreno(IntentoDeDocente intento)', s: 'La regla que descartó más horas de ese docente; a igualdad, la primera por nombre.', l: 1303 },
      'Requerida': { f: '// La sesión fijada forma parte de las sesiones semanales que la asignación ya pedía. private SesionRequerida Requerida(SesionFijada fijada)', s: 'El requisito que la fijada reemplaza. El paso 4 ya los reconcilió, así que no encontrarlo —o encontrarlo sin marcar— significa que la instantánea se armó de dos fuentes distintas.', l: 419 },
      'Resumen': { f: 'private static string Resumen(IReadOnlyCollection<IntentoDeDocente> restantes)', s: 'Los docentes que no caben en el detalle, agrupados por la regla que más los frenó. No nombra a nadie: con quince docentes, el nombre ya no señala a ninguno y lo que importa es si el problema es la carga o el reloj.', l: 1284 },
      'UnaSolaCohorte': { f: 'private static ParticipacionCohorte? UnaSolaCohorte(AsignacionPrecalculada asignacion)', s: 'La única cohorte de la asignación, o nulo si es un área común de varias. Todas sus sesiones llevan las mismas participaciones, así que la de referencia responde por todas.', l: 1237 },
      'VerificarContinuidadYCarga': { f: 'private void VerificarContinuidadYCarga(SesionFijada fijada, SesionRequerida sesion, Docente docente)', s: 'Que dos fijadas de la misma asignación no traigan dos docentes, y que la carga alcance.', l: 520 },
      'VerificarFila': { f: 'private void VerificarFila(SesionFijada fijada, SesionRequerida sesion, Docente docente, Aula aula)', s: 'Las reglas por fila de `Reglas/` y la forma temporal de la rejilla, sobre una fijada.', l: 454 },
      'VerificarSolape': { f: 'private void VerificarSolape(SesionFijada fijada, SesionRequerida sesion, Docente docente, Aula aula)', s: 'Que la fijada no se pise con otra ya ocupada, nombrando a las dos y a qué hora.', l: 541 },
    },
  },
  'Horarios.Motor.Construccion.IntentoDeDocente': {
    s: 'Lo que le pasó a un docente cuando se le ofreció la asignación: hasta dónde llegó y qué lo frenó.\n\nEs la unidad del motivo porque es la unidad de la decisión: el colocador no descarta horas sueltas, descarta docentes, y una asignación queda pendiente cuando se acabaron los docentes. Un motivo que suma los rechazos de todos ellos no distingue «hay una sola persona autorizada y está llena» de «hay quince y ninguna tiene ese hueco», que se arreglan de maneras distintas.',
    m: {
      'CargaLlena': { s: 'Si ni se llegó a probar por CargaDocenteMaxima. Es lo único que se decide antes de mirar una sola hora.' },
      'Docente': { s: 'Quién se probó.' },
      'Rechazos': { s: 'Por qué se descartó cada hora de esa sesión.' },
      'SesionQueFallo': { s: 'La primera que no le cupo; nulo si no llegó a intentar ninguna.' },
      'SesionesColocadas': { s: 'Cuántas de las libres sí le cupieron antes de frenarse.' },
    },
  },
  'Horarios.Motor.Construccion.OrdenDeTrabajo': {
    s: 'Los cuatro órdenes del colocador: en qué orden se atienden las asignaciones (§9.1) y en qué orden se prueban sus colocaciones, docentes y aulas (§9.3).\n\nEsto es lo que sustituye al evaluador de restricciones blandas del motor v1. No optimiza: ordena. No hay puntajes ni pesos que sumar y comparar; hay una lista de criterios que se aplican en cascada y que terminan siempre en un desempate por identidad —`Id`, `ClaveAsignacion.Valor` o `(Dia, SlotInicio)`—. Por eso los cuatro órdenes son totales y por eso dos ejecuciones sobre la misma instantánea dan el mismo horario (R-5, R-6).\n\nLo más restringido primero es la única decisión algorítmica de la Fase 1, y es la que el motor v1 ya tenía bien: una asignación con dos docentes posibles y tres huecos tiene que elegir antes que una con veinte de cada.',
    m: {
      'Alumnos': { f: 'private static int Alumnos(SesionRequerida sesion)', s: 'Los alumnos que reúne la sesión, que son los mismos en todas las de su asignación.', l: 200 },
      'Asignaciones': { f: 'public static ImmutableArray<AsignacionPrecalculada> Asignaciones(ImmutableArray<AsignacionPrecalculada> asignaciones, IReadOnlySet<ClaveAsignacion>? segundaOportunidad = null)', s: 'Las asignaciones de la más difícil a la más fácil (§9.1). La dificultad es el producto del tamaño de las tres listas del precálculo: cuántas combinaciones distintas de docente, aula y colocación le quedan. Producto y no suma, porque lo que se agota es el producto cartesiano; una asignación con un solo docente no se salva porque le sobren aulas.\n\nLos seis desempates van del más al menos costoso de mover, y el último —la clave— hace el orden total. Una dificultad de cero significa que algo ya está vacío: esas van primero, fallan de inmediato y dejan libre el resto del horario.\n\nDelante de todo va la segunda oportunidad : lo que no cupo en una vuelta anterior. La dificultad la calcula el precálculo sobre el horario vacío , así que no puede saber que una cohorte se va a quedar sin holgura; lo que sí se sabe, después de una vuelta, es qué asignación se quedó fuera por llegar tarde al reparto. Adelantarla es la única información que el motor tiene y el precálculo no.', p: [['asignaciones', 'Las asignaciones precalculadas del plan.'], ['segundaOportunidad', 'Las que quedaron pendientes en una vuelta anterior, que pasan al frente. Vacío o nulo en la primera vuelta, que es el orden de siempre.']], e: [['ArgumentException', 'Si el arreglo no está inicializado.']], l: 46 },
      'Aulas': { f: 'public static ImmutableArray<Aula> Aulas(ImmutableArray<Aula> aulas, SesionRequerida sesion)', s: 'Las aulas en orden de preferencia (§9.3): la más ajustada primero. Todas las que llegan aquí ya cumplen los requisitos de la sesión, así que gastar un auditorio de 200 en un grupo de 20 solo le quita el aula a la cohorte grande que viene después.\n\nEl segundo criterio es el mismo argumento con los recursos: entre dos aulas que sirven, va antes la que tenga menos recursos de sobra.', p: [['aulas', 'Las factibles de la asignación, ya filtradas por el precálculo.'], ['sesion', 'Cualquier sesión de la asignación: todas exigen lo mismo.']], e: [['ArgumentNullException', 'Si `sesion` es nulo.'], ['ArgumentException', 'Si el arreglo no está inicializado.']], l: 110 },
      'Colocaciones': { f: 'public static ImmutableArray<Colocacion> Colocaciones(ImmutableArray<Colocacion> colocaciones, SesionRequerida sesion, AgendaDeCohortes agenda)', s: 'Las colocaciones en orden de preferencia (§9.3): primero las que emparejan la sesión con otra del mismo curso, después el día en que las cohortes de la sesión tienen menos clases, y dentro del día el hueco más pegado a lo que ya tienen.\n\nSon las tres únicas cosas que el horario le debe a quien lo cursa y que ninguna regla dura impone: que las horas de un curso caigan de dos en dos, repartir el resto de la semana en vez de amontonar el lunes, y no dejar una hora libre en medio de la mañana.\n\nEl emparejamiento va delante porque los otros dos lo contradicen: un día donde el curso ya está es, por definición, un día con más clases que los demás. Y va con tope de dos porque sin él se come el día entero de una cohorte y deja sin hueco común a las áreas comunes que vienen después. Como es un orden y no una condición, cuando ninguna colocación empareja los criterios siguientes deciden solos. Los dos últimos no eligen nada, solo cierran el orden.', p: [['colocaciones', 'Las posiciones factibles de la sesión, ya filtradas por la rejilla.'], ['sesion', 'La sesión que se va a colocar, con sus participaciones.'], ['agenda', 'Lo que las cohortes ya tienen tomado, que cambia con cada colocación.']], e: [['ArgumentNullException', 'Si `sesion` o la agenda son nulos.'], ['ArgumentException', 'Si el arreglo no está inicializado.']], l: 146 },
      'Dificultad': { f: 'private static int Dificultad(AsignacionPrecalculada asignacion)', s: 'Cuántas combinaciones de docente, aula y colocación le quedan a la asignación.', l: 194 },
      'Docentes': { f: 'public static ImmutableArray<Docente> Docentes(ImmutableArray<Docente> docentes, RegistroCarga carga)', s: 'Los docentes candidatos en orden de preferencia (§9.3): primero el de mayor nivel de prioridad, y entre iguales el que lleve menos carga en proporción a la suya, que es lo que reparte los cursos en vez de amontonarlos en el primero de la lista.\n\nLa proporción se compara como `double` a propósito: `2/4` tiene que ir después de `1/3`, y comparar solo la cuenta pondría al de carga máxima 3 al final por llevar un curso más que uno que ya está casi lleno. La división de dos enteros en coma flotante es exacta y reproducible, y el desempate por `Id` cierra el orden igualmente.', p: [['docentes', 'Los factibles de la asignación, o el único que fijó una sesión anclada.'], ['carga', 'El registro vivo: el orden cambia a medida que se reparte.']], e: [['ArgumentNullException', 'Si `carga` es nulo.'], ['ArgumentException', 'Si el arreglo no está inicializado.']], l: 82 },
      'Ocupacion': { f: 'private static double Ocupacion(Docente docente, RegistroCarga carga)', s: 'Qué proporción de su carga máxima lleva ya el docente. Una carga máxima de cero lo deja al final: no puede tomar ninguna asignación y el colocador lo descartará, pero dividir por cero rompería el orden en vez de ordenarlo.', l: 208 },
    },
  },
  'Horarios.Motor.Construccion.Precalculo': {
    s: 'Lo que se sabe antes de colocar nada: qué asignación es imposible y por qué.\n\nNada de esto lanza. Un curso sin docente autorizado, sin aula con su recurso o sin ninguna hora libre es un problema de los datos, no un defecto del motor: el plan se genera igual, con esas sesiones pendientes y la causa dicha. Diagnosticarlo aquí —y no dentro del bucle— es lo que hace que la causa sea la real y no la que quedó a la vista después de ocupar medio horario, que es lo que le pasaba al motor v1.\n\nEl precálculo tampoco decide: no elige docente ni aula ni colocación, solo descarta las que ninguna regla dura puede aceptar. Quien elige es el colocador, con los órdenes del §9.3.',
    m: {
      'Asignaciones': { f: 'public ImmutableArray<AsignacionPrecalculada> Asignaciones { get; }', s: 'Una entrada por asignación, ordenadas por su clave.', l: 104 },
      'Calcular': { f: 'private static AsignacionPrecalculada Calcular(ImmutableArray<SesionRequerida> sesiones, Instantanea instantanea, RejillaTiempo rejilla, ImmutableDictionary<Guid, Jornada> jornadas, ImmutableArray<Diagnostico>.Builder diagnosticos)', s: 'Calcula una asignación entera y emite lo que sus tres listas vacías signifiquen.', l: 151 },
      'CargasDocentesQueNoAlcanzan': { f: 'private static ImmutableArray<Diagnostico> CargasDocentesQueNoAlcanzan(Instantanea instantanea, ImmutableArray<AsignacionPrecalculada> asignaciones)', s: 'Detecta el único caso de carga que puede afirmarse sin colocar nada: un docente es el único candidato de más asignaciones que su carga máxima. Tener cinco autorizaciones y carga tres no basta para avisar, porque otros docentes podrían tomar dos; tener cinco asignaciones que solo esa persona puede impartir sí demuestra que al menos dos quedarán pendientes por `CargaDocenteMaxima`.', l: 119 },
      'ConMayuscula': { f: 'private static string ConMayuscula(string texto)', s: 'La misma frase sirve para empezar un mensaje y para ir dentro de otro, así que se guarda en minúscula y se capitaliza aquí. Solo la primera letra: bajar el resto convertiría a «Juan Carlos Ordóñez» en «juan carlos ordóñez», que es un nombre propio maltratado.', l: 320 },
      'Describir': { f: 'private static string Describir(SesionRequerida sesion, CatalogoNombres nombres)', s: 'Cómo se nombra una asignación en un mensaje para una persona. El área común no es «un curso de una cohorte»: es un curso que varias cohortes cursan con distinto nombre, y decirlo mal manda a buscar el problema al pensum equivocado.', l: 509 },
      'Diagnosticos': { f: 'public ImmutableArray<Diagnostico> Diagnosticos { get; }', s: 'Lo que ya se sabe imposible o relajado, ordenado por `(Código, Mensaje)`. Se emiten aunque el colocador después consiga algo: describen los datos, no el resultado.', l: 110 },
      'Imposibilidad': { f: 'private static string? Imposibilidad(SesionRequerida referencia, Instantanea instantanea, ImmutableDictionary<Guid, Jornada> jornadas, ImmutableArray<Docente> autorizados, ImmutableArray<Docente> docentes, ImmutableArray<Aula> aulas, ImmutableArray<Colocacion> colocaciones)', s: 'La causa concreta, en una frase, de que la asignación ya no se pueda colocar. El orden es el de las tres listas del colocador —hora, docente, aula—, para que el motivo de la pendiente y el diagnóstico temprano nunca se contradigan.\n\nNulo cuando ninguna lista está vacía: entonces la asignación sí era posible y lo que cuenta es qué la fue rechazando, que es lo que el colocador sabe y el precálculo no.', l: 226 },
      'MensajeSinDocente': { f: 'private static string MensajeSinDocente(SesionRequerida referencia, ImmutableArray<Docente> autorizados, ImmutableArray<Colocacion> colocaciones, CatalogoNombres nombres)', s: 'Por qué la asignación se quedó sin docentes. Son tres causas distintas y arreglarlas cuesta cosas distintas: autorizar a alguien, confirmarle disponibilidad, o corregir la jornada.', l: 264 },
      'MotivoDeAulas': { f: 'private static string MotivoDeAulas(ImmutableArray<Aula> aulas, SesionRequerida sesion, CatalogoNombres nombres)', s: 'Qué filtro dejó la lista de aulas en cero, nombrando el recurso cuando es un recurso. Los filtros se aplican en cascada y en el orden del SQL, así que el que la vacía es el que hay que arreglar; decirlos todos a la vez obligaría a adivinar cuál.', l: 336 },
      'MotivoDeColocaciones': { f: 'private static string MotivoDeColocaciones(SesionRequerida sesion, ImmutableDictionary<Guid, Jornada> jornadas, CatalogoNombres nombres)', s: 'Qué regla de la forma temporal dejó a la sesión sin ninguna colocación. Se preguntan en el orden en que la rejilla las aplica, de la más gruesa a la más fina.', l: 402 },
      'MotivoDeRecursos': { f: 'private static string MotivoDeRecursos(ImmutableArray<Aula> aulas, SesionRequerida sesion, CatalogoNombres nombres)', s: 'Cuál recurso vació la lista. Si ninguno lo hace por sí solo pero juntos sí —un aula tiene el proyector y otra el microscopio, y la sesión pide los dos— se dicen todos, porque culpar a uno sería falso.', l: 376 },
      'NingunaDe': { f: 'private static string NingunaDe(int cuantas, string singular, string plural)', s: '«ninguna de las 4 aulas» o, si solo hay una, «la única aula no»: «ninguna de las 1 aulas» se lee como un error del programa. Devuelve el sujeto con la negación ya puesta, así que el verbo que sigue va sin «no».', l: 328 },
      'Nombrar': { f: 'private static string Nombrar(ImmutableArray<Docente> docentes, CatalogoNombres nombres)', s: 'Los docentes por su nombre. Se listan hasta tres: más que eso es una lista que nadie lee, y el número total dice lo mismo.', l: 301 },
      'SemestresQueNoCaben': { f: 'private static ImmutableArray<Diagnostico> SemestresQueNoCaben(Instantanea instantanea, ImmutableDictionary<Guid, Jornada> jornadas)', s: 'Las cohortes que piden más slots semanales de los que su jornada tiene. Es un diagnóstico y no una excepción: el plan se genera igual, con esas sesiones pendientes, porque el arreglo es del pensum o de la jornada y no del horario.', l: 434 },
      'SesionesQueSobran': { f: 'private static int SesionesQueSobran(ImmutableArray<int> duraciones, int faltan)', s: 'Límite inferior determinista de cuántas sesiones quedarán fuera: las más largas primero, hasta cubrir el déficit. Así el mensaje no confunde slots con sesiones ni promete qué sesiones concretas se caerán, que eso lo decide el colocador.', l: 490 },
      'SlotsDeLaJornada': { f: 'private static int SlotsDeLaJornada(Jornada jornada)', s: 'Cuántos slots lectivos tiene una jornada en toda la semana: sus bloques por día en cada día activo, menos los que caen dentro de un descanso, que ninguna sesión puede usar.', l: 479 },
    },
  },
  'Horarios.Motor.Construccion.Rechazo': {
    s: 'Una hora descartada: cuál se probó, qué entidad la tenía tomada y qué clase la tenía.\n\nSe guarda el hecho, no la frase. Redactar en el momento costaría una cadena por cada hora descartada —miles en un plan real— y casi todas se tirarían; redactar al final, en cambio, no puede equivocarse de causa, porque `Ocupante` es la clase que estaba ahí cuando se intentó , y no la que quede ahí después de revertir media asignación.',
    m: {
      'Entidad': { s: 'La cohorte, el docente o el aula de la que habla la regla.' },
      'Intentada': { s: 'La colocación que se probó y se descartó.' },
      'Ocupante': { s: 'La clase que tenía tomada esa hora, si la hay.' },
    },
  },
  'Horarios.Motor.Construccion.RechazosDeUnaSesion': {
    s: 'Por qué se descartó cada hora de una sesión con un docente: cuántas por cada regla y, de cada regla, los primeros ejemplos concretos.\n\nEl número solo dice que algo no cupo; el ejemplo dice qué hay que mover. Se guardan dos por regla: uno puede ser la excepción, tres ya son una lista que nadie lee, y la cuenta dice cuántos más hay.',
  },
  'Horarios.Motor.Descripciones': {
    s: 'Cómo se nombra, en un mensaje dirigido a una persona, lo que el motor conoce por identificador.\n\nVive fuera del precálculo, del colocador y del verificador porque los tres redactan sobre las mismas entidades y la misma asignación tiene que llamarse igual en los tres sitios: un diagnóstico que dice «Estadística II de Industrial 8.º» y una pendiente que dice «e4340328-…» obligan a la persona a cruzarlos a mano.\n\nSi el catálogo no trae un nombre, cae al identificador: se pierde comodidad, nunca el dato.\n\nNinguna de estas funciones lanza. Redactan el motivo de un fallo, así que fallar al redactarlo se llevaría por delante el resultado entero: donde la rejilla no sabe responder —una jornada que no es suya, un slot fuera de rango—, el texto cae al índice de slot y sigue.',
    m: {
      'Asignacion': { f: 'public static string Asignacion(SesionRequerida sesion, CatalogoNombres nombres)', s: 'La asignación, con el matiz que más cuesta cuando se pierde: un área común no es «un curso de una cohorte», es un curso que varias cohortes cursan juntas y con distinto nombre visible. Decirlo mal manda a buscar el problema al pensum equivocado.', l: 28 },
      'Clase': { f: 'public static string Clase(SesionRequerida sesion, SesionColocada puesta, RejillaTiempo rejilla, CatalogoNombres nombres)', s: 'Una clase ya colocada, dicha entera: qué es, cuándo, dónde y con quién.\n\nEs lo que convierte «el docente ya estaba ocupado» en algo que se puede arreglar. Sin el curso, la cohorte y la hora, quien lee el motivo tiene que abrir el horario y buscar a mano cuál de todas las clases es la que estorba.', p: [['sesion', 'El requisito de la clase que ocupa la hora.'], ['puesta', 'Dónde quedó: día, slot, docente y aula.'], ['rejilla', 'La rejilla del plan, para decir la hora de reloj.'], ['nombres', 'El catálogo de nombres.']], l: 150 },
      'Cohorte': { f: 'public static string Cohorte(ParticipacionCohorte participacion, CatalogoNombres nombres)', s: 'Una cohorte de forma que siempre se sepa su carrera y su semestre, que es lo que hace falta para ir a buscarla.\n\nEl nombre del catálogo ya trae las tres cosas —«Ingeniería Civil 3.º sección A»— porque es el mismo texto que enseña la interfaz, y entonces no se añade nada: repetir «(semestre 3 de Ingeniería Civil)» al lado alarga cada mensaje sin decir nada nuevo.\n\nSolo cuando el catálogo no tiene la fila —y el nombre cae al identificador— se dicen aparte el semestre y el pensum, que el motor sí lleva en el modelo. El pensum se llama «Carrera · pensum AÑO», así que es de donde sale la carrera cuando la cohorte no la trae.', l: 71 },
      'Cohortes': { f: 'public static string Cohortes(SesionRequerida sesion, CatalogoNombres nombres)', s: 'Las cohortes de una sesión, en el orden en que la sesión las trae (por Id). Se nombran hasta tres: un área común de cuatro carreras produce una línea que nadie termina de leer, y el total ya dice cuántas faltan.', l: 44 },
      'Contar': { f: 'public static string Contar(int cuantos, string singular, string plural)', s: 'Un número con su sustantivo en singular o en plural. «1 aulas» y «1 de sus 1 sesiones» se leen como un error del programa, y un mensaje que parece roto no se cree.', l: 191 },
      'Dia': { f: 'public static string Dia(DiaSemana dia)', s: 'El día en minúscula y con su tilde, como se lee dentro de una frase.', l: 195 },
      'Hora': { f: 'private static string Hora(int minutos)', s: 'Los minutos desde medianoche en reloj de 24 horas. Sin envolver a medianoche: una jornada que terminara a las 24:30 se lee «24:30», que es raro pero cierto, mientras que «00:30» mandaría a la madrugada del día siguiente.', l: 212 },
      'Horas': { f: 'public static string Horas(RejillaTiempo rejilla, Guid jornadaId, Colocacion colocacion, int duracionSlots)', s: 'Solo las horas de una colocación, «14:00–15:00», para un selector que ya dice el día. Cae al slot si la rejilla no sabe responder, igual que `Momento`.', l: 120 },
      'Momento': { f: 'public static string Momento(RejillaTiempo rejilla, Guid jornadaId, Colocacion colocacion, int duracionSlots)', s: 'El día y la hora de reloj de una colocación: «el lunes de 08:00 a 08:45».\n\nEl motor razona en slots (R-1) y los minutos viven solo en `RejillaTiempo`, pero «el lunes en el slot 2» no le dice la hora a nadie, y una persona que tiene que mover una clase necesita la hora. Es la única salida del motor que habla de minutos, y no decide nada: solo se lee.', p: [['rejilla', 'La rejilla del plan; es quien sabe dónde cae el receso.'], ['jornadaId', 'La jornada de la sesión, que es la que fija el reloj.'], ['colocacion', 'Día y slot inicial.'], ['duracionSlots', 'Cuántos slots ocupa, para saber a qué hora termina.']], l: 94 },
      'OtraHora': { f: 'public static string OtraHora(SesionRequerida sesion, SesionColocada puesta, RejillaTiempo rejilla, string yaDicho)', s: 'La hora de una clase colocada, salvo que sea la misma que ya dice el mensaje: dos clases que chocan suelen estar exactamente a la misma hora, y repetirla convierte cada ejemplo en el doble de texto para no añadir nada.\n\nCuando no coincide —dos jornadas que se pisan sin empezar a la vez— sí se dice, y es justo el caso en que hace más falta: sin ella el choque parece un error.', p: [['yaDicho', 'La hora que el mensaje acaba de nombrar.']], l: 174 },
    },
  },
  'Horarios.Motor.Expansion.ExpansorAsignaciones': {
    s: 'Convierte los requisitos que entrega el cargador en las sesiones que hay que colocar.\n\nAgrupa los requisitos por clave de asignación —el paquete que un docente toma entero—, reparte los bloques semanales de cada grupo en sesiones enteras y funde en una sola sesión a las cohortes que comparten un área común, cada una con su propio curso visible.\n\nNo elige nunca. Si dos requisitos de una misma agrupación discrepan en jornada, duración, cantidad de sesiones o tipo de laboratorio, el dato está mal cargado: quedarse con el primero —lo que hacía el motor v1— produce un horario que la base rechaza al guardarlo, así que se lanza nombrando a la agrupación culpable.',
    m: {
      'CantidadDeSesiones': { f: 'private static int CantidadDeSesiones(RequisitoCargado requisito)', s: 'Cuántas clases semanales pide un requisito. `bloques_semanales_exactos` son slots por semana, no sesiones: el motor v1 los trataba como sesiones y pedía B × D slots donde la base exige B.', l: 158 },
      'ClaveDe': { f: 'private static ClaveAsignacion ClaveDe(RequisitoCargado requisito)', s: 'Clave de asignación de un requisito. El área común manda sobre el curso: sus cohortes comparten una sola asignación.', l: 56 },
      'Culpable': { f: 'private static string Culpable(ClaveAsignacion clave, Guid? agrupacion)', s: 'Nombra a la culpable: la agrupación si la hay, y si no la asignación.', l: 172 },
      'Discrepan': { f: 'private static InvalidOperationException Discrepan(ClaveAsignacion clave, Guid? agrupacion, string campo, RequisitoCargado uno, object valorUno, RequisitoCargado otro, object valorOtro)', s: 'Arma la excepción de una discrepancia nombrando siempre a la culpable, el campo y las dos cohortes que no se ponen de acuerdo. Sin los dos valores, el mensaje no sirve para arreglar el dato.', l: 182 },
      'Expandir': { f: 'public ImmutableArray<SesionRequerida> Expandir(Guid planId, IEnumerable<RequisitoCargado> requisitos)', s: 'Expande los requisitos de un plan a sus sesiones, ordenadas por `(Asignacion, Ordinal)` como exige la instantánea.', p: [['planId', 'Plan al que pertenecen; entra en el identificador de cada sesión.'], ['requisitos', 'Filas de CargaDeRequisitos, una por par cohorte–curso del pensum.']], e: [['ArgumentNullException', 'Si `requisitos` es nulo.'], ['InvalidOperationException', 'Si los bloques semanales de un curso no son múltiplo de su duración; o si los requisitos de una misma asignación discrepan en algo que la sesión solo puede tener una vez: jornada, duración, cantidad de sesiones, curso de la sesión o tipo de laboratorio.']], l: 32 },
      'ExpandirGrupo': { f: 'private static void ExpandirGrupo(Guid planId, ClaveAsignacion clave, ImmutableArray<RequisitoCargado> miembros, ImmutableArray<SesionRequerida>.Builder sesiones)', s: 'Expande una asignación completa: comprueba que sus requisitos digan todos lo mismo sobre lo que la sesión solo puede tener una vez, y emite sus N sesiones semanales.', l: 65 },
    },
  },
  'Horarios.Motor.Expansion.ReconciliadorFijadas': {
    m: {
      'PrimeraDiferencia': { f: 'private static string? PrimeraDiferencia(SesionRequerida requerida, SesionFijada fijada)', s: 'Primer campo en el que una fijada deja de describir a la sesión que dice reemplazar, o nulo si describen la misma clase. Se compara todo lo que la base vuelve a exigir al guardar; la colocación, el docente y el aula son justo lo que la fijada aporta.', l: 140 },
    },
  },
  'Horarios.Motor.MotorHorarios': {
    s: 'La entrada del motor v2. No decide nada por sí misma: arma la rejilla del plan, precalcula lo que ya se sabe imposible y le entrega las dos cosas al colocador voraz.\n\nLas tres piezas comparten una sola `RejillaTiempo` a propósito: dos rejillas distintas numerarían las franjas distinto y los veredictos de solape dejarían de compararse entre el precálculo y la colocación.\n\nLa instantánea llega ya expandida y reconciliada: el cargador la construye y el motor no vuelve a tocar la base.\n\nLas vueltas de segunda oportunidad. El colocador es voraz y no vuelve atrás (R-6): atiende las asignaciones en un orden fijo y la última hereda lo que dejaron las demás. Cuando una cohorte pide tantos slots como tiene la semana, esa herencia puede no servirle a nadie y la asignación queda pendiente aunque exista un horario completo. Lo que hace este bucle es lo más barato que se puede hacer al respecto: volver a colocar desde cero poniendo delante lo que no cupo , y quedarse con la vuelta que colocó más.\n\nNo es retroceso ni reparación: ninguna sesión ya colocada se mueve nunca . Cada vuelta es el mismo colocador voraz sobre el mismo horario vacío, así que sigue garantizando el nivel 1 de la regla de oro por construcción, y sigue siendo determinista (R-5): el orden es total en cada vuelta y el criterio de parada no depende de nada externo.',
    m: {
      'AdelantarPendientes': { f: 'private static bool AdelantarPendientes(HashSet<ClaveAsignacion> segundaOportunidad, Resultado resultado)', s: 'Suma al conjunto las asignaciones que quedaron pendientes. Devuelve si alguna era nueva, que es lo que distingue una vuelta con información nueva de una repetición exacta.', l: 108 },
      'Ejecutar': { f: 'public Resultado Ejecutar(Instantanea instantanea, CancellationToken cancellationToken = default)', s: 'Genera el horario del plan que describe la instantánea.', p: [['instantanea', 'La foto inmutable del plan.'], ['cancellationToken', 'Se comprueba entre asignaciones (§9.5) y entre vueltas. Cancelar no lanza : devuelve lo colocado, el resto pendiente y `FueCancelado = true`.']], e: [['ArgumentNullException', 'Si `instantanea` es nulo.'], ['InvalidOperationException', 'Si dos sesiones fijadas se contradicen.']], l: 47 },
    },
  },
  'Horarios.Motor.Ocupacion.RegistroCarga': {
    s: 'Cuenta cuántas asignaciones distintas lleva cada docente. El colocador compara esa cuenta con `carga_maxima_cursos`, que es el único lugar donde se decide.\n\nLa unidad de carga es la `ClaveAsignacion`: un área común pesa uno aunque la cursen cinco cohortes y aunque se reparta en cuatro sesiones semanales, y un curso normal pesa uno por cohorte. Contar sesiones —lo que hacía el motor v1— dejaba a un docente fuera de un curso que la base sí le permitía dar.\n\nEl conjunto por docente es inmutable a propósito: anotar dos veces la misma clave no puede cambiar la cuenta.',
    m: {
      'Anotada': { f: 'public bool Anotada(Guid docenteId, ClaveAsignacion asignacion)', s: 'Si esa asignación ya está anotada para ese docente. Tomarla otra vez no le sube la carga, así que el colocador solo comprueba el máximo cuando la respuesta es `false` (§9.2).', l: 37 },
      'Anotar': { f: 'public void Anotar(Guid docenteId, ClaveAsignacion asignacion)', s: 'Anota la asignación en la carga del docente, una sola vez. Se llama cuando la asignación entera quedó colocada, no por sesión.', l: 52 },
      'Claves': { f: 'public ImmutableHashSet<ClaveAsignacion> Claves(Guid docenteId)', s: 'Qué asignaciones lleva ya el docente. Se lee solo para redactar: cuando CargaDocenteMaxima deja una asignación fuera, el motivo tiene que poder decir con qué está llena esa carga, o quien lo lee no sabe qué mover.', l: 45 },
      'Cuenta': { f: '// Cuenta asignaciones distintas, no sesiones individuales. public int Cuenta(Guid docenteId)', s: 'Cuántas asignaciones distintas lleva el docente. Es el número que el colocador compara con `Docente.CargaMaximaCursos`, y también el que reparte la carga en su orden de preferencia (§9.3).', l: 29 },
    },
  },
  'Horarios.Motor.Ocupacion.RegistroContinuidad': {
    s: 'Guarda el docente elegido para cada asignación. Esto evita que una cohorte reciba el mismo curso con docentes distintos y que un área común se reparta entre varios docentes. Ambas condiciones se cumplen porque el colocador elige un docente por asignación y ya no lo cambia.\n\nLa `ClaveAsignacion` identifica el paquete que conserva un mismo docente: `AREA:{agrupacion}` para un área común y `CURSO:{visible}:COHORTE:{cohorte}` para un curso de una cohorte. Por eso basta un diccionario y no hacen falta dos registros.\n\nTambién es por donde entran las sesiones fijadas: su docente se elige antes de colocar nada, y desde ese momento es el único candidato de su asignación.',
    m: {
      'DocenteDe': { f: 'public Guid? DocenteDe(ClaveAsignacion asignacion)', s: 'El docente ya elegido para esa asignación, o nulo si todavía no tiene. Nulo significa que el colocador puede probar con todos sus candidatos; un valor significa que ese es el único.', l: 27 },
      'Elegir': { f: 'public void Elegir(ClaveAsignacion asignacion, Guid docenteId)', s: 'Deja elegido al docente de la asignación. Volver a elegir al mismo no hace nada.', e: [['InvalidOperationException', 'Si la asignación ya tenía otro docente. Sería justo el horario que la base rechaza al publicarlo, así que se corta al producirlo y no al guardarlo: no es un dato malo, es un defecto del motor.']], l: 38 },
    },
  },
  'Horarios.Motor.Ocupacion.RegistroOcupacion': {
    s: 'Qué tiene tomado del reloj una entidad —un docente, un aula o una cohorte— en cada día de la semana. Compara franjas canónicas, no índices de slot locales ni rangos de minutos crudos, para que también funcione entre jornadas con rejillas diferentes.\n\nSe instancia tres veces : para docentes, aulas y cohortes. Se usa la misma clase con tres estados, y no un diccionario de diccionarios. Lo único que cambia entre las tres es qué identificador recibe, y eso lo decide quien la usa.\n\nLa clave es `(entidad, día, franja)`. La franja la da `RejillaTiempo` y no sale de aquí: no se guarda, no se muestra y no aparece en ningún contrato. Es lo que hace exacto el veredicto cuando dos jornadas se pisan —el motor v1 comparaba índices de slot y daba por libre a un docente que a esa hora estaba dando clase en la otra jornada—.\n\nJunto a cada franja se anota quién la tomó . Eso no cambia ningún veredicto — `Libre` sigue respondiendo lo mismo, mire o no el ocupante— y existe solo para que un rechazo se pueda contar entero: «el docente ya estaba ocupado» no se puede arreglar, «ya estaba dando Cálculo I a Civil 3.º sección A el lunes de 08:00 a 08:45» sí. Se anota al ocupar, que es el único instante en que el dato es cierto sin recorrer nada: reconstruirlo después, con la ocupación ya cambiada, es exactamente lo que hacía mentir al motor v1.\n\nEl registro no sabe de reglas: no mira autorizaciones, capacidad ni carga. Solo responde si esas franjas están tomadas y, cuando se lo preguntan, por quién.',
    m: {
      'Liberar': { f: 'public void Liberar(Guid entidadId, Guid jornadaId, Colocacion colocacion, int duracionSlots)', s: 'Devuelve las franjas de la colocación. Es el inverso exacto de `Ocupar`, y es lo que permite al colocador revertir una asignación entera cuando alguna de sus sesiones no cabe.', l: 134 },
      'Libre': { f: 'public bool Libre(Guid entidadId, Guid jornadaId, Colocacion colocacion, int duracionSlots)', s: 'Si la entidad tiene libres todas las franjas que ocuparía esa colocación. Una sesión que cruza el receso también se lo come, porque la rejilla ya lo incluyó en su geometría.\n\nEste es el veredicto, y no mira el ocupante: una franja tomada sin decir por quién sigue estando tomada.', e: [['ArgumentException', 'Si la jornada no pertenece a la rejilla.'], ['ArgumentOutOfRangeException', 'Si la colocación no cabe en la jornada. El colocador solo usa las que da `RejillaTiempo.ColocacionesDe`, así que llegar aquí con otra es un defecto del motor.']], l: 59 },
      'Ocupante': { f: 'public SesionColocada? Ocupante(Guid entidadId, Guid jornadaId, Colocacion colocacion, int duracionSlots)', s: 'Qué sesión tiene tomada la primera franja ocupada de esa colocación: la que hay que nombrar en el mensaje, porque es contra la que choca.\n\nSe pregunta solo para redactar, nunca para decidir: quien decide es `Libre`. Devuelve nulo tanto cuando no hay solape como cuando quien ocupó no dijo qué sesión era —los dos casos significan lo mismo para un mensaje: no hay nada que nombrar—, así que un nulo de aquí no autoriza a ocupar .', e: [['ArgumentException', 'Si la jornada no pertenece a la rejilla.'], ['ArgumentOutOfRangeException', 'Si la colocación no cabe en la jornada.']], l: 81 },
      'Ocupar': { f: 'public void Ocupar(Guid entidadId, Guid jornadaId, Colocacion colocacion, int duracionSlots, SesionColocada? ocupante = null)', s: 'Toma para la entidad todas las franjas de la colocación.', p: [['entidadId', 'El docente, el aula o la cohorte que toma la hora.'], ['jornadaId', 'La jornada de la sesión, que es la que fija el reloj.'], ['colocacion', 'Día y slot inicial.'], ['duracionSlots', 'Cuántos slots ocupa.'], ['ocupante', 'Qué sesión la toma, para poder nombrarla después en un rechazo. Omitirlo deja la franja tomada igual, solo que muda: es lo que hacen las pruebas del registro, que no tienen sesiones.']], e: [['InvalidOperationException', 'Si alguna ya estaba tomada. No es un problema de datos sino un defecto del motor —hay que preguntar por `Libre` antes—, y se corta aquí para que `Liberar` siga siendo su inverso exacto.']], l: 109 },
    },
  },
  'Horarios.Motor.Reglas.ReglasAula': {
    s: 'Decide si un aula sirve para una sesión según su uso, tipo de laboratorio, recursos y capacidad. Las condiciones se comprueban contra el curso visible de cada cohorte y no contra el curso de la sesión: en área común son cursos distintos.\n\nAquí se comprueban contra la sesión y no contra cada participación porque el expansor ya hizo esa unión —`RequiereLaboratorio` es el OR de los cursos visibles, `TipoLaboratorioRequerido` el único valor que declaran y `Recursos` el máximo por recurso—, así que el aula que pasa estas cuatro pasa también las de cada curso visible por separado. La suma de matrículas es de la sesión entera, que es justo lo que compara el SQL.\n\nTodas son puras: solo miran el aula y la sesión. No leen la ocupación ni estado acumulado, y por eso el colocador y el verificador pueden compartirlas sin arriesgar dos respuestas distintas para el mismo par.',
    m: {
      'AulaAdmiteLaboratorio': { f: 'public static bool AulaAdmiteLaboratorio(Aula aula, SesionRequerida sesion)', s: 'Si algún curso visible de la sesión exige laboratorio, el aula tiene que ser de laboratorio o mixta. Fuera de este caso, el tipo de aula no limita la asignación.', l: 27 },
      'AulaTieneCapacidad': { f: 'public static bool AulaTieneCapacidad(Aula aula, SesionRequerida sesion)', s: 'La capacidad del aula tiene que cubrir la matrícula de todas las cohortes de la sesión sumadas: en área común comparten aula, así que la que cabe sola puede no caber acompañada.', l: 66 },
      'AulaTieneRecursos': { f: 'public static bool AulaTieneRecursos(Aula aula, SesionRequerida sesion)', s: 'Por cada recurso requerido, el aula tiene que declararlo con cantidad suficiente. El motor v1 comparaba solo el código del recurso y daba por buena un aula con un proyector donde el curso pedía tres.', l: 52 },
      'AulaTieneTipoDeLaboratorio': { f: 'public static bool AulaTieneTipoDeLaboratorio(Aula aula, SesionRequerida sesion)', s: 'El tipo de laboratorio pedido tiene que ser idéntico al que el aula ofrece. El SQL usa `is distinct from`: un aula sin tipo declarado no sirve para un curso que sí lo exige.', l: 39 },
    },
  },
  'Horarios.Motor.Reglas.ReglasCohorte': {
    s: 'Comprueba que una sesión y sus cohortes pertenezcan a la misma jornada, que cada cohorte de un área común resuelva un solo curso equivalente y que, fuera de un área común, el curso visible sea el de la sesión.\n\nEl cargador comprueba la parte que necesita el pensum —que una cohorte tenga ese curso en su semestre solo se sabe leyendo `cursos_en_pensum`, y la instantánea no lo trae—. Aquí queda la mitad que se responde con la sesión ya armada, que es la que el verificador puede volver a comprobar sobre un resultado sin confiar en quién lo produjo.\n\nTodas son puras y todas miran la sesión entera, no una participación suelta: las tres hablan de la relación entre las cohortes de una misma sesión.',
    m: {
      'CohortesEnLaJornadaDeLaSesion': { f: 'public static bool CohortesEnLaJornadaDeLaSesion(SesionRequerida sesion)', s: 'Toda cohorte de la sesión cursa la jornada de la sesión. Es la regla que sostiene todo el razonamiento en slots del motor: como una cohorte solo tiene sesiones de su propia jornada, para ella el índice de slot ya identifica la hora.', l: 26 },
      'CursoVisibleEsElDeLaSesion': { f: 'public static bool CursoVisibleEsElDeLaSesion(SesionRequerida sesion)', s: 'Sin área común, el curso visible de la cohorte es el curso de la sesión: el SQL busca en el pensum la fila de `v_curso_id` y de ahí sale el visible, así que no pueden diferir. Con área común sí difieren, y esa es toda la razón de que la participación lleve su propio curso visible.', l: 60 },
      'CursoVisibleUnicoPorCohorte': { f: 'public static bool CursoVisibleUnicoPorCohorte(SesionRequerida sesion)', s: 'En área común, cada cohorte tiene un solo curso equivalente de la agrupación en su semestre. El SQL resuelve ese curso a partir de `(pensum, semestre, agrupación)` y falla si encuentra más de uno, así que dos cohortes que comparten pensum y semestre tienen que haber resuelto al mismo curso visible y al mismo `curso_en_pensum`: si difieren, alguna resolvió con más de un candidato.\n\nFuera del área común la regla no aplica y la sesión la cumple sin más.', l: 41 },
    },
  },
  'Horarios.Motor.Reglas.ReglasDocente': {
    s: 'Decide si un docente puede dar una sesión según su autorización y disponibilidad confirmada.\n\nLa continuidad y la carga no se comprueban aquí. El colocador elige un docente por asignación y ya no lo cambia, así que esas condiciones viven en los registros con estado de `Ocupacion/`. Estas dos, en cambio, se responden mirando solo al docente y a la sesión, y por eso el colocador y el verificador las comparten.\n\nAmbas comprobaciones son puras. El motor nunca coloca a un docente fuera de su disponibilidad confirmada.',
    m: {
      'DocenteAutorizado': { f: 'public static bool DocenteAutorizado(Docente docente, SesionRequerida sesion, Instantanea instantanea)', s: 'El docente tiene que estar autorizado para el curso visible de cada participación —o para cualquier equivalente suyo del mismo `curso_comun`— y con la jornada de la autorización, donde el nulo funciona como comodín.\n\nUn curso ausente de `Equivalencias` equivale solo a sí mismo, que es lo que devuelve `cursos_equivalentes` para un curso sin grupo.\n\nEl motor v1 comparaba el curso de la sesión sin mirar equivalencias ni jornada, así que descartaba docentes autorizados por su curso equivalente y aceptaba docentes autorizados solo para otra jornada.', l: 31 },
      'DocenteDisponible': { f: 'public static bool DocenteDisponible(Docente docente, SesionRequerida sesion, Colocacion colocacion)', s: 'La disponibilidad confirmada del docente tiene que cubrir todos los slots que la sesión ocupa, uno por uno, en la jornada y el día de la colocación. El SQL expande la sesión con `generate_series` y exige una fila por cada slot; cubrir el primero no basta.', l: 52 },
      'Equivalentes': { f: 'private static ImmutableHashSet<Guid> Equivalentes(Instantanea instantanea, Guid cursoVisibleId)', s: 'Los cursos que valen por uno dado; el propio curso siempre está entre ellos.', l: 66 },
    },
  },
  'Horarios.Motor.Reparacion.AlcanceDeReparacion': {
    s: 'Qué clases se dejan mover en cada intento de reparación. Se empieza por lo mínimo y se amplía solo si el motor no encuentra un horario completo:\n\nLas que chocan con lo fijado (mismo docente, aula o cohorte a la vez, o el docente que se pasa de carga). Las relacionadas : además, las que comparten una cohorte o un docente con las anteriores o con las casillas fijadas. Es donde suele estar el hueco que hace falta. Todas las editables del plan, salvo las fijadas.\n\nCada nivel se cierra por asignación: si se mueve una sesión de un curso, se mueven todas las de ese curso y esa cohorte (o toda el área común), porque el motor coloca las asignaciones enteras y con un solo docente. Las que no entran en el nivel quedan fijadas solo para ese intento ; esas marcas no se guardan nunca.',
    m: {
      'CerrarPorAsignacion': { f: 'private static ImmutableHashSet<Guid> CerrarPorAsignacion(ImmutableArray<SesionRequerida> sesiones, IEnumerable<Guid> ids, ImmutableHashSet<Guid> permanentes)', s: 'Todas las sesiones de las asignaciones que tocan los identificadores dados, sin las permanentes: una asignación se mueve entera o no se mueve.', l: 73 },
      'NivelMaximo': { f: 'public const int NivelMaximo = 3', s: 'Número del último nivel, el que abre todo lo editable.', l: 26 },
    },
  },
  'Horarios.Motor.Reparacion.ConflictosDeEdicion': {
    s: 'Mira el horario con la edición puesta y responde dos preguntas, las dos con el `IVerificadorHorario` del motor —el mismo que revisa cada generación—, para no tener una segunda copia de las reglas:\n\n¿La decisión, junto con lo que ya estaba fijado, incumple una regla por sí sola ? Si es así, mover otras clases no lo arregla y hay que cambiar la decisión. ¿Qué clases movibles chocan con ella? Esas son las que la reparación empieza moviendo.\n\nLas dos preguntas se contestan con identificadores de sesión, nunca leyendo el texto de un mensaje: el texto es solo para la persona.',
    m: {
      'ClasesQueChocan': { f: 'public ImmutableDictionary<Guid, string> ClasesQueChocan(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> candidato, ImmutableHashSet<Guid> permanentes)', s: 'Las sesiones movibles que chocan con el horario editado, cada una con el motivo en palabras. Vacío si la edición cabe sin mover nada.', l: 48 },
      'Explicar': { f: 'private static string Explicar(Violacion violacion, HorarioVigente vigente, ImmutableDictionary<Guid, SesionRequerida> sesiones, ImmutableHashSet<Guid> decisiones)', s: 'El mensaje del verificador, con lo que la persona necesita saber para decidir: si la otra clase no se puede mover, y sin nombrar clases que no le corresponde ver.', l: 75 },
      'MotivoDelChoque': { f: 'private static string MotivoDelChoque(Violacion violacion, Guid fija, HorarioVigente vigente, ImmutableDictionary<Guid, SesionRequerida> sesiones, IReadOnlyDictionary<Guid, SesionColocada> candidato, RejillaTiempo rejilla)', s: 'Por qué hay que mover una clase, nombrando la casilla fijada con la que choca.', l: 104 },
      'ProblemasDeLaDecision': { f: 'public ImmutableArray<string> ProblemasDeLaDecision(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> candidato, ImmutableHashSet<Guid> permanentes, ImmutableHashSet<Guid> decisiones)', s: 'Los problemas de las sesiones que no se pueden mover: las decisiones de la persona, las fijadas de antes y las que están fuera de su alcance. Vacío si la decisión es válida.', l: 27 },
    },
  },
  'Horarios.Motor.Reparacion.DecisionesDeEdicion': {
    s: 'La regla de qué queda fijado cuando alguien edita una clase. Está escrita una sola vez y la usan tanto la vista previa del modal («Estas casillas quedarán fijas») como la búsqueda, así que lo que se enseña y lo que se busca no pueden separarse.\n\nCambiar día, hora o aula fija solo la clase abierta , con sus valores nuevos. Cambiar el docente fija toda la asignación —el curso de esa cohorte, o el área común entera— con el docente nuevo y cada sesión en su casilla actual. Un curso lo da una sola persona, así que cambiar el docente de una sesión suelta no es una opción. Si cambian las dos cosas, el docente cambia en toda la asignación y la clase abierta toma además su nueva colocación.',
    m: {
      'Calcular': { f: 'public static ImmutableArray<SesionColocada> Calcular(HorarioVigente vigente, EdicionDeSesion edicion)', s: 'Las sesiones que quedan fijadas, en el orden de la instantánea.', e: [['KeyNotFoundException', 'La clase no está en el horario guardado.']], l: 24 },
    },
  },
  'Horarios.Motor.Reparacion.DiferenciasDeHorario': {
    s: 'El antes y el después de una propuesta, sesión por sesión y por su identificador guardado.\n\nSepara lo que decidió la persona de lo que movió el motor, y solo enumera lo que de verdad cambia: una clase que la búsqueda dejó mover pero terminó en su mismo sitio no aparece. Así la tabla del modal no inventa movimientos para justificar la búsqueda.',
    m: {
      'Calcular': { f: 'public static ImmutableArray<CambioDeSesion> Calcular(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> propuesto, ImmutableHashSet<Guid> decisiones, IReadOnlyDictionary<Guid, string> choques)', s: 'Las clases que cambian entre el horario guardado y el propuesto.', p: [['propuesto', 'El horario completo encontrado.'], ['decisiones', 'Las sesiones que fija la persona.'], ['choques', 'Por qué chocaba cada clase movible con las casillas fijadas.']], r: 'Primero las fijadas por la persona y después los ajustes automáticos, cada grupo en el orden de la instantánea.', l: 21 },
    },
  },
  'Horarios.Motor.Reparacion.FijacionTemporal': {
    s: 'Arma la instantánea de un intento de reparación: la del horario vigente, con todo fijado salvo las sesiones que ese intento deja mover.\n\nEs la forma de acotar la búsqueda sin tocar el motor: `MotorHorarios` ya sabe respetar sesiones fijadas —las ocupa antes que nada y no las mueve—, así que para «reparar solo estas clases» basta con fijar todas las demás. Estas fijaciones son temporales : viven en esta instantánea, que se descarta al terminar el intento, y nunca llegan a la base.',
    m: {
      'Instantanea': { f: 'public static Instantanea Instantanea(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> candidato, ImmutableHashSet<Guid> movibles)', s: 'La instantánea del intento: todo fijado en el candidato salvo las movibles.', p: [['candidato', 'Dónde queda cada sesión fijada: las decisiones de la persona y, el resto, donde ya estaban.'], ['movibles', 'Las sesiones que el motor puede volver a colocar.']], l: 21 },
    },
  },
  'Horarios.Motor.Reparacion.Intento': {
    s: 'Cómo terminó un intento: con horario, sin él y por qué, o interrumpido.',
  },
  'Horarios.Motor.Reparacion.OpcionesDeSesion': {
    s: 'Lo que el modal ofrece para una clase y cómo se nombra. Usa las mismas reglas que el motor —`ReglasAula`, `ReglasDocente` y la `RejillaTiempo`— para que la pantalla no tenga una copia propia que se desincronice.\n\nOfrecer no es garantizar: un docente autorizado puede no estar disponible a esa hora, y eso lo dice la búsqueda con el motivo concreto.',
    m: {
      'AulasOcupadas': { f: 'public static ImmutableDictionary<Guid, AulaOcupada> AulasOcupadas(HorarioVigente vigente, Guid sesionId, Colocacion colocacion)', s: 'Qué aulas tiene ya otra clase si la sesión empieza en `colocacion`. Compara franjas de la `RejillaTiempo`, igual que el motor, para que una clase de otra jornada que se pisa con esta también cuente. La propia sesión no ocupa nada: moverla deja libre su aula de ahora.\n\nSolo sirve para enseñar en el selector: no decide nada. Quien decide si el aula se puede usar es la búsqueda, que además intenta mover a la clase que la ocupa.', l: 67 },
      'Calcular': { f: 'public static OpcionesDeEdicion Calcular(HorarioVigente vigente, Guid sesionId)', s: 'Horas, aulas y docentes que se pueden elegir para la sesión.\n\nEl aula y el docente actuales se incluyen siempre, aunque ya no cumplan: quitar del selector lo que la clase tiene haría que el modal mostrara otro valor del que hay guardado.', l: 23 },
      'Clase': { f: 'private static string Clase(SesionRequerida sesion, CatalogoNombres nombres)', s: '«Lógica II (Ingeniería Civil 2.º sección A)», o el área común con cuántas cohortes.', l: 117 },
      'Describir': { f: 'public static DescripcionDeSesion Describir(HorarioVigente vigente, Guid sesionId, SesionColocada? colocada)', s: 'Una clase dicha en palabras. El curso de un área común es el nombre de la agrupación, porque cada cohorte la ve con un nombre distinto.', l: 126 },
    },
  },
  'Horarios.Motor.Reparacion.RepararHorario': {
    s: 'La edición manual con reconstrucción: fija lo que la persona decide y reacomoda lo demás.\n\nNo es un segundo motor. Es una coordinación pequeña alrededor de `MotorHorarios` y del `IVerificadorHorario`, que siguen siendo los únicos que conocen las reglas. El motor es voraz y no tiene reparación incremental; lo que se hace aquí es acotar su trabajo: fijar temporalmente todo lo que no hace falta mover y dejarle volver a colocar solo el resto (`FijacionTemporal`).\n\nLos pasos, en orden:\n\nCalcular qué queda fijado (`DecisionesDeEdicion`). Comprobar que esa decisión, con las fijaciones de antes, cumple las reglas por sí sola. Si no, no se busca: mover otras clases no la arreglaría. Si la decisión ya cabe sin tocar nada más, esa es la propuesta. Si no, probar tres alcances cada vez más grandes (`AlcanceDeReparacion`), dentro de un plazo que se puede cancelar. Verificar el horario encontrado entero y calcular el antes/después.\n\nLo que no promete: el mínimo de movimientos. Prefiere lo que ya había —el motor prueba primero el docente, el aula y la hora anteriores de cada clase— y empieza por el alcance más chico, pero no demuestra que no exista una propuesta con menos cambios. Tampoco demuestra que no exista solución cuando no la encuentra.\n\nNo guarda nada ni toca la base: recibe el horario vigente y devuelve una propuesta.',
    m: {
      'AulasOcupadas': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
      'Decisiones': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
      'Describir': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
      'Intentar': { f: 'private Intento Intentar(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> candidato, ImmutableHashSet<Guid> movibles, IReadOnlyDictionary<Guid, SesionColocada> intocables, ImmutableHashSet<Guid> objetivo, bool permitirRetirar, CancellationToken token)', s: 'Un intento con un alcance: el motor sobre la instantánea con todo lo demás fijado, y el resultado verificado entero antes de aceptarlo.', l: 219 },
      'Interrumpida': { f: 'private static ResultadoReparacion Interrumpida(CancellationToken porLaPersona, ImmutableArray<Guid> fijadas, int nivel, TimeSpan plazo)', s: 'Distingue que la persona detuvo la búsqueda de que se acabó el tiempo.', l: 290 },
      'Lista': { f: 'private static ResultadoReparacion Lista(HorarioVigente vigente, IReadOnlyDictionary<Guid, SesionColocada> horario, ImmutableArray<Guid> fijadas, ImmutableDictionary<Guid, string> choques, int nivel, ImmutableHashSet<Guid> objetivo, bool permitirRetirar)', s: 'La propuesta lista, con su antes/después.', l: 261 },
      'MismasSesiones': { f: 'private static bool MismasSesiones(HorarioVigente @base, HorarioVigente actual)', s: 'Si las dos instantáneas piden las mismas sesiones con la misma forma. Se compara campo a campo porque los arreglos inmutables de un record se comparan por referencia.', l: 306 },
      'Opciones': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
      'Permanentes': { f: 'private static ImmutableHashSet<Guid> Permanentes(HorarioVigente vigente, ImmutableArray<Guid> fijadas)', s: 'Lo que no se mueve nunca en esta búsqueda: las decisiones de la persona, lo que ya estaba fijado y las clases de cohortes fuera de su alcance.', l: 208 },
      'Reparar': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
      'Revalidar': { h: 'Horarios.Contratos.Motor.IReparadorHorario' },
    },
  },
  'Horarios.Motor.Tiempo.RejillaTiempo': {
    s: 'Rejilla canónica del reloj para las jornadas de una instantánea. Convierte la geometría de cada jornada —origen, tamaño de slot y receso— en franjas comunes para todas ellas. La base aplica la misma geometría al persistir `rango_minutos`; dentro del motor esta es su única implementación.',
    m: {
      'ColocacionesDe': { f: 'public ImmutableArray<Colocacion> ColocacionesDe(Guid jornadaId, int duracionSlots)', s: 'Colocaciones válidas ordenadas por día y slot para una jornada y duración.', l: 68 },
    },
  },
  'Horarios.Motor.Verificacion.VerificadorHorario': {
    s: 'Segunda opinión sobre un resultado. Reconstruye las reglas globales desde la salida y solo comparte con el colocador las reglas puras por fila de `Reglas/`.',
    m: {
      'Choque': { f: 'private static string Choque(SesionResultado a, SesionResultado b, RejillaTiempo rejilla, CatalogoNombres nombres)', s: 'Las dos sesiones que se pisan, dichas por lo que son —curso o área común, con sus cohortes— y por la hora de reloj en que quedaron: dos identificadores de sesión no le dicen a nadie qué clase hay que mover, y «slot 2» no dice a qué hora hay que ir a verla.\n\nLa hora importa doblemente aquí: dos sesiones de jornadas distintas se pisan en el reloj sin compartir índice de slot, y con el índice a la vista el choque parece un error del verificador en vez de lo que es.', l: 254 },
      'Cohorte': { f: 'private static string Cohorte(SesionResultado a, SesionResultado b, Guid cohorteId, CatalogoNombres nombres)', s: 'La cohorte que cursa las dos clases que chocan, con su carrera y su semestre. Se busca la participación en cualquiera de las dos sesiones: es la misma cohorte, y basta con que una de ellas la traiga para poder decir de qué semestre y de qué pensum es.', l: 268 },
      'Cuando': { f: 'private static string Cuando(RejillaTiempo rejilla, SesionResultado sesion)', s: 'Dónde quedó una sesión, en hora de reloj.', l: 259 },
      'VerificarHorarioDeReferencia': { f: 'private static void VerificarHorarioDeReferencia(ImmutableArray<SesionResultado> colocadas, ImmutableArray<OcupacionExterna> externas, RejillaTiempo rejilla, List<Violacion> violaciones, CatalogoNombres nombres)', s: 'Ninguna clase colocada puede pisar, con el mismo docente o la misma aula, una clase del horario de referencia. Es la regla de las jornadas extraordinarias vista desde el resultado.', l: 203 },
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
      'AEstado': { f: 'private static EstadoPensum AEstado(string estado)', s: 'Traduce el estado del pensum. `en_retiro` se trata aparte porque su nombre en la base lleva guion bajo y el análisis por nombre no lo reconocería.', l: 324 },
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
      'EliminarAsync': { f: 'private async Task<bool> EliminarAsync(string tabla, Guid id, CancellationToken cancellationToken)', s: 'Borrado lógico compartido. Exigir que no estuviera borrada hace que un segundo intento devuelva falso en lugar de volver a marcarla con otra fecha.', l: 344 },
      'EliminarCohorteAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EliminarCursoAsync': { f: 'public Task<bool> EliminarCursoAsync(Guid id, CancellationToken cancellationToken = default)', s: 'La baja también toca dos tablas y además saca al curso del grupo de equivalentes en que estuviera, así que va por función de la base.', l: 282 },
      'EliminarCursoComunAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EliminarPensumAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'EstablecerEstadoCursoAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'FiltrosActivos': { f: 'private static KeyValuePair<string, string?>[] FiltrosActivos(Guid id)', s: 'Los dos filtros que lleva toda escritura sobre una fila: que sea esa, y que no esté ya borrada.', l: 334 },
      'GuardarRejillaCohortesAsync': { f: 'public Task<ResultadoRejillaCohortes> GuardarRejillaCohortesAsync(GuardarRejillaCohortesSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Una llamada, una transacción. La rutina de base crea las cohortes que falten, hace el upsert de cada activación, apaga las desmarcadas y recalcula las áreas comunes; repartirlo en varias llamadas dejaría la rejilla a medias si una fallara.', l: 119 },
      'ListarAgrupacionesAsync': { f: 'public async Task<IReadOnlyList<AgrupacionAreaComun>> ListarAgrupacionesAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Va por función de la base porque cada agrupación arrastra dos listas —cursos y cohortes— y armarlas aquí serían varias consultas más.', l: 312 },
      'ListarCarreraJornadasAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarCohortesActivasAsync': { f: 'public async Task<IReadOnlyList<CohorteActivaPeriodo>> ListarCohortesActivasAsync(Guid periodoId, CancellationToken cancellationToken = default)', s: 'Lee la vista `api_cohortes_activas`, que ya trae el semestre y la matrícula del período en vez de los de la cohorte.', l: 299 },
      'ListarCohortesAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarCursosAsync': { h: 'Horarios.Aplicacion.Academia.IDatosGestionAcademica' },
      'ListarCursosComunesAsync': { f: 'public async Task<IReadOnlyList<CursoComun>> ListarCursosComunesAsync(CancellationToken cancellationToken = default)', s: 'Va por función de la base por lo mismo que las agrupaciones: cada grupo arrastra su lista de cursos y armarla aquí serían varias consultas más.', l: 174 },
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
      'ADominio': { f: 'public Pensum ADominio()', s: 'Convierte la fila en el pensum del dominio.', l: 354 },
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
      'ActualizarContrasenaAsync': { f: 'public async Task ActualizarContrasenaAsync(string tokenAcceso, string nuevaContrasena, CancellationToken cancellationToken = default)', s: 'Actualiza la contraseña autenticando la petición con la sesión temporal de recuperación incluida en el enlace enviado por correo.', l: 83 },
      'CerrarSesionAsync': { f: 'public async Task CerrarSesionAsync(string tokenAcceso, CancellationToken cancellationToken = default)', s: 'Invalida la sesión en Supabase y borra el token del contexto.\n\nUn 401 se acepta como éxito: significa que el token ya no valía, y eso es justo lo que se quería conseguir.', l: 113 },
      'IniciarSesionAsync': { f: 'public async Task<SesionSupabase> IniciarSesionAsync(string correo, string contrasena, CancellationToken cancellationToken = default)', s: 'Cambia correo y contraseña por una sesión.\n\nUn 400 y un 401 se traducen los dos a credenciales inválidas: Supabase distingue entre «no existe» y «contraseña incorrecta», y repetir esa distinción hacia fuera diría a un atacante qué correos están dados de alta.', e: [['UnauthorizedAccessException', 'El correo o la contraseña no valen.'], ['InvalidOperationException', 'Supabase respondió, pero sin sesión o sin los datos que hacen falta.']], l: 30 },
      'SolicitarRecuperacionContrasenaAsync': { f: 'public async Task SolicitarRecuperacionContrasenaAsync(string correo, Uri uriRetorno, CancellationToken cancellationToken = default)', s: 'Solicita a Supabase el correo de recuperación. Supabase mantiene deliberadamente una respuesta uniforme aunque el correo no exista, para no revelar cuentas registradas.', l: 65 },
    },
  },
  'Horarios.Infraestructura.Acceso.DatosAccesoPostgres': {
    s: 'Persistencia de usuarios, roles y permisos sobre Supabase.\n\nLas consultas simples van por la API de datos; lo que exige cruzar tablas de roles y permisos va por funciones de la base, que resuelven la jerarquía en una sola llamada.',
    m: {
      'ATipo': { f: 'private static TipoUsuario ATipo(string tipo)', s: 'Traduce el tipo que guarda la base al del dominio. `coordinador_academico` se trata aparte porque su nombre en la base lleva guion bajo y el análisis por nombre no lo reconocería.', l: 125 },
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
      'ADominio': { f: 'public Usuario ADominio()', s: 'Convierte la fila en el usuario del dominio.', l: 155 },
    },
  },
  'Horarios.Infraestructura.Acceso.UsuarioSupabase': {
    s: 'Del usuario que devuelve Supabase solo interesa su identificador.',
  },
  'Horarios.Infraestructura.Aulas.AulaFila': {
    s: 'La fila de `aulas`, con el tipo todavía como texto.',
    m: {
      'ADominio': { f: 'public Aula ADominio()', s: 'Convierte la fila en el aula del dominio.', l: 301 },
    },
  },
  'Horarios.Infraestructura.Aulas.DatosAulasPostgres': {
    s: 'Persistencia de aulas, jornadas y descansos sobre Supabase. Qué hace cada método está explicado en `IDatosAulas`.\n\nAulas y jornadas se dan de baja lógicamente porque los horarios generados las referencian; los descansos, en cambio, se borran de verdad.',
    m: {
      'AClaseDia': { f: 'private static DiaSemana AClaseDia(string valor)', s: 'Traduce el día desde el texto de la base, que lo guarda en minúsculas.', l: 282 },
      'AClaseTipo': { f: 'private static TipoAula AClaseTipo(string valor)', s: 'Traduce el tipo de aula desde el texto de la base. Un valor desconocido falla en vez de caer en un valor por omisión: sería un tipo nuevo en la base que este código todavía no sabe tratar, y adivinar llevaría a colocar clases donde no deben ir.', e: [['InvalidOperationException', 'La base trae un tipo que no se reconoce.']], l: 270 },
      'ActualizarAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ActualizarDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ActualizarJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'CrearJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'EliminarJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ExisteAulaEnPisoAsync': { f: 'public async Task<bool> ExisteAulaEnPisoAsync(int piso, int numeroAula, Guid? excluirAulaId = null, CancellationToken cancellationToken = default)', s: 'Busca otra aula en el mismo piso y número. El filtro de exclusión solo se añade al editar, para que el aula no choque consigo misma.', l: 95 },
      'ListarAulasActivasAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ListarDescansosAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ListarExtraordinariasDeAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ListarJornadasActivasAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerAulaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerDescansoAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
      'ObtenerJornadaAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosAulas' },
    },
  },
  'Horarios.Infraestructura.Aulas.DatosJornadasExtraordinariasPostgres': {
    s: 'Persistencia de la configuración de las jornadas extraordinarias. Se lee de las dos tablas y se guarda con una función, porque el horario y la lista de docentes cambian juntos.',
    m: {
      'GuardarAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosJornadasExtraordinarias' },
      'ObtenerAsync': { h: 'Horarios.Aplicacion.Aulas.IDatosJornadasExtraordinarias' },
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
      'ADominio': { f: 'public DescansoJornada ADominio()', s: 'Convierte la fila en el descanso del dominio.', l: 344 },
    },
  },
  'Horarios.Infraestructura.Aulas.DocenteFila': {
    s: 'Fila de `jornada_extraordinaria_docentes`.',
  },
  'Horarios.Infraestructura.Aulas.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Aulas.JornadaFila': {
    s: 'La fila de `jornadas`. Los días vienen como arreglo de texto, tal como los guarda Postgres.',
    m: {
      'ADominio': { f: 'public Jornada ADominio()', s: 'Convierte la fila en la jornada del dominio.', l: 328 },
    },
  },
  'Horarios.Infraestructura.Aulas.PeriodoFila': {
    s: 'Fila de `jornada_extraordinaria_periodos`.',
  },
  'Horarios.Infraestructura.Docentes.DatosDisponibilidadDeDocentePostgres': {
    m: {
      'ObtenerBloqueos': { f: 'public Task<BloqueosDeDisponibilidadDto> ObtenerBloqueos(Guid docenteId, Guid periodoId, Guid jornadaId, CancellationToken tokenCancelacion = default)', s: 'La base calcula los bloqueos; ver `calcular_slots_bloqueados`.', l: 48 },
    },
  },
  'Horarios.Infraestructura.Docentes.DatosDisponibilidadDocentePostgres': {
    s: 'Persistencia de la disponibilidad docente.\n\nGuardar y leer pasan por funciones de la base: reemplazar la rejilla entera son muchas escrituras que tienen que ocurrir juntas o no ocurrir.',
    m: {
      'GuardarAsync': { f: 'public Task<DisponibilidadDocenteDto> GuardarAsync(GuardarDisponibilidadDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Reemplaza la rejilla del docente en ese período.\n\nEl día se manda en minúsculas porque así se llama el valor en el tipo enumerado de Postgres.', l: 33 },
      'ObtenerAsync': { f: 'public Task<DisponibilidadDocenteDto?> ObtenerAsync(Guid docenteId, Guid periodoId, CancellationToken cancellationToken = default)', s: 'Devuelve lo declarado, o nulo si el docente aún no ha respondido: que no haya nada es una respuesta normal, no un error.', l: 54 },
      'ObtenerBloqueosAsync': { f: 'public Task<BloqueosDeDisponibilidadDto> ObtenerBloqueosAsync(Guid docenteId, Guid periodoId, Guid jornadaId, CancellationToken cancellationToken = default)', s: 'La base calcula los bloqueos; ver `calcular_slots_bloqueados`.', l: 65 },
      'ObtenerDocenteAsync': { f: 'public Task<Docente?> ObtenerDocenteAsync(Guid docenteId, CancellationToken cancellationToken = default)', s: 'Reutiliza la consulta de docentes en vez de repetirla aquí, para que ambos módulos vean exactamente el mismo docente.', l: 22 },
    },
  },
  'Horarios.Infraestructura.Docentes.DatosDocentesPostgres': {
    s: 'Persistencia de docentes y de sus cursos autorizados. Qué hace cada método está explicado en `IDatosDocentes`.\n\nLa particularidad de este adaptador es la relación N:M con facultades, que vive en la tabla puente `docente_facultades`: se lee embebida y se escribe con una rutina que reemplaza el conjunto entero.',
    m: {
      'AArreglo': { f: 'private static Guid[] AArreglo(IReadOnlyList<Guid>? ids)', s: 'Lista nula o con repetidos a arreglo limpio, que es lo que espera la rutina.', l: 216 },
      'ActualizarAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'AutorizarCursoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ConsultarActivosAsync': { f: 'private async Task<IReadOnlyList<Docente>> ConsultarActivosAsync(IEnumerable<KeyValuePair<string, string?>> adicionales, CancellationToken cancellationToken)', s: 'Consulta base de docentes activos, a la que cada llamador añade sus propios filtros. Tener los filtros comunes en un solo sitio evita que una consulta se olvide de descartar los dados de baja.', l: 184 },
      'ConsultarUnoActivoAsync': { f: 'private async Task<Docente?> ConsultarUnoActivoAsync(KeyValuePair<string, string?> filtro, CancellationToken cancellationToken)', s: 'La misma consulta base, para cuando se espera un solo docente.', l: 201 },
      'CrearAsync': { f: 'public async Task<Docente> CrearAsync(CrearDocenteSolicitud solicitud, CancellationToken cancellationToken = default)', s: 'Alta en dos pasos, como `DatosPlanesPostgres.ActualizarAsync`: la fila del docente por la Data API y sus facultades por la rutina que reemplaza el conjunto entero. Si el segundo paso fallara, el docente queda sin facultades, que es un estado válido —el docente compartido— y no una fila a medio escribir.', l: 24 },
      'EliminarAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'ExisteCursoActivoAsync': { h: 'Horarios.Aplicacion.Docentes.IDatosDocentes' },
      'FijarFacultadesAsync': { f: 'private Task FijarFacultadesAsync(Guid docenteId, IReadOnlyList<Guid> facultadIds, CancellationToken cancellationToken)', s: 'Reemplaza de una vez las facultades del docente. Es una función de la base porque hay que borrar e insertar juntos, dentro de la misma transacción.', l: 169 },
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
      'ADominio': { f: 'public Docente ADominio()', s: 'Convierte usando las facultades que vinieron embebidas. Sin ellas queda como docente compartido, que es lo correcto: es lo mismo que decir que no pertenece a ninguna.', l: 260 },
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
  'Horarios.Infraestructura.Motor.FilaFijada': {
    s: 'Fila cruda de CargaDeSesionesFijadas: una participación de una sesión ya fijada.',
    m: {
      'Participacion': { s: 'Nula cuando la cohorte de `sesion_cohortes` ya no está activa ni participa en el período; es una fijada irreconciliable.' },
    },
  },
  'Horarios.Infraestructura.Motor.FilaRequisito': {
    s: 'Fila cruda de CargaDeRequisitos: lo que una cohorte cursa de un curso de su pensum.',
    m: {
      'CursoSesionAgrupacion': { s: 'Curso que irá en `sesiones.curso_id` cuando el requisito pertenece a una agrupación; nulo fuera del área común.' },
    },
  },
  'Horarios.Infraestructura.Motor.MembresiaAgrupacion': {
    s: 'Cohorte declarada por una agrupación de área común; alimenta AgrupacionCompletaEnLaSesion.',
  },
  'Horarios.Infraestructura.Motor.PreparadorInstantaneaMotorPostgres': {
    s: 'Arma la foto de datos que el motor necesita para generar un horario, leyéndola de Postgres con las siete consultas de la entrada (fase 1, §4.1).\n\nEs el único adaptador del proyecto que se conecta a Postgres con Npgsql y SQL crudo; el resto pasa por `ClienteDatosSupabase` (la API de datos, PostgREST). El motivo es la forma de las consultas: aquí se cruzan pensums, cohortes, jornadas, agrupaciones y disponibilidades, y se agregan arreglos por fila. Eso no se expresa en PostgREST, y traerlo tabla por tabla para cruzarlo en memoria significaría decenas de viajes por generación. El precio es que estas consultas corren con la credencial de la conexión y no con el token del usuario, así que no las protege la seguridad por fila: la autorización ya se resolvió antes, en el caso de uso que pide generar.\n\nEl cargador no emite rangos de minutos por sesión: trae el origen, tamaño de slot y receso, y `RejillaTiempo` deriva la geometría común. Tampoco expande requisitos a sesiones por su cuenta: eso lo hacen `ExpansorAsignaciones` y `ReconciliadorFijadas`, que son del motor y no se inyectan. El cargador solo los encadena, porque la instantánea tiene que salir de aquí con sus sesiones ya expandidas y sus fijadas ya reconciliadas.\n\nLee de dos maneras: con el origen de datos, abriendo una conexión por consulta, que es lo normal; o con una conexión ya abierta (`EnConexion`), para leer dentro de la transacción de otro. Es lo que hace el guardado de una edición manual, que vuelve a leer todo en la misma transacción en la que escribe.',
    m: {
      'ADia': { f: 'private static DiaSemana ADia(string valor)', s: 'Convierte el día tal como lo devuelve Postgres (el enum de la base leído como texto) al enum del contrato. Sin distinguir mayúsculas porque las dos escrituras no coinciden.', l: 1238 },
      'AgregarAlcance': { f: 'private static void AgregarAlcance(NpgsqlCommand comando, AlcancePlan alcance)', s: 'Pasa el alcance como período y dos arreglos de uuid. Van siempre los tres, aunque los arreglos estén vacíos, porque el SQL los nombra siempre.', l: 1225 },
      'AgrupacionIncompletaEnAlcance': { f: 'public const string AgrupacionIncompletaEnAlcance = "AGRUPACION_INCOMPLETA_EN_ALCANCE"', s: 'El alcance corta una agrupación y no permite emitirla completa.', l: 114 },
      'CargaSemanalIndivisible': { f: 'public const string CargaSemanalIndivisible = "CARGA_SEMANAL_INDIVISIBLE"', s: 'La carga semanal de un curso no se puede dividir en sesiones enteras.', l: 111 },
      'CargarAulasAsync': { f: '// AulaActiva · espejo de completar_sesion_cohorte, database.sql:1059. private async Task<ImmutableArray<Aula>> CargarAulasAsync(CancellationToken cancellationToken)', s: 'CargaDeAulas. Aulas activas con capacidad, tipo y recursos con cantidad : AulaConLosRecursos compara cantidades, no presencia, y el v1 traía solo códigos. Un aula sin recursos sigue siendo usable, así que el `join` es externo, y no se filtra por facultad, carrera ni jornada (AulasFondoComun).', l: 1045 },
      'CargarDocentesAsync': { f: '// DocenteActivo · espejo de validar_sesion_en_jornada, database.sql:3897. // DocenteAutorizado · espejo de completar_sesion_cohorte, database.sql:1018. // DocenteDisponible · disponibilidad confirmada, database.sql:3496. private async Task<ImmutableArray<Docente>> CargarDocentesAsync(AlcancePlan alcance, CancellationToken cancellationToken)', s: 'CargaDeDocentes. Docentes activos con sus autorizaciones completas y su disponibilidad confirmada.\n\nLas autorizaciones viajan como filas con curso y jornada, no como un arreglo de cursos: DocenteAutorizado exige que la jornada de la autorización valga para la sesión, y el v1 la perdía al agregarlas con `array_agg(distinct curso_id)`. No se leen las facultades del docente: no participan en ninguna de las 40 reglas.', l: 946 },
      'CargarEquivalenciasAsync': { f: '// DocenteAutorizado · espejo de completar_sesion_cohorte, database.sql:1018. private async Task<ImmutableDictionary<Guid, ImmutableHashSet<Guid>>> CargarEquivalenciasAsync(ImmutableArray<RequisitoCargado> requisitos, CancellationToken cancellationToken)', s: 'CargaDeEquivalencias. Equivalencias de curso en una sola consulta contra `cursos_equivalentes`.\n\nSe piden las de los cursos de CargaDeRequisitos —visible y de sesión— y además las de todo curso que pertenece a un `curso_comun`, que son los únicos que tienen equivalentes distintos de sí mismos. Un curso ausente del diccionario equivale solo a sí mismo, así que pedir los 611 del catálogo solo añadiría entradas de un elemento.', l: 1086 },
      'CargarFilasFijadaAsync': { f: 'private async Task<ImmutableArray<FilaFijada>> CargarFilasFijadaAsync(Guid planId, AlcancePlan alcance, bool todasLasSesiones, CancellationToken cancellationToken)', p: [['todasLasSesiones', 'Si se leen todas las sesiones guardadas y no solo las fijadas.']], l: 1139 },
      'CargarFilasRequisitoAsync': { f: '// CursoVisibleUnicoPorCohorte · espejo de completar_sesion_cohorte, database.sql:988. // CursoEnElPensum · espejo de completar_sesion_cohorte, database.sql:1006. // AulaDeLaboratorio, TipoDeLaboratorioExacto · el curso visible es el que la base mira, database.sql:1061 y :1063. // AulaConLosRecursos · espejo de completar_sesion_cohorte, database.sql:1078. private async Task<ImmutableArray<FilaRequisito>> CargarFilasRequisitoAsync(AlcancePlan alcance, CancellationToken cancellationToken)', s: 'CargaDeRequisitos. Qué cursa cada cohorte y qué exige cada curso. El curso visible sale del pensum de la cohorte en el semestre que cursa este período; en área común ese mismo cruce contra `agrupacion_area_comun_cursos` es el que la base repite al completar la sesión.\n\nLaboratorio y recursos se leen del curso visible , no del de la sesión: en área común son cursos distintos y la base los comprueba contra el visible de cada cohorte. Los recursos no filtran por `recursos.esta_activo` porque la base tampoco lo hace; el v1 lo filtraba y así perdía requisitos que la inserción sí exige.', l: 832 },
      'CargarIdsFijadasAsync': { f: 'private async Task<ImmutableHashSet<Guid>> CargarIdsFijadasAsync(Guid planId, CancellationToken cancellationToken)', s: 'Las sesiones del plan que una persona fijó a mano.', l: 1195 },
      'CargarJornadasAsync': { f: '// JornadaActiva · espejo de validar_sesion_en_jornada, database.sql:3793. private async Task<ImmutableArray<Jornada>> CargarJornadasAsync(AlcancePlan alcance, CancellationToken cancellationToken)', s: 'CargaDeJornadas. Jornadas activas del alcance con la geometría necesaria para que `RejillaTiempo` construya sus slots y sus descansos.\n\nEn un plan de jornadas extraordinarias entran también las jornadas de las clases del horario de referencia, aunque estén desactivadas : sin su geometría no se sabe a qué hora son esas clases, y una clase ya generada sigue ocupando su aula aunque su jornada ya no se ofrezca. No se coloca nada en ellas: el plan solo tiene cohortes de su alcance.', l: 675 },
      'CargarMembresiasAgrupacionAsync': { f: 'private async Task<ImmutableArray<MembresiaAgrupacion>> CargarMembresiasAgrupacionAsync(AlcancePlan alcance, CancellationToken cancellationToken)', s: 'Cohortes que declara cada agrupación activa del período, completas y sin recortar por el alcance: es justo la comparación que hace falta para AgrupacionCompletaEnLaSesion.', l: 918 },
      'CargarNombresAsync': { f: 'private async Task<CatalogoNombres> CargarNombresAsync(AlcancePlan alcance, ImmutableArray<Guid> ids, CancellationToken cancellationToken)', s: 'CargaDeNombres. Cómo se llama cada identificador para una persona. Es lo único que el cargador trae sin que sirva para decidir nada: solo entra en los mensajes, y si una fila falta, el mensaje cae al identificador y no se pierde más que comodidad.\n\nLos nombres son los mismos que enseña la interfaz —el aula es su código, la cohorte es su carrera con su semestre y su sección— para que buscar en la pantalla lo que dice el diagnóstico sea buscar el mismo texto.', l: 448 },
      'CrearComando': { f: 'private NpgsqlCommand CrearComando(string sql)', s: 'Una consulta en la conexión propia o en una del origen de datos.', l: 101 },
      'EnConexion': { f: 'public static PreparadorInstantaneaMotorPostgres EnConexion(NpgsqlConnection conexion)', s: 'Un preparador que lee con esta conexión, ya abierta, y por tanto dentro de la transacción que tenga en curso. No la cierra: es de quien la abrió.', l: 94 },
      'Identificadores': { f: 'private static ImmutableArray<Guid> Identificadores(AlcancePlan alcance, ImmutableArray<Jornada> jornadas, ImmutableArray<Docente> docentes, ImmutableArray<Aula> aulas, ImmutableArray<SesionRequerida> sesiones, ImmutableArray<FilaRequisito> filasInvalidas, IReadOnlyDictionary<Guid, ImmutableArray<Guid>> agrupacionesCortadas, ImmutableArray<OcupacionExterna> ocupacionesExternas)', s: 'Todo lo que la instantánea nombra por identificador y que un mensaje puede necesitar decir en palabras. Se reúne aquí, y no en cada consulta, para pedir los nombres una sola vez y para que añadir una entidad al mensaje sea añadirla a esta lista.', l: 348 },
      'MapearFijadas': { f: '// CohorteEnLaAgrupacion, CursoEnLaAgrupacion · espejo de completar_sesion_cohorte, database.sql:957 y :967. public static ImmutableArray<SesionFijada> MapearFijadas(IEnumerable<FilaFijada> filas)', s: 'Junta las filas de CargaDeSesionesFijadas en sesiones fijadas, deriva la clave de asignación de cada una y les reparte el ordinal. Es puro: se prueba sin base de datos.\n\nLas sesiones semanales de una asignación son intercambiables antes de colocarse, así que el ordinal sale de un orden estable —`(Dia, SlotInicio, SesionId)`— y no del identificador de la sesión: dos fijadas de la misma clave tienen que recibir 1 y 2 siempre en el mismo orden para que el paso 4 las reconcilie igual en cada corrida.', p: [['filas', 'Filas de CargaDeSesionesFijadas, una por participación.']], e: [['InvalidOperationException', 'Una fijada cuya cohorte ya no participa en el período, un área común con menos de dos participaciones, o una sesión sin área común que no tiene exactamente una.']], l: 602 },
      'OcupacionExternaFueraDeJornada': { f: 'public const string OcupacionExternaFueraDeJornada = "OCUPACION_EXTERNA_FUERA_DE_JORNADA"', s: 'Hay clases del horario de referencia que ya no caben en la rejilla de su jornada.', l: 132 },
      'PrepararAsync': { f: 'public Task<Instantanea> PrepararAsync(PlanHorario plan, CancellationToken cancellationToken = default)', s: 'Lee todo lo que el motor va a necesitar para un plan y lo devuelve como una sola instantánea inmutable. A partir de aquí el motor no vuelve a tocar la base de datos, así que dos corridas sobre la misma instantánea son comparables.', p: [['plan', 'Plan a generar; de él salen el período y el alcance.']], e: [['ArgumentNullException', 'Si `plan` es nulo.'], ['InvalidOperationException', 'Una sesión fijada que no se puede reconciliar con sus cohortes, o cualquiera de las incoherencias restantes que destapan el expansor y el reconciliador. Las cargas indivisibles y agrupaciones cortadas se devuelven como diagnósticos de carga.']], l: 161 },
      'PrepararHorarioGuardadoAsync': { f: 'public async Task<HorarioVigente> PrepararHorarioGuardadoAsync(PlanHorario plan, CancellationToken cancellationToken = default)', s: 'El horario tal como está guardado, listo para editarlo: la misma instantánea que para generar, pero con todas las sesiones guardadas reconciliadas —no solo las fijadas—, así que cada sesión lleva su identificador guardado y no uno recalculado.\n\nLas sesiones salen desmarcadas y sin fijadas: quién queda fijo lo decide cada búsqueda. Lo que ya estaba fijado a mano viaja aparte, en `FijadasPrevias`. Las cohortes editables salen todas; quien conoce al usuario las recorta.', e: [['InvalidOperationException', 'El horario guardado ya no coincide con lo que el plan pide hoy —cambió el pensum, las cohortes o las áreas comunes—: una sesión guardada no se puede reconciliar.']], l: 179 },
      'SinCohortes': { f: 'public const string SinCohortes = "CARGA_SIN_COHORTES"', s: 'No hay cohortes activas en el alcance, así que no hay nada que colocar.', l: 105 },
      'SinRequisitos': { f: 'public const string SinRequisitos = "CARGA_SIN_REQUISITOS"', s: 'Hay cohortes, pero su pensum no declara ningún curso para su semestre.', l: 108 },
    },
  },
  'Horarios.Infraestructura.Motor.RevisorFactibilidadPlanMotor': {
    s: 'Arma la misma instantánea que consumiría una generación y le corre solo el precálculo: no coloca ni guarda nada. Lo que devuelve es lo que el motor ya sabe que dejaría pendiente.\n\nSi el cargador lanza —una sesión fijada que no se reconcilia con sus cohortes— la excepción sigue de largo: la generación fallaría igual, y la pantalla ya la muestra como error.',
    m: {
      'RevisarAsync': { h: 'Horarios.Aplicacion.Planes.IRevisorFactibilidadPlan' },
    },
  },
  'Horarios.Infraestructura.Planes.CarreraAlcanceFila': {
    s: 'Una carrera del alcance, embebida en la fila del plan.',
  },
  'Horarios.Infraestructura.Planes.ConflictoAGuardar': {
    s: 'Una violación dura del verificador, con las sesiones que la provocan.',
  },
  'Horarios.Infraestructura.Planes.DatosEdicionHorarioPostgres': {
    s: 'Lee y guarda la edición manual del horario con una conexión directa a Postgres (Npgsql).\n\nPor qué no la API de datos. Guardar una propuesta exige, en una sola transacción: bloquear el plan, volver a leer todo el horario con el mismo preparador del motor, revalidar la propuesta en C# contra esa lectura y escribir. Una llamada a PostgREST es una transacción que no puede esperar a código de la aplicación en medio.\n\nLo que eso cuesta. Esta conexión no lleva el token del usuario, así que la seguridad por fila no se aplica. Por eso se comprueba aquí mismo, dentro de la transacción, que el usuario siga activo y con los permisos (`usuario_tiene_permiso`), y qué cohortes alcanza.\n\nCómo se guarda una permuta. Dos clases que intercambian hora chocan si se mueven una por una, aunque el resultado final sea válido. Se hace con una sola sentencia `update` para todas las sesiones y con las tres restricciones de solape diferidas hasta confirmar (migración 202609180001). Los disparadores siguen activos y comprueban cada fila; los solapes se comprueban al confirmar, y si algo falla no queda nada escrito.',
    m: {
      'ActualizarSesionesAsync': { f: 'private static async Task ActualizarSesionesAsync(NpgsqlConnection conexion, EdicionAGuardar edicion, CancellationToken cancellationToken)', s: 'Una sola sentencia para todas las sesiones que cambian. Actualiza en su sitio, así que cada sesión conserva su identificador y sus filas de `sesion_cohortes`; los disparadores propagan día y hora a esas filas. Las fijadas por la persona quedan con `esta_fijada`; las que movió el motor conservan la suya (falsa).', l: 475 },
      'AplicarAsync': { h: 'Horarios.Aplicacion.Planes.IDatosEdicionHorario' },
      'Clave': { f: 'private static string Clave(EdicionAGuardar edicion)', s: 'La clave de la propuesta en `resultados_edicion.clave_solicitud`.', l: 678 },
      'CohortesEditablesAsync': { f: 'private static async Task<ImmutableHashSet<Guid>> CohortesEditablesAsync(NpgsqlConnection conexion, Guid usuarioId, IEnumerable<Guid> cohortes, CancellationToken cancellationToken)', s: 'Las cohortes, de entre las dadas, que el usuario puede modificar: todas si tiene un rol sin límite de facultad o no está atado a ninguna facultad; si no, las de sus facultades. Se lee de la base en cada llamada, no de la cookie: un cambio de alcance vale enseguida.', l: 231 },
      'EscribirAsync': { f: 'private static async Task<long> EscribirAsync(NpgsqlConnection conexion, EdicionAGuardar edicion, HorarioVigente vigente, CancellationToken cancellationToken)', s: 'Todo lo que se escribe, en orden: sesiones y fijaciones, diagnósticos, versión y auditoría. Devuelve la versión nueva del plan.', l: 364 },
      'ExigirPermisosAsync': { f: 'private static async Task ExigirPermisosAsync(NpgsqlConnection conexion, Guid usuarioId, CancellationToken cancellationToken)', s: 'Permisos leídos de la base, no de la cookie: si a la persona le quitaron un rol o desactivaron su cuenta, la edición se rechaza aunque la sesión siga abierta.', l: 314 },
      'LeerAsync': { h: 'Horarios.Aplicacion.Planes.IDatosEdicionHorario' },
      'LeerPlanAsync': { f: 'private static async Task<PlanHorario?> LeerPlanAsync(NpgsqlConnection conexion, Guid planId, bool bloquear, CancellationToken cancellationToken)', s: 'El plan con su alcance. Con `bloquear`, la fila queda bloqueada hasta confirmar: nadie más cambia su estado ni su versión mientras se guarda.', l: 161 },
      'LeerVigenteAsync': { f: 'private static async Task<HorarioVigente> LeerVigenteAsync(NpgsqlConnection conexion, PlanHorario plan, Guid usuarioId, CancellationToken cancellationToken)', s: 'El horario guardado, leído con el preparador del motor en esta misma conexión, y las cohortes que este usuario puede modificar.', l: 202 },
      'LiberarFijacionAsync': { h: 'Horarios.Aplicacion.Planes.IDatosEdicionHorario' },
      'LimpiarConflictosAsync': { f: 'private static async Task LimpiarConflictosAsync(NpgsqlConnection conexion, Guid planId, CancellationToken cancellationToken)', s: 'La propuesta se revalidó sin violaciones duras con los datos de esta misma transacción, así que los conflictos que tuviera guardados el plan ya no existen. Las pendientes se actualizan por separado, conservando las ajenas al objetivo y a las asignaciones retiradas.', l: 517 },
      'SubirVersionAsync': { f: 'private static async Task<long> SubirVersionAsync(NpgsqlConnection conexion, Guid planId, long versionEsperada, CancellationToken cancellationToken)', s: 'Sube la versión del plan una sola vez —la sube el disparador de `horarios`— y recalcula sus violaciones duras. La fila está bloqueada desde el principio de la transacción, así que la versión esperada no puede haber cambiado.', l: 537 },
      'Traducir': { f: 'private static EdicionHorarioRechazadaException Traducir(PostgresException error)', s: 'Traduce lo que la base rechaza a un motivo para la persona. En los tres casos la transacción ya se deshizo entera.', l: 659 },
    },
  },
  'Horarios.Infraestructura.Planes.DatosGeneracionesPostgres': {
    s: 'Persistencia transaccional de generaciones y horarios.',
    m: {
      'CerrarYGuardarHorarioAsync': { f: 'public async Task<GeneracionHorarioDto> CerrarYGuardarHorarioAsync(Guid generacionId, EstadoGeneracionDto estado, long duracionMs, Instantanea instantanea, Resultado? resultado, ResultadoVerificacion? verificacion, string? error, CancellationToken cancellationToken = default)', s: 'Cierra la generación y guarda el horario con una conexión directa a Postgres (Npgsql), no por la API de datos.\n\nPor qué. Guardar un horario completo es una sola sentencia que inserta cientos de sesiones, y cada una dispara `validar_sesion_en_jornada` y `completar_sesion_cohorte`. Evaluados con la seguridad por fila del usuario esos disparadores cuestan unos 80 ms por sesión: un horario de 153 sesiones tarda más de 10 s y el rol `authenticated` corta a los 8 s (`statement_timeout`), así que la generación de los períodos grandes fallaba con SQLSTATE 57014 y el plan quedaba en «fallido» con cero sesiones. Por conexión directa el mismo guardado tarda menos de 1 s.\n\nLo que eso cuesta. Esta conexión no lleva el token del usuario, así que la seguridad por fila no se aplica y hay que comprobar el permiso aquí, dentro de la misma transacción, como hace `DatosEdicionHorarioPostgres`. Se comprueba contra quien pidió la generación, que es lo que guardó `iniciar_generacion`: esa llamada sí va por la API de datos, con el token de la persona.\n\nLos disparadores, las restricciones y la rutina son los mismos por los dos caminos: lo único que cambia es quién evalúa los permisos.', l: 72 },
      'ExigirPermisoDeGeneracionAsync': { f: 'private static async Task ExigirPermisoDeGeneracionAsync(NpgsqlConnection conexion, Guid generacionId, CancellationToken cancellationToken)', s: 'Comprueba que quien pidió la generación siga activo y con permiso para generar. Es la comprobación que haría la seguridad por fila si el guardado fuera por la API de datos. Una generación sin solicitante —el banco de medición, una rutina— no pasa por aquí.', l: 166 },
    },
  },
  'Horarios.Infraestructura.Planes.DatosPlanesPostgres': {
    s: 'Persistencia de planes de horario sobre Supabase. Qué hace cada método está explicado en `IDatosPlanes`.\n\nEl alcance del plan —sus carreras y jornadas— vive en dos tablas puente. Se lee embebido y se escribe con una rutina que reemplaza el conjunto entero.',
    m: {
      'AArreglo': { f: 'private static Guid[] AArreglo(IReadOnlyList<Guid>? ids)', s: 'Lista nula o con repetidos a arreglo limpio, que es lo que espera la rutina.', l: 182 },
      'AEstado': { f: 'internal static EstadoHorario AEstado(string estado)', s: 'Traduce el estado desde el texto de la base. Los dos valores con guion bajo se tratan aparte porque el análisis por nombre no los reconocería.', l: 194 },
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
  'Horarios.Infraestructura.Planes.HorarioAGuardar': {
    s: 'El resultado del motor traducido a las cuatro listas que guarda `finalizar_generacion`: sesiones, pendientes, conflictos y mensajes.\n\nVive aparte del adaptador porque el mismo resultado se guarda por dos caminos —la aplicación, por PostgREST; el banco de medición, por conexión directa— y las filas tienen que salir idénticas por los dos. Todo va ordenado para que dos corridas con el mismo resultado produzcan el mismo JSON y se puedan comparar.',
    m: {
      'Mensajes': { f: 'public IReadOnlyList<MensajeGeneracionDto> Mensajes { get; }', s: 'Los diagnósticos del motor y del verificador, en un solo listado.', l: 105 },
    },
  },
  'Horarios.Infraestructura.Planes.IdFila': {
    s: 'Fila de la que solo interesa que exista.',
  },
  'Horarios.Infraestructura.Planes.JornadaAlcanceFila': {
    s: 'Una jornada del alcance, embebida en la fila del plan.',
  },
  'Horarios.Infraestructura.Planes.PendienteAGuardar': {
    s: 'Una asignación que se quedó sin colocar, vista desde la cohorte que la pierde.',
  },
  'Horarios.Infraestructura.Planes.PlanFila': {
    s: 'La fila de `horarios`, con su alcance embebido cuando la consulta lo pidió.',
    m: {
      'ADominio': { f: 'public PlanHorario ADominio()', s: 'Convierte usando el alcance que vino embebido. Sin él queda como plan que cubre todo el período, que es lo que significa el alcance vacío.', l: 223 },
    },
  },
  'Horarios.Infraestructura.Planes.SesionAGuardar': {
    s: 'Una sesión colocada, con la forma que espera el argumento p_sesiones.',
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
      'CambiarContrasenaAsync': { f: 'private static async Task<IResult> CambiarContrasenaAsync(HttpContext contexto, RestablecerContrasena restablecerContrasena, ILoggerFactory loggerFactory, [FromForm] CambioContrasenaFormulario formulario, CancellationToken cancellationToken)', s: 'Cambia la contraseña usando la sesión autenticada, quita la marca de contraseña inicial y cierra la sesión para reconstruir sus claims en el siguiente acceso.', l: 235 },
      'CerrarSesionAsync': { f: 'private static async Task<IResult> CerrarSesionAsync(HttpContext contexto, CerrarSesion cerrarSesion, CancellationToken cancellationToken)', s: 'Cierra la sesión en Supabase y borra la cookie. Si Supabase no responde, se sigue adelante para no dejar al usuario encerrado en una sesión que quiso cerrar.', l: 287 },
      'IniciarSesionAsync': { f: 'private static async Task<IResult> IniciarSesionAsync(HttpContext contexto, IniciarSesion iniciarSesion, ObtenerAlcanceUsuario obtenerAlcance, ILoggerFactory loggerFactory, [FromForm] CredencialesFormulario formulario, CancellationToken cancellationToken)', s: 'Valida las credenciales contra Supabase y, si son correctas, arma la cookie de sesión.\n\nDentro de la cookie se guardan los roles, los permisos y el alcance (docente y facultades) además de los tokens de Supabase. Se guardan porque cada pantalla los consulta muchas veces y volver a la base de datos en cada una sería caro; el costo de esa decisión es que un cambio de permisos no se aplica hasta el siguiente inicio de sesión. También se guarda la versión de la fila del usuario, que es lo que después permite invalidar la cookie desde el servidor (ver `Program.cs`, `OnValidatePrincipal`).\n\nLa cookie no es persistente ni se renueva sola, y caduca junto con la sesión de Supabase.\n\nNingún fallo devuelve un error crudo: siempre se redirige a la pantalla de acceso con un código en la URL. Se distingue entre credenciales inválidas —que no se registran, porque son normales— y Supabase caído o respondiendo algo inesperado, que sí se registran con la excepción completa. El mensaje que ve el usuario no dice cuál de los dos datos falló, para no ayudar a averiguar qué correos existen.', l: 150 },
      'Mapear': { f: 'public static void Mapear(WebApplication app)', s: 'Registra las dos rutas. Iniciar sesión es anónimo por necesidad; cerrar sesión exige estar autenticado, porque necesita el token guardado en la cookie para avisarle a Supabase.', l: 25 },
      'RestablecerContrasenaAsync': { f: 'private static async Task<IResult> RestablecerContrasenaAsync(RestablecerContrasena restablecerContrasena, ILoggerFactory loggerFactory, [FromForm] RestablecerContrasenaFormulario formulario, CancellationToken cancellationToken)', s: 'Consume la sesión temporal que llega en el enlace de Supabase y establece la nueva contraseña. El token viaja en el cuerpo del formulario, nunca en la URL del servidor.', l: 93 },
      'SolicitarRecuperacionAsync': { f: 'private static async Task<IResult> SolicitarRecuperacionAsync(SolicitarRecuperacionContrasena solicitarRecuperacion, IConfiguration configuracion, ILoggerFactory loggerFactory, [FromForm] RecuperacionFormulario formulario, CancellationToken cancellationToken)', s: 'Envía el correo de recuperación. El resultado visible es el mismo exista o no la cuenta para impedir que esta ruta se utilice para enumerar docentes.', l: 43 },
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
  'Horarios.Blazor.CasillaRejilla': {
    s: 'Una casilla de la rejilla: un semestre de una carrera, una jornada y una sección.',
    m: {
      'AnioIngreso': { s: 'Año de ingreso de esa cohorte. Si la casilla está vacía, el que le tocaría por la convención.' },
      'CohorteId': { s: 'La cohorte que resuelve la casilla, o nulo si todavía no existe. Que sea nula no impide marcarla: al guardar se crea.' },
      'FueraDePatron': { s: 'La cohorte activa en este semestre no es la que la convención predice. Pasa cuando un período reutiliza cohortes de otro, y se enseña porque desmarcar la casilla desactivaría a esa cohorte y no a la esperada.' },
      'Habilitada': { f: 'public bool Habilitada', s: 'Se puede marcar y desmarcar: el pensum cubre este semestre.', l: 27 },
      'Motivo': { s: 'Por qué no se puede marcar, o nulo si sí se puede. Es lo que convierte el error de la base en información sobre qué le falta a la malla.' },
    },
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
      'Ejecutar': { f: 'protected async Task Ejecutar(Func<Task> accion, string exito, Func<string, Task>? alFallar = null)', s: 'Ejecuta una acción del usuario, recarga y deja el mensaje de resultado.', p: [['alFallar', 'Reacción opcional al mensaje ya traducido. Aulas la usa para limpiar el campo duplicado y devolverle el foco.']], l: 55 },
      'EsEsperado': { f: 'protected static bool EsEsperado(Exception excepcion)', s: 'Errores que la página sabe explicar: validación, conflicto de datos, faltante y permiso denegado. Cualquier otro sube al manejador global, porque un fallo inesperado no debe quedar disfrazado de mensaje de validación.', l: 129 },
      'RecargarAsync': { f: 'protected virtual Task RecargarAsync()', s: 'Recarga que corre después de una acción correcta. Cada página la sobrescribe con su propia consulta; las que no muestran datos recargados no necesitan hacer nada.', l: 34 },
    },
  },
  'Horarios.Blazor.Components.Shared.CasillaVaciaSeleccionada': {
    s: 'La casilla libre que se pulsó en la rejilla: qué jornada, día y hora son, para poder ofrecer qué poner ahí. Lleva su hora ya escrita porque solo sirve para enseñarla.',
    m: {
      'Dia': { s: 'El día como lo guarda la base: «lunes», «miercoles»…' },
      'Horas': { s: '«09:00–10:00»: lo que dura la casilla.' },
      'IdElemento': { s: 'El id del botón en la página.' },
    },
  },
  'Horarios.Blazor.Components.Shared.ClaseParaCasilla': {
    s: 'Una clase que se puede poner en una casilla libre. Una sin colocar se identifica por curso y cohorte, como en la fila del hueco; una ya colocada, por su sesión.',
    m: {
      'Donde': { s: 'Lo que se enseña junto a la cohorte: dónde está hoy una clase colocada, o cuántas sesiones le faltan a una sin colocar («4/4 pendientes»).' },
      'SesionId': { s: 'Vacío cuando la clase está sin colocar.' },
    },
  },
  'Horarios.Blazor.Components.Shared.ClaseSeleccionada': {
    s: 'La clase que se pulsó en la rejilla: qué sesión es y qué botón la abrió, para devolverle el foco al cerrar el editor.',
    m: {
      'IdElemento': { s: 'El id del botón en la página.' },
    },
  },
  'Horarios.Blazor.CursoDelGrupo': {
    s: 'Un curso de una cohorte dentro del horario, con sus sesiones colocadas y las que faltan. En un área común es el curso con el que esa cohorte ve la clase.',
    m: {
      'CursoId': { s: 'Vacío cuando la base no lo manda (una generación o una base vieja): el curso no se puede abrir para colocarlo.' },
      'Motivo': { s: 'Por qué el motor no colocó las que faltan; nulo si no falta ninguna. Es el mismo para todas las sesiones pendientes del curso.' },
      'SePuedeAbrir': { f: 'public bool SePuedeAbrir', s: 'Sin identificadores no se sabe qué clase abrir para colocarla.', l: 65 },
    },
  },
  'Horarios.Blazor.EstadoCurso': {
    s: 'Cuánto de un curso quedó en el horario.',
    m: {
      'Completo': { s: 'Todas sus sesiones están colocadas.', l: 31 },
      'Incompleto': { s: 'Tiene sesiones colocadas y otras sin colocar.', l: 34 },
      'SinColocar': { s: 'No se colocó ninguna de sus sesiones.', l: 37 },
    },
  },
  'Horarios.Blazor.FilaRejilla': {
    s: 'Una fila de la rejilla: una carrera, una jornada y una sección, con una casilla por semestre de la carrera.',
    m: {
      'Activas': { f: 'public int Activas', s: 'Cuántos semestres cursa esta fila en el período.', l: 50 },
      'Matricula': { s: 'Matrícula que se propone para las cohortes nuevas: la de la última cohorte de la fila, o el valor por omisión si la fila está vacía.' },
      'PensumId': { s: 'Pensum con que se crearán las cohortes que falten. Es el de las cohortes que la fila ya tiene; si no tiene ninguna, el más reciente de la carrera.' },
    },
  },
  'Horarios.Blazor.GrupoHorario': {
    s: 'Un trozo del horario que se revisa de una vez: una carrera y un semestre, con las clases que se colocaron y cómo va cada curso.',
    m: {
      'Completos': { f: 'public IReadOnlyList<CursoDelGrupo> Completos', s: 'Los cursos con todas sus sesiones en la rejilla.', l: 22 },
      'Cursos': { s: 'Cada curso de cada cohorte del grupo, con cuántas de sus sesiones se colocaron. Primero los que tienen algo sin colocar, porque no tienen día ni hora con los que intercalarse en la rejilla y son lo que queda por hacer.' },
      'PorColocar': { f: 'public IReadOnlyList<CursoDelGrupo> PorColocar', s: 'Los cursos con alguna sesión sin colocar, del todo o a medias.', l: 19 },
    },
  },
  'Horarios.Blazor.GruposHorario': {
    s: 'Reparte un horario generado en los grupos que se revisan: una carrera y un semestre cada uno. Un período completo son miles de clases y en una sola lista no se puede leer nada.\n\nVive fuera de la página porque es la decisión de qué se enseña junto, y esa se puede equivocar en silencio: un hueco que cae en un grupo que no existe no se ve en ningún sitio, y la página seguiría pintándose igual de bien.',
    m: {
      'Repartir': { f: 'public static IReadOnlyList<GrupoHorario> Repartir(HorarioGeneradoDto? horario, string filtro)', s: 'Los grupos del horario, filtrados por el texto de búsqueda.\n\nLas clases y los huecos se juntan por (carrera, semestre). Un grupo puede existir solo por sus huecos : si a un semestre no se le colocó ni una clase, esconderlo sería esconder justo lo que hay que arreglar.\n\nUn curso sale si alguna de sus clases o de sus huecos coincide con la búsqueda, pero sus cuentas salen siempre del horario entero: buscar «lunes» no puede convertir un curso completo en «1/3».', p: [['filtro', 'Texto libre; vacío no filtra nada.']], l: 90 },
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
      'Explicar': { f: 'public static string Explicar(MensajeGeneracionDto mensaje)', s: 'Texto que ve el usuario para un mensaje de generación. Los errores de infraestructura llegan con la respuesta HTTP cruda dentro; aquí se reconocen los casos conocidos y se explican con la acción que corresponde, en lugar de mostrar el JSON del servidor.', l: 73 },
      'ResumenFinal': { f: 'public static string ResumenFinal(EstadoHorario estado, GeneracionHorarioDto? generacion, TimeSpan transcurrido)', s: 'Frase de cierre cuando el plan sale del estado «Generando».', l: 116 },
      'ResumenSinRespuesta': { f: 'public static string ResumenSinRespuesta(TimeSpan transcurrido, int limiteSegundos)', s: 'Aviso cuando la generación excede su propio presupuesto de tiempo sin cerrar.', l: 148 },
    },
  },
  'Horarios.Blazor.ProcesadorTrabajosPesados': {
    s: 'Servicio en segundo plano que va vaciando la `ColaTrabajosPesados`.\n\nExiste porque hay trabajos —generar un horario, importar un archivo— que tardan más de lo que una petición HTTP debería esperar. La página encola y responde; este servicio ejecuta. Es un solo consumidor a propósito: los trabajos son intensivos en CPU y correr varios a la vez solo se quitarían tiempo entre ellos.',
    m: {
      'ExecuteAsync': { f: 'protected override async Task ExecuteAsync(CancellationToken stoppingToken)', s: 'Bucle de consumo. Cuando no hay nada que hacer espera 250 ms antes de volver a mirar, en lugar de girar en vacío.\n\nUn trabajo que falla no puede tumbar el procesador: si eso pasara, la aplicación seguiría en pie pero ninguna generación volvería a completarse. Por eso se registra el error y se sigue, con una pausa de un segundo para no entrar en un ciclo de fallos seguidos. La cancelación al apagar la aplicación sí termina el bucle.', l: 24 },
    },
  },
  'Horarios.Blazor.RejillaCohortes': {
    s: 'Arma la rejilla carrera × semestre a partir de lo que ya hay en la base: los pares carrera-jornada, las cohortes, sus activaciones en el período y la malla de cada pensum.\n\nLa rejilla no tiene estado propio a propósito. Cada casilla se deriva en el render, así que no hay un modelo paralelo que sincronizar —que es exactamente la avería que este plan vino a arreglar, en pequeño—.\n\nVive fuera de la página porque decide dos cosas que se equivocan en silencio: qué cohorte resuelve cada casilla, y cuáles no se pueden marcar. Una casilla que se pinta habilitada sin que el pensum la cubra no se ve mal: se ve bien y falla al guardar.',
    m: {
      'AnioIngresoDe': { f: 'public static int AnioIngresoDe(int anioPeriodo, int semestre)', s: 'El año de ingreso que le toca a una cohorte que cursa `semestre` durante un período del año `anioPeriodo`. Dos semestres por año: quien va en tercero entró el año pasado.', l: 78 },
      'Construir': { f: 'public static IReadOnlyList<FilaRejilla> Construir(int anioPeriodo, IReadOnlyList<CarreraJornada> pares, IReadOnlyList<Carrera> carreras, IReadOnlyList<Jornada> jornadas, IReadOnlyList<Pensum> pensums, IReadOnlyList<Cohorte> cohortes, IReadOnlyList<CohorteActivaPeriodo> activas, IReadOnlyList<CursoEnPensum> cursosPensum)', s: 'Las filas de la rejilla, ordenadas: primero las que cursan algo este período, y dentro de eso por carrera, jornada y sección.', p: [['anioPeriodo', 'Año del período que se está configurando.'], ['pares', 'Pares carrera-jornada que se ofrecen. Un par sin cohortes también da fila: es donde se da de alta la primera.'], ['cursosPensum', 'La malla de todos los pensums. De aquí sale qué semestres tienen cursos y cuáles no.']], l: 90 },
      'MatriculaPorOmision': { f: 'public const int MatriculaPorOmision = 25', s: 'Matrícula que se propone cuando la fila no tiene ninguna cohorte de la que copiarla.', l: 71 },
      'SeccionPorOmision': { f: 'public const string SeccionPorOmision = "A"', s: 'Sección con que arranca un par carrera-jornada que todavía no tiene ninguna.', l: 68 },
    },
  },
  'Horarios.Blazor.TrabajoPesado': {
    s: 'Un trabajo encolado, con su nombre para poder identificarlo en los registros.',
  },
};

export const TOTAL_CLASES_DOC = 361;
export const TOTAL_MIEMBROS_DOC = 1091;
