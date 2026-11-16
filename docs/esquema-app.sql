-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.routes (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id bigint NOT NULL,
  name text,
  distance_meters integer NOT NULL DEFAULT 0 CHECK (distance_meters >= 0),
  duration_seconds integer NOT NULL DEFAULT 0 CHECK (duration_seconds >= 0),
  started_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  path USER-DEFINED NOT NULL,
  origen text NOT NULL CHECK (origen = ANY (ARRAY['gps'::text, 'demo_legado'::text])),
  tipo_actividad text NOT NULL CHECK (tipo_actividad = ANY (ARRAY['caminar'::text, 'correr'::text])),
  ended_at timestamp with time zone NOT NULL,
  elevation_gain_m real,
  elevation_loss_m real,
  elegible_logros boolean NOT NULL DEFAULT false,
  version_validacion text,
  publico boolean NOT NULL DEFAULT false,
  ocultar_inicio_pct smallint NOT NULL DEFAULT 10 CHECK (ocultar_inicio_pct >= 0 AND ocultar_inicio_pct <= 45),
  ocultar_fin_pct smallint NOT NULL DEFAULT 10 CHECK (ocultar_fin_pct >= 0 AND ocultar_fin_pct <= 45),
  CONSTRAINT routes_pkey PRIMARY KEY (id),
  CONSTRAINT routes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.usuario (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  email character varying NOT NULL UNIQUE,
  activo boolean NOT NULL DEFAULT true,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  auth_id uuid NOT NULL,
  nombre_usuario character varying,
  estado character varying NOT NULL DEFAULT 'activo'::character varying,
  rol character varying NOT NULL DEFAULT 'consumidor'::character varying CHECK (rol::text = ANY (ARRAY['consumidor'::character varying, 'empleado'::character varying, 'administrador'::character varying]::text[])),
  onboarding_completo boolean NOT NULL DEFAULT false,
  zona_horaria character varying NOT NULL DEFAULT 'America/Guatemala'::character varying,
  idioma character varying NOT NULL DEFAULT 'es'::character varying,
  unidad_distancia character varying NOT NULL DEFAULT 'km'::character varying CHECK (unidad_distancia::text = ANY (ARRAY['km'::character varying, 'mi'::character varying]::text[])),
  ultimo_acceso_en timestamp with time zone,
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  eliminado_en timestamp with time zone,
  codigo_usuario character varying NOT NULL DEFAULT generate_usuario_code(),
  saldo_monedas integer NOT NULL DEFAULT 500 CHECK (saldo_monedas >= 0),
  CONSTRAINT usuario_pkey PRIMARY KEY (id),
  CONSTRAINT usuario_auth_id_fkey FOREIGN KEY (auth_id) REFERENCES auth.users(id)
);
CREATE TABLE public.nacionalidad (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL UNIQUE,
  CONSTRAINT nacionalidad_pkey PRIMARY KEY (id)
);
CREATE TABLE public.departamento (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL,
  pais_id bigint,
  activo boolean NOT NULL DEFAULT true,
  CONSTRAINT departamento_pkey PRIMARY KEY (id),
  CONSTRAINT departamento_pais_id_fkey FOREIGN KEY (pais_id) REFERENCES public.pais(id)
);
CREATE TABLE public.municipio (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  departamento_id integer NOT NULL,
  nombre character varying NOT NULL,
  activo boolean NOT NULL DEFAULT true,
  CONSTRAINT municipio_pkey PRIMARY KEY (id),
  CONSTRAINT municipio_departamento_id_fkey FOREIGN KEY (departamento_id) REFERENCES public.departamento(id)
);
CREATE TABLE public.perfil_usuario (
  usuario_id bigint NOT NULL UNIQUE,
  nombre character varying NOT NULL,
  biografia character varying,
  foto_url text,
  fecha_nacimiento date,
  objetivo_semanal_metros integer NOT NULL DEFAULT 0 CHECK (objetivo_semanal_metros >= 0 AND objetivo_semanal_metros <= 1000000),
  objetivo_semanal_minutos integer NOT NULL DEFAULT 0 CHECK (objetivo_semanal_minutos >= 0 AND objetivo_semanal_minutos <= 10080),
  nivel_actividad character varying NOT NULL DEFAULT 'principiante'::character varying CHECK (nivel_actividad::text = ANY (ARRAY['principiante'::character varying, 'intermedio'::character varying, 'avanzado'::character varying]::text[])),
  perfil_publico boolean NOT NULL DEFAULT false,
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  sexo character varying NOT NULL DEFAULT 'hombre'::character varying CHECK (sexo::text = ANY (ARRAY['hombre'::character varying, 'mujer'::character varying]::text[])),
  CONSTRAINT perfil_usuario_pkey PRIMARY KEY (id),
  CONSTRAINT perfil_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.localizacion_usuario (
  municipio_id integer NOT NULL,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  perfil_usuario_id bigint NOT NULL UNIQUE,
  nacionalidad_id bigint NOT NULL,
  fecha_registro timestamp with time zone NOT NULL DEFAULT now(),
  fecha_actualizacion timestamp with time zone NOT NULL DEFAULT now(),
  pais_id bigint,
  CONSTRAINT localizacion_usuario_pkey PRIMARY KEY (id),
  CONSTRAINT localizacion_usuario_perfil_fkey FOREIGN KEY (perfil_usuario_id) REFERENCES public.perfil_usuario(id),
  CONSTRAINT localizacion_usuario_municipio_fkey FOREIGN KEY (municipio_id) REFERENCES public.municipio(id),
  CONSTRAINT localizacion_usuario_pais_id_fkey FOREIGN KEY (pais_id) REFERENCES public.pais(id),
  CONSTRAINT localizacion_usuario_nacionalidad_fkey FOREIGN KEY (nacionalidad_id) REFERENCES public.nacionalidad(id)
);
CREATE TABLE public.avatar_sexo (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL UNIQUE,
  CONSTRAINT avatar_sexo_pkey PRIMARY KEY (id)
);
CREATE TABLE public.avatar_usuario (
  usuario_id bigint NOT NULL,
  sexo_id integer NOT NULL,
  nivel integer NOT NULL DEFAULT 1 CHECK (nivel >= 1),
  tipo_cuerpo character varying NOT NULL DEFAULT 'hombre'::character varying CHECK (tipo_cuerpo::text = ANY (ARRAY['hombre'::character varying, 'mujer'::character varying]::text[])),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT avatar_usuario_pkey PRIMARY KEY (usuario_id),
  CONSTRAINT avatar_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT avatar_usuario_sexo_id_fkey FOREIGN KEY (sexo_id) REFERENCES public.avatar_sexo(id)
);
CREATE TABLE public.avatar_configuracion (
  usuario_id bigint NOT NULL,
  cabello character varying NOT NULL DEFAULT 'default'::character varying,
  piel character varying NOT NULL DEFAULT 'default'::character varying,
  CONSTRAINT avatar_configuracion_pkey PRIMARY KEY (usuario_id),
  CONSTRAINT avatar_configuracion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.categoria_item (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  nombre character varying NOT NULL UNIQUE,
  CONSTRAINT categoria_item_pkey PRIMARY KEY (id)
);
CREATE TABLE public.item_tienda (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  categoria_id integer NOT NULL,
  nombre character varying NOT NULL UNIQUE,
  precio integer NOT NULL CHECK (precio >= 0),
  tipo_adquisicion character varying NOT NULL DEFAULT 'tienda'::character varying CHECK (tipo_adquisicion::text = ANY (ARRAY['inicial'::character varying, 'tienda'::character varying, 'recompensa'::character varying]::text[])),
  activo boolean NOT NULL DEFAULT true,
  visible_tienda boolean NOT NULL DEFAULT true,
  CONSTRAINT item_tienda_pkey PRIMARY KEY (id),
  CONSTRAINT item_tienda_categoria_id_fkey FOREIGN KEY (categoria_id) REFERENCES public.categoria_item(id)
);
CREATE TABLE public.inventario_usuario (
  usuario_id bigint NOT NULL,
  item_id integer NOT NULL,
  equipado boolean NOT NULL DEFAULT false,
  origen character varying NOT NULL DEFAULT 'administrador'::character varying CHECK (origen::text = ANY (ARRAY['inicial'::character varying, 'compra'::character varying, 'recompensa'::character varying, 'administrador'::character varying, 'legado'::character varying]::text[])),
  adquirido_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT inventario_usuario_pkey PRIMARY KEY (usuario_id, item_id),
  CONSTRAINT inventario_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT inventario_usuario_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item_tienda(id)
);
CREATE TABLE public.avatar_equipamiento_accesorio (
  usuario_id bigint NOT NULL,
  item_id integer NOT NULL,
  CONSTRAINT avatar_equipamiento_accesorio_pkey PRIMARY KEY (usuario_id, item_id),
  CONSTRAINT avatar_equipamiento_accesorio_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT avatar_equipamiento_accesorio_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item_tienda(id)
);
CREATE TABLE public.detalle_empleado (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  usuario_id bigint NOT NULL UNIQUE,
  codigo_empleado character varying NOT NULL DEFAULT generate_empleado_code() UNIQUE,
  nombre character varying NOT NULL,
  apellidos character varying,
  cargo character varying NOT NULL,
  estado_laboral character varying NOT NULL DEFAULT 'activo'::character varying CHECK (estado_laboral::text = ANY (ARRAY['activo'::character varying, 'suspendido'::character varying, 'inactivo'::character varying]::text[])),
  fecha_contratacion date,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT detalle_empleado_pkey PRIMARY KEY (id),
  CONSTRAINT detalle_empleado_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.avatar_recurso (
  id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
  codigo character varying NOT NULL UNIQUE,
  nombre character varying NOT NULL,
  categoria character varying NOT NULL CHECK (categoria::text = ANY (ARRAY['piel'::character varying, 'cabello'::character varying, 'torso'::character varying, 'pantalon'::character varying, 'zapatos'::character varying, 'accesorio'::character varying]::text[])),
  slot character varying NOT NULL CHECK (slot::text = ANY (ARRAY['piel'::character varying, 'cabello'::character varying, 'torso'::character varying, 'pantalon'::character varying, 'zapatos'::character varying, 'cabeza'::character varying, 'orejas'::character varying, 'cuello'::character varying, 'muneca'::character varying]::text[])),
  tipo_cuerpo character varying CHECK (tipo_cuerpo IS NULL OR (tipo_cuerpo::text = ANY (ARRAY['hombre'::character varying, 'mujer'::character varying]::text[]))),
  storage_path text NOT NULL,
  orden_capa smallint NOT NULL,
  tipo_disponibilidad character varying NOT NULL CHECK (tipo_disponibilidad::text = ANY (ARRAY['base'::character varying, 'inicial'::character varying, 'tienda'::character varying, 'recompensa'::character varying]::text[])),
  es_predeterminado boolean NOT NULL DEFAULT false,
  nivel_requerido integer NOT NULL DEFAULT 1 CHECK (nivel_requerido >= 1),
  activo boolean NOT NULL DEFAULT true,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  thumbnail_path text,
  asset_version integer NOT NULL DEFAULT 1,
  CONSTRAINT avatar_recurso_pkey PRIMARY KEY (id)
);
CREATE TABLE public.avatar_seleccion (
  usuario_id bigint NOT NULL,
  slot character varying NOT NULL CHECK (slot::text = ANY (ARRAY['piel'::character varying, 'cabello'::character varying, 'torso'::character varying, 'pantalon'::character varying, 'zapatos'::character varying, 'cabeza'::character varying, 'orejas'::character varying, 'cuello'::character varying, 'muneca'::character varying]::text[])),
  recurso_id integer NOT NULL,
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT avatar_seleccion_pkey PRIMARY KEY (usuario_id, slot),
  CONSTRAINT avatar_seleccion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT avatar_seleccion_recurso_id_fkey FOREIGN KEY (recurso_id) REFERENCES public.avatar_recurso(id)
);
CREATE TABLE public.avatar_item_recurso (
  item_id integer NOT NULL,
  recurso_id integer NOT NULL UNIQUE,
  CONSTRAINT avatar_item_recurso_pkey PRIMARY KEY (item_id, recurso_id),
  CONSTRAINT avatar_item_recurso_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item_tienda(id),
  CONSTRAINT avatar_item_recurso_recurso_id_fkey FOREIGN KEY (recurso_id) REFERENCES public.avatar_recurso(id)
);
CREATE TABLE public.racha_usuario (
  usuario_id bigint NOT NULL,
  zona_horaria text NOT NULL,
  dias_actuales integer NOT NULL DEFAULT 0 CHECK (dias_actuales >= 0),
  mejor_racha integer NOT NULL DEFAULT 0,
  ultima_fecha date,
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  protecciones integer NOT NULL DEFAULT 0 CHECK (protecciones >= 0 AND protecciones <= 1),
  recuperable_dias integer NOT NULL DEFAULT 0,
  recuperable_fecha date,
  ultima_recuperacion date,
  ultimo_dia_protegido date,
  CONSTRAINT racha_usuario_pkey PRIMARY KEY (usuario_id),
  CONSTRAINT racha_usuario_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.racha_dia (
  usuario_id bigint NOT NULL,
  fecha_local date NOT NULL,
  registrado_en timestamp with time zone NOT NULL DEFAULT now(),
  zona_horaria text NOT NULL,
  origen character varying NOT NULL DEFAULT 'acceso'::character varying CHECK (origen::text = ANY (ARRAY['acceso'::character varying, 'proteccion'::character varying, 'recuperacion'::character varying]::text[])),
  CONSTRAINT racha_dia_pkey PRIMARY KEY (usuario_id, fecha_local),
  CONSTRAINT racha_dia_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.logro (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  codigo text NOT NULL UNIQUE,
  nombre text NOT NULL,
  descripcion text NOT NULL,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['distancia_acumulada'::text, 'distancia_recorrido'::text, 'racha_dias'::text])),
  umbral bigint NOT NULL CHECK (umbral > 0),
  icono_clave text NOT NULL,
  orden integer NOT NULL,
  activo boolean NOT NULL DEFAULT true,
  recompensa_monedas integer NOT NULL DEFAULT 50 CHECK (recompensa_monedas >= 0 AND recompensa_monedas <= 1000),
  CONSTRAINT logro_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuario_logro (
  usuario_id bigint NOT NULL,
  logro_id bigint NOT NULL,
  obtenido_en timestamp with time zone NOT NULL DEFAULT now(),
  valor_al_obtener bigint NOT NULL CHECK (valor_al_obtener >= 0),
  CONSTRAINT usuario_logro_pkey PRIMARY KEY (usuario_id, logro_id),
  CONSTRAINT usuario_logro_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT usuario_logro_logro_id_fkey FOREIGN KEY (logro_id) REFERENCES public.logro(id)
);
CREATE TABLE public.aporte_recorrido (
  recorrido_clave uuid NOT NULL,
  usuario_id bigint NOT NULL,
  metros_validos integer NOT NULL CHECK (metros_validos > 0),
  version_validacion text NOT NULL,
  validado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT aporte_recorrido_pkey PRIMARY KEY (recorrido_clave),
  CONSTRAINT aporte_recorrido_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.pais (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  codigo character varying NOT NULL UNIQUE,
  nombre character varying NOT NULL,
  activo boolean NOT NULL DEFAULT true,
  CONSTRAINT pais_pkey PRIMARY KEY (id)
);
CREATE TABLE public.recompensa_logro (
  logro_id bigint NOT NULL,
  item_id integer NOT NULL UNIQUE,
  CONSTRAINT recompensa_logro_pkey PRIMARY KEY (logro_id),
  CONSTRAINT recompensa_logro_logro_id_fkey FOREIGN KEY (logro_id) REFERENCES public.logro(id),
  CONSTRAINT recompensa_logro_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.item_tienda(id)
);
CREATE TABLE public.usuario_recompensa_logro (
  usuario_id bigint NOT NULL,
  logro_id bigint NOT NULL,
  monedas integer NOT NULL,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT usuario_recompensa_logro_pkey PRIMARY KEY (usuario_id, logro_id),
  CONSTRAINT usuario_recompensa_logro_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT usuario_recompensa_logro_logro_id_fkey FOREIGN KEY (logro_id) REFERENCES public.logro(id)
);
CREATE TABLE public.racha_operacion (
  usuario_id bigint NOT NULL,
  clave uuid NOT NULL,
  tipo character varying NOT NULL CHECK (tipo::text = ANY (ARRAY['proteccion'::character varying, 'recuperacion'::character varying]::text[])),
  costo integer NOT NULL,
  fecha date NOT NULL,
  CONSTRAINT racha_operacion_pkey PRIMARY KEY (usuario_id, clave),
  CONSTRAINT racha_operacion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.ruta_comunidad (
  id uuid NOT NULL,
  recorrido_id uuid UNIQUE,
  autor_id bigint NOT NULL,
  origen text NOT NULL CHECK (origen = ANY (ARRAY['comunidad'::text, 'anim'::text])),
  nombre text NOT NULL CHECK (length(btrim(nombre)) >= 3 AND length(btrim(nombre)) <= 100),
  descripcion text NOT NULL DEFAULT ''::text CHECK (length(descripcion) <= 1200),
  trazo_oficial USER-DEFINED,
  distancia_oficial integer,
  estado text NOT NULL DEFAULT 'publicado'::text CHECK (estado = ANY (ARRAY['publicado'::text, 'retirado'::text])),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  atribucion text NOT NULL DEFAULT ''::text CHECK (length(atribucion) <= 250),
  nota_trazo text NOT NULL DEFAULT ''::text CHECK (length(nota_trazo) <= 250),
  oculto_moderacion boolean NOT NULL DEFAULT false,
  CONSTRAINT ruta_comunidad_pkey PRIMARY KEY (id),
  CONSTRAINT ruta_comunidad_recorrido_id_fkey FOREIGN KEY (recorrido_id) REFERENCES public.routes(id),
  CONSTRAINT ruta_comunidad_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.comentario_ruta (
  id uuid NOT NULL,
  ruta_id uuid NOT NULL,
  autor_id bigint NOT NULL,
  texto text NOT NULL CHECK (length(btrim(texto)) >= 1 AND length(btrim(texto)) <= 1000),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  oculto_moderacion boolean NOT NULL DEFAULT false,
  CONSTRAINT comentario_ruta_pkey PRIMARY KEY (id),
  CONSTRAINT comentario_ruta_ruta_id_fkey FOREIGN KEY (ruta_id) REFERENCES public.ruta_comunidad(id),
  CONSTRAINT comentario_ruta_autor_id_fkey FOREIGN KEY (autor_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.auditoria_admin (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  ocurrido_en timestamp with time zone NOT NULL DEFAULT now(),
  actor_usuario_id bigint NOT NULL,
  permiso character varying,
  accion character varying NOT NULL,
  objeto_tipo character varying,
  objeto_id character varying,
  motivo character varying,
  resultado character varying NOT NULL CHECK (resultado::text = ANY (ARRAY['permitido'::character varying, 'denegado'::character varying, 'fallido'::character varying]::text[])),
  cambios jsonb,
  CONSTRAINT auditoria_admin_pkey PRIMARY KEY (id),
  CONSTRAINT auditoria_admin_actor_usuario_id_fkey FOREIGN KEY (actor_usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.medicion_corporal (
  usuario_id bigint NOT NULL,
  id uuid NOT NULL,
  registrado_en timestamp with time zone NOT NULL DEFAULT clock_timestamp(),
  modelo text NOT NULL CHECK (modelo = ANY (ARRAY['hombre'::text, 'mujer'::text])),
  peso_kg double precision CHECK (peso_kg >= 20::double precision AND peso_kg <= 500::double precision),
  estatura_cm double precision CHECK (estatura_cm >= 80::double precision AND estatura_cm <= 250::double precision),
  cintura_cm double precision CHECK (cintura_cm >= 30::double precision AND cintura_cm <= 250::double precision),
  cuello_cm double precision CHECK (cuello_cm >= 15::double precision AND cuello_cm <= 80::double precision),
  cadera_cm double precision CHECK (cadera_cm >= 40::double precision AND cadera_cm <= 250::double precision),
  imc double precision CHECK (imc > 0::double precision AND imc < 1000::double precision),
  grasa_estimada_pct double precision CHECK (grasa_estimada_pct > 0::double precision AND grasa_estimada_pct < 100::double precision),
  formula_version text NOT NULL DEFAULT 'bmi-circumference-v1'::text CHECK (formula_version = 'bmi-circumference-v1'::text),
  CONSTRAINT medicion_corporal_pkey PRIMARY KEY (usuario_id, id),
  CONSTRAINT medicion_corporal_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.valoracion_ruta (
  ruta_id uuid NOT NULL,
  usuario_id bigint NOT NULL,
  estrellas smallint NOT NULL CHECK (estrellas >= 1 AND estrellas <= 5),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  actualizado_en timestamp with time zone NOT NULL DEFAULT now(),
  comentario_id uuid,
  CONSTRAINT valoracion_ruta_pkey PRIMARY KEY (ruta_id, usuario_id),
  CONSTRAINT valoracion_ruta_ruta_id_fkey FOREIGN KEY (ruta_id) REFERENCES public.ruta_comunidad(id),
  CONSTRAINT valoracion_ruta_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id),
  CONSTRAINT valoracion_resena_dueno FOREIGN KEY (comentario_id) REFERENCES public.comentario_ruta(id),
  CONSTRAINT valoracion_resena_dueno FOREIGN KEY (ruta_id) REFERENCES public.comentario_ruta(ruta_id),
  CONSTRAINT valoracion_resena_dueno FOREIGN KEY (usuario_id) REFERENCES public.comentario_ruta(autor_id)
);
CREATE TABLE public.denuncia_comentario (
  id uuid NOT NULL,
  denunciante_id bigint NOT NULL,
  objetivo_id uuid NOT NULL,
  comentario_id uuid,
  motivo text NOT NULL CHECK (motivo = ANY (ARRAY['acoso'::text, 'odio'::text, 'sexual'::text, 'menores'::text, 'violencia'::text, 'privacidad'::text, 'spam'::text, 'fraude'::text, 'otro'::text])),
  detalle text NOT NULL DEFAULT ''::text CHECK (length(detalle) <= 1000),
  contenido_publico jsonb NOT NULL,
  estado text NOT NULL DEFAULT 'pendiente'::text CHECK (estado = ANY (ARRAY['pendiente'::text, 'resuelta'::text, 'desestimada'::text])),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  resuelto_en timestamp with time zone,
  CONSTRAINT denuncia_comentario_pkey PRIMARY KEY (id),
  CONSTRAINT denuncia_comentario_denunciante_id_fkey FOREIGN KEY (denunciante_id) REFERENCES public.usuario(id),
  CONSTRAINT denuncia_comentario_comentario_id_fkey FOREIGN KEY (comentario_id) REFERENCES public.comentario_ruta(id)
);
CREATE TABLE public.moderacion_permiso (
  usuario_id bigint NOT NULL,
  revisar_denuncias boolean NOT NULL DEFAULT false,
  moderar_comentarios boolean NOT NULL DEFAULT false,
  CONSTRAINT moderacion_permiso_pkey PRIMARY KEY (usuario_id),
  CONSTRAINT moderacion_permiso_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.moderacion_comentario_auditoria (
  id uuid NOT NULL,
  denuncia_id uuid,
  moderador_id bigint,
  accion text NOT NULL CHECK (accion = ANY (ARRAY['desestimar'::text, 'ocultar'::text, 'restaurar'::text])),
  nota text NOT NULL CHECK (length(btrim(nota)) >= 10 AND length(btrim(nota)) <= 2000),
  antes jsonb NOT NULL,
  despues jsonb NOT NULL,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT moderacion_comentario_auditoria_pkey PRIMARY KEY (id),
  CONSTRAINT moderacion_comentario_auditoria_denuncia_id_fkey FOREIGN KEY (denuncia_id) REFERENCES public.denuncia_comentario(id),
  CONSTRAINT moderacion_comentario_auditoria_moderador_id_fkey FOREIGN KEY (moderador_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.usuario_bloqueo (
  bloqueador_id bigint NOT NULL,
  bloqueado_id bigint NOT NULL,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT usuario_bloqueo_pkey PRIMARY KEY (bloqueador_id, bloqueado_id),
  CONSTRAINT usuario_bloqueo_bloqueador_id_fkey FOREIGN KEY (bloqueador_id) REFERENCES public.usuario(id),
  CONSTRAINT usuario_bloqueo_bloqueado_id_fkey FOREIGN KEY (bloqueado_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.admin_permiso (
  usuario_id bigint NOT NULL,
  permiso text NOT NULL,
  CONSTRAINT admin_permiso_pkey PRIMARY KEY (usuario_id, permiso),
  CONSTRAINT admin_permiso_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.comunidad_normas_aceptacion (
  usuario_id bigint NOT NULL,
  version text NOT NULL,
  aceptado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT comunidad_normas_aceptacion_pkey PRIMARY KEY (usuario_id, version),
  CONSTRAINT comunidad_normas_aceptacion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.denuncia_contenido (
  id uuid NOT NULL,
  denunciante_id bigint NOT NULL,
  tipo text NOT NULL CHECK (tipo = ANY (ARRAY['perfil'::text, 'ruta'::text])),
  objetivo text NOT NULL,
  motivo text NOT NULL,
  detalle text NOT NULL DEFAULT ''::text CHECK (length(detalle) <= 1000),
  contenido_publico jsonb NOT NULL,
  estado text NOT NULL DEFAULT 'pendiente'::text CHECK (estado = ANY (ARRAY['pendiente'::text, 'resuelta'::text, 'desestimada'::text])),
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT denuncia_contenido_pkey PRIMARY KEY (id),
  CONSTRAINT denuncia_contenido_denunciante_id_fkey FOREIGN KEY (denunciante_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.moderacion_contenido_auditoria (
  id uuid NOT NULL,
  denuncia_id uuid,
  moderador_id bigint,
  accion text NOT NULL,
  nota text NOT NULL,
  antes jsonb NOT NULL,
  despues jsonb NOT NULL,
  creado_en timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT moderacion_contenido_auditoria_pkey PRIMARY KEY (id),
  CONSTRAINT moderacion_contenido_auditoria_denuncia_id_fkey FOREIGN KEY (denuncia_id) REFERENCES public.denuncia_contenido(id),
  CONSTRAINT moderacion_contenido_auditoria_moderador_id_fkey FOREIGN KEY (moderador_id) REFERENCES public.usuario(id)
);
CREATE TABLE public.solicitud_eliminacion (
  id uuid NOT NULL,
  usuario_id bigint UNIQUE,
  solicitado_en timestamp with time zone NOT NULL DEFAULT now(),
  limite_en timestamp with time zone NOT NULL DEFAULT (now() + '45 days'::interval),
  estado text NOT NULL DEFAULT 'pendiente'::text CHECK (estado = ANY (ARRAY['pendiente'::text, 'procesando'::text, 'completada'::text])),
  completado_en timestamp with time zone,
  auth_objetivo uuid,
  CONSTRAINT solicitud_eliminacion_pkey PRIMARY KEY (id),
  CONSTRAINT solicitud_eliminacion_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuario(id)
);