export type RequirementCategory = 'RF' | 'RN' | 'RNF' | 'CA';

export interface Requirement {
  id: string;
  categoria: RequirementCategory;
  seccion: string;
  titulo: string;
  descripcion: string;
  contexto?: string[];
}

export interface Seccion {
  nombre: string;
  items: Requirement[];
}

const rf: Requirement[] = [
  // 4.1 Cuenta y acceso
  {
    id: 'RF-001', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Inicio de sesión',
    descripcion: 'El sistema deberá permitir que los usuarios registrados inicien sesión mediante sus credenciales.',
    contexto: [
      'Autenticación basada en usuario y contraseña, con una sesión temporal que identifica al usuario mientras usa el sistema.',
      'La sesión expira tras 8 horas de inactividad.',
    ],
  },
  {
    id: 'RF-002', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Cierre de sesión',
    descripcion: 'El sistema deberá permitir que el usuario cierre su sesión de forma segura.',
  },
  {
    id: 'RF-003', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Recuperación de contraseña',
    descripcion: 'El sistema deberá proporcionar un mecanismo para recuperar o restablecer una contraseña olvidada.',
  },
  {
    id: 'RF-004', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Cambio de contraseña',
    descripcion: 'El sistema deberá permitir que los usuarios cambien su contraseña desde su perfil.',
    contexto: ['Las contraseñas se almacenan cifradas de forma irreversible, nunca en texto plano.'],
  },
  {
    id: 'RF-005', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Actualización de perfil',
    descripcion: 'El sistema deberá permitir que los usuarios actualicen sus datos personales y de contacto autorizados.',
    contexto: [
      'El manejo de datos personales de docentes y alumnos debe cumplir la legislación guatemalteca de protección de datos.',
      'El usuario puede solicitar la eliminación o anonimización de sus datos personales conforme a la normativa institucional.',
    ],
  },
  {
    id: 'RF-006', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Notificaciones',
    descripcion: 'El sistema deberá mostrar al usuario sus alertas, recordatorios y notificaciones.',
    contexto: [
      'Se notifica a docentes y alumnos cuando se publica un horario que les concierne.',
      'Se notifica a docentes cuando se registra una sustitución que les afecta.',
      'Se notifica al administrador cuando un docente actualiza su disponibilidad fuera de la ventana esperada (informativo, no bloqueante).',
    ],
  },
  {
    id: 'RF-007', categoria: 'RF', seccion: '4.1 Cuenta y acceso', titulo: 'Estado de notificaciones',
    descripcion: 'El usuario deberá poder marcar una notificación como leída.',
  },

  // 4.2 Usuarios, roles y seguridad
  {
    id: 'RF-008', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Gestión de usuarios',
    descripcion: 'El superadministrador deberá poder crear, consultar, actualizar, activar y desactivar usuarios.',
  },
  {
    id: 'RF-009', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Asignación de roles',
    descripcion: 'El superadministrador deberá poder asignar y modificar los roles de los usuarios.',
    contexto: [
      'Roles soportados: Superadministrador, Coordinador Académico, Docente, Alumno.',
      'Superadmin: gestión total de catálogos, usuarios, configuración global, parámetros del algoritmo, transición Borrador→Publicado.',
      'Coordinador Académico: catálogos académicos, generación de horarios, edición manual, aprobación previa, sustituciones.',
      'Docente: registro de disponibilidad, consulta de su horario, consulta de sustituciones que le afectan.',
      'Alumno: consulta de su horario por cohorte.',
    ],
  },
  {
    id: 'RF-010', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Restablecimiento administrativo',
    descripcion: 'El superadministrador deberá poder restablecer la contraseña de un usuario.',
  },
  {
    id: 'RF-011', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Búsqueda de usuarios',
    descripcion: 'El sistema deberá permitir buscar y filtrar usuarios por nombre, correo, rol y estado.',
  },
  {
    id: 'RF-012', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Control de acceso',
    descripcion: 'El sistema deberá restringir las funcionalidades de acuerdo con el rol y los permisos del usuario autenticado.',
    contexto: [
      'Cada acción del sistema se valida contra el rol del usuario antes de permitirse.',
      'Docentes y alumnos no pueden modificar horarios bajo ninguna circunstancia; solo Superadmin y Coordinador Académico alteran el estado del horario.',
    ],
  },
  {
    id: 'RF-013', categoria: 'RF', seccion: '4.2 Usuarios, roles y seguridad', titulo: 'Auditoría de seguridad',
    descripcion: 'El sistema deberá registrar los accesos y las operaciones administrativas relevantes.',
    contexto: [
      'Se audita: generación de horarios, edición manual, cambios de estado, sustituciones, modificaciones a catálogos maestros.',
      'Cada registro de log incluye usuario, IP, timestamp y operación realizada.',
    ],
  },

  // 4.3 Configuración general
  {
    id: 'RF-015', categoria: 'RF', seccion: '4.3 Configuración general', titulo: 'Políticas de acceso',
    descripcion: 'El superadministrador deberá poder configurar reglas de contraseña, duración de sesión y límites de intentos de acceso.',
    contexto: ['Referencia original: expiración de sesión a las 8 horas de inactividad; contraseñas con hash+salt.'],
  },
  {
    id: 'RF-016', categoria: 'RF', seccion: '4.3 Configuración general', titulo: 'Parámetros operativos',
    descripcion: 'El superadministrador deberá poder configurar límites de carga docente, períodos académicos y otros valores generales.',
    contexto: ['Referencia original: carga máxima de docente típicamente 4-6 cursos, carga mínima típicamente 1.'],
  },
  {
    id: 'RF-017', categoria: 'RF', seccion: '4.3 Configuración general', titulo: 'Parámetros de notificación',
    descripcion: 'El superadministrador deberá poder configurar los tipos de eventos que generan notificaciones.',
    contexto: ['Eventos identificados en el documento original: publicación de horario, sustitución que afecta a un docente, disponibilidad registrada fuera de ventana.'],
  },

  // 4.4 Estructura académica
  {
    id: 'RF-018', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Gestión de carreras',
    descripcion: 'El coordinador académico deberá poder registrar, consultar, actualizar y desactivar carreras.',
    contexto: [
      'Las carreras se asocian a una Facultad (nombre, código, nivel académico: Técnico, Licenciatura, Ingeniería, Maestría; duración en semestres).',
      'Las Facultades no se eliminan físicamente, solo se desactivan, para preservar el historial.',
    ],
  },
  {
    id: 'RF-019', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Gestión de jornadas',
    descripcion: 'El coordinador deberá poder asociar una o más jornadas a cada carrera.',
    contexto: [
      'Jornada define: nombre, duración de bloque en minutos (configurable), hora de inicio, hora de fin, días activos.',
      'El pensum completo debe impartirse en cada jornada activa de la carrera.',
    ],
  },
  {
    id: 'RF-020', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Gestión de pensum',
    descripcion: 'El sistema deberá permitir administrar distintas versiones de pensum y sus períodos de vigencia.',
    contexto: ['Ejemplo original: coexistencia de Pensum 2022 y Pensum 2026, cada uno define la lista de cursos por semestre para una carrera.'],
  },
  {
    id: 'RF-021', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Conservación del pensum',
    descripcion: 'El sistema deberá permitir que los grupos existentes continúen asociados a su pensum original mientras los grupos nuevos utilizan el pensum vigente.',
    contexto: ['Phase-out progresivo: los cohortes nuevos usan el pensum nuevo; los cohortes existentes mantienen el pensum anterior hasta egresar.'],
  },
  {
    id: 'RF-022', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Gestión de cursos',
    descripcion: 'El coordinador deberá poder registrar cursos, duración semanal, cantidad de sesiones y requerimientos especiales.',
    contexto: [
      'Atributos originales del curso: código, nombre, requiere laboratorio (booleano), tipo de laboratorio requerido, es área común (booleano) + carreras que lo comparten, bloques semanales mínimos y máximos.',
    ],
  },
  {
    id: 'RF-023', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Gestión de grupos y secciones',
    descripcion: 'El sistema deberá permitir registrar cohortes, grupos y secciones autorizadas.',
    contexto: ['Una cohorte se define como: carrera + año de ingreso + sección + pensum + jornada.'],
  },
  {
    id: 'RF-024', categoria: 'RF', seccion: '4.4 Estructura académica', titulo: 'Sugerencia de nueva sección',
    descripcion: 'Cuando la cantidad de estudiantes supere los recursos disponibles, el sistema podrá sugerir la apertura de otra sección, pero no deberá crearla automáticamente.',
    contexto: ['Se sugiere cuando la capacidad del aula asignada es menor a la matrícula del curso; la autorización de abrir la sección es responsabilidad del administrador.'],
  },

  // 4.5 Aulas y laboratorios
  {
    id: 'RF-025', categoria: 'RF', seccion: '4.5 Aulas y laboratorios', titulo: 'Gestión de aulas',
    descripcion: 'El coordinador deberá poder registrar, consultar, actualizar y desactivar aulas.',
    contexto: ['Atributos originales: código, capacidad, tipo (teórica, laboratorio, híbrida), equipamiento especial, coordenadas (piso, número de aula).'],
  },
  {
    id: 'RF-026', categoria: 'RF', seccion: '4.5 Aulas y laboratorios', titulo: 'Capacidad del aula',
    descripcion: 'El sistema deberá permitir registrar una capacidad máxima para cada aula.',
  },
  {
    id: 'RF-027', categoria: 'RF', seccion: '4.5 Aulas y laboratorios', titulo: 'Tipo de espacio',
    descripcion: 'El sistema deberá permitir clasificar los espacios como aula, laboratorio u otros tipos configurables.',
    contexto: ['Documento original manejaba tres tipos base: teórica, laboratorio, híbrida.'],
  },
  {
    id: 'RF-028', categoria: 'RF', seccion: '4.5 Aulas y laboratorios', titulo: 'Equipamiento especial',
    descripcion: 'El sistema deberá permitir indicar el equipamiento o tipo de laboratorio requerido por un curso.',
  },
  {
    id: 'RF-029', categoria: 'RF', seccion: '4.5 Aulas y laboratorios', titulo: 'Ubicación de aulas',
    descripcion: 'El sistema deberá permitir registrar la ubicación de las aulas para evaluar los desplazamientos entre sesiones consecutivas.',
  },

  // 4.6 Docentes y disponibilidad
  {
    id: 'RF-030', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Gestión de docentes',
    descripcion: 'El coordinador deberá poder registrar y actualizar la información de los docentes.',
    contexto: ['Atributos originales: nombre completo, identificación, correo, teléfono, prioridad/preferencia numérica configurable, carga máxima (típico 4-6 cursos), carga mínima (típico 1).'],
  },
  {
    id: 'RF-031', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Cursos autorizados',
    descripcion: 'El coordinador deberá poder indicar qué cursos puede impartir cada docente.',
    contexto: ['El docente no puede modificar esta lista; es exclusiva del administrador.'],
  },
  {
    id: 'RF-032', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Carga docente',
    descripcion: 'El sistema deberá permitir configurar la carga mínima y máxima de cada docente.',
    contexto: ['Valores de referencia originales: carga máxima típica 4-6 cursos, carga mínima típica 1.'],
  },
  {
    id: 'RF-033', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Prioridad docente',
    descripcion: 'El coordinador deberá poder asignar un nivel de prioridad para distribuir la carga académica.',
  },
  {
    id: 'RF-034', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Ventana de disponibilidad',
    descripcion: 'El coordinador deberá poder establecer un período durante el cual los docentes registren su disponibilidad.',
    contexto: ['Tras la aprobación del horario, cualquier cambio de disponibilidad sigue el flujo de sustituciones en lugar de editarse libremente.'],
  },
  {
    id: 'RF-035', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Registro de disponibilidad',
    descripcion: 'El docente deberá poder indicar los días y bloques horarios en los que está disponible.',
    contexto: ['Se modela como una matriz día × bloque, booleana o con niveles de preferencia.'],
  },
  {
    id: 'RF-036', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Modificación de disponibilidad',
    descripcion: 'El docente podrá modificar su disponibilidad mientras la ventana de registro permanezca abierta.',
  },
  {
    id: 'RF-037', categoria: 'RF', seccion: '4.6 Docentes y disponibilidad', titulo: 'Consulta de disponibilidad',
    descripcion: 'El coordinador deberá poder consultar y verificar la disponibilidad registrada por los docentes.',
  },

  // 4.7 Generación automática
  {
    id: 'RF-038', categoria: 'RF', seccion: '4.7 Generación automática', titulo: 'Creación de escenario',
    descripcion: 'El coordinador académico deberá poder crear un escenario de generación para un período académico.',
    contexto: ['El resultado es un blueprint semanal único de horario que se replica en todas las semanas del ciclo académico.'],
  },
  {
    id: 'RF-039', categoria: 'RF', seccion: '4.7 Generación automática', titulo: 'Validación previa',
    descripcion: 'Antes de generar un horario, el sistema deberá comprobar que existan cursos, docentes, disponibilidad, grupos, aulas y jornadas suficientes.',
  },
  {
    id: 'RF-040', categoria: 'RF', seccion: '4.7 Generación automática', titulo: 'Generación de horario',
    descripcion: 'El sistema deberá generar automáticamente una propuesta de horario respetando las restricciones definidas.',
    contexto: [
      'Restricciones duras: sin solapes de docente, sin solapes de aula, capacidad respetada, equipamiento de laboratorio disponible, continuidad docente intra-carrera.',
      'Los cursos de área común se modelan como una única sesión física (un docente, un aula, un bloque) compartida, bloqueando el slot en los horarios de todas las carreras involucradas.',
    ],
  },
  {
    id: 'RF-041', categoria: 'RF', seccion: '4.7 Generación automática', titulo: 'Seguimiento del proceso',
    descripcion: 'El sistema deberá mostrar el estado y avance de la generación.',
  },
  {
    id: 'RF-042', categoria: 'RF', seccion: '4.7 Generación automática', titulo: 'Resultados de calidad',
    descripcion: 'Al finalizar, el sistema deberá presentar los conflictos detectados, preferencias incumplidas e indicadores de calidad.',
    contexto: [
      'Orden de prioridad de restricciones blandas: 1) disponibilidad docente y bloques consecutivos del mismo curso juntos, 2) ausencia de ventanas muertas (o ubicarlas al final de la jornada), 3) minimizar distancia entre aulas consecutivas, 4) balance de carga entre docentes.',
      'Si el problema es infactible, el sistema entrega el mejor horario parcial posible junto con un reporte detallado de las sesiones no asignadas y su motivo.',
    ],
  },

  // 4.8 Edición y publicación
  {
    id: 'RF-043', categoria: 'RF', seccion: '4.8 Edición y publicación', titulo: 'Visualización interactiva',
    descripcion: 'El coordinador deberá poder visualizar el horario mediante una cuadrícula organizada por días y bloques.',
    contexto: ['La edición se concibe como drag-and-drop, con feedback visual de conflictos en tiempo real.'],
  },
  {
    id: 'RF-044', categoria: 'RF', seccion: '4.8 Edición y publicación', titulo: 'Filtros de horario',
    descripcion: 'El sistema deberá permitir filtrar el horario por carrera y jornada.',
    contexto: ['El documento original contempla también vistas por docente, aula y cohorte.'],
  },
  {
    id: 'RF-045', categoria: 'RF', seccion: '4.8 Edición y publicación', titulo: 'Versionado',
    descripcion: 'El sistema deberá conservar versiones de los horarios generados y modificados.',
    contexto: ['Se mantiene historial de versiones permitiendo deshacer ediciones y comparar versiones entre sí.'],
  },
  {
    id: 'RF-046', categoria: 'RF', seccion: '4.8 Edición y publicación', titulo: 'Publicación',
    descripcion: 'El coordinador deberá poder publicar una versión del horario para su consulta.',
    contexto: [
      'Flujo de estados original: Borrador → Generado → En Revisión → Aprobado → Publicado → Archivado.',
      'Las transiciones de estado están controladas por rol.',
    ],
  },
  {
    id: 'RF-047', categoria: 'RF', seccion: '4.8 Edición y publicación', titulo: 'Modificación posterior',
    descripcion: 'El sistema deberá permitir modificar un horario publicado, generando una nueva versión y registrando los cambios.',
    contexto: [
      'Un horario publicado no se modifica en su estructura; los cambios se registran como sustituciones.',
      'En edición manual: si el cambio no genera conflicto se aplica directo; si genera conflicto duro, el sistema lo muestra y, si el usuario acepta, reacomoda automáticamente las sesiones afectadas alrededor de esa edición, sin moverla.',
      'Tiempo objetivo de reparación local: menor a 1 segundo (idealmente 200–500 ms).',
    ],
  },

  // 4.9 Incidencias y sustituciones
  {
    id: 'RF-048', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Registro de ausencias',
    descripcion: 'El coordinador deberá poder registrar ausencias temporales o permanentes de docentes.',
    contexto: ['Las sustituciones temporales (un docente cubre a otro durante un periodo definido) no alteran el horario aprobado.'],
  },
  {
    id: 'RF-049', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Solicitudes docentes',
    descripcion: 'El docente deberá poder registrar solicitudes de permiso.',
    contexto: ['Incluye también el registro de cancelaciones puntuales de sesión.'],
  },
  {
    id: 'RF-050', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Asignación de sustitutos',
    descripcion: 'El coordinador deberá poder asignar un docente sustituto.',
    contexto: ['Las sustituciones permanentes (cambio definitivo de docente en una asignación) tampoco alteran el horario aprobado; quedan registradas aparte.'],
  },
  {
    id: 'RF-051', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Validación del sustituto',
    descripcion: 'El sistema deberá verificar que el sustituto pueda impartir el curso y que no tenga conflictos de horario.',
  },
  {
    id: 'RF-052', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Suspensión de sesiones',
    descripcion: 'El coordinador deberá poder suspender o cancelar una sesión programada.',
  },
  {
    id: 'RF-053', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Historial de incidencias',
    descripcion: 'El sistema deberá conservar el historial de ausencias, permisos, sustituciones y sesiones suspendidas.',
    contexto: ['Toda sustitución queda auditada con: fecha, motivo, autor del registro, docente entrante, docente saliente, periodo afectado.'],
  },
  {
    id: 'RF-054', categoria: 'RF', seccion: '4.9 Incidencias y sustituciones', titulo: 'Notificación de cambios',
    descripcion: 'El sistema deberá notificar los cambios a los docentes y estudiantes afectados.',
  },

  // 4.10 Consulta y reportes
  {
    id: 'RF-055', categoria: 'RF', seccion: '4.10 Consulta y reportes', titulo: 'Horario del docente',
    descripcion: 'El docente deberá poder consultar su horario vigente.',
    contexto: ['El documento original también contempla un reporte de carga académica por docente y por periodo.'],
  },
  {
    id: 'RF-056', categoria: 'RF', seccion: '4.10 Consulta y reportes', titulo: 'Horario del alumno',
    descripcion: 'El alumno deberá poder consultar el horario publicado de su carrera y jornada.',
    contexto: ['La consulta se realiza a nivel de cohorte (carrera + año de ingreso + sección + pensum + jornada).'],
  },
  {
    id: 'RF-057', categoria: 'RF', seccion: '4.10 Consulta y reportes', titulo: 'Consulta por aula',
    descripcion: 'El coordinador deberá poder consultar la ocupación de cada aula.',
    contexto: ['El documento original lo describe como reporte de utilización de aulas.'],
  },
  {
    id: 'RF-058', categoria: 'RF', seccion: '4.10 Consulta y reportes', titulo: 'Exportación a PDF',
    descripcion: 'El sistema deberá permitir exportar los horarios en formato PDF.',
    contexto: ['Los PDF incluyen membrete institucional, periodo académico, fecha de generación y firma digital o código de verificación.'],
  },
  {
    id: 'RF-059', categoria: 'RF', seccion: '4.10 Consulta y reportes', titulo: 'Exportación a Excel',
    descripcion: 'El sistema deberá permitir exportar los horarios en formato Excel.',
    contexto: ['Los archivos exportados deben abrirse correctamente en visores estándar: Adobe Reader, Microsoft Excel, LibreOffice.'],
  },
];

