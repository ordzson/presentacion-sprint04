#!/usr/bin/env python3
"""Parsea docs/database.sql y genera src/app/data/catalogo-data.ts.

Corta el volcado en bloques (uno por objeto), les pega una descripción en
castellano y los clasifica. La cobertura es total: la suma de los bloques
reconstruye el archivo entero, de modo que la slide muestra el script completo
y no un resumen.
"""
import re
from pathlib import Path

ROOT = Path("/home/ordson/Documentos/Universidad/HORARIOS/Horarios-develop")
SQL = ROOT / "docs" / "database.sql"
OUT = ROOT / "presentacion-sprint04" / "src" / "app" / "data" / "catalogo-data.ts"

# ---------------------------------------------------------------- dominios
# Mismo reparto que la slide del esquema (scripts/gen-erd.py): así el
# stakeholder ve la misma división en las dos diapositivas.

DOMINIOS = {
    "academico": [
        "facultades", "carreras", "pensums", "cursos", "cursos_en_pensum",
        "curso_carreras_compartidas", "cohortes", "cohorte_periodos",
        "periodos_academicos", "jornadas", "jornada_descansos", "carrera_jornadas",
        "agrupaciones_area_comun", "agrupacion_area_comun_cursos",
        "agrupacion_area_comun_cohortes",
    ],
    "infraestructura": ["aulas", "recursos", "aula_recursos", "curso_recursos_requeridos"],
    "docentes": [
        "docentes", "asignaciones_docente_curso", "disponibilidades_docente",
        "disponibilidad_docente_slots", "ventanas_disponibilidad", "eventos_sustitucion",
    ],
    "motor": [
        "configuraciones_motor", "configuracion_motor_restricciones", "restricciones_horario",
        "generaciones", "mensajes_generacion", "sesiones_no_asignadas", "sugerencias_seccion",
        "plan_carreras", "plan_jornadas",
    ],
    "horarios": [
        "horarios", "versiones_horario", "historial_estados_horario", "sesiones",
        "sesion_cohortes", "conflictos", "conflicto_sesiones", "resultados_edicion",
        "resultado_edicion_conflictos", "cambios_detectados",
    ],
    "importacion": ["importaciones", "importacion_errores", "plantillas_importacion"],
    "seguridad": ["usuarios", "roles", "permisos_acceso", "rol_permisos", "usuario_roles",
                  "usuario_facultades"],
    "operacion": ["notificaciones", "plantillas_notificacion", "auditoria", "reportes"],
}
DOM_DE = {t: d for d, ts in DOMINIOS.items() for t in ts}
DOM_LABEL = {
    "academico": "Académico",
    "infraestructura": "Infraestructura",
    "docentes": "Docentes",
    "motor": "Motor",
    "horarios": "Horarios",
    "importacion": "Importación",
    "seguridad": "Seguridad",
    "operacion": "Operación",
}

# ---------------------------------------------------------------- tablas

TABLAS_DESC = {
    # --- académico
    "facultades": (
        "Facultades de la universidad. Es la raíz del alcance: a un usuario se le "
        "asignan facultades y solo ve lo que cuelga de ellas."),
    "carreras": (
        "Carreras de cada facultad, con código, nivel académico y duración en semestres. "
        "Esa duración es la que valida que una cohorte no pase de su último semestre."),
    "pensums": (
        "Planes de estudio de una carrera, uno por año de creación, con su estado "
        "(borrador, vigente, en retiro, archivado)."),
    "cursos": (
        "Catálogo de materias: código, nombre, si exige laboratorio y si es de área común."),
    "cursos_en_pensum": (
        "La malla curricular: qué curso va en qué semestre de qué pensum, cuántos bloques "
        "semanales exige y si los prefiere consecutivos."),
    "curso_carreras_compartidas": (
        "Puente N:M. Carreras que comparten un mismo curso; es la base para agrupar el área común."),
    "cohortes": (
        "Grupos de estudiantes: carrera + pensum + jornada + año de ingreso + sección, "
        "con su matrícula estimada y su estado."),
    "cohorte_periodos": (
        "Qué cohortes están activas en cada período, en qué semestre va cada una y con "
        "cuánta matrícula. Es la entrada principal del motor."),
    "periodos_academicos": (
        "Semestres o cuatrimestres: nombre, fecha de inicio y fin, y estado del período."),
    "jornadas": (
        "Matutina, vespertina…: días activos, hora de inicio y fin, duración del bloque, "
        "bloques por día y el receso (después de qué bloque y cuántos minutos)."),
    "jornada_descansos": (
        "Recesos concretos dentro de una jornada, por día y rango de bloques. Una "
        "restricción de exclusión impide que dos se pisen."),
    "carrera_jornadas": "Puente N:M. En qué jornadas se imparte cada carrera.",
    "agrupaciones_area_comun": (
        "Cabecera de un área común: el curso principal que varias cohortes toman juntas "
        "en un período."),
    "agrupacion_area_comun_cursos": "Puente N:M. Cursos que integran una agrupación de área común.",
    "agrupacion_area_comun_cohortes": (
        "Puente N:M. Cohortes que asisten juntas a una agrupación de área común."),
    # --- infraestructura
    "aulas": (
        "Salones: código, capacidad máxima, tipo (teórica, laboratorio, mixta, virtual), "
        "piso, número y equipamiento especial."),
    "recursos": "Catálogo de recursos físicos: proyector, laboratorio de cómputo, etc.",
    "aula_recursos": "Puente N:M con cantidad. Qué recursos tiene cada aula y cuántos.",
    "curso_recursos_requeridos": (
        "Puente N:M con cantidad. Qué recursos exige un curso; el motor solo lo coloca en "
        "aulas que los tengan."),
    # --- docentes
    "docentes": (
        "Plantilla docente: código, nombre, correo, prioridad y carga mínima y máxima de cursos."),
    "asignaciones_docente_curso": (
        "Autorizaciones: qué docente puede impartir qué curso, con alcance opcional por "
        "carrera, facultad o jornada. Se retiran marcando `esta_vigente = false`."),
    "disponibilidades_docente": (
        "Cabecera de la disponibilidad de un docente para un período, con la marca de "
        "confirmada. Una por docente y período."),
    "disponibilidad_docente_slots": (
        "La disponibilidad expandida a bloques concretos (jornada, día, índice de bloque). "
        "Es lo que consulta el motor."),
    "ventanas_disponibilidad": (
        "Ventana de captura por período: entre qué fechas los docentes pueden declarar su "
        "disponibilidad, y en qué estado está (programada, abierta, cerrada, cancelada)."),
    "eventos_sustitucion": (
        "Ausencias, reemplazos, cancelaciones y recuperaciones sobre una sesión concreta, "
        "con sus fechas y el docente entrante."),
    # --- motor
    "configuraciones_motor": (
        "Parámetros de una corrida del generador: tiempo máximo, iteraciones y tolerancia "
        "a violaciones blandas."),
    "configuracion_motor_restricciones": (
        "Puente N:M con peso. Qué restricciones usa una configuración y cuánto pesa cada una."),
    "restricciones_horario": (
        "Catálogo de reglas del motor, con su peso y si es dura (obligatoria) o blanda "
        "(preferencia)."),
    "generaciones": (
        "Cada ejecución del motor: estado, semilla, duración, memoria, costo final, "
        "violaciones, la entrada usada y el resultado completo en JSON."),
    "mensajes_generacion": (
        "Bitácora de una corrida: mensajes por severidad, con código y entidad afectada."),
    "sesiones_no_asignadas": (
        "Lo que el motor no pudo colocar y por qué, con los recursos que faltaron y una "
        "sugerencia de resolución."),
    "sugerencias_seccion": (
        "Avisos del tipo «este grupo no cabe, abrí otra sección», con la matrícula "
        "detectada, la capacidad disponible y su estado de resolución."),
    "plan_carreras": "Puente N:M. Qué carreras entran en el alcance de un plan de horario.",
    "plan_jornadas": "Puente N:M. Qué jornadas entran en el alcance de un plan de horario.",
    # --- horarios
    "horarios": (
        "Cabecera de un plan de horario: período, tipo (clases o exámenes), versión, "
        "estado, quién lo generó, aprobó y publicó, costo y violaciones duras."),
    "sesiones": (
        "Cada clase colocada en el calendario: horario, curso, docente, aula, jornada, día "
        "y bloques. Sus rangos son columnas generadas y tres restricciones de exclusión "
        "impiden solapes de docente, aula y cohorte."),
    "sesion_cohortes": (
        "Qué cohortes asisten a cada sesión. Repite día, bloques y minutos a propósito, "
        "para poder vigilar solapes por grupo y leer su horario sin joins."),
    "conflictos": (
        "Choques detectados en un horario, con tipo, severidad y si rompe una restricción dura."),
    "conflicto_sesiones": "Puente N:M. Qué sesiones participan en cada conflicto.",
    "resultados_edicion": (
        "Resultado de mover una sesión a mano: la solicitud, el vecindario recalculado, "
        "las sesiones movidas y el costo antes y después."),
    "resultado_edicion_conflictos": "Puente N:M. Conflictos que dejó una edición manual.",
    "versiones_horario": (
        "Instantánea JSON de las sesiones de un horario, numerada, para historial y comparación."),
    "cambios_detectados": (
        "Diferencias campo a campo entre una versión y la anterior: qué cambió, de qué "
        "valor a qué valor."),
    "historial_estados_horario": (
        "Bitácora de transiciones de estado de un horario: de qué estado a cuál, quién y por qué."),
    # --- importación
    "importaciones": (
        "Cabecera de una carga masiva: archivo, hash, plantilla y versión, clave de "
        "idempotencia, estado y conteo de filas válidas e inválidas."),
    "importacion_errores": (
        "Qué falló en una importación, con hoja, fila, columna, código de error y el valor recibido."),
    "plantillas_importacion": (
        "Formatos de archivo aceptados: código, versión, reglas de validación y si está vigente."),
    # --- seguridad
    "usuarios": (
        "Usuarios del sistema. Enlaza con `auth.users` de Supabase por `auth_user_id` y "
        "puede apuntar al docente o a la cohorte de la persona."),
    "roles": "Roles de acceso (coordinador, decano, docente…) con su descripción.",
    "permisos_acceso": (
        "Catálogo de permisos: el par (recurso, acción), por ejemplo ('aulas', 'crear')."),
    "rol_permisos": "Puente N:M. Qué permisos concede cada rol.",
    "usuario_roles": "Puente N:M. Qué roles tiene cada usuario.",
    "usuario_facultades": (
        "Puente N:M. Qué facultades ve cada usuario. Es el alcance por facultad."),
    # --- operación
    "notificaciones": (
        "Avisos internos por destinatario, con plantilla, asunto, cuerpo, estado y clave "
        "de idempotencia."),
    "plantillas_notificacion": (
        "Plantillas de aviso: código, asunto, cuerpo y las variables que exige."),
    "auditoria": (
        "Bitácora de auditoría: quién hizo qué sobre qué entidad, con los valores anteriores "
        "y nuevos, motivo, IP y navegador."),
    "reportes": (
        "Exportaciones generadas (PDF o XLSX): título, archivo, quién lo pidió y de qué "
        "horario o corrida salió."),
}

# ---------------------------------------------------------------- tipos ENUM

TIPOS_DESC = {
    "accion_permiso": "Las acciones que puede conceder un permiso: leer, crear, actualizar, eliminar, generar, aprobar, publicar, archivar, importar, exportar y administrar.",
    "canal_notificacion": "Por dónde sale un aviso. Hoy solo `interno`: la base no envía correo.",
    "dia_semana": "Los siete días. Impide que un día llegue como texto libre («Lunes», «lun», «LUNES»).",
    "estado_cohorte": "Ciclo de vida de un grupo: activa, inactiva, egresada, archivada.",
    "estado_evento_sustitucion": "Estado de una sustitución: activo, anulado o finalizado.",
    "estado_generacion": "Estado de una corrida del motor: pendiente, generando, completada, fallida, inviable o cancelada.",
    "estado_horario": "Ciclo de vida de un plan: borrador → generando → generado → en revisión → pendiente de aprobación → aprobado → publicado → archivado (más fallido e inviable).",
    "estado_importacion": "Estado de una carga: recibida, validando, aplicada, rechazada o fallida.",
    "estado_notificacion": "Estado de un aviso: pendiente, enviada, leída o fallida.",
    "estado_pensum": "Estado de un plan de estudios: borrador, vigente, en retiro o archivado.",
    "estado_periodo": "Estado de un período académico: borrador, vigente, cerrado o archivado.",
    "estado_sugerencia_seccion": "Estado de una sugerencia de sección: pendiente, aprobada, rechazada, aplicada o cancelada.",
    "estado_usuario": "Estado de una cuenta: activo, inactivo o bloqueado. Solo `activo` puede operar.",
    "estado_ventana_disponibilidad": "Estado de la ventana de captura: programada, abierta, cerrada o cancelada.",
    "formato_reporte": "Formatos de exportación admitidos: pdf y xlsx.",
    "nivel_severidad": "Gravedad de un conflicto o mensaje: baja, media, alta o crítica.",
    "tipo_archivo_importacion": "Formatos de archivo que acepta la importación: csv y xlsx.",
    "tipo_aula": "Clase de salón: teórica, laboratorio, mixta o virtual.",
    "tipo_evento_sustitucion": "Qué clase de evento es: sustitución temporal, sustitución permanente, permiso por ausencia o cancelación de sesión.",
    "tipo_plan_horario": "Qué se está programando: clases o exámenes.",
    "tipo_usuario": "Perfil de la persona: superadministrador, coordinador académico, decano, docente o alumno.",
}

# ---------------------------------------------------------------- vistas

VISTAS = {
    "api_auditoria": ("Vistas api_* · atajos del cliente",
        "La bitácora de auditoría con el nombre del usuario ya resuelto, para listarla sin joins."),
    "api_cohortes_activas": ("Vistas api_* · atajos del cliente",
        "Cohortes activas de cada período con su semestre, matrícula y sección."),
    "api_cursos_periodo": ("Vistas api_* · atajos del cliente",
        "Cursos que toca dictar en un período, derivados de las cohortes activas. Aplica la misma regla que el motor: pensum de la cohorte × semestre en que está esa cohorte."),
    "api_recursos_aula": ("Vistas api_* · atajos del cliente",
        "Qué recursos tiene cada aula y en qué cantidad, contando solo recursos activos."),
    "api_resumen_importaciones": ("Vistas api_* · atajos del cliente",
        "Resumen por importación: archivo, estado y filas aceptadas, rechazadas y pendientes."),
    "vista_horarios_publicados": ("Vistas vista_* · lectura pesada",
        "El horario publicado aplanado: facultad, carrera, jornada, cohorte, curso, docente y aula en una sola fila. Base de las funciones de consulta."),
    "vista_sustituciones_activas": ("Vistas vista_* · lectura pesada",
        "Las sustituciones que están vigentes hoy: filtra por estado activo y por las fechas que corresponden a cada tipo de evento."),
    "vista_horarios_publicados_con_sustituciones": ("Vistas vista_* · lectura pesada",
        "Las dos vistas anteriores combinadas: el horario publicado ya con la sustitución aplicada. Es la que consulta el público final."),
}

# ---------------------------------------------------------------- funciones

G_SEG = "Seguridad y permisos"
G_ACA = "Academia y catálogos"
G_DOC = "Docentes"
G_PLAN = "Planes de horario"
G_MOT = "Motor de generación"
G_EDI = "Edición manual y versiones"
G_CON = "Consultas de horario"
G_IMP = "Importación y mantenimiento"
T_MARCA = "Trigger · marca de tiempo y versión"
T_VALID = "Trigger · validación"
T_COMPL = "Trigger · completar y derivar"
T_PROP = "Trigger · propagación"
T_BLOQ = "Trigger · bloqueo e inmutabilidad"

