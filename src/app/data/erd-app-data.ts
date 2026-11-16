// GENERADO — no editar a mano.
// Fuente: docs/esquema-app.sql · script: scripts/gen-erd-app.mjs
// 41 tablas · 53 claves foráneas

export type DominioId =
  | 'identidad'
  | 'avatar'
  | 'tienda'
  | 'progreso'
  | 'rutas'
  | 'moderacion';

export interface Columna {
  n: string;
  t: string;
  pk: boolean;
  fk: boolean;
  nn: boolean;
  gen: boolean;
  enum: boolean;
}

export interface Tabla {
  id: string;
  dominio: DominioId;
  x: number;
  y: number;
  w: number;
  h: number;
  grado: number;
  cols: Columna[];
}

export interface Relacion {
  /** Nombre de la constraint: identificador estable y único. */
  id: string;
  de: string;
  a: string;
  cols: string[];
  onDelete: string;
}

export interface Dominio {
  id: DominioId;
  label: string;
  descripcion: string;
  color: string;
  tablas: number;
  /** Caja envolvente del cluster en el lienzo. */
  x: number;
  y: number;
  w: number;
  h: number;
}

export const DOMINIOS: Dominio[] = [
  { id: 'identidad', label: 'Identidad', descripcion: 'Usuarios, perfil, ubicación geográfica, empleados y mediciones corporales.', color: '#3f6fd6', tablas: 10, x: 1545.5, y: 767.3, w: 851.8, h: 708.1 },
  { id: 'avatar', label: 'Avatar', descripcion: 'Catálogo de recursos gráficos y lo que cada usuario lleva puesto.', color: '#8b52d9', tablas: 7, x: 1594.3, y: 36, w: 864.2, h: 484.5 },
  { id: 'tienda', label: 'Tienda', descripcion: 'Ítems comprables, categorías e inventario de cada usuario.', color: '#b5791b', tablas: 3, x: 3209, y: 616.4, w: 481.8, h: 378.8 },
  { id: 'progreso', label: 'Progreso', descripcion: 'Logros, recompensas, rachas diarias y aportes de recorrido.', color: '#2a9468', tablas: 8, x: 2496.5, y: 1216, w: 794.4, h: 682 },
  { id: 'rutas', label: 'Rutas', descripcion: 'Recorridos GPS, rutas de la comunidad, comentarios y valoraciones.', color: '#c2504b', tablas: 4, x: 769, y: 1454.8, w: 485.2, h: 415.3 },
  { id: 'moderacion', label: 'Moderación', descripcion: 'Denuncias, permisos, bloqueos y bitácoras de auditoría.', color: '#5a6474', tablas: 9, x: 36, y: 425.8, w: 898.1, h: 842.8 },
];