const rn: Requirement[] = [
  {
    id: 'RN-001', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Exclusividad docente',
    descripcion: 'Un docente no podrá impartir dos sesiones diferentes en el mismo bloque horario.',
  },
  {
    id: 'RN-002', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Área común',
    descripcion: 'Un docente podrá atender simultáneamente grupos de distintas carreras únicamente cuando estén asociados a una misma sesión de área común.',
    contexto: ['Una sesión de área común se modela como una única sesión física (un docente, un aula, un bloque) compartida, bloqueando el slot en los horarios de todas las carreras involucradas.'],
  },
  {
    id: 'RN-003', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Exclusividad del aula',
    descripcion: 'Un aula no podrá asignarse a más de una sesión durante el mismo bloque.',
  },
  {
    id: 'RN-004', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Capacidad del aula',
    descripcion: 'La capacidad del aula deberá ser igual o superior a la cantidad estimada de estudiantes asignados.',
  },
  {
    id: 'RN-005', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Capacidad de área común',
    descripcion: 'En una sesión compartida se considerará la suma de estudiantes de todos los grupos participantes.',
    contexto: ['Se deriva de la definición de curso de área común: curso que se comparte entre varias carreras marcadas explícitamente para ello.'],
  },
  {
    id: 'RN-006', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Equipamiento',
    descripcion: 'Los cursos que requieran laboratorio deberán asignarse a un espacio con el equipamiento correspondiente.',
  },
  {
    id: 'RN-007', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Continuidad docente',
    descripcion: 'Un mismo docente deberá impartir todas las sesiones semanales de un curso para una carrera y grupo específicos.',
  },
  {
    id: 'RN-008', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Cobertura por jornada',
    descripcion: 'Cada jornada activa deberá incluir todos los cursos correspondientes al pensum y período aplicable.',
    contexto: ['El pensum completo de la carrera debe impartirse en cada jornada activa asociada a esa carrera.'],
  },
  {
    id: 'RN-009', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Disponibilidad docente',
    descripcion: 'Las sesiones deberán asignarse considerándose la disponibilidad registrada por el docente.',
    contexto: ['Es el primer nivel de prioridad entre las restricciones blandas: disponibilidad respetada y bloques consecutivos del mismo curso juntos.'],
  },
  {
    id: 'RN-010', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Carga docente',
    descripcion: 'La cantidad de cursos asignados deberá respetar los límites configurados para cada docente.',
    contexto: ['Valores de referencia originales: carga máxima típica 4-6 cursos, carga mínima típica 1.'],
  },
  {
    id: 'RN-011', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Secciones autorizadas',
    descripcion: 'El sistema no podrá crear automáticamente una sección; únicamente podrá sugerir su apertura.',
    contexto: ['La autorización de abrir una nueva sección es responsabilidad exclusiva del administrador.'],
  },
  {
    id: 'RN-012', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Horarios publicados',
    descripcion: 'Todo cambio realizado después de la publicación deberá producir una nueva versión y quedar auditado.',
    contexto: ['Un horario publicado es inmutable en su estructura; los cambios posteriores se registran como sustituciones, no como edición directa.'],
  },
  {
    id: 'RN-013', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Desplazamiento',
    descripcion: 'Se procurará minimizar la distancia entre aulas utilizadas consecutivamente por un mismo grupo.',
  },
  {
    id: 'RN-014', categoria: 'RN', seccion: 'Reglas de negocio', titulo: 'Distribución docente',
    descripcion: 'El sistema procurará equilibrar la carga docente considerando los niveles de prioridad configurados.',
    contexto: ['Cuarto y último nivel de prioridad entre las restricciones blandas: balance de carga entre docentes.'],
  },
];

