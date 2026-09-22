// GENERADO — no editar a mano.
// Fuente: docs/database.sql · script: scripts/gen-catalogo.py
// 852 objetos · 11657 líneas · cobertura 100.0% del archivo

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
  { id: 'tabla', label: 'Tablas', color: '#3f6fd6', n: 62 },
  { id: 'tipo', label: 'Tipos ENUM', color: '#0f8a94', n: 24 },
  { id: 'vista', label: 'Vistas', color: '#2a9468', n: 10 },
  { id: 'funcion', label: 'Funciones', color: '#8b52d9', n: 101 },
  { id: 'trigger', label: 'Triggers', color: '#b5791b', n: 52 },
  { id: 'restriccion', label: 'Llaves y restricciones', color: '#c2504b', n: 79 },
  { id: 'fk', label: 'Claves foráneas', color: '#a1568c', n: 123 },
  { id: 'indice', label: 'Índices', color: '#5a6474', n: 58 },
  { id: 'rls', label: 'Seguridad por fila', color: '#3a3229', n: 318 },
  { id: 'base', label: 'Preámbulo', color: '#8c8171', n: 25 },
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
    linea: 5573,
    claves: 'agrupacion_id cohorte_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."agrupacion_area_comun_cohortes" (
    "agrupacion_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL
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
    linea: 5583,
    claves: 'agrupacion_id curso_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."agrupacion_area_comun_cursos" (
    "agrupacion_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-agrupaciones_area_comun',
    nombre: 'agrupaciones_area_comun',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Clase compartida identificada por período, curso común y jornada. Sus cursos y cohortes se derivan del catálogo y de las cohortes activas.',
    detalle: '',
    nota: '12 columnas · borrado lógico · bloqueo optimista',
    tabla: 'agrupaciones_area_comun',
    linea: 5593,
    claves: 'id periodo_id nombre curso_principal_id creada_por_id creada_en actualizado_en esta_activa eliminado_en version_fila curso_comun_id jornada_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."agrupaciones_area_comun" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "curso_principal_id" "uuid",
    "creada_por_id" "uuid",
    "creada_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "curso_comun_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL
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
    linea: 6047,
    claves: 'carrera_id jornada_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."carrera_jornadas" (
    "carrera_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-carreras',
    nombre: 'carreras',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Carreras de cada facultad, con código, nivel académico y duración en semestres. Esa duración es la que valida que una cohorte no pase de su último semestre.',
    detalle: '',
    nota: '11 columnas · borrado lógico · bloqueo optimista',
    tabla: 'carreras',
    linea: 5745,
    claves: 'id facultad_id codigo nombre nivel_academico duracion_en_semestres esta_activa creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."carreras" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "facultad_id" "uuid" NOT NULL,
    "codigo" character varying(20) NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "nivel_academico" character varying(50) NOT NULL,
    "duracion_en_semestres" integer NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "carreras_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "carreras_duracion_en_semestres_check" CHECK (("duracion_en_semestres" > 0)),
    CONSTRAINT "carreras_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);`,
  },
  {
    id: 'tabla-cohorte_periodos',
    nombre: 'cohorte_periodos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Qué cohortes están activas en cada período, en qué semestre va cada una y con cuánta matrícula. Es la entrada principal del motor.',
    detalle: '',
    nota: '10 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cohorte_periodos',
    linea: 5687,
    claves: 'id cohorte_id periodo_id semestre_asignado matricula_estimada esta_activa creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."cohorte_periodos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "cohorte_id" "uuid" NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "semestre_asignado" integer NOT NULL,
    "matricula_estimada" integer NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "cohorte_periodos_matricula_estimada_check" CHECK (("matricula_estimada" >= 0)),
    CONSTRAINT "cohorte_periodos_semestre_asignado_check" CHECK (("semestre_asignado" > 0))
);`,
  },
  {
    id: 'tabla-cohortes',
    nombre: 'cohortes',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Grupos de estudiantes: carrera + pensum + jornada + año de ingreso + sección, con su matrícula estimada y su estado.',
    detalle: '',
    nota: '12 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cohortes',
    linea: 5707,
    claves: 'id carrera_id pensum_id jornada_id anio_ingreso seccion matricula_estimada estado creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."cohortes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "carrera_id" "uuid" NOT NULL,
    "pensum_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "anio_ingreso" integer NOT NULL,
    "seccion" character varying(20) NOT NULL,
    "matricula_estimada" integer NOT NULL,
    "estado" "horarios"."estado_cohorte" DEFAULT 'activa'::"horarios"."estado_cohorte" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "cohortes_anio_ingreso_check" CHECK (("anio_ingreso" >= 1900)),
    CONSTRAINT "cohortes_matricula_estimada_check" CHECK (("matricula_estimada" >= 0)),
    CONSTRAINT "cohortes_seccion_check" CHECK (("length"(TRIM(BOTH FROM "seccion")) > 0))
);`,
  },
  {
    id: 'tabla-curso_comun',
    nombre: 'curso_comun',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Grupos de cursos equivalentes de distintos pensums: una misma clase compartida con varios nombres en las mallas.',
    detalle: '',
    nota: '6 columnas · borrado lógico · bloqueo optimista',
    tabla: 'curso_comun',
    linea: 6113,
    claves: 'id nombre creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."curso_comun" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "curso_comun_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);`,
  },
  {
    id: 'tabla-curso_comun_cursos',
    nombre: 'curso_comun_cursos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Cursos de cada grupo de equivalencia. Un curso solo pertenece a un curso común y no se repite el pensum dentro del grupo.',
    detalle: '',
    nota: '2 columnas',
    tabla: 'curso_comun_cursos',
    linea: 6135,
    claves: 'curso_comun_id curso_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."curso_comun_cursos" (
    "curso_comun_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-cursos',
    nombre: 'cursos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Materias propias de cada pensum: código, nombre, requisitos de laboratorio, marca de área común y `esta_activo`. Un curso inactivo conserva su historia pero no admite nuevas autorizaciones, equivalencias ni generaciones.',
    detalle: '',
    nota: '12 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cursos',
    linea: 5767,
    claves: 'id codigo nombre requiere_laboratorio tipo_laboratorio_requerido es_area_comun creado_en actualizado_en eliminado_en version_fila pensum_id esta_activo',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."cursos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(30) NOT NULL,
    "nombre" character varying(180) NOT NULL,
    "requiere_laboratorio" boolean DEFAULT false NOT NULL,
    "tipo_laboratorio_requerido" character varying(80),
    "es_area_comun" boolean DEFAULT false NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "pensum_id" "uuid" NOT NULL,
    "esta_activo" boolean DEFAULT true NOT NULL,
    CONSTRAINT "cursos_check" CHECK (("requiere_laboratorio" OR ("tipo_laboratorio_requerido" IS NULL))),
    CONSTRAINT "cursos_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "cursos_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);`,
  },
  {
    id: 'tabla-cursos_en_pensum',
    nombre: 'cursos_en_pensum',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'La malla curricular: qué curso va en qué semestre de qué pensum, cuántos bloques semanales exige y si los prefiere consecutivos.',
    detalle: '',
    nota: '11 columnas · borrado lógico · bloqueo optimista',
    tabla: 'cursos_en_pensum',
    linea: 5797,
    claves: 'id pensum_id curso_id semestre_asignado bloques_semanales_exactos prefiere_bloques_consecutivos creado_en actualizado_en eliminado_en version_fila duracion_slots',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."cursos_en_pensum" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "pensum_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL,
    "semestre_asignado" integer NOT NULL,
    "bloques_semanales_exactos" integer NOT NULL,
    "prefiere_bloques_consecutivos" boolean DEFAULT false NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "duracion_slots" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "cursos_en_pensum_bloques_semanales_exactos_check" CHECK (("bloques_semanales_exactos" > 0)),
    CONSTRAINT "cursos_en_pensum_duracion_slots_check" CHECK (("duracion_slots" > 0)),
    CONSTRAINT "cursos_en_pensum_semestre_asignado_check" CHECK (("semestre_asignado" > 0))
);`,
  },
  {
    id: 'tabla-facultades',
    nombre: 'facultades',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Facultades de la universidad. Es la raíz del alcance: a un usuario se le asignan facultades y solo ve lo que cuelga de ellas.',
    detalle: '',
    nota: '9 columnas · borrado lógico · bloqueo optimista',
    tabla: 'facultades',
    linea: 6265,
    claves: 'id codigo nombre nombre_decano esta_activa creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."facultades" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(20) NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "nombre_decano" character varying(200),
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "facultades_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "facultades_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);`,
  },
  {
    id: 'tabla-jornada_descansos',
    nombre: 'jornada_descansos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Recesos concretos dentro de una jornada, por día y rango de bloques. Una restricción de exclusión impide que dos se pisen.',
    detalle: '',
    nota: '6 columnas · columnas generadas',
    tabla: 'jornada_descansos',
    linea: 6395,
    claves: 'id jornada_id dia indice_slot_inicio duracion_slots rango_slots',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."jornada_descansos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot_inicio" integer NOT NULL,
    "duracion_slots" integer NOT NULL,
    "rango_slots" "int4range" GENERATED ALWAYS AS ("int4range"("indice_slot_inicio", ("indice_slot_inicio" + "duracion_slots"), '[)'::"text")) STORED,
    CONSTRAINT "jornada_descansos_duracion_slots_check" CHECK (("duracion_slots" > 0)),
    CONSTRAINT "jornada_descansos_indice_slot_inicio_check" CHECK (("indice_slot_inicio" > 0))
);`,
  },
  {
    id: 'tabla-jornada_extraordinaria_docentes',
    nombre: 'jornada_extraordinaria_docentes',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Qué docentes están asignados a una jornada extraordinaria en un período. Solo ellos pueden declarar disponibilidad en esa jornada.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 6411,
    claves: 'jornada_id periodo_id docente_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."jornada_extraordinaria_docentes" (
    "jornada_id" "uuid" NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "docente_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-jornada_extraordinaria_periodos',
    nombre: 'jornada_extraordinaria_periodos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Por cada jornada extraordinaria y período, el horario regular de referencia contra el que se calculan los bloques ocupados de cada docente.',
    detalle: '',
    nota: '4 columnas',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 6422,
    claves: 'jornada_id periodo_id horario_referencia_id actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."jornada_extraordinaria_periodos" (
    "jornada_id" "uuid" NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "horario_referencia_id" "uuid" NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-jornadas',
    nombre: 'jornadas',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Matutina, vespertina…: días activos, hora de inicio y fin, duración del bloque, bloques por día y el receso (después de qué bloque y cuántos minutos). Con `jornada_regular_id` la jornada es extraordinaria y corre en paralelo a esa regular.',
    detalle: '',
    nota: '15 columnas · borrado lógico · bloqueo optimista',
    tabla: 'jornadas',
    linea: 4107,
    claves: 'id nombre dias_activos hora_inicio hora_fin duracion_bloque_minutos bloques_por_dia esta_activa creado_en actualizado_en eliminado_en version_fila receso_despues_bloque duracion_receso_minutos jornada_regular_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."jornadas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "dias_activos" "horarios"."dia_semana"[] NOT NULL,
    "hora_inicio" time without time zone NOT NULL,
    "hora_fin" time without time zone NOT NULL,
    "duracion_bloque_minutos" integer NOT NULL,
    "bloques_por_dia" integer NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "receso_despues_bloque" integer DEFAULT 0 NOT NULL,
    "duracion_receso_minutos" integer DEFAULT 0 NOT NULL,
    "jornada_regular_id" "uuid",
    CONSTRAINT "jornadas_bloques_por_dia_check" CHECK (("bloques_por_dia" > 0)),
    CONSTRAINT "jornadas_check" CHECK (("hora_fin" > "hora_inicio")),
    CONSTRAINT "jornadas_check1" CHECK ((((("bloques_por_dia" * "duracion_bloque_minutos") + "duracion_receso_minutos"))::numeric <= (EXTRACT(epoch FROM ("hora_fin" - "hora_inicio")) / (60)::numeric))),
    CONSTRAINT "jornadas_dias_activos_check" CHECK (("cardinality"("dias_activos") > 0)),
    CONSTRAINT "jornadas_duracion_bloque_minutos_check" CHECK (("duracion_bloque_minutos" > 0)),
    CONSTRAINT "jornadas_receso_check" CHECK (((("duracion_receso_minutos" = 0) AND ("receso_despues_bloque" = 0)) OR (("duracion_receso_minutos" > 0) AND ("receso_despues_bloque" > 0) AND ("receso_despues_bloque" < "bloques_por_dia")))),
    CONSTRAINT "jornadas_regular_distinta_check" CHECK (("jornada_regular_id" IS DISTINCT FROM "id"))
);`,
  },
  {
    id: 'tabla-pensums',
    nombre: 'pensums',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Planes de estudio de una carrera, uno por año de creación, con su estado (borrador, vigente, en retiro, archivado).',
    detalle: '',
    nota: '8 columnas · borrado lógico · bloqueo optimista',
    tabla: 'pensums',
    linea: 5819,
    claves: 'id carrera_id anio_creacion estado fecha_creacion actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."pensums" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "carrera_id" "uuid" NOT NULL,
    "anio_creacion" integer NOT NULL,
    "estado" "horarios"."estado_pensum" DEFAULT 'borrador'::"horarios"."estado_pensum" NOT NULL,
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "pensums_anio_creacion_check" CHECK (("anio_creacion" >= 1900))
);`,
  },
  {
    id: 'tabla-periodos_academicos',
    nombre: 'periodos_academicos',
    cat: 'tabla',
    grupo: 'Académico',
    desc: 'Semestres o cuatrimestres: nombre, fecha de inicio y fin, y estado del período.',
    detalle: '',
    nota: '9 columnas · borrado lógico · bloqueo optimista',
    tabla: 'periodos_academicos',
    linea: 6488,
    claves: 'id nombre fecha_inicio fecha_fin estado creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."periodos_academicos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "fecha_inicio" "date" NOT NULL,
    "fecha_fin" "date" NOT NULL,
    "estado" "horarios"."estado_periodo" DEFAULT 'borrador'::"horarios"."estado_periodo" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "periodos_academicos_check" CHECK (("fecha_fin" >= "fecha_inicio"))
);`,
  },
  {
    id: 'tabla-aula_recursos',
    nombre: 'aula_recursos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Puente N:M con cantidad. Qué recursos tiene cada aula y cuántos.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'aula_recursos',
    linea: 5877,
    claves: 'aula_id recurso_id cantidad',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."aula_recursos" (
    "aula_id" "uuid" NOT NULL,
    "recurso_id" "uuid" NOT NULL,
    "cantidad" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "aula_recursos_cantidad_check" CHECK (("cantidad" > 0))
);`,
  },
  {
    id: 'tabla-aulas',
    nombre: 'aulas',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Salones: código, capacidad máxima, tipo (teórica, laboratorio, mixta, virtual), piso, número y equipamiento especial.',
    detalle: '',
    nota: '14 columnas · borrado lógico · bloqueo optimista',
    tabla: 'aulas',
    linea: 6008,
    claves: 'id codigo capacidad_maxima tipo tipo_laboratorio_disponible piso numero_aula posicion_x posicion_y esta_activa creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."aulas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(30) NOT NULL,
    "capacidad_maxima" integer NOT NULL,
    "tipo" "horarios"."tipo_aula" NOT NULL,
    "tipo_laboratorio_disponible" character varying(80),
    "piso" integer DEFAULT 1 NOT NULL,
    "numero_aula" integer NOT NULL,
    "posicion_x" integer DEFAULT 0 NOT NULL,
    "posicion_y" integer DEFAULT 0 NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "aulas_capacidad_maxima_check" CHECK (("capacidad_maxima" > 0)),
    CONSTRAINT "aulas_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo"))))
);`,
  },
  {
    id: 'tabla-curso_recursos_requeridos',
    nombre: 'curso_recursos_requeridos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Puente N:M con cantidad. Qué recursos exige un curso; el motor solo lo coloca en aulas que los tengan.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'curso_recursos_requeridos',
    linea: 6145,
    claves: 'curso_id recurso_id cantidad',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."curso_recursos_requeridos" (
    "curso_id" "uuid" NOT NULL,
    "recurso_id" "uuid" NOT NULL,
    "cantidad" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "curso_recursos_requeridos_cantidad_check" CHECK (("cantidad" > 0))
);`,
  },
  {
    id: 'tabla-recursos',
    nombre: 'recursos',
    cat: 'tabla',
    grupo: 'Infraestructura',
    desc: 'Catálogo de recursos físicos: proyector, laboratorio de cómputo, etc.',
    detalle: '',
    nota: '10 columnas · borrado lógico · bloqueo optimista',
    tabla: 'recursos',
    linea: 5889,
    claves: 'id codigo nombre descripcion esta_activo creado_en actualizado_en eliminado_en version_fila tipo',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."recursos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(40) NOT NULL,
    "nombre" character varying(120) NOT NULL,
    "descripcion" "text",
    "esta_activo" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "tipo" "horarios"."tipo_recurso" DEFAULT 'fijo'::"horarios"."tipo_recurso" NOT NULL,
    CONSTRAINT "recursos_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "recursos_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);`,
  },
  {
    id: 'tabla-configuracion_motor_restricciones',
    nombre: 'configuracion_motor_restricciones',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Puente N:M con peso. Qué restricciones usa una configuración y cuánto pesa cada una.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'configuracion_motor_restricciones',
    linea: 6057,
    claves: 'configuracion_id restriccion_id peso',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."configuracion_motor_restricciones" (
    "configuracion_id" "uuid" NOT NULL,
    "restriccion_id" "uuid" NOT NULL,
    "peso" numeric(12,4) NOT NULL,
    CONSTRAINT "configuracion_motor_restricciones_peso_check" CHECK (("peso" >= (0)::numeric))
);`,
  },
  {
    id: 'tabla-configuraciones_motor',
    nombre: 'configuraciones_motor',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Parámetros de una corrida del generador: tiempo máximo, iteraciones y tolerancia a violaciones blandas.',
    detalle: '',
    nota: '8 columnas',
    tabla: 'configuraciones_motor',
    linea: 6069,
    claves: 'id nombre tiempo_maximo_generacion_ms maximo_iteraciones tolerancia_violaciones_blandas esta_activa creado_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."configuraciones_motor" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(120) NOT NULL,
    "tiempo_maximo_generacion_ms" bigint NOT NULL,
    "maximo_iteraciones" integer NOT NULL,
    "tolerancia_violaciones_blandas" numeric(8,4) DEFAULT 0 NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "configuraciones_motor_maximo_iteraciones_check" CHECK (("maximo_iteraciones" > 0)),
    CONSTRAINT "configuraciones_motor_tiempo_maximo_generacion_ms_check" CHECK (("tiempo_maximo_generacion_ms" > 0)),
    CONSTRAINT "configuraciones_motor_tolerancia_violaciones_blandas_check" CHECK (("tolerancia_violaciones_blandas" >= (0)::numeric))
);`,
  },
  {
    id: 'tabla-generaciones',
    nombre: 'generaciones',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Cada ejecución del motor: estado, semilla, duración, memoria, costo final, violaciones, la entrada usada y el resultado completo en JSON.',
    detalle: '',
    nota: '23 columnas · idempotencia',
    tabla: 'generaciones',
    linea: 6284,
    claves: 'id periodo_id tipo_plan plan_id configuracion_id solicitada_por_id clave_solicitud estado version_motor semilla duracion_ms tiempo_primera_solucion_ms memoria_maxima_mb hardware_referencia costo_final total_violaciones_duras total_violaciones_blandas total_sesiones_pendientes instantanea_entrada resultado puntaje_desglose iniciada_en finalizada_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."generaciones" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "tipo_plan" "horarios"."tipo_plan_horario" DEFAULT 'clases'::"horarios"."tipo_plan_horario" NOT NULL,
    "plan_id" "uuid",
    "configuracion_id" "uuid",
    "solicitada_por_id" "uuid",
    "clave_solicitud" character varying(120),
    "estado" "horarios"."estado_generacion" DEFAULT 'pendiente'::"horarios"."estado_generacion" NOT NULL,
    "version_motor" character varying(80) NOT NULL,
    "semilla" bigint,
    "duracion_ms" bigint,
    "tiempo_primera_solucion_ms" bigint,
    "memoria_maxima_mb" numeric(12,2),
    "hardware_referencia" "text",
    "costo_final" numeric(14,4),
    "total_violaciones_duras" integer DEFAULT 0 NOT NULL,
    "total_violaciones_blandas" integer DEFAULT 0 NOT NULL,
    "total_sesiones_pendientes" integer DEFAULT 0 NOT NULL,
    "instantanea_entrada" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "resultado" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "puntaje_desglose" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "iniciada_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "finalizada_en" timestamp with time zone,
    CONSTRAINT "generaciones_completada_sin_pendientes_check" CHECK ((("estado" <> 'completada'::"horarios"."estado_generacion") OR (("total_violaciones_duras" = 0) AND ("total_sesiones_pendientes" = 0)))),
    CONSTRAINT "generaciones_duracion_ms_check" CHECK ((("duracion_ms" IS NULL) OR ("duracion_ms" >= 0))),
    CONSTRAINT "generaciones_estado_terminal_check" CHECK ((("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_generacion", 'generando'::"horarios"."estado_generacion"])) OR ("finalizada_en" IS NOT NULL))),
    CONSTRAINT "generaciones_instantanea_entrada_check" CHECK (("jsonb_typeof"("instantanea_entrada") = 'object'::"text")),
    CONSTRAINT "generaciones_memoria_maxima_mb_check" CHECK ((("memoria_maxima_mb" IS NULL) OR ("memoria_maxima_mb" >= (0)::numeric))),
    CONSTRAINT "generaciones_puntaje_desglose_check" CHECK (("jsonb_typeof"("puntaje_desglose") = 'object'::"text")),
    CONSTRAINT "generaciones_puntaje_desglose_sprint5_ck" CHECK (("jsonb_typeof"("puntaje_desglose") = 'object'::"text")),
    CONSTRAINT "generaciones_resultado_check" CHECK (("jsonb_typeof"("resultado") = 'object'::"text")),
    CONSTRAINT "generaciones_tiempo_primera_solucion_ms_check" CHECK ((("tiempo_primera_solucion_ms" IS NULL) OR ("tiempo_primera_solucion_ms" >= 0))),
    CONSTRAINT "generaciones_total_sesiones_pendientes_check" CHECK (("total_sesiones_pendientes" >= 0)),
    CONSTRAINT "generaciones_total_violaciones_blandas_check" CHECK (("total_violaciones_blandas" >= 0)),
    CONSTRAINT "generaciones_total_violaciones_duras_check" CHECK (("total_violaciones_duras" >= 0))
);`,
  },
  {
    id: 'tabla-mensajes_generacion',
    nombre: 'mensajes_generacion',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Bitácora de una corrida: mensajes por severidad, con código y entidad afectada.',
    detalle: '',
    nota: '9 columnas',
    tabla: 'mensajes_generacion',
    linea: 6434,
    claves: 'id generacion_id severidad codigo mensaje entidad entidad_id datos creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."mensajes_generacion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "generacion_id" "uuid" NOT NULL,
    "severidad" "horarios"."nivel_severidad" DEFAULT 'media'::"horarios"."nivel_severidad" NOT NULL,
    "codigo" character varying(80),
    "mensaje" "text" NOT NULL,
    "entidad" character varying(120),
    "entidad_id" "uuid",
    "datos" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-plan_carreras',
    nombre: 'plan_carreras',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Puente N:M. Qué carreras entran en el alcance de un plan de horario.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'plan_carreras',
    linea: 6518,
    claves: 'plan_id carrera_id creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."plan_carreras" (
    "plan_id" "uuid" NOT NULL,
    "carrera_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-plan_jornadas',
    nombre: 'plan_jornadas',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Puente N:M. Qué jornadas entran en el alcance de un plan de horario.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'plan_jornadas',
    linea: 6529,
    claves: 'plan_id jornada_id creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."plan_jornadas" (
    "plan_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-restricciones_horario',
    nombre: 'restricciones_horario',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Catálogo de reglas del motor, con su peso y si es dura (obligatoria) o blanda (preferencia).',
    detalle: '',
    nota: '6 columnas',
    tabla: 'restricciones_horario',
    linea: 6598,
    claves: 'id nombre descripcion peso es_dura esta_activa',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."restricciones_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(120) NOT NULL,
    "descripcion" "text" NOT NULL,
    "peso" numeric(12,4) NOT NULL,
    "es_dura" boolean NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    CONSTRAINT "restricciones_horario_peso_check" CHECK (("peso" >= (0)::numeric))
);`,
  },
  {
    id: 'tabla-sesiones_no_asignadas',
    nombre: 'sesiones_no_asignadas',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Lo que el motor no pudo colocar y por qué, con los recursos que faltaron y una sugerencia de resolución.',
    detalle: '',
    nota: '8 columnas',
    tabla: 'sesiones_no_asignadas',
    linea: 6733,
    claves: 'id horario_id curso_id cohorte_id motivo_no_asignacion recursos_faltantes sugerencia_resolucion creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."sesiones_no_asignadas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL,
    "motivo_no_asignacion" "text" NOT NULL,
    "recursos_faltantes" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "sugerencia_resolucion" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "sesiones_no_asignadas_recursos_faltantes_check" CHECK (("jsonb_typeof"("recursos_faltantes") = 'array'::"text"))
);`,
  },
  {
    id: 'tabla-sugerencias_seccion',
    nombre: 'sugerencias_seccion',
    cat: 'tabla',
    grupo: 'Motor',
    desc: 'Avisos del tipo «este grupo no cabe, abrí otra sección», con la matrícula detectada, la capacidad disponible y su estado de resolución.',
    detalle: '',
    nota: '14 columnas · borrado lógico',
    tabla: 'sugerencias_seccion',
    linea: 6750,
    claves: 'id horario_id cohorte_id curso_id matricula_detectada capacidad_maxima_disponible seccion_sugerida motivo estado solicitada_por_id resuelta_por_id resuelta_en creado_en eliminado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."sugerencias_seccion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL,
    "curso_id" "uuid",
    "matricula_detectada" integer NOT NULL,
    "capacidad_maxima_disponible" integer NOT NULL,
    "seccion_sugerida" character varying(20) NOT NULL,
    "motivo" "text" NOT NULL,
    "estado" "horarios"."estado_sugerencia_seccion" DEFAULT 'pendiente'::"horarios"."estado_sugerencia_seccion" NOT NULL,
    "solicitada_por_id" "uuid",
    "resuelta_por_id" "uuid",
    "resuelta_en" timestamp with time zone,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    CONSTRAINT "sugerencias_seccion_capacidad_maxima_disponible_check" CHECK (("capacidad_maxima_disponible" >= 0)),
    CONSTRAINT "sugerencias_seccion_check" CHECK (((("estado" = ANY (ARRAY['aprobada'::"horarios"."estado_sugerencia_seccion", 'rechazada'::"horarios"."estado_sugerencia_seccion", 'aplicada'::"horarios"."estado_sugerencia_seccion"])) AND ("resuelta_por_id" IS NOT NULL) AND ("resuelta_en" IS NOT NULL)) OR ("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_sugerencia_seccion", 'cancelada'::"horarios"."estado_sugerencia_seccion"])))),
    CONSTRAINT "sugerencias_seccion_matricula_detectada_check" CHECK (("matricula_detectada" >= 0)),
    CONSTRAINT "sugerencias_seccion_motivo_check" CHECK (("length"(TRIM(BOTH FROM "motivo")) > 0)),
    CONSTRAINT "sugerencias_seccion_seccion_sugerida_check" CHECK (("length"(TRIM(BOTH FROM "seccion_sugerida")) > 0))
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
    linea: 6032,
    claves: 'id version_horario_id sesion_id campo_modificado valor_anterior valor_nuevo creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."cambios_detectados" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "version_horario_id" "uuid",
    "sesion_id" "uuid" NOT NULL,
    "campo_modificado" character varying(100) NOT NULL,
    "valor_anterior" "text",
    "valor_nuevo" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
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
    linea: 6088,
    claves: 'conflicto_id sesion_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."conflicto_sesiones" (
    "conflicto_id" "uuid" NOT NULL,
    "sesion_id" "uuid" NOT NULL
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
    linea: 6098,
    claves: 'id horario_id tipo descripcion severidad es_restriccion_dura creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."conflictos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "tipo" character varying(100) NOT NULL,
    "descripcion" "text" NOT NULL,
    "severidad" "horarios"."nivel_severidad" NOT NULL,
    "es_restriccion_dura" boolean NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-historial_estados_horario',
    nombre: 'historial_estados_horario',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Bitácora de transiciones de estado de un horario: de qué estado a cuál, quién y por qué.',
    detalle: '',
    nota: '7 columnas',
    tabla: 'historial_estados_horario',
    linea: 6327,
    claves: 'id horario_id estado_anterior estado_nuevo cambiado_por_id motivo cambiado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."historial_estados_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "estado_anterior" "horarios"."estado_horario",
    "estado_nuevo" "horarios"."estado_horario" NOT NULL,
    "cambiado_por_id" "uuid",
    "motivo" "text" NOT NULL,
    "cambiado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "historial_estados_horario_check" CHECK ((("estado_anterior" IS NULL) OR ("estado_anterior" <> "estado_nuevo"))),
    CONSTRAINT "historial_estados_horario_motivo_check" CHECK (("length"(TRIM(BOTH FROM "motivo")) > 0))
);`,
  },
  {
    id: 'tabla-horarios',
    nombre: 'horarios',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Cabecera de un plan de horario: período, tipo (clases o exámenes), versión, estado, quién lo generó, aprobó y publicó, costo y violaciones duras.',
    detalle: '',
    nota: '20 columnas · borrado lógico · bloqueo optimista',
    tabla: 'horarios',
    linea: 6344,
    claves: 'id periodo_id tipo_plan horario_origen_id numero_version estado fecha_generacion fecha_aprobacion fecha_publicacion costo_total_calculado cantidad_violaciones_duras configuracion_plan generado_por_id aprobado_por_id publicado_por_id motivo_estado creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."horarios" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "tipo_plan" "horarios"."tipo_plan_horario" DEFAULT 'clases'::"horarios"."tipo_plan_horario" NOT NULL,
    "horario_origen_id" "uuid",
    "numero_version" integer NOT NULL,
    "estado" "horarios"."estado_horario" DEFAULT 'borrador'::"horarios"."estado_horario" NOT NULL,
    "fecha_generacion" timestamp with time zone,
    "fecha_aprobacion" timestamp with time zone,
    "fecha_publicacion" timestamp with time zone,
    "costo_total_calculado" numeric(14,4) DEFAULT 0 NOT NULL,
    "cantidad_violaciones_duras" integer DEFAULT 0 NOT NULL,
    "configuracion_plan" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "generado_por_id" "uuid",
    "aprobado_por_id" "uuid",
    "publicado_por_id" "uuid",
    "motivo_estado" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "horarios_cantidad_violaciones_duras_check" CHECK (("cantidad_violaciones_duras" >= 0)),
    CONSTRAINT "horarios_check" CHECK ((("horario_origen_id" IS NULL) OR ("horario_origen_id" <> "id"))),
    CONSTRAINT "horarios_check1" CHECK ((("fecha_aprobacion" IS NULL) OR ("fecha_generacion" IS NULL) OR ("fecha_aprobacion" >= "fecha_generacion"))),
    CONSTRAINT "horarios_check2" CHECK ((("fecha_publicacion" IS NULL) OR (("fecha_aprobacion" IS NOT NULL) AND ("fecha_publicacion" >= "fecha_aprobacion")))),
    CONSTRAINT "horarios_configuracion_plan_check" CHECK (("jsonb_typeof"("configuracion_plan") = 'object'::"text")),
    CONSTRAINT "horarios_numero_version_check" CHECK (("numero_version" > 0))
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
    linea: 6613,
    claves: 'resultado_edicion_id conflicto_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."resultado_edicion_conflictos" (
    "resultado_edicion_id" "uuid" NOT NULL,
    "conflicto_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-resultados_edicion',
    nombre: 'resultados_edicion',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Resultado de mover una sesión a mano: la solicitud, el vecindario recalculado, las sesiones movidas y el costo antes y después.',
    detalle: '',
    nota: '15 columnas · idempotencia',
    tabla: 'resultados_edicion',
    linea: 6623,
    claves: 'id horario_id horario_origen_id sesion_fijada_id fue_exitoso mensaje_resultado clave_solicitud solicitud_edicion sesiones_vecindario sesiones_movidas costo_antes costo_despues tiempo_reparacion_ms creado_por_id creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."resultados_edicion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "horario_origen_id" "uuid",
    "sesion_fijada_id" "uuid",
    "fue_exitoso" boolean NOT NULL,
    "mensaje_resultado" "text" NOT NULL,
    "clave_solicitud" character varying(120),
    "solicitud_edicion" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "sesiones_vecindario" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "sesiones_movidas" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "costo_antes" numeric(14,4),
    "costo_despues" numeric(14,4),
    "tiempo_reparacion_ms" bigint,
    "creado_por_id" "uuid",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "resultados_edicion_sesiones_movidas_check" CHECK (("jsonb_typeof"("sesiones_movidas") = 'array'::"text")),
    CONSTRAINT "resultados_edicion_sesiones_vecindario_check" CHECK (("jsonb_typeof"("sesiones_vecindario") = 'array'::"text")),
    CONSTRAINT "resultados_edicion_solicitud_edicion_check" CHECK (("jsonb_typeof"("solicitud_edicion") = 'object'::"text")),
    CONSTRAINT "resultados_edicion_tiempo_reparacion_ms_check" CHECK ((("tiempo_reparacion_ms" IS NULL) OR ("tiempo_reparacion_ms" >= 0)))
);`,
  },
  {
    id: 'tabla-sesion_cohortes',
    nombre: 'sesion_cohortes',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Qué cohortes asisten a cada sesión. Repite día, bloques y minutos a propósito, para poder vigilar solapes por grupo y leer su horario sin joins.',
    detalle: '',
    nota: '13 columnas · columnas generadas',
    tabla: 'sesion_cohortes',
    linea: 6674,
    claves: 'sesion_id cohorte_id curso_en_pensum_id curso_visible_id horario_id fecha_sesion dia indice_slot_inicio duracion_slots rango_slots minuto_inicio_dia minuto_fin_dia rango_minutos',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."sesion_cohortes" (
    "sesion_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL,
    "curso_en_pensum_id" "uuid" NOT NULL,
    "curso_visible_id" "uuid" NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "fecha_sesion" "date",
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot_inicio" integer NOT NULL,
    "duracion_slots" integer NOT NULL,
    "rango_slots" "int4range" GENERATED ALWAYS AS ("int4range"("indice_slot_inicio", ("indice_slot_inicio" + "duracion_slots"), '[)'::"text")) STORED,
    "minuto_inicio_dia" integer NOT NULL,
    "minuto_fin_dia" integer NOT NULL,
    "rango_minutos" "int4range" GENERATED ALWAYS AS ("int4range"("minuto_inicio_dia", "minuto_fin_dia", '[)'::"text")) STORED,
    CONSTRAINT "sesion_cohortes_check" CHECK (("minuto_fin_dia" > "minuto_inicio_dia")),
    CONSTRAINT "sesion_cohortes_duracion_slots_check" CHECK (("duracion_slots" > 0)),
    CONSTRAINT "sesion_cohortes_indice_slot_inicio_check" CHECK (("indice_slot_inicio" > 0)),
    CONSTRAINT "sesion_cohortes_minuto_fin_dia_check" CHECK (("minuto_fin_dia" <= 1440)),
    CONSTRAINT "sesion_cohortes_minuto_inicio_dia_check" CHECK (("minuto_inicio_dia" >= 0))
);`,
  },
  {
    id: 'tabla-sesiones',
    nombre: 'sesiones',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Cada clase colocada en el calendario: horario, curso, docente, aula, jornada, día y bloques. Sus rangos son columnas generadas y tres restricciones de exclusión impiden solapes de docente, aula y cohorte.',
    detalle: '',
    nota: '19 columnas · columnas generadas',
    tabla: 'sesiones',
    linea: 6700,
    claves: 'id horario_id curso_id docente_id aula_id jornada_id fecha_sesion dia indice_slot_inicio duracion_slots rango_slots minuto_inicio_dia minuto_fin_dia rango_minutos esta_fijada es_area_comun agrupacion_area_comun_id creado_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."sesiones" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL,
    "docente_id" "uuid" NOT NULL,
    "aula_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "fecha_sesion" "date",
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot_inicio" integer NOT NULL,
    "duracion_slots" integer NOT NULL,
    "rango_slots" "int4range" GENERATED ALWAYS AS ("int4range"("indice_slot_inicio", ("indice_slot_inicio" + "duracion_slots"), '[)'::"text")) STORED,
    "minuto_inicio_dia" integer NOT NULL,
    "minuto_fin_dia" integer NOT NULL,
    "rango_minutos" "int4range" GENERATED ALWAYS AS ("int4range"("minuto_inicio_dia", "minuto_fin_dia", '[)'::"text")) STORED,
    "esta_fijada" boolean DEFAULT false NOT NULL,
    "es_area_comun" boolean DEFAULT false NOT NULL,
    "agrupacion_area_comun_id" "uuid",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "sesiones_check" CHECK (("minuto_fin_dia" > "minuto_inicio_dia")),
    CONSTRAINT "sesiones_check1" CHECK ((("es_area_comun" AND ("agrupacion_area_comun_id" IS NOT NULL)) OR ((NOT "es_area_comun") AND ("agrupacion_area_comun_id" IS NULL)))),
    CONSTRAINT "sesiones_duracion_slots_check" CHECK (("duracion_slots" > 0)),
    CONSTRAINT "sesiones_indice_slot_inicio_check" CHECK (("indice_slot_inicio" > 0)),
    CONSTRAINT "sesiones_minuto_fin_dia_check" CHECK (("minuto_fin_dia" <= 1440)),
    CONSTRAINT "sesiones_minuto_inicio_dia_check" CHECK (("minuto_inicio_dia" >= 0))
);`,
  },
  {
    id: 'tabla-versiones_horario',
    nombre: 'versiones_horario',
    cat: 'tabla',
    grupo: 'Horarios',
    desc: 'Instantánea JSON de las sesiones de un horario, numerada, para historial y comparación.',
    detalle: '',
    nota: '7 columnas',
    tabla: 'versiones_horario',
    linea: 6813,
    claves: 'id horario_id numero_version fecha_creacion motivo_cambio creado_por_id instantanea_sesiones',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."versiones_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "numero_version" integer NOT NULL,
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "motivo_cambio" "text" NOT NULL,
    "creado_por_id" "uuid",
    "instantanea_sesiones" "jsonb" NOT NULL,
    CONSTRAINT "versiones_horario_instantanea_sesiones_check" CHECK (("jsonb_typeof"("instantanea_sesiones") = ANY (ARRAY['array'::"text", 'object'::"text"]))),
    CONSTRAINT "versiones_horario_numero_version_check" CHECK (("numero_version" > 0))
);`,
  },
  {
    id: 'tabla-importacion_errores',
    nombre: 'importacion_errores',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Qué falló en una importación, con hoja, fila, columna, código de error y el valor recibido.',
    detalle: '',
    nota: '8 columnas',
    tabla: 'importacion_errores',
    linea: 6378,
    claves: 'id importacion_id hoja fila columna codigo_error mensaje valor_recibido',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."importacion_errores" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "importacion_id" "uuid" NOT NULL,
    "hoja" character varying(120),
    "fila" integer,
    "columna" character varying(120),
    "codigo_error" character varying(80) NOT NULL,
    "mensaje" "text" NOT NULL,
    "valor_recibido" "text",
    CONSTRAINT "importacion_errores_fila_check" CHECK ((("fila" IS NULL) OR ("fila" > 0)))
);`,
  },
  {
    id: 'tabla-importaciones',
    nombre: 'importaciones',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Cabecera de una carga masiva: archivo, hash, plantilla y versión, clave de idempotencia, estado y conteo de filas válidas e inválidas.',
    detalle: '',
    nota: '15 columnas · idempotencia',
    tabla: 'importaciones',
    linea: 5931,
    claves: 'id tipo_archivo nombre_archivo hash_archivo plantilla_id plantilla_version clave_solicitud estado total_filas filas_validas filas_invalidas solicitada_por_id creada_en finalizada_en resumen',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."importaciones" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tipo_archivo" "horarios"."tipo_archivo_importacion" NOT NULL,
    "nombre_archivo" character varying(255) NOT NULL,
    "hash_archivo" character varying(128) NOT NULL,
    "plantilla_id" "uuid",
    "plantilla_version" character varying(50),
    "clave_solicitud" character varying(120),
    "estado" "horarios"."estado_importacion" DEFAULT 'recibida'::"horarios"."estado_importacion" NOT NULL,
    "total_filas" integer DEFAULT 0 NOT NULL,
    "filas_validas" integer DEFAULT 0 NOT NULL,
    "filas_invalidas" integer DEFAULT 0 NOT NULL,
    "solicitada_por_id" "uuid",
    "creada_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "finalizada_en" timestamp with time zone,
    "resumen" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    CONSTRAINT "importaciones_check" CHECK ((("filas_validas" + "filas_invalidas") <= "total_filas")),
    CONSTRAINT "importaciones_filas_invalidas_check" CHECK (("filas_invalidas" >= 0)),
    CONSTRAINT "importaciones_filas_validas_check" CHECK (("filas_validas" >= 0)),
    CONSTRAINT "importaciones_resumen_check" CHECK (("jsonb_typeof"("resumen") = 'object'::"text")),
    CONSTRAINT "importaciones_total_filas_check" CHECK (("total_filas" >= 0))
);`,
  },
  {
    id: 'tabla-plantillas_importacion',
    nombre: 'plantillas_importacion',
    cat: 'tabla',
    grupo: 'Importación',
    desc: 'Formatos de archivo aceptados: código, versión, reglas de validación y si está vigente.',
    detalle: '',
    nota: '10 columnas',
    tabla: 'plantillas_importacion',
    linea: 6540,
    claves: 'id codigo version descripcion formatos_soportados reglas ruta_guia esta_vigente creado_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."plantillas_importacion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(80) NOT NULL,
    "version" character varying(50) NOT NULL,
    "descripcion" "text",
    "formatos_soportados" "horarios"."tipo_archivo_importacion"[] NOT NULL,
    "reglas" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "ruta_guia" "text",
    "esta_vigente" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "plantillas_importacion_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "plantillas_importacion_formatos_soportados_check" CHECK (("cardinality"("formatos_soportados") > 0)),
    CONSTRAINT "plantillas_importacion_reglas_check" CHECK (("jsonb_typeof"("reglas") = 'object'::"text"))
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
    linea: 6506,
    claves: 'id recurso accion descripcion',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."permisos_acceso" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recurso" character varying(100) NOT NULL,
    "accion" "horarios"."accion_permiso" NOT NULL,
    "descripcion" "text"
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
    linea: 6650,
    claves: 'rol_id permiso_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."rol_permisos" (
    "rol_id" "uuid" NOT NULL,
    "permiso_id" "uuid" NOT NULL
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
    linea: 6660,
    claves: 'id nombre descripcion creado_en actualizado_en eliminado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "descripcion" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone
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
    linea: 6777,
    claves: 'usuario_id facultad_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."usuario_facultades" (
    "usuario_id" "uuid" NOT NULL,
    "facultad_id" "uuid" NOT NULL
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
    linea: 6787,
    claves: 'usuario_id rol_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."usuario_roles" (
    "usuario_id" "uuid" NOT NULL,
    "rol_id" "uuid" NOT NULL
);`,
  },
  {
    id: 'tabla-usuarios',
    nombre: 'usuarios',
    cat: 'tabla',
    grupo: 'Seguridad',
    desc: 'Usuarios del sistema. Enlaza con `auth.users` de Supabase por `auth_user_id` y puede apuntar al docente o a la cohorte de la persona. `debe_cambiar_contrasena` obliga a una cuenta docente recién creada a cambiar la contraseña inicial.',
    detalle: '',
    nota: '15 columnas · borrado lógico · bloqueo optimista',
    tabla: 'usuarios',
    linea: 5646,
    claves: 'id auth_user_id tipo nombre_completo correo_institucional estado docente_id cohorte_id carnet fecha_creacion actualizado_en fecha_ultimo_acceso eliminado_en version_fila debe_cambiar_contrasena',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."usuarios" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "auth_user_id" "uuid",
    "tipo" "horarios"."tipo_usuario" NOT NULL,
    "nombre_completo" character varying(200) NOT NULL,
    "correo_institucional" character varying(254) NOT NULL,
    "estado" "horarios"."estado_usuario" DEFAULT 'activo'::"horarios"."estado_usuario" NOT NULL,
    "docente_id" "uuid",
    "cohorte_id" "uuid",
    "carnet" character varying(50),
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fecha_ultimo_acceso" timestamp with time zone,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    "debe_cambiar_contrasena" boolean DEFAULT false NOT NULL,
    CONSTRAINT "usuarios_check" CHECK (((("tipo" = 'docente'::"horarios"."tipo_usuario") AND ("docente_id" IS NOT NULL) AND ("cohorte_id" IS NULL)) OR (("tipo" = 'alumno'::"horarios"."tipo_usuario") AND ("cohorte_id" IS NOT NULL) AND ("docente_id" IS NULL)) OR (("tipo" = ANY (ARRAY['superadministrador'::"horarios"."tipo_usuario", 'coordinador_academico'::"horarios"."tipo_usuario", 'decano'::"horarios"."tipo_usuario"])) AND ("docente_id" IS NULL) AND ("cohorte_id" IS NULL)))),
    CONSTRAINT "usuarios_correo_institucional_check" CHECK ((("correo_institucional")::"text" = "lower"(TRIM(BOTH FROM "correo_institucional"))))
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
    linea: 5627,
    claves: 'id usuario_id fecha accion entidad entidad_id valores_anteriores valores_nuevos motivo direccion_ip user_agent',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."auditoria" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "usuario_id" "uuid",
    "fecha" timestamp with time zone DEFAULT "now"() NOT NULL,
    "accion" character varying(80) NOT NULL,
    "entidad" character varying(120) NOT NULL,
    "entidad_id" "uuid",
    "valores_anteriores" "jsonb",
    "valores_nuevos" "jsonb",
    "motivo" "text",
    "direccion_ip" "inet",
    "user_agent" "text"
);`,
  },
  {
    id: 'tabla-notificacion_destinatarios',
    nombre: 'notificacion_destinatarios',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Bandeja de cada destinatario: una fila por mensaje y usuario, con estado no leída, leída o descartada y la fecha de cada cambio.',
    detalle: '',
    nota: '8 columnas',
    tabla: 'notificacion_destinatarios',
    linea: 6451,
    claves: 'id notificacion_id destinatario_usuario_id estado enviada_en leida_en descartada_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."notificacion_destinatarios" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "notificacion_id" "uuid" NOT NULL,
    "destinatario_usuario_id" "uuid" NOT NULL,
    "estado" "horarios"."estado_notificacion_destinatario" DEFAULT 'no_leida'::"horarios"."estado_notificacion_destinatario" NOT NULL,
    "enviada_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "leida_en" timestamp with time zone,
    "descartada_en" timestamp with time zone,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "notificacion_destinatarios_fechas_check" CHECK (((("estado" = 'no_leida'::"horarios"."estado_notificacion_destinatario") AND ("leida_en" IS NULL) AND ("descartada_en" IS NULL)) OR (("estado" = 'leida'::"horarios"."estado_notificacion_destinatario") AND ("leida_en" IS NOT NULL) AND ("descartada_en" IS NULL)) OR (("estado" = 'descartada'::"horarios"."estado_notificacion_destinatario") AND ("descartada_en" IS NOT NULL))))
);`,
  },
  {
    id: 'tabla-notificaciones',
    nombre: 'notificaciones',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Mensajes internos: remitente, asunto, cuerpo, prioridad (normal, importante, urgente) y canal. El estado de lectura vive por destinatario en `notificacion_destinatarios`.',
    detalle: '',
    nota: '12 columnas · borrado lógico · idempotencia',
    tabla: 'notificaciones',
    linea: 6468,
    claves: 'id plantilla_id tipo_notificacion asunto mensaje_cuerpo canal_envio clave_solicitud fecha_creacion remitente_usuario_id prioridad actualizado_en eliminado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."notificaciones" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "plantilla_id" "uuid",
    "tipo_notificacion" character varying(100) NOT NULL,
    "asunto" "text" NOT NULL,
    "mensaje_cuerpo" "text" NOT NULL,
    "canal_envio" "horarios"."canal_notificacion" DEFAULT 'interno'::"horarios"."canal_notificacion" NOT NULL,
    "clave_solicitud" character varying(120),
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "remitente_usuario_id" "uuid",
    "prioridad" "horarios"."prioridad_notificacion" DEFAULT 'normal'::"horarios"."prioridad_notificacion" NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone
);`,
  },
  {
    id: 'tabla-plantillas_notificacion',
    nombre: 'plantillas_notificacion',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Plantillas de aviso: código, asunto, cuerpo y las variables que exige.',
    detalle: '',
    nota: '8 columnas',
    tabla: 'plantillas_notificacion',
    linea: 6561,
    claves: 'id codigo_plantilla plantilla_asunto plantilla_cuerpo variables_requeridas esta_activa creado_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."plantillas_notificacion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo_plantilla" character varying(80) NOT NULL,
    "plantilla_asunto" "text" NOT NULL,
    "plantilla_cuerpo" "text" NOT NULL,
    "variables_requeridas" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "plantillas_notificacion_codigo_plantilla_check" CHECK ((("codigo_plantilla")::"text" = "upper"(TRIM(BOTH FROM "codigo_plantilla")))),
    CONSTRAINT "plantillas_notificacion_variables_requeridas_check" CHECK (("jsonb_typeof"("variables_requeridas") = 'array'::"text"))
);`,
  },
  {
    id: 'tabla-reportes',
    nombre: 'reportes',
    cat: 'tabla',
    grupo: 'Operación',
    desc: 'Exportaciones generadas (PDF o XLSX): título, archivo, quién lo pidió y de qué horario o corrida salió.',
    detalle: '',
    nota: '10 columnas',
    tabla: 'reportes',
    linea: 6579,
    claves: 'id titulo formato nombre_archivo contenido_binario ruta_almacenamiento fecha_generacion generado_por_id horario_id generacion_id',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."reportes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "titulo" character varying(200) NOT NULL,
    "formato" "horarios"."formato_reporte" NOT NULL,
    "nombre_archivo" character varying(255) NOT NULL,
    "contenido_binario" "bytea",
    "ruta_almacenamiento" "text",
    "fecha_generacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "generado_por_id" "uuid",
    "horario_id" "uuid",
    "generacion_id" "uuid",
    CONSTRAINT "reportes_check" CHECK ((("contenido_binario" IS NOT NULL) OR ("ruta_almacenamiento" IS NOT NULL)))
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
    linea: 5974,
    claves: 'id docente_id curso_id carrera_id facultad_id jornada_id fecha_asignacion actualizado_en esta_vigente eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."asignaciones_docente_curso" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "docente_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL,
    "carrera_id" "uuid",
    "facultad_id" "uuid",
    "jornada_id" "uuid",
    "fecha_asignacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "esta_vigente" boolean DEFAULT true NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "asignaciones_docente_curso_sin_alcance_redundante" CHECK ((("carrera_id" IS NULL) AND ("facultad_id" IS NULL)))
);`,
  },
  {
    id: 'tabla-disponibilidad_docente_slots',
    nombre: 'disponibilidad_docente_slots',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'La disponibilidad expandida a bloques concretos (jornada, día, índice de bloque). Es lo que consulta el motor.',
    detalle: '',
    nota: '5 columnas',
    tabla: 'disponibilidad_docente_slots',
    linea: 6157,
    claves: 'disponibilidad_id jornada_id dia indice_slot esta_disponible',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."disponibilidad_docente_slots" (
    "disponibilidad_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot" integer NOT NULL,
    "esta_disponible" boolean DEFAULT true NOT NULL,
    CONSTRAINT "disponibilidad_docente_slots_indice_slot_check" CHECK (("indice_slot" > 0))
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
    linea: 6171,
    claves: 'id docente_id periodo_id fecha_registro esta_confirmada actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."disponibilidades_docente" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "docente_id" "uuid" NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "fecha_registro" timestamp with time zone DEFAULT "now"() NOT NULL,
    "esta_confirmada" boolean DEFAULT false NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-docente_facultades',
    nombre: 'docente_facultades',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Puente N:M. Facultades a las que pertenece cada docente; sustituye la pertenencia a una sola facultad.',
    detalle: '',
    nota: '3 columnas',
    tabla: 'docente_facultades',
    linea: 6185,
    claves: 'docente_id facultad_id creado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."docente_facultades" (
    "docente_id" "uuid" NOT NULL,
    "facultad_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);`,
  },
  {
    id: 'tabla-docentes',
    nombre: 'docentes',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Plantilla docente: código, nombre, correo, prioridad y carga mínima y máxima de cursos.',
    detalle: '',
    nota: '13 columnas · borrado lógico · bloqueo optimista',
    tabla: 'docentes',
    linea: 6203,
    claves: 'id codigo nombre_completo correo telefono nivel_prioridad carga_minima_cursos carga_maxima_cursos esta_activo creado_en actualizado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."docentes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "codigo" character varying(30) NOT NULL,
    "nombre_completo" character varying(200) NOT NULL,
    "correo" character varying(254) NOT NULL,
    "telefono" character varying(50),
    "nivel_prioridad" integer DEFAULT 0 NOT NULL,
    "carga_minima_cursos" integer DEFAULT 1 NOT NULL,
    "carga_maxima_cursos" integer DEFAULT 6 NOT NULL,
    "esta_activo" boolean DEFAULT true NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "docentes_carga_minima_cursos_check" CHECK (("carga_minima_cursos" >= 1)),
    CONSTRAINT "docentes_check" CHECK (("carga_maxima_cursos" >= "carga_minima_cursos")),
    CONSTRAINT "docentes_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "docentes_correo_check" CHECK ((("correo")::"text" = "lower"(TRIM(BOTH FROM "correo"))))
);`,
  },
  {
    id: 'tabla-eventos_sustitucion',
    nombre: 'eventos_sustitucion',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Ausencias, reemplazos, cancelaciones y recuperaciones sobre una sesión concreta, con sus fechas y el docente entrante.',
    detalle: '',
    nota: '23 columnas · borrado lógico · bloqueo optimista',
    tabla: 'eventos_sustitucion',
    linea: 6228,
    claves: 'id tipo sesion_afectada_id docente_original_id docente_entrante_id fecha_registro actualizado_en registrado_por_id motivo_evento estado fecha_inicio fecha_fin fecha_cambio fecha_ausencia fecha_recuperacion recuperacion_dia recuperacion_indice_slot_inicio recuperacion_duracion_slots fecha_cancelada motivo_anulacion anulado_en eliminado_en version_fila',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."eventos_sustitucion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tipo" "horarios"."tipo_evento_sustitucion" NOT NULL,
    "sesion_afectada_id" "uuid" NOT NULL,
    "docente_original_id" "uuid" NOT NULL,
    "docente_entrante_id" "uuid",
    "fecha_registro" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "registrado_por_id" "uuid",
    "motivo_evento" "text" NOT NULL,
    "estado" "horarios"."estado_evento_sustitucion" DEFAULT 'activo'::"horarios"."estado_evento_sustitucion" NOT NULL,
    "fecha_inicio" "date",
    "fecha_fin" "date",
    "fecha_cambio" "date",
    "fecha_ausencia" "date",
    "fecha_recuperacion" "date",
    "recuperacion_dia" "horarios"."dia_semana",
    "recuperacion_indice_slot_inicio" integer,
    "recuperacion_duracion_slots" integer,
    "fecha_cancelada" "date",
    "motivo_anulacion" "text",
    "anulado_en" timestamp with time zone,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "eventos_sustitucion_check" CHECK ((("docente_entrante_id" IS NULL) OR ("docente_entrante_id" <> "docente_original_id"))),
    CONSTRAINT "eventos_sustitucion_check1" CHECK ((("fecha_fin" IS NULL) OR ("fecha_inicio" IS NULL) OR ("fecha_fin" >= "fecha_inicio"))),
    CONSTRAINT "eventos_sustitucion_check2" CHECK (((("tipo" = 'sustitucion_temporal'::"horarios"."tipo_evento_sustitucion") AND ("docente_entrante_id" IS NOT NULL) AND ("fecha_inicio" IS NOT NULL) AND ("fecha_fin" IS NOT NULL)) OR (("tipo" = 'sustitucion_permanente'::"horarios"."tipo_evento_sustitucion") AND ("docente_entrante_id" IS NOT NULL) AND ("fecha_cambio" IS NOT NULL)) OR (("tipo" = 'permiso_ausencia'::"horarios"."tipo_evento_sustitucion") AND ("fecha_ausencia" IS NOT NULL)) OR (("tipo" = 'cancelacion_sesion'::"horarios"."tipo_evento_sustitucion") AND ("fecha_cancelada" IS NOT NULL)))),
    CONSTRAINT "eventos_sustitucion_motivo_evento_check" CHECK (("length"(TRIM(BOTH FROM "motivo_evento")) > 0)),
    CONSTRAINT "eventos_sustitucion_recuperacion_duracion_slots_check" CHECK ((("recuperacion_duracion_slots" IS NULL) OR ("recuperacion_duracion_slots" > 0))),
    CONSTRAINT "eventos_sustitucion_recuperacion_indice_slot_inicio_check" CHECK ((("recuperacion_indice_slot_inicio" IS NULL) OR ("recuperacion_indice_slot_inicio" > 0)))
);`,
  },
  {
    id: 'tabla-ventanas_disponibilidad',
    nombre: 'ventanas_disponibilidad',
    cat: 'tabla',
    grupo: 'Docentes',
    desc: 'Ventana de captura por período: entre qué fechas los docentes pueden declarar su disponibilidad, y en qué estado está (programada, abierta, cerrada, cancelada).',
    detalle: '',
    nota: '7 columnas',
    tabla: 'ventanas_disponibilidad',
    linea: 6797,
    claves: 'id periodo_id fecha_apertura fecha_cierre estado creado_en actualizado_en',
    params: [],
    pasos: [],
    sql: `CREATE TABLE "horarios"."ventanas_disponibilidad" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "fecha_apertura" timestamp with time zone NOT NULL,
    "fecha_cierre" timestamp with time zone NOT NULL,
    "estado" "horarios"."estado_ventana_disponibilidad" DEFAULT 'programada'::"horarios"."estado_ventana_disponibilidad" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "ventanas_disponibilidad_check" CHECK (("fecha_cierre" > "fecha_apertura"))
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
    linea: 81,
    claves: 'activa inactiva egresada archivada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_cohorte" AS ENUM (
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
    linea: 93,
    claves: 'activo anulado finalizado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_evento_sustitucion" AS ENUM (
    'activo',
    'anulado',
    'finalizado'
);`,
  },
  {
    id: 'tipo-estado_generacion',
    nombre: 'estado_generacion',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de una corrida del motor: pendiente, generando, completada, fallida, inviable o cancelada.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '6 valores admitidos',
    tabla: '',
    linea: 104,
    claves: 'pendiente generando completada fallida inviable cancelada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_generacion" AS ENUM (
    'pendiente',
    'generando',
    'completada',
    'fallida',
    'inviable',
    'cancelada'
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
    linea: 118,
    claves: 'borrador generando generado en_revision pendiente_aprobacion aprobado publicado archivado fallido inviable',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_horario" AS ENUM (
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
    linea: 136,
    claves: 'recibida validando aplicada rechazada fallida',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_importacion" AS ENUM (
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
    desc: 'Estado heredado de un aviso: pendiente, enviada, leída o fallida. La bandeja actual usa `estado_notificacion_destinatario`.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '4 valores admitidos',
    tabla: '',
    linea: 149,
    claves: 'pendiente enviada leida fallida',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_notificacion" AS ENUM (
    'pendiente',
    'enviada',
    'leida',
    'fallida'
);`,
  },
  {
    id: 'tipo-estado_notificacion_destinatario',
    nombre: 'estado_notificacion_destinatario',
    cat: 'tipo',
    grupo: 'Estados',
    desc: 'Estado de un mensaje en la bandeja de cada destinatario: no leída, leída o descartada.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '3 valores admitidos',
    tabla: '',
    linea: 161,
    claves: 'no_leida leida descartada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_notificacion_destinatario" AS ENUM (
    'no_leida',
    'leida',
    'descartada'
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
    linea: 172,
    claves: 'borrador vigente en_retiro archivado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_pensum" AS ENUM (
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
    linea: 184,
    claves: 'borrador vigente cerrado archivado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_periodo" AS ENUM (
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
    linea: 196,
    claves: 'pendiente aprobada rechazada aplicada cancelada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_sugerencia_seccion" AS ENUM (
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
    linea: 209,
    claves: 'activo inactivo bloqueado',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_usuario" AS ENUM (
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
    linea: 220,
    claves: 'programada abierta cerrada cancelada',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."estado_ventana_disponibilidad" AS ENUM (
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
    linea: 265,
    claves: 'csv xlsx',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_archivo_importacion" AS ENUM (
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
    linea: 275,
    claves: 'teorica laboratorio mixta virtual',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_aula" AS ENUM (
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
    linea: 287,
    claves: 'sustitucion_temporal sustitucion_permanente permiso_ausencia cancelacion_sesion',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_evento_sustitucion" AS ENUM (
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
    linea: 299,
    claves: 'clases examenes',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_plan_horario" AS ENUM (
    'clases',
    'examenes'
);`,
  },
  {
    id: 'tipo-tipo_recurso',
    nombre: 'tipo_recurso',
    cat: 'tipo',
    grupo: 'Clasificaciones',
    desc: 'Clasifica los recursos físicos que pueden tener las aulas y requerir los cursos.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '2 valores admitidos',
    tabla: '',
    linea: 309,
    claves: 'fijo opcional',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_recurso" AS ENUM (
    'fijo',
    'opcional'
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
    linea: 319,
    claves: 'superadministrador coordinador_academico decano docente alumno',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."tipo_usuario" AS ENUM (
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
    linea: 38,
    claves: 'leer crear actualizar eliminar generar aprobar publicar archivar importar exportar administrar',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."accion_permiso" AS ENUM (
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
    linea: 57,
    claves: 'interno',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."canal_notificacion" AS ENUM (
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
    linea: 66,
    claves: 'lunes martes miercoles jueves viernes sabado domingo',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."dia_semana" AS ENUM (
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
    linea: 232,
    claves: 'pdf xlsx',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."formato_reporte" AS ENUM (
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
    linea: 242,
    claves: 'baja media alta critica',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."nivel_severidad" AS ENUM (
    'baja',
    'media',
    'alta',
    'critica'
);`,
  },
  {
    id: 'tipo-prioridad_notificacion',
    nombre: 'prioridad_notificacion',
    cat: 'tipo',
    grupo: 'Otros tipos',
    desc: 'Urgencia de un mensaje interno: normal, importante o urgente.',
    detalle: 'La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.',
    nota: '3 valores admitidos',
    tabla: '',
    linea: 254,
    claves: 'normal importante urgente',
    params: [],
    pasos: [],
    sql: `CREATE TYPE "horarios"."prioridad_notificacion" AS ENUM (
    'normal',
    'importante',
    'urgente'
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
    linea: 5671,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."api_auditoria" WITH ("security_invoker"='true') AS
 SELECT "a"."id",
    "a"."fecha",
    "a"."accion",
    "a"."entidad",
    "a"."entidad_id",
    "u"."nombre_completo" AS "usuario",
    "a"."motivo"
   FROM ("horarios"."auditoria" "a"
     LEFT JOIN "horarios"."usuarios" "u" ON (("u"."id" = "a"."usuario_id")));`,
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
    linea: 5730,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."api_cohortes_activas" WITH ("security_invoker"='true') AS
 SELECT "cp"."cohorte_id",
    "cp"."periodo_id",
    "cp"."semestre_asignado",
    "cp"."matricula_estimada",
    "c"."seccion"
   FROM ("horarios"."cohorte_periodos" "cp"
     JOIN "horarios"."cohortes" "c" ON ((("c"."id" = "cp"."cohorte_id") AND ("c"."eliminado_en" IS NULL))))
  WHERE ("cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL));`,
  },
  {
    id: 'vista-api_cursos_periodo',
    nombre: 'api_cursos_periodo',
    cat: 'vista',
    grupo: 'Vistas api_* · atajos del cliente',
    desc: 'Cursos que toca dictar en un período, derivados de las cohortes activas. Aplica la misma regla que el motor: pensum de la cohorte × semestre en que está esa cohorte.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 5836,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."api_cursos_periodo" WITH ("security_invoker"='true') AS
 SELECT "cp"."periodo_id",
    "cp"."cohorte_id",
    "cp"."semestre_asignado",
    "cp"."matricula_estimada",
    "c"."carrera_id",
    "ca"."nombre" AS "carrera_nombre",
    "c"."jornada_id",
    "c"."pensum_id",
    "p"."anio_creacion" AS "pensum_anio",
    "c"."anio_ingreso",
    "c"."seccion",
    "cep"."id" AS "curso_pensum_id",
    "cep"."curso_id",
    "cur"."codigo" AS "curso_codigo",
    "cur"."nombre" AS "curso_nombre",
    "cur"."requiere_laboratorio",
    "cur"."es_area_comun",
    "cep"."bloques_semanales_exactos",
    "cep"."duracion_slots",
    "cep"."prefiere_bloques_consecutivos"
   FROM ((((("horarios"."cohorte_periodos" "cp"
     JOIN "horarios"."cohortes" "c" ON ((("c"."id" = "cp"."cohorte_id") AND ("c"."eliminado_en" IS NULL))))
     JOIN "horarios"."carreras" "ca" ON ((("ca"."id" = "c"."carrera_id") AND ("ca"."eliminado_en" IS NULL))))
     JOIN "horarios"."pensums" "p" ON ((("p"."id" = "c"."pensum_id") AND ("p"."eliminado_en" IS NULL))))
     JOIN "horarios"."cursos_en_pensum" "cep" ON ((("cep"."pensum_id" = "c"."pensum_id") AND ("cep"."semestre_asignado" = "cp"."semestre_asignado") AND ("cep"."eliminado_en" IS NULL))))
     JOIN "horarios"."cursos" "cur" ON ((("cur"."id" = "cep"."curso_id") AND "cur"."esta_activo" AND ("cur"."eliminado_en" IS NULL))))
  WHERE ("cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL));`,
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
    linea: 5916,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."api_recursos_aula" WITH ("security_invoker"='true') AS
 SELECT "ar"."aula_id",
    "ar"."recurso_id",
    "r"."codigo",
    "r"."nombre",
    "ar"."cantidad"
   FROM ("horarios"."aula_recursos" "ar"
     JOIN "horarios"."recursos" "r" ON (("r"."id" = "ar"."recurso_id")))
  WHERE ("r"."esta_activo" AND ("r"."eliminado_en" IS NULL));`,
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
    linea: 5959,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."api_resumen_importaciones" WITH ("security_invoker"='true') AS
 SELECT "id" AS "importacion_id",
    "nombre_archivo" AS "archivo",
    ("estado")::"text" AS "estado",
    "filas_validas" AS "aceptadas",
    "filas_invalidas" AS "rechazadas",
    GREATEST((("total_filas" - "filas_validas") - "filas_invalidas"), 0) AS "pendientes",
    "creada_en"
   FROM "horarios"."importaciones";`,
  },
  {
    id: 'vista-vista_area_comun_cohortes_derivadas',
    nombre: 'vista_area_comun_cohortes_derivadas',
    cat: 'vista',
    grupo: 'Vistas vista_* · lectura pesada',
    desc: 'Cohortes activas del período y la jornada que cursan alguna materia de la agrupación en su semestre asignado. Respeta RLS.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 6850,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."vista_area_comun_cohortes_derivadas" WITH ("security_invoker"='true') AS
 SELECT DISTINCT "a"."id" AS "agrupacion_id",
    "co"."id" AS "cohorte_id"
   FROM ((((("horarios"."agrupaciones_area_comun" "a"
     JOIN "horarios"."vista_area_comun_cursos_derivados" "vc" ON (("vc"."agrupacion_id" = "a"."id")))
     JOIN "horarios"."cursos" "cur" ON (("cur"."id" = "vc"."curso_id")))
     JOIN "horarios"."cursos_en_pensum" "cep" ON ((("cep"."curso_id" = "cur"."id") AND ("cep"."eliminado_en" IS NULL))))
     JOIN "horarios"."cohortes" "co" ON ((("co"."pensum_id" = "cur"."pensum_id") AND ("co"."jornada_id" = "a"."jornada_id") AND ("co"."estado" = 'activa'::"horarios"."estado_cohorte") AND ("co"."eliminado_en" IS NULL))))
     JOIN "horarios"."cohorte_periodos" "cp" ON ((("cp"."cohorte_id" = "co"."id") AND ("cp"."periodo_id" = "a"."periodo_id") AND "cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL) AND ("cp"."semestre_asignado" = "cep"."semestre_asignado"))))
  WHERE ("a"."eliminado_en" IS NULL);`,
  },
  {
    id: 'vista-vista_area_comun_cursos_derivados',
    nombre: 'vista_area_comun_cursos_derivados',
    cat: 'vista',
    grupo: 'Vistas vista_* · lectura pesada',
    desc: 'Cursos de cada agrupación derivados de su curso común, excluyendo cursos y agrupaciones borrados. Respeta RLS.',
    detalle: '',
    nota: 'security_invoker = true · respeta RLS de quien consulta',
    tabla: '',
    linea: 6830,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."vista_area_comun_cursos_derivados" WITH ("security_invoker"='true') AS
 SELECT "a"."id" AS "agrupacion_id",
    "ccc"."curso_id"
   FROM (("horarios"."agrupaciones_area_comun" "a"
     JOIN "horarios"."curso_comun_cursos" "ccc" ON (("ccc"."curso_comun_id" = "a"."curso_comun_id")))
     JOIN "horarios"."cursos" "cur" ON ((("cur"."id" = "ccc"."curso_id") AND ("cur"."eliminado_en" IS NULL))))
  WHERE ("a"."eliminado_en" IS NULL);`,
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
    linea: 6873,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."vista_horarios_publicados" AS
 SELECT "h"."id" AS "horario_id",
    "h"."tipo_plan",
    "h"."periodo_id",
    "p"."nombre" AS "periodo_nombre",
    "p"."fecha_inicio" AS "periodo_fecha_inicio",
    "p"."fecha_fin" AS "periodo_fecha_fin",
    "s"."id" AS "sesion_id",
    "sc"."cohorte_id",
    "fa"."id" AS "facultad_id",
    "fa"."nombre" AS "facultad_nombre",
    "co"."carrera_id",
    "ca"."codigo" AS "carrera_codigo",
    "ca"."nombre" AS "carrera_nombre",
    "co"."jornada_id",
    "j"."nombre" AS "jornada_nombre",
    "cp"."semestre_asignado",
    "cp"."matricula_estimada",
    "co"."anio_ingreso",
    "co"."seccion" AS "cohorte_seccion",
    "s"."curso_id" AS "curso_sesion_id",
    COALESCE("sc"."curso_visible_id", "s"."curso_id") AS "curso_id",
    "cu"."codigo" AS "curso_codigo",
    "cu"."nombre" AS "curso_nombre",
    "s"."docente_id",
    "d"."nombre_completo" AS "docente_nombre",
    "s"."aula_id",
    "a"."codigo" AS "aula_codigo",
    "a"."capacidad_maxima" AS "aula_capacidad",
    "a"."piso" AS "aula_piso",
    "a"."numero_aula",
    "a"."posicion_x" AS "aula_posicion_x",
    "a"."posicion_y" AS "aula_posicion_y",
    "s"."fecha_sesion",
    "s"."dia",
    "s"."indice_slot_inicio",
    "s"."duracion_slots",
    "s"."minuto_inicio_dia",
    "s"."minuto_fin_dia",
    "s"."es_area_comun",
    "s"."agrupacion_area_comun_id"
   FROM ((((((((((("horarios"."horarios" "h"
     JOIN "horarios"."periodos_academicos" "p" ON (("p"."id" = "h"."periodo_id")))
     JOIN "horarios"."sesiones" "s" ON (("s"."horario_id" = "h"."id")))
     LEFT JOIN "horarios"."sesion_cohortes" "sc" ON (("sc"."sesion_id" = "s"."id")))
     LEFT JOIN "horarios"."cohortes" "co" ON (("co"."id" = "sc"."cohorte_id")))
     LEFT JOIN "horarios"."cohorte_periodos" "cp" ON ((("cp"."cohorte_id" = "co"."id") AND ("cp"."periodo_id" = "h"."periodo_id") AND "cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL))))
     LEFT JOIN "horarios"."carreras" "ca" ON (("ca"."id" = "co"."carrera_id")))
     LEFT JOIN "horarios"."facultades" "fa" ON (("fa"."id" = "ca"."facultad_id")))
     LEFT JOIN "horarios"."jornadas" "j" ON (("j"."id" = "co"."jornada_id")))
     JOIN "horarios"."cursos" "cu" ON (("cu"."id" = COALESCE("sc"."curso_visible_id", "s"."curso_id"))))
     JOIN "horarios"."docentes" "d" ON (("d"."id" = "s"."docente_id")))
     JOIN "horarios"."aulas" "a" ON (("a"."id" = "s"."aula_id")))
  WHERE (("h"."estado" = 'publicado'::"horarios"."estado_horario") AND ("h"."eliminado_en" IS NULL));`,
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
    linea: 6962,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."vista_horarios_publicados_con_sustituciones" AS
 SELECT "v"."horario_id",
    "v"."tipo_plan",
    "v"."periodo_id",
    "v"."periodo_nombre",
    "v"."periodo_fecha_inicio",
    "v"."periodo_fecha_fin",
    "v"."sesion_id",
    "v"."cohorte_id",
    "v"."facultad_id",
    "v"."facultad_nombre",
    "v"."carrera_id",
    "v"."carrera_codigo",
    "v"."carrera_nombre",
    "v"."jornada_id",
    "v"."jornada_nombre",
    "v"."semestre_asignado",
    "v"."matricula_estimada",
    "v"."anio_ingreso",
    "v"."cohorte_seccion",
    "v"."curso_sesion_id",
    "v"."curso_id",
    "v"."curso_codigo",
    "v"."curso_nombre",
    "v"."docente_id",
    "v"."docente_nombre",
    "v"."aula_id",
    "v"."aula_codigo",
    "v"."aula_capacidad",
    "v"."aula_piso",
    "v"."numero_aula",
    "v"."aula_posicion_x",
    "v"."aula_posicion_y",
    "v"."fecha_sesion",
    "v"."dia",
    "v"."indice_slot_inicio",
    "v"."duracion_slots",
    "v"."minuto_inicio_dia",
    "v"."minuto_fin_dia",
    "v"."es_area_comun",
    "v"."agrupacion_area_comun_id",
    "sa"."sustitucion_id",
    "sa"."tipo" AS "tipo_sustitucion",
    "sa"."docente_original_id",
    "sa"."docente_original_nombre",
    "sa"."docente_entrante_id",
    "sa"."docente_entrante_nombre",
        CASE
            WHEN (("sa"."tipo" = ANY (ARRAY['sustitucion_temporal'::"horarios"."tipo_evento_sustitucion", 'sustitucion_permanente'::"horarios"."tipo_evento_sustitucion"])) AND ("sa"."docente_entrante_id" IS NOT NULL)) THEN "sa"."docente_entrante_id"
            ELSE "v"."docente_id"
        END AS "docente_visible_id",
        CASE
            WHEN (("sa"."tipo" = ANY (ARRAY['sustitucion_temporal'::"horarios"."tipo_evento_sustitucion", 'sustitucion_permanente'::"horarios"."tipo_evento_sustitucion"])) AND ("sa"."docente_entrante_nombre" IS NOT NULL)) THEN "sa"."docente_entrante_nombre"
            ELSE "v"."docente_nombre"
        END AS "docente_visible_nombre",
    "sa"."fecha_inicio" AS "sustitucion_fecha_inicio",
    "sa"."fecha_fin" AS "sustitucion_fecha_fin",
    "sa"."fecha_cambio" AS "sustitucion_fecha_cambio",
    "sa"."fecha_ausencia" AS "sustitucion_fecha_ausencia",
    "sa"."fecha_cancelada" AS "sustitucion_fecha_cancelada",
    "sa"."motivo_evento" AS "sustitucion_motivo"
   FROM ("horarios"."vista_horarios_publicados" "v"
     LEFT JOIN "horarios"."vista_sustituciones_activas" "sa" ON (("sa"."sesion_afectada_id" = "v"."sesion_id")));`,
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
    linea: 6933,
    claves: 'vista view join',
    params: [],
    pasos: [],
    sql: `CREATE VIEW "horarios"."vista_sustituciones_activas" AS
 SELECT "e"."id" AS "sustitucion_id",
    "s"."horario_id",
    "e"."sesion_afectada_id",
    "s"."fecha_sesion",
    "e"."tipo",
    "e"."docente_original_id",
    "doc_original"."nombre_completo" AS "docente_original_nombre",
    "e"."docente_entrante_id",
    "doc_entrante"."nombre_completo" AS "docente_entrante_nombre",
    "e"."fecha_inicio",
    "e"."fecha_fin",
    "e"."fecha_cambio",
    "e"."fecha_ausencia",
    "e"."fecha_cancelada",
    "e"."motivo_evento",
    "e"."estado",
    "e"."fecha_registro"
   FROM ((("horarios"."eventos_sustitucion" "e"
     JOIN "horarios"."sesiones" "s" ON (("s"."id" = "e"."sesion_afectada_id")))
     JOIN "horarios"."docentes" "doc_original" ON (("doc_original"."id" = "e"."docente_original_id")))
     LEFT JOIN "horarios"."docentes" "doc_entrante" ON (("doc_entrante"."id" = "e"."docente_entrante_id")))
  WHERE (("e"."estado" = 'activo'::"horarios"."estado_evento_sustitucion") AND ("e"."eliminado_en" IS NULL) AND ((("e"."tipo" = 'sustitucion_temporal'::"horarios"."tipo_evento_sustitucion") AND ((CURRENT_DATE >= "e"."fecha_inicio") AND (CURRENT_DATE <= "e"."fecha_fin"))) OR (("e"."tipo" = 'sustitucion_permanente'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_cambio" <= CURRENT_DATE)) OR (("e"."tipo" = 'permiso_ausencia'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_ausencia" = CURRENT_DATE)) OR (("e"."tipo" = 'cancelacion_sesion'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_cancelada" = CURRENT_DATE))));`,
  },
  {
    id: 'fn-crear_usuario_docente',
    nombre: 'crear_usuario_docente',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Vincula una cuenta de Supabase Auth con un docente y le asigna el rol docente.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 2100,
    claves: '("uuid", "uuid") rpc funcion p_auth_user_id p_docente_id',
    params: [
      { n: 'p_auth_user_id', t: 'uuid', d: '' },
      { n: 'p_docente_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Serializa el alta con un advisory lock y exige un docente activo.',
      'Reutiliza el vínculo si coincide; rechaza cuentas, docentes o correos ya asociados de forma incompatible.',
      'Inserta el usuario con `debe_cambiar_contrasena = true` y su rol docente, y devuelve el perfil creado.',
    ],
    sql: `CREATE FUNCTION "horarios"."crear_usuario_docente"("p_auth_user_id" "uuid", "p_docente_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_usuario horarios.usuarios%rowtype;
    v_docente horarios.docentes%rowtype;
    v_rol_id uuid;
begin
    perform pg_advisory_xact_lock(
        hashtext('horarios.crear_usuario_docente:' || p_docente_id::text)
    );

    select * into v_docente
    from horarios.docentes
    where id = p_docente_id
      and esta_activo
      and eliminado_en is null;

    if not found then
        raise exception 'docente_inexistente_o_inactivo';
    end if;

    select * into v_usuario
    from horarios.usuarios
    where docente_id = p_docente_id
      and eliminado_en is null
    limit 1;

    if found then
        if v_usuario.auth_user_id is distinct from p_auth_user_id then
            raise exception 'docente_vinculado_a_otra_cuenta';
        end if;

        return to_jsonb(v_usuario);
    end if;

    if exists (
        select 1 from horarios.usuarios
        where auth_user_id = p_auth_user_id
          and eliminado_en is null
    ) then
        raise exception 'cuenta_auth_ya_vinculada';
    end if;

    if exists (
        select 1 from horarios.usuarios
        where correo_institucional = lower(trim(v_docente.correo))
          and eliminado_en is null
    ) then
        raise exception 'correo_ya_vinculado';
    end if;

    select id into v_rol_id
    from horarios.roles
    where lower(nombre) = 'docente'
      and eliminado_en is null;

    if v_rol_id is null then
        raise exception 'rol_docente_inexistente';
    end if;

    insert into horarios.usuarios (
        auth_user_id,
        tipo,
        nombre_completo,
        correo_institucional,
        estado,
        docente_id,
        debe_cambiar_contrasena
    )
    values (
        p_auth_user_id,
        'docente'::horarios.tipo_usuario,
        trim(v_docente.nombre_completo),
        lower(trim(v_docente.correo)),
        'activo'::horarios.estado_usuario,
        p_docente_id,
        true
    )
    returning * into v_usuario;

    insert into horarios.usuario_roles (usuario_id, rol_id)
    values (v_usuario.id, v_rol_id)
    on conflict do nothing;

    return to_jsonb(v_usuario);
end;
$$;`,
  },
  {
    id: 'fn-crear_usuario_inicial',
    nombre: 'crear_usuario_inicial',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Da de alta al usuario en `usuarios` y le asigna su rol después de que se registró en Supabase Auth.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 2195,
    claves: '("uuid", "text", "text", "text", "text") rpc funcion p_auth_user_id p_tipo p_nombre p_correo p_rol',
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
    sql: `CREATE FUNCTION "horarios"."crear_usuario_inicial"("p_auth_user_id" "uuid", "p_tipo" "text", "p_nombre" "text", "p_correo" "text", "p_rol" "text") RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
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
    linea: 3686,
    claves: '("uuid") rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Recorre los roles del usuario y los permisos de cada rol.',
      'Quita duplicados y ordena por recurso y acción.',
      'Devuelve `[]` cuando no hay ninguno, nunca `null`.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_permisos_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    linea: 3709,
    claves: '("uuid") rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Une `usuario_roles` con `roles`, descartando los roles borrados.',
      'Devuelve los nombres ordenados alfabéticamente, o `[]`.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_roles_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(r.nombre order by r.nombre), '[]'::jsonb)
    from horarios.usuario_roles ur
    join horarios.roles r on r.id = ur.rol_id
    where ur.usuario_id = p_usuario_id and r.eliminado_en is null;
$$;`,
  },
  {
    id: 'fn-marcar_contrasena_actualizada',
    nombre: 'marcar_contrasena_actualizada',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: 'Quita la obligación de cambiar la contraseña inicial al usuario de la sesión.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 3755,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Exige sesión.',
      'Pone `debe_cambiar_contrasena = false` en su usuario activo; falla si no existe o está inactivo.',
    ],
    sql: `CREATE FUNCTION "horarios"."marcar_contrasena_actualizada"() RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'auth', 'public'
    AS $$
begin
    if auth.uid() is null then
        raise exception 'sesion_requerida';
    end if;

    update horarios.usuarios
    set debe_cambiar_contrasena = false
    where auth_user_id = auth.uid()
      and estado = 'activo'::horarios.estado_usuario
      and eliminado_en is null;

    if not found then
        raise exception 'usuario_inexistente_o_inactivo';
    end if;
end;
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
    linea: 3821,
    claves: '("uuid") rpc funcion p_usuario_id',
    params: [
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Lee el `docente_id` de la ficha del usuario.',
      'Le agrega la lista de facultades que tiene asignadas.',
      'Si el usuario no existe, devuelve un alcance vacío en vez de fallar.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_alcance_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-puede_ver_disponibilidad_de',
    nombre: 'puede_ver_disponibilidad_de',
    cat: 'funcion',
    grupo: 'Seguridad y permisos',
    desc: '¿Quien consulta puede ver la disponibilidad de ese docente?',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 4071,
    claves: '("uuid") rpc funcion p_docente_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Sin sesión (servidor) devuelve `true`.',
      'Un usuario docente activo solo ve la suya.',
      'Los demás necesitan permiso de leer docentes, leer planes o generar con el motor.',
    ],
    sql: `CREATE FUNCTION "horarios"."puede_ver_disponibilidad_de"("p_docente_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    select case
        when (select auth.uid()) is null then true
        when exists (
            select 1
            from horarios.usuarios u
            where u.auth_user_id = (select auth.uid())
              and u.tipo = 'docente'
              and u.estado = 'activo'
              and u.eliminado_en is null)
        then exists (
            select 1
            from horarios.usuarios u
            where u.auth_user_id = (select auth.uid())
              and u.tipo = 'docente'
              and u.estado = 'activo'
              and u.eliminado_en is null
              and u.docente_id = p_docente_id)
        else horarios.usuario_actual_tiene_permiso('docentes', 'leer')
          or horarios.usuario_actual_tiene_permiso('planes', 'leer')
          or horarios.usuario_actual_tiene_permiso('motor', 'generar')
    end;
$$;


SET default_tablespace = '';

SET default_table_access_method = "heap";`,
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
    linea: 4308,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee `auth.uid()`, el identificador que viaja dentro del JWT de la petición.',
      'Busca en `usuarios` la fila con ese `auth_user_id` que esté activa y sin borrar.',
      'Devuelve su id, o NULL si no hay sesión válida.',
    ],
    sql: `CREATE FUNCTION "horarios"."usuario_actual_id"() RETURNS "uuid"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'auth', 'public'
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
    detalle: 'Centraliza la comprobación de permisos por recurso y acción; las políticas añaden condiciones de alcance y pertenencia.',
    nota: 'devuelve boolean · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 4325,
    claves: '("text", "text") rpc funcion p_recurso p_accion',
    params: [
      { n: 'p_recurso', t: 'text', d: '' },
      { n: 'p_accion', t: 'text', d: '' },
    ],
    pasos: [
      'Parte de `auth.uid()` y encadena usuarios → usuario_roles → roles → rol_permisos → permisos_acceso.',
      'Descarta usuarios inactivos o borrados y roles borrados.',
      'Devuelve `true` si aparece al menos una fila con ese par (recurso, acción).',
    ],
    sql: `CREATE FUNCTION "horarios"."usuario_actual_tiene_permiso"("p_recurso" "text", "p_accion" "text") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'auth', 'public'
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
    linea: 4348,
    claves: '("uuid", "text", "text") rpc funcion p_usuario_id p_recurso p_accion',
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
    sql: `CREATE FUNCTION "horarios"."usuario_tiene_permiso"("p_usuario_id" "uuid", "p_recurso" "text", "p_accion" "text") RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve void · sql · VOLATILE',
    tabla: '',
    linea: 332,
    claves: '("uuid", "uuid", integer, integer) rpc funcion p_cohorte_id p_periodo_id p_semestre_asignado p_matricula_estimada',
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
    sql: `CREATE FUNCTION "horarios"."activar_cohorte_periodo"("p_cohorte_id" "uuid", "p_periodo_id" "uuid", "p_semestre_asignado" integer, "p_matricula_estimada" integer) RETURNS "void"
    LANGUAGE "sql"
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 353,
    claves: '("uuid", "text", "uuid", "uuid"[], "uuid"[]) rpc funcion p_id p_nombre p_curso_principal_id p_curso_ids p_cohorte_ids',
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
    sql: `CREATE FUNCTION "horarios"."actualizar_agrupacion_area_comun"("p_id" "uuid", "p_nombre" "text", "p_curso_principal_id" "uuid", "p_curso_ids" "uuid"[], "p_cohorte_ids" "uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_periodo_id uuid;
    v_curso_comun uuid;
begin
    select ccc.curso_comun_id into v_curso_comun
    from horarios.curso_comun_cursos ccc
    where ccc.curso_id = p_curso_principal_id;

    if v_curso_comun is null then
        raise exception 'El curso principal % no pertenece a ningun curso comun: un area comun sale siempre de uno',
            p_curso_principal_id using errcode = 'check_violation';
    end if;

    update horarios.agrupaciones_area_comun
       set nombre = trim(p_nombre),
           curso_principal_id = p_curso_principal_id,
           curso_comun_id = v_curso_comun
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

    perform horarios.validar_agrupacion_area_comun(p_id);

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
    id: 'fn-actualizar_curso_comun',
    nombre: 'actualizar_curso_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Renombra un curso común y reemplaza sus materias equivalentes.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 409,
    claves: '("uuid", "text", "uuid"[]) rpc funcion p_id p_nombre p_curso_ids',
    params: [
      { n: 'p_id', t: 'uuid', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_curso_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Actualiza el grupo vivo; falla si no existe.',
      'Reemplaza los miembros mediante `fijar_cursos_comunes` y devuelve el resultado.',
    ],
    sql: `CREATE FUNCTION "horarios"."actualizar_curso_comun"("p_id" "uuid", "p_nombre" "text", "p_curso_ids" "uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    update horarios.curso_comun set nombre = p_nombre
     where id = p_id and eliminado_en is null;

    if not found then
        raise exception 'No se encontró el curso común.' using errcode = 'no_data_found';
    end if;

    perform horarios.fijar_cursos_comunes(p_id, p_curso_ids);
    return jsonb_build_object('id', p_id, 'nombre', p_nombre, 'curso_ids', to_jsonb(p_curso_ids));
end;
$$;`,
  },
  {
    id: 'fn-actualizar_curso_en_pensum',
    nombre: 'actualizar_curso_en_pensum',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Actualiza juntos los datos de una materia y su carga dentro del pensum.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 431,
    claves: '("uuid", "text", "text", boolean, "text", boolean, integer, integer, boolean, integer) rpc funcion p_curso_id p_codigo p_nombre p_requiere_laboratorio p_tipo_laboratorio_requerido p_es_area_comun p_semestre_asignado p_bloques_semanales_exactos p_prefiere_bloques_consecutivos p_duracion_slots',
    params: [
      { n: 'p_curso_id', t: 'uuid', d: '' },
      { n: 'p_codigo', t: 'text', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_requiere_laboratorio', t: 'boolean', d: '' },
      { n: 'p_tipo_laboratorio_requerido', t: 'text', d: '' },
      { n: 'p_es_area_comun', t: 'boolean', d: '' },
      { n: 'p_semestre_asignado', t: 'integer', d: '' },
      { n: 'p_bloques_semanales_exactos', t: 'integer', d: '' },
      { n: 'p_prefiere_bloques_consecutivos', t: 'boolean', d: '' },
      { n: 'p_duracion_slots', t: 'integer', d: '1' },
    ],
    pasos: [
      'Actualiza el curso vivo; si deja de ser área común, retira su pertenencia al grupo de equivalencia.',
      'Actualiza su malla y devuelve ambas filas; falla si falta el curso o la malla.',
    ],
    sql: `CREATE FUNCTION "horarios"."actualizar_curso_en_pensum"("p_curso_id" "uuid", "p_codigo" "text", "p_nombre" "text", "p_requiere_laboratorio" boolean, "p_tipo_laboratorio_requerido" "text", "p_es_area_comun" boolean, "p_semestre_asignado" integer, "p_bloques_semanales_exactos" integer, "p_prefiere_bloques_consecutivos" boolean, "p_duracion_slots" integer DEFAULT 1) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_curso horarios.cursos%rowtype;
    v_malla horarios.cursos_en_pensum%rowtype;
begin
    update horarios.cursos
       set codigo = p_codigo,
           nombre = p_nombre,
           requiere_laboratorio = p_requiere_laboratorio,
           tipo_laboratorio_requerido = p_tipo_laboratorio_requerido,
           es_area_comun = p_es_area_comun
     where id = p_curso_id and eliminado_en is null
    returning * into v_curso;

    if not found then
        raise exception 'No se encontró el curso.' using errcode = 'no_data_found';
    end if;

    -- Dejar de ser área común saca al curso de su grupo: si ya no se cursa junto con
    -- otras carreras, la equivalencia dejó de ser cierta.
    if not p_es_area_comun then
        delete from horarios.curso_comun_cursos where curso_id = p_curso_id;
    end if;

    update horarios.cursos_en_pensum
       set semestre_asignado = p_semestre_asignado,
           bloques_semanales_exactos = p_bloques_semanales_exactos,
           prefiere_bloques_consecutivos = p_prefiere_bloques_consecutivos,
           duracion_slots = p_duracion_slots
     where curso_id = p_curso_id and eliminado_en is null
    returning * into v_malla;

    if not found then
        raise exception 'El curso no está en ninguna malla.' using errcode = 'no_data_found';
    end if;

    return jsonb_build_object('curso', to_jsonb(v_curso), 'en_pensum', to_jsonb(v_malla));
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
    nota: 'devuelve void · sql · VOLATILE',
    tabla: '',
    linea: 537,
    claves: '("uuid", "uuid", integer) rpc funcion p_aula_id p_recurso_id p_cantidad',
    params: [
      { n: 'p_aula_id', t: 'uuid', d: '' },
      { n: 'p_recurso_id', t: 'uuid', d: '' },
      { n: 'p_cantidad', t: 'integer', d: '' },
    ],
    pasos: [
      'Inserta el recurso en el aula.',
      'Si esa pareja ya existía, solo ajusta la cantidad.',
    ],
    sql: `CREATE FUNCTION "horarios"."asignar_recurso_aula"("p_aula_id" "uuid", "p_recurso_id" "uuid", "p_cantidad" integer) RETURNS "void"
    LANGUAGE "sql"
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1818,
    claves: '("uuid", "text", "uuid", "uuid"[], "uuid"[], "uuid") rpc funcion p_periodo_id p_nombre p_curso_principal_id p_curso_ids p_cohorte_ids p_creada_por_id',
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
    sql: `CREATE FUNCTION "horarios"."crear_agrupacion_area_comun"("p_periodo_id" "uuid", "p_nombre" "text", "p_curso_principal_id" "uuid", "p_curso_ids" "uuid"[], "p_cohorte_ids" "uuid"[], "p_creada_por_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
    v_curso_comun uuid;
    v_jornada uuid;
begin
    select ccc.curso_comun_id into v_curso_comun
    from horarios.curso_comun_cursos ccc
    where ccc.curso_id = p_curso_principal_id;

    if v_curso_comun is null then
        raise exception 'El curso principal % no pertenece a ningun curso comun: un area comun sale siempre de uno',
            p_curso_principal_id using errcode = 'check_violation';
    end if;

    -- Escalar a proposito, igual que en el relleno de la columna: dos jornadas entre las
    -- cohortes elegidas hacen que Postgres pare, que es lo correcto —ninguna sesion podria
    -- incluirlas a todas—.
    select distinct co.jornada_id into v_jornada
    from horarios.cohortes co
    where co.id = any(p_cohorte_ids) and co.eliminado_en is null;

    if v_jornada is null then
        raise exception 'Un area comun necesita al menos una cohorte para saber su jornada'
            using errcode = 'check_violation';
    end if;

    insert into horarios.agrupaciones_area_comun
        (periodo_id, nombre, curso_principal_id, curso_comun_id, jornada_id, creada_por_id)
    values (p_periodo_id, p_nombre, p_curso_principal_id, v_curso_comun, v_jornada, p_creada_por_id)
    returning id into v_id;

    insert into horarios.agrupacion_area_comun_cursos (agrupacion_id, curso_id)
    select v_id, valor from unnest(p_curso_ids) valor on conflict do nothing;
    insert into horarios.agrupacion_area_comun_cohortes (agrupacion_id, cohorte_id)
    select v_id, valor from unnest(p_cohorte_ids) valor on conflict do nothing;

    perform horarios.validar_agrupacion_area_comun(v_id);

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
    id: 'fn-crear_agrupacion_desde_curso_comun',
    nombre: 'crear_agrupacion_desde_curso_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Crea una clase compartida para un período y jornada a partir de un grupo de equivalencia.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1875,
    claves: '("uuid", "uuid", "uuid", "text", "uuid") rpc funcion p_curso_comun_id p_periodo_id p_jornada_id p_nombre p_creada_por_id',
    params: [
      { n: 'p_curso_comun_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_jornada_id', t: 'uuid', d: '' },
      { n: 'p_nombre', t: 'text', d: 'NULL' },
      { n: 'p_creada_por_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Comprueba que el curso común exista y crea la agrupación con su período y jornada.',
      'Recalcula las membresías del período desde las vistas derivadas.',
      'Fija como principal el curso incluido de menor código y devuelve la agrupación.',
    ],
    sql: `CREATE FUNCTION "horarios"."crear_agrupacion_desde_curso_comun"("p_curso_comun_id" "uuid", "p_periodo_id" "uuid", "p_jornada_id" "uuid", "p_nombre" "text" DEFAULT NULL::"text", "p_creada_por_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
    v_nombre text;
    v_principal uuid;
begin
    select coalesce(nullif(trim(coalesce(p_nombre, '')), ''), g.nombre)
      into v_nombre
    from horarios.curso_comun g
    where g.id = p_curso_comun_id and g.eliminado_en is null;

    if v_nombre is null then
        raise exception 'El curso comun % no existe o esta eliminado', p_curso_comun_id
            using errcode = 'no_data_found';
    end if;

    insert into horarios.agrupaciones_area_comun
        (periodo_id, nombre, curso_principal_id, curso_comun_id, jornada_id, creada_por_id)
    values (p_periodo_id, v_nombre, null, p_curso_comun_id, p_jornada_id, p_creada_por_id)
    returning id into v_id;

    -- El recalculo mira todo el periodo, no solo la nueva. Es a proposito: activar una
    -- cohorte cambia la membresia de mas de un area comun, y tener dos caminos —uno para
    -- la recien creada y otro para las demas— es tener dos definiciones de lo mismo.
    perform horarios.recalcular_areas_comunes_periodo(p_periodo_id);

    -- Curso principal estable: el de codigo menor entre los incluidos.
    select cur.id into v_principal
    from horarios.agrupacion_area_comun_cursos aac
    join horarios.cursos cur on cur.id = aac.curso_id
    where aac.agrupacion_id = v_id
    order by cur.codigo
    limit 1;

    update horarios.agrupaciones_area_comun
       set curso_principal_id = v_principal
     where id = v_id;

    return jsonb_build_object(
        'id', v_id,
        'periodo_id', p_periodo_id,
        'jornada_id', p_jornada_id,
        'nombre', v_nombre,
        'curso_principal_id', v_principal,
        'curso_ids', coalesce((select jsonb_agg(curso_id order by curso_id)
            from horarios.agrupacion_area_comun_cursos where agrupacion_id = v_id), '[]'::jsonb),
        'cohorte_ids', coalesce((select jsonb_agg(cohorte_id order by cohorte_id)
            from horarios.agrupacion_area_comun_cohortes where agrupacion_id = v_id), '[]'::jsonb));
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1934,
    claves: '("uuid", "uuid", "uuid", integer, "text", integer) rpc funcion p_carrera_id p_pensum_id p_jornada_id p_anio_ingreso p_seccion p_matricula_estimada',
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
    sql: `CREATE FUNCTION "horarios"."crear_cohorte"("p_carrera_id" "uuid", "p_pensum_id" "uuid", "p_jornada_id" "uuid", "p_anio_ingreso" integer, "p_seccion" "text", "p_matricula_estimada" integer) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-crear_curso_comun',
    nombre: 'crear_curso_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Crea un grupo de equivalencia entre materias de distintos pensums.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1960,
    claves: '("text", "uuid"[]) rpc funcion p_nombre p_curso_ids',
    params: [
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_curso_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Inserta el grupo con su nombre.',
      'Delega la validación y la membresía en `fijar_cursos_comunes`; devuelve el grupo y sus cursos.',
    ],
    sql: `CREATE FUNCTION "horarios"."crear_curso_comun"("p_nombre" "text", "p_curso_ids" "uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
begin
    insert into horarios.curso_comun (nombre) values (p_nombre) returning id into v_id;
    perform horarios.fijar_cursos_comunes(v_id, p_curso_ids);
    return jsonb_build_object('id', v_id, 'nombre', p_nombre, 'curso_ids', to_jsonb(p_curso_ids));
end;
$$;`,
  },
  {
    id: 'fn-crear_curso_en_pensum',
    nombre: 'crear_curso_en_pensum',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Crea una materia propia de un pensum y su entrada en la malla curricular.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1978,
    claves: '("uuid", "text", "text", boolean, "text", boolean, integer, integer, boolean, integer) rpc funcion p_pensum_id p_codigo p_nombre p_requiere_laboratorio p_tipo_laboratorio_requerido p_es_area_comun p_semestre_asignado p_bloques_semanales_exactos p_prefiere_bloques_consecutivos p_duracion_slots',
    params: [
      { n: 'p_pensum_id', t: 'uuid', d: '' },
      { n: 'p_codigo', t: 'text', d: '' },
      { n: 'p_nombre', t: 'text', d: '' },
      { n: 'p_requiere_laboratorio', t: 'boolean', d: '' },
      { n: 'p_tipo_laboratorio_requerido', t: 'text', d: '' },
      { n: 'p_es_area_comun', t: 'boolean', d: '' },
      { n: 'p_semestre_asignado', t: 'integer', d: '' },
      { n: 'p_bloques_semanales_exactos', t: 'integer', d: '' },
      { n: 'p_prefiere_bloques_consecutivos', t: 'boolean', d: '' },
      { n: 'p_duracion_slots', t: 'integer', d: '1' },
    ],
    pasos: [
      'Inserta el curso con su pensum, código, nombre y requisitos de laboratorio y área común.',
      'Inserta la malla con semestre, bloques, consecutividad y máximo diario; devuelve curso y malla juntos.',
    ],
    sql: `CREATE FUNCTION "horarios"."crear_curso_en_pensum"("p_pensum_id" "uuid", "p_codigo" "text", "p_nombre" "text", "p_requiere_laboratorio" boolean, "p_tipo_laboratorio_requerido" "text", "p_es_area_comun" boolean, "p_semestre_asignado" integer, "p_bloques_semanales_exactos" integer, "p_prefiere_bloques_consecutivos" boolean, "p_duracion_slots" integer DEFAULT 1) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_curso horarios.cursos%rowtype;
    v_malla horarios.cursos_en_pensum%rowtype;
begin
    insert into horarios.cursos
        (pensum_id, codigo, nombre, requiere_laboratorio, tipo_laboratorio_requerido, es_area_comun)
    values
        (p_pensum_id, p_codigo, p_nombre, p_requiere_laboratorio,
         p_tipo_laboratorio_requerido, p_es_area_comun)
    returning * into v_curso;

    insert into horarios.cursos_en_pensum
        (pensum_id, curso_id, semestre_asignado, bloques_semanales_exactos,
         prefiere_bloques_consecutivos, duracion_slots)
    values
        (p_pensum_id, v_curso.id, p_semestre_asignado, p_bloques_semanales_exactos,
         p_prefiere_bloques_consecutivos, p_duracion_slots)
    returning * into v_malla;

    return jsonb_build_object('curso', to_jsonb(v_curso), 'en_pensum', to_jsonb(v_malla));
end;
$$;`,
  },
  {
    id: 'fn-cursos_equivalentes',
    nombre: 'cursos_equivalentes',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Devuelve el curso consultado y los demás miembros activos de su curso común vigente.',
    detalle: '',
    nota: 'devuelve TABLE(curso_id uuid) · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2368,
    claves: '("uuid") rpc funcion p_curso_id',
    params: [
      { n: 'p_curso_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Incluye el identificador recibido solo si el curso está activo y vivo.',
      'Une los cursos activos del mismo grupo no eliminado y elimina duplicados con UNION; un curso inactivo no tiene equivalentes.',
    ],
    sql: `CREATE FUNCTION "horarios"."cursos_equivalentes"("p_curso_id" "uuid") RETURNS TABLE("curso_id" "uuid")
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select c.id
      from horarios.cursos c
     where c.id = p_curso_id
       and c.esta_activo
       and c.eliminado_en is null
    union
    select gc2.curso_id
      from horarios.curso_comun_cursos gc1
      join horarios.curso_comun g
        on g.id = gc1.curso_comun_id and g.eliminado_en is null
      join horarios.curso_comun_cursos gc2
        on gc2.curso_comun_id = gc1.curso_comun_id
      join horarios.cursos c2
        on c2.id = gc2.curso_id and c2.esta_activo and c2.eliminado_en is null
     where gc1.curso_id = p_curso_id
       and exists (
           select 1 from horarios.cursos origen
            where origen.id = p_curso_id
              and origen.esta_activo
              and origen.eliminado_en is null);
$$;`,
  },
  {
    id: 'fn-eliminar_curso_en_pensum',
    nombre: 'eliminar_curso_en_pensum',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Da de baja lógica un curso y su malla, y retira su equivalencia compartida.',
    detalle: '',
    nota: 'devuelve boolean · plpgsql · VOLATILE',
    tabla: '',
    linea: 2523,
    claves: '("uuid") rpc funcion p_curso_id',
    params: [
      { n: 'p_curso_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Marca el curso y sus filas de malla con `eliminado_en`.',
      'Borra su vínculo en `curso_comun_cursos`; devuelve false si el curso ya no estaba vivo.',
    ],
    sql: `CREATE FUNCTION "horarios"."eliminar_curso_en_pensum"("p_curso_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_borrado boolean := false;
begin
    update horarios.cursos
       set eliminado_en = now()
     where id = p_curso_id and eliminado_en is null;
    v_borrado := found;

    if not v_borrado then
        return false;
    end if;

    update horarios.cursos_en_pensum
       set eliminado_en = now()
     where curso_id = p_curso_id and eliminado_en is null;

    delete from horarios.curso_comun_cursos where curso_id = p_curso_id;
    return true;
end;
$$;`,
  },
  {
    id: 'fn-establecer_estado_curso',
    nombre: 'establecer_estado_curso',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Activa o desactiva un curso de forma idempotente, sin borrar malla, sesiones ni referencias históricas.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 2568,
    claves: '("uuid", boolean) rpc funcion p_curso_id p_esta_activo',
    params: [
      { n: 'p_curso_id', t: 'uuid', d: '' },
      { n: 'p_esta_activo', t: 'boolean', d: '' },
    ],
    pasos: [
      'Exige curso y estado.',
      'Actualiza `esta_activo` solo si cambia; si ya tenía ese valor, relee la fila.',
      'Falla si el curso no existe o está borrado; devuelve la fila en JSON.',
    ],
    sql: `CREATE FUNCTION "horarios"."establecer_estado_curso"("p_curso_id" "uuid", "p_esta_activo" boolean) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_curso horarios.cursos%rowtype;
begin
    if p_curso_id is null or p_esta_activo is null then
        raise exception using
            errcode = '22023',
            message = 'El curso y el estado son obligatorios.';
    end if;

    update horarios.cursos
       set esta_activo = p_esta_activo
     where id = p_curso_id
       and eliminado_en is null
       and esta_activo is distinct from p_esta_activo
    returning * into v_curso;

    if not found then
        select * into v_curso
          from horarios.cursos
         where id = p_curso_id
           and eliminado_en is null;
    end if;

    if not found then
        raise exception using
            errcode = 'P0002',
            message = 'No se encontró el curso.';
    end if;

    return to_jsonb(v_curso);
end;
$$;`,
  },
  {
    id: 'fn-fijar_cursos_comunes',
    nombre: 'fijar_cursos_comunes',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Reemplaza los cursos equivalentes exigiendo al menos dos materias de pensums distintos.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE',
    tabla: '',
    linea: 2738,
    claves: '("uuid", "uuid"[]) rpc funcion p_curso_comun_id p_curso_ids',
    params: [
      { n: 'p_curso_comun_id', t: 'uuid', d: '' },
      { n: 'p_curso_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Exige al menos dos cursos marcados como área común y sin repetir pensum.',
      'Retira los miembros anteriores y rechaza cursos que ya pertenezcan a otro grupo.',
      'Inserta la membresía nueva en la misma transacción.',
    ],
    sql: `CREATE FUNCTION "horarios"."fijar_cursos_comunes"("p_curso_comun_id" "uuid", "p_curso_ids" "uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    if array_length(p_curso_ids, 1) is null or array_length(p_curso_ids, 1) < 2 then
        raise exception 'Un curso común necesita al menos dos cursos.' using errcode = 'check_violation';
    end if;

    if exists (
        select 1 from horarios.cursos c
        where c.id = any(p_curso_ids) and (not c.es_area_comun or c.eliminado_en is not null)
    ) then
        raise exception 'Solo los cursos marcados como área común pueden agruparse.' using errcode = 'check_violation';
    end if;

    -- Dos cursos del mismo pensum no son equivalentes: son dos cursos de la misma
    -- carrera, y agruparlos le daría a una cohorte dos veces la misma sesión.
    if exists (
        select 1 from horarios.cursos c
        where c.id = any(p_curso_ids)
        group by c.pensum_id having count(*) > 1
    ) then
        raise exception 'Un curso común no puede llevar dos cursos del mismo pensum.' using errcode = 'check_violation';
    end if;

    delete from horarios.curso_comun_cursos
     where curso_comun_id = p_curso_comun_id and curso_id <> all(p_curso_ids);

    -- Se comprueba antes de insertar en vez de dejar que el índice único lo corte: con
    -- «on conflict do nothing» el curso ya agrupado se caería en silencio y el grupo
    -- quedaría con menos miembros de los que se pidieron.
    if exists (
        select 1 from horarios.curso_comun_cursos gc
        where gc.curso_id = any(p_curso_ids) and gc.curso_comun_id <> p_curso_comun_id
    ) then
        raise exception 'Un curso solo puede pertenecer a un curso común.' using errcode = 'unique_violation';
    end if;

    insert into horarios.curso_comun_cursos (curso_comun_id, curso_id)
    select p_curso_comun_id, valor from unnest(p_curso_ids) valor
    on conflict (curso_comun_id, curso_id) do nothing;
end;
$$;`,
  },
  {
    id: 'fn-guardar_rejilla_cohortes',
    nombre: 'guardar_rejilla_cohortes',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Activa o desactiva semestres de una fila de la rejilla de cohortes y recalcula sus áreas comunes.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 3136,
    claves: '("uuid", "uuid", "uuid", "uuid", "text", integer[], integer) rpc funcion p_periodo_id p_carrera_id p_jornada_id p_pensum_id p_seccion p_semestres p_matricula',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_carrera_id', t: 'uuid', d: '' },
      { n: 'p_jornada_id', t: 'uuid', d: '' },
      { n: 'p_pensum_id', t: 'uuid', d: '' },
      { n: 'p_seccion', t: 'text', d: '' },
      { n: 'p_semestres', t: 'integer[]', d: '' },
      { n: 'p_matricula', t: 'integer', d: '' },
    ],
    pasos: [
      'Valida período, pensum, carrera, sección y matrícula; garantiza el vínculo carrera-jornada.',
      'Reutiliza cohortes existentes o crea las necesarias para los semestres seleccionados, conservando matrículas previas.',
      'Desactiva los semestres desmarcados solo dentro de esa carrera, jornada y sección.',
      'Recalcula las áreas comunes del período y devuelve los conteos de la operación.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_anio integer;
    v_seccion text := trim(coalesce(p_seccion, ''));
    v_semestres integer[] := coalesce(p_semestres, '{}'::integer[]);
    v_semestre integer;
    v_anio_ingreso integer;
    v_cohorte uuid;
    v_matricula integer;
    v_creadas integer := 0;
    v_activadas integer := 0;
    v_desactivadas integer := 0;
    v_areas integer;
begin
    select extract(year from p.fecha_inicio)::integer into v_anio
    from horarios.periodos_academicos p
    where p.id = p_periodo_id and p.eliminado_en is null;

    if v_anio is null then
        raise exception 'El periodo % no existe o esta eliminado', p_periodo_id
            using errcode = 'no_data_found';
    end if;

    if v_seccion = '' then
        raise exception 'La seccion es obligatoria: es lo que separa dos grupos del mismo año y la misma carrera'
            using errcode = 'check_violation';
    end if;

    if not exists (select 1 from horarios.pensums pe
                    where pe.id = p_pensum_id and pe.carrera_id = p_carrera_id
                      and pe.eliminado_en is null) then
        raise exception 'El pensum % no es de la carrera %', p_pensum_id, p_carrera_id
            using errcode = 'check_violation';
    end if;

    if p_matricula is null or p_matricula < 0 then
        raise exception 'La matricula estimada no puede ser negativa'
            using errcode = 'check_violation';
    end if;

    -- El par carrera-jornada tiene que existir antes de crear cohortes: la clave foranea
    -- de cohortes lo exige. crear_cohorte hace lo mismo por la misma razon.
    insert into horarios.carrera_jornadas (carrera_id, jornada_id)
    values (p_carrera_id, p_jornada_id)
    on conflict do nothing;

    foreach v_semestre in array v_semestres
    loop
        v_anio_ingreso := v_anio - floor((v_semestre - 1) / 2.0)::integer;

        -- Primero, la que ya cursa ese semestre en este periodo, la prediga la convencion o
        -- no. Un periodo puede heredar cohortes de otro —PRUEBA reutiliza las de E1…E5— y
        -- buscar solo por la formula activaria una segunda cohorte al lado de la que ya
        -- estaba, duplicando en silencio a los mismos estudiantes.
        select co.id into v_cohorte
        from horarios.cohortes co
        join horarios.cohorte_periodos cp on cp.cohorte_id = co.id
         and cp.periodo_id = p_periodo_id and cp.esta_activa and cp.eliminado_en is null
         and cp.semestre_asignado = v_semestre
        where co.carrera_id = p_carrera_id
          and co.jornada_id = p_jornada_id
          and lower(co.seccion) = lower(v_seccion)
          and co.eliminado_en is null
        order by co.anio_ingreso desc
        limit 1;

        -- Y si no cursa nadie, la que dice la convencion.
        if v_cohorte is null then
            select co.id into v_cohorte
            from horarios.cohortes co
            where co.carrera_id = p_carrera_id
              and co.jornada_id = p_jornada_id
              and co.anio_ingreso = v_anio_ingreso
              and lower(co.seccion) = lower(v_seccion)
              and co.eliminado_en is null;
        end if;

        if v_cohorte is null then
            insert into horarios.cohortes
                (carrera_id, pensum_id, jornada_id, anio_ingreso, seccion, matricula_estimada)
            values
                (p_carrera_id, p_pensum_id, p_jornada_id, v_anio_ingreso, v_seccion, p_matricula)
            returning id into v_cohorte;
            v_creadas := v_creadas + 1;
        end if;

        -- La matricula que la casilla ya tenia no se toca, este apagada o encendida: volver
        -- a marcar una casilla la restaura tal como estaba, y desmarcar y remarcar no puede
        -- cambiar en silencio con que aulas cabe esa cohorte. La rejilla activa y desactiva;
        -- corregir una matricula concreta es del formulario de abajo.
        select cp.matricula_estimada into v_matricula
        from horarios.cohorte_periodos cp
        where cp.cohorte_id = v_cohorte and cp.periodo_id = p_periodo_id
          and cp.eliminado_en is null;

        perform horarios.activar_cohorte_periodo(
            v_cohorte, p_periodo_id, v_semestre, coalesce(v_matricula, p_matricula));
        v_activadas := v_activadas + 1;
    end loop;

    -- Solo se desactiva dentro de esta fila de la rejilla: misma carrera, misma jornada y
    -- misma seccion. Otra seccion del mismo par es otra fila y no se entera de esta.
    with apagadas as (
        update horarios.cohorte_periodos cp
           set esta_activa = false,
               actualizado_en = now(),
               version_fila = cp.version_fila + 1
         where cp.periodo_id = p_periodo_id
           and cp.esta_activa
           and cp.eliminado_en is null
           and not (cp.semestre_asignado = any (v_semestres))
           and cp.cohorte_id in (
               select co.id from horarios.cohortes co
                where co.carrera_id = p_carrera_id
                  and co.jornada_id = p_jornada_id
                  and lower(co.seccion) = lower(v_seccion)
                  and co.eliminado_en is null)
        returning 1)
    select count(*) into v_desactivadas from apagadas;

    -- Quien cursa cada area comun acaba de cambiar. Es la mitad del paso: sin esto, la
    -- rejilla dejaria las agrupaciones hablando de cohortes que ya no estan.
    v_areas := horarios.recalcular_areas_comunes_periodo(p_periodo_id);

    return jsonb_build_object(
        'periodo_id', p_periodo_id,
        'carrera_id', p_carrera_id,
        'jornada_id', p_jornada_id,
        'seccion', v_seccion,
        'cohortes_creadas', v_creadas,
        'cohortes_activadas', v_activadas,
        'cohortes_desactivadas', v_desactivadas,
        'areas_comunes_recalculadas', v_areas);
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
    linea: 3501,
    claves: '("uuid") rpc funcion p_periodo_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Toma las agrupaciones activas del período.',
      'Anida en cada una sus cursos y sus cohortes.',
      'Ordena por nombre y devuelve `[]` si no hay ninguna.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_agrupaciones_area_comun"("p_periodo_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-listar_cursos_comunes',
    nombre: 'listar_cursos_comunes',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Lista los grupos de equivalencia vivos con sus identificadores de curso.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3549,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee los grupos sin borrado lógico y anida los ids de sus materias.',
      'Devuelve JSON ordenado por nombre, o un arreglo vacío si no hay grupos.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_cursos_comunes"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(resultado.objeto order by resultado.nombre), '[]'::jsonb)
    from (
        select g.nombre, jsonb_build_object(
            'id', g.id,
            'nombre', g.nombre,
            'curso_ids', coalesce((select jsonb_agg(gc.curso_id order by gc.curso_id)
                from horarios.curso_comun_cursos gc
                where gc.curso_comun_id = g.id), '[]'::jsonb)) as objeto
        from horarios.curso_comun g
        where g.eliminado_en is null
    ) resultado;
$$;`,
  },
  {
    id: 'fn-recalcular_areas_comunes_periodo',
    nombre: 'recalcular_areas_comunes_periodo',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Sincroniza las tablas puente de áreas comunes con los cursos y cohortes derivados del período.',
    detalle: '',
    nota: 'devuelve integer · plpgsql · VOLATILE',
    tabla: '',
    linea: 4186,
    claves: '("uuid") rpc funcion p_periodo_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Recorre las agrupaciones vivas del período.',
      'Reemplaza cursos y cohortes con el resultado de las dos vistas derivadas.',
      'Valida cada agrupación y devuelve cuántas recalculó.',
    ],
    sql: `CREATE FUNCTION "horarios"."recalcular_areas_comunes_periodo"("p_periodo_id" "uuid") RETURNS integer
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_agrupacion uuid;
    v_total integer := 0;
begin
    for v_agrupacion in
        select id from horarios.agrupaciones_area_comun
         where periodo_id = p_periodo_id and eliminado_en is null
    loop
        delete from horarios.agrupacion_area_comun_cursos where agrupacion_id = v_agrupacion;
        insert into horarios.agrupacion_area_comun_cursos (agrupacion_id, curso_id)
        select agrupacion_id, curso_id
          from horarios.vista_area_comun_cursos_derivados
         where agrupacion_id = v_agrupacion;

        delete from horarios.agrupacion_area_comun_cohortes where agrupacion_id = v_agrupacion;
        insert into horarios.agrupacion_area_comun_cohortes (agrupacion_id, cohorte_id)
        select agrupacion_id, cohorte_id
          from horarios.vista_area_comun_cohortes_derivadas
         where agrupacion_id = v_agrupacion;

        perform horarios.validar_agrupacion_area_comun(v_agrupacion);
        v_total := v_total + 1;
    end loop;
    return v_total;
end;
$$;`,
  },
  {
    id: 'fn-validar_agrupacion_area_comun',
    nombre: 'validar_agrupacion_area_comun',
    cat: 'funcion',
    grupo: 'Academia y catálogos',
    desc: 'Comprueba los cursos equivalentes y la jornada de una agrupación; admite una sola cohorte.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE',
    tabla: '',
    linea: 4371,
    claves: '("uuid") rpc funcion p_id',
    params: [
      { n: 'p_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Exige una agrupación viva con al menos dos cursos y sin repetir pensum.',
      'Rechaza cursos eliminados o no marcados como área común.',
      'Impide mezclar cohortes de distintas jornadas; no exige un mínimo de dos cohortes.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_agrupacion_area_comun"("p_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_periodo uuid;
    v_cursos integer;
    v_jornadas integer;
    v_texto text;
begin
    select periodo_id into v_periodo
    from horarios.agrupaciones_area_comun
    where id = p_id and eliminado_en is null;

    if v_periodo is null then
        raise exception 'La agrupacion % no existe o esta eliminada', p_id
            using errcode = 'no_data_found';
    end if;

    select count(*) into v_cursos
    from horarios.agrupacion_area_comun_cursos where agrupacion_id = p_id;

    -- Dos cursos siguen siendo obligatorios: un area comun significa «esta clase tiene dos
    -- nombres», y eso es del catalogo, no del periodo. Las cohortes ya no: cuantas carreras
    -- la lleven este periodo es un dato que cambia cada semestre, y con una sola la clase
    -- sigue siendo la misma clase compartida, solo que hoy la cursa una.
    if v_cursos < 2 then
        raise exception 'Un area comun necesita al menos dos cursos; tiene %',
            v_cursos using errcode = 'check_violation';
    end if;

    -- Dos cursos del mismo pensum harian que una cohorte cursara la misma clase dos
    -- veces. El catalogo «curso_comun» ya lo prohibe; aqui se cierra la otra puerta.
    select string_agg(distinct ca.nombre, ', ') into v_texto
    from horarios.agrupacion_area_comun_cursos aac
    join horarios.cursos cur on cur.id = aac.curso_id
    join horarios.pensums p on p.id = cur.pensum_id
    join horarios.carreras ca on ca.id = p.carrera_id
    where aac.agrupacion_id = p_id
      and cur.pensum_id in (
        select cur2.pensum_id
        from horarios.agrupacion_area_comun_cursos aac2
        join horarios.cursos cur2 on cur2.id = aac2.curso_id
        where aac2.agrupacion_id = p_id
        group by cur2.pensum_id having count(*) > 1);

    if v_texto is not null then
        raise exception 'La agrupacion lleva dos cursos del mismo pensum (%): una cohorte cursaria la misma clase dos veces',
            v_texto using errcode = 'check_violation';
    end if;

    select string_agg(cur.codigo, ', ' order by cur.codigo) into v_texto
    from horarios.agrupacion_area_comun_cursos aac
    join horarios.cursos cur on cur.id = aac.curso_id
    where aac.agrupacion_id = p_id
      and (not cur.es_area_comun or cur.eliminado_en is not null);

    if v_texto is not null then
        raise exception 'Estos cursos no estan marcados como area comun o estan eliminados: %',
            v_texto using errcode = 'check_violation';
    end if;

    -- Una sesion tiene una sola jornada y debe incluir a todas las cohortes de la
    -- agrupacion: si mezclan jornadas, ninguna sesion puede existir.
    select count(distinct co.jornada_id), string_agg(distinct j.nombre, ', ')
      into v_jornadas, v_texto
    from horarios.agrupacion_area_comun_cohortes aacc
    join horarios.cohortes co on co.id = aacc.cohorte_id
    join horarios.jornadas j on j.id = co.jornada_id
    where aacc.agrupacion_id = p_id;

    if v_jornadas > 1 then
        raise exception 'Las cohortes de un area comun deben compartir jornada; hay varias: %',
            v_texto using errcode = 'check_violation';
    end if;
end;
$$;`,
  },
  {
    id: 'fn-calcular_slots_bloqueados',
    nombre: 'calcular_slots_bloqueados',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Bloques de una jornada extraordinaria que un docente asignado no puede ofrecer, con el motivo legible.',
    detalle: '',
    nota: 'devuelve TABLE(jornada_id uuid, docente_id uuid, dia horarios.dia_semana, indice_slot integer, motivo text) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 675,
    claves: '("uuid", "uuid", "uuid") rpc funcion p_periodo_id p_jornada_id p_docente_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_jornada_id', t: 'uuid', d: 'NULL' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Cruza docentes asignados con su horario de referencia y la jornada regular de la que cuelga.',
      'Expande todos los slots de la jornada con sus minutos de reloj.',
      'Bloquea el slot si el docente ya da una clase que se solapa en el horario de referencia («Ya das X de hh:mm a hh:mm»).',
      'Bloquea también el slot que cae en el receso de la jornada regular; devuelve un motivo por slot.',
    ],
    sql: `CREATE FUNCTION "horarios"."calcular_slots_bloqueados"("p_periodo_id" "uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid") RETURNS TABLE("jornada_id" "uuid", "docente_id" "uuid", "dia" "horarios"."dia_semana", "indice_slot" integer, "motivo" "text")
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    with
    -- Qué docente está asignado a qué jornada extraordinaria, y contra qué horario se compara.
    asignaciones as (
        select ad.jornada_id,
               ad.docente_id,
               ep.horario_referencia_id,
               e.jornada_regular_id
        from horarios.jornada_extraordinaria_docentes ad
        join horarios.jornada_extraordinaria_periodos ep
          on ep.jornada_id = ad.jornada_id
         and ep.periodo_id = ad.periodo_id
        join horarios.jornadas e on e.id = ad.jornada_id
        where ad.periodo_id = p_periodo_id
          and (p_jornada_id is null or ad.jornada_id = p_jornada_id)
          and (p_docente_id is null or ad.docente_id = p_docente_id)
    ),
    -- Todos los slots de esas jornadas, con sus minutos de reloj.
    slots as (
        select e.id as jornada_id,
               d.dia,
               i.indice_slot,
               horarios.rango_minutos_slot(e, i.indice_slot) as minutos
        from horarios.jornadas e
        cross join unnest(e.dias_activos) as d (dia)
        cross join generate_series(1, e.bloques_por_dia) as i (indice_slot)
        where e.id in (select a.jornada_id from asignaciones a)
    ),
    -- Bloqueo 1: el docente ya da clase a esa hora en el horario de referencia.
    por_clase as (
        select a.jornada_id,
               a.docente_id,
               s.dia,
               s.indice_slot,
               format('Ya das «%s» de %s a %s',
                      c.nombre,
                      horarios.hora_de_minuto(lower(se.rango_minutos)),
                      horarios.hora_de_minuto(upper(se.rango_minutos))) as motivo
        from asignaciones a
        join horarios.horarios h
          on h.id = a.horario_referencia_id
         and h.eliminado_en is null
        join slots s on s.jornada_id = a.jornada_id
        join horarios.sesiones se
          on se.horario_id = h.id
         and se.docente_id = a.docente_id
         and se.dia = s.dia
         and se.rango_minutos && s.minutos
        join horarios.cursos c on c.id = se.curso_id
    ),
    -- Bloqueo 2: el slot cae en el receso de la jornada regular.
    por_receso as (
        select a.jornada_id,
               a.docente_id,
               s.dia,
               s.indice_slot,
               format('Es el receso de la jornada %s', r.nombre) as motivo
        from asignaciones a
        join horarios.jornadas r on r.id = a.jornada_regular_id
        join slots s
          on s.jornada_id = a.jornada_id
         and s.dia = any (r.dias_activos)
         and s.minutos && horarios.rango_minutos_receso(r)
    )
    select distinct on (b.jornada_id, b.docente_id, b.dia, b.indice_slot)
           b.jornada_id, b.docente_id, b.dia, b.indice_slot, b.motivo
    from (
        select * from por_clase
        union all
        select * from por_receso
    ) b
    order by b.jornada_id, b.docente_id, b.dia, b.indice_slot, b.motivo;
$$;`,
  },
  {
    id: 'fn-calcular_slots_ignorados',
    nombre: 'calcular_slots_ignorados',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Bloques extraordinarios guardados que ya no cuentan: el docente dejó de estar asignado o el bloque quedó ocupado.',
    detalle: '',
    nota: 'devuelve TABLE(docente_id uuid, jornada_id uuid, dia horarios.dia_semana, indice_slot integer) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 757,
    claves: '("uuid", "uuid") rpc funcion p_periodo_id p_docente_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_docente_id', t: 'uuid', d: 'NULL' },
    ],
    pasos: [
      'Toma las marcas de disponibilidad guardadas en jornadas extraordinarias del período.',
      'Se queda con las de docentes ya no asignados a la jornada o que caen en un slot bloqueado.',
    ],
    sql: `CREATE FUNCTION "horarios"."calcular_slots_ignorados"("p_periodo_id" "uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid") RETURNS TABLE("docente_id" "uuid", "jornada_id" "uuid", "dia" "horarios"."dia_semana", "indice_slot" integer)
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    with
    -- Las marcas guardadas en jornadas extraordinarias; las de una regular siempre cuentan.
    guardadas as (
        select dd.docente_id, s.jornada_id, s.dia, s.indice_slot
        from horarios.disponibilidades_docente dd
        join horarios.disponibilidad_docente_slots s on s.disponibilidad_id = dd.id
        join horarios.jornadas j on j.id = s.jornada_id and j.jornada_regular_id is not null
        where dd.periodo_id = p_periodo_id
          and (p_docente_id is null or dd.docente_id = p_docente_id)
    ),
    bloqueados as materialized (
        select b.docente_id, b.jornada_id, b.dia, b.indice_slot
        from horarios.calcular_slots_bloqueados(p_periodo_id, null, p_docente_id) b
    )
    select g.docente_id, g.jornada_id, g.dia, g.indice_slot
    from guardadas g
    where not exists (
              select 1
              from horarios.jornada_extraordinaria_docentes ad
              where ad.jornada_id = g.jornada_id
                and ad.periodo_id = p_periodo_id
                and ad.docente_id = g.docente_id)
       or exists (
              select 1
              from bloqueados b
              where b.docente_id = g.docente_id
                and b.jornada_id = g.jornada_id
                and b.dia = g.dia
                and b.indice_slot = g.indice_slot);
$$;`,
  },
  {
    id: 'fn-es_horario_de_referencia',
    nombre: 'es_horario_de_referencia',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: '¿Este horario es la referencia de alguna jornada extraordinaria?',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 2553,
    claves: '("uuid") rpc funcion p_horario_id',
    params: [
      { n: 'p_horario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Busca el id en `jornada_extraordinaria_periodos.horario_referencia_id`.',
    ],
    sql: `CREATE FUNCTION "horarios"."es_horario_de_referencia"("p_horario_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    select exists (
        select 1
        from horarios.jornada_extraordinaria_periodos ep
        where ep.horario_referencia_id = p_horario_id);
$$;`,
  },
  {
    id: 'fn-guardar_jornada_extraordinaria_periodo',
    nombre: 'guardar_jornada_extraordinaria_periodo',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Configura una jornada extraordinaria en un período: su horario de referencia y la lista completa de docentes asignados.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 2944,
    claves: '("uuid", "uuid", "uuid", "uuid"[]) rpc funcion p_jornada_id p_periodo_id p_horario_referencia_id p_docente_ids',
    params: [
      { n: 'p_jornada_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_horario_referencia_id', t: 'uuid', d: '' },
      { n: 'p_docente_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Exige permiso (\'aulas\',\'crear\') y que la jornada sea extraordinaria y activa.',
      'Exige un horario de referencia vivo del mismo período que no sea el plan de otra extraordinaria.',
      'Guarda o reemplaza la referencia de ese período.',
      'Falla si algún plan aún generable junta esta jornada con otra extraordinaria de referencia distinta.',
      'Sincroniza los docentes: quita a quien no viene en la lista y añade a los nuevos.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_jornada_extraordinaria_periodo"("p_jornada_id" "uuid", "p_periodo_id" "uuid", "p_horario_referencia_id" "uuid", "p_docente_ids" "uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
    if auth.uid() is not null
       and not horarios.usuario_actual_tiene_permiso('aulas', 'crear')
    then
        raise exception 'No tiene permiso para configurar jornadas extraordinarias'
            using errcode = '42501';
    end if;

    if not exists (
        select 1
        from horarios.jornadas j
        where j.id = p_jornada_id
          and j.jornada_regular_id is not null
          and j.eliminado_en is null)
    then
        raise exception 'La jornada % no es una jornada extraordinaria activa', p_jornada_id
            using errcode = 'check_violation';
    end if;

    -- La referencia tiene que ser un horario vivo del mismo período y de jornadas regulares.
    if not exists (
        select 1
        from horarios.horarios h
        where h.id = p_horario_referencia_id
          and h.periodo_id = p_periodo_id
          and h.eliminado_en is null)
    then
        raise exception 'El horario de referencia no existe, está dado de baja o no es de este período'
            using errcode = 'check_violation';
    end if;

    if horarios.plan_es_extraordinario(p_horario_referencia_id) then
        raise exception 'El horario de referencia no puede ser el plan de una jornada extraordinaria: elige un horario de jornadas regulares'
            using errcode = 'check_violation';
    end if;

    insert into horarios.jornada_extraordinaria_periodos (jornada_id, periodo_id, horario_referencia_id)
    values (p_jornada_id, p_periodo_id, p_horario_referencia_id)
    on conflict (jornada_id, periodo_id) do update
        set horario_referencia_id = excluded.horario_referencia_id,
            actualizado_en = now();

    -- Un plan que todavía se puede generar no puede quedar con dos referencias distintas.
    if exists (
        select 1
        from horarios.horarios h
        where h.periodo_id = p_periodo_id
          and h.eliminado_en is null
          and h.estado not in ('publicado', 'archivado')
          and exists (
              select 1
              from horarios.plan_jornadas pj
              where pj.plan_id = h.id
                and pj.jornada_id = p_jornada_id)
          and horarios.referencias_distintas(
                  p_periodo_id,
                  array(select pj.jornada_id from horarios.plan_jornadas pj where pj.plan_id = h.id)) > 1)
    then
        raise exception 'Un plan de este período junta esta jornada con otra extraordinaria que usa otro horario de referencia. Usa la misma referencia o separa las jornadas en planes distintos'
            using errcode = 'check_violation';
    end if;

    -- La lista que llega es la lista completa: quien no viene, deja de estar asignado.
    delete from horarios.jornada_extraordinaria_docentes ad
    where ad.jornada_id = p_jornada_id
      and ad.periodo_id = p_periodo_id
      and not (ad.docente_id = any (coalesce(p_docente_ids, '{}'::uuid[])));

    insert into horarios.jornada_extraordinaria_docentes (jornada_id, periodo_id, docente_id)
    select p_jornada_id, p_periodo_id, docente_id
    from unnest(coalesce(p_docente_ids, '{}'::uuid[])) as docente_id
    on conflict do nothing;
end;
$$;`,
  },
  {
    id: 'fn-hora_de_minuto',
    nombre: 'hora_de_minuto',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Convierte minutos desde medianoche en texto `hh:mm`.',
    detalle: '',
    nota: 'devuelve text · sql · IMMUTABLE',
    tabla: '',
    linea: 3430,
    claves: '(integer) rpc funcion p_minuto',
    params: [
      { n: 'p_minuto', t: 'integer', d: '' },
    ],
    pasos: [
      'Divide entre 60 y rellena con ceros a la izquierda.',
    ],
    sql: `CREATE FUNCTION "horarios"."hora_de_minuto"("p_minuto" integer) RETURNS "text"
    LANGUAGE "sql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
    select lpad((p_minuto / 60)::text, 2, '0') || ':' || lpad((p_minuto % 60)::text, 2, '0');
$$;`,
  },
  {
    id: 'fn-jornada_en_alcance',
    nombre: 'jornada_en_alcance',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: '¿Esta jornada entra en el alcance pedido? Sin jornadas elegidas, solo entran las regulares.',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3466,
    claves: '("uuid", "uuid"[]) rpc funcion p_jornada_id p_jornada_ids',
    params: [
      { n: 'p_jornada_id', t: 'uuid', d: '' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Con lista de jornadas, comprueba pertenencia.',
      'Sin lista, admite la jornada solo si no es extraordinaria.',
    ],
    sql: `CREATE FUNCTION "horarios"."jornada_en_alcance"("p_jornada_id" "uuid", "p_jornada_ids" "uuid"[]) RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
    select case
        when cardinality(coalesce(p_jornada_ids, '{}'::uuid[])) > 0
            then p_jornada_id = any (p_jornada_ids)
        else not exists (
            select 1
            from horarios.jornadas j
            where j.id = p_jornada_id
              and j.jornada_regular_id is not null)
    end;
$$;`,
  },
  {
    id: 'fn-minuto_del_dia',
    nombre: 'minuto_del_dia',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Convierte una hora del día en minutos desde medianoche.',
    detalle: '',
    nota: 'devuelve integer · sql · IMMUTABLE',
    tabla: '',
    linea: 3809,
    claves: '(time without time zone) rpc funcion p_hora',
    params: [
      { n: 'p_hora', t: 'time without time zone', d: '' },
    ],
    pasos: [
      'Devuelve hora × 60 + minuto.',
    ],
    sql: `CREATE FUNCTION "horarios"."minuto_del_dia"("p_hora" time without time zone) RETURNS integer
    LANGUAGE "sql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
    select extract(hour from p_hora)::integer * 60 + extract(minute from p_hora)::integer;
$$;`,
  },
  {
    id: 'fn-obtener_bloqueos_disponibilidad',
    nombre: 'obtener_bloqueos_disponibilidad',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Lo que pinta la grilla de disponibilidad en una jornada: si es extraordinaria, si el docente está asignado y qué bloques están bloqueados.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 3842,
    claves: '("uuid", "uuid", "uuid") rpc funcion p_docente_id p_periodo_id p_jornada_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_jornada_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Exige `puede_ver_disponibilidad_de` del docente: el motivo nombra sus clases.',
      'Devuelve `es_extraordinaria`, `docente_asignado` y los slots bloqueados con su motivo.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_bloqueos_disponibilidad"("p_docente_id" "uuid", "p_periodo_id" "uuid", "p_jornada_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
    -- La misma puerta que leer su disponibilidad: el motivo nombra sus clases.
    if not horarios.puede_ver_disponibilidad_de(p_docente_id) then
        raise exception 'No puede consultar la disponibilidad de ese docente'
            using errcode = '42501';
    end if;

    return jsonb_build_object(
        'es_extraordinaria', exists (
            select 1
            from horarios.jornadas j
            where j.id = p_jornada_id
              and j.jornada_regular_id is not null),
        'docente_asignado', exists (
            select 1
            from horarios.jornada_extraordinaria_docentes ad
            where ad.jornada_id = p_jornada_id
              and ad.periodo_id = p_periodo_id
              and ad.docente_id = p_docente_id),
        'slots', coalesce((
            select jsonb_agg(
                       jsonb_build_object('dia', b.dia, 'indice_slot', b.indice_slot, 'motivo', b.motivo)
                       order by b.dia, b.indice_slot)
            from horarios.calcular_slots_bloqueados(p_periodo_id, p_jornada_id, p_docente_id) b
        ), '[]'::jsonb));
end;
$$;`,
  },
  {
    id: 'fn-obtener_slots_ignorados',
    nombre: 'obtener_slots_ignorados',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Los bloques ignorados de un docente, solo si quien consulta puede ver su disponibilidad.',
    detalle: '',
    nota: 'devuelve TABLE(jornada_id uuid, dia horarios.dia_semana, indice_slot integer) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 4000,
    claves: '("uuid", "uuid") rpc funcion p_docente_id p_periodo_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Llama a `calcular_slots_ignorados` para ese docente y período.',
      'Filtra con `puede_ver_disponibilidad_de`: si no puede, devuelve vacío.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_slots_ignorados"("p_docente_id" "uuid", "p_periodo_id" "uuid") RETURNS TABLE("jornada_id" "uuid", "dia" "horarios"."dia_semana", "indice_slot" integer)
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    select i.jornada_id, i.dia, i.indice_slot
    from horarios.calcular_slots_ignorados(p_periodo_id, p_docente_id) i
    where horarios.puede_ver_disponibilidad_de(p_docente_id);
$$;`,
  },
  {
    id: 'fn-plan_es_extraordinario',
    nombre: 'plan_es_extraordinario',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: '¿El plan cubre alguna jornada extraordinaria?',
    detalle: '',
    nota: 'devuelve boolean · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 4031,
    claves: '("uuid") rpc funcion p_plan_id',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Busca en `plan_jornadas` una jornada con `jornada_regular_id`.',
    ],
    sql: `CREATE FUNCTION "horarios"."plan_es_extraordinario"("p_plan_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    select exists (
        select 1
        from horarios.plan_jornadas pj
        join horarios.jornadas j on j.id = pj.jornada_id
        where pj.plan_id = p_plan_id
          and j.jornada_regular_id is not null);
$$;`,
  },
  {
    id: 'fn-rango_minutos_receso',
    nombre: 'rango_minutos_receso',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'El rango de minutos de reloj del receso de una jornada, o NULL si no tiene.',
    detalle: '',
    nota: 'devuelve int4range · sql · IMMUTABLE',
    tabla: '',
    linea: 4144,
    claves: '("horarios"."jornadas") rpc funcion p_jornada',
    params: [
      { n: 'p_jornada', t: 'jornadas', d: '' },
    ],
    pasos: [
      'Inicio = hora de inicio + bloques antes del receso × duración del bloque; fin = inicio + minutos del receso.',
    ],
    sql: `CREATE FUNCTION "horarios"."rango_minutos_receso"("p_jornada" "horarios"."jornadas") RETURNS "int4range"
    LANGUAGE "sql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
    select case
        when p_jornada.duracion_receso_minutos > 0 then int4range(
            inicio,
            inicio + p_jornada.duracion_receso_minutos,
            '[)')
    end
    from (
        select horarios.minuto_del_dia(p_jornada.hora_inicio)
             + p_jornada.receso_despues_bloque * p_jornada.duracion_bloque_minutos as inicio
    ) calculo;
$$;`,
  },
  {
    id: 'fn-rango_minutos_slot',
    nombre: 'rango_minutos_slot',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'El rango de minutos de reloj que ocupa el bloque n de una jornada.',
    detalle: '',
    nota: 'devuelve int4range · sql · IMMUTABLE',
    tabla: '',
    linea: 4165,
    claves: '("horarios"."jornadas", integer) rpc funcion p_jornada p_indice',
    params: [
      { n: 'p_jornada', t: 'jornadas', d: '' },
      { n: 'p_indice', t: 'integer', d: '' },
    ],
    pasos: [
      'Parte de la hora de inicio y suma (n − 1) bloques.',
      'Si el bloque va después del receso, suma también la duración del receso; devuelve un rango semiabierto.',
    ],
    sql: `CREATE FUNCTION "horarios"."rango_minutos_slot"("p_jornada" "horarios"."jornadas", "p_indice" integer) RETURNS "int4range"
    LANGUAGE "sql" IMMUTABLE
    SET "search_path" TO ''
    AS $$
    select int4range(inicio, inicio + p_jornada.duracion_bloque_minutos, '[)')
    from (
        select horarios.minuto_del_dia(p_jornada.hora_inicio)
             + (p_indice - 1) * p_jornada.duracion_bloque_minutos
             + case when p_jornada.duracion_receso_minutos > 0
                         and p_indice > p_jornada.receso_despues_bloque
                    then p_jornada.duracion_receso_minutos
                    else 0
               end as inicio
    ) calculo;
$$;`,
  },
  {
    id: 'fn-referencias_distintas',
    nombre: 'referencias_distintas',
    cat: 'funcion',
    grupo: 'Jornadas extraordinarias',
    desc: 'Cuántos horarios de referencia distintos usan esas jornadas extraordinarias en el período.',
    detalle: '',
    nota: 'devuelve integer · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 4229,
    claves: '("uuid", "uuid"[]) rpc funcion p_periodo_id p_jornada_ids',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: '' },
    ],
    pasos: [
      'Cuenta los `horario_referencia_id` distintos de las jornadas recibidas; más de uno impide juntarlas en un plan.',
    ],
    sql: `CREATE FUNCTION "horarios"."referencias_distintas"("p_periodo_id" "uuid", "p_jornada_ids" "uuid"[]) RETURNS integer
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
    select count(distinct ep.horario_referencia_id)::integer
    from horarios.jornada_extraordinaria_periodos ep
    where ep.periodo_id = p_periodo_id
      and ep.jornada_id = any (coalesce(p_jornada_ids, '{}'::uuid[]));
$$;`,
  },
  {
    id: 'fn-autorizar_curso_docente',
    nombre: 'autorizar_curso_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Autoriza a un docente a impartir un curso, con alcance opcional por carrera, facultad o jornada.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 552,
    claves: '("uuid", "uuid", "uuid", "uuid", "uuid") rpc funcion p_docente_id p_curso_id p_carrera_id p_facultad_id p_jornada_id',
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
    sql: `CREATE FUNCTION "horarios"."autorizar_curso_docente"("p_docente_id" "uuid", "p_curso_id" "uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_asignacion horarios.asignaciones_docente_curso%rowtype;
begin
    insert into horarios.asignaciones_docente_curso
        (docente_id, curso_id, carrera_id, facultad_id, jornada_id)
    values (p_docente_id, p_curso_id, null, null, p_jornada_id)
    on conflict do nothing
    returning * into v_asignacion;

    if not found then
        select * into v_asignacion
        from horarios.asignaciones_docente_curso
        where docente_id = p_docente_id and curso_id = p_curso_id
          and carrera_id is null
          and facultad_id is null
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
    id: 'fn-fijar_facultades_docente',
    nombre: 'fijar_facultades_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Reemplaza el conjunto de facultades de un docente existente.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE',
    tabla: '',
    linea: 2788,
    claves: '("uuid", "uuid"[]) rpc funcion p_docente_id p_facultad_ids',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_facultad_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Comprueba que el docente exista y no esté eliminado.',
      'Retira sus vínculos anteriores e inserta las facultades recibidas sin duplicados.',
    ],
    sql: `CREATE FUNCTION "horarios"."fijar_facultades_docente"("p_docente_id" "uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    if not exists (
        select 1
        from horarios.docentes
        where id = p_docente_id
          and eliminado_en is null
    ) then
        raise exception 'docente_inexistente' using errcode = 'no_data_found';
    end if;

    delete from horarios.docente_facultades
    where docente_id = p_docente_id
      and not (facultad_id = any (coalesce(p_facultad_ids, '{}'::uuid[])));

    insert into horarios.docente_facultades (docente_id, facultad_id)
    select p_docente_id, x
    from unnest(coalesce(p_facultad_ids, '{}'::uuid[])) as x
    on conflict do nothing;
end;
$$;`,
  },
  {
    id: 'fn-guardar_disponibilidad_docente',
    nombre: 'guardar_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Guarda la cabecera de disponibilidad y reemplaza sus bloques en `disponibilidad_docente_slots`; los bloques ocupados de una jornada extraordinaria se descartan.',
    detalle: 'Los bloques llegan en JSON; `ventanas_disponibilidad` define fechas de captura, no franjas horarias del docente.',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 2871,
    claves: '("uuid", "uuid", boolean, "jsonb") rpc funcion p_docente_id p_periodo_id p_confirmar p_slots',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_confirmar', t: 'boolean', d: '' },
      { n: 'p_slots', t: 'jsonb', d: '' },
    ],
    pasos: [
      'Crea o actualiza la cabecera de disponibilidad de ese docente en ese período.',
      'Borra los bloques anteriores y vuelve a insertar los recibidos.',
      'De cada bloque comprueba contra su jornada que el día esté activo y el índice caiga dentro de los bloques del día; si no encaja, aborta la operación entera.',
      'Un bloque de jornada extraordinaria ocupado, o de un docente no asignado, lo descarta el disparador sin error.',
      'Si pidió confirmar y no quedó ningún bloque disponible, falla; devuelve los bloques realmente guardados.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_disponibilidad_docente"("p_docente_id" "uuid", "p_periodo_id" "uuid", "p_confirmar" boolean, "p_slots" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
    v_slot jsonb;
begin
    insert into horarios.disponibilidades_docente (docente_id, periodo_id, esta_confirmada)
    values (p_docente_id, p_periodo_id, p_confirmar)
    on conflict (docente_id, periodo_id) do update
      set esta_confirmada = excluded.esta_confirmada, actualizado_en = now()
    returning id into v_id;

    delete from horarios.disponibilidad_docente_slots where disponibilidad_id = v_id;

    for v_slot in select value from jsonb_array_elements(p_slots)
    loop
        if not exists (
            select 1
            from horarios.jornadas j
            where j.id = (v_slot->>'jornada_id')::uuid
              and j.esta_activa and j.eliminado_en is null
              and (v_slot->>'dia')::horarios.dia_semana = any (j.dias_activos)
              and (v_slot->>'indice_slot')::integer between 1 and j.bloques_por_dia)
        then
            raise exception 'Un bloque no pertenece a la jornada indicada';
        end if;

        -- Si el slot está bloqueado, el disparador lo descarta y no se escribe nada.
        insert into horarios.disponibilidad_docente_slots
            (disponibilidad_id, jornada_id, dia, indice_slot, esta_disponible)
        values (
            v_id,
            (v_slot->>'jornada_id')::uuid,
            (v_slot->>'dia')::horarios.dia_semana,
            (v_slot->>'indice_slot')::integer,
            coalesce((v_slot->>'esta_disponible')::boolean, true));
    end loop;

    if coalesce(p_confirmar, false) and not exists (
        select 1
        from horarios.disponibilidad_docente_slots s
        where s.disponibilidad_id = v_id
          and s.esta_disponible)
    then
        raise exception 'No se puede confirmar una disponibilidad sin bloques: los bloques enviados están ocupados en su jornada extraordinaria, o el docente no está asignado a ella';
    end if;

    return jsonb_build_object(
        'id', v_id,
        'docente_id', p_docente_id,
        'periodo_id', p_periodo_id,
        'esta_confirmada', p_confirmar,
        'slots_ignorados', 0,
        'slots', coalesce((
            select jsonb_agg(jsonb_build_object(
                       'jornada_id', s.jornada_id,
                       'dia', s.dia::text,
                       'indice_slot', s.indice_slot,
                       'esta_disponible', s.esta_disponible)
                   order by s.jornada_id, s.dia, s.indice_slot)
            from horarios.disponibilidad_docente_slots s
            where s.disponibilidad_id = v_id
        ), '[]'::jsonb));
end;
$$;`,
  },
  {
    id: 'fn-guardar_mi_disponibilidad_docente',
    nombre: 'guardar_mi_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Guarda la disponibilidad del docente identificado por la sesión autenticada.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 3028,
    claves: '("uuid", boolean, "jsonb") rpc funcion p_periodo_id p_confirmar p_slots',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_confirmar', t: 'boolean', d: '' },
      { n: 'p_slots', t: 'jsonb', d: '' },
    ],
    pasos: [
      'Resuelve el docente desde `auth.uid()` y exige un usuario docente activo, período válido y lista de bloques.',
      'Impide confirmar una disponibilidad vacía.',
      'Crea o actualiza la cabecera y reemplaza los bloques; el disparador descarta los ocupados en su jornada extraordinaria.',
      'Si pidió confirmar y no quedó ningún bloque disponible, falla; si no, devuelve la disponibilidad con sus slots.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_mi_disponibilidad_docente"("p_periodo_id" "uuid", "p_confirmar" boolean, "p_slots" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
declare
    v_docente_id uuid;
    v_disponibilidad_id uuid;
begin
    if p_periodo_id is null then
        raise exception 'El período es obligatorio';
    end if;

    if p_slots is null or jsonb_typeof(p_slots) <> 'array' then
        raise exception 'Los bloques deben enviarse como una lista';
    end if;

    select usuario.docente_id
      into v_docente_id
      from horarios.usuarios usuario
     where usuario.auth_user_id = (select auth.uid())
       and usuario.tipo = 'docente'
       and usuario.estado = 'activo'
       and usuario.eliminado_en is null;

    if v_docente_id is null then
        raise exception 'El usuario autenticado no está asociado a un docente'
            using errcode = '42501';
    end if;

    if not exists (
        select 1
        from horarios.periodos_academicos periodo
        where periodo.id = p_periodo_id
          and periodo.eliminado_en is null
    ) then
        raise exception 'No se encontró el período académico';
    end if;

    if coalesce(p_confirmar, false) and jsonb_array_length(p_slots) = 0 then
        raise exception 'No se puede confirmar una disponibilidad sin bloques';
    end if;

    insert into horarios.disponibilidades_docente
        (docente_id, periodo_id, esta_confirmada)
    values
        (v_docente_id, p_periodo_id, coalesce(p_confirmar, false))
    on conflict (docente_id, periodo_id) do update
       set esta_confirmada = excluded.esta_confirmada,
           actualizado_en = now()
    returning id into v_disponibilidad_id;

    delete from horarios.disponibilidad_docente_slots
     where disponibilidad_id = v_disponibilidad_id;

    -- Si un bloque está ocupado en su jornada extraordinaria, el disparador lo descarta.
    insert into horarios.disponibilidad_docente_slots
        (disponibilidad_id, jornada_id, dia, indice_slot, esta_disponible)
    select
        v_disponibilidad_id,
        slot.jornada_id,
        slot.dia::horarios.dia_semana,
        slot.indice_slot,
        coalesce(slot.esta_disponible, true)
    from jsonb_to_recordset(p_slots) as slot(
        jornada_id uuid,
        dia text,
        indice_slot integer,
        esta_disponible boolean
    );

    if coalesce(p_confirmar, false) and not exists (
        select 1
        from horarios.disponibilidad_docente_slots slot
        where slot.disponibilidad_id = v_disponibilidad_id
          and slot.esta_disponible)
    then
        raise exception 'No se puede confirmar una disponibilidad sin bloques: los bloques enviados están ocupados en tu jornada extraordinaria, o no estás asignado a ella';
    end if;

    return (
        select jsonb_build_object(
            'id', disponibilidad.id,
            'docente_id', disponibilidad.docente_id,
            'periodo_id', disponibilidad.periodo_id,
            'esta_confirmada', disponibilidad.esta_confirmada,
            'slots_ignorados', 0,
            'slots', coalesce((
                select jsonb_agg(jsonb_build_object(
                    'jornada_id', slot.jornada_id,
                    'dia', slot.dia::text,
                    'indice_slot', slot.indice_slot,
                    'esta_disponible', slot.esta_disponible
                ) order by slot.jornada_id, slot.dia, slot.indice_slot)
                from horarios.disponibilidad_docente_slots slot
                where slot.disponibilidad_id = disponibilidad.id
            ), '[]'::jsonb)
        )
        from horarios.disponibilidades_docente disponibilidad
        where disponibilidad.id = v_disponibilidad_id
    );
end;
$$;`,
  },
  {
    id: 'fn-obtener_disponibilidad_docente',
    nombre: 'obtener_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Devuelve la disponibilidad guardada de un docente en un período, lista para pintar la grilla, sin los bloques que ya no cuentan.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3879,
    claves: '("uuid", "uuid") rpc funcion p_docente_id p_periodo_id',
    params: [
      { n: 'p_docente_id', t: 'uuid', d: '' },
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Lee la cabecera del docente en el período.',
      'Calcula con `obtener_slots_ignorados` los bloques extraordinarios que ya no cuentan.',
      'Anida sus bloques ordenados por día e índice, sin esos, y dice cuántos quitó.',
      'Devuelve la lista de bloques vacía si aún no declaró nada.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_disponibilidad_docente"("p_docente_id" "uuid", "p_periodo_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    with ignorados as materialized (
        select i.jornada_id, i.dia, i.indice_slot
        from horarios.obtener_slots_ignorados(p_docente_id, p_periodo_id) i
    )
    select jsonb_build_object(
        'id', d.id,
        'docente_id', d.docente_id,
        'periodo_id', d.periodo_id,
        'esta_confirmada', d.esta_confirmada,
        'slots_ignorados', (select count(*)::integer from ignorados),
        'slots', coalesce((select jsonb_agg(jsonb_build_object(
            'jornada_id', s.jornada_id,
            'dia', s.dia::text,
            'indice_slot', s.indice_slot,
            'esta_disponible', s.esta_disponible)
            order by s.dia, s.indice_slot)
            from horarios.disponibilidad_docente_slots s
            where s.disponibilidad_id = d.id
              and not exists (
                  select 1
                  from ignorados i
                  where i.jornada_id = s.jornada_id
                    and i.dia = s.dia
                    and i.indice_slot = s.indice_slot)), '[]'::jsonb))
    from horarios.disponibilidades_docente d
    where d.docente_id = p_docente_id and d.periodo_id = p_periodo_id;
$$;`,
  },
  {
    id: 'fn-obtener_mi_disponibilidad_docente',
    nombre: 'obtener_mi_disponibilidad_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Consulta la disponibilidad del docente de la sesión para un período.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3949,
    claves: '("uuid") rpc funcion p_periodo_id',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Resuelve el docente desde el usuario activo asociado a `auth.uid()`.',
      'Lee su cabecera y devuelve los slots ordenados por jornada, día e índice, sin los que `obtener_slots_ignorados` ya no cuenta.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_mi_disponibilidad_docente"("p_periodo_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
    with
    yo as (
        select usuario.docente_id
        from horarios.usuarios usuario
        where usuario.auth_user_id = (select auth.uid())
          and usuario.tipo = 'docente'
          and usuario.estado = 'activo'
          and usuario.eliminado_en is null
    ),
    ignorados as materialized (
        select i.jornada_id, i.dia, i.indice_slot
        from yo
        cross join horarios.obtener_slots_ignorados(yo.docente_id, p_periodo_id) i
    )
    select jsonb_build_object(
        'id', disponibilidad.id,
        'docente_id', disponibilidad.docente_id,
        'periodo_id', disponibilidad.periodo_id,
        'esta_confirmada', disponibilidad.esta_confirmada,
        'slots_ignorados', (select count(*)::integer from ignorados),
        'slots', coalesce((
            select jsonb_agg(jsonb_build_object(
                'jornada_id', slot.jornada_id,
                'dia', slot.dia::text,
                'indice_slot', slot.indice_slot,
                'esta_disponible', slot.esta_disponible
            ) order by slot.jornada_id, slot.dia, slot.indice_slot)
            from horarios.disponibilidad_docente_slots slot
            where slot.disponibilidad_id = disponibilidad.id
              and not exists (
                  select 1
                  from ignorados i
                  where i.jornada_id = slot.jornada_id
                    and i.dia = slot.dia
                    and i.indice_slot = slot.indice_slot)
        ), '[]'::jsonb)
    )
    from horarios.disponibilidades_docente disponibilidad
    where disponibilidad.periodo_id = p_periodo_id
      and disponibilidad.docente_id = (select yo.docente_id from yo);
$$;`,
  },
  {
    id: 'fn-revocar_curso_docente',
    nombre: 'revocar_curso_docente',
    cat: 'funcion',
    grupo: 'Docentes',
    desc: 'Retira la autorización marcando `esta_vigente = false`. No borra el historial.',
    detalle: '',
    nota: 'devuelve boolean · plpgsql · VOLATILE',
    tabla: '',
    linea: 4288,
    claves: '("uuid") rpc funcion p_asignacion_id',
    params: [
      { n: 'p_asignacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Marca la autorización como no vigente, le pone `eliminado_en` y sube `version_fila`.',
      'Solo actúa sobre autorizaciones que seguían vigentes.',
      'Devuelve `true` si llegó a tocar una fila.',
    ],
    sql: `CREATE FUNCTION "horarios"."revocar_curso_docente"("p_asignacion_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 797,
    claves: '("uuid", "text", "text", "text", bigint, "uuid") rpc funcion p_plan_id p_estado_anterior p_estado_nuevo p_motivo p_version_anterior p_usuario_id',
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
    sql: `CREATE FUNCTION "horarios"."cambiar_estado_plan"("p_plan_id" "uuid", "p_estado_anterior" "text", "p_estado_nuevo" "text", "p_motivo" "text", "p_version_anterior" bigint, "p_usuario_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    desc: 'Revisión previa a generar: cuenta qué hay y qué falta para el alcance elegido, antes de gastar una corrida. Sin jornadas elegidas, cuenta solo las regulares.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 1761,
    claves: '("uuid", "uuid"[], "uuid"[]) rpc funcion p_periodo_id p_carrera_ids p_jornada_ids',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_carrera_ids', t: 'uuid[]', d: 'arreglo vacío' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Arma el alcance: las cohortes activas del período, filtradas por las carreras y por `jornada_en_alcance`.',
      'Cuenta cohortes, cohortes sin cursos en su semestre, aulas activas, docentes autorizados y docentes con disponibilidad confirmada.',
      'Devuelve todo junto para la pantalla previa a generar.',
    ],
    sql: `CREATE FUNCTION "horarios"."conteos_revision_plan"("p_periodo_id" "uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
          and horarios.jornada_en_alcance(c.jornada_id, p_jornada_ids)
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
            and exists (
                select 1
                from horarios.disponibilidad_docente_slots dds
                where dds.disponibilidad_id = dd.id
                  and dds.esta_disponible
                  and horarios.jornada_en_alcance(dds.jornada_id, p_jornada_ids))));
$$;`,
  },
  {
    id: 'fn-crear_plan_horario',
    nombre: 'crear_plan_horario',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: 'Crea el plan en estado `borrador` y fija su alcance: qué carreras y qué jornadas entran.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 2070,
    claves: '("uuid", "text", "uuid", "uuid"[], "uuid"[]) rpc funcion p_periodo_id p_tipo p_horario_origen_id p_carrera_ids p_jornada_ids',
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
    sql: `CREATE FUNCTION "horarios"."crear_plan_horario"("p_periodo_id" "uuid", "p_tipo" "text", "p_horario_origen_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-fijar_alcance_plan',
    nombre: 'fijar_alcance_plan',
    cat: 'funcion',
    grupo: 'Planes de horario',
    desc: 'Cambia las carreras y jornadas del plan. Solo en `borrador`, y sin mezclar jornadas regulares con extraordinarias.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE',
    tabla: '',
    linea: 2669,
    claves: '("uuid", "uuid"[], "uuid"[]) rpc funcion p_plan_id p_carrera_ids p_jornada_ids',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
      { n: 'p_carrera_ids', t: 'uuid[]', d: 'arreglo vacío' },
      { n: 'p_jornada_ids', t: 'uuid[]', d: 'arreglo vacío' },
    ],
    pasos: [
      'Comprueba que el plan exista y siga en `borrador`; si no, falla con un código propio.',
      'Rechaza mezclar jornadas regulares y extraordinarias; con extraordinarias, exige que el plan no sea referencia de otra y que todas usen el mismo horario de referencia.',
      'Borra el alcance anterior.',
      'Reinserta las carreras y jornadas recibidas.',
    ],
    sql: `CREATE FUNCTION "horarios"."fijar_alcance_plan"("p_plan_id" "uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_estado horarios.estado_horario;
    v_periodo_id uuid;
    v_con_extraordinarias boolean;
begin
    select estado, periodo_id into v_estado, v_periodo_id
    from horarios.horarios
    where id = p_plan_id and eliminado_en is null;

    if v_estado is null then
        raise exception 'plan_inexistente' using errcode = 'no_data_found';
    end if;

    if v_estado <> 'borrador' then
        raise exception 'plan_no_editable' using errcode = 'invalid_parameter_value';
    end if;

    v_con_extraordinarias := exists (
        select 1 from horarios.jornadas j
        where j.id = any (p_jornada_ids) and j.jornada_regular_id is not null);

    -- 1. Un plan es de jornadas regulares o de extraordinarias, nunca de las dos: el
    --    extraordinario se genera contra un horario regular que ya existe.
    if v_con_extraordinarias
       and exists (select 1 from horarios.jornadas j
                   where j.id = any (p_jornada_ids) and j.jornada_regular_id is null)
    then
        raise exception 'Un plan no puede mezclar jornadas regulares y extraordinarias'
            using errcode = 'check_violation';
    end if;

    if v_con_extraordinarias then
        -- 2. El horario de referencia de una extraordinaria no puede volverse extraordinario.
        if horarios.es_horario_de_referencia(p_plan_id) then
            raise exception 'Este plan es el horario de referencia de una jornada extraordinaria: no puede cubrir jornadas extraordinarias'
                using errcode = 'check_violation';
        end if;

        -- 3. Todas las extraordinarias del plan tienen que usar el mismo horario de referencia.
        if horarios.referencias_distintas(v_periodo_id, p_jornada_ids) > 1 then
            raise exception 'Las jornadas extraordinarias elegidas usan horarios de referencia distintos: genéralas en planes separados'
                using errcode = 'check_violation';
        end if;
    end if;

    delete from horarios.plan_carreras where plan_id = p_plan_id;
    delete from horarios.plan_jornadas where plan_id = p_plan_id;

    insert into horarios.plan_carreras (plan_id, carrera_id)
    select p_plan_id, x
    from unnest(coalesce(p_carrera_ids, '{}'::uuid[])) as x
    on conflict do nothing;

    insert into horarios.plan_jornadas (plan_id, jornada_id)
    select p_plan_id, x
    from unnest(coalesce(p_jornada_ids, '{}'::uuid[])) as x
    on conflict do nothing;
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
    linea: 4014,
    claves: '("uuid") rpc funcion p_plan_id',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Comprueba cuatro condiciones unidas por `and`: hay sesiones, no quedan pendientes, no hay conflictos duros y el contador de violaciones duras está en cero.',
      'Si el plan ni existe, devuelve `false` en lugar de nulo.',
    ],
    sql: `CREATE FUNCTION "horarios"."plan_es_completo_y_valido"("p_plan_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-diagnosticar_sistema',
    nombre: 'diagnosticar_sistema',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Tablero de salud: planes que no se pueden publicar, sesiones sin asignar e importaciones atascadas.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 2487,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Cuenta horarios no publicables (con violaciones duras o con pendientes), sesiones sin asignar e importaciones atascadas.',
      'Marca `listo` cuando los tres contadores están en cero.',
      'Devuelve además los hallazgos redactados en texto.',
    ],
    sql: `CREATE FUNCTION "horarios"."diagnosticar_sistema"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    with conteos as (
        select
          (select count(*)::integer from horarios.horarios h
             where h.eliminado_en is null
               and h.estado in ('generado','en_revision','pendiente_aprobacion','aprobado')
               and (h.cantidad_violaciones_duras > 0 or exists (
                    select 1 from horarios.sesiones_no_asignadas p where p.horario_id = h.id)))
              as no_publicables,
          (select count(*)::integer from horarios.sesiones_no_asignadas p
             join horarios.horarios h on h.id = p.horario_id
             where h.eliminado_en is null) as pendientes,
          (select count(*)::integer from horarios.importaciones
             where estado in ('recibida','validando')) as importaciones
    )
    select jsonb_build_object(
        'listo', no_publicables + pendientes + importaciones = 0,
        'horarios_no_publicables', no_publicables,
        'sesiones_pendientes', pendientes,
        'importaciones_pendientes', importaciones,
        'hallazgos', to_jsonb(array_remove(array[
            case when no_publicables > 0 then no_publicables || ' horario(s) no publicable(s).' end,
            case when pendientes > 0 then pendientes || ' sesion(es) sin asignar.' end,
            case when importaciones > 0 then importaciones || ' importacion(es) pendiente(s).' end
        ], null)))
    from conteos;
$$;`,
  },
  {
    id: 'fn-finalizar_generacion',
    nombre: 'finalizar_generacion',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Cierra la corrida y guarda todo el resultado: estado, duración, violaciones, puntajes, sesiones, pendientes, conflictos y mensajes.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 2818,
    claves: '("uuid", "text", bigint, integer, integer, numeric, numeric, integer, "jsonb", "jsonb", "jsonb", "jsonb", "jsonb", "jsonb") rpc funcion p_generacion_id p_estado p_duracion_ms p_total_violaciones_duras p_total_sesiones_pendientes p_puntaje_inicial p_puntaje_final p_total_violaciones_blandas p_puntaje_desglose p_resultado p_mensajes p_sesiones p_pendientes p_conflictos',
    params: [
      { n: 'p_generacion_id', t: 'uuid', d: '' },
      { n: 'p_estado', t: 'text', d: '' },
      { n: 'p_duracion_ms', t: 'bigint', d: '' },
      { n: 'p_total_violaciones_duras', t: 'integer', d: '' },
      { n: 'p_total_sesiones_pendientes', t: 'integer', d: '' },
      { n: 'p_puntaje_inicial', t: 'numeric', d: '' },
      { n: 'p_puntaje_final', t: 'numeric', d: '' },
      { n: 'p_total_violaciones_blandas', t: 'integer', d: '' },
      { n: 'p_puntaje_desglose', t: 'jsonb', d: '' },
      { n: 'p_resultado', t: 'jsonb', d: '' },
      { n: 'p_mensajes', t: 'jsonb', d: '' },
      { n: 'p_sesiones', t: 'jsonb', d: '\'[]\'' },
      { n: 'p_pendientes', t: 'jsonb', d: '\'[]\'' },
      { n: 'p_conflictos', t: 'jsonb', d: '\'[]\'' },
    ],
    pasos: [
      'Cierra la corrida solo si seguía en `generando`; si no, falla.',
      'Guarda duración, violaciones, puntajes y el resultado completo.',
      'Vuelca los mensajes recibidos a `mensajes_generacion`.',
      'Si terminó `completada` o `inviable`, llama a `guardar_resultado_generacion` para escribir el horario.',
      'Una corrida fallida o cancelada no toca el horario anterior.',
    ],
    sql: `CREATE FUNCTION "horarios"."finalizar_generacion"("p_generacion_id" "uuid", "p_estado" "text", "p_duracion_ms" bigint, "p_total_violaciones_duras" integer, "p_total_sesiones_pendientes" integer, "p_puntaje_inicial" numeric, "p_puntaje_final" numeric, "p_total_violaciones_blandas" integer, "p_puntaje_desglose" "jsonb", "p_resultado" "jsonb", "p_mensajes" "jsonb", "p_sesiones" "jsonb" DEFAULT '[]'::"jsonb", "p_pendientes" "jsonb" DEFAULT '[]'::"jsonb", "p_conflictos" "jsonb" DEFAULT '[]'::"jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    SET "jit" TO 'off'
    AS $$
declare
    v_mensaje jsonb;
    v_horario_id uuid;
begin
    update horarios.generaciones
    set estado = p_estado::horarios.estado_generacion,
        duracion_ms = greatest(0, p_duracion_ms),
        total_violaciones_duras = p_total_violaciones_duras,
        total_sesiones_pendientes = p_total_sesiones_pendientes,
        costo_final = p_puntaje_final,
        total_violaciones_blandas = p_total_violaciones_blandas,
        puntaje_desglose = coalesce(p_puntaje_desglose, '{}'::jsonb),
        instantanea_entrada = instantanea_entrada || jsonb_build_object('puntaje_inicial', p_puntaje_inicial),
        resultado = p_resultado,
        finalizada_en = now()
    where id = p_generacion_id and estado = 'generando'
    returning plan_id into v_horario_id;
    if not found then
        raise exception 'La generacion no existe o ya habia finalizado';
    end if;

    for v_mensaje in select value from jsonb_array_elements(p_mensajes)
    loop
        insert into horarios.mensajes_generacion
            (generacion_id, severidad, codigo, mensaje, entidad, entidad_id)
        values
            (p_generacion_id,
             (v_mensaje->>'severidad')::horarios.nivel_severidad,
             v_mensaje->>'codigo', v_mensaje->>'mensaje',
             case when v_mensaje->>'sesion_id' is null then null else 'sesion' end,
             (v_mensaje->>'sesion_id')::uuid);
    end loop;

    -- Una generacion cancelada o fallida no produjo horario; no se toca el anterior.
    if p_estado in ('completada', 'inviable') then
        perform horarios.guardar_resultado_generacion(
            v_horario_id, p_sesiones, p_pendientes, p_conflictos, p_puntaje_final);
    end if;

    return horarios.obtener_generacion(p_generacion_id);
end;
$$;`,
  },
  {
    id: 'fn-guardar_resultado_generacion',
    nombre: 'guardar_resultado_generacion',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Reemplaza por completo el horario del plan: borra el resultado anterior y escribe el nuevo.',
    detalle: 'Es un reemplazo total, no una fusión. Por eso las tablas de resultado se consideran desechables entre corridas.',
    nota: 'devuelve integer · plpgsql · VOLATILE',
    tabla: '',
    linea: 3333,
    claves: '("uuid", "jsonb", "jsonb", "jsonb", numeric) rpc funcion p_plan_id p_sesiones p_pendientes p_conflictos p_costo_total',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
      { n: 'p_sesiones', t: 'jsonb', d: '' },
      { n: 'p_pendientes', t: 'jsonb', d: '\'[]\'' },
      { n: 'p_conflictos', t: 'jsonb', d: '\'[]\'' },
      { n: 'p_costo_total', t: 'numeric', d: '0' },
    ],
    pasos: [
      'Borra el resultado anterior del plan: sesiones, cohortes de sesión, pendientes y conflictos.',
      'Inserta las sesiones nuevas y, por cada una, las cohortes que asisten.',
      'Inserta lo que no se pudo colocar y los conflictos con sus sesiones.',
      'Recalcula las violaciones duras —conflictos duros más pendientes— y las guarda en el plan.',
      'Devuelve cuántas sesiones quedaron guardadas.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_resultado_generacion"("p_plan_id" "uuid", "p_sesiones" "jsonb", "p_pendientes" "jsonb" DEFAULT '[]'::"jsonb", "p_conflictos" "jsonb" DEFAULT '[]'::"jsonb", "p_costo_total" numeric DEFAULT 0) RETURNS integer
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    SET "jit" TO 'off'
    AS $$
declare
    v_sesion jsonb;
    v_conflicto jsonb;
    v_conflicto_id uuid;
    v_agrupacion uuid;
    v_sesiones_guardadas integer;
    v_violaciones_duras integer;
begin
    -- Una generación reemplaza por completo el horario anterior del mismo plan.
    delete from horarios.sesion_cohortes where horario_id = p_plan_id;
    delete from horarios.sesiones where horario_id = p_plan_id;
    delete from horarios.sesiones_no_asignadas where horario_id = p_plan_id;
    delete from horarios.conflicto_sesiones cs
        using horarios.conflictos c
        where cs.conflicto_id = c.id and c.horario_id = p_plan_id;
    delete from horarios.conflictos where horario_id = p_plan_id;

    for v_sesion in select value from jsonb_array_elements(coalesce(p_sesiones, '[]'::jsonb))
    loop
        v_agrupacion := (v_sesion->>'agrupacion_area_comun_id')::uuid;

        insert into horarios.sesiones
            (id, horario_id, curso_id, docente_id, aula_id, jornada_id, dia,
             indice_slot_inicio, duracion_slots, es_area_comun, agrupacion_area_comun_id,
             esta_fijada)
        values
            ((v_sesion->>'sesion_id')::uuid,
             p_plan_id,
             (v_sesion->>'curso_id')::uuid,
             (v_sesion->>'docente_id')::uuid,
             (v_sesion->>'aula_id')::uuid,
             (v_sesion->>'jornada_id')::uuid,
             (v_sesion->>'dia')::horarios.dia_semana,
             (v_sesion->>'indice_slot_inicio')::integer,
             (v_sesion->>'duracion_slots')::integer,
             v_agrupacion is not null,
             v_agrupacion,
             coalesce((v_sesion->>'esta_fijada')::boolean, false));

        -- Una sola sesión física para todas las cohortes involucradas (contexto.md §6.5).
        insert into horarios.sesion_cohortes (sesion_id, cohorte_id)
        select (v_sesion->>'sesion_id')::uuid, cohorte::uuid
        from jsonb_array_elements_text(coalesce(v_sesion->'cohortes', '[]'::jsonb)) as cohorte;
    end loop;

    insert into horarios.sesiones_no_asignadas
        (horario_id, curso_id, cohorte_id, motivo_no_asignacion, sugerencia_resolucion)
    select p_plan_id,
           (value->>'curso_id')::uuid,
           (value->>'cohorte_id')::uuid,
           value->>'motivo',
           value->>'sugerencia'
    from jsonb_array_elements(coalesce(p_pendientes, '[]'::jsonb));

    for v_conflicto in select value from jsonb_array_elements(coalesce(p_conflictos, '[]'::jsonb))
    loop
        insert into horarios.conflictos
            (horario_id, tipo, descripcion, severidad, es_restriccion_dura)
        values
            (p_plan_id, v_conflicto->>'tipo', v_conflicto->>'descripcion', 'alta', true)
        returning id into v_conflicto_id;

        insert into horarios.conflicto_sesiones (conflicto_id, sesion_id)
        select distinct v_conflicto_id, sesion::uuid
        from jsonb_array_elements_text(coalesce(v_conflicto->'sesiones', '[]'::jsonb)) as sesion
        where exists (select 1 from horarios.sesiones s where s.id = sesion::uuid);
    end loop;

    select count(*) into v_sesiones_guardadas
    from horarios.sesiones where horario_id = p_plan_id;

    select count(*) into v_violaciones_duras
    from horarios.conflictos where horario_id = p_plan_id and es_restriccion_dura;

    v_violaciones_duras := v_violaciones_duras +
        (select count(*) from horarios.sesiones_no_asignadas where horario_id = p_plan_id);

    update horarios.horarios
    set cantidad_violaciones_duras = v_violaciones_duras,
        costo_total_calculado = coalesce(p_costo_total, 0),
        fecha_generacion = now()
    where id = p_plan_id;

    return v_sesiones_guardadas;
end;
$$;`,
  },
  {
    id: 'fn-iniciar_generacion',
    nombre: 'iniciar_generacion',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Abre una corrida del motor en estado `generando`. La `clave_solicitud` impide que un doble clic lance dos corridas iguales.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 3442,
    claves: '("uuid", "text", "uuid", "uuid", "text", "text", "jsonb") rpc funcion p_periodo_id p_tipo_plan p_plan_id p_solicitada_por_id p_version_motor p_clave_solicitud p_instantanea_entrada',
    params: [
      { n: 'p_periodo_id', t: 'uuid', d: '' },
      { n: 'p_tipo_plan', t: 'text', d: '' },
      { n: 'p_plan_id', t: 'uuid', d: '' },
      { n: 'p_solicitada_por_id', t: 'uuid', d: '' },
      { n: 'p_version_motor', t: 'text', d: '' },
      { n: 'p_clave_solicitud', t: 'text', d: '' },
      { n: 'p_instantanea_entrada', t: 'jsonb', d: '' },
    ],
    pasos: [
      'Inserta la corrida en estado `generando`, con la instantánea de entrada y la clave de solicitud.',
      'Devuelve la corrida ya formateada, reutilizando `obtener_generacion`.',
    ],
    sql: `CREATE FUNCTION "horarios"."iniciar_generacion"("p_periodo_id" "uuid", "p_tipo_plan" "text", "p_plan_id" "uuid", "p_solicitada_por_id" "uuid", "p_version_motor" "text", "p_clave_solicitud" "text", "p_instantanea_entrada" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_id uuid;
begin
    insert into horarios.generaciones
        (periodo_id, tipo_plan, plan_id, solicitada_por_id, estado,
         version_motor, clave_solicitud, instantanea_entrada)
    values
        (p_periodo_id, p_tipo_plan::horarios.tipo_plan_horario, p_plan_id,
         p_solicitada_por_id, 'generando', p_version_motor,
         p_clave_solicitud, p_instantanea_entrada)
    returning id into v_id;
    return horarios.obtener_generacion(v_id);
end;
$$;`,
  },
  {
    id: 'fn-listar_generaciones_plan',
    nombre: 'listar_generaciones_plan',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Historial de corridas de un plan, de la más reciente a la más antigua.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3610,
    claves: '("uuid") rpc funcion p_plan_id',
    params: [
      { n: 'p_plan_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Toma las corridas del plan.',
      'Formatea cada una con `obtener_generacion` y las ordena de la más reciente a la más antigua.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_generaciones_plan"("p_plan_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(horarios.obtener_generacion(c.id)
        order by c.iniciada_en desc), '[]'::jsonb)
    from horarios.generaciones c where c.plan_id = p_plan_id;
$$;`,
  },
  {
    id: 'fn-obtener_generacion',
    nombre: 'obtener_generacion',
    cat: 'funcion',
    grupo: 'Motor de generación',
    desc: 'Estado y resultado de una corrida concreta.',
    detalle: '',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 3916,
    claves: '("uuid") rpc funcion p_generacion_id',
    params: [
      { n: 'p_generacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Arma un objeto con estado, tiempos, violaciones y puntajes de la corrida.',
      'Le anida sus mensajes ordenados por fecha.',
    ],
    sql: `CREATE FUNCTION "horarios"."obtener_generacion"("p_generacion_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select jsonb_build_object(
        'id', c.id,
        'plan_id', c.plan_id,
        'periodo_id', c.periodo_id,
        'estado', c.estado::text,
        'version_motor', c.version_motor,
        'iniciada_en', c.iniciada_en,
        'finalizada_en', c.finalizada_en,
        'duracion_ms', c.duracion_ms,
        'total_violaciones_duras', c.total_violaciones_duras,
        'total_sesiones_pendientes', c.total_sesiones_pendientes,
        'mensajes', coalesce((select jsonb_agg(jsonb_build_object(
            'codigo', m.codigo,
            'mensaje', m.mensaje,
            'severidad', m.severidad::text,
            'sesion_id', m.entidad_id) order by m.creado_en)
            from horarios.mensajes_generacion m
            where m.generacion_id = c.id), '[]'::jsonb),
        'puntaje_inicial', (c.instantanea_entrada->>'puntaje_inicial')::numeric,
        'puntaje_final', c.costo_final,
        'puntaje_desglose', c.puntaje_desglose)
    from horarios.generaciones c where c.id = p_generacion_id;
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
    linea: 837,
    claves: '("uuid") rpc funcion p_horario_derivado_id',
    params: [
      { n: 'p_horario_derivado_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Localiza el horario de origen y el último resultado de edición de la versión derivada.',
      'Recupera el mapa de sesiones origen→derivada que se guardó al crearla.',
      'Compara docente, aula, jornada, día, bloque y duración de cada pareja, y se queda solo con lo que difiere.',
      'Añade los conflictos duros que quedaron en la versión derivada.',
    ],
    sql: `CREATE FUNCTION "horarios"."comparar_version_horario"("p_horario_derivado_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 2248,
    claves: '("uuid", "uuid", "uuid", "uuid", "uuid", "text", integer, integer, integer, integer, "text", "text", "uuid") rpc funcion p_horario_origen_id p_sesion_origen_id p_docente_id p_aula_id p_jornada_id p_dia p_indice_slot_inicio p_duracion_slots p_minuto_inicio p_minuto_fin p_motivo p_clave_solicitud p_usuario_id',
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
    sql: `CREATE FUNCTION "horarios"."crear_version_derivada"("p_horario_origen_id" "uuid", "p_sesion_origen_id" "uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_dia" "text" DEFAULT NULL::"text", "p_indice_slot_inicio" integer DEFAULT NULL::integer, "p_duracion_slots" integer DEFAULT NULL::integer, "p_minuto_inicio" integer DEFAULT NULL::integer, "p_minuto_fin" integer DEFAULT NULL::integer, "p_motivo" "text" DEFAULT NULL::"text", "p_clave_solicitud" "text" DEFAULT NULL::"text", "p_usuario_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-guardar_reparacion_version',
    nombre: 'guardar_reparacion_version',
    cat: 'funcion',
    grupo: 'Edición manual y versiones',
    desc: 'Aplica al horario derivado las reubicaciones que calculó el motor de reparación.',
    detalle: '',
    nota: 'devuelve void · plpgsql · VOLATILE',
    tabla: '',
    linea: 3287,
    claves: '("uuid", boolean, "text", "jsonb", "jsonb", "uuid") rpc funcion p_horario_derivado_id p_fue_exitoso p_mensaje p_sesiones_movidas p_asignaciones p_usuario_id',
    params: [
      { n: 'p_horario_derivado_id', t: 'uuid', d: '' },
      { n: 'p_fue_exitoso', t: 'boolean', d: '' },
      { n: 'p_mensaje', t: 'text', d: '' },
      { n: 'p_sesiones_movidas', t: 'jsonb', d: '' },
      { n: 'p_asignaciones', t: 'jsonb', d: '' },
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Si la reparación fue exitosa, aplica cada reubicación a `sesiones` y refleja el cambio en `sesion_cohortes`.',
      'Registra el resultado en `resultados_edicion`, haya salido bien o mal.',
    ],
    sql: `CREATE FUNCTION "horarios"."guardar_reparacion_version"("p_horario_derivado_id" "uuid", "p_fue_exitoso" boolean, "p_mensaje" "text", "p_sesiones_movidas" "jsonb", "p_asignaciones" "jsonb", "p_usuario_id" "uuid") RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_asignacion jsonb;
begin
    if p_fue_exitoso then
        for v_asignacion in select value from jsonb_array_elements(p_asignaciones)
        loop
            update horarios.sesiones
            set docente_id = (v_asignacion->>'docente_id')::uuid,
                aula_id = (v_asignacion->>'aula_id')::uuid,
                jornada_id = (v_asignacion->>'jornada_id')::uuid,
                dia = (v_asignacion->>'dia')::horarios.dia_semana,
                indice_slot_inicio = (v_asignacion->>'indice_slot')::integer,
                minuto_inicio_dia = (v_asignacion->>'minuto_inicio')::integer,
                minuto_fin_dia = (v_asignacion->>'minuto_fin')::integer,
                actualizado_en = now()
            where id = (v_asignacion->>'sesion_id')::uuid
              and horario_id = p_horario_derivado_id;
            update horarios.sesion_cohortes
            set dia = (v_asignacion->>'dia')::horarios.dia_semana,
                indice_slot_inicio = (v_asignacion->>'indice_slot')::integer,
                minuto_inicio_dia = (v_asignacion->>'minuto_inicio')::integer,
                minuto_fin_dia = (v_asignacion->>'minuto_fin')::integer
            where sesion_id = (v_asignacion->>'sesion_id')::uuid
              and horario_id = p_horario_derivado_id;
        end loop;
    end if;

    insert into horarios.resultados_edicion
        (horario_id, fue_exitoso, mensaje_resultado, sesiones_movidas,
         creado_por_id, solicitud_edicion, sesiones_vecindario)
    values
        (p_horario_derivado_id, p_fue_exitoso, p_mensaje,
         coalesce(p_sesiones_movidas, '[]'::jsonb), p_usuario_id,
         '{}'::jsonb, coalesce(p_sesiones_movidas, '[]'::jsonb));
end;
$$;`,
  },
  {
    id: 'fn-consultar_datos_reporte',
    nombre: 'consultar_datos_reporte',
    cat: 'funcion',
    grupo: 'Consultas de horario',
    desc: 'Arma encabezados y filas para exportar a PDF o XLSX, también por curso. Exige que la generación esté `completada`.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · solo lee (STABLE)',
    tabla: '',
    linea: 1439,
    claves: '("uuid", "text", "uuid", "uuid", "uuid", "uuid", "uuid", "uuid", "uuid", "text") rpc funcion p_generacion_id p_vista p_filtro_id p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_aula_id p_periodo_id p_tipo_plan',
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
      'Si no, arma la tabla del horario —carrera, cohorte, curso, docente, aula, jornada, día, bloque y duración— aplicando los filtros por cohorte, docente, aula o curso.',
      'Devuelve encabezados y filas ya listos para exportar.',
    ],
    sql: `CREATE FUNCTION "horarios"."consultar_datos_reporte"("p_generacion_id" "uuid", "p_vista" "text", "p_filtro_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_periodo_id" "uuid" DEFAULT NULL::"uuid", "p_tipo_plan" "text" DEFAULT NULL::"text") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
          and (p_vista <> 'curso' or p_filtro_id is null or cu.id = p_filtro_id)
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
    linea: 1513,
    claves: '("uuid", "uuid", "uuid", "uuid", integer, boolean, boolean, "uuid", "uuid"[]) rpc funcion p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_limite p_publico p_ver_todo p_docente_alcance_id p_facultad_ids',
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
    sql: `CREATE FUNCTION "horarios"."consultar_horario_publicado"("p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_limite" integer DEFAULT 500, "p_publico" boolean DEFAULT true, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
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
    linea: 1558,
    claves: '("uuid", "uuid", "uuid", "uuid", "uuid", integer, integer, boolean, boolean, "uuid", "uuid"[]) rpc funcion p_carrera_id p_jornada_id p_cohorte_id p_docente_id p_aula_id p_pagina p_tamano_pagina p_publico p_ver_todo p_docente_alcance_id p_facultad_ids',
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
    sql: `CREATE FUNCTION "horarios"."consultar_horarios"("p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_pagina" integer DEFAULT 1, "p_tamano_pagina" integer DEFAULT 50, "p_publico" boolean DEFAULT true, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
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
    desc: 'Consulta paginada del horario para revisión, con conflictos y clases pendientes ubicadas por carrera, semestre, curso y cohorte.',
    detalle: 'Cada clase trae si está fijada a mano (`esta_fijada`), el curso con que la ve su cohorte y si es de área común con cuántas cohortes la comparten; cada pendiente trae su identidad y fecha.',
    nota: 'devuelve jsonb · sql · solo lee (STABLE)',
    tabla: '',
    linea: 1605,
    claves: '("uuid", "uuid", "uuid", "uuid", "uuid", "uuid", integer, integer, boolean, "uuid", "uuid"[]) rpc funcion p_horario_id p_cohorte_id p_docente_filtro_id p_aula_id p_carrera_id p_jornada_id p_pagina p_tamano_pagina p_ver_todo p_docente_alcance_id p_facultad_ids',
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
      'Junta sesiones, cursos, docentes, aulas, jornadas y cohortes del horario indicado; el curso es el que ve cada cohorte en su pensum.',
      'Marca las clases fijadas a mano y las de área común, con el total de cohortes de la sesión entera.',
      'Filtra por los parámetros dados y por el alcance del usuario.',
      'Pagina las sesiones y agrega, aparte, los conflictos y las sesiones pendientes.',
      'Devuelve todo en un solo objeto para la pantalla de revisión.',
    ],
    sql: `CREATE FUNCTION "horarios"."consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_filtro_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_pagina" integer DEFAULT 1, "p_tamano_pagina" integer DEFAULT 100, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    with periodo as (
        select h.periodo_id from horarios.horarios h where h.id = p_horario_id
    ), sesiones_filtradas as (
        select s.id as sesion_id, cu.nombre as curso, sc.curso_visible_id as curso_id,
               co.anio_ingreso::text || '-' || co.seccion as cohorte, co.id as cohorte_id,
               coalesce(cp.semestre_asignado, 0) as semestre,
               d.nombre_completo as docente, d.id as docente_id,
               a.codigo as aula, a.id as aula_id, ca.nombre as carrera, ca.id as carrera_id,
               j.nombre as jornada, j.id as jornada_id, s.dia::text as dia,
               s.indice_slot_inicio, s.duracion_slots,
               s.minuto_inicio_dia as minuto_inicio, s.minuto_fin_dia as minuto_fin,
               s.esta_fijada, s.es_area_comun,
               (select count(*)::integer from horarios.sesion_cohortes todas
                where todas.sesion_id = s.id) as total_cohortes,
               s.dia as dia_orden, co.anio_ingreso, co.seccion
        from horarios.sesiones s
        join horarios.docentes d on d.id = s.docente_id
        join horarios.aulas a on a.id = s.aula_id
        join horarios.jornadas j on j.id = s.jornada_id
        join horarios.sesion_cohortes sc on sc.sesion_id = s.id
        join horarios.cursos cu on cu.id = sc.curso_visible_id
        join horarios.cohortes co on co.id = sc.cohorte_id
        join horarios.carreras ca on ca.id = co.carrera_id
        left join horarios.cohorte_periodos cp
               on cp.cohorte_id = co.id
              and cp.periodo_id = (select periodo_id from periodo)
              and cp.eliminado_en is null
        where s.horario_id = p_horario_id
          and (p_cohorte_id is null or co.id = p_cohorte_id)
          and (p_docente_filtro_id is null or d.id = p_docente_filtro_id)
          and (p_aula_id is null or a.id = p_aula_id)
          and (p_carrera_id is null or ca.id = p_carrera_id)
          and (p_jornada_id is null or j.id = p_jornada_id)
          and (p_ver_todo
               or (p_docente_alcance_id is not null and d.id = p_docente_alcance_id)
               or ca.facultad_id = any(p_facultad_ids))
    ), jornadas_visibles as (
        select j.*, (extract(epoch from j.hora_inicio) / 60)::integer as minuto_base
        from horarios.jornadas j
        where j.id in (select jornada_id from sesiones_filtradas)
    ), slots as (
        select j.id as jornada_id, dia::text as dia, slot as indice_slot,
               j.minuto_base + (slot - 1) * j.duracion_bloque_minutos
                 + case when j.receso_despues_bloque > 0 and slot > j.receso_despues_bloque
                        then j.duracion_receso_minutos else 0 end as minuto_inicio,
               j.minuto_base + slot * j.duracion_bloque_minutos
                 + case when j.receso_despues_bloque > 0 and slot > j.receso_despues_bloque
                        then j.duracion_receso_minutos else 0 end as minuto_fin,
               exists (
                   select 1 from horarios.jornada_descansos d
                   where d.jornada_id = j.id and d.dia = dias.dia
                     and slot >= d.indice_slot_inicio
                     and slot < d.indice_slot_inicio + d.duracion_slots
               ) as es_receso
        from jornadas_visibles j
        cross join lateral unnest(j.dias_activos) as dias(dia)
        cross join lateral generate_series(1, j.bloques_por_dia) as numeros(slot)
        union all
        select j.id, dia::text, 0,
               j.minuto_base + j.receso_despues_bloque * j.duracion_bloque_minutos,
               j.minuto_base + j.receso_despues_bloque * j.duracion_bloque_minutos
                 + j.duracion_receso_minutos,
               true
        from jornadas_visibles j
        cross join lateral unnest(j.dias_activos) as dias(dia)
        where j.receso_despues_bloque > 0 and j.duracion_receso_minutos > 0
    ), pagina as (
        select * from sesiones_filtradas
        order by carrera, semestre, dia_orden, indice_slot_inicio, anio_ingreso, seccion
        limit nullif(p_tamano_pagina, 0) offset ((p_pagina - 1) * p_tamano_pagina)
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
        -- Un pendiente sale ubicado en su carrera y su semestre, y con el curso y la cohorte
        -- escritos igual que en las sesiones colocadas. Asi la pantalla puede enseñarlo dentro
        -- del horario, en el grupo al que le falta, en vez de en una lista aparte donde hay que
        -- buscar a mano de quien era cada hueco.
        select p.curso_id, p.cohorte_id, p.creado_en as registrado_en,
               cu.nombre            as curso,
               co.anio_ingreso::text || '-' || co.seccion as cohorte,
               ca.nombre                                  as carrera,
               coalesce(cp.semestre_asignado, 0)          as semestre,
               p.motivo_no_asignacion                     as motivo
        from horarios.sesiones_no_asignadas p
        join horarios.cursos cu on cu.id = p.curso_id
        join horarios.cohortes co on co.id = p.cohorte_id
        join horarios.carreras ca on ca.id = co.carrera_id
        left join horarios.cohorte_periodos cp
               on cp.cohorte_id = co.id
              and cp.periodo_id = (select periodo_id from periodo)
              and cp.eliminado_en is null
        where p.horario_id = p_horario_id
          -- Los mismos filtros que las sesiones, con los dos que aqui significan algo: una
          -- clase sin colocar no tiene docente, ni aula, ni jornada por los que filtrar.
          and (p_cohorte_id is null or co.id = p_cohorte_id)
          and (p_carrera_id is null or ca.id = p_carrera_id)
          and (p_ver_todo or ca.facultad_id = any(p_facultad_ids))
    )
    select jsonb_build_object(
        'slots', coalesce((select jsonb_agg(to_jsonb(slots)
            order by jornada_id, minuto_inicio, dia) from slots), '[]'::jsonb),
        'sesiones', coalesce((select jsonb_agg(to_jsonb(pagina) - 'dia_orden' - 'anio_ingreso' - 'seccion'
            order by carrera, semestre, dia_orden, indice_slot_inicio, anio_ingreso, seccion) from pagina), '[]'::jsonb),
        'conflictos', coalesce((select jsonb_agg(to_jsonb(conflictos) - 'creado_en'
            order by es_restriccion_dura desc, creado_en) from conflictos), '[]'::jsonb),
        'pendientes', coalesce((select jsonb_agg(to_jsonb(pendientes)
            order by carrera, semestre, curso, cohorte) from pendientes), '[]'::jsonb),
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
    linea: 3528,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Saca las cohortes distintas de la vista de horarios publicados.',
      'Arma para cada una la etiqueta «carrera · jornada · año-sección».',
      'Ordena por etiqueta y devuelve `[]` si no hay nada publicado.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_cohortes_publicadas"() RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
    linea: 3724,
    claves: '("uuid", "date") rpc funcion p_horario_id p_fecha',
    params: [
      { n: 'p_horario_id', t: 'uuid', d: '' },
      { n: 'p_fecha', t: 'date', d: '' },
    ],
    pasos: [
      'Recorre las sustituciones activas de las sesiones de ese horario, exigiendo que el horario esté publicado.',
      'Deja solo las vigentes en la fecha pedida según su tipo: la temporal por rango de fechas, la permanente desde su fecha de cambio.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_sustituciones_publicadas"("p_horario_id" "uuid", "p_fecha" "date") RETURNS "jsonb"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
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
    id: 'fn-contar_mis_notificaciones_no_leidas',
    nombre: 'contar_mis_notificaciones_no_leidas',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'El número de la campana: mensajes no leídos del usuario de la sesión.',
    detalle: '',
    nota: 'devuelve integer · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 1745,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Cuenta sus filas en `no_leida` de mensajes vivos; sin sesión devuelve 0.',
    ],
    sql: `CREATE FUNCTION "horarios"."contar_mis_notificaciones_no_leidas"() RETURNS integer
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select case when auth.uid() is null then 0 else count(*)::integer end
    from horarios.notificacion_destinatarios nd
    join horarios.notificaciones n on n.id = nd.notificacion_id
    where nd.destinatario_usuario_id = horarios.usuario_actual_id()
      and nd.estado = 'no_leida' and n.eliminado_en is null;
$$;`,
  },
  {
    id: 'fn-crear_notificacion_interna',
    nombre: 'crear_notificacion_interna',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Envía un mensaje interno a docentes elegidos o a todos los activos con cuenta.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 2010,
    claves: '("text", "text", "horarios"."prioridad_notificacion", "uuid"[], boolean) rpc funcion p_asunto p_mensaje p_prioridad p_destinatario_ids p_todos_activos',
    params: [
      { n: 'p_asunto', t: 'text', d: '' },
      { n: 'p_mensaje', t: 'text', d: '' },
      { n: 'p_prioridad', t: 'prioridad_notificacion', d: '\'normal\'' },
      { n: 'p_destinatario_ids', t: 'uuid[]', d: 'arreglo vacío' },
      { n: 'p_todos_activos', t: 'boolean', d: 'false' },
    ],
    pasos: [
      'Exige permiso (\'notificaciones\',\'crear\'); recorta y valida asunto (1–200) y mensaje (1–5000).',
      'Crea el mensaje con remitente, prioridad y canal `interno`.',
      'Crea una fila en la bandeja de cada docente activo con cuenta que corresponda; falla si no queda ninguno.',
      'Deja constancia en `auditoria` y devuelve id, cantidad de destinatarios y fecha.',
    ],
    sql: `CREATE FUNCTION "horarios"."crear_notificacion_interna"("p_asunto" "text", "p_mensaje" "text", "p_prioridad" "horarios"."prioridad_notificacion" DEFAULT 'normal'::"horarios"."prioridad_notificacion", "p_destinatario_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_todos_activos" boolean DEFAULT false) RETURNS "jsonb"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_usuario_id uuid := horarios.usuario_actual_id();
    v_notificacion_id uuid;
    v_cantidad integer;
    v_creado_en timestamptz;
begin
    if auth.uid() is null or v_usuario_id is null
       or not horarios.usuario_actual_tiene_permiso('notificaciones', 'crear') then
        raise exception 'No tiene permiso para crear notificaciones' using errcode = '42501';
    end if;
    p_asunto := btrim(coalesce(p_asunto, ''));
    p_mensaje := btrim(coalesce(p_mensaje, ''));
    if length(p_asunto) not between 1 and 200 then
        raise exception 'El asunto debe contener entre 1 y 200 caracteres';
    end if;
    if length(p_mensaje) not between 1 and 5000 then
        raise exception 'El mensaje debe contener entre 1 y 5000 caracteres';
    end if;

    insert into horarios.notificaciones
        (remitente_usuario_id, tipo_notificacion, asunto, mensaje_cuerpo, prioridad,
         canal_envio, fecha_creacion, actualizado_en)
    values
        (v_usuario_id, 'interna_docente', p_asunto, p_mensaje, p_prioridad,
         'interno', now(), now())
    returning id, fecha_creacion into v_notificacion_id, v_creado_en;

    insert into horarios.notificacion_destinatarios
        (notificacion_id, destinatario_usuario_id)
    select distinct v_notificacion_id, u.id
    from horarios.usuarios u
    join horarios.docentes d on d.id = u.docente_id
    where u.tipo = 'docente' and u.estado = 'activo' and u.eliminado_en is null
      and u.auth_user_id is not null and d.esta_activo and d.eliminado_en is null
      and (p_todos_activos or u.id = any(coalesce(p_destinatario_ids, '{}'::uuid[])));
    get diagnostics v_cantidad = row_count;
    if v_cantidad = 0 then raise exception 'Seleccione al menos un docente activo con cuenta'; end if;

    insert into horarios.auditoria
        (usuario_id, accion, entidad, entidad_id, valores_nuevos)
    values
        (v_usuario_id, 'crear', 'notificaciones', v_notificacion_id,
         jsonb_build_object('asunto', p_asunto, 'prioridad', p_prioridad,
                            'cantidad_destinatarios', v_cantidad));

    return jsonb_build_object('notificacion_id', v_notificacion_id,
                              'cantidad_destinatarios', v_cantidad,
                              'creado_en', v_creado_en);
end;
$$;`,
  },
  {
    id: 'fn-descartar_mi_notificacion',
    nombre: 'descartar_mi_notificacion',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Quita un mensaje de la propia bandeja sin borrarlo.',
    detalle: '',
    nota: 'devuelve boolean · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 2406,
    claves: '("uuid") rpc funcion p_notificacion_id',
    params: [
      { n: 'p_notificacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Exige sesión y pasa a `descartada` si no lo estaba.',
      'Falla si el mensaje no está en su bandeja; si cambió algo, lo audita.',
    ],
    sql: `CREATE FUNCTION "horarios"."descartar_mi_notificacion"("p_notificacion_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare v_usuario_id uuid := horarios.usuario_actual_id(); v_cambio integer;
begin
    if auth.uid() is null or v_usuario_id is null then raise exception 'Sesion requerida' using errcode='42501'; end if;
    update horarios.notificacion_destinatarios
       set estado = 'descartada', descartada_en = now(), actualizado_en = now()
     where notificacion_id = p_notificacion_id and destinatario_usuario_id = v_usuario_id
       and estado <> 'descartada';
    get diagnostics v_cambio = row_count;
    if not exists (select 1 from horarios.notificacion_destinatarios where notificacion_id=p_notificacion_id and destinatario_usuario_id=v_usuario_id) then
        raise exception 'Notificacion no encontrada';
    end if;
    if v_cambio = 1 then
      insert into horarios.auditoria(usuario_id, accion, entidad, entidad_id)
      values(v_usuario_id, 'descartar', 'notificacion_destinatarios', p_notificacion_id);
    end if;
    return true;
end;
$$;`,
  },
  {
    id: 'fn-listar_destinatarios_de_notificacion',
    nombre: 'listar_destinatarios_de_notificacion',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Quién recibió un mensaje y qué hizo con él.',
    detalle: '',
    nota: 'devuelve TABLE(usuario_id uuid, nombre_completo text, correo text, estado text, enviada_en timestamp with time zone, leida_en timestamp with time zone, descartada_en timestamp with time zone) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 3571,
    claves: '("uuid") rpc funcion p_notificacion_id',
    params: [
      { n: 'p_notificacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Exige permiso (\'notificaciones\',\'leer\').',
      'Devuelve usuario, correo, estado y las fechas de envío, lectura y descarte.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_destinatarios_de_notificacion"("p_notificacion_id" "uuid") RETURNS TABLE("usuario_id" "uuid", "nombre_completo" "text", "correo" "text", "estado" "text", "enviada_en" timestamp with time zone, "leida_en" timestamp with time zone, "descartada_en" timestamp with time zone)
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select u.id, u.nombre_completo::text, u.correo_institucional::text, nd.estado::text,
           nd.enviada_en, nd.leida_en, nd.descartada_en
    from horarios.notificacion_destinatarios nd
    join horarios.usuarios u on u.id=nd.destinatario_usuario_id
    where auth.uid() is not null
      and horarios.usuario_actual_tiene_permiso('notificaciones','leer')
      and nd.notificacion_id=p_notificacion_id
    order by u.nombre_completo, u.id;
$$;`,
  },
  {
    id: 'fn-listar_destinatarios_notificacion',
    nombre: 'listar_destinatarios_notificacion',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Los docentes a los que se puede escribir: activos, con cuenta y usuario vivo.',
    detalle: '',
    nota: 'devuelve TABLE(usuario_id uuid, docente_id uuid, nombre_completo text, correo text) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 3590,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Exige permiso (\'notificaciones\',\'crear\').',
      'Devuelve usuario, docente, nombre y correo, ordenados por nombre.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_destinatarios_notificacion"() RETURNS TABLE("usuario_id" "uuid", "docente_id" "uuid", "nombre_completo" "text", "correo" "text")
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select u.id, d.id, d.nombre_completo::text, d.correo::text
    from horarios.usuarios u
    join horarios.docentes d on d.id = u.docente_id
    where auth.uid() is not null
      and horarios.usuario_actual_tiene_permiso('notificaciones', 'crear')
      and u.tipo = 'docente' and u.estado = 'activo' and u.eliminado_en is null
      and u.auth_user_id is not null
      and d.esta_activo and d.eliminado_en is null
    order by d.nombre_completo, d.id;
$$;`,
  },
  {
    id: 'fn-listar_historial_notificaciones',
    nombre: 'listar_historial_notificaciones',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Historial de mensajes enviados con sus conteos de lectura, para quien administra.',
    detalle: '',
    nota: 'devuelve TABLE(notificacion_id uuid, asunto text, mensaje_resumen text, prioridad text, remitente text, enviada_en timestamp with time zone, total integer, no_leidas integer, leidas integer, descartadas integer, destinatarios_resumen text) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 3624,
    claves: '("text", timestamp with time zone, timestamp with time zone, integer, integer) rpc funcion p_prioridad p_desde p_hasta p_limite p_offset',
    params: [
      { n: 'p_prioridad', t: 'text', d: 'NULL' },
      { n: 'p_desde', t: 'timestamp with time zone', d: 'NULL with time zone' },
      { n: 'p_hasta', t: 'timestamp with time zone', d: 'NULL with time zone' },
      { n: 'p_limite', t: 'integer', d: '50' },
      { n: 'p_offset', t: 'integer', d: '0' },
    ],
    pasos: [
      'Exige permiso (\'notificaciones\',\'leer\').',
      'Agrupa por mensaje: remitente, resumen de 140 caracteres y conteos de no leídas, leídas y descartadas.',
      'Filtra por prioridad y fechas y pagina por fecha de envío descendente.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_historial_notificaciones"("p_prioridad" "text" DEFAULT NULL::"text", "p_desde" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_hasta" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_limite" integer DEFAULT 50, "p_offset" integer DEFAULT 0) RETURNS TABLE("notificacion_id" "uuid", "asunto" "text", "mensaje_resumen" "text", "prioridad" "text", "remitente" "text", "enviada_en" timestamp with time zone, "total" integer, "no_leidas" integer, "leidas" integer, "descartadas" integer, "destinatarios_resumen" "text")
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select n.id, n.asunto,
           case when length(n.mensaje_cuerpo) <= 140 then n.mensaje_cuerpo else left(n.mensaje_cuerpo, 140) || '…' end,
           n.prioridad::text, coalesce(r.nombre_completo, 'Sistema')::text,
           max(nd.enviada_en), count(nd.id)::integer,
           count(*) filter (where nd.estado = 'no_leida')::integer,
           count(*) filter (where nd.estado = 'leida')::integer,
           count(*) filter (where nd.estado = 'descartada')::integer,
           case when count(nd.id) = 1 then max(u.nombre_completo)::text
                else count(nd.id)::text || ' docentes' end
    from horarios.notificaciones n
    join horarios.notificacion_destinatarios nd on nd.notificacion_id = n.id
    join horarios.usuarios u on u.id = nd.destinatario_usuario_id
    left join horarios.usuarios r on r.id = n.remitente_usuario_id
    where auth.uid() is not null
      and horarios.usuario_actual_tiene_permiso('notificaciones', 'leer')
      and n.eliminado_en is null
      and (p_prioridad is null or n.prioridad::text = p_prioridad)
      and (p_desde is null or nd.enviada_en >= p_desde)
      and (p_hasta is null or nd.enviada_en <= p_hasta)
    group by n.id, r.nombre_completo
    order by max(nd.enviada_en) desc, n.id desc
    limit least(greatest(coalesce(p_limite, 50), 1), 100)
    offset greatest(coalesce(p_offset, 0), 0);
$$;`,
  },
  {
    id: 'fn-listar_mis_notificaciones',
    nombre: 'listar_mis_notificaciones',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'La bandeja del usuario de la sesión, filtrada y paginada.',
    detalle: '',
    nota: 'devuelve TABLE(notificacion_id uuid, asunto text, mensaje text, prioridad text, remitente text, creado_en timestamp with time zone, enviada_en timestamp with time zone, estado text, leida_en timestamp with time zone, descartada_en timestamp with time zone) · sql · solo lee (STABLE) · SECURITY DEFINER',
    tabla: '',
    linea: 3658,
    claves: '("text", "text", timestamp with time zone, timestamp with time zone, boolean, integer, integer) rpc funcion p_estado p_prioridad p_desde p_hasta p_incluir_descartadas p_limite p_offset',
    params: [
      { n: 'p_estado', t: 'text', d: 'NULL' },
      { n: 'p_prioridad', t: 'text', d: 'NULL' },
      { n: 'p_desde', t: 'timestamp with time zone', d: 'NULL with time zone' },
      { n: 'p_hasta', t: 'timestamp with time zone', d: 'NULL with time zone' },
      { n: 'p_incluir_descartadas', t: 'boolean', d: 'false' },
      { n: 'p_limite', t: 'integer', d: '20' },
      { n: 'p_offset', t: 'integer', d: '0' },
    ],
    pasos: [
      'Lee sus filas de `notificacion_destinatarios` con el mensaje y el remitente.',
      'Oculta las descartadas salvo que se pidan; filtra por estado, prioridad y rango de fechas.',
      'Ordena por fecha de envío descendente; límite entre 1 y 100.',
    ],
    sql: `CREATE FUNCTION "horarios"."listar_mis_notificaciones"("p_estado" "text" DEFAULT NULL::"text", "p_prioridad" "text" DEFAULT NULL::"text", "p_desde" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_hasta" timestamp with time zone DEFAULT NULL::timestamp with time zone, "p_incluir_descartadas" boolean DEFAULT false, "p_limite" integer DEFAULT 20, "p_offset" integer DEFAULT 0) RETURNS TABLE("notificacion_id" "uuid", "asunto" "text", "mensaje" "text", "prioridad" "text", "remitente" "text", "creado_en" timestamp with time zone, "enviada_en" timestamp with time zone, "estado" "text", "leida_en" timestamp with time zone, "descartada_en" timestamp with time zone)
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select n.id, n.asunto, n.mensaje_cuerpo, n.prioridad::text,
           coalesce(r.nombre_completo, 'Sistema')::text,
           n.fecha_creacion, nd.enviada_en, nd.estado::text, nd.leida_en, nd.descartada_en
    from horarios.notificacion_destinatarios nd
    join horarios.notificaciones n on n.id = nd.notificacion_id
    left join horarios.usuarios r on r.id = n.remitente_usuario_id
    where auth.uid() is not null
      and nd.destinatario_usuario_id = horarios.usuario_actual_id()
      and n.eliminado_en is null
      and (p_incluir_descartadas or nd.estado <> 'descartada')
      and (p_estado is null or nd.estado::text = p_estado)
      and (p_prioridad is null or n.prioridad::text = p_prioridad)
      and (p_desde is null or nd.enviada_en >= p_desde)
      and (p_hasta is null or nd.enviada_en <= p_hasta)
    order by nd.enviada_en desc, n.id desc
    limit least(greatest(coalesce(p_limite, 20), 1), 100)
    offset greatest(coalesce(p_offset, 0), 0);
$$;`,
  },
  {
    id: 'fn-marcar_mi_notificacion_leida',
    nombre: 'marcar_mi_notificacion_leida',
    cat: 'funcion',
    grupo: 'Notificaciones internas',
    desc: 'Marca como leído un mensaje de la propia bandeja.',
    detalle: '',
    nota: 'devuelve boolean · plpgsql · VOLATILE · SECURITY DEFINER',
    tabla: '',
    linea: 3781,
    claves: '("uuid") rpc funcion p_notificacion_id',
    params: [
      { n: 'p_notificacion_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Exige sesión y pasa a `leida` solo si estaba `no_leida`.',
      'Falla si el mensaje no está en su bandeja; si cambió algo, lo audita.',
    ],
    sql: `CREATE FUNCTION "horarios"."marcar_mi_notificacion_leida"("p_notificacion_id" "uuid") RETURNS boolean
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare v_usuario_id uuid := horarios.usuario_actual_id(); v_cambio integer;
begin
    if auth.uid() is null or v_usuario_id is null then raise exception 'Sesion requerida' using errcode='42501'; end if;
    update horarios.notificacion_destinatarios
       set estado = 'leida', leida_en = now(), descartada_en = null, actualizado_en = now()
     where notificacion_id = p_notificacion_id and destinatario_usuario_id = v_usuario_id
       and estado = 'no_leida';
    get diagnostics v_cambio = row_count;
    if not exists (select 1 from horarios.notificacion_destinatarios where notificacion_id=p_notificacion_id and destinatario_usuario_id=v_usuario_id) then
        raise exception 'Notificacion no encontrada';
    end if;
    if v_cambio = 1 then
      insert into horarios.auditoria(usuario_id, accion, entidad, entidad_id)
      values(v_usuario_id, 'leer', 'notificacion_destinatarios', p_notificacion_id);
    end if;
    return true;
end;
$$;`,
  },
  {
    id: 'fn-confirmar_importacion',
    nombre: 'confirmar_importacion',
    cat: 'funcion',
    grupo: 'Importación y mantenimiento',
    desc: 'Aplica un archivo ya validado: registra la importación y vuelca las filas a los catálogos que correspondan.',
    detalle: '',
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 1200,
    claves: '("text", "text", "text", "text", "text", integer, "uuid", "text", "jsonb", "jsonb") rpc funcion p_tipo_archivo p_nombre_archivo p_hash_archivo p_version_plantilla p_clave_solicitud p_total_filas p_solicitada_por_id p_codigo_plantilla p_filas p_resumen',
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
    sql: `CREATE FUNCTION "horarios"."confirmar_importacion"("p_tipo_archivo" "text", "p_nombre_archivo" "text", "p_hash_archivo" "text", "p_version_plantilla" "text", "p_clave_solicitud" "text", "p_total_filas" integer, "p_solicitada_por_id" "uuid", "p_codigo_plantilla" "text", "p_filas" "jsonb", "p_resumen" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    nota: 'devuelve jsonb · plpgsql · VOLATILE',
    tabla: '',
    linea: 4244,
    claves: '("text", "uuid", "text", "uuid") rpc funcion p_entidad p_entidad_id p_motivo p_usuario_id',
    params: [
      { n: 'p_entidad', t: 'text', d: '' },
      { n: 'p_entidad_id', t: 'uuid', d: '' },
      { n: 'p_motivo', t: 'text', d: '' },
      { n: 'p_usuario_id', t: 'uuid', d: '' },
    ],
    pasos: [
      'Comprueba que la tabla esté en la lista blanca de diez catálogos restaurables.',
      'Pone `eliminado_en` en nulo y sube `version_fila`; exige haber afectado exactamente una fila.',
      'Deja constancia en `auditoria` y avisa al usuario con una notificación en su bandeja (`notificacion_destinatarios`).',
    ],
    sql: `CREATE FUNCTION "horarios"."restaurar_entidad"("p_entidad" "text", "p_entidad_id" "uuid", "p_motivo" "text", "p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $_$
declare
    v_permitidas constant text[] := array['facultades','carreras','pensums','cohortes','cursos','docentes','aulas','jornadas','recursos','horarios'];
    v_afectadas integer; v_notificacion_id uuid;
begin
    if not p_entidad = any(v_permitidas) then raise exception 'Entidad no restaurable'; end if;
    execute format('update horarios.%I set eliminado_en=null, actualizado_en=now(), version_fila=version_fila+1 where id=$1 and eliminado_en is not null', p_entidad) using p_entidad_id;
    get diagnostics v_afectadas = row_count;
    if v_afectadas <> 1 then raise exception 'El elemento no existe, no esta eliminado o ya fue restaurado'; end if;
    insert into horarios.auditoria(usuario_id,accion,entidad,entidad_id,motivo,valores_nuevos)
    values(p_usuario_id,'restaurar',p_entidad,p_entidad_id,p_motivo,'{"eliminado_en":null}'::jsonb);
    insert into horarios.notificaciones(remitente_usuario_id,tipo_notificacion,asunto,mensaje_cuerpo,prioridad)
    values(p_usuario_id,'restauracion_logica','Elemento restaurado','Se restauro '||p_entidad||' '||p_entidad_id::text||'. Motivo: '||p_motivo,'normal')
    returning id into v_notificacion_id;
    insert into horarios.notificacion_destinatarios(notificacion_id,destinatario_usuario_id)
    values(v_notificacion_id,p_usuario_id);
    return jsonb_build_object('entidad',p_entidad,'entidad_id',p_entidad_id,'restaurado',true,'notificacion_id',v_notificacion_id);
end; $_$;`,
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
    linea: 479,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Pone `actualizado_en = now()` en la fila que se está guardando.',
    ],
    sql: `CREATE FUNCTION "horarios"."actualizar_marca"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    desc: 'Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: 'Está enganchada a 18 tablas. Nadie escribe esos dos campos a mano.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 493,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Pone `actualizado_en = now()`.',
      'Sube `version_fila` en uno respecto de la fila anterior.',
    ],
    sql: `CREATE FUNCTION "horarios"."actualizar_marca_con_version"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.actualizado_en = now();
  new.version_fila = old.version_fila + 1;
  return new;
end;
$$;`,
  },
  {
    id: 'fn-descartar_slot_extraordinario_bloqueado',
    nombre: 'descartar_slot_extraordinario_bloqueado',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Descarta en silencio un bloque de disponibilidad que el docente no puede ofrecer en una jornada extraordinaria.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql · SECURITY DEFINER',
    tabla: '',
    linea: 2434,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'En una jornada regular deja pasar la fila.',
      'Si el docente no está asignado a la jornada en ese período, devuelve NULL: la fila no se escribe.',
      'Si el slot está en `calcular_slots_bloqueados`, también la descarta.',
    ],
    sql: `CREATE FUNCTION "horarios"."descartar_slot_extraordinario_bloqueado"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
declare
    v_docente_id uuid;
    v_periodo_id uuid;
begin
    -- En una jornada regular no hay nada que revisar.
    if not exists (
        select 1
        from horarios.jornadas j
        where j.id = new.jornada_id
          and j.jornada_regular_id is not null)
    then
        return new;
    end if;

    select dd.docente_id, dd.periodo_id
      into v_docente_id, v_periodo_id
    from horarios.disponibilidades_docente dd
    where dd.id = new.disponibilidad_id;

    -- Descartar si el docente no está asignado a la jornada...
    if not exists (
        select 1
        from horarios.jornada_extraordinaria_docentes ad
        where ad.jornada_id = new.jornada_id
          and ad.periodo_id = v_periodo_id
          and ad.docente_id = v_docente_id)
    then
        return null;
    end if;

    -- ...o si el slot está bloqueado.
    if exists (
        select 1
        from horarios.calcular_slots_bloqueados(v_periodo_id, new.jornada_id, v_docente_id) b
        where b.dia = new.dia
          and b.indice_slot = new.indice_slot)
    then
        return null;
    end if;

    return new;
end;
$$;`,
  },
  {
    id: 'fn-exigir_curso_activo_en_autorizacion',
    nombre: 'exigir_curso_activo_en_autorizacion',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza autorizar a un docente sobre un curso inactivo.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2617,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Solo mira autorizaciones vigentes y vivas.',
      'Si el curso no está activo y vivo, aborta con `No se puede autorizar un curso inactivo`.',
    ],
    sql: `CREATE FUNCTION "horarios"."exigir_curso_activo_en_autorizacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    if new.esta_vigente and new.eliminado_en is null and not exists (
        select 1
          from horarios.cursos c
         where c.id = new.curso_id
           and c.esta_activo
           and c.eliminado_en is null
    ) then
        raise exception using
            errcode = '23514',
            message = 'No se puede autorizar un curso inactivo.';
    end if;

    return new;
end;
$$;`,
  },
  {
    id: 'fn-exigir_curso_activo_en_nueva_relacion',
    nombre: 'exigir_curso_activo_en_nueva_relacion',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Rechaza meter un curso inactivo en un curso común o en una agrupación de área común.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 2643,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Busca el curso de la fila nueva.',
      'Si no está activo y vivo, aborta: un curso inactivo no admite nuevas selecciones.',
    ],
    sql: `CREATE FUNCTION "horarios"."exigir_curso_activo_en_nueva_relacion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    if not exists (
        select 1
          from horarios.cursos c
         where c.id = new.curso_id
           and c.esta_activo
           and c.eliminado_en is null
    ) then
        raise exception using
            errcode = '23514',
            message = 'El curso está inactivo y no admite nuevas selecciones.';
    end if;

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
    linea: 4461,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee la cohorte y la duración de su carrera; falla si no existe o no está activa.',
      'Rechaza un semestre mayor que la duración de la carrera.',
      'Si se está activando, exige que el pensum tenga cursos para ese semestre.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_cohorte_periodo"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    linea: 4505,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga la jornada del receso.',
      'Rechaza un día que no esté entre los activos de esa jornada.',
      'Rechaza un receso que se salga de los bloques del día.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_descanso_en_jornada"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    linea: 4527,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga días activos y bloques de la jornada; falla si no existe o está inactiva.',
      'Rechaza días no activos y bloques fuera de rango.',
      'Rechaza un bloque que caiga sobre un receso de la jornada.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_disponibilidad_slot"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
declare
    v_dias_activos horarios.dia_semana[];
    v_bloques_por_dia integer;
begin
    select jornada.dias_activos, jornada.bloques_por_dia
      into v_dias_activos, v_bloques_por_dia
      from horarios.jornadas jornada
     where jornada.id = new.jornada_id
       and jornada.esta_activa
       and jornada.eliminado_en is null;

    if v_bloques_por_dia is null then
        raise exception 'La jornada % no existe o no esta activa', new.jornada_id;
    end if;

    if not new.dia = any(v_dias_activos) then
        raise exception 'La disponibilidad usa un dia no activo en la jornada %',
            new.jornada_id;
    end if;

    if new.indice_slot > v_bloques_por_dia then
        raise exception 'La disponibilidad excede los bloques de la jornada %',
            new.jornada_id;
    end if;

    if exists (
        select 1
          from horarios.jornada_descansos descanso
         where descanso.jornada_id = new.jornada_id
           and descanso.dia = new.dia
           and descanso.rango_slots &&
               int4range(new.indice_slot, new.indice_slot + 1, '[)')
    ) then
        raise exception 'La disponibilidad cae sobre un descanso de la jornada %',
            new.jornada_id;
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
    desc: 'Impide pasar un horario a publicado si no cumple los requisitos de publicación, contando solo las cohortes de las jornadas del plan.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 4577,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Solo actúa cuando el estado pasa a pendiente de aprobación, aprobado o publicado.',
      'Toma las jornadas del plan: las cohortes que exige cubrir son solo las de esas jornadas.',
      'Exige cero violaciones duras, cero conflictos duros, cero pendientes y al menos una sesión, todas con cohorte.',
      'Comprueba cada sesión: cohorte activa en el período, misma jornada, curso dentro del pensum y semestre, docente autorizado y área común completa y con un solo docente.',
      'Verifica aulas compatibles y con recursos, capacidad suficiente, un solo docente por curso y cohorte, disponibilidad confirmada y respeto de la carga máxima.',
      'En planes de clases exige además que se cubran los bloques semanales exactos del pensum.',
      'Exige aprobador y publicador con sus fechas, y admite solo las transiciones de estado permitidas.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_horario_publicable"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
  v_jornadas_plan uuid[] := array(
    select pj.jornada_id from horarios.plan_jornadas pj where pj.plan_id = new.id);
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
            and adc.curso_id in (select ce.curso_id from horarios.cursos_equivalentes(sc.curso_visible_id) ce)
            and adc.esta_vigente
            and adc.eliminado_en is null
            and (adc.jornada_id is null or adc.jornada_id = co.jornada_id)
        )
    ) then
      raise exception 'El horario % tiene docentes no autorizados para el curso de su cohorte o para su jornada',
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
          and horarios.jornada_en_alcance(co.jornada_id, v_jornadas_plan)
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
          and horarios.jornada_en_alcance(co.jornada_id, v_jornadas_plan)
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
    linea: 4990,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Si la importación trae plantilla, comprueba que exista y que acepte ese tipo de archivo.',
      'Rellena la versión de plantilla si venía vacía, o falla si no coincide con la vigente.',
      'Sella `finalizada_en` cuando la importación llega a un estado final.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_importacion_plantilla"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    id: 'fn-validar_jornada_extraordinaria',
    nombre: 'validar_jornada_extraordinaria',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Mantiene coherente la pareja jornada extraordinaria ↔ jornada regular.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 5032,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Si la jornada es extraordinaria, exige que su regular exista, no sea a su vez extraordinaria y tenga bloques de la misma duración.',
      'Si es una regular con extraordinarias colgando, le impide volverse extraordinaria, cambiar la duración de sus bloques o darse de baja.',
      'Desactivarla sí se permite: el motor sigue leyendo su reloj.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_jornada_extraordinaria"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO ''
    AS $$
declare
    v_regular horarios.jornadas;
begin
    -- a) Una jornada extraordinaria necesita una regular válida, y sus bloques duran lo mismo:
    --    si no, los slots de las dos no se podrían comparar uno a uno en la pantalla.
    if new.jornada_regular_id is not null then
        select * into v_regular
        from horarios.jornadas j
        where j.id = new.jornada_regular_id
          and j.eliminado_en is null;

        if not found then
            raise exception 'La jornada regular % no existe', new.jornada_regular_id
                using errcode = 'foreign_key_violation';
        end if;

        if v_regular.jornada_regular_id is not null then
            raise exception 'La jornada % ya es extraordinaria: una extraordinaria no puede colgar de otra', v_regular.nombre
                using errcode = 'check_violation';
        end if;

        if v_regular.duracion_bloque_minutos <> new.duracion_bloque_minutos then
            raise exception 'Los bloques de una jornada extraordinaria deben durar % minutos, como los de %',
                v_regular.duracion_bloque_minutos, v_regular.nombre
                using errcode = 'check_violation';
        end if;
    end if;

    -- b) Una regular con extraordinarias colgando no puede romperlas: ni volverse
    --    extraordinaria, ni cambiar la duración de sus bloques, ni darse de baja.
    --    Desactivarla sí se puede: el preparador del motor sigue leyendo su reloj.
    if tg_op = 'UPDATE' and exists (
        select 1
        from horarios.jornadas e
        where e.jornada_regular_id = new.id
          and e.eliminado_en is null)
    then
        if new.jornada_regular_id is not null then
            raise exception 'La jornada % tiene jornadas extraordinarias: no puede volverse extraordinaria', new.nombre
                using errcode = 'check_violation';
        end if;

        if new.duracion_bloque_minutos <> old.duracion_bloque_minutos then
            raise exception 'La jornada % tiene jornadas extraordinarias: no se puede cambiar la duración de sus bloques', new.nombre
                using errcode = 'check_violation';
        end if;

        if new.eliminado_en is not null and old.eliminado_en is null then
            raise exception 'La jornada % tiene jornadas extraordinarias: dalas de baja primero', new.nombre
                using errcode = 'check_violation';
        end if;
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
    linea: 5098,
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
    sql: `CREATE FUNCTION "horarios"."validar_sesion_en_jornada"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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

  -- La autorizacion vale para el curso y para sus equivalentes: un curso_comun es la
  -- misma clase con el nombre de cada carrera, y quien puede darla en una puede darla en
  -- todas. Es la regla que completar_sesion_cohorte y validar_horario_publicable aplican
  -- desde 202608280001; esta funcion se quedo fuera de aquel cambio.
  --
  -- Y se comprueba tambien cuando la sesion es de area comun: antes se saltaba entera,
  -- asi que una sesion compartida podia salir con un docente sin autorizar. El curso de
  -- la sesion es el principal de la agrupacion, cuyos equivalentes son justo los demas
  -- nombres de esa clase, de modo que no hace falta ninguna excepcion.
  if not exists (
    select 1
    from asignaciones_docente_curso adc
    where adc.docente_id = new.docente_id
      and adc.curso_id in (
        select ce.curso_id from horarios.cursos_equivalentes(new.curso_id) ce)
      and adc.esta_vigente
      and adc.eliminado_en is null
  ) then
    raise exception 'El docente % no esta autorizado para impartir el curso % ni ninguno de sus equivalentes',
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
    linea: 5365,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Lee la sesión afectada con su horario y período, y exige que el horario esté publicado.',
      'Comprueba que el docente original coincida con el de la sesión.',
      'Exige que todas las fechas del evento caigan dentro del período académico.',
      'Si hay docente entrante: que esté activo, autorizado para todas las cohortes de la sesión, libre en ese bloque y disponible en él.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_sustitucion_docente_original"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
$$;`,
  },
  {
    id: 'fn-validar_un_publicado_por_alcance',
    nombre: 'validar_un_publicado_por_alcance',
    cat: 'funcion',
    grupo: 'Trigger · validación',
    desc: 'Un solo horario publicado por período y tipo… salvo planes extraordinarios con jornadas distintas.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql · SECURITY DEFINER',
    tabla: '',
    linea: 5528,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Solo actúa si el horario queda publicado y vivo.',
      'Toma un advisory lock por período y tipo de plan para serializar publicaciones simultáneas.',
      'Falla si ya hay otro publicado y ambos son de jornadas regulares, o si comparten alguna jornada.',
    ],
    sql: `CREATE FUNCTION "horarios"."validar_un_publicado_por_alcance"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
    if new.estado <> 'publicado' or new.eliminado_en is not null then
        return new;
    end if;

    perform pg_advisory_xact_lock(
        hashtextextended('horarios.publicado:' || new.periodo_id::text || ':' || new.tipo_plan::text, 0));

    if exists (
        select 1
        from horarios.horarios otro
        where otro.periodo_id = new.periodo_id
          and otro.tipo_plan = new.tipo_plan
          and otro.estado = 'publicado'
          and otro.eliminado_en is null
          and otro.id <> new.id
          and (
              -- Los dos son de jornadas regulares.
              (not horarios.plan_es_extraordinario(new.id)
               and not horarios.plan_es_extraordinario(otro.id))
              -- O comparten alguna jornada.
              or exists (
                  select 1
                  from horarios.plan_jornadas mio
                  join horarios.plan_jornadas suyo on suyo.jornada_id = mio.jornada_id
                  where mio.plan_id = new.id
                    and suyo.plan_id = otro.id)))
    then
        raise exception 'Ya hay un horario publicado para este período con ese alcance: archívalo antes de publicar otro'
            using errcode = 'unique_violation';
    end if;

    return new;
end;
$$;`,
  },
  {
    id: 'fn-aplicar_receso_a_sesion',
    nombre: 'aplicar_receso_a_sesion',
    cat: 'funcion',
    grupo: 'Trigger · completar y derivar',
    desc: 'Traduce bloques a minutos de reloj insertando el receso de la jornada. Si al correrse la sesión se sale del día, aborta.',
    detalle: 'El motor razona en bloques y no sabe nada de recesos; este trigger es el que convierte esos bloques en horas reales.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 508,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Carga la jornada de la sesión.',
      'Si la sesión empieza después del receso, corre inicio y fin; si lo cruza, corre solo el fin.',
      'Si al correrse se pasa del fin de la jornada, aborta.',
    ],
    sql: `CREATE FUNCTION "horarios"."aplicar_receso_a_sesion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
    linea: 924,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Copia de la sesión el horario, la fecha, el día, los bloques y los minutos.',
      'Comprueba que la cohorte exista, esté activa, participe en el período y sea de la misma jornada que la sesión.',
      'Resuelve qué curso del pensum le toca a esa cohorte —por la agrupación, si es área común— y lo guarda en `curso_en_pensum_id` y `curso_visible_id`.',
      'Exige docente autorizado, un solo docente por curso y cohorte, y aula compatible con recursos suficientes.',
      'Suma la matrícula de todas las cohortes de la sesión y rechaza si supera la capacidad del aula.',
    ],
    sql: `CREATE FUNCTION "horarios"."completar_sesion_cohorte"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
      and adc.curso_id in (select ce.curso_id from horarios.cursos_equivalentes(v_curso_visible_id) ce)
      and adc.esta_vigente
      and adc.eliminado_en is null
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
    id: 'fn-limpiar_miembros_curso_comun',
    nombre: 'limpiar_miembros_curso_comun',
    cat: 'funcion',
    grupo: 'Trigger · propagación',
    desc: 'Retira la membresía de un curso común cuando se marca como eliminado.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 3486,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'El trigger se activa al cambiar `eliminado_en` de NULL a una fecha.',
      'Borra los vínculos del grupo en `curso_comun_cursos` y devuelve la fila nueva.',
    ],
    sql: `CREATE FUNCTION "horarios"."limpiar_miembros_curso_comun"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    delete from horarios.curso_comun_cursos where curso_comun_id = new.id;
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
    linea: 4048,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Copia a todas las filas de `sesion_cohortes` de esa sesión el horario, la fecha, el día, los bloques y los minutos nuevos.',
    ],
    sql: `CREATE FUNCTION "horarios"."propagar_cambio_sesion_a_cohortes"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    linea: 4271,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Reescribe las filas de `sesion_cohortes` de la sesión sin cambiarles el valor.',
      'Ese UPDATE en apariencia vacío vuelve a disparar las validaciones de `completar_sesion_cohorte`.',
    ],
    sql: `CREATE FUNCTION "horarios"."revalidar_cohortes_de_sesion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    linea: 588,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Si el horario que se intenta borrar está aprobado, publicado o archivado, aborta.',
    ],
    sql: `CREATE FUNCTION "horarios"."bloquear_eliminacion_horario_oficial"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    id: 'fn-bloquear_generacion_publicada',
    nombre: 'bloquear_generacion_publicada',
    cat: 'funcion',
    grupo: 'Trigger · bloqueo e inmutabilidad',
    desc: 'Impide tocar la corrida del motor asociada a un horario ya publicado.',
    detalle: '',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 605,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Mira el `plan_id` de la corrida.',
      'Si el horario de ese plan está publicado o archivado, aborta.',
    ],
    sql: `CREATE FUNCTION "horarios"."bloquear_generacion_publicada"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
declare
    v_horario_id uuid;
begin
    if tg_op = 'DELETE' then
        v_horario_id = old.plan_id;
    else
        v_horario_id = new.plan_id;
    end if;

    if exists (
        select 1
        from horarios.horarios
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
    id: 'fn-bloquear_horario_publicado',
    nombre: 'bloquear_horario_publicado',
    cat: 'funcion',
    grupo: 'Trigger · bloqueo e inmutabilidad',
    desc: 'Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'Para cambiar un horario publicado hay que crear una versión derivada. Esta es la barrera que lo obliga.',
    nota: 'devuelve trigger · plpgsql',
    tabla: '',
    linea: 640,
    claves: '() rpc funcion ',
    params: [],
    pasos: [
      'Toma el `horario_id` de la fila nueva o de la vieja, según sea alta, cambio o baja.',
      'Si ese horario está publicado o archivado, aborta con excepción.',
    ],
    sql: `CREATE FUNCTION "horarios"."bloquear_horario_publicado"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
    desc: 'Sobre `agrupaciones_area_comun`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'agrupaciones_area_comun',
    linea: 8104,
    claves: 'actualizar_marca_con_version agrupaciones_area_comun trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "agrupaciones_area_comun_actualizar_trg" BEFORE UPDATE ON "horarios"."agrupaciones_area_comun" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-asignaciones_docente_curso_actualizar_trg',
    nombre: 'asignaciones_docente_curso_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `asignaciones_docente_curso`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'asignaciones_docente_curso',
    linea: 8118,
    claves: 'actualizar_marca_con_version asignaciones_docente_curso trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "asignaciones_docente_curso_actualizar_trg" BEFORE UPDATE ON "horarios"."asignaciones_docente_curso" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-aulas_actualizar_trg',
    nombre: 'aulas_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `aulas`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'aulas',
    linea: 8125,
    claves: 'actualizar_marca_con_version aulas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "aulas_actualizar_trg" BEFORE UPDATE ON "horarios"."aulas" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-carreras_actualizar_trg',
    nombre: 'carreras_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `carreras`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'carreras',
    linea: 8132,
    claves: 'actualizar_marca_con_version carreras trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "carreras_actualizar_trg" BEFORE UPDATE ON "horarios"."carreras" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-cohorte_periodos_actualizar_trg',
    nombre: 'cohorte_periodos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cohorte_periodos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cohorte_periodos',
    linea: 8139,
    claves: 'actualizar_marca_con_version cohorte_periodos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "cohorte_periodos_actualizar_trg" BEFORE UPDATE ON "horarios"."cohorte_periodos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-cohortes_actualizar_trg',
    nombre: 'cohortes_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cohortes`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cohortes',
    linea: 8153,
    claves: 'actualizar_marca_con_version cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "cohortes_actualizar_trg" BEFORE UPDATE ON "horarios"."cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-configuraciones_motor_actualizar_trg',
    nombre: 'configuraciones_motor_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `configuraciones_motor`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'configuraciones_motor',
    linea: 8160,
    claves: 'actualizar_marca configuraciones_motor trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "configuraciones_motor_actualizar_trg" BEFORE UPDATE ON "horarios"."configuraciones_motor" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-curso_comun_actualizar_trg',
    nombre: 'curso_comun_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `curso_comun`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'curso_comun',
    linea: 8167,
    claves: 'actualizar_marca_con_version curso_comun trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "curso_comun_actualizar_trg" BEFORE UPDATE ON "horarios"."curso_comun" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-cursos_actualizar_trg',
    nombre: 'cursos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cursos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cursos',
    linea: 8188,
    claves: 'actualizar_marca_con_version cursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "cursos_actualizar_trg" BEFORE UPDATE ON "horarios"."cursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-cursos_en_pensum_actualizar_trg',
    nombre: 'cursos_en_pensum_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `cursos_en_pensum`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'cursos_en_pensum',
    linea: 8195,
    claves: 'actualizar_marca_con_version cursos_en_pensum trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "cursos_en_pensum_actualizar_trg" BEFORE UPDATE ON "horarios"."cursos_en_pensum" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
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
    linea: 8216,
    claves: 'actualizar_marca disponibilidades_docente trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "disponibilidades_docente_actualizar_trg" BEFORE UPDATE ON "horarios"."disponibilidades_docente" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-docentes_actualizar_trg',
    nombre: 'docentes_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `docentes`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'docentes',
    linea: 8223,
    claves: 'actualizar_marca_con_version docentes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "docentes_actualizar_trg" BEFORE UPDATE ON "horarios"."docentes" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-eventos_sustitucion_actualizar_trg',
    nombre: 'eventos_sustitucion_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `eventos_sustitucion`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'eventos_sustitucion',
    linea: 8230,
    claves: 'actualizar_marca_con_version eventos_sustitucion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "eventos_sustitucion_actualizar_trg" BEFORE UPDATE ON "horarios"."eventos_sustitucion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-facultades_actualizar_trg',
    nombre: 'facultades_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `facultades`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'facultades',
    linea: 8244,
    claves: 'actualizar_marca_con_version facultades trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "facultades_actualizar_trg" BEFORE UPDATE ON "horarios"."facultades" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-horarios_actualizar_trg',
    nombre: 'horarios_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `horarios`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'horarios',
    linea: 8251,
    claves: 'actualizar_marca_con_version horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "horarios_actualizar_trg" BEFORE UPDATE ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-jornadas_actualizar_trg',
    nombre: 'jornadas_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `jornadas`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'jornadas',
    linea: 8293,
    claves: 'actualizar_marca_con_version jornadas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "jornadas_actualizar_trg" BEFORE UPDATE ON "horarios"."jornadas" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-notificacion_destinatarios_actualizar_trg',
    nombre: 'notificacion_destinatarios_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `notificacion_destinatarios`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'notificacion_destinatarios',
    linea: 8307,
    claves: 'actualizar_marca notificacion_destinatarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "notificacion_destinatarios_actualizar_trg" BEFORE UPDATE ON "horarios"."notificacion_destinatarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-notificaciones_actualizar_trg',
    nombre: 'notificaciones_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `notificaciones`. Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca()',
    tabla: 'notificaciones',
    linea: 8314,
    claves: 'actualizar_marca notificaciones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "notificaciones_actualizar_trg" BEFORE UPDATE ON "horarios"."notificaciones" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-pensums_actualizar_trg',
    nombre: 'pensums_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `pensums`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'pensums',
    linea: 8321,
    claves: 'actualizar_marca_con_version pensums trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "pensums_actualizar_trg" BEFORE UPDATE ON "horarios"."pensums" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
  },
  {
    id: 'trg-periodos_academicos_actualizar_trg',
    nombre: 'periodos_academicos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `periodos_academicos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'periodos_academicos',
    linea: 8328,
    claves: 'actualizar_marca_con_version periodos_academicos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "periodos_academicos_actualizar_trg" BEFORE UPDATE ON "horarios"."periodos_academicos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
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
    linea: 8335,
    claves: 'actualizar_marca plantillas_importacion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "plantillas_importacion_actualizar_trg" BEFORE UPDATE ON "horarios"."plantillas_importacion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
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
    linea: 8342,
    claves: 'actualizar_marca plantillas_notificacion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "plantillas_notificacion_actualizar_trg" BEFORE UPDATE ON "horarios"."plantillas_notificacion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-recursos_actualizar_trg',
    nombre: 'recursos_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `recursos`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'recursos',
    linea: 8349,
    claves: 'actualizar_marca_con_version recursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "recursos_actualizar_trg" BEFORE UPDATE ON "horarios"."recursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
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
    linea: 8356,
    claves: 'actualizar_marca roles trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "roles_actualizar_trg" BEFORE UPDATE ON "horarios"."roles" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-usuarios_actualizar_trg',
    nombre: 'usuarios_actualizar_trg',
    cat: 'trigger',
    grupo: 'Marca de tiempo y versión',
    desc: 'Sobre `usuarios`. Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.',
    detalle: '',
    nota: 'BEFORE UPDATE · por fila · actualizar_marca_con_version()',
    tabla: 'usuarios',
    linea: 8391,
    claves: 'actualizar_marca_con_version usuarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "usuarios_actualizar_trg" BEFORE UPDATE ON "horarios"."usuarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();`,
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
    linea: 8398,
    claves: 'actualizar_marca ventanas_disponibilidad trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "ventanas_disponibilidad_actualizar_trg" BEFORE UPDATE ON "horarios"."ventanas_disponibilidad" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();`,
  },
  {
    id: 'trg-agrupacion_area_curso_activo',
    nombre: 'agrupacion_area_curso_activo',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `agrupacion_area_comun_cursos`. Rechaza meter un curso inactivo en un curso común o en una agrupación de área común.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de curso_id · por fila · exigir_curso_activo_en_nueva_relacion()',
    tabla: 'agrupacion_area_comun_cursos',
    linea: 8097,
    claves: 'exigir_curso_activo_en_nueva_relacion agrupacion_area_comun_cursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "agrupacion_area_curso_activo" BEFORE INSERT OR UPDATE OF "curso_id" ON "horarios"."agrupacion_area_comun_cursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."exigir_curso_activo_en_nueva_relacion"();`,
  },
  {
    id: 'trg-asignacion_docente_curso_activo',
    nombre: 'asignacion_docente_curso_activo',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `asignaciones_docente_curso`. Rechaza autorizar a un docente sobre un curso inactivo.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de curso_id, esta_vigente, eliminado_en · por fila · exigir_curso_activo_en_autorizacion()',
    tabla: 'asignaciones_docente_curso',
    linea: 8111,
    claves: 'exigir_curso_activo_en_autorizacion asignaciones_docente_curso trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "asignacion_docente_curso_activo" BEFORE INSERT OR UPDATE OF "curso_id", "esta_vigente", "eliminado_en" ON "horarios"."asignaciones_docente_curso" FOR EACH ROW EXECUTE FUNCTION "horarios"."exigir_curso_activo_en_autorizacion"();`,
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
    linea: 8146,
    claves: 'validar_cohorte_periodo cohorte_periodos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "cohorte_periodos_validar_trg" BEFORE INSERT OR UPDATE OF "cohorte_id", "semestre_asignado", "esta_activa" ON "horarios"."cohorte_periodos" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_cohorte_periodo"();`,
  },
  {
    id: 'trg-curso_comun_curso_activo',
    nombre: 'curso_comun_curso_activo',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `curso_comun_cursos`. Rechaza meter un curso inactivo en un curso común o en una agrupación de área común.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de curso_id · por fila · exigir_curso_activo_en_nueva_relacion()',
    tabla: 'curso_comun_cursos',
    linea: 8174,
    claves: 'exigir_curso_activo_en_nueva_relacion curso_comun_cursos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "curso_comun_curso_activo" BEFORE INSERT OR UPDATE OF "curso_id" ON "horarios"."curso_comun_cursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."exigir_curso_activo_en_nueva_relacion"();`,
  },
  {
    id: 'trg-disponibilidad_descartar_slot_extraordinario_trg',
    nombre: 'disponibilidad_descartar_slot_extraordinario_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `disponibilidad_docente_slots`. Descarta en silencio un bloque de disponibilidad que el docente no puede ofrecer en una jornada extraordinaria.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE · por fila · descartar_slot_extraordinario_bloqueado()',
    tabla: 'disponibilidad_docente_slots',
    linea: 8202,
    claves: 'descartar_slot_extraordinario_bloqueado disponibilidad_docente_slots trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "disponibilidad_descartar_slot_extraordinario_trg" BEFORE INSERT OR UPDATE ON "horarios"."disponibilidad_docente_slots" FOR EACH ROW EXECUTE FUNCTION "horarios"."descartar_slot_extraordinario_bloqueado"();`,
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
    linea: 8209,
    claves: 'validar_disponibilidad_slot disponibilidad_docente_slots trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "disponibilidad_docente_slots_validar_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "dia", "indice_slot" ON "horarios"."disponibilidad_docente_slots" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_disponibilidad_slot"();`,
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
    linea: 8237,
    claves: 'validar_sustitucion_docente_original eventos_sustitucion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "eventos_sustitucion_validar_docente_trg" BEFORE INSERT OR UPDATE OF "tipo", "sesion_afectada_id", "docente_original_id", "docente_entrante_id", "fecha_inicio", "fecha_fin", "fecha_cambio", "fecha_ausencia", "fecha_recuperacion", "fecha_cancelada" ON "horarios"."eventos_sustitucion" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_sustitucion_docente_original"();`,
  },
  {
    id: 'trg-horarios_un_publicado_por_alcance_trg',
    nombre: 'horarios_un_publicado_por_alcance_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `horarios`. Un solo horario publicado por período y tipo… salvo planes extraordinarios con jornadas distintas.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de estado, eliminado_en, periodo_id, tipo_plan · por fila · validar_un_publicado_por_alcance()',
    tabla: 'horarios',
    linea: 8265,
    claves: 'validar_un_publicado_por_alcance horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "horarios_un_publicado_por_alcance_trg" BEFORE INSERT OR UPDATE OF "estado", "eliminado_en", "periodo_id", "tipo_plan" ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_un_publicado_por_alcance"();`,
  },
  {
    id: 'trg-horarios_validar_publicacion_trg',
    nombre: 'horarios_validar_publicacion_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `horarios`. Impide pasar un horario a publicado si no cumple los requisitos de publicación, contando solo las cohortes de las jornadas del plan.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE de periodo_id, tipo_plan, estado, cantidad_violaciones_duras, fecha_aprobacion, fecha_publicacion, aprobado_por_id, publicado_por_id, eliminado_en · por fila · validar_horario_publicable()',
    tabla: 'horarios',
    linea: 8272,
    claves: 'validar_horario_publicable horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "horarios_validar_publicacion_trg" BEFORE INSERT OR UPDATE OF "periodo_id", "tipo_plan", "estado", "cantidad_violaciones_duras", "fecha_aprobacion", "fecha_publicacion", "aprobado_por_id", "publicado_por_id", "eliminado_en" ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_horario_publicable"();`,
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
    linea: 8279,
    claves: 'validar_importacion_plantilla importaciones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "importaciones_validar_plantilla_trg" BEFORE INSERT OR UPDATE OF "tipo_archivo", "plantilla_id", "plantilla_version", "estado", "finalizada_en" ON "horarios"."importaciones" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_importacion_plantilla"();`,
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
    linea: 8286,
    claves: 'validar_descanso_en_jornada jornada_descansos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "jornada_descansos_validar_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "dia", "indice_slot_inicio", "duracion_slots" ON "horarios"."jornada_descansos" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_descanso_en_jornada"();`,
  },
  {
    id: 'trg-jornadas_validar_extraordinaria_trg',
    nombre: 'jornadas_validar_extraordinaria_trg',
    cat: 'trigger',
    grupo: 'Validación',
    desc: 'Sobre `jornadas`. Mantiene coherente la pareja jornada extraordinaria ↔ jornada regular.',
    detalle: '',
    nota: 'BEFORE INSERT, UPDATE · por fila · validar_jornada_extraordinaria()',
    tabla: 'jornadas',
    linea: 8300,
    claves: 'validar_jornada_extraordinaria jornadas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "jornadas_validar_extraordinaria_trg" BEFORE INSERT OR UPDATE ON "horarios"."jornadas" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_jornada_extraordinaria"();`,
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
    linea: 8384,
    claves: 'validar_sesion_en_jornada sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "sesiones_validar_jornada_trg" BEFORE INSERT OR UPDATE OF "horario_id", "curso_id", "docente_id", "aula_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "es_area_comun", "agrupacion_area_comun_id" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_sesion_en_jornada"();`,
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
    linea: 8363,
    claves: 'completar_sesion_cohorte sesion_cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "sesion_cohortes_completar_trg" BEFORE INSERT OR UPDATE OF "sesion_id", "cohorte_id", "horario_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "minuto_inicio_dia", "minuto_fin_dia" ON "horarios"."sesion_cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."completar_sesion_cohorte"();`,
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
    linea: 8454,
    claves: 'aplicar_receso_a_sesion sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "zz_sesiones_aplicar_receso_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "indice_slot_inicio", "duracion_slots" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."aplicar_receso_a_sesion"();`,
  },
  {
    id: 'trg-curso_comun_limpiar_miembros_trg',
    nombre: 'curso_comun_limpiar_miembros_trg',
    cat: 'trigger',
    grupo: 'Propagación',
    desc: 'Sobre `curso_comun`. Retira la membresía de un curso común cuando se marca como eliminado.',
    detalle: '',
    nota: 'AFTER UPDATE · por fila · limpiar_miembros_curso_comun()',
    tabla: 'curso_comun',
    linea: 8181,
    claves: 'limpiar_miembros_curso_comun curso_comun trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "curso_comun_limpiar_miembros_trg" AFTER UPDATE ON "horarios"."curso_comun" FOR EACH ROW WHEN ((("old"."eliminado_en" IS NULL) AND ("new"."eliminado_en" IS NOT NULL))) EXECUTE FUNCTION "horarios"."limpiar_miembros_curso_comun"();`,
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
    linea: 8370,
    claves: 'propagar_cambio_sesion_a_cohortes sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "sesiones_propagar_cohortes_trg" AFTER UPDATE OF "horario_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."propagar_cambio_sesion_a_cohortes"();`,
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
    linea: 8377,
    claves: 'revalidar_cohortes_de_sesion sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "sesiones_revalidar_cohortes_trg" AFTER UPDATE OF "horario_id", "curso_id", "docente_id", "aula_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "es_area_comun", "agrupacion_area_comun_id" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."revalidar_cohortes_de_sesion"();`,
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
    linea: 8258,
    claves: 'bloquear_eliminacion_horario_oficial horarios trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "horarios_bloquear_delete_oficial_trg" BEFORE DELETE ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_eliminacion_horario_oficial"();`,
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
    linea: 8405,
    claves: 'bloquear_horario_publicado conflictos trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_conflictos_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."conflictos" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_generaciones_trg',
    nombre: 'z_bloquear_horario_publicado_generaciones_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `generaciones`. Impide tocar la corrida del motor asociada a un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_generacion_publicada()',
    tabla: 'generaciones',
    linea: 8412,
    claves: 'bloquear_generacion_publicada generaciones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_generaciones_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."generaciones" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_generacion_publicada"();`,
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
    linea: 8419,
    claves: 'bloquear_horario_publicado resultados_edicion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_resultados_edicion_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."resultados_edicion" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
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
    linea: 8426,
    claves: 'bloquear_horario_publicado sesion_cohortes trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_sesion_cohortes_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesion_cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_sesiones_no_asignadas_trg',
    nombre: 'z_bloquear_horario_publicado_sesiones_no_asignadas_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `sesiones_no_asignadas`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'sesiones_no_asignadas',
    linea: 8433,
    claves: 'bloquear_horario_publicado sesiones_no_asignadas trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_sesiones_no_asignadas_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesiones_no_asignadas" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
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
    linea: 8440,
    claves: 'bloquear_horario_publicado sesiones trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_sesiones_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
  },
  {
    id: 'trg-z_bloquear_horario_publicado_sugerencias_seccion_trg',
    nombre: 'z_bloquear_horario_publicado_sugerencias_seccion_trg',
    cat: 'trigger',
    grupo: 'Bloqueo e inmutabilidad',
    desc: 'Sobre `sugerencias_seccion`. Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.',
    detalle: 'El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético.',
    nota: 'BEFORE INSERT, DELETE, UPDATE · por fila · bloquear_horario_publicado()',
    tabla: 'sugerencias_seccion',
    linea: 8447,
    claves: 'bloquear_horario_publicado sugerencias_seccion trigger',
    params: [],
    pasos: [],
    sql: `CREATE TRIGGER "z_bloquear_horario_publicado_sugerencias_seccion_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sugerencias_seccion" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();`,
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
    linea: 7031,
    claves: 'agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_pkey" PRIMARY KEY ("agrupacion_id", "cohorte_id");`,
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
    linea: 7039,
    claves: 'agrupacion_area_comun_cursos agrupacion_area_comun_cursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_pkey" PRIMARY KEY ("agrupacion_id", "curso_id");`,
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
    linea: 7047,
    claves: 'agrupaciones_area_comun agrupaciones_area_comun_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_pkey" PRIMARY KEY ("id");`,
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
    linea: 7055,
    claves: 'asignaciones_docente_curso asignaciones_docente_curso_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_pkey" PRIMARY KEY ("id");`,
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
    linea: 7063,
    claves: 'auditoria auditoria_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."auditoria"
    ADD CONSTRAINT "auditoria_pkey" PRIMARY KEY ("id");`,
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
    linea: 7071,
    claves: 'aula_recursos aula_recursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_pkey" PRIMARY KEY ("aula_id", "recurso_id");`,
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
    linea: 7079,
    claves: 'aulas aulas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."aulas"
    ADD CONSTRAINT "aulas_pkey" PRIMARY KEY ("id");`,
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
    linea: 7087,
    claves: 'cambios_detectados cambios_detectados_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_pkey" PRIMARY KEY ("id");`,
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
    linea: 7095,
    claves: 'carrera_jornadas carrera_jornadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_pkey" PRIMARY KEY ("carrera_id", "jornada_id");`,
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
    linea: 7103,
    claves: 'carreras carreras_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."carreras"
    ADD CONSTRAINT "carreras_pkey" PRIMARY KEY ("id");`,
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
    linea: 7111,
    claves: 'cohorte_periodos cohorte_periodos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_pkey" PRIMARY KEY ("id");`,
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
    linea: 7119,
    claves: 'cohortes cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-configuracion_motor_restricciones_pkey',
    nombre: 'configuracion_motor_restricciones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `configuracion_motor_restricciones`: identifica cada fila por (configuracion_id, restriccion_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'configuracion_motor_restricciones',
    linea: 7127,
    claves: 'configuracion_motor_restricciones configuracion_motor_restricciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_pkey" PRIMARY KEY ("configuracion_id", "restriccion_id");`,
  },
  {
    id: 'cons-configuraciones_motor_pkey',
    nombre: 'configuraciones_motor_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `configuraciones_motor`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'configuraciones_motor',
    linea: 7135,
    claves: 'configuraciones_motor configuraciones_motor_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."configuraciones_motor"
    ADD CONSTRAINT "configuraciones_motor_pkey" PRIMARY KEY ("id");`,
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
    linea: 7143,
    claves: 'conflicto_sesiones conflicto_sesiones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_pkey" PRIMARY KEY ("conflicto_id", "sesion_id");`,
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
    linea: 7151,
    claves: 'conflictos conflictos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."conflictos"
    ADD CONSTRAINT "conflictos_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-curso_comun_cursos_pkey',
    nombre: 'curso_comun_cursos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `curso_comun_cursos`: identifica cada fila por (curso_comun_id, curso_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'curso_comun_cursos',
    linea: 7159,
    claves: 'curso_comun_cursos curso_comun_cursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_pkey" PRIMARY KEY ("curso_comun_id", "curso_id");`,
  },
  {
    id: 'cons-curso_comun_pkey',
    nombre: 'curso_comun_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `curso_comun`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'curso_comun',
    linea: 7167,
    claves: 'curso_comun curso_comun_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_comun"
    ADD CONSTRAINT "curso_comun_pkey" PRIMARY KEY ("id");`,
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
    linea: 7175,
    claves: 'curso_recursos_requeridos curso_recursos_requeridos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_pkey" PRIMARY KEY ("curso_id", "recurso_id");`,
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
    linea: 7191,
    claves: 'cursos_en_pensum cursos_en_pensum_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pkey" PRIMARY KEY ("id");`,
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
    linea: 7222,
    claves: 'cursos cursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_pkey" PRIMARY KEY ("id");`,
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
    linea: 7230,
    claves: 'disponibilidad_docente_slots disponibilidad_docente_slots_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_pkey" PRIMARY KEY ("disponibilidad_id", "jornada_id", "dia", "indice_slot");`,
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
    linea: 7246,
    claves: 'disponibilidades_docente disponibilidades_docente_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-docente_facultades_pkey',
    nombre: 'docente_facultades_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `docente_facultades`: identifica cada fila por (docente_id, facultad_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'docente_facultades',
    linea: 7254,
    claves: 'docente_facultades docente_facultades_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_pkey" PRIMARY KEY ("docente_id", "facultad_id");`,
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
    linea: 7262,
    claves: 'docentes docentes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."docentes"
    ADD CONSTRAINT "docentes_pkey" PRIMARY KEY ("id");`,
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
    linea: 7270,
    claves: 'eventos_sustitucion eventos_sustitucion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_pkey" PRIMARY KEY ("id");`,
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
    linea: 7278,
    claves: 'facultades facultades_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."facultades"
    ADD CONSTRAINT "facultades_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-generaciones_pkey',
    nombre: 'generaciones_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `generaciones`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'generaciones',
    linea: 7286,
    claves: 'generaciones generaciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_pkey" PRIMARY KEY ("id");`,
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
    linea: 7294,
    claves: 'historial_estados_horario historial_estados_horario_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_pkey" PRIMARY KEY ("id");`,
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
    linea: 7302,
    claves: 'horarios horarios_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_pkey" PRIMARY KEY ("id");`,
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
    linea: 7310,
    claves: 'importacion_errores importacion_errores_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."importacion_errores"
    ADD CONSTRAINT "importacion_errores_pkey" PRIMARY KEY ("id");`,
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
    linea: 7318,
    claves: 'importaciones importaciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_pkey" PRIMARY KEY ("id");`,
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
    linea: 7334,
    claves: 'jornada_descansos jornada_descansos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-jornada_extraordinaria_docentes_pkey',
    nombre: 'jornada_extraordinaria_docentes_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `jornada_extraordinaria_docentes`: identifica cada fila por (jornada_id, periodo_id, docente_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 7342,
    claves: 'jornada_extraordinaria_docentes jornada_extraordinaria_docentes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_docentes"
    ADD CONSTRAINT "jornada_extraordinaria_docentes_pkey" PRIMARY KEY ("jornada_id", "periodo_id", "docente_id");`,
  },
  {
    id: 'cons-jornada_extraordinaria_periodos_pkey',
    nombre: 'jornada_extraordinaria_periodos_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `jornada_extraordinaria_periodos`: identifica cada fila por (jornada_id, periodo_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 7350,
    claves: 'jornada_extraordinaria_periodos jornada_extraordinaria_periodos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_periodos"
    ADD CONSTRAINT "jornada_extraordinaria_periodos_pkey" PRIMARY KEY ("jornada_id", "periodo_id");`,
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
    linea: 7358,
    claves: 'jornadas jornadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornadas"
    ADD CONSTRAINT "jornadas_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-mensajes_generacion_pkey',
    nombre: 'mensajes_generacion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `mensajes_generacion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'mensajes_generacion',
    linea: 7366,
    claves: 'mensajes_generacion mensajes_generacion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."mensajes_generacion"
    ADD CONSTRAINT "mensajes_generacion_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-notificacion_destinatarios_pkey',
    nombre: 'notificacion_destinatarios_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `notificacion_destinatarios`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'notificacion_destinatarios',
    linea: 7374,
    claves: 'notificacion_destinatarios notificacion_destinatarios_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificacion_destinatarios"
    ADD CONSTRAINT "notificacion_destinatarios_pkey" PRIMARY KEY ("id");`,
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
    linea: 7390,
    claves: 'notificaciones notificaciones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id");`,
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
    linea: 7406,
    claves: 'pensums pensums_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_pkey" PRIMARY KEY ("id");`,
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
    linea: 7414,
    claves: 'periodos_academicos periodos_academicos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."periodos_academicos"
    ADD CONSTRAINT "periodos_academicos_pkey" PRIMARY KEY ("id");`,
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
    linea: 7422,
    claves: 'permisos_acceso permisos_acceso_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."permisos_acceso"
    ADD CONSTRAINT "permisos_acceso_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-plan_carreras_pkey',
    nombre: 'plan_carreras_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `plan_carreras`: identifica cada fila por (plan_id, carrera_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'plan_carreras',
    linea: 7438,
    claves: 'plan_carreras plan_carreras_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_pkey" PRIMARY KEY ("plan_id", "carrera_id");`,
  },
  {
    id: 'cons-plan_jornadas_pkey',
    nombre: 'plan_jornadas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `plan_jornadas`: identifica cada fila por (plan_id, jornada_id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'plan_jornadas',
    linea: 7446,
    claves: 'plan_jornadas plan_jornadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_pkey" PRIMARY KEY ("plan_id", "jornada_id");`,
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
    linea: 7462,
    claves: 'plantillas_importacion plantillas_importacion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plantillas_importacion"
    ADD CONSTRAINT "plantillas_importacion_pkey" PRIMARY KEY ("id");`,
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
    linea: 7470,
    claves: 'plantillas_notificacion plantillas_notificacion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plantillas_notificacion"
    ADD CONSTRAINT "plantillas_notificacion_pkey" PRIMARY KEY ("id");`,
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
    linea: 7478,
    claves: 'recursos recursos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."recursos"
    ADD CONSTRAINT "recursos_pkey" PRIMARY KEY ("id");`,
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
    linea: 7486,
    claves: 'reportes reportes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-restricciones_horario_pkey',
    nombre: 'restricciones_horario_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `restricciones_horario`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'restricciones_horario',
    linea: 7502,
    claves: 'restricciones_horario restricciones_horario_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."restricciones_horario"
    ADD CONSTRAINT "restricciones_horario_pkey" PRIMARY KEY ("id");`,
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
    linea: 7510,
    claves: 'resultado_edicion_conflictos resultado_edicion_conflictos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_pkey" PRIMARY KEY ("resultado_edicion_id", "conflicto_id");`,
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
    linea: 7518,
    claves: 'resultados_edicion resultados_edicion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_pkey" PRIMARY KEY ("id");`,
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
    linea: 7526,
    claves: 'rol_permisos rol_permisos_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_pkey" PRIMARY KEY ("rol_id", "permiso_id");`,
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
    linea: 7534,
    claves: 'roles roles_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");`,
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
    linea: 7557,
    claves: 'sesion_cohortes sesion_cohortes_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_pkey" PRIMARY KEY ("sesion_id", "cohorte_id");`,
  },
  {
    id: 'cons-sesiones_no_asignadas_pkey',
    nombre: 'sesiones_no_asignadas_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `sesiones_no_asignadas`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'sesiones_no_asignadas',
    linea: 7603,
    claves: 'sesiones_no_asignadas sesiones_no_asignadas_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_pkey" PRIMARY KEY ("id");`,
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
    linea: 7611,
    claves: 'sesiones sesiones_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id");`,
  },
  {
    id: 'cons-sugerencias_seccion_pkey',
    nombre: 'sugerencias_seccion_pkey',
    cat: 'restriccion',
    grupo: 'Claves primarias',
    desc: 'Clave primaria de `sugerencias_seccion`: identifica cada fila por (id).',
    detalle: '',
    nota: 'PRIMARY KEY',
    tabla: 'sugerencias_seccion',
    linea: 7619,
    claves: 'sugerencias_seccion sugerencias_seccion_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_pkey" PRIMARY KEY ("id");`,
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
    linea: 7627,
    claves: 'usuario_facultades usuario_facultades_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_pkey" PRIMARY KEY ("usuario_id", "facultad_id");`,
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
    linea: 7635,
    claves: 'usuario_roles usuario_roles_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("usuario_id", "rol_id");`,
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
    linea: 7651,
    claves: 'usuarios usuarios_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");`,
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
    linea: 7667,
    claves: 'ventanas_disponibilidad ventanas_disponibilidad_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_pkey" PRIMARY KEY ("id");`,
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
    linea: 7683,
    claves: 'versiones_horario versiones_horario_pkey',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_pkey" PRIMARY KEY ("id");`,
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
    linea: 7183,
    claves: 'cursos_en_pensum cursos_en_pensum_pensum_id_curso_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pensum_id_curso_id_key" UNIQUE ("pensum_id", "curso_id");`,
  },
  {
    id: 'cons-cursos_id_pensum_id_key',
    nombre: 'cursos_id_pensum_id_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `cursos` con el mismo valor de (id, pensum_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'cursos',
    linea: 7214,
    claves: 'cursos cursos_id_pensum_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_id_pensum_id_key" UNIQUE ("id", "pensum_id");`,
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
    linea: 7238,
    claves: 'disponibilidades_docente disponibilidades_docente_docente_id_periodo_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_docente_id_periodo_id_key" UNIQUE ("docente_id", "periodo_id");`,
  },
  {
    id: 'cons-notificacion_destinatarios_unicos',
    nombre: 'notificacion_destinatarios_unicos',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `notificacion_destinatarios` con el mismo valor de (notificacion_id, destinatario_usuario_id).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'notificacion_destinatarios',
    linea: 7382,
    claves: 'notificacion_destinatarios notificacion_destinatarios_unicos',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificacion_destinatarios"
    ADD CONSTRAINT "notificacion_destinatarios_unicos" UNIQUE ("notificacion_id", "destinatario_usuario_id");`,
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
    linea: 7398,
    claves: 'pensums pensums_id_carrera_uq',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_id_carrera_uq" UNIQUE ("id", "carrera_id");`,
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
    linea: 7430,
    claves: 'permisos_acceso permisos_acceso_recurso_accion_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."permisos_acceso"
    ADD CONSTRAINT "permisos_acceso_recurso_accion_key" UNIQUE ("recurso", "accion");`,
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
    linea: 7454,
    claves: 'plantillas_importacion plantillas_importacion_codigo_version_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plantillas_importacion"
    ADD CONSTRAINT "plantillas_importacion_codigo_version_key" UNIQUE ("codigo", "version");`,
  },
  {
    id: 'cons-restricciones_horario_nombre_key',
    nombre: 'restricciones_horario_nombre_key',
    cat: 'restriccion',
    grupo: 'Claves únicas',
    desc: 'No admite dos filas de `restricciones_horario` con el mismo valor de (nombre).',
    detalle: '',
    nota: 'UNIQUE',
    tabla: 'restricciones_horario',
    linea: 7494,
    claves: 'restricciones_horario restricciones_horario_nombre_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."restricciones_horario"
    ADD CONSTRAINT "restricciones_horario_nombre_key" UNIQUE ("nombre");`,
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
    linea: 7595,
    claves: 'sesiones sesiones_id_horario_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_id_horario_id_key" UNIQUE ("id", "horario_id");`,
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
    linea: 7643,
    claves: 'usuarios usuarios_auth_user_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_auth_user_id_key" UNIQUE ("auth_user_id");`,
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
    linea: 7659,
    claves: 'ventanas_disponibilidad ventanas_disponibilidad_periodo_id_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_periodo_id_key" UNIQUE ("periodo_id");`,
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
    linea: 7675,
    claves: 'versiones_horario versiones_horario_horario_id_numero_version_key',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_horario_id_numero_version_key" UNIQUE ("horario_id", "numero_version");`,
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
    linea: 7326,
    claves: 'jornada_descansos jornada_descansos_no_solapados',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_no_solapados" EXCLUDE USING "gist" ("jornada_id" WITH =, "dia" WITH =, "rango_slots" WITH &&);`,
  },
  {
    id: 'cons-sesion_cohortes_no_solapadas',
    nombre: 'sesion_cohortes_no_solapadas',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Un mismo grupo de estudiantes no puede tener dos clases encima. Diferible: el guardado de una edición manual la comprueba al confirmar.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesion_cohortes',
    linea: 7542,
    claves: 'sesion_cohortes sesion_cohortes_no_solapadas',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_no_solapadas" EXCLUDE USING "gist" ("horario_id" WITH =, "cohorte_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&) DEFERRABLE;`,
  },
  {
    id: 'cons-sesiones_aula_no_solapada',
    nombre: 'sesiones_aula_no_solapada',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Dos clases no pueden ocupar el mismo salón a la misma hora. Diferible: el guardado de una edición manual la comprueba al confirmar.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesiones',
    linea: 7565,
    claves: 'sesiones sesiones_aula_no_solapada',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_aula_no_solapada" EXCLUDE USING "gist" ("horario_id" WITH =, "aula_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&) DEFERRABLE;`,
  },
  {
    id: 'cons-sesiones_docente_no_solapado',
    nombre: 'sesiones_docente_no_solapado',
    cat: 'restriccion',
    grupo: 'Exclusión · anti-solape',
    desc: 'Un docente no puede estar en dos clases a la vez. Lo garantiza la base con una restricción de exclusión, no el código de la aplicación. Diferible: el guardado de una edición manual la comprueba al confirmar.',
    detalle: 'Se lee así: no pueden existir dos filas donde todas esas condiciones sean ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar incluso con dos usuarios escribiendo al mismo tiempo.',
    nota: 'EXCLUDE USING gist',
    tabla: 'sesiones',
    linea: 7580,
    claves: 'sesiones sesiones_docente_no_solapado',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_docente_no_solapado" EXCLUDE USING "gist" ("horario_id" WITH =, "docente_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&) DEFERRABLE;`,
  },
  {
    id: 'cons-cursos_en_pensum_sesiones_enteras_check',
    nombre: 'cursos_en_pensum_sesiones_enteras_check',
    cat: 'restriccion',
    grupo: 'Restricciones CHECK',
    desc: 'Una materia se dicta en sesiones enteras: los bloques semanales exactos tienen que ser múltiplo de la duración de cada sesión (`duracion_slots`). Es la regla BloquesSemanalesCompletos.',
    detalle: 'NOT VALID: vale para toda fila nueva o modificada, pero no se comprobaron las filas que ya existían al crearla.',
    nota: 'CHECK · NOT VALID',
    tabla: 'cursos_en_pensum',
    linea: 7199,
    claves: 'cursos_en_pensum cursos_en_pensum_sesiones_enteras_check check',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_sesiones_enteras_check" CHECK ((("duracion_slots" > 0) AND (("bloques_semanales_exactos" % "duracion_slots") = 0))) NOT VALID;`,
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
    linea: 8461,
    claves: 'agrupacion_area_comun_cohortes agrupaciones_area_comun agrupacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_agrupacion_id_fkey" FOREIGN KEY ("agrupacion_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE CASCADE;`,
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
    linea: 8469,
    claves: 'agrupacion_area_comun_cohortes cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;`,
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
    linea: 8477,
    claves: 'agrupacion_area_comun_cursos agrupaciones_area_comun agrupacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_agrupacion_id_fkey" FOREIGN KEY ("agrupacion_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE CASCADE;`,
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
    linea: 8485,
    claves: 'agrupacion_area_comun_cursos cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
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
    linea: 8493,
    claves: 'agrupaciones_area_comun usuarios creada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_creada_por_id_fkey" FOREIGN KEY ("creada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-agrupaciones_area_comun agrupaciones_area_comun_curso_comun_id_fkey',
    nombre: 'agrupaciones_area_comun agrupaciones_area_comun_curso_comun_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupaciones_area_comun` apunta a `curso_comun` por curso_comun_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupaciones_area_comun.curso_comun_id → curso_comun.id · ON DELETE RESTRICT',
    tabla: 'agrupaciones_area_comun',
    linea: 8501,
    claves: 'agrupaciones_area_comun curso_comun curso_comun_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_curso_comun_id_fkey" FOREIGN KEY ("curso_comun_id") REFERENCES "horarios"."curso_comun"("id") ON DELETE RESTRICT;`,
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
    linea: 8509,
    claves: 'agrupaciones_area_comun cursos curso_principal_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_curso_principal_id_fkey" FOREIGN KEY ("curso_principal_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-agrupaciones_area_comun agrupaciones_area_comun_jornada_id_fkey',
    nombre: 'agrupaciones_area_comun agrupaciones_area_comun_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `agrupaciones_area_comun` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'agrupaciones_area_comun.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'agrupaciones_area_comun',
    linea: 8517,
    claves: 'agrupaciones_area_comun jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 8525,
    claves: 'agrupaciones_area_comun periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;`,
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
    linea: 8613,
    claves: 'carrera_jornadas carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE CASCADE;`,
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
    linea: 8621,
    claves: 'carrera_jornadas jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 8629,
    claves: 'carreras facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."carreras"
    ADD CONSTRAINT "carreras_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;`,
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
    linea: 8637,
    claves: 'cohorte_periodos cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;`,
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
    linea: 8645,
    claves: 'cohorte_periodos periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;`,
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
    linea: 8653,
    claves: 'cohortes carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;`,
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
    linea: 8661,
    claves: 'cohortes carrera_jornadas carrera_id, jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_carrera_id_jornada_id_fkey" FOREIGN KEY ("carrera_id", "jornada_id") REFERENCES "horarios"."carrera_jornadas"("carrera_id", "jornada_id");`,
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
    linea: 8669,
    claves: 'cohortes jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 8677,
    claves: 'cohortes pensums pensum_id, carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pensum_id_carrera_id_fkey" FOREIGN KEY ("pensum_id", "carrera_id") REFERENCES "horarios"."pensums"("id", "carrera_id");`,
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
    linea: 8685,
    claves: 'cohortes pensums pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-curso_comun_cursos curso_comun_cursos_curso_fkey',
    nombre: 'curso_comun_cursos curso_comun_cursos_curso_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `curso_comun_cursos` apunta a `cursos` por curso_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'curso_comun_cursos.curso_id → cursos.id · ON DELETE CASCADE',
    tabla: 'curso_comun_cursos',
    linea: 8733,
    claves: 'curso_comun_cursos cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_curso_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-curso_comun_cursos curso_comun_cursos_grupo_fkey',
    nombre: 'curso_comun_cursos curso_comun_cursos_grupo_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `curso_comun_cursos` apunta a `curso_comun` por curso_comun_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'curso_comun_cursos.curso_comun_id → curso_comun.id · ON DELETE CASCADE',
    tabla: 'curso_comun_cursos',
    linea: 8741,
    claves: 'curso_comun_cursos curso_comun curso_comun_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_grupo_fkey" FOREIGN KEY ("curso_comun_id") REFERENCES "horarios"."curso_comun"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-cursos cursos_pensum_id_fkey',
    nombre: 'cursos cursos_pensum_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cursos` apunta a `pensums` por pensum_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cursos.pensum_id → pensums.id · ON DELETE RESTRICT',
    tabla: 'cursos',
    linea: 8781,
    claves: 'cursos pensums pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-cursos_en_pensum cursos_en_pensum_curso_pensum_fkey',
    nombre: 'cursos_en_pensum cursos_en_pensum_curso_pensum_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `cursos_en_pensum` apunta a `cursos` por curso_id, pensum_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'cursos_en_pensum.curso_id, pensum_id → cursos.id, pensum_id · ON DELETE RESTRICT',
    tabla: 'cursos_en_pensum',
    linea: 8765,
    claves: 'cursos_en_pensum cursos curso_id, pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_curso_pensum_fkey" FOREIGN KEY ("curso_id", "pensum_id") REFERENCES "horarios"."cursos"("id", "pensum_id") ON DELETE RESTRICT;`,
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
    linea: 8773,
    claves: 'cursos_en_pensum pensums pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE CASCADE;`,
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
    linea: 8981,
    claves: 'jornada_descansos jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornada_extraordinaria_docentes jornada_extraordinaria_docentes_docente_id_fkey',
    nombre: 'jornada_extraordinaria_docentes jornada_extraordinaria_docentes_docente_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_extraordinaria_docentes` apunta a `docentes` por docente_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'jornada_extraordinaria_docentes.docente_id → docentes.id · ON DELETE CASCADE',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 8989,
    claves: 'jornada_extraordinaria_docentes docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_docentes"
    ADD CONSTRAINT "jornada_extraordinaria_docentes_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornada_extraordinaria_docentes jornada_extraordinaria_docentes_jornada_id_periodo_id_fkey',
    nombre: 'jornada_extraordinaria_docentes jornada_extraordinaria_docentes_jornada_id_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_extraordinaria_docentes` apunta a `jornada_extraordinaria_periodos` por jornada_id, periodo_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'jornada_extraordinaria_docentes.jornada_id, periodo_id → jornada_extraordinaria_periodos.jornada_id, periodo_id · ON DELETE CASCADE',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 8997,
    claves: 'jornada_extraordinaria_docentes jornada_extraordinaria_periodos jornada_id, periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_docentes"
    ADD CONSTRAINT "jornada_extraordinaria_docentes_jornada_id_periodo_id_fkey" FOREIGN KEY ("jornada_id", "periodo_id") REFERENCES "horarios"."jornada_extraordinaria_periodos"("jornada_id", "periodo_id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornada_extraordinaria_periodos jornada_extraordinaria_periodos_horario_referencia_id_fkey',
    nombre: 'jornada_extraordinaria_periodos jornada_extraordinaria_periodos_horario_referencia_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_extraordinaria_periodos` apunta a `horarios` por horario_referencia_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'jornada_extraordinaria_periodos.horario_referencia_id → horarios.id · ON DELETE RESTRICT',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 9005,
    claves: 'jornada_extraordinaria_periodos horarios horario_referencia_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_periodos"
    ADD CONSTRAINT "jornada_extraordinaria_periodos_horario_referencia_id_fkey" FOREIGN KEY ("horario_referencia_id") REFERENCES "horarios"."horarios"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-jornada_extraordinaria_periodos jornada_extraordinaria_periodos_jornada_id_fkey',
    nombre: 'jornada_extraordinaria_periodos jornada_extraordinaria_periodos_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_extraordinaria_periodos` apunta a `jornadas` por jornada_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'jornada_extraordinaria_periodos.jornada_id → jornadas.id · ON DELETE CASCADE',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 9013,
    claves: 'jornada_extraordinaria_periodos jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_periodos"
    ADD CONSTRAINT "jornada_extraordinaria_periodos_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornada_extraordinaria_periodos jornada_extraordinaria_periodos_periodo_id_fkey',
    nombre: 'jornada_extraordinaria_periodos jornada_extraordinaria_periodos_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornada_extraordinaria_periodos` apunta a `periodos_academicos` por periodo_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'jornada_extraordinaria_periodos.periodo_id → periodos_academicos.id · ON DELETE CASCADE',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 9021,
    claves: 'jornada_extraordinaria_periodos periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornada_extraordinaria_periodos"
    ADD CONSTRAINT "jornada_extraordinaria_periodos_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-jornadas jornadas_jornada_regular_id_fkey',
    nombre: 'jornadas jornadas_jornada_regular_id_fkey',
    cat: 'fk',
    grupo: 'Académico',
    desc: 'Cada fila de `jornadas` apunta a `jornadas` por jornada_regular_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'jornadas.jornada_regular_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'jornadas',
    linea: 9029,
    claves: 'jornadas jornadas jornada_regular_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."jornadas"
    ADD CONSTRAINT "jornadas_jornada_regular_id_fkey" FOREIGN KEY ("jornada_regular_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 9077,
    claves: 'pensums carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;`,
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
    linea: 8581,
    claves: 'aula_recursos aulas aula_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "horarios"."aulas"("id") ON DELETE CASCADE;`,
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
    linea: 8589,
    claves: 'aula_recursos recursos recurso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_recurso_id_fkey" FOREIGN KEY ("recurso_id") REFERENCES "horarios"."recursos"("id") ON DELETE RESTRICT;`,
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
    linea: 8749,
    claves: 'curso_recursos_requeridos cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE CASCADE;`,
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
    linea: 8757,
    claves: 'curso_recursos_requeridos recursos recurso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_recurso_id_fkey" FOREIGN KEY ("recurso_id") REFERENCES "horarios"."recursos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-configuracion_motor_restricciones configuracion_motor_restricciones_configuracion_id_fkey',
    nombre: 'configuracion_motor_restricciones configuracion_motor_restricciones_configuracion_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `configuracion_motor_restricciones` apunta a `configuraciones_motor` por configuracion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'configuracion_motor_restricciones.configuracion_id → configuraciones_motor.id · ON DELETE CASCADE',
    tabla: 'configuracion_motor_restricciones',
    linea: 8693,
    claves: 'configuracion_motor_restricciones configuraciones_motor configuracion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_configuracion_id_fkey" FOREIGN KEY ("configuracion_id") REFERENCES "horarios"."configuraciones_motor"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-configuracion_motor_restricciones configuracion_motor_restricciones_restriccion_id_fkey',
    nombre: 'configuracion_motor_restricciones configuracion_motor_restricciones_restriccion_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `configuracion_motor_restricciones` apunta a `restricciones_horario` por restriccion_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'configuracion_motor_restricciones.restriccion_id → restricciones_horario.id · ON DELETE RESTRICT',
    tabla: 'configuracion_motor_restricciones',
    linea: 8701,
    claves: 'configuracion_motor_restricciones restricciones_horario restriccion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_restriccion_id_fkey" FOREIGN KEY ("restriccion_id") REFERENCES "horarios"."restricciones_horario"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-generaciones generaciones_configuracion_id_fkey',
    nombre: 'generaciones generaciones_configuracion_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `generaciones` apunta a `configuraciones_motor` por configuracion_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'generaciones.configuracion_id → configuraciones_motor.id · ON DELETE SET NULL',
    tabla: 'generaciones',
    linea: 8869,
    claves: 'generaciones configuraciones_motor configuracion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_configuracion_id_fkey" FOREIGN KEY ("configuracion_id") REFERENCES "horarios"."configuraciones_motor"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-generaciones generaciones_periodo_id_fkey',
    nombre: 'generaciones generaciones_periodo_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `generaciones` apunta a `periodos_academicos` por periodo_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'generaciones.periodo_id → periodos_academicos.id · ON DELETE RESTRICT',
    tabla: 'generaciones',
    linea: 8877,
    claves: 'generaciones periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-generaciones generaciones_plan_id_fkey',
    nombre: 'generaciones generaciones_plan_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `generaciones` apunta a `horarios` por plan_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'generaciones.plan_id → horarios.id · ON DELETE SET NULL',
    tabla: 'generaciones',
    linea: 8885,
    claves: 'generaciones horarios plan_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-generaciones generaciones_solicitada_por_id_fkey',
    nombre: 'generaciones generaciones_solicitada_por_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `generaciones` apunta a `usuarios` por solicitada_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'generaciones.solicitada_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'generaciones',
    linea: 8893,
    claves: 'generaciones usuarios solicitada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-mensajes_generacion mensajes_generacion_generacion_id_fkey',
    nombre: 'mensajes_generacion mensajes_generacion_generacion_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `mensajes_generacion` apunta a `generaciones` por generacion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'mensajes_generacion.generacion_id → generaciones.id · ON DELETE CASCADE',
    tabla: 'mensajes_generacion',
    linea: 9037,
    claves: 'mensajes_generacion generaciones generacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."mensajes_generacion"
    ADD CONSTRAINT "mensajes_generacion_generacion_id_fkey" FOREIGN KEY ("generacion_id") REFERENCES "horarios"."generaciones"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-plan_carreras plan_carreras_carrera_id_fkey',
    nombre: 'plan_carreras plan_carreras_carrera_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `plan_carreras` apunta a `carreras` por carrera_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'plan_carreras.carrera_id → carreras.id · ON DELETE RESTRICT',
    tabla: 'plan_carreras',
    linea: 9085,
    claves: 'plan_carreras carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-plan_carreras plan_carreras_plan_id_fkey',
    nombre: 'plan_carreras plan_carreras_plan_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `plan_carreras` apunta a `horarios` por plan_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'plan_carreras.plan_id → horarios.id · ON DELETE CASCADE',
    tabla: 'plan_carreras',
    linea: 9093,
    claves: 'plan_carreras horarios plan_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-plan_jornadas plan_jornadas_jornada_id_fkey',
    nombre: 'plan_jornadas plan_jornadas_jornada_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `plan_jornadas` apunta a `jornadas` por jornada_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'plan_jornadas.jornada_id → jornadas.id · ON DELETE RESTRICT',
    tabla: 'plan_jornadas',
    linea: 9101,
    claves: 'plan_jornadas jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-plan_jornadas plan_jornadas_plan_id_fkey',
    nombre: 'plan_jornadas plan_jornadas_plan_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `plan_jornadas` apunta a `horarios` por plan_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'plan_jornadas.plan_id → horarios.id · ON DELETE CASCADE',
    tabla: 'plan_jornadas',
    linea: 9109,
    claves: 'plan_jornadas horarios plan_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sesiones_no_asignadas sesiones_no_asignadas_cohorte_id_fkey',
    nombre: 'sesiones_no_asignadas sesiones_no_asignadas_cohorte_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sesiones_no_asignadas` apunta a `cohortes` por cohorte_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones_no_asignadas.cohorte_id → cohortes.id · ON DELETE RESTRICT',
    tabla: 'sesiones_no_asignadas',
    linea: 9301,
    claves: 'sesiones_no_asignadas cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesiones_no_asignadas sesiones_no_asignadas_curso_id_fkey',
    nombre: 'sesiones_no_asignadas sesiones_no_asignadas_curso_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sesiones_no_asignadas` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sesiones_no_asignadas.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'sesiones_no_asignadas',
    linea: 9309,
    claves: 'sesiones_no_asignadas cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sesiones_no_asignadas sesiones_no_asignadas_horario_id_fkey',
    nombre: 'sesiones_no_asignadas sesiones_no_asignadas_horario_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sesiones_no_asignadas` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sesiones_no_asignadas.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'sesiones_no_asignadas',
    linea: 9317,
    claves: 'sesiones_no_asignadas horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sugerencias_seccion sugerencias_seccion_cohorte_id_fkey',
    nombre: 'sugerencias_seccion sugerencias_seccion_cohorte_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sugerencias_seccion` apunta a `cohortes` por cohorte_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sugerencias_seccion.cohorte_id → cohortes.id · ON DELETE RESTRICT',
    tabla: 'sugerencias_seccion',
    linea: 9325,
    claves: 'sugerencias_seccion cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sugerencias_seccion sugerencias_seccion_curso_id_fkey',
    nombre: 'sugerencias_seccion sugerencias_seccion_curso_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sugerencias_seccion` apunta a `cursos` por curso_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'sugerencias_seccion.curso_id → cursos.id · ON DELETE RESTRICT',
    tabla: 'sugerencias_seccion',
    linea: 9333,
    claves: 'sugerencias_seccion cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-sugerencias_seccion sugerencias_seccion_horario_id_fkey',
    nombre: 'sugerencias_seccion sugerencias_seccion_horario_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sugerencias_seccion` apunta a `horarios` por horario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'sugerencias_seccion.horario_id → horarios.id · ON DELETE CASCADE',
    tabla: 'sugerencias_seccion',
    linea: 9341,
    claves: 'sugerencias_seccion horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-sugerencias_seccion sugerencias_seccion_resuelta_por_id_fkey',
    nombre: 'sugerencias_seccion sugerencias_seccion_resuelta_por_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sugerencias_seccion` apunta a `usuarios` por resuelta_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'sugerencias_seccion.resuelta_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'sugerencias_seccion',
    linea: 9349,
    claves: 'sugerencias_seccion usuarios resuelta_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_resuelta_por_id_fkey" FOREIGN KEY ("resuelta_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-sugerencias_seccion sugerencias_seccion_solicitada_por_id_fkey',
    nombre: 'sugerencias_seccion sugerencias_seccion_solicitada_por_id_fkey',
    cat: 'fk',
    grupo: 'Motor',
    desc: 'Cada fila de `sugerencias_seccion` apunta a `usuarios` por solicitada_por_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'sugerencias_seccion.solicitada_por_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'sugerencias_seccion',
    linea: 9357,
    claves: 'sugerencias_seccion usuarios solicitada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 8597,
    claves: 'cambios_detectados sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;`,
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
    linea: 8605,
    claves: 'cambios_detectados versiones_horario version_horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_version_horario_id_fkey" FOREIGN KEY ("version_horario_id") REFERENCES "horarios"."versiones_horario"("id") ON DELETE CASCADE;`,
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
    linea: 8709,
    claves: 'conflicto_sesiones conflictos conflicto_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_conflicto_id_fkey" FOREIGN KEY ("conflicto_id") REFERENCES "horarios"."conflictos"("id") ON DELETE CASCADE;`,
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
    linea: 8717,
    claves: 'conflicto_sesiones sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;`,
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
    linea: 8725,
    claves: 'conflictos horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."conflictos"
    ADD CONSTRAINT "conflictos_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 8901,
    claves: 'historial_estados_horario usuarios cambiado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_cambiado_por_id_fkey" FOREIGN KEY ("cambiado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 8909,
    claves: 'historial_estados_horario horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 8917,
    claves: 'horarios usuarios aprobado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_aprobado_por_id_fkey" FOREIGN KEY ("aprobado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 8925,
    claves: 'horarios usuarios generado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_generado_por_id_fkey" FOREIGN KEY ("generado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 8933,
    claves: 'horarios horarios horario_origen_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_horario_origen_id_fkey" FOREIGN KEY ("horario_origen_id") REFERENCES "horarios"."horarios"("id") ON DELETE RESTRICT;`,
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
    linea: 8941,
    claves: 'horarios periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;`,
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
    linea: 8949,
    claves: 'horarios usuarios publicado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_publicado_por_id_fkey" FOREIGN KEY ("publicado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 9141,
    claves: 'resultado_edicion_conflictos conflictos conflicto_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_conflicto_id_fkey" FOREIGN KEY ("conflicto_id") REFERENCES "horarios"."conflictos"("id") ON DELETE CASCADE;`,
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
    linea: 9149,
    claves: 'resultado_edicion_conflictos resultados_edicion resultado_edicion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_resultado_edicion_id_fkey" FOREIGN KEY ("resultado_edicion_id") REFERENCES "horarios"."resultados_edicion"("id") ON DELETE CASCADE;`,
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
    linea: 9157,
    claves: 'resultados_edicion usuarios creado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 9165,
    claves: 'resultados_edicion horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 9173,
    claves: 'resultados_edicion horarios horario_origen_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_horario_origen_id_fkey" FOREIGN KEY ("horario_origen_id") REFERENCES "horarios"."horarios"("id") ON DELETE RESTRICT;`,
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
    linea: 9181,
    claves: 'resultados_edicion sesiones sesion_fijada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_sesion_fijada_id_fkey" FOREIGN KEY ("sesion_fijada_id") REFERENCES "horarios"."sesiones"("id") ON DELETE SET NULL;`,
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
    linea: 9205,
    claves: 'sesion_cohortes cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;`,
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
    linea: 9213,
    claves: 'sesion_cohortes cursos_en_pensum curso_en_pensum_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_curso_en_pensum_id_fkey" FOREIGN KEY ("curso_en_pensum_id") REFERENCES "horarios"."cursos_en_pensum"("id") ON DELETE RESTRICT;`,
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
    linea: 9221,
    claves: 'sesion_cohortes cursos curso_visible_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_curso_visible_id_fkey" FOREIGN KEY ("curso_visible_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
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
    linea: 9229,
    claves: 'sesion_cohortes horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 9237,
    claves: 'sesion_cohortes sesiones sesion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;`,
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
    linea: 9245,
    claves: 'sesion_cohortes sesiones sesion_id, horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_sesion_id_horario_id_fkey" FOREIGN KEY ("sesion_id", "horario_id") REFERENCES "horarios"."sesiones"("id", "horario_id") ON DELETE CASCADE;`,
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
    linea: 9253,
    claves: 'sesiones agrupaciones_area_comun agrupacion_area_comun_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_agrupacion_area_comun_id_fkey" FOREIGN KEY ("agrupacion_area_comun_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE SET NULL;`,
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
    linea: 9261,
    claves: 'sesiones aulas aula_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "horarios"."aulas"("id") ON DELETE RESTRICT;`,
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
    linea: 9269,
    claves: 'sesiones cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
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
    linea: 9277,
    claves: 'sesiones docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;`,
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
    linea: 9285,
    claves: 'sesiones horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 9293,
    claves: 'sesiones jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 9429,
    claves: 'versiones_horario usuarios creado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 9437,
    claves: 'versiones_horario horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;`,
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
    linea: 8957,
    claves: 'importacion_errores importaciones importacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."importacion_errores"
    ADD CONSTRAINT "importacion_errores_importacion_id_fkey" FOREIGN KEY ("importacion_id") REFERENCES "horarios"."importaciones"("id") ON DELETE CASCADE;`,
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
    linea: 8965,
    claves: 'importaciones plantillas_importacion plantilla_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_plantilla_id_fkey" FOREIGN KEY ("plantilla_id") REFERENCES "horarios"."plantillas_importacion"("id") ON DELETE RESTRICT;`,
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
    linea: 8973,
    claves: 'importaciones usuarios solicitada_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 9189,
    claves: 'rol_permisos permisos_acceso permiso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "horarios"."permisos_acceso"("id") ON DELETE CASCADE;`,
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
    linea: 9197,
    claves: 'rol_permisos roles rol_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "horarios"."roles"("id") ON DELETE CASCADE;`,
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
    linea: 9365,
    claves: 'usuario_facultades facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;`,
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
    linea: 9373,
    claves: 'usuario_facultades usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;`,
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
    linea: 9381,
    claves: 'usuario_roles roles rol_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "horarios"."roles"("id") ON DELETE RESTRICT;`,
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
    linea: 9389,
    claves: 'usuario_roles usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;`,
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
    linea: 9397,
    claves: 'usuarios auth.users auth_user_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;`,
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
    linea: 9405,
    claves: 'usuarios cohortes cohorte_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_cohorte_fk" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") DEFERRABLE INITIALLY DEFERRED;`,
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
    linea: 9413,
    claves: 'usuarios docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_docente_fk" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") DEFERRABLE INITIALLY DEFERRED;`,
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
    linea: 8573,
    claves: 'auditoria usuarios usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."auditoria"
    ADD CONSTRAINT "auditoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-notificacion_destinatarios notificacion_destinatarios_destinatario_usuario_id_fkey',
    nombre: 'notificacion_destinatarios notificacion_destinatarios_destinatario_usuario_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `notificacion_destinatarios` apunta a `usuarios` por destinatario_usuario_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'notificacion_destinatarios.destinatario_usuario_id → usuarios.id · ON DELETE CASCADE',
    tabla: 'notificacion_destinatarios',
    linea: 9045,
    claves: 'notificacion_destinatarios usuarios destinatario_usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificacion_destinatarios"
    ADD CONSTRAINT "notificacion_destinatarios_destinatario_usuario_id_fkey" FOREIGN KEY ("destinatario_usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-notificacion_destinatarios notificacion_destinatarios_notificacion_id_fkey',
    nombre: 'notificacion_destinatarios notificacion_destinatarios_notificacion_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `notificacion_destinatarios` apunta a `notificaciones` por notificacion_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'notificacion_destinatarios.notificacion_id → notificaciones.id · ON DELETE CASCADE',
    tabla: 'notificacion_destinatarios',
    linea: 9053,
    claves: 'notificacion_destinatarios notificaciones notificacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificacion_destinatarios"
    ADD CONSTRAINT "notificacion_destinatarios_notificacion_id_fkey" FOREIGN KEY ("notificacion_id") REFERENCES "horarios"."notificaciones"("id") ON DELETE CASCADE;`,
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
    linea: 9061,
    claves: 'notificaciones plantillas_notificacion plantilla_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_plantilla_id_fkey" FOREIGN KEY ("plantilla_id") REFERENCES "horarios"."plantillas_notificacion"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-notificaciones notificaciones_remitente_usuario_id_fkey',
    nombre: 'notificaciones notificaciones_remitente_usuario_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `notificaciones` apunta a `usuarios` por remitente_usuario_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'notificaciones.remitente_usuario_id → usuarios.id · ON DELETE SET NULL',
    tabla: 'notificaciones',
    linea: 9069,
    claves: 'notificaciones usuarios remitente_usuario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_remitente_usuario_id_fkey" FOREIGN KEY ("remitente_usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
  },
  {
    id: 'fk-reportes reportes_generacion_id_fkey',
    nombre: 'reportes reportes_generacion_id_fkey',
    cat: 'fk',
    grupo: 'Operación',
    desc: 'Cada fila de `reportes` apunta a `generaciones` por generacion_id: al borrar el padre la columna queda en NULL.',
    detalle: '',
    nota: 'reportes.generacion_id → generaciones.id · ON DELETE SET NULL',
    tabla: 'reportes',
    linea: 9117,
    claves: 'reportes generaciones generacion_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_generacion_id_fkey" FOREIGN KEY ("generacion_id") REFERENCES "horarios"."generaciones"("id") ON DELETE SET NULL;`,
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
    linea: 9125,
    claves: 'reportes usuarios generado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_generado_por_id_fkey" FOREIGN KEY ("generado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 9133,
    claves: 'reportes horarios horario_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE SET NULL;`,
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
    linea: 8533,
    claves: 'asignaciones_docente_curso carreras carrera_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;`,
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
    linea: 8541,
    claves: 'asignaciones_docente_curso cursos curso_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;`,
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
    linea: 8549,
    claves: 'asignaciones_docente_curso docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;`,
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
    linea: 8557,
    claves: 'asignaciones_docente_curso facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;`,
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
    linea: 8565,
    claves: 'asignaciones_docente_curso jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 8789,
    claves: 'disponibilidad_docente_slots disponibilidades_docente disponibilidad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_disponibilidad_id_fkey" FOREIGN KEY ("disponibilidad_id") REFERENCES "horarios"."disponibilidades_docente"("id") ON DELETE CASCADE;`,
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
    linea: 8797,
    claves: 'disponibilidad_docente_slots jornadas jornada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;`,
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
    linea: 8805,
    claves: 'disponibilidades_docente docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;`,
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
    linea: 8813,
    claves: 'disponibilidades_docente periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;`,
  },
  {
    id: 'fk-docente_facultades docente_facultades_docente_id_fkey',
    nombre: 'docente_facultades docente_facultades_docente_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `docente_facultades` apunta a `docentes` por docente_id: al borrar el padre se borran también estas filas.',
    detalle: '',
    nota: 'docente_facultades.docente_id → docentes.id · ON DELETE CASCADE',
    tabla: 'docente_facultades',
    linea: 8821,
    claves: 'docente_facultades docentes docente_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'fk-docente_facultades docente_facultades_facultad_id_fkey',
    nombre: 'docente_facultades docente_facultades_facultad_id_fkey',
    cat: 'fk',
    grupo: 'Docentes',
    desc: 'Cada fila de `docente_facultades` apunta a `facultades` por facultad_id: no deja borrar el padre mientras existan estas filas.',
    detalle: '',
    nota: 'docente_facultades.facultad_id → facultades.id · ON DELETE RESTRICT',
    tabla: 'docente_facultades',
    linea: 8829,
    claves: 'docente_facultades facultades facultad_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;`,
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
    linea: 8837,
    claves: 'eventos_sustitucion docentes docente_entrante_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_docente_entrante_id_fkey" FOREIGN KEY ("docente_entrante_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;`,
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
    linea: 8845,
    claves: 'eventos_sustitucion docentes docente_original_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_docente_original_id_fkey" FOREIGN KEY ("docente_original_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;`,
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
    linea: 8853,
    claves: 'eventos_sustitucion usuarios registrado_por_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_registrado_por_id_fkey" FOREIGN KEY ("registrado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;`,
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
    linea: 8861,
    claves: 'eventos_sustitucion sesiones sesion_afectada_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_sesion_afectada_id_fkey" FOREIGN KEY ("sesion_afectada_id") REFERENCES "horarios"."sesiones"("id") ON DELETE RESTRICT;`,
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
    linea: 9421,
    claves: 'ventanas_disponibilidad periodos_academicos periodo_id',
    params: [],
    pasos: [],
    sql: `ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE CASCADE;`,
  },
  {
    id: 'idx-agrupaciones_area_comun_identidad_uq',
    nombre: 'agrupaciones_area_comun_identidad_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `agrupaciones_area_comun` con el mismo valor de (periodo_id, curso_comun_id, jornada_id). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'agrupaciones_area_comun',
    linea: 7691,
    claves: 'periodo_id, curso_comun_id, jornada_id agrupaciones_area_comun',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "agrupaciones_area_comun_identidad_uq" ON "horarios"."agrupaciones_area_comun" USING "btree" ("periodo_id", "curso_comun_id", "jornada_id") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7698,
    claves: 'periodo_id, lower((nombre)::text) agrupaciones_area_comun',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "agrupaciones_area_comun_nombre_uq" ON "horarios"."agrupaciones_area_comun" USING "btree" ("periodo_id", "lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7705,
    claves: 'docente_id, curso_id, COALESCE(carrera_id, \'00000000-0000-0000-0000-000000000000\'::uuid), COALESCE(facultad_id, \'00000000-0000-0000-0000-000000000000\'::uuid), COALESCE(jornada_id, \'00000000-0000-0000-0000-000000000000\'::uuid) asignaciones_docente_curso',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "asignaciones_docente_curso_vigente_uq" ON "horarios"."asignaciones_docente_curso" USING "btree" ("docente_id", "curso_id", COALESCE("carrera_id", '00000000-0000-0000-0000-000000000000'::"uuid"), COALESCE("facultad_id", '00000000-0000-0000-0000-000000000000'::"uuid"), COALESCE("jornada_id", '00000000-0000-0000-0000-000000000000'::"uuid")) WHERE ("esta_vigente" AND ("eliminado_en" IS NULL));`,
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
    linea: 7726,
    claves: 'codigo aulas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "aulas_codigo_uq" ON "horarios"."aulas" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7733,
    claves: 'piso, numero_aula aulas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "aulas_piso_numero_uq" ON "horarios"."aulas" USING "btree" ("piso", "numero_aula") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7740,
    claves: 'codigo carreras',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "carreras_codigo_uq" ON "horarios"."carreras" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7768,
    claves: 'periodo_id, cohorte_id cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "cohorte_periodos_periodo_cohorte_uq" ON "horarios"."cohorte_periodos" USING "btree" ("periodo_id", "cohorte_id") WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-cohortes_identidad_uq',
    nombre: 'cohortes_identidad_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'La identidad de una cohorte —carrera, jornada, año y sección sin distinguir mayúsculas— no se repite entre cohortes vivas.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'cohortes',
    linea: 7775,
    claves: 'carrera_id, jornada_id, anio_ingreso, lower((seccion)::text) cohortes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "cohortes_identidad_uq" ON "horarios"."cohortes" USING "btree" ("carrera_id", "jornada_id", "anio_ingreso", "lower"(("seccion")::"text")) WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-configuraciones_motor_nombre_uq',
    nombre: 'configuraciones_motor_nombre_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `configuraciones_motor` con el mismo valor de (lower((nombre)::text)).',
    detalle: '',
    nota: 'único',
    tabla: 'configuraciones_motor',
    linea: 7782,
    claves: 'lower((nombre)::text) configuraciones_motor',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "configuraciones_motor_nombre_uq" ON "horarios"."configuraciones_motor" USING "btree" ("lower"(("nombre")::"text"));`,
  },
  {
    id: 'idx-curso_comun_cursos_curso_uq',
    nombre: 'curso_comun_cursos_curso_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `curso_comun_cursos` con el mismo valor de (curso_id).',
    detalle: '',
    nota: 'único',
    tabla: 'curso_comun_cursos',
    linea: 7789,
    claves: 'curso_id curso_comun_cursos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "curso_comun_cursos_curso_uq" ON "horarios"."curso_comun_cursos" USING "btree" ("curso_id");`,
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
    linea: 7810,
    claves: 'codigo cursos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "cursos_codigo_uq" ON "horarios"."cursos" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-cursos_en_pensum_curso_uq',
    nombre: 'cursos_en_pensum_curso_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'No permite dos filas de `cursos_en_pensum` con el mismo valor de (curso_id). La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'cursos_en_pensum',
    linea: 7824,
    claves: 'curso_id cursos_en_pensum',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "cursos_en_pensum_curso_uq" ON "horarios"."cursos_en_pensum" USING "btree" ("curso_id") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7852,
    claves: 'codigo docentes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "docentes_codigo_uq" ON "horarios"."docentes" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7859,
    claves: 'correo docentes',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "docentes_correo_uq" ON "horarios"."docentes" USING "btree" ("correo") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7866,
    claves: 'codigo facultades',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "facultades_codigo_uq" ON "horarios"."facultades" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-generaciones_activas_periodo_tipo_uq',
    nombre: 'generaciones_activas_periodo_tipo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Impide dos corridas vivas al mismo tiempo para el mismo período y tipo de plan.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'generaciones',
    linea: 7873,
    claves: 'periodo_id, tipo_plan generaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "generaciones_activas_periodo_tipo_uq" ON "horarios"."generaciones" USING "btree" ("periodo_id", "tipo_plan") WHERE ("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_generacion", 'generando'::"horarios"."estado_generacion"]));`,
  },
  {
    id: 'idx-generaciones_clave_solicitud_periodo_tipo_uq',
    nombre: 'generaciones_clave_solicitud_periodo_tipo_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Idempotencia de la solicitud de generación por período y tipo de plan.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'generaciones',
    linea: 7880,
    claves: 'periodo_id, tipo_plan, clave_solicitud generaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "generaciones_clave_solicitud_periodo_tipo_uq" ON "horarios"."generaciones" USING "btree" ("periodo_id", "tipo_plan", "clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);`,
  },
  {
    id: 'idx-generaciones_clave_solicitud_plan_uq',
    nombre: 'generaciones_clave_solicitud_plan_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Idempotencia: la misma solicitud de generación no puede entrar dos veces para un plan.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'generaciones',
    linea: 7887,
    claves: 'plan_id, clave_solicitud generaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "generaciones_clave_solicitud_plan_uq" ON "horarios"."generaciones" USING "btree" ("plan_id", "clave_solicitud") WHERE (("plan_id" IS NOT NULL) AND ("clave_solicitud" IS NOT NULL));`,
  },
  {
    id: 'idx-generaciones_plan_activa_uq',
    nombre: 'generaciones_plan_activa_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Impide dos corridas del motor vivas al mismo tiempo sobre el mismo plan.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'generaciones',
    linea: 7901,
    claves: 'plan_id generaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "generaciones_plan_activa_uq" ON "horarios"."generaciones" USING "btree" ("plan_id") WHERE (("plan_id" IS NOT NULL) AND ("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_generacion", 'generando'::"horarios"."estado_generacion"])));`,
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
    linea: 7922,
    claves: 'periodo_id, tipo_plan, numero_version horarios',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "horarios_periodo_tipo_version_uq" ON "horarios"."horarios" USING "btree" ("periodo_id", "tipo_plan", "numero_version") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7929,
    claves: 'clave_solicitud importaciones',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "importaciones_clave_solicitud_uq" ON "horarios"."importaciones" USING "btree" ("clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);`,
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
    linea: 7943,
    claves: 'lower((nombre)::text) jornadas',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "jornadas_nombre_uq" ON "horarios"."jornadas" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7971,
    claves: 'carrera_id, anio_creacion pensums',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "pensums_carrera_anio_uq" ON "horarios"."pensums" USING "btree" ("carrera_id", "anio_creacion") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7978,
    claves: 'lower((nombre)::text) periodos_academicos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "periodos_nombre_uq" ON "horarios"."periodos_academicos" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-plantillas_importacion_vigente_uq',
    nombre: 'plantillas_importacion_vigente_uq',
    cat: 'indice',
    grupo: 'Índices únicos',
    desc: 'Solo una plantilla vigente por código de importación.',
    detalle: '',
    nota: 'único · parcial',
    tabla: 'plantillas_importacion',
    linea: 7999,
    claves: 'codigo plantillas_importacion',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "plantillas_importacion_vigente_uq" ON "horarios"."plantillas_importacion" USING "btree" ("codigo") WHERE "esta_vigente";`,
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
    linea: 8006,
    claves: 'codigo_plantilla plantillas_notificacion',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "plantillas_notificacion_codigo_uq" ON "horarios"."plantillas_notificacion" USING "btree" ("codigo_plantilla");`,
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
    linea: 8013,
    claves: 'codigo recursos',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "recursos_codigo_uq" ON "horarios"."recursos" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 8027,
    claves: 'horario_id, clave_solicitud resultados_edicion',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "resultados_edicion_clave_solicitud_uq" ON "horarios"."resultados_edicion" USING "btree" ("horario_id", "clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);`,
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
    linea: 8041,
    claves: 'lower((nombre)::text) roles',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "roles_nombre_uq" ON "horarios"."roles" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);`,
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
    linea: 8090,
    claves: 'correo_institucional usuarios',
    params: [],
    pasos: [],
    sql: `CREATE UNIQUE INDEX "usuarios_correo_institucional_uq" ON "horarios"."usuarios" USING "btree" ("correo_institucional") WHERE ("eliminado_en" IS NULL);`,
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
    linea: 7712,
    claves: 'entidad, entidad_id, fecha DESC auditoria',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "auditoria_entidad_idx" ON "horarios"."auditoria" USING "btree" ("entidad", "entidad_id", "fecha" DESC);`,
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
    linea: 7719,
    claves: 'usuario_id, fecha DESC auditoria',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "auditoria_usuario_idx" ON "horarios"."auditoria" USING "btree" ("usuario_id", "fecha" DESC);`,
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
    linea: 7747,
    claves: 'facultad_id carreras',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "carreras_facultad_idx" ON "horarios"."carreras" USING "btree" ("facultad_id");`,
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
    linea: 7754,
    claves: 'cohorte_id, periodo_id cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "cohorte_periodos_cohorte_idx" ON "horarios"."cohorte_periodos" USING "btree" ("cohorte_id", "periodo_id");`,
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
    linea: 7761,
    claves: 'periodo_id, semestre_asignado cohorte_periodos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "cohorte_periodos_periodo_activo_idx" ON "horarios"."cohorte_periodos" USING "btree" ("periodo_id", "semestre_asignado") WHERE ("esta_activa" AND ("eliminado_en" IS NULL));`,
  },
  {
    id: 'idx-curso_comun_cursos_grupo_idx',
    nombre: 'curso_comun_cursos_grupo_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `curso_comun_cursos` (curso_comun_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'curso_comun_cursos',
    linea: 7796,
    claves: 'curso_comun_id curso_comun_cursos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "curso_comun_cursos_grupo_idx" ON "horarios"."curso_comun_cursos" USING "btree" ("curso_comun_id");`,
  },
  {
    id: 'idx-cursos_activos_pensum_idx',
    nombre: 'cursos_activos_pensum_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `cursos` (pensum_id, nombre, codigo): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda · parcial',
    tabla: 'cursos',
    linea: 7803,
    claves: 'pensum_id, nombre, codigo cursos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "cursos_activos_pensum_idx" ON "horarios"."cursos" USING "btree" ("pensum_id", "nombre", "codigo") WHERE ("esta_activo" AND ("eliminado_en" IS NULL));`,
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
    linea: 7817,
    claves: 'curso_id cursos_en_pensum',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "cursos_en_pensum_curso_idx" ON "horarios"."cursos_en_pensum" USING "btree" ("curso_id");`,
  },
  {
    id: 'idx-cursos_pensum_idx',
    nombre: 'cursos_pensum_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `cursos` (pensum_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'cursos',
    linea: 7831,
    claves: 'pensum_id cursos',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "cursos_pensum_idx" ON "horarios"."cursos" USING "btree" ("pensum_id");`,
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
    linea: 7838,
    claves: 'jornada_id, dia, indice_slot, esta_disponible disponibilidad_docente_slots',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "disponibilidad_docente_slots_busqueda_idx" ON "horarios"."disponibilidad_docente_slots" USING "btree" ("jornada_id", "dia", "indice_slot", "esta_disponible");`,
  },
  {
    id: 'idx-docente_facultades_facultad_idx',
    nombre: 'docente_facultades_facultad_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `docente_facultades` (facultad_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'docente_facultades',
    linea: 7845,
    claves: 'facultad_id docente_facultades',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "docente_facultades_facultad_idx" ON "horarios"."docente_facultades" USING "btree" ("facultad_id");`,
  },
  {
    id: 'idx-generaciones_estado_idx',
    nombre: 'generaciones_estado_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `generaciones` (estado, iniciada_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'generaciones',
    linea: 7894,
    claves: 'estado, iniciada_en DESC generaciones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "generaciones_estado_idx" ON "horarios"."generaciones" USING "btree" ("estado", "iniciada_en" DESC);`,
  },
  {
    id: 'idx-generaciones_plan_idx',
    nombre: 'generaciones_plan_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `generaciones` (plan_id, iniciada_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'generaciones',
    linea: 7908,
    claves: 'plan_id, iniciada_en DESC generaciones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "generaciones_plan_idx" ON "horarios"."generaciones" USING "btree" ("plan_id", "iniciada_en" DESC);`,
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
    linea: 7915,
    claves: 'horario_id, cambiado_en DESC historial_estados_horario',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "historial_estados_horario_idx" ON "horarios"."historial_estados_horario" USING "btree" ("horario_id", "cambiado_en" DESC);`,
  },
  {
    id: 'idx-jornada_extraordinaria_docentes_docente_idx',
    nombre: 'jornada_extraordinaria_docentes_docente_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `jornada_extraordinaria_docentes` (docente_id, periodo_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 7936,
    claves: 'docente_id, periodo_id jornada_extraordinaria_docentes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "jornada_extraordinaria_docentes_docente_idx" ON "horarios"."jornada_extraordinaria_docentes" USING "btree" ("docente_id", "periodo_id");`,
  },
  {
    id: 'idx-mensajes_generacion_generacion_idx',
    nombre: 'mensajes_generacion_generacion_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `mensajes_generacion` (generacion_id, severidad, creado_en): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'mensajes_generacion',
    linea: 7950,
    claves: 'generacion_id, severidad, creado_en mensajes_generacion',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "mensajes_generacion_generacion_idx" ON "horarios"."mensajes_generacion" USING "btree" ("generacion_id", "severidad", "creado_en");`,
  },
  {
    id: 'idx-notificacion_destinatarios_bandeja_idx',
    nombre: 'notificacion_destinatarios_bandeja_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `notificacion_destinatarios` (destinatario_usuario_id, estado, enviada_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'notificacion_destinatarios',
    linea: 7957,
    claves: 'destinatario_usuario_id, estado, enviada_en DESC notificacion_destinatarios',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "notificacion_destinatarios_bandeja_idx" ON "horarios"."notificacion_destinatarios" USING "btree" ("destinatario_usuario_id", "estado", "enviada_en" DESC);`,
  },
  {
    id: 'idx-notificaciones_fecha_idx',
    nombre: 'notificaciones_fecha_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `notificaciones` (fecha_creacion DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda · parcial',
    tabla: 'notificaciones',
    linea: 7964,
    claves: 'fecha_creacion DESC notificaciones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "notificaciones_fecha_idx" ON "horarios"."notificaciones" USING "btree" ("fecha_creacion" DESC) WHERE ("eliminado_en" IS NULL);`,
  },
  {
    id: 'idx-plan_carreras_carrera_idx',
    nombre: 'plan_carreras_carrera_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `plan_carreras` (carrera_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'plan_carreras',
    linea: 7985,
    claves: 'carrera_id plan_carreras',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "plan_carreras_carrera_idx" ON "horarios"."plan_carreras" USING "btree" ("carrera_id");`,
  },
  {
    id: 'idx-plan_jornadas_jornada_idx',
    nombre: 'plan_jornadas_jornada_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `plan_jornadas` (jornada_id): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda',
    tabla: 'plan_jornadas',
    linea: 7992,
    claves: 'jornada_id plan_jornadas',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "plan_jornadas_jornada_idx" ON "horarios"."plan_jornadas" USING "btree" ("jornada_id");`,
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
    linea: 8020,
    claves: 'horario_id, fecha_generacion DESC reportes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "reportes_horario_idx" ON "horarios"."reportes" USING "btree" ("horario_id", "fecha_generacion" DESC);`,
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
    linea: 8034,
    claves: 'horario_origen_id, creado_en DESC resultados_edicion',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "resultados_edicion_origen_idx" ON "horarios"."resultados_edicion" USING "btree" ("horario_origen_id", "creado_en" DESC);`,
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
    linea: 8048,
    claves: 'cohorte_id, horario_id, fecha_sesion, dia, minuto_inicio_dia sesion_cohortes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sesion_cohortes_cohorte_idx" ON "horarios"."sesion_cohortes" USING "btree" ("cohorte_id", "horario_id", "fecha_sesion", "dia", "minuto_inicio_dia");`,
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
    linea: 8055,
    claves: 'curso_visible_id, horario_id sesion_cohortes',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sesion_cohortes_curso_visible_idx" ON "horarios"."sesion_cohortes" USING "btree" ("curso_visible_id", "horario_id");`,
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
    linea: 8062,
    claves: 'horario_id, aula_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sesiones_horario_aula_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "aula_id", "fecha_sesion", "dia", "minuto_inicio_dia");`,
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
    linea: 8069,
    claves: 'horario_id, docente_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sesiones_horario_docente_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "docente_id", "fecha_sesion", "dia", "minuto_inicio_dia");`,
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
    linea: 8076,
    claves: 'horario_id, jornada_id, fecha_sesion, dia, minuto_inicio_dia sesiones',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sesiones_horario_jornada_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "jornada_id", "fecha_sesion", "dia", "minuto_inicio_dia");`,
  },
  {
    id: 'idx-sugerencias_seccion_estado_idx',
    nombre: 'sugerencias_seccion_estado_idx',
    cat: 'indice',
    grupo: 'Índices de búsqueda',
    desc: 'Índice de búsqueda sobre `sugerencias_seccion` (estado, creado_en DESC): acelera las consultas que filtran por esas columnas.',
    detalle: '',
    nota: 'búsqueda · parcial',
    tabla: 'sugerencias_seccion',
    linea: 8083,
    claves: 'estado, creado_en DESC sugerencias_seccion',
    params: [],
    pasos: [],
    sql: `CREATE INDEX "sugerencias_seccion_estado_idx" ON "horarios"."sugerencias_seccion" USING "btree" ("estado", "creado_en" DESC) WHERE ("eliminado_en" IS NULL);`,
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
    linea: 9445,
    claves: 'agrupacion_area_comun_cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."agrupacion_area_comun_cohortes" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 9451,
    claves: 'agrupacion_area_comun_cursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."agrupacion_area_comun_cursos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 9457,
    claves: 'agrupaciones_area_comun rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."agrupaciones_area_comun" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11133,
    claves: 'asignaciones_docente_curso rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."asignaciones_docente_curso" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11139,
    claves: 'auditoria rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."auditoria" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11145,
    claves: 'aula_recursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."aula_recursos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11151,
    claves: 'aulas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."aulas" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11157,
    claves: 'cambios_detectados rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cambios_detectados" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11163,
    claves: 'carrera_jornadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."carrera_jornadas" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11169,
    claves: 'carreras rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."carreras" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11175,
    claves: 'cohorte_periodos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cohorte_periodos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11181,
    claves: 'cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cohortes" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-configuracion_motor_restricciones',
    nombre: 'RLS activado en configuracion_motor_restricciones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `configuracion_motor_restricciones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'configuracion_motor_restricciones',
    linea: 11187,
    claves: 'configuracion_motor_restricciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."configuracion_motor_restricciones" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-configuraciones_motor',
    nombre: 'RLS activado en configuraciones_motor',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `configuraciones_motor`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'configuraciones_motor',
    linea: 11193,
    claves: 'configuraciones_motor rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."configuraciones_motor" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11199,
    claves: 'conflicto_sesiones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."conflicto_sesiones" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11205,
    claves: 'conflictos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."conflictos" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-curso_comun',
    nombre: 'RLS activado en curso_comun',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `curso_comun`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'curso_comun',
    linea: 11211,
    claves: 'curso_comun rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."curso_comun" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-curso_comun_cursos',
    nombre: 'RLS activado en curso_comun_cursos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `curso_comun_cursos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'curso_comun_cursos',
    linea: 11224,
    claves: 'curso_comun_cursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."curso_comun_cursos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11272,
    claves: 'curso_recursos_requeridos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."curso_recursos_requeridos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11278,
    claves: 'cursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cursos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11284,
    claves: 'cursos_en_pensum rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."cursos_en_pensum" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11290,
    claves: 'disponibilidad_docente_slots rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."disponibilidad_docente_slots" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11296,
    claves: 'disponibilidades_docente rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."disponibilidades_docente" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-docente_facultades',
    nombre: 'RLS activado en docente_facultades',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `docente_facultades`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'docente_facultades',
    linea: 11355,
    claves: 'docente_facultades rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."docente_facultades" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11412,
    claves: 'docentes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."docentes" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11418,
    claves: 'eventos_sustitucion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."eventos_sustitucion" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11424,
    claves: 'facultades rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."facultades" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-generaciones',
    nombre: 'RLS activado en generaciones',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `generaciones`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'generaciones',
    linea: 11430,
    claves: 'generaciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."generaciones" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11436,
    claves: 'historial_estados_horario rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."historial_estados_horario" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11442,
    claves: 'horarios rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."horarios" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11448,
    claves: 'importacion_errores rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."importacion_errores" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11454,
    claves: 'importaciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."importaciones" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11460,
    claves: 'jornada_descansos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."jornada_descansos" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-jornada_extraordinaria_docentes',
    nombre: 'RLS activado en jornada_extraordinaria_docentes',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `jornada_extraordinaria_docentes`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 11466,
    claves: 'jornada_extraordinaria_docentes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."jornada_extraordinaria_docentes" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-jornada_extraordinaria_periodos',
    nombre: 'RLS activado en jornada_extraordinaria_periodos',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `jornada_extraordinaria_periodos`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 11479,
    claves: 'jornada_extraordinaria_periodos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."jornada_extraordinaria_periodos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11492,
    claves: 'jornadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."jornadas" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-mensajes_generacion',
    nombre: 'RLS activado en mensajes_generacion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `mensajes_generacion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'mensajes_generacion',
    linea: 11498,
    claves: 'mensajes_generacion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."mensajes_generacion" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-notificacion_destinatarios',
    nombre: 'RLS activado en notificacion_destinatarios',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `notificacion_destinatarios`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'notificacion_destinatarios',
    linea: 11504,
    claves: 'notificacion_destinatarios rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."notificacion_destinatarios" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11510,
    claves: 'notificaciones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."notificaciones" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11516,
    claves: 'pensums rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."pensums" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11522,
    claves: 'periodos_academicos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."periodos_academicos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11528,
    claves: 'permisos_acceso rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."permisos_acceso" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-plan_carreras',
    nombre: 'RLS activado en plan_carreras',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `plan_carreras`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'plan_carreras',
    linea: 11534,
    claves: 'plan_carreras rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."plan_carreras" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-plan_jornadas',
    nombre: 'RLS activado en plan_jornadas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `plan_jornadas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'plan_jornadas',
    linea: 11540,
    claves: 'plan_jornadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."plan_jornadas" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11546,
    claves: 'plantillas_importacion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."plantillas_importacion" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11552,
    claves: 'plantillas_notificacion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."plantillas_notificacion" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11558,
    claves: 'recursos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."recursos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11564,
    claves: 'reportes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."reportes" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-restricciones_horario',
    nombre: 'RLS activado en restricciones_horario',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `restricciones_horario`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'restricciones_horario',
    linea: 11570,
    claves: 'restricciones_horario rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."restricciones_horario" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11576,
    claves: 'resultado_edicion_conflictos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."resultado_edicion_conflictos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11582,
    claves: 'resultados_edicion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."resultados_edicion" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11588,
    claves: 'rol_permisos rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."rol_permisos" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11594,
    claves: 'roles rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."roles" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11600,
    claves: 'sesion_cohortes rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."sesion_cohortes" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11606,
    claves: 'sesiones rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."sesiones" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-sesiones_no_asignadas',
    nombre: 'RLS activado en sesiones_no_asignadas',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `sesiones_no_asignadas`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'sesiones_no_asignadas',
    linea: 11612,
    claves: 'sesiones_no_asignadas rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."sesiones_no_asignadas" ENABLE ROW LEVEL SECURITY;`,
  },
  {
    id: 'rls-sugerencias_seccion',
    nombre: 'RLS activado en sugerencias_seccion',
    cat: 'rls',
    grupo: 'Activación de RLS',
    desc: 'Enciende la seguridad por fila en `sugerencias_seccion`. A partir de aquí, sin una política que lo permita expresamente, nadie lee ni escribe ninguna fila.',
    detalle: '',
    nota: 'ENABLE ROW LEVEL SECURITY',
    tabla: 'sugerencias_seccion',
    linea: 11618,
    claves: 'sugerencias_seccion rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."sugerencias_seccion" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11624,
    claves: 'usuario_facultades rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."usuario_facultades" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11630,
    claves: 'usuario_roles rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."usuario_roles" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11636,
    claves: 'usuarios rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."usuarios" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11642,
    claves: 'ventanas_disponibilidad rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."ventanas_disponibilidad" ENABLE ROW LEVEL SECURITY;`,
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
    linea: 11648,
    claves: 'versiones_horario rls seguridad fila',
    params: [],
    pasos: [],
    sql: `ALTER TABLE "horarios"."versiones_horario" ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

\\unrestrict 3zwEzeF5CzFQvaH9oegfY13p8KC6kzKxeP0LFfyzfF280XMrF6RiUUofhDbmzCC`,
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
    linea: 9477,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9484,
    claves: 'agrupacion_area_comun_cursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9491,
    claves: 'agrupaciones_area_comun api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupaciones_area_comun" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9498,
    claves: 'aula_recursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."aula_recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9505,
    claves: 'aulas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."aulas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9512,
    claves: 'carrera_jornadas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."carrera_jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9519,
    claves: 'carreras api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."carreras" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9526,
    claves: 'cohorte_periodos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cohorte_periodos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9533,
    claves: 'cohortes api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9540,
    claves: 'curso_recursos_requeridos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."curso_recursos_requeridos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9547,
    claves: 'cursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9554,
    claves: 'cursos_en_pensum api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cursos_en_pensum" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9561,
    claves: 'facultades api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."facultades" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9568,
    claves: 'jornada_descansos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."jornada_descansos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9575,
    claves: 'jornadas api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9582,
    claves: 'pensums api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."pensums" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9589,
    claves: 'periodos_academicos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."periodos_academicos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9596,
    claves: 'recursos api_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_actualizar" ON "horarios"."recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9603,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupacion_area_comun_cohortes" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9610,
    claves: 'agrupacion_area_comun_cursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupacion_area_comun_cursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9617,
    claves: 'agrupaciones_area_comun api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupaciones_area_comun" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9624,
    claves: 'aula_recursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."aula_recursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9631,
    claves: 'aulas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."aulas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9638,
    claves: 'carrera_jornadas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."carrera_jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9645,
    claves: 'carreras api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."carreras" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9652,
    claves: 'cohorte_periodos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cohorte_periodos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9659,
    claves: 'cohortes api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cohortes" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9666,
    claves: 'curso_recursos_requeridos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."curso_recursos_requeridos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9673,
    claves: 'cursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9680,
    claves: 'cursos_en_pensum api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cursos_en_pensum" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9687,
    claves: 'facultades api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."facultades" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9694,
    claves: 'jornada_descansos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."jornada_descansos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9701,
    claves: 'jornadas api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9708,
    claves: 'pensums api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."pensums" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9715,
    claves: 'periodos_academicos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."periodos_academicos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9722,
    claves: 'recursos api_catalogo_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_eliminar" ON "horarios"."recursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9729,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9736,
    claves: 'agrupacion_area_comun_cursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9743,
    claves: 'agrupaciones_area_comun api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupaciones_area_comun" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9750,
    claves: 'aula_recursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."aula_recursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9757,
    claves: 'aulas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."aulas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9764,
    claves: 'carrera_jornadas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."carrera_jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9771,
    claves: 'carreras api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."carreras" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9778,
    claves: 'cohorte_periodos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."cohorte_periodos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9785,
    claves: 'cohortes api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9792,
    claves: 'curso_recursos_requeridos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."curso_recursos_requeridos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9799,
    claves: 'cursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."cursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9806,
    claves: 'cursos_en_pensum api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."cursos_en_pensum" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9813,
    claves: 'facultades api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."facultades" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9820,
    claves: 'jornada_descansos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."jornada_descansos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9827,
    claves: 'jornadas api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9834,
    claves: 'pensums api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."pensums" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9841,
    claves: 'periodos_academicos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."periodos_academicos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9848,
    claves: 'recursos api_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_insertar" ON "horarios"."recursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 9855,
    claves: 'agrupacion_area_comun_cohortes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupacion_area_comun_cohortes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9862,
    claves: 'agrupacion_area_comun_cursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupacion_area_comun_cursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9869,
    claves: 'agrupaciones_area_comun api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupaciones_area_comun" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9876,
    claves: 'aula_recursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."aula_recursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9883,
    claves: 'aulas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."aulas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9890,
    claves: 'carrera_jornadas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."carrera_jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9897,
    claves: 'carreras api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."carreras" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9904,
    claves: 'cohorte_periodos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."cohorte_periodos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9911,
    claves: 'cohortes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."cohortes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9918,
    claves: 'curso_recursos_requeridos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."curso_recursos_requeridos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9925,
    claves: 'cursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."cursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9932,
    claves: 'cursos_en_pensum api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."cursos_en_pensum" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
  },
  {
    id: 'pol-docente_facultades-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `docente_facultades`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'docente_facultades',
    linea: 9939,
    claves: 'docente_facultades api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."docente_facultades" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9946,
    claves: 'docentes api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."docentes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9953,
    claves: 'facultades api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."facultades" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9960,
    claves: 'jornada_descansos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."jornada_descansos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9967,
    claves: 'jornadas api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9974,
    claves: 'pensums api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."pensums" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9981,
    claves: 'periodos_academicos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."periodos_academicos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 9988,
    claves: 'recursos api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."recursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
  },
  {
    id: 'pol-restricciones_horario-api_catalogo_leer',
    nombre: 'api_catalogo_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer el catálogo: basta con tener sesión activa en el sistema. Aplicada a `restricciones_horario`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'restricciones_horario',
    linea: 9995,
    claves: 'restricciones_horario api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."restricciones_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 10002,
    claves: 'ventanas_disponibilidad api_catalogo_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_catalogo_leer" ON "horarios"."ventanas_disponibilidad" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
  },
  {
    id: 'pol-curso_comun-curso_comun_actualizar',
    nombre: 'curso_comun_actualizar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Actualizar grupos de equivalencia exige permiso (\'academia\',\'crear\'). Aplicada a `curso_comun`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'curso_comun',
    linea: 11217,
    claves: 'curso_comun curso_comun_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_actualizar" ON "horarios"."curso_comun" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));`,
  },
  {
    id: 'pol-curso_comun_cursos-curso_comun_cursos_eliminar',
    nombre: 'curso_comun_cursos_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Retirar materias de un grupo exige permiso (\'academia\',\'crear\'). Aplicada a `curso_comun_cursos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'curso_comun_cursos',
    linea: 11230,
    claves: 'curso_comun_cursos curso_comun_cursos_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_cursos_eliminar" ON "horarios"."curso_comun_cursos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));`,
  },
  {
    id: 'pol-curso_comun_cursos-curso_comun_cursos_insertar',
    nombre: 'curso_comun_cursos_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Añadir materias a un grupo exige permiso (\'academia\',\'crear\'). Aplicada a `curso_comun_cursos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_comun_cursos',
    linea: 11237,
    claves: 'curso_comun_cursos curso_comun_cursos_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_cursos_insertar" ON "horarios"."curso_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));`,
  },
  {
    id: 'pol-curso_comun_cursos-curso_comun_cursos_leer',
    nombre: 'curso_comun_cursos_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Consultar materias equivalentes exige permiso (\'academia\',\'leer\'). Aplicada a `curso_comun_cursos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'curso_comun_cursos',
    linea: 11244,
    claves: 'curso_comun_cursos curso_comun_cursos_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_cursos_leer" ON "horarios"."curso_comun_cursos" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));`,
  },
  {
    id: 'pol-curso_comun-curso_comun_eliminar',
    nombre: 'curso_comun_eliminar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Eliminar grupos de equivalencia exige permiso (\'academia\',\'crear\'). Aplicada a `curso_comun`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'curso_comun',
    linea: 11251,
    claves: 'curso_comun curso_comun_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_eliminar" ON "horarios"."curso_comun" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));`,
  },
  {
    id: 'pol-curso_comun-curso_comun_insertar',
    nombre: 'curso_comun_insertar',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Crear grupos de equivalencia exige permiso (\'academia\',\'crear\'). Aplicada a `curso_comun`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'curso_comun',
    linea: 11258,
    claves: 'curso_comun curso_comun_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_insertar" ON "horarios"."curso_comun" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));`,
  },
  {
    id: 'pol-curso_comun-curso_comun_leer',
    nombre: 'curso_comun_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Consultar grupos de equivalencia exige permiso (\'academia\',\'leer\'). Aplicada a `curso_comun`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'curso_comun',
    linea: 11265,
    claves: 'curso_comun curso_comun_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "curso_comun_leer" ON "horarios"."curso_comun" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));`,
  },
  {
    id: 'pol-jornada_extraordinaria_docentes-jornada_extraordinaria_docentes_leer',
    nombre: 'jornada_extraordinaria_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer qué docentes están asignados a una jornada extraordinaria exige permiso (\'aulas\',\'leer\'). Aplicada a `jornada_extraordinaria_docentes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'jornada_extraordinaria_docentes',
    linea: 11472,
    claves: 'jornada_extraordinaria_docentes jornada_extraordinaria_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "jornada_extraordinaria_docentes_leer" ON "horarios"."jornada_extraordinaria_docentes" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));`,
  },
  {
    id: 'pol-jornada_extraordinaria_periodos-jornada_extraordinaria_periodos_leer',
    nombre: 'jornada_extraordinaria_periodos_leer',
    cat: 'rls',
    grupo: 'Políticas · catálogo',
    desc: 'Leer la referencia de una jornada extraordinaria exige permiso (\'aulas\',\'leer\'). Aplicada a `jornada_extraordinaria_periodos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'jornada_extraordinaria_periodos',
    linea: 11485,
    claves: 'jornada_extraordinaria_periodos jornada_extraordinaria_periodos_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "jornada_extraordinaria_periodos_leer" ON "horarios"."jornada_extraordinaria_periodos" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 10489,
    claves: 'cambios_detectados api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."cambios_detectados" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-configuracion_motor_restricciones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `configuracion_motor_restricciones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'configuracion_motor_restricciones',
    linea: 10496,
    claves: 'configuracion_motor_restricciones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."configuracion_motor_restricciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-configuraciones_motor-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `configuraciones_motor`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'configuraciones_motor',
    linea: 10503,
    claves: 'configuraciones_motor api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."configuraciones_motor" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 10510,
    claves: 'conflicto_sesiones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."conflicto_sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-conflictos-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflictos',
    linea: 10517,
    claves: 'conflictos api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-generaciones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `generaciones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'generaciones',
    linea: 10524,
    claves: 'generaciones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."generaciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 10531,
    claves: 'historial_estados_horario api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."historial_estados_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-horarios-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `horarios`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'horarios',
    linea: 10538,
    claves: 'horarios api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."horarios" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-mensajes_generacion-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `mensajes_generacion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'mensajes_generacion',
    linea: 10545,
    claves: 'mensajes_generacion api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."mensajes_generacion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 10552,
    claves: 'resultado_edicion_conflictos api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."resultado_edicion_conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 10559,
    claves: 'resultados_edicion api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."resultados_edicion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 10566,
    claves: 'sesion_cohortes api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."sesion_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesiones-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones',
    linea: 10573,
    claves: 'sesiones api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesiones_no_asignadas-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `sesiones_no_asignadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones_no_asignadas',
    linea: 10580,
    claves: 'sesiones_no_asignadas api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."sesiones_no_asignadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_actualizar',
    nombre: 'api_planes_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 10587,
    claves: 'versiones_horario api_planes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_actualizar" ON "horarios"."versiones_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 10594,
    claves: 'cambios_detectados api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."cambios_detectados" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-configuracion_motor_restricciones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `configuracion_motor_restricciones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'configuracion_motor_restricciones',
    linea: 10601,
    claves: 'configuracion_motor_restricciones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."configuracion_motor_restricciones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-configuraciones_motor-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `configuraciones_motor`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'configuraciones_motor',
    linea: 10608,
    claves: 'configuraciones_motor api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."configuraciones_motor" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 10615,
    claves: 'conflicto_sesiones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."conflicto_sesiones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-conflictos-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `conflictos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'conflictos',
    linea: 10622,
    claves: 'conflictos api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."conflictos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-generaciones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `generaciones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'generaciones',
    linea: 10629,
    claves: 'generaciones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."generaciones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 10636,
    claves: 'historial_estados_horario api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."historial_estados_horario" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-horarios-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `horarios`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'horarios',
    linea: 10643,
    claves: 'horarios api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."horarios" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-mensajes_generacion-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `mensajes_generacion`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'mensajes_generacion',
    linea: 10650,
    claves: 'mensajes_generacion api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."mensajes_generacion" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-plan_carreras-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `plan_carreras`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'plan_carreras',
    linea: 10657,
    claves: 'plan_carreras api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."plan_carreras" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));`,
  },
  {
    id: 'pol-plan_jornadas-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `plan_jornadas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'plan_jornadas',
    linea: 10664,
    claves: 'plan_jornadas api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."plan_jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 10671,
    claves: 'resultado_edicion_conflictos api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."resultado_edicion_conflictos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 10678,
    claves: 'resultados_edicion api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."resultados_edicion" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 10685,
    claves: 'sesion_cohortes api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."sesion_cohortes" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-sesiones-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `sesiones`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'sesiones',
    linea: 10692,
    claves: 'sesiones api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."sesiones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-sesiones_no_asignadas-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `sesiones_no_asignadas`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'sesiones_no_asignadas',
    linea: 10699,
    claves: 'sesiones_no_asignadas api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."sesiones_no_asignadas" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_eliminar',
    nombre: 'api_planes_eliminar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Borrar filas de un plan: exige permiso (\'planes\',\'actualizar\'). Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 10706,
    claves: 'versiones_horario api_planes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_eliminar" ON "horarios"."versiones_horario" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 10713,
    claves: 'cambios_detectados api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."cambios_detectados" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-configuracion_motor_restricciones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `configuracion_motor_restricciones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'configuracion_motor_restricciones',
    linea: 10720,
    claves: 'configuracion_motor_restricciones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."configuracion_motor_restricciones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-configuraciones_motor-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `configuraciones_motor`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'configuraciones_motor',
    linea: 10727,
    claves: 'configuraciones_motor api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."configuraciones_motor" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 10734,
    claves: 'conflicto_sesiones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."conflicto_sesiones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-conflictos-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'conflictos',
    linea: 10741,
    claves: 'conflictos api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."conflictos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-generaciones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `generaciones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'generaciones',
    linea: 10748,
    claves: 'generaciones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."generaciones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 10755,
    claves: 'historial_estados_horario api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."historial_estados_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-horarios-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `horarios`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'horarios',
    linea: 10762,
    claves: 'horarios api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."horarios" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-mensajes_generacion-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `mensajes_generacion`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'mensajes_generacion',
    linea: 10769,
    claves: 'mensajes_generacion api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."mensajes_generacion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-plan_carreras-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `plan_carreras`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'plan_carreras',
    linea: 10776,
    claves: 'plan_carreras api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."plan_carreras" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));`,
  },
  {
    id: 'pol-plan_jornadas-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `plan_jornadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'plan_jornadas',
    linea: 10783,
    claves: 'plan_jornadas api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."plan_jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 10790,
    claves: 'resultado_edicion_conflictos api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."resultado_edicion_conflictos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 10797,
    claves: 'resultados_edicion api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."resultados_edicion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 10804,
    claves: 'sesion_cohortes api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."sesion_cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesiones-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sesiones',
    linea: 10811,
    claves: 'sesiones api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."sesiones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-sesiones_no_asignadas-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `sesiones_no_asignadas`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sesiones_no_asignadas',
    linea: 10818,
    claves: 'sesiones_no_asignadas api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."sesiones_no_asignadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_insertar',
    nombre: 'api_planes_insertar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Escribir planes: exige crear o actualizar planes, o generar con el motor. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'versiones_horario',
    linea: 10825,
    claves: 'versiones_horario api_planes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_insertar" ON "horarios"."versiones_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 10832,
    claves: 'cambios_detectados api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."cambios_detectados" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-configuracion_motor_restricciones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `configuracion_motor_restricciones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'configuracion_motor_restricciones',
    linea: 10839,
    claves: 'configuracion_motor_restricciones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."configuracion_motor_restricciones" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-configuraciones_motor-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `configuraciones_motor`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'configuraciones_motor',
    linea: 10846,
    claves: 'configuraciones_motor api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."configuraciones_motor" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 10853,
    claves: 'conflicto_sesiones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."conflicto_sesiones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-conflictos-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'conflictos',
    linea: 10860,
    claves: 'conflictos api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."conflictos" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-generaciones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `generaciones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'generaciones',
    linea: 10867,
    claves: 'generaciones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."generaciones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 10874,
    claves: 'historial_estados_horario api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."historial_estados_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-horarios-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `horarios`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'horarios',
    linea: 10881,
    claves: 'horarios api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."horarios" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-mensajes_generacion-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `mensajes_generacion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'mensajes_generacion',
    linea: 10888,
    claves: 'mensajes_generacion api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."mensajes_generacion" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-plan_carreras-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `plan_carreras`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'plan_carreras',
    linea: 10895,
    claves: 'plan_carreras api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."plan_carreras" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-plan_jornadas-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `plan_jornadas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'plan_jornadas',
    linea: 10902,
    claves: 'plan_jornadas api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."plan_jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 10909,
    claves: 'resultado_edicion_conflictos api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."resultado_edicion_conflictos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 10916,
    claves: 'resultados_edicion api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."resultados_edicion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 10923,
    claves: 'sesion_cohortes api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."sesion_cohortes" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-sesiones-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sesiones',
    linea: 10930,
    claves: 'sesiones api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."sesiones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-sesiones_no_asignadas-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `sesiones_no_asignadas`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sesiones_no_asignadas',
    linea: 10937,
    claves: 'sesiones_no_asignadas api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."sesiones_no_asignadas" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_leer',
    nombre: 'api_planes_leer',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'versiones_horario',
    linea: 10944,
    claves: 'versiones_horario api_planes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_leer" ON "horarios"."versiones_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));`,
  },
  {
    id: 'pol-cambios_detectados-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `cambios_detectados`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'cambios_detectados',
    linea: 10951,
    claves: 'cambios_detectados api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."cambios_detectados" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-configuracion_motor_restricciones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `configuracion_motor_restricciones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'configuracion_motor_restricciones',
    linea: 10958,
    claves: 'configuracion_motor_restricciones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."configuracion_motor_restricciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-configuraciones_motor-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `configuraciones_motor`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'configuraciones_motor',
    linea: 10965,
    claves: 'configuraciones_motor api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."configuraciones_motor" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-conflicto_sesiones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `conflicto_sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflicto_sesiones',
    linea: 10972,
    claves: 'conflicto_sesiones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."conflicto_sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-conflictos-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'conflictos',
    linea: 10979,
    claves: 'conflictos api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-generaciones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `generaciones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'generaciones',
    linea: 10986,
    claves: 'generaciones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."generaciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-historial_estados_horario-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `historial_estados_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'historial_estados_horario',
    linea: 10993,
    claves: 'historial_estados_horario api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."historial_estados_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-horarios-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `horarios`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'horarios',
    linea: 11000,
    claves: 'horarios api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."horarios" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-mensajes_generacion-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `mensajes_generacion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'mensajes_generacion',
    linea: 11007,
    claves: 'mensajes_generacion api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."mensajes_generacion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-resultado_edicion_conflictos-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `resultado_edicion_conflictos`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultado_edicion_conflictos',
    linea: 11014,
    claves: 'resultado_edicion_conflictos api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."resultado_edicion_conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-resultados_edicion-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `resultados_edicion`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'resultados_edicion',
    linea: 11021,
    claves: 'resultados_edicion api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."resultados_edicion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-sesion_cohortes-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `sesion_cohortes`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesion_cohortes',
    linea: 11028,
    claves: 'sesion_cohortes api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesion_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-sesiones-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `sesiones`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones',
    linea: 11035,
    claves: 'sesiones api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-sesiones_no_asignadas-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `sesiones_no_asignadas`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'sesiones_no_asignadas',
    linea: 11042,
    claves: 'sesiones_no_asignadas api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesiones_no_asignadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
  },
  {
    id: 'pol-versiones_horario-api_planes_transversal_actualizar',
    nombre: 'api_planes_transversal_actualizar',
    cat: 'rls',
    grupo: 'Políticas · planes y motor',
    desc: 'Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría. Aplicada a `versiones_horario`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'versiones_horario',
    linea: 11049,
    claves: 'versiones_horario api_planes_transversal_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."versiones_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10009,
    claves: 'asignaciones_docente_curso api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_actualizar" ON "horarios"."asignaciones_docente_curso" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10016,
    claves: 'disponibilidad_docente_slots api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_actualizar" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10023,
    claves: 'disponibilidades_docente api_docentes_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_actualizar" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10030,
    claves: 'asignaciones_docente_curso api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_eliminar" ON "horarios"."asignaciones_docente_curso" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10037,
    claves: 'disponibilidad_docente_slots api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_eliminar" ON "horarios"."disponibilidad_docente_slots" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10044,
    claves: 'disponibilidades_docente api_docentes_eliminar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_eliminar" ON "horarios"."disponibilidades_docente" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-docente_facultades-api_docentes_escribir',
    nombre: 'api_docentes_escribir',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Escritura sobre la ficha del docente en cualquier operación: exige permiso (\'docentes\',\'actualizar\'). Aplicada a `docente_facultades`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated',
    tabla: 'docente_facultades',
    linea: 10051,
    claves: 'docente_facultades api_docentes_escribir politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_escribir" ON "horarios"."docente_facultades" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10058,
    claves: 'docentes api_docentes_escribir politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_escribir" ON "horarios"."docentes" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10065,
    claves: 'asignaciones_docente_curso api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_insertar" ON "horarios"."asignaciones_docente_curso" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10072,
    claves: 'disponibilidad_docente_slots api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_insertar" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
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
    linea: 10079,
    claves: 'disponibilidades_docente api_docentes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_insertar" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));`,
  },
  {
    id: 'pol-asignaciones_docente_curso-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes, planes o motor. Aplicada a `asignaciones_docente_curso`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'asignaciones_docente_curso',
    linea: 10086,
    claves: 'asignaciones_docente_curso api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_leer" ON "horarios"."asignaciones_docente_curso" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes, planes o motor. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 10093,
    claves: 'disponibilidad_docente_slots api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_leer" ON "horarios"."disponibilidad_docente_slots" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));`,
  },
  {
    id: 'pol-disponibilidades_docente-api_docentes_leer',
    nombre: 'api_docentes_leer',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Leer datos de docentes: sirve permiso sobre docentes, planes o motor. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 10100,
    claves: 'disponibilidades_docente api_docentes_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_docentes_leer" ON "horarios"."disponibilidades_docente" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));`,
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
    linea: 11105,
    claves: 'eventos_sustitucion api_sustituciones_escribir politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_sustituciones_escribir" ON "horarios"."eventos_sustitucion" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('sustituciones'::"text", 'crear'::"text")) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('sustituciones'::"text", 'crear'::"text") AND ("registrado_por_id" = "horarios"."usuario_actual_id"())));`,
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
    linea: 11112,
    claves: 'eventos_sustitucion api_sustituciones_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_sustituciones_leer" ON "horarios"."eventos_sustitucion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
  },
  {
    id: 'pol-disponibilidades_docente-docente_actualiza_su_disponibilidad',
    nombre: 'docente_actualiza_su_disponibilidad',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo modifica su propia cabecera de disponibilidad. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 11302,
    claves: 'disponibilidades_docente docente_actualiza_su_disponibilidad politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_actualiza_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-docente_actualiza_sus_bloques_disponibles',
    nombre: 'docente_actualiza_sus_bloques_disponibles',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo modifica bloques de su propia disponibilidad. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'UPDATE · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 11313,
    claves: 'disponibilidad_docente_slots docente_actualiza_sus_bloques_disponibles politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_actualiza_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidades_docente-docente_consulta_su_disponibilidad',
    nombre: 'docente_consulta_su_disponibilidad',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo consulta su propia cabecera de disponibilidad. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 11326,
    claves: 'disponibilidades_docente docente_consulta_su_disponibilidad politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_consulta_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-docente_consulta_sus_bloques_disponibles',
    nombre: 'docente_consulta_sus_bloques_disponibles',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo consulta los bloques vinculados a su disponibilidad. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 11335,
    claves: 'disponibilidad_docente_slots docente_consulta_sus_bloques_disponibles politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_consulta_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-docente_elimina_sus_bloques_disponibles',
    nombre: 'docente_elimina_sus_bloques_disponibles',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo elimina bloques de su propia disponibilidad. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'DELETE · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 11345,
    claves: 'disponibilidad_docente_slots docente_elimina_sus_bloques_disponibles politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_elimina_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidades_docente-docente_inserta_su_disponibilidad',
    nombre: 'docente_inserta_su_disponibilidad',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo crea una cabecera de disponibilidad a su nombre. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidades_docente',
    linea: 11361,
    claves: 'disponibilidades_docente docente_inserta_su_disponibilidad politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_inserta_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-docente_inserta_sus_bloques_disponibles',
    nombre: 'docente_inserta_sus_bloques_disponibles',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'El usuario docente activo añade bloques a su propia disponibilidad. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'disponibilidad_docente_slots',
    linea: 11370,
    claves: 'disponibilidad_docente_slots docente_inserta_sus_bloques_disponibles politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_inserta_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));`,
  },
  {
    id: 'pol-disponibilidad_docente_slots-docente_restringe_bloques_propios',
    nombre: 'docente_restringe_bloques_propios',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Política restrictiva: si el usuario es docente, limita el acceso a bloques de su disponibilidad aunque otra política conceda un permiso más amplio. Aplicada a `disponibilidad_docente_slots`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated · restrictiva',
    tabla: 'disponibilidad_docente_slots',
    linea: 11380,
    claves: 'disponibilidad_docente_slots docente_restringe_bloques_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_restringe_bloques_propios" ON "horarios"."disponibilidad_docente_slots" AS RESTRICTIVE TO "authenticated" USING (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR (EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))))) WITH CHECK (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR (EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))));`,
  },
  {
    id: 'pol-disponibilidades_docente-docente_restringe_disponibilidad_propia',
    nombre: 'docente_restringe_disponibilidad_propia',
    cat: 'rls',
    grupo: 'Políticas · docentes',
    desc: 'Política restrictiva: si el usuario es docente, limita el acceso a su disponibilidad aunque otra política conceda un permiso más amplio. Aplicada a `disponibilidades_docente`.',
    detalle: '',
    nota: 'TODAS las operaciones · rol authenticated · restrictiva',
    tabla: 'disponibilidades_docente',
    linea: 11397,
    claves: 'disponibilidades_docente docente_restringe_disponibilidad_propia politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "docente_restringe_disponibilidad_propia" ON "horarios"."disponibilidades_docente" AS RESTRICTIVE TO "authenticated" USING (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR ("docente_id" = ( SELECT "usuario"."docente_id"
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))))) WITH CHECK (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR ("docente_id" = ( SELECT "usuario"."docente_id"
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))));`,
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
    linea: 10107,
    claves: 'usuario_facultades api_facultades_propias politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_facultades_propias" ON "horarios"."usuario_facultades" FOR SELECT TO "authenticated" USING (("usuario_id" = "horarios"."usuario_actual_id"()));`,
  },
  {
    id: 'pol-notificacion_destinatarios-api_notificacion_destinatarios_leer',
    nombre: 'api_notificacion_destinatarios_leer',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Cada quien ve sus propias filas de bandeja; quien tiene (\'notificaciones\',\'leer\') ve todas. Aplicada a `notificacion_destinatarios`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'notificacion_destinatarios',
    linea: 10457,
    claves: 'notificacion_destinatarios api_notificacion_destinatarios_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_notificacion_destinatarios_leer" ON "horarios"."notificacion_destinatarios" FOR SELECT TO "authenticated" USING ((("destinatario_usuario_id" = "horarios"."usuario_actual_id"()) OR "horarios"."usuario_actual_tiene_permiso"('notificaciones'::"text", 'leer'::"text")));`,
  },
  {
    id: 'pol-notificaciones-api_notificaciones_leer',
    nombre: 'api_notificaciones_leer',
    cat: 'rls',
    grupo: 'Políticas · solo lo propio',
    desc: 'Leer un mensaje vivo exige ser su remitente, estar entre sus destinatarios o tener permiso (\'notificaciones\',\'leer\'). Escribir solo se hace por las funciones. Aplicada a `notificaciones`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'notificaciones',
    linea: 10464,
    claves: 'notificaciones api_notificaciones_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_notificaciones_leer" ON "horarios"."notificaciones" FOR SELECT TO "authenticated" USING ((("eliminado_en" IS NULL) AND (("remitente_usuario_id" = "horarios"."usuario_actual_id"()) OR "horarios"."usuario_actual_tiene_permiso"('notificaciones'::"text", 'leer'::"text") OR (EXISTS ( SELECT 1
   FROM "horarios"."notificacion_destinatarios" "nd"
  WHERE (("nd"."notificacion_id" = "notificaciones"."id") AND ("nd"."destinatario_usuario_id" = "horarios"."usuario_actual_id"())))))));`,
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
    linea: 10473,
    claves: 'permisos_acceso api_permisos_catalogo politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_permisos_catalogo" ON "horarios"."permisos_acceso" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 10480,
    claves: 'rol_permisos api_permisos_roles_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_permisos_roles_propios" ON "horarios"."rol_permisos" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuario_roles" "ur"
  WHERE (("ur"."usuario_id" = "horarios"."usuario_actual_id"()) AND ("ur"."rol_id" = "rol_permisos"."rol_id")))));`,
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
    linea: 11056,
    claves: 'plantillas_notificacion api_plantillas_notificacion_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_plantillas_notificacion_leer" ON "horarios"."plantillas_notificacion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));`,
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
    linea: 11063,
    claves: 'reportes api_reportes_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_reportes_insertar" ON "horarios"."reportes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AND ("generado_por_id" = "horarios"."usuario_actual_id"())));`,
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
    linea: 11070,
    claves: 'reportes api_reportes_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_reportes_propios" ON "horarios"."reportes" FOR SELECT TO "authenticated" USING (("generado_por_id" = "horarios"."usuario_actual_id"()));`,
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
    linea: 11077,
    claves: 'roles api_roles_catalogo politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_roles_catalogo" ON "horarios"."roles" FOR SELECT TO "authenticated" USING ((("horarios"."usuario_actual_id"() IS NOT NULL) AND ("eliminado_en" IS NULL)));`,
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
    linea: 11084,
    claves: 'usuario_roles api_roles_propios politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_roles_propios" ON "horarios"."usuario_roles" FOR SELECT TO "authenticated" USING (("usuario_id" = "horarios"."usuario_actual_id"()));`,
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
    linea: 11119,
    claves: 'usuarios api_usuario_propio politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_usuario_propio" ON "horarios"."usuarios" FOR SELECT TO "authenticated" USING ((("auth_user_id" = "auth"."uid"()) AND ("eliminado_en" IS NULL)));`,
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
    linea: 10121,
    claves: 'importacion_errores api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importaciones" ON "horarios"."importacion_errores" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10128,
    claves: 'importaciones api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importaciones" ON "horarios"."importaciones" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10135,
    claves: 'plantillas_importacion api_importaciones politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importaciones" ON "horarios"."plantillas_importacion" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10142,
    claves: 'importaciones api_importaciones_diagnostico politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importaciones_diagnostico" ON "horarios"."importaciones" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text"));`,
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
    linea: 10149,
    claves: 'agrupacion_area_comun_cohortes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10156,
    claves: 'agrupacion_area_comun_cursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10163,
    claves: 'agrupaciones_area_comun api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupaciones_area_comun" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10170,
    claves: 'asignaciones_docente_curso api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."asignaciones_docente_curso" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10177,
    claves: 'aula_recursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."aula_recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10184,
    claves: 'aulas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."aulas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10191,
    claves: 'carrera_jornadas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."carrera_jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10198,
    claves: 'carreras api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."carreras" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10205,
    claves: 'cohorte_periodos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cohorte_periodos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10212,
    claves: 'cohortes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10219,
    claves: 'curso_recursos_requeridos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."curso_recursos_requeridos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10226,
    claves: 'cursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10233,
    claves: 'cursos_en_pensum api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cursos_en_pensum" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10240,
    claves: 'disponibilidad_docente_slots api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10247,
    claves: 'disponibilidades_docente api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10254,
    claves: 'docentes api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."docentes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10261,
    claves: 'facultades api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."facultades" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10268,
    claves: 'jornada_descansos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."jornada_descansos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10275,
    claves: 'jornadas api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10282,
    claves: 'pensums api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."pensums" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10289,
    claves: 'periodos_academicos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."periodos_academicos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10296,
    claves: 'recursos api_importar_catalogo_actualizar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));`,
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
    linea: 10303,
    claves: 'agrupacion_area_comun_cohortes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cohortes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10310,
    claves: 'agrupacion_area_comun_cursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10317,
    claves: 'agrupaciones_area_comun api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupaciones_area_comun" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10324,
    claves: 'asignaciones_docente_curso api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."asignaciones_docente_curso" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10331,
    claves: 'aula_recursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."aula_recursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10338,
    claves: 'aulas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."aulas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10345,
    claves: 'carrera_jornadas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."carrera_jornadas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10352,
    claves: 'carreras api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."carreras" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10359,
    claves: 'cohorte_periodos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cohorte_periodos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10366,
    claves: 'cohortes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cohortes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10373,
    claves: 'curso_recursos_requeridos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."curso_recursos_requeridos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10380,
    claves: 'cursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10387,
    claves: 'cursos_en_pensum api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cursos_en_pensum" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10394,
    claves: 'disponibilidad_docente_slots api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10401,
    claves: 'disponibilidades_docente api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10408,
    claves: 'docentes api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."docentes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10415,
    claves: 'facultades api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."facultades" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10422,
    claves: 'jornada_descansos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."jornada_descansos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10429,
    claves: 'jornadas api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."jornadas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10436,
    claves: 'pensums api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."pensums" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10443,
    claves: 'periodos_academicos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."periodos_academicos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 10450,
    claves: 'recursos api_importar_catalogo_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."recursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));`,
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
    linea: 9463,
    claves: 'auditoria api_auditoria_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_auditoria_insertar" ON "horarios"."auditoria" FOR INSERT TO "authenticated" WITH CHECK (("usuario_id" = "horarios"."usuario_actual_id"()));`,
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
    linea: 9470,
    claves: 'auditoria api_auditoria_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_auditoria_leer" ON "horarios"."auditoria" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'leer'::"text"));`,
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
    linea: 10114,
    claves: 'historial_estados_horario api_historial_aprobacion_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_historial_aprobacion_insertar" ON "horarios"."historial_estados_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text")));`,
  },
  {
    id: 'pol-sugerencias_seccion-api_sugerencias_insertar',
    nombre: 'api_sugerencias_insertar',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Pedir una sección nueva exige permiso (\'academia\',\'crear\') y quedar registrado como solicitante. Aplicada a `sugerencias_seccion`.',
    detalle: '',
    nota: 'INSERT · rol authenticated',
    tabla: 'sugerencias_seccion',
    linea: 11091,
    claves: 'sugerencias_seccion api_sugerencias_insertar politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_sugerencias_insertar" ON "horarios"."sugerencias_seccion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") AND ("solicitada_por_id" = "horarios"."usuario_actual_id"())));`,
  },
  {
    id: 'pol-sugerencias_seccion-api_sugerencias_leer',
    nombre: 'api_sugerencias_leer',
    cat: 'rls',
    grupo: 'Políticas · bitácora y operación',
    desc: 'Ver sugerencias de sección exige permiso (\'academia\',\'leer\'). Aplicada a `sugerencias_seccion`.',
    detalle: '',
    nota: 'SELECT · rol authenticated',
    tabla: 'sugerencias_seccion',
    linea: 11098,
    claves: 'sugerencias_seccion api_sugerencias_leer politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_sugerencias_leer" ON "horarios"."sugerencias_seccion" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text"));`,
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
    linea: 11126,
    claves: 'usuarios api_usuarios_para_auditoria politica rls',
    params: [],
    pasos: [],
    sql: `CREATE POLICY "api_usuarios_para_auditoria" ON "horarios"."usuarios" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));`,
  },
  {
    id: 'comment-138',
    nombre: 'COMMENT · COLUMN "agrupaciones_area_comun"."curso_comun_id"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5613,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."agrupaciones_area_comun"."curso_comun_id" IS 'La clase compartida de la que sale la agrupacion. Con la jornada y el periodo, es su identidad: de aqui se derivan sus cursos y sus cohortes.';`,
  },
  {
    id: 'comment-139',
    nombre: 'COMMENT · COLUMN "agrupaciones_area_comun"."jornada_id"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5620,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."agrupaciones_area_comun"."jornada_id" IS 'La jornada de la agrupacion. Una sesion tiene una sola jornada, asi que solo entran cohortes de esta.';`,
  },
  {
    id: 'comment-160',
    nombre: 'COMMENT · COLUMN "asignaciones_docente_curso"."carrera_id"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5994,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."asignaciones_docente_curso"."carrera_id" IS 'Sin uso: la carrera se deduce del pensum del curso. La restricción la obliga a ser nula.';`,
  },
  {
    id: 'comment-161',
    nombre: 'COMMENT · COLUMN "asignaciones_docente_curso"."facultad_id"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 6001,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."asignaciones_docente_curso"."facultad_id" IS 'Sin uso: la facultad se deduce de la carrera del pensum. La restricción la obliga a ser nula.';`,
  },
  {
    id: 'comment-148',
    nombre: 'COMMENT · COLUMN "cursos"."esta_activo"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5790,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."cursos"."esta_activo" IS 'Controla nuevas selecciones, autorizaciones y generaciones. La fila se conserva para la historia.';`,
  },
  {
    id: 'comment-111',
    nombre: 'COMMENT · COLUMN "jornadas"."jornada_regular_id"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 4137,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."jornadas"."jornada_regular_id" IS 'Nulo en una jornada regular. Con valor, esta jornada es extraordinaria y corre en paralelo a esa jornada regular.';`,
  },
  {
    id: 'comment-155',
    nombre: 'COMMENT · COLUMN "recursos"."tipo"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5909,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON COLUMN "horarios"."recursos"."tipo" IS 'fijo: instalado en el aula, restringe qué aulas sirven. opcional: el docente lo solicita, no restringe el aula.';`,
  },
  {
    id: 'comment-239',
    nombre: 'COMMENT · CONSTRAINT "cursos_en_pensum_sesiones_enteras_check" ON "cursos_en_pensum"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 7207,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON CONSTRAINT "cursos_en_pensum_sesiones_enteras_check" ON "horarios"."cursos_en_pensum" IS 'BloquesSemanalesCompletos: la carga semanal debe dividirse en sesiones enteras.';`,
  },
  {
    id: 'comment-282',
    nombre: 'COMMENT · CONSTRAINT "sesion_cohortes_no_solapadas" ON "sesion_cohortes"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 7550,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON CONSTRAINT "sesion_cohortes_no_solapadas" ON "horarios"."sesion_cohortes" IS 'Una cohorte no cursa dos clases a la vez. Diferible solo para el guardado de una edición manual, que la difiere hasta confirmar.';`,
  },
  {
    id: 'comment-285',
    nombre: 'COMMENT · CONSTRAINT "sesiones_aula_no_solapada" ON "sesiones"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 7573,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON CONSTRAINT "sesiones_aula_no_solapada" ON "horarios"."sesiones" IS 'Un aula no aloja dos clases a la vez. Diferible solo para el guardado de una edición manual, que la difiere hasta confirmar.';`,
  },
  {
    id: 'comment-287',
    nombre: 'COMMENT · CONSTRAINT "sesiones_docente_no_solapado" ON "sesiones"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 7588,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON CONSTRAINT "sesiones_docente_no_solapado" ON "horarios"."sesiones" IS 'Un docente no da dos clases a la vez. Diferible solo para el guardado de una edición manual, que la difiere hasta confirmar.';`,
  },
  {
    id: 'comment-47',
    nombre: 'COMMENT · FUNCTION "consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid", "p_docente_filtro_id" "uuid", "p_aula_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pagina" integer, "p_tamano_pagina" integer, "p_ver_todo" boolean, "p_docente_alcance_id" "uuid", "p_facultad_ids" "uuid"[])',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 1738,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid", "p_docente_filtro_id" "uuid", "p_aula_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pagina" integer, "p_tamano_pagina" integer, "p_ver_todo" boolean, "p_docente_alcance_id" "uuid", "p_facultad_ids" "uuid"[]) IS 'El horario generado por paginas, con sus conflictos y sus huecos. Cada clase dice si esta fijada a mano, en que curso la ve su cohorte (curso_id y curso, el nombre de su pensum), el mismo que traen los pendientes, para contar por curso y cohorte cuantas sesiones faltan, y si es de area comun con cuantas cohortes la cursan juntas (es_area_comun, total_cohortes). Cada clase sin colocar viene ubicada en su carrera, semestre, curso y cohorte, para que la revision la enseñe dentro del horario y no en una lista aparte.';`,
  },
  {
    id: 'comment-61',
    nombre: 'COMMENT · FUNCTION "cursos_equivalentes"("p_curso_id" "uuid")',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 2399,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."cursos_equivalentes"("p_curso_id" "uuid") IS 'El curso activo y los miembros activos de su curso común. Los inactivos no autorizan generaciones nuevas.';`,
  },
  {
    id: 'comment-68',
    nombre: 'COMMENT · FUNCTION "establecer_estado_curso"("p_curso_id" "uuid", "p_esta_activo" boolean)',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 2610,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."establecer_estado_curso"("p_curso_id" "uuid", "p_esta_activo" boolean) IS 'Activa o desactiva un curso de forma idempotente, sin borrar malla, sesiones ni referencias históricas.';`,
  },
  {
    id: 'comment-79',
    nombre: 'COMMENT · FUNCTION "guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer)',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 3280,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer) IS 'Guarda una fila de la rejilla carrera x semestre en una transaccion: busca-o-crea la cohorte de cada semestre marcado con anio_ingreso = año del periodo - floor((semestre-1)/2), la activa en el periodo, desactiva las que se desmarcaron dentro de esa misma carrera, jornada y seccion, y recalcula las areas comunes.';`,
  },
  {
    id: 'comment-115',
    nombre: 'COMMENT · FUNCTION "recalcular_areas_comunes_periodo"("p_periodo_id" "uuid")',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 4222,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."recalcular_areas_comunes_periodo"("p_periodo_id" "uuid") IS 'Rehace la membresia de todas las areas comunes de un periodo a partir de las vistas derivadas y valida cada una. Es la unica forma de escribir agrupacion_area_comun_cursos y agrupacion_area_comun_cohortes desde la derivacion.';`,
  },
  {
    id: 'comment-124',
    nombre: 'COMMENT · FUNCTION "validar_agrupacion_area_comun"("p_id" "uuid")',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 4454,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."validar_agrupacion_area_comun"("p_id" "uuid") IS 'Valida una agrupacion de area comun: al menos dos cursos, ninguno repetido de pensum, todos marcados como area comun, y una sola jornada entre sus cohortes. Que las cohortes cursen la clase este periodo ya lo garantiza vista_area_comun_cohortes_derivadas.';`,
  },
  {
    id: 'comment-132',
    nombre: 'COMMENT · FUNCTION "validar_sesion_en_jornada"()',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5358,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON FUNCTION "horarios"."validar_sesion_en_jornada"() IS 'Valida una sesion contra su jornada, aula, docente y disponibilidad. La autorizacion docente-curso se resuelve por cursos_equivalentes, igual que en completar_sesion_cohorte y validar_horario_publicable, y se comprueba tambien en las sesiones de area comun.';`,
  },
  {
    id: 'comment-170',
    nombre: 'COMMENT · TABLE "curso_comun"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 6128,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON TABLE "horarios"."curso_comun" IS 'Grupo de cursos de distintos pensums que son el mismo curso. De aquí salen las agrupaciones de área común de cada período.';`,
  },
  {
    id: 'comment-176',
    nombre: 'COMMENT · TABLE "docente_facultades"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 6196,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON TABLE "horarios"."docente_facultades" IS 'Facultades a las que pertenece un docente. Cero filas = sin facultad específica.';`,
  },
  {
    id: 'comment-152',
    nombre: 'COMMENT · VIEW "api_cursos_periodo"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 5870,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON VIEW "horarios"."api_cursos_periodo" IS 'Cursos activos derivados de las cohortes activas de un período; la historia permanece en sesiones y cursos.';`,
  },
  {
    id: 'comment-213',
    nombre: 'COMMENT · VIEW "vista_area_comun_cohortes_derivadas"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 6866,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON VIEW "horarios"."vista_area_comun_cohortes_derivadas" IS 'Las cohortes de cada agrupacion: las activas del periodo, en su jornada, que cursan alguno de sus cursos en el semestre que tienen asignado.';`,
  },
  {
    id: 'comment-211',
    nombre: 'COMMENT · VIEW "vista_area_comun_cursos_derivados"',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 6843,
    claves: '',
    params: [],
    pasos: [],
    sql: `COMMENT ON VIEW "horarios"."vista_area_comun_cursos_derivados" IS 'Los cursos de cada agrupacion, derivados de su curso_comun. Es la definicion de la membresia de cursos; agrupacion_area_comun_cursos es su materializacion.';`,
  },
  {
    id: 'pre-cabecera',
    nombre: 'Origen y parámetros del volcado',
    cat: 'base',
    grupo: 'Preámbulo',
    desc: 'Instantánea de la estructura del esquema `horarios` de la base local del proyecto de referencia. Incluye el origen y los parámetros de pg_dump; las migraciones viven en `supabase/migrations/`.',
    detalle: '',
    nota: '',
    tabla: '',
    linea: 1,
    claves: 'regenerar pg_dump migraciones fuente set search_path client_encoding',
    params: [],
    pasos: [],
    sql: `-- Instantánea de la presentación: 2026-09-22
-- Fuente: base local de HORARIOS/Horarios-develop, contenedor supabase_db_horarios.
-- Solo estructura del esquema horarios; no contiene filas, propietarios ni permisos GRANT.
-- Regenerar: docker exec supabase_db_horarios pg_dump --schema-only --no-owner --no-privileges --quote-all-identifiers -n horarios -U postgres postgres
-- Las migraciones se mantienen en supabase/migrations/ del proyecto de referencia.
--
--
-- PostgreSQL database dump
--

\\restrict 3zwEzeF5CzFQvaH9oegfY13p8KC6kzKxeP0LFfyzfF280XMrF6RiUUofhDbmzCC

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
    linea: 31,
    claves: 'esquema schema separacion',
    params: [],
    pasos: [],
    sql: `CREATE SCHEMA "horarios";`,
  },
];

export const META = {
  archivo: 'docs/database.sql',
  lineas: 11657,
  lineasTexto: '11 657',
  objetos: 852,
  cobertura: 100.0,
  instantanea: '2026-09-22',
};