export const TABLAS: Tabla[] = [
  {
    id: 'admin_permiso', dominio: 'moderacion',
    x: 518.9, y: 749.1, w: 150, h: 56, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'permiso', t: 'text', pk: true, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'aporte_recorrido', dominio: 'progreso',
    x: 3179.9, y: 1455.3, w: 152.4, h: 68, grado: 1,
    cols: [
      { n: 'recorrido_clave', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'usuario_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'metros_validos', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'version_validacion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'validado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'auditoria_admin', dominio: 'moderacion',
    x: 734.6, y: 983.2, w: 150, h: 76, grado: 1,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'ocurrido_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actor_usuario_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'permiso', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'accion', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'objeto_tipo', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'objeto_id', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'motivo', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'resultado', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'cambios', t: 'jsonb', pk: false, fk: false, nn: false, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_configuracion', dominio: 'avatar',
    x: 2254.6, y: 260.8, w: 182, h: 60, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'cabello', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'piel', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_equipamiento_accesorio', dominio: 'avatar',
    x: 2300.3, y: 458.5, w: 248.6, h: 56, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'item_id', t: 'integer', pk: true, fk: true, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_item_recurso', dominio: 'avatar',
    x: 2049.3, y: 315, w: 174.6, h: 56, grado: 2,
    cols: [
      { n: 'item_id', t: 'integer', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'recurso_id', t: 'integer', pk: true, fk: true, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_recurso', dominio: 'avatar',
    x: 1703.3, y: 353.1, w: 150, h: 76, grado: 2,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'codigo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'categoria', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'slot', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo_cuerpo', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'storage_path', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'orden_capa', t: 'smallint', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo_disponibilidad', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'es_predeterminado', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nivel_requerido', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'thumbnail_path', t: 'text', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'asset_version', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_seleccion', dominio: 'avatar',
    x: 1763.9, y: 192.6, w: 152.4, h: 64, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'slot', t: 'varchar', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'recurso_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_sexo', dominio: 'avatar',
    x: 1920.2, y: 98, w: 150, h: 56, grado: 1,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'avatar_usuario', dominio: 'avatar',
    x: 2101.1, y: 128.8, w: 150, h: 72, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'sexo_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nivel', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo_cuerpo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'categoria_item', dominio: 'tienda',
    x: 3581.8, y: 703.4, w: 150, h: 56, grado: 1,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'comentario_ruta', dominio: 'rutas',
    x: 1145.2, y: 1618.9, w: 150, h: 76, grado: 4,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'ruta_id', t: 'uuid', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'autor_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'texto', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'oculto_moderacion', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'comunidad_normas_aceptacion', dominio: 'moderacion',
    x: 486.9, y: 1204.6, w: 233.8, h: 60, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'version', t: 'text', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'aceptado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'denuncia_comentario', dominio: 'moderacion',
    x: 294.7, y: 1110.6, w: 174.6, h: 76, grado: 3,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'denunciante_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'objetivo_id', t: 'uuid', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'comentario_id', t: 'uuid', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'motivo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'detalle', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'contenido_publico', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'estado', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'resuelto_en', t: 'timestamptz', pk: false, fk: false, nn: false, gen: false, enum: false },
    ],
  },
  {
    id: 'denuncia_contenido', dominio: 'moderacion',
    x: 189.4, y: 927.8, w: 167.2, h: 76, grado: 2,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'denunciante_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'tipo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'objetivo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'motivo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'detalle', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'contenido_publico', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'estado', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'departamento', dominio: 'identidad',
    x: 2048.6, y: 1080.1, w: 150, h: 64, grado: 2,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'pais_id', t: 'bigint', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'detalle_empleado', dominio: 'identidad',
    x: 2195.7, y: 1271.2, w: 152.4, h: 76, grado: 1,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'usuario_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'codigo_empleado', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'apellidos', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'cargo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'estado_laboral', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'fecha_contratacion', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'inventario_usuario', dominio: 'tienda',
    x: 3553, y: 927.1, w: 167.2, h: 68, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'item_id', t: 'integer', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'equipado', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'origen', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'adquirido_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'item_tienda', dominio: 'tienda',
    x: 3318, y: 688.4, w: 150, h: 76, grado: 5,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'categoria_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'precio', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo_adquisicion', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'visible_tienda', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'localizacion_usuario', dominio: 'identidad',
    x: 1847.5, y: 1134.6, w: 182, h: 76, grado: 4,
    cols: [
      { n: 'municipio_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'perfil_usuario_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nacionalidad_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'fecha_registro', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'fecha_actualizacion', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'pais_id', t: 'bigint', pk: false, fk: true, nn: false, gen: false, enum: false },
    ],
  },
  {
    id: 'logro', dominio: 'progreso',
    x: 3181.9, y: 1664.6, w: 150, h: 76, grado: 3,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'codigo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'descripcion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'umbral', t: 'bigint', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'icono_clave', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'orden', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'recompensa_monedas', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'medicion_corporal', dominio: 'identidad',
    x: 2032.2, y: 1403.4, w: 159.8, h: 76, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'registrado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'modelo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'peso_kg', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'estatura_cm', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'cintura_cm', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'cuello_cm', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'cadera_cm', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'imc', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'grasa_estimada_pct', t: 'float8', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'formula_version', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'moderacion_comentario_auditoria', dominio: 'moderacion',
    x: 201.7, y: 750.4, w: 263.4, h: 76, grado: 2,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'denuncia_id', t: 'uuid', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'moderador_id', t: 'bigint', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'accion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nota', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'antes', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'despues', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'moderacion_contenido_auditoria', dominio: 'moderacion',
    x: 318.6, y: 574.9, w: 256, h: 76, grado: 2,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'denuncia_id', t: 'uuid', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'moderador_id', t: 'bigint', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'accion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nota', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'antes', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'despues', t: 'jsonb', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'moderacion_permiso', dominio: 'moderacion',
    x: 574.8, y: 489.8, w: 167.2, h: 60, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'revisar_denuncias', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'moderar_comentarios', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'municipio', dominio: 'identidad',
    x: 1850.3, y: 1391, w: 150, h: 64, grado: 2,
    cols: [
      { n: 'id', t: 'integer', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'departamento_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'nacionalidad', dominio: 'identidad',
    x: 1677.1, y: 1297.3, w: 150, h: 56, grado: 1,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'pais', dominio: 'identidad',
    x: 1682.3, y: 868.7, w: 150, h: 64, grado: 2,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'codigo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'perfil_usuario', dominio: 'identidad',
    x: 1910.2, y: 839.3, w: 150, h: 76, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'biografia', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'foto_url', t: 'text', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'fecha_nacimiento', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'objetivo_semanal_metros', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'objetivo_semanal_minutos', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nivel_actividad', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'perfil_publico', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'sexo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'racha_dia', dominio: 'progreso',
    x: 2937, y: 1830, w: 150, h: 68, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'fecha_local', t: 'date', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'registrado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'zona_horaria', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'origen', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'racha_operacion', dominio: 'progreso',
    x: 2735.4, y: 1815.5, w: 150, h: 68, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'clave', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'costo', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'fecha', t: 'date', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'racha_usuario', dominio: 'progreso',
    x: 2605.5, y: 1658.4, w: 150, h: 76, grado: 1,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'zona_horaria', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'dias_actuales', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'mejor_racha', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'ultima_fecha', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'protecciones', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'recuperable_dias', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'recuperable_fecha', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'ultima_recuperacion', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'ultimo_dia_protegido', t: 'date', pk: false, fk: false, nn: false, gen: false, enum: false },
    ],
  },
  {
    id: 'recompensa_logro', dominio: 'progreso',
    x: 3003.7, y: 1619.2, w: 152.4, h: 56, grado: 2,
    cols: [
      { n: 'logro_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'item_id', t: 'integer', pk: false, fk: true, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'routes', dominio: 'rutas',
    x: 1103.4, y: 1798.1, w: 150, h: 76, grado: 2,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'user_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'name', t: 'text', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'distance_meters', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'duration_seconds', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'started_at', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'created_at', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'updated_at', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'path', t: 'user-defined', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'origen', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'tipo_actividad', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'ended_at', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'elevation_gain_m', t: 'real', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'elevation_loss_m', t: 'real', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'elegible_logros', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'version_validacion', t: 'text', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'publico', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'ocultar_inicio_pct', t: 'smallint', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'ocultar_fin_pct', t: 'smallint', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'ruta_comunidad', dominio: 'rutas',
    x: 920.1, y: 1715.7, w: 150, h: 76, grado: 4,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'recorrido_id', t: 'uuid', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'autor_id', t: 'bigint', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'origen', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nombre', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'descripcion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'trazo_oficial', t: 'user-defined', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'distancia_oficial', t: 'integer', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'estado', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'atribucion', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'nota_trazo', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'oculto_moderacion', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'solicitud_eliminacion', dominio: 'identidad',
    x: 2268.6, y: 946.7, w: 189.4, h: 76, grado: 1,
    cols: [
      { n: 'id', t: 'uuid', pk: true, fk: false, nn: true, gen: false, enum: false },
      { n: 'usuario_id', t: 'bigint', pk: false, fk: true, nn: false, gen: false, enum: false },
      { n: 'solicitado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'limite_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'estado', t: 'text', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'completado_en', t: 'timestamptz', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'auth_objetivo', t: 'uuid', pk: false, fk: false, nn: false, gen: false, enum: false },
    ],
  },
  {
    id: 'usuario', dominio: 'identidad',
    x: 1654.5, y: 1076.1, w: 150, h: 76, grado: 29,
    cols: [
      { n: 'id', t: 'bigint', pk: true, fk: false, nn: true, gen: true, enum: false },
      { n: 'email', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'activo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'auth_id', t: 'uuid', pk: false, fk: true, nn: true, gen: false, enum: false },
      { n: 'nombre_usuario', t: 'varchar', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'estado', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'rol', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'onboarding_completo', t: 'boolean', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'zona_horaria', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'idioma', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'unidad_distancia', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'ultimo_acceso_en', t: 'timestamptz', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'eliminado_en', t: 'timestamptz', pk: false, fk: false, nn: false, gen: false, enum: false },
      { n: 'codigo_usuario', t: 'varchar', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'saldo_monedas', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'usuario_bloqueo', dominio: 'moderacion',
    x: 825.1, y: 659.7, w: 150, h: 60, grado: 2,
    cols: [
      { n: 'bloqueador_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'bloqueado_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'usuario_logro', dominio: 'progreso',
    x: 2842.5, y: 1382.1, w: 150, h: 64, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'logro_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'obtenido_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'valor_al_obtener', t: 'bigint', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'usuario_recompensa_logro', dominio: 'progreso',
    x: 3061.5, y: 1282, w: 211.6, h: 64, grado: 2,
    cols: [
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'logro_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'monedas', t: 'integer', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
    ],
  },
  {
    id: 'valoracion_ruta', dominio: 'rutas',
    x: 878, y: 1524.8, w: 150, h: 72, grado: 3,
    cols: [
      { n: 'ruta_id', t: 'uuid', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'usuario_id', t: 'bigint', pk: true, fk: true, nn: true, gen: false, enum: false },
      { n: 'estrellas', t: 'smallint', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'creado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'actualizado_en', t: 'timestamptz', pk: false, fk: false, nn: true, gen: false, enum: false },
      { n: 'comentario_id', t: 'uuid', pk: false, fk: true, nn: false, gen: false, enum: false },
    ],
  },
];

export const RELACIONES: Relacion[] = [
  { id: 'admin_permiso_usuario_id_fkey', de: 'admin_permiso', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'aporte_recorrido_usuario_id_fkey', de: 'aporte_recorrido', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'auditoria_admin_actor_usuario_id_fkey', de: 'auditoria_admin', a: 'usuario', cols: ['actor_usuario_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_configuracion_usuario_id_fkey', de: 'avatar_configuracion', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_equipamiento_accesorio_item_id_fkey', de: 'avatar_equipamiento_accesorio', a: 'item_tienda', cols: ['item_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_equipamiento_accesorio_usuario_id_fkey', de: 'avatar_equipamiento_accesorio', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_item_recurso_recurso_id_fkey', de: 'avatar_item_recurso', a: 'avatar_recurso', cols: ['recurso_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_item_recurso_item_id_fkey', de: 'avatar_item_recurso', a: 'item_tienda', cols: ['item_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_seleccion_recurso_id_fkey', de: 'avatar_seleccion', a: 'avatar_recurso', cols: ['recurso_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_seleccion_usuario_id_fkey', de: 'avatar_seleccion', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_usuario_sexo_id_fkey', de: 'avatar_usuario', a: 'avatar_sexo', cols: ['sexo_id'], onDelete: 'NO ACTION' },
  { id: 'avatar_usuario_usuario_id_fkey', de: 'avatar_usuario', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'comentario_ruta_ruta_id_fkey', de: 'comentario_ruta', a: 'ruta_comunidad', cols: ['ruta_id'], onDelete: 'NO ACTION' },
  { id: 'comentario_ruta_autor_id_fkey', de: 'comentario_ruta', a: 'usuario', cols: ['autor_id'], onDelete: 'NO ACTION' },
  { id: 'comunidad_normas_aceptacion_usuario_id_fkey', de: 'comunidad_normas_aceptacion', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'denuncia_comentario_comentario_id_fkey', de: 'denuncia_comentario', a: 'comentario_ruta', cols: ['comentario_id'], onDelete: 'NO ACTION' },
  { id: 'denuncia_comentario_denunciante_id_fkey', de: 'denuncia_comentario', a: 'usuario', cols: ['denunciante_id'], onDelete: 'NO ACTION' },
  { id: 'denuncia_contenido_denunciante_id_fkey', de: 'denuncia_contenido', a: 'usuario', cols: ['denunciante_id'], onDelete: 'NO ACTION' },
  { id: 'departamento_pais_id_fkey', de: 'departamento', a: 'pais', cols: ['pais_id'], onDelete: 'NO ACTION' },
  { id: 'detalle_empleado_usuario_id_fkey', de: 'detalle_empleado', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'inventario_usuario_item_id_fkey', de: 'inventario_usuario', a: 'item_tienda', cols: ['item_id'], onDelete: 'NO ACTION' },
  { id: 'inventario_usuario_usuario_id_fkey', de: 'inventario_usuario', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'item_tienda_categoria_id_fkey', de: 'item_tienda', a: 'categoria_item', cols: ['categoria_id'], onDelete: 'NO ACTION' },
  { id: 'localizacion_usuario_municipio_fkey', de: 'localizacion_usuario', a: 'municipio', cols: ['municipio_id'], onDelete: 'NO ACTION' },
  { id: 'localizacion_usuario_nacionalidad_fkey', de: 'localizacion_usuario', a: 'nacionalidad', cols: ['nacionalidad_id'], onDelete: 'NO ACTION' },
  { id: 'localizacion_usuario_pais_id_fkey', de: 'localizacion_usuario', a: 'pais', cols: ['pais_id'], onDelete: 'NO ACTION' },
  { id: 'localizacion_usuario_perfil_fkey', de: 'localizacion_usuario', a: 'perfil_usuario', cols: ['perfil_usuario_id'], onDelete: 'NO ACTION' },
  { id: 'medicion_corporal_usuario_id_fkey', de: 'medicion_corporal', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'moderacion_comentario_auditoria_denuncia_id_fkey', de: 'moderacion_comentario_auditoria', a: 'denuncia_comentario', cols: ['denuncia_id'], onDelete: 'NO ACTION' },
  { id: 'moderacion_comentario_auditoria_moderador_id_fkey', de: 'moderacion_comentario_auditoria', a: 'usuario', cols: ['moderador_id'], onDelete: 'NO ACTION' },
  { id: 'moderacion_contenido_auditoria_denuncia_id_fkey', de: 'moderacion_contenido_auditoria', a: 'denuncia_contenido', cols: ['denuncia_id'], onDelete: 'NO ACTION' },
  { id: 'moderacion_contenido_auditoria_moderador_id_fkey', de: 'moderacion_contenido_auditoria', a: 'usuario', cols: ['moderador_id'], onDelete: 'NO ACTION' },
  { id: 'moderacion_permiso_usuario_id_fkey', de: 'moderacion_permiso', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'municipio_departamento_id_fkey', de: 'municipio', a: 'departamento', cols: ['departamento_id'], onDelete: 'NO ACTION' },
  { id: 'perfil_usuario_usuario_id_fkey', de: 'perfil_usuario', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'racha_dia_usuario_id_fkey', de: 'racha_dia', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'racha_operacion_usuario_id_fkey', de: 'racha_operacion', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'racha_usuario_usuario_id_fkey', de: 'racha_usuario', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'recompensa_logro_item_id_fkey', de: 'recompensa_logro', a: 'item_tienda', cols: ['item_id'], onDelete: 'NO ACTION' },
  { id: 'recompensa_logro_logro_id_fkey', de: 'recompensa_logro', a: 'logro', cols: ['logro_id'], onDelete: 'NO ACTION' },
  { id: 'routes_user_id_fkey', de: 'routes', a: 'usuario', cols: ['user_id'], onDelete: 'NO ACTION' },
  { id: 'ruta_comunidad_recorrido_id_fkey', de: 'ruta_comunidad', a: 'routes', cols: ['recorrido_id'], onDelete: 'NO ACTION' },
  { id: 'ruta_comunidad_autor_id_fkey', de: 'ruta_comunidad', a: 'usuario', cols: ['autor_id'], onDelete: 'NO ACTION' },
  { id: 'solicitud_eliminacion_usuario_id_fkey', de: 'solicitud_eliminacion', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_bloqueo_bloqueador_id_fkey', de: 'usuario_bloqueo', a: 'usuario', cols: ['bloqueador_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_bloqueo_bloqueado_id_fkey', de: 'usuario_bloqueo', a: 'usuario', cols: ['bloqueado_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_logro_logro_id_fkey', de: 'usuario_logro', a: 'logro', cols: ['logro_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_logro_usuario_id_fkey', de: 'usuario_logro', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_recompensa_logro_logro_id_fkey', de: 'usuario_recompensa_logro', a: 'logro', cols: ['logro_id'], onDelete: 'NO ACTION' },
  { id: 'usuario_recompensa_logro_usuario_id_fkey', de: 'usuario_recompensa_logro', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
  { id: 'valoracion_resena_dueno', de: 'valoracion_ruta', a: 'comentario_ruta', cols: ['comentario_id', 'ruta_id', 'usuario_id'], onDelete: 'NO ACTION' },
  { id: 'valoracion_ruta_ruta_id_fkey', de: 'valoracion_ruta', a: 'ruta_comunidad', cols: ['ruta_id'], onDelete: 'NO ACTION' },
  { id: 'valoracion_ruta_usuario_id_fkey', de: 'valoracion_ruta', a: 'usuario', cols: ['usuario_id'], onDelete: 'NO ACTION' },
];

/** FK que salen del esquema `public` (no se dibujan en el grafo). */
export const REFERENCIAS_EXTERNAS: { de: string; col: string; destino: string }[] = [
  { de: 'usuario', col: 'auth_id', destino: 'auth.users' },
];

export const LIENZO = { ancho: 3726.8, alto: 1934 };
export const TOTAL_COLUMNAS = 276;
export const TOTAL_FK = 54;