const rnf: Requirement[] = [
  // 6.1 Rendimiento
  {
    id: 'RNF-001', categoria: 'RNF', seccion: '6.1 Rendimiento', titulo: 'Tiempo de generación',
    descripcion: 'Para los datos de prueba definidos para el proyecto, el sistema deberá generar una propuesta de horario en un máximo de un minuto.',
    contexto: ['Meta original: menos de 2 minutos para una instancia de hasta ~900 sesiones (más holgada que el 1 minuto aquí simplificado).'],
  },
  {
    id: 'RNF-002', categoria: 'RNF', seccion: '6.1 Rendimiento', titulo: 'Tiempo de respuesta',
    descripcion: 'Las operaciones normales de consulta deberán responder en un máximo de tres segundos bajo condiciones habituales.',
    contexto: ['Metas originales, más estrictas: páginas web <2s en percentil 95; consultas CRUD a base de datos <200ms.'],
  },
  {
    id: 'RNF-003', categoria: 'RNF', seccion: '6.1 Rendimiento', titulo: 'Usuarios concurrentes',
    descripcion: 'El sistema deberá soportar hasta 500 usuarios concurrentes en operaciones de consulta.',
    contexto: [
      'Capacidad de datos de referencia: 30 carreras, 100 cohortes activas, 200 docentes, 50 aulas, 1500 sesiones por periodo.',
    ],
  },

  // 6.2 Seguridad
  {
    id: 'RNF-004', categoria: 'RNF', seccion: '6.2 Seguridad', titulo: 'Autenticación',
    descripcion: 'Las funciones privadas deberán estar disponibles únicamente para usuarios autenticados.',
    contexto: ['Autenticación basada en credenciales, con una sesión temporal que identifica al usuario.'],
  },
  {
    id: 'RNF-005', categoria: 'RNF', seccion: '6.2 Seguridad', titulo: 'Autorización',
    descripcion: 'Cada operación deberá validar los permisos correspondientes al rol del usuario.',
    contexto: [
      'Cada operación del sistema valida el rol del usuario antes de permitirse.',
      'Docentes y alumnos no pueden modificar horarios bajo ninguna circunstancia.',
    ],
  },
  {
    id: 'RNF-006', categoria: 'RNF', seccion: '6.2 Seguridad', titulo: 'Protección de contraseñas',
    descripcion: 'Las contraseñas deberán almacenarse mediante mecanismos seguros de cifrado irreversible.',
    contexto: ['Se usa un método de cifrado irreversible estándar de la industria.'],
  },
  {
    id: 'RNF-007', categoria: 'RNF', seccion: '6.2 Seguridad', titulo: 'Comunicación segura',
    descripcion: 'La comunicación entre el navegador y el servidor deberá utilizar una conexión cifrada.',
    contexto: ['Referencia técnica original: conexión cifrada estándar de navegación segura (candado del navegador).'],
  },
  {
    id: 'RNF-008', categoria: 'RNF', seccion: '6.2 Seguridad', titulo: 'Auditoría',
    descripcion: 'Las modificaciones de usuarios, configuraciones, horarios y sustituciones deberán registrar usuario, fecha, hora y operación realizada.',
    contexto: ['El sistema debe protegerse además contra ataques comunes de aplicaciones web que buscan robar datos o suplantar acciones de un usuario.'],
  },

  // 6.3 Usabilidad
  {
    id: 'RNF-009', categoria: 'RNF', seccion: '6.3 Usabilidad', titulo: 'Aplicación web',
    descripcion: 'El sistema deberá funcionar desde un navegador web sin requerir instalación en el dispositivo del usuario.',
    contexto: ['La interfaz debe ser responsive: escritorio, tablet y móvil.'],
  },
  {
    id: 'RNF-010', categoria: 'RNF', seccion: '6.3 Usabilidad', titulo: 'Compatibilidad',
    descripcion: 'La interfaz deberá funcionar correctamente en versiones recientes de Chrome, Edge y Firefox.',
    contexto: ['Alcance original: dos últimas versiones estables de Chrome, Firefox, Edge y también Safari.'],
  },
  {
    id: 'RNF-011', categoria: 'RNF', seccion: '6.3 Usabilidad', titulo: 'Claridad de conflictos',
    descripcion: 'Los conflictos deberán presentarse con mensajes comprensibles, indicando el recurso, día, bloque y causa.',
    contexto: [
      'La edición drag-and-drop debe dar feedback visual de conflictos en tiempo real.',
      'Los mensajes de error deben ser claros, en lenguaje natural, indicando la acción correctiva cuando aplique.',
    ],
  },

  // 6.4 Confiabilidad y mantenimiento
  {
    id: 'RNF-012', categoria: 'RNF', seccion: '6.4 Confiabilidad y mantenimiento', titulo: 'Integridad',
    descripcion: 'Las operaciones deberán mantener la consistencia de los datos aun cuando una acción no pueda completarse.',
  },
  {
    id: 'RNF-013', categoria: 'RNF', seccion: '6.4 Confiabilidad y mantenimiento', titulo: 'Recuperación',
    descripcion: 'El sistema deberá permitir realizar respaldos y restaurar la información almacenada.',
    contexto: [
      'Disponibilidad mínima objetivo: 99% durante el periodo académico activo.',
      'Backups automáticos diarios con retención mínima de 30 días.',
      'Ante una caída, el sistema se restablece en menos de 30 minutos, con una pérdida máxima de datos de 24 horas.',
    ],
  },
  {
    id: 'RNF-015', categoria: 'RNF', seccion: '6.4 Confiabilidad y mantenimiento', titulo: 'Parametrización',
    descripcion: 'Los límites, prioridades y capacidades deberán poder modificarse sin cambiar el código fuente.',
    contexto: [
      'La configuración sensible (accesos, claves, parámetros del algoritmo) se gestiona por fuera del código fuente.',
      'El sistema debe poder desplegarse en un proveedor de nube externo o en infraestructura propia de la institución.',
    ],
  },
];

const ca: Requirement[] = [
  { id: 'CA-1', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Horario completo', descripcion: 'El sistema genera un horario completo con los datos de prueba.' },
  { id: 'CA-2', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Sin conflictos', descripcion: 'El horario generado no contiene conflictos de docentes, aulas, capacidad o laboratorios.' },
  { id: 'CA-3', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Respeto a restricciones', descripcion: 'El sistema respeta las jornadas, pensum y disponibilidad registrada.' },
  { id: 'CA-4', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Versionado', descripcion: 'El sistema mantiene versiones de los horarios modificados.' },
  { id: 'CA-5', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Publicación por rol', descripcion: 'Los horarios pueden publicarse y consultarse según el rol del usuario.' },
  { id: 'CA-6', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Ausencias y sustitutos', descripcion: 'El sistema permite registrar ausencias y asignar sustitutos válidos.' },
  { id: 'CA-7', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Exportación', descripcion: 'Los horarios pueden exportarse correctamente a PDF y Excel.' },
  { id: 'CA-8', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Restricción por rol', descripcion: 'Las funciones quedan restringidas según el rol del usuario.' },
  { id: 'CA-9', categoria: 'CA', seccion: 'Criterios generales de aceptación', titulo: 'Tiempo de generación', descripcion: 'La generación se completa dentro del tiempo establecido para los datos de prueba.' },
];

export const REQUIREMENTS: Requirement[] = [...rf, ...rn, ...rnf, ...ca];

export const CATEGORY_META: Record<RequirementCategory, { label: string; corto: string }> = {
  RF: { label: 'Requerimientos funcionales', corto: 'RF' },
  RN: { label: 'Reglas de negocio', corto: 'RN' },
  RNF: { label: 'Requerimientos no funcionales', corto: 'RNF' },
  CA: { label: 'Criterios de aceptación', corto: 'CA' },
};

export function seccionesPorCategoria(categoria: RequirementCategory): Seccion[] {
  const items = REQUIREMENTS.filter((r) => r.categoria === categoria);
  const orden: string[] = [];
  const map = new Map<string, Requirement[]>();
  for (const item of items) {
    if (!map.has(item.seccion)) {
      map.set(item.seccion, []);
      orden.push(item.seccion);
    }
    map.get(item.seccion)!.push(item);
  }
  return orden.map((nombre) => ({ nombre, items: map.get(nombre)! }));
}
