// GENERADO — no editar a mano.
// Fuente: docs/database.sql · script: scripts/gen-catalogo.py
// 615 objetos · el catálogo del script sin los objetos del motor

export type CategoriaId =
  | 'tabla'
  | 'tipo'
  | 'vista'
  | 'funcion'
  | 'trigger'
  | 'restriccion'
  | 'fk'
  | 'indice'
  | 'rls'
  | 'base';

export interface Parametro {
  /** Nombre del parámetro; por convención del proyecto empieza por `p_`. */
  n: string;
  t: string;
  /** Valor por defecto. Vacío si el parámetro es obligatorio. */
  d: string;
}

export interface Objeto {
  id: string;
  /** Nombre tal como aparece en el script. */
  nombre: string;
  cat: CategoriaId;
  /** Subcategoría legible: es el encabezado del índice. */
  grupo: string;
  /** Qué hace, en una línea. */
  desc: string;
  /** Matiz o consecuencia; solo lo llevan los objetos que lo necesitan. */
  detalle: string;
  /** Ficha técnica corta derivada del propio SQL. */
  nota: string;
  /** Tabla a la que pertenece, si aplica. */
  tabla: string;
  /** Línea donde empieza en docs/database.sql. */
  linea: number;
  /** Términos extra que hacen que la búsqueda lo encuentre. */
  claves: string;
  /** Parámetros que acepta, solo en las funciones. */
  params: Parametro[];
  /** La lógica que sigue, paso a paso. Solo en las funciones. */
  pasos: string[];
  sql: string;
}

export interface Categoria {
  id: CategoriaId;
  label: string;
  color: string;
  n: number;
}

export const CATEGORIAS: Categoria[] = [
  { id: 'tabla', label: 'Tablas', color: '#3f6fd6', n: 48 },
  { id: 'tipo', label: 'Tipos ENUM', color: '#0f8a94', n: 20 },
  { id: 'vista', label: 'Vistas', color: '#2a9468', n: 8 },
  { id: 'funcion', label: 'Funciones', color: '#8b52d9', n: 46 },
  { id: 'trigger', label: 'Triggers', color: '#b5791b', n: 38 },
  { id: 'restriccion', label: 'Llaves y restricciones', color: '#c2504b', n: 61 },
  { id: 'fk', label: 'Claves foráneas', color: '#a1568c', n: 91 },
  { id: 'indice', label: 'Índices', color: '#5a6474', n: 40 },
  { id: 'rls', label: 'Seguridad por fila', color: '#3a3229', n: 256 },
  { id: 'base', label: 'Preámbulo', color: '#8c8171', n: 7 },
];

export const OBJETOS: Objeto[] = [
  {
    id: 'tabla-agrupacion_area_comun_cohortes',
    nombre: 'agrupacion_area_comun_cohortes',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Puente N:M. Cohortes que asisten juntas a una agrupación de área común.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 3513,
    claves: 'agrupacion_id cohorte_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.agrupacion_area_comun_cohortes (
    agrupacion_id uuid NOT NULL,
    cohorte_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-agrupacion_area_comun_cursos',
    nombre: 'agrupacion_area_comun_cursos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Puente N:M. Cursos que integran una agrupación de área común.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 3523,
    claves: 'agrupacion_id curso_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.agrupacion_area_comun_cursos (
    agrupacion_id uuid NOT NULL,
    curso_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-agrupaciones_area_comun',
    nombre: 'agrupaciones_area_comun',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Cabecera de un área común: el curso principal que varias cohortes toman juntas en un período.',
    detalle: '',
    nota: '10 columnas · borrado lógico · bloqueo optimista',
    tabla: 'agrupaciones_area_comun',
    linea: 3533,
    claves: 'id periodo_id nombre curso_principal_id creada_por_id creada_en actualizado_en esta_activa eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.agrupaciones_area_comun (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    periodo_id uuid NOT NULL,
    nombre character varying(150) NOT NULL,
    curso_principal_id uuid,
    creada_por_id uuid,
    creada_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL
);`,
  },
  {
    id: 'tabla-carrera_jornadas',
    nombre: 'carrera_jornadas',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Puente N:M. En qué jornadas se imparte cada carrera.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'carrera_jornadas',
    linea: 3940,
    claves: 'carrera_id jornada_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.carrera_jornadas (
    carrera_id uuid NOT NULL,
    jornada_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-carreras',
    nombre: 'carreras',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Carreras de cada facultad, con código, nivel académico y duración en semestres. Esa duración es la que valida que una cohorte no pase de su último semestre.',
    detalle: '',
    nota: '14 columnas · borrado lógico · bloqueo optimista',
    tabla: 'carreras',
    linea: 3668,
    claves: 'id facultad_id codigo nombre nivel_academico duracion_en_semestres esta_activa creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.carreras (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    facultad_id uuid NOT NULL,
    codigo character varying(20) NOT NULL,
    nombre character varying(150) NOT NULL,
    nivel_academico character varying(50) NOT NULL,
    duracion_en_semestres integer NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT carreras_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT carreras_duracion_en_semestres_check CHECK ((duracion_en_semestres > 0)),
    CONSTRAINT carreras_nombre_check CHECK ((length(TRIM(BOTH FROM nombre)) > 0))
);`,
  },
  {
    id: 'tabla-cohorte_periodos',
    nombre: 'cohorte_periodos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Qué cohortes están activas en cada período, en qué semestre va cada una y con cuánta matrícula.',
    detalle: '',
    nota: '12 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cohorte_periodos',
    linea: 3610,
    claves: 'id cohorte_id periodo_id semestre_asignado matricula_estimada esta_activa creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.cohorte_periodos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    cohorte_id uuid NOT NULL,
    periodo_id uuid NOT NULL,
    semestre_asignado integer NOT NULL,
    matricula_estimada integer NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT cohorte_periodos_matricula_estimada_check CHECK ((matricula_estimada >= 0)),
    CONSTRAINT cohorte_periodos_semestre_asignado_check CHECK ((semestre_asignado > 0))
);`,
  },
  {
    id: 'tabla-cohortes',
    nombre: 'cohortes',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Grupos de estudiantes: carrera + pensum + jornada + año de ingreso + sección, con su matrícula estimada y su estado.',
    detalle: '',
    nota: '15 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cohortes',
    linea: 3630,
    claves: 'id carrera_id pensum_id jornada_id anio_ingreso seccion matricula_estimada estado creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.cohortes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    carrera_id uuid NOT NULL,
    pensum_id uuid NOT NULL,
    jornada_id uuid NOT NULL,
    anio_ingreso integer NOT NULL,
    seccion character varying(20) NOT NULL,
    matricula_estimada integer NOT NULL,
    estado horarios.estado_cohorte DEFAULT 'activa'::horarios.estado_cohorte NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT cohortes_anio_ingreso_check CHECK ((anio_ingreso >= 1900)),
    CONSTRAINT cohortes_matricula_estimada_check CHECK ((matricula_estimada >= 0)),
    CONSTRAINT cohortes_seccion_check CHECK ((length(TRIM(BOTH FROM seccion)) > 0))
);`,
  },
  {
    id: 'tabla-curso_carreras_compartidas',
    nombre: 'curso_carreras_compartidas',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Puente N:M. Carreras que comparten un mismo curso; es la base para agrupar el área común.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'curso_carreras_compartidas',
    linea: 4006,
    claves: 'curso_id carrera_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.curso_carreras_compartidas (
    curso_id uuid NOT NULL,
    carrera_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-cursos',
    nombre: 'cursos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Catálogo de materias: código, nombre, si exige laboratorio y si es de área común.',
    detalle: '',
    nota: '13 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cursos',
    linea: 3690,
    claves: 'id codigo nombre requiere_laboratorio tipo_laboratorio_requerido es_area_comun creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.cursos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(30) NOT NULL,
    nombre character varying(180) NOT NULL,
    requiere_laboratorio boolean DEFAULT false NOT NULL,
    tipo_laboratorio_requerido character varying(80),
    es_area_comun boolean DEFAULT false NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT cursos_check CHECK ((requiere_laboratorio OR (tipo_laboratorio_requerido IS NULL))),
    CONSTRAINT cursos_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT cursos_nombre_check CHECK ((length(TRIM(BOTH FROM nombre)) > 0))
);`,
  },
  {
    id: 'tabla-cursos_en_pensum',
    nombre: 'cursos_en_pensum',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'La malla curricular: qué curso va en qué semestre de qué pensum, cuántos bloques semanales exige y si los prefiere consecutivos.',
    detalle: '',
    nota: '14 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cursos_en_pensum',
    linea: 3711,
    claves: 'id pensum_id curso_id semestre_asignado bloques_semanales_exactos prefiere_bloques_consecutivos creado_en actualizado_en eliminado_en version_fila duracion_slots CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.cursos_en_pensum (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    pensum_id uuid NOT NULL,
    curso_id uuid NOT NULL,
    semestre_asignado integer NOT NULL,
    bloques_semanales_exactos integer NOT NULL,
    prefiere_bloques_consecutivos boolean DEFAULT false NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    duracion_slots integer DEFAULT 1 NOT NULL,
    CONSTRAINT cursos_en_pensum_bloques_semanales_exactos_check CHECK ((bloques_semanales_exactos > 0)),
    CONSTRAINT cursos_en_pensum_duracion_slots_check CHECK ((duracion_slots > 0)),
    CONSTRAINT cursos_en_pensum_semestre_asignado_check CHECK ((semestre_asignado > 0))
);`,
  },
  {
    id: 'tabla-facultades',
    nombre: 'facultades',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Facultades de la universidad. Es la raíz del alcance: a un usuario se le asignan facultades y solo ve lo que cuelga de ellas.',
    detalle: '',
    nota: '11 columnas · borrado lógico · bloqueo optimista',
    tabla: 'facultades',
    linea: 4119,
    claves: 'id codigo nombre nombre_decano esta_activa creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.facultades (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(20) NOT NULL,
    nombre character varying(150) NOT NULL,
    nombre_decano character varying(200),
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT facultades_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT facultades_nombre_check CHECK ((length(TRIM(BOTH FROM nombre)) > 0))
);`,
  },
  {
    id: 'tabla-jornada_descansos',
    nombre: 'jornada_descansos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Recesos concretos dentro de una jornada, por día y rango de bloques. Una restricción de exclusión impide que dos se pisen.',
    detalle: '',
    nota: '8 columnas · columnas generadas',
    tabla: 'jornada_descansos',
    linea: 4249,
    claves: 'id jornada_id dia indice_slot_inicio duracion_slots rango_slots CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.jornada_descansos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    jornada_id uuid NOT NULL,
    dia horarios.dia_semana NOT NULL,
    indice_slot_inicio integer NOT NULL,
    duracion_slots integer NOT NULL,
    rango_slots int4range GENERATED ALWAYS AS (int4range(indice_slot_inicio, (indice_slot_inicio + duracion_slots), '[)'::text)) STORED,
    CONSTRAINT jornada_descansos_duracion_slots_check CHECK ((duracion_slots > 0)),
    CONSTRAINT jornada_descansos_indice_slot_inicio_check CHECK ((indice_slot_inicio > 0))
);`,
  },
  {
    id: 'tabla-jornadas',
    nombre: 'jornadas',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Matutina, vespertina…: días activos, hora de inicio y fin, duración del bloque, bloques por día y el receso (después de qué bloque y cuántos minutos).',
    detalle: '',
    nota: '20 columnas · borrado lógico · bloqueo optimista',
    tabla: 'jornadas',
    linea: 4265,
    claves: 'id nombre dias_activos hora_inicio hora_fin duracion_bloque_minutos bloques_por_dia receso_despues_bloque duracion_receso_minutos esta_activa creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.jornadas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(100) NOT NULL,
    dias_activos horarios.dia_semana[] NOT NULL,
    hora_inicio time without time zone NOT NULL,
    hora_fin time without time zone NOT NULL,
    duracion_bloque_minutos integer NOT NULL,
    bloques_por_dia integer NOT NULL,
    receso_despues_bloque integer DEFAULT 0 NOT NULL,
    duracion_receso_minutos integer DEFAULT 0 NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT jornadas_bloques_por_dia_check CHECK ((bloques_por_dia > 0)),
    CONSTRAINT jornadas_check CHECK ((hora_fin > hora_inicio)),
    CONSTRAINT jornadas_check1 CHECK (((((bloques_por_dia * duracion_bloque_minutos) + duracion_receso_minutos))::numeric <= (EXTRACT(epoch FROM (hora_fin - hora_inicio)) / (60)::numeric))),
    CONSTRAINT jornadas_dias_activos_check CHECK ((cardinality(dias_activos) > 0)),
    CONSTRAINT jornadas_duracion_bloque_minutos_check CHECK ((duracion_bloque_minutos > 0)),
    CONSTRAINT jornadas_receso_check CHECK ((((duracion_receso_minutos = 0) AND (receso_despues_bloque = 0)) OR ((duracion_receso_minutos > 0) AND (receso_despues_bloque > 0) AND (receso_despues_bloque < bloques_por_dia))))
);`,
  },
  {
    id: 'tabla-pensums',
    nombre: 'pensums',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Planes de estudio de una carrera, uno por año de creación, con su estado (borrador, vigente, en retiro, archivado).',
    detalle: '',
    nota: '9 columnas · borrado lógico · bloqueo optimista',
    tabla: 'pensums',
    linea: 3733,
    claves: 'id carrera_id anio_creacion estado fecha_creacion actualizado_en eliminado_en version_fila CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.pensums (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    carrera_id uuid NOT NULL,
    anio_creacion integer NOT NULL,
    estado horarios.estado_pensum DEFAULT 'borrador'::horarios.estado_pensum NOT NULL,
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT pensums_anio_creacion_check CHECK ((anio_creacion >= 1900))
);`,
  },
  {
    id: 'tabla-periodos_academicos',
    nombre: 'periodos_academicos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Semestres o cuatrimestres: nombre, fecha de inicio y fin, y estado del período.',
    detalle: '',
    nota: '10 columnas · borrado lógico · bloqueo optimista',
    tabla: 'periodos_academicos',
    linea: 4329,
    claves: 'id nombre fecha_inicio fecha_fin estado creado_en actualizado_en eliminado_en version_fila CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.periodos_academicos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(150) NOT NULL,
    fecha_inicio date NOT NULL,
    fecha_fin date NOT NULL,
    estado horarios.estado_periodo DEFAULT 'borrador'::horarios.estado_periodo NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT periodos_academicos_check CHECK ((fecha_fin >= fecha_inicio))
);`,
  },
  {
    id: 'tabla-aula_recursos',
    nombre: 'aula_recursos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Puente N:M con cantidad. Qué recursos tiene cada aula y cuántos.',
    detalle: '',
    nota: '4 columnas',
    tabla: 'aula_recursos',
    linea: 3791,
    claves: 'aula_id recurso_id cantidad CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.aula_recursos (
    aula_id uuid NOT NULL,
    recurso_id uuid NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    CONSTRAINT aula_recursos_cantidad_check CHECK ((cantidad > 0))
);`,
  },
  {
    id: 'tabla-aulas',
    nombre: 'aulas',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Salones: código, capacidad máxima, tipo (teórica, laboratorio, mixta, virtual), piso, número y equipamiento especial.',
    detalle: '',
    nota: '18 columnas · borrado lógico · bloqueo optimista',
    tabla: 'aulas',
    linea: 3899,
    claves: 'id codigo capacidad_maxima tipo tipo_laboratorio_disponible piso numero_aula posicion_x posicion_y equipamiento_especial esta_activa creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.aulas (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(30) NOT NULL,
    capacidad_maxima integer NOT NULL,
    tipo horarios.tipo_aula NOT NULL,
    tipo_laboratorio_disponible character varying(80),
    piso integer DEFAULT 1 NOT NULL,
    numero_aula integer NOT NULL,
    posicion_x integer DEFAULT 0 NOT NULL,
    posicion_y integer DEFAULT 0 NOT NULL,
    equipamiento_especial jsonb DEFAULT '[]'::jsonb NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT aulas_capacidad_maxima_check CHECK ((capacidad_maxima > 0)),
    CONSTRAINT aulas_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT aulas_equipamiento_especial_check CHECK ((jsonb_typeof(equipamiento_especial) = 'array'::text))
);`,
  },
  {
    id: 'tabla-curso_recursos_requeridos',
    nombre: 'curso_recursos_requeridos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Puente N:M con cantidad. Qué recursos exige un curso: solo puede ocupar aulas que los tengan.',
    detalle: '',
    nota: '4 columnas',
    tabla: 'curso_recursos_requeridos',
    linea: 4016,
    claves: 'curso_id recurso_id cantidad CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.curso_recursos_requeridos (
    curso_id uuid NOT NULL,
    recurso_id uuid NOT NULL,
    cantidad integer DEFAULT 1 NOT NULL,
    CONSTRAINT curso_recursos_requeridos_cantidad_check CHECK ((cantidad > 0))
);`,
  },
  {
    id: 'tabla-recursos',
    nombre: 'recursos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Catálogo de recursos físicos: proyector, laboratorio de cómputo, etc.',
    detalle: '',
    nota: '11 columnas · borrado lógico · bloqueo optimista',
    tabla: 'recursos',
    linea: 3803,
    claves: 'id codigo nombre descripcion esta_activo creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.recursos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(40) NOT NULL,
    nombre character varying(120) NOT NULL,
    descripcion text,
    esta_activo boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT recursos_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT recursos_nombre_check CHECK ((length(TRIM(BOTH FROM nombre)) > 0))
);`,
  },
  {
    id: 'tabla-cambios_detectados',
    nombre: 'cambios_detectados',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Diferencias campo a campo entre una versión y la anterior: qué cambió, de qué valor a qué valor.',
    detalle: '',
    nota: '7 columnas',
    tabla: 'cambios_detectados',
    linea: 3925,
    claves: 'id version_horario_id sesion_id campo_modificado valor_anterior valor_nuevo creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.cambios_detectados (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    version_horario_id uuid,
    sesion_id uuid NOT NULL,
    campo_modificado character varying(100) NOT NULL,
    valor_anterior text,
    valor_nuevo text,
    creado_en timestamp with time zone DEFAULT now() NOT NULL
);`,
  },
  {
    id: 'tabla-conflicto_sesiones',
    nombre: 'conflicto_sesiones',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Puente N:M. Qué sesiones participan en cada conflicto.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'conflicto_sesiones',
    linea: 3981,
    claves: 'conflicto_id sesion_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.conflicto_sesiones (
    conflicto_id uuid NOT NULL,
    sesion_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-conflictos',
    nombre: 'conflictos',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Choques detectados en un horario, con tipo, severidad y si rompe una restricción dura.',
    detalle: '',
    nota: '7 columnas',
    tabla: 'conflictos',
    linea: 3991,
    claves: 'id horario_id tipo descripcion severidad es_restriccion_dura creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.conflictos (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    horario_id uuid NOT NULL,
    tipo character varying(100) NOT NULL,
    descripcion text NOT NULL,
    severidad horarios.nivel_severidad NOT NULL,
    es_restriccion_dura boolean NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL
);`,
  },
  {
    id: 'tabla-historial_estados_horario',
    nombre: 'historial_estados_horario',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Bitácora de transiciones de estado de un horario: de qué estado a cuál, quién y por qué.',
    detalle: '',
    nota: '9 columnas',
    tabla: 'historial_estados_horario',
    linea: 4181,
    claves: 'id horario_id estado_anterior estado_nuevo cambiado_por_id motivo cambiado_en CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.historial_estados_horario (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    horario_id uuid NOT NULL,
    estado_anterior horarios.estado_horario,
    estado_nuevo horarios.estado_horario NOT NULL,
    cambiado_por_id uuid,
    motivo text NOT NULL,
    cambiado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT historial_estados_horario_check CHECK (((estado_anterior IS NULL) OR (estado_anterior <> estado_nuevo))),
    CONSTRAINT historial_estados_horario_motivo_check CHECK ((length(TRIM(BOTH FROM motivo)) > 0))
);`,
  },
  {
    id: 'tabla-horarios',
    nombre: 'horarios',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Cabecera de un plan de horario: período, tipo (clases o exámenes), versión, estado, quién lo generó, aprobó y publicó, costo y violaciones duras.',
    detalle: '',
    nota: '26 columnas · borrado lógico · bloqueo optimista',
    tabla: 'horarios',
    linea: 4198,
    claves: 'id periodo_id tipo_plan horario_origen_id numero_version estado fecha_generacion fecha_aprobacion fecha_publicacion costo_total_calculado cantidad_violaciones_duras configuracion_plan generado_por_id aprobado_por_id publicado_por_id motivo_estado creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.horarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    periodo_id uuid NOT NULL,
    tipo_plan horarios.tipo_plan_horario DEFAULT 'clases'::horarios.tipo_plan_horario NOT NULL,
    horario_origen_id uuid,
    numero_version integer NOT NULL,
    estado horarios.estado_horario DEFAULT 'borrador'::horarios.estado_horario NOT NULL,
    fecha_generacion timestamp with time zone,
    fecha_aprobacion timestamp with time zone,
    fecha_publicacion timestamp with time zone,
    costo_total_calculado numeric(14,4) DEFAULT 0 NOT NULL,
    cantidad_violaciones_duras integer DEFAULT 0 NOT NULL,
    configuracion_plan jsonb DEFAULT '{}'::jsonb NOT NULL,
    generado_por_id uuid,
    aprobado_por_id uuid,
    publicado_por_id uuid,
    motivo_estado text,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT horarios_cantidad_violaciones_duras_check CHECK ((cantidad_violaciones_duras >= 0)),
    CONSTRAINT horarios_check CHECK (((horario_origen_id IS NULL) OR (horario_origen_id <> id))),
    CONSTRAINT horarios_check1 CHECK (((fecha_aprobacion IS NULL) OR (fecha_generacion IS NULL) OR (fecha_aprobacion >= fecha_generacion))),
    CONSTRAINT horarios_check2 CHECK (((fecha_publicacion IS NULL) OR ((fecha_aprobacion IS NOT NULL) AND (fecha_publicacion >= fecha_aprobacion)))),
    CONSTRAINT horarios_configuracion_plan_check CHECK ((jsonb_typeof(configuracion_plan) = 'object'::text)),
    CONSTRAINT horarios_numero_version_check CHECK ((numero_version > 0))
);`,
  },
  {
    id: 'tabla-resultado_edicion_conflictos',
    nombre: 'resultado_edicion_conflictos',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Puente N:M. Conflictos que dejó una edición manual.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'resultado_edicion_conflictos',
    linea: 4454,
    claves: 'resultado_edicion_id conflicto_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.resultado_edicion_conflictos (
    resultado_edicion_id uuid NOT NULL,
    conflicto_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-resultados_edicion',
    nombre: 'resultados_edicion',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Resultado de mover una sesión a mano: la solicitud, el vecindario recalculado, las sesiones movidas y el costo antes y después.',
    detalle: '',
    nota: '19 columnas · idempotencia',
    tabla: 'resultados_edicion',
    linea: 4464,
    claves: 'id horario_id horario_origen_id sesion_fijada_id fue_exitoso mensaje_resultado clave_solicitud solicitud_edicion sesiones_vecindario sesiones_movidas costo_antes costo_despues tiempo_reparacion_ms creado_por_id creado_en CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.resultados_edicion (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    horario_id uuid NOT NULL,
    horario_origen_id uuid,
    sesion_fijada_id uuid,
    fue_exitoso boolean NOT NULL,
    mensaje_resultado text NOT NULL,
    clave_solicitud character varying(120),
    solicitud_edicion jsonb DEFAULT '{}'::jsonb NOT NULL,
    sesiones_vecindario jsonb DEFAULT '[]'::jsonb NOT NULL,
    sesiones_movidas jsonb DEFAULT '[]'::jsonb NOT NULL,
    costo_antes numeric(14,4),
    costo_despues numeric(14,4),
    tiempo_reparacion_ms bigint,
    creado_por_id uuid,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT resultados_edicion_sesiones_movidas_check CHECK ((jsonb_typeof(sesiones_movidas) = 'array'::text)),
    CONSTRAINT resultados_edicion_sesiones_vecindario_check CHECK ((jsonb_typeof(sesiones_vecindario) = 'array'::text)),
    CONSTRAINT resultados_edicion_solicitud_edicion_check CHECK ((jsonb_typeof(solicitud_edicion) = 'object'::text)),
    CONSTRAINT resultados_edicion_tiempo_reparacion_ms_check CHECK (((tiempo_reparacion_ms IS NULL) OR (tiempo_reparacion_ms >= 0)))
);`,
  },
  {
    id: 'tabla-sesion_cohortes',
    nombre: 'sesion_cohortes',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Qué cohortes asisten a cada sesión. Repite día, bloques y minutos a propósito, para poder vigilar solapes por grupo y leer su horario sin joins.',
    detalle: '',
    nota: '18 columnas · columnas generadas',
    tabla: 'sesion_cohortes',
    linea: 4515,
    claves: 'sesion_id cohorte_id curso_en_pensum_id curso_visible_id horario_id fecha_sesion dia indice_slot_inicio duracion_slots rango_slots minuto_inicio_dia minuto_fin_dia rango_minutos CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.sesion_cohortes (
    sesion_id uuid NOT NULL,
    cohorte_id uuid NOT NULL,
    curso_en_pensum_id uuid NOT NULL,
    curso_visible_id uuid NOT NULL,
    horario_id uuid NOT NULL,
    fecha_sesion date,
    dia horarios.dia_semana NOT NULL,
    indice_slot_inicio integer NOT NULL,
    duracion_slots integer NOT NULL,
    rango_slots int4range GENERATED ALWAYS AS (int4range(indice_slot_inicio, (indice_slot_inicio + duracion_slots), '[)'::text)) STORED,
    minuto_inicio_dia integer NOT NULL,
    minuto_fin_dia integer NOT NULL,
    rango_minutos int4range GENERATED ALWAYS AS (int4range(minuto_inicio_dia, minuto_fin_dia, '[)'::text)) STORED,
    CONSTRAINT sesion_cohortes_check CHECK ((minuto_fin_dia > minuto_inicio_dia)),
    CONSTRAINT sesion_cohortes_duracion_slots_check CHECK ((duracion_slots > 0)),
    CONSTRAINT sesion_cohortes_indice_slot_inicio_check CHECK ((indice_slot_inicio > 0)),
    CONSTRAINT sesion_cohortes_minuto_fin_dia_check CHECK ((minuto_fin_dia <= 1440)),
    CONSTRAINT sesion_cohortes_minuto_inicio_dia_check CHECK ((minuto_inicio_dia >= 0))
);`,
  },
  {
    id: 'tabla-sesiones',
    nombre: 'sesiones',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Cada clase colocada en el calendario: horario, curso, docente, aula, jornada, día y bloques. Sus rangos son columnas generadas y tres restricciones de exclusión impiden solapes de docente, aula y cohorte.',
    detalle: '',
    nota: '25 columnas · columnas generadas',
    tabla: 'sesiones',
    linea: 4541,
    claves: 'id horario_id curso_id docente_id aula_id jornada_id fecha_sesion dia indice_slot_inicio duracion_slots rango_slots minuto_inicio_dia minuto_fin_dia rango_minutos esta_fijada es_area_comun agrupacion_area_comun_id creado_en actualizado_en CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.sesiones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    horario_id uuid NOT NULL,
    curso_id uuid NOT NULL,
    docente_id uuid NOT NULL,
    aula_id uuid NOT NULL,
    jornada_id uuid NOT NULL,
    fecha_sesion date,
    dia horarios.dia_semana NOT NULL,
    indice_slot_inicio integer NOT NULL,
    duracion_slots integer NOT NULL,
    rango_slots int4range GENERATED ALWAYS AS (int4range(indice_slot_inicio, (indice_slot_inicio + duracion_slots), '[)'::text)) STORED,
    minuto_inicio_dia integer NOT NULL,
    minuto_fin_dia integer NOT NULL,
    rango_minutos int4range GENERATED ALWAYS AS (int4range(minuto_inicio_dia, minuto_fin_dia, '[)'::text)) STORED,
    esta_fijada boolean DEFAULT false NOT NULL,
    es_area_comun boolean DEFAULT false NOT NULL,
    agrupacion_area_comun_id uuid,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT sesiones_check CHECK ((minuto_fin_dia > minuto_inicio_dia)),
    CONSTRAINT sesiones_check1 CHECK (((es_area_comun AND (agrupacion_area_comun_id IS NOT NULL)) OR ((NOT es_area_comun) AND (agrupacion_area_comun_id IS NULL)))),
    CONSTRAINT sesiones_duracion_slots_check CHECK ((duracion_slots > 0)),
    CONSTRAINT sesiones_indice_slot_inicio_check CHECK ((indice_slot_inicio > 0)),
    CONSTRAINT sesiones_minuto_fin_dia_check CHECK ((minuto_fin_dia <= 1440)),
    CONSTRAINT sesiones_minuto_inicio_dia_check CHECK ((minuto_inicio_dia >= 0))
);`,
  },
  {
    id: 'tabla-versiones_horario',
    nombre: 'versiones_horario',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Instantánea JSON de las sesiones de un horario, numerada, para historial y comparación.',
    detalle: '',
    nota: '9 columnas',
    tabla: 'versiones_horario',
    linea: 4654,
    claves: 'id horario_id numero_version fecha_creacion motivo_cambio creado_por_id instantanea_sesiones CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.versiones_horario (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    horario_id uuid NOT NULL,
    numero_version integer NOT NULL,
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    motivo_cambio text NOT NULL,
    creado_por_id uuid,
    instantanea_sesiones jsonb NOT NULL,
    CONSTRAINT versiones_horario_instantanea_sesiones_check CHECK ((jsonb_typeof(instantanea_sesiones) = ANY (ARRAY['array'::text, 'object'::text]))),
    CONSTRAINT versiones_horario_numero_version_check CHECK ((numero_version > 0))
);`,
  },
  {
    id: 'tabla-importacion_errores',
    nombre: 'importacion_errores',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Qué falló en una importación, con hoja, fila, columna, código de error y el valor recibido.',
    detalle: '',
    nota: '9 columnas',
    tabla: 'importacion_errores',
    linea: 4232,
    claves: 'id importacion_id hoja fila columna codigo_error mensaje valor_recibido CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.importacion_errores (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    importacion_id uuid NOT NULL,
    hoja character varying(120),
    fila integer,
    columna character varying(120),
    codigo_error character varying(80) NOT NULL,
    mensaje text NOT NULL,
    valor_recibido text,
    CONSTRAINT importacion_errores_fila_check CHECK (((fila IS NULL) OR (fila > 0)))
);`,
  },
  {
    id: 'tabla-importaciones',
    nombre: 'importaciones',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Cabecera de una carga masiva: archivo, hash, plantilla y versión, clave de idempotencia, estado y conteo de filas válidas e inválidas.',
    detalle: '',
    nota: '20 columnas · idempotencia',
    tabla: 'importaciones',
    linea: 3837,
    claves: 'id tipo_archivo nombre_archivo hash_archivo plantilla_id plantilla_version clave_solicitud estado total_filas filas_validas filas_invalidas solicitada_por_id creada_en finalizada_en resumen CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.importaciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tipo_archivo horarios.tipo_archivo_importacion NOT NULL,
    nombre_archivo character varying(255) NOT NULL,
    hash_archivo character varying(128) NOT NULL,
    plantilla_id uuid,
    plantilla_version character varying(50),
    clave_solicitud character varying(120),
    estado horarios.estado_importacion DEFAULT 'recibida'::horarios.estado_importacion NOT NULL,
    total_filas integer DEFAULT 0 NOT NULL,
    filas_validas integer DEFAULT 0 NOT NULL,
    filas_invalidas integer DEFAULT 0 NOT NULL,
    solicitada_por_id uuid,
    creada_en timestamp with time zone DEFAULT now() NOT NULL,
    finalizada_en timestamp with time zone,
    resumen jsonb DEFAULT '{}'::jsonb NOT NULL,
    CONSTRAINT importaciones_check CHECK (((filas_validas + filas_invalidas) <= total_filas)),
    CONSTRAINT importaciones_filas_invalidas_check CHECK ((filas_invalidas >= 0)),
    CONSTRAINT importaciones_filas_validas_check CHECK ((filas_validas >= 0)),
    CONSTRAINT importaciones_resumen_check CHECK ((jsonb_typeof(resumen) = 'object'::text)),
    CONSTRAINT importaciones_total_filas_check CHECK ((total_filas >= 0))
);`,
  },
  {
    id: 'tabla-plantillas_importacion',
    nombre: 'plantillas_importacion',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Formatos de archivo aceptados: código, versión, reglas de validación y si está vigente.',
    detalle: '',
    nota: '13 columnas',
    tabla: 'plantillas_importacion',
    linea: 4381,
    claves: 'id codigo version descripcion formatos_soportados reglas ruta_guia esta_vigente creado_en actualizado_en CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.plantillas_importacion (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo character varying(80) NOT NULL,
    version character varying(50) NOT NULL,
    descripcion text,
    formatos_soportados horarios.tipo_archivo_importacion[] NOT NULL,
    reglas jsonb DEFAULT '{}'::jsonb NOT NULL,
    ruta_guia text,
    esta_vigente boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT plantillas_importacion_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT plantillas_importacion_formatos_soportados_check CHECK ((cardinality(formatos_soportados) > 0)),
    CONSTRAINT plantillas_importacion_reglas_check CHECK ((jsonb_typeof(reglas) = 'object'::text))
);`,
  },
  {
    id: 'tabla-permisos_acceso',
    nombre: 'permisos_acceso',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Catálogo de permisos: el par (recurso, acción), por ejemplo (\'aulas\', \'crear\').',
    detalle: '',
    nota: '4 columnas',
    tabla: 'permisos_acceso',
    linea: 4347,
    claves: 'id recurso accion descripcion',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.permisos_acceso (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    recurso character varying(100) NOT NULL,
    accion horarios.accion_permiso NOT NULL,
    descripcion text
);`,
  },
  {
    id: 'tabla-rol_permisos',
    nombre: 'rol_permisos',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Puente N:M. Qué permisos concede cada rol.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'rol_permisos',
    linea: 4491,
    claves: 'rol_id permiso_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.rol_permisos (
    rol_id uuid NOT NULL,
    permiso_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-roles',
    nombre: 'roles',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Roles de acceso (coordinador, decano, docente…) con su descripción.',
    detalle: '',
    nota: '6 columnas · borrado lógico',
    tabla: 'roles',
    linea: 4501,
    claves: 'id nombre descripcion creado_en actualizado_en eliminado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone
);`,
  },
  {
    id: 'tabla-usuario_facultades',
    nombre: 'usuario_facultades',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Puente N:M. Qué facultades ve cada usuario. Es el alcance por facultad.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'usuario_facultades',
    linea: 4618,
    claves: 'usuario_id facultad_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.usuario_facultades (
    usuario_id uuid NOT NULL,
    facultad_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-usuario_roles',
    nombre: 'usuario_roles',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Puente N:M. Qué roles tiene cada usuario.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'usuario_roles',
    linea: 4628,
    claves: 'usuario_id rol_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.usuario_roles (
    usuario_id uuid NOT NULL,
    rol_id uuid NOT NULL
);`,
  },
  {
    id: 'tabla-usuarios',
    nombre: 'usuarios',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Usuarios del sistema. Enlaza con `auth.users` de Supabase por `auth_user_id` y puede apuntar al docente o a la cohorte de la persona.',
    detalle: '',
    nota: '16 columnas · borrado lógico · bloqueo optimista',
    tabla: 'usuarios',
    linea: 3570,
    claves: 'id auth_user_id tipo nombre_completo correo_institucional estado docente_id cohorte_id carnet fecha_creacion actualizado_en fecha_ultimo_acceso eliminado_en version_fila CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.usuarios (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    auth_user_id uuid,
    tipo horarios.tipo_usuario NOT NULL,
    nombre_completo character varying(200) NOT NULL,
    correo_institucional character varying(254) NOT NULL,
    estado horarios.estado_usuario DEFAULT 'activo'::horarios.estado_usuario NOT NULL,
    docente_id uuid,
    cohorte_id uuid,
    carnet character varying(50),
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    fecha_ultimo_acceso timestamp with time zone,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT usuarios_check CHECK ((((tipo = 'docente'::horarios.tipo_usuario) AND (docente_id IS NOT NULL) AND (cohorte_id IS NULL)) OR ((tipo = 'alumno'::horarios.tipo_usuario) AND (cohorte_id IS NOT NULL) AND (docente_id IS NULL)) OR ((tipo = ANY (ARRAY['superadministrador'::horarios.tipo_usuario, 'coordinador_academico'::horarios.tipo_usuario, 'decano'::horarios.tipo_usuario])) AND (docente_id IS NULL) AND (cohorte_id IS NULL)))),
    CONSTRAINT usuarios_correo_institucional_check CHECK (((correo_institucional)::text = lower(TRIM(BOTH FROM correo_institucional))))
);`,
  },
  {
    id: 'tabla-auditoria',
    nombre: 'auditoria',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Bitácora de auditoría: quién hizo qué sobre qué entidad, con los valores anteriores y nuevos, motivo, IP y navegador.',
    detalle: '',
    nota: '11 columnas',
    tabla: 'auditoria',
    linea: 3551,
    claves: 'id usuario_id fecha accion entidad entidad_id valores_anteriores valores_nuevos motivo direccion_ip user_agent',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.auditoria (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    usuario_id uuid,
    fecha timestamp with time zone DEFAULT now() NOT NULL,
    accion character varying(80) NOT NULL,
    entidad character varying(120) NOT NULL,
    entidad_id uuid,
    valores_anteriores jsonb,
    valores_nuevos jsonb,
    motivo text,
    direccion_ip inet,
    user_agent text
);`,
  },
  {
    id: 'tabla-notificaciones',
    nombre: 'notificaciones',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Avisos internos por destinatario, con plantilla, asunto, cuerpo, estado y clave de idempotencia.',
    detalle: '',
    nota: '11 columnas · idempotencia',
    tabla: 'notificaciones',
    linea: 4310,
    claves: 'id destinatario_id plantilla_id tipo_notificacion asunto mensaje_cuerpo canal_envio clave_solicitud fecha_creacion fecha_lectura estado',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.notificaciones (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    destinatario_id uuid NOT NULL,
    plantilla_id uuid,
    tipo_notificacion character varying(100) NOT NULL,
    asunto text NOT NULL,
    mensaje_cuerpo text NOT NULL,
    canal_envio horarios.canal_notificacion DEFAULT 'interno'::horarios.canal_notificacion NOT NULL,
    clave_solicitud character varying(120),
    fecha_creacion timestamp with time zone DEFAULT now() NOT NULL,
    fecha_lectura timestamp with time zone,
    estado horarios.estado_notificacion DEFAULT 'pendiente'::horarios.estado_notificacion NOT NULL
);`,
  },
  {
    id: 'tabla-plantillas_notificacion',
    nombre: 'plantillas_notificacion',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Plantillas de aviso: código, asunto, cuerpo y las variables que exige.',
    detalle: '',
    nota: '10 columnas',
    tabla: 'plantillas_notificacion',
    linea: 4402,
    claves: 'id codigo_plantilla plantilla_asunto plantilla_cuerpo variables_requeridas esta_activa creado_en actualizado_en CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.plantillas_notificacion (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    codigo_plantilla character varying(80) NOT NULL,
    plantilla_asunto text NOT NULL,
    plantilla_cuerpo text NOT NULL,
    variables_requeridas jsonb DEFAULT '[]'::jsonb NOT NULL,
    esta_activa boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT plantillas_notificacion_codigo_plantilla_check CHECK (((codigo_plantilla)::text = upper(TRIM(BOTH FROM codigo_plantilla)))),
    CONSTRAINT plantillas_notificacion_variables_requeridas_check CHECK ((jsonb_typeof(variables_requeridas) = 'array'::text))
);`,
  },
  {
    id: 'tabla-reportes',
    nombre: 'reportes',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Exportaciones generadas (PDF o XLSX): título, archivo, quién lo pidió y de qué horario o corrida salió.',
    detalle: '',
    nota: '11 columnas',
    tabla: 'reportes',
    linea: 4420,
    claves: 'id titulo formato nombre_archivo contenido_binario ruta_almacenamiento fecha_generacion generado_por_id horario_id generacion_id CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.reportes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    titulo character varying(200) NOT NULL,
    formato horarios.formato_reporte NOT NULL,
    nombre_archivo character varying(255) NOT NULL,
    contenido_binario bytea,
    ruta_almacenamiento text,
    fecha_generacion timestamp with time zone DEFAULT now() NOT NULL,
    generado_por_id uuid,
    horario_id uuid,
    generacion_id uuid,
    CONSTRAINT reportes_check CHECK (((contenido_binario IS NOT NULL) OR (ruta_almacenamiento IS NOT NULL)))
);`,
  },
  {
    id: 'tabla-asignaciones_docente_curso',
    nombre: 'asignaciones_docente_curso',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Autorizaciones: qué docente puede impartir qué curso, con alcance opcional por carrera, facultad o jornada. Se retiran marcando `esta_vigente = false`.',
    detalle: '',
    nota: '11 columnas · borrado lógico · bloqueo optimista',
    tabla: 'asignaciones_docente_curso',
    linea: 3880,
    claves: 'id docente_id curso_id carrera_id facultad_id jornada_id fecha_asignacion actualizado_en esta_vigente eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.asignaciones_docente_curso (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    docente_id uuid NOT NULL,
    curso_id uuid NOT NULL,
    carrera_id uuid,
    facultad_id uuid,
    jornada_id uuid,
    fecha_asignacion timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    esta_vigente boolean DEFAULT true NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL
);`,
  },
  {
    id: 'tabla-disponibilidad_docente_slots',
    nombre: 'disponibilidad_docente_slots',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'La disponibilidad expandida a bloques concretos (jornada, día, índice de bloque).',
    detalle: '',
    nota: '6 columnas',
    tabla: 'disponibilidad_docente_slots',
    linea: 4028,
    claves: 'disponibilidad_id jornada_id dia indice_slot esta_disponible CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.disponibilidad_docente_slots (
    disponibilidad_id uuid NOT NULL,
    jornada_id uuid NOT NULL,
    dia horarios.dia_semana NOT NULL,
    indice_slot integer NOT NULL,
    esta_disponible boolean DEFAULT true NOT NULL,
    CONSTRAINT disponibilidad_docente_slots_indice_slot_check CHECK ((indice_slot > 0))
);`,
  },
  {
    id: 'tabla-disponibilidades_docente',
    nombre: 'disponibilidades_docente',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Cabecera de la disponibilidad de un docente para un período, con la marca de confirmada. Una por docente y período.',
    detalle: '',
    nota: '6 columnas',
    tabla: 'disponibilidades_docente',
    linea: 4042,
    claves: 'id docente_id periodo_id fecha_registro esta_confirmada actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.disponibilidades_docente (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    docente_id uuid NOT NULL,
    periodo_id uuid NOT NULL,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    esta_confirmada boolean DEFAULT false NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL
);`,
  },
  {
    id: 'tabla-docentes',
    nombre: 'docentes',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Plantilla docente: código, nombre, correo, prioridad y carga mínima y máxima de cursos.',
    detalle: '',
    nota: '18 columnas · borrado lógico · bloqueo optimista',
    tabla: 'docentes',
    linea: 4056,
    claves: 'id facultad_id codigo nombre_completo correo telefono nivel_prioridad carga_minima_cursos carga_maxima_cursos esta_activo creado_en actualizado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.docentes (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    facultad_id uuid,
    codigo character varying(30) NOT NULL,
    nombre_completo character varying(200) NOT NULL,
    correo character varying(254) NOT NULL,
    telefono character varying(50),
    nivel_prioridad integer DEFAULT 0 NOT NULL,
    carga_minima_cursos integer DEFAULT 1 NOT NULL,
    carga_maxima_cursos integer DEFAULT 6 NOT NULL,
    esta_activo boolean DEFAULT true NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT docentes_carga_minima_cursos_check CHECK ((carga_minima_cursos >= 1)),
    CONSTRAINT docentes_check CHECK ((carga_maxima_cursos >= carga_minima_cursos)),
    CONSTRAINT docentes_codigo_check CHECK (((codigo)::text = upper(TRIM(BOTH FROM codigo)))),
    CONSTRAINT docentes_correo_check CHECK (((correo)::text = lower(TRIM(BOTH FROM correo))))
);`,
  },
  {
    id: 'tabla-eventos_sustitucion',
    nombre: 'eventos_sustitucion',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Ausencias, reemplazos, cancelaciones y recuperaciones sobre una sesión concreta, con sus fechas y el docente entrante.',
    detalle: '',
    nota: '29 columnas · borrado lógico · bloqueo optimista',
    tabla: 'eventos_sustitucion',
    linea: 4082,
    claves: 'id tipo sesion_afectada_id docente_original_id docente_entrante_id fecha_registro actualizado_en registrado_por_id motivo_evento estado fecha_inicio fecha_fin fecha_cambio fecha_ausencia fecha_recuperacion recuperacion_dia recuperacion_indice_slot_inicio recuperacion_duracion_slots fecha_cancelada motivo_anulacion anulado_en eliminado_en version_fila CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.eventos_sustitucion (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tipo horarios.tipo_evento_sustitucion NOT NULL,
    sesion_afectada_id uuid NOT NULL,
    docente_original_id uuid NOT NULL,
    docente_entrante_id uuid,
    fecha_registro timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    registrado_por_id uuid,
    motivo_evento text NOT NULL,
    estado horarios.estado_evento_sustitucion DEFAULT 'activo'::horarios.estado_evento_sustitucion NOT NULL,
    fecha_inicio date,
    fecha_fin date,
    fecha_cambio date,
    fecha_ausencia date,
    fecha_recuperacion date,
    recuperacion_dia horarios.dia_semana,
    recuperacion_indice_slot_inicio integer,
    recuperacion_duracion_slots integer,
    fecha_cancelada date,
    motivo_anulacion text,
    anulado_en timestamp with time zone,
    eliminado_en timestamp with time zone,
    version_fila bigint DEFAULT 0 NOT NULL,
    CONSTRAINT eventos_sustitucion_check CHECK (((docente_entrante_id IS NULL) OR (docente_entrante_id <> docente_original_id))),
    CONSTRAINT eventos_sustitucion_check1 CHECK (((fecha_fin IS NULL) OR (fecha_inicio IS NULL) OR (fecha_fin >= fecha_inicio))),
    CONSTRAINT eventos_sustitucion_check2 CHECK ((((tipo = 'sustitucion_temporal'::horarios.tipo_evento_sustitucion) AND (docente_entrante_id IS NOT NULL) AND (fecha_inicio IS NOT NULL) AND (fecha_fin IS NOT NULL)) OR ((tipo = 'sustitucion_permanente'::horarios.tipo_evento_sustitucion) AND (docente_entrante_id IS NOT NULL) AND (fecha_cambio IS NOT NULL)) OR ((tipo = 'permiso_ausencia'::horarios.tipo_evento_sustitucion) AND (fecha_ausencia IS NOT NULL)) OR ((tipo = 'cancelacion_sesion'::horarios.tipo_evento_sustitucion) AND (fecha_cancelada IS NOT NULL)))),
    CONSTRAINT eventos_sustitucion_motivo_evento_check CHECK ((length(TRIM(BOTH FROM motivo_evento)) > 0)),
    CONSTRAINT eventos_sustitucion_recuperacion_duracion_slots_check CHECK (((recuperacion_duracion_slots IS NULL) OR (recuperacion_duracion_slots > 0))),
    CONSTRAINT eventos_sustitucion_recuperacion_indice_slot_inicio_check CHECK (((recuperacion_indice_slot_inicio IS NULL) OR (recuperacion_indice_slot_inicio > 0)))
);`,
  },
  {
    id: 'tabla-ventanas_disponibilidad',
    nombre: 'ventanas_disponibilidad',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Ventana de captura por período: entre qué fechas los docentes pueden declarar su disponibilidad, y en qué estado está (programada, abierta, cerrada, cancelada).',
    detalle: '',
    nota: '8 columnas',
    tabla: 'ventanas_disponibilidad',
    linea: 4638,
    claves: 'id periodo_id fecha_apertura fecha_cierre estado creado_en actualizado_en CONSTRAINT',
    params: [],
    pasos: [],
    sql: `CREATE TABLE horarios.ventanas_disponibilidad (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    periodo_id uuid NOT NULL,
    fecha_apertura timestamp with time zone NOT NULL,
    fecha_cierre timestamp with time zone NOT NULL,
    estado horarios.estado_ventana_disponibilidad DEFAULT 'programada'::horarios.estado_ventana_disponibilidad NOT NULL,
    creado_en timestamp with time zone DEFAULT now() NOT NULL,
    actualizado_en timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT ventanas_disponibilidad_check CHECK ((fecha_cierre > fecha_apertura))
);`,
  },
  {
    id: 'tipo-estado_cohorte',
    nombre: 'estado_cohorte',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Ciclo de vida de un grupo: activa, inactiva, egresada, archivada.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 107,
    claves: 'activa inactiva egresada archivada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_cohorte AS ENUM (
    'activa',
    'inactiva',
    'egresada',
    'archivada'
);`,
  },
  {
    id: 'tipo-estado_evento_sustitucion',
    nombre: 'estado_evento_sustitucion',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de una sustitución: activo, anulado o finalizado.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '3 valores admitidos',
    tabla: '',
    linea: 119,
    claves: 'activo anulado finalizado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_evento_sustitucion AS ENUM (
    'activo',
    'anulado',
    'finalizado'
);`,
  },
  {
    id: 'tipo-estado_horario',
    nombre: 'estado_horario',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Ciclo de vida de un plan: borrador → generando → generado → en revisión → pendiente de aprobación → aprobado → publicado → archivado (más fallido e inviable).',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '10 valores admitidos',
    tabla: '',
    linea: 144,
    claves: 'borrador generando generado en_revision pendiente_aprobacion aprobado publicado archivado fallido inviable',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_horario AS ENUM (
    'borrador',
    'generando',
    'generado',
    'en_revision',
    'pendiente_aprobacion',
    'aprobado',
    'publicado',
    'archivado',
    'fallido',
    'inviable'
);`,
  },
  {
    id: 'tipo-estado_importacion',
    nombre: 'estado_importacion',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de una carga: recibida, validando, aplicada, rechazada o fallida.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '5 valores admitidos',
    tabla: '',
    linea: 162,
    claves: 'recibida validando aplicada rechazada fallida',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_importacion AS ENUM (
    'recibida',
    'validando',
    'aplicada',
    'rechazada',
    'fallida'
);`,
  },
  {
    id: 'tipo-estado_notificacion',
    nombre: 'estado_notificacion',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de un aviso: pendiente, enviada, leída o fallida.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 175,
    claves: 'pendiente enviada leida fallida',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_notificacion AS ENUM (
    'pendiente',
    'enviada',
    'leida',
    'fallida'
);`,
  },
  {
    id: 'tipo-estado_pensum',
    nombre: 'estado_pensum',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de un plan de estudios: borrador, vigente, en retiro o archivado.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 187,
    claves: 'borrador vigente en_retiro archivado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_pensum AS ENUM (
    'borrador',
    'vigente',
    'en_retiro',
    'archivado'
);`,
  },
  {
    id: 'tipo-estado_periodo',
    nombre: 'estado_periodo',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de un período académico: borrador, vigente, cerrado o archivado.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 199,
    claves: 'borrador vigente cerrado archivado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_periodo AS ENUM (
    'borrador',
    'vigente',
    'cerrado',
    'archivado'
);`,
  },
  {
    id: 'tipo-estado_sugerencia_seccion',
    nombre: 'estado_sugerencia_seccion',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de una sugerencia de sección: pendiente, aprobada, rechazada, aplicada o cancelada.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '5 valores admitidos',
    tabla: '',
    linea: 211,
    claves: 'pendiente aprobada rechazada aplicada cancelada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_sugerencia_seccion AS ENUM (
    'pendiente',
    'aprobada',
    'rechazada',
    'aplicada',
    'cancelada'
);`,
  },
  {
    id: 'tipo-estado_usuario',
    nombre: 'estado_usuario',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de una cuenta: activo, inactivo o bloqueado. Solo `activo` puede operar.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '3 valores admitidos',
    tabla: '',
    linea: 224,
    claves: 'activo inactivo bloqueado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_usuario AS ENUM (
    'activo',
    'inactivo',
    'bloqueado'
);`,
  },
  {
    id: 'tipo-estado_ventana_disponibilidad',
    nombre: 'estado_ventana_disponibilidad',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de la ventana de captura: programada, abierta, cerrada o cancelada.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 235,
    claves: 'programada abierta cerrada cancelada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.estado_ventana_disponibilidad AS ENUM (
    'programada',
    'abierta',
    'cerrada',
    'cancelada'
);`,
  },
  {
    id: 'tipo-tipo_archivo_importacion',
    nombre: 'tipo_archivo_importacion',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Formatos de archivo que acepta la importación: csv y xlsx.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '2 valores admitidos',
    tabla: '',
    linea: 269,
    claves: 'csv xlsx',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.tipo_archivo_importacion AS ENUM (
    'csv',
    'xlsx'
);`,
  },
  {
    id: 'tipo-tipo_aula',
    nombre: 'tipo_aula',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Clase de salón: teórica, laboratorio, mixta o virtual.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 279,
    claves: 'teorica laboratorio mixta virtual',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.tipo_aula AS ENUM (
    'teorica',
    'laboratorio',
    'mixta',
    'virtual'
);`,
  },
  {
    id: 'tipo-tipo_evento_sustitucion',
    nombre: 'tipo_evento_sustitucion',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Qué clase de evento es: sustitución temporal, sustitución permanente, permiso por ausencia o cancelación de sesión.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 291,
    claves: 'sustitucion_temporal sustitucion_permanente permiso_ausencia cancelacion_sesion',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.tipo_evento_sustitucion AS ENUM (
    'sustitucion_temporal',
    'sustitucion_permanente',
    'permiso_ausencia',
    'cancelacion_sesion'
);`,
  },
  {
    id: 'tipo-tipo_plan_horario',
    nombre: 'tipo_plan_horario',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Qué se está programando: clases o exámenes.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '2 valores admitidos',
    tabla: '',
    linea: 303,
    claves: 'clases examenes',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.tipo_plan_horario AS ENUM (
    'clases',
    'examenes'
);`,
  },
  {
    id: 'tipo-tipo_usuario',
    nombre: 'tipo_usuario',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Perfil de la persona: superadministrador, coordinador académico, decano, docente o alumno.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '5 valores admitidos',
    tabla: '',
    linea: 313,
    claves: 'superadministrador coordinador_academico decano docente alumno',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.tipo_usuario AS ENUM (
    'superadministrador',
    'coordinador_academico',
    'decano',
    'docente',
    'alumno'
);`,
  },
  {
    id: 'tipo-accion_permiso',
    nombre: 'accion_permiso',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Las acciones que puede conceder un permiso: leer, crear, actualizar, eliminar, generar, aprobar, publicar, archivar, importar, exportar y administrar.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '11 valores admitidos',
    tabla: '',
    linea: 64,
    claves: 'leer crear actualizar eliminar generar aprobar publicar archivar importar exportar administrar',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.accion_permiso AS ENUM (
    'leer',
    'crear',
    'actualizar',
    'eliminar',
    'generar',
    'aprobar',
    'publicar',
    'archivar',
    'importar',
    'exportar',
    'administrar'
);`,
  },
  {
    id: 'tipo-canal_notificacion',
    nombre: 'canal_notificacion',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Por dónde sale un aviso. Hoy solo `interno`: la base no envía correo.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '1 valores admitidos',
    tabla: '',
    linea: 83,
    claves: 'interno',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.canal_notificacion AS ENUM (
    'interno'
);`,
  },
  {
    id: 'tipo-dia_semana',
    nombre: 'dia_semana',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Los siete días. Impide que un día llegue como texto libre («Lunes», «lun», «LUNES»).',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '7 valores admitidos',
    tabla: '',
    linea: 92,
    claves: 'lunes martes miercoles jueves viernes sabado domingo',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.dia_semana AS ENUM (
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
);`,
  },
  {
    id: 'tipo-formato_reporte',
    nombre: 'formato_reporte',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Formatos de exportación admitidos: pdf y xlsx.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '2 valores admitidos',
    tabla: '',
    linea: 247,
    claves: 'pdf xlsx',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.formato_reporte AS ENUM (
    'pdf',
    'xlsx'
);`,
  },
  {
    id: 'tipo-nivel_severidad',
    nombre: 'nivel_severidad',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Gravedad de un conflicto o mensaje: baja, media, alta o crítica.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 257,
    claves: 'baja media alta critica',
    params: [],
    pasos: [],
    sql: `CREATE TYPE horarios.nivel_severidad AS ENUM (
    'baja',
    'media',
    'alta',
    'critica'
);`,
  },
  {
    id: 'vista-api_auditoria',
    nombre: 'api_auditoria',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'La bitácora de auditoría con el nombre del usuario ya resuelto, para listarla sin joins.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 3594,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.api_auditoria WITH (security_invoker='true') AS
 SELECT a.id,
    a.fecha,
    a.accion,
    a.entidad,
    a.entidad_id,
    u.nombre_completo AS usuario,
    a.motivo
   FROM (horarios.auditoria a
     LEFT JOIN horarios.usuarios u ON ((u.id = a.usuario_id)));`,
  },
  {
    id: 'vista-api_cohortes_activas',
    nombre: 'api_cohortes_activas',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'Cohortes activas de cada período con su semestre, matrícula y sección.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 3653,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.api_cohortes_activas WITH (security_invoker='true') AS
 SELECT cp.cohorte_id,
    cp.periodo_id,
    cp.semestre_asignado,
    cp.matricula_estimada,
    c.seccion
   FROM (horarios.cohorte_periodos cp
     JOIN horarios.cohortes c ON (((c.id = cp.cohorte_id) AND (c.eliminado_en IS NULL))))
  WHERE (cp.esta_activa AND (cp.eliminado_en IS NULL));`,
  },
  {
    id: 'vista-api_cursos_periodo',
    nombre: 'api_cursos_periodo',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'Cursos que toca dictar en un período, derivados de las cohortes activas: pensum de la cohorte × semestre en que está esa cohorte.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 3750,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.api_cursos_periodo WITH (security_invoker='true') AS
 SELECT cp.periodo_id,
    cp.cohorte_id,
    cp.semestre_asignado,
    cp.matricula_estimada,
    c.carrera_id,
    ca.nombre AS carrera_nombre,
    c.jornada_id,
    c.pensum_id,
    p.anio_creacion AS pensum_anio,
    c.anio_ingreso,
    c.seccion,
    cep.id AS curso_pensum_id,
    cep.curso_id,
    cur.codigo AS curso_codigo,
    cur.nombre AS curso_nombre,
    cur.requiere_laboratorio,
    cur.es_area_comun,
    cep.bloques_semanales_exactos,
    cep.duracion_slots,
    cep.prefiere_bloques_consecutivos
   FROM (((((horarios.cohorte_periodos cp
     JOIN horarios.cohortes c ON (((c.id = cp.cohorte_id) AND (c.eliminado_en IS NULL))))
     JOIN horarios.carreras ca ON (((ca.id = c.carrera_id) AND (ca.eliminado_en IS NULL))))
     JOIN horarios.pensums p ON (((p.id = c.pensum_id) AND (p.eliminado_en IS NULL))))
     JOIN horarios.cursos_en_pensum cep ON (((cep.pensum_id = c.pensum_id) AND (cep.semestre_asignado = cp.semestre_asignado) AND (cep.eliminado_en IS NULL))))
     JOIN horarios.cursos cur ON (((cur.id = cep.curso_id) AND (cur.eliminado_en IS NULL))))
  WHERE (cp.esta_activa AND (cp.eliminado_en IS NULL));`,
  },
  {
    id: 'vista-api_recursos_aula',
    nombre: 'api_recursos_aula',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'Qué recursos tiene cada aula y en qué cantidad, contando solo recursos activos.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 3822,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.api_recursos_aula WITH (security_invoker='true') AS
 SELECT ar.aula_id,
    ar.recurso_id,
    r.codigo,
    r.nombre,
    ar.cantidad
   FROM (horarios.aula_recursos ar
     JOIN horarios.recursos r ON ((r.id = ar.recurso_id)))
  WHERE (r.esta_activo AND (r.eliminado_en IS NULL));`,
  },
  {
    id: 'vista-api_resumen_importaciones',
    nombre: 'api_resumen_importaciones',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'Resumen por importación: archivo, estado y filas aceptadas, rechazadas y pendientes.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 3865,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.api_resumen_importaciones WITH (security_invoker='true') AS
 SELECT id AS importacion_id,
    nombre_archivo AS archivo,
    (estado)::text AS estado,
    filas_validas AS aceptadas,
    filas_invalidas AS rechazadas,
    GREATEST(((total_filas - filas_validas) - filas_invalidas), 0) AS pendientes,
    creada_en
   FROM horarios.importaciones;`,
  },
  {
    id: 'vista-vista_horarios_publicados',
    nombre: 'vista_horarios_publicados',
    cat: 'vista',
    grupo: 'Vistas vista_* · lectura pesada',
    desc: 'El horario publicado aplanado: facultad, carrera, jornada, cohorte, curso, docente y aula en una sola fila. Base de las funciones de consulta.',
    detalle: '',
    nota: 'sin security_invoker · la usan funciones SECURITY DEFINER',
    tabla: '',
    linea: 4671,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.vista_horarios_publicados AS
 SELECT h.id AS horario_id,
    h.tipo_plan,
    h.periodo_id,
    p.nombre AS periodo_nombre,
    p.fecha_inicio AS periodo_fecha_inicio,
    p.fecha_fin AS periodo_fecha_fin,
    s.id AS sesion_id,
    sc.cohorte_id,
    fa.id AS facultad_id,
    fa.nombre AS facultad_nombre,
    co.carrera_id,
    ca.codigo AS carrera_codigo,
    ca.nombre AS carrera_nombre,
    co.jornada_id,
    j.nombre AS jornada_nombre,
    cp.semestre_asignado,
    cp.matricula_estimada,
    co.anio_ingreso,
    co.seccion AS cohorte_seccion,
    s.curso_id AS curso_sesion_id,
    COALESCE(sc.curso_visible_id, s.curso_id) AS curso_id,
    cu.codigo AS curso_codigo,
    cu.nombre AS curso_nombre,
    s.docente_id,
    d.nombre_completo AS docente_nombre,
    s.aula_id,
    a.codigo AS aula_codigo,
    a.capacidad_maxima AS aula_capacidad,
    a.piso AS aula_piso,
    a.numero_aula,
    a.posicion_x AS aula_posicion_x,
    a.posicion_y AS aula_posicion_y,
    s.fecha_sesion,
    s.dia,
    s.indice_slot_inicio,
    s.duracion_slots,
    s.minuto_inicio_dia,
    s.minuto_fin_dia,
    s.es_area_comun,
    s.agrupacion_area_comun_id
   FROM (((((((((((horarios.horarios h
     JOIN horarios.periodos_academicos p ON ((p.id = h.periodo_id)))
     JOIN horarios.sesiones s ON ((s.horario_id = h.id)))
     LEFT JOIN horarios.sesion_cohortes sc ON ((sc.sesion_id = s.id)))
     LEFT JOIN horarios.cohortes co ON ((co.id = sc.cohorte_id)))
     LEFT JOIN horarios.cohorte_periodos cp ON (((cp.cohorte_id = co.id) AND (cp.periodo_id = h.periodo_id) AND cp.esta_activa AND (cp.eliminado_en IS NULL))))
     LEFT JOIN horarios.carreras ca ON ((ca.id = co.carrera_id)))
     LEFT JOIN horarios.facultades fa ON ((fa.id = ca.facultad_id)))
     LEFT JOIN horarios.jornadas j ON ((j.id = co.jornada_id)))
     JOIN horarios.cursos cu ON ((cu.id = COALESCE(sc.curso_visible_id, s.curso_id))))
     JOIN horarios.docentes d ON ((d.id = s.docente_id)))
     JOIN horarios.aulas a ON ((a.id = s.aula_id)))
  WHERE ((h.estado = 'publicado'::horarios.estado_horario) AND (h.eliminado_en IS NULL));`,
  },
  {
    id: 'vista-vista_horarios_publicados_con_sustituciones',
    nombre: 'vista_horarios_publicados_con_sustituciones',
    cat: 'vista',
    grupo: 'Vistas vista_* · lectura pesada',
    desc: 'Las dos vistas anteriores combinadas: el horario publicado ya con la sustitución aplicada. Es la que consulta el público final.',
    detalle: '',
    nota: 'sin security_invoker · la usan funciones SECURITY DEFINER',
    tabla: '',
    linea: 4760,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.vista_horarios_publicados_con_sustituciones AS
 SELECT v.horario_id,
    v.tipo_plan,
    v.periodo_id,
    v.periodo_nombre,
    v.periodo_fecha_inicio,
    v.periodo_fecha_fin,
    v.sesion_id,
    v.cohorte_id,
    v.facultad_id,
    v.facultad_nombre,
    v.carrera_id,
    v.carrera_codigo,
    v.carrera_nombre,
    v.jornada_id,
    v.jornada_nombre,
    v.semestre_asignado,
    v.matricula_estimada,
    v.anio_ingreso,
    v.cohorte_seccion,
    v.curso_sesion_id,
    v.curso_id,
    v.curso_codigo,
    v.curso_nombre,
    v.docente_id,
    v.docente_nombre,
    v.aula_id,
    v.aula_codigo,
    v.aula_capacidad,
    v.aula_piso,
    v.numero_aula,
    v.aula_posicion_x,
    v.aula_posicion_y,
    v.fecha_sesion,
    v.dia,
    v.indice_slot_inicio,
    v.duracion_slots,
    v.minuto_inicio_dia,
    v.minuto_fin_dia,
    v.es_area_comun,
    v.agrupacion_area_comun_id,
    sa.sustitucion_id,
    sa.tipo AS tipo_sustitucion,
    sa.docente_original_id,
    sa.docente_original_nombre,
    sa.docente_entrante_id,
    sa.docente_entrante_nombre,
        CASE
            WHEN ((sa.tipo = ANY (ARRAY['sustitucion_temporal'::horarios.tipo_evento_sustitucion, 'sustitucion_permanente'::horarios.tipo_evento_sustitucion])) AND (sa.docente_entrante_id IS NOT NULL)) THEN sa.docente_entrante_id
            ELSE v.docente_id
        END AS docente_visible_id,
        CASE
            WHEN ((sa.tipo = ANY (ARRAY['sustitucion_temporal'::horarios.tipo_evento_sustitucion, 'sustitucion_permanente'::horarios.tipo_evento_sustitucion])) AND (sa.docente_entrante_nombre IS NOT NULL)) THEN sa.docente_entrante_nombre
            ELSE v.docente_nombre
        END AS docente_visible_nombre,
    sa.fecha_inicio AS sustitucion_fecha_inicio,
    sa.fecha_fin AS sustitucion_fecha_fin,
    sa.fecha_cambio AS sustitucion_fecha_cambio,
    sa.fecha_ausencia AS sustitucion_fecha_ausencia,
    sa.fecha_cancelada AS sustitucion_fecha_cancelada,
    sa.motivo_evento AS sustitucion_motivo
   FROM (horarios.vista_horarios_publicados v
     LEFT JOIN horarios.vista_sustituciones_activas sa ON ((sa.sesion_afectada_id = v.sesion_id)));`,
  },
  {
    id: 'vista-vista_sustituciones_activas',
    nombre: 'vista_sustituciones_activas',
    cat: 'vista',
    grupo: 'Vistas vista_* · lectura pesada',
    desc: 'Las sustituciones que están vigentes hoy: filtra por estado activo y por las fechas que corresponden a cada tipo de evento.',
    detalle: '',
    nota: 'sin security_invoker · la usan funciones SECURITY DEFINER',
    tabla: '',
    linea: 4731,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW horarios.vista_sustituciones_activas AS
 SELECT e.id AS sustitucion_id,
    s.horario_id,
    e.sesion_afectada_id,
    s.fecha_sesion,
    e.tipo,
    e.docente_original_id,
    doc_original.nombre_completo AS docente_original_nombre,
    e.docente_entrante_id,
    doc_entrante.nombre_completo AS docente_entrante_nombre,
    e.fecha_inicio,
    e.fecha_fin,
    e.fecha_cambio,
    e.fecha_ausencia,
    e.fecha_cancelada,
    e.motivo_evento,
    e.estado,
    e.fecha_registro
   FROM (((horarios.eventos_sustitucion e
     JOIN horarios.sesiones s ON ((s.id = e.sesion_afectada_id)))
     JOIN horarios.docentes doc_original ON ((doc_original.id = e.docente_original_id)))
     LEFT JOIN horarios.docentes doc_entrante ON ((doc_entrante.id = e.docente_entrante_id)))
  WHERE ((e.estado = 'activo'::horarios.estado_evento_sustitucion) AND (e.eliminado_en IS NULL) AND (((e.tipo = 'sustitucion_temporal'::horarios.tipo_evento_sustitucion) AND ((CURRENT_DATE >= e.fecha_inicio) AND (CURRENT_DATE <= e.fecha_fin))) OR ((e.tipo = 'sustitucion_permanente'::horarios.tipo_evento_sustitucion) AND (e.fecha_cambio <= CURRENT_DATE)) OR ((e.tipo = 'permiso_ausencia'::horarios.tipo_evento_sustitucion) AND (e.fecha_ausencia = CURRENT_DATE)) OR ((e.tipo = 'cancelacion_sesion'::horarios.tipo_evento_sustitucion) AND (e.fecha_cancelada = CURRENT_DATE))));`,
  },
  {
    id: 'fn-crear_usuario_inicial',
    nombre: 'crear_usuario_inicial',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Da de alta al usuario en `usuarios` y le asigna su rol después de que se registró en Supabase Auth.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe · SECURITY DEFINER',
    tabla: '',
    linea: 1617,
    claves: '(uuid, text, text, text, text) rpc funcion p_auth_user_id p_tipo p_nombre p_correo p_rol',
    params: [
      { n: 'p_auth_user_id', t: 'uuid', d: '' },
      { n: 'p_tipo', t: 'text', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_correo', t: 'text', d: '' },
      { n: 'p_rol', t: 'text', d: '' },
    ],
    pasos: [
      'Exige que el usuario autenticado sea el mismo del perfil que se pide crear.',
      'Toma un advisory lock para que dos registros simultáneos no creen dos usuarios iniciales.',
      'Si ese `auth_user_id` ya tiene ficha, la devuelve tal cual: repetir la llamada no duplica nada.',
      'Si ya existe cualquier otro usuario vivo, falla: esta función es solo para el primero.',
      'Crea la fila en `usuarios` y le asigna el rol indicado.',
    ],
    sql: `CREATE FUNCTION horarios.crear_usuario_inicial(p_auth_user_id uuid, p_tipo text, p_nombre text, p_correo text, p_rol text) RETURNS jsonb
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_usuario horarios.usuarios%rowtype;
    v_rol_id uuid;
begin
    if auth.uid() is null or auth.uid() <> p_auth_user_id then
        raise exception 'El usuario autenticado no coincide con el perfil solicitado';
    end if;

    perform pg_advisory_xact_lock(hashtext('horarios.crear_usuario_inicial'));

    select * into v_usuario
    from horarios.usuarios
    where auth_user_id = p_auth_user_id and eliminado_en is null;

    if found then
        return to_jsonb(v_usuario);
    end if;

    if exists (select 1 from horarios.usuarios where eliminado_en is null) then
        raise exception 'El usuario inicial ya fue creado';
    end if;

    select id into v_rol_id
    from horarios.roles
    where lower(nombre) = lower(p_rol) and eliminado_en is null;

    if v_rol_id is null then
        raise exception 'El rol inicial solicitado no existe';
    end if;

    insert into horarios.usuarios
        (auth_user_id, tipo, nombre_completo, correo_institucional)
    values
        (p_auth_user_id, p_tipo::horarios.tipo_usuario, p_nombre, p_correo)
    returning * into v_usuario;

    insert into horarios.usuario_roles (usuario_id, rol_id)
    values (v_usuario.id, v_rol_id)
    on conflict do nothing;

    return to_jsonb(v_usuario);
end;
$$;`,
  },
  {
    id: 'fn-listar_permisos_usuario',
    nombre: 'listar_permisos_usuario',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Devuelve en JSON los pares {recurso, acción} que el usuario tiene por sus roles.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2192,
    claves: '(uuid) rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Recorre los roles del usuario y los permisos de cada rol.',
      'Quita duplicados y ordena por recurso y acción.',
      'Devuelve `[]` cuando no hay ninguno, nunca `null`.',
    ],
    sql: `CREATE FUNCTION horarios.listar_permisos_usuario(p_usuario_id uuid) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(jsonb_build_object(
        'recurso', permisos.recurso,
        'accion', permisos.accion)
        order by permisos.recurso, permisos.accion), '[]'::jsonb)
    from (
        select distinct p.recurso, p.accion::text as accion
        from horarios.usuario_roles ur
        join horarios.roles r on r.id = ur.rol_id and r.eliminado_en is null
        join horarios.rol_permisos rp on rp.rol_id = r.id
        join horarios.permisos_acceso p on p.id = rp.permiso_id
        where ur.usuario_id = p_usuario_id
    ) permisos;
$$;`,
  },
  {
    id: 'fn-listar_roles_usuario',
    nombre: 'listar_roles_usuario',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Roles asignados al usuario, en JSON.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2215,
    claves: '(uuid) rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Une `usuario_roles` con `roles`, descartando los roles borrados.',
      'Devuelve los nombres ordenados alfabéticamente, o `[]`.',
    ],
    sql: `CREATE FUNCTION horarios.listar_roles_usuario(p_usuario_id uuid) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(r.nombre order by r.nombre), '[]'::jsonb)
    from horarios.usuario_roles ur
    join horarios.roles r on r.id = ur.rol_id
    where ur.usuario_id = p_usuario_id and r.eliminado_en is null;
$$;`,
  },
  {
    id: 'fn-obtener_alcance_usuario',
    nombre: 'obtener_alcance_usuario',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Hasta dónde ve esa persona: su `docente_id` si es docente y las facultades que tiene asignadas.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2261,
    claves: '(uuid) rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Lee el `docente_id` de la ficha del usuario.',
      'Le agrega la lista de facultades que tiene asignadas.',
      'Si el usuario no existe, devuelve un alcance vacío en vez de fallar.',
    ],
    sql: `CREATE FUNCTION horarios.obtener_alcance_usuario(p_usuario_id uuid) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce((
        select jsonb_build_object(
            'docente_id', u.docente_id,
            'facultad_ids', coalesce((
                select jsonb_agg(uf.facultad_id order by uf.facultad_id)
                from horarios.usuario_facultades uf
                where uf.usuario_id = u.id), '[]'::jsonb))
        from horarios.usuarios u
        where u.id = p_usuario_id and u.eliminado_en is null),
        jsonb_build_object('docente_id', null, 'facultad_ids', '[]'::jsonb));
$$;`,
  },
  {
    id: 'fn-usuario_actual_id',
    nombre: 'usuario_actual_id',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Traduce el JWT de Supabase al id de nuestra tabla `usuarios`. Devuelve NULL si no hay sesión o si el usuario está inactivo o borrado.',
    detalle: 'Es el puente entre Supabase Auth y el sistema. Al filtrar por `estado = \'activo\'`, dar de baja a alguien lo deja fuera aunque su token siga siendo válido.',
    nota: 'devuelve uuid · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 2470,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee `auth.uid()`, el identificador que viaja dentro del JWT de la petición.',
      'Busca en `usuarios` la fila con ese `auth_user_id` que esté activa y sin borrar.',
      'Devuelve su id, o NULL si no hay sesión válida.',
    ],
    sql: `CREATE FUNCTION horarios.usuario_actual_id() RETURNS uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'auth', 'public'
    AS $$
    select id
    from horarios.usuarios
    where auth_user_id = auth.uid()
      and estado = 'activo'
      and eliminado_en is null
    limit 1;
$$;`,
  },
  {
    id: 'fn-usuario_actual_tiene_permiso',
    nombre: 'usuario_actual_tiene_permiso',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: '¿El usuario de la sesión puede hacer (recurso, acción)? Es la función que evalúan casi todas las políticas RLS.',
    detalle: 'Una sola función sostiene las 242 políticas: se cambia aquí y cambia el control de acceso de todo el esquema.',
    nota: 'devuelve boolean · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 2487,
    claves: '(text, text) rpc funcion p_recurso p_accion',
    params: [
      { n: 'p_recurso', t: 'text', d: '' },
      { n: 'p_accion', t: 'text', d: '' },
    ],
    pasos: [
      'Parte de `auth.uid()` y encadena usuarios → usuario_roles → roles → rol_permisos → permisos_acceso.',
      'Descarta usuarios inactivos o borrados y roles borrados.',
      'Devuelve `true` si aparece al menos una fila con ese par (recurso, acción).',
    ],
    sql: `CREATE FUNCTION horarios.usuario_actual_tiene_permiso(p_recurso text, p_accion text) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'auth', 'public'
    AS $$
    select exists (
        select 1
        from horarios.usuarios u
        join horarios.usuario_roles ur on ur.usuario_id = u.id
        join horarios.roles r on r.id = ur.rol_id and r.eliminado_en is null
        join horarios.rol_permisos rp on rp.rol_id = r.id
        join horarios.permisos_acceso p on p.id = rp.permiso_id
        where u.auth_user_id = auth.uid()
          and u.estado = 'activo'
          and u.eliminado_en is null
          and p.recurso = p_recurso
          and p.accion::text = p_accion);
$$;`,
  },
  {
    id: 'fn-usuario_tiene_permiso',
    nombre: 'usuario_tiene_permiso',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Lo mismo, pero para un usuario indicado a mano. No es SECURITY DEFINER, así que respeta RLS.',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2510,
    claves: '(uuid, text, text) rpc funcion p_usuario_id p_recurso p_accion',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
      { n: 'p_recurso', t: 'text', d: '' },
      { n: 'p_accion', t: 'text', d: '' },
    ],
    pasos: [
      'Hace el mismo recorrido de roles y permisos, pero partiendo del id que se le pasa en vez del JWT.',
      'Exige que ese usuario esté activo y sin borrar.',
      'Devuelve `true` si el par (recurso, acción) aparece.',
    ],
    sql: `CREATE FUNCTION horarios.usuario_tiene_permiso(p_usuario_id uuid, p_recurso text, p_accion text) RETURNS boolean
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select exists (
        select 1
        from horarios.usuarios u
        join horarios.usuario_roles ur on ur.usuario_id = u.id
        join horarios.roles r on r.id = ur.rol_id and r.eliminado_en is null
        join horarios.rol_permisos rp on rp.rol_id = r.id
        join horarios.permisos_acceso p on p.id = rp.permiso_id
        where u.id = p_usuario_id
          and u.estado = 'activo'
          and u.eliminado_en is null
          and p.recurso = p_recurso
          and p.accion::text = p_accion);
$$;`,
  },
  {
    id: 'fn-activar_cohorte_periodo',
    nombre: 'activar_cohorte_periodo',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Activa una cohorte en un período y le fija semestre y matrícula. Es un UPSERT: si ya estaba, la actualiza.',
    detalle: '',
    nota: 'devuelve void · sql · escribe',
    tabla: '',
    linea: 326,
    claves: '(uuid, uuid, integer, integer) rpc funcion p_cohorte_id p_periodo_id p_semestre_asignado p_matricula_estimada',
    params: [
      { n: 'p_cohorte_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_semestre_asignado', t: 'integer', d: '' },
      { n: 'p_matricula_estimada', t: 'integer', d: '' },
    ],
    pasos: [
      'Intenta insertar la cohorte en el período.',
      'Si ya existía —lo decide el índice único entre filas vivas—, actualiza semestre y matrícula, la reactiva y sube `version_fila`.',
      'Todo ocurre en una sola sentencia atómica, sin consultar antes si existe.',
    ],
    sql: `CREATE FUNCTION horarios.activar_cohorte_periodo(p_cohorte_id uuid, p_periodo_id uuid, p_semestre_asignado integer, p_matricula_estimada integer) RETURNS void
    LANGUAGE sql
    SET search_path TO 'horarios', 'public'
    AS $$
    insert into horarios.cohorte_periodos
        (cohorte_id, periodo_id, semestre_asignado, matricula_estimada, esta_activa)
    values
        (p_cohorte_id, p_periodo_id, p_semestre_asignado, p_matricula_estimada, true)
    on conflict (periodo_id, cohorte_id) where eliminado_en is null
    do update set semestre_asignado = excluded.semestre_asignado,
                  matricula_estimada = excluded.matricula_estimada,
                  esta_activa = true,
                  actualizado_en = now(),
                  version_fila = horarios.cohorte_periodos.version_fila + 1;
$$;`,
  },
  {
    id: 'fn-actualizar_agrupacion_area_comun',
    nombre: 'actualizar_agrupacion_area_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Reemplaza por completo los cursos y las cohortes de una agrupación existente.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 347,
    claves: '(uuid, text, uuid, uuid[], uuid[]) rpc funcion p_id p_nombre p_curso_principal_id p_curso_ids p_cohorte_ids',
    params: [
      { n: 'p_id', t: 'uuid', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_curso_principal_id', t: 'uuid', d: '' },
      { n: 'p_curso_ids', t: 'uuid[]', d: '' },
      { n: 'p_cohorte_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Actualiza nombre y curso principal; si no encuentra la agrupación activa, falla.',
      'Borra todos los cursos y cohortes anteriores.',
      'Reinserta los recibidos: es un reemplazo completo, no una fusión.',
    ],
    sql: `CREATE FUNCTION horarios.actualizar_agrupacion_area_comun(p_id uuid, p_nombre text, p_curso_principal_id uuid, p_curso_ids uuid[], p_cohorte_ids uuid[]) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_periodo_id uuid;
begin
    update horarios.agrupaciones_area_comun
       set nombre = trim(p_nombre),
           curso_principal_id = p_curso_principal_id
     where id = p_id
       and esta_activa
       and eliminado_en is null
     returning periodo_id into v_periodo_id;

    if v_periodo_id is null then
        raise exception 'No se encontró la agrupación de área común.';
    end if;

    delete from horarios.agrupacion_area_comun_cursos where agrupacion_id = p_id;
    delete from horarios.agrupacion_area_comun_cohortes where agrupacion_id = p_id;

    insert into horarios.agrupacion_area_comun_cursos (agrupacion_id, curso_id)
    select p_id, valor from unnest(p_curso_ids) valor on conflict do nothing;

    insert into horarios.agrupacion_area_comun_cohortes (agrupacion_id, cohorte_id)
    select p_id, valor from unnest(p_cohorte_ids) valor on conflict do nothing;

    return jsonb_build_object(
        'id', p_id,
        'periodo_id', v_periodo_id,
        'nombre', trim(p_nombre),
        'curso_principal_id', p_curso_principal_id,
        'curso_ids', to_jsonb(p_curso_ids),
        'cohorte_ids', to_jsonb(p_cohorte_ids));
end;
$$;`,
  },
  {
    id: 'fn-asignar_recurso_aula',
    nombre: 'asignar_recurso_aula',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Registra cuántas unidades de un recurso tiene un aula. UPSERT: si ya existía, ajusta la cantidad.',
    detalle: '',
    nota: 'devuelve void · sql · escribe',
    tabla: '',
    linea: 448,
    claves: '(uuid, uuid, integer) rpc funcion p_aula_id p_recurso_id p_cantidad',
    params: [
      { n: 'p_aula_id', t: 'uuid', d: '' },
      { n: 'p_recurso_id', t: 'uuid', d: '' },
      { n: 'p_cantidad', t: 'integer', d: '' },
    ],
    pasos: [
      'Inserta el recurso en el aula.',
      'Si esa pareja ya existía, solo ajusta la cantidad.',
    ],
    sql: `CREATE FUNCTION horarios.asignar_recurso_aula(p_aula_id uuid, p_recurso_id uuid, p_cantidad integer) RETURNS void
    LANGUAGE sql
    SET search_path TO 'horarios', 'public'
    AS $$
    insert into horarios.aula_recursos (aula_id, recurso_id, cantidad)
    values (p_aula_id, p_recurso_id, p_cantidad)
    on conflict (aula_id, recurso_id)
    do update set cantidad = excluded.cantidad;
$$;`,
  },
  {
    id: 'fn-crear_agrupacion_area_comun',
    nombre: 'crear_agrupacion_area_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Define un área común: curso principal, cursos que la integran y cohortes que asisten juntas.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 1529,
    claves: '(uuid, text, uuid, uuid[], uuid[], uuid) rpc funcion p_periodo_id p_nombre p_curso_principal_id p_curso_ids p_cohorte_ids p_creada_por_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_curso_principal_id', t: 'uuid', d: '' },
      { n: 'p_curso_ids', t: 'uuid[]', d: '' },
      { n: 'p_cohorte_ids', t: 'uuid[]', d: '' },
      { n: 'p_creada_por_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Inserta la cabecera de la agrupación.',
      'Vuelca los cursos y las cohortes que llegan como arreglos.',
      'Devuelve el id nuevo con sus miembros.',
    ],
    sql: `CREATE FUNCTION horarios.crear_agrupacion_area_comun(p_periodo_id uuid, p_nombre text, p_curso_principal_id uuid, p_curso_ids uuid[], p_cohorte_ids uuid[], p_creada_por_id uuid DEFAULT NULL::uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
begin
    insert into horarios.agrupaciones_area_comun
        (periodo_id, nombre, curso_principal_id, creada_por_id)
    values (p_periodo_id, p_nombre, p_curso_principal_id, p_creada_por_id)
    returning id into v_id;

    insert into horarios.agrupacion_area_comun_cursos (agrupacion_id, curso_id)
    select v_id, valor from unnest(p_curso_ids) valor on conflict do nothing;
    insert into horarios.agrupacion_area_comun_cohortes (agrupacion_id, cohorte_id)
    select v_id, valor from unnest(p_cohorte_ids) valor on conflict do nothing;

    return jsonb_build_object(
        'id', v_id,
        'periodo_id', p_periodo_id,
        'nombre', p_nombre,
        'curso_principal_id', p_curso_principal_id,
        'curso_ids', to_jsonb(p_curso_ids),
        'cohorte_ids', to_jsonb(p_cohorte_ids));
end;
$$;`,
  },
  {
    id: 'fn-crear_cohorte',
    nombre: 'crear_cohorte',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Crea una cohorte (carrera + pensum + jornada + año + sección) validando que la combinación sea coherente.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 1561,
    claves: '(uuid, uuid, uuid, integer, text, integer) rpc funcion p_carrera_id p_pensum_id p_jornada_id p_anio_ingreso p_seccion p_matricula_estimada',
    params: [
      { n: 'p_carrera_id', t: 'uuid', d: '' },
      { n: 'p_pensum_id', t: 'uuid', d: '' },
      { n: 'p_jornada_id', t: 'uuid', d: '' },
      { n: 'p_anio_ingreso', t: 'integer', d: '' },
      { n: 'p_seccion', t: 'text', d: '' },
      { n: 'p_matricula_estimada', t: 'integer', d: '' },
    ],
    pasos: [
      'Registra de paso la pareja carrera–jornada en `carrera_jornadas` si aún no existía.',
      'Inserta la cohorte y devuelve la fila completa.',
      'El resto de la validación la imponen el índice único de identidad y las llaves foráneas.',
    ],
    sql: `CREATE FUNCTION horarios.crear_cohorte(p_carrera_id uuid, p_pensum_id uuid, p_jornada_id uuid, p_anio_ingreso integer, p_seccion text, p_matricula_estimada integer) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_cohorte horarios.cohortes%rowtype;
begin
    insert into horarios.carrera_jornadas (carrera_id, jornada_id)
    values (p_carrera_id, p_jornada_id)
    on conflict do nothing;

    insert into horarios.cohortes
        (carrera_id, pensum_id, jornada_id, anio_ingreso, seccion, matricula_estimada)
    values
        (p_carrera_id, p_pensum_id, p_jornada_id, p_anio_ingreso,
         p_seccion, p_matricula_estimada)
    returning * into v_cohorte;
    return to_jsonb(v_cohorte);
end;
$$;`,
  },
  {
    id: 'fn-listar_agrupaciones_area_comun',
    nombre: 'listar_agrupaciones_area_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Agrupaciones de área común de un período con sus cursos y cohortes, en JSON.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2130,
    claves: '(uuid) rpc funcion p_periodo_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Toma las agrupaciones activas del período.',
      'Anida en cada una sus cursos y sus cohortes.',
      'Ordena por nombre y devuelve `[]` si no hay ninguna.',
    ],
    sql: `CREATE FUNCTION horarios.listar_agrupaciones_area_comun(p_periodo_id uuid) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(resultado.objeto order by resultado.nombre), '[]'::jsonb)
    from (
        select a.nombre, jsonb_build_object(
            'id', a.id,
            'periodo_id', a.periodo_id,
            'nombre', a.nombre,
            'curso_principal_id', a.curso_principal_id,
            'curso_ids', coalesce((select jsonb_agg(ac.curso_id order by ac.curso_id)
                from horarios.agrupacion_area_comun_cursos ac
                where ac.agrupacion_id = a.id), '[]'::jsonb),
            'cohorte_ids', coalesce((select jsonb_agg(ah.cohorte_id order by ah.cohorte_id)
                from horarios.agrupacion_area_comun_cohortes ah
                where ah.agrupacion_id = a.id), '[]'::jsonb)) as objeto
        from horarios.agrupaciones_area_comun a
        where a.periodo_id = p_periodo_id and a.esta_activa and a.eliminado_en is null
    ) resultado;
$$;`,
  },
  {
    id: 'fn-autorizar_curso_docente',
    nombre: 'autorizar_curso_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Autoriza a un docente a impartir un curso, con alcance opcional por carrera, facultad o jornada.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 463,
    claves: '(uuid, uuid, uuid, uuid, uuid) rpc funcion p_docente_id p_curso_id p_carrera_id p_facultad_id p_jornada_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_curso_id', t: 'uuid', d: '' },
      { n: 'p_carrera_id', t: 'uuid', d: 'NULL' },
      { n: 'p_facultad_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Inserta la autorización; si ya existía, no la duplica.',
      'En ese caso busca la vigente que coincida exactamente en carrera, facultad y jornada.',
      'Falla si no logró ni crearla ni encontrarla; si no, devuelve la fila.',
    ],
    sql: `CREATE FUNCTION horarios.autorizar_curso_docente(p_docente_id uuid, p_curso_id uuid, p_carrera_id uuid DEFAULT NULL::uuid, p_facultad_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_asignacion horarios.asignaciones_docente_curso%rowtype;
begin
    insert into horarios.asignaciones_docente_curso
        (docente_id, curso_id, carrera_id, facultad_id, jornada_id)
    values (p_docente_id, p_curso_id, p_carrera_id, p_facultad_id, p_jornada_id)
    on conflict do nothing
    returning * into v_asignacion;

    if not found then
        select * into v_asignacion
        from horarios.asignaciones_docente_curso
        where docente_id = p_docente_id and curso_id = p_curso_id
          and carrera_id is not distinct from p_carrera_id
          and facultad_id is not distinct from p_facultad_id
          and jornada_id is not distinct from p_jornada_id
          and esta_vigente and eliminado_en is null
        limit 1;
    end if;

    if v_asignacion.id is null then
        raise exception 'No fue posible registrar la autorizacion del docente';
    end if;
    return to_jsonb(v_asignacion);
end;
$$;`,
  },
  {
    id: 'fn-guardar_disponibilidad_docente',
    nombre: 'guardar_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Guarda las franjas que declara el docente y las expande a bloques concretos en `disponibilidad_docente_slots`.',
    detalle: 'Las franjas no sirven para consultar: hacen falta bloques. La expansión ocurre aquí, una sola vez.',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 1917,
    claves: '(uuid, uuid, boolean, jsonb) rpc funcion p_docente_id p_periodo_id p_confirmar p_slots',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_confirmar', t: 'boolean', d: '' },
      { n: 'p_slots', t: 'jsonb', d: '' },
    ],
    pasos: [
      'Crea o actualiza la cabecera de disponibilidad de ese docente en ese período.',
      'Borra los bloques anteriores y vuelve a insertar los recibidos.',
      'De cada bloque comprueba contra su jornada que el día esté activo y el índice caiga dentro de los bloques del día.',
      'Si un bloque no encaja en su jornada, aborta la operación entera.',
    ],
    sql: `CREATE FUNCTION horarios.guardar_disponibilidad_docente(p_docente_id uuid, p_periodo_id uuid, p_confirmar boolean, p_slots jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
    v_slot jsonb;
begin
    insert into horarios.disponibilidades_docente
        (docente_id, periodo_id, esta_confirmada)
    values (p_docente_id, p_periodo_id, p_confirmar)
    on conflict (docente_id, periodo_id) do update
      set esta_confirmada = excluded.esta_confirmada, actualizado_en = now()
    returning id into v_id;

    delete from horarios.disponibilidad_docente_slots where disponibilidad_id = v_id;
    for v_slot in select value from jsonb_array_elements(p_slots)
    loop
        insert into horarios.disponibilidad_docente_slots
            (disponibilidad_id, jornada_id, dia, indice_slot, esta_disponible)
        select v_id,
               (v_slot->>'jornada_id')::uuid,
               (v_slot->>'dia')::horarios.dia_semana,
               (v_slot->>'indice_slot')::integer,
               coalesce((v_slot->>'esta_disponible')::boolean, true)
        from horarios.jornadas j
        where j.id = (v_slot->>'jornada_id')::uuid
          and j.esta_activa and j.eliminado_en is null
          and (v_slot->>'dia')::horarios.dia_semana = any(j.dias_activos)
          and (v_slot->>'indice_slot')::integer between 1 and j.bloques_por_dia;
        if not found then
            raise exception 'Un bloque no pertenece a la jornada indicada';
        end if;
    end loop;

    return jsonb_build_object(
        'id', v_id,
        'docente_id', p_docente_id,
        'periodo_id', p_periodo_id,
        'esta_confirmada', p_confirmar,
        'slots', p_slots);
end;
$$;`,
  },
  {
    id: 'fn-obtener_disponibilidad_docente',
    nombre: 'obtener_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Devuelve la disponibilidad guardada de un docente en un período, lista para pintar la grilla.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2282,
    claves: '(uuid, uuid) rpc funcion p_docente_id p_periodo_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Lee la cabecera del docente en el período.',
      'Anida sus bloques ordenados por día e índice.',
      'Devuelve la lista de bloques vacía si aún no declaró nada.',
    ],
    sql: `CREATE FUNCTION horarios.obtener_disponibilidad_docente(p_docente_id uuid, p_periodo_id uuid) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select jsonb_build_object(
        'id', d.id,
        'docente_id', d.docente_id,
        'periodo_id', d.periodo_id,
        'esta_confirmada', d.esta_confirmada,
        'slots', coalesce((select jsonb_agg(jsonb_build_object(
            'jornada_id', s.jornada_id,
            'dia', s.dia::text,
            'indice_slot', s.indice_slot,
            'esta_disponible', s.esta_disponible)
            order by s.dia, s.indice_slot)
            from horarios.disponibilidad_docente_slots s
            where s.disponibilidad_id = d.id), '[]'::jsonb))
    from horarios.disponibilidades_docente d
    where d.docente_id = p_docente_id and d.periodo_id = p_periodo_id;
$$;`,
  },
  {
    id: 'fn-revocar_curso_docente',
    nombre: 'revocar_curso_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Retira la autorización marcando `esta_vigente = false`. No borra el historial.',
    detalle: '',
    nota: 'devuelve boolean · plpgsql · escribe',
    tabla: '',
    linea: 2450,
    claves: '(uuid) rpc funcion p_asignacion_id',
    params: [
      { n: 'p_asignacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Marca la autorización como no vigente, le pone `eliminado_en` y sube `version_fila`.',
      'Solo actúa sobre autorizaciones que seguían vigentes.',
      'Devuelve `true` si llegó a tocar una fila.',
    ],
    sql: `CREATE FUNCTION horarios.revocar_curso_docente(p_asignacion_id uuid) RETURNS boolean
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
begin
    update horarios.asignaciones_docente_curso
    set esta_vigente = false,
        eliminado_en = now(),
        actualizado_en = now(),
        version_fila = version_fila + 1
    where id = p_asignacion_id and esta_vigente and eliminado_en is null;
    return found;
end;
$$;`,
  },
  {
    id: 'fn-cambiar_estado_plan',
    nombre: 'cambiar_estado_plan',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: 'Mueve el plan de un estado a otro y deja rastro en el historial. Usa bloqueo optimista: si otra persona lo cambió antes, la operación falla en vez de pisar su trabajo.',
    detalle: 'Es el ejemplo canónico de `version_fila`: el UPDATE lleva `AND version_fila = <la que leí>`; si afecta cero filas, alguien se adelantó.',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 586,
    claves: '(uuid, text, text, text, bigint, uuid) rpc funcion p_plan_id p_estado_anterior p_estado_nuevo p_motivo p_version_anterior p_usuario_id',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
      { n: 'p_estado_anterior', t: 'text', d: '' },
      { n: 'p_estado_nuevo', t: 'text', d: '' },
      { n: 'p_motivo', t: 'text', d: '' },
      { n: 'p_version_anterior', t: 'bigint', d: '' },
      { n: 'p_usuario_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Actualiza el plan exigiendo a la vez el estado anterior y la `version_fila` que traía quien llama.',
      'Sella fecha y responsable de aprobación o de publicación, según el estado nuevo.',
      'Si el UPDATE no afectó ninguna fila, lanza `conflicto_version`: alguien se adelantó.',
      'Registra la transición en `historial_estados_horario`.',
    ],
    sql: `CREATE FUNCTION horarios.cambiar_estado_plan(p_plan_id uuid, p_estado_anterior text, p_estado_nuevo text, p_motivo text, p_version_anterior bigint, p_usuario_id uuid DEFAULT NULL::uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_plan horarios.horarios%rowtype;
begin
    update horarios.horarios
    set estado = p_estado_nuevo::horarios.estado_horario,
        motivo_estado = p_motivo,
        fecha_aprobacion = case when p_estado_nuevo = 'aprobado' then now() else fecha_aprobacion end,
        fecha_publicacion = case when p_estado_nuevo = 'publicado' then now() else fecha_publicacion end,
        aprobado_por_id = case when p_estado_nuevo = 'aprobado' then p_usuario_id else aprobado_por_id end,
        publicado_por_id = case when p_estado_nuevo = 'publicado' then p_usuario_id else publicado_por_id end,
        actualizado_en = now(),
        version_fila = version_fila + 1
    where id = p_plan_id
      and estado = p_estado_anterior::horarios.estado_horario
      and version_fila = p_version_anterior
      and eliminado_en is null
    returning * into v_plan;

    if not found then
        raise exception 'conflicto_version';
    end if;

    insert into horarios.historial_estados_horario
        (horario_id, estado_anterior, estado_nuevo, cambiado_por_id, motivo)
    values
        (p_plan_id, p_estado_anterior::horarios.estado_horario,
         p_estado_nuevo::horarios.estado_horario, p_usuario_id, p_motivo);
    return to_jsonb(v_plan);
end;
$$;`,
  },
  {
    id: 'fn-conteos_revision_plan',
    nombre: 'conteos_revision_plan',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: 'Revisión previa a generar: cuenta qué hay y qué falta para el alcance elegido, antes de gastar una corrida.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 1470,
    claves: '(uuid, uuid[], uuid[]) rpc funcion p_periodo_id p_carrera_ids p_jornada_ids',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_carrera_ids', t: 'uuid[]', d: 'arreglo vacío' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Arma el alcance: las cohortes activas del período, filtradas por las carreras y jornadas dadas.',
      'Cuenta cohortes, cohortes sin cursos en su semestre, aulas activas, docentes autorizados y docentes con disponibilidad confirmada.',
      'Devuelve todo junto para la pantalla previa a generar.',
    ],
    sql: `CREATE FUNCTION horarios.conteos_revision_plan(p_periodo_id uuid, p_carrera_ids uuid[] DEFAULT '{}'::uuid[], p_jornada_ids uuid[] DEFAULT '{}'::uuid[]) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    with alcance as (
        select cp.cohorte_id, cp.semestre_asignado, c.pensum_id, c.jornada_id
        from horarios.cohorte_periodos cp
        join horarios.cohortes c on c.id = cp.cohorte_id and c.eliminado_en is null
        where cp.periodo_id = p_periodo_id
          and cp.esta_activa
          and cp.eliminado_en is null
          and (cardinality(coalesce(p_carrera_ids, '{}'::uuid[])) = 0
               or c.carrera_id = any (p_carrera_ids))
          and (cardinality(coalesce(p_jornada_ids, '{}'::uuid[])) = 0
               or c.jornada_id = any (p_jornada_ids))
    )
    select jsonb_build_object(
      'existe_periodo', exists(
          select 1 from horarios.periodos_academicos
          where id = p_periodo_id and eliminado_en is null),
      'cohortes_activas', (select count(*)::integer from alcance),
      'cohortes_sin_cursos', (select count(*)::integer
          from alcance a
          where not exists (
            select 1 from horarios.cursos_en_pensum cep
            where cep.pensum_id = a.pensum_id
              and cep.semestre_asignado = a.semestre_asignado
              and cep.eliminado_en is null)),
      'aulas_activas', (select count(*)::integer from horarios.aulas
          where esta_activa and eliminado_en is null),
      'docentes_autorizados', (select count(distinct adc.docente_id)::integer
          from horarios.asignaciones_docente_curso adc
          where adc.esta_vigente and adc.eliminado_en is null
            and (cardinality(coalesce(p_carrera_ids, '{}'::uuid[])) = 0
                 and cardinality(coalesce(p_jornada_ids, '{}'::uuid[])) = 0
                 or exists (
                   select 1
                   from alcance a
                   join horarios.cursos_en_pensum cep on cep.pensum_id = a.pensum_id
                     and cep.semestre_asignado = a.semestre_asignado
                     and cep.eliminado_en is null
                   where cep.curso_id = adc.curso_id))),
      'docentes_con_disponibilidad', (select count(*)::integer
          from horarios.disponibilidades_docente dd
          where dd.periodo_id = p_periodo_id and dd.esta_confirmada
            and (cardinality(coalesce(p_jornada_ids, '{}'::uuid[])) = 0
                 or exists (
                   select 1
                   from horarios.disponibilidad_docente_slots dds
                   where dds.disponibilidad_id = dd.id
                     and dds.esta_disponible
                     and dds.jornada_id = any (p_jornada_ids)))));
$$;`,
  },
  {
    id: 'fn-crear_plan_horario',
    nombre: 'crear_plan_horario',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: 'Crea el plan en estado `borrador` y fija su alcance: qué carreras y qué jornadas entran.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 1587,
    claves: '(uuid, text, uuid, uuid[], uuid[]) rpc funcion p_periodo_id p_tipo p_horario_origen_id p_carrera_ids p_jornada_ids',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_tipo', t: 'text', d: '' },
      { n: 'p_horario_origen_id', t: 'uuid', d: 'NULL' },
      { n: 'p_carrera_ids', t: 'uuid[]', d: 'arreglo vacío' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Toma un advisory lock por período y tipo, para que dos solicitudes simultáneas no reciban el mismo número de versión.',
      'Calcula el número de versión siguiente y crea el plan en estado `borrador`.',
      'Delega en `fijar_alcance_plan` las carreras y jornadas recibidas.',
    ],
    sql: `CREATE FUNCTION horarios.crear_plan_horario(p_periodo_id uuid, p_tipo text, p_horario_origen_id uuid DEFAULT NULL::uuid, p_carrera_ids uuid[] DEFAULT '{}'::uuid[], p_jornada_ids uuid[] DEFAULT '{}'::uuid[]) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_plan horarios.horarios%rowtype;
begin
    -- El bloqueo evita asignar el mismo numero de version a dos solicitudes concurrentes.
    perform pg_advisory_xact_lock(hashtextextended(p_periodo_id::text || ':' || p_tipo, 0));
    insert into horarios.horarios
        (periodo_id, tipo_plan, horario_origen_id, numero_version, estado)
    values
        (p_periodo_id, p_tipo::horarios.tipo_plan_horario, p_horario_origen_id,
         coalesce((select max(numero_version) + 1 from horarios.horarios
                   where periodo_id = p_periodo_id
                     and tipo_plan = p_tipo::horarios.tipo_plan_horario
                     and eliminado_en is null), 1),
         'borrador')
    returning * into v_plan;

    perform horarios.fijar_alcance_plan(v_plan.id, p_carrera_ids, p_jornada_ids);
    return to_jsonb(v_plan);
end;
$$;`,
  },
  {
    id: 'fn-plan_es_completo_y_valido',
    nombre: 'plan_es_completo_y_valido',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: '¿Este plan se puede publicar? Exige sesiones colocadas, cero pendientes, cero conflictos duros y el contador de violaciones duras en cero.',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2341,
    claves: '(uuid) rpc funcion p_plan_id',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Comprueba cuatro condiciones unidas por `and`: hay sesiones, no quedan pendientes, no hay conflictos duros y el contador de violaciones duras está en cero.',
      'Si el plan ni existe, devuelve `false` en lugar de nulo.',
    ],
    sql: `CREATE FUNCTION horarios.plan_es_completo_y_valido(p_plan_id uuid) RETURNS boolean
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select exists (select 1 from horarios.sesiones where horario_id = p_plan_id)
       and not exists (select 1 from horarios.sesiones_no_asignadas where horario_id = p_plan_id)
       and not exists (select 1 from horarios.conflictos
                       where horario_id = p_plan_id and es_restriccion_dura)
       and coalesce((select cantidad_violaciones_duras = 0
                     from horarios.horarios where id = p_plan_id), false);
$$;`,
  },
  {
    id: 'fn-comparar_version_horario',
    nombre: 'comparar_version_horario',
    cat: 'funcion',
    grupo: 'Edición manual y versiones',
    desc: 'Diferencias entre la versión derivada y su horario de origen: qué se movió y a dónde.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · solo lee (STABLE)',
    tabla: '',
    linea: 626,
    claves: '(uuid) rpc funcion p_horario_derivado_id',
    params: [
      { n: 'p_horario_derivado_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Localiza el horario de origen y el último resultado de edición de la versión derivada.',
      'Recupera el mapa de sesiones origen→derivada que se guardó al crearla.',
      'Compara docente, aula, jornada, día, bloque y duración de cada pareja, y se queda solo con lo que difiere.',
      'Añade los conflictos duros que quedaron en la versión derivada.',
    ],
    sql: `CREATE FUNCTION horarios.comparar_version_horario(p_horario_derivado_id uuid) RETURNS jsonb
    LANGUAGE plpgsql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_origen_id uuid;
    v_numero_version integer;
    v_exitosa boolean;
    v_mensaje text;
    v_movidas jsonb;
    v_cambios jsonb;
    v_conflictos jsonb;
begin
    select h.horario_origen_id, h.numero_version,
           coalesce(r.fue_exitoso, false),
           coalesce(r.mensaje_resultado, 'Reparacion pendiente'),
           coalesce(r.sesiones_movidas, '[]'::jsonb)
    into v_origen_id, v_numero_version, v_exitosa, v_mensaje, v_movidas
    from horarios.horarios h
    left join lateral (
        select fue_exitoso, mensaje_resultado, sesiones_movidas
        from horarios.resultados_edicion
        where horario_id = h.id order by creado_en desc limit 1
    ) r on true
    where h.id = p_horario_derivado_id
      and h.horario_origen_id is not null and h.eliminado_en is null;
    if not found then
        raise exception 'No se encontro una version derivada trazable';
    end if;

    with registro_mapa as (
      select solicitud_edicion -> 'mapa_sesiones' as mapa
      from horarios.resultados_edicion
      where horario_id = p_horario_derivado_id and solicitud_edicion ? 'mapa_sesiones'
      order by creado_en limit 1
    ), mapa as (
      select par.key::uuid origen_id, par.value::uuid derivada_id
      from registro_mapa cross join lateral jsonb_each_text(mapa) par
    ), origen as (
      select s.*, cu.codigo || ' - ' || cu.nombre curso
      from horarios.sesiones s join horarios.cursos cu on cu.id = s.curso_id
      where s.horario_id = v_origen_id
    ), derivada as (
      select s.*, cu.codigo || ' - ' || cu.nombre curso
      from horarios.sesiones s join horarios.cursos cu on cu.id = s.curso_id
      where s.horario_id = p_horario_derivado_id
    ), cambios as (
      select o.id as sesion_origen_id, d.id as sesion_derivada_id,
             coalesce(o.curso, d.curso) as curso, cambio.campo,
             coalesce(cambio.original, '—') as valor_original,
             coalesce(cambio.derivado, '—') as valor_derivado
      from mapa m join origen o on o.id=m.origen_id join derivada d on d.id=m.derivada_id
      cross join lateral (values
        ('Docente', o.docente_id::text, d.docente_id::text),
        ('Aula', o.aula_id::text, d.aula_id::text),
        ('Jornada', o.jornada_id::text, d.jornada_id::text),
        ('Dia', o.dia::text, d.dia::text),
        ('Bloque', o.indice_slot_inicio::text, d.indice_slot_inicio::text),
        ('Duracion', o.duracion_slots::text, d.duracion_slots::text)
      ) cambio(campo, original, derivado)
      where cambio.original is distinct from cambio.derivado
    )
    select coalesce(jsonb_agg(to_jsonb(cambios) order by curso, campo), '[]'::jsonb)
    into v_cambios from cambios;

    select coalesce(jsonb_agg(tipo || ': ' || descripcion order by creado_en, id), '[]'::jsonb)
    into v_conflictos
    from horarios.conflictos
    where horario_id = p_horario_derivado_id and es_restriccion_dura;

    return jsonb_build_object(
        'horario_origen_id', v_origen_id,
        'horario_derivado_id', p_horario_derivado_id,
        'numero_version', v_numero_version,
        'estado_reparacion', case when v_exitosa then 'reparada' else 'pendiente' end,
        'mensaje_reparacion', v_mensaje,
        'cambios', v_cambios,
        'conflictos', v_conflictos,
        'sesiones_movidas', v_movidas);
end;
$$;`,
  },
  {
    id: 'fn-crear_version_derivada',
    nombre: 'crear_version_derivada',
    cat: 'funcion',
    grupo: 'Edición manual y versiones',
    desc: 'Clona un horario publicado para poder mover una sesión sin tocar el original. Toma un advisory lock para que dos ediciones simultáneas no se pisen.',
    detalle: 'Un horario publicado es un documento oficial: ya lo vieron estudiantes y docentes. No se edita, se deriva.',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 1670,
    claves: '(uuid, uuid, uuid, uuid, uuid, text, integer, integer, integer, integer, text, text, uuid) rpc funcion p_horario_origen_id p_sesion_origen_id p_docente_id p_aula_id p_jornada_id p_dia p_indice_slot_inicio p_duracion_slots p_minuto_inicio p_minuto_fin p_motivo p_clave_solicitud p_usuario_id',
    params: [
      { n: 'p_horario_origen_id', t: 'uuid', d: '' },
      { n: 'p_sesion_origen_id', t: 'uuid', d: '' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
      { n: 'p_aula_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_dia', t: 'text', d: 'NULL' },
      { n: 'p_indice_slot_inicio', t: 'integer', d: 'NULL' },
      { n: 'p_duracion_slots', t: 'integer', d: 'NULL' },
      { n: 'p_minuto_inicio', t: 'integer', d: 'NULL' },
      { n: 'p_minuto_fin', t: 'integer', d: 'NULL' },
      { n: 'p_motivo', t: 'text', d: 'NULL' },
      { n: 'p_clave_solicitud', t: 'text', d: 'NULL' },
      { n: 'p_usuario_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Toma un advisory lock sobre el horario de origen.',
      'Si esa misma `clave_solicitud` ya había creado una versión, la devuelve sin duplicar nada.',
      'Clona la cabecera del horario publicado con número de versión nuevo y estado `borrador`.',
      'Arma un mapa de ids viejo→nuevo y copia con él todas las sesiones y sus cohortes.',
      'Aplica sobre la sesión elegida los cambios recibidos y la deja fijada.',
      'Registra el intento en `resultados_edicion` como pendiente de reparación; el horario original queda intacto.',
    ],
    sql: `CREATE FUNCTION horarios.crear_version_derivada(p_horario_origen_id uuid, p_sesion_origen_id uuid, p_docente_id uuid DEFAULT NULL::uuid, p_aula_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid, p_dia text DEFAULT NULL::text, p_indice_slot_inicio integer DEFAULT NULL::integer, p_duracion_slots integer DEFAULT NULL::integer, p_minuto_inicio integer DEFAULT NULL::integer, p_minuto_fin integer DEFAULT NULL::integer, p_motivo text DEFAULT NULL::text, p_clave_solicitud text DEFAULT NULL::text, p_usuario_id uuid DEFAULT NULL::uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_existente record;
    v_derivado_id uuid;
    v_numero_version integer;
    v_sesion_derivada_id uuid;
    v_mapa jsonb;
begin
    perform pg_advisory_xact_lock(hashtextextended(p_horario_origen_id::text, 0));
    select r.horario_id, h.numero_version, r.sesion_fijada_id
    into v_existente
    from horarios.resultados_edicion r
    join horarios.horarios h on h.id = r.horario_id
    where r.horario_origen_id = p_horario_origen_id
      and r.clave_solicitud = p_clave_solicitud
      and r.fue_exitoso
    order by r.creado_en desc limit 1;
    if found then
        return jsonb_build_object(
            'horario_origen_id', p_horario_origen_id,
            'horario_derivado_id', v_existente.horario_id,
            'numero_version', v_existente.numero_version,
            'sesion_derivada_id', v_existente.sesion_fijada_id,
            'original_intacto', true,
            'mensaje', 'La solicitud ya habia creado esta version derivada.');
    end if;

    insert into horarios.horarios
        (periodo_id, tipo_plan, horario_origen_id, numero_version, estado, fecha_generacion,
         costo_total_calculado, cantidad_violaciones_duras, configuracion_plan,
         generado_por_id, motivo_estado)
    select periodo_id, tipo_plan, id,
           (select coalesce(max(h2.numero_version), 0) + 1
            from horarios.horarios h2
            where h2.periodo_id = h.periodo_id and h2.tipo_plan = h.tipo_plan
              and h2.eliminado_en is null),
           'borrador', now(), costo_total_calculado, cantidad_violaciones_duras,
           configuracion_plan, p_usuario_id, p_motivo
    from horarios.horarios h
    where h.id = p_horario_origen_id and h.estado = 'publicado' and h.eliminado_en is null
    returning id, numero_version into v_derivado_id, v_numero_version;
    if not found then
        raise exception 'El horario de origen no existe o no esta publicado';
    end if;

    select jsonb_object_agg(id::text, gen_random_uuid()::text)
    into v_mapa from horarios.sesiones where horario_id = p_horario_origen_id;
    v_sesion_derivada_id := (v_mapa->>p_sesion_origen_id::text)::uuid;
    if v_sesion_derivada_id is null then
        raise exception 'La sesion no pertenece al horario de origen';
    end if;

    insert into horarios.sesiones
        (id, horario_id, curso_id, docente_id, aula_id, jornada_id, fecha_sesion, dia,
         indice_slot_inicio, duracion_slots, minuto_inicio_dia, minuto_fin_dia,
         esta_fijada, es_area_comun, agrupacion_area_comun_id)
    select (v_mapa->>s.id::text)::uuid, v_derivado_id, curso_id, docente_id, aula_id,
           jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots,
           minuto_inicio_dia, minuto_fin_dia, esta_fijada, es_area_comun,
           agrupacion_area_comun_id
    from horarios.sesiones s where s.horario_id = p_horario_origen_id;

    insert into horarios.sesion_cohortes
        (sesion_id, cohorte_id, curso_en_pensum_id, curso_visible_id, horario_id,
         fecha_sesion, dia, indice_slot_inicio, duracion_slots,
         minuto_inicio_dia, minuto_fin_dia)
    select (v_mapa->>sc.sesion_id::text)::uuid, cohorte_id, curso_en_pensum_id,
           curso_visible_id, v_derivado_id, fecha_sesion, dia, indice_slot_inicio,
           duracion_slots, minuto_inicio_dia, minuto_fin_dia
    from horarios.sesion_cohortes sc
    where sc.horario_id = p_horario_origen_id;

    update horarios.sesiones set
        docente_id = coalesce(p_docente_id, docente_id),
        aula_id = coalesce(p_aula_id, aula_id),
        jornada_id = coalesce(p_jornada_id, jornada_id),
        dia = coalesce(p_dia::horarios.dia_semana, dia),
        indice_slot_inicio = coalesce(p_indice_slot_inicio, indice_slot_inicio),
        duracion_slots = coalesce(p_duracion_slots, duracion_slots),
        minuto_inicio_dia = coalesce(p_minuto_inicio, minuto_inicio_dia),
        minuto_fin_dia = coalesce(p_minuto_fin, minuto_fin_dia),
        esta_fijada = true
    where id = v_sesion_derivada_id;
    update horarios.sesion_cohortes set
        dia = coalesce(p_dia::horarios.dia_semana, dia),
        indice_slot_inicio = coalesce(p_indice_slot_inicio, indice_slot_inicio),
        duracion_slots = coalesce(p_duracion_slots, duracion_slots),
        minuto_inicio_dia = coalesce(p_minuto_inicio, minuto_inicio_dia),
        minuto_fin_dia = coalesce(p_minuto_fin, minuto_fin_dia)
    where sesion_id = v_sesion_derivada_id;

    insert into horarios.resultados_edicion
        (horario_id, horario_origen_id, sesion_fijada_id, fue_exitoso,
         mensaje_resultado, clave_solicitud, solicitud_edicion,
         sesiones_vecindario, sesiones_movidas, creado_por_id)
    values
        (v_derivado_id, p_horario_origen_id, v_sesion_derivada_id, false,
         'Version derivada creada; reparacion y validacion pendientes.',
         p_clave_solicitud,
         jsonb_build_object('motivo', p_motivo, 'mapa_sesiones', v_mapa),
         '[]', jsonb_build_array(v_sesion_derivada_id::text), p_usuario_id);

    return jsonb_build_object(
        'horario_origen_id', p_horario_origen_id,
        'horario_derivado_id', v_derivado_id,
        'numero_version', v_numero_version,
        'sesion_derivada_id', v_sesion_derivada_id,
        'original_intacto', true,
        'mensaje', 'Version derivada creada; el horario publicado original permanece intacto.');
end;
$$;`,
  },
  {
    id: 'fn-consultar_datos_reporte',
    nombre: 'consultar_datos_reporte',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Arma encabezados y filas para exportar a PDF o XLSX. Exige que la generación esté `completada`.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · solo lee (STABLE)',
    tabla: '',
    linea: 1230,
    claves: '(uuid, text, uuid, uuid, uuid, uuid, uuid, uuid, uuid, text) rpc funcion p_generacion_id p_vista p_filtro_id p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_aula_id p_periodo_id p_tipo_plan',
    params: [
      { n: 'p_generacion_id', t: 'uuid', d: '' },
      { n: 'p_vista', t: 'text', d: '' },
      { n: 'p_filtro_id', t: 'uuid', d: 'NULL' },
      { n: 'p_carrera_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_cohorte_id', t: 'uuid', d: 'NULL' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
      { n: 'p_aula_id', t: 'uuid', d: 'NULL' },
      { n: 'p_periodo_id', t: 'uuid', d: 'NULL' },
      { n: 'p_tipo_plan', t: 'text', d: 'NULL' },
    ],
    pasos: [
      'Localiza el plan de esa generación y exige que su estado sea `completada`.',
      'Si la vista pedida es `diagnostico`, arma la tabla con los mensajes de la corrida.',
      'Si no, arma la tabla del horario —carrera, cohorte, curso, docente, aula, jornada, día, bloque y duración— aplicando los filtros.',
      'Devuelve encabezados y filas ya listos para exportar.',
    ],
    sql: `CREATE FUNCTION horarios.consultar_datos_reporte(p_generacion_id uuid, p_vista text, p_filtro_id uuid DEFAULT NULL::uuid, p_carrera_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid, p_cohorte_id uuid DEFAULT NULL::uuid, p_docente_id uuid DEFAULT NULL::uuid, p_aula_id uuid DEFAULT NULL::uuid, p_periodo_id uuid DEFAULT NULL::uuid, p_tipo_plan text DEFAULT NULL::text) RETURNS jsonb
    LANGUAGE plpgsql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_horario_id uuid;
    v_estado text;
    v_encabezados jsonb;
    v_filas jsonb;
begin
    select plan_id, estado::text into v_horario_id, v_estado
    from horarios.generaciones where id = p_generacion_id;
    if v_horario_id is null then
        raise exception 'No se encontro la generacion solicitada';
    end if;
    if v_estado <> 'completada' then
        raise exception 'Solo una generacion completada puede exportarse';
    end if;

    if p_vista = 'diagnostico' then
        v_encabezados := '["Codigo","Severidad","Mensaje"]'::jsonb;
        select coalesce(jsonb_agg(jsonb_build_object('celdas', jsonb_build_array(
            coalesce(codigo, ''), severidad::text, mensaje)) order by creado_en), '[]'::jsonb)
        into v_filas
        from horarios.mensajes_generacion
        where generacion_id = p_generacion_id;
    else
        v_encabezados := '["Carrera","Cohorte","Curso","Docente","Aula","Jornada","Dia","Bloque","Duracion"]'::jsonb;
        select coalesce(jsonb_agg(jsonb_build_object('celdas', jsonb_build_array(
            ca.nombre,
            co.anio_ingreso::text || '-' || co.seccion,
            cu.codigo || ' - ' || cu.nombre,
            d.nombre_completo, a.codigo, j.nombre, s.dia::text,
            s.indice_slot_inicio::text, s.duracion_slots::text))
            order by ca.nombre, co.anio_ingreso, co.seccion, s.dia, s.indice_slot_inicio),
            '[]'::jsonb)
        into v_filas
        from horarios.sesiones s
        join horarios.sesion_cohortes sc on sc.sesion_id = s.id
        join horarios.cohortes co on co.id = sc.cohorte_id
        join horarios.carreras ca on ca.id = co.carrera_id
        join horarios.cursos cu on cu.id = sc.curso_visible_id
        join horarios.docentes d on d.id = s.docente_id
        join horarios.aulas a on a.id = s.aula_id
        join horarios.jornadas j on j.id = s.jornada_id
        join horarios.horarios h on h.id = s.horario_id
        where s.horario_id = v_horario_id
          and (p_vista <> 'cohorte' or p_filtro_id is null or co.id = p_filtro_id)
          and (p_vista <> 'docente' or p_filtro_id is null or d.id = p_filtro_id)
          and (p_vista <> 'aula' or p_filtro_id is null or a.id = p_filtro_id)
          and (p_carrera_id is null or ca.id = p_carrera_id)
          and (p_jornada_id is null or j.id = p_jornada_id)
          and (p_cohorte_id is null or co.id = p_cohorte_id)
          and (p_docente_id is null or d.id = p_docente_id)
          and (p_aula_id is null or a.id = p_aula_id)
          and (p_periodo_id is null or h.periodo_id = p_periodo_id)
          and (p_tipo_plan is null or h.tipo_plan::text = p_tipo_plan);
    end if;

    return jsonb_build_object(
        'horario_id', v_horario_id,
        'generacion_id', p_generacion_id,
        'titulo', 'Horario por ' || initcap(p_vista),
        'encabezados', v_encabezados,
        'filas', v_filas);
end;
$$;`,
  },
  {
    id: 'fn-consultar_horario_publicado',
    nombre: 'consultar_horario_publicado',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Igual que la anterior pero solo sobre lo publicado. Es la que alimenta la vista pública.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 1303,
    claves: '(uuid, uuid, uuid, uuid, integer, boolean, boolean, uuid, uuid[]) rpc funcion p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_limite p_publico p_ver_todo p_docente_alcance_id p_facultad_ids',
    params: [
      { n: 'p_carrera_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_cohorte_id', t: 'uuid', d: 'NULL' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
      { n: 'p_limite', t: 'integer', d: '500' },
      { n: 'p_publico', t: 'boolean', d: 'true' },
      { n: 'p_ver_todo', t: 'boolean', d: 'false' },
      { n: 'p_docente_alcance_id', t: 'uuid', d: 'NULL' },
      { n: 'p_facultad_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Filtra la misma vista, que ya trae la sustitución vigente aplicada.',
      'Aplica el mismo alcance por docente y por facultades.',
      'Añade un aviso legible cuando la sesión tiene sustitución, ausencia o cancelación.',
      'Devuelve como mucho 1 000 filas.',
    ],
    sql: `CREATE FUNCTION horarios.consultar_horario_publicado(p_carrera_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid, p_cohorte_id uuid DEFAULT NULL::uuid, p_docente_id uuid DEFAULT NULL::uuid, p_limite integer DEFAULT 500, p_publico boolean DEFAULT true, p_ver_todo boolean DEFAULT false, p_docente_alcance_id uuid DEFAULT NULL::uuid, p_facultad_ids uuid[] DEFAULT '{}'::uuid[]) RETURNS jsonb
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(to_jsonb(resultado) order by
        resultado.periodo_fecha_inicio desc, resultado.carrera, resultado.jornada,
        resultado.anio_ingreso, resultado.cohorte_seccion, resultado.dia_orden,
        resultado.minuto_inicio, resultado.curso_codigo), '[]'::jsonb)
    from (
        select horario_id, sesion_id, periodo_nombre as periodo,
               carrera_nombre as carrera, jornada_nombre as jornada,
               anio_ingreso::text || '-' || cohorte_seccion as cohorte,
               curso_codigo || ' - ' || curso_nombre as curso,
               docente_visible_nombre as docente, aula_codigo as aula,
               dia::text as dia, minuto_inicio_dia as minuto_inicio,
               minuto_fin_dia as minuto_fin,
               sustitucion_id is not null as tiene_sustitucion,
               case when sustitucion_id is null then null
                    when tipo_sustitucion = 'cancelacion_sesion' then
                        'Sesion cancelada: ' || coalesce(sustitucion_motivo, '')
                    when tipo_sustitucion = 'permiso_ausencia' then
                        'Docente ausente: ' || coalesce(sustitucion_motivo, '')
                    else 'Sustitucion vigente: ' || docente_visible_nombre end
                    as aviso_sustitucion,
               periodo_fecha_inicio, anio_ingreso, cohorte_seccion,
               dia as dia_orden, curso_codigo
        from horarios.vista_horarios_publicados_con_sustituciones
        where (p_carrera_id is null or carrera_id = p_carrera_id)
          and (p_jornada_id is null or jornada_id = p_jornada_id)
          and (p_cohorte_id is null or cohorte_id = p_cohorte_id)
          and (p_docente_id is null or docente_visible_id = p_docente_id)
          and (p_publico or p_ver_todo
               or (p_docente_alcance_id is not null and docente_visible_id = p_docente_alcance_id)
               or facultad_id = any(p_facultad_ids))
        order by periodo_fecha_inicio desc, carrera_nombre, jornada_nombre,
                 anio_ingreso, cohorte_seccion, dia, minuto_inicio_dia, curso_codigo
        limit least(greatest(coalesce(p_limite, 500), 1), 1000)
    ) resultado;
$$;`,
  },
  {
    id: 'fn-consultar_horarios',
    nombre: 'consultar_horarios',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Consulta paginada y filtrada del horario (por carrera, jornada, cohorte, docente o aula). Los últimos parámetros aplican el alcance del usuario.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 1348,
    claves: '(uuid, uuid, uuid, uuid, uuid, integer, integer, boolean, boolean, uuid, uuid[]) rpc funcion p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_aula_id p_pagina p_tamano_pagina p_publico p_ver_todo p_docente_alcance_id p_facultad_ids',
    params: [
      { n: 'p_carrera_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_cohorte_id', t: 'uuid', d: 'NULL' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
      { n: 'p_aula_id', t: 'uuid', d: 'NULL' },
      { n: 'p_pagina', t: 'integer', d: '1' },
      { n: 'p_tamano_pagina', t: 'integer', d: '50' },
      { n: 'p_publico', t: 'boolean', d: 'true' },
      { n: 'p_ver_todo', t: 'boolean', d: 'false' },
      { n: 'p_docente_alcance_id', t: 'uuid', d: 'NULL' },
      { n: 'p_facultad_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Filtra la vista de horarios publicados por cada parámetro que no venga nulo.',
      'Aplica el alcance: si no es consulta pública ni «ver todo», deja solo lo del propio docente o lo de sus facultades.',
      'Ordena y pagina, con un tamaño de página de 200 como techo.',
      'Devuelve los elementos junto con página, tamaño y total.',
    ],
    sql: `CREATE FUNCTION horarios.consultar_horarios(p_carrera_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid, p_cohorte_id uuid DEFAULT NULL::uuid, p_docente_id uuid DEFAULT NULL::uuid, p_aula_id uuid DEFAULT NULL::uuid, p_pagina integer DEFAULT 1, p_tamano_pagina integer DEFAULT 50, p_publico boolean DEFAULT true, p_ver_todo boolean DEFAULT false, p_docente_alcance_id uuid DEFAULT NULL::uuid, p_facultad_ids uuid[] DEFAULT '{}'::uuid[]) RETURNS jsonb
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'public'
    AS $$
    with filtradas as (
        select horario_id, sesion_id, periodo_nombre as periodo,
               carrera_nombre as carrera, jornada_nombre as jornada,
               anio_ingreso::text || '-' || cohorte_seccion as cohorte,
               curso_codigo || ' - ' || curso_nombre as curso,
               docente_visible_nombre as docente, aula_codigo as aula,
               dia::text as dia, minuto_inicio_dia as minuto_inicio,
               minuto_fin_dia as minuto_fin,
               periodo_fecha_inicio, anio_ingreso, cohorte_seccion,
               dia as dia_orden, curso_codigo
        from horarios.vista_horarios_publicados_con_sustituciones
        where (p_carrera_id is null or carrera_id = p_carrera_id)
          and (p_jornada_id is null or jornada_id = p_jornada_id)
          and (p_cohorte_id is null or cohorte_id = p_cohorte_id)
          and (p_docente_id is null or docente_visible_id = p_docente_id)
          and (p_aula_id is null or aula_id = p_aula_id)
          and (p_publico or p_ver_todo
               or (p_docente_alcance_id is not null and docente_visible_id = p_docente_alcance_id)
               or facultad_id = any(p_facultad_ids))
    ), pagina as (
        select * from filtradas
        order by periodo_fecha_inicio desc, carrera, jornada, anio_ingreso,
                 cohorte_seccion, dia_orden, minuto_inicio, curso_codigo
        limit least(greatest(coalesce(p_tamano_pagina, 50), 1), 200)
        offset ((greatest(coalesce(p_pagina, 1), 1) - 1)
            * least(greatest(coalesce(p_tamano_pagina, 50), 1), 200))
    )
    select jsonb_build_object(
        'elementos', coalesce((select jsonb_agg(jsonb_build_object(
            'horario_id', horario_id, 'sesion_id', sesion_id, 'periodo', periodo,
            'carrera', carrera, 'jornada', jornada, 'cohorte', cohorte,
            'curso', curso, 'docente', docente, 'aula', aula, 'dia', dia,
            'minuto_inicio', minuto_inicio, 'minuto_fin', minuto_fin)) from pagina), '[]'::jsonb),
        'pagina', greatest(coalesce(p_pagina, 1), 1),
        'tamano_pagina', least(greatest(coalesce(p_tamano_pagina, 50), 1), 200),
        'total', (select count(*) from filtradas));
$$;`,
  },
  {
    id: 'fn-consultar_revision_horario',
    nombre: 'consultar_revision_horario',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'La vista de revisión previa a aprobar, con los mismos filtros y paginación.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 1395,
    claves: '(uuid, uuid, uuid, uuid, uuid, uuid, integer, integer, boolean, uuid, uuid[]) rpc funcion p_horario_id p_cohorte_id p_docente_filtro_id p_aula_id p_carrera_id p_jornada_id p_pagina p_tamano_pagina p_ver_todo p_docente_alcance_id p_facultad_ids',
    params: [
      { n: 'p_horario_id', t: 'uuid', d: '' },
      { n: 'p_cohorte_id', t: 'uuid', d: 'NULL' },
      { n: 'p_docente_filtro_id', t: 'uuid', d: 'NULL' },
      { n: 'p_aula_id', t: 'uuid', d: 'NULL' },
      { n: 'p_carrera_id', t: 'uuid', d: 'NULL' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_pagina', t: 'integer', d: '1' },
      { n: 'p_tamano_pagina', t: 'integer', d: '100' },
      { n: 'p_ver_todo', t: 'boolean', d: 'false' },
      { n: 'p_docente_alcance_id', t: 'uuid', d: 'NULL' },
      { n: 'p_facultad_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Junta sesiones, cursos, docentes, aulas, jornadas y cohortes del horario indicado.',
      'Filtra por los parámetros dados y por el alcance del usuario.',
      'Pagina las sesiones y agrega, aparte, los conflictos y las sesiones pendientes.',
      'Devuelve todo en un solo objeto para la pantalla de revisión.',
    ],
    sql: `CREATE FUNCTION horarios.consultar_revision_horario(p_horario_id uuid, p_cohorte_id uuid DEFAULT NULL::uuid, p_docente_filtro_id uuid DEFAULT NULL::uuid, p_aula_id uuid DEFAULT NULL::uuid, p_carrera_id uuid DEFAULT NULL::uuid, p_jornada_id uuid DEFAULT NULL::uuid, p_pagina integer DEFAULT 1, p_tamano_pagina integer DEFAULT 100, p_ver_todo boolean DEFAULT false, p_docente_alcance_id uuid DEFAULT NULL::uuid, p_facultad_ids uuid[] DEFAULT '{}'::uuid[]) RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    with sesiones_filtradas as (
        select s.id as sesion_id, cu.codigo || ' - ' || cu.nombre as curso,
               co.anio_ingreso::text || '-' || co.seccion as cohorte, co.id as cohorte_id,
               d.nombre_completo as docente, d.id as docente_id,
               a.codigo as aula, a.id as aula_id, ca.nombre as carrera, ca.id as carrera_id,
               j.nombre as jornada, j.id as jornada_id, s.dia::text as dia,
               s.indice_slot_inicio, s.duracion_slots,
               s.minuto_inicio_dia as minuto_inicio, s.minuto_fin_dia as minuto_fin,
               s.dia as dia_orden, co.anio_ingreso, co.seccion
        from horarios.sesiones s
        join horarios.cursos cu on cu.id = s.curso_id
        join horarios.docentes d on d.id = s.docente_id
        join horarios.aulas a on a.id = s.aula_id
        join horarios.jornadas j on j.id = s.jornada_id
        join horarios.sesion_cohortes sc on sc.sesion_id = s.id
        join horarios.cohortes co on co.id = sc.cohorte_id
        join horarios.carreras ca on ca.id = co.carrera_id
        where s.horario_id = p_horario_id
          and (p_cohorte_id is null or co.id = p_cohorte_id)
          and (p_docente_filtro_id is null or d.id = p_docente_filtro_id)
          and (p_aula_id is null or a.id = p_aula_id)
          and (p_carrera_id is null or ca.id = p_carrera_id)
          and (p_jornada_id is null or j.id = p_jornada_id)
          and (p_ver_todo
               or (p_docente_alcance_id is not null and d.id = p_docente_alcance_id)
               or ca.facultad_id = any(p_facultad_ids))
    ), pagina as (
        select * from sesiones_filtradas
        order by dia_orden, indice_slot_inicio, carrera, anio_ingreso, seccion
        limit p_tamano_pagina offset ((p_pagina - 1) * p_tamano_pagina)
    ), conflictos as (
        select c.tipo as codigo, c.descripcion as mensaje, c.severidad::text as severidad,
               c.es_restriccion_dura,
               min(cs.sesion_id::text)::uuid as sesion_id, c.creado_en
        from horarios.conflictos c
        left join horarios.conflicto_sesiones cs on cs.conflicto_id = c.id
        left join horarios.sesiones s on s.id = cs.sesion_id
        left join horarios.sesion_cohortes sc on sc.sesion_id = s.id
        left join horarios.cohortes co on co.id = sc.cohorte_id
        left join horarios.carreras ca on ca.id = co.carrera_id
        where c.horario_id = p_horario_id
          and (p_ver_todo or (p_docente_alcance_id is not null and s.docente_id = p_docente_alcance_id)
               or ca.facultad_id = any(p_facultad_ids))
        group by c.id
    ), pendientes as (
        select 'SESION_PENDIENTE'::text as codigo, p.motivo_no_asignacion as mensaje,
               'alta'::text as severidad, true as es_restriccion_dura,
               null::uuid as sesion_id, p.creado_en
        from horarios.sesiones_no_asignadas p
        join horarios.cohortes co on co.id = p.cohorte_id
        join horarios.carreras ca on ca.id = co.carrera_id
        where p.horario_id = p_horario_id
          and (p_ver_todo or ca.facultad_id = any(p_facultad_ids))
    )
    select jsonb_build_object(
        'sesiones', coalesce((select jsonb_agg(to_jsonb(pagina) - 'dia_orden' - 'anio_ingreso' - 'seccion'
            order by dia_orden, indice_slot_inicio, carrera, anio_ingreso, seccion) from pagina), '[]'::jsonb),
        'conflictos', coalesce((select jsonb_agg(to_jsonb(conflictos) - 'creado_en'
            order by es_restriccion_dura desc, creado_en) from conflictos), '[]'::jsonb),
        'pendientes', coalesce((select jsonb_agg(to_jsonb(pendientes) - 'creado_en'
            order by creado_en) from pendientes), '[]'::jsonb),
        'total_sesiones', (select count(*)::integer from sesiones_filtradas),
        'pagina', p_pagina,
        'tamano_pagina', p_tamano_pagina);
$$;`,
  },
  {
    id: 'fn-listar_cohortes_publicadas',
    nombre: 'listar_cohortes_publicadas',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Opciones del selector público: las cohortes que ya tienen horario publicado, con etiqueta legible.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2157,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Saca las cohortes distintas de la vista de horarios publicados.',
      'Arma para cada una la etiqueta «carrera · jornada · año-sección».',
      'Ordena por etiqueta y devuelve `[]` si no hay nada publicado.',
    ],
    sql: `CREATE FUNCTION horarios.listar_cohortes_publicadas() RETURNS jsonb
    LANGUAGE sql STABLE
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(to_jsonb(opcion) order by opcion.etiqueta), '[]'::jsonb)
    from (
        select distinct
               cohorte_id as id,
               carrera_id,
               jornada_id,
               carrera_nombre || ' · ' || jornada_nombre || ' · '
                   || anio_ingreso::text || '-' || cohorte_seccion as etiqueta
        from horarios.vista_horarios_publicados_con_sustituciones
    ) opcion;
$$;`,
  },
  {
    id: 'fn-listar_sustituciones_publicadas',
    nombre: 'listar_sustituciones_publicadas',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Sustituciones vigentes en una fecha para un horario publicado.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 2230,
    claves: '(uuid, date) rpc funcion p_horario_id p_fecha',
    params: [
      { n: 'p_horario_id', t: 'uuid', d: '' },
      { n: 'p_fecha', t: 'date', d: '' },
    ],
    pasos: [
      'Recorre las sustituciones activas de las sesiones de ese horario, exigiendo que el horario esté publicado.',
      'Deja solo las vigentes en la fecha pedida según su tipo: la temporal por rango de fechas, la permanente desde su fecha de cambio.',
    ],
    sql: `CREATE FUNCTION horarios.listar_sustituciones_publicadas(p_horario_id uuid, p_fecha date) RETURNS jsonb
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(jsonb_build_object(
        'id', e.id,
        'sesion_afectada_id', e.sesion_afectada_id,
        'docente_original_id', e.docente_original_id,
        'docente_entrante_id', e.docente_entrante_id,
        'tipo', e.tipo::text,
        'fecha_inicio', e.fecha_inicio,
        'fecha_cambio', e.fecha_cambio,
        'fecha_fin', e.fecha_fin,
        'motivo_evento', e.motivo_evento,
        'registrado_por_id', e.registrado_por_id,
        'estado', e.estado::text)
        order by e.fecha_registro), '[]'::jsonb)
    from horarios.eventos_sustitucion e
    join horarios.sesiones s on s.id = e.sesion_afectada_id
    join horarios.horarios h on h.id = s.horario_id
    where h.id = p_horario_id and h.estado = 'publicado'
      and e.estado = 'activo' and e.eliminado_en is null
      and ((e.tipo = 'sustitucion_temporal' and p_fecha between e.fecha_inicio and e.fecha_fin)
           or (e.tipo = 'sustitucion_permanente' and p_fecha >= e.fecha_cambio));
$$;`,
  },
  {
    id: 'fn-confirmar_importacion',
    nombre: 'confirmar_importacion',
    cat: 'funcion',
    grupo: 'Importación y mantenimiento',
    desc: 'Aplica un archivo ya validado: registra la importación y vuelca las filas a los catálogos que correspondan.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 991,
    claves: '(text, text, text, text, text, integer, uuid, text, jsonb, jsonb) rpc funcion p_tipo_archivo p_nombre_archivo p_hash_archivo p_version_plantilla p_clave_solicitud p_total_filas p_solicitada_por_id p_codigo_plantilla p_filas p_resumen',
    params: [
      { n: 'p_tipo_archivo', t: 'text', d: '' },
      { n: 'p_nombre_archivo', t: 'text', d: '' },
      { n: 'p_hash_archivo', t: 'text', d: '' },
      { n: 'p_version_plantilla', t: 'text', d: '' },
      { n: 'p_clave_solicitud', t: 'text', d: '' },
      { n: 'p_total_filas', t: 'integer', d: '' },
      { n: 'p_solicitada_por_id', t: 'uuid', d: '' },
      { n: 'p_codigo_plantilla', t: 'text', d: '' },
      { n: 'p_filas', t: 'jsonb', d: '' },
      { n: 'p_resumen', t: 'jsonb', d: '' },
    ],
    pasos: [
      'Crea la importación enlazándola con la plantilla vigente de ese código y versión; si no la encuentra, falla.',
      'Recorre las filas recibidas y, según la sección de cada una (facultades, carreras, cursos, aulas, docentes, disponibilidades…), inserta o actualiza el catálogo que corresponda.',
      'Si una fila no llega a afectar ningún registro, aborta la carga entera: no queda a medias.',
      'Marca la importación como `aplicada` y devuelve el resumen.',
    ],
    sql: `CREATE FUNCTION horarios.confirmar_importacion(p_tipo_archivo text, p_nombre_archivo text, p_hash_archivo text, p_version_plantilla text, p_clave_solicitud text, p_total_filas integer, p_solicitada_por_id uuid, p_codigo_plantilla text, p_filas jsonb, p_resumen jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
    v_fila jsonb;
    v jsonb;
    v_seccion text;
    v_afectadas integer;
    v_finalizada_en timestamptz;
begin
    insert into horarios.importaciones
        (tipo_archivo, nombre_archivo, hash_archivo, plantilla_id, plantilla_version,
         clave_solicitud, estado, total_filas, solicitada_por_id)
    select p_tipo_archivo::horarios.tipo_archivo_importacion,
           p_nombre_archivo, p_hash_archivo, p.id, p_version_plantilla,
           p_clave_solicitud, 'validando', p_total_filas, p_solicitada_por_id
    from horarios.plantillas_importacion p
    where p.codigo = p_codigo_plantilla
      and p.version = p_version_plantilla and p.esta_vigente
    returning id into v_id;
    if v_id is null then
        raise exception 'La plantilla indicada no existe o no esta vigente';
    end if;

    for v_fila in select value from jsonb_array_elements(p_filas)
    loop
        v_seccion := v_fila->>'seccion';
        v := v_fila->'valores';
        v_afectadas := 0;

        case v_seccion
        when 'facultades' then
            insert into horarios.facultades(codigo,nombre)
            values(upper(trim(v->>'codigo')), trim(v->>'nombre'))
            on conflict (codigo) where eliminado_en is null
            do update set nombre=excluded.nombre, actualizado_en=now();
        when 'carreras' then
            insert into horarios.carreras
                (facultad_id,codigo,nombre,nivel_academico,duracion_en_semestres)
            select id, upper(trim(v->>'codigo')), trim(v->>'nombre'),
                   trim(v->>'nivel_academico'),
                   coalesce(nullif(trim(v->>'duracion_semestres'),'')::integer, 1)
            from horarios.facultades
            where codigo=upper(trim(v->>'facultad_codigo')) and eliminado_en is null
            on conflict (codigo) where eliminado_en is null
            do update set nombre=excluded.nombre,
                          nivel_academico=excluded.nivel_academico,
                          duracion_en_semestres=excluded.duracion_en_semestres,
                          actualizado_en=now();
        when 'jornadas' then
            insert into horarios.jornadas
                (nombre,dias_activos,hora_inicio,hora_fin,duracion_bloque_minutos,
                 bloques_por_dia,receso_despues_bloque,duracion_receso_minutos)
            values(trim(v->>'nombre'),
                   string_to_array(lower(replace(v->>'dias_activos',' ','')), ',')::horarios.dia_semana[],
                   (v->>'hora_inicio')::time, (v->>'hora_fin')::time,
                   coalesce(nullif(v->>'duracion_bloque_minutos','')::integer,1),
                   coalesce(nullif(v->>'bloques_por_dia','')::integer,1),
                   coalesce(nullif(v->>'receso_despues_bloque','')::integer,0),
                   coalesce(nullif(v->>'duracion_receso_minutos','')::integer,0))
            on conflict (lower(nombre)) where eliminado_en is null
            do update set dias_activos=excluded.dias_activos,
                          hora_inicio=excluded.hora_inicio, hora_fin=excluded.hora_fin,
                          duracion_bloque_minutos=excluded.duracion_bloque_minutos,
                          bloques_por_dia=excluded.bloques_por_dia,
                          receso_despues_bloque=excluded.receso_despues_bloque,
                          duracion_receso_minutos=excluded.duracion_receso_minutos,
                          actualizado_en=now();
        when 'pensums' then
            insert into horarios.pensums(carrera_id,anio_creacion)
            select id, coalesce(nullif(v->>'anio_creacion','')::integer,
                                nullif(v->>'codigo','')::integer,
                                extract(year from now())::integer)
            from horarios.carreras
            where codigo=upper(trim(v->>'carrera_codigo')) and eliminado_en is null
            on conflict (carrera_id,anio_creacion) where eliminado_en is null
            do update set actualizado_en=now();
        when 'cursos' then
            insert into horarios.cursos(codigo,nombre)
            values(upper(trim(v->>'codigo')),trim(v->>'nombre'))
            on conflict (codigo) where eliminado_en is null
            do update set nombre=excluded.nombre,actualizado_en=now();
        when 'periodos_academicos' then
            insert into horarios.periodos_academicos(nombre,fecha_inicio,fecha_fin,estado)
            values(trim(v->>'codigo'),(v->>'fecha_inicio')::date,(v->>'fecha_fin')::date,'vigente')
            on conflict (lower(nombre)) where eliminado_en is null
            do update set fecha_inicio=excluded.fecha_inicio,
                          fecha_fin=excluded.fecha_fin,
                          actualizado_en=now();
        when 'cursos_en_pensum' then
            insert into horarios.cursos_en_pensum
                (pensum_id,curso_id,semestre_asignado,bloques_semanales_exactos,
                 duracion_slots,prefiere_bloques_consecutivos)
            select pe.id,cu.id,
                   (v->>'semestre_asignado')::integer,
                   (v->>'bloques_semanales_exactos')::integer,
                   coalesce(nullif(v->>'duracion_slots','')::integer,1),
                   coalesce(nullif(v->>'prefiere_bloques_consecutivos','') in ('si','sí','true','1'),false)
            from horarios.carreras ca
            join horarios.pensums pe on pe.carrera_id=ca.id
              and pe.anio_creacion=coalesce(nullif(v->>'pensum_anio','')::integer,
                                            nullif(v->>'pensum_codigo','')::integer,
                                            extract(year from now())::integer)
              and pe.eliminado_en is null
            cross join horarios.cursos cu
            where ca.codigo=upper(trim(v->>'carrera_codigo')) and ca.eliminado_en is null
              and cu.codigo=upper(trim(v->>'curso_codigo')) and cu.eliminado_en is null
            on conflict (pensum_id,curso_id)
            do update set semestre_asignado=excluded.semestre_asignado,
                          bloques_semanales_exactos=excluded.bloques_semanales_exactos,
                          duracion_slots=excluded.duracion_slots,
                          prefiere_bloques_consecutivos=excluded.prefiere_bloques_consecutivos,
                          actualizado_en=now();
        when 'cohorte_periodos' then
            insert into horarios.cohorte_periodos
                (cohorte_id,periodo_id,semestre_asignado,matricula_estimada,esta_activa)
            select co.id,pa.id,
                   (v->>'semestre_asignado')::integer,
                   (v->>'matricula_estimada')::integer,
                   true
            from horarios.cohortes co
            join horarios.carreras ca on ca.id=co.carrera_id and ca.eliminado_en is null
            join horarios.jornadas j on j.id=co.jornada_id and j.eliminado_en is null
            cross join horarios.periodos_academicos pa
            where ca.codigo=upper(trim(v->>'carrera_codigo'))
              and lower(j.nombre)=lower(trim(v->>'jornada_codigo'))
              and co.anio_ingreso=coalesce(nullif(v->>'anio_ingreso','')::integer,1)
              and lower(co.seccion)=lower(trim(v->>'seccion'))
              and co.eliminado_en is null
              and lower(pa.nombre)=lower(trim(v->>'periodo_codigo'))
              and pa.eliminado_en is null
            on conflict (periodo_id,cohorte_id) where eliminado_en is null
            do update set semestre_asignado=excluded.semestre_asignado,
                          matricula_estimada=excluded.matricula_estimada,
                          esta_activa=true,
                          actualizado_en=now();
        when 'cohortes' then
            insert into horarios.cohortes
                (carrera_id,pensum_id,jornada_id,anio_ingreso,seccion,matricula_estimada)
            select ca.id,pe.id,j.id,
                   coalesce(nullif(v->>'anio_ingreso','')::integer,1),
                   trim(v->>'seccion'),
                   coalesce(nullif(v->>'matricula_estimada','')::integer,1)
            from horarios.carreras ca
            join horarios.pensums pe on pe.carrera_id=ca.id
              and pe.anio_creacion=coalesce(nullif(v->>'pensum_anio','')::integer,
                                            nullif(v->>'pensum_codigo','')::integer,
                                            extract(year from now())::integer)
            join horarios.jornadas j on lower(j.nombre)=lower(trim(
                coalesce(v->>'jornada_codigo',v->>'jornada_nombre')))
            where ca.codigo=upper(trim(v->>'carrera_codigo'))
              and ca.eliminado_en is null and pe.eliminado_en is null and j.eliminado_en is null;
        when 'docentes' then
            insert into horarios.docentes(codigo,nombre_completo,correo,carga_maxima_cursos)
            values(upper(trim(v->>'codigo')),trim(v->>'nombre_completo'),
                   lower(trim(v->>'correo')),
                   coalesce(nullif(v->>'carga_maxima_cursos','')::integer,6))
            on conflict (codigo) where eliminado_en is null
            do update set nombre_completo=excluded.nombre_completo,
                          correo=excluded.correo,
                          carga_maxima_cursos=excluded.carga_maxima_cursos,
                          actualizado_en=now();
        when 'aulas' then
            insert into horarios.aulas(codigo,capacidad_maxima,tipo,piso,numero_aula)
            values(upper(trim(v->>'codigo')),
                   coalesce(nullif(v->>'capacidad','')::integer,1),
                   lower(trim(v->>'tipo'))::horarios.tipo_aula,
                   coalesce(nullif(v->>'piso','')::integer,1),
                   nullif(v->>'numero_aula','')::integer)
            on conflict (codigo) where eliminado_en is null
            do update set capacidad_maxima=excluded.capacidad_maxima,tipo=excluded.tipo,
                          piso=excluded.piso,numero_aula=excluded.numero_aula,actualizado_en=now();
        when 'recursos' then
            insert into horarios.recursos(codigo,nombre)
            values(upper(trim(v->>'codigo')),trim(v->>'nombre'))
            on conflict (codigo) where eliminado_en is null
            do update set nombre=excluded.nombre,actualizado_en=now();
        when 'autorizaciones_docente' then
            insert into horarios.asignaciones_docente_curso(docente_id,curso_id)
            select d.id,c.id from horarios.docentes d cross join horarios.cursos c
            where d.codigo=upper(trim(v->>'docente_codigo'))
              and c.codigo=upper(trim(v->>'curso_codigo'))
              and d.eliminado_en is null and c.eliminado_en is null
            on conflict do nothing;
        when 'disponibilidades_docente' then
            -- esta_confirmada debe quedar en true: el motor solo mira la disponibilidad
            -- confirmada y quien carga el archivo ya la esta confirmando.
            with disp as (
                insert into horarios.disponibilidades_docente(docente_id,periodo_id,esta_confirmada)
                select d.id,pa.id,true from horarios.docentes d
                cross join horarios.periodos_academicos pa
                where d.codigo=upper(trim(v->>'docente_codigo'))
                  and lower(pa.nombre)=lower(trim(v->>'periodo_codigo'))
                on conflict (docente_id,periodo_id)
                do update set esta_confirmada=true,actualizado_en=now() returning id)
            insert into horarios.disponibilidad_docente_slots
                (disponibilidad_id,jornada_id,dia,indice_slot)
            select disp.id,j.id,
                   translate(lower(trim(v->>'dia')),'áéíóú','aeiou')::horarios.dia_semana,
                   coalesce(nullif(v->>'indice_slot','')::integer,1)
            from disp cross join horarios.jornadas j
            where lower(j.nombre)=lower(trim(v->>'jornada_codigo'))
            on conflict do nothing;
        when 'aula_recursos' then
            insert into horarios.aula_recursos(aula_id,recurso_id,cantidad)
            select a.id,r.id,coalesce(nullif(v->>'cantidad','')::integer,1)
            from horarios.aulas a cross join horarios.recursos r
            where a.codigo=upper(trim(v->>'aula_codigo'))
              and r.codigo=upper(trim(v->>'recurso_codigo'))
            on conflict (aula_id,recurso_id)
            do update set cantidad=excluded.cantidad;
        else
            raise exception 'Seccion de importacion no soportada: %', v_seccion;
        end case;

        get diagnostics v_afectadas = row_count;
        if v_afectadas = 0 and v_seccion <> 'cohortes' then
            raise exception 'No se pudo guardar una fila de %; revise sus referencias', v_seccion;
        end if;
    end loop;

    update horarios.importaciones
    set estado='aplicada', total_filas=p_total_filas, filas_validas=p_total_filas,
        filas_invalidas=0, finalizada_en=now(), resumen=p_resumen
    where id=v_id returning finalizada_en into v_finalizada_en;

    return jsonb_build_object(
        'id', v_id, 'estado', 'aplicada', 'total_filas', p_total_filas,
        'finalizada_en', v_finalizada_en);
end;
$$;`,
  },
  {
    id: 'fn-restaurar_entidad',
    nombre: 'restaurar_entidad',
    cat: 'funcion',
    grupo: 'Importación y mantenimiento',
    desc: 'Deshace un borrado lógico poniendo `eliminado_en = NULL`. Solo sobre una lista blanca de tablas.',
    detalle: 'Existe porque nada se borra de verdad: el borrado marca fecha. Con DELETE real esto sería imposible.',
    nota: 'devuelve jsonb · plpgsql · escribe',
    tabla: '',
    linea: 2381,
    claves: '(text, uuid, text, uuid) rpc funcion p_entidad p_entidad_id p_motivo p_usuario_id',
    params: [
      { n: 'p_entidad', t: 'text', d: '' },
      { n: 'p_entidad_id', t: 'uuid', d: '' },
      { n: 'p_motivo', t: 'text', d: '' },
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Comprueba que la tabla esté en la lista blanca de diez catálogos restaurables.',
      'Pone `eliminado_en` en nulo y sube `version_fila`; exige haber afectado exactamente una fila.',
      'Deja constancia en `auditoria` y avisa al usuario con una notificación.',
    ],
    sql: `CREATE FUNCTION horarios.restaurar_entidad(p_entidad text, p_entidad_id uuid, p_motivo text, p_usuario_id uuid) RETURNS jsonb
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $_$
declare
    v_permitidas constant text[] := array[
        'facultades','carreras','pensums','cohortes','cursos','docentes',
        'aulas','jornadas','recursos','horarios'];
    v_afectadas integer;
    v_notificacion_id uuid;
begin
    if not p_entidad = any(v_permitidas) then
        raise exception 'Entidad no restaurable';
    end if;

    execute format(
        'update horarios.%I set eliminado_en = null, actualizado_en = now(), '
        'version_fila = version_fila + 1 where id = $1 and eliminado_en is not null',
        p_entidad)
    using p_entidad_id;
    get diagnostics v_afectadas = row_count;
    if v_afectadas <> 1 then
        raise exception 'El elemento no existe, no esta eliminado o ya fue restaurado';
    end if;

    insert into horarios.auditoria
        (usuario_id, accion, entidad, entidad_id, motivo, valores_nuevos)
    values
        (p_usuario_id, 'restaurar', p_entidad, p_entidad_id, p_motivo,
         '{"eliminado_en":null}'::jsonb);

    insert into horarios.notificaciones
        (destinatario_id, tipo_notificacion, asunto, mensaje_cuerpo, estado)
    values
        (p_usuario_id, 'restauracion_logica', 'Elemento restaurado',
         'Se restauro ' || p_entidad || ' ' || p_entidad_id::text || '. Motivo: ' || p_motivo,
         'enviada')
    returning id into v_notificacion_id;

    return jsonb_build_object(
        'entidad', p_entidad,
        'entidad_id', p_entidad_id,
        'restaurado', true,
        'notificacion_id', v_notificacion_id);
end;
$_$;`,
  },
  {
    id: 'fn-actualizar_marca',
    nombre: 'actualizar_marca',
    cat: 'funcion',
    grupo: 'Trigger · marca de tiempo y versión',
    desc: 'Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 390,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Pone `actualizado_en = now()` en la fila que se está guardando.',
    ],
    sql: `CREATE FUNCTION horarios.actualizar_marca() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;`,
  },
  {
    id: 'fn-actualizar_marca_con_version',
    nombre: 'actualizar_marca_con_version',
    cat: 'funcion',
    grupo: 'Trigger · marca de tiempo y versión',
    desc: 'Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: 'Está enganchada a 17 tablas. Nadie escribe esos dos campos a mano.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 404,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Pone `actualizado_en = now()`.',
      'Sube `version_fila` en uno respecto de la fila anterior.',
    ],
    sql: `CREATE FUNCTION horarios.actualizar_marca_con_version() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  new.actualizado_en = now();
  new.version_fila = old.version_fila + 1;
  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_cohorte_periodo',
    nombre: 'validar_cohorte_periodo',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza activar una cohorte que no existe o no está activa, o con un semestre que excede la carrera o el pensum.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2533,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee la cohorte y la duración de su carrera; falla si no existe o no está activa.',
      'Rechaza un semestre mayor que la duración de la carrera.',
      'Si se está activando, exige que el pensum tenga cursos para ese semestre.',
    ],
    sql: `CREATE FUNCTION horarios.validar_cohorte_periodo() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_duracion_en_semestres integer;
  v_pensum_id uuid;
begin
  select ca.duracion_en_semestres, co.pensum_id
  into v_duracion_en_semestres, v_pensum_id
  from cohortes co
  join carreras ca on ca.id = co.carrera_id
  where co.id = new.cohorte_id
    and co.estado = 'activa'
    and co.eliminado_en is null;

  if v_pensum_id is null then
    raise exception 'La cohorte % no existe o no esta activa', new.cohorte_id;
  end if;

  if new.semestre_asignado > v_duracion_en_semestres then
    raise exception 'El semestre % excede la duracion de la carrera de la cohorte %',
      new.semestre_asignado, new.cohorte_id;
  end if;

  if new.esta_activa and not exists (
    select 1
    from cursos_en_pensum cep
    where cep.pensum_id = v_pensum_id
      and cep.semestre_asignado = new.semestre_asignado
      and cep.eliminado_en is null
  ) then
    raise exception 'El pensum de la cohorte % no tiene cursos para el semestre %',
      new.cohorte_id, new.semestre_asignado;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_descanso_en_jornada',
    nombre: 'validar_descanso_en_jornada',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza un receso cuyo día no pertenece a la jornada o que se sale de los bloques del día.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2577,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga la jornada del receso.',
      'Rechaza un día que no esté entre los activos de esa jornada.',
      'Rechaza un receso que se salga de los bloques del día.',
    ],
    sql: `CREATE FUNCTION horarios.validar_descanso_en_jornada() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
  jornada horarios.jornadas%rowtype;
begin
  select * into strict jornada from horarios.jornadas where id = new.jornada_id;
  if not (new.dia = any(jornada.dias_activos)) then
    raise exception 'El descanso usa un día que no pertenece a la jornada';
  end if;
  if new.indice_slot_inicio + new.duracion_slots - 1 > jornada.bloques_por_dia then
    raise exception 'El descanso excede los bloques de la jornada';
  end if;
  return new;
end $$;`,
  },
  {
    id: 'fn-validar_disponibilidad_slot',
    nombre: 'validar_disponibilidad_slot',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza un bloque de disponibilidad que no existe en esa jornada.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2599,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga días activos y bloques de la jornada; falla si no existe o está inactiva.',
      'Rechaza días no activos y bloques fuera de rango.',
      'Rechaza un bloque que caiga sobre un receso de la jornada.',
    ],
    sql: `CREATE FUNCTION horarios.validar_disponibilidad_slot() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_dias_activos dia_semana[];
  v_bloques_por_dia integer;
begin
  select dias_activos, bloques_por_dia
  into v_dias_activos, v_bloques_por_dia
  from jornadas
  where id = new.jornada_id
    and esta_activa
    and eliminado_en is null;

  if v_bloques_por_dia is null then
    raise exception 'La jornada % no existe o no esta activa', new.jornada_id;
  end if;

  if not new.dia = any(v_dias_activos) then
    raise exception 'La disponibilidad usa un dia no activo en la jornada %', new.jornada_id;
  end if;

  if new.indice_slot > v_bloques_por_dia then
    raise exception 'La disponibilidad excede los bloques de la jornada %', new.jornada_id;
  end if;

  if exists (
    select 1
    from jornada_descansos d
    where d.jornada_id = new.jornada_id
      and d.dia = new.dia
      and d.rango_slots && int4range(new.indice_slot, new.indice_slot + 1, '[)')
  ) then
    raise exception 'La disponibilidad cae sobre un descanso de la jornada %', new.jornada_id;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_horario_publicable',
    nombre: 'validar_horario_publicable',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Impide pasar un horario a publicado si no cumple los requisitos de publicación.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2644,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Solo actúa cuando el estado pasa a pendiente de aprobación, aprobado o publicado.',
      'Exige cero violaciones duras, cero conflictos duros, cero pendientes y al menos una sesión, todas con cohorte.',
      'Comprueba cada sesión: cohorte activa en el período, misma jornada, curso dentro del pensum y semestre, docente autorizado y área común completa y con un solo docente.',
      'Verifica aulas compatibles y con recursos, capacidad suficiente, un solo docente por curso y cohorte, disponibilidad confirmada y respeto de la carga máxima.',
      'En planes de clases exige además que se cubran los bloques semanales exactos del pensum.',
      'Exige aprobador y publicador con sus fechas, y admite solo las transiciones de estado permitidas.',
    ],
    sql: `CREATE FUNCTION horarios.validar_horario_publicable() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  if new.estado in ('pendiente_aprobacion', 'aprobado', 'publicado') then
    if new.cantidad_violaciones_duras > 0 then
      raise exception 'El horario % tiene violaciones duras registradas', new.id;
    end if;

    if exists (
      select 1
      from conflictos
      where horario_id = new.id
        and es_restriccion_dura
    ) then
      raise exception 'El horario % tiene conflictos de restriccion dura', new.id;
    end if;

    if exists (
      select 1
      from sesiones_no_asignadas
      where horario_id = new.id
    ) then
      raise exception 'El horario % tiene sesiones no asignadas', new.id;
    end if;

    if not exists (
      select 1
      from sesiones
      where horario_id = new.id
    ) then
      raise exception 'El horario % no tiene sesiones asignadas', new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      where s.horario_id = new.id
        and not exists (
          select 1
          from sesion_cohortes sc
          where sc.sesion_id = s.id
        )
    ) then
      raise exception 'El horario % tiene sesiones sin cohorte asociada', new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      left join cohorte_periodos cp
        on cp.cohorte_id = sc.cohorte_id
       and cp.periodo_id = new.periodo_id
       and cp.esta_activa
       and cp.eliminado_en is null
      where s.horario_id = new.id
        and cp.id is null
    ) then
      raise exception 'El horario % contiene cohortes que no participan activamente en el periodo',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      join cohortes co on co.id = sc.cohorte_id
      where s.horario_id = new.id
        and s.jornada_id <> co.jornada_id
    ) then
      raise exception 'El horario % contiene sesiones en una jornada distinta a la cohorte',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      join cohortes co on co.id = sc.cohorte_id
      join carreras ca on ca.id = co.carrera_id
      where s.horario_id = new.id
        and not exists (
          select 1
          from asignaciones_docente_curso adc
          where adc.docente_id = s.docente_id
            and adc.curso_id = sc.curso_visible_id
            and adc.esta_vigente
            and adc.eliminado_en is null
            and (adc.carrera_id is null or adc.carrera_id = co.carrera_id)
            and (adc.facultad_id is null or adc.facultad_id = ca.facultad_id)
            and (adc.jornada_id is null or adc.jornada_id = co.jornada_id)
        )
    ) then
      raise exception 'El horario % tiene docentes no autorizados para su cohorte, carrera, facultad o jornada',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      join cohortes co on co.id = sc.cohorte_id
      join cohorte_periodos cp
        on cp.cohorte_id = co.id
       and cp.periodo_id = new.periodo_id
       and cp.esta_activa
       and cp.eliminado_en is null
      where s.horario_id = new.id
        and not exists (
          select 1
          from cursos_en_pensum cep
          where cep.id = sc.curso_en_pensum_id
            and cep.pensum_id = co.pensum_id
            and cep.curso_id = sc.curso_visible_id
            and cep.semestre_asignado = cp.semestre_asignado
            and cep.eliminado_en is null
        )
    ) then
      raise exception 'El horario % contiene sesiones que no pertenecen al pensum y semestre de la cohorte',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      join agrupacion_area_comun_cohortes aacc
        on aacc.agrupacion_id = s.agrupacion_area_comun_id
      where s.horario_id = new.id
        and s.es_area_comun
        and not exists (
          select 1
          from sesion_cohortes sc
          where sc.sesion_id = s.id
            and sc.cohorte_id = aacc.cohorte_id
        )
    ) then
      raise exception 'El horario % tiene sesiones de area comun sin todas sus cohortes',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      where s.horario_id = new.id
        and s.es_area_comun
        and not exists (
          select 1
          from agrupacion_area_comun_cohortes aacc
          where aacc.agrupacion_id = s.agrupacion_area_comun_id
            and aacc.cohorte_id = sc.cohorte_id
        )
    ) then
      raise exception 'El horario % tiene cohortes fuera de una agrupacion de area comun',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join sesiones s on s.id = sc.sesion_id
      where s.horario_id = new.id
        and s.es_area_comun
        and not exists (
          select 1
          from agrupacion_area_comun_cursos aac
          where aac.agrupacion_id = s.agrupacion_area_comun_id
            and aac.curso_id = sc.curso_visible_id
        )
    ) then
      raise exception 'El horario % tiene cursos visibles fuera de una agrupacion de area comun',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s1
      join sesiones s2
        on s2.horario_id = s1.horario_id
       and s2.agrupacion_area_comun_id = s1.agrupacion_area_comun_id
       and s2.id <> s1.id
      where s1.horario_id = new.id
        and s1.es_area_comun
        and s1.docente_id <> s2.docente_id
    ) then
      raise exception 'El horario % asigna una misma area comun a mas de un docente',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      join generate_series(
        s.indice_slot_inicio,
        s.indice_slot_inicio + s.duracion_slots - 1
      ) as slot_requerido(indice_slot) on true
      where s.horario_id = new.id
        and not exists (
          select 1
          from disponibilidades_docente dd
          join disponibilidad_docente_slots dds on dds.disponibilidad_id = dd.id
          where dd.docente_id = s.docente_id
            and dd.periodo_id = new.periodo_id
            and dd.esta_confirmada
            and dds.jornada_id = s.jornada_id
            and dds.dia = s.dia
            and dds.indice_slot = slot_requerido.indice_slot
            and dds.esta_disponible
        )
    ) then
      raise exception 'El horario % contiene sesiones fuera de la disponibilidad docente confirmada',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      join sesion_cohortes sc on sc.sesion_id = s.id
      join aulas a on a.id = s.aula_id
      join cursos c on c.id = sc.curso_visible_id
      where s.horario_id = new.id
        and (
          a.eliminado_en is not null
          or not a.esta_activa
          or (c.requiere_laboratorio and a.tipo not in ('laboratorio', 'mixta'))
          or (
            c.tipo_laboratorio_requerido is not null
            and a.tipo_laboratorio_disponible is distinct from c.tipo_laboratorio_requerido
          )
        )
    ) then
      raise exception 'El horario % contiene aulas incompatibles con sus cursos',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      join sesion_cohortes sc on sc.sesion_id = s.id
      join curso_recursos_requeridos crr on crr.curso_id = sc.curso_visible_id
      left join aula_recursos ar
        on ar.aula_id = s.aula_id
       and ar.recurso_id = crr.recurso_id
       and ar.cantidad >= crr.cantidad
      where s.horario_id = new.id
        and ar.aula_id is null
    ) then
      raise exception 'El horario % contiene aulas sin los recursos requeridos',
        new.id;
    end if;

    if exists (
      select 1
      from sesiones s
      join aulas a on a.id = s.aula_id
      where s.horario_id = new.id
        and (
          select coalesce(sum(cp.matricula_estimada), 0)
          from sesion_cohortes sc
          join cohorte_periodos cp
            on cp.cohorte_id = sc.cohorte_id
           and cp.periodo_id = new.periodo_id
           and cp.esta_activa
           and cp.eliminado_en is null
          where sc.sesion_id = s.id
        ) > a.capacidad_maxima
    ) then
      raise exception 'El horario % contiene sesiones que superan la capacidad del aula',
        new.id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc1
      join sesiones s1 on s1.id = sc1.sesion_id
      join sesion_cohortes sc2
        on sc2.horario_id = sc1.horario_id
       and sc2.cohorte_id = sc1.cohorte_id
      join sesiones s2 on s2.id = sc2.sesion_id
      where sc1.horario_id = new.id
        and s1.id <> s2.id
        and sc1.curso_visible_id = sc2.curso_visible_id
        and s1.docente_id <> s2.docente_id
    ) then
      raise exception 'El horario % asigna un mismo curso de una cohorte a mas de un docente',
        new.id;
    end if;

    if exists (
      with cargas_docente as (
        select docente_id, count(*) as total_cursos
        from (
          select
            s.docente_id,
            'AREA:' || s.agrupacion_area_comun_id::text as llave_asignacion
          from sesiones s
          where s.horario_id = new.id
            and s.es_area_comun
          group by s.docente_id, s.agrupacion_area_comun_id

          union

          select
            s.docente_id,
            'CURSO:' || sc.curso_visible_id::text || ':COHORTE:' || sc.cohorte_id::text as llave_asignacion
          from sesiones s
          join sesion_cohortes sc on sc.sesion_id = s.id
          where s.horario_id = new.id
            and not s.es_area_comun
          group by s.docente_id, sc.curso_visible_id, sc.cohorte_id
        ) asignaciones
        group by docente_id
      )
      select 1
      from cargas_docente cd
      join docentes d on d.id = cd.docente_id
      where cd.total_cursos > d.carga_maxima_cursos
    ) then
      raise exception 'El horario % supera la carga maxima configurada de al menos un docente',
        new.id;
    end if;

    if new.tipo_plan = 'clases' then
      if not exists (
        select 1
        from cohorte_periodos cp
        join cohortes co on co.id = cp.cohorte_id
        where cp.periodo_id = new.periodo_id
          and cp.esta_activa
          and cp.eliminado_en is null
          and co.estado = 'activa'
          and co.eliminado_en is null
      ) then
        raise exception 'El periodo % no tiene cohortes activas para publicar horario de clases',
          new.periodo_id;
      end if;

      if exists (
        select 1
        from cohorte_periodos cp
        join cohortes co on co.id = cp.cohorte_id
        join cursos_en_pensum cep
          on cep.pensum_id = co.pensum_id
         and cep.semestre_asignado = cp.semestre_asignado
         and cep.eliminado_en is null
        where cp.periodo_id = new.periodo_id
          and cp.esta_activa
          and cp.eliminado_en is null
          and co.estado = 'activa'
          and co.eliminado_en is null
          and (
            select coalesce(sum(s.duracion_slots), 0)
            from sesion_cohortes sc
            join sesiones s on s.id = sc.sesion_id
            where sc.horario_id = new.id
              and sc.cohorte_id = cp.cohorte_id
              and sc.curso_en_pensum_id = cep.id
          ) <> cep.bloques_semanales_exactos
      ) then
        raise exception 'El horario % no cubre los bloques exactos del pensum para todas las cohortes activas',
          new.id;
      end if;
    end if;
  end if;

  if new.estado in ('aprobado', 'publicado')
     and (new.aprobado_por_id is null or new.fecha_aprobacion is null) then
    raise exception 'El horario % requiere aprobador y fecha de aprobacion', new.id;
  end if;

  if new.estado = 'publicado'
     and (new.publicado_por_id is null or new.fecha_publicacion is null) then
    raise exception 'El horario % requiere publicador y fecha de publicacion', new.id;
  end if;

  if tg_op = 'UPDATE' then
    if new.estado = 'pendiente_aprobacion'
       and old.estado not in ('generado', 'en_revision', 'pendiente_aprobacion') then
      raise exception 'El horario % solo puede enviarse a aprobacion desde generado o en_revision', new.id;
    end if;

    if new.estado = 'aprobado' and old.estado not in ('pendiente_aprobacion', 'aprobado') then
      raise exception 'El horario % solo puede aprobarse desde pendiente_aprobacion', new.id;
    end if;

    if new.estado = 'publicado' and old.estado not in ('aprobado', 'publicado') then
      raise exception 'El horario % solo puede publicarse desde aprobado', new.id;
    end if;

    if old.estado = 'publicado' and new.estado not in ('publicado', 'archivado') then
      raise exception 'Un horario publicado solo puede permanecer publicado o archivarse';
    end if;

    if old.estado in ('publicado', 'archivado')
       and old.eliminado_en is null
       and new.eliminado_en is not null then
      raise exception 'Un horario publicado o archivado no puede eliminarse logicamente';
    end if;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_importacion_plantilla',
    nombre: 'validar_importacion_plantilla',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza un archivo que no coincide con la plantilla vigente y su versión.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 3054,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Si la importación trae plantilla, comprueba que exista y que acepte ese tipo de archivo.',
      'Rellena la versión de plantilla si venía vacía, o falla si no coincide con la vigente.',
      'Sella `finalizada_en` cuando la importación llega a un estado final.',
    ],
    sql: `CREATE FUNCTION horarios.validar_importacion_plantilla() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_version varchar(50);
  v_formatos tipo_archivo_importacion[];
begin
  if new.plantilla_id is not null then
    select version, formatos_soportados
    into v_version, v_formatos
    from plantillas_importacion
    where id = new.plantilla_id;

    if v_version is null then
      raise exception 'La plantilla de importacion % no existe', new.plantilla_id;
    end if;

    if not new.tipo_archivo = any(v_formatos) then
      raise exception 'La plantilla % no soporta archivos %', new.plantilla_id, new.tipo_archivo;
    end if;

    if new.plantilla_version is null then
      new.plantilla_version := v_version;
    elsif new.plantilla_version <> v_version then
      raise exception 'La version de plantilla recibida % no coincide con la version %',
        new.plantilla_version, v_version;
    end if;
  end if;

  if new.estado in ('aplicada', 'rechazada', 'fallida') and new.finalizada_en is null then
    new.finalizada_en := now();
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_sesion_en_jornada',
    nombre: 'validar_sesion_en_jornada',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza una sesión que no cabe en su jornada: día no activo o bloques fuera del rango del día.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 3096,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Comprueba que la jornada esté activa, que el día lo esté y que la sesión quepa en los bloques del día.',
      'Calcula `minuto_inicio_dia` y `minuto_fin_dia` a partir del bloque y la duración, y rechaza si se pasa del fin de jornada o cae sobre un receso.',
      'En planes de clases prohíbe la fecha concreta; en exámenes la exige, dentro del período y coincidiendo con el día declarado.',
      'Si es área común, exige que la agrupación esté activa, sea del mismo período y contenga el curso.',
      'Exige docente activo y autorizado, y aula activa, del tipo requerido y con los recursos que pide el curso.',
      'Comprueba que la matrícula no supere la capacidad del aula y que el docente esté disponible en todos los bloques.',
    ],
    sql: `CREATE FUNCTION horarios.validar_sesion_en_jornada() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_dias_activos dia_semana[];
  v_bloques_por_dia integer;
  v_hora_inicio time;
  v_hora_fin time;
  v_duracion_bloque_minutos integer;
  v_minuto_fin_jornada integer;
  v_periodo_id uuid;
  v_tipo_plan tipo_plan_horario;
  v_fecha_inicio_periodo date;
  v_fecha_fin_periodo date;
  v_dia_fecha dia_semana;
  v_tipo_aula tipo_aula;
  v_tipo_laboratorio_disponible varchar(80);
  v_capacidad_aula integer;
  v_matricula_total integer;
  v_requiere_laboratorio boolean;
  v_tipo_laboratorio_requerido varchar(80);
  v_periodo_agrupacion uuid;
begin
  select dias_activos, bloques_por_dia, hora_inicio, hora_fin, duracion_bloque_minutos
  into v_dias_activos, v_bloques_por_dia, v_hora_inicio, v_hora_fin, v_duracion_bloque_minutos
  from jornadas
  where id = new.jornada_id
    and esta_activa
    and eliminado_en is null;

  if v_bloques_por_dia is null then
    raise exception 'La jornada % no existe o no esta activa', new.jornada_id;
  end if;

  if not new.dia = any(v_dias_activos) then
    raise exception 'El dia % no esta activo en la jornada %', new.dia, new.jornada_id;
  end if;

  if new.indice_slot_inicio + new.duracion_slots - 1 > v_bloques_por_dia then
    raise exception 'La sesion excede los bloques disponibles de la jornada %', new.jornada_id;
  end if;

  new.minuto_inicio_dia :=
    (extract(hour from v_hora_inicio)::integer * 60)
    + extract(minute from v_hora_inicio)::integer
    + ((new.indice_slot_inicio - 1) * v_duracion_bloque_minutos);
  new.minuto_fin_dia := new.minuto_inicio_dia + (new.duracion_slots * v_duracion_bloque_minutos);
  v_minuto_fin_jornada :=
    (extract(hour from v_hora_fin)::integer * 60)
    + extract(minute from v_hora_fin)::integer;

  if new.minuto_fin_dia > v_minuto_fin_jornada then
    raise exception 'La sesion excede el fin de la jornada %', new.jornada_id;
  end if;

  if exists (
    select 1
    from jornada_descansos d
    where d.jornada_id = new.jornada_id
      and d.dia = new.dia
      and d.rango_slots && int4range(new.indice_slot_inicio, new.indice_slot_inicio + new.duracion_slots, '[)')
  ) then
    raise exception 'La sesion cae sobre un descanso de la jornada %', new.jornada_id;
  end if;

  select h.periodo_id, h.tipo_plan, p.fecha_inicio, p.fecha_fin
  into v_periodo_id, v_tipo_plan, v_fecha_inicio_periodo, v_fecha_fin_periodo
  from horarios h
  join periodos_academicos p on p.id = h.periodo_id
  where h.id = new.horario_id
    and h.eliminado_en is null
    and p.eliminado_en is null;

  if v_periodo_id is null then
    raise exception 'El horario % no existe o esta eliminado', new.horario_id;
  end if;

  if v_tipo_plan = 'clases' and new.fecha_sesion is not null then
    raise exception 'Las sesiones de clases son un blueprint semanal y no deben tener fecha especifica';
  end if;

  if v_tipo_plan = 'examenes' and new.fecha_sesion is null then
    raise exception 'Las sesiones de examenes requieren fecha especifica';
  end if;

  if new.fecha_sesion is not null then
    if new.fecha_sesion < v_fecha_inicio_periodo or new.fecha_sesion > v_fecha_fin_periodo then
      raise exception 'La fecha % esta fuera del periodo academico del horario %',
        new.fecha_sesion, new.horario_id;
    end if;

    v_dia_fecha := case extract(isodow from new.fecha_sesion)::integer
      when 1 then 'lunes'::dia_semana
      when 2 then 'martes'::dia_semana
      when 3 then 'miercoles'::dia_semana
      when 4 then 'jueves'::dia_semana
      when 5 then 'viernes'::dia_semana
      when 6 then 'sabado'::dia_semana
      else 'domingo'::dia_semana
    end;

    if new.dia <> v_dia_fecha then
      raise exception 'La fecha % no corresponde al dia % declarado en la sesion',
        new.fecha_sesion, new.dia;
    end if;
  end if;

  if new.es_area_comun then
    select periodo_id
    into v_periodo_agrupacion
    from agrupaciones_area_comun
    where id = new.agrupacion_area_comun_id
      and esta_activa
      and eliminado_en is null;

    if v_periodo_agrupacion is null then
      raise exception 'La agrupacion de area comun % no existe o no esta activa', new.agrupacion_area_comun_id;
    end if;

    if v_periodo_agrupacion <> v_periodo_id then
      raise exception 'La agrupacion de area comun % no pertenece al periodo del horario',
        new.agrupacion_area_comun_id;
    end if;

    if not exists (
      select 1
      from agrupacion_area_comun_cursos aac
      where aac.agrupacion_id = new.agrupacion_area_comun_id
        and aac.curso_id = new.curso_id
    ) then
      raise exception 'El curso % no pertenece a la agrupacion de area comun %',
        new.curso_id, new.agrupacion_area_comun_id;
    end if;
  end if;

  if not exists (
    select 1
    from docentes
    where id = new.docente_id
      and esta_activo
      and eliminado_en is null
  ) then
    raise exception 'El docente % no existe o no esta activo', new.docente_id;
  end if;

  select tipo, tipo_laboratorio_disponible, capacidad_maxima
  into v_tipo_aula, v_tipo_laboratorio_disponible, v_capacidad_aula
  from aulas
  where id = new.aula_id
    and esta_activa
    and eliminado_en is null;

  if v_tipo_aula is null then
    raise exception 'El aula % no existe o no esta activa', new.aula_id;
  end if;

  select requiere_laboratorio, tipo_laboratorio_requerido
  into v_requiere_laboratorio, v_tipo_laboratorio_requerido
  from cursos
  where id = new.curso_id
    and eliminado_en is null;

  if v_requiere_laboratorio is null then
    raise exception 'El curso % no existe o esta eliminado', new.curso_id;
  end if;

  if v_requiere_laboratorio and v_tipo_aula not in ('laboratorio', 'mixta') then
    raise exception 'El curso % requiere laboratorio y el aula % no es compatible',
      new.curso_id, new.aula_id;
  end if;

  if v_tipo_laboratorio_requerido is not null
     and v_tipo_laboratorio_disponible is distinct from v_tipo_laboratorio_requerido then
    raise exception 'El aula % no tiene el laboratorio requerido por el curso %',
      new.aula_id, new.curso_id;
  end if;

  if exists (
    select 1
    from curso_recursos_requeridos crr
    left join aula_recursos ar
      on ar.aula_id = new.aula_id
     and ar.recurso_id = crr.recurso_id
     and ar.cantidad >= crr.cantidad
    where crr.curso_id = new.curso_id
      and ar.aula_id is null
  ) then
    raise exception 'El aula % no tiene todos los recursos requeridos por el curso %',
      new.aula_id, new.curso_id;
  end if;

  if not new.es_area_comun and not exists (
    select 1
    from asignaciones_docente_curso adc
    where adc.docente_id = new.docente_id
      and adc.curso_id = new.curso_id
      and adc.esta_vigente
      and adc.eliminado_en is null
  ) then
    raise exception 'El docente % no esta autorizado para impartir el curso %',
      new.docente_id, new.curso_id;
  end if;

  select coalesce(sum(cp.matricula_estimada), 0)
  into v_matricula_total
  from sesion_cohortes sc
  join cohorte_periodos cp
    on cp.cohorte_id = sc.cohorte_id
   and cp.periodo_id = v_periodo_id
   and cp.esta_activa
   and cp.eliminado_en is null
  where sc.sesion_id = new.id;

  if v_matricula_total > v_capacidad_aula then
    raise exception 'La sesion % supera la capacidad del aula %: % estudiantes para % lugares',
      new.id, new.aula_id, v_matricula_total, v_capacidad_aula;
  end if;

  if exists (
    select 1
    from generate_series(
      new.indice_slot_inicio,
      new.indice_slot_inicio + new.duracion_slots - 1
    ) as slot_requerido(indice_slot)
    where not exists (
      select 1
      from disponibilidades_docente dd
      join disponibilidad_docente_slots dds on dds.disponibilidad_id = dd.id
      where dd.docente_id = new.docente_id
        and dd.periodo_id = v_periodo_id
        and dd.esta_confirmada
        and dds.jornada_id = new.jornada_id
        and dds.dia = new.dia
        and dds.indice_slot = slot_requerido.indice_slot
        and dds.esta_disponible
    )
  ) then
    raise exception 'El docente % no esta disponible en todos los slots solicitados',
      new.docente_id;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-validar_sustitucion_docente_original',
    nombre: 'validar_sustitucion_docente_original',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Comprueba que fechas y docentes de una sustitución son coherentes con el tipo de evento.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 3346,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee la sesión afectada con su horario y período, y exige que el horario esté publicado.',
      'Comprueba que el docente original coincida con el de la sesión.',
      'Exige que todas las fechas del evento caigan dentro del período académico.',
      'Si hay docente entrante: que esté activo, autorizado para todas las cohortes de la sesión, libre en ese bloque y disponible en él.',
    ],
    sql: `CREATE FUNCTION horarios.validar_sustitucion_docente_original() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_horario_id uuid;
  v_docente_original uuid;
  v_periodo_id uuid;
  v_fecha_inicio_periodo date;
  v_fecha_fin_periodo date;
  v_jornada_id uuid;
  v_fecha_sesion date;
  v_dia dia_semana;
  v_indice_slot_inicio integer;
  v_duracion_slots integer;
  v_estado_horario estado_horario;
begin
  select
    s.horario_id,
    s.docente_id,
    h.periodo_id,
    p.fecha_inicio,
    p.fecha_fin,
    s.jornada_id,
    s.fecha_sesion,
    s.dia,
    s.indice_slot_inicio,
    s.duracion_slots,
    h.estado
  into
    v_horario_id,
    v_docente_original,
    v_periodo_id,
    v_fecha_inicio_periodo,
    v_fecha_fin_periodo,
    v_jornada_id,
    v_fecha_sesion,
    v_dia,
    v_indice_slot_inicio,
    v_duracion_slots,
    v_estado_horario
  from sesiones s
  join horarios h on h.id = s.horario_id
  join periodos_academicos p on p.id = h.periodo_id
  where s.id = new.sesion_afectada_id;

  if v_docente_original is null then
    raise exception 'La sesion % no existe', new.sesion_afectada_id;
  end if;

  if v_estado_horario <> 'publicado' then
    raise exception 'Las sustituciones solo se registran sobre horarios publicados';
  end if;

  if new.docente_original_id <> v_docente_original then
    raise exception 'El docente original no coincide con la sesion afectada %', new.sesion_afectada_id;
  end if;

  if exists (
    select 1
    from (
      values
        (new.fecha_inicio),
        (new.fecha_fin),
        (new.fecha_cambio),
        (new.fecha_ausencia),
        (new.fecha_recuperacion),
        (new.fecha_cancelada)
    ) as fechas(fecha)
    where fechas.fecha is not null
      and (
        fechas.fecha < v_fecha_inicio_periodo
        or fechas.fecha > v_fecha_fin_periodo
      )
  ) then
    raise exception 'Las fechas de sustitucion deben estar dentro del periodo academico de la sesion';
  end if;

  if new.docente_entrante_id is not null then
    if not exists (
      select 1
      from docentes
      where id = new.docente_entrante_id
        and esta_activo
        and eliminado_en is null
    ) then
      raise exception 'El docente entrante % no existe o no esta activo', new.docente_entrante_id;
    end if;

    if exists (
      select 1
      from sesion_cohortes sc
      join cohortes co on co.id = sc.cohorte_id
      join carreras ca on ca.id = co.carrera_id
      where sc.sesion_id = new.sesion_afectada_id
        and not exists (
          select 1
          from asignaciones_docente_curso adc
          where adc.docente_id = new.docente_entrante_id
            and adc.curso_id = sc.curso_visible_id
            and adc.esta_vigente
            and adc.eliminado_en is null
            and (adc.carrera_id is null or adc.carrera_id = co.carrera_id)
            and (adc.facultad_id is null or adc.facultad_id = ca.facultad_id)
            and (adc.jornada_id is null or adc.jornada_id = co.jornada_id)
        )
    ) then
      raise exception 'El docente entrante % no esta autorizado para todas las cohortes de la sesion %',
        new.docente_entrante_id, new.sesion_afectada_id;
    end if;

    if exists (
      select 1
      from sesiones s2
      where s2.horario_id = v_horario_id
        and s2.id <> new.sesion_afectada_id
        and s2.docente_id = new.docente_entrante_id
        and (
          (v_fecha_sesion is null and s2.fecha_sesion is null and s2.dia = v_dia)
          or (v_fecha_sesion is not null and s2.fecha_sesion = v_fecha_sesion)
        )
        and s2.rango_slots && int4range(
          v_indice_slot_inicio,
          v_indice_slot_inicio + v_duracion_slots,
          '[)'
        )
    ) then
      raise exception 'El docente entrante % ya tiene otra sesion en el mismo bloque',
        new.docente_entrante_id;
    end if;

    if exists (
      select 1
      from generate_series(
        v_indice_slot_inicio,
        v_indice_slot_inicio + v_duracion_slots - 1
      ) as slot_requerido(indice_slot)
      where not exists (
        select 1
        from disponibilidades_docente dd
        join disponibilidad_docente_slots dds on dds.disponibilidad_id = dd.id
        where dd.docente_id = new.docente_entrante_id
          and dd.periodo_id = v_periodo_id
          and dd.esta_confirmada
          and dds.jornada_id = v_jornada_id
          and dds.dia = v_dia
          and dds.indice_slot = slot_requerido.indice_slot
          and dds.esta_disponible
      )
    ) then
      raise exception 'El docente entrante % no esta disponible en la sesion afectada',
        new.docente_entrante_id;
    end if;
  end if;

  return new;
end;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;`,
  },
  {
    id: 'fn-aplicar_receso_a_sesion',
    nombre: 'aplicar_receso_a_sesion',
    cat: 'funcion',
    grupo: 'Trigger · completar y derivar',
    desc: 'Traduce bloques a minutos de reloj insertando el receso de la jornada. Si al correrse la sesión se sale del día, aborta.',
    detalle: 'Los bloques no saben nada de recesos; este trigger es el que los convierte en horas reales.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 419,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga la jornada de la sesión.',
      'Si la sesión empieza después del receso, corre inicio y fin; si lo cruza, corre solo el fin.',
      'Si al correrse se pasa del fin de la jornada, aborta.',
    ],
    sql: `CREATE FUNCTION horarios.aplicar_receso_a_sesion() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'horarios', 'public'
    AS $$
declare
    v_jornada horarios.jornadas%rowtype;
begin
    select * into strict v_jornada from horarios.jornadas where id = new.jornada_id;
    if v_jornada.duracion_receso_minutos > 0 then
        if new.indice_slot_inicio > v_jornada.receso_despues_bloque then
            new.minuto_inicio_dia := new.minuto_inicio_dia + v_jornada.duracion_receso_minutos;
            new.minuto_fin_dia := new.minuto_fin_dia + v_jornada.duracion_receso_minutos;
        elsif new.indice_slot_inicio + new.duracion_slots - 1 > v_jornada.receso_despues_bloque then
            new.minuto_fin_dia := new.minuto_fin_dia + v_jornada.duracion_receso_minutos;
        end if;
    end if;
    if new.minuto_fin_dia > extract(hour from v_jornada.hora_fin)::integer * 60
                             + extract(minute from v_jornada.hora_fin)::integer then
        raise exception 'La sesión excede el fin de la jornada al considerar el receso';
    end if;
    return new;
end;
$$;`,
  },
  {
    id: 'fn-completar_sesion_cohorte',
    nombre: 'completar_sesion_cohorte',
    cat: 'funcion',
    grupo: 'Trigger · completar y derivar',
    desc: 'Rellena en `sesion_cohortes` los campos copiados de la sesión (día, bloques, minutos) para que la tabla desnormalizada quede consistente.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 713,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Copia de la sesión el horario, la fecha, el día, los bloques y los minutos.',
      'Comprueba que la cohorte exista, esté activa, participe en el período y sea de la misma jornada que la sesión.',
      'Resuelve qué curso del pensum le toca a esa cohorte —por la agrupación, si es área común— y lo guarda en `curso_en_pensum_id` y `curso_visible_id`.',
      'Exige docente autorizado, un solo docente por curso y cohorte, y aula compatible con recursos suficientes.',
      'Suma la matrícula de todas las cohortes de la sesión y rechaza si supera la capacidad del aula.',
    ],
    sql: `CREATE FUNCTION horarios.completar_sesion_cohorte() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_jornada_sesion uuid;
  v_jornada_cohorte uuid;
  v_periodo_id uuid;
  v_docente_id uuid;
  v_curso_id uuid;
  v_aula_id uuid;
  v_es_area_comun boolean;
  v_agrupacion_id uuid;
  v_carrera_id uuid;
  v_facultad_id uuid;
  v_pensum_id uuid;
  v_semestre_asignado integer;
  v_matricula_estimada integer;
  v_capacidad_aula integer;
  v_matricula_total integer;
  v_curso_en_pensum_id uuid;
  v_curso_visible_id uuid;
  v_total_cursos_equivalentes integer;
begin
  select
    s.horario_id,
    h.periodo_id,
    s.jornada_id,
    s.fecha_sesion,
    s.dia,
    s.indice_slot_inicio,
    s.duracion_slots,
    s.minuto_inicio_dia,
    s.minuto_fin_dia,
    s.docente_id,
    s.curso_id,
    s.aula_id,
    s.es_area_comun,
    s.agrupacion_area_comun_id
  into
    new.horario_id,
    v_periodo_id,
    v_jornada_sesion,
    new.fecha_sesion,
    new.dia,
    new.indice_slot_inicio,
    new.duracion_slots,
    new.minuto_inicio_dia,
    new.minuto_fin_dia,
    v_docente_id,
    v_curso_id,
    v_aula_id,
    v_es_area_comun,
    v_agrupacion_id
  from sesiones s
  join horarios h on h.id = s.horario_id
  where s.id = new.sesion_id;

  if new.horario_id is null then
    raise exception 'La sesion % no existe', new.sesion_id;
  end if;

  select
    co.jornada_id,
    co.carrera_id,
    ca.facultad_id,
    co.pensum_id,
    cp.semestre_asignado,
    cp.matricula_estimada
  into
    v_jornada_cohorte,
    v_carrera_id,
    v_facultad_id,
    v_pensum_id,
    v_semestre_asignado,
    v_matricula_estimada
  from cohortes co
  join carreras ca on ca.id = co.carrera_id
  join cohorte_periodos cp
    on cp.cohorte_id = co.id
   and cp.periodo_id = v_periodo_id
   and cp.esta_activa
   and cp.eliminado_en is null
  where co.id = new.cohorte_id
    and co.estado = 'activa'
    and co.eliminado_en is null;

  if v_jornada_cohorte is null then
    raise exception 'La cohorte % no existe, no esta activa o no participa en el periodo %',
      new.cohorte_id, v_periodo_id;
  end if;

  if v_jornada_cohorte <> v_jornada_sesion then
    raise exception 'La cohorte % no pertenece a la jornada de la sesion %',
      new.cohorte_id, new.sesion_id;
  end if;

  if v_es_area_comun then
    if not exists (
      select 1
      from agrupacion_area_comun_cohortes aacc
      where aacc.agrupacion_id = v_agrupacion_id
        and aacc.cohorte_id = new.cohorte_id
    ) then
      raise exception 'La cohorte % no pertenece a la agrupacion de area comun %',
        new.cohorte_id, v_agrupacion_id;
    end if;

    if not exists (
      select 1
      from agrupacion_area_comun_cursos aac
      where aac.agrupacion_id = v_agrupacion_id
        and aac.curso_id = v_curso_id
    ) then
      raise exception 'El curso % no pertenece a la agrupacion de area comun %',
        v_curso_id, v_agrupacion_id;
    end if;

    select curso_en_pensum_id, curso_visible_id, total_cursos
    into v_curso_en_pensum_id, v_curso_visible_id, v_total_cursos_equivalentes
    from (
      select
        cep.id as curso_en_pensum_id,
        cep.curso_id as curso_visible_id,
        count(*) over () as total_cursos
      from cursos_en_pensum cep
      join agrupacion_area_comun_cursos aac
        on aac.curso_id = cep.curso_id
       and aac.agrupacion_id = v_agrupacion_id
      where cep.pensum_id = v_pensum_id
        and cep.semestre_asignado = v_semestre_asignado
        and cep.eliminado_en is null
    ) cursos_equivalentes;

    if v_curso_en_pensum_id is null then
      raise exception 'La cohorte % no tiene un curso equivalente de la agrupacion % en el semestre %',
        new.cohorte_id, v_agrupacion_id, v_semestre_asignado;
    end if;

    if v_total_cursos_equivalentes > 1 then
      raise exception 'La cohorte % tiene mas de un curso equivalente en la agrupacion % para el semestre %',
        new.cohorte_id, v_agrupacion_id, v_semestre_asignado;
    end if;
  else
    select cep.id, cep.curso_id
    into v_curso_en_pensum_id, v_curso_visible_id
    from cursos_en_pensum cep
    where cep.pensum_id = v_pensum_id
      and cep.curso_id = v_curso_id
      and cep.semestre_asignado = v_semestre_asignado
      and cep.eliminado_en is null;

    if v_curso_en_pensum_id is null then
      raise exception 'El curso % no pertenece al pensum vigente de la cohorte % en el semestre %',
        v_curso_id, new.cohorte_id, v_semestre_asignado;
    end if;
  end if;

  new.curso_en_pensum_id := v_curso_en_pensum_id;
  new.curso_visible_id := v_curso_visible_id;

  if not exists (
    select 1
    from asignaciones_docente_curso adc
    where adc.docente_id = v_docente_id
      and adc.curso_id = v_curso_visible_id
      and adc.esta_vigente
      and adc.eliminado_en is null
      and (adc.carrera_id is null or adc.carrera_id = v_carrera_id)
      and (adc.facultad_id is null or adc.facultad_id = v_facultad_id)
      and (adc.jornada_id is null or adc.jornada_id = v_jornada_cohorte)
  ) then
    raise exception 'El docente % no esta autorizado para el curso % en la cohorte %',
      v_docente_id, v_curso_visible_id, new.cohorte_id;
  end if;

  if exists (
    select 1
    from sesion_cohortes sc
    join sesiones s on s.id = sc.sesion_id
    where sc.horario_id = new.horario_id
      and sc.cohorte_id = new.cohorte_id
      and sc.curso_visible_id = v_curso_visible_id
      and s.docente_id <> v_docente_id
      and s.id <> new.sesion_id
  ) then
    raise exception 'La cohorte % ya tiene el curso % asignado a otro docente en este horario',
      new.cohorte_id, v_curso_visible_id;
  end if;

  if v_es_area_comun and exists (
    select 1
    from sesiones s
    where s.horario_id = new.horario_id
      and s.agrupacion_area_comun_id = v_agrupacion_id
      and s.docente_id <> v_docente_id
      and s.id <> new.sesion_id
  ) then
    raise exception 'La agrupacion de area comun % ya tiene sesiones con otro docente',
      v_agrupacion_id;
  end if;

  if exists (
    select 1
    from cursos c
    join aulas a on a.id = v_aula_id
    where c.id = v_curso_visible_id
      and (
        a.eliminado_en is not null
        or not a.esta_activa
        or (c.requiere_laboratorio and a.tipo not in ('laboratorio', 'mixta'))
        or (
          c.tipo_laboratorio_requerido is not null
          and a.tipo_laboratorio_disponible is distinct from c.tipo_laboratorio_requerido
        )
      )
  ) then
    raise exception 'El aula % no es compatible con el curso visible % de la cohorte %',
      v_aula_id, v_curso_visible_id, new.cohorte_id;
  end if;

  if exists (
    select 1
    from curso_recursos_requeridos crr
    left join aula_recursos ar
      on ar.aula_id = v_aula_id
     and ar.recurso_id = crr.recurso_id
     and ar.cantidad >= crr.cantidad
    where crr.curso_id = v_curso_visible_id
      and ar.aula_id is null
  ) then
    raise exception 'El aula % no tiene todos los recursos requeridos por el curso visible %',
      v_aula_id, v_curso_visible_id;
  end if;

  select capacidad_maxima
  into v_capacidad_aula
  from aulas
  where id = v_aula_id;

  if tg_op = 'UPDATE' then
    select coalesce(sum(cp.matricula_estimada), 0)
    into v_matricula_total
    from sesion_cohortes sc
    join cohorte_periodos cp
      on cp.cohorte_id = sc.cohorte_id
     and cp.periodo_id = v_periodo_id
     and cp.esta_activa
     and cp.eliminado_en is null
    where sc.sesion_id = new.sesion_id
      and not (sc.sesion_id = old.sesion_id and sc.cohorte_id = old.cohorte_id);
  else
    select coalesce(sum(cp.matricula_estimada), 0)
    into v_matricula_total
    from sesion_cohortes sc
    join cohorte_periodos cp
      on cp.cohorte_id = sc.cohorte_id
     and cp.periodo_id = v_periodo_id
     and cp.esta_activa
     and cp.eliminado_en is null
    where sc.sesion_id = new.sesion_id;
  end if;

  v_matricula_total := v_matricula_total + v_matricula_estimada;

  if v_matricula_total > v_capacidad_aula then
    raise exception 'La sesion % supera la capacidad del aula %: % estudiantes para % lugares',
      new.sesion_id, v_aula_id, v_matricula_total, v_capacidad_aula;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-propagar_cambio_sesion_a_cohortes',
    nombre: 'propagar_cambio_sesion_a_cohortes',
    cat: 'funcion',
    grupo: 'Trigger · propagación',
    desc: 'Después de mover una sesión, replica el nuevo día y hora en las filas de `sesion_cohortes`.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2358,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Copia a todas las filas de `sesion_cohortes` de esa sesión el horario, la fecha, el día, los bloques y los minutos nuevos.',
    ],
    sql: `CREATE FUNCTION horarios.propagar_cambio_sesion_a_cohortes() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  update sesion_cohortes
  set horario_id = new.horario_id,
      fecha_sesion = new.fecha_sesion,
      dia = new.dia,
      indice_slot_inicio = new.indice_slot_inicio,
      duracion_slots = new.duracion_slots,
      minuto_inicio_dia = new.minuto_inicio_dia,
      minuto_fin_dia = new.minuto_fin_dia
  where sesion_id = new.id;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-revalidar_cohortes_de_sesion',
    nombre: 'revalidar_cohortes_de_sesion',
    cat: 'funcion',
    grupo: 'Trigger · propagación',
    desc: 'Cuando cambia algo estructural de la sesión, vuelve a validar las cohortes asociadas.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2433,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Reescribe las filas de `sesion_cohortes` de la sesión sin cambiarles el valor.',
      'Ese UPDATE en apariencia vacío vuelve a disparar las validaciones de `completar_sesion_cohorte`.',
    ],
    sql: `CREATE FUNCTION horarios.revalidar_cohortes_de_sesion() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  update sesion_cohortes
  set cohorte_id = cohorte_id
  where sesion_id = new.id;

  return new;
end;
$$;`,
  },
  {
    id: 'fn-bloquear_eliminacion_horario_oficial',
    nombre: 'bloquear_eliminacion_horario_oficial',
    cat: 'funcion',
    grupo: 'Trigger · bloqueo e inmutabilidad',
    desc: 'Impide borrar un horario oficial. El historial de lo publicado no se pierde.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 499,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Si el horario que se intenta borrar está aprobado, publicado o archivado, aborta.',
    ],
    sql: `CREATE FUNCTION horarios.bloquear_eliminacion_horario_oficial() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
  if old.estado in ('aprobado', 'publicado', 'archivado') then
    raise exception 'No se puede eliminar fisicamente un horario aprobado, publicado o archivado';
  end if;

  return old;
end;
$$;`,
  },
  {
    id: 'fn-bloquear_horario_publicado',
    nombre: 'bloquear_horario_publicado',
    cat: 'funcion',
    grupo: 'Trigger · bloqueo e inmutabilidad',
    desc: 'Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'Para cambiar un horario publicado hay que crear una versión derivada. Esta es la barrera que lo obliga.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 551,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Toma el `horario_id` de la fila nueva o de la vieja, según sea alta, cambio o baja.',
      'Si ese horario está publicado o archivado, aborta con excepción.',
    ],
    sql: `CREATE FUNCTION horarios.bloquear_horario_publicado() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
  v_horario_id uuid;
begin
  if tg_op = 'DELETE' then
    v_horario_id = old.horario_id;
  else
    v_horario_id = new.horario_id;
  end if;

  if exists (
    select 1
    from horarios
    where id = v_horario_id
      and estado in ('publicado', 'archivado')
      and eliminado_en is null
  ) then
    raise exception 'No se puede modificar directamente un horario publicado o archivado';
  end if;

  if tg_op = 'DELETE' then
    return old;
  end if;

  return new;
end;
$$;`,
  },
  {
    id: 'trg-agrupaciones_area_comun_actualizar_trg',
    nombre: 'agrupaciones_area_comun_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `agrupaciones_area_comun`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'agrupaciones_area_comun',
    linea: 5754,
    claves: 'actualizar_marca_con_version agrupaciones_area_comun trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER agrupaciones_area_comun_actualizar_trg BEFORE UPDATE ON horarios.agrupaciones_area_comun FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-asignaciones_docente_curso_actualizar_trg',
    nombre: 'asignaciones_docente_curso_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `asignaciones_docente_curso`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'asignaciones_docente_curso',
    linea: 5761,
    claves: 'actualizar_marca_con_version asignaciones_docente_curso trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER asignaciones_docente_curso_actualizar_trg BEFORE UPDATE ON horarios.asignaciones_docente_curso FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-aulas_actualizar_trg',
    nombre: 'aulas_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `aulas`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'aulas',
    linea: 5768,
    claves: 'actualizar_marca_con_version aulas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER aulas_actualizar_trg BEFORE UPDATE ON horarios.aulas FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-carreras_actualizar_trg',
    nombre: 'carreras_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `carreras`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'carreras',
    linea: 5775,
    claves: 'actualizar_marca_con_version carreras trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER carreras_actualizar_trg BEFORE UPDATE ON horarios.carreras FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-cohorte_periodos_actualizar_trg',
    nombre: 'cohorte_periodos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cohorte_periodos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cohorte_periodos',
    linea: 5782,
    claves: 'actualizar_marca_con_version cohorte_periodos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER cohorte_periodos_actualizar_trg BEFORE UPDATE ON horarios.cohorte_periodos FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-cohortes_actualizar_trg',
    nombre: 'cohortes_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cohortes`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cohortes',
    linea: 5796,
    claves: 'actualizar_marca_con_version cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER cohortes_actualizar_trg BEFORE UPDATE ON horarios.cohortes FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-cursos_actualizar_trg',
    nombre: 'cursos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cursos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cursos',
    linea: 5810,
    claves: 'actualizar_marca_con_version cursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER cursos_actualizar_trg BEFORE UPDATE ON horarios.cursos FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-cursos_en_pensum_actualizar_trg',
    nombre: 'cursos_en_pensum_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cursos_en_pensum`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cursos_en_pensum',
    linea: 5817,
    claves: 'actualizar_marca_con_version cursos_en_pensum trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER cursos_en_pensum_actualizar_trg BEFORE UPDATE ON horarios.cursos_en_pensum FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-disponibilidades_docente_actualizar_trg',
    nombre: 'disponibilidades_docente_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `disponibilidades_docente`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'disponibilidades_docente',
    linea: 5831,
    claves: 'actualizar_marca disponibilidades_docente trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER disponibilidades_docente_actualizar_trg BEFORE UPDATE ON horarios.disponibilidades_docente FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca();`,
  },
  {
    id: 'trg-docentes_actualizar_trg',
    nombre: 'docentes_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `docentes`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'docentes',
    linea: 5838,
    claves: 'actualizar_marca_con_version docentes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER docentes_actualizar_trg BEFORE UPDATE ON horarios.docentes FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-eventos_sustitucion_actualizar_trg',
    nombre: 'eventos_sustitucion_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `eventos_sustitucion`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'eventos_sustitucion',
    linea: 5845,
    claves: 'actualizar_marca_con_version eventos_sustitucion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER eventos_sustitucion_actualizar_trg BEFORE UPDATE ON horarios.eventos_sustitucion FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-facultades_actualizar_trg',
    nombre: 'facultades_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `facultades`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'facultades',
    linea: 5859,
    claves: 'actualizar_marca_con_version facultades trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER facultades_actualizar_trg BEFORE UPDATE ON horarios.facultades FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-horarios_actualizar_trg',
    nombre: 'horarios_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `horarios`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'horarios',
    linea: 5866,
    claves: 'actualizar_marca_con_version horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER horarios_actualizar_trg BEFORE UPDATE ON horarios.horarios FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-jornadas_actualizar_trg',
    nombre: 'jornadas_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `jornadas`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'jornadas',
    linea: 5901,
    claves: 'actualizar_marca_con_version jornadas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER jornadas_actualizar_trg BEFORE UPDATE ON horarios.jornadas FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-pensums_actualizar_trg',
    nombre: 'pensums_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `pensums`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'pensums',
    linea: 5908,
    claves: 'actualizar_marca_con_version pensums trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER pensums_actualizar_trg BEFORE UPDATE ON horarios.pensums FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-periodos_academicos_actualizar_trg',
    nombre: 'periodos_academicos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `periodos_academicos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'periodos_academicos',
    linea: 5915,
    claves: 'actualizar_marca_con_version periodos_academicos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER periodos_academicos_actualizar_trg BEFORE UPDATE ON horarios.periodos_academicos FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-plantillas_importacion_actualizar_trg',
    nombre: 'plantillas_importacion_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `plantillas_importacion`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'plantillas_importacion',
    linea: 5922,
    claves: 'actualizar_marca plantillas_importacion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER plantillas_importacion_actualizar_trg BEFORE UPDATE ON horarios.plantillas_importacion FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca();`,
  },
  {
    id: 'trg-plantillas_notificacion_actualizar_trg',
    nombre: 'plantillas_notificacion_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `plantillas_notificacion`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'plantillas_notificacion',
    linea: 5929,
    claves: 'actualizar_marca plantillas_notificacion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER plantillas_notificacion_actualizar_trg BEFORE UPDATE ON horarios.plantillas_notificacion FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca();`,
  },
  {
    id: 'trg-recursos_actualizar_trg',
    nombre: 'recursos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `recursos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'recursos',
    linea: 5936,
    claves: 'actualizar_marca_con_version recursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER recursos_actualizar_trg BEFORE UPDATE ON horarios.recursos FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-roles_actualizar_trg',
    nombre: 'roles_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `roles`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'roles',
    linea: 5943,
    claves: 'actualizar_marca roles trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER roles_actualizar_trg BEFORE UPDATE ON horarios.roles FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca();`,
  },
  {
    id: 'trg-usuarios_actualizar_trg',
    nombre: 'usuarios_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `usuarios`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es la pieza que sostiene el bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'usuarios',
    linea: 5978,
    claves: 'actualizar_marca_con_version usuarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER usuarios_actualizar_trg BEFORE UPDATE ON horarios.usuarios FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca_con_version();`,
  },
  {
    id: 'trg-ventanas_disponibilidad_actualizar_trg',
    nombre: 'ventanas_disponibilidad_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `ventanas_disponibilidad`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'ventanas_disponibilidad',
    linea: 5985,
    claves: 'actualizar_marca ventanas_disponibilidad trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER ventanas_disponibilidad_actualizar_trg BEFORE UPDATE ON horarios.ventanas_disponibilidad FOR EACH ROW EXECUTE FUNCTION horarios.actualizar_marca();`,
  },
  {
    id: 'trg-cohorte_periodos_validar_trg',
    nombre: 'cohorte_periodos_validar_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `cohorte_periodos`. Rechaza activar una cohorte que no existe o no está activa, o con un semestre que excede la carrera o el pensum.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de cohorte_id, semestre_asignado, esta_activa · por fila · validar_cohorte_periodo()',
    tabla: 'cohorte_periodos',
    linea: 5789,
    claves: 'validar_cohorte_periodo cohorte_periodos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER cohorte_periodos_validar_trg BEFORE INSERT OR UPDATE OF cohorte_id, semestre_asignado, esta_activa ON horarios.cohorte_periodos FOR EACH ROW EXECUTE FUNCTION horarios.validar_cohorte_periodo();`,
  },
  {
    id: 'trg-disponibilidad_docente_slots_validar_trg',
    nombre: 'disponibilidad_docente_slots_validar_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `disponibilidad_docente_slots`. Rechaza un bloque de disponibilidad que no existe en esa jornada.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de jornada_id, dia, indice_slot · por fila · validar_disponibilidad_slot()',
    tabla: 'disponibilidad_docente_slots',
    linea: 5824,
    claves: 'validar_disponibilidad_slot disponibilidad_docente_slots trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER disponibilidad_docente_slots_validar_trg BEFORE INSERT OR UPDATE OF jornada_id, dia, indice_slot ON horarios.disponibilidad_docente_slots FOR EACH ROW EXECUTE FUNCTION horarios.validar_disponibilidad_slot();`,
  },
  {
    id: 'trg-eventos_sustitucion_validar_docente_trg',
    nombre: 'eventos_sustitucion_validar_docente_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `eventos_sustitucion`. Comprueba que fechas y docentes de una sustitución son coherentes con el tipo de evento.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de tipo, sesion_afectada_id, docente_original_id, docente_entrante_id, fecha_inicio, fecha_fin, fecha_cambio, fecha_ausencia, fecha_recuperacion, fecha_cancelada · por fila · validar_sustitucion_docente_original()',
    tabla: 'eventos_sustitucion',
    linea: 5852,
    claves: 'validar_sustitucion_docente_original eventos_sustitucion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER eventos_sustitucion_validar_docente_trg BEFORE INSERT OR UPDATE OF tipo, sesion_afectada_id, docente_original_id, docente_entrante_id, fecha_inicio, fecha_fin, fecha_cambio, fecha_ausencia, fecha_recuperacion, fecha_cancelada ON horarios.eventos_sustitucion FOR EACH ROW EXECUTE FUNCTION horarios.validar_sustitucion_docente_original();`,
  },
  {
    id: 'trg-horarios_validar_publicacion_trg',
    nombre: 'horarios_validar_publicacion_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `horarios`. Impide pasar un horario a publicado si no cumple los requisitos de publicación.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de periodo_id, tipo_plan, estado, cantidad_violaciones_duras, fecha_aprobacion, fecha_publicacion, aprobado_por_id, publicado_por_id, eliminado_en · por fila · validar_horario_publicable()',
    tabla: 'horarios',
    linea: 5880,
    claves: 'validar_horario_publicable horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER horarios_validar_publicacion_trg BEFORE INSERT OR UPDATE OF periodo_id, tipo_plan, estado, cantidad_violaciones_duras, fecha_aprobacion, fecha_publicacion, aprobado_por_id, publicado_por_id, eliminado_en ON horarios.horarios FOR EACH ROW EXECUTE FUNCTION horarios.validar_horario_publicable();`,
  },
  {
    id: 'trg-importaciones_validar_plantilla_trg',
    nombre: 'importaciones_validar_plantilla_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `importaciones`. Rechaza un archivo que no coincide con la plantilla vigente y su versión.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de tipo_archivo, plantilla_id, plantilla_version, estado, finalizada_en · por fila · validar_importacion_plantilla()',
    tabla: 'importaciones',
    linea: 5887,
    claves: 'validar_importacion_plantilla importaciones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER importaciones_validar_plantilla_trg BEFORE INSERT OR UPDATE OF tipo_archivo, plantilla_id, plantilla_version, estado, finalizada_en ON horarios.importaciones FOR EACH ROW EXECUTE FUNCTION horarios.validar_importacion_plantilla();`,
  },
  {
    id: 'trg-jornada_descansos_validar_trg',
    nombre: 'jornada_descansos_validar_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `jornada_descansos`. Rechaza un receso cuyo día no pertenece a la jornada o que se sale de los bloques del día.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de jornada_id, dia, indice_slot_inicio, duracion_slots · por fila · validar_descanso_en_jornada()',
    tabla: 'jornada_descansos',
    linea: 5894,
    claves: 'validar_descanso_en_jornada jornada_descansos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER jornada_descansos_validar_trg BEFORE INSERT OR UPDATE OF jornada_id, dia, indice_slot_inicio, duracion_slots ON horarios.jornada_descansos FOR EACH ROW EXECUTE FUNCTION horarios.validar_descanso_en_jornada();`,
  },
  {
    id: 'trg-sesiones_validar_jornada_trg',
    nombre: 'sesiones_validar_jornada_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `sesiones`. Rechaza una sesión que no cabe en su jornada: día no activo o bloques fuera del rango del día.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de horario_id, curso_id, docente_id, aula_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, es_area_comun, agrupacion_area_comun_id · por fila · validar_sesion_en_jornada()',
    tabla: 'sesiones',
    linea: 5971,
    claves: 'validar_sesion_en_jornada sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER sesiones_validar_jornada_trg BEFORE INSERT OR UPDATE OF horario_id, curso_id, docente_id, aula_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, es_area_comun, agrupacion_area_comun_id ON horarios.sesiones FOR EACH ROW EXECUTE FUNCTION horarios.validar_sesion_en_jornada();`,
  },
  {
    id: 'trg-sesion_cohortes_completar_trg',
    nombre: 'sesion_cohortes_completar_trg',
    cat: 'trigger',
    grupo: 'Completar y derivar',
    desc: 'Sobre `sesion_cohortes`. Rellena en `sesion_cohortes` los campos copiados de la sesión (día, bloques, minutos) para que la tabla desnormalizada quede consistente.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de sesion_id, cohorte_id, horario_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, minuto_inicio_dia, minuto_fin_dia · por fila · completar_sesion_cohorte()',
    tabla: 'sesion_cohortes',
    linea: 5950,
    claves: 'completar_sesion_cohorte sesion_cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER sesion_cohortes_completar_trg BEFORE INSERT OR UPDATE OF sesion_id, cohorte_id, horario_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, minuto_inicio_dia, minuto_fin_dia ON horarios.sesion_cohortes FOR EACH ROW EXECUTE FUNCTION horarios.completar_sesion_cohorte();`,
  },
  {
    id: 'trg-zz_sesiones_aplicar_receso_trg',
    nombre: 'zz_sesiones_aplicar_receso_trg',
    cat: 'trigger',
    grupo: 'Completar y derivar',
    desc: 'Sobre `sesiones`. Traduce bloques a minutos de reloj insertando el receso de la jornada. Si al correrse la sesión se sale del día, aborta.',
    detalle: 'El prefijo `zz` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, UPDATE de jornada_id, indice_slot_inicio, duracion_slots · por fila · aplicar_receso_a_sesion()',
    tabla: 'sesiones',
    linea: 6041,
    claves: 'aplicar_receso_a_sesion sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER zz_sesiones_aplicar_receso_trg BEFORE INSERT OR UPDATE OF jornada_id, indice_slot_inicio, duracion_slots ON horarios.sesiones FOR EACH ROW EXECUTE FUNCTION horarios.aplicar_receso_a_sesion();`,
  },
  {
    id: 'trg-sesiones_propagar_cohortes_trg',
    nombre: 'sesiones_propagar_cohortes_trg',
    cat: 'trigger',
    grupo: 'Propagación',
    desc: 'Sobre `sesiones`. Después de mover una sesión, replica el nuevo día y hora en las filas de `sesion_cohortes`.',
    detalle: '',
    nota: 'AFTER UPDATE de horario_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots · por fila · propagar_cambio_sesion_a_cohortes()',
    tabla: 'sesiones',
    linea: 5957,
    claves: 'propagar_cambio_sesion_a_cohortes sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER sesiones_propagar_cohortes_trg AFTER UPDATE OF horario_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots ON horarios.sesiones FOR EACH ROW EXECUTE FUNCTION horarios.propagar_cambio_sesion_a_cohortes();`,
  },
  {
    id: 'trg-sesiones_revalidar_cohortes_trg',
    nombre: 'sesiones_revalidar_cohortes_trg',
    cat: 'trigger',
    grupo: 'Propagación',
    desc: 'Sobre `sesiones`. Cuando cambia algo estructural de la sesión, vuelve a validar las cohortes asociadas.',
    detalle: '',
    nota: 'AFTER UPDATE de horario_id, curso_id, docente_id, aula_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, es_area_comun, agrupacion_area_comun_id · por fila · revalidar_cohortes_de_sesion()',
    tabla: 'sesiones',
    linea: 5964,
    claves: 'revalidar_cohortes_de_sesion sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER sesiones_revalidar_cohortes_trg AFTER UPDATE OF horario_id, curso_id, docente_id, aula_id, jornada_id, fecha_sesion, dia, indice_slot_inicio, duracion_slots, es_area_comun, agrupacion_area_comun_id ON horarios.sesiones FOR EACH ROW EXECUTE FUNCTION horarios.revalidar_cohortes_de_sesion();`,
  },
  {
    id: 'trg-horarios_bloquear_delete_oficial_trg',
    nombre: 'horarios_bloquear_delete_oficial_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `horarios`. Impide borrar un horario oficial. El historial de lo publicado no se pierde.',
    detalle: '',
    nota: 'BEFORE DELETE · por fila · bloquear_eliminacion_horario_oficial()',
    tabla: 'horarios',
    linea: 5873,
    claves: 'bloquear_eliminacion_horario_oficial horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER horarios_bloquear_delete_oficial_trg BEFORE DELETE ON horarios.horarios FOR EACH ROW EXECUTE FUNCTION horarios.bloquear_eliminacion_horario_oficial();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_conflictos_trg',
    nombre: 'z_bloquear_horario_publicado_conflictos_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `conflictos`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'conflictos',
    linea: 5992,
    claves: 'bloquear_horario_publicado conflictos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER z_bloquear_horario_publicado_conflictos_trg BEFORE INSERT OR DELETE OR UPDATE ON horarios.conflictos FOR EACH ROW EXECUTE FUNCTION horarios.bloquear_horario_publicado();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_resultados_edicion_trg',
    nombre: 'z_bloquear_horario_publicado_resultados_edicion_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `resultados_edicion`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'resultados_edicion',
    linea: 6006,
    claves: 'bloquear_horario_publicado resultados_edicion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER z_bloquear_horario_publicado_resultados_edicion_trg BEFORE INSERT OR DELETE OR UPDATE ON horarios.resultados_edicion FOR EACH ROW EXECUTE FUNCTION horarios.bloquear_horario_publicado();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_sesion_cohortes_trg',
    nombre: 'z_bloquear_horario_publicado_sesion_cohortes_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `sesion_cohortes`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'sesion_cohortes',
    linea: 6013,
    claves: 'bloquear_horario_publicado sesion_cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER z_bloquear_horario_publicado_sesion_cohortes_trg BEFORE INSERT OR DELETE OR UPDATE ON horarios.sesion_cohortes FOR EACH ROW EXECUTE FUNCTION horarios.bloquear_horario_publicado();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_sesiones_trg',
    nombre: 'z_bloquear_horario_publicado_sesiones_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `sesiones`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'sesiones',
    linea: 6027,
    claves: 'bloquear_horario_publicado sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER z_bloquear_horario_publicado_sesiones_trg BEFORE INSERT OR DELETE OR UPDATE ON horarios.sesiones FOR EACH ROW EXECUTE FUNCTION horarios.bloquear_horario_publicado();`,
  },
  {
    id: 'cons-agrupacion_area_comun_cohortes_pkey',
    nombre: 'agrupacion_area_comun_cohortes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `agrupacion_area_comun_cohortes`: identifica cada fila por (agrupacion_id, cohorte_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 4829,
    claves: 'agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cohortes
    ADD CONSTRAINT agrupacion_area_comun_cohortes_pkey PRIMARY KEY (agrupacion_id, cohorte_id);`,
  },
  {
    id: 'cons-agrupacion_area_comun_cursos_pkey',
    nombre: 'agrupacion_area_comun_cursos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `agrupacion_area_comun_cursos`: identifica cada fila por (agrupacion_id, curso_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 4837,
    claves: 'agrupacion_area_comun_cursos agrupacion_area_comun_cursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cursos
    ADD CONSTRAINT agrupacion_area_comun_cursos_pkey PRIMARY KEY (agrupacion_id, curso_id);`,
  },
  {
    id: 'cons-agrupaciones_area_comun_pkey',
    nombre: 'agrupaciones_area_comun_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `agrupaciones_area_comun`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'agrupaciones_area_comun',
    linea: 4845,
    claves: 'agrupaciones_area_comun agrupaciones_area_comun_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupaciones_area_comun
    ADD CONSTRAINT agrupaciones_area_comun_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-asignaciones_docente_curso_pkey',
    nombre: 'asignaciones_docente_curso_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `asignaciones_docente_curso`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'asignaciones_docente_curso',
    linea: 4853,
    claves: 'asignaciones_docente_curso asignaciones_docente_curso_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-auditoria_pkey',
    nombre: 'auditoria_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `auditoria`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'auditoria',
    linea: 4861,
    claves: 'auditoria auditoria_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.auditoria
    ADD CONSTRAINT auditoria_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-aula_recursos_pkey',
    nombre: 'aula_recursos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `aula_recursos`: identifica cada fila por (aula_id, recurso_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'aula_recursos',
    linea: 4869,
    claves: 'aula_recursos aula_recursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.aula_recursos
    ADD CONSTRAINT aula_recursos_pkey PRIMARY KEY (aula_id, recurso_id);`,
  },
  {
    id: 'cons-aulas_pkey',
    nombre: 'aulas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `aulas`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'aulas',
    linea: 4877,
    claves: 'aulas aulas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.aulas
    ADD CONSTRAINT aulas_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-cambios_detectados_pkey',
    nombre: 'cambios_detectados_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `cambios_detectados`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'cambios_detectados',
    linea: 4885,
    claves: 'cambios_detectados cambios_detectados_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cambios_detectados
    ADD CONSTRAINT cambios_detectados_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-carrera_jornadas_pkey',
    nombre: 'carrera_jornadas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `carrera_jornadas`: identifica cada fila por (carrera_id, jornada_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'carrera_jornadas',
    linea: 4893,
    claves: 'carrera_jornadas carrera_jornadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.carrera_jornadas
    ADD CONSTRAINT carrera_jornadas_pkey PRIMARY KEY (carrera_id, jornada_id);`,
  },
  {
    id: 'cons-carreras_pkey',
    nombre: 'carreras_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `carreras`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'carreras',
    linea: 4901,
    claves: 'carreras carreras_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.carreras
    ADD CONSTRAINT carreras_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-cohorte_periodos_pkey',
    nombre: 'cohorte_periodos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `cohorte_periodos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'cohorte_periodos',
    linea: 4909,
    claves: 'cohorte_periodos cohorte_periodos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohorte_periodos
    ADD CONSTRAINT cohorte_periodos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-cohortes_pkey',
    nombre: 'cohortes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `cohortes`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'cohortes',
    linea: 4917,
    claves: 'cohortes cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-conflicto_sesiones_pkey',
    nombre: 'conflicto_sesiones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `conflicto_sesiones`: identifica cada fila por (conflicto_id, sesion_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'conflicto_sesiones',
    linea: 4941,
    claves: 'conflicto_sesiones conflicto_sesiones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.conflicto_sesiones
    ADD CONSTRAINT conflicto_sesiones_pkey PRIMARY KEY (conflicto_id, sesion_id);`,
  },
  {
    id: 'cons-conflictos_pkey',
    nombre: 'conflictos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `conflictos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'conflictos',
    linea: 4949,
    claves: 'conflictos conflictos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.conflictos
    ADD CONSTRAINT conflictos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-curso_carreras_compartidas_pkey',
    nombre: 'curso_carreras_compartidas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `curso_carreras_compartidas`: identifica cada fila por (curso_id, carrera_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'curso_carreras_compartidas',
    linea: 4957,
    claves: 'curso_carreras_compartidas curso_carreras_compartidas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_carreras_compartidas
    ADD CONSTRAINT curso_carreras_compartidas_pkey PRIMARY KEY (curso_id, carrera_id);`,
  },
  {
    id: 'cons-curso_recursos_requeridos_pkey',
    nombre: 'curso_recursos_requeridos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `curso_recursos_requeridos`: identifica cada fila por (curso_id, recurso_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'curso_recursos_requeridos',
    linea: 4965,
    claves: 'curso_recursos_requeridos curso_recursos_requeridos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_recursos_requeridos
    ADD CONSTRAINT curso_recursos_requeridos_pkey PRIMARY KEY (curso_id, recurso_id);`,
  },
  {
    id: 'cons-cursos_en_pensum_pkey',
    nombre: 'cursos_en_pensum_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `cursos_en_pensum`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'cursos_en_pensum',
    linea: 4981,
    claves: 'cursos_en_pensum cursos_en_pensum_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cursos_en_pensum
    ADD CONSTRAINT cursos_en_pensum_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-cursos_pkey',
    nombre: 'cursos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `cursos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'cursos',
    linea: 4989,
    claves: 'cursos cursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cursos
    ADD CONSTRAINT cursos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-disponibilidad_docente_slots_pkey',
    nombre: 'disponibilidad_docente_slots_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `disponibilidad_docente_slots`: identifica cada fila por (disponibilidad_id, jornada_id, dia, indice_slot).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'disponibilidad_docente_slots',
    linea: 4997,
    claves: 'disponibilidad_docente_slots disponibilidad_docente_slots_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidad_docente_slots
    ADD CONSTRAINT disponibilidad_docente_slots_pkey PRIMARY KEY (disponibilidad_id, jornada_id, dia, indice_slot);`,
  },
  {
    id: 'cons-disponibilidades_docente_pkey',
    nombre: 'disponibilidades_docente_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `disponibilidades_docente`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'disponibilidades_docente',
    linea: 5013,
    claves: 'disponibilidades_docente disponibilidades_docente_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidades_docente
    ADD CONSTRAINT disponibilidades_docente_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-docentes_pkey',
    nombre: 'docentes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `docentes`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'docentes',
    linea: 5021,
    claves: 'docentes docentes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.docentes
    ADD CONSTRAINT docentes_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-eventos_sustitucion_pkey',
    nombre: 'eventos_sustitucion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `eventos_sustitucion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'eventos_sustitucion',
    linea: 5029,
    claves: 'eventos_sustitucion eventos_sustitucion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.eventos_sustitucion
    ADD CONSTRAINT eventos_sustitucion_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-facultades_pkey',
    nombre: 'facultades_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `facultades`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'facultades',
    linea: 5037,
    claves: 'facultades facultades_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.facultades
    ADD CONSTRAINT facultades_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-historial_estados_horario_pkey',
    nombre: 'historial_estados_horario_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `historial_estados_horario`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'historial_estados_horario',
    linea: 5053,
    claves: 'historial_estados_horario historial_estados_horario_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.historial_estados_horario
    ADD CONSTRAINT historial_estados_horario_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-horarios_pkey',
    nombre: 'horarios_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `horarios`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'horarios',
    linea: 5061,
    claves: 'horarios horarios_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-importacion_errores_pkey',
    nombre: 'importacion_errores_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `importacion_errores`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'importacion_errores',
    linea: 5069,
    claves: 'importacion_errores importacion_errores_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.importacion_errores
    ADD CONSTRAINT importacion_errores_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-importaciones_pkey',
    nombre: 'importaciones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `importaciones`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'importaciones',
    linea: 5077,
    claves: 'importaciones importaciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.importaciones
    ADD CONSTRAINT importaciones_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-jornada_descansos_pkey',
    nombre: 'jornada_descansos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `jornada_descansos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'jornada_descansos',
    linea: 5093,
    claves: 'jornada_descansos jornada_descansos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.jornada_descansos
    ADD CONSTRAINT jornada_descansos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-jornadas_pkey',
    nombre: 'jornadas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `jornadas`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'jornadas',
    linea: 5101,
    claves: 'jornadas jornadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.jornadas
    ADD CONSTRAINT jornadas_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-notificaciones_pkey',
    nombre: 'notificaciones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `notificaciones`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'notificaciones',
    linea: 5117,
    claves: 'notificaciones notificaciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.notificaciones
    ADD CONSTRAINT notificaciones_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-pensums_pkey',
    nombre: 'pensums_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `pensums`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'pensums',
    linea: 5133,
    claves: 'pensums pensums_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.pensums
    ADD CONSTRAINT pensums_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-periodos_academicos_pkey',
    nombre: 'periodos_academicos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `periodos_academicos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'periodos_academicos',
    linea: 5141,
    claves: 'periodos_academicos periodos_academicos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.periodos_academicos
    ADD CONSTRAINT periodos_academicos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-permisos_acceso_pkey',
    nombre: 'permisos_acceso_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `permisos_acceso`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'permisos_acceso',
    linea: 5149,
    claves: 'permisos_acceso permisos_acceso_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.permisos_acceso
    ADD CONSTRAINT permisos_acceso_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-plantillas_importacion_pkey',
    nombre: 'plantillas_importacion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `plantillas_importacion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'plantillas_importacion',
    linea: 5189,
    claves: 'plantillas_importacion plantillas_importacion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.plantillas_importacion
    ADD CONSTRAINT plantillas_importacion_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-plantillas_notificacion_pkey',
    nombre: 'plantillas_notificacion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `plantillas_notificacion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'plantillas_notificacion',
    linea: 5197,
    claves: 'plantillas_notificacion plantillas_notificacion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.plantillas_notificacion
    ADD CONSTRAINT plantillas_notificacion_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-recursos_pkey',
    nombre: 'recursos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `recursos`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'recursos',
    linea: 5205,
    claves: 'recursos recursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.recursos
    ADD CONSTRAINT recursos_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-reportes_pkey',
    nombre: 'reportes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `reportes`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'reportes',
    linea: 5213,
    claves: 'reportes reportes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-resultado_edicion_conflictos_pkey',
    nombre: 'resultado_edicion_conflictos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `resultado_edicion_conflictos`: identifica cada fila por (resultado_edicion_id, conflicto_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'resultado_edicion_conflictos',
    linea: 5237,
    claves: 'resultado_edicion_conflictos resultado_edicion_conflictos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultado_edicion_conflictos
    ADD CONSTRAINT resultado_edicion_conflictos_pkey PRIMARY KEY (resultado_edicion_id, conflicto_id);`,
  },
  {
    id: 'cons-resultados_edicion_pkey',
    nombre: 'resultados_edicion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `resultados_edicion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'resultados_edicion',
    linea: 5245,
    claves: 'resultados_edicion resultados_edicion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultados_edicion
    ADD CONSTRAINT resultados_edicion_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-rol_permisos_pkey',
    nombre: 'rol_permisos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `rol_permisos`: identifica cada fila por (rol_id, permiso_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'rol_permisos',
    linea: 5253,
    claves: 'rol_permisos rol_permisos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.rol_permisos
    ADD CONSTRAINT rol_permisos_pkey PRIMARY KEY (rol_id, permiso_id);`,
  },
  {
    id: 'cons-roles_pkey',
    nombre: 'roles_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `roles`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'roles',
    linea: 5261,
    claves: 'roles roles_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-sesion_cohortes_pkey',
    nombre: 'sesion_cohortes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `sesion_cohortes`: identifica cada fila por (sesion_id, cohorte_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'sesion_cohortes',
    linea: 5277,
    claves: 'sesion_cohortes sesion_cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_pkey PRIMARY KEY (sesion_id, cohorte_id);`,
  },
  {
    id: 'cons-sesiones_pkey',
    nombre: 'sesiones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `sesiones`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'sesiones',
    linea: 5317,
    claves: 'sesiones sesiones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-usuario_facultades_pkey',
    nombre: 'usuario_facultades_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `usuario_facultades`: identifica cada fila por (usuario_id, facultad_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'usuario_facultades',
    linea: 5333,
    claves: 'usuario_facultades usuario_facultades_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_facultades
    ADD CONSTRAINT usuario_facultades_pkey PRIMARY KEY (usuario_id, facultad_id);`,
  },
  {
    id: 'cons-usuario_roles_pkey',
    nombre: 'usuario_roles_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `usuario_roles`: identifica cada fila por (usuario_id, rol_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'usuario_roles',
    linea: 5341,
    claves: 'usuario_roles usuario_roles_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_roles
    ADD CONSTRAINT usuario_roles_pkey PRIMARY KEY (usuario_id, rol_id);`,
  },
  {
    id: 'cons-usuarios_pkey',
    nombre: 'usuarios_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `usuarios`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'usuarios',
    linea: 5357,
    claves: 'usuarios usuarios_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-ventanas_disponibilidad_pkey',
    nombre: 'ventanas_disponibilidad_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `ventanas_disponibilidad`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'ventanas_disponibilidad',
    linea: 5373,
    claves: 'ventanas_disponibilidad ventanas_disponibilidad_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.ventanas_disponibilidad
    ADD CONSTRAINT ventanas_disponibilidad_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-versiones_horario_pkey',
    nombre: 'versiones_horario_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `versiones_horario`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'versiones_horario',
    linea: 5389,
    claves: 'versiones_horario versiones_horario_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.versiones_horario
    ADD CONSTRAINT versiones_horario_pkey PRIMARY KEY (id);`,
  },
  {
    id: 'cons-cursos_en_pensum_pensum_id_curso_id_key',
    nombre: 'cursos_en_pensum_pensum_id_curso_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `cursos_en_pensum` con el mismo valor de (pensum_id, curso_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'cursos_en_pensum',
    linea: 4973,
    claves: 'cursos_en_pensum cursos_en_pensum_pensum_id_curso_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cursos_en_pensum
    ADD CONSTRAINT cursos_en_pensum_pensum_id_curso_id_key UNIQUE (pensum_id, curso_id);`,
  },
  {
    id: 'cons-disponibilidades_docente_docente_id_periodo_id_key',
    nombre: 'disponibilidades_docente_docente_id_periodo_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `disponibilidades_docente` con el mismo valor de (docente_id, periodo_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'disponibilidades_docente',
    linea: 5005,
    claves: 'disponibilidades_docente disponibilidades_docente_docente_id_periodo_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidades_docente
    ADD CONSTRAINT disponibilidades_docente_docente_id_periodo_id_key UNIQUE (docente_id, periodo_id);`,
  },
  {
    id: 'cons-pensums_id_carrera_uq',
    nombre: 'pensums_id_carrera_uq',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `pensums` con el mismo valor de (id, carrera_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'pensums',
    linea: 5125,
    claves: 'pensums pensums_id_carrera_uq',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.pensums
    ADD CONSTRAINT pensums_id_carrera_uq UNIQUE (id, carrera_id);`,
  },
  {
    id: 'cons-permisos_acceso_recurso_accion_key',
    nombre: 'permisos_acceso_recurso_accion_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `permisos_acceso` con el mismo valor de (recurso, accion).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'permisos_acceso',
    linea: 5157,
    claves: 'permisos_acceso permisos_acceso_recurso_accion_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.permisos_acceso
    ADD CONSTRAINT permisos_acceso_recurso_accion_key UNIQUE (recurso, accion);`,
  },
  {
    id: 'cons-plantillas_importacion_codigo_version_key',
    nombre: 'plantillas_importacion_codigo_version_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `plantillas_importacion` con el mismo valor de (codigo, version).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'plantillas_importacion',
    linea: 5181,
    claves: 'plantillas_importacion plantillas_importacion_codigo_version_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.plantillas_importacion
    ADD CONSTRAINT plantillas_importacion_codigo_version_key UNIQUE (codigo, version);`,
  },
  {
    id: 'cons-sesiones_id_horario_id_key',
    nombre: 'sesiones_id_horario_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `sesiones` con el mismo valor de (id, horario_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'sesiones',
    linea: 5301,
    claves: 'sesiones sesiones_id_horario_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_id_horario_id_key UNIQUE (id, horario_id);`,
  },
  {
    id: 'cons-usuarios_auth_user_id_key',
    nombre: 'usuarios_auth_user_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `usuarios` con el mismo valor de (auth_user_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'usuarios',
    linea: 5349,
    claves: 'usuarios usuarios_auth_user_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuarios
    ADD CONSTRAINT usuarios_auth_user_id_key UNIQUE (auth_user_id);`,
  },
  {
    id: 'cons-ventanas_disponibilidad_periodo_id_key',
    nombre: 'ventanas_disponibilidad_periodo_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `ventanas_disponibilidad` con el mismo valor de (periodo_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'ventanas_disponibilidad',
    linea: 5365,
    claves: 'ventanas_disponibilidad ventanas_disponibilidad_periodo_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.ventanas_disponibilidad
    ADD CONSTRAINT ventanas_disponibilidad_periodo_id_key UNIQUE (periodo_id);`,
  },
  {
    id: 'cons-versiones_horario_horario_id_numero_version_key',
    nombre: 'versiones_horario_horario_id_numero_version_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `versiones_horario` con el mismo valor de (horario_id, numero_version).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'versiones_horario',
    linea: 5381,
    claves: 'versiones_horario versiones_horario_horario_id_numero_version_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.versiones_horario
    ADD CONSTRAINT versiones_horario_horario_id_numero_version_key UNIQUE (horario_id, numero_version);`,
  },
  {
    id: 'cons-jornada_descansos_no_solapados',
    nombre: 'jornada_descansos_no_solapados',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Dos recesos de la misma jornada no pueden pisarse.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'jornada_descansos',
    linea: 5085,
    claves: 'jornada_descansos jornada_descansos_no_solapados',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.jornada_descansos
    ADD CONSTRAINT jornada_descansos_no_solapados EXCLUDE USING gist (jornada_id WITH =, dia WITH =, rango_slots WITH &&);`,
  },
  {
    id: 'cons-sesion_cohortes_no_solapadas',
    nombre: 'sesion_cohortes_no_solapadas',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Un mismo grupo de estudiantes no puede tener dos clases encima.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesion_cohortes',
    linea: 5269,
    claves: 'sesion_cohortes sesion_cohortes_no_solapadas',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_no_solapadas EXCLUDE USING gist (horario_id WITH =, cohorte_id WITH =, COALESCE(fecha_sesion, '0001-01-01'::date) WITH =, dia WITH =, rango_minutos WITH &&);`,
  },
  {
    id: 'cons-sesiones_aula_no_solapada',
    nombre: 'sesiones_aula_no_solapada',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Dos clases no pueden ocupar el mismo salón a la misma hora.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesiones',
    linea: 5285,
    claves: 'sesiones sesiones_aula_no_solapada',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_aula_no_solapada EXCLUDE USING gist (horario_id WITH =, aula_id WITH =, COALESCE(fecha_sesion, '0001-01-01'::date) WITH =, dia WITH =, rango_minutos WITH &&);`,
  },
  {
    id: 'cons-sesiones_docente_no_solapado',
    nombre: 'sesiones_docente_no_solapado',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Un docente no puede estar en dos clases a la vez. Lo garantiza la base con una restricción de exclusión, no el código de la aplicación.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesiones',
    linea: 5293,
    claves: 'sesiones sesiones_docente_no_solapado',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_docente_no_solapado EXCLUDE USING gist (horario_id WITH =, docente_id WITH =, COALESCE(fecha_sesion, '0001-01-01'::date) WITH =, dia WITH =, rango_minutos WITH &&);`,
  },
  {
    id: 'fk-agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_agrupacion_id_fkey',
    nombre: 'agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_agrupacion_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupacion_area_comun_cohortes` apunta a `agrupaciones_area_comun` por agrupacion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'agrupacion_area_comun_cohortes.agrupacion_id → agrupaciones_area_comun.id · ON DELETE CASCADE',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 6048,
    claves: 'agrupacion_area_comun_cohortes agrupaciones_area_comun agrupacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cohortes
    ADD CONSTRAINT agrupacion_area_comun_cohortes_agrupacion_id_fkey FOREIGN KEY (agrupacion_id) REFERENCES horarios.agrupaciones_area_comun(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_cohorte_id_fkey',
    nombre: 'agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_cohorte_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupacion_area_comun_cohortes` apunta a `cohortes` por cohorte_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupacion_area_comun_cohortes.cohorte_id → cohortes.id · ON DELETE RESTRICT',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 6056,
    claves: 'agrupacion_area_comun_cohortes cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cohortes
    ADD CONSTRAINT agrupacion_area_comun_cohortes_cohorte_id_fkey FOREIGN KEY (cohorte_id) REFERENCES horarios.cohortes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-agrupacion_area_comun_cursos agrupacion_area_comun_cursos_agrupacion_id_fkey',
    nombre: 'agrupacion_area_comun_cursos agrupacion_area_comun_cursos_agrupacion_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupacion_area_comun_cursos` apunta a `agrupaciones_area_comun` por agrupacion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'agrupacion_area_comun_cursos.agrupacion_id → agrupaciones_area_comun.id · ON DELETE CASCADE',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 6064,
    claves: 'agrupacion_area_comun_cursos agrupaciones_area_comun agrupacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cursos
    ADD CONSTRAINT agrupacion_area_comun_cursos_agrupacion_id_fkey FOREIGN KEY (agrupacion_id) REFERENCES horarios.agrupaciones_area_comun(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-agrupacion_area_comun_cursos agrupacion_area_comun_cursos_curso_id_fkey',
    nombre: 'agrupacion_area_comun_cursos agrupacion_area_comun_cursos_curso_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupacion_area_comun_cursos` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupacion_area_comun_cursos.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 6072,
    claves: 'agrupacion_area_comun_cursos cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupacion_area_comun_cursos
    ADD CONSTRAINT agrupacion_area_comun_cursos_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-agrupaciones_area_comun agrupaciones_area_comun_creada_por_id_fkey',
    nombre: 'agrupaciones_area_comun agrupaciones_area_comun_creada_por_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupaciones_area_comun` apunta a `usuarios` por creada_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'agrupaciones_area_comun.creada_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'agrupaciones_area_comun',
    linea: 6080,
    claves: 'agrupaciones_area_comun usuarios creada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupaciones_area_comun
    ADD CONSTRAINT agrupaciones_area_comun_creada_por_id_fkey FOREIGN KEY (creada_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-agrupaciones_area_comun agrupaciones_area_comun_curso_principal_id_fkey',
    nombre: 'agrupaciones_area_comun agrupaciones_area_comun_curso_principal_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupaciones_area_comun` apunta a `cursos` por curso_principal_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupaciones_area_comun.curso_principal_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'agrupaciones_area_comun',
    linea: 6088,
    claves: 'agrupaciones_area_comun cursos curso_principal_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupaciones_area_comun
    ADD CONSTRAINT agrupaciones_area_comun_curso_principal_id_fkey FOREIGN KEY (curso_principal_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-agrupaciones_area_comun agrupaciones_area_comun_periodo_id_fkey',
    nombre: 'agrupaciones_area_comun agrupaciones_area_comun_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupaciones_area_comun` apunta a `periodos_academicos` por periodo_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupaciones_area_comun.periodo_id → periodos_academicos.id · ON DELETE RESTRICT',
    tabla: 'agrupaciones_area_comun',
    linea: 6096,
    claves: 'agrupaciones_area_comun periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.agrupaciones_area_comun
    ADD CONSTRAINT agrupaciones_area_comun_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES horarios.periodos_academicos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-carrera_jornadas carrera_jornadas_carrera_id_fkey',
    nombre: 'carrera_jornadas carrera_jornadas_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `carrera_jornadas` apunta a `carreras` por carrera_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'carrera_jornadas.carrera_id → carreras.id · ON DELETE CASCADE',
    tabla: 'carrera_jornadas',
    linea: 6184,
    claves: 'carrera_jornadas carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.carrera_jornadas
    ADD CONSTRAINT carrera_jornadas_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES horarios.carreras(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-carrera_jornadas carrera_jornadas_jornada_id_fkey',
    nombre: 'carrera_jornadas carrera_jornadas_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `carrera_jornadas` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'carrera_jornadas.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'carrera_jornadas',
    linea: 6192,
    claves: 'carrera_jornadas jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.carrera_jornadas
    ADD CONSTRAINT carrera_jornadas_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-carreras carreras_facultad_id_fkey',
    nombre: 'carreras carreras_facultad_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `carreras` apunta a `facultades` por facultad_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'carreras.facultad_id → facultades.id · ON DELETE RESTRICT',
    tabla: 'carreras',
    linea: 6200,
    claves: 'carreras facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.carreras
    ADD CONSTRAINT carreras_facultad_id_fkey FOREIGN KEY (facultad_id) REFERENCES horarios.facultades(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cohorte_periodos cohorte_periodos_cohorte_id_fkey',
    nombre: 'cohorte_periodos cohorte_periodos_cohorte_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohorte_periodos` apunta a `cohortes` por cohorte_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cohorte_periodos.cohorte_id → cohortes.id · ON DELETE RESTRICT',
    tabla: 'cohorte_periodos',
    linea: 6208,
    claves: 'cohorte_periodos cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohorte_periodos
    ADD CONSTRAINT cohorte_periodos_cohorte_id_fkey FOREIGN KEY (cohorte_id) REFERENCES horarios.cohortes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cohorte_periodos cohorte_periodos_periodo_id_fkey',
    nombre: 'cohorte_periodos cohorte_periodos_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohorte_periodos` apunta a `periodos_academicos` por periodo_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cohorte_periodos.periodo_id → periodos_academicos.id · ON DELETE RESTRICT',
    tabla: 'cohorte_periodos',
    linea: 6216,
    claves: 'cohorte_periodos periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohorte_periodos
    ADD CONSTRAINT cohorte_periodos_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES horarios.periodos_academicos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cohortes cohortes_carrera_id_fkey',
    nombre: 'cohortes cohortes_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohortes` apunta a `carreras` por carrera_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cohortes.carrera_id → carreras.id · ON DELETE RESTRICT',
    tabla: 'cohortes',
    linea: 6224,
    claves: 'cohortes carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES horarios.carreras(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cohortes cohortes_carrera_id_jornada_id_fkey',
    nombre: 'cohortes cohortes_carrera_id_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohortes` apunta a `carrera_jornadas` por carrera_id, jornada_id: rechaza el borrado del padre si quedan filas apuntando.',
    detalle: '',
    nota: 'cohortes.carrera_id, jornada_id → carrera_jornadas.carrera_id, jornada_id · ON DELETE NO ACTION',
    tabla: 'cohortes',
    linea: 6232,
    claves: 'cohortes carrera_jornadas carrera_id, jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_carrera_id_jornada_id_fkey FOREIGN KEY (carrera_id, jornada_id) REFERENCES horarios.carrera_jornadas(carrera_id, jornada_id);`,
  },
  {
    id: 'fk-cohortes cohortes_jornada_id_fkey',
    nombre: 'cohortes cohortes_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohortes` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cohortes.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'cohortes',
    linea: 6240,
    claves: 'cohortes jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cohortes cohortes_pensum_id_carrera_id_fkey',
    nombre: 'cohortes cohortes_pensum_id_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohortes` apunta a `pensums` por pensum_id, carrera_id: rechaza el borrado del padre si quedan filas apuntando.',
    detalle: '',
    nota: 'cohortes.pensum_id, carrera_id → pensums.id, carrera_id · ON DELETE NO ACTION',
    tabla: 'cohortes',
    linea: 6248,
    claves: 'cohortes pensums pensum_id, carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_pensum_id_carrera_id_fkey FOREIGN KEY (pensum_id, carrera_id) REFERENCES horarios.pensums(id, carrera_id);`,
  },
  {
    id: 'fk-cohortes cohortes_pensum_id_fkey',
    nombre: 'cohortes cohortes_pensum_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cohortes` apunta a `pensums` por pensum_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cohortes.pensum_id → pensums.id · ON DELETE RESTRICT',
    tabla: 'cohortes',
    linea: 6256,
    claves: 'cohortes pensums pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cohortes
    ADD CONSTRAINT cohortes_pensum_id_fkey FOREIGN KEY (pensum_id) REFERENCES horarios.pensums(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-curso_carreras_compartidas curso_carreras_compartidas_carrera_id_fkey',
    nombre: 'curso_carreras_compartidas curso_carreras_compartidas_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `curso_carreras_compartidas` apunta a `carreras` por carrera_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'curso_carreras_compartidas.carrera_id → carreras.id · ON DELETE RESTRICT',
    tabla: 'curso_carreras_compartidas',
    linea: 6304,
    claves: 'curso_carreras_compartidas carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_carreras_compartidas
    ADD CONSTRAINT curso_carreras_compartidas_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES horarios.carreras(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-curso_carreras_compartidas curso_carreras_compartidas_curso_id_fkey',
    nombre: 'curso_carreras_compartidas curso_carreras_compartidas_curso_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `curso_carreras_compartidas` apunta a `cursos` por curso_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'curso_carreras_compartidas.curso_id → cursos.id · ON DELETE CASCADE',
    tabla: 'curso_carreras_compartidas',
    linea: 6312,
    claves: 'curso_carreras_compartidas cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_carreras_compartidas
    ADD CONSTRAINT curso_carreras_compartidas_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-cursos_en_pensum cursos_en_pensum_curso_id_fkey',
    nombre: 'cursos_en_pensum cursos_en_pensum_curso_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cursos_en_pensum` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cursos_en_pensum.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'cursos_en_pensum',
    linea: 6336,
    claves: 'cursos_en_pensum cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cursos_en_pensum
    ADD CONSTRAINT cursos_en_pensum_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cursos_en_pensum cursos_en_pensum_pensum_id_fkey',
    nombre: 'cursos_en_pensum cursos_en_pensum_pensum_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cursos_en_pensum` apunta a `pensums` por pensum_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'cursos_en_pensum.pensum_id → pensums.id · ON DELETE CASCADE',
    tabla: 'cursos_en_pensum',
    linea: 6344,
    claves: 'cursos_en_pensum pensums pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cursos_en_pensum
    ADD CONSTRAINT cursos_en_pensum_pensum_id_fkey FOREIGN KEY (pensum_id) REFERENCES horarios.pensums(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornada_descansos jornada_descansos_jornada_id_fkey',
    nombre: 'jornada_descansos jornada_descansos_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_descansos` apunta a `jornadas` por jornada_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'jornada_descansos.jornada_id → jornadas.id · ON DELETE CASCADE',
    tabla: 'jornada_descansos',
    linea: 6536,
    claves: 'jornada_descansos jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.jornada_descansos
    ADD CONSTRAINT jornada_descansos_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-pensums pensums_carrera_id_fkey',
    nombre: 'pensums pensums_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `pensums` apunta a `carreras` por carrera_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'pensums.carrera_id → carreras.id · ON DELETE RESTRICT',
    tabla: 'pensums',
    linea: 6568,
    claves: 'pensums carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.pensums
    ADD CONSTRAINT pensums_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES horarios.carreras(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-aula_recursos aula_recursos_aula_id_fkey',
    nombre: 'aula_recursos aula_recursos_aula_id_fkey',
    cat: 'fk',
    grupo: 'Infraestructura',
    desc: 'Cada fila de `aula_recursos` apunta a `aulas` por aula_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'aula_recursos.aula_id → aulas.id · ON DELETE CASCADE',
    tabla: 'aula_recursos',
    linea: 6152,
    claves: 'aula_recursos aulas aula_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.aula_recursos
    ADD CONSTRAINT aula_recursos_aula_id_fkey FOREIGN KEY (aula_id) REFERENCES horarios.aulas(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-aula_recursos aula_recursos_recurso_id_fkey',
    nombre: 'aula_recursos aula_recursos_recurso_id_fkey',
    cat: 'fk',
    grupo: 'Infraestructura',
    desc: 'Cada fila de `aula_recursos` apunta a `recursos` por recurso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'aula_recursos.recurso_id → recursos.id · ON DELETE RESTRICT',
    tabla: 'aula_recursos',
    linea: 6160,
    claves: 'aula_recursos recursos recurso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.aula_recursos
    ADD CONSTRAINT aula_recursos_recurso_id_fkey FOREIGN KEY (recurso_id) REFERENCES horarios.recursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-curso_recursos_requeridos curso_recursos_requeridos_curso_id_fkey',
    nombre: 'curso_recursos_requeridos curso_recursos_requeridos_curso_id_fkey',
    cat: 'fk',
    grupo: 'Infraestructura',
    desc: 'Cada fila de `curso_recursos_requeridos` apunta a `cursos` por curso_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'curso_recursos_requeridos.curso_id → cursos.id · ON DELETE CASCADE',
    tabla: 'curso_recursos_requeridos',
    linea: 6320,
    claves: 'curso_recursos_requeridos cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_recursos_requeridos
    ADD CONSTRAINT curso_recursos_requeridos_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-curso_recursos_requeridos curso_recursos_requeridos_recurso_id_fkey',
    nombre: 'curso_recursos_requeridos curso_recursos_requeridos_recurso_id_fkey',
    cat: 'fk',
    grupo: 'Infraestructura',
    desc: 'Cada fila de `curso_recursos_requeridos` apunta a `recursos` por recurso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'curso_recursos_requeridos.recurso_id → recursos.id · ON DELETE RESTRICT',
    tabla: 'curso_recursos_requeridos',
    linea: 6328,
    claves: 'curso_recursos_requeridos recursos recurso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.curso_recursos_requeridos
    ADD CONSTRAINT curso_recursos_requeridos_recurso_id_fkey FOREIGN KEY (recurso_id) REFERENCES horarios.recursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cambios_detectados cambios_detectados_sesion_id_fkey',
    nombre: 'cambios_detectados cambios_detectados_sesion_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `cambios_detectados` apunta a `sesiones` por sesion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'cambios_detectados.sesion_id → sesiones.id · ON DELETE CASCADE',
    tabla: 'cambios_detectados',
    linea: 6168,
    claves: 'cambios_detectados sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cambios_detectados
    ADD CONSTRAINT cambios_detectados_sesion_id_fkey FOREIGN KEY (sesion_id) REFERENCES horarios.sesiones(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-cambios_detectados cambios_detectados_version_horario_id_fkey',
    nombre: 'cambios_detectados cambios_detectados_version_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `cambios_detectados` apunta a `versiones_horario` por version_horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'cambios_detectados.version_horario_id → versiones_horario.id · ON DELETE CASCADE',
    tabla: 'cambios_detectados',
    linea: 6176,
    claves: 'cambios_detectados versiones_horario version_horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.cambios_detectados
    ADD CONSTRAINT cambios_detectados_version_horario_id_fkey FOREIGN KEY (version_horario_id) REFERENCES horarios.versiones_horario(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-conflicto_sesiones conflicto_sesiones_conflicto_id_fkey',
    nombre: 'conflicto_sesiones conflicto_sesiones_conflicto_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `conflicto_sesiones` apunta a `conflictos` por conflicto_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'conflicto_sesiones.conflicto_id → conflictos.id · ON DELETE CASCADE',
    tabla: 'conflicto_sesiones',
    linea: 6280,
    claves: 'conflicto_sesiones conflictos conflicto_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.conflicto_sesiones
    ADD CONSTRAINT conflicto_sesiones_conflicto_id_fkey FOREIGN KEY (conflicto_id) REFERENCES horarios.conflictos(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-conflicto_sesiones conflicto_sesiones_sesion_id_fkey',
    nombre: 'conflicto_sesiones conflicto_sesiones_sesion_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `conflicto_sesiones` apunta a `sesiones` por sesion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'conflicto_sesiones.sesion_id → sesiones.id · ON DELETE CASCADE',
    tabla: 'conflicto_sesiones',
    linea: 6288,
    claves: 'conflicto_sesiones sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.conflicto_sesiones
    ADD CONSTRAINT conflicto_sesiones_sesion_id_fkey FOREIGN KEY (sesion_id) REFERENCES horarios.sesiones(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-conflictos conflictos_horario_id_fkey',
    nombre: 'conflictos conflictos_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `conflictos` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'conflictos.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'conflictos',
    linea: 6296,
    claves: 'conflictos horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.conflictos
    ADD CONSTRAINT conflictos_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-historial_estados_horario historial_estados_horario_cambiado_por_id_fkey',
    nombre: 'historial_estados_horario historial_estados_horario_cambiado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `historial_estados_horario` apunta a `usuarios` por cambiado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'historial_estados_horario.cambiado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'historial_estados_horario',
    linea: 6456,
    claves: 'historial_estados_horario usuarios cambiado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.historial_estados_horario
    ADD CONSTRAINT historial_estados_horario_cambiado_por_id_fkey FOREIGN KEY (cambiado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-historial_estados_horario historial_estados_horario_horario_id_fkey',
    nombre: 'historial_estados_horario historial_estados_horario_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `historial_estados_horario` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'historial_estados_horario.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'historial_estados_horario',
    linea: 6464,
    claves: 'historial_estados_horario horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.historial_estados_horario
    ADD CONSTRAINT historial_estados_horario_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-horarios horarios_aprobado_por_id_fkey',
    nombre: 'horarios horarios_aprobado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `horarios` apunta a `usuarios` por aprobado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'horarios.aprobado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'horarios',
    linea: 6472,
    claves: 'horarios usuarios aprobado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_aprobado_por_id_fkey FOREIGN KEY (aprobado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-horarios horarios_generado_por_id_fkey',
    nombre: 'horarios horarios_generado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `horarios` apunta a `usuarios` por generado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'horarios.generado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'horarios',
    linea: 6480,
    claves: 'horarios usuarios generado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_generado_por_id_fkey FOREIGN KEY (generado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-horarios horarios_horario_origen_id_fkey',
    nombre: 'horarios horarios_horario_origen_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `horarios` apunta a `horarios` por horario_origen_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'horarios.horario_origen_id → horarios.id · ON DELETE RESTRICT',
    tabla: 'horarios',
    linea: 6488,
    claves: 'horarios horarios horario_origen_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_horario_origen_id_fkey FOREIGN KEY (horario_origen_id) REFERENCES horarios.horarios(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-horarios horarios_periodo_id_fkey',
    nombre: 'horarios horarios_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `horarios` apunta a `periodos_academicos` por periodo_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'horarios.periodo_id → periodos_academicos.id · ON DELETE RESTRICT',
    tabla: 'horarios',
    linea: 6496,
    claves: 'horarios periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES horarios.periodos_academicos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-horarios horarios_publicado_por_id_fkey',
    nombre: 'horarios horarios_publicado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `horarios` apunta a `usuarios` por publicado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'horarios.publicado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'horarios',
    linea: 6504,
    claves: 'horarios usuarios publicado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.horarios
    ADD CONSTRAINT horarios_publicado_por_id_fkey FOREIGN KEY (publicado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-resultado_edicion_conflictos resultado_edicion_conflictos_conflicto_id_fkey',
    nombre: 'resultado_edicion_conflictos resultado_edicion_conflictos_conflicto_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultado_edicion_conflictos` apunta a `conflictos` por conflicto_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'resultado_edicion_conflictos.conflicto_id → conflictos.id · ON DELETE CASCADE',
    tabla: 'resultado_edicion_conflictos',
    linea: 6632,
    claves: 'resultado_edicion_conflictos conflictos conflicto_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultado_edicion_conflictos
    ADD CONSTRAINT resultado_edicion_conflictos_conflicto_id_fkey FOREIGN KEY (conflicto_id) REFERENCES horarios.conflictos(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-resultado_edicion_conflictos resultado_edicion_conflictos_resultado_edicion_id_fkey',
    nombre: 'resultado_edicion_conflictos resultado_edicion_conflictos_resultado_edicion_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultado_edicion_conflictos` apunta a `resultados_edicion` por resultado_edicion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'resultado_edicion_conflictos.resultado_edicion_id → resultados_edicion.id · ON DELETE CASCADE',
    tabla: 'resultado_edicion_conflictos',
    linea: 6640,
    claves: 'resultado_edicion_conflictos resultados_edicion resultado_edicion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultado_edicion_conflictos
    ADD CONSTRAINT resultado_edicion_conflictos_resultado_edicion_id_fkey FOREIGN KEY (resultado_edicion_id) REFERENCES horarios.resultados_edicion(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-resultados_edicion resultados_edicion_creado_por_id_fkey',
    nombre: 'resultados_edicion resultados_edicion_creado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultados_edicion` apunta a `usuarios` por creado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'resultados_edicion.creado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'resultados_edicion',
    linea: 6648,
    claves: 'resultados_edicion usuarios creado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultados_edicion
    ADD CONSTRAINT resultados_edicion_creado_por_id_fkey FOREIGN KEY (creado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-resultados_edicion resultados_edicion_horario_id_fkey',
    nombre: 'resultados_edicion resultados_edicion_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultados_edicion` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'resultados_edicion.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'resultados_edicion',
    linea: 6656,
    claves: 'resultados_edicion horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultados_edicion
    ADD CONSTRAINT resultados_edicion_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-resultados_edicion resultados_edicion_horario_origen_id_fkey',
    nombre: 'resultados_edicion resultados_edicion_horario_origen_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultados_edicion` apunta a `horarios` por horario_origen_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'resultados_edicion.horario_origen_id → horarios.id · ON DELETE RESTRICT',
    tabla: 'resultados_edicion',
    linea: 6664,
    claves: 'resultados_edicion horarios horario_origen_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultados_edicion
    ADD CONSTRAINT resultados_edicion_horario_origen_id_fkey FOREIGN KEY (horario_origen_id) REFERENCES horarios.horarios(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-resultados_edicion resultados_edicion_sesion_fijada_id_fkey',
    nombre: 'resultados_edicion resultados_edicion_sesion_fijada_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `resultados_edicion` apunta a `sesiones` por sesion_fijada_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'resultados_edicion.sesion_fijada_id → sesiones.id · ON DELETE SET NULL',
    tabla: 'resultados_edicion',
    linea: 6672,
    claves: 'resultados_edicion sesiones sesion_fijada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.resultados_edicion
    ADD CONSTRAINT resultados_edicion_sesion_fijada_id_fkey FOREIGN KEY (sesion_fijada_id) REFERENCES horarios.sesiones(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_cohorte_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_cohorte_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `cohortes` por cohorte_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.cohorte_id → cohortes.id · ON DELETE RESTRICT',
    tabla: 'sesion_cohortes',
    linea: 6696,
    claves: 'sesion_cohortes cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_cohorte_id_fkey FOREIGN KEY (cohorte_id) REFERENCES horarios.cohortes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_curso_en_pensum_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_curso_en_pensum_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `cursos_en_pensum` por curso_en_pensum_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.curso_en_pensum_id → cursos_en_pensum.id · ON DELETE RESTRICT',
    tabla: 'sesion_cohortes',
    linea: 6704,
    claves: 'sesion_cohortes cursos_en_pensum curso_en_pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_curso_en_pensum_id_fkey FOREIGN KEY (curso_en_pensum_id) REFERENCES horarios.cursos_en_pensum(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_curso_visible_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_curso_visible_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `cursos` por curso_visible_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.curso_visible_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'sesion_cohortes',
    linea: 6712,
    claves: 'sesion_cohortes cursos curso_visible_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_curso_visible_id_fkey FOREIGN KEY (curso_visible_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_horario_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'sesion_cohortes',
    linea: 6720,
    claves: 'sesion_cohortes horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_sesion_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_sesion_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `sesiones` por sesion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.sesion_id → sesiones.id · ON DELETE CASCADE',
    tabla: 'sesion_cohortes',
    linea: 6728,
    claves: 'sesion_cohortes sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_sesion_id_fkey FOREIGN KEY (sesion_id) REFERENCES horarios.sesiones(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sesion_cohortes sesion_cohortes_sesion_id_horario_id_fkey',
    nombre: 'sesion_cohortes sesion_cohortes_sesion_id_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesion_cohortes` apunta a `sesiones` por sesion_id, horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sesion_cohortes.sesion_id, horario_id → sesiones.id, horario_id · ON DELETE CASCADE',
    tabla: 'sesion_cohortes',
    linea: 6736,
    claves: 'sesion_cohortes sesiones sesion_id, horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesion_cohortes
    ADD CONSTRAINT sesion_cohortes_sesion_id_horario_id_fkey FOREIGN KEY (sesion_id, horario_id) REFERENCES horarios.sesiones(id, horario_id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sesiones sesiones_agrupacion_area_comun_id_fkey',
    nombre: 'sesiones sesiones_agrupacion_area_comun_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `agrupaciones_area_comun` por agrupacion_area_comun_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'sesiones.agrupacion_area_comun_id → agrupaciones_area_comun.id · ON DELETE SET NULL',
    tabla: 'sesiones',
    linea: 6744,
    claves: 'sesiones agrupaciones_area_comun agrupacion_area_comun_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_agrupacion_area_comun_id_fkey FOREIGN KEY (agrupacion_area_comun_id) REFERENCES horarios.agrupaciones_area_comun(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-sesiones sesiones_aula_id_fkey',
    nombre: 'sesiones sesiones_aula_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `aulas` por aula_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones.aula_id → aulas.id · ON DELETE RESTRICT',
    tabla: 'sesiones',
    linea: 6752,
    claves: 'sesiones aulas aula_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_aula_id_fkey FOREIGN KEY (aula_id) REFERENCES horarios.aulas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesiones sesiones_curso_id_fkey',
    nombre: 'sesiones sesiones_curso_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'sesiones',
    linea: 6760,
    claves: 'sesiones cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesiones sesiones_docente_id_fkey',
    nombre: 'sesiones sesiones_docente_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `docentes` por docente_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones.docente_id → docentes.id · ON DELETE RESTRICT',
    tabla: 'sesiones',
    linea: 6768,
    claves: 'sesiones docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_docente_id_fkey FOREIGN KEY (docente_id) REFERENCES horarios.docentes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesiones sesiones_horario_id_fkey',
    nombre: 'sesiones sesiones_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sesiones.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'sesiones',
    linea: 6776,
    claves: 'sesiones horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sesiones sesiones_jornada_id_fkey',
    nombre: 'sesiones sesiones_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `sesiones` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'sesiones',
    linea: 6784,
    claves: 'sesiones jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-versiones_horario versiones_horario_creado_por_id_fkey',
    nombre: 'versiones_horario versiones_horario_creado_por_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `versiones_horario` apunta a `usuarios` por creado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'versiones_horario.creado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'versiones_horario',
    linea: 6920,
    claves: 'versiones_horario usuarios creado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.versiones_horario
    ADD CONSTRAINT versiones_horario_creado_por_id_fkey FOREIGN KEY (creado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-versiones_horario versiones_horario_horario_id_fkey',
    nombre: 'versiones_horario versiones_horario_horario_id_fkey',
    cat: 'fk',
    grupo: 'Horarios',
    desc: 'Cada fila de `versiones_horario` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'versiones_horario.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'versiones_horario',
    linea: 6928,
    claves: 'versiones_horario horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.versiones_horario
    ADD CONSTRAINT versiones_horario_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-importacion_errores importacion_errores_importacion_id_fkey',
    nombre: 'importacion_errores importacion_errores_importacion_id_fkey',
    cat: 'fk',
    grupo: 'Importación',
    desc: 'Cada fila de `importacion_errores` apunta a `importaciones` por importacion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'importacion_errores.importacion_id → importaciones.id · ON DELETE CASCADE',
    tabla: 'importacion_errores',
    linea: 6512,
    claves: 'importacion_errores importaciones importacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.importacion_errores
    ADD CONSTRAINT importacion_errores_importacion_id_fkey FOREIGN KEY (importacion_id) REFERENCES horarios.importaciones(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-importaciones importaciones_plantilla_id_fkey',
    nombre: 'importaciones importaciones_plantilla_id_fkey',
    cat: 'fk',
    grupo: 'Importación',
    desc: 'Cada fila de `importaciones` apunta a `plantillas_importacion` por plantilla_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'importaciones.plantilla_id → plantillas_importacion.id · ON DELETE RESTRICT',
    tabla: 'importaciones',
    linea: 6520,
    claves: 'importaciones plantillas_importacion plantilla_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.importaciones
    ADD CONSTRAINT importaciones_plantilla_id_fkey FOREIGN KEY (plantilla_id) REFERENCES horarios.plantillas_importacion(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-importaciones importaciones_solicitada_por_id_fkey',
    nombre: 'importaciones importaciones_solicitada_por_id_fkey',
    cat: 'fk',
    grupo: 'Importación',
    desc: 'Cada fila de `importaciones` apunta a `usuarios` por solicitada_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'importaciones.solicitada_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'importaciones',
    linea: 6528,
    claves: 'importaciones usuarios solicitada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.importaciones
    ADD CONSTRAINT importaciones_solicitada_por_id_fkey FOREIGN KEY (solicitada_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-rol_permisos rol_permisos_permiso_id_fkey',
    nombre: 'rol_permisos rol_permisos_permiso_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `rol_permisos` apunta a `permisos_acceso` por permiso_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'rol_permisos.permiso_id → permisos_acceso.id · ON DELETE CASCADE',
    tabla: 'rol_permisos',
    linea: 6680,
    claves: 'rol_permisos permisos_acceso permiso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.rol_permisos
    ADD CONSTRAINT rol_permisos_permiso_id_fkey FOREIGN KEY (permiso_id) REFERENCES horarios.permisos_acceso(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-rol_permisos rol_permisos_rol_id_fkey',
    nombre: 'rol_permisos rol_permisos_rol_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `rol_permisos` apunta a `roles` por rol_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'rol_permisos.rol_id → roles.id · ON DELETE CASCADE',
    tabla: 'rol_permisos',
    linea: 6688,
    claves: 'rol_permisos roles rol_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.rol_permisos
    ADD CONSTRAINT rol_permisos_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES horarios.roles(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-usuario_facultades usuario_facultades_facultad_id_fkey',
    nombre: 'usuario_facultades usuario_facultades_facultad_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuario_facultades` apunta a `facultades` por facultad_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'usuario_facultades.facultad_id → facultades.id · ON DELETE RESTRICT',
    tabla: 'usuario_facultades',
    linea: 6856,
    claves: 'usuario_facultades facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_facultades
    ADD CONSTRAINT usuario_facultades_facultad_id_fkey FOREIGN KEY (facultad_id) REFERENCES horarios.facultades(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-usuario_facultades usuario_facultades_usuario_id_fkey',
    nombre: 'usuario_facultades usuario_facultades_usuario_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuario_facultades` apunta a `usuarios` por usuario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'usuario_facultades.usuario_id → usuarios.id · ON DELETE CASCADE',
    tabla: 'usuario_facultades',
    linea: 6864,
    claves: 'usuario_facultades usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_facultades
    ADD CONSTRAINT usuario_facultades_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES horarios.usuarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-usuario_roles usuario_roles_rol_id_fkey',
    nombre: 'usuario_roles usuario_roles_rol_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuario_roles` apunta a `roles` por rol_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'usuario_roles.rol_id → roles.id · ON DELETE RESTRICT',
    tabla: 'usuario_roles',
    linea: 6872,
    claves: 'usuario_roles roles rol_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_roles
    ADD CONSTRAINT usuario_roles_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES horarios.roles(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-usuario_roles usuario_roles_usuario_id_fkey',
    nombre: 'usuario_roles usuario_roles_usuario_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuario_roles` apunta a `usuarios` por usuario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'usuario_roles.usuario_id → usuarios.id · ON DELETE CASCADE',
    tabla: 'usuario_roles',
    linea: 6880,
    claves: 'usuario_roles usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuario_roles
    ADD CONSTRAINT usuario_roles_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES horarios.usuarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-usuarios usuarios_auth_user_id_fkey',
    nombre: 'usuarios usuarios_auth_user_id_fkey',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuarios` apunta a `auth.users` por auth_user_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'usuarios.auth_user_id → auth.users.id · ON DELETE RESTRICT',
    tabla: 'usuarios',
    linea: 6888,
    claves: 'usuarios auth.users auth_user_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuarios
    ADD CONSTRAINT usuarios_auth_user_id_fkey FOREIGN KEY (auth_user_id) REFERENCES auth.users(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-usuarios usuarios_cohorte_fk',
    nombre: 'usuarios usuarios_cohorte_fk',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuarios` apunta a `cohortes` por cohorte_id: rechaza el borrado del padre si quedan filas apuntando.',
    detalle: '',
    nota: 'usuarios.cohorte_id → cohortes.id · ON DELETE NO ACTION',
    tabla: 'usuarios',
    linea: 6896,
    claves: 'usuarios cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuarios
    ADD CONSTRAINT usuarios_cohorte_fk FOREIGN KEY (cohorte_id) REFERENCES horarios.cohortes(id) DEFERRABLE INITIALLY DEFERRED;`,
  },
  {
    id: 'fk-usuarios usuarios_docente_fk',
    nombre: 'usuarios usuarios_docente_fk',
    cat: 'fk',
    grupo: 'Seguridad',
    desc: 'Cada fila de `usuarios` apunta a `docentes` por docente_id: rechaza el borrado del padre si quedan filas apuntando.',
    detalle: '',
    nota: 'usuarios.docente_id → docentes.id · ON DELETE NO ACTION',
    tabla: 'usuarios',
    linea: 6904,
    claves: 'usuarios docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.usuarios
    ADD CONSTRAINT usuarios_docente_fk FOREIGN KEY (docente_id) REFERENCES horarios.docentes(id) DEFERRABLE INITIALLY DEFERRED;`,
  },
  {
    id: 'fk-auditoria auditoria_usuario_id_fkey',
    nombre: 'auditoria auditoria_usuario_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `auditoria` apunta a `usuarios` por usuario_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'auditoria.usuario_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'auditoria',
    linea: 6144,
    claves: 'auditoria usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.auditoria
    ADD CONSTRAINT auditoria_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-notificaciones notificaciones_destinatario_id_fkey',
    nombre: 'notificaciones notificaciones_destinatario_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `notificaciones` apunta a `usuarios` por destinatario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'notificaciones.destinatario_id → usuarios.id · ON DELETE CASCADE',
    tabla: 'notificaciones',
    linea: 6552,
    claves: 'notificaciones usuarios destinatario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.notificaciones
    ADD CONSTRAINT notificaciones_destinatario_id_fkey FOREIGN KEY (destinatario_id) REFERENCES horarios.usuarios(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-notificaciones notificaciones_plantilla_id_fkey',
    nombre: 'notificaciones notificaciones_plantilla_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `notificaciones` apunta a `plantillas_notificacion` por plantilla_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'notificaciones.plantilla_id → plantillas_notificacion.id · ON DELETE SET NULL',
    tabla: 'notificaciones',
    linea: 6560,
    claves: 'notificaciones plantillas_notificacion plantilla_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.notificaciones
    ADD CONSTRAINT notificaciones_plantilla_id_fkey FOREIGN KEY (plantilla_id) REFERENCES horarios.plantillas_notificacion(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-reportes reportes_generado_por_id_fkey',
    nombre: 'reportes reportes_generado_por_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `reportes` apunta a `usuarios` por generado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'reportes.generado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'reportes',
    linea: 6616,
    claves: 'reportes usuarios generado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.reportes
    ADD CONSTRAINT reportes_generado_por_id_fkey FOREIGN KEY (generado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-reportes reportes_horario_id_fkey',
    nombre: 'reportes reportes_horario_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `reportes` apunta a `horarios` por horario_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'reportes.horario_id → horarios.id · ON DELETE SET NULL',
    tabla: 'reportes',
    linea: 6624,
    claves: 'reportes horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.reportes
    ADD CONSTRAINT reportes_horario_id_fkey FOREIGN KEY (horario_id) REFERENCES horarios.horarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-asignaciones_docente_curso asignaciones_docente_curso_carrera_id_fkey',
    nombre: 'asignaciones_docente_curso asignaciones_docente_curso_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `asignaciones_docente_curso` apunta a `carreras` por carrera_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'asignaciones_docente_curso.carrera_id → carreras.id · ON DELETE RESTRICT',
    tabla: 'asignaciones_docente_curso',
    linea: 6104,
    claves: 'asignaciones_docente_curso carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_carrera_id_fkey FOREIGN KEY (carrera_id) REFERENCES horarios.carreras(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-asignaciones_docente_curso asignaciones_docente_curso_curso_id_fkey',
    nombre: 'asignaciones_docente_curso asignaciones_docente_curso_curso_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `asignaciones_docente_curso` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'asignaciones_docente_curso.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'asignaciones_docente_curso',
    linea: 6112,
    claves: 'asignaciones_docente_curso cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_curso_id_fkey FOREIGN KEY (curso_id) REFERENCES horarios.cursos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-asignaciones_docente_curso asignaciones_docente_curso_docente_id_fkey',
    nombre: 'asignaciones_docente_curso asignaciones_docente_curso_docente_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `asignaciones_docente_curso` apunta a `docentes` por docente_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'asignaciones_docente_curso.docente_id → docentes.id · ON DELETE RESTRICT',
    tabla: 'asignaciones_docente_curso',
    linea: 6120,
    claves: 'asignaciones_docente_curso docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_docente_id_fkey FOREIGN KEY (docente_id) REFERENCES horarios.docentes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-asignaciones_docente_curso asignaciones_docente_curso_facultad_id_fkey',
    nombre: 'asignaciones_docente_curso asignaciones_docente_curso_facultad_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `asignaciones_docente_curso` apunta a `facultades` por facultad_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'asignaciones_docente_curso.facultad_id → facultades.id · ON DELETE RESTRICT',
    tabla: 'asignaciones_docente_curso',
    linea: 6128,
    claves: 'asignaciones_docente_curso facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_facultad_id_fkey FOREIGN KEY (facultad_id) REFERENCES horarios.facultades(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-asignaciones_docente_curso asignaciones_docente_curso_jornada_id_fkey',
    nombre: 'asignaciones_docente_curso asignaciones_docente_curso_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `asignaciones_docente_curso` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'asignaciones_docente_curso.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'asignaciones_docente_curso',
    linea: 6136,
    claves: 'asignaciones_docente_curso jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.asignaciones_docente_curso
    ADD CONSTRAINT asignaciones_docente_curso_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-disponibilidad_docente_slots disponibilidad_docente_slots_disponibilidad_id_fkey',
    nombre: 'disponibilidad_docente_slots disponibilidad_docente_slots_disponibilidad_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `disponibilidad_docente_slots` apunta a `disponibilidades_docente` por disponibilidad_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'disponibilidad_docente_slots.disponibilidad_id → disponibilidades_docente.id · ON DELETE CASCADE',
    tabla: 'disponibilidad_docente_slots',
    linea: 6352,
    claves: 'disponibilidad_docente_slots disponibilidades_docente disponibilidad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidad_docente_slots
    ADD CONSTRAINT disponibilidad_docente_slots_disponibilidad_id_fkey FOREIGN KEY (disponibilidad_id) REFERENCES horarios.disponibilidades_docente(id) ON DELETE CASCADE;`,
  },
  {
    id: 'fk-disponibilidad_docente_slots disponibilidad_docente_slots_jornada_id_fkey',
    nombre: 'disponibilidad_docente_slots disponibilidad_docente_slots_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `disponibilidad_docente_slots` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'disponibilidad_docente_slots.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'disponibilidad_docente_slots',
    linea: 6360,
    claves: 'disponibilidad_docente_slots jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidad_docente_slots
    ADD CONSTRAINT disponibilidad_docente_slots_jornada_id_fkey FOREIGN KEY (jornada_id) REFERENCES horarios.jornadas(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-disponibilidades_docente disponibilidades_docente_docente_id_fkey',
    nombre: 'disponibilidades_docente disponibilidades_docente_docente_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `disponibilidades_docente` apunta a `docentes` por docente_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'disponibilidades_docente.docente_id → docentes.id · ON DELETE RESTRICT',
    tabla: 'disponibilidades_docente',
    linea: 6368,
    claves: 'disponibilidades_docente docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidades_docente
    ADD CONSTRAINT disponibilidades_docente_docente_id_fkey FOREIGN KEY (docente_id) REFERENCES horarios.docentes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-disponibilidades_docente disponibilidades_docente_periodo_id_fkey',
    nombre: 'disponibilidades_docente disponibilidades_docente_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `disponibilidades_docente` apunta a `periodos_academicos` por periodo_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'disponibilidades_docente.periodo_id → periodos_academicos.id · ON DELETE RESTRICT',
    tabla: 'disponibilidades_docente',
    linea: 6376,
    claves: 'disponibilidades_docente periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.disponibilidades_docente
    ADD CONSTRAINT disponibilidades_docente_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES horarios.periodos_academicos(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-docentes docentes_facultad_id_fkey',
    nombre: 'docentes docentes_facultad_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `docentes` apunta a `facultades` por facultad_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'docentes.facultad_id → facultades.id · ON DELETE RESTRICT',
    tabla: 'docentes',
    linea: 6384,
    claves: 'docentes facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.docentes
    ADD CONSTRAINT docentes_facultad_id_fkey FOREIGN KEY (facultad_id) REFERENCES horarios.facultades(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-eventos_sustitucion eventos_sustitucion_docente_entrante_id_fkey',
    nombre: 'eventos_sustitucion eventos_sustitucion_docente_entrante_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `eventos_sustitucion` apunta a `docentes` por docente_entrante_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'eventos_sustitucion.docente_entrante_id → docentes.id · ON DELETE RESTRICT',
    tabla: 'eventos_sustitucion',
    linea: 6392,
    claves: 'eventos_sustitucion docentes docente_entrante_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.eventos_sustitucion
    ADD CONSTRAINT eventos_sustitucion_docente_entrante_id_fkey FOREIGN KEY (docente_entrante_id) REFERENCES horarios.docentes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-eventos_sustitucion eventos_sustitucion_docente_original_id_fkey',
    nombre: 'eventos_sustitucion eventos_sustitucion_docente_original_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `eventos_sustitucion` apunta a `docentes` por docente_original_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'eventos_sustitucion.docente_original_id → docentes.id · ON DELETE RESTRICT',
    tabla: 'eventos_sustitucion',
    linea: 6400,
    claves: 'eventos_sustitucion docentes docente_original_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.eventos_sustitucion
    ADD CONSTRAINT eventos_sustitucion_docente_original_id_fkey FOREIGN KEY (docente_original_id) REFERENCES horarios.docentes(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-eventos_sustitucion eventos_sustitucion_registrado_por_id_fkey',
    nombre: 'eventos_sustitucion eventos_sustitucion_registrado_por_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `eventos_sustitucion` apunta a `usuarios` por registrado_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'eventos_sustitucion.registrado_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'eventos_sustitucion',
    linea: 6408,
    claves: 'eventos_sustitucion usuarios registrado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.eventos_sustitucion
    ADD CONSTRAINT eventos_sustitucion_registrado_por_id_fkey FOREIGN KEY (registrado_por_id) REFERENCES horarios.usuarios(id) ON DELETE SET NULL;`,
  },
  {
    id: 'fk-eventos_sustitucion eventos_sustitucion_sesion_afectada_id_fkey',
    nombre: 'eventos_sustitucion eventos_sustitucion_sesion_afectada_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `eventos_sustitucion` apunta a `sesiones` por sesion_afectada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'eventos_sustitucion.sesion_afectada_id → sesiones.id · ON DELETE RESTRICT',
    tabla: 'eventos_sustitucion',
    linea: 6416,
    claves: 'eventos_sustitucion sesiones sesion_afectada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.eventos_sustitucion
    ADD CONSTRAINT eventos_sustitucion_sesion_afectada_id_fkey FOREIGN KEY (sesion_afectada_id) REFERENCES horarios.sesiones(id) ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-ventanas_disponibilidad ventanas_disponibilidad_periodo_id_fkey',
    nombre: 'ventanas_disponibilidad ventanas_disponibilidad_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `ventanas_disponibilidad` apunta a `periodos_academicos` por periodo_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'ventanas_disponibilidad.periodo_id → periodos_academicos.id · ON DELETE CASCADE',
    tabla: 'ventanas_disponibilidad',
    linea: 6912,
    claves: 'ventanas_disponibilidad periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY horarios.ventanas_disponibilidad
    ADD CONSTRAINT ventanas_disponibilidad_periodo_id_fkey FOREIGN KEY (periodo_id) REFERENCES horarios.periodos_academicos(id) ON DELETE CASCADE;`,
  },
  {
    id: 'idx-agrupaciones_area_comun_nombre_uq',
    nombre: 'agrupaciones_area_comun_nombre_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `agrupaciones_area_comun` con el mismo valor de (periodo_id, lower((nombre)::text)). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'agrupaciones_area_comun',
    linea: 5397,
    claves: 'periodo_id, lower((nombre)::text) agrupaciones_area_comun',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX agrupaciones_area_comun_nombre_uq ON horarios.agrupaciones_area_comun USING btree (periodo_id, lower((nombre)::text)) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-asignaciones_docente_curso_vigente_uq',
    nombre: 'asignaciones_docente_curso_vigente_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No se duplica la autorización vigente de un docente sobre el mismo curso y alcance.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'asignaciones_docente_curso',
    linea: 5404,
    claves: 'docente_id, curso_id, COALESCE(carrera_id, \'00000000-0000-0000-0000-000000000000\'::uuid), COALESCE(facultad_id, \'00000000-0000-0000-0000-000000000000\'::uuid), COALESCE(jornada_id, \'00000000-0000-0000-0000-000000000000\'::uuid) asignaciones_docente_curso',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX asignaciones_docente_curso_vigente_uq ON horarios.asignaciones_docente_curso USING btree (docente_id, curso_id, COALESCE(carrera_id, '00000000-0000-0000-0000-000000000000'::uuid), COALESCE(facultad_id, '00000000-0000-0000-0000-000000000000'::uuid), COALESCE(jornada_id, '00000000-0000-0000-0000-000000000000'::uuid)) WHERE (esta_vigente AND (eliminado_en IS NULL));`,
  },
  {
    id: 'idx-aulas_codigo_uq',
    nombre: 'aulas_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `aulas` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'aulas',
    linea: 5425,
    claves: 'codigo aulas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX aulas_codigo_uq ON horarios.aulas USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-aulas_piso_numero_uq',
    nombre: 'aulas_piso_numero_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No hay dos aulas vivas con el mismo piso y número.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'aulas',
    linea: 5432,
    claves: 'piso, numero_aula aulas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX aulas_piso_numero_uq ON horarios.aulas USING btree (piso, numero_aula) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-carreras_codigo_uq',
    nombre: 'carreras_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `carreras` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'carreras',
    linea: 5439,
    claves: 'codigo carreras',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX carreras_codigo_uq ON horarios.carreras USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-cohorte_periodos_periodo_cohorte_uq',
    nombre: 'cohorte_periodos_periodo_cohorte_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Una cohorte aparece una sola vez por período.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'cohorte_periodos',
    linea: 5467,
    claves: 'periodo_id, cohorte_id cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX cohorte_periodos_periodo_cohorte_uq ON horarios.cohorte_periodos USING btree (periodo_id, cohorte_id) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-cohortes_identidad_uq',
    nombre: 'cohortes_identidad_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'La identidad de una cohorte —carrera, pensum, jornada, año y sección— no se repite entre cohortes vivas.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'cohortes',
    linea: 5474,
    claves: 'carrera_id, jornada_id, anio_ingreso, lower((seccion)::text) cohortes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX cohortes_identidad_uq ON horarios.cohortes USING btree (carrera_id, jornada_id, anio_ingreso, lower((seccion)::text)) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-cursos_codigo_uq',
    nombre: 'cursos_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `cursos` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'cursos',
    linea: 5488,
    claves: 'codigo cursos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX cursos_codigo_uq ON horarios.cursos USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-docentes_codigo_uq',
    nombre: 'docentes_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `docentes` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'docentes',
    linea: 5509,
    claves: 'codigo docentes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX docentes_codigo_uq ON horarios.docentes USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-docentes_correo_uq',
    nombre: 'docentes_correo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `docentes` con el mismo valor de (correo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'docentes',
    linea: 5516,
    claves: 'correo docentes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX docentes_correo_uq ON horarios.docentes USING btree (correo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-facultades_codigo_uq',
    nombre: 'facultades_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `facultades` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'facultades',
    linea: 5523,
    claves: 'codigo facultades',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX facultades_codigo_uq ON horarios.facultades USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-horarios_periodo_tipo_version_uq',
    nombre: 'horarios_periodo_tipo_version_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'El número de versión de un horario no se repite dentro del mismo período y tipo de plan.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'horarios',
    linea: 5579,
    claves: 'periodo_id, tipo_plan, numero_version horarios',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX horarios_periodo_tipo_version_uq ON horarios.horarios USING btree (periodo_id, tipo_plan, numero_version) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-horarios_publicado_unico_idx',
    nombre: 'horarios_publicado_unico_idx',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Solo puede haber un horario publicado a la vez por período y tipo de plan. Es la regla de «un único documento oficial vigente».',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'horarios',
    linea: 5586,
    claves: 'periodo_id, tipo_plan horarios',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX horarios_publicado_unico_idx ON horarios.horarios USING btree (periodo_id, tipo_plan) WHERE ((estado = 'publicado'::horarios.estado_horario) AND (eliminado_en IS NULL));`,
  },
  {
    id: 'idx-importaciones_clave_solicitud_uq',
    nombre: 'importaciones_clave_solicitud_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Idempotencia: reintentar la misma importación no la duplica.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'importaciones',
    linea: 5593,
    claves: 'clave_solicitud importaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX importaciones_clave_solicitud_uq ON horarios.importaciones USING btree (clave_solicitud) WHERE (clave_solicitud IS NOT NULL);`,
  },
  {
    id: 'idx-jornadas_nombre_uq',
    nombre: 'jornadas_nombre_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `jornadas` con el mismo valor de (lower((nombre)::text)). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'jornadas',
    linea: 5600,
    claves: 'lower((nombre)::text) jornadas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX jornadas_nombre_uq ON horarios.jornadas USING btree (lower((nombre)::text)) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-notificaciones_clave_solicitud_uq',
    nombre: 'notificaciones_clave_solicitud_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Idempotencia: el mismo aviso no se manda dos veces.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'notificaciones',
    linea: 5614,
    claves: 'destinatario_id, clave_solicitud notificaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX notificaciones_clave_solicitud_uq ON horarios.notificaciones USING btree (destinatario_id, clave_solicitud) WHERE (clave_solicitud IS NOT NULL);`,
  },
  {
    id: 'idx-pensums_carrera_anio_uq',
    nombre: 'pensums_carrera_anio_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `pensums` con el mismo valor de (carrera_id, anio_creacion). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'pensums',
    linea: 5628,
    claves: 'carrera_id, anio_creacion pensums',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX pensums_carrera_anio_uq ON horarios.pensums USING btree (carrera_id, anio_creacion) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-periodos_nombre_uq',
    nombre: 'periodos_nombre_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `periodos_academicos` con el mismo valor de (lower((nombre)::text)). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'periodos_academicos',
    linea: 5635,
    claves: 'lower((nombre)::text) periodos_academicos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX periodos_nombre_uq ON horarios.periodos_academicos USING btree (lower((nombre)::text)) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-plantillas_notificacion_codigo_uq',
    nombre: 'plantillas_notificacion_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `plantillas_notificacion` con el mismo valor de (codigo_plantilla).',
    detalle: '',
    nota: 'único',
    tabla: 'plantillas_notificacion',
    linea: 5663,
    claves: 'codigo_plantilla plantillas_notificacion',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX plantillas_notificacion_codigo_uq ON horarios.plantillas_notificacion USING btree (codigo_plantilla);`,
  },
  {
    id: 'idx-recursos_codigo_uq',
    nombre: 'recursos_codigo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `recursos` con el mismo valor de (codigo). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'recursos',
    linea: 5670,
    claves: 'codigo recursos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX recursos_codigo_uq ON horarios.recursos USING btree (codigo) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-resultados_edicion_clave_solicitud_uq',
    nombre: 'resultados_edicion_clave_solicitud_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Idempotencia: mover la misma sesión dos veces por un doble clic no genera dos resultados.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'resultados_edicion',
    linea: 5684,
    claves: 'horario_id, clave_solicitud resultados_edicion',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX resultados_edicion_clave_solicitud_uq ON horarios.resultados_edicion USING btree (horario_id, clave_solicitud) WHERE (clave_solicitud IS NOT NULL);`,
  },
  {
    id: 'idx-roles_nombre_uq',
    nombre: 'roles_nombre_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `roles` con el mismo valor de (lower((nombre)::text)). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'roles',
    linea: 5698,
    claves: 'lower((nombre)::text) roles',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX roles_nombre_uq ON horarios.roles USING btree (lower((nombre)::text)) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-usuarios_correo_institucional_uq',
    nombre: 'usuarios_correo_institucional_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `usuarios` con el mismo valor de (correo_institucional). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'usuarios',
    linea: 5747,
    claves: 'correo_institucional usuarios',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX usuarios_correo_institucional_uq ON horarios.usuarios USING btree (correo_institucional) WHERE (eliminado_en IS NULL);`,
  },
  {
    id: 'idx-auditoria_entidad_idx',
    nombre: 'auditoria_entidad_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `auditoria` (entidad, entidad_id, fecha DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'auditoria',
    linea: 5411,
    claves: 'entidad, entidad_id, fecha DESC auditoria',
    params: [],
    pasos: [],
    sql: `CREATE INDEX auditoria_entidad_idx ON horarios.auditoria USING btree (entidad, entidad_id, fecha DESC);`,
  },
  {
    id: 'idx-auditoria_usuario_idx',
    nombre: 'auditoria_usuario_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `auditoria` (usuario_id, fecha DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'auditoria',
    linea: 5418,
    claves: 'usuario_id, fecha DESC auditoria',
    params: [],
    pasos: [],
    sql: `CREATE INDEX auditoria_usuario_idx ON horarios.auditoria USING btree (usuario_id, fecha DESC);`,
  },
  {
    id: 'idx-carreras_facultad_idx',
    nombre: 'carreras_facultad_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `carreras` (facultad_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'carreras',
    linea: 5446,
    claves: 'facultad_id carreras',
    params: [],
    pasos: [],
    sql: `CREATE INDEX carreras_facultad_idx ON horarios.carreras USING btree (facultad_id);`,
  },
  {
    id: 'idx-cohorte_periodos_cohorte_idx',
    nombre: 'cohorte_periodos_cohorte_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `cohorte_periodos` (cohorte_id, periodo_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'cohorte_periodos',
    linea: 5453,
    claves: 'cohorte_id, periodo_id cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX cohorte_periodos_cohorte_idx ON horarios.cohorte_periodos USING btree (cohorte_id, periodo_id);`,
  },
  {
    id: 'idx-cohorte_periodos_periodo_activo_idx',
    nombre: 'cohorte_periodos_periodo_activo_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `cohorte_periodos` (periodo_id, semestre_asignado): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda · parcial',
    tabla: 'cohorte_periodos',
    linea: 5460,
    claves: 'periodo_id, semestre_asignado cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX cohorte_periodos_periodo_activo_idx ON horarios.cohorte_periodos USING btree (periodo_id, semestre_asignado) WHERE (esta_activa AND (eliminado_en IS NULL));`,
  },
  {
    id: 'idx-cursos_en_pensum_curso_idx',
    nombre: 'cursos_en_pensum_curso_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `cursos_en_pensum` (curso_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'cursos_en_pensum',
    linea: 5495,
    claves: 'curso_id cursos_en_pensum',
    params: [],
    pasos: [],
    sql: `CREATE INDEX cursos_en_pensum_curso_idx ON horarios.cursos_en_pensum USING btree (curso_id);`,
  },
  {
    id: 'idx-disponibilidad_docente_slots_busqueda_idx',
    nombre: 'disponibilidad_docente_slots_busqueda_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `disponibilidad_docente_slots` (jornada_id, dia, indice_slot, esta_disponible): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'disponibilidad_docente_slots',
    linea: 5502,
    claves: 'jornada_id, dia, indice_slot, esta_disponible disponibilidad_docente_slots',
    params: [],
    pasos: [],
    sql: `CREATE INDEX disponibilidad_docente_slots_busqueda_idx ON horarios.disponibilidad_docente_slots USING btree (jornada_id, dia, indice_slot, esta_disponible);`,
  },
  {
    id: 'idx-historial_estados_horario_idx',
    nombre: 'historial_estados_horario_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `historial_estados_horario` (horario_id, cambiado_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'historial_estados_horario',
    linea: 5572,
    claves: 'horario_id, cambiado_en DESC historial_estados_horario',
    params: [],
    pasos: [],
    sql: `CREATE INDEX historial_estados_horario_idx ON horarios.historial_estados_horario USING btree (horario_id, cambiado_en DESC);`,
  },
  {
    id: 'idx-notificaciones_destinatario_estado_idx',
    nombre: 'notificaciones_destinatario_estado_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `notificaciones` (destinatario_id, estado, fecha_creacion DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'notificaciones',
    linea: 5621,
    claves: 'destinatario_id, estado, fecha_creacion DESC notificaciones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX notificaciones_destinatario_estado_idx ON horarios.notificaciones USING btree (destinatario_id, estado, fecha_creacion DESC);`,
  },
  {
    id: 'idx-plantillas_importacion_vigente_uq',
    nombre: 'plantillas_importacion_vigente_uq',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Solo una plantilla vigente por código de importación.',
    detalle: '',
    nota: 'búsqueda',
    tabla: '',
    linea: 5656,
    claves: ' ',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX plantillas_importacion_vigente_uq ON horarios.plantillas_importacion USING btree (codigo) WHERE esta_vigente;`,
  },
  {
    id: 'idx-reportes_horario_idx',
    nombre: 'reportes_horario_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `reportes` (horario_id, fecha_generacion DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'reportes',
    linea: 5677,
    claves: 'horario_id, fecha_generacion DESC reportes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX reportes_horario_idx ON horarios.reportes USING btree (horario_id, fecha_generacion DESC);`,
  },
  {
    id: 'idx-resultados_edicion_origen_idx',
    nombre: 'resultados_edicion_origen_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `resultados_edicion` (horario_origen_id, creado_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'resultados_edicion',
    linea: 5691,
    claves: 'horario_origen_id, creado_en DESC resultados_edicion',
    params: [],
    pasos: [],
    sql: `CREATE INDEX resultados_edicion_origen_idx ON horarios.resultados_edicion USING btree (horario_origen_id, creado_en DESC);`,
  },
  {
    id: 'idx-sesion_cohortes_cohorte_idx',
    nombre: 'sesion_cohortes_cohorte_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sesion_cohortes` (cohorte_id, horario_id, fecha_sesion, dia, minuto_inicio_dia): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'sesion_cohortes',
    linea: 5705,
    claves: 'cohorte_id, horario_id, fecha_sesion, dia, minuto_inicio_dia sesion_cohortes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX sesion_cohortes_cohorte_idx ON horarios.sesion_cohortes USING btree (cohorte_id, horario_id, fecha_sesion, dia, minuto_inicio_dia);`,
  },
  {
    id: 'idx-sesion_cohortes_curso_visible_idx',
    nombre: 'sesion_cohortes_curso_visible_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sesion_cohortes` (curso_visible_id, horario_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'sesion_cohortes',
    linea: 5712,
    claves: 'curso_visible_id, horario_id sesion_cohortes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX sesion_cohortes_curso_visible_idx ON horarios.sesion_cohortes USING btree (curso_visible_id, horario_id);`,
  },
  {
    id: 'idx-sesiones_horario_aula_idx',
    nombre: 'sesiones_horario_aula_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sesiones` (horario_id, aula_id, fecha_sesion, dia, minuto_inicio_dia): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'sesiones',
    linea: 5719,
    claves: 'horario_id, aula_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX sesiones_horario_aula_idx ON horarios.sesiones USING btree (horario_id, aula_id, fecha_sesion, dia, minuto_inicio_dia);`,
  },
  {
    id: 'idx-sesiones_horario_docente_idx',
    nombre: 'sesiones_horario_docente_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sesiones` (horario_id, docente_id, fecha_sesion, dia, minuto_inicio_dia): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'sesiones',
    linea: 5726,
    claves: 'horario_id, docente_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX sesiones_horario_docente_idx ON horarios.sesiones USING btree (horario_id, docente_id, fecha_sesion, dia, minuto_inicio_dia);`,
  },
  {
    id: 'idx-sesiones_horario_jornada_idx',
    nombre: 'sesiones_horario_jornada_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sesiones` (horario_id, jornada_id, fecha_sesion, dia, minuto_inicio_dia): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'sesiones',
    linea: 5733,
    claves: 'horario_id, jornada_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX sesiones_horario_jornada_idx ON horarios.sesiones USING btree (horario_id, jornada_id, fecha_sesion, dia, minuto_inicio_dia);`,
  },
  {
    id: 'rls-agrupacion_area_comun_cohortes',
    nombre: 'RLS activado en agrupacion_area_comun_cohortes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `agrupacion_area_comun_cohortes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 6936,
    claves: 'agrupacion_area_comun_cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.agrupacion_area_comun_cohortes ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-agrupacion_area_comun_cursos',
    nombre: 'RLS activado en agrupacion_area_comun_cursos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `agrupacion_area_comun_cursos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 6942,
    claves: 'agrupacion_area_comun_cursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.agrupacion_area_comun_cursos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-agrupaciones_area_comun',
    nombre: 'RLS activado en agrupaciones_area_comun',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `agrupaciones_area_comun`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'agrupaciones_area_comun',
    linea: 6948,
    claves: 'agrupaciones_area_comun rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.agrupaciones_area_comun ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-asignaciones_docente_curso',
    nombre: 'RLS activado en asignaciones_docente_curso',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `asignaciones_docente_curso`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'asignaciones_docente_curso',
    linea: 8650,
    claves: 'asignaciones_docente_curso rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.asignaciones_docente_curso ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-auditoria',
    nombre: 'RLS activado en auditoria',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `auditoria`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'auditoria',
    linea: 8656,
    claves: 'auditoria rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.auditoria ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-aula_recursos',
    nombre: 'RLS activado en aula_recursos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `aula_recursos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'aula_recursos',
    linea: 8662,
    claves: 'aula_recursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.aula_recursos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-aulas',
    nombre: 'RLS activado en aulas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `aulas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'aulas',
    linea: 8668,
    claves: 'aulas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.aulas ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-cambios_detectados',
    nombre: 'RLS activado en cambios_detectados',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `cambios_detectados`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'cambios_detectados',
    linea: 8674,
    claves: 'cambios_detectados rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.cambios_detectados ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-carrera_jornadas',
    nombre: 'RLS activado en carrera_jornadas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `carrera_jornadas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'carrera_jornadas',
    linea: 8680,
    claves: 'carrera_jornadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.carrera_jornadas ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-carreras',
    nombre: 'RLS activado en carreras',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `carreras`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'carreras',
    linea: 8686,
    claves: 'carreras rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.carreras ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-cohorte_periodos',
    nombre: 'RLS activado en cohorte_periodos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `cohorte_periodos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'cohorte_periodos',
    linea: 8692,
    claves: 'cohorte_periodos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.cohorte_periodos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-cohortes',
    nombre: 'RLS activado en cohortes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `cohortes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'cohortes',
    linea: 8698,
    claves: 'cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.cohortes ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-conflicto_sesiones',
    nombre: 'RLS activado en conflicto_sesiones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `conflicto_sesiones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'conflicto_sesiones',
    linea: 8716,
    claves: 'conflicto_sesiones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.conflicto_sesiones ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-conflictos',
    nombre: 'RLS activado en conflictos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `conflictos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'conflictos',
    linea: 8722,
    claves: 'conflictos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.conflictos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-curso_carreras_compartidas',
    nombre: 'RLS activado en curso_carreras_compartidas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `curso_carreras_compartidas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'curso_carreras_compartidas',
    linea: 8728,
    claves: 'curso_carreras_compartidas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.curso_carreras_compartidas ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-curso_recursos_requeridos',
    nombre: 'RLS activado en curso_recursos_requeridos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `curso_recursos_requeridos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'curso_recursos_requeridos',
    linea: 8734,
    claves: 'curso_recursos_requeridos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.curso_recursos_requeridos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-cursos',
    nombre: 'RLS activado en cursos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `cursos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'cursos',
    linea: 8740,
    claves: 'cursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.cursos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-cursos_en_pensum',
    nombre: 'RLS activado en cursos_en_pensum',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `cursos_en_pensum`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'cursos_en_pensum',
    linea: 8746,
    claves: 'cursos_en_pensum rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.cursos_en_pensum ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-disponibilidad_docente_slots',
    nombre: 'RLS activado en disponibilidad_docente_slots',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `disponibilidad_docente_slots`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'disponibilidad_docente_slots',
    linea: 8752,
    claves: 'disponibilidad_docente_slots rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.disponibilidad_docente_slots ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-disponibilidades_docente',
    nombre: 'RLS activado en disponibilidades_docente',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `disponibilidades_docente`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'disponibilidades_docente',
    linea: 8758,
    claves: 'disponibilidades_docente rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.disponibilidades_docente ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-docentes',
    nombre: 'RLS activado en docentes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `docentes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'docentes',
    linea: 8764,
    claves: 'docentes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.docentes ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-eventos_sustitucion',
    nombre: 'RLS activado en eventos_sustitucion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `eventos_sustitucion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'eventos_sustitucion',
    linea: 8770,
    claves: 'eventos_sustitucion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.eventos_sustitucion ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-facultades',
    nombre: 'RLS activado en facultades',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `facultades`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'facultades',
    linea: 8776,
    claves: 'facultades rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.facultades ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-historial_estados_horario',
    nombre: 'RLS activado en historial_estados_horario',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `historial_estados_horario`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'historial_estados_horario',
    linea: 8788,
    claves: 'historial_estados_horario rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.historial_estados_horario ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-horarios',
    nombre: 'RLS activado en horarios',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `horarios`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'horarios',
    linea: 8794,
    claves: 'horarios rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.horarios ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-importacion_errores',
    nombre: 'RLS activado en importacion_errores',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `importacion_errores`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'importacion_errores',
    linea: 8800,
    claves: 'importacion_errores rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.importacion_errores ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-importaciones',
    nombre: 'RLS activado en importaciones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `importaciones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'importaciones',
    linea: 8806,
    claves: 'importaciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.importaciones ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-jornada_descansos',
    nombre: 'RLS activado en jornada_descansos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `jornada_descansos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'jornada_descansos',
    linea: 8812,
    claves: 'jornada_descansos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.jornada_descansos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-jornadas',
    nombre: 'RLS activado en jornadas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `jornadas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'jornadas',
    linea: 8818,
    claves: 'jornadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.jornadas ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-notificaciones',
    nombre: 'RLS activado en notificaciones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `notificaciones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'notificaciones',
    linea: 8830,
    claves: 'notificaciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.notificaciones ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-pensums',
    nombre: 'RLS activado en pensums',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `pensums`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'pensums',
    linea: 8836,
    claves: 'pensums rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.pensums ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-periodos_academicos',
    nombre: 'RLS activado en periodos_academicos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `periodos_academicos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'periodos_academicos',
    linea: 8842,
    claves: 'periodos_academicos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.periodos_academicos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-permisos_acceso',
    nombre: 'RLS activado en permisos_acceso',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `permisos_acceso`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'permisos_acceso',
    linea: 8848,
    claves: 'permisos_acceso rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.permisos_acceso ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-plantillas_importacion',
    nombre: 'RLS activado en plantillas_importacion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `plantillas_importacion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'plantillas_importacion',
    linea: 8866,
    claves: 'plantillas_importacion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.plantillas_importacion ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-plantillas_notificacion',
    nombre: 'RLS activado en plantillas_notificacion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `plantillas_notificacion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'plantillas_notificacion',
    linea: 8872,
    claves: 'plantillas_notificacion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.plantillas_notificacion ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-recursos',
    nombre: 'RLS activado en recursos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `recursos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'recursos',
    linea: 8878,
    claves: 'recursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.recursos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-reportes',
    nombre: 'RLS activado en reportes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `reportes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'reportes',
    linea: 8884,
    claves: 'reportes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.reportes ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-resultado_edicion_conflictos',
    nombre: 'RLS activado en resultado_edicion_conflictos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `resultado_edicion_conflictos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'resultado_edicion_conflictos',
    linea: 8896,
    claves: 'resultado_edicion_conflictos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.resultado_edicion_conflictos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-resultados_edicion',
    nombre: 'RLS activado en resultados_edicion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `resultados_edicion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'resultados_edicion',
    linea: 8902,
    claves: 'resultados_edicion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.resultados_edicion ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-rol_permisos',
    nombre: 'RLS activado en rol_permisos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `rol_permisos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'rol_permisos',
    linea: 8908,
    claves: 'rol_permisos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.rol_permisos ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-roles',
    nombre: 'RLS activado en roles',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `roles`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'roles',
    linea: 8914,
    claves: 'roles rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.roles ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-sesion_cohortes',
    nombre: 'RLS activado en sesion_cohortes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `sesion_cohortes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'sesion_cohortes',
    linea: 8920,
    claves: 'sesion_cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.sesion_cohortes ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-sesiones',
    nombre: 'RLS activado en sesiones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `sesiones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'sesiones',
    linea: 8926,
    claves: 'sesiones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.sesiones ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-usuario_facultades',
    nombre: 'RLS activado en usuario_facultades',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `usuario_facultades`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'usuario_facultades',
    linea: 8944,
    claves: 'usuario_facultades rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.usuario_facultades ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-usuario_roles',
    nombre: 'RLS activado en usuario_roles',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `usuario_roles`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'usuario_roles',
    linea: 8950,
    claves: 'usuario_roles rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.usuario_roles ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-usuarios',
    nombre: 'RLS activado en usuarios',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `usuarios`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'usuarios',
    linea: 8956,
    claves: 'usuarios rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.usuarios ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-ventanas_disponibilidad',
    nombre: 'RLS activado en ventanas_disponibilidad',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `ventanas_disponibilidad`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'ventanas_disponibilidad',
    linea: 8962,
    claves: 'ventanas_disponibilidad rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.ventanas_disponibilidad ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-versiones_horario',
    nombre: 'RLS activado en versiones_horario',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `versiones_horario`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'versiones_horario',
    linea: 8968,
    claves: 'versiones_horario rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE horarios.versiones_horario ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 6968,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.agrupacion_area_comun_cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 6975,
    claves: 'agrupacion_area_comun_cursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.agrupacion_area_comun_cursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 6982,
    claves: 'agrupaciones_area_comun api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.agrupaciones_area_comun FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aula_recursos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'aula_recursos',
    linea: 6989,
    claves: 'aula_recursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.aula_recursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aulas-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aulas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'aulas',
    linea: 6996,
    claves: 'aulas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.aulas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carrera_jornadas-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7003,
    claves: 'carrera_jornadas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.carrera_jornadas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carreras-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carreras`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'carreras',
    linea: 7010,
    claves: 'carreras api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.carreras FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohorte_periodos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7017,
    claves: 'cohorte_periodos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.cohorte_periodos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohortes-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cohortes',
    linea: 7024,
    claves: 'cohortes api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7031,
    claves: 'curso_carreras_compartidas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.curso_carreras_compartidas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7038,
    claves: 'curso_recursos_requeridos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.curso_recursos_requeridos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cursos',
    linea: 7045,
    claves: 'cursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.cursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7052,
    claves: 'cursos_en_pensum api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.cursos_en_pensum FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-facultades-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `facultades`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'facultades',
    linea: 7059,
    claves: 'facultades api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.facultades FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornada_descansos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7066,
    claves: 'jornada_descansos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.jornada_descansos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornadas-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'jornadas',
    linea: 7073,
    claves: 'jornadas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.jornadas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-pensums-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `pensums`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'pensums',
    linea: 7080,
    claves: 'pensums api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.pensums FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-periodos_academicos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7087,
    claves: 'periodos_academicos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.periodos_academicos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-recursos-api_catalogo_actualizar',
    nombre: 'api_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `recursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'recursos',
    linea: 7094,
    claves: 'recursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_actualizar ON horarios.recursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 7101,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.agrupacion_area_comun_cohortes FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 7108,
    claves: 'agrupacion_area_comun_cursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.agrupacion_area_comun_cursos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 7115,
    claves: 'agrupaciones_area_comun api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.agrupaciones_area_comun FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aula_recursos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'aula_recursos',
    linea: 7122,
    claves: 'aula_recursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.aula_recursos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aulas-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aulas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'aulas',
    linea: 7129,
    claves: 'aulas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.aulas FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carrera_jornadas-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7136,
    claves: 'carrera_jornadas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.carrera_jornadas FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carreras-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carreras`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'carreras',
    linea: 7143,
    claves: 'carreras api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.carreras FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohorte_periodos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7150,
    claves: 'cohorte_periodos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.cohorte_periodos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohortes-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohortes`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cohortes',
    linea: 7157,
    claves: 'cohortes api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.cohortes FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7164,
    claves: 'curso_carreras_compartidas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.curso_carreras_compartidas FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7171,
    claves: 'curso_recursos_requeridos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.curso_recursos_requeridos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cursos',
    linea: 7178,
    claves: 'cursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.cursos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7185,
    claves: 'cursos_en_pensum api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.cursos_en_pensum FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-facultades-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `facultades`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'facultades',
    linea: 7192,
    claves: 'facultades api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.facultades FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornada_descansos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7199,
    claves: 'jornada_descansos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.jornada_descansos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornadas-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornadas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'jornadas',
    linea: 7206,
    claves: 'jornadas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.jornadas FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-pensums-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `pensums`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'pensums',
    linea: 7213,
    claves: 'pensums api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.pensums FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-periodos_academicos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7220,
    claves: 'periodos_academicos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.periodos_academicos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-recursos-api_catalogo_eliminar',
    nombre: 'api_catalogo_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar del catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `recursos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'recursos',
    linea: 7227,
    claves: 'recursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_eliminar ON horarios.recursos FOR DELETE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 7234,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.agrupacion_area_comun_cohortes FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 7241,
    claves: 'agrupacion_area_comun_cursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.agrupacion_area_comun_cursos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 7248,
    claves: 'agrupaciones_area_comun api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.agrupaciones_area_comun FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aula_recursos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'aula_recursos',
    linea: 7255,
    claves: 'aula_recursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.aula_recursos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aulas-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `aulas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'aulas',
    linea: 7262,
    claves: 'aulas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.aulas FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carrera_jornadas-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7269,
    claves: 'carrera_jornadas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.carrera_jornadas FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carreras-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `carreras`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'carreras',
    linea: 7276,
    claves: 'carreras api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.carreras FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohorte_periodos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7283,
    claves: 'cohorte_periodos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.cohorte_periodos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohortes-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cohortes',
    linea: 7290,
    claves: 'cohortes api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.cohortes FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7297,
    claves: 'curso_carreras_compartidas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.curso_carreras_compartidas FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7304,
    claves: 'curso_recursos_requeridos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.curso_recursos_requeridos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cursos',
    linea: 7311,
    claves: 'cursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.cursos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7318,
    claves: 'cursos_en_pensum api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.cursos_en_pensum FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-facultades-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `facultades`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'facultades',
    linea: 7325,
    claves: 'facultades api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.facultades FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornada_descansos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7332,
    claves: 'jornada_descansos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.jornada_descansos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornadas-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `jornadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'jornadas',
    linea: 7339,
    claves: 'jornadas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.jornadas FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-pensums-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `pensums`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'pensums',
    linea: 7346,
    claves: 'pensums api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.pensums FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-periodos_academicos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7353,
    claves: 'periodos_academicos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.periodos_academicos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('academia'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-recursos-api_catalogo_insertar',
    nombre: 'api_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Insertar en el catálogo: exige permiso (\'academia\',\'crear\') o ser administrador de auditoría. Aplicada a `recursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'recursos',
    linea: 7360,
    claves: 'recursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_insertar ON horarios.recursos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('aulas'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 7367,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.agrupacion_area_comun_cohortes FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 7374,
    claves: 'agrupacion_area_comun_cursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.agrupacion_area_comun_cursos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 7381,
    claves: 'agrupaciones_area_comun api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.agrupaciones_area_comun FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-aula_recursos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'aula_recursos',
    linea: 7388,
    claves: 'aula_recursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.aula_recursos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-aulas-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `aulas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'aulas',
    linea: 7395,
    claves: 'aulas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.aulas FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-carrera_jornadas-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7402,
    claves: 'carrera_jornadas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.carrera_jornadas FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-carreras-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `carreras`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'carreras',
    linea: 7409,
    claves: 'carreras api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.carreras FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-cohorte_periodos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7416,
    claves: 'cohorte_periodos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.cohorte_periodos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-cohortes-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `cohortes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cohortes',
    linea: 7423,
    claves: 'cohortes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.cohortes FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7430,
    claves: 'curso_carreras_compartidas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.curso_carreras_compartidas FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7437,
    claves: 'curso_recursos_requeridos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.curso_recursos_requeridos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-cursos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `cursos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cursos',
    linea: 7444,
    claves: 'cursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.cursos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7451,
    claves: 'cursos_en_pensum api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.cursos_en_pensum FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-docentes-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `docentes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'docentes',
    linea: 7458,
    claves: 'docentes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.docentes FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-facultades-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `facultades`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'facultades',
    linea: 7465,
    claves: 'facultades api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.facultades FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-jornada_descansos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7472,
    claves: 'jornada_descansos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.jornada_descansos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-jornadas-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `jornadas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'jornadas',
    linea: 7479,
    claves: 'jornadas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.jornadas FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-pensums-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `pensums`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'pensums',
    linea: 7486,
    claves: 'pensums api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.pensums FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-periodos_academicos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7493,
    claves: 'periodos_academicos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.periodos_academicos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-recursos-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `recursos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'recursos',
    linea: 7500,
    claves: 'recursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.recursos FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-ventanas_disponibilidad-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `ventanas_disponibilidad`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'ventanas_disponibilidad',
    linea: 7514,
    claves: 'ventanas_disponibilidad api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_catalogo_leer ON horarios.ventanas_disponibilidad FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 8006,
    claves: 'cambios_detectados api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.cambios_detectados FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 8027,
    claves: 'conflicto_sesiones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.conflicto_sesiones FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-conflictos-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflictos',
    linea: 8034,
    claves: 'conflictos api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.conflictos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 8048,
    claves: 'historial_estados_horario api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.historial_estados_horario FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-horarios-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `horarios`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'horarios',
    linea: 8055,
    claves: 'horarios api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.horarios FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 8069,
    claves: 'resultado_edicion_conflictos api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.resultado_edicion_conflictos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 8076,
    claves: 'resultados_edicion api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.resultados_edicion FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 8083,
    claves: 'sesion_cohortes api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.sesion_cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-sesiones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones',
    linea: 8090,
    claves: 'sesiones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.sesiones FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 8104,
    claves: 'versiones_horario api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_actualizar ON horarios.versiones_horario FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 8111,
    claves: 'cambios_detectados api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.cambios_detectados FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 8132,
    claves: 'conflicto_sesiones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.conflicto_sesiones FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-conflictos-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `conflictos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'conflictos',
    linea: 8139,
    claves: 'conflictos api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.conflictos FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 8153,
    claves: 'historial_estados_horario api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.historial_estados_horario FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-horarios-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `horarios`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'horarios',
    linea: 8160,
    claves: 'horarios api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.horarios FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 8188,
    claves: 'resultado_edicion_conflictos api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.resultado_edicion_conflictos FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 8195,
    claves: 'resultados_edicion api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.resultados_edicion FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 8202,
    claves: 'sesion_cohortes api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.sesion_cohortes FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-sesiones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `sesiones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'sesiones',
    linea: 8209,
    claves: 'sesiones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.sesiones FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 8223,
    claves: 'versiones_horario api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_eliminar ON horarios.versiones_horario FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 8230,
    claves: 'cambios_detectados api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.cambios_detectados FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 8251,
    claves: 'conflicto_sesiones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.conflicto_sesiones FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-conflictos-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'conflictos',
    linea: 8258,
    claves: 'conflictos api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.conflictos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 8272,
    claves: 'historial_estados_horario api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.historial_estados_horario FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-horarios-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `horarios`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'horarios',
    linea: 8279,
    claves: 'horarios api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.horarios FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 8307,
    claves: 'resultado_edicion_conflictos api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.resultado_edicion_conflictos FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 8314,
    claves: 'resultados_edicion api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.resultados_edicion FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 8321,
    claves: 'sesion_cohortes api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.sesion_cohortes FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-sesiones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sesiones',
    linea: 8328,
    claves: 'sesiones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.sesiones FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Escribir planes: exige crear o actualizar planes. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'versiones_horario',
    linea: 8342,
    claves: 'versiones_horario api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_insertar ON horarios.versiones_horario FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'crear'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'actualizar'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 8349,
    claves: 'cambios_detectados api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.cambios_detectados FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 8370,
    claves: 'conflicto_sesiones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.conflicto_sesiones FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-conflictos-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'conflictos',
    linea: 8377,
    claves: 'conflictos api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.conflictos FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 8391,
    claves: 'historial_estados_horario api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.historial_estados_horario FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-horarios-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `horarios`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'horarios',
    linea: 8398,
    claves: 'horarios api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.horarios FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 8426,
    claves: 'resultado_edicion_conflictos api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.resultado_edicion_conflictos FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 8433,
    claves: 'resultados_edicion api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.resultados_edicion FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 8440,
    claves: 'sesion_cohortes api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.sesion_cohortes FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-sesiones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sesiones',
    linea: 8447,
    claves: 'sesiones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.sesiones FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas o reportes. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'versiones_horario',
    linea: 8461,
    claves: 'versiones_horario api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_leer ON horarios.versiones_horario FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('consultas'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text) OR horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text)));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 8468,
    claves: 'cambios_detectados api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.cambios_detectados FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 8489,
    claves: 'conflicto_sesiones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.conflicto_sesiones FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-conflictos-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflictos',
    linea: 8496,
    claves: 'conflictos api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.conflictos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 8510,
    claves: 'historial_estados_horario api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.historial_estados_horario FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-horarios-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `horarios`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'horarios',
    linea: 8517,
    claves: 'horarios api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.horarios FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 8531,
    claves: 'resultado_edicion_conflictos api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.resultado_edicion_conflictos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 8538,
    claves: 'resultados_edicion api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.resultados_edicion FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 8545,
    claves: 'sesion_cohortes api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.sesion_cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-sesiones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones',
    linea: 8552,
    claves: 'sesiones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.sesiones FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 8566,
    claves: 'versiones_horario api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_planes_transversal_actualizar ON horarios.versiones_horario FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_docentes_actualizar',
    nombre: 'api_docentes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Modificar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7521,
    claves: 'asignaciones_docente_curso api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_actualizar ON horarios.asignaciones_docente_curso FOR UPDATE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_docentes_actualizar',
    nombre: 'api_docentes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Modificar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7528,
    claves: 'disponibilidad_docente_slots api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_actualizar ON horarios.disponibilidad_docente_slots FOR UPDATE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_docentes_actualizar',
    nombre: 'api_docentes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Modificar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7535,
    claves: 'disponibilidades_docente api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_actualizar ON horarios.disponibilidades_docente FOR UPDATE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_docentes_eliminar',
    nombre: 'api_docentes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Borrar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7542,
    claves: 'asignaciones_docente_curso api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_eliminar ON horarios.asignaciones_docente_curso FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_docentes_eliminar',
    nombre: 'api_docentes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Borrar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7549,
    claves: 'disponibilidad_docente_slots api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_eliminar ON horarios.disponibilidad_docente_slots FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_docentes_eliminar',
    nombre: 'api_docentes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Borrar datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7556,
    claves: 'disponibilidades_docente api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_eliminar ON horarios.disponibilidades_docente FOR DELETE TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-docentes-api_docentes_escribir',
    nombre: 'api_docentes_escribir',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Escritura sobre la ficha del docente en cualquier operación: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `docentes`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'docentes',
    linea: 7563,
    claves: 'docentes api_docentes_escribir politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_escribir ON horarios.docentes TO authenticated USING (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_docentes_insertar',
    nombre: 'api_docentes_insertar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Alta de datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7570,
    claves: 'asignaciones_docente_curso api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_insertar ON horarios.asignaciones_docente_curso FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_docentes_insertar',
    nombre: 'api_docentes_insertar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Alta de datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7577,
    claves: 'disponibilidad_docente_slots api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_insertar ON horarios.disponibilidad_docente_slots FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_docentes_insertar',
    nombre: 'api_docentes_insertar',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Alta de datos de docentes: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7584,
    claves: 'disponibilidades_docente api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_insertar ON horarios.disponibilidades_docente FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('docentes'::text, 'actualizar'::text));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes o planes. Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7591,
    claves: 'asignaciones_docente_curso api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_leer ON horarios.asignaciones_docente_curso FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('docentes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes o planes. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7598,
    claves: 'disponibilidad_docente_slots api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_leer ON horarios.disponibilidad_docente_slots FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('docentes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes o planes. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7605,
    claves: 'disponibilidades_docente api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_docentes_leer ON horarios.disponibilidades_docente FOR SELECT TO authenticated USING ((horarios.usuario_actual_tiene_permiso('docentes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text) OR horarios.usuario_actual_tiene_permiso('motor'::text, 'generar'::text)));`,
  },
  {
    id: 'pol-eventos_sustitucion-api_sustituciones_escribir',
    nombre: 'api_sustituciones_escribir',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Registrar sustituciones: exige permiso (\'sustituciones\',\'crear\') y que quien registra sea el propio usuario. Aplicada a `eventos_sustitucion`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'eventos_sustitucion',
    linea: 8622,
    claves: 'eventos_sustitucion api_sustituciones_escribir politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_sustituciones_escribir ON horarios.eventos_sustitucion TO authenticated USING (horarios.usuario_actual_tiene_permiso('sustituciones'::text, 'crear'::text)) WITH CHECK ((horarios.usuario_actual_tiene_permiso('sustituciones'::text, 'crear'::text) AND (registrado_por_id = horarios.usuario_actual_id())));`,
  },
  {
    id: 'pol-eventos_sustitucion-api_sustituciones_leer',
    nombre: 'api_sustituciones_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Ver sustituciones: basta con tener sesión activa. Aplicada a `eventos_sustitucion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'eventos_sustitucion',
    linea: 8629,
    claves: 'eventos_sustitucion api_sustituciones_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_sustituciones_leer ON horarios.eventos_sustitucion FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-usuario_facultades-api_facultades_propias',
    nombre: 'api_facultades_propias',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien ve las facultades que le fueron asignadas. Aplicada a `usuario_facultades`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'usuario_facultades',
    linea: 7612,
    claves: 'usuario_facultades api_facultades_propias politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_facultades_propias ON horarios.usuario_facultades FOR SELECT TO authenticated USING ((usuario_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-notificaciones-api_notificaciones_insertar',
    nombre: 'api_notificaciones_insertar',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Solo se pueden crear notificaciones dirigidas a uno mismo. Aplicada a `notificaciones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'notificaciones',
    linea: 7976,
    claves: 'notificaciones api_notificaciones_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_notificaciones_insertar ON horarios.notificaciones FOR INSERT TO authenticated WITH CHECK ((destinatario_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-notificaciones-api_notificaciones_propias',
    nombre: 'api_notificaciones_propias',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien lee solo las notificaciones dirigidas a él. Aplicada a `notificaciones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'notificaciones',
    linea: 7983,
    claves: 'notificaciones api_notificaciones_propias politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_notificaciones_propias ON horarios.notificaciones FOR SELECT TO authenticated USING ((destinatario_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-permisos_acceso-api_permisos_catalogo',
    nombre: 'api_permisos_catalogo',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'El catálogo de permisos es visible para cualquier sesión activa. Aplicada a `permisos_acceso`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'permisos_acceso',
    linea: 7990,
    claves: 'permisos_acceso api_permisos_catalogo politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_permisos_catalogo ON horarios.permisos_acceso FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-rol_permisos-api_permisos_roles_propios',
    nombre: 'api_permisos_roles_propios',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien ve los permisos de los roles que tiene. Aplicada a `rol_permisos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'rol_permisos',
    linea: 7997,
    claves: 'rol_permisos api_permisos_roles_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_permisos_roles_propios ON horarios.rol_permisos FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM horarios.usuario_roles ur
  WHERE ((ur.usuario_id = horarios.usuario_actual_id()) AND (ur.rol_id = rol_permisos.rol_id)))));`,
  },
  {
    id: 'pol-plantillas_notificacion-api_plantillas_notificacion_leer',
    nombre: 'api_plantillas_notificacion_leer',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Las plantillas de aviso son visibles para cualquier sesión activa. Aplicada a `plantillas_notificacion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'plantillas_notificacion',
    linea: 8573,
    claves: 'plantillas_notificacion api_plantillas_notificacion_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_plantillas_notificacion_leer ON horarios.plantillas_notificacion FOR SELECT TO authenticated USING ((horarios.usuario_actual_id() IS NOT NULL));`,
  },
  {
    id: 'pol-reportes-api_reportes_insertar',
    nombre: 'api_reportes_insertar',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Generar un reporte exige permiso (\'reportes\',\'exportar\') y quedar registrado como su autor. Aplicada a `reportes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'reportes',
    linea: 8580,
    claves: 'reportes api_reportes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_reportes_insertar ON horarios.reportes FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('reportes'::text, 'exportar'::text) AND (generado_por_id = horarios.usuario_actual_id())));`,
  },
  {
    id: 'pol-reportes-api_reportes_propios',
    nombre: 'api_reportes_propios',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien ve solo los reportes que generó. Aplicada a `reportes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'reportes',
    linea: 8587,
    claves: 'reportes api_reportes_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_reportes_propios ON horarios.reportes FOR SELECT TO authenticated USING ((generado_por_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-roles-api_roles_catalogo',
    nombre: 'api_roles_catalogo',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'El catálogo de roles vivos es visible para cualquier sesión activa. Aplicada a `roles`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'roles',
    linea: 8594,
    claves: 'roles api_roles_catalogo politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_roles_catalogo ON horarios.roles FOR SELECT TO authenticated USING (((horarios.usuario_actual_id() IS NOT NULL) AND (eliminado_en IS NULL)));`,
  },
  {
    id: 'pol-usuario_roles-api_roles_propios',
    nombre: 'api_roles_propios',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien ve los roles que tiene asignados. Aplicada a `usuario_roles`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'usuario_roles',
    linea: 8601,
    claves: 'usuario_roles api_roles_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_roles_propios ON horarios.usuario_roles FOR SELECT TO authenticated USING ((usuario_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-usuarios-api_usuario_propio',
    nombre: 'api_usuario_propio',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien lee su propia ficha de usuario, y solo si no está borrada. Aplicada a `usuarios`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'usuarios',
    linea: 8636,
    claves: 'usuarios api_usuario_propio politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_usuario_propio ON horarios.usuarios FOR SELECT TO authenticated USING (((auth_user_id = auth.uid()) AND (eliminado_en IS NULL)));`,
  },
  {
    id: 'pol-importacion_errores-api_importaciones',
    nombre: 'api_importaciones',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'Todo el flujo de importación exige permiso (\'importaciones\',\'importar\'). Aplicada a `importacion_errores`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'importacion_errores',
    linea: 7626,
    claves: 'importacion_errores api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importaciones ON horarios.importacion_errores TO authenticated USING (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-importaciones-api_importaciones',
    nombre: 'api_importaciones',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'Todo el flujo de importación exige permiso (\'importaciones\',\'importar\'). Aplicada a `importaciones`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'importaciones',
    linea: 7633,
    claves: 'importaciones api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importaciones ON horarios.importaciones TO authenticated USING (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-plantillas_importacion-api_importaciones',
    nombre: 'api_importaciones',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'Todo el flujo de importación exige permiso (\'importaciones\',\'importar\'). Aplicada a `plantillas_importacion`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'plantillas_importacion',
    linea: 7640,
    claves: 'plantillas_importacion api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importaciones ON horarios.plantillas_importacion TO authenticated USING (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text)) WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-importaciones-api_importaciones_diagnostico',
    nombre: 'api_importaciones_diagnostico',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'Quien puede leer planes ve el diagnóstico de importaciones, para saber por qué falta información. Aplicada a `importaciones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'importaciones',
    linea: 7647,
    claves: 'importaciones api_importaciones_diagnostico politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importaciones_diagnostico ON horarios.importaciones FOR SELECT TO authenticated USING (horarios.usuario_actual_tiene_permiso('planes'::text, 'leer'::text));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 7654,
    claves: 'agrupacion_area_comun_cohortes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.agrupacion_area_comun_cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 7661,
    claves: 'agrupacion_area_comun_cursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.agrupacion_area_comun_cursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 7668,
    claves: 'agrupaciones_area_comun api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.agrupaciones_area_comun FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7675,
    claves: 'asignaciones_docente_curso api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.asignaciones_docente_curso FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aula_recursos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'aula_recursos',
    linea: 7682,
    claves: 'aula_recursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.aula_recursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-aulas-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `aulas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'aulas',
    linea: 7689,
    claves: 'aulas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.aulas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carrera_jornadas-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7696,
    claves: 'carrera_jornadas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.carrera_jornadas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-carreras-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `carreras`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'carreras',
    linea: 7703,
    claves: 'carreras api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.carreras FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohorte_periodos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7710,
    claves: 'cohorte_periodos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.cohorte_periodos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cohortes-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cohortes',
    linea: 7717,
    claves: 'cohortes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.cohortes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7724,
    claves: 'curso_carreras_compartidas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.curso_carreras_compartidas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7731,
    claves: 'curso_recursos_requeridos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.curso_recursos_requeridos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `cursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cursos',
    linea: 7738,
    claves: 'cursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.cursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7745,
    claves: 'cursos_en_pensum api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.cursos_en_pensum FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7752,
    claves: 'disponibilidad_docente_slots api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.disponibilidad_docente_slots FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7759,
    claves: 'disponibilidades_docente api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.disponibilidades_docente FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-docentes-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `docentes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'docentes',
    linea: 7766,
    claves: 'docentes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.docentes FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-facultades-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `facultades`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'facultades',
    linea: 7773,
    claves: 'facultades api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.facultades FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornada_descansos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7780,
    claves: 'jornada_descansos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.jornada_descansos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-jornadas-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `jornadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'jornadas',
    linea: 7787,
    claves: 'jornadas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.jornadas FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-pensums-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `pensums`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'pensums',
    linea: 7794,
    claves: 'pensums api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.pensums FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-periodos_academicos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7801,
    claves: 'periodos_academicos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.periodos_academicos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-recursos-api_importar_catalogo_actualizar',
    nombre: 'api_importar_catalogo_actualizar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede actualizar catálogos: exige importar o administrar auditoría. Aplicada a `recursos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'recursos',
    linea: 7808,
    claves: 'recursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_actualizar ON horarios.recursos FOR UPDATE TO authenticated USING ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text))) WITH CHECK ((horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text) OR horarios.usuario_actual_tiene_permiso('auditoria'::text, 'administrar'::text)));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cohortes-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `agrupacion_area_comun_cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupacion_area_comun_cohortes',
    linea: 7815,
    claves: 'agrupacion_area_comun_cohortes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.agrupacion_area_comun_cohortes FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-agrupacion_area_comun_cursos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `agrupacion_area_comun_cursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 7822,
    claves: 'agrupacion_area_comun_cursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.agrupacion_area_comun_cursos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-agrupaciones_area_comun-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `agrupaciones_area_comun`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'agrupaciones_area_comun',
    linea: 7829,
    claves: 'agrupaciones_area_comun api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.agrupaciones_area_comun FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 7836,
    claves: 'asignaciones_docente_curso api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.asignaciones_docente_curso FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-aula_recursos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `aula_recursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'aula_recursos',
    linea: 7843,
    claves: 'aula_recursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.aula_recursos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-aulas-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `aulas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'aulas',
    linea: 7850,
    claves: 'aulas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.aulas FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-carrera_jornadas-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `carrera_jornadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'carrera_jornadas',
    linea: 7857,
    claves: 'carrera_jornadas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.carrera_jornadas FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-carreras-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `carreras`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'carreras',
    linea: 7864,
    claves: 'carreras api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.carreras FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-cohorte_periodos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `cohorte_periodos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cohorte_periodos',
    linea: 7871,
    claves: 'cohorte_periodos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.cohorte_periodos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-cohortes-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cohortes',
    linea: 7878,
    claves: 'cohortes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.cohortes FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-curso_carreras_compartidas-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `curso_carreras_compartidas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_carreras_compartidas',
    linea: 7885,
    claves: 'curso_carreras_compartidas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.curso_carreras_compartidas FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-curso_recursos_requeridos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `curso_recursos_requeridos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_recursos_requeridos',
    linea: 7892,
    claves: 'curso_recursos_requeridos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.curso_recursos_requeridos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-cursos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `cursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cursos',
    linea: 7899,
    claves: 'cursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.cursos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-cursos_en_pensum-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `cursos_en_pensum`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cursos_en_pensum',
    linea: 7906,
    claves: 'cursos_en_pensum api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.cursos_en_pensum FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 7913,
    claves: 'disponibilidad_docente_slots api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.disponibilidad_docente_slots FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 7920,
    claves: 'disponibilidades_docente api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.disponibilidades_docente FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-docentes-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `docentes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'docentes',
    linea: 7927,
    claves: 'docentes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.docentes FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-facultades-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `facultades`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'facultades',
    linea: 7934,
    claves: 'facultades api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.facultades FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-jornada_descansos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `jornada_descansos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'jornada_descansos',
    linea: 7941,
    claves: 'jornada_descansos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.jornada_descansos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-jornadas-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `jornadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'jornadas',
    linea: 7948,
    claves: 'jornadas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.jornadas FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-pensums-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `pensums`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'pensums',
    linea: 7955,
    claves: 'pensums api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.pensums FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-periodos_academicos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `periodos_academicos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'periodos_academicos',
    linea: 7962,
    claves: 'periodos_academicos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.periodos_academicos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-recursos-api_importar_catalogo_insertar',
    nombre: 'api_importar_catalogo_insertar',
    cat: 'rls',
    grupo: 'Políticas · importación',
    desc: 'La importación puede insertar en los catálogos: exige permiso (\'importaciones\',\'importar\'). Aplicada a `recursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'recursos',
    linea: 7969,
    claves: 'recursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_importar_catalogo_insertar ON horarios.recursos FOR INSERT TO authenticated WITH CHECK (horarios.usuario_actual_tiene_permiso('importaciones'::text, 'importar'::text));`,
  },
  {
    id: 'pol-auditoria-api_auditoria_insertar',
    nombre: 'api_auditoria_insertar',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Solo se pueden escribir entradas de auditoría a nombre propio. Aplicada a `auditoria`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'auditoria',
    linea: 6954,
    claves: 'auditoria api_auditoria_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_auditoria_insertar ON horarios.auditoria FOR INSERT TO authenticated WITH CHECK ((usuario_id = horarios.usuario_actual_id()));`,
  },
  {
    id: 'pol-auditoria-api_auditoria_leer',
    nombre: 'api_auditoria_leer',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Leer la bitácora exige permiso (\'auditoria\',\'leer\'). Aplicada a `auditoria`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'auditoria',
    linea: 6961,
    claves: 'auditoria api_auditoria_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_auditoria_leer ON horarios.auditoria FOR SELECT TO authenticated USING (horarios.usuario_actual_tiene_permiso('auditoria'::text, 'leer'::text));`,
  },
  {
    id: 'pol-historial_estados_horario-api_historial_aprobacion_insertar',
    nombre: 'api_historial_aprobacion_insertar',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Solo quien aprueba o publica planes puede escribir en el historial de estados. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 7619,
    claves: 'historial_estados_horario api_historial_aprobacion_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_historial_aprobacion_insertar ON horarios.historial_estados_horario FOR INSERT TO authenticated WITH CHECK ((horarios.usuario_actual_tiene_permiso('planes'::text, 'aprobar'::text) OR horarios.usuario_actual_tiene_permiso('planes'::text, 'publicar'::text)));`,
  },
  {
    id: 'pol-usuarios-api_usuarios_para_auditoria',
    nombre: 'api_usuarios_para_auditoria',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Quien audita puede ver la lista de usuarios para resolver nombres. Aplicada a `usuarios`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'usuarios',
    linea: 8643,
    claves: 'usuarios api_usuarios_para_auditoria politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY api_usuarios_para_auditoria ON horarios.usuarios FOR SELECT TO authenticated USING (horarios.usuario_actual_tiene_permiso('auditoria'::text, 'leer'::text));`,
  },
  {
    id: 'comment-2',
    nombre: 'COMMENT · SCHEMA public',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 57,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON SCHEMA public IS 'standard public schema';`,
  },
  {
    id: 'comment-93',
    nombre: 'COMMENT · VIEW api_cursos_periodo',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 3784,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON VIEW horarios.api_cursos_periodo IS 'Cursos derivados de las cohortes activas de un período. Misma regla que el motor: pensum de la cohorte × semestre en que la cohorte está ese período.';`,
  },
  {
    id: 'pre-cabecera',
    nombre: 'Cabecera del archivo',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Explica qué es este archivo: una foto de la base viva, no la fuente de verdad. La fuente son las migraciones de `supabase/migrations/`; aquí abajo está el comando exacto para volver a generarlo.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 1,
    claves: 'regenerar pg_dump migraciones fuente de verdad',
    params: [],
    pasos: [],
    sql: `-- Esquema completo del sistema de horarios: instantánea de la base viva.
-- Documento de referencia, NO ejecutable como migración: la fuente de verdad
-- del esquema es supabase/migrations/. Este archivo existe para leer y comparar
-- (ver guiaR3.md), y debe regenerarse cada vez que se agregue una migración.
--
-- Live Supabase schema snapshot: 2026-08-04
-- Migraciones incluidas: 202608010001 … 202608060002_retirar_compatibilidad_corridas
--
-- Regenerar con la base local ya migrada:
--   docker exec supabase_db_horarios pg_dump --schema-only --no-owner \\
--     --no-privileges -n public -n horarios -U postgres postgres
-- y volver a anteponer esta cabecera y las extensiones (pg_dump las omite al
-- filtrar por esquema). Se quitan las meta-órdenes \\restrict/\\unrestrict, que
-- solo entiende psql.

-- Extensiones requeridas por defaults y restricciones de exclusion.`,
  },
  {
    id: 'pre-extensiones',
    nombre: 'Extensiones (pgcrypto, btree_gist)',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Las dos extensiones que el esquema necesita: `pgcrypto` para generar los UUID de cada fila y `btree_gist` para que los índices de exclusión sepan comparar uuid y enum, que es lo que hace posible prohibir los solapes de horario.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 17,
    claves: 'uuid gen_random_uuid exclusion gist solapes',
    params: [],
    pasos: [],
    sql: `CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS btree_gist;`,
  },
  {
    id: 'pre-ajustes',
    nombre: 'Parámetros del volcado',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Los `SET` que pg_dump escribe siempre al principio: tiempos de espera, codificación y desactivación temporal de comprobaciones mientras se restaura. No forman parte del diseño del sistema.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 20,
    claves: 'set search_path client_encoding pg_dump',
    params: [],
    pasos: [],
    sql: `--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;`,
  },
  {
    id: 'schema-horarios',
    nombre: 'SCHEMA horarios',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Crea el esquema `horarios`, la carpeta donde vive todo lo nuestro. El resto de esquemas que aparecen en Supabase (auth, storage, realtime…) son de la plataforma y no se tocan.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 43,
    claves: 'esquema schema separacion',
    params: [],
    pasos: [],
    sql: `CREATE SCHEMA horarios;`,
  },
  {
    id: 'schema-public',
    nombre: 'SCHEMA public',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'El esquema `public` viene de fábrica con PostgreSQL. Se deja vacío a propósito: así ninguna extensión instalada choca con nuestras tablas.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 50,
    claves: 'esquema schema separacion',
    params: [],
    pasos: [],
    sql: `CREATE SCHEMA public;`,
  },
];

export const META = {
  archivo: 'docs/database.sql',
  lineas: 8974,
  lineasTexto: '8 974',
  objetos: 722,
  cobertura: 100.0,
  instantanea: '2026-08-04',
};
