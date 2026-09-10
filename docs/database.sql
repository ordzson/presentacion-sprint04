-- Instantánea de la presentación: 2026-09-09
-- Fuente: base local de HORARIOS/Horarios-develop, contenedor supabase_db_horarios.
-- Solo estructura del esquema horarios; no contiene filas, propietarios ni permisos GRANT.
-- Regenerar: docker exec supabase_db_horarios pg_dump --schema-only --no-owner --no-privileges --quote-all-identifiers -n horarios -U postgres postgres
-- Las migraciones se mantienen en supabase/migrations/ del proyecto de referencia.
--
-- PostgreSQL database dump
--

\restrict VEd9KakYnvmURGDx8mAbQH0reA9KeXpbPYfETHPgS7Qvg8vXmTb2c9TUsJpPtZb

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
SET row_security = off;

--
-- Name: horarios; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA "horarios";


--
-- Name: accion_permiso; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."accion_permiso" AS ENUM (
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
);


--
-- Name: canal_notificacion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."canal_notificacion" AS ENUM (
    'interno'
);


--
-- Name: dia_semana; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."dia_semana" AS ENUM (
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',
    'sabado',
    'domingo'
);


--
-- Name: estado_cohorte; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_cohorte" AS ENUM (
    'activa',
    'inactiva',
    'egresada',
    'archivada'
);


--
-- Name: estado_evento_sustitucion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_evento_sustitucion" AS ENUM (
    'activo',
    'anulado',
    'finalizado'
);


--
-- Name: estado_generacion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_generacion" AS ENUM (
    'pendiente',
    'generando',
    'completada',
    'fallida',
    'inviable',
    'cancelada'
);


--
-- Name: estado_horario; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_horario" AS ENUM (
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
);


--
-- Name: estado_importacion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_importacion" AS ENUM (
    'recibida',
    'validando',
    'aplicada',
    'rechazada',
    'fallida'
);


--
-- Name: estado_notificacion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_notificacion" AS ENUM (
    'pendiente',
    'enviada',
    'leida',
    'fallida'
);


--
-- Name: estado_pensum; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_pensum" AS ENUM (
    'borrador',
    'vigente',
    'en_retiro',
    'archivado'
);


--
-- Name: estado_periodo; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_periodo" AS ENUM (
    'borrador',
    'vigente',
    'cerrado',
    'archivado'
);


--
-- Name: estado_sugerencia_seccion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_sugerencia_seccion" AS ENUM (
    'pendiente',
    'aprobada',
    'rechazada',
    'aplicada',
    'cancelada'
);


--
-- Name: estado_usuario; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_usuario" AS ENUM (
    'activo',
    'inactivo',
    'bloqueado'
);


--
-- Name: estado_ventana_disponibilidad; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."estado_ventana_disponibilidad" AS ENUM (
    'programada',
    'abierta',
    'cerrada',
    'cancelada'
);


--
-- Name: formato_reporte; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."formato_reporte" AS ENUM (
    'pdf',
    'xlsx'
);


--
-- Name: nivel_severidad; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."nivel_severidad" AS ENUM (
    'baja',
    'media',
    'alta',
    'critica'
);


--
-- Name: tipo_archivo_importacion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_archivo_importacion" AS ENUM (
    'csv',
    'xlsx'
);


--
-- Name: tipo_aula; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_aula" AS ENUM (
    'teorica',
    'laboratorio',
    'mixta',
    'virtual'
);


--
-- Name: tipo_evento_sustitucion; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_evento_sustitucion" AS ENUM (
    'sustitucion_temporal',
    'sustitucion_permanente',
    'permiso_ausencia',
    'cancelacion_sesion'
);


--
-- Name: tipo_plan_horario; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_plan_horario" AS ENUM (
    'clases',
    'examenes'
);


--
-- Name: tipo_recurso; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_recurso" AS ENUM (
    'fijo',
    'opcional'
);


--
-- Name: tipo_usuario; Type: TYPE; Schema: horarios; Owner: -
--

CREATE TYPE "horarios"."tipo_usuario" AS ENUM (
    'superadministrador',
    'coordinador_academico',
    'decano',
    'docente',
    'alumno'
);


--
-- Name: activar_cohorte_periodo("uuid", "uuid", integer, integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."activar_cohorte_periodo"("p_cohorte_id" "uuid", "p_periodo_id" "uuid", "p_semestre_asignado" integer, "p_matricula_estimada" integer) RETURNS "void"
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
$$;


--
-- Name: actualizar_agrupacion_area_comun("uuid", "text", "uuid", "uuid"[], "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."actualizar_agrupacion_area_comun"("p_id" "uuid", "p_nombre" "text", "p_curso_principal_id" "uuid", "p_curso_ids" "uuid"[], "p_cohorte_ids" "uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: actualizar_curso_comun("uuid", "text", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."actualizar_curso_comun"("p_id" "uuid", "p_nombre" "text", "p_curso_ids" "uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: actualizar_curso_en_pensum("uuid", "text", "text", boolean, "text", boolean, integer, integer, boolean, integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."actualizar_curso_en_pensum"("p_curso_id" "uuid", "p_codigo" "text", "p_nombre" "text", "p_requiere_laboratorio" boolean, "p_tipo_laboratorio_requerido" "text", "p_es_area_comun" boolean, "p_semestre_asignado" integer, "p_bloques_semanales_exactos" integer, "p_prefiere_bloques_consecutivos" boolean, "p_duracion_slots" integer DEFAULT 1) RETURNS "jsonb"
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
$$;


--
-- Name: actualizar_marca(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."actualizar_marca"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;


--
-- Name: actualizar_marca_con_version(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."actualizar_marca_con_version"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  new.actualizado_en = now();
  new.version_fila = old.version_fila + 1;
  return new;
end;
$$;


--
-- Name: aplicar_receso_a_sesion(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."aplicar_receso_a_sesion"() RETURNS "trigger"
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
$$;


--
-- Name: asignar_recurso_aula("uuid", "uuid", integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."asignar_recurso_aula"("p_aula_id" "uuid", "p_recurso_id" "uuid", "p_cantidad" integer) RETURNS "void"
    LANGUAGE "sql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
    insert into horarios.aula_recursos (aula_id, recurso_id, cantidad)
    values (p_aula_id, p_recurso_id, p_cantidad)
    on conflict (aula_id, recurso_id)
    do update set cantidad = excluded.cantidad;
$$;


--
-- Name: autorizar_curso_docente("uuid", "uuid", "uuid", "uuid", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."autorizar_curso_docente"("p_docente_id" "uuid", "p_curso_id" "uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
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
$$;


--
-- Name: bloquear_eliminacion_horario_oficial(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."bloquear_eliminacion_horario_oficial"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  if old.estado in ('aprobado', 'publicado', 'archivado') then
    raise exception 'No se puede eliminar fisicamente un horario aprobado, publicado o archivado';
  end if;

  return old;
end;
$$;


--
-- Name: bloquear_generacion_publicada(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."bloquear_generacion_publicada"() RETURNS "trigger"
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
$$;


--
-- Name: bloquear_horario_publicado(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."bloquear_horario_publicado"() RETURNS "trigger"
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
$$;


--
-- Name: cambiar_estado_plan("uuid", "text", "text", "text", bigint, "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."cambiar_estado_plan"("p_plan_id" "uuid", "p_estado_anterior" "text", "p_estado_nuevo" "text", "p_motivo" "text", "p_version_anterior" bigint, "p_usuario_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
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
$$;


--
-- Name: comparar_version_horario("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."comparar_version_horario"("p_horario_derivado_id" "uuid") RETURNS "jsonb"
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
$$;


--
-- Name: completar_sesion_cohorte(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."completar_sesion_cohorte"() RETURNS "trigger"
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
$$;


--
-- Name: confirmar_importacion("text", "text", "text", "text", "text", integer, "uuid", "text", "jsonb", "jsonb"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."confirmar_importacion"("p_tipo_archivo" "text", "p_nombre_archivo" "text", "p_hash_archivo" "text", "p_version_plantilla" "text", "p_clave_solicitud" "text", "p_total_filas" integer, "p_solicitada_por_id" "uuid", "p_codigo_plantilla" "text", "p_filas" "jsonb", "p_resumen" "jsonb") RETURNS "jsonb"
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
$$;


--
-- Name: consultar_datos_reporte("uuid", "text", "uuid", "uuid", "uuid", "uuid", "uuid", "uuid", "uuid", "text"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."consultar_datos_reporte"("p_generacion_id" "uuid", "p_vista" "text", "p_filtro_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_periodo_id" "uuid" DEFAULT NULL::"uuid", "p_tipo_plan" "text" DEFAULT NULL::"text") RETURNS "jsonb"
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
$$;


--
-- Name: consultar_horario_publicado("uuid", "uuid", "uuid", "uuid", integer, boolean, boolean, "uuid", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."consultar_horario_publicado"("p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_limite" integer DEFAULT 500, "p_publico" boolean DEFAULT true, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: consultar_horarios("uuid", "uuid", "uuid", "uuid", "uuid", integer, integer, boolean, boolean, "uuid", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."consultar_horarios"("p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_pagina" integer DEFAULT 1, "p_tamano_pagina" integer DEFAULT 50, "p_publico" boolean DEFAULT true, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: consultar_revision_horario("uuid", "uuid", "uuid", "uuid", "uuid", "uuid", integer, integer, boolean, "uuid", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid" DEFAULT NULL::"uuid", "p_docente_filtro_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_pagina" integer DEFAULT 1, "p_tamano_pagina" integer DEFAULT 100, "p_ver_todo" boolean DEFAULT false, "p_docente_alcance_id" "uuid" DEFAULT NULL::"uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    with periodo as (
        select h.periodo_id from horarios.horarios h where h.id = p_horario_id
    ), sesiones_filtradas as (
        select s.id as sesion_id, cu.nombre as curso,
               co.anio_ingreso::text || '-' || co.seccion as cohorte, co.id as cohorte_id,
               coalesce(cp.semestre_asignado, 0) as semestre,
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
        select cu.nombre            as curso,
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
$$;


--
-- Name: FUNCTION "consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid", "p_docente_filtro_id" "uuid", "p_aula_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pagina" integer, "p_tamano_pagina" integer, "p_ver_todo" boolean, "p_docente_alcance_id" "uuid", "p_facultad_ids" "uuid"[]); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."consultar_revision_horario"("p_horario_id" "uuid", "p_cohorte_id" "uuid", "p_docente_filtro_id" "uuid", "p_aula_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pagina" integer, "p_tamano_pagina" integer, "p_ver_todo" boolean, "p_docente_alcance_id" "uuid", "p_facultad_ids" "uuid"[]) IS 'El horario generado por paginas, con sus conflictos y sus huecos. Cada clase sin colocar viene ubicada en su carrera, semestre, curso y cohorte, para que la revision la enseñe dentro del horario y no en una lista aparte.';


--
-- Name: conteos_revision_plan("uuid", "uuid"[], "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."conteos_revision_plan"("p_periodo_id" "uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: crear_agrupacion_area_comun("uuid", "text", "uuid", "uuid"[], "uuid"[], "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_agrupacion_area_comun"("p_periodo_id" "uuid", "p_nombre" "text", "p_curso_principal_id" "uuid", "p_curso_ids" "uuid"[], "p_cohorte_ids" "uuid"[], "p_creada_por_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
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
$$;


--
-- Name: crear_agrupacion_desde_curso_comun("uuid", "uuid", "uuid", "text", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_agrupacion_desde_curso_comun"("p_curso_comun_id" "uuid", "p_periodo_id" "uuid", "p_jornada_id" "uuid", "p_nombre" "text" DEFAULT NULL::"text", "p_creada_por_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
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
$$;


--
-- Name: crear_cohorte("uuid", "uuid", "uuid", integer, "text", integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_cohorte"("p_carrera_id" "uuid", "p_pensum_id" "uuid", "p_jornada_id" "uuid", "p_anio_ingreso" integer, "p_seccion" "text", "p_matricula_estimada" integer) RETURNS "jsonb"
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
$$;


--
-- Name: crear_curso_comun("text", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_curso_comun"("p_nombre" "text", "p_curso_ids" "uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: crear_curso_en_pensum("uuid", "text", "text", boolean, "text", boolean, integer, integer, boolean, integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_curso_en_pensum"("p_pensum_id" "uuid", "p_codigo" "text", "p_nombre" "text", "p_requiere_laboratorio" boolean, "p_tipo_laboratorio_requerido" "text", "p_es_area_comun" boolean, "p_semestre_asignado" integer, "p_bloques_semanales_exactos" integer, "p_prefiere_bloques_consecutivos" boolean, "p_duracion_slots" integer DEFAULT 1) RETURNS "jsonb"
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
$$;


--
-- Name: crear_plan_horario("uuid", "text", "uuid", "uuid"[], "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_plan_horario"("p_periodo_id" "uuid", "p_tipo" "text", "p_horario_origen_id" "uuid" DEFAULT NULL::"uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "jsonb"
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
$$;


--
-- Name: crear_usuario_docente("uuid", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_usuario_docente"("p_auth_user_id" "uuid", "p_docente_id" "uuid") RETURNS "jsonb"
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
        docente_id
    )
    values (
        p_auth_user_id,
        'docente'::horarios.tipo_usuario,
        trim(v_docente.nombre_completo),
        lower(trim(v_docente.correo)),
        'activo'::horarios.estado_usuario,
        p_docente_id
    )
    returning * into v_usuario;

    insert into horarios.usuario_roles (usuario_id, rol_id)
    values (v_usuario.id, v_rol_id)
    on conflict do nothing;

    return to_jsonb(v_usuario);
end;
$$;


--
-- Name: crear_usuario_inicial("uuid", "text", "text", "text", "text"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_usuario_inicial"("p_auth_user_id" "uuid", "p_tipo" "text", "p_nombre" "text", "p_correo" "text", "p_rol" "text") RETURNS "jsonb"
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
$$;


--
-- Name: crear_version_derivada("uuid", "uuid", "uuid", "uuid", "uuid", "text", integer, integer, integer, integer, "text", "text", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."crear_version_derivada"("p_horario_origen_id" "uuid", "p_sesion_origen_id" "uuid", "p_docente_id" "uuid" DEFAULT NULL::"uuid", "p_aula_id" "uuid" DEFAULT NULL::"uuid", "p_jornada_id" "uuid" DEFAULT NULL::"uuid", "p_dia" "text" DEFAULT NULL::"text", "p_indice_slot_inicio" integer DEFAULT NULL::integer, "p_duracion_slots" integer DEFAULT NULL::integer, "p_minuto_inicio" integer DEFAULT NULL::integer, "p_minuto_fin" integer DEFAULT NULL::integer, "p_motivo" "text" DEFAULT NULL::"text", "p_clave_solicitud" "text" DEFAULT NULL::"text", "p_usuario_id" "uuid" DEFAULT NULL::"uuid") RETURNS "jsonb"
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
$$;


--
-- Name: cursos_equivalentes("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."cursos_equivalentes"("p_curso_id" "uuid") RETURNS TABLE("curso_id" "uuid")
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select p_curso_id
    union
    select gc2.curso_id
    from horarios.curso_comun_cursos gc1
    join horarios.curso_comun g
      on g.id = gc1.curso_comun_id and g.eliminado_en is null
    join horarios.curso_comun_cursos gc2
      on gc2.curso_comun_id = gc1.curso_comun_id
    where gc1.curso_id = p_curso_id;
$$;


--
-- Name: FUNCTION "cursos_equivalentes"("p_curso_id" "uuid"); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."cursos_equivalentes"("p_curso_id" "uuid") IS 'El curso y los demás miembros de su curso común. Un curso sin grupo se devuelve solo.';


--
-- Name: diagnosticar_sistema(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."diagnosticar_sistema"() RETURNS "jsonb"
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
$$;


--
-- Name: eliminar_curso_en_pensum("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."eliminar_curso_en_pensum"("p_curso_id" "uuid") RETURNS boolean
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
$$;


--
-- Name: fijar_alcance_plan("uuid", "uuid"[], "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."fijar_alcance_plan"("p_plan_id" "uuid", "p_carrera_ids" "uuid"[] DEFAULT '{}'::"uuid"[], "p_jornada_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
declare
    v_estado horarios.estado_horario;
begin
    select estado into v_estado
    from horarios.horarios
    where id = p_plan_id and eliminado_en is null;

    if v_estado is null then
        raise exception 'plan_inexistente' using errcode = 'no_data_found';
    end if;

    if v_estado <> 'borrador' then
        raise exception 'plan_no_editable' using errcode = 'invalid_parameter_value';
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
$$;


--
-- Name: fijar_cursos_comunes("uuid", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."fijar_cursos_comunes"("p_curso_comun_id" "uuid", "p_curso_ids" "uuid"[]) RETURNS "void"
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
$$;


--
-- Name: fijar_facultades_docente("uuid", "uuid"[]); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."fijar_facultades_docente"("p_docente_id" "uuid", "p_facultad_ids" "uuid"[] DEFAULT '{}'::"uuid"[]) RETURNS "void"
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
$$;


--
-- Name: finalizar_generacion("uuid", "text", bigint, integer, integer, numeric, numeric, integer, "jsonb", "jsonb", "jsonb", "jsonb", "jsonb", "jsonb"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."finalizar_generacion"("p_generacion_id" "uuid", "p_estado" "text", "p_duracion_ms" bigint, "p_total_violaciones_duras" integer, "p_total_sesiones_pendientes" integer, "p_puntaje_inicial" numeric, "p_puntaje_final" numeric, "p_total_violaciones_blandas" integer, "p_puntaje_desglose" "jsonb", "p_resultado" "jsonb", "p_mensajes" "jsonb", "p_sesiones" "jsonb" DEFAULT '[]'::"jsonb", "p_pendientes" "jsonb" DEFAULT '[]'::"jsonb", "p_conflictos" "jsonb" DEFAULT '[]'::"jsonb") RETURNS "jsonb"
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
$$;


--
-- Name: guardar_disponibilidad_docente("uuid", "uuid", boolean, "jsonb"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."guardar_disponibilidad_docente"("p_docente_id" "uuid", "p_periodo_id" "uuid", "p_confirmar" boolean, "p_slots" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
$$;


--
-- Name: guardar_mi_disponibilidad_docente("uuid", boolean, "jsonb"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."guardar_mi_disponibilidad_docente"("p_periodo_id" "uuid", "p_confirmar" boolean, "p_slots" "jsonb") RETURNS "jsonb"
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

    return (
        select jsonb_build_object(
            'id', disponibilidad.id,
            'docente_id', disponibilidad.docente_id,
            'periodo_id', disponibilidad.periodo_id,
            'esta_confirmada', disponibilidad.esta_confirmada,
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
$$;


--
-- Name: guardar_rejilla_cohortes("uuid", "uuid", "uuid", "uuid", "text", integer[], integer); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer) RETURNS "jsonb"
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
$$;


--
-- Name: FUNCTION "guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."guardar_rejilla_cohortes"("p_periodo_id" "uuid", "p_carrera_id" "uuid", "p_jornada_id" "uuid", "p_pensum_id" "uuid", "p_seccion" "text", "p_semestres" integer[], "p_matricula" integer) IS 'Guarda una fila de la rejilla carrera x semestre en una transaccion: busca-o-crea la cohorte de cada semestre marcado con anio_ingreso = año del periodo - floor((semestre-1)/2), la activa en el periodo, desactiva las que se desmarcaron dentro de esa misma carrera, jornada y seccion, y recalcula las areas comunes.';


--
-- Name: guardar_reparacion_version("uuid", boolean, "text", "jsonb", "jsonb", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."guardar_reparacion_version"("p_horario_derivado_id" "uuid", "p_fue_exitoso" boolean, "p_mensaje" "text", "p_sesiones_movidas" "jsonb", "p_asignaciones" "jsonb", "p_usuario_id" "uuid") RETURNS "void"
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
$$;


--
-- Name: guardar_resultado_generacion("uuid", "jsonb", "jsonb", "jsonb", numeric); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."guardar_resultado_generacion"("p_plan_id" "uuid", "p_sesiones" "jsonb", "p_pendientes" "jsonb" DEFAULT '[]'::"jsonb", "p_conflictos" "jsonb" DEFAULT '[]'::"jsonb", "p_costo_total" numeric DEFAULT 0) RETURNS integer
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
$$;


--
-- Name: iniciar_generacion("uuid", "text", "uuid", "uuid", "text", "text", "jsonb"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."iniciar_generacion"("p_periodo_id" "uuid", "p_tipo_plan" "text", "p_plan_id" "uuid", "p_solicitada_por_id" "uuid", "p_version_motor" "text", "p_clave_solicitud" "text", "p_instantanea_entrada" "jsonb") RETURNS "jsonb"
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
$$;


--
-- Name: limpiar_miembros_curso_comun(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."limpiar_miembros_curso_comun"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
    AS $$
begin
    delete from horarios.curso_comun_cursos where curso_comun_id = new.id;
    return new;
end;
$$;


--
-- Name: listar_agrupaciones_area_comun("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_agrupaciones_area_comun"("p_periodo_id" "uuid") RETURNS "jsonb"
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
$$;


--
-- Name: listar_cohortes_publicadas(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_cohortes_publicadas"() RETURNS "jsonb"
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
$$;


--
-- Name: listar_cursos_comunes(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_cursos_comunes"() RETURNS "jsonb"
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
$$;


--
-- Name: listar_generaciones_plan("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_generaciones_plan"("p_plan_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(horarios.obtener_generacion(c.id)
        order by c.iniciada_en desc), '[]'::jsonb)
    from horarios.generaciones c where c.plan_id = p_plan_id;
$$;


--
-- Name: listar_permisos_usuario("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_permisos_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
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
$$;


--
-- Name: listar_roles_usuario("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_roles_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select coalesce(jsonb_agg(r.nombre order by r.nombre), '[]'::jsonb)
    from horarios.usuario_roles ur
    join horarios.roles r on r.id = ur.rol_id
    where ur.usuario_id = p_usuario_id and r.eliminado_en is null;
$$;


--
-- Name: listar_sustituciones_publicadas("uuid", "date"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."listar_sustituciones_publicadas"("p_horario_id" "uuid", "p_fecha" "date") RETURNS "jsonb"
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
$$;


--
-- Name: obtener_alcance_usuario("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."obtener_alcance_usuario"("p_usuario_id" "uuid") RETURNS "jsonb"
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
$$;


--
-- Name: obtener_disponibilidad_docente("uuid", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."obtener_disponibilidad_docente"("p_docente_id" "uuid", "p_periodo_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
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
$$;


--
-- Name: obtener_generacion("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."obtener_generacion"("p_generacion_id" "uuid") RETURNS "jsonb"
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
$$;


--
-- Name: obtener_mi_disponibilidad_docente("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."obtener_mi_disponibilidad_docente"("p_periodo_id" "uuid") RETURNS "jsonb"
    LANGUAGE "sql" STABLE
    SET "search_path" TO ''
    AS $$
    select jsonb_build_object(
        'id', disponibilidad.id,
        'docente_id', disponibilidad.docente_id,
        'periodo_id', disponibilidad.periodo_id,
        'esta_confirmada', disponibilidad.esta_confirmada,
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
    where disponibilidad.periodo_id = p_periodo_id
      and disponibilidad.docente_id = (
          select usuario.docente_id
          from horarios.usuarios usuario
          where usuario.auth_user_id = (select auth.uid())
            and usuario.tipo = 'docente'
            and usuario.estado = 'activo'
            and usuario.eliminado_en is null
      );
$$;


--
-- Name: plan_es_completo_y_valido("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."plan_es_completo_y_valido"("p_plan_id" "uuid") RETURNS boolean
    LANGUAGE "sql" STABLE
    SET "search_path" TO 'horarios', 'public'
    AS $$
    select exists (select 1 from horarios.sesiones where horario_id = p_plan_id)
       and not exists (select 1 from horarios.sesiones_no_asignadas where horario_id = p_plan_id)
       and not exists (select 1 from horarios.conflictos
                       where horario_id = p_plan_id and es_restriccion_dura)
       and coalesce((select cantidad_violaciones_duras = 0
                     from horarios.horarios where id = p_plan_id), false);
$$;


--
-- Name: propagar_cambio_sesion_a_cohortes(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."propagar_cambio_sesion_a_cohortes"() RETURNS "trigger"
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
$$;


--
-- Name: recalcular_areas_comunes_periodo("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."recalcular_areas_comunes_periodo"("p_periodo_id" "uuid") RETURNS integer
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
$$;


--
-- Name: FUNCTION "recalcular_areas_comunes_periodo"("p_periodo_id" "uuid"); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."recalcular_areas_comunes_periodo"("p_periodo_id" "uuid") IS 'Rehace la membresia de todas las areas comunes de un periodo a partir de las vistas derivadas y valida cada una. Es la unica forma de escribir agrupacion_area_comun_cursos y agrupacion_area_comun_cohortes desde la derivacion.';


--
-- Name: restaurar_entidad("text", "uuid", "text", "uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."restaurar_entidad"("p_entidad" "text", "p_entidad_id" "uuid", "p_motivo" "text", "p_usuario_id" "uuid") RETURNS "jsonb"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'horarios', 'public'
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
$_$;


--
-- Name: revalidar_cohortes_de_sesion(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."revalidar_cohortes_de_sesion"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
begin
  update sesion_cohortes
  set cohorte_id = cohorte_id
  where sesion_id = new.id;

  return new;
end;
$$;


--
-- Name: revocar_curso_docente("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."revocar_curso_docente"("p_asignacion_id" "uuid") RETURNS boolean
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
$$;


--
-- Name: usuario_actual_id(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."usuario_actual_id"() RETURNS "uuid"
    LANGUAGE "sql" STABLE SECURITY DEFINER
    SET "search_path" TO 'horarios', 'auth', 'public'
    AS $$
    select id
    from horarios.usuarios
    where auth_user_id = auth.uid()
      and estado = 'activo'
      and eliminado_en is null
    limit 1;
$$;


--
-- Name: usuario_actual_tiene_permiso("text", "text"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."usuario_actual_tiene_permiso"("p_recurso" "text", "p_accion" "text") RETURNS boolean
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
$$;


--
-- Name: usuario_tiene_permiso("uuid", "text", "text"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."usuario_tiene_permiso"("p_usuario_id" "uuid", "p_recurso" "text", "p_accion" "text") RETURNS boolean
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
$$;


--
-- Name: validar_agrupacion_area_comun("uuid"); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_agrupacion_area_comun"("p_id" "uuid") RETURNS "void"
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
$$;


--
-- Name: FUNCTION "validar_agrupacion_area_comun"("p_id" "uuid"); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."validar_agrupacion_area_comun"("p_id" "uuid") IS 'Valida una agrupacion de area comun: al menos dos cursos, ninguno repetido de pensum, todos marcados como area comun, y una sola jornada entre sus cohortes. Que las cohortes cursen la clase este periodo ya lo garantiza vista_area_comun_cohortes_derivadas.';


--
-- Name: validar_cohorte_periodo(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_cohorte_periodo"() RETURNS "trigger"
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
$$;


--
-- Name: validar_descanso_en_jornada(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_descanso_en_jornada"() RETURNS "trigger"
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
end $$;


--
-- Name: validar_disponibilidad_slot(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_disponibilidad_slot"() RETURNS "trigger"
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
$$;


--
-- Name: validar_horario_publicable(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_horario_publicable"() RETURNS "trigger"
    LANGUAGE "plpgsql"
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
$$;


--
-- Name: validar_importacion_plantilla(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_importacion_plantilla"() RETURNS "trigger"
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
$$;


--
-- Name: validar_sesion_en_jornada(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_sesion_en_jornada"() RETURNS "trigger"
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
$$;


--
-- Name: FUNCTION "validar_sesion_en_jornada"(); Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON FUNCTION "horarios"."validar_sesion_en_jornada"() IS 'Valida una sesion contra su jornada, aula, docente y disponibilidad. La autorizacion docente-curso se resuelve por cursos_equivalentes, igual que en completar_sesion_cohorte y validar_horario_publicable, y se comprueba tambien en las sesiones de area comun.';


--
-- Name: validar_sustitucion_docente_original(); Type: FUNCTION; Schema: horarios; Owner: -
--

CREATE FUNCTION "horarios"."validar_sustitucion_docente_original"() RETURNS "trigger"
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
$$;


SET default_tablespace = '';

SET default_table_access_method = "heap";

--
-- Name: agrupacion_area_comun_cohortes; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."agrupacion_area_comun_cohortes" (
    "agrupacion_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL
);


--
-- Name: agrupacion_area_comun_cursos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."agrupacion_area_comun_cursos" (
    "agrupacion_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL
);


--
-- Name: agrupaciones_area_comun; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."agrupaciones_area_comun" (
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
);


--
-- Name: COLUMN "agrupaciones_area_comun"."curso_comun_id"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON COLUMN "horarios"."agrupaciones_area_comun"."curso_comun_id" IS 'La clase compartida de la que sale la agrupacion. Con la jornada y el periodo, es su identidad: de aqui se derivan sus cursos y sus cohortes.';


--
-- Name: COLUMN "agrupaciones_area_comun"."jornada_id"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON COLUMN "horarios"."agrupaciones_area_comun"."jornada_id" IS 'La jornada de la agrupacion. Una sesion tiene una sola jornada, asi que solo entran cohortes de esta.';


--
-- Name: auditoria; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."auditoria" (
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
);


--
-- Name: usuarios; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."usuarios" (
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
    CONSTRAINT "usuarios_check" CHECK (((("tipo" = 'docente'::"horarios"."tipo_usuario") AND ("docente_id" IS NOT NULL) AND ("cohorte_id" IS NULL)) OR (("tipo" = 'alumno'::"horarios"."tipo_usuario") AND ("cohorte_id" IS NOT NULL) AND ("docente_id" IS NULL)) OR (("tipo" = ANY (ARRAY['superadministrador'::"horarios"."tipo_usuario", 'coordinador_academico'::"horarios"."tipo_usuario", 'decano'::"horarios"."tipo_usuario"])) AND ("docente_id" IS NULL) AND ("cohorte_id" IS NULL)))),
    CONSTRAINT "usuarios_correo_institucional_check" CHECK ((("correo_institucional")::"text" = "lower"(TRIM(BOTH FROM "correo_institucional"))))
);


--
-- Name: api_auditoria; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."api_auditoria" WITH ("security_invoker"='true') AS
 SELECT "a"."id",
    "a"."fecha",
    "a"."accion",
    "a"."entidad",
    "a"."entidad_id",
    "u"."nombre_completo" AS "usuario",
    "a"."motivo"
   FROM ("horarios"."auditoria" "a"
     LEFT JOIN "horarios"."usuarios" "u" ON (("u"."id" = "a"."usuario_id")));


--
-- Name: cohorte_periodos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."cohorte_periodos" (
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
);


--
-- Name: cohortes; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."cohortes" (
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
);


--
-- Name: api_cohortes_activas; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."api_cohortes_activas" WITH ("security_invoker"='true') AS
 SELECT "cp"."cohorte_id",
    "cp"."periodo_id",
    "cp"."semestre_asignado",
    "cp"."matricula_estimada",
    "c"."seccion"
   FROM ("horarios"."cohorte_periodos" "cp"
     JOIN "horarios"."cohortes" "c" ON ((("c"."id" = "cp"."cohorte_id") AND ("c"."eliminado_en" IS NULL))))
  WHERE ("cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL));


--
-- Name: carreras; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."carreras" (
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
);


--
-- Name: cursos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."cursos" (
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
    CONSTRAINT "cursos_check" CHECK (("requiere_laboratorio" OR ("tipo_laboratorio_requerido" IS NULL))),
    CONSTRAINT "cursos_codigo_check" CHECK ((("codigo")::"text" = "upper"(TRIM(BOTH FROM "codigo")))),
    CONSTRAINT "cursos_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);


--
-- Name: cursos_en_pensum; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."cursos_en_pensum" (
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
);


--
-- Name: pensums; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."pensums" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "carrera_id" "uuid" NOT NULL,
    "anio_creacion" integer NOT NULL,
    "estado" "horarios"."estado_pensum" DEFAULT 'borrador'::"horarios"."estado_pensum" NOT NULL,
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "pensums_anio_creacion_check" CHECK (("anio_creacion" >= 1900))
);


--
-- Name: api_cursos_periodo; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."api_cursos_periodo" WITH ("security_invoker"='true') AS
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
     JOIN "horarios"."cursos" "cur" ON ((("cur"."id" = "cep"."curso_id") AND ("cur"."eliminado_en" IS NULL))))
  WHERE ("cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL));


--
-- Name: VIEW "api_cursos_periodo"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON VIEW "horarios"."api_cursos_periodo" IS 'Cursos derivados de las cohortes activas de un período. Misma regla que el motor: pensum de la cohorte × semestre en que la cohorte está ese período.';


--
-- Name: aula_recursos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."aula_recursos" (
    "aula_id" "uuid" NOT NULL,
    "recurso_id" "uuid" NOT NULL,
    "cantidad" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "aula_recursos_cantidad_check" CHECK (("cantidad" > 0))
);


--
-- Name: recursos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."recursos" (
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
);


--
-- Name: COLUMN "recursos"."tipo"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON COLUMN "horarios"."recursos"."tipo" IS 'fijo: instalado en el aula, restringe qué aulas sirven. opcional: el docente lo solicita, no restringe el aula.';


--
-- Name: api_recursos_aula; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."api_recursos_aula" WITH ("security_invoker"='true') AS
 SELECT "ar"."aula_id",
    "ar"."recurso_id",
    "r"."codigo",
    "r"."nombre",
    "ar"."cantidad"
   FROM ("horarios"."aula_recursos" "ar"
     JOIN "horarios"."recursos" "r" ON (("r"."id" = "ar"."recurso_id")))
  WHERE ("r"."esta_activo" AND ("r"."eliminado_en" IS NULL));


--
-- Name: importaciones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."importaciones" (
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
);


--
-- Name: api_resumen_importaciones; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."api_resumen_importaciones" WITH ("security_invoker"='true') AS
 SELECT "id" AS "importacion_id",
    "nombre_archivo" AS "archivo",
    ("estado")::"text" AS "estado",
    "filas_validas" AS "aceptadas",
    "filas_invalidas" AS "rechazadas",
    GREATEST((("total_filas" - "filas_validas") - "filas_invalidas"), 0) AS "pendientes",
    "creada_en"
   FROM "horarios"."importaciones";


--
-- Name: asignaciones_docente_curso; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."asignaciones_docente_curso" (
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
);


--
-- Name: COLUMN "asignaciones_docente_curso"."carrera_id"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON COLUMN "horarios"."asignaciones_docente_curso"."carrera_id" IS 'Sin uso: la carrera se deduce del pensum del curso. La restricción la obliga a ser nula.';


--
-- Name: COLUMN "asignaciones_docente_curso"."facultad_id"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON COLUMN "horarios"."asignaciones_docente_curso"."facultad_id" IS 'Sin uso: la facultad se deduce de la carrera del pensum. La restricción la obliga a ser nula.';


--
-- Name: aulas; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."aulas" (
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
);


--
-- Name: cambios_detectados; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."cambios_detectados" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "version_horario_id" "uuid",
    "sesion_id" "uuid" NOT NULL,
    "campo_modificado" character varying(100) NOT NULL,
    "valor_anterior" "text",
    "valor_nuevo" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: carrera_jornadas; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."carrera_jornadas" (
    "carrera_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL
);


--
-- Name: configuracion_motor_restricciones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."configuracion_motor_restricciones" (
    "configuracion_id" "uuid" NOT NULL,
    "restriccion_id" "uuid" NOT NULL,
    "peso" numeric(12,4) NOT NULL,
    CONSTRAINT "configuracion_motor_restricciones_peso_check" CHECK (("peso" >= (0)::numeric))
);


--
-- Name: configuraciones_motor; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."configuraciones_motor" (
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
);


--
-- Name: conflicto_sesiones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."conflicto_sesiones" (
    "conflicto_id" "uuid" NOT NULL,
    "sesion_id" "uuid" NOT NULL
);


--
-- Name: conflictos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."conflictos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "tipo" character varying(100) NOT NULL,
    "descripcion" "text" NOT NULL,
    "severidad" "horarios"."nivel_severidad" NOT NULL,
    "es_restriccion_dura" boolean NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: curso_comun; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."curso_comun" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(150) NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone,
    "version_fila" bigint DEFAULT 0 NOT NULL,
    CONSTRAINT "curso_comun_nombre_check" CHECK (("length"(TRIM(BOTH FROM "nombre")) > 0))
);


--
-- Name: TABLE "curso_comun"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON TABLE "horarios"."curso_comun" IS 'Grupo de cursos de distintos pensums que son el mismo curso. De aquí salen las agrupaciones de área común de cada período.';


--
-- Name: curso_comun_cursos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."curso_comun_cursos" (
    "curso_comun_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL
);


--
-- Name: curso_recursos_requeridos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."curso_recursos_requeridos" (
    "curso_id" "uuid" NOT NULL,
    "recurso_id" "uuid" NOT NULL,
    "cantidad" integer DEFAULT 1 NOT NULL,
    CONSTRAINT "curso_recursos_requeridos_cantidad_check" CHECK (("cantidad" > 0))
);


--
-- Name: disponibilidad_docente_slots; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."disponibilidad_docente_slots" (
    "disponibilidad_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot" integer NOT NULL,
    "esta_disponible" boolean DEFAULT true NOT NULL,
    CONSTRAINT "disponibilidad_docente_slots_indice_slot_check" CHECK (("indice_slot" > 0))
);


--
-- Name: disponibilidades_docente; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."disponibilidades_docente" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "docente_id" "uuid" NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "fecha_registro" timestamp with time zone DEFAULT "now"() NOT NULL,
    "esta_confirmada" boolean DEFAULT false NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: docente_facultades; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."docente_facultades" (
    "docente_id" "uuid" NOT NULL,
    "facultad_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: TABLE "docente_facultades"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON TABLE "horarios"."docente_facultades" IS 'Facultades a las que pertenece un docente. Cero filas = sin facultad específica.';


--
-- Name: docentes; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."docentes" (
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
);


--
-- Name: eventos_sustitucion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."eventos_sustitucion" (
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
);


--
-- Name: facultades; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."facultades" (
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
);


--
-- Name: generaciones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."generaciones" (
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
);


--
-- Name: historial_estados_horario; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."historial_estados_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "estado_anterior" "horarios"."estado_horario",
    "estado_nuevo" "horarios"."estado_horario" NOT NULL,
    "cambiado_por_id" "uuid",
    "motivo" "text" NOT NULL,
    "cambiado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "historial_estados_horario_check" CHECK ((("estado_anterior" IS NULL) OR ("estado_anterior" <> "estado_nuevo"))),
    CONSTRAINT "historial_estados_horario_motivo_check" CHECK (("length"(TRIM(BOTH FROM "motivo")) > 0))
);


--
-- Name: horarios; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."horarios" (
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
);


--
-- Name: importacion_errores; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."importacion_errores" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "importacion_id" "uuid" NOT NULL,
    "hoja" character varying(120),
    "fila" integer,
    "columna" character varying(120),
    "codigo_error" character varying(80) NOT NULL,
    "mensaje" "text" NOT NULL,
    "valor_recibido" "text",
    CONSTRAINT "importacion_errores_fila_check" CHECK ((("fila" IS NULL) OR ("fila" > 0)))
);


--
-- Name: jornada_descansos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."jornada_descansos" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "dia" "horarios"."dia_semana" NOT NULL,
    "indice_slot_inicio" integer NOT NULL,
    "duracion_slots" integer NOT NULL,
    "rango_slots" "int4range" GENERATED ALWAYS AS ("int4range"("indice_slot_inicio", ("indice_slot_inicio" + "duracion_slots"), '[)'::"text")) STORED,
    CONSTRAINT "jornada_descansos_duracion_slots_check" CHECK (("duracion_slots" > 0)),
    CONSTRAINT "jornada_descansos_indice_slot_inicio_check" CHECK (("indice_slot_inicio" > 0))
);


--
-- Name: jornadas; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."jornadas" (
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
    CONSTRAINT "jornadas_bloques_por_dia_check" CHECK (("bloques_por_dia" > 0)),
    CONSTRAINT "jornadas_check" CHECK (("hora_fin" > "hora_inicio")),
    CONSTRAINT "jornadas_check1" CHECK ((((("bloques_por_dia" * "duracion_bloque_minutos") + "duracion_receso_minutos"))::numeric <= (EXTRACT(epoch FROM ("hora_fin" - "hora_inicio")) / (60)::numeric))),
    CONSTRAINT "jornadas_dias_activos_check" CHECK (("cardinality"("dias_activos") > 0)),
    CONSTRAINT "jornadas_duracion_bloque_minutos_check" CHECK (("duracion_bloque_minutos" > 0)),
    CONSTRAINT "jornadas_receso_check" CHECK (((("duracion_receso_minutos" = 0) AND ("receso_despues_bloque" = 0)) OR (("duracion_receso_minutos" > 0) AND ("receso_despues_bloque" > 0) AND ("receso_despues_bloque" < "bloques_por_dia"))))
);


--
-- Name: mensajes_generacion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."mensajes_generacion" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "generacion_id" "uuid" NOT NULL,
    "severidad" "horarios"."nivel_severidad" DEFAULT 'media'::"horarios"."nivel_severidad" NOT NULL,
    "codigo" character varying(80),
    "mensaje" "text" NOT NULL,
    "entidad" character varying(120),
    "entidad_id" "uuid",
    "datos" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: notificaciones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."notificaciones" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "destinatario_id" "uuid" NOT NULL,
    "plantilla_id" "uuid",
    "tipo_notificacion" character varying(100) NOT NULL,
    "asunto" "text" NOT NULL,
    "mensaje_cuerpo" "text" NOT NULL,
    "canal_envio" "horarios"."canal_notificacion" DEFAULT 'interno'::"horarios"."canal_notificacion" NOT NULL,
    "clave_solicitud" character varying(120),
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "fecha_lectura" timestamp with time zone,
    "estado" "horarios"."estado_notificacion" DEFAULT 'pendiente'::"horarios"."estado_notificacion" NOT NULL
);


--
-- Name: periodos_academicos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."periodos_academicos" (
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
);


--
-- Name: permisos_acceso; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."permisos_acceso" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "recurso" character varying(100) NOT NULL,
    "accion" "horarios"."accion_permiso" NOT NULL,
    "descripcion" "text"
);


--
-- Name: plan_carreras; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."plan_carreras" (
    "plan_id" "uuid" NOT NULL,
    "carrera_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: plan_jornadas; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."plan_jornadas" (
    "plan_id" "uuid" NOT NULL,
    "jornada_id" "uuid" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL
);


--
-- Name: plantillas_importacion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."plantillas_importacion" (
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
);


--
-- Name: plantillas_notificacion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."plantillas_notificacion" (
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
);


--
-- Name: reportes; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."reportes" (
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
);


--
-- Name: restricciones_horario; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."restricciones_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(120) NOT NULL,
    "descripcion" "text" NOT NULL,
    "peso" numeric(12,4) NOT NULL,
    "es_dura" boolean NOT NULL,
    "esta_activa" boolean DEFAULT true NOT NULL,
    CONSTRAINT "restricciones_horario_peso_check" CHECK (("peso" >= (0)::numeric))
);


--
-- Name: resultado_edicion_conflictos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."resultado_edicion_conflictos" (
    "resultado_edicion_id" "uuid" NOT NULL,
    "conflicto_id" "uuid" NOT NULL
);


--
-- Name: resultados_edicion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."resultados_edicion" (
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
);


--
-- Name: rol_permisos; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."rol_permisos" (
    "rol_id" "uuid" NOT NULL,
    "permiso_id" "uuid" NOT NULL
);


--
-- Name: roles; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."roles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nombre" character varying(100) NOT NULL,
    "descripcion" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "eliminado_en" timestamp with time zone
);


--
-- Name: sesion_cohortes; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."sesion_cohortes" (
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
);


--
-- Name: sesiones; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."sesiones" (
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
);


--
-- Name: sesiones_no_asignadas; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."sesiones_no_asignadas" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "curso_id" "uuid" NOT NULL,
    "cohorte_id" "uuid" NOT NULL,
    "motivo_no_asignacion" "text" NOT NULL,
    "recursos_faltantes" "jsonb" DEFAULT '[]'::"jsonb" NOT NULL,
    "sugerencia_resolucion" "text",
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "sesiones_no_asignadas_recursos_faltantes_check" CHECK (("jsonb_typeof"("recursos_faltantes") = 'array'::"text"))
);


--
-- Name: sugerencias_seccion; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."sugerencias_seccion" (
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
);


--
-- Name: usuario_facultades; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."usuario_facultades" (
    "usuario_id" "uuid" NOT NULL,
    "facultad_id" "uuid" NOT NULL
);


--
-- Name: usuario_roles; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."usuario_roles" (
    "usuario_id" "uuid" NOT NULL,
    "rol_id" "uuid" NOT NULL
);


--
-- Name: ventanas_disponibilidad; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."ventanas_disponibilidad" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "periodo_id" "uuid" NOT NULL,
    "fecha_apertura" timestamp with time zone NOT NULL,
    "fecha_cierre" timestamp with time zone NOT NULL,
    "estado" "horarios"."estado_ventana_disponibilidad" DEFAULT 'programada'::"horarios"."estado_ventana_disponibilidad" NOT NULL,
    "creado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    "actualizado_en" timestamp with time zone DEFAULT "now"() NOT NULL,
    CONSTRAINT "ventanas_disponibilidad_check" CHECK (("fecha_cierre" > "fecha_apertura"))
);


--
-- Name: versiones_horario; Type: TABLE; Schema: horarios; Owner: -
--

CREATE TABLE "horarios"."versiones_horario" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "horario_id" "uuid" NOT NULL,
    "numero_version" integer NOT NULL,
    "fecha_creacion" timestamp with time zone DEFAULT "now"() NOT NULL,
    "motivo_cambio" "text" NOT NULL,
    "creado_por_id" "uuid",
    "instantanea_sesiones" "jsonb" NOT NULL,
    CONSTRAINT "versiones_horario_instantanea_sesiones_check" CHECK (("jsonb_typeof"("instantanea_sesiones") = ANY (ARRAY['array'::"text", 'object'::"text"]))),
    CONSTRAINT "versiones_horario_numero_version_check" CHECK (("numero_version" > 0))
);


--
-- Name: vista_area_comun_cursos_derivados; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."vista_area_comun_cursos_derivados" WITH ("security_invoker"='true') AS
 SELECT "a"."id" AS "agrupacion_id",
    "ccc"."curso_id"
   FROM (("horarios"."agrupaciones_area_comun" "a"
     JOIN "horarios"."curso_comun_cursos" "ccc" ON (("ccc"."curso_comun_id" = "a"."curso_comun_id")))
     JOIN "horarios"."cursos" "cur" ON ((("cur"."id" = "ccc"."curso_id") AND ("cur"."eliminado_en" IS NULL))))
  WHERE ("a"."eliminado_en" IS NULL);


--
-- Name: VIEW "vista_area_comun_cursos_derivados"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON VIEW "horarios"."vista_area_comun_cursos_derivados" IS 'Los cursos de cada agrupacion, derivados de su curso_comun. Es la definicion de la membresia de cursos; agrupacion_area_comun_cursos es su materializacion.';


--
-- Name: vista_area_comun_cohortes_derivadas; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."vista_area_comun_cohortes_derivadas" WITH ("security_invoker"='true') AS
 SELECT DISTINCT "a"."id" AS "agrupacion_id",
    "co"."id" AS "cohorte_id"
   FROM ((((("horarios"."agrupaciones_area_comun" "a"
     JOIN "horarios"."vista_area_comun_cursos_derivados" "vc" ON (("vc"."agrupacion_id" = "a"."id")))
     JOIN "horarios"."cursos" "cur" ON (("cur"."id" = "vc"."curso_id")))
     JOIN "horarios"."cursos_en_pensum" "cep" ON ((("cep"."curso_id" = "cur"."id") AND ("cep"."eliminado_en" IS NULL))))
     JOIN "horarios"."cohortes" "co" ON ((("co"."pensum_id" = "cur"."pensum_id") AND ("co"."jornada_id" = "a"."jornada_id") AND ("co"."estado" = 'activa'::"horarios"."estado_cohorte") AND ("co"."eliminado_en" IS NULL))))
     JOIN "horarios"."cohorte_periodos" "cp" ON ((("cp"."cohorte_id" = "co"."id") AND ("cp"."periodo_id" = "a"."periodo_id") AND "cp"."esta_activa" AND ("cp"."eliminado_en" IS NULL) AND ("cp"."semestre_asignado" = "cep"."semestre_asignado"))))
  WHERE ("a"."eliminado_en" IS NULL);


--
-- Name: VIEW "vista_area_comun_cohortes_derivadas"; Type: COMMENT; Schema: horarios; Owner: -
--

COMMENT ON VIEW "horarios"."vista_area_comun_cohortes_derivadas" IS 'Las cohortes de cada agrupacion: las activas del periodo, en su jornada, que cursan alguno de sus cursos en el semestre que tienen asignado.';


--
-- Name: vista_horarios_publicados; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."vista_horarios_publicados" AS
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
  WHERE (("h"."estado" = 'publicado'::"horarios"."estado_horario") AND ("h"."eliminado_en" IS NULL));


--
-- Name: vista_sustituciones_activas; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."vista_sustituciones_activas" AS
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
  WHERE (("e"."estado" = 'activo'::"horarios"."estado_evento_sustitucion") AND ("e"."eliminado_en" IS NULL) AND ((("e"."tipo" = 'sustitucion_temporal'::"horarios"."tipo_evento_sustitucion") AND ((CURRENT_DATE >= "e"."fecha_inicio") AND (CURRENT_DATE <= "e"."fecha_fin"))) OR (("e"."tipo" = 'sustitucion_permanente'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_cambio" <= CURRENT_DATE)) OR (("e"."tipo" = 'permiso_ausencia'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_ausencia" = CURRENT_DATE)) OR (("e"."tipo" = 'cancelacion_sesion'::"horarios"."tipo_evento_sustitucion") AND ("e"."fecha_cancelada" = CURRENT_DATE))));


--
-- Name: vista_horarios_publicados_con_sustituciones; Type: VIEW; Schema: horarios; Owner: -
--

CREATE VIEW "horarios"."vista_horarios_publicados_con_sustituciones" AS
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
     LEFT JOIN "horarios"."vista_sustituciones_activas" "sa" ON (("sa"."sesion_afectada_id" = "v"."sesion_id")));


--
-- Name: agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_pkey" PRIMARY KEY ("agrupacion_id", "cohorte_id");


--
-- Name: agrupacion_area_comun_cursos agrupacion_area_comun_cursos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_pkey" PRIMARY KEY ("agrupacion_id", "curso_id");


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_pkey" PRIMARY KEY ("id");


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_pkey" PRIMARY KEY ("id");


--
-- Name: auditoria auditoria_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."auditoria"
    ADD CONSTRAINT "auditoria_pkey" PRIMARY KEY ("id");


--
-- Name: aula_recursos aula_recursos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_pkey" PRIMARY KEY ("aula_id", "recurso_id");


--
-- Name: aulas aulas_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."aulas"
    ADD CONSTRAINT "aulas_pkey" PRIMARY KEY ("id");


--
-- Name: cambios_detectados cambios_detectados_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_pkey" PRIMARY KEY ("id");


--
-- Name: carrera_jornadas carrera_jornadas_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_pkey" PRIMARY KEY ("carrera_id", "jornada_id");


--
-- Name: carreras carreras_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."carreras"
    ADD CONSTRAINT "carreras_pkey" PRIMARY KEY ("id");


--
-- Name: cohorte_periodos cohorte_periodos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_pkey" PRIMARY KEY ("id");


--
-- Name: cohortes cohortes_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pkey" PRIMARY KEY ("id");


--
-- Name: configuracion_motor_restricciones configuracion_motor_restricciones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_pkey" PRIMARY KEY ("configuracion_id", "restriccion_id");


--
-- Name: configuraciones_motor configuraciones_motor_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."configuraciones_motor"
    ADD CONSTRAINT "configuraciones_motor_pkey" PRIMARY KEY ("id");


--
-- Name: conflicto_sesiones conflicto_sesiones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_pkey" PRIMARY KEY ("conflicto_id", "sesion_id");


--
-- Name: conflictos conflictos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."conflictos"
    ADD CONSTRAINT "conflictos_pkey" PRIMARY KEY ("id");


--
-- Name: curso_comun_cursos curso_comun_cursos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_pkey" PRIMARY KEY ("curso_comun_id", "curso_id");


--
-- Name: curso_comun curso_comun_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_comun"
    ADD CONSTRAINT "curso_comun_pkey" PRIMARY KEY ("id");


--
-- Name: curso_recursos_requeridos curso_recursos_requeridos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_pkey" PRIMARY KEY ("curso_id", "recurso_id");


--
-- Name: cursos_en_pensum cursos_en_pensum_pensum_id_curso_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pensum_id_curso_id_key" UNIQUE ("pensum_id", "curso_id");


--
-- Name: cursos_en_pensum cursos_en_pensum_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pkey" PRIMARY KEY ("id");


--
-- Name: cursos cursos_id_pensum_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_id_pensum_id_key" UNIQUE ("id", "pensum_id");


--
-- Name: cursos cursos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_pkey" PRIMARY KEY ("id");


--
-- Name: disponibilidad_docente_slots disponibilidad_docente_slots_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_pkey" PRIMARY KEY ("disponibilidad_id", "jornada_id", "dia", "indice_slot");


--
-- Name: disponibilidades_docente disponibilidades_docente_docente_id_periodo_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_docente_id_periodo_id_key" UNIQUE ("docente_id", "periodo_id");


--
-- Name: disponibilidades_docente disponibilidades_docente_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_pkey" PRIMARY KEY ("id");


--
-- Name: docente_facultades docente_facultades_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_pkey" PRIMARY KEY ("docente_id", "facultad_id");


--
-- Name: docentes docentes_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."docentes"
    ADD CONSTRAINT "docentes_pkey" PRIMARY KEY ("id");


--
-- Name: eventos_sustitucion eventos_sustitucion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_pkey" PRIMARY KEY ("id");


--
-- Name: facultades facultades_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."facultades"
    ADD CONSTRAINT "facultades_pkey" PRIMARY KEY ("id");


--
-- Name: generaciones generaciones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_pkey" PRIMARY KEY ("id");


--
-- Name: historial_estados_horario historial_estados_horario_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_pkey" PRIMARY KEY ("id");


--
-- Name: horarios horarios_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_pkey" PRIMARY KEY ("id");


--
-- Name: importacion_errores importacion_errores_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."importacion_errores"
    ADD CONSTRAINT "importacion_errores_pkey" PRIMARY KEY ("id");


--
-- Name: importaciones importaciones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_pkey" PRIMARY KEY ("id");


--
-- Name: jornada_descansos jornada_descansos_no_solapados; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_no_solapados" EXCLUDE USING "gist" ("jornada_id" WITH =, "dia" WITH =, "rango_slots" WITH &&);


--
-- Name: jornada_descansos jornada_descansos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_pkey" PRIMARY KEY ("id");


--
-- Name: jornadas jornadas_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."jornadas"
    ADD CONSTRAINT "jornadas_pkey" PRIMARY KEY ("id");


--
-- Name: mensajes_generacion mensajes_generacion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."mensajes_generacion"
    ADD CONSTRAINT "mensajes_generacion_pkey" PRIMARY KEY ("id");


--
-- Name: notificaciones notificaciones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_pkey" PRIMARY KEY ("id");


--
-- Name: pensums pensums_id_carrera_uq; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_id_carrera_uq" UNIQUE ("id", "carrera_id");


--
-- Name: pensums pensums_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_pkey" PRIMARY KEY ("id");


--
-- Name: periodos_academicos periodos_academicos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."periodos_academicos"
    ADD CONSTRAINT "periodos_academicos_pkey" PRIMARY KEY ("id");


--
-- Name: permisos_acceso permisos_acceso_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."permisos_acceso"
    ADD CONSTRAINT "permisos_acceso_pkey" PRIMARY KEY ("id");


--
-- Name: permisos_acceso permisos_acceso_recurso_accion_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."permisos_acceso"
    ADD CONSTRAINT "permisos_acceso_recurso_accion_key" UNIQUE ("recurso", "accion");


--
-- Name: plan_carreras plan_carreras_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_pkey" PRIMARY KEY ("plan_id", "carrera_id");


--
-- Name: plan_jornadas plan_jornadas_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_pkey" PRIMARY KEY ("plan_id", "jornada_id");


--
-- Name: plantillas_importacion plantillas_importacion_codigo_version_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plantillas_importacion"
    ADD CONSTRAINT "plantillas_importacion_codigo_version_key" UNIQUE ("codigo", "version");


--
-- Name: plantillas_importacion plantillas_importacion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plantillas_importacion"
    ADD CONSTRAINT "plantillas_importacion_pkey" PRIMARY KEY ("id");


--
-- Name: plantillas_notificacion plantillas_notificacion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plantillas_notificacion"
    ADD CONSTRAINT "plantillas_notificacion_pkey" PRIMARY KEY ("id");


--
-- Name: recursos recursos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."recursos"
    ADD CONSTRAINT "recursos_pkey" PRIMARY KEY ("id");


--
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_pkey" PRIMARY KEY ("id");


--
-- Name: restricciones_horario restricciones_horario_nombre_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."restricciones_horario"
    ADD CONSTRAINT "restricciones_horario_nombre_key" UNIQUE ("nombre");


--
-- Name: restricciones_horario restricciones_horario_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."restricciones_horario"
    ADD CONSTRAINT "restricciones_horario_pkey" PRIMARY KEY ("id");


--
-- Name: resultado_edicion_conflictos resultado_edicion_conflictos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_pkey" PRIMARY KEY ("resultado_edicion_id", "conflicto_id");


--
-- Name: resultados_edicion resultados_edicion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_pkey" PRIMARY KEY ("id");


--
-- Name: rol_permisos rol_permisos_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_pkey" PRIMARY KEY ("rol_id", "permiso_id");


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."roles"
    ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");


--
-- Name: sesion_cohortes sesion_cohortes_no_solapadas; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_no_solapadas" EXCLUDE USING "gist" ("horario_id" WITH =, "cohorte_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&);


--
-- Name: sesion_cohortes sesion_cohortes_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_pkey" PRIMARY KEY ("sesion_id", "cohorte_id");


--
-- Name: sesiones sesiones_aula_no_solapada; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_aula_no_solapada" EXCLUDE USING "gist" ("horario_id" WITH =, "aula_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&);


--
-- Name: sesiones sesiones_docente_no_solapado; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_docente_no_solapado" EXCLUDE USING "gist" ("horario_id" WITH =, "docente_id" WITH =, COALESCE("fecha_sesion", '0001-01-01'::"date") WITH =, "dia" WITH =, "rango_minutos" WITH &&);


--
-- Name: sesiones sesiones_id_horario_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_id_horario_id_key" UNIQUE ("id", "horario_id");


--
-- Name: sesiones_no_asignadas sesiones_no_asignadas_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_pkey" PRIMARY KEY ("id");


--
-- Name: sesiones sesiones_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_pkey" PRIMARY KEY ("id");


--
-- Name: sugerencias_seccion sugerencias_seccion_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_pkey" PRIMARY KEY ("id");


--
-- Name: usuario_facultades usuario_facultades_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_pkey" PRIMARY KEY ("usuario_id", "facultad_id");


--
-- Name: usuario_roles usuario_roles_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_pkey" PRIMARY KEY ("usuario_id", "rol_id");


--
-- Name: usuarios usuarios_auth_user_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_auth_user_id_key" UNIQUE ("auth_user_id");


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id");


--
-- Name: ventanas_disponibilidad ventanas_disponibilidad_periodo_id_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_periodo_id_key" UNIQUE ("periodo_id");


--
-- Name: ventanas_disponibilidad ventanas_disponibilidad_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_pkey" PRIMARY KEY ("id");


--
-- Name: versiones_horario versiones_horario_horario_id_numero_version_key; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_horario_id_numero_version_key" UNIQUE ("horario_id", "numero_version");


--
-- Name: versiones_horario versiones_horario_pkey; Type: CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_pkey" PRIMARY KEY ("id");


--
-- Name: agrupaciones_area_comun_identidad_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "agrupaciones_area_comun_identidad_uq" ON "horarios"."agrupaciones_area_comun" USING "btree" ("periodo_id", "curso_comun_id", "jornada_id") WHERE ("eliminado_en" IS NULL);


--
-- Name: agrupaciones_area_comun_nombre_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "agrupaciones_area_comun_nombre_uq" ON "horarios"."agrupaciones_area_comun" USING "btree" ("periodo_id", "lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);


--
-- Name: asignaciones_docente_curso_vigente_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "asignaciones_docente_curso_vigente_uq" ON "horarios"."asignaciones_docente_curso" USING "btree" ("docente_id", "curso_id", COALESCE("carrera_id", '00000000-0000-0000-0000-000000000000'::"uuid"), COALESCE("facultad_id", '00000000-0000-0000-0000-000000000000'::"uuid"), COALESCE("jornada_id", '00000000-0000-0000-0000-000000000000'::"uuid")) WHERE ("esta_vigente" AND ("eliminado_en" IS NULL));


--
-- Name: auditoria_entidad_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "auditoria_entidad_idx" ON "horarios"."auditoria" USING "btree" ("entidad", "entidad_id", "fecha" DESC);


--
-- Name: auditoria_usuario_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "auditoria_usuario_idx" ON "horarios"."auditoria" USING "btree" ("usuario_id", "fecha" DESC);


--
-- Name: aulas_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "aulas_codigo_uq" ON "horarios"."aulas" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: aulas_piso_numero_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "aulas_piso_numero_uq" ON "horarios"."aulas" USING "btree" ("piso", "numero_aula") WHERE ("eliminado_en" IS NULL);


--
-- Name: carreras_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "carreras_codigo_uq" ON "horarios"."carreras" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: carreras_facultad_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "carreras_facultad_idx" ON "horarios"."carreras" USING "btree" ("facultad_id");


--
-- Name: cohorte_periodos_cohorte_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "cohorte_periodos_cohorte_idx" ON "horarios"."cohorte_periodos" USING "btree" ("cohorte_id", "periodo_id");


--
-- Name: cohorte_periodos_periodo_activo_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "cohorte_periodos_periodo_activo_idx" ON "horarios"."cohorte_periodos" USING "btree" ("periodo_id", "semestre_asignado") WHERE ("esta_activa" AND ("eliminado_en" IS NULL));


--
-- Name: cohorte_periodos_periodo_cohorte_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "cohorte_periodos_periodo_cohorte_uq" ON "horarios"."cohorte_periodos" USING "btree" ("periodo_id", "cohorte_id") WHERE ("eliminado_en" IS NULL);


--
-- Name: cohortes_identidad_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "cohortes_identidad_uq" ON "horarios"."cohortes" USING "btree" ("carrera_id", "jornada_id", "anio_ingreso", "lower"(("seccion")::"text")) WHERE ("eliminado_en" IS NULL);


--
-- Name: configuraciones_motor_nombre_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "configuraciones_motor_nombre_uq" ON "horarios"."configuraciones_motor" USING "btree" ("lower"(("nombre")::"text"));


--
-- Name: curso_comun_cursos_curso_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "curso_comun_cursos_curso_uq" ON "horarios"."curso_comun_cursos" USING "btree" ("curso_id");


--
-- Name: curso_comun_cursos_grupo_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "curso_comun_cursos_grupo_idx" ON "horarios"."curso_comun_cursos" USING "btree" ("curso_comun_id");


--
-- Name: cursos_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "cursos_codigo_uq" ON "horarios"."cursos" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: cursos_en_pensum_curso_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "cursos_en_pensum_curso_idx" ON "horarios"."cursos_en_pensum" USING "btree" ("curso_id");


--
-- Name: cursos_en_pensum_curso_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "cursos_en_pensum_curso_uq" ON "horarios"."cursos_en_pensum" USING "btree" ("curso_id") WHERE ("eliminado_en" IS NULL);


--
-- Name: cursos_pensum_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "cursos_pensum_idx" ON "horarios"."cursos" USING "btree" ("pensum_id");


--
-- Name: disponibilidad_docente_slots_busqueda_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "disponibilidad_docente_slots_busqueda_idx" ON "horarios"."disponibilidad_docente_slots" USING "btree" ("jornada_id", "dia", "indice_slot", "esta_disponible");


--
-- Name: docente_facultades_facultad_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "docente_facultades_facultad_idx" ON "horarios"."docente_facultades" USING "btree" ("facultad_id");


--
-- Name: docentes_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "docentes_codigo_uq" ON "horarios"."docentes" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: docentes_correo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "docentes_correo_uq" ON "horarios"."docentes" USING "btree" ("correo") WHERE ("eliminado_en" IS NULL);


--
-- Name: facultades_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "facultades_codigo_uq" ON "horarios"."facultades" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: generaciones_activas_periodo_tipo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "generaciones_activas_periodo_tipo_uq" ON "horarios"."generaciones" USING "btree" ("periodo_id", "tipo_plan") WHERE ("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_generacion", 'generando'::"horarios"."estado_generacion"]));


--
-- Name: generaciones_clave_solicitud_periodo_tipo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "generaciones_clave_solicitud_periodo_tipo_uq" ON "horarios"."generaciones" USING "btree" ("periodo_id", "tipo_plan", "clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);


--
-- Name: generaciones_clave_solicitud_plan_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "generaciones_clave_solicitud_plan_uq" ON "horarios"."generaciones" USING "btree" ("plan_id", "clave_solicitud") WHERE (("plan_id" IS NOT NULL) AND ("clave_solicitud" IS NOT NULL));


--
-- Name: generaciones_estado_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "generaciones_estado_idx" ON "horarios"."generaciones" USING "btree" ("estado", "iniciada_en" DESC);


--
-- Name: generaciones_plan_activa_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "generaciones_plan_activa_uq" ON "horarios"."generaciones" USING "btree" ("plan_id") WHERE (("plan_id" IS NOT NULL) AND ("estado" = ANY (ARRAY['pendiente'::"horarios"."estado_generacion", 'generando'::"horarios"."estado_generacion"])));


--
-- Name: generaciones_plan_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "generaciones_plan_idx" ON "horarios"."generaciones" USING "btree" ("plan_id", "iniciada_en" DESC);


--
-- Name: historial_estados_horario_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "historial_estados_horario_idx" ON "horarios"."historial_estados_horario" USING "btree" ("horario_id", "cambiado_en" DESC);


--
-- Name: horarios_periodo_tipo_version_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "horarios_periodo_tipo_version_uq" ON "horarios"."horarios" USING "btree" ("periodo_id", "tipo_plan", "numero_version") WHERE ("eliminado_en" IS NULL);


--
-- Name: horarios_publicado_unico_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "horarios_publicado_unico_idx" ON "horarios"."horarios" USING "btree" ("periodo_id", "tipo_plan") WHERE (("estado" = 'publicado'::"horarios"."estado_horario") AND ("eliminado_en" IS NULL));


--
-- Name: importaciones_clave_solicitud_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "importaciones_clave_solicitud_uq" ON "horarios"."importaciones" USING "btree" ("clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);


--
-- Name: jornadas_nombre_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "jornadas_nombre_uq" ON "horarios"."jornadas" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);


--
-- Name: mensajes_generacion_generacion_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "mensajes_generacion_generacion_idx" ON "horarios"."mensajes_generacion" USING "btree" ("generacion_id", "severidad", "creado_en");


--
-- Name: notificaciones_clave_solicitud_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "notificaciones_clave_solicitud_uq" ON "horarios"."notificaciones" USING "btree" ("destinatario_id", "clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);


--
-- Name: notificaciones_destinatario_estado_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "notificaciones_destinatario_estado_idx" ON "horarios"."notificaciones" USING "btree" ("destinatario_id", "estado", "fecha_creacion" DESC);


--
-- Name: pensums_carrera_anio_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "pensums_carrera_anio_uq" ON "horarios"."pensums" USING "btree" ("carrera_id", "anio_creacion") WHERE ("eliminado_en" IS NULL);


--
-- Name: periodos_nombre_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "periodos_nombre_uq" ON "horarios"."periodos_academicos" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);


--
-- Name: plan_carreras_carrera_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "plan_carreras_carrera_idx" ON "horarios"."plan_carreras" USING "btree" ("carrera_id");


--
-- Name: plan_jornadas_jornada_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "plan_jornadas_jornada_idx" ON "horarios"."plan_jornadas" USING "btree" ("jornada_id");


--
-- Name: plantillas_importacion_vigente_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "plantillas_importacion_vigente_uq" ON "horarios"."plantillas_importacion" USING "btree" ("codigo") WHERE "esta_vigente";


--
-- Name: plantillas_notificacion_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "plantillas_notificacion_codigo_uq" ON "horarios"."plantillas_notificacion" USING "btree" ("codigo_plantilla");


--
-- Name: recursos_codigo_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "recursos_codigo_uq" ON "horarios"."recursos" USING "btree" ("codigo") WHERE ("eliminado_en" IS NULL);


--
-- Name: reportes_horario_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "reportes_horario_idx" ON "horarios"."reportes" USING "btree" ("horario_id", "fecha_generacion" DESC);


--
-- Name: resultados_edicion_clave_solicitud_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "resultados_edicion_clave_solicitud_uq" ON "horarios"."resultados_edicion" USING "btree" ("horario_id", "clave_solicitud") WHERE ("clave_solicitud" IS NOT NULL);


--
-- Name: resultados_edicion_origen_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "resultados_edicion_origen_idx" ON "horarios"."resultados_edicion" USING "btree" ("horario_origen_id", "creado_en" DESC);


--
-- Name: roles_nombre_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "roles_nombre_uq" ON "horarios"."roles" USING "btree" ("lower"(("nombre")::"text")) WHERE ("eliminado_en" IS NULL);


--
-- Name: sesion_cohortes_cohorte_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sesion_cohortes_cohorte_idx" ON "horarios"."sesion_cohortes" USING "btree" ("cohorte_id", "horario_id", "fecha_sesion", "dia", "minuto_inicio_dia");


--
-- Name: sesion_cohortes_curso_visible_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sesion_cohortes_curso_visible_idx" ON "horarios"."sesion_cohortes" USING "btree" ("curso_visible_id", "horario_id");


--
-- Name: sesiones_horario_aula_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sesiones_horario_aula_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "aula_id", "fecha_sesion", "dia", "minuto_inicio_dia");


--
-- Name: sesiones_horario_docente_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sesiones_horario_docente_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "docente_id", "fecha_sesion", "dia", "minuto_inicio_dia");


--
-- Name: sesiones_horario_jornada_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sesiones_horario_jornada_idx" ON "horarios"."sesiones" USING "btree" ("horario_id", "jornada_id", "fecha_sesion", "dia", "minuto_inicio_dia");


--
-- Name: sugerencias_seccion_estado_idx; Type: INDEX; Schema: horarios; Owner: -
--

CREATE INDEX "sugerencias_seccion_estado_idx" ON "horarios"."sugerencias_seccion" USING "btree" ("estado", "creado_en" DESC) WHERE ("eliminado_en" IS NULL);


--
-- Name: usuarios_correo_institucional_uq; Type: INDEX; Schema: horarios; Owner: -
--

CREATE UNIQUE INDEX "usuarios_correo_institucional_uq" ON "horarios"."usuarios" USING "btree" ("correo_institucional") WHERE ("eliminado_en" IS NULL);


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "agrupaciones_area_comun_actualizar_trg" BEFORE UPDATE ON "horarios"."agrupaciones_area_comun" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "asignaciones_docente_curso_actualizar_trg" BEFORE UPDATE ON "horarios"."asignaciones_docente_curso" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: aulas aulas_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "aulas_actualizar_trg" BEFORE UPDATE ON "horarios"."aulas" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: carreras carreras_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "carreras_actualizar_trg" BEFORE UPDATE ON "horarios"."carreras" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: cohorte_periodos cohorte_periodos_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "cohorte_periodos_actualizar_trg" BEFORE UPDATE ON "horarios"."cohorte_periodos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: cohorte_periodos cohorte_periodos_validar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "cohorte_periodos_validar_trg" BEFORE INSERT OR UPDATE OF "cohorte_id", "semestre_asignado", "esta_activa" ON "horarios"."cohorte_periodos" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_cohorte_periodo"();


--
-- Name: cohortes cohortes_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "cohortes_actualizar_trg" BEFORE UPDATE ON "horarios"."cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: configuraciones_motor configuraciones_motor_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "configuraciones_motor_actualizar_trg" BEFORE UPDATE ON "horarios"."configuraciones_motor" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: curso_comun curso_comun_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "curso_comun_actualizar_trg" BEFORE UPDATE ON "horarios"."curso_comun" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: curso_comun curso_comun_limpiar_miembros_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "curso_comun_limpiar_miembros_trg" AFTER UPDATE ON "horarios"."curso_comun" FOR EACH ROW WHEN ((("old"."eliminado_en" IS NULL) AND ("new"."eliminado_en" IS NOT NULL))) EXECUTE FUNCTION "horarios"."limpiar_miembros_curso_comun"();


--
-- Name: cursos cursos_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "cursos_actualizar_trg" BEFORE UPDATE ON "horarios"."cursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: cursos_en_pensum cursos_en_pensum_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "cursos_en_pensum_actualizar_trg" BEFORE UPDATE ON "horarios"."cursos_en_pensum" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: disponibilidad_docente_slots disponibilidad_docente_slots_validar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "disponibilidad_docente_slots_validar_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "dia", "indice_slot" ON "horarios"."disponibilidad_docente_slots" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_disponibilidad_slot"();


--
-- Name: disponibilidades_docente disponibilidades_docente_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "disponibilidades_docente_actualizar_trg" BEFORE UPDATE ON "horarios"."disponibilidades_docente" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: docentes docentes_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "docentes_actualizar_trg" BEFORE UPDATE ON "horarios"."docentes" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: eventos_sustitucion eventos_sustitucion_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "eventos_sustitucion_actualizar_trg" BEFORE UPDATE ON "horarios"."eventos_sustitucion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: eventos_sustitucion eventos_sustitucion_validar_docente_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "eventos_sustitucion_validar_docente_trg" BEFORE INSERT OR UPDATE OF "tipo", "sesion_afectada_id", "docente_original_id", "docente_entrante_id", "fecha_inicio", "fecha_fin", "fecha_cambio", "fecha_ausencia", "fecha_recuperacion", "fecha_cancelada" ON "horarios"."eventos_sustitucion" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_sustitucion_docente_original"();


--
-- Name: facultades facultades_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "facultades_actualizar_trg" BEFORE UPDATE ON "horarios"."facultades" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: horarios horarios_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "horarios_actualizar_trg" BEFORE UPDATE ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: horarios horarios_bloquear_delete_oficial_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "horarios_bloquear_delete_oficial_trg" BEFORE DELETE ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_eliminacion_horario_oficial"();


--
-- Name: horarios horarios_validar_publicacion_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "horarios_validar_publicacion_trg" BEFORE INSERT OR UPDATE OF "periodo_id", "tipo_plan", "estado", "cantidad_violaciones_duras", "fecha_aprobacion", "fecha_publicacion", "aprobado_por_id", "publicado_por_id", "eliminado_en" ON "horarios"."horarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_horario_publicable"();


--
-- Name: importaciones importaciones_validar_plantilla_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "importaciones_validar_plantilla_trg" BEFORE INSERT OR UPDATE OF "tipo_archivo", "plantilla_id", "plantilla_version", "estado", "finalizada_en" ON "horarios"."importaciones" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_importacion_plantilla"();


--
-- Name: jornada_descansos jornada_descansos_validar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "jornada_descansos_validar_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "dia", "indice_slot_inicio", "duracion_slots" ON "horarios"."jornada_descansos" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_descanso_en_jornada"();


--
-- Name: jornadas jornadas_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "jornadas_actualizar_trg" BEFORE UPDATE ON "horarios"."jornadas" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: pensums pensums_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "pensums_actualizar_trg" BEFORE UPDATE ON "horarios"."pensums" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: periodos_academicos periodos_academicos_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "periodos_academicos_actualizar_trg" BEFORE UPDATE ON "horarios"."periodos_academicos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: plantillas_importacion plantillas_importacion_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "plantillas_importacion_actualizar_trg" BEFORE UPDATE ON "horarios"."plantillas_importacion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: plantillas_notificacion plantillas_notificacion_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "plantillas_notificacion_actualizar_trg" BEFORE UPDATE ON "horarios"."plantillas_notificacion" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: recursos recursos_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "recursos_actualizar_trg" BEFORE UPDATE ON "horarios"."recursos" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: roles roles_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "roles_actualizar_trg" BEFORE UPDATE ON "horarios"."roles" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: sesion_cohortes sesion_cohortes_completar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "sesion_cohortes_completar_trg" BEFORE INSERT OR UPDATE OF "sesion_id", "cohorte_id", "horario_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "minuto_inicio_dia", "minuto_fin_dia" ON "horarios"."sesion_cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."completar_sesion_cohorte"();


--
-- Name: sesiones sesiones_propagar_cohortes_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "sesiones_propagar_cohortes_trg" AFTER UPDATE OF "horario_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."propagar_cambio_sesion_a_cohortes"();


--
-- Name: sesiones sesiones_revalidar_cohortes_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "sesiones_revalidar_cohortes_trg" AFTER UPDATE OF "horario_id", "curso_id", "docente_id", "aula_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "es_area_comun", "agrupacion_area_comun_id" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."revalidar_cohortes_de_sesion"();


--
-- Name: sesiones sesiones_validar_jornada_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "sesiones_validar_jornada_trg" BEFORE INSERT OR UPDATE OF "horario_id", "curso_id", "docente_id", "aula_id", "jornada_id", "fecha_sesion", "dia", "indice_slot_inicio", "duracion_slots", "es_area_comun", "agrupacion_area_comun_id" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."validar_sesion_en_jornada"();


--
-- Name: usuarios usuarios_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "usuarios_actualizar_trg" BEFORE UPDATE ON "horarios"."usuarios" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca_con_version"();


--
-- Name: ventanas_disponibilidad ventanas_disponibilidad_actualizar_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "ventanas_disponibilidad_actualizar_trg" BEFORE UPDATE ON "horarios"."ventanas_disponibilidad" FOR EACH ROW EXECUTE FUNCTION "horarios"."actualizar_marca"();


--
-- Name: conflictos z_bloquear_horario_publicado_conflictos_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_conflictos_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."conflictos" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: generaciones z_bloquear_horario_publicado_generaciones_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_generaciones_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."generaciones" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_generacion_publicada"();


--
-- Name: resultados_edicion z_bloquear_horario_publicado_resultados_edicion_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_resultados_edicion_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."resultados_edicion" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: sesion_cohortes z_bloquear_horario_publicado_sesion_cohortes_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_sesion_cohortes_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesion_cohortes" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: sesiones_no_asignadas z_bloquear_horario_publicado_sesiones_no_asignadas_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_sesiones_no_asignadas_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesiones_no_asignadas" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: sesiones z_bloquear_horario_publicado_sesiones_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_sesiones_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: sugerencias_seccion z_bloquear_horario_publicado_sugerencias_seccion_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "z_bloquear_horario_publicado_sugerencias_seccion_trg" BEFORE INSERT OR DELETE OR UPDATE ON "horarios"."sugerencias_seccion" FOR EACH ROW EXECUTE FUNCTION "horarios"."bloquear_horario_publicado"();


--
-- Name: sesiones zz_sesiones_aplicar_receso_trg; Type: TRIGGER; Schema: horarios; Owner: -
--

CREATE TRIGGER "zz_sesiones_aplicar_receso_trg" BEFORE INSERT OR UPDATE OF "jornada_id", "indice_slot_inicio", "duracion_slots" ON "horarios"."sesiones" FOR EACH ROW EXECUTE FUNCTION "horarios"."aplicar_receso_a_sesion"();


--
-- Name: agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_agrupacion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_agrupacion_id_fkey" FOREIGN KEY ("agrupacion_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE CASCADE;


--
-- Name: agrupacion_area_comun_cohortes agrupacion_area_comun_cohortes_cohorte_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cohortes"
    ADD CONSTRAINT "agrupacion_area_comun_cohortes_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;


--
-- Name: agrupacion_area_comun_cursos agrupacion_area_comun_cursos_agrupacion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_agrupacion_id_fkey" FOREIGN KEY ("agrupacion_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE CASCADE;


--
-- Name: agrupacion_area_comun_cursos agrupacion_area_comun_cursos_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupacion_area_comun_cursos"
    ADD CONSTRAINT "agrupacion_area_comun_cursos_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_creada_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_creada_por_id_fkey" FOREIGN KEY ("creada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_curso_comun_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_curso_comun_id_fkey" FOREIGN KEY ("curso_comun_id") REFERENCES "horarios"."curso_comun"("id") ON DELETE RESTRICT;


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_curso_principal_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_curso_principal_id_fkey" FOREIGN KEY ("curso_principal_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: agrupaciones_area_comun agrupaciones_area_comun_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."agrupaciones_area_comun"
    ADD CONSTRAINT "agrupaciones_area_comun_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_docente_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_facultad_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;


--
-- Name: asignaciones_docente_curso asignaciones_docente_curso_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."asignaciones_docente_curso"
    ADD CONSTRAINT "asignaciones_docente_curso_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: auditoria auditoria_usuario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."auditoria"
    ADD CONSTRAINT "auditoria_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: aula_recursos aula_recursos_aula_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "horarios"."aulas"("id") ON DELETE CASCADE;


--
-- Name: aula_recursos aula_recursos_recurso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."aula_recursos"
    ADD CONSTRAINT "aula_recursos_recurso_id_fkey" FOREIGN KEY ("recurso_id") REFERENCES "horarios"."recursos"("id") ON DELETE RESTRICT;


--
-- Name: cambios_detectados cambios_detectados_sesion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;


--
-- Name: cambios_detectados cambios_detectados_version_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cambios_detectados"
    ADD CONSTRAINT "cambios_detectados_version_horario_id_fkey" FOREIGN KEY ("version_horario_id") REFERENCES "horarios"."versiones_horario"("id") ON DELETE CASCADE;


--
-- Name: carrera_jornadas carrera_jornadas_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE CASCADE;


--
-- Name: carrera_jornadas carrera_jornadas_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."carrera_jornadas"
    ADD CONSTRAINT "carrera_jornadas_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: carreras carreras_facultad_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."carreras"
    ADD CONSTRAINT "carreras_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;


--
-- Name: cohorte_periodos cohorte_periodos_cohorte_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;


--
-- Name: cohorte_periodos cohorte_periodos_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohorte_periodos"
    ADD CONSTRAINT "cohorte_periodos_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;


--
-- Name: cohortes cohortes_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;


--
-- Name: cohortes cohortes_carrera_id_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_carrera_id_jornada_id_fkey" FOREIGN KEY ("carrera_id", "jornada_id") REFERENCES "horarios"."carrera_jornadas"("carrera_id", "jornada_id");


--
-- Name: cohortes cohortes_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: cohortes cohortes_pensum_id_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pensum_id_carrera_id_fkey" FOREIGN KEY ("pensum_id", "carrera_id") REFERENCES "horarios"."pensums"("id", "carrera_id");


--
-- Name: cohortes cohortes_pensum_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cohortes"
    ADD CONSTRAINT "cohortes_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE RESTRICT;


--
-- Name: configuracion_motor_restricciones configuracion_motor_restricciones_configuracion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_configuracion_id_fkey" FOREIGN KEY ("configuracion_id") REFERENCES "horarios"."configuraciones_motor"("id") ON DELETE CASCADE;


--
-- Name: configuracion_motor_restricciones configuracion_motor_restricciones_restriccion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."configuracion_motor_restricciones"
    ADD CONSTRAINT "configuracion_motor_restricciones_restriccion_id_fkey" FOREIGN KEY ("restriccion_id") REFERENCES "horarios"."restricciones_horario"("id") ON DELETE RESTRICT;


--
-- Name: conflicto_sesiones conflicto_sesiones_conflicto_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_conflicto_id_fkey" FOREIGN KEY ("conflicto_id") REFERENCES "horarios"."conflictos"("id") ON DELETE CASCADE;


--
-- Name: conflicto_sesiones conflicto_sesiones_sesion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."conflicto_sesiones"
    ADD CONSTRAINT "conflicto_sesiones_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;


--
-- Name: conflictos conflictos_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."conflictos"
    ADD CONSTRAINT "conflictos_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: curso_comun_cursos curso_comun_cursos_curso_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_curso_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE CASCADE;


--
-- Name: curso_comun_cursos curso_comun_cursos_grupo_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_comun_cursos"
    ADD CONSTRAINT "curso_comun_cursos_grupo_fkey" FOREIGN KEY ("curso_comun_id") REFERENCES "horarios"."curso_comun"("id") ON DELETE CASCADE;


--
-- Name: curso_recursos_requeridos curso_recursos_requeridos_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE CASCADE;


--
-- Name: curso_recursos_requeridos curso_recursos_requeridos_recurso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."curso_recursos_requeridos"
    ADD CONSTRAINT "curso_recursos_requeridos_recurso_id_fkey" FOREIGN KEY ("recurso_id") REFERENCES "horarios"."recursos"("id") ON DELETE RESTRICT;


--
-- Name: cursos_en_pensum cursos_en_pensum_curso_pensum_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_curso_pensum_fkey" FOREIGN KEY ("curso_id", "pensum_id") REFERENCES "horarios"."cursos"("id", "pensum_id") ON DELETE RESTRICT;


--
-- Name: cursos_en_pensum cursos_en_pensum_pensum_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos_en_pensum"
    ADD CONSTRAINT "cursos_en_pensum_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE CASCADE;


--
-- Name: cursos cursos_pensum_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."cursos"
    ADD CONSTRAINT "cursos_pensum_id_fkey" FOREIGN KEY ("pensum_id") REFERENCES "horarios"."pensums"("id") ON DELETE RESTRICT;


--
-- Name: disponibilidad_docente_slots disponibilidad_docente_slots_disponibilidad_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_disponibilidad_id_fkey" FOREIGN KEY ("disponibilidad_id") REFERENCES "horarios"."disponibilidades_docente"("id") ON DELETE CASCADE;


--
-- Name: disponibilidad_docente_slots disponibilidad_docente_slots_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidad_docente_slots"
    ADD CONSTRAINT "disponibilidad_docente_slots_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: disponibilidades_docente disponibilidades_docente_docente_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;


--
-- Name: disponibilidades_docente disponibilidades_docente_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."disponibilidades_docente"
    ADD CONSTRAINT "disponibilidades_docente_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;


--
-- Name: docente_facultades docente_facultades_docente_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE CASCADE;


--
-- Name: docente_facultades docente_facultades_facultad_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."docente_facultades"
    ADD CONSTRAINT "docente_facultades_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;


--
-- Name: eventos_sustitucion eventos_sustitucion_docente_entrante_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_docente_entrante_id_fkey" FOREIGN KEY ("docente_entrante_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;


--
-- Name: eventos_sustitucion eventos_sustitucion_docente_original_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_docente_original_id_fkey" FOREIGN KEY ("docente_original_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;


--
-- Name: eventos_sustitucion eventos_sustitucion_registrado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_registrado_por_id_fkey" FOREIGN KEY ("registrado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: eventos_sustitucion eventos_sustitucion_sesion_afectada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."eventos_sustitucion"
    ADD CONSTRAINT "eventos_sustitucion_sesion_afectada_id_fkey" FOREIGN KEY ("sesion_afectada_id") REFERENCES "horarios"."sesiones"("id") ON DELETE RESTRICT;


--
-- Name: generaciones generaciones_configuracion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_configuracion_id_fkey" FOREIGN KEY ("configuracion_id") REFERENCES "horarios"."configuraciones_motor"("id") ON DELETE SET NULL;


--
-- Name: generaciones generaciones_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;


--
-- Name: generaciones generaciones_plan_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE SET NULL;


--
-- Name: generaciones generaciones_solicitada_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."generaciones"
    ADD CONSTRAINT "generaciones_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: historial_estados_horario historial_estados_horario_cambiado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_cambiado_por_id_fkey" FOREIGN KEY ("cambiado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: historial_estados_horario historial_estados_horario_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."historial_estados_horario"
    ADD CONSTRAINT "historial_estados_horario_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: horarios horarios_aprobado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_aprobado_por_id_fkey" FOREIGN KEY ("aprobado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: horarios horarios_generado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_generado_por_id_fkey" FOREIGN KEY ("generado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: horarios horarios_horario_origen_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_horario_origen_id_fkey" FOREIGN KEY ("horario_origen_id") REFERENCES "horarios"."horarios"("id") ON DELETE RESTRICT;


--
-- Name: horarios horarios_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE RESTRICT;


--
-- Name: horarios horarios_publicado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."horarios"
    ADD CONSTRAINT "horarios_publicado_por_id_fkey" FOREIGN KEY ("publicado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: importacion_errores importacion_errores_importacion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."importacion_errores"
    ADD CONSTRAINT "importacion_errores_importacion_id_fkey" FOREIGN KEY ("importacion_id") REFERENCES "horarios"."importaciones"("id") ON DELETE CASCADE;


--
-- Name: importaciones importaciones_plantilla_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_plantilla_id_fkey" FOREIGN KEY ("plantilla_id") REFERENCES "horarios"."plantillas_importacion"("id") ON DELETE RESTRICT;


--
-- Name: importaciones importaciones_solicitada_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."importaciones"
    ADD CONSTRAINT "importaciones_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: jornada_descansos jornada_descansos_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."jornada_descansos"
    ADD CONSTRAINT "jornada_descansos_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE CASCADE;


--
-- Name: mensajes_generacion mensajes_generacion_generacion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."mensajes_generacion"
    ADD CONSTRAINT "mensajes_generacion_generacion_id_fkey" FOREIGN KEY ("generacion_id") REFERENCES "horarios"."generaciones"("id") ON DELETE CASCADE;


--
-- Name: notificaciones notificaciones_destinatario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_destinatario_id_fkey" FOREIGN KEY ("destinatario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;


--
-- Name: notificaciones notificaciones_plantilla_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."notificaciones"
    ADD CONSTRAINT "notificaciones_plantilla_id_fkey" FOREIGN KEY ("plantilla_id") REFERENCES "horarios"."plantillas_notificacion"("id") ON DELETE SET NULL;


--
-- Name: pensums pensums_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."pensums"
    ADD CONSTRAINT "pensums_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;


--
-- Name: plan_carreras plan_carreras_carrera_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_carrera_id_fkey" FOREIGN KEY ("carrera_id") REFERENCES "horarios"."carreras"("id") ON DELETE RESTRICT;


--
-- Name: plan_carreras plan_carreras_plan_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_carreras"
    ADD CONSTRAINT "plan_carreras_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: plan_jornadas plan_jornadas_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: plan_jornadas plan_jornadas_plan_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."plan_jornadas"
    ADD CONSTRAINT "plan_jornadas_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: reportes reportes_generacion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_generacion_id_fkey" FOREIGN KEY ("generacion_id") REFERENCES "horarios"."generaciones"("id") ON DELETE SET NULL;


--
-- Name: reportes reportes_generado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_generado_por_id_fkey" FOREIGN KEY ("generado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: reportes reportes_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."reportes"
    ADD CONSTRAINT "reportes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE SET NULL;


--
-- Name: resultado_edicion_conflictos resultado_edicion_conflictos_conflicto_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_conflicto_id_fkey" FOREIGN KEY ("conflicto_id") REFERENCES "horarios"."conflictos"("id") ON DELETE CASCADE;


--
-- Name: resultado_edicion_conflictos resultado_edicion_conflictos_resultado_edicion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultado_edicion_conflictos"
    ADD CONSTRAINT "resultado_edicion_conflictos_resultado_edicion_id_fkey" FOREIGN KEY ("resultado_edicion_id") REFERENCES "horarios"."resultados_edicion"("id") ON DELETE CASCADE;


--
-- Name: resultados_edicion resultados_edicion_creado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: resultados_edicion resultados_edicion_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: resultados_edicion resultados_edicion_horario_origen_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_horario_origen_id_fkey" FOREIGN KEY ("horario_origen_id") REFERENCES "horarios"."horarios"("id") ON DELETE RESTRICT;


--
-- Name: resultados_edicion resultados_edicion_sesion_fijada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."resultados_edicion"
    ADD CONSTRAINT "resultados_edicion_sesion_fijada_id_fkey" FOREIGN KEY ("sesion_fijada_id") REFERENCES "horarios"."sesiones"("id") ON DELETE SET NULL;


--
-- Name: rol_permisos rol_permisos_permiso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "horarios"."permisos_acceso"("id") ON DELETE CASCADE;


--
-- Name: rol_permisos rol_permisos_rol_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."rol_permisos"
    ADD CONSTRAINT "rol_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "horarios"."roles"("id") ON DELETE CASCADE;


--
-- Name: sesion_cohortes sesion_cohortes_cohorte_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;


--
-- Name: sesion_cohortes sesion_cohortes_curso_en_pensum_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_curso_en_pensum_id_fkey" FOREIGN KEY ("curso_en_pensum_id") REFERENCES "horarios"."cursos_en_pensum"("id") ON DELETE RESTRICT;


--
-- Name: sesion_cohortes sesion_cohortes_curso_visible_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_curso_visible_id_fkey" FOREIGN KEY ("curso_visible_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: sesion_cohortes sesion_cohortes_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: sesion_cohortes sesion_cohortes_sesion_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_sesion_id_fkey" FOREIGN KEY ("sesion_id") REFERENCES "horarios"."sesiones"("id") ON DELETE CASCADE;


--
-- Name: sesion_cohortes sesion_cohortes_sesion_id_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesion_cohortes"
    ADD CONSTRAINT "sesion_cohortes_sesion_id_horario_id_fkey" FOREIGN KEY ("sesion_id", "horario_id") REFERENCES "horarios"."sesiones"("id", "horario_id") ON DELETE CASCADE;


--
-- Name: sesiones sesiones_agrupacion_area_comun_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_agrupacion_area_comun_id_fkey" FOREIGN KEY ("agrupacion_area_comun_id") REFERENCES "horarios"."agrupaciones_area_comun"("id") ON DELETE SET NULL;


--
-- Name: sesiones sesiones_aula_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_aula_id_fkey" FOREIGN KEY ("aula_id") REFERENCES "horarios"."aulas"("id") ON DELETE RESTRICT;


--
-- Name: sesiones sesiones_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: sesiones sesiones_docente_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_docente_id_fkey" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") ON DELETE RESTRICT;


--
-- Name: sesiones sesiones_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: sesiones sesiones_jornada_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones"
    ADD CONSTRAINT "sesiones_jornada_id_fkey" FOREIGN KEY ("jornada_id") REFERENCES "horarios"."jornadas"("id") ON DELETE RESTRICT;


--
-- Name: sesiones_no_asignadas sesiones_no_asignadas_cohorte_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;


--
-- Name: sesiones_no_asignadas sesiones_no_asignadas_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: sesiones_no_asignadas sesiones_no_asignadas_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sesiones_no_asignadas"
    ADD CONSTRAINT "sesiones_no_asignadas_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: sugerencias_seccion sugerencias_seccion_cohorte_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_cohorte_id_fkey" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") ON DELETE RESTRICT;


--
-- Name: sugerencias_seccion sugerencias_seccion_curso_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_curso_id_fkey" FOREIGN KEY ("curso_id") REFERENCES "horarios"."cursos"("id") ON DELETE RESTRICT;


--
-- Name: sugerencias_seccion sugerencias_seccion_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: sugerencias_seccion sugerencias_seccion_resuelta_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_resuelta_por_id_fkey" FOREIGN KEY ("resuelta_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: sugerencias_seccion sugerencias_seccion_solicitada_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."sugerencias_seccion"
    ADD CONSTRAINT "sugerencias_seccion_solicitada_por_id_fkey" FOREIGN KEY ("solicitada_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: usuario_facultades usuario_facultades_facultad_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_facultad_id_fkey" FOREIGN KEY ("facultad_id") REFERENCES "horarios"."facultades"("id") ON DELETE RESTRICT;


--
-- Name: usuario_facultades usuario_facultades_usuario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_facultades"
    ADD CONSTRAINT "usuario_facultades_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;


--
-- Name: usuario_roles usuario_roles_rol_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "horarios"."roles"("id") ON DELETE RESTRICT;


--
-- Name: usuario_roles usuario_roles_usuario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuario_roles"
    ADD CONSTRAINT "usuario_roles_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "horarios"."usuarios"("id") ON DELETE CASCADE;


--
-- Name: usuarios usuarios_auth_user_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_auth_user_id_fkey" FOREIGN KEY ("auth_user_id") REFERENCES "auth"."users"("id") ON DELETE RESTRICT;


--
-- Name: usuarios usuarios_cohorte_fk; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_cohorte_fk" FOREIGN KEY ("cohorte_id") REFERENCES "horarios"."cohortes"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: usuarios usuarios_docente_fk; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."usuarios"
    ADD CONSTRAINT "usuarios_docente_fk" FOREIGN KEY ("docente_id") REFERENCES "horarios"."docentes"("id") DEFERRABLE INITIALLY DEFERRED;


--
-- Name: ventanas_disponibilidad ventanas_disponibilidad_periodo_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."ventanas_disponibilidad"
    ADD CONSTRAINT "ventanas_disponibilidad_periodo_id_fkey" FOREIGN KEY ("periodo_id") REFERENCES "horarios"."periodos_academicos"("id") ON DELETE CASCADE;


--
-- Name: versiones_horario versiones_horario_creado_por_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_creado_por_id_fkey" FOREIGN KEY ("creado_por_id") REFERENCES "horarios"."usuarios"("id") ON DELETE SET NULL;


--
-- Name: versiones_horario versiones_horario_horario_id_fkey; Type: FK CONSTRAINT; Schema: horarios; Owner: -
--

ALTER TABLE ONLY "horarios"."versiones_horario"
    ADD CONSTRAINT "versiones_horario_horario_id_fkey" FOREIGN KEY ("horario_id") REFERENCES "horarios"."horarios"("id") ON DELETE CASCADE;


--
-- Name: agrupacion_area_comun_cohortes; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."agrupacion_area_comun_cohortes" ENABLE ROW LEVEL SECURITY;

--
-- Name: agrupacion_area_comun_cursos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."agrupacion_area_comun_cursos" ENABLE ROW LEVEL SECURITY;

--
-- Name: agrupaciones_area_comun; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."agrupaciones_area_comun" ENABLE ROW LEVEL SECURITY;

--
-- Name: auditoria api_auditoria_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_auditoria_insertar" ON "horarios"."auditoria" FOR INSERT TO "authenticated" WITH CHECK (("usuario_id" = "horarios"."usuario_actual_id"()));


--
-- Name: auditoria api_auditoria_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_auditoria_leer" ON "horarios"."auditoria" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'leer'::"text"));


--
-- Name: agrupacion_area_comun_cohortes api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cursos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupaciones_area_comun api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."agrupaciones_area_comun" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aula_recursos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."aula_recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aulas api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."aulas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carrera_jornadas api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."carrera_jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carreras api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."carreras" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohorte_periodos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cohorte_periodos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohortes api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: curso_recursos_requeridos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."curso_recursos_requeridos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos_en_pensum api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."cursos_en_pensum" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: facultades api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."facultades" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornada_descansos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."jornada_descansos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornadas api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: pensums api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."pensums" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: periodos_academicos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."periodos_academicos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: recursos api_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_actualizar" ON "horarios"."recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cohortes api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupacion_area_comun_cohortes" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cursos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupacion_area_comun_cursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupaciones_area_comun api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."agrupaciones_area_comun" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aula_recursos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."aula_recursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aulas api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."aulas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carrera_jornadas api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."carrera_jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carreras api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."carreras" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohorte_periodos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cohorte_periodos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohortes api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cohortes" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: curso_recursos_requeridos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."curso_recursos_requeridos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos_en_pensum api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."cursos_en_pensum" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: facultades api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."facultades" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornada_descansos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."jornada_descansos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornadas api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: pensums api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."pensums" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: periodos_academicos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."periodos_academicos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: recursos api_catalogo_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_eliminar" ON "horarios"."recursos" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cohortes api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cursos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupaciones_area_comun api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."agrupaciones_area_comun" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aula_recursos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."aula_recursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aulas api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."aulas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carrera_jornadas api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."carrera_jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carreras api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."carreras" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohorte_periodos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."cohorte_periodos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohortes api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: curso_recursos_requeridos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."curso_recursos_requeridos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."cursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos_en_pensum api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."cursos_en_pensum" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: facultades api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."facultades" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornada_descansos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."jornada_descansos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornadas api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: pensums api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."pensums" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: periodos_academicos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."periodos_academicos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: recursos api_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_insertar" ON "horarios"."recursos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('aulas'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cohortes api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupacion_area_comun_cohortes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: agrupacion_area_comun_cursos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupacion_area_comun_cursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: agrupaciones_area_comun api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."agrupaciones_area_comun" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: aula_recursos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."aula_recursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: aulas api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."aulas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: carrera_jornadas api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."carrera_jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: carreras api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."carreras" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: cohorte_periodos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."cohorte_periodos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: cohortes api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."cohortes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: curso_recursos_requeridos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."curso_recursos_requeridos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: cursos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."cursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: cursos_en_pensum api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."cursos_en_pensum" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: docente_facultades api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."docente_facultades" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: docentes api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."docentes" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: facultades api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."facultades" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: jornada_descansos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."jornada_descansos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: jornadas api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: pensums api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."pensums" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: periodos_academicos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."periodos_academicos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: recursos api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."recursos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: restricciones_horario api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."restricciones_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: ventanas_disponibilidad api_catalogo_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_catalogo_leer" ON "horarios"."ventanas_disponibilidad" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: asignaciones_docente_curso api_docentes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_actualizar" ON "horarios"."asignaciones_docente_curso" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidad_docente_slots api_docentes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_actualizar" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidades_docente api_docentes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_actualizar" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: asignaciones_docente_curso api_docentes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_eliminar" ON "horarios"."asignaciones_docente_curso" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidad_docente_slots api_docentes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_eliminar" ON "horarios"."disponibilidad_docente_slots" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidades_docente api_docentes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_eliminar" ON "horarios"."disponibilidades_docente" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: docente_facultades api_docentes_escribir; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_escribir" ON "horarios"."docente_facultades" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: docentes api_docentes_escribir; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_escribir" ON "horarios"."docentes" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: asignaciones_docente_curso api_docentes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_insertar" ON "horarios"."asignaciones_docente_curso" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidad_docente_slots api_docentes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_insertar" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: disponibilidades_docente api_docentes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_insertar" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'actualizar'::"text"));


--
-- Name: asignaciones_docente_curso api_docentes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_leer" ON "horarios"."asignaciones_docente_curso" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: disponibilidad_docente_slots api_docentes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_leer" ON "horarios"."disponibilidad_docente_slots" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: disponibilidades_docente api_docentes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_docentes_leer" ON "horarios"."disponibilidades_docente" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('docentes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: usuario_facultades api_facultades_propias; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_facultades_propias" ON "horarios"."usuario_facultades" FOR SELECT TO "authenticated" USING (("usuario_id" = "horarios"."usuario_actual_id"()));


--
-- Name: historial_estados_horario api_historial_aprobacion_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_historial_aprobacion_insertar" ON "horarios"."historial_estados_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text")));


--
-- Name: importacion_errores api_importaciones; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importaciones" ON "horarios"."importacion_errores" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: importaciones api_importaciones; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importaciones" ON "horarios"."importaciones" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: plantillas_importacion api_importaciones; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importaciones" ON "horarios"."plantillas_importacion" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: importaciones api_importaciones_diagnostico; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importaciones_diagnostico" ON "horarios"."importaciones" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text"));


--
-- Name: agrupacion_area_comun_cohortes api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cursos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupacion_area_comun_cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupaciones_area_comun api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."agrupaciones_area_comun" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: asignaciones_docente_curso api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."asignaciones_docente_curso" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aula_recursos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."aula_recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: aulas api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."aulas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carrera_jornadas api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."carrera_jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: carreras api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."carreras" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohorte_periodos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cohorte_periodos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cohortes api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: curso_recursos_requeridos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."curso_recursos_requeridos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: cursos_en_pensum api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."cursos_en_pensum" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: disponibilidad_docente_slots api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: disponibilidades_docente api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: docentes api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."docentes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: facultades api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."facultades" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornada_descansos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."jornada_descansos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: jornadas api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."jornadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: pensums api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."pensums" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: periodos_academicos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."periodos_academicos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: recursos api_importar_catalogo_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_actualizar" ON "horarios"."recursos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: agrupacion_area_comun_cohortes api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cohortes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: agrupacion_area_comun_cursos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupacion_area_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: agrupaciones_area_comun api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."agrupaciones_area_comun" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: asignaciones_docente_curso api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."asignaciones_docente_curso" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: aula_recursos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."aula_recursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: aulas api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."aulas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: carrera_jornadas api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."carrera_jornadas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: carreras api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."carreras" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: cohorte_periodos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cohorte_periodos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: cohortes api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cohortes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: curso_recursos_requeridos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."curso_recursos_requeridos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: cursos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: cursos_en_pensum api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."cursos_en_pensum" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: disponibilidad_docente_slots api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: disponibilidades_docente api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: docentes api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."docentes" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: facultades api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."facultades" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: jornada_descansos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."jornada_descansos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: jornadas api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."jornadas" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: pensums api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."pensums" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: periodos_academicos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."periodos_academicos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: recursos api_importar_catalogo_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_importar_catalogo_insertar" ON "horarios"."recursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('importaciones'::"text", 'importar'::"text"));


--
-- Name: notificaciones api_notificaciones_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_notificaciones_insertar" ON "horarios"."notificaciones" FOR INSERT TO "authenticated" WITH CHECK (("destinatario_id" = "horarios"."usuario_actual_id"()));


--
-- Name: notificaciones api_notificaciones_propias; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_notificaciones_propias" ON "horarios"."notificaciones" FOR SELECT TO "authenticated" USING (("destinatario_id" = "horarios"."usuario_actual_id"()));


--
-- Name: permisos_acceso api_permisos_catalogo; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_permisos_catalogo" ON "horarios"."permisos_acceso" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: rol_permisos api_permisos_roles_propios; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_permisos_roles_propios" ON "horarios"."rol_permisos" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuario_roles" "ur"
  WHERE (("ur"."usuario_id" = "horarios"."usuario_actual_id"()) AND ("ur"."rol_id" = "rol_permisos"."rol_id")))));


--
-- Name: cambios_detectados api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."cambios_detectados" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: configuracion_motor_restricciones api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."configuracion_motor_restricciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: configuraciones_motor api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."configuraciones_motor" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: conflicto_sesiones api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."conflicto_sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: conflictos api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: generaciones api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."generaciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: historial_estados_horario api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."historial_estados_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: horarios api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."horarios" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: mensajes_generacion api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."mensajes_generacion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: resultado_edicion_conflictos api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."resultado_edicion_conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: resultados_edicion api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."resultados_edicion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesion_cohortes api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."sesion_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesiones api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesiones_no_asignadas api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."sesiones_no_asignadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: versiones_horario api_planes_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_actualizar" ON "horarios"."versiones_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: cambios_detectados api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."cambios_detectados" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: configuracion_motor_restricciones api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."configuracion_motor_restricciones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: configuraciones_motor api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."configuraciones_motor" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: conflicto_sesiones api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."conflicto_sesiones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: conflictos api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."conflictos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: generaciones api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."generaciones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: historial_estados_horario api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."historial_estados_horario" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: horarios api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."horarios" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: mensajes_generacion api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."mensajes_generacion" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: plan_carreras api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."plan_carreras" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));


--
-- Name: plan_jornadas api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."plan_jornadas" FOR DELETE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));


--
-- Name: resultado_edicion_conflictos api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."resultado_edicion_conflictos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: resultados_edicion api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."resultados_edicion" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: sesion_cohortes api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."sesion_cohortes" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: sesiones api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."sesiones" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: sesiones_no_asignadas api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."sesiones_no_asignadas" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: versiones_horario api_planes_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_eliminar" ON "horarios"."versiones_horario" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text"));


--
-- Name: cambios_detectados api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."cambios_detectados" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: configuracion_motor_restricciones api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."configuracion_motor_restricciones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: configuraciones_motor api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."configuraciones_motor" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: conflicto_sesiones api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."conflicto_sesiones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: conflictos api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."conflictos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: generaciones api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."generaciones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: historial_estados_horario api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."historial_estados_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: horarios api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."horarios" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: mensajes_generacion api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."mensajes_generacion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: plan_carreras api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."plan_carreras" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));


--
-- Name: plan_jornadas api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."plan_jornadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text")));


--
-- Name: resultado_edicion_conflictos api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."resultado_edicion_conflictos" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: resultados_edicion api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."resultados_edicion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesion_cohortes api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."sesion_cohortes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesiones api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."sesiones" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: sesiones_no_asignadas api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."sesiones_no_asignadas" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: versiones_horario api_planes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_insertar" ON "horarios"."versiones_horario" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'crear'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'actualizar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text")));


--
-- Name: cambios_detectados api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."cambios_detectados" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: configuracion_motor_restricciones api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."configuracion_motor_restricciones" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: configuraciones_motor api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."configuraciones_motor" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: conflicto_sesiones api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."conflicto_sesiones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: conflictos api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."conflictos" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: generaciones api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."generaciones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: historial_estados_horario api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."historial_estados_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: horarios api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."horarios" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: mensajes_generacion api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."mensajes_generacion" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: plan_carreras api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."plan_carreras" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: plan_jornadas api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."plan_jornadas" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: resultado_edicion_conflictos api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."resultado_edicion_conflictos" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: resultados_edicion api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."resultados_edicion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: sesion_cohortes api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."sesion_cohortes" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: sesiones api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."sesiones" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: sesiones_no_asignadas api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."sesiones_no_asignadas" FOR SELECT TO "authenticated" USING ((( SELECT "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") AS "usuario_actual_tiene_permiso") OR ( SELECT "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AS "usuario_actual_tiene_permiso")));


--
-- Name: versiones_horario api_planes_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_leer" ON "horarios"."versiones_horario" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('consultas'::"text", 'leer'::"text") OR "horarios"."usuario_actual_tiene_permiso"('motor'::"text", 'generar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text")));


--
-- Name: cambios_detectados api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."cambios_detectados" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: configuracion_motor_restricciones api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."configuracion_motor_restricciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: configuraciones_motor api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."configuraciones_motor" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: conflicto_sesiones api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."conflicto_sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: conflictos api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: generaciones api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."generaciones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: historial_estados_horario api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."historial_estados_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: horarios api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."horarios" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: mensajes_generacion api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."mensajes_generacion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: resultado_edicion_conflictos api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."resultado_edicion_conflictos" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: resultados_edicion api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."resultados_edicion" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: sesion_cohortes api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesion_cohortes" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: sesiones api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesiones" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: sesiones_no_asignadas api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."sesiones_no_asignadas" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: versiones_horario api_planes_transversal_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_planes_transversal_actualizar" ON "horarios"."versiones_horario" FOR UPDATE TO "authenticated" USING (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text"))) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'aprobar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('planes'::"text", 'publicar'::"text") OR "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'administrar'::"text")));


--
-- Name: plantillas_notificacion api_plantillas_notificacion_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_plantillas_notificacion_leer" ON "horarios"."plantillas_notificacion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: reportes api_reportes_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_reportes_insertar" ON "horarios"."reportes" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('reportes'::"text", 'exportar'::"text") AND ("generado_por_id" = "horarios"."usuario_actual_id"())));


--
-- Name: reportes api_reportes_propios; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_reportes_propios" ON "horarios"."reportes" FOR SELECT TO "authenticated" USING (("generado_por_id" = "horarios"."usuario_actual_id"()));


--
-- Name: roles api_roles_catalogo; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_roles_catalogo" ON "horarios"."roles" FOR SELECT TO "authenticated" USING ((("horarios"."usuario_actual_id"() IS NOT NULL) AND ("eliminado_en" IS NULL)));


--
-- Name: usuario_roles api_roles_propios; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_roles_propios" ON "horarios"."usuario_roles" FOR SELECT TO "authenticated" USING (("usuario_id" = "horarios"."usuario_actual_id"()));


--
-- Name: sugerencias_seccion api_sugerencias_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_sugerencias_insertar" ON "horarios"."sugerencias_seccion" FOR INSERT TO "authenticated" WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text") AND ("solicitada_por_id" = "horarios"."usuario_actual_id"())));


--
-- Name: sugerencias_seccion api_sugerencias_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_sugerencias_leer" ON "horarios"."sugerencias_seccion" FOR SELECT TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text"));


--
-- Name: eventos_sustitucion api_sustituciones_escribir; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_sustituciones_escribir" ON "horarios"."eventos_sustitucion" TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('sustituciones'::"text", 'crear'::"text")) WITH CHECK (("horarios"."usuario_actual_tiene_permiso"('sustituciones'::"text", 'crear'::"text") AND ("registrado_por_id" = "horarios"."usuario_actual_id"())));


--
-- Name: eventos_sustitucion api_sustituciones_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_sustituciones_leer" ON "horarios"."eventos_sustitucion" FOR SELECT TO "authenticated" USING (("horarios"."usuario_actual_id"() IS NOT NULL));


--
-- Name: usuarios api_usuario_propio; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_usuario_propio" ON "horarios"."usuarios" FOR SELECT TO "authenticated" USING ((("auth_user_id" = "auth"."uid"()) AND ("eliminado_en" IS NULL)));


--
-- Name: usuarios api_usuarios_para_auditoria; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "api_usuarios_para_auditoria" ON "horarios"."usuarios" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('auditoria'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));


--
-- Name: asignaciones_docente_curso; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."asignaciones_docente_curso" ENABLE ROW LEVEL SECURITY;

--
-- Name: auditoria; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."auditoria" ENABLE ROW LEVEL SECURITY;

--
-- Name: aula_recursos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."aula_recursos" ENABLE ROW LEVEL SECURITY;

--
-- Name: aulas; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."aulas" ENABLE ROW LEVEL SECURITY;

--
-- Name: cambios_detectados; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."cambios_detectados" ENABLE ROW LEVEL SECURITY;

--
-- Name: carrera_jornadas; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."carrera_jornadas" ENABLE ROW LEVEL SECURITY;

--
-- Name: carreras; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."carreras" ENABLE ROW LEVEL SECURITY;

--
-- Name: cohorte_periodos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."cohorte_periodos" ENABLE ROW LEVEL SECURITY;

--
-- Name: cohortes; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."cohortes" ENABLE ROW LEVEL SECURITY;

--
-- Name: configuracion_motor_restricciones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."configuracion_motor_restricciones" ENABLE ROW LEVEL SECURITY;

--
-- Name: configuraciones_motor; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."configuraciones_motor" ENABLE ROW LEVEL SECURITY;

--
-- Name: conflicto_sesiones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."conflicto_sesiones" ENABLE ROW LEVEL SECURITY;

--
-- Name: conflictos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."conflictos" ENABLE ROW LEVEL SECURITY;

--
-- Name: curso_comun; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."curso_comun" ENABLE ROW LEVEL SECURITY;

--
-- Name: curso_comun curso_comun_actualizar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_actualizar" ON "horarios"."curso_comun" FOR UPDATE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text")) WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));


--
-- Name: curso_comun_cursos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."curso_comun_cursos" ENABLE ROW LEVEL SECURITY;

--
-- Name: curso_comun_cursos curso_comun_cursos_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_cursos_eliminar" ON "horarios"."curso_comun_cursos" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));


--
-- Name: curso_comun_cursos curso_comun_cursos_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_cursos_insertar" ON "horarios"."curso_comun_cursos" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));


--
-- Name: curso_comun_cursos curso_comun_cursos_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_cursos_leer" ON "horarios"."curso_comun_cursos" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));


--
-- Name: curso_comun curso_comun_eliminar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_eliminar" ON "horarios"."curso_comun" FOR DELETE TO "authenticated" USING ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));


--
-- Name: curso_comun curso_comun_insertar; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_insertar" ON "horarios"."curso_comun" FOR INSERT TO "authenticated" WITH CHECK ("horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'crear'::"text"));


--
-- Name: curso_comun curso_comun_leer; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "curso_comun_leer" ON "horarios"."curso_comun" FOR SELECT TO "authenticated" USING (( SELECT "horarios"."usuario_actual_tiene_permiso"('academia'::"text", 'leer'::"text") AS "usuario_actual_tiene_permiso"));


--
-- Name: curso_recursos_requeridos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."curso_recursos_requeridos" ENABLE ROW LEVEL SECURITY;

--
-- Name: cursos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."cursos" ENABLE ROW LEVEL SECURITY;

--
-- Name: cursos_en_pensum; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."cursos_en_pensum" ENABLE ROW LEVEL SECURITY;

--
-- Name: disponibilidad_docente_slots; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."disponibilidad_docente_slots" ENABLE ROW LEVEL SECURITY;

--
-- Name: disponibilidades_docente; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."disponibilidades_docente" ENABLE ROW LEVEL SECURITY;

--
-- Name: disponibilidades_docente docente_actualiza_su_disponibilidad; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_actualiza_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidad_docente_slots docente_actualiza_sus_bloques_disponibles; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_actualiza_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR UPDATE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) WITH CHECK ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidades_docente docente_consulta_su_disponibilidad; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_consulta_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidad_docente_slots docente_consulta_sus_bloques_disponibles; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_consulta_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR SELECT TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidad_docente_slots docente_elimina_sus_bloques_disponibles; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_elimina_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR DELETE TO "authenticated" USING ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: docente_facultades; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."docente_facultades" ENABLE ROW LEVEL SECURITY;

--
-- Name: disponibilidades_docente docente_inserta_su_disponibilidad; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_inserta_su_disponibilidad" ON "horarios"."disponibilidades_docente" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."docente_id" = "disponibilidades_docente"."docente_id") AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidad_docente_slots docente_inserta_sus_bloques_disponibles; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_inserta_sus_bloques_disponibles" ON "horarios"."disponibilidad_docente_slots" FOR INSERT TO "authenticated" WITH CHECK ((EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))));


--
-- Name: disponibilidad_docente_slots docente_restringe_bloques_propios; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_restringe_bloques_propios" ON "horarios"."disponibilidad_docente_slots" AS RESTRICTIVE TO "authenticated" USING (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR (EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))))) WITH CHECK (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR (EXISTS ( SELECT 1
   FROM ("horarios"."disponibilidades_docente" "disponibilidad"
     JOIN "horarios"."usuarios" "usuario" ON (("usuario"."docente_id" = "disponibilidad"."docente_id")))
  WHERE (("disponibilidad"."id" = "disponibilidad_docente_slots"."disponibilidad_id") AND ("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))));


--
-- Name: disponibilidades_docente docente_restringe_disponibilidad_propia; Type: POLICY; Schema: horarios; Owner: -
--

CREATE POLICY "docente_restringe_disponibilidad_propia" ON "horarios"."disponibilidades_docente" AS RESTRICTIVE TO "authenticated" USING (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR ("docente_id" = ( SELECT "usuario"."docente_id"
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL)))))) WITH CHECK (((NOT (EXISTS ( SELECT 1
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))) OR ("docente_id" = ( SELECT "usuario"."docente_id"
   FROM "horarios"."usuarios" "usuario"
  WHERE (("usuario"."auth_user_id" = ( SELECT "auth"."uid"() AS "uid")) AND ("usuario"."tipo" = 'docente'::"horarios"."tipo_usuario") AND ("usuario"."estado" = 'activo'::"horarios"."estado_usuario") AND ("usuario"."eliminado_en" IS NULL))))));


--
-- Name: docentes; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."docentes" ENABLE ROW LEVEL SECURITY;

--
-- Name: eventos_sustitucion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."eventos_sustitucion" ENABLE ROW LEVEL SECURITY;

--
-- Name: facultades; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."facultades" ENABLE ROW LEVEL SECURITY;

--
-- Name: generaciones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."generaciones" ENABLE ROW LEVEL SECURITY;

--
-- Name: historial_estados_horario; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."historial_estados_horario" ENABLE ROW LEVEL SECURITY;

--
-- Name: horarios; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."horarios" ENABLE ROW LEVEL SECURITY;

--
-- Name: importacion_errores; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."importacion_errores" ENABLE ROW LEVEL SECURITY;

--
-- Name: importaciones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."importaciones" ENABLE ROW LEVEL SECURITY;

--
-- Name: jornada_descansos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."jornada_descansos" ENABLE ROW LEVEL SECURITY;

--
-- Name: jornadas; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."jornadas" ENABLE ROW LEVEL SECURITY;

--
-- Name: mensajes_generacion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."mensajes_generacion" ENABLE ROW LEVEL SECURITY;

--
-- Name: notificaciones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."notificaciones" ENABLE ROW LEVEL SECURITY;

--
-- Name: pensums; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."pensums" ENABLE ROW LEVEL SECURITY;

--
-- Name: periodos_academicos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."periodos_academicos" ENABLE ROW LEVEL SECURITY;

--
-- Name: permisos_acceso; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."permisos_acceso" ENABLE ROW LEVEL SECURITY;

--
-- Name: plan_carreras; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."plan_carreras" ENABLE ROW LEVEL SECURITY;

--
-- Name: plan_jornadas; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."plan_jornadas" ENABLE ROW LEVEL SECURITY;

--
-- Name: plantillas_importacion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."plantillas_importacion" ENABLE ROW LEVEL SECURITY;

--
-- Name: plantillas_notificacion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."plantillas_notificacion" ENABLE ROW LEVEL SECURITY;

--
-- Name: recursos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."recursos" ENABLE ROW LEVEL SECURITY;

--
-- Name: reportes; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."reportes" ENABLE ROW LEVEL SECURITY;

--
-- Name: restricciones_horario; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."restricciones_horario" ENABLE ROW LEVEL SECURITY;

--
-- Name: resultado_edicion_conflictos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."resultado_edicion_conflictos" ENABLE ROW LEVEL SECURITY;

--
-- Name: resultados_edicion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."resultados_edicion" ENABLE ROW LEVEL SECURITY;

--
-- Name: rol_permisos; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."rol_permisos" ENABLE ROW LEVEL SECURITY;

--
-- Name: roles; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."roles" ENABLE ROW LEVEL SECURITY;

--
-- Name: sesion_cohortes; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."sesion_cohortes" ENABLE ROW LEVEL SECURITY;

--
-- Name: sesiones; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."sesiones" ENABLE ROW LEVEL SECURITY;

--
-- Name: sesiones_no_asignadas; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."sesiones_no_asignadas" ENABLE ROW LEVEL SECURITY;

--
-- Name: sugerencias_seccion; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."sugerencias_seccion" ENABLE ROW LEVEL SECURITY;

--
-- Name: usuario_facultades; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."usuario_facultades" ENABLE ROW LEVEL SECURITY;

--
-- Name: usuario_roles; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."usuario_roles" ENABLE ROW LEVEL SECURITY;

--
-- Name: usuarios; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."usuarios" ENABLE ROW LEVEL SECURITY;

--
-- Name: ventanas_disponibilidad; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."ventanas_disponibilidad" ENABLE ROW LEVEL SECURITY;

--
-- Name: versiones_horario; Type: ROW SECURITY; Schema: horarios; Owner: -
--

ALTER TABLE "horarios"."versiones_horario" ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

\unrestrict VEd9KakYnvmURGDx8mAbQH0reA9KeXpbPYfETHPgS7Qvg8vXmTb2c9TUsJpPtZb