FUNCIONES = {
    # --- seguridad
    "usuario_actual_id": (G_SEG,
        "Traduce el JWT de Supabase al id de nuestra tabla `usuarios`. Devuelve NULL si no hay sesión o si el usuario está inactivo o borrado.",
        "Es el puente entre Supabase Auth y el sistema. Al filtrar por `estado = 'activo'`, dar de baja a alguien lo deja fuera aunque su token siga siendo válido."),
    "usuario_actual_tiene_permiso": (G_SEG,
        "¿El usuario de la sesión puede hacer (recurso, acción)? Es la función que evalúan casi todas las políticas RLS.",
        "Una sola función sostiene las 242 políticas: se cambia aquí y cambia el control de acceso de todo el esquema."),
    "usuario_tiene_permiso": (G_SEG,
        "Lo mismo, pero para un usuario indicado a mano. No es SECURITY DEFINER, así que respeta RLS.", ""),
    "crear_usuario_inicial": (G_SEG,
        "Da de alta al usuario en `usuarios` y le asigna su rol después de que se registró en Supabase Auth.", ""),
    "listar_permisos_usuario": (G_SEG,
        "Devuelve en JSON los pares {recurso, acción} que el usuario tiene por sus roles.", ""),
    "listar_roles_usuario": (G_SEG, "Roles asignados al usuario, en JSON.", ""),
    "obtener_alcance_usuario": (G_SEG,
        "Hasta dónde ve esa persona: su `docente_id` si es docente y las facultades que tiene asignadas.", ""),
    # --- academia
    "crear_cohorte": (G_ACA,
        "Crea una cohorte (carrera + pensum + jornada + año + sección) validando que la combinación sea coherente.", ""),
    "activar_cohorte_periodo": (G_ACA,
        "Activa una cohorte en un período y le fija semestre y matrícula. Es un UPSERT: si ya estaba, la actualiza.", ""),
    "crear_agrupacion_area_comun": (G_ACA,
        "Define un área común: curso principal, cursos que la integran y cohortes que asisten juntas.", ""),
    "actualizar_agrupacion_area_comun": (G_ACA,
        "Reemplaza por completo los cursos y las cohortes de una agrupación existente.", ""),
    "listar_agrupaciones_area_comun": (G_ACA,
        "Agrupaciones de área común de un período con sus cursos y cohortes, en JSON.", ""),
    "asignar_recurso_aula": (G_ACA,
        "Registra cuántas unidades de un recurso tiene un aula. UPSERT: si ya existía, ajusta la cantidad.", ""),
    # --- docentes
    "autorizar_curso_docente": (G_DOC,
        "Autoriza a un docente a impartir un curso, con alcance opcional por carrera, facultad o jornada.", ""),
    "revocar_curso_docente": (G_DOC,
        "Retira la autorización marcando `esta_vigente = false`. No borra el historial.", ""),
    "guardar_disponibilidad_docente": (G_DOC,
        "Guarda las franjas que declara el docente y las expande a bloques concretos en `disponibilidad_docente_slots`.",
        "Al motor no le sirven franjas: necesita bloques. La expansión ocurre aquí, una sola vez, y no en cada corrida."),
    "obtener_disponibilidad_docente": (G_DOC,
        "Devuelve la disponibilidad guardada de un docente en un período, lista para pintar la grilla.", ""),
    # --- planes
    "crear_plan_horario": (G_PLAN,
        "Crea el plan en estado `borrador` y fija su alcance: qué carreras y qué jornadas entran.", ""),
    "fijar_alcance_plan": (G_PLAN,
        "Cambia las carreras y jornadas del plan. Solo se permite mientras sigue en `borrador`.", ""),
    "cambiar_estado_plan": (G_PLAN,
        "Mueve el plan de un estado a otro y deja rastro en el historial. Usa bloqueo optimista: si otra persona lo cambió antes, la operación falla en vez de pisar su trabajo.",
        "Es el ejemplo canónico de `version_fila`: el UPDATE lleva `AND version_fila = <la que leí>`; si afecta cero filas, alguien se adelantó."),
    "plan_es_completo_y_valido": (G_PLAN,
        "¿Este plan se puede publicar? Exige sesiones colocadas, cero pendientes, cero conflictos duros y el contador de violaciones duras en cero.", ""),
    "conteos_revision_plan": (G_PLAN,
        "Revisión previa a generar: cuenta qué hay y qué falta para el alcance elegido, antes de gastar una corrida.", ""),
    # --- motor
    "iniciar_generacion": (G_MOT,
        "Abre una corrida del motor en estado `generando`. La `clave_solicitud` impide que un doble clic lance dos corridas iguales.", ""),
    "finalizar_generacion": (G_MOT,
        "Cierra la corrida y guarda todo el resultado: estado, duración, violaciones, puntajes, sesiones, pendientes, conflictos y mensajes.", ""),
    "guardar_resultado_generacion": (G_MOT,
        "Reemplaza por completo el horario del plan: borra el resultado anterior y escribe el nuevo.",
        "Es un reemplazo total, no una fusión. Por eso las tablas de resultado se consideran desechables entre corridas."),
    "obtener_generacion": (G_MOT, "Estado y resultado de una corrida concreta.", ""),
    "listar_generaciones_plan": (G_MOT, "Historial de corridas de un plan, de la más reciente a la más antigua.", ""),
    "diagnosticar_sistema": (G_MOT,
        "Tablero de salud: planes que no se pueden publicar, sesiones sin asignar e importaciones atascadas.", ""),
    # --- edición
    "crear_version_derivada": (G_EDI,
        "Clona un horario publicado para poder mover una sesión sin tocar el original. Toma un advisory lock para que dos ediciones simultáneas no se pisen.",
        "Un horario publicado es un documento oficial: ya lo vieron estudiantes y docentes. No se edita, se deriva."),
    "guardar_reparacion_version": (G_EDI,
        "Aplica al horario derivado las reubicaciones que calculó el motor de reparación.", ""),
    "comparar_version_horario": (G_EDI,
        "Diferencias entre la versión derivada y su horario de origen: qué se movió y a dónde.", ""),
    # --- consultas
    "consultar_horarios": (G_CON,
        "Consulta paginada y filtrada del horario (por carrera, jornada, cohorte, docente o aula). Los últimos parámetros aplican el alcance del usuario.", ""),
    "consultar_horario_publicado": (G_CON,
        "Igual que la anterior pero solo sobre lo publicado. Es la que alimenta la vista pública.", ""),
    "consultar_revision_horario": (G_CON,
        "La vista de revisión previa a aprobar, con los mismos filtros y paginación.", ""),
    "consultar_datos_reporte": (G_CON,
        "Arma encabezados y filas para exportar a PDF o XLSX. Exige que la generación esté `completada`.", ""),
    "listar_cohortes_publicadas": (G_CON,
        "Opciones del selector público: las cohortes que ya tienen horario publicado, con etiqueta legible.", ""),
    "listar_sustituciones_publicadas": (G_CON,
        "Sustituciones vigentes en una fecha para un horario publicado.", ""),
    # --- importación y mantenimiento
    "confirmar_importacion": (G_IMP,
        "Aplica un archivo ya validado: registra la importación y vuelca las filas a los catálogos que correspondan.", ""),
    "restaurar_entidad": (G_IMP,
        "Deshace un borrado lógico poniendo `eliminado_en = NULL`. Solo sobre una lista blanca de tablas.",
        "Existe porque nada se borra de verdad: el borrado marca fecha. Con DELETE real esto sería imposible."),
    # --- funciones de trigger
    "actualizar_marca": (T_MARCA,
        "Antes de cada UPDATE pone `actualizado_en = now()`. Para las tablas que no llevan `version_fila`.", ""),
    "actualizar_marca_con_version": (T_MARCA,
        "Antes de cada UPDATE pone `actualizado_en = now()` y sube `version_fila` en uno. Es el motor del bloqueo optimista.",
        "Está enganchada a 17 tablas. Nadie escribe esos dos campos a mano."),
    "validar_cohorte_periodo": (T_VALID,
        "Rechaza activar una cohorte que no existe o no está activa, o con un semestre que excede la carrera o el pensum.", ""),
    "validar_descanso_en_jornada": (T_VALID,
        "Rechaza un receso cuyo día no pertenece a la jornada o que se sale de los bloques del día.", ""),
    "validar_disponibilidad_slot": (T_VALID,
        "Rechaza un bloque de disponibilidad que no existe en esa jornada.", ""),
    "validar_sesion_en_jornada": (T_VALID,
        "Rechaza una sesión que no cabe en su jornada: día no activo o bloques fuera del rango del día.", ""),
    "validar_horario_publicable": (T_VALID,
        "Impide pasar un horario a publicado si no cumple los requisitos de publicación.", ""),
    "validar_importacion_plantilla": (T_VALID,
        "Rechaza un archivo que no coincide con la plantilla vigente y su versión.", ""),
    "validar_sustitucion_docente_original": (T_VALID,
        "Comprueba que fechas y docentes de una sustitución son coherentes con el tipo de evento.", ""),
    "completar_sesion_cohorte": (T_COMPL,
        "Rellena en `sesion_cohortes` los campos copiados de la sesión (día, bloques, minutos) para que la tabla desnormalizada quede consistente.", ""),
    "aplicar_receso_a_sesion": (T_COMPL,
        "Traduce bloques a minutos de reloj insertando el receso de la jornada. Si al correrse la sesión se sale del día, aborta.",
        "El motor razona en bloques y no sabe nada de recesos; este trigger es el que convierte esos bloques en horas reales."),
    "propagar_cambio_sesion_a_cohortes": (T_PROP,
        "Después de mover una sesión, replica el nuevo día y hora en las filas de `sesion_cohortes`.", ""),
    "revalidar_cohortes_de_sesion": (T_PROP,
        "Cuando cambia algo estructural de la sesión, vuelve a validar las cohortes asociadas.", ""),
    "bloquear_horario_publicado": (T_BLOQ,
        "Rechaza cualquier INSERT, UPDATE o DELETE sobre las tablas de un horario ya publicado.",
        "Para cambiar un horario publicado hay que crear una versión derivada. Esta es la barrera que lo obliga."),
    "bloquear_generacion_publicada": (T_BLOQ,
        "Impide tocar la corrida del motor asociada a un horario ya publicado.", ""),
    "bloquear_eliminacion_horario_oficial": (T_BLOQ,
        "Impide borrar un horario oficial. El historial de lo publicado no se pierde.", ""),
}

# ---------------------------------------------------------------- pasos

PASOS = {
    # ---------------------------------------------------------- seguridad
    "usuario_actual_id": [
        "Lee `auth.uid()`, el identificador que viaja dentro del JWT de la petición.",
        "Busca en `usuarios` la fila con ese `auth_user_id` que esté activa y sin borrar.",
        "Devuelve su id, o NULL si no hay sesión válida.",
    ],
    "usuario_actual_tiene_permiso": [
        "Parte de `auth.uid()` y encadena usuarios → usuario_roles → roles → rol_permisos → permisos_acceso.",
        "Descarta usuarios inactivos o borrados y roles borrados.",
        "Devuelve `true` si aparece al menos una fila con ese par (recurso, acción).",
    ],
    "usuario_tiene_permiso": [
        "Hace el mismo recorrido de roles y permisos, pero partiendo del id que se le pasa en vez del JWT.",
        "Exige que ese usuario esté activo y sin borrar.",
        "Devuelve `true` si el par (recurso, acción) aparece.",
    ],
    "crear_usuario_inicial": [
        "Exige que el usuario autenticado sea el mismo del perfil que se pide crear.",
        "Toma un advisory lock para que dos registros simultáneos no creen dos usuarios iniciales.",
        "Si ese `auth_user_id` ya tiene ficha, la devuelve tal cual: repetir la llamada no duplica nada.",
        "Si ya existe cualquier otro usuario vivo, falla: esta función es solo para el primero.",
        "Crea la fila en `usuarios` y le asigna el rol indicado.",
    ],
    "listar_permisos_usuario": [
        "Recorre los roles del usuario y los permisos de cada rol.",
        "Quita duplicados y ordena por recurso y acción.",
        "Devuelve `[]` cuando no hay ninguno, nunca `null`.",
    ],
    "listar_roles_usuario": [
        "Une `usuario_roles` con `roles`, descartando los roles borrados.",
        "Devuelve los nombres ordenados alfabéticamente, o `[]`.",
    ],
    "obtener_alcance_usuario": [
        "Lee el `docente_id` de la ficha del usuario.",
        "Le agrega la lista de facultades que tiene asignadas.",
        "Si el usuario no existe, devuelve un alcance vacío en vez de fallar.",
    ],
    # ---------------------------------------------------------- academia
    "crear_cohorte": [
        "Registra de paso la pareja carrera–jornada en `carrera_jornadas` si aún no existía.",
        "Inserta la cohorte y devuelve la fila completa.",
        "El resto de la validación la imponen el índice único de identidad y las llaves foráneas.",
    ],
    "activar_cohorte_periodo": [
        "Intenta insertar la cohorte en el período.",
        "Si ya existía —lo decide el índice único entre filas vivas—, actualiza semestre y matrícula, la reactiva y sube `version_fila`.",
        "Todo ocurre en una sola sentencia atómica, sin consultar antes si existe.",
    ],
    "crear_agrupacion_area_comun": [
        "Inserta la cabecera de la agrupación.",
        "Vuelca los cursos y las cohortes que llegan como arreglos.",
        "Devuelve el id nuevo con sus miembros.",
    ],
    "actualizar_agrupacion_area_comun": [
        "Actualiza nombre y curso principal; si no encuentra la agrupación activa, falla.",
        "Borra todos los cursos y cohortes anteriores.",
        "Reinserta los recibidos: es un reemplazo completo, no una fusión.",
    ],
    "listar_agrupaciones_area_comun": [
        "Toma las agrupaciones activas del período.",
        "Anida en cada una sus cursos y sus cohortes.",
        "Ordena por nombre y devuelve `[]` si no hay ninguna.",
    ],
    "asignar_recurso_aula": [
        "Inserta el recurso en el aula.",
        "Si esa pareja ya existía, solo ajusta la cantidad.",
    ],
    # ---------------------------------------------------------- docentes
    "autorizar_curso_docente": [
        "Inserta la autorización; si ya existía, no la duplica.",
        "En ese caso busca la vigente que coincida exactamente en carrera, facultad y jornada.",
        "Falla si no logró ni crearla ni encontrarla; si no, devuelve la fila.",
    ],
    "revocar_curso_docente": [
        "Marca la autorización como no vigente, le pone `eliminado_en` y sube `version_fila`.",
        "Solo actúa sobre autorizaciones que seguían vigentes.",
        "Devuelve `true` si llegó a tocar una fila.",
    ],
    "guardar_disponibilidad_docente": [
        "Crea o actualiza la cabecera de disponibilidad de ese docente en ese período.",
        "Borra los bloques anteriores y vuelve a insertar los recibidos.",
        "De cada bloque comprueba contra su jornada que el día esté activo y el índice caiga dentro de los bloques del día.",
        "Si un bloque no encaja en su jornada, aborta la operación entera.",
    ],
    "obtener_disponibilidad_docente": [
        "Lee la cabecera del docente en el período.",
        "Anida sus bloques ordenados por día e índice.",
        "Devuelve la lista de bloques vacía si aún no declaró nada.",
    ],
    # ---------------------------------------------------------- planes
    "crear_plan_horario": [
        "Toma un advisory lock por período y tipo, para que dos solicitudes simultáneas no reciban el mismo número de versión.",
        "Calcula el número de versión siguiente y crea el plan en estado `borrador`.",
        "Delega en `fijar_alcance_plan` las carreras y jornadas recibidas.",
    ],
    "fijar_alcance_plan": [
        "Comprueba que el plan exista y siga en `borrador`; si no, falla con un código propio.",
        "Borra el alcance anterior.",
        "Reinserta las carreras y jornadas recibidas.",
    ],
    "cambiar_estado_plan": [
        "Actualiza el plan exigiendo a la vez el estado anterior y la `version_fila` que traía quien llama.",
        "Sella fecha y responsable de aprobación o de publicación, según el estado nuevo.",
        "Si el UPDATE no afectó ninguna fila, lanza `conflicto_version`: alguien se adelantó.",
        "Registra la transición en `historial_estados_horario`.",
    ],
    "plan_es_completo_y_valido": [
        "Comprueba cuatro condiciones unidas por `and`: hay sesiones, no quedan pendientes, no hay conflictos duros y el contador de violaciones duras está en cero.",
        "Si el plan ni existe, devuelve `false` en lugar de nulo.",
    ],
    "conteos_revision_plan": [
        "Arma el alcance: las cohortes activas del período, filtradas por las carreras y jornadas dadas.",
        "Cuenta cohortes, cohortes sin cursos en su semestre, aulas activas, docentes autorizados y docentes con disponibilidad confirmada.",
        "Devuelve todo junto para la pantalla previa a generar.",
    ],
    # ---------------------------------------------------------- motor
    "iniciar_generacion": [
        "Inserta la corrida en estado `generando`, con la instantánea de entrada y la clave de solicitud.",
        "Devuelve la corrida ya formateada, reutilizando `obtener_generacion`.",
    ],
    "finalizar_generacion": [
        "Cierra la corrida solo si seguía en `generando`; si no, falla.",
        "Guarda duración, violaciones, puntajes y el resultado completo.",
        "Vuelca los mensajes recibidos a `mensajes_generacion`.",
        "Si terminó `completada` o `inviable`, llama a `guardar_resultado_generacion` para escribir el horario.",
        "Una corrida fallida o cancelada no toca el horario anterior.",
    ],
    "guardar_resultado_generacion": [
        "Borra el resultado anterior del plan: sesiones, cohortes de sesión, pendientes y conflictos.",
        "Inserta las sesiones nuevas y, por cada una, las cohortes que asisten.",
        "Inserta lo que no se pudo colocar y los conflictos con sus sesiones.",
        "Recalcula las violaciones duras —conflictos duros más pendientes— y las guarda en el plan.",
        "Devuelve cuántas sesiones quedaron guardadas.",
    ],
    "obtener_generacion": [
        "Arma un objeto con estado, tiempos, violaciones y puntajes de la corrida.",
        "Le anida sus mensajes ordenados por fecha.",
    ],
    "listar_generaciones_plan": [
        "Toma las corridas del plan.",
        "Formatea cada una con `obtener_generacion` y las ordena de la más reciente a la más antigua.",
    ],
    "diagnosticar_sistema": [
        "Cuenta horarios no publicables (con violaciones duras o con pendientes), sesiones sin asignar e importaciones atascadas.",
        "Marca `listo` cuando los tres contadores están en cero.",
        "Devuelve además los hallazgos redactados en texto.",
    ],
    # ---------------------------------------------------------- edición
    "crear_version_derivada": [
        "Toma un advisory lock sobre el horario de origen.",
        "Si esa misma `clave_solicitud` ya había creado una versión, la devuelve sin duplicar nada.",
        "Clona la cabecera del horario publicado con número de versión nuevo y estado `borrador`.",
        "Arma un mapa de ids viejo→nuevo y copia con él todas las sesiones y sus cohortes.",
        "Aplica sobre la sesión elegida los cambios recibidos y la deja fijada.",
        "Registra el intento en `resultados_edicion` como pendiente de reparación; el horario original queda intacto.",
    ],
    "guardar_reparacion_version": [
        "Si la reparación fue exitosa, aplica cada reubicación a `sesiones` y refleja el cambio en `sesion_cohortes`.",
        "Registra el resultado en `resultados_edicion`, haya salido bien o mal.",
    ],
    "comparar_version_horario": [
        "Localiza el horario de origen y el último resultado de edición de la versión derivada.",
        "Recupera el mapa de sesiones origen→derivada que se guardó al crearla.",
        "Compara docente, aula, jornada, día, bloque y duración de cada pareja, y se queda solo con lo que difiere.",
        "Añade los conflictos duros que quedaron en la versión derivada.",
    ],
    # ---------------------------------------------------------- consultas
    "consultar_horarios": [
        "Filtra la vista de horarios publicados por cada parámetro que no venga nulo.",
        "Aplica el alcance: si no es consulta pública ni «ver todo», deja solo lo del propio docente o lo de sus facultades.",
        "Ordena y pagina, con un tamaño de página de 200 como techo.",
        "Devuelve los elementos junto con página, tamaño y total.",
    ],
    "consultar_horario_publicado": [
        "Filtra la misma vista, que ya trae la sustitución vigente aplicada.",
        "Aplica el mismo alcance por docente y por facultades.",
        "Añade un aviso legible cuando la sesión tiene sustitución, ausencia o cancelación.",
        "Devuelve como mucho 1 000 filas.",
    ],
    "consultar_revision_horario": [
        "Junta sesiones, cursos, docentes, aulas, jornadas y cohortes del horario indicado.",
        "Filtra por los parámetros dados y por el alcance del usuario.",
        "Pagina las sesiones y agrega, aparte, los conflictos y las sesiones pendientes.",
        "Devuelve todo en un solo objeto para la pantalla de revisión.",
    ],
    "consultar_datos_reporte": [
        "Localiza el plan de esa generación y exige que su estado sea `completada`.",
        "Si la vista pedida es `diagnostico`, arma la tabla con los mensajes de la corrida.",
        "Si no, arma la tabla del horario —carrera, cohorte, curso, docente, aula, jornada, día, bloque y duración— aplicando los filtros.",
        "Devuelve encabezados y filas ya listos para exportar.",
    ],
    "listar_cohortes_publicadas": [
        "Saca las cohortes distintas de la vista de horarios publicados.",
        "Arma para cada una la etiqueta «carrera · jornada · año-sección».",
        "Ordena por etiqueta y devuelve `[]` si no hay nada publicado.",
    ],
    "listar_sustituciones_publicadas": [
        "Recorre las sustituciones activas de las sesiones de ese horario, exigiendo que el horario esté publicado.",
        "Deja solo las vigentes en la fecha pedida según su tipo: la temporal por rango de fechas, la permanente desde su fecha de cambio.",
    ],
    # ---------------------------------------------------------- importación
    "confirmar_importacion": [
        "Crea la importación enlazándola con la plantilla vigente de ese código y versión; si no la encuentra, falla.",
        "Recorre las filas recibidas y, según la sección de cada una (facultades, carreras, cursos, aulas, docentes, disponibilidades…), inserta o actualiza el catálogo que corresponda.",
        "Si una fila no llega a afectar ningún registro, aborta la carga entera: no queda a medias.",
        "Marca la importación como `aplicada` y devuelve el resumen.",
    ],
    "restaurar_entidad": [
        "Comprueba que la tabla esté en la lista blanca de diez catálogos restaurables.",
        "Pone `eliminado_en` en nulo y sube `version_fila`; exige haber afectado exactamente una fila.",
        "Deja constancia en `auditoria` y avisa al usuario con una notificación.",
    ],
    # ---------------------------------------------------------- triggers
    "actualizar_marca": [
        "Pone `actualizado_en = now()` en la fila que se está guardando.",
    ],
    "actualizar_marca_con_version": [
        "Pone `actualizado_en = now()`.",
        "Sube `version_fila` en uno respecto de la fila anterior.",
    ],
    "validar_cohorte_periodo": [
        "Lee la cohorte y la duración de su carrera; falla si no existe o no está activa.",
        "Rechaza un semestre mayor que la duración de la carrera.",
        "Si se está activando, exige que el pensum tenga cursos para ese semestre.",
    ],
    "validar_descanso_en_jornada": [
        "Carga la jornada del receso.",
        "Rechaza un día que no esté entre los activos de esa jornada.",
        "Rechaza un receso que se salga de los bloques del día.",
    ],
    "validar_disponibilidad_slot": [
        "Carga días activos y bloques de la jornada; falla si no existe o está inactiva.",
        "Rechaza días no activos y bloques fuera de rango.",
        "Rechaza un bloque que caiga sobre un receso de la jornada.",
    ],
    "validar_sesion_en_jornada": [
        "Comprueba que la jornada esté activa, que el día lo esté y que la sesión quepa en los bloques del día.",
        "Calcula `minuto_inicio_dia` y `minuto_fin_dia` a partir del bloque y la duración, y rechaza si se pasa del fin de jornada o cae sobre un receso.",
        "En planes de clases prohíbe la fecha concreta; en exámenes la exige, dentro del período y coincidiendo con el día declarado.",
        "Si es área común, exige que la agrupación esté activa, sea del mismo período y contenga el curso.",
        "Exige docente activo y autorizado, y aula activa, del tipo requerido y con los recursos que pide el curso.",
        "Comprueba que la matrícula no supere la capacidad del aula y que el docente esté disponible en todos los bloques.",
    ],
    "validar_horario_publicable": [
        "Solo actúa cuando el estado pasa a pendiente de aprobación, aprobado o publicado.",
        "Exige cero violaciones duras, cero conflictos duros, cero pendientes y al menos una sesión, todas con cohorte.",
        "Comprueba cada sesión: cohorte activa en el período, misma jornada, curso dentro del pensum y semestre, docente autorizado y área común completa y con un solo docente.",
        "Verifica aulas compatibles y con recursos, capacidad suficiente, un solo docente por curso y cohorte, disponibilidad confirmada y respeto de la carga máxima.",
        "En planes de clases exige además que se cubran los bloques semanales exactos del pensum.",
        "Exige aprobador y publicador con sus fechas, y admite solo las transiciones de estado permitidas.",
    ],
    "validar_importacion_plantilla": [
        "Si la importación trae plantilla, comprueba que exista y que acepte ese tipo de archivo.",
        "Rellena la versión de plantilla si venía vacía, o falla si no coincide con la vigente.",
        "Sella `finalizada_en` cuando la importación llega a un estado final.",
    ],
    "validar_sustitucion_docente_original": [
        "Lee la sesión afectada con su horario y período, y exige que el horario esté publicado.",
        "Comprueba que el docente original coincida con el de la sesión.",
        "Exige que todas las fechas del evento caigan dentro del período académico.",
        "Si hay docente entrante: que esté activo, autorizado para todas las cohortes de la sesión, libre en ese bloque y disponible en él.",
    ],
    "completar_sesion_cohorte": [
        "Copia de la sesión el horario, la fecha, el día, los bloques y los minutos.",
        "Comprueba que la cohorte exista, esté activa, participe en el período y sea de la misma jornada que la sesión.",
        "Resuelve qué curso del pensum le toca a esa cohorte —por la agrupación, si es área común— y lo guarda en `curso_en_pensum_id` y `curso_visible_id`.",
        "Exige docente autorizado, un solo docente por curso y cohorte, y aula compatible con recursos suficientes.",
        "Suma la matrícula de todas las cohortes de la sesión y rechaza si supera la capacidad del aula.",
    ],
    "aplicar_receso_a_sesion": [
        "Carga la jornada de la sesión.",
        "Si la sesión empieza después del receso, corre inicio y fin; si lo cruza, corre solo el fin.",
        "Si al correrse se pasa del fin de la jornada, aborta.",
    ],
    "propagar_cambio_sesion_a_cohortes": [
        "Copia a todas las filas de `sesion_cohortes` de esa sesión el horario, la fecha, el día, los bloques y los minutos nuevos.",
    ],
    "revalidar_cohortes_de_sesion": [
        "Reescribe las filas de `sesion_cohortes` de la sesión sin cambiarles el valor.",
        "Ese UPDATE en apariencia vacío vuelve a disparar las validaciones de `completar_sesion_cohorte`.",
    ],
    "bloquear_horario_publicado": [
        "Toma el `horario_id` de la fila nueva o de la vieja, según sea alta, cambio o baja.",
        "Si ese horario está publicado o archivado, aborta con excepción.",
    ],
    "bloquear_generacion_publicada": [
        "Mira el `plan_id` de la corrida.",
        "Si el horario de ese plan está publicado o archivado, aborta.",
    ],
    "bloquear_eliminacion_horario_oficial": [
        "Si el horario que se intenta borrar está aprobado, publicado o archivado, aborta.",
    ],
}

# ---------------------------------------------------------------- políticas RLS

P_CAT = "Políticas · catálogo"
P_PLAN = "Políticas · planes y motor"
P_DOC = "Políticas · docentes"
P_PROP = "Políticas · solo lo propio"
P_IMP = "Políticas · importación"
P_BIT = "Políticas · bitácora y operación"

POLITICAS = {
    "api_catalogo_leer": (P_CAT, "Leer el catálogo: basta con tener sesión activa en el sistema."),
    "api_catalogo_insertar": (P_CAT, "Insertar en el catálogo: exige permiso ('academia','crear') o ser administrador de auditoría."),
    "api_catalogo_actualizar": (P_CAT, "Actualizar el catálogo: exige permiso ('academia','crear') o ser administrador de auditoría."),
    "api_catalogo_eliminar": (P_CAT, "Eliminar del catálogo: exige permiso ('academia','crear') o ser administrador de auditoría."),
    "api_planes_leer": (P_PLAN, "Leer planes y su resultado: sirve permiso sobre planes, consultas, motor o reportes."),
    "api_planes_insertar": (P_PLAN, "Escribir planes: exige crear o actualizar planes, o generar con el motor."),
    "api_planes_actualizar": (P_PLAN, "Modificar planes: exige actualizar, aprobar o publicar planes, o generar con el motor."),
    "api_planes_transversal_actualizar": (P_PLAN, "Modificación transversal reservada a quien aprueba o publica planes, o administra auditoría."),
    "api_planes_eliminar": (P_PLAN, "Borrar filas de un plan: exige permiso ('planes','actualizar')."),
    "api_docentes_leer": (P_DOC, "Leer datos de docentes: sirve permiso sobre docentes, planes o motor."),
    "api_docentes_insertar": (P_DOC, "Alta de datos de docentes: exige permiso ('docentes','actualizar')."),
    "api_docentes_actualizar": (P_DOC, "Modificar datos de docentes: exige permiso ('docentes','actualizar')."),
    "api_docentes_eliminar": (P_DOC, "Borrar datos de docentes: exige permiso ('docentes','actualizar')."),
    "api_docentes_escribir": (P_DOC, "Escritura sobre la ficha del docente en cualquier operación: exige permiso ('docentes','actualizar')."),
    "api_sustituciones_leer": (P_DOC, "Ver sustituciones: basta con tener sesión activa."),
    "api_sustituciones_escribir": (P_DOC, "Registrar sustituciones: exige permiso ('sustituciones','crear') y que quien registra sea el propio usuario."),
    "api_usuario_propio": (P_PROP, "Cada quien lee su propia ficha de usuario, y solo si no está borrada."),
    "api_roles_propios": (P_PROP, "Cada quien ve los roles que tiene asignados."),
    "api_permisos_roles_propios": (P_PROP, "Cada quien ve los permisos de los roles que tiene."),
    "api_facultades_propias": (P_PROP, "Cada quien ve las facultades que le fueron asignadas."),
    "api_notificaciones_propias": (P_PROP, "Cada quien lee solo las notificaciones dirigidas a él."),
    "api_notificaciones_insertar": (P_PROP, "Solo se pueden crear notificaciones dirigidas a uno mismo."),
    "api_reportes_propios": (P_PROP, "Cada quien ve solo los reportes que generó."),
    "api_reportes_insertar": (P_PROP, "Generar un reporte exige permiso ('reportes','exportar') y quedar registrado como su autor."),
    "api_roles_catalogo": (P_PROP, "El catálogo de roles vivos es visible para cualquier sesión activa."),
    "api_permisos_catalogo": (P_PROP, "El catálogo de permisos es visible para cualquier sesión activa."),
    "api_plantillas_notificacion_leer": (P_PROP, "Las plantillas de aviso son visibles para cualquier sesión activa."),
    "api_importaciones": (P_IMP, "Todo el flujo de importación exige permiso ('importaciones','importar')."),
    "api_importaciones_diagnostico": (P_IMP, "Quien puede leer planes ve el diagnóstico de importaciones, para saber por qué falta información."),
    "api_importar_catalogo_insertar": (P_IMP, "La importación puede insertar en los catálogos: exige permiso ('importaciones','importar')."),
    "api_importar_catalogo_actualizar": (P_IMP, "La importación puede actualizar catálogos: exige importar o administrar auditoría."),
    "api_auditoria_leer": (P_BIT, "Leer la bitácora exige permiso ('auditoria','leer')."),
    "api_auditoria_insertar": (P_BIT, "Solo se pueden escribir entradas de auditoría a nombre propio."),
    "api_usuarios_para_auditoria": (P_BIT, "Quien audita puede ver la lista de usuarios para resolver nombres."),
    "api_historial_aprobacion_insertar": (P_BIT, "Solo quien aprueba o publica planes puede escribir en el historial de estados."),
    "api_sugerencias_leer": (P_BIT, "Ver sugerencias de sección exige permiso ('academia','leer')."),
    "api_sugerencias_insertar": (P_BIT, "Pedir una sección nueva exige permiso ('academia','crear') y quedar registrado como solicitante."),
}

# ---------------------------------------------------------------- índices y llaves

INDICES_DESC = {
    "horarios_publicado_unico_idx": "Solo puede haber un horario publicado a la vez por período y tipo de plan. Es la regla de «un único documento oficial vigente».",
    "generaciones_plan_activa_uq": "Impide dos corridas del motor vivas al mismo tiempo sobre el mismo plan.",
    "generaciones_activas_periodo_tipo_uq": "Impide dos corridas vivas al mismo tiempo para el mismo período y tipo de plan.",
    "generaciones_clave_solicitud_plan_uq": "Idempotencia: la misma solicitud de generación no puede entrar dos veces para un plan.",
    "generaciones_clave_solicitud_periodo_tipo_uq": "Idempotencia de la solicitud de generación por período y tipo de plan.",
    "importaciones_clave_solicitud_uq": "Idempotencia: reintentar la misma importación no la duplica.",
    "notificaciones_clave_solicitud_uq": "Idempotencia: el mismo aviso no se manda dos veces.",
    "resultados_edicion_clave_solicitud_uq": "Idempotencia: mover la misma sesión dos veces por un doble clic no genera dos resultados.",
    "cohortes_identidad_uq": "La identidad de una cohorte —carrera, pensum, jornada, año y sección— no se repite entre cohortes vivas.",
    "cohorte_periodos_periodo_cohorte_uq": "Una cohorte aparece una sola vez por período.",
    "asignaciones_docente_curso_vigente_uq": "No se duplica la autorización vigente de un docente sobre el mismo curso y alcance.",
    "plantillas_importacion_vigente_uq": "Solo una plantilla vigente por código de importación.",
    "aulas_piso_numero_uq": "No hay dos aulas vivas con el mismo piso y número.",
    "horarios_periodo_tipo_version_uq": "El número de versión de un horario no se repite dentro del mismo período y tipo de plan.",
}

CONSTRAINTS_DESC = {
    "sesiones_docente_no_solapado": "Un docente no puede estar en dos clases a la vez. Lo garantiza la base con una restricción de exclusión, no el código de la aplicación.",
    "sesiones_aula_no_solapada": "Dos clases no pueden ocupar el mismo salón a la misma hora.",
    "sesion_cohortes_no_solapadas": "Un mismo grupo de estudiantes no puede tener dos clases encima.",
    "jornada_descansos_no_solapados": "Dos recesos de la misma jornada no pueden pisarse.",
}

ON_DELETE_TXT = {
    "CASCADE": "al borrar el padre se borran también estas filas",
    "RESTRICT": "no deja borrar el padre mientras existan estas filas",
    "SET NULL": "al borrar el padre la columna queda en NULL",
    "SET DEFAULT": "al borrar el padre la columna vuelve a su valor por defecto",
    "NO ACTION": "rechaza el borrado del padre si quedan filas apuntando",
}

# ---------------------------------------------------------------- parámetros


def firma(sql: str) -> str:
    """Texto entre paréntesis de la cabecera CREATE FUNCTION, con anidamiento."""
    i = sql.index("(", sql.index("CREATE FUNCTION"))
    hondo, j = 0, i
    while j < len(sql):
        if sql[j] == "(":
            hondo += 1
        elif sql[j] == ")":
            hondo -= 1
            if hondo == 0:
                return sql[i + 1:j]
        j += 1
    return ""


def partir_argumentos(texto: str) -> list[str]:
    """Corta por las comas de primer nivel: numeric(12,4) no debe partirse."""
    partes, hondo, actual, comilla = [], 0, "", False
    for c in texto:
        if comilla:
            actual += c
            comilla = c != "'"
            continue
        if c == "'":
            comilla = True
        elif c in "([":
            hondo += 1
        elif c in ")]":
            hondo -= 1
        elif c == "," and hondo == 0:
            partes.append(actual.strip())
            actual = ""
            continue
        actual += c
    if actual.strip():
        partes.append(actual.strip())
    return partes


def parametros(sql: str) -> list[dict]:
    salida = []
    for arg in partir_argumentos(firma(sql)):
        arg = " ".join(arg.split())
        if not arg:
            continue
        nombre, _, resto = arg.partition(" ")
        tipo, _, defecto = resto.partition(" DEFAULT ")
        # el valor por defecto viene con su cast (NULL::uuid); estorba al leerlo
        defecto = re.sub(r"::[\w.]+(\[\])?", "", defecto.strip())
        if defecto == "'{}'":
            defecto = "arreglo vacío"
        salida.append({
            "n": nombre,
            "t": tipo.strip().replace("horarios.", ""),
            "d": defecto,
        })
    return salida


# ---------------------------------------------------------------- parseo

texto = SQL.read_text(encoding="utf-8")
lineas_totales = texto.count("\n") + 1

HDR = re.compile(
    r"^--\n-- Name: (?P<name>.*?); Type: (?P<type>[A-Z ]+); Schema: (?P<schema>[^;]*); Owner: -\n--\n",
    re.M,
)

marcas = list(HDR.finditer(texto))
if not marcas:
    raise SystemExit("no se reconoció el formato del volcado")


def linea_de(offset: int) -> int:
    return texto.count("\n", 0, offset) + 1


objetos = []
cubierto = 0  # caracteres asignados a algún bloque, para verificar cobertura


def agregar(id_, nombre, cat, grupo, desc, sql, linea, tabla="", nota="", detalle="",
            claves="", params=None, pasos=None):
    objetos.append({
        "id": id_, "nombre": nombre, "cat": cat, "grupo": grupo, "desc": desc,
        "sql": sql.strip("\n"), "linea": linea, "tabla": tabla, "nota": nota,
        "detalle": detalle, "claves": claves,
        "params": params or [], "pasos": pasos or [],
    })


# --- preámbulo: todo lo anterior al primer encabezado de pg_dump ------------

preambulo = texto[: marcas[0].start()]
cubierto += len(preambulo)
corte = preambulo.index("CREATE EXTENSION")
cabecera, resto = preambulo[:corte], preambulo[corte:]
corte2 = resto.index("--\n-- PostgreSQL database dump")
extensiones, ajustes = resto[:corte2], resto[corte2:]

agregar("pre-cabecera", "Cabecera del archivo", "base", "Preámbulo",
        "Explica qué es este archivo: una foto de la base viva, no la fuente de verdad. "
        "La fuente son las migraciones de `supabase/migrations/`; aquí abajo está el comando "
        "exacto para volver a generarlo.",
        cabecera, 1, claves="regenerar pg_dump migraciones fuente de verdad")
agregar("pre-extensiones", "Extensiones (pgcrypto, btree_gist)", "base", "Preámbulo",
        "Las dos extensiones que el esquema necesita: `pgcrypto` para generar los UUID de "
        "cada fila y `btree_gist` para que los índices de exclusión sepan comparar uuid y "
        "enum, que es lo que hace posible prohibir los solapes de horario.",
        extensiones, linea_de(corte), claves="uuid gen_random_uuid exclusion gist solapes")
agregar("pre-ajustes", "Parámetros del volcado", "base", "Preámbulo",
        "Los `SET` que pg_dump escribe siempre al principio: tiempos de espera, codificación "
        "y desactivación temporal de comprobaciones mientras se restaura. No forman parte del "
        "diseño del sistema.",
        ajustes, linea_de(corte + corte2), claves="set search_path client_encoding pg_dump")

# --- un bloque por objeto --------------------------------------------------

for i, m in enumerate(marcas):
    fin = marcas[i + 1].start() if i + 1 < len(marcas) else len(texto)
    cubierto += fin - m.start()
    cuerpo = texto[m.end(): fin]
    nombre = m.group("name").strip()
    tipo = m.group("type").strip()
    linea = linea_de(m.end())
    sql = cuerpo

    # -- esquemas y comentarios
    if tipo == "SCHEMA":
        agregar(f"schema-{nombre}", f"SCHEMA {nombre}", "base", "Preámbulo",
                "Crea el esquema `horarios`, la carpeta donde vive todo lo nuestro. El resto de "
                "esquemas que aparecen en Supabase (auth, storage, realtime…) son de la "
                "plataforma y no se tocan."
                if nombre == "horarios" else
                "El esquema `public` viene de fábrica con PostgreSQL. Se deja vacío a propósito: "
                "así ninguna extensión instalada choca con nuestras tablas.",
                sql, linea, claves="esquema schema separacion")
        continue

    if tipo == "COMMENT":
        agregar(f"comment-{i}", f"COMMENT · {nombre}", "base", "Preámbulo",
                "Comentario guardado dentro de la propia base, visible desde cualquier cliente SQL.",
                sql, linea)
        continue

    # -- tipos ENUM
    if tipo == "TYPE":
        valores = re.findall(r"'([^']+)'", sql)
        agregar(f"tipo-{nombre}", nombre, "tipo",
                "Estados" if nombre.startswith("estado_") else
                ("Clasificaciones" if nombre.startswith("tipo_") else "Otros tipos"),
                TIPOS_DESC.get(nombre, "Tipo enumerado del esquema."),
                sql, linea,
                nota=f"{len(valores)} valores admitidos",
                detalle="La base rechaza cualquier valor fuera de esta lista: estos campos no son texto libre.",
                claves=" ".join(valores))
        continue

    # -- tablas
    if tipo == "TABLE":
        cols = re.findall(r"^\s{4}(\w+) ", sql, re.M)
        marcas_tabla = []
        if "eliminado_en" in cols:
            marcas_tabla.append("borrado lógico")
        if "version_fila" in cols:
            marcas_tabla.append("bloqueo optimista")
        if "clave_solicitud" in cols:
            marcas_tabla.append("idempotencia")
        if "GENERATED ALWAYS" in sql:
            marcas_tabla.append("columnas generadas")
        dom = DOM_DE.get(nombre, "operacion")
        agregar(f"tabla-{nombre}", nombre, "tabla", DOM_LABEL[dom],
                TABLAS_DESC.get(nombre, "Tabla del esquema."),
                sql, linea, tabla=nombre,
                nota=" · ".join([f"{len(cols)} columnas"] + marcas_tabla),
                claves=" ".join(cols))
        continue

    # -- vistas
    if tipo == "VIEW":
        grupo, desc = VISTAS.get(nombre, ("Vistas", "Vista del esquema."))
        invoker = "security_invoker" in sql
        agregar(f"vista-{nombre}", nombre, "vista", grupo, desc, sql, linea,
                nota="security_invoker = true · respeta RLS de quien consulta" if invoker
                     else "sin security_invoker · la usan funciones SECURITY DEFINER",
                claves="vista view join")
        continue

    # -- funciones
    if tipo == "FUNCTION":
        base = nombre.split("(")[0]
        tipos_firma = nombre[len(base):]
        grupo, desc, detalle = FUNCIONES.get(base, ("Otras funciones", "Función del esquema.", ""))
        devuelve = re.search(r"RETURNS ([\w\[\] ]+)", sql)
        lenguaje = re.search(r"LANGUAGE (\w+)", sql)
        partes = []
        if devuelve:
            partes.append(f"devuelve {devuelve.group(1).strip()}")
        if lenguaje:
            partes.append(lenguaje.group(1))
        if re.search(r"\bSTABLE\b", sql):
            partes.append("solo lee (STABLE)")
        elif re.search(r"\bIMMUTABLE\b", sql):
            partes.append("IMMUTABLE")
        elif devuelve and devuelve.group(1).strip() != "trigger":
            partes.append("escribe")
        if "SECURITY DEFINER" in sql:
            partes.append("SECURITY DEFINER")
        args = parametros(sql)
        pasos = PASOS.get(base, [])
        if base not in PASOS:
            raise SystemExit(f"falta describir la lógica de {base}")
        agregar(f"fn-{base}", base, "funcion", grupo, desc, sql, linea,
                nota=" · ".join(partes), detalle=detalle,
                claves=f"{tipos_firma} rpc funcion " + " ".join(a["n"] for a in args),
                params=args, pasos=pasos)
        continue

    # -- triggers
    if tipo == "TRIGGER":
        tabla = nombre.split()[0]
        trg = nombre.split()[1]
        mm = re.search(
            r"CREATE TRIGGER \w+ (BEFORE|AFTER|INSTEAD OF) (.*?) ON horarios\.\w+"
            r"(?: REFERENCING.*?)? FOR EACH (ROW|STATEMENT).*?EXECUTE FUNCTION horarios\.(\w+)\(",
            sql, re.S)
        momento, eventos, alcance, fn = mm.groups() if mm else ("", "", "ROW", "")
        eventos_txt = eventos.replace(" OR ", ", ").replace(" OF ", " de ")
        grupo, fdesc, _ = FUNCIONES.get(fn, ("Otros triggers", "", ""))
        grupo_trg = {
            T_MARCA: "Marca de tiempo y versión", T_VALID: "Validación",
            T_COMPL: "Completar y derivar", T_PROP: "Propagación",
            T_BLOQ: "Bloqueo e inmutabilidad",
        }.get(grupo, "Otros triggers")
        orden = ""
        if trg.startswith("zz_"):
            orden = " El prefijo `zz` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético."
        elif trg.startswith("z_"):
            orden = " El prefijo `z` lo manda al final de la fila: Postgres dispara los triggers de una tabla en orden alfabético."
        agregar(f"trg-{trg}", trg, "trigger", grupo_trg,
                f"Sobre `{tabla}`. {fdesc}", sql, linea, tabla=tabla,
                nota=f"{momento} {eventos_txt} · por {'fila' if alcance == 'ROW' else 'sentencia'} · {fn}()",
                detalle=orden.strip(), claves=f"{fn} {tabla} trigger")
        continue

    # -- índices
    if tipo == "INDEX":
        mm = re.search(r"CREATE (UNIQUE )?INDEX \w+ ON horarios\.(\w+) USING (\w+) \((.*?)\)"
                       r"(?: WHERE \((.*)\))?;", sql, re.S)
        unico = bool(mm.group(1)) if mm else False
        tabla = mm.group(2) if mm else ""
        cols = re.sub(r"\s+", " ", mm.group(4)) if mm else ""
        parcial = mm.group(5) if mm and mm.group(5) else ""
        if nombre in INDICES_DESC:
            desc = INDICES_DESC[nombre]
        elif unico:
            desc = f"No permite dos filas de `{tabla}` con el mismo valor de ({cols})."
            if "eliminado_en IS NULL" in parcial:
                desc += " La regla vale solo entre las filas vivas: una fila borrada no bloquea su valor para siempre."
        else:
            desc = f"Índice de búsqueda sobre `{tabla}` ({cols}): acelera las consultas que filtran por esas columnas."
        agregar(f"idx-{nombre}", nombre, "indice",
                "Índices únicos" if unico else "Índices de búsqueda",
                desc, sql, linea, tabla=tabla,
                nota=("único" if unico else "búsqueda") + (" · parcial" if parcial else ""),
                claves=f"{cols} {tabla}")
        continue

    # -- llaves foráneas
    if tipo == "FK CONSTRAINT":
        mm = re.search(r"ALTER TABLE ONLY horarios\.(\w+)\s*\n\s*ADD CONSTRAINT \w+ FOREIGN KEY "
                       r"\(([^)]+)\) REFERENCES ([\w.]+)\(([^)]+)\)([^;]*);", sql, re.S)
        if mm:
            hija, cols, padre, pcols, cola = mm.groups()
            onde = re.search(r"ON DELETE (CASCADE|RESTRICT|SET NULL|SET DEFAULT|NO ACTION)", cola)
            onde = onde.group(1) if onde else "NO ACTION"
            padre_corto = padre.replace("horarios.", "")
            desc = (f"Cada fila de `{hija}` apunta a `{padre_corto}` por {cols.strip()}: "
                    f"{ON_DELETE_TXT[onde]}.")
            dom = DOM_DE.get(hija, "operacion")
            agregar(f"fk-{nombre}", nombre, "fk", DOM_LABEL[dom], desc, sql, linea, tabla=hija,
                    nota=f"{hija}.{cols.strip()} → {padre_corto}.{pcols.strip()} · ON DELETE {onde}",
                    claves=f"{hija} {padre_corto} {cols}")
            continue

    # -- llaves primarias, únicas y de exclusión
    if tipo == "CONSTRAINT":
        tabla = nombre.split()[0]
        cname = nombre.split()[1]
        if "PRIMARY KEY" in sql:
            cols = re.search(r"PRIMARY KEY \(([^)]+)\)", sql).group(1)
            grupo = "Claves primarias"
            desc = f"Clave primaria de `{tabla}`: identifica cada fila por ({cols})."
            nota = "PRIMARY KEY"
        elif "EXCLUDE" in sql:
            grupo = "Exclusión · anti-solape"
            desc = CONSTRAINTS_DESC.get(cname, f"Restricción de exclusión sobre `{tabla}`.")
            nota = "EXCLUDE USING gist"
        else:
            cols = re.search(r"UNIQUE \(([^)]+)\)", sql)
            cols = cols.group(1) if cols else ""
            grupo = "Claves únicas"
            desc = f"No admite dos filas de `{tabla}` con el mismo valor de ({cols})."
            nota = "UNIQUE"
        detalle = ("Se lee así: no pueden existir dos filas donde todas esas condiciones sean "
                   "ciertas a la vez, siendo `&&` «los rangos se solapan». Es imposible de burlar "
                   "incluso con dos usuarios escribiendo al mismo tiempo."
                   if "EXCLUDE" in sql else "")
        agregar(f"cons-{cname}", cname, "restriccion", grupo, desc, sql, linea, tabla=tabla,
                nota=nota, detalle=detalle, claves=f"{tabla} {cname}")
        continue

    # -- RLS: activación por tabla
    if tipo == "ROW SECURITY":
        tabla = nombre.strip()
        agregar(f"rls-{tabla}", f"RLS activado en {tabla}", "rls", "Activación de RLS",
                f"Enciende la seguridad por fila en `{tabla}`. A partir de aquí, sin una política "
                f"que lo permita expresamente, nadie lee ni escribe ninguna fila.",
                sql, linea, tabla=tabla, nota="ENABLE ROW LEVEL SECURITY",
                claves=f"{tabla} rls seguridad fila")
        continue

    # -- RLS: políticas
    if tipo == "POLICY":
        tabla = nombre.split()[0]
        pol = nombre.split()[1]
        grupo, desc = POLITICAS.get(pol, ("Otras políticas", "Política de acceso por fila."))
        cmd = re.search(r"FOR (SELECT|INSERT|UPDATE|DELETE|ALL)", sql)
        cmd = cmd.group(1) if cmd else "TODAS las operaciones"
        agregar(f"pol-{tabla}-{pol}", pol, "rls", grupo, f"{desc} Aplicada a `{tabla}`.",
                sql, linea, tabla=tabla,
                nota=f"{cmd} · rol authenticated",
                claves=f"{tabla} {pol} politica rls")
        continue

    agregar(f"otro-{i}", nombre, "base", "Otros", f"Objeto de tipo {tipo}.", sql, linea)

# ---------------------------------------------------------------- salida

cobertura = round(cubierto / len(texto) * 100, 2)
if cobertura < 99.99:
    raise SystemExit(f"cobertura incompleta: {cobertura}%")

CATEGORIAS = [
    ("tabla", "Tablas", "#3f6fd6"),
    ("tipo", "Tipos ENUM", "#0f8a94"),
    ("vista", "Vistas", "#2a9468"),
    ("funcion", "Funciones", "#8b52d9"),
    ("trigger", "Triggers", "#b5791b"),
    ("restriccion", "Llaves y restricciones", "#c2504b"),
    ("fk", "Claves foráneas", "#a1568c"),
    ("indice", "Índices", "#5a6474"),
    ("rls", "Seguridad por fila", "#3a3229"),
    ("base", "Preámbulo", "#8c8171"),
]

# Orden de los grupos dentro de cada categoría: primero el orden declarado aquí,
# después lo que aparezca, alfabético.
ORDEN_GRUPOS = [
    "Preámbulo", "Otros",
    "Académico", "Infraestructura", "Docentes", "Motor", "Horarios",
    "Importación", "Seguridad", "Operación",
    "Estados", "Clasificaciones", "Otros tipos",
    "Vistas api_* · atajos del cliente", "Vistas vista_* · lectura pesada",
    G_SEG, G_ACA, G_DOC, G_PLAN, G_MOT, G_EDI, G_CON, G_IMP,
    T_MARCA, T_VALID, T_COMPL, T_PROP, T_BLOQ, "Otras funciones",
    "Marca de tiempo y versión", "Validación", "Completar y derivar",
    "Propagación", "Bloqueo e inmutabilidad", "Otros triggers",
    "Claves primarias", "Claves únicas", "Exclusión · anti-solape",
    "Índices únicos", "Índices de búsqueda",
    "Activación de RLS", P_CAT, P_PLAN, P_DOC, P_PROP, P_IMP, P_BIT, "Otras políticas",
]
peso = {g: i for i, g in enumerate(ORDEN_GRUPOS)}
cat_orden = {c: i for i, (c, _, _) in enumerate(CATEGORIAS)}

objetos.sort(key=lambda o: (cat_orden.get(o["cat"], 99),
                            peso.get(o["grupo"], 500),
                            o["nombre"]))


def esc(s: str) -> str:
    return (s.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${"))


def esc1(s: str) -> str:
    return s.replace("\\", "\\\\").replace("'", "\\'")


out = []
out.append("// GENERADO — no editar a mano.")
out.append("// Fuente: docs/database.sql · script: scripts/gen-catalogo.py")
out.append(f"// {len(objetos)} objetos · {lineas_totales} líneas · cobertura {cobertura}% del archivo\n")
out.append("""export type CategoriaId =
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
""")

conteo = {}
for o in objetos:
    conteo[o["cat"]] = conteo.get(o["cat"], 0) + 1

out.append("export const CATEGORIAS: Categoria[] = [")
for cid, label, color in CATEGORIAS:
    out.append(f"  {{ id: '{cid}', label: '{esc1(label)}', color: '{color}', n: {conteo.get(cid, 0)} }},")
out.append("];\n")

out.append("export const OBJETOS: Objeto[] = [")
for o in objetos:
    out.append("  {")
    out.append(f"    id: '{esc1(o['id'])}',")
    out.append(f"    nombre: '{esc1(o['nombre'])}',")
    out.append(f"    cat: '{o['cat']}',")
    out.append(f"    grupo: '{esc1(o['grupo'])}',")
    out.append(f"    desc: '{esc1(o['desc'])}',")
    out.append(f"    detalle: '{esc1(o['detalle'])}',")
    out.append(f"    nota: '{esc1(o['nota'])}',")
    out.append(f"    tabla: '{esc1(o['tabla'])}',")
    out.append(f"    linea: {o['linea']},")
    out.append(f"    claves: '{esc1(o['claves'])}',")
    if o["params"]:
        out.append("    params: [")
        for a in o["params"]:
            out.append(f"      {{ n: '{esc1(a['n'])}', t: '{esc1(a['t'])}', d: '{esc1(a['d'])}' }},")
        out.append("    ],")
    else:
        out.append("    params: [],")
    if o["pasos"]:
        out.append("    pasos: [")
        for paso in o["pasos"]:
            out.append(f"      '{esc1(paso)}',")
        out.append("    ],")
    else:
        out.append("    pasos: [],")
    out.append(f"    sql: `{esc(o['sql'])}`,")
    out.append("  },")
out.append("];\n")

out.append("export const META = {")
out.append("  archivo: 'docs/database.sql',")
out.append(f"  lineas: {lineas_totales},")
out.append("  lineasTexto: '" + f"{lineas_totales:,}".replace(",", " ") + "',")
out.append(f"  objetos: {len(objetos)},")
out.append(f"  cobertura: {cobertura},")
out.append("  instantanea: '2026-08-04',")
out.append("};")

OUT.write_text("\n".join(out) + "\n", encoding="utf-8")
print(f"OK {len(objetos)} objetos · cobertura {cobertura}% · {OUT}")
for cid, label, _ in CATEGORIAS:
    print(f"   {label:<24} {conteo.get(cid, 0)}")
