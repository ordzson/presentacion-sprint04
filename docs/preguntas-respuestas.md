# Preguntas y respuestas — Sistema de Horarios UdeO/UTP

> **Para qué sirve este documento.** Es el material de preparación del equipo antes de
> exponer. Cada respuesta está armada en tres partes —**qué**, **cómo** y **por qué**— y el
> *por qué* siempre cierra con un respaldo verificable: un archivo del repositorio, una
> regla del motor de base de datos, o una fuente técnica reconocida. No hay opiniones
> sueltas: si algo se hizo de cierta forma, acá está el argumento y dónde comprobarlo.
>
> **Fuente de todo lo que se afirma acá:** el repositorio `HORARIOS/Horarios-develop`
> (código en `src/`, base de datos en `supabase/`, documentación en `docs/`). Cuando una respuesta
> cita un archivo, ese archivo existe y dice eso.
>
> **Si un término no te suena** —endpoint, esquema, entidad, RLS, DTO—, saltá al
> [Glosario](#7-glosario) al final. Está escrito para quien aprendió programando y nunca
> tuvo que ponerle nombre formal a lo que ya hacía.

## Índice

1. [Generales del proyecto](#1-generales-del-proyecto)
2. [Base de datos](#2-base-de-datos)
3. [Arquitectura](#3-arquitectura)
4. [Módulos](#4-módulos)
   - [4.1 Academia](#41-academia)
   - [4.2 Aulas y jornadas](#42-aulas-y-jornadas)
   - [4.3 Docentes](#43-docentes)
   - [4.4 Planes](#44-planes)
   - [4.5 Acceso](#45-acceso)
   - [4.6 Importaciones](#46-importaciones)
5. [Preguntas incómodas](#5-preguntas-incómodas)
6. [Motor de generación](#6-motor-de-generación)
7. [Glosario](#7-glosario)

---

## 1. Generales del proyecto

### P1. ¿Qué hace este sistema, en una frase?

**Qué.** Genera automáticamente los horarios de clases de la universidad: decide qué curso
se dicta, qué día, en qué bloque de hora, con qué docente y en qué aula, para todas las
cohortes de un período académico a la vez.

**Cómo.** El usuario carga los datos base (facultades, carreras, pensums, cohortes, aulas,
jornadas, docentes y su disponibilidad), crea un *plan de horario* para un período, y desde
`/planes` lanza la generación. El motor (`src/Horarios.Scheduler/MotorHorario.cs`) recibe
una copia de todos esos datos, coloca las sesiones, y un verificador independiente
(`VerificadorHorario.cs`) revisa el resultado antes de guardarlo. Lo que no se pudo colocar
queda registrado con su causa en `horarios.sesiones_no_asignadas`.

**Por qué.** Porque armar el horario a mano es un problema de asignación con restricciones
cruzadas —docente, aula, cohorte y franja horaria compiten entre sí— y su versión general
(*course timetabling*) es NP-difícil; es un problema clásico de la literatura de
investigación de operaciones (ver la serie de conferencias PATAT, *Practice and Theory of
Automated Timetabling*). Que sea NP-difícil no significa que no se pueda resolver: significa
que se resuelve con heurísticas y que hay que **verificar** el resultado en vez de confiar
en él. Por eso el sistema separa generar de verificar.

### P2. ¿Qué tecnologías usa y por qué esas?

**Qué.** .NET 9 con C#, interfaz web en Blazor (modo interactivo del lado del servidor),
persistencia en PostgreSQL a través de Supabase, contenedores con Docker, y `pnpm`
únicamente para la CLI de Supabase.

**Cómo.** Los seis proyectos de `src/` declaran `<TargetFramework>net9.0</TargetFramework>`.
La app web es `Horarios.Blazor` (SDK `Microsoft.NET.Sdk.Web`). El único paquete externo de
peso en toda la solución es `Npgsql` en `Horarios.Infraestructura`, y se usa en un solo
lugar. `compose.yaml` levanta la app; Supabase local lo levanta su propia CLI.

**Por qué.** Tres razones concretas y comprobables:

1. **Un solo lenguaje de punta a punta.** La lógica de pantalla y la lógica de negocio se
   escriben en C# y se comparten tipos; no hay que mantener dos modelos de datos (uno en
   TypeScript, otro en C#) ni un contrato entre ellos.
2. **Superficie de dependencias mínima.** `Horarios.Dominio` y `Horarios.Contratos` no
   tienen *ninguna* referencia externa —se puede verificar abriendo sus `.csproj`, están
   vacíos de `PackageReference`—. Menos dependencias es menos superficie de ruptura al
   actualizar y menos riesgo de cadena de suministro.
3. **Supabase entrega Postgres más los servicios alrededor** (autenticación, API REST
   generada, políticas por fila) sin que el equipo tenga que escribir y mantener esa capa.
   Lo que se compra es tiempo; lo que se paga es acoplamiento a un proveedor, y eso está
   acotado a `Horarios.Infraestructura` (ver [P24](#p24-y-si-mañana-hay-que-salir-de-supabase)).

### P3. ¿Qué está terminado y qué no?

**Qué.** El incremento cubre hasta el cierre del Sprint 4. Están operativos: academia
(facultades, carreras, pensums, cohortes, períodos, áreas comunes), aulas y jornadas,
docentes con autorizaciones y disponibilidad, planes con revisión previa, acceso con roles y
permisos, importaciones CSV/XLSX en modo vista previa, motor de generación con verificación
independiente e historial de ejecuciones.

**Cómo.** Cada requisito está trazado en `docs/sprint2.md`, `docs/sprint3.md` y
`docs/sprint4.md` contra los identificadores del cronograma (`S01-R2`, `S04-R4`, etc.), y
cada uno tiene pruebas: cuatro proyectos en `tests/` (Dominio, Aplicación, Scheduler,
Integración) con 33 archivos de prueba. El cierre del Sprint 3 documenta 65 pruebas
ejecutadas.

**Por qué.** Porque un entregable sin evidencia de verificación no es un entregable: es una
afirmación. Trazar requisito → prueba es la práctica estándar de gestión de requisitos
(IEEE 830 / ISO/IEC/IEEE 29148, matriz de trazabilidad) y es lo que permite responder "¿y
cómo sabés que funciona?" con un comando en vez de con una anécdota.

### P4. ¿Cómo se levanta el proyecto en una máquina nueva?

**Qué.** No se levanta ninguna base de datos local. El proyecto trabaja al 100% contra un
Supabase Cloud compartido por el equipo: no se corre `supabase start` ni Postgres en Docker.
Una máquina nueva son tres cosas: el código, las tres credenciales que `Program.cs` exige al
arrancar, y el comando de ejecución.

**Cómo.**

```bash
pnpm install
dotnet restore Horarios.sln

# Credenciales del Supabase compartido, fuera del repositorio
dotnet user-secrets set "Supabase:Url" "https://PROJECT_REF.supabase.co" --project src/Horarios.Blazor/Horarios.Blazor.csproj
dotnet user-secrets set "Supabase:AnonKey" "PEGAR_ANON_KEY_O_PUBLISHABLE_KEY" --project src/Horarios.Blazor/Horarios.Blazor.csproj
dotnet user-secrets set "Supabase:DbConnectionString" "PEGAR_CONNECTION_STRING" --project src/Horarios.Blazor/Horarios.Blazor.csproj

dotnet build Horarios.sln --no-restore -m:1
dotnet test Horarios.sln --no-build
dotnet run --project src/Horarios.Blazor/Horarios.Blazor.csproj
```

Los tres valores salen del panel del proyecto en Supabase y los reparte el responsable por
un canal privado, nunca por el repositorio: `Supabase:Url` y `Supabase:AnonKey` de
**Project Settings → API** (la clave pública, `anon`/`publishable`; la `service_role` no se
configura nunca en la app web porque omite RLS), y `Supabase:DbConnectionString` de
**Connect → Database**, que es donde Supabase muestra el host, el puerto 5432, la base
`postgres`, el usuario y la contraseña de la base. El procedimiento completo por integrante
está en `docs/conexion-supabase-equipo.md`.

Hacia esa misma base hay **dos caminos distintos**, y por eso hacen falta tres variables y
no dos:

| Camino | Qué usa | Quién decide el permiso |
|---|---|---|
| CRUD normal (todo el proyecto menos el motor) | HTTP a la Data API con `Supabase:Url` + `Supabase:AnonKey`, y el JWT del usuario en `Authorization` | RLS en Postgres, sobre `auth.uid()` |
| Motor de horarios | Conexión TCP directa a PostgreSQL con usuario y contraseña de `Supabase:DbConnectionString` | El caso de uso, antes de pedir la generación |

El segundo camino es el que se arma en `src/Horarios.Blazor/Program.cs`, a partir de la
línea 134:

```csharp
// Conexión directa a PostgreSQL de Supabase, como singleton porque el origen de datos
// administra su propio pool. Solo la usa PreparadorInstantaneaMotorPostgres; el resto de la
// persistencia va por la API de datos.
builder.Services.AddSingleton(sp =>
{
    var configuracion = sp.GetRequiredService<IConfiguration>();
    var cadena = configuracion["Supabase:DbConnectionString"];

    if (string.IsNullOrWhiteSpace(cadena))
    {
        throw new InvalidOperationException("Falta configurar Supabase:DbConnectionString.");
    }

    string cadenaNpgsql;

    if (cadena.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
    {
        var uri = new Uri(cadena);
        var datosUsuario = uri.UserInfo.Split(':', 2);
        var baseDeDatos = uri.AbsolutePath.TrimStart('/');

        var constructor = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.IsDefaultPort ? 5432 : uri.Port,
            Database = string.IsNullOrWhiteSpace(baseDeDatos) ? "postgres" : baseDeDatos,
            Username = Uri.UnescapeDataString(datosUsuario[0]),
            Password = Uri.UnescapeDataString(datosUsuario[1]),
            SslMode = SslMode.Require
        };

        cadenaNpgsql = constructor.ConnectionString;
    }
    else
    {
        cadenaNpgsql = cadena;
    }

    return NpgsqlDataSource.Create(cadenaNpgsql);
});
```

Tres detalles de ese bloque. **Uno:** se aceptan los dos formatos porque Supabase entrega la
cadena como URI (`postgresql://usuario:clave@host/base`) y Npgsql espera pares
`clave=valor`; la traducción se hace al arrancar en vez de pedirle a quien despliega que la
reescriba a mano —de ahí que el usuario y la contraseña se lean de `uri.UserInfo` y se
desescapen—. **Dos:** `SslMode.Require`, porque la conexión sale a internet hacia el host de
Supabase, no a `localhost`. **Tres:** es singleton porque `NpgsqlDataSource` administra su
propio pool de conexiones; crear uno por petición desperdiciaría el pool.

Con Docker el reparto es el mismo pero por variables de entorno: `compose.yaml` lee el `.env`
de la raíz y mapea `SUPABASE_URL`, `SUPABASE_ANON_KEY` y `SUPABASE_DB_CONNECTION_STRING` a
`Supabase__Url`, `Supabase__AnonKey` y `Supabase__DbConnectionString` dentro del contenedor.
El doble guion bajo es la forma en que .NET traduce una variable de entorno a una clave
jerárquica de configuración: `Supabase__Url` se lee como `Supabase:Url` en `Program.cs`.

**Por qué.** Una sola base compartida y remota elimina el "en mi máquina funciona": todos
consultan el mismo esquema y los mismos datos, así que una diferencia de comportamiento no
se puede explicar con una base local desincronizada. El precio de esa decisión es una regla:
nadie toca la estructura desde el Table Editor o el SQL Editor del panel; todo cambio de
esquema entra como archivo en `supabase/migrations/` y se aplica desde ahí, que es lo que
mantiene la base versionada en git. Las credenciales viven por máquina en `user-secrets`
—fuera del árbol del repositorio, no solo fuera del commit—, que es el factor III de
"12-Factor App": configuración en el entorno, nunca en el código.

Vale decir en voz alta la contrapartida del segundo camino: la conexión directa corre con la
credencial de la conexión, no con el token del usuario, así que **RLS no la protege**. La
autorización de ese camino ya se resolvió antes, en el caso de uso que pide generar el plan.

### P5. ¿Por qué las variables sensibles no están en el código?

**Qué.** Ni la URL del proyecto, ni la clave anónima, ni la cadena de conexión PostgreSQL
están escritas en ningún archivo `.cs`. Se leen de configuración en tiempo de arranque.

**Cómo.** `src/Horarios.Blazor/Program.cs` las exige y falla ruidosamente si faltan:
`configuracion["Supabase:Url"] ?? throw new InvalidOperationException("Falta configurar
Supabase:Url.")`. El repositorio incluye `.env.example` con valores de referencia sin
secretos reales.

**Por qué.** Un secreto en el repositorio es un secreto público: queda en el historial de
git aunque después se borre del archivo, y rotar una credencial filtrada es más caro que
configurarla bien. Es el factor III de 12-Factor y está catalogado como
CWE-798 (*Use of Hard-coded Credentials*). El detalle de **fallar al arrancar** en vez de
seguir con un valor vacío es deliberado: un fallo temprano y ruidoso es preferible a un
sistema que arranca y falla de forma incomprensible en la primera consulta.

---

## 2. Base de datos

### P6. ¿Qué es Supabase? ¿Es una base de datos distinta?

**Qué.** No. Supabase **es PostgreSQL** (versión 17 en este proyecto) más un conjunto de
servicios que corren al lado.

**Cómo.** Las piezas que el proyecto usa son cuatro:

| Pieza | Qué hace | Dónde se nota |
|---|---|---|
| PostgreSQL | La base de datos real | Todo el esquema `horarios` |
| PostgREST | Convierte cada tabla y función en un endpoint HTTP | `GET /rest/v1/aulas`, `POST /rest/v1/rpc/crear_cohorte` |
| GoTrue (Auth) | Login, emisión de JWT, esquema `auth` | `auth.uid()` dentro del SQL |
| CLI | Levanta la base de datos local y aplica migraciones | `pnpm exec supabase db reset` |

**Por qué.** Importa decirlo así porque fija qué conocimiento es transferible: todo lo que
se aprende del esquema, de los índices, de los triggers y del SQL **es PostgreSQL estándar**
y sirve fuera de Supabase. Lo específico del proveedor es la capa HTTP y la autenticación,
y eso está encapsulado en un solo archivo del lado .NET (`ClienteDatosSupabase.cs`).

### P7. ¿Por qué hay tantos esquemas en la base de datos? ¿Cuál es el nuestro?

**Qué.** Al abrir Supabase Studio aparecen ocho o diez esquemas. **Uno solo es del proyecto:
`horarios`.** El resto los crea la plataforma.

**Cómo.**

| Esquema | Quién lo creó | ¿Se toca? |
|---|---|---|
| **`horarios`** | Nosotros | **Sí. Todo el trabajo está acá** |
| `public` | Postgres, de fábrica | No; se deja vacío a propósito |
| `auth` | Supabase (GoTrue) | No; solo se lee vía `auth.uid()` |
| `storage`, `realtime`, `vault`, `graphql`, `extensions` | Supabase | No |
| `supabase_migrations` | La CLI, para llevar la cuenta | No a mano |

Qué esquemas expone la API se decide en `supabase/config.toml`:
`schemas = ["public", "graphql_public", "horarios"]`.

**Por qué.** Un esquema en PostgreSQL es un espacio de nombres: una carpeta de objetos
dentro de la misma base de datos. Poner todo lo propio en uno separado tiene tres beneficios
concretos:

1. **Evita colisiones de nombres.** `public` es el patio común: toda extensión que se
   instale deja ahí sus funciones. Si nuestras tablas viven ahí, el día que una extensión
   cree algo llamado `usuarios` hay conflicto. La documentación de PostgreSQL recomienda
   explícitamente no usar `public` para objetos de aplicación por esta razón, y desde
   PostgreSQL 15 el permiso `CREATE` sobre `public` está revocado por defecto justamente
   para desalentarlo.
2. **Permite exponer o esconder por esquema.** Ese renglón de `config.toml` decide qué ve
   la API. Un esquema interno que la API no deba tocar se saca de la lista y listo.
3. **Los nombres se autodocumentan:** `horarios.sesiones` dice de qué sistema es la tabla.

En la práctica esto se ve en cada petición HTTP, que lleva las cabeceras
`Accept-Profile: horarios` y `Content-Profile: horarios` — es PostgREST preguntando "¿en
qué esquema busco?". Está en `ClienteDatosSupabase.cs`, constante `Esquema`.

### P8. ¿Qué tamaño tiene la base de datos?

**Qué.** Instantánea documentada en `docs/guia-base-datos-para-nuevos.md`:

| Objeto | Cantidad |
|---|---|
| Esquemas propios | 1 (`horarios`) |
| Tablas | 57 |
| Tipos ENUM | 21 |
| Vistas | 8 (5 `api_*` + 3 `vista_*`) |
| Funciones | 55 (39 llamables + 16 de trigger) |
| Triggers | 42, sobre 33 tablas |
| Políticas RLS | 242, con **37 nombres distintos** |
| Extensiones | 2 (`pgcrypto`, `btree_gist`) |

**Cómo.** Las 242 políticas no son 242 reglas: son 37 reglas repetidas tabla por tabla,
porque PostgreSQL no permite aplicar una política a varias tablas de una sola vez. La misma
política `api_catalogo_leer` aparece unas 30 veces, idéntica salvo el nombre de la tabla.

**Por qué.** El número asusta hasta que se entiende la repetición. Vale la pena tener el
dato a mano porque es la pregunta natural de quien abre Studio por primera vez, y responder
"242, pero son 37" demuestra que alguien miró de verdad en vez de repetir un número.

### P9. ¿Por qué las llaves primarias son UUID y no enteros autoincrementales?

**Qué.** Casi toda tabla usa `id uuid DEFAULT gen_random_uuid() NOT NULL` en lugar del
clásico entero identidad.

**Cómo.** `gen_random_uuid()` viene de la extensión `pgcrypto` y genera un UUID versión 4
(aleatorio). El motor, además, genera identificadores **deterministas** para sesiones y
bloques (`IdentificadorDeterminista.Crear` en `Horarios.Contratos/Motor/ContratoMotor.cs`),
derivándolos de un texto estable con SHA-256.

**Por qué.** Tres ventajas medibles:

1. **El cliente puede fijar el id antes de insertar.** Con un entero identidad hay que
   insertar y esperar a que la base de datos diga qué número tocó; eso obliga a un ida y vuelta y
   complica insertar un grafo de objetos relacionados de una sola vez.
2. **No se chocan al mezclar orígenes.** Datos de la base de datos local y de la central se pueden
   combinar sin renumerar. Con enteros secuenciales, dos bases generan los mismos ids.
3. **No filtran información.** Una URL `/aulas/57` le dice a cualquiera que hay unas 57
   aulas y permite enumerar recursos cambiando el número; `/aulas/a3f2c1e8-...` no dice
   nada. Es la mitigación estándar de OWASP para *Insecure Direct Object Reference* /
   enumeración de identificadores.

**El costo, dicho de frente:** un UUID ocupa 16 bytes contra 4 u 8, y al ser aleatorio
dispersa las inserciones por todo el índice B-tree en vez de agregarlas al final, lo que
fragmenta más las páginas. Para el volumen de una universidad (decenas de miles de sesiones
por período) es irrelevante; en un sistema de millones de inserciones por hora habría que
mirar UUIDv7, que es ordenable en el tiempo (RFC 9562).

**Detalle honesto sobre el identificador determinista:** el código marca el resultado como
UUID versión 5 (los ajustes de bits en `bytes[7]` y `bytes[8]`) pero deriva de SHA-256; el
UUIDv5 formal de RFC 4122 §4.3 —hoy RFC 9562— usa SHA-1. Es un UUID válido en forma y
cumple su propósito (mismo texto → mismo id, siempre), pero no es v5 en sentido estricto. Si
alguien lo pregunta, la respuesta correcta es "está marcado como v5 y se comporta como un
UUID de nombre, aunque el hash es SHA-256".

### P10. ¿Qué son `creado_en`, `actualizado_en`, `eliminado_en` y `version_fila`?

**Qué.** Cuatro columnas que se repiten en casi toda tabla de catálogo, y que resuelven
cuatro problemas distintos.

**Cómo.**

```sql
creado_en      timestamptz DEFAULT now() NOT NULL,  -- auditoría: cuándo nació la fila
actualizado_en timestamptz DEFAULT now() NOT NULL,  -- lo mantiene un trigger
eliminado_en   timestamptz,                          -- borrado lógico: NULL = viva
version_fila   bigint DEFAULT 0 NOT NULL             -- bloqueo optimista
```

`actualizado_en` y `version_fila` no los escribe nadie a mano: los mantiene el trigger
`horarios.actualizar_marca_con_version()`, enganchado a 17 tablas.

**Por qué.** Cada una tiene su justificación y conviene separarlas:

- **Las dos marcas de tiempo** son auditoría barata: responden "¿cuándo se creó/cambió esto?"
  sin necesidad de una tabla de historial. `timestamptz` (con zona horaria) y no `timestamp`
  porque una marca sin zona es ambigua en cuanto hay más de un servidor o cambia el horario
  de verano.
- **`eliminado_en`** implementa borrado lógico — ver [P11](#p11-por-qué-nada-se-borra-de-verdad).
- **`version_fila`** implementa bloqueo optimista — ver [P12](#p12-qué-es-version_fila-y-qué-problema-real-resuelve).

### P11. ¿Por qué nada se borra de verdad?

**Qué.** Borrar un aula no es `DELETE`. Es marcarla:

```sql
UPDATE horarios.aulas SET eliminado_en = now() WHERE id = ...;
```

**Cómo.** Esto tiene dos consecuencias que hay que conocer o se paga con una tarde perdida:

1. **Toda consulta necesita `WHERE eliminado_en IS NULL`.** Si falta, se leen también las
   filas dadas de baja.
2. **Los índices únicos llevan condición:**

```sql
CREATE UNIQUE INDEX aulas_codigo_uq ON horarios.aulas USING btree (codigo)
    WHERE (eliminado_en IS NULL);
```

Se lee: *el código es único entre las aulas vivas*. Sin ese `WHERE`, un aula borrada
seguiría reservando su código para siempre. Es un **índice único parcial**, una función que
PostgreSQL soporta nativamente y que la mayoría de motores no tiene.

**Por qué.** Porque los datos de este sistema tienen valor histórico y referencial:

- Un aula usada en un horario ya publicado no puede desaparecer, o el horario publicado
  quedaría apuntando a la nada. El borrado físico rompería llaves foráneas o exigiría
  cascadas destructivas.
- **Deshacer es posible.** `horarios.restaurar_entidad(...)` es simplemente
  `SET eliminado_en = NULL`. Con `DELETE` real, deshacer requiere restaurar un respaldo.
- Es el patrón *Soft Delete*, y el precio conocido —consultas que deben filtrar siempre— se
  paga aquí con dos cosas: las vistas `api_*` ya traen el filtro incorporado, y las políticas
  RLS y los índices parciales lo asumen.

### P12. ¿Qué es `version_fila` y qué problema real resuelve?

**Qué.** Un contador que sube en cada actualización y sirve para detectar que dos personas
editaron lo mismo al mismo tiempo.

**Cómo.** El problema, sin la columna:

```text
10:00:00  Ana lee el plan (version_fila = 7), lo ve en "borrador"
10:00:03  Beto lee el MISMO plan (version_fila = 7)
10:00:10  Ana lo aprueba
10:00:12  Beto lo cancela   ← el trabajo de Ana se pierde en silencio
```

La solución es que cada `UPDATE` diga con qué versión venía trabajando:

```sql
UPDATE horarios.horarios
   SET estado = 'aprobado', version_fila = version_fila + 1
 WHERE id = p_plan_id
   AND version_fila = p_version_anterior;   -- el candado
```

Si Beto llega con `version_fila = 7` pero la fila ya va en 8, el `UPDATE` afecta **cero
filas** y la función responde "alguien lo cambió antes, recargá". El ejemplo canónico en
este proyecto es `horarios.cambiar_estado_plan(...)`, y del lado .NET lo consume
`CambiarEstadoPlan.EjecutarAsync`, que pasa `actual.VersionFila` a la persistencia.

**Por qué.** Es el patrón **Optimistic Offline Lock**, catalogado por Martin Fowler en
*Patterns of Enterprise Application Architecture* (2002). Se llama "optimista" porque asume
que los choques son raros y los detecta cuando ocurren, en vez de prevenirlos bloqueando.
La alternativa —bloqueo pesimista, con la fila trabada mientras alguien la edita— es
inviable en una aplicación web: entre que el usuario abre el formulario y lo envía pueden
pasar minutos, y mantener una transacción abierta todo ese tiempo agota conexiones y
bloquea a todos los demás. La regla general: **pesimista cuando los conflictos son
frecuentes y cortos; optimista cuando son raros y las transacciones humanas son largas.**

### P13. ¿Qué es una restricción `EXCLUDE` y por qué se usa acá?

**Qué.** Una restricción que prohíbe que existan dos filas que cumplan cierta condición a la
vez. En este sistema es la que garantiza que **un docente no pueda estar en dos clases al
mismo tiempo**.

**Cómo.**

```sql
ALTER TABLE ONLY horarios.sesiones
    ADD CONSTRAINT sesiones_docente_no_solapado
    EXCLUDE USING gist (
        horario_id WITH =,
        docente_id WITH =,
        COALESCE(fecha_sesion, '0001-01-01') WITH =,
        dia WITH =,
        rango_minutos WITH &&);
```

Se lee: *no pueden existir dos filas donde todo esto sea cierto a la vez* — mismo horario,
mismo docente, misma fecha, mismo día, **y** rangos de minutos que se solapan (`&&` es el
operador "se solapan" para rangos). El `rango_minutos` es una columna generada:

```sql
rango_minutos int4range GENERATED ALWAYS AS
    (int4range(minuto_inicio_dia, minuto_fin_dia, '[)')) STORED
```

Hay cuatro restricciones de este tipo: docente no solapado, aula no solapada, cohorte no
solapada y descansos de jornada no solapados. La extensión `btree_gist` existe justamente
para esto: los índices GiST no saben comparar por igualdad tipos comunes como `uuid`, y esa
extensión se lo enseña.

**Por qué.** Porque la alternativa clásica —un trigger que consulta si hay solape antes de
insertar— **falla bajo concurrencia**. Dos transacciones simultáneas consultan al mismo
tiempo, ninguna ve a la otra (aislamiento READ COMMITTED, el nivel por defecto de
PostgreSQL), ambas concluyen "no hay solape" y ambas insertan. Es una condición de carrera
de manual (*time-of-check to time-of-use*, TOCTOU). La restricción `EXCLUDE` no tiene ese
problema porque se apoya en un índice: la exclusión se evalúa dentro del mecanismo de
bloqueo del índice, no en código de usuario. **Cinco renglones que son imposibles de
burlar, contra cuarenta líneas de trigger que igual fallan.**

### P14. ¿Por qué hay 42 triggers? ¿No es lógica escondida?

**Qué.** Sí es lógica que no se ve leyendo el `INSERT`, y esa es una crítica legítima. La
respuesta es que están agrupados en cinco clases muy reconocibles y solo dos de ellas
contienen lógica real.

**Cómo.**

| Clase | Cuántos | Qué hacen |
|---|---|---|
| Marca de tiempo y versión | 23 | `actualizado_en` y `version_fila`. Todos idénticos |
| Validación | 7 | `BEFORE INSERT OR UPDATE`, terminan en `raise exception` |
| Completar / derivar | 2 | Modifican `new` para llenar campos calculados |
| Propagación | 2 | `AFTER UPDATE`, escriben en otras tablas |
| Bloqueo / inmutabilidad | 8 | Impiden tocar lo que ya está publicado |

De los 42, **23 son la misma función repetida**. Los que importan de verdad son los 7 de
validación y los 8 de bloqueo.

**Por qué.** Dos razones, y la segunda es la fuerte:

1. **Los de marca son mantenimiento mecánico.** Que `actualizado_en` lo ponga la base de datos y no
   el programador significa que nunca se olvida y nunca miente.
2. **Los de validación y bloqueo son la última frontera.** Este sistema no tiene una única
   puerta de entrada a los datos: entran por la app .NET, pero también por PostgREST, por
   Studio y por `psql`. Una regla escrita solo en C# es una regla que se puede saltar
   entrando por otra puerta. Es el principio de **mediación completa** (*complete
   mediation*) de Saltzer y Schroeder, *The Protection of Information in Computer Systems*
   (Proc. IEEE, 1975): todo acceso debe pasar por el control, sin caminos alternativos.

**Detalle que hay que saber:** PostgreSQL dispara los triggers de la misma tabla y el mismo
momento **en orden alfabético por nombre**. Por eso hay triggers con prefijo `z_` y `zz_`:
es la forma de mandarlos al final de la fila. En `horarios.sesiones` el orden real es
validar → verificar que el horario no esté publicado → ajustar minutos por el receso. El
nombre de un trigger nuevo no es cosmético: **es su posición en la fila.**

### P15. ¿Por qué hay tanta lógica en funciones de PostgreSQL y no en C#?

**Qué.** 39 funciones llamables desde la aplicación. Las de escritura hacen varias
operaciones y devuelven `jsonb`.

**Cómo.** Se llaman por RPC: `POST /rest/v1/rpc/crear_cohorte` con los parámetros en el
cuerpo. Del lado .NET es `ClienteDatosSupabase.RpcAsync<T>(...)`. La convención del proyecto
es `p_` para parámetros y `v_` para variables locales.

**Por qué.** Por **atomicidad**. El comentario en `ClienteDatosSupabase.cs` lo dice
literalmente: *"Muchas operaciones viven en funciones de Postgres porque necesitan hacer
varias escrituras dentro de una misma transacción"*. Ejemplo concreto:
`guardar_resultado_generacion(...)` borra el horario anterior del plan y escribe el nuevo.
Si eso se hiciera con dos llamadas HTTP desde .NET —una para borrar, otra para insertar— y
la segunda fallara, el plan quedaría **sin horario y sin forma de recuperarlo**. Dentro de
una función, PostgreSQL las ejecuta en una sola transacción: o pasan las dos o no pasa
ninguna. Es la A y la C de ACID (atomicidad y consistencia), y no hay forma de obtenerlas
repartiendo la operación en varias peticiones HTTP sin implementar un protocolo de
compensación mucho más caro (patrón *Saga*).

El criterio para decidir dónde va cada cosa, entonces, es: **si una operación necesita más
de una escritura consistente entre sí, va en una función SQL; si es una escritura sola con
reglas de negocio alrededor, va en un caso de uso de C#.**

### P16. ¿Qué es RLS y por qué se usa?

**Qué.** *Row Level Security*: filtros que PostgreSQL aplica por sí mismo, fila por fila,
según quién está consultando. No es un `WHERE` que escribe la aplicación: es un `WHERE` que
el motor agrega solo y que no se puede omitir.

**Cómo.** Una política típica:

```sql
CREATE POLICY api_catalogo_leer ON horarios.aulas
    FOR SELECT TO authenticated
    USING (horarios.usuario_actual_tiene_permiso('aulas', 'leer'));
```

| Parte | Qué significa |
|---|---|
| `FOR SELECT` | A qué operación aplica |
| `TO authenticated` | A qué rol de Postgres (Supabase usa `anon` y `authenticated`) |
| `USING (...)` | Filtro de **lectura**: las filas donde da falso no existen para ese usuario |
| `WITH CHECK (...)` | Filtro de **escritura**: si da falso, el INSERT/UPDATE se rechaza |

Regla para recordarlo: **`USING` mira lo que ya está; `WITH CHECK` mira lo que vas a dejar.**
Por eso las políticas de `UPDATE` llevan las dos.

**Por qué.** Porque en esta arquitectura el cliente habla con PostgREST llevando el JWT del
usuario. Si la seguridad viviera solo en la aplicación .NET, cualquiera con la clave anónima
y un `curl` podría leer la base de datos entera. Con RLS, PostgreSQL evalúa **cada fila** contra la
identidad del token. Es defensa en profundidad aplicada donde importa: el control está en el
recurso, no en el camino hacia el recurso.

### P17. ¿Qué hacen `usuario_actual_id()` y `usuario_actual_tiene_permiso()`?

**Qué.** Son las dos funciones sobre las que descansan las 242 políticas. Entendiendo estas
dos se entiende toda la seguridad del sistema.

**Cómo.**

```sql
CREATE FUNCTION horarios.usuario_actual_id() RETURNS uuid
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'horarios', 'auth', 'public'
    AS $$
    select id from horarios.usuarios
    where auth_user_id = auth.uid() and estado = 'activo' and eliminado_en is null
    limit 1;
$$;
```

`auth.uid()` lee el `sub` del JWT que viajó en la cabecera `Authorization`. La función
traduce ese id del mundo de Supabase Auth al id de **nuestra** tabla `horarios.usuarios`, y
filtra por `estado = 'activo'` y `eliminado_en is null`.

**Por qué.** Ese último filtro es el que hace real la desactivación de una cuenta: un usuario
dado de baja **sigue teniendo un JWT válido** hasta que caduque, pero para el esquema
`horarios` deja de existir de inmediato. Sin ese filtro, dar de baja a alguien no tendría
efecto hasta la expiración del token.

**Sobre `SECURITY DEFINER`:** significa que la función corre con los permisos de quien la
creó, no de quien la llama, y por lo tanto **se salta RLS**. Solo 6 funciones lo usan y todas
por la misma razón: para decidir si podés leer hay que leer `horarios.usuarios`, y si esa
lectura estuviera sujeta a RLS el razonamiento se mordería la cola. El `SET search_path`
obligatorio que las acompaña no es adorno: sin él, alguien podría crear un esquema propio con
una tabla `usuarios` falsa, ponerlo primero en su `search_path` y hacer que la función lea de
la tabla equivocada. La documentación oficial de PostgreSQL trae una sección específica,
*Writing SECURITY DEFINER Functions Safely*, que exige exactamente esto.

### P18. ¿Qué es una vista y por qué algunas llevan `security_invoker`?

**Qué.** Una vista es una consulta guardada con nombre, que se usa como si fuera una tabla.
Hay 8: cinco `api_*` (atajos para el cliente) y tres `vista_*` (lecturas pesadas con muchos
joins que sirven de base a las funciones de consulta).

**Cómo.**

```sql
CREATE VIEW horarios.api_cohortes_activas WITH (security_invoker='true') AS
 SELECT cp.cohorte_id, cp.periodo_id, cp.semestre_asignado, cp.matricula_estimada, c.seccion
   FROM horarios.cohorte_periodos cp
   JOIN horarios.cohortes c ON c.id = cp.cohorte_id AND c.eliminado_en IS NULL
  WHERE cp.esta_activa AND cp.eliminado_en IS NULL;
```

**Por qué `security_invoker`.** Este es el detalle crítico. Por defecto, una vista de
PostgreSQL se ejecuta con los permisos de **quien la creó**, no de quien la consulta — o sea
que sería un agujero por el que se evade RLS: bastaría consultar la vista en vez de la tabla.
Con `security_invoker = true` (disponible desde PostgreSQL 15) la vista corre con los
permisos de quien consulta, y RLS se aplica sobre las tablas de abajo, como debe ser.
**Una vista sin esa opción sobre tablas con RLS es un error de seguridad, no una preferencia.**

### P19. ¿Qué es una migración y por qué no se edita `docs/database.sql`?

**Qué.** Una migración es un archivo SQL versionado que lleva la base de datos de un estado al
siguiente. Viven en `supabase/migrations/` y se ejecutan en orden por fecha:
`AAAAMMDDNNNN_descripcion.sql`.

**Cómo.** Hay tres lugares y conviene no confundirlos:

```text
supabase/migrations/   ← FUENTE DE VERDAD. Se ejecuta en orden.
supabase/seeds/        ← Datos de ejemplo, solo en local
docs/database.sql      ← FOTO de la base de datos viva. Para leer y comparar. NO se ejecuta.
```

**Por qué.** Porque el esquema es código y tiene que estar bajo control de versiones, con
historial y revisión, igual que el C#. Una base de datos modificada a mano desde Studio no es
reproducible: no se puede recrear en otra máquina, no se puede revisar en un *pull request*
y no se puede revertir. `docs/database.sql` es un `pg_dump` regenerado a mano — una foto del
resultado, no la receta. Editarla para "arreglar" el esquema no cambia nada en ninguna base de datos;
solo hace que la foto mienta. **El cambio va siempre en una migración nueva, y después se
regenera la foto.**

Detalle de calidad que vale mencionar: la migración de docente-multifacultad no elimina la
columna vieja a ciegas — cuenta cuántos docentes tenían `facultad_id`, cuántos quedaron con
su fila equivalente en la tabla puente, y **solo retira la columna si los dos números
coinciden**; si no, aborta con diagnóstico y deja la base de datos intacta. Además es idempotente: se
puede reaplicar sobre una base de datos ya migrada sin efecto. Eso es lo que separa una migración
profesional de un script.

### P20. ¿Por qué `sesion_cohortes` repite datos que ya están en `sesiones`?

**Qué.** La tabla `sesion_cohortes` copia día, minutos y duración de la sesión. Es
desnormalización deliberada, no un descuido.

**Cómo.** La consistencia la mantienen dos triggers: `sesion_cohortes_completar_trg` rellena
los campos copiados al insertar, y `sesiones_propagar_cohortes_trg` los actualiza cuando la
sesión cambia de día u hora.

**Por qué.** Dos razones concretas:

1. **La restricción `EXCLUDE` necesita los datos en la misma fila.** `sesion_cohortes_no_solapadas`
   —"un grupo no puede tener dos clases encima"— compara rangos de minutos por cohorte. Una
   restricción de exclusión no puede mirar columnas de otra tabla; los datos tienen que estar
   ahí.
2. **Leer el horario de un grupo no necesita joins.**

La regla general de diseño sigue siendo normalizar (formas normales de Codd, 1970-71); la
desnormalización es una excepción que se justifica cuando hay una razón medible y **cuando
se acompaña de un mecanismo que garantice la consistencia**. Acá las dos condiciones se
cumplen, y el mecanismo son los triggers. Desnormalizar sin ese mecanismo es simplemente
datos que se van a contradecir.

### P21. ¿Qué es la idempotencia y dónde aparece?

**Qué.** Que repetir la misma operación no la duplique. En el esquema se implementa con la
columna `clave_solicitud`, presente en `importaciones`, `generaciones`, `notificaciones` y
`resultados_edicion`.

**Cómo.** El cliente manda un texto único por operación, y un índice único parcial impide
que la misma operación entre dos veces:

```sql
CREATE UNIQUE INDEX importaciones_clave_solicitud_uq
    ON horarios.importaciones (clave_solicitud)
    WHERE (clave_solicitud IS NOT NULL);
```

**Por qué.** Porque en HTTP las cosas se reintentan: el usuario hace doble clic, la red se
cae después de que el servidor procesó pero antes de que llegara la respuesta, un proxy
reintenta. Sin clave de idempotencia, "lanzar la generación" dos veces son dos generaciones
compitiendo por el mismo plan. Es un patrón estándar en APIs de pagos (Stripe lo llama
*Idempotency-Key*) y está estandarizado como cabecera HTTP en el RFC de la IETF sobre claves
de idempotencia. La clave es que **la garantía la da un índice único de la base de datos**, no una
comprobación previa en código, que volvería a ser un TOCTOU.

---

## 3. Arquitectura

### P22. ¿Por qué tantas capas? ¿No sería más simple todo junto?

**Qué.** Seis proyectos: `Dominio`, `Contratos`, `Aplicacion`, `Scheduler`,
`Infraestructura`, `Blazor`. Cada uno tiene un trabajo y solo uno.

**Cómo.** Las referencias reales, tomadas de los `.csproj` (esto es verificable abriendo los
archivos, no es un diagrama aspiracional):

```text
Horarios.Dominio         → (nada)
Horarios.Contratos       → (nada)
Horarios.Scheduler       → Contratos
Horarios.Aplicacion      → Dominio, Contratos
Horarios.Infraestructura → Dominio, Contratos, Aplicacion, Scheduler
Horarios.Blazor          → Contratos, Aplicacion, Infraestructura, Scheduler
```

Lo importante es lo que **no** está: `Dominio` no conoce a nadie. `Aplicacion` no conoce a
`Infraestructura`. `Scheduler` no conoce ni el dominio ni la base de datos.

**Por qué.** La separación no es estética; compra tres cosas concretas:

1. **Se puede probar el negocio sin base de datos.** Los 21 archivos de prueba de
   `Horarios.Aplicacion.Tests` corren en milisegundos porque sustituyen la persistencia por
   dobles. Si la lógica estuviera mezclada con el acceso a datos, cada prueba necesitaría un
   Postgres levantado, y una suite lenta es una suite que se deja de correr.
2. **Se puede cambiar una pieza sin tocar las demás.** La regla que hace esto posible es que
   las dependencias apuntan hacia adentro: lo estable (el dominio) no depende de lo volátil
   (la base de datos, el framework web). Es el **Principio de Inversión de Dependencias** de Robert C.
   Martin (1996), y la forma concreta que toma acá es la de **puertos y adaptadores** de
   Alistair Cockburn (2005): `Aplicacion` declara la interfaz `IDatosAulas` (el puerto) y
   `Infraestructura` la implementa con `DatosAulasPostgres` (el adaptador).
3. **Cada capa se lee sola.** Alguien que busca "dónde se decide si un aula es válida" abre
   `Horarios.Aplicacion/Aulas/CrearAula.cs` y encuentra las reglas sin ruido de HTTP ni de
   SQL alrededor.

El argumento de fondo es de David Parnas, *On the Criteria To Be Used in Decomposing Systems
into Modules* (CACM, 1972): un sistema se divide **ocultando las decisiones que pueden
cambiar**, no partiendo los pasos del proceso. Acá lo que puede cambiar es el proveedor de
base de datos y el framework de interfaz; los dos están encapsulados. Lo que no cambia —qué
es una cohorte, cuándo un plan puede pasar a aprobado— está en el centro y no depende de
nada.

**El costo, dicho honestamente:** más archivos, más ceremonia y más navegación para un
cambio trivial. Agregar un campo a un aula obliga a tocar el dominio, el contrato, el caso de
uso, el adaptador y la página. En un CRUD de tres pantallas esto sería sobrediseño. En un
sistema con un motor de generación, reglas de autorización por facultad y un ciclo de vida de
10 estados, la complejidad ya existe: la pregunta no es si tenerla, sino si estará ordenada
o dispersa.

### P23. ¿Por qué un proyecto .NET separado por capa y no carpetas dentro de uno solo?

**Qué.** Cada capa es un ensamblado distinto (`.csproj` propio), no una carpeta.

**Cómo.** Un proyecto solo puede usar los tipos de los proyectos que referencia. Como
`Horarios.Aplicacion.csproj` **no** referencia a `Horarios.Infraestructura`, escribir
`using Horarios.Infraestructura.Supabase;` dentro de un caso de uso no compila. No es que
esté mal visto: **es un error de compilación.**

**Por qué.** Esta es la respuesta central y conviene decirla exactamente así: *una regla de
arquitectura que no está verificada automáticamente no es una regla, es una recomendación*.
Con carpetas, la única cosa que impide que una página Blazor llame directo a Postgres es la
disciplina del equipo y la atención de quien revisa el código; y ambas fallan un viernes a
las seis. Con proyectos separados, lo impide el compilador, en cada compilación, para todos,
sin excepciones y sin discusión.

Es la idea de **fitness function** arquitectónica de Ford, Parsons y Kua (*Building
Evolutionary Architectures*, O'Reilly 2017): una comprobación objetiva y automatizada de una
característica arquitectónica. Acá esa función es gratis, porque la da el sistema de
referencias de .NET. La alternativa en un proyecto único sería escribir pruebas de
arquitectura (estilo ArchUnit/NetArchTest) que revisen los `using` — más trabajo para el
mismo resultado, y con detección más tardía.

Beneficios secundarios, menores pero reales: los ensamblados sin referencias externas
(`Dominio`, `Contratos`) se pueden reutilizar desde otro ejecutable —por ejemplo, una
herramienta de línea de comandos que corra el motor sin levantar la web—, y el grafo de
dependencias del sistema se lee abriendo seis archivos XML cortos.

### P24. ¿Y si mañana hay que salir de Supabase?

**Qué.** El cambio afectaría un solo proyecto: `Horarios.Infraestructura`.

**Cómo.** Todo lo que sabe que existe Supabase está ahí, y en un archivo concreto:
`Supabase/ClienteDatosSupabase.cs` —"es la única pieza del proyecto que habla HTTP con
Supabase", dice su propia documentación—. Los casos de uso hablan con interfaces
(`IDatosAulas`, `IDatosPlanes`, `IDatosDocentes`, `IDatosAcceso`...), y quién las cumple se
decide en un solo archivo: `Program.cs`. Migrar significaría escribir nuevos adaptadores que
implementen esas mismas interfaces y cambiar las líneas de registro.

**Por qué.** Esto es exactamente lo que compra la inversión de dependencias, y conviene ser
preciso al defenderlo para no prometer de más:

- **Lo que sí queda protegido:** las reglas de negocio, el dominio, el motor y las pantallas
  no se tocan.
- **Lo que no:** las 39 funciones SQL, los 42 triggers y las 242 políticas RLS son
  PostgreSQL. Migrar a otro PostgreSQL (RDS, Cloud SQL, un servidor propio) es viable —eso
  es SQL estándar más extensiones comunes—. Migrar a un motor que no sea PostgreSQL sería
  reescribir esa mitad del sistema.

O sea: la arquitectura desacopla del **proveedor**, no del **motor**. Y eso es una decisión
consciente, no un olvido: se eligió apoyarse fuerte en PostgreSQL (restricciones `EXCLUDE`,
RLS, rangos, índices parciales) porque esas capacidades son las que hacen imposibles ciertos
errores. Renunciar a ellas para ser portable habría significado reimplementar en C# —peor y
con condiciones de carrera— lo que el motor ya hace bien.

### P25. ¿Para qué sirve `Horarios.Contratos` si ya existe `Horarios.Dominio`?

**Qué.** `Dominio` tiene los conceptos del negocio con sus reglas (`PlanHorario` sabe qué
transiciones de estado son válidas). `Contratos` tiene tipos planos de transporte: DTOs de
solicitud, DTOs de respuesta y las interfaces que cruzan la frontera entre capas.

**Cómo.** El caso más claro es el motor.
`Horarios.Scheduler` referencia **únicamente** a `Horarios.Contratos`: recibe una
`InstantaneaMotor` y devuelve un `ResultadoMotor`. El comentario que encabeza
`Contratos/Motor/ContratoMotor.cs` lo declara: *"Los tipos de aquí son a propósito planos y
sin dependencias del dominio, para que el motor se pueda probar solo"*.

**Por qué.** Tres razones:

1. **Aísla el motor.** Al no depender del dominio ni de la base de datos, el motor es una función:
   entra una instantánea, sale un resultado. Se puede probar con datos inventados
   (`Horarios.Scheduler.Tests/EscenarioCompartido.cs`) y su comportamiento es determinista y
   reproducible.
2. **Lo que entra por el formulario no es lo que vive en el dominio.** `CrearAulaSolicitud`
   admite campos en nulo porque un formulario puede llegar incompleto; `Aula` no, porque un
   aula del dominio siempre está completa. Mezclarlos obligaría a que el dominio aceptara
   estados inválidos. Es el patrón *Data Transfer Object* de Fowler (PoEAA, 2002).
3. **Protege contra sobre-exposición.** El motor recibe del docente su carga máxima, sus
   cursos autorizados y su disponibilidad — *sin nombre ni correo*, porque no muestra nada.
   Menos datos viajando es menos superficie de fuga.

### P26. ¿Qué es inyección de dependencias y por qué `Program.cs` es tan largo?

**Qué.** Inyección de dependencias significa que una clase **recibe** lo que necesita en vez
de fabricarlo. `CrearAula` recibe un `IDatosAulas` y un `IContextoUsuario` por constructor;
nunca hace `new DatosAulasPostgres(...)`.

**Cómo.** `src/Horarios.Blazor/Program.cs` es la **raíz de composición**: el único archivo
del sistema que conoce a la vez a Aplicación, Infraestructura y Blazor, y donde se decide qué
implementación concreta recibe cada interfaz y con qué tiempo de vida:

```csharp
builder.Services.AddScoped<IDatosAulas, DatosAulasPostgres>();
builder.Services.AddScoped<CrearAula>();
```

**Por qué.**

- **Porque es lo que hace posible probar sin base de datos.** En las pruebas se registra un
  doble en lugar del adaptador real; el caso de uso no se entera.
- **Porque centraliza el cableado.** Si `new` estuviera repartido por el código, cambiar una
  implementación obligaría a buscar todas las apariciones. Acá es una línea.
- **Porque los tiempos de vida son decisiones, no accidentes,** y `Program.cs` obliga a
  tomarlas explícitamente. Los tres que se usan:
  - `AddScoped`: uno por circuito de usuario. Casi todo (casos de uso, adaptadores).
  - `AddSingleton`: uno para toda la aplicación. `NpgsqlDataSource`, porque administra su
    propio pool de conexiones; y `ColaTrabajosPesados`, porque un trabajo encolado tiene que
    sobrevivir a la petición que lo encoló.
  - `AddHttpClient`: fábrica gestionada de `HttpClient` — resuelve el problema conocido de
    agotamiento de sockets al crear clientes a mano, documentado por Microsoft.

El nombre "raíz de composición" y la regla de que sea **una sola y lo más cerca posible del
punto de entrada** son de Mark Seemann, *Dependency Injection in .NET* (Manning). El motivo
de que el archivo sea largo es precisamente que toda la ceremonia está concentrada ahí en vez
de dispersa: es la consecuencia buscada, no un problema.

### P27. ¿Por qué no hay una Web API propia?

**Qué.** El README lo dice explícito: *"No se usa una Web API propia, Entity Framework Core
ni ASP.NET Core Identity"*. El servidor Blazor llama directamente a la Data API de Supabase.

**Cómo.** El camino completo de una operación:

```text
Usuario → Página Blazor (.razor) → Caso de uso (Aplicación)
       → Adaptador (Infraestructura) → ClienteDatosSupabase → Data API REST
       → RLS → PostgreSQL
```

**Por qué.** Una Web API propia sería una capa más que **traduciría HTTP a HTTP**: el
navegador ya no la necesita, porque con Blazor Server la lógica de pantalla corre en el
servidor y llama a los casos de uso por invocación directa de métodos, no por red. Agregar
un proyecto de API significaría escribir controladores, contratos de entrada y salida,
versionado y su propia autenticación, **para exponer lo que ya está expuesto por PostgREST
con RLS aplicado**.

La contrapartida honesta: sin API propia no hay un punto único donde poner reglas
transversales de HTTP (límite de peticiones, caché, un contrato estable para terceros). Si
mañana un sistema externo tuviera que consumir horarios, la decisión se revisaría. Hoy el
único consumidor es la propia aplicación, y agregar la capa sería pagar el costo sin obtener
el beneficio — lo que Fowler llama arquitectura especulativa.

### P28. ¿Por qué Blazor del lado del servidor y no WebAssembly?

**Qué.** Los componentes se registran con `AddInteractiveServerComponents()` y las páginas
usan `InteractiveServer`: la lógica de la interfaz se ejecuta **en el servidor** y el
navegador solo recibe las diferencias de la pantalla, por un canal persistente (SignalR
sobre WebSocket).

**Cómo.** Cuando el usuario pulsa "Agregar aula", el método `GuardarAula()` no corre en el
navegador: corre en el servidor, que ya tiene el token del usuario y el acceso a los
servicios. Por eso los servicios `Scoped` viven mientras dure el *circuito* del usuario, no
una sola respuesta HTTP — está comentado en `Program.cs`.

**Por qué.**

1. **El token de Supabase nunca llega al navegador.** Viaja dentro de una cookie `HttpOnly`,
   inaccesible para JavaScript. Con WebAssembly, el token tendría que vivir en el cliente y
   quedaría expuesto a cualquier XSS. Es una diferencia de superficie de ataque, no de gusto.
2. **No hay que duplicar validaciones ni construir una API pública** para que el cliente
   consulte.
3. **Carga inicial liviana:** no hay que descargar un runtime .NET al navegador.

**El costo:** cada usuario conectado consume memoria en el servidor mientras dure su
circuito, y una desconexión de red interrumpe la sesión interactiva. Para una aplicación
administrativa interna, con decenas de usuarios simultáneos en red estable, el intercambio
favorece claramente al modelo de servidor. Para una aplicación pública masiva o que deba
funcionar sin conexión, no.

### P29. ¿Por qué la generación se ejecuta en segundo plano?

**Qué.** Lanzar una generación no bloquea la pantalla. La petición encola el trabajo y
devuelve; un servicio de fondo lo va procesando.

**Cómo.** Tres piezas: `ColaTrabajosPesados` (un `Channel` acotado, registrado como
`Singleton`), `ProcesadorTrabajosPesados` (un `IHostedService` que arranca con la aplicación
y va vaciando la cola) y `EjecutarGeneracionPlan` (el caso de uso que corre el motor,
verifica el resultado y cierra la generación). El estado de cada corrida queda en
`horarios.generaciones`, que la pantalla consulta.

**Por qué.**

- **Una petición HTTP no es el lugar para un trabajo largo.** Los proxies y balanceadores
  cortan por tiempo de espera; el usuario recarga la página y dispara una segunda corrida;
  el hilo queda ocupado sin poder atender a nadie más.
- **El estado tiene que sobrevivir a la petición.** Por eso la cola es `Singleton` y el
  progreso se guarda en la base de datos: si el usuario cierra el navegador, la generación sigue y él
  puede volver a mirar el resultado.
- **El manejo de errores es explícito:** el bloque de captura de `EjecutarGeneracionPlan`
  cierra la generación y deja el plan en `Fallido` incluso si el motor revienta, *"para que
  nunca quede colgado en Generando"*. Un estado transitorio sin salida garantizada es una
  fuente segura de registros zombis.

Es el patrón *Competing Consumers* / cola de trabajo, estándar en sistemas empresariales
(Hohpe & Woolf, *Enterprise Integration Patterns*, 2003).

### P30. ¿Por qué la misma validación se hace tres veces?

**Qué.** Que un usuario pueda crear un aula se comprueba en tres lugares: la política de
autorización de la página, el caso de uso (`AutorizacionAplicacion.Exigir(contexto, "aulas",
"crear")`) y la política RLS de PostgreSQL.

**Cómo.** Cada capa comprueba lo suyo y para algo distinto:

| Capa | Qué evita | Si falla sola |
|---|---|---|
| Presentación (políticas de autorización) | Pintar pantallas que la base de datos rechazará | Mala experiencia, no un agujero |
| Aplicación (caso de uso) | Ejecutar reglas de negocio sin permiso | Reglas saltables por otra entrada |
| Base (RLS + triggers + constraints) | Cualquier escritura ilegítima, venga de donde venga | **Agujero real** |

**Por qué.** No es redundancia por desconfianza: cada capa cubre un vector distinto. La de
presentación es usabilidad. La de aplicación protege reglas que la base de datos no conoce (por
ejemplo, "el autor del cambio de estado debe ser el usuario autenticado", en
`CambiarEstadoPlan`). La de la base de datos es la única que cubre las entradas que no pasan por la
aplicación: PostgREST directo, Studio, `psql`.

El principio se llama **defensa en profundidad** y la formulación operativa es la de Saltzer
y Schroeder (1975): *complete mediation* —todo acceso pasa por el control— y *fail-safe
defaults* —la duda se resuelve negando—. Esto último está implementado literalmente en
`VerificarPermiso`: *"Con datos incompletos responde que no: en una comprobación de acceso,
la duda se resuelve negando"*.

Y hay una consecuencia práctica que conviene decir en voz alta: **ocultar un botón no es
autorizar**. Está escrito así en `docs/sprint3.md` (R6).

---

## 4. Módulos

### 4.1 Academia

#### P31. ¿Qué administra el módulo de Academia?

**Qué.** La estructura académica sobre la que se arma cualquier horario: facultades,
carreras, pensums, cursos, cursos por pensum, cohortes, activaciones de cohorte por período,
períodos académicos y agrupaciones de área común.

**Cómo.** Casos de uso en `src/Horarios.Aplicacion/Academia/` (`CrearFacultad`,
`CrearCarrera`, `GestionarCatalogosAcademicos`, `GestionarPeriodosAcademicos`,
`GestionarAcademia`, `SugerirNuevaSeccion`), pantalla en
`Components/Pages/Academia.razor`, persistencia en
`Infraestructura/Academia/DatosAcademiaPostgres.cs` y hermanos.

**Por qué existe como módulo aparte.** Porque es el vocabulario del que dependen todos los
demás: un plan se genera para un período, una cohorte pertenece a una carrera y a un pensum,
un curso solo es programable si está colocado en un pensum con una cantidad de bloques
semanales. Si estos datos no están completos, ningún horario es posible — y eso es
exactamente lo que verifica `RevisarDatosPlan` antes de dejar generar.

#### P32. ¿Qué es un pensum y por qué una carrera tiene varios a la vez?

**Qué.** Un pensum es el plan de estudios de una carrera para un año de ingreso determinado.
`Pensum(Id, CarreraId, AnioCreacion, Estado)`, con estados `Borrador`, `Vigente`,
`EnRetiro`, `Retirado`.

**Cómo.** Lo que convierte un pensum en carga programable es `CursoEnPensum`: dice en qué
semestre se cursa un curso y **cuántos bloques semanales exactos** exige. La documentación
del tipo es enfática: `BloquesSemanalesExactos` *"es exacto, no un mínimo: el motor coloca
esa cantidad ni más ni menos"*.

**Por qué varios a la vez.** Porque las cohortes viejas **terminan la carrera con el pensum
con el que entraron**. Cuando la universidad reforma un plan de estudios, los que ya están
cursando no cambian de plan a mitad de camino. De ahí los cuatro estados: `Vigente` es el
que reciben las cohortes nuevas, `EnRetiro` ya no recibe cohortes nuevas pero las que lo
cursan lo terminan, `Retirado` es historia. Modelarlo así evita el error clásico de tener un
solo plan de estudios "actual" y perder la información de lo que realmente cursó cada
generación.

#### P33. ¿Qué es una cohorte y por qué es la unidad que recibe clases?

**Qué.** El grupo de estudiantes que entró junto a una carrera y avanza junto por el pensum:
carrera + pensum + jornada + año de ingreso + sección, con una matrícula estimada.

**Cómo.** Su documentación en el dominio lo define de forma operativa: *"Es la unidad que
recibe clases: dos sesiones no pueden chocar en la misma cohorte"*. Eso está garantizado por
la restricción `sesion_cohortes_no_solapadas` en la base de datos.

**Por qué la cohorte y no el estudiante.** Porque el sistema **no matricula estudiantes**;
programa grupos. Modelar por estudiante multiplicaría el tamaño del problema por varios
órdenes de magnitud sin cambiar el resultado: todos los de una cohorte toman los mismos
cursos del mismo semestre. La `MatriculaEstimada` es lo único que se necesita del tamaño del
grupo, y sirve para descartar aulas que no alcanzan.

Notar la separación entre `Cohorte` (identidad estable) y su activación por período
(`cohorte_periodos`, con `semestre_asignado`): **la cohorte no cambia, su semestre sí**. Un
solo registro por grupo y un registro por período en que avanza.

#### P34. ¿Qué es un curso de área común y por qué necesita agrupaciones explícitas?

**Qué.** Un curso que varias carreras cursan juntas (matemática básica, por ejemplo). El
motor debe dictarlo **una sola vez** para todas las cohortes involucradas, no una vez por
carrera.

**Cómo.** El curso se marca con `EsAreaComun`, pero eso no basta: hay una entidad explícita,
`agrupaciones_area_comun`, con sus tablas puente `agrupacion_area_comun_cursos` y
`agrupacion_area_comun_cohortes`. `ExpansorSesiones` consolida cada agrupación en una sola
sesión compartida, sumando los alumnos de todas las cohortes y uniendo los recursos
requeridos, y exige que todos los cursos de una agrupación coincidan en cantidad y duración
de sesiones (si no, lanza excepción).

**Por qué explícita y no inferida.** Porque adivinar qué cursos son "el mismo" a partir del
nombre o del código es frágil: dos carreras pueden llamar distinto al mismo curso o igual a
cursos distintos. Una agrupación explícita convierte una decisión académica —que la toma
una persona— en un dato, en vez de en una heurística de comparación de cadenas. Además, la
tabla `sesiones` refleja esto con un `CHECK` de coherencia: *o es área común y tiene
agrupación, o no lo es y no la tiene*, nunca a medias.

### 4.2 Aulas y jornadas

#### P35. ¿Qué es una jornada y por qué el horario se mide en bloques y no en horas?

**Qué.** Una jornada es un turno (matutina, vespertina, nocturna): define la rejilla de
tiempo sobre la que se arma el horario. Guarda qué días tiene clase, hora de inicio y fin,
duración de cada bloque, cuántos bloques por día, y dónde cae el receso.

**Cómo.** `Jornada` en el dominio documenta que `DuracionBloqueMinutos` *"es la unidad mínima
de tiempo: todo se mide en múltiplos de esto"*, y los bloques se numeran desde 1 hasta
`BloquesPorDia`.

**Por qué en bloques.** Porque convierte un problema continuo en uno discreto. Si el motor
razonara en minutos, tendría que evaluar infinitas posiciones de inicio posibles; razonando
en bloques, cada sesión ocupa un índice entero y comprobar solapes es comparar intervalos de
enteros. Esa es también la razón de que la tabla `sesiones` tenga
`rango_slots int4range GENERATED ALWAYS AS (...) STORED`: el solape se resuelve con el
operador `&&` sobre rangos, indexado por GiST, en vez de con aritmética de fechas.

**El detalle fino, y es una buena pregunta de examen:** el motor **no sabe nada de recesos**.
Coloca en bloques. La traducción de bloques a minutos reales del reloj —incluyendo empujar
las sesiones posteriores al receso— la hace un trigger de la base de datos,
`zz_sesiones_aplicar_receso_trg`, y solo alarga el final si la sesión *cruza* el receso. El
prefijo `zz` no es capricho: garantiza que corra **al final**, cuando el resto de las
validaciones ya pasaron.

#### P36. ¿Cómo se valida que un aula sea correcta y dónde?

**Qué.** El caso de uso `CrearAula` normaliza y valida antes de escribir.

**Cómo.** En orden, tal como está en `Aplicacion/Aulas/CrearAula.cs`:

1. `AutorizacionAplicacion.Exigir(contexto, "aulas", "crear")` — permiso primero, antes de
   trabajar.
2. Normalización: el código se recorta y pasa a mayúsculas (`Trim().ToUpperInvariant()`).
3. Reglas: código obligatorio, capacidad mayor que cero, número de aula obligatorio.
4. Regla de negocio real: `ExisteAulaEnPisoAsync(piso, numero)` — no puede haber dos aulas
   con el mismo número en el mismo piso.
5. Recién ahí, `CrearAulaAsync`.

**Por qué normalizar antes de validar.** Porque si no, `" a-101 "` y `"A-101"` serían aulas
distintas y el índice único no las detectaría como duplicadas. La normalización es parte de
la regla, no un adorno; `ToUpperInvariant` (y no `ToUpper` a secas) evita el clásico problema
de la I turca, donde la cultura del servidor cambia el resultado de convertir mayúsculas.

Vale notar un detalle documentado en el propio código: el número de aula es obligatorio en el
caso de uso aunque el contrato lo admita nulo, *"porque quien la da de alta a mano siempre lo
conoce, y sin él no se puede comprobar que no choque con otra del mismo piso"*. Esa es la
diferencia entre un DTO (permisivo, porque un formulario llega como llega) y un caso de uso
(estricto, porque es donde vive la regla).

### 4.3 Docentes

#### P37. ¿Por qué un docente pertenece a varias facultades?

**Qué.** Antes, `horarios.docentes` tenía una columna `facultad_id` anulable: un docente
pertenecía a una facultad o a ninguna. Hoy la relación es N:M mediante la tabla puente
`docente_facultades`.

**Cómo.**

```sql
create table horarios.docente_facultades (
    docente_id  uuid not null references horarios.docentes  (id) on delete cascade,
    facultad_id uuid not null references horarios.facultades (id) on delete restrict,
    creado_en   timestamptz not null default now(),
    primary key (docente_id, facultad_id)
);
create index docente_facultades_facultad_idx on horarios.docente_facultades (facultad_id);
```

Del lado .NET, `Docente` expone `FacultadIds`, y dos métodos que concentran la regla:
`EsCompartido` (sin facultades declaradas) y `PerteneceAAlguna(facultades)`.

**Por qué.** Porque el modelo anterior perdía información real y **eso tenía consecuencias
de acceso, no solo de datos**: el mismo profesor de estadística da clases en Ingeniería y en
Economía; el modelo obligaba a elegir una, y como el alcance del decano se calcula con esa
columna, el decano de la facultad "no elegida" no podía gestionar a un docente que sí era
suyo. La cardinalidad real es N:M y ahora se modela como tal.

Cuatro decisiones que no se ven en el DDL y vale la pena saber explicar:

- **La clave primaria compuesta es el deduplicador.** Asignar dos veces la misma facultad al
  mismo docente es imposible *por definición*, no por validación.
- **`on delete cascade` hacia docentes / `on delete restrict` hacia facultades:** borrar un
  docente se lleva sus pertenencias; una facultad con docentes no se borra por accidente.
- **El índice sobre `facultad_id`** sirve la consulta inversa —"docentes de esta facultad"—,
  que es la del alcance del decano. La clave primaria ya cubre el sentido directo.
- **El significado de "sin facultad" se conservó:** cero filas equivale exactamente al
  antiguo `facultad_id` nulo. Ningún registro cambió de comportamiento con la migración.

#### P38. ¿Por qué `fijar_facultades_docente` reemplaza el conjunto entero?

**Qué.** La función recibe el arreglo completo de facultades y deja al docente exactamente
con esas: lo que no venga en el arreglo queda desasignado.

**Cómo.** El borrado interno es **diferencial**, no "borrar todo y reinsertar", para que
`creado_en` sobreviva en las facultades que la edición no tocó. Un arreglo vacío o nulo es
válido y significa "sin facultades". No es `security definer`: RLS se evalúa con el usuario
que llama.

**Por qué reemplazo total y no altas/bajas fila por fila.** Porque la aplicación edita el
conjunto entero (una lista de casillas marcadas), y con operaciones fila por fila dos
ediciones concurrentes pueden dejar **mitad del conjunto viejo y mitad del nuevo** — un
estado que ningún usuario pidió. Reemplazar el conjunto completo en una sola llamada
atómica hace que el resultado sea siempre uno de los dos estados que alguien quiso. Es el
mismo contrato que `fijar_alcance_plan` para el alcance de un plan, por la misma razón.

#### P39. ¿Qué significa "autorizar un curso a un docente"?

**Qué.** Declarar que un docente **puede** impartir cierto curso, opcionalmente acotado a una
carrera, facultad o jornada. Vive en `asignaciones_docente_curso`; se otorga con
`autorizar_curso_docente(...)` y se revoca con `revocar_curso_docente(...)`, que no borra:
pone `esta_vigente = false`.

**Cómo.** El motor recibe únicamente los cursos con autorización vigente
(`Contratos/Motor`, campo `CursosAutorizados`) y su documentación es tajante: *"Fuera de
esta lista, el motor no le asigna nada"*. El verificador independiente rechaza cualquier
sesión con un docente no autorizado.

**Por qué separar "puede dar" de "va a dar".** Porque son decisiones de distinta naturaleza y
distinto dueño: la autorización es una decisión académica y administrativa (competencia,
titulación, contrato), y la asignación concreta es una decisión de optimización que toma el
motor cada vez que genera. Si se mezclaran, cada corrida del motor estaría reescribiendo
decisiones administrativas. Separarlas también hace que la autorización sea auditable: queda
quién la otorgó y cuándo, independientemente de cuántos horarios se generen después.

#### P40. ¿Cómo funciona la disponibilidad docente y por qué son tres tablas?

**Qué.** El docente declara en qué franjas puede dar clase durante un período. Es un límite
duro: el motor no le coloca nada fuera de ahí.

**Cómo.** Tres tablas con papeles distintos:

| Tabla | Qué guarda |
|---|---|
| `disponibilidades_docente` | Cabecera: un docente, un período, si está confirmada |
| `ventanas_disponibilidad` | Las franjas tal como las declaró la persona |
| `disponibilidad_docente_slots` | Lo mismo expandido a bloques concretos |

`guardar_disponibilidad_docente(...)` guarda las franjas **y** las expande. El caso de uso
`GestionarDisponibilidadDocente` rechaza casillas repetidas antes de escribir: *"dos filas
para la misma casilla se contradirían y no habría forma de saber cuál vale"*.

**Por qué guardar las dos formas.** Porque sirven a dos lectores distintos. La ventana es lo
que la persona quiso decir ("los martes de 7 a 11") y es lo que hay que mostrarle de vuelta
para que lo edite; los slots son lo que el motor consulta, y consultarlos ya expandidos evita
recalcular la expansión en cada iteración del algoritmo — que es el bucle más caliente del
sistema. Es un caso de **desnormalización por rendimiento con una fuente de verdad clara**: la
ventana manda, el slot se deriva, y una sola función escribe las dos.

Nota importante: `RevisarDatosPlan` exige disponibilidad **confirmada** para dejar generar.
Declarada pero sin confirmar no cuenta.

#### P41. ¿Quién puede ver y editar la disponibilidad de quién?

**Qué.** Un docente edita la suya; un decano, la de los docentes de sus facultades;
coordinación y superadministración, la de todos.

**Cómo.** La regla no se resuelve con un permiso simple, sino con una interfaz aparte:
`IContextoGestionDocentes`, con `EsAdministrador`, `EsDecano`, `DocenteId` y `FacultadIds`.
Su documentación explica por qué existe: *"Es aparte de `IContextoUsuario` porque aquí no
basta con tener un permiso: la decisión depende de a quién se está tocando"*. La comprobación
de facultades usa el método del dominio `Docente.PerteneceAAlguna(...)` — *basta una facultad
en común*.

**Por qué separar permiso de alcance.** Porque son dos preguntas distintas: **qué acciones**
puede hacer alguien (permiso: `docentes:actualizar`) y **sobre qué datos** puede hacerlas
(alcance: sus facultades, su propio registro). Dos decanos tienen el mismo permiso y distinto
alcance. Mezclarlos llevaría a inventar un permiso por facultad, que no escala y que hay que
recrear cada vez que nace una facultad. La distinción es la que en la literatura de control
de acceso separa RBAC (roles y permisos) de ABAC (atributos: a qué facultad pertenece el
recurso); el estándar de referencia es NIST SP 800-162 para ABAC y ANSI INCITS 359 para RBAC.
Este sistema usa RBAC para el permiso y un atributo (facultad) para el alcance.

### 4.4 Planes

#### P42. ¿Qué es un plan de horario? ¿No es lo mismo que un horario?

**Qué.** El plan es el **encargo**: qué período cubre, qué parte de él, de qué tipo (clases o
exámenes) y en qué etapa va. El horario es el **resultado**: las sesiones colocadas.

**Cómo.** `PlanHorario` en el dominio guarda período, tipo, plan de origen (si es una versión
derivada), número de versión, estado, motivo del estado, y su alcance: `CarreraIds` y
`JornadaIds`. Con una regla explícita: **listas vacías significan todo el período**
(`CubreTodoElPeriodo`).

**Por qué distinguirlos.** Porque el mismo encargo puede producir muchos resultados: se
genera, no gusta, se corrigen datos, se regenera. Si plan y horario fueran lo mismo, cada
regeneración perdería la trazabilidad de qué se pidió. Además el plan es lo que tiene ciclo
de vida y responsable; el horario es un artefacto reemplazable — de hecho
`guardar_resultado_generacion(...)` **borra el horario anterior del plan y escribe el nuevo**,
un reemplazo total. Eso solo es seguro porque lo que hay que conservar (el encargo, el
historial de corridas, las versiones publicadas) vive en otro lado.

#### P43. ¿Por qué un plan tiene 10 estados y quién decide los saltos válidos?

**Qué.** `Borrador`, `Generando`, `Generado`, `EnRevision`, `PendienteAprobacion`,
`Aprobado`, `Publicado`, `Archivado`, `Fallido`, `Inviable`.

**Cómo.** Los saltos permitidos están escritos **en un solo lugar**, el diccionario
`Transiciones` de `PlanHorario`, y el método `CambiarEstado` los hace cumplir:

```csharp
[EstadoHorario.Borrador]   = [Generando, PendienteAprobacion, Archivado],
[EstadoHorario.Generando]  = [Generado, Fallido, Inviable],
[EstadoHorario.Generado]   = [EnRevision, PendienteAprobacion],
[EstadoHorario.Aprobado]   = [Publicado, Archivado],
[EstadoHorario.Archivado]  = []        // es el final
```

`CambiarEstado` devuelve una **copia** con el estado nuevo; no modifica el original ni guarda
nada. Además exige un motivo obligatorio.

**Por qué tantos y por qué ahí.**

- **Por qué tantos:** cada estado corresponde a una situación real y distinta en la que puede
  estar un plan. La distinción entre `Fallido` (el motor se cayó: reintentar puede funcionar)
  e `Inviable` (el motor terminó bien y no existe horario posible con estos datos: hay que
  corregir datos) es la más valiosa, porque implica acciones opuestas para el usuario. Un solo
  estado "error" obligaría a leer bitácoras para saber qué hacer.
- **Por qué en el dominio:** tener el ciclo de vida en un solo lugar *"evita que cada pantalla
  invente sus propias reglas"*. Es una máquina de estados finitos, y su virtud es que los
  saltos ilegales son imposibles de expresar, no solo desaconsejados.
- **Por qué el motivo es obligatorio:** es lo único que queda escrito de *por qué* se movió un
  plan. Un historial de estados sin motivos es una lista de horas.

#### P44. ¿Qué comprueba `CambiarEstadoPlan` además de la transición?

**Qué.** Tres cosas más, y cada una responde a un riesgo distinto.

**Cómo.**

1. **El permiso depende del destino.** Aprobar exige `planes:aprobar`, publicar exige
   `planes:publicar`, el resto se conforma con `planes:actualizar`. *Un mismo caso de uso,
   tres puertas distintas.*
2. **No se puede atribuir el cambio a otra persona:** si `CambiadoPorId` no coincide con el
   usuario autenticado, se rechaza.
3. **Antes de `PendienteAprobacion`, `Aprobado` o `Publicado` se exige que el horario esté
   completo y sin violaciones duras** (`EsCompletoYValidoAsync`, que en la base de datos es
   `plan_es_completo_y_valido`: tiene sesiones **y** no le quedó nada sin asignar **y** no
   tiene conflictos duros **y** el contador de violaciones duras está en cero).

**Por qué.** Porque ahí es donde el plan *"deja de ser un borrador de trabajo y pasa a valer
para todos"*. Los tres controles cubren: escalada de privilegios (aprobar sin ser aprobador),
repudio (atribuir un cambio a otro), y publicación de un horario inválido. El último es el
más importante en términos de daño: un horario publicado con una violación dura significa
docentes o alumnos citados en dos lugares a la vez.

#### P45. ¿Por qué un horario publicado no se puede editar?

**Qué.** Ocho triggers de bloqueo custodian ocho tablas. Sobre `sesiones` el trigger cubre
`INSERT OR DELETE OR UPDATE` — **las tres**: *a esta tabla no se le hace nada si su horario ya
está publicado*.

**Cómo.** Para cambiar algo hay que crear una **versión derivada** con
`crear_version_derivada(...)`, que clona el horario publicado, mueve la sesión pedida y usa
`pg_advisory_xact_lock` para que dos ediciones simultáneas no se pisen. Después,
`comparar_version_horario(...)` muestra las diferencias.

**Por qué.** Porque un horario publicado es un **documento oficial**: ya lo vieron
estudiantes y docentes, y probablemente ya organizaron su semana con él. Editarlo en el lugar
significaría que alguien consultó una versión que después dejó de existir, sin rastro. La
versión derivada conserva el original, deja registrado qué cambió y respecto de qué, y
permite comunicar el cambio. Es el mismo principio que hace que en contabilidad no se borre
un asiento sino que se emita otro que lo corrige: **inmutabilidad de lo publicado más
corrección por adición**, no por sobrescritura.

#### P46. ¿Qué hace la revisión previa y por qué existe?

**Qué.** `RevisarDatosPlan` cuenta lo que hay y dice, en español, qué falta para poder
generar.

**Cómo.** Consulta conteos limitados al alcance del plan y arma la lista de faltantes:
período inexistente, sin cohortes activas, cohortes sin cursos para su semestre y pensum, sin
aulas activas, sin docentes con cursos autorizados, sin disponibilidad confirmada. Lo llama
la pantalla **antes de ofrecer el botón de generar**, y lo vuelve a llamar
`GenerarHorarioPlan` **antes de arrancar el motor**.

**Por qué.** La justificación está escrita en el propio código: *"Existe para que el error se
vea en los datos y no en un horario vacío media hora después"*. Es la diferencia entre un
sistema que falla temprano y con diagnóstico, y uno que falla tarde y sin explicación.

Hay un detalle de diseño que vale citar porque demuestra cuidado real: cuando no hay
cohortes, el mensaje cambia según el plan cubra todo el período o solo una parte, *"no es lo
mismo que el período esté vacío que haber elegido un alcance donde no cae nadie, y
confundirlos lleva a buscar el problema en el sitio equivocado"*. Un mensaje de error que
manda a la persona a mirar el lugar equivocado cuesta más que no dar mensaje.

Y sobre por qué se comprueba **dos veces**: entre que la pantalla habilita el botón y el
usuario lo pulsa, alguien pudo desactivar la última jornada. Confiar en una comprobación
hecha en la interfaz es, otra vez, un TOCTOU.

### 4.5 Acceso

#### P47. ¿Cómo funciona el inicio de sesión?

**Qué.** Contra Supabase Auth, con la sesión del sitio guardada en una cookie.

**Cómo.** El recorrido completo:

1. `AutenticadorSupabase` envía correo y contraseña a `/auth/v1/token`.
2. Supabase Auth devuelve un JWT.
3. El servidor lo guarda **dentro de la cookie de sesión** como claim, junto con los permisos
   y la versión de la fila del usuario. La cookie es `HttpOnly`, `SameSite=Lax`, `Secure`
   fuera de desarrollo, y **no** tiene expiración deslizante.
4. En cada petición, `ContextoTokenSupabaseHttp` recupera el token y
   `ClienteDatosSupabase` lo manda como `Authorization: Bearer ...`, para que PostgreSQL
   pueda identificar al usuario con `auth.uid()` y aplicar RLS.

Iniciar y cerrar sesión son **endpoints HTTP**, no componentes Blazor
(`EndpointsAcceso.Mapear(app)`), *"porque el inicio de sesión tiene que escribir una cookie, y
eso no se puede hacer desde un circuito de Blazor interactivo, que para entonces ya mandó las
cabeceras"*.

**Por qué así.** `HttpOnly` impide que el JavaScript de la página lea el token: si hubiera una
vulnerabilidad de XSS, el atacante no podría robarlo. Que **no** haya expiración deslizante es
deliberado y está comentado: no hay renovación de tokens implementada, así que extender la
cookie dejaría al usuario dentro del sitio con un token que Supabase ya rechaza — se vería
"logueado" pero fallaría cada operación. **Que la sesión del sitio caduque exactamente cuando
caduca el token es una decisión de coherencia, no un olvido.**

#### P48. Si alguien tiene un JWT válido y le revocan un permiso, ¿qué pasa?

**Qué.** Deja de poder operar de inmediato, sin esperar a que caduque el token.

**Cómo.** Dos mecanismos que se refuerzan:

1. **En cada petición autenticada**, el evento `OnValidatePrincipal` de la cookie compara la
   `version_fila` del usuario guardada al iniciar sesión contra la actual en la base de datos
   (`SigueVigenteAsync`). Si cambió, se rechaza el principal y la persona vuelve a la pantalla
   de acceso.
2. **En la base de datos**, `usuario_actual_id()` filtra por `estado = 'activo'` y `eliminado_en is
   null`: un usuario dado de baja deja de existir para todas las políticas RLS.

**Por qué.** Porque un JWT es, por diseño, un documento firmado que el servidor no consulta:
esa es su ventaja (no hace falta ir a la base de datos para validarlo) y su desventaja conocida
(**no se puede revocar antes de que expire**; ver RFC 7519 y la guía de OWASP sobre gestión de
sesiones con tokens). La solución estándar es exactamente esta: una comprobación de vigencia
contra un dato del servidor. Acá esa comprobación reutiliza `version_fila`, que ya existía
para el bloqueo optimista — cambiar el rol de alguien incrementa su versión, y eso invalida su
sesión. **Un mecanismo, dos usos.**

#### P49. ¿Cómo se modelan roles y permisos?

**Qué.** RBAC clásico: usuario → roles → permisos, donde un permiso es el par
`(recurso, acción)`.

**Cómo.** Tablas `usuarios`, `roles`, `permisos_acceso`, `rol_permisos`, `usuario_roles`,
`usuario_facultades`. Los permisos se ven en las políticas como
`usuario_actual_tiene_permiso('aulas', 'crear')` y en C# como
`AutorizacionAplicacion.Exigir(contexto, "aulas", "crear")`. La lista completa registrada en
`Program.cs` tiene 18 permisos: `academia:crear`, `academia:leer`, `auditoria:administrar`,
`auditoria:leer`, `aulas:crear`, `aulas:leer`, `consultas:leer`, `docentes:actualizar`,
`docentes:leer`, `importaciones:importar`, `motor:generar`, `planes:actualizar`,
`planes:aprobar`, `planes:crear`, `planes:leer`, `planes:publicar`, `reportes:exportar`,
`sustituciones:crear`. Los roles funcionales son Superadministrador, Coordinador académico,
Decano y Docente.

**Por qué par (recurso, acción) y no un permiso por pantalla.** Porque el par es
composicional: agregar una acción nueva sobre un recurso existente no obliga a repensar el
modelo, y la misma comprobación sirve en la interfaz, en el caso de uso y en RLS. Comprobar
contra el permiso y no contra el rol (`if (esDecano)`) es lo que permite que crear un rol
nuevo sea configuración de datos y no un cambio de código. Es el modelo RBAC estándar
(ANSI INCITS 359-2004): los roles agrupan permisos, y el código habla de permisos.

**Una debilidad conocida, y conviene admitirla antes de que la señalen:** la lista de permisos
de `Program.cs` está escrita a mano y **tiene que coincidir** con la que existe en la base de datos. El
propio comentario lo advierte: *"un permiso nuevo allí no aparece aquí solo"*. Es duplicación
de una fuente de verdad, mitigada porque la autoridad real es RLS —si las listas divergen, la
base de datos rechaza igual—, pero es deuda técnica reconocida.

### 4.6 Importaciones

#### P50. ¿Qué hace el módulo de importaciones y qué **no** hace todavía?

**Qué.** Permite subir CSV o XLSX, validarlos y ver una **vista previa normalizada** de lo
que se importaría. La vista previa **no persiste nada**.

**Cómo.** Cuatro casos de uso en `Aplicacion/Importaciones/`: `ValidarArchivoImportacion`
(metadatos del archivo), `ValidarImportacionPlantilla` (que coincida con la plantilla y su
versión), `GenerarVistaPreviaCsv` y `GenerarVistaPreviaImportacion`. La confirmación real está
del lado de la base de datos, en `confirmar_importacion(...)`, que crea la importación y vuelca las
filas a los catálogos dentro de una transacción.

**Por qué la vista previa separada de la confirmación.** Porque importar es una operación
masiva y difícil de deshacer: quien la ejecuta necesita ver qué va a pasar **antes** de que
pase. Separar validar de aplicar convierte un error caro en un error barato.

#### P51. ¿Por qué la validación no se detiene en el primer error?

**Qué.** `ValidarArchivoImportacion` acumula todos los problemas y devuelve la lista completa.

**Cómo.** Está documentado en el código: *"No se detiene en el primer error a propósito: quien
está importando corrige de una vez en lugar de descubrir los fallos uno por uno"*. Cada error
lleva archivo, hoja, fila y columna.

**Por qué.** Porque el costo de un ciclo corregir-reintentar en una importación es alto (subir
otra vez, esperar, volver a mirar). Una validación que corta al primer error convierte un
archivo con doce problemas en doce ciclos. Es un criterio de usabilidad estándar en validación
de formularios y de datos por lote, y en este caso además es barato de implementar: la
validación no tiene efectos secundarios, así que seguir después de un error no arriesga nada.

#### P52. ¿Por qué los errores tienen código además de mensaje?

**Qué.** `CodigosErrorImportacion` define constantes estables en mayúsculas:
`ARCHIVO_EXTENSION_NO_SOPORTADA`, `COLUMNA_REQUERIDA`, `VALOR_FORMATO_INVALIDO`, etc.

**Cómo.** El comentario del archivo lo explica: *"Son cadenas estables y en mayúsculas: el
mensaje se puede reescribir o traducir sin romper nada, porque quien compara —las pruebas y la
interfaz— lo hace por el código"*.

**Por qué.** Porque el mensaje es para humanos y el código es para máquinas, y confundirlos
acopla la lógica al texto: cualquier corrección de redacción rompería pruebas o condicionales.
Separarlos es la misma razón por la que HTTP tiene un número de estado además de una frase, y
por la que PostgreSQL define `SQLSTATE` además del texto del error.

#### P53. ¿Qué se hace con las fórmulas de un XLSX?

**Qué.** Se detectan **sin ejecutarse**. Está registrado como criterio de cierre en
`docs/sprint2.md` (R5) y `docs/sprint3.md` (R5).

**Por qué.** Porque una hoja de cálculo no es un archivo de datos: es un archivo con código.
Evaluar fórmulas de un archivo subido por un usuario significa ejecutar lógica de origen no
confiable dentro del servidor, y en el ecosistema de Office esa clase de contenido incluye
vectores conocidos como fórmulas de enlace externo o funciones que provocan peticiones de red
(el caso más citado es la inyección de fórmulas CSV/XLSX, catalogada por OWASP como *CSV
Injection*). Leer el valor literal de la celda y rechazar lo que sea fórmula es la postura
segura, y además la única determinista: dos motores de hoja de cálculo pueden evaluar la misma
fórmula distinto.

---

## 5. Preguntas incómodas

> Estas son las que hay que tener preparadas: apuntan a decisiones discutibles. La estrategia
> correcta no es defenderlas como si fueran perfectas, sino mostrar que se conocen el costo y
> el motivo.

### P54. ¿No es sobreingeniería tener seis proyectos para un sistema de horarios?

Sería sobreingeniería si el sistema fuera un CRUD. No lo es: hay un motor de generación con
restricciones duras y blandas, un ciclo de vida de 10 estados, autorización por permiso y por
alcance de facultad, versionado de horarios publicados y un esquema de 57 tablas. **La
complejidad ya está en el problema**; las capas la ordenan, no la crean.

La prueba concreta de que la separación paga es que la suite de aplicación corre sin base de
datos y el motor se prueba con escenarios sintéticos. Si eso no fuera posible, cada cambio
exigiría levantar Supabase, y el equipo dejaría de correr las pruebas.

Dicho eso, el costo es real y hay que nombrarlo: agregar un campo obliga a tocar cinco
archivos. Es el intercambio consciente entre costo por cambio pequeño y costo por cambio
estructural.

### P55. ¿No es peligroso que la clave anónima de Supabase esté en el servidor?

La clave anónima **está diseñada para ser pública** — en una aplicación cliente de Supabase
viaja al navegador. No otorga permisos: identifica al proyecto. Quien decide qué se puede leer
o escribir es la combinación del JWT del usuario y las políticas RLS.

El comentario de `Program.cs` es explícito: si faltara el token del usuario, *"la petición
saldría con permisos de anónimo, no con permisos elevados"* — falla cerrando, no abriendo.

Lo que **sí** es un secreto de verdad es `Supabase__DbConnectionString`: es una conexión
PostgreSQL directa que **no** pasa por RLS. Por eso se usa en un solo lugar
(`PreparadorInstantaneaMotorPostgres`, para la lectura masiva del motor), nunca se envía al
navegador y nunca va a git. Saber distinguir estas dos credenciales es la respuesta a esta
pregunta.

### P56. Si el motor lee sin pasar por RLS, ¿no se rompe el modelo de seguridad?

Es la excepción y está acotada. El motor necesita una **instantánea** de todo el período
—todas las cohortes, cursos, aulas, docentes y disponibilidades— en una sola lectura
consistente. Hacerlo por la Data API significaría cientos de peticiones HTTP paginadas
(`max_rows = 1000` en `config.toml`), con el riesgo de leer datos de momentos distintos.

Las mitigaciones: la conexión directa vive en un solo adaptador; el permiso `motor:generar` se
exige **antes** de llegar ahí, en el caso de uso; y la lectura es de solo lectura — el
resultado se escribe de vuelta por las funciones normales, que sí pasan por los triggers y las
restricciones de la base de datos.

La respuesta honesta: es una superficie privilegiada, está reconocida como tal, es mínima, y
la alternativa (leer paginado con el token del usuario) tenía un costo de consistencia que sí
habría afectado la corrección del horario.

### P57. `KnownProxies.Clear()` significa confiar en cabeceras `X-Forwarded-*`. ¿No es un riesgo?

Sí lo es, y está documentado en el propio código. `Program.cs` explica que se vacían las
listas *"porque la dirección del proxy no se conoce de antemano en el despliegue; eso implica
confiar en las cabeceras `X-Forwarded-*`, lo cual solo es seguro mientras la aplicación no sea
alcanzable directamente desde fuera del proxy"*.

O sea: la seguridad de esa decisión depende de una condición de red (que el contenedor no sea
accesible salvo a través del proxy inverso), no del código. Es el tipo de decisión que hay que
revisar en cada despliegue. La forma correcta de responder si preguntan es admitir la
condición y decir dónde se verifica: en la configuración de red del despliegue, no en la
aplicación.

### P58. ¿Por qué no Entity Framework Core?

Porque el acceso a datos de este sistema no encaja con lo que un ORM optimiza. Tres razones
concretas:

1. **Buena parte de las escrituras son funciones SQL** que hacen varias operaciones atómicas
   (`confirmar_importacion`, `guardar_resultado_generacion`, `crear_version_derivada`). Un ORM
   ahí aporta poco: igual se llama a la función.
2. **El esquema usa capacidades que un ORM no modela bien:** restricciones `EXCLUDE`, rangos
   `int4range`, columnas generadas, índices únicos parciales, RLS. Con EF Core habría que
   describirlas igual en migraciones SQL crudas, quedándose con lo peor de los dos mundos.
3. **La seguridad depende de que la petición lleve el JWT del usuario.** El camino REST de
   PostgREST lo hace natural; con una conexión directa por EF Core habría que propagar la
   identidad a la sesión de Postgres en cada consulta, o renunciar a RLS y reimplementar toda
   la autorización en C#.

Lo que se pierde es real y conviene decirlo: consultas tipadas con LINQ, migraciones
generadas, y un mapeo objeto-relacional automático. A cambio, la persistencia es explícita y
lo que corre en la base de datos es exactamente lo que está escrito.

### P59. ¿Qué pasa si Supabase se cae?

La aplicación sigue en pie —`/health` responde sin tocar la base de datos, así que confirma que el
proceso vive, **no** que Supabase esté accesible— pero ninguna operación de datos funciona.
No hay caché ni modo de solo lectura degradado.

Es una dependencia dura y asumida: el sistema es una herramienta administrativa interna, no un
servicio 24/7 de misión crítica. La consulta pública de horarios publicados es la parte que
más se beneficiaría de una caché, y es el candidato natural si esto se convierte en un
requisito.

### P60. ¿Cómo sé que el horario generado está bien?

Porque no lo dice el motor: lo dice un **verificador independiente**
(`Horarios.Scheduler/VerificadorHorario.cs`), que revisa el resultado contra las mismas
restricciones sin reutilizar el código que lo produjo. Detecta sesiones pendientes, falta de
autorización o de disponibilidad, exceso de carga, capacidad insuficiente, recursos faltantes,
incoherencias de jornada, continuidad y colisiones.

Si la verificación falla, el resultado **no se guarda como bueno**: la generación se marca
`Inviable` y el plan también, *"en vez de guardar un horario que no se puede publicar"*
(`EjecutarGeneracionPlan`). Y encima de eso, la base de datos impone sus propias restricciones
`EXCLUDE`, que rechazarían un solape aunque los dos anteriores fallaran.

**Por qué separar generar de verificar.** Porque un algoritmo heurístico que se autoevalúa con
su propio código comparte sus errores: si el generador entendió mal una regla, la evalúa mal
también. Es el mismo argumento por el que en aviónica y sistemas críticos se usan
implementaciones independientes para comprobar un resultado (diversidad de diseño, IEC 61508).
Acá la implementación no es de otro equipo, pero sí es otro camino de código y otras
estructuras — y lo respalda una tercera comprobación, la de la base de datos, que es independiente de
las dos.

---

## 6. Motor de generación

> **Cómo está ordenada esta sección, y por qué.** El motor es la parte más compleja del
> sistema y la más fácil de contar mal. Son ocho archivos y 1 542 líneas en
> `Horarios.Scheduler`, pero **cuatro piezas cuentan la idea entera**: la instantánea que
> congela los datos, el expansor que dice qué hay que colocar, el motor que coloca y el
> verificador que revisa. Dos más escriben las reglas —`ReglasDuras` y
> `EvaluadorRestriccionesBlandas`—, y las tres últimas no cambian ni un resultado: solo
> hacen que el trabajo termine en segundos. Por eso el orden es ese y no el alfabético: si
> alguien explica `CostoBlandoIncremental` antes que `MotorHorario`, el oyente se lleva la
> idea de que el motor es complicado, cuando lo complicado es la máquina que lo acelera.

### 6.1 El problema y la estrategia

#### P61. ¿Qué problema resuelve el motor y por qué no se prueban todas las combinaciones?

**Qué.** Colocar cada sesión de clase de un período en una casilla (día y hora), con un
docente y un aula, sin que dos cosas ocupen el mismo lugar al mismo tiempo y respetando
autorizaciones, capacidades, laboratorios, jornadas y topes de carga.

**Cómo.** El propio motor cuenta el tamaño del problema: para cada sesión calcula
`Combinaciones = docentes × aulas × bloques` (`MotorHorario.Candidatos`). Con números
modestos —20 docentes, 30 aulas, 25 bloques— una sola sesión tiene 15 000 ubicaciones
posibles. Un período con 200 sesiones tiene, antes de descartar nada, del orden de
15 000²⁰⁰ combinaciones: más de 10⁸⁰⁰. Las reglas duras podan muchísimo, pero el espacio
sigue siendo astronómico y no hay computadora que lo recorra.

**Por qué.** No es que falte hardware: el problema es intrínsecamente difícil. La
construcción de horarios en su forma de decisión es **NP-completa** (Even, Itai y Shamir,
*On the Complexity of Timetable and Multicommodity Flow Problems*, SIAM J. Comput., 1976), y
las variantes prácticas —con aulas, capacidades y disponibilidad, como la nuestra— son al
menos igual de difíciles (Cooper y Kingston, *The Complexity of Timetable Construction
Problems*, PATAT 1996). Formalmente es un problema de satisfacción de restricciones con una
función objetivo encima: hay que encontrar algo **factible** y, entre lo factible, algo
**cómodo**. Ante eso hay dos caminos honestos: un solucionador exacto que puede tardar horas
o no terminar, o una heurística que da una respuesta buena en segundos y dice claramente qué
no garantiza. Se eligió el segundo, y [P79](#p79-qué-es-lo-que-el-motor-no-garantiza) enumera exactamente qué no garantiza.

#### P62. ¿Qué algoritmo usa? ¿Hay inteligencia artificial adentro?

**Qué.** No. Es una **heurística híbrida determinista**: construcción voraz con la regla
«más restringido primero», seguida de búsqueda local de primera mejora. Ni redes neuronales,
ni algoritmos genéticos, ni recocido simulado. La versión que se anota en cada corrida lo
dice: `VersionMotor = "motor-hibrido-1"` (`GenerarHorarioPlan.cs`).

**Cómo.** Dos fases, en `MotorHorario.Ejecutar`:

1. **Construcción.** Ordena las sesiones de la más difícil a la más fácil y a cada una le da
   la primera ubicación legal que encuentra. Rápida y sin vuelta atrás.
2. **Mejora.** Solo si la construcción no dejó ninguna sesión pendiente: recorre las
   sesiones colocadas buscando un hueco que baje el puntaje blando, sin romper nunca una
   regla dura.

**Por qué.** El esquema «construir y después mejorar» es el estándar de la literatura de
horarios (Schaerf, *A Survey of Automated Timetabling*, 1999), y se eligió por tres razones
concretas, no por moda:

- **Es determinista.** No hay ni un `Random` en todo `Horarios.Scheduler` (se puede
  comprobar buscándolo). Una corrida se puede reproducir y auditar; un genético con
  población aleatoria, no.
- **Explica sus fallos.** Cuando una sesión no entra, el motor dice por qué
  ([P78](#p78-por-qué-una-sesión-queda-sin-asignar-y-cómo-se-explica-la-causa)). Un metaheurístico devuelve «no convergió», que no le sirve a nadie que
  tenga que arreglar los datos.
- **No hay que ajustarlo.** Los genéticos y el recocido traen parámetros propios
  —población, mutación, temperatura— que exigen experimentación para funcionar bien. Acá
  los únicos parámetros son los cinco pesos blandos, y son configurables sin recompilar.

El costo, dicho de frente: una heurística voraz con búsqueda local se queda en el primer
mínimo local que encuentra. Un genético bien ajustado podría dar horarios más cómodos. Se
prefirió lo reproducible y explicable sobre lo potencialmente mejor.

### 6.2 Las cuatro clases que cuentan toda la idea

#### P63. Si tuviera una hora para entender el motor, ¿qué leo y en qué orden?

**Qué.** Cuatro archivos, en este orden. Con eso se entiende el motor entero; lo demás es
detalle o velocidad.

| # | Pieza | Archivo | Líneas | Qué aporta |
|---|---|---|---|---|
| 1 | `InstantaneaMotor` | `Horarios.Contratos/Motor/ContratoMotor.cs` | — | La entrada, congelada: todo lo que el motor va a mirar |
| 2 | `ExpansorSesiones` | `Horarios.Scheduler/ExpansorSesiones.cs` | 90 | Qué hay que colocar: convierte requisitos en sesiones concretas |
| 3 | `MotorHorario` | `Horarios.Scheduler/MotorHorario.cs` | 369 | Cómo se coloca: las dos fases y la decisión |
| 4 | `VerificadorHorario` | `Horarios.Scheduler/VerificadorHorario.cs` | 269 | Si el resultado vale: segunda opinión antes de guardar |

**Cómo.** Las otras cinco piezas se dividen en dos grupos, y conviene no mezclarlos:

- **Definiciones de las reglas.** `ReglasDuras` (63 líneas) dice qué es legal;
  `EvaluadorRestriccionesBlandas` (108) dice qué es cómodo. Son cortas y declarativas: se
  leen casi como una lista de requisitos.
- **Maquinaria de optimización.** `OcupacionHorario` (171) responde «¿está libre?» en tiempo
  constante; `CatalogoCandidatos` (dentro de `MotorHorario`) precalcula las opciones de cada
  sesión; `CostoBlandoIncremental` (383, la clase más larga del motor) da el mismo puntaje
  que el evaluador recalculando solo lo que cambió.

La frase que resume el reparto es esta: **si las tres piezas de maquinaria se reemplazaran
por implementaciones ingenuas que respetaran el mismo orden de candidatos, el horario
resultante sería exactamente el mismo; solo tardaría órdenes de magnitud más.** No aportan
decisiones, aportan tiempo. Por eso se explican al final y no al principio.

El octavo archivo, `TrabajosPesados.cs` (89 líneas), no es algoritmo: es la cola y el
perfilador que sacan la generación de la petición web ([P29](#p29-por-qué-la-generación-se-ejecuta-en-segundo-plano), [P80](#p80-qué-pasa-si-la-generación-tarda-demasiado-o-si-el-servidor-se-reinicia)).

**Por qué importa el orden de lectura.** Porque las tres clases de maquinaria concentran casi
la mitad del código del motor y toda su dificultad aparente —índices densos, buffers
reutilizados, ordenación por inserción a mano—. Quien empieza por ahí concluye que el motor
es un laberinto. Quien empieza por las cuatro primeras entiende un algoritmo que cabe en un
párrafo y después ve por qué hizo falta acelerarlo.

#### P64. ¿Qué es la instantánea y por qué el motor no consulta la base de datos?

**Qué.** `InstantaneaMotor` es una foto inmutable con todo lo que la generación va a mirar:
docentes con sus cursos autorizados y su disponibilidad, aulas con capacidad y recursos,
cohortes, bloques, sesiones por colocar, los pesos blandos y los topes de la fase de mejora.
El motor no recibe nada más y no consulta nada más.

**Cómo.** El constructor valida que haya plan y **copia** cada lista a `ImmutableArray`; el
comentario del código lo dice donde ocurre: *"Aquí se hace la copia fija: si otra capa cambia
sus listas, la ejecución no cambia"*. Los valores por omisión también viven ahí: 100 pasadas
de mejora y 15 segundos de presupuesto. La foto la arma
`PreparadorInstantaneaMotorPostgres` y la guarda `IDatosGeneraciones.IniciarAsync` **antes**
de que el motor arranque.

**Por qué.** Tres razones que se sostienen solas:

1. **Reproducibilidad.** La entrada exacta de cada corrida queda guardada, así que un
   horario cuestionado se puede volver a generar con los mismos datos aunque la base haya
   cambiado. Sin instantánea, «¿por qué salió esto?» no tiene respuesta comprobable.
2. **El motor se prueba sin base de datos.** `Horarios.Scheduler` no referencia Npgsql,
   Supabase ni Blazor: solo `Horarios.Contratos`. Por eso las 13 pruebas del scheduler
   corren en milisegundos con escenarios inventados a mano.
3. **Consistencia de lectura.** Leer tabla por tabla mientras alguien edita produciría una
   foto imposible: un docente con la disponibilidad de antes y la autorización de después.
   Una sola lectura coherente lo evita — y es también el motivo de la conexión directa a
   Postgres que se discute en [P56](#p56-si-el-motor-lee-sin-pasar-por-rls-no-se-rompe-el-modelo-de-seguridad).

#### P65. ¿Qué hace `ExpansorSesiones` y por qué los identificadores son deterministas?

**Qué.** Traduce lo académico a lo colocable. «Programación I, cohorte 1A, 3 sesiones
semanales de 2 slots» entra como **un** `RequisitoCursoMotor` y sale como **tres**
`SesionRequeridaMotor`, cada una con identidad propia. Esa sesión es la unidad de trabajo del
motor: todo lo demás gira alrededor de colocarla.

**Cómo.** Agrupa los requisitos por una clave: si el curso pertenece a una agrupación de área
común, la clave es `area:{agrupacionId}`; si no, `curso:{cursoId}:cohorte:{cohorteId}`. De
ahí salen tres comportamientos que conviene saber explicar:

- **Las áreas comunes se funden en una sola sesión** con varias cohortes, porque se dictan a
  la vez; el docente tendrá que estar autorizado en **todos** los cursos equivalentes.
- **Exige coherencia**: si dos cursos de la misma agrupación declaran distinta cantidad o
  duración de sesiones, lanza excepción en vez de inventar un criterio.
- **Suma alumnos sin contar doble**: `GroupBy(CohorteId).Sum(x => x.Max(...))` toma el máximo
  por cohorte y después suma cohortes, así que una cohorte que aparece en dos cursos
  equivalentes se cuenta una vez. Ese total es el que después le exige capacidad al aula.

El identificador sale de `IdentificadorDeterminista.Crear($"plan:{planId:N}:{clave}:{numero}")`:
SHA-256 del texto, primeros 16 bytes, con los bits de versión y variante ajustados para que
sea un UUID válido.

**Por qué determinista y no `Guid.NewGuid()`.** Porque `horarios.sesiones` tiene una llave
primaria global, no una por horario. Con identificadores derivados:

- **Regenerar un plan reescribe sus propias filas** en lugar de duplicarlas.
- **Dos planes del mismo período no chocan**, porque el `planId` entra en el texto — hay una
  prueba dedicada a eso (`Dos_planes_del_mismo_periodo_no_comparten_identificadores`).
- **Dos versiones se comparan casilla por casilla**, porque la misma sesión conserva su
  identidad entre corridas.

Un detalle de precisión, por si alguien del jurado sabe de UUID: el resultado se marca como
**versión 5**, pero se deriva de SHA-256 y la versión 5 del estándar usa SHA-1. Lo formalmente
correcto hoy sería la **versión 8** de la RFC 9562, pensada justo para identificadores
derivados a medida. En la práctica no cambia nada —Postgres lo acepta como `uuid` y la
propiedad que importa, que el mismo texto dé siempre el mismo id, se cumple—, pero es
preferible decirlo antes de que lo pregunten.

#### P66. ¿Cómo decide `MotorHorario` dónde va una sesión?

**Qué.** Fase 1, construcción voraz. Recorre las sesiones ordenadas de la más restringida a
la menos ([P67](#p67-qué-significa-más-restringido-primero-y-por-qué-se-eligió)) y a cada una le da **la primera combinación legal** que encuentra.

**Cómo.** Tres bucles anidados, en este orden exacto:

```text
para cada bloque (día y hora, en orden cronológico)
    ¿están libres todas las cohortes de la sesión?      → si no, siguiente bloque
    para cada docente (prioridad más alta primero)
        ¿es el docente que ya dicta este curso?          → continuidad obligatoria
        ¿le queda cupo de cursos?                        → tope de carga
        ¿declaró disponibilidad en todos los slots?
        ¿está libre en todos los slots?
        para cada aula (la más chica que sirva primero)
            ¿está libre en todos los slots?              → si sí, se toma y se corta
```

Cuando encuentra la terna, marca ocupados todos los slots del docente, del aula y de cada
cohorte (`ocupacion.Ocupar`) y anota dos cosas en diccionarios: qué docente quedó a cargo de
ese curso (`docentePorCurso`) y qué cursos acumula ese docente (`cursosPorDocente`). Esos dos
diccionarios son los que hacen cumplir la continuidad y el tope de carga en las sesiones
siguientes.

**Por qué ese orden y no otro.** Cada nivel codifica una política:

- **Bloques en orden cronológico** → los horarios tienden a empezar temprano y a compactarse
  solos, antes incluso de que la fase de mejora toque nada.
- **Docentes por prioridad descendente** → quien tiene mayor `NivelPrioridad` recibe carga
  primero.
- **Aulas por capacidad ascendente** → se usa la más chica que sirva, y las grandes quedan
  disponibles para las cohortes que de verdad las necesitan. Es una decisión de política
  metida en un `OrderBy`, y conviene señalarla porque no es obvia leyendo el bucle.

**Por qué la primera que pasa y no la mejor.** Porque en esta fase la pregunta no es «cuál es
la mejor ubicación» sino «existe alguna». Evaluar todas las ternas de cada sesión para elegir
la óptima multiplicaría el trabajo sin garantizar nada mejor: la calidad se arregla después,
en la fase de mejora, que ya trabaja sobre un horario completo y sabe cuánto cuesta cada
movimiento.

#### P67. ¿Qué significa «más restringido primero» y por qué se eligió?

**Qué.** Antes de colocar nada, cada sesión sabe cuántas ubicaciones posibles tiene:
`Combinaciones = docentes × aulas × bloques`. Se colocan primero las de menor número.

**Cómo.** Un ejemplo con dos sesiones reales del sistema:

```text
Química Orgánica (laboratorio, 1 docente autorizado)   1 × 1 × 4  =   4 combinaciones
Introducción a la Filosofía (teórica, cualquier aula)  4 × 5 × 20 = 400 combinaciones
```

La de 4 va primero. Los empates se resuelven, en orden, por más cohortes involucradas, más
recursos requeridos, más alumnos y finalmente por identificador —ese último criterio no
aporta calidad, aporta **orden total**: sin él, dos sesiones iguales podrían quedar en
cualquier orden y la corrida dejaría de ser reproducible.

**Por qué.** Es el **principio de fallo temprano** (*fail-first*) de Haralick y Elliott
(*Increasing Tree Search Efficiency for Constraint Satisfaction Problems*, Artificial
Intelligence, 1980): conviene decidir primero la variable con menos valores posibles, porque
si va a haber un conflicto es mejor encontrarlo antes de haber construido medio horario
encima. En coloreo de grafos la misma idea es DSATUR (Brélaz, CACM 1979). Dicho sin jerga: si
la clase que solo puede ir en un laboratorio con un solo profesor se deja para el final, es
seguro que alguna clase flexible ya le ocupó su única casilla.

**El límite honesto.** El número de combinaciones se calcula **una sola vez, antes de
empezar**, y no se recalcula a medida que el horario se llena. Un MRV dinámico —recontar tras
cada colocación— tomaría mejores decisiones, porque una sesión hoy flexible puede quedar
acorralada después. Se prefirió el cálculo estático porque es más barato y porque hace el
orden totalmente predecible. Es una mejora identificada, no un descuido.

#### P68. ¿Qué hace la fase de mejora y por qué no cambia de docente?

**Qué.** Toma el horario ya completo y busca movimientos que bajen el puntaje blando sin
romper ninguna regla dura. Solo arranca si la construcción **no dejó ninguna sesión
pendiente**: no tiene sentido pulir un horario que no se puede publicar.

**Cómo.** Por cada pasada, recorre todas las sesiones y para cada una:

1. **La retira** del tablero de ocupación (`ocupacion.Liberar`). Este paso no es cosmético:
   si no se retirara, su propia ocupación bloquearía sus mejores candidatos y la sesión
   nunca podría moverse a un lugar solapado con donde ya está.
2. Prueba otros pares (bloque, aula) **conservando el docente**, descartando todo lo que
   rompa una regla dura.
3. Acepta **la primera** opción que baje estrictamente el costo (`costo.Total < mejorCosto`)
   y la ocupa; si ninguna sirve, vuelve a poner la sesión donde estaba.

Se detiene cuando una pasada completa no encuentra ninguna mejora, cuando llega a 100 pasadas
o cuando se agotan los 15 segundos de presupuesto — lo que ocurra primero. El diagnóstico
`MEJORA_RESTRICCIONES_BLANDAS` deja escrito el puntaje inicial, el final, cuántos movimientos
hubo y si el tiempo se agotó.

**Por qué conserva el docente.** Porque la continuidad —todas las sesiones de un curso y sus
cohortes con el mismo docente— es una regla **dura**, y la mejora mueve una sesión a la vez.
Cambiar el docente de una sesión suelta rompería el curso entero; hacerlo bien exigiría mover
todas sus sesiones a la vez, que es un movimiento compuesto que esta búsqueda no implementa.
El código lo dice en el comentario del método.

**Por qué primera mejora y no la mejor.** Con presupuesto fijo, aceptar en cuanto se encuentra
algo mejor produce muchos más movimientos que evaluar todos los candidatos para elegir el
mejor de cada ronda. Es la estrategia *first improvement* clásica de búsqueda local (Hoos y
Stützle, *Stochastic Local Search*, 2004). El costo de la elección es conocido: se llega a un
mínimo local, no al óptimo.

**Lo que esta fase no puede arreglar.** Como el docente queda fijo, el desbalance de carga
—una de las cinco penalizaciones— casi no se puede corregir después de la construcción: se
mide, pero apenas se mejora. Es la limitación más concreta de la fase 2.

#### P69. Si el verificador usa las mismas `ReglasDuras` que el motor, ¿de verdad es independiente?

**Qué.** Es independiente en parte, y hay que ser preciso en cuál.

**Cómo.** Lo que comparte con el motor es exactamente una cosa: `ReglasDuras`, es decir las
reglas que dependen de una sesión y un recurso (docente autorizado, capacidad, recursos, tipo
de aula, tipo de laboratorio y la definición de `ClaveCurso`). Todo lo demás lo hace por su
cuenta: no usa `OcupacionHorario` ni `CatalogoCandidatos`, construye sus propios índices
`(entidad, día, slot)` y recorre las asignaciones desde cero para detectar colisiones,
continuidad rota, carga excedida, sesiones duplicadas, sesiones desconocidas y sesiones que
no aparecen ni asignadas ni pendientes. Emite 20 códigos de violación distintos y **no se
detiene en el primero**: informa todo lo que encuentra.

**Por qué así.** Compartir `ReglasDuras` fue una decisión con una causa documentada: cuando
cada componente llevaba su propia copia, se desincronizaron. El comentario del archivo lo
cuenta sin adornos: *"el reparador exigía un bloque tan largo como la sesión y el verificador
solo miraba el bloque de inicio"*. El resultado era peor que un punto ciego: el verificador
rechazaba horarios que el motor consideraba correctos, y nadie sabía cuál de los dos tenía
razón.

La elección, entonces, fue entre dos riesgos:

- **Copias separadas:** detecta errores de definición, pero produce desacuerdos constantes
  entre componentes que deberían coincidir.
- **Definición única:** un error en la definición de una regla dura pasa desapercibido para
  ambos, pero todo lo demás —que es donde está la complejidad real— sí se verifica.

Se eligió la segunda, con dos mitigaciones. La primera: el riesgo que importa está en la
maquinaria, no en la definición. `ReglasDuras` son 63 líneas de comparaciones directas que se
leen enteras en dos minutos; `OcupacionHorario` y la fase de mejora son índices y estado
mutable, y ahí sí es plausible un error —un bitset mal desplazado, un `Liberar` sin su
`Ocupar`—, que el verificador **sí** detecta porque no comparte ese código. La segunda: hay
una tercera barrera que no comparte código con ninguna de las dos, las restricciones
`EXCLUDE` de PostgreSQL ([P13](#p13-qué-es-una-restricción-exclude-y-por-qué-se-usa-acá)), que rechazarían un solape aunque motor y verificador
fallaran juntos. Ver también [P60](#p60-cómo-sé-que-el-horario-generado-está-bien).

### 6.3 Las reglas: duras, blandas y sus pesos

#### P70. ¿Qué diferencia hay entre una restricción dura y una blanda?

**Qué.** Una dura decide si el horario **existe**; una blanda decide si el horario **gusta**.

| | Dura | Blanda |
|---|---|---|
| Qué hace en la construcción | Descarta el candidato: no se puede elegir | No interviene: no filtra nada |
| Qué hace si se incumple | El verificador emite una `ViolacionDura` y el plan queda `Inviable` | Suma puntos al costo; el horario sigue siendo válido |
| Quién la define | `ReglasDuras`, `OcupacionHorario` y `MotorHorario` | `EvaluadorRestriccionesBlandas` con los pesos de la instantánea |
| Se puede negociar | No | Sí: cambiando los pesos, sin tocar el motor |

**Cómo.** Las doce reglas duras del sistema, con dónde vive cada una:

- **Autorización del docente** para todos los cursos de la sesión — `ReglasDuras`.
- **Capacidad del aula** suficiente para el total de alumnos — `ReglasDuras`.
- **Recursos** requeridos presentes en el aula — `ReglasDuras`.
- **Tipo de aula** compatible cuando la sesión exige laboratorio — `ReglasDuras`.
- **Tipo de laboratorio** compatible — `ReglasDuras`.
- **Disponibilidad declarada** del docente en todos los slots — `OcupacionHorario`.
- **Docente libre** en todos los slots — `OcupacionHorario`.
- **Aula libre** en todos los slots — `OcupacionHorario`.
- **Cohortes libres** en todos los slots — `OcupacionHorario`.
- **Bloque dentro de la jornada** de la sesión, con slots consecutivos y sin cruzar el
  receso — `OcupacionHorario.CabeEnLaJornada`.
- **Continuidad del docente** por curso y cohortes — `MotorHorario` (diccionario
  `docentePorCurso`) y `VerificadorHorario`.
- **Tope de carga** de cursos distintos por docente — `MotorHorario` y `VerificadorHorario`.

**Por qué el reparto es ese.** Porque cada regla vive donde está la información que necesita:
las que se responden mirando una sesión y un recurso son funciones puras en `ReglasDuras`;
las que dependen de lo ya colocado necesitan el tablero, así que viven en `OcupacionHorario`;
y las dos que dependen del **estado de la construcción** —quién quedó a cargo de qué— viven
en el bucle del motor. No es una división estética: es lo que permite que `ReglasDuras` sea
compartible por tres consumidores sin arrastrar estado.

**Por qué separar duras de blandas.** Si todo fuera duro, cualquier preferencia incumplida
volvería inviable el plan y el sistema no entregaría nada; si todo fuera blando, entregaría
horarios imposibles con un puntaje malo. La separación es la que permite el esquema de dos
fases: primero factibilidad, después comodidad.

#### P71. ¿Por qué las reglas duras están en una sola clase?

**Qué.** `ReglasDuras` es la única definición, y la usan tres consumidores: el motor para
generar candidatos, el reparador local para proponer movimientos y el verificador para
aceptar o rechazar.

**Cómo.** Son métodos estáticos de una línea, sin estado: reciben un docente o un aula más la
sesión y devuelven `bool`. Por eso pueden compartirse sin efectos secundarios.

**Por qué.** La respuesta está escrita en el propio archivo y es una lección aprendida, no una
teoría: *"Cuando cada uno llevaba su propia copia, las tres se desincronizaron"*. Una regla
escrita en tres lugares son tres reglas que **empiezan** iguales. El resultado observable de
esa desincronización era el peor posible: un horario que el motor daba por válido y el
verificador rechazaba, sin que ninguno estuviera claramente equivocado. Con una definición
única eso es imposible por construcción. El precio —un punto ciego compartido— se discute en
[P69](#p69-si-el-verificador-usa-las-mismas-reglasduras-que-el-motor-de-verdad-es-independiente).

#### P72. ¿Cómo se calcula el puntaje blando y de dónde salen los pesos?

**Qué.** Un solo número, que se minimiza. Menos es mejor; cero sería el horario perfecto.

```text
Costo = faltas de consecutividad × 10
      + ventanas de cohorte      ×  8
      + ventanas al final        ×  3
      + desplazamiento docente   ×  2
      + desbalance de carga      ×  5
```

**Cómo.** Cada término se cuenta de una forma concreta, y conviene saberla porque las
preguntas afiladas van justo ahí:

| Penalización | Cómo se cuenta exactamente |
|---|---|
| Consecutividad | Por curso+cohortes, solo entre sesiones marcadas `PreferirConsecutividad`, ordenadas por día y slot: cuenta cada par que no queda pegado al anterior |
| Ventanas | Por (cohorte, día), sobre los slots de inicio distintos: `último − primero + 1 − cantidad` |
| Ventanas al final | Por (cohorte, día): `último − cantidad`; castiga terminar tarde con pocas clases |
| Desplazamiento | Por (docente, día), solo entre clases pegadas: distancia entre las dos aulas, contando el cambio de piso el doble que un paso horizontal |
| Desbalance | `máximo − mínimo` de `cursos ÷ carga máxima − prioridad × 0,01` entre todos los docentes |

**Por qué esos pesos.** Son los valores por omisión de `PonderacionesRestriccionesBlandas`, y
el propio contrato es explícito sobre su estatus: *"Los valores por omisión son un punto de
partida razonable, no una verdad"*. Se eligieron por criterio del equipo para reflejar un
orden de importancia —una clase partida molesta más que caminar un piso—, no midiendo nada.
Lo que importa es la **relación**: consecutividad pesa cinco veces lo que el desplazamiento.
Y son parte de la instantánea, así que se pueden cambiar por corrida, sin recompilar y
quedando registrados junto al resultado.

Si alguien pregunta «¿por qué 8 y no 6?», la respuesta correcta no es inventar una
justificación: es que es un parámetro configurable, que lo que se defiende es el mecanismo, y
que ajustarlo con horarios reales es trabajo pendiente.

**Un detalle de escala que conviene conocer.** Las cuatro primeras penalizaciones crecen con
el tamaño del horario —más sesiones, más ventanas posibles—, mientras que el desbalance es
una diferencia de proporciones acotada entre 0 y 1. En un período grande, el término de
balance pesa cada vez menos frente a los demás. No está mal calculado; está sin normalizar, y
es otra mejora identificada.

### 6.4 La maquinaria de optimización

> Estas tres piezas no toman ni una decisión sobre el horario. Responden más rápido las
> mismas preguntas que ya estaban definidas en otra parte. Se explican al final a propósito:
> son la mitad del código del motor y ninguna de ellas cambia el resultado.

#### P73. ¿Qué es `OcupacionHorario` y por qué un arreglo plano de `bool`?

**Qué.** El tablero. Cuatro mapas: docente ocupado, aula ocupada, cohorte ocupada y docente
disponible. Responde «¿está libre?» y «¿está disponible?», y marca o borra con `Ocupar` y
`Liberar`.

**Cómo.** Cada par (día, slot) se traduce a una posición fija:

```csharp
public int Posicion(BloqueMotor bloque)
    => ((int)bloque.Dia - 1) * _slotsPorDia + bloque.IndiceSlotInicio - _slotMinimo;
```

y cada entidad tiene una fila; el acceso final es `mapa[fila * TotalPosiciones + posicion]`.
Una sesión de dos slots exige las dos casillas, no solo la de inicio: `Todos(...)` recorre
`duracionSlots` posiciones y corta al primer desacuerdo.

**Por qué.** Sin este índice, cada pregunta «¿está libre?» habría que responderla recorriendo
todas las asignaciones ya hechas, y como esa pregunta se hace dentro del bucle de candidatos,
la construcción se volvería cuadrática respecto al tamaño del horario. Con el índice, la
respuesta cuesta lo mismo con 4 sesiones que con 4 000.

Cuatro detalles que muestran que la estructura está pensada, y que valen para responder
repreguntas:

- **Es `bool[]`, no un mapa de bits de verdad.** El comentario habla de «mapa de bits», pero
  no hay empaquetado: cada casilla ocupa un byte. Se gana indexar sin máscaras ni
  desplazamientos, y se pierde memoria que acá no importa —siete días por una docena de
  slots por unos cientos de entidades son decenas de kilobytes—.
- **Arreglo plano en vez de `bool[][]`.** Una sola reserva de memoria contigua en lugar de
  una por entidad.
- **Un solo bucle responde dos preguntas opuestas.** `Todos(..., esperado)` sirve para
  «libre» (esperado `false` sobre la ocupación) y para «disponible» (esperado `true` sobre la
  disponibilidad). Menos código, y por lo tanto menos lugares donde equivocarse.
- **Una entidad desconocida falla del lado seguro.** Si el identificador no está en el
  índice, devuelve `!esperado`: un docente que no está en la instantánea nunca está
  disponible, así que nunca se le asigna nada. Es el criterio de *fail-safe default* de
  Saltzer y Schroeder aplicado a una estructura de datos.

Y una regla que vive acá y suele sorprender: `CabeEnLaJornada` exige que **cada** slot
consecutivo de la sesión exista en la jornada. Como los descansos no llegan a la instantánea,
una sesión que los cruzara no encuentra dónde caber: el receso se respeta sin necesidad de
una regla que lo nombre.

#### P74. ¿Qué es `CatalogoCandidatos` y por qué se precalcula?

**Qué.** Antes de colocar nada, cada sesión ya sabe qué docentes, qué aulas y qué bloques
podría usar. Es una clase privada dentro de `MotorHorario`, porque no existe para nadie más.

**Cómo.** No calcula una lista por sesión, sino **por perfil**, y las sesiones que comparten
perfil comparten la lista:

- docentes, por el conjunto de cursos de la sesión;
- aulas, por la combinación alumnos + laboratorio + tipo de laboratorio + recursos;
- bloques, por jornada + duración.

Las tres sesiones semanales de un mismo curso tienen idéntico perfil, así que el filtrado se
hace una vez y no tres. El catálogo fija además el **orden** de los candidatos: docentes por
prioridad descendente, aulas por capacidad ascendente, bloques por día y hora.

**Por qué.** Porque la fase de mejora pide los candidatos de cada sesión **en cada pasada**;
filtrar todas las aulas y todos los docentes cada vez era el costo dominante. El comentario
del código añade una precisión que vale la pena repetir, porque es contraintuitiva: armar la
clave del perfil dentro de la mejora costaba más que el filtro que la clave evitaba. Por eso
el catálogo se resuelve al construir y durante la búsqueda solo queda una consulta por
identificador de sesión.

Segundo motivo, menos visible pero igual de importante: el orden de los candidatos es parte
del determinismo del motor y de su política. La regla «el aula más chica que sirva» no está
escrita en ningún `if`: está en el `OrderBy(x => x.Capacidad)` de esta clase.

#### P75. ¿Por qué existe `CostoBlandoIncremental` si ya está el evaluador?

**Qué.** Da exactamente el mismo total que `EvaluadorRestriccionesBlandas`, pero recalculando
solo lo que el movimiento tocó. Es la clase más larga del motor —383 líneas— y no cambia ni
un horario.

**Cómo.** La cuenta que la justifica: la fase de mejora prueba, por cada sesión y por cada
pasada, todos los pares (bloque, aula) compatibles, y cada candidato son **dos** llamadas a
`Mover` —una para probar y otra para deshacer—. En un período mediano eso son cientos de
miles de llamadas. Volver a puntuar el horario completo en cada una, con `GroupBy` y
`OrderBy` de LINQ, no es lento: es inviable.

Lo que hace para lograrlo:

- **Índices densos.** Cada sesión, bloque, aula, docente, cohorte y clave de curso recibe un
  entero al construir. A partir de ahí todo es aritmética sobre arreglos; no se arma ni una
  cadena de texto durante la búsqueda.
- **Aporte por grupo.** Guarda cuánto penaliza cada curso, cada (cohorte, día) y cada
  (docente, día) por separado, así que el total se ajusta sumando la diferencia en vez de
  rehacerse.
- **Buffers reutilizados y ordenación por inserción.** Los grupos son de pocas sesiones, así
  que ordenar a mano evita el arreglo intermedio y el comparador que exigiría `OrderBy`. La
  inserción es estable, igual que `OrderBy`, y eso es necesario para que los empates queden
  como en el evaluador.
- **Estructuras chicas a propósito.** `List.Contains` en lugar de un `HashSet` para marcar
  grupos tocados: sobre listas de dos o tres elementos, buscar linealmente es más rápido que
  reservar memoria.
- **El único recálculo global está acotado.** El desbalance de carga recorre todos los
  docentes, pero solo se recalcula si la sesión estrena docente (`cambiaCargaDocente`) — y en
  la fase de mejora el docente se conserva siempre, así que en la práctica no ocurre.

**Por qué está bien que exista, y por qué está bien que sea fea.** Es el único lugar del motor
donde se paga complejidad por velocidad, está aislado en una clase con una superficie mínima
—`Mover` y `Total`— y su contrato cabe en una línea: dar el mismo número que el evaluador. Esa
es la forma correcta de meter una optimización agresiva en un sistema que se quiere poder
leer: concentrada, con un equivalente simple al lado que sirve de definición, y sin contagiar
al resto del código.

#### P76. ¿Cómo se sabe que el incremental da el mismo número que el evaluador?

**Qué.** Por construcción, y —hay que decirlo— hoy sin una prueba automática que lo compruebe.

**Cómo coinciden.** Tres decisiones deliberadas los mantienen alineados:

1. **El mismo filtro de entrada.** Ambos descartan las asignaciones cuyos cuatro
   identificadores no estén todos en la instantánea. Está comentado en los dos archivos,
   señalando explícitamente que es la condición que hace que los totales coincidan.
2. **Los mismos tres agrupamientos:** por curso+cohortes, por (cohorte, día) y por
   (docente, día).
3. **Las mismas fórmulas**, incluida la ordenación estable dentro de cada grupo.

**El agujero, dicho antes de que lo encuentren.** El comentario de `CostoBlandoIncremental`
afirma que *"la prueba `CostoBlandoIncrementalTests` lo comprueba"*, y **esa prueba no existe
en el repositorio**: `Horarios.Scheduler.Tests` tiene 13 pruebas en tres archivos
—`MotorHorarioTests`, `ExpansorSesionesTests` y `SchedulerSmokeTests`— y ninguna compara los
dos costos. Es la afirmación más débil del motor.

**Qué pasaría si divergieran.** Conviene tener clara la magnitud del riesgo: el costo blando
**no participa de ninguna regla dura**. Si el incremental se equivocara, el motor optimizaría
un número distinto del que se guarda y se muestra, y el horario saldría peor de lo que dice
su registro — pero seguiría siendo válido, y el verificador y las restricciones `EXCLUDE` de
la base de datos seguirían siendo la garantía de corrección. Es un fallo de calidad, no de
corrección.

**Cómo se cierra.** Con una prueba basada en propiedades, que además es barata porque el
scheduler no necesita base de datos: armar un escenario, aplicar movimientos, y tras cada uno
comprobar que `CostoBlandoIncremental.Total` es igual a
`EvaluadorRestriccionesBlandas.Evaluar(...).Penalizaciones.Total`. Es trabajo pendiente
identificado, y decirlo así vale más que dejar que lo descubra el jurado.

### 6.5 Garantías, fallos y límites

#### P77. ¿Qué hace que una corrida sea reproducible?

**Qué.** La misma instantánea produce el mismo horario, y la instantánea de cada corrida
queda guardada.

**Cómo.** Cinco cosas, todas comprobables:

- **No hay azar.** No existe ni un `Random` en `Horarios.Scheduler`. El único
  `Guid.NewGuid()` está en la cola de trabajos, que no participa del algoritmo.
- **Los identificadores se derivan por hash**, no se sortean ([P65](#p65-qué-hace-expansorsesiones-y-por-qué-los-identificadores-son-deterministas)).
- **Los órdenes son totales.** El orden de colocación termina desempatando por identificador
  de sesión, y las listas de candidatos se ordenan por criterios con desempate final por
  `Id`. `OrderBy` de LINQ es estable, así que no reordena empates.
- **La entrada es inmutable**, así que un cambio en la base a mitad de la generación no la
  afecta ([P64](#p64-qué-es-la-instantánea-y-por-qué-el-motor-no-consulta-la-base-de-datos)).
- **La configuración viaja con la entrada**: pesos, tope de pasadas y presupuesto son campos
  de la instantánea y quedan registrados junto al resultado, igual que `VersionMotor`, que es
  lo que permite comparar dos corridas.

**Por qué no es reproducibilidad absoluta.** Porque el presupuesto de 15 segundos corta donde
llegue: en una máquina más lenta la mejora alcanza a hacer menos movimientos, y el horario
final puede ser distinto —siempre válido, quizá menos cómodo—. Dicho con precisión: **si el
presupuesto de tiempo no se agota, la corrida es determinista**; si se agota, lo determinista
es la construcción y el resultado depende de cuánto alcanzó a mejorar. Subir el presupuesto o
bajar el tope de pasadas vuelve la corrida completamente repetible.

#### P78. ¿Por qué una sesión queda sin asignar y cómo se explica la causa?

**Qué.** Cuando el bucle de búsqueda no encuentra ninguna terna legal, la sesión sale como
`SesionPendienteMotor` con un motivo en español, y además se emite un diagnóstico
`SESION_SIN_CANDIDATO`. Ambos se guardan con la generación.

**Cómo.** El método `Diagnosticar` prueba las causas en orden, de la más estructural a la más
circunstancial, y devuelve la primera que aplica:

1. No existe un docente autorizado para todos los cursos de la sesión.
2. No existe un aula con capacidad y recursos suficientes.
3. No existe un bloque válido dentro de la jornada de la cohorte.
4. Ningún docente autorizado tiene disponibilidad confirmada en esa jornada.
5. El docente que debe conservar la continuidad del curso no tiene un bloque libre.
6. Todos los docentes autorizados alcanzaron su carga máxima.
7. Las combinaciones compatibles colisionan con docente, aula o cohorte ya ocupados.

**Por qué importa el orden.** Porque las tres primeras son **datos que faltan** —alguien tiene
que autorizar un docente, registrar un aula o activar una jornada— y las tres últimas son
**conflictos de agenda**, que se resuelven de otra forma. Un motor que solo dijera «no pude»
obligaría a adivinar cuál de las siete es.

Consecuencias: con una sola sesión pendiente **no se ejecuta la fase de mejora** y el plan
queda `Inviable`, porque el verificador convierte cada pendiente en una violación
`SESION_PENDIENTE`. Es deliberado: no se guarda como bueno un horario incompleto.

**El límite honesto.** El diagnóstico es estático: mira el catálogo y el estado final, no
reconstruye la secuencia de decisiones. Por eso el séptimo motivo dice «colisionan con
docente, aula o cohorte ya ocupados» y no «colisionó con la sesión X, que se colocó tres
pasos antes». Explicar la causa raíz de un conflicto exigiría registrar la traza de
decisiones, que hoy no se guarda.

#### P79. ¿Qué es lo que el motor NO garantiza?

Esta es la pregunta que conviene contestar antes de que la hagan. La lista completa:

- **No da el óptimo.** Da un horario válido y razonablemente cómodo. La búsqueda local se
  detiene en un mínimo local.
- **`Inviable` no significa imposible.** Significa que esta heurística no pudo completarlo.
  No hay demostración de que no exista solución.
- **No hay vuelta atrás.** Sin *backtracking*: una colocación de la fase 1 no se deshace,
  aunque sea la que después bloquea a otra sesión.
- **No hay intercambios.** La mejora mueve una sesión a la vez; no intercambia dos sesiones
  entre sí ni mueve un curso completo, que son justo los movimientos que sacarían al horario
  de un mínimo local.
- **El balance de carga apenas se corrige**, porque la mejora conserva el docente
  ([P68](#p68-qué-hace-la-fase-de-mejora-y-por-qué-no-cambia-de-docente)).
- **Clases y exámenes usan la misma lógica.** `TipoPlan` viaja en la instantánea pero el
  algoritmo no lo distingue todavía.
- **La cola vive en memoria** ([P80](#p80-qué-pasa-si-la-generación-tarda-demasiado-o-si-el-servidor-se-reinicia)).

Y dos imprecisiones conocidas en las **métricas blandas**, que conviene poder nombrar con
exactitud porque afectan a la calidad, nunca a la validez:

1. **Las ventanas se miden sobre slots de inicio, sin mirar la duración.** Dos sesiones de dos
   slots seguidas —una empieza en el slot 1, la otra en el 3— cuentan como una ventana que en
   realidad no existe. El evaluador y el cálculo incremental cometen exactamente el mismo
   error, así que sus totales siguen coincidiendo: lo que está mal es la definición de la
   métrica, no la optimización.
2. **«Carga» significa dos cosas distintas.** El tope por docente cuenta pares
   curso+cohortes (`ClaveCurso`) y la penalización de balance cuenta cursos distintos
   (`CursoId`). El que se hace cumplir es el tope, y el motor y el verificador lo miden
   igual; la que usa la unidad más gruesa es la penalización blanda.

Decir todo esto en la exposición no es una debilidad: es la prueba de que el equipo leyó su
propio motor. Lo que sí sería una debilidad es afirmar que el resultado es óptimo.

#### P80. ¿Qué pasa si la generación tarda demasiado, o si el servidor se reinicia?

**Qué.** Hay dos topes de tiempo anidados y una cola de un solo consumidor.

**Cómo.**

- **15 segundos** de presupuesto para la fase de mejora, dentro de la instantánea. Al
  agotarse devuelve el mejor horario encontrado, que siempre es válido.
- **300 segundos** para la generación completa (`Motor:TiempoMaximoSegundos`), impuestos con
  un `CancellationTokenSource` enlazado que se cancela solo: `CancelAfter(...)` en
  `ColaGeneracionesEnMemoria`.
- **Cola acotada a 100 trabajos** y **un solo consumidor**, porque el trabajo es intensivo en
  CPU y correr varios en paralelo solo se quitarían tiempo entre ellos. Se conservan los 200
  perfiles de ejecución más recientes: es un proceso de larga vida y no pueden acumularse sin
  límite.
- **Si se cancela o falla**, `EjecutarGeneracionPlan` cierra la generación como `Cancelada` o
  `Fallida` y deja el plan en `Fallido` — usando `CancellationToken.None` para ese cierre,
  porque el registro de que algo terminó no se puede cancelar también.

**Por qué el plan nunca debería quedar colgado.** Porque el bloque de captura cubre las dos
salidas anormales. La excepción es el reinicio del servidor: la cola es **en memoria**, así
que un trabajo encolado se pierde y su plan queda en `Generando`. No queda atrapado para
siempre —la máquina de estados permite `Generando → Fallido → Borrador`—, pero hoy hay que
hacer ese rescate a mano. Una cola persistente lo resolvería y es trabajo pendiente conocido.

### 6.6 Cómo leer el C# del motor

> Esta subsección es para quien va a abrir el código en la exposición. No explica C# desde
> cero: explica los símbolos y las decisiones que aparecen en el motor y que no son obvios
> para quien aprendió programando en otro lenguaje.

#### P81. ¿Qué significa `=>` en medio de un método?

**Qué.** Un **miembro con cuerpo de expresión**. Cuando un método o una propiedad se resuelve
en una sola expresión, se puede escribir con `=>` en lugar de llaves y `return`. Es
exactamente el mismo código compilado.

**Cómo.** Estas dos versiones de `ReglasDuras.DocenteAutorizado` son idénticas:

```csharp
public static bool DocenteAutorizado(DocenteMotor docente, SesionRequeridaMotor sesion)
    => CursosDeLaSesion(sesion).All(docente.CursosAutorizados.Contains);

public static bool DocenteAutorizado(DocenteMotor docente, SesionRequeridaMotor sesion)
{
    return CursosDeLaSesion(sesion).All(docente.CursosAutorizados.Contains);
}
```

**El mismo símbolo, dos cosas distintas.** La regla para distinguirlas es mirar qué hay a la
izquierda:

- Si a la izquierda hay una **firma** (nombre, paréntesis, tipo de retorno), es un miembro con
  cuerpo de expresión: `public int Posicion(BloqueMotor bloque) => ...`.
- Si a la izquierda hay **parámetros sueltos**, es una **lambda**: una función anónima que se
  pasa como argumento. `x => x.Combinaciones` dentro de `OrderBy` es eso.

**Un caso que hay que saber leer.** Cuando el `=>` está en una **propiedad**, el valor se
calcula **cada vez que se lee**, no se guarda:

```csharp
public decimal Total
    => _totalFaltas * _pesos.Consecutividad
       + _totalVentanas * _pesos.Ventanas
       + ...;
```

`Total` no es un campo: son cinco multiplicaciones y cuatro sumas cada vez que alguien la
consulta. Es barato porque los contadores ya están sumados; si en su lugar recorriera el
horario, el `=>` estaría escondiendo un costo grande detrás de algo que parece un dato.

**Por qué se usa tanto acá.** Porque buena parte del motor son funciones de una línea
—`ReglasDuras` entera, los accesos de `OcupacionHorario`, `Dia` y `Slot` en el incremental—.
Con llaves y `return`, esas 63 líneas de reglas serían más de 120 y se leerían peor.

#### P82. ¿Qué es el operador ternario y qué significan los demás signos de interrogación?

**Qué.** `condición ? valorSiSí : valorSiNo` es un `if` que **devuelve un valor**, así que se
puede usar donde una sentencia no cabe: dentro de un `=>`, como argumento, en un
inicializador.

**Cómo.** Ejemplos textuales del motor:

```csharp
// ReglasDuras: si no hay cursos equivalentes, la lista es el curso solo.
public static ImmutableArray<Guid> CursosDeLaSesion(SesionRequeridaMotor sesion)
    => sesion.CursosEquivalentesIds.IsDefaultOrEmpty
        ? [sesion.CursoId]
        : sesion.CursosEquivalentesIds;

// EjecutarGeneracionPlan: el estado final depende de la verificación.
var estadoGeneracion = verificacion.EsValido
    ? EstadoGeneracionDto.Completada
    : EstadoGeneracionDto.Inviable;

// ColaTrabajosPesados: devolver el perfil o null, en una línea.
public PerfilTrabajoPesadoDto? Consultar(Guid id) =>
    _resultados.TryGetValue(id, out var resultado) ? resultado : null;
```

**Los otros signos de interrogación**, que no son lo mismo:

| Símbolo | Nombre | Qué hace | Dónde aparece |
|---|---|---|---|
| `a ? b : c` | Ternario | Elige entre dos valores | `ReglasDuras.CursosDeLaSesion` |
| `??` | Fusión de nulos | Usa el de la izquierda salvo que sea nulo | `ponderaciones ?? Predeterminadas` |
| `?? throw` | Fusión con lanzamiento | Si es nulo, lanza en vez de seguir | `?? throw new KeyNotFoundException(...)` |
| `?.` | Acceso condicional | Si el objeto es nulo, no llama y da nulo | `contexto?.UsuarioId` en `CambiarEstadoPlan` |
| `Tipo?` | Anulable | Declara que ese valor puede faltar | `string?`, `Guid?`, `EvaluacionRestriccionesBlandas?` |

**Por qué importa el `Tipo?`.** No es decoración: con los tipos de referencia anulables
activados, el compilador avisa si se usa sin comprobar algo declarado como posiblemente nulo.
`PuntajeInicial` y `PuntajeFinal` son anulables justamente porque **no existen** cuando la
construcción dejó pendientes y la mejora no llegó a correr. El tipo cuenta esa historia.

**Cuándo no usarlo.** El ternario deja de ayudar en cuanto no se lee de un vistazo o se anida.
En el motor no hay ninguno anidado, y esa es la regla práctica: si necesita paréntesis para
entenderse, vuelve el `if`.

#### P83. ¿Qué significa `readonly` y por qué casi todo el motor lo lleva?

**Qué.** `readonly` en un campo significa que **solo se puede asignar en la declaración o en
el constructor**. Después, el compilador rechaza cualquier reasignación.

**Cómo.** Aparece en tres formas distintas:

```csharp
private readonly bool[] _docenteOcupado;              // campo: la referencia queda fija
private const int DiasPorSemana = 7;                  // constante en tiempo de compilación
private readonly record struct DatosBloque(int Dia, int IndiceSlotInicio);  // struct inmutable
```

**El matiz que hay que tener clarísimo.** `readonly` congela **la referencia**, no el
contenido. `_docenteOcupado` es `readonly` y sin embargo sus casillas se escriben todo el
tiempo: lo que no puede cambiar es **cuál** arreglo es. Es exactamente lo que se quiere en
`CostoBlandoIncremental`, donde más de veinte campos son índices, grupos y buffers: su
contenido es estado vivo, pero ninguno debe ser reemplazado por otro objeto a mitad de una
búsqueda.

**Por qué se usa tanto.** Tres beneficios concretos:

1. **Impide una clase entera de errores.** En una clase con veinte estructuras internas,
   reasignar por accidente un buffer en vez de vaciarlo es un error silencioso; con
   `readonly` no compila.
2. **Documenta la intención.** Al leer la lista de campos se sabe de un golpe qué es
   andamiaje fijo y qué es estado que cambia.
3. **En `readonly record struct` habilita copias baratas** sin copias defensivas del
   compilador, que es justo lo que hace falta en `DatosSesion`, `DatosBloque`, `DatosAula` y
   `Asignacion`: tipos diminutos que se leen millones de veces.

**Cómo se distingue de sus parientes.** `const` es un valor fijado al compilar y sustituido en
el código (`DiasPorSemana = 7`); `static readonly` es un valor único para toda la aplicación,
fijado la primera vez (`PonderacionesRestriccionesBlandas.Predeterminadas`); una propiedad
`{ get; }` es de solo lectura desde fuera y es la forma que usa `InstantaneaMotor` para
exponer sus arreglos inmutables.

#### P84. ¿Por qué `ReglasDuras` es `internal` y `CatalogoCandidatos` está escondida dentro de `MotorHorario`?

**Qué.** Porque el alcance de un tipo es una decisión de diseño, no un trámite. En
`Horarios.Scheduler` hay 21 tipos: **9 públicos, 1 `internal` y 11 privados anidados**. Que la
mayoría no sea pública es intencional.

**Cómo se leen los modificadores:**

| Modificador | Quién lo ve | Ejemplo en el motor |
|---|---|---|
| `public` | Cualquier proyecto que referencie el ensamblado | `MotorHorario`, `VerificadorHorario`, `OcupacionHorario` |
| `internal` | Solo el código del propio ensamblado `Horarios.Scheduler.dll` | `ReglasDuras` |
| `private` anidado | Solo la clase que lo contiene | `CatalogoCandidatos`, `Candidatos`, `Construccion`, `DatosSesion` |
| `sealed` | Nadie puede heredar de él | Todas las clases del motor |

**Por qué `ReglasDuras` es `internal`.** Porque es un detalle compartido entre el motor y el
verificador, que viven en el mismo proyecto. Si fuera pública, cualquier capa —una página
Blazor, un caso de uso— podría empezar a validar por su cuenta con las reglas del motor, y esa
es precisamente la dependencia que la arquitectura evita ([P22](#p22-por-qué-tantas-capas-no-sería-más-simple-todo-junto)). La frontera pública
del motor es otra: los tipos de `ContratoMotor.cs` y las interfaces `IMotorHorarios` e
`IVerificadorHorario`. Todo lo demás es interior.

**Por qué `CatalogoCandidatos` está anidada y privada.** Porque existe solo para el algoritmo
de `MotorHorario`: nadie más puede construirla, ni depender de ella, ni romperse si mañana
cambia. Es la forma más fuerte de decir «esto es asunto de esta clase». Los `record` privados
anidados —`Construccion`, `ResultadoMejora`, `Candidatos`, `Item`, `AsignacionConDatos`— están
por otro motivo: son tipos de retorno con **nombre**, para no devolver tuplas anónimas cuyos
campos se llamarían `Item1` e `Item2`.

**Por qué todo es `sealed`.** Porque ninguna de estas clases está diseñada para heredarse: la
extensión prevista pasa por las interfaces, no por subclases. Sellar deja libertad para
cambiar el interior sin romper a nadie, y de paso permite al compilador resolver llamadas sin
búsqueda virtual — aunque acá el motivo es de diseño, no de rendimiento.

**La regla de fondo**, que sirve para cualquier proyecto: cada tipo se declara con el alcance
más chico que le sirva. Un tipo público es un compromiso que hay que sostener; uno privado
anidado no compromete nada.

#### P85. ¿Qué es un `record` y qué hace `with`?

**Qué.** Un `record` es una clase (o un struct) pensada para llevar datos: constructor
primario, propiedades de solo lectura, **igualdad por valor**, `ToString` legible y el
operador `with` para copiar cambiando algo.

**Cómo.** Toda la salida del motor son records de una línea:

```csharp
public sealed record SesionAsignadaMotor(Guid SesionId, Guid DocenteId, Guid AulaId, Guid BloqueId);
```

Cuatro propiedades inmutables, comparación por contenido y una copia modificada sin tocar el
original:

```csharp
return asignacionActual with { AulaId = aula.Id, BloqueId = bloque.Id };
```

**Por qué importa acá.** La fase de mejora **prueba** candidatos y descarta casi todos. Con
objetos mutables, deshacer un intento sería trabajo manual y una fuente clásica de errores:
basta olvidar un campo al revertir para corromper el horario en silencio. Con `with`, probar
no modifica nada: la asignación anterior sigue intacta hasta que se decide reemplazarla.

**La igualdad por valor**, además, es lo que permite comparar resultados en las pruebas sin
escribir comparadores: dos `SesionAsignadaMotor` con los mismos cuatro identificadores son
iguales.

**Por qué `InstantaneaMotor` NO es un record.** Porque no solo lleva datos: **valida** que el
plan no venga vacío y **copia** cada lista a `ImmutableArray` en el constructor. Un record con
propiedades de inicialización invitaría a construirla sin pasar por esa copia, y la copia es
justamente la garantía que hace reproducible la generación ([P64](#p64-qué-es-la-instantánea-y-por-qué-el-motor-no-consulta-la-base-de-datos)). Cuando el
constructor hace trabajo, corresponde una clase.

#### P86. ¿Qué significan los demás símbolos que aparecen en el motor?

Los que se cruzan al leer el código y no se explican solos:

| Símbolo | Qué es | Ejemplo del motor |
|---|---|---|
| `[a, b]` | Expresión de colección (C# 12): el tipo lo pone el destino | `[sesion.CursoId]`, `Dictionary<string, ...> docentes = [];` |
| `^1` | Índice desde el final: el último elemento | `slots[^1]` en el conteo de ventanas |
| `is X or Y` | Patrón: se lee como la frase que representa | `aula.Tipo is TipoAulaMotor.Laboratorio or TipoAulaMotor.Mixta` |
| `out var` | Declara la variable en el mismo lugar donde se recibe | `filas.TryGetValue(entidadId, out var fila)` |
| `ref` | Pasa la variable misma, no una copia: lo que se le asigne se ve afuera | `ref decimal mejorCosto` en la búsqueda de movimientos |
| `$"..."` | Interpolación de texto | `$"plan:{planId:N}:{grupo.Key}:{numero}"` |
| `:N` y `0:0.##` | Formatos: uuid sin guiones; hasta dos decimales sin relleno | El id determinista y el diagnóstico de mejora |
| `stackalloc` | Reserva memoria en la pila, sin usar el montón | `Span<byte> bytes = stackalloc byte[16]` |
| `_nombre` | Convención de campo privado | `_totalFaltas`, `_bufferSlots` |
| `var (_, perfil)` | El guion bajo descarta un valor que no interesa | El perfilador de trabajos pesados |
| `using var` | Se libera solo al salir del bloque | `using var ambito = ambitos.CreateScope()` |
| `(long)` | Conversión explícita para evitar desbordar `int` | `(long)Docentes.Count * Aulas.Count * Bloques.Count` |

Ese último merece una frase aparte, porque no es un tecnicismo: multiplicar tres cuentas de
candidatos puede pasarse del rango de un entero de 32 bits, y sin la conversión el número de
combinaciones podría salir **negativo** y el orden «más restringido primero» se invertiría en
silencio. Un paréntesis de cinco caracteres sosteniendo la heurística entera.

**Y lo que llamativamente no aparece: `async`.** No hay ni un `async` ni un `await` en
`MotorHorario`, `VerificadorHorario`, `CostoBlandoIncremental`, `OcupacionHorario`,
`ExpansorSesiones` ni `EvaluadorRestriccionesBlandas`. El algoritmo es **síncrono a
propósito**: es trabajo de CPU puro, y lo asíncrono es el andamiaje que lo saca de la petición
web —la cola, el servicio de fondo, los adaptadores de datos—. Confundir esas dos capas es el
error habitual al leerlo por primera vez.

#### P87. ¿Por qué el puntaje es `decimal` y no `double`?

**Qué.** Porque `decimal` representa exactamente los valores en base 10, y `double` no.

**Cómo.** Los pesos son literales decimales —`10m`, `8m`, `3m`, `2m`, `5m`, `0.01m`— y el
costo es una suma de enteros multiplicados por esos pesos. Con `decimal` no hay arrastre de
error, así que la comparación que decide cada movimiento de la fase de mejora,
`costo.Total < mejorCosto`, es exacta y dos corridas dan el mismo total.

**Por qué importa.** Con `double`, `0,1 + 0,2` no da `0,3`. Un residuo de representación en
una comparación estricta puede hacer que un movimiento se acepte en una máquina y se rechace
en otra, o que se acepte un movimiento que en realidad no mejora nada. En un algoritmo cuyo
único criterio de decisión es «¿este número bajó?», eso rompería el determinismo que se
defiende en [P77](#p77-qué-hace-que-una-corrida-sea-reproducible).

**El costo.** `decimal` es bastante más lento que `double`, porque no lo ejecuta la unidad de
punto flotante del procesador. Se acepta porque el total se mantiene por diferencias
([P75](#p75-por-qué-existe-costoblandoincremental-si-ya-está-el-evaluador)) y no se recalcula desde cero. Un `long` con pesos enteros sería aún más rápido y
también exacto, pero cerraría la puerta a pesos fraccionarios configurables —y el desbalance
de carga, que es una proporción, ya los necesita—.

#### P88. ¿Qué es `ImmutableArray` y por qué no una `List`?

**Qué.** `ImmutableArray<T>` es un arreglo que no se puede modificar: cualquier «cambio»
devuelve otro arreglo. Toda la instantánea y toda la salida del motor lo usan.

**Cómo.** Para construir uno se usa un constructor por pasos, que es el patrón de
`ExpansorSesiones`:

```csharp
var resultado = ImmutableArray.CreateBuilder<SesionRequeridaMotor>();
// ... resultado.Add(...) mientras se arma
return resultado.ToImmutable();
```

**Por qué en las fronteras.** Porque garantiza que nadie —ni otra capa, ni otro hilo— pueda
alterar la entrada del motor mientras corre. Es la diferencia entre *decir* que la instantánea
es una foto y que lo sea: si fuera una `List`, quien la pasó conservaría una referencia capaz
de modificarla.

**Y por qué no adentro.** Dentro del motor se usan `List`, `Dictionary`, `HashSet` y arreglos
crudos sin ningún pudor, porque son estado local, caliente y de vida corta. La regla es
**inmutable en las fronteras, mutable adentro**: la inmutabilidad se paga en copias, así que
se compra donde da garantías y no donde solo da lentitud.

**Un pariente que conviene distinguir: `IEnumerable<T>` es perezoso.**
`OrdenarMasRestringidaPrimero` devuelve una consulta, no una lista: nada se ordena hasta que
el `foreach` de la construcción la recorre, y se recorre exactamente una vez. Recorrer dos
veces un `IEnumerable` construido con LINQ repite todo el trabajo — es la trampa clásica, y
por eso el motor materializa con `ToArray()` o `ToImmutableArray()` en cuanto una lista se va
a usar más de una vez.

#### P89. ¿Qué es un `CancellationToken` y quién lo dispara?

**Qué.** Un aviso de «dejá de trabajar» que viaja como parámetro. No mata nada por su cuenta:
el código tiene que preguntarle.

**Cómo.** El motor pregunta en dos lugares: al entrar a `Ejecutar` y **dentro del bucle de
candidatos** de la fase de mejora, con `cancellationToken.ThrowIfCancellationRequested()`, que
lanza `OperationCanceledException`. Preguntar dentro del bucle es lo que hace que el tope de
tiempo funcione de verdad: si solo se comprobara entre pasadas, una pasada larga se pasaría
del presupuesto.

**Quién lo dispara.** Dos fuentes, anidadas:

- `ColaGeneracionesEnMemoria` crea un token enlazado y lo cancela solo a los 300 segundos.
- El apagado de la aplicación cancela el token del servicio de fondo, y ese es el que cuelga
  del anterior.

**Quién lo atrapa.** `EjecutarGeneracionPlan` captura `OperationCanceledException`, cierra la
generación como `Cancelada`, deja el plan en `Fallido` y **vuelve a lanzar**, porque cancelar
no es terminar bien. El cierre se registra con `CancellationToken.None`: la anotación de que
algo se canceló no puede cancelarse a su vez.

**Por qué hay dos topes y no uno.** Porque hacen cosas distintas: los 15 segundos de la mejora
son un **presupuesto de calidad** —al agotarse se devuelve el mejor horario encontrado, que es
válido—, y los 300 segundos de la generación son un **límite de seguridad**: al agotarse se
aborta y el plan queda en fallido para reintentar.

---

## 7. Glosario

> Términos estándar del medio, con la definición formal y su equivalente concreto en este
> proyecto. Si sabés hacer la cosa pero no sabés cómo se llama, esta tabla es para vos.

### 7.1 Web y APIs

| Término | Qué es | En este proyecto |
|---|---|---|
| **API** | *Application Programming Interface*. El conjunto de operaciones que un sistema ofrece para que otro programa lo use, con su contrato de entrada y salida. No es una pantalla: es una puerta para programas | La Data API de Supabase (PostgREST) |
| **Endpoint** | Una dirección concreta a la que se le puede pedir algo, con un método. Es *una* operación de la API | `GET /rest/v1/aulas`, `POST /rest/v1/rpc/crear_cohorte`, `/health` |
| **HTTP** | El protocolo de la web. Define métodos (`GET`, `POST`, `PATCH`, `DELETE`), cabeceras y códigos de estado | Todo el tráfico entre el servidor .NET y Supabase |
| **REST** | Estilo de diseño de APIs sobre HTTP donde cada cosa es un *recurso* con URL propia y los métodos HTTP indican qué hacerle. Definido por Roy Fielding en su tesis doctoral (2000) | `GET` consulta, `POST` crea, `PATCH` actualiza, `DELETE` borra |
| **RPC** | *Remote Procedure Call*: llamar a una función que vive en otro lado. Lo opuesto a REST en enfoque: no se piensa en recursos sino en verbos | `POST /rest/v1/rpc/crear_cohorte` llama a una función SQL |
| **JSON** | Formato de texto para representar datos estructurados. Es lo que viaja por la red | El cuerpo de toda petición y respuesta |
| **Cabecera (header)** | Metadato de una petición HTTP: no es el contenido, es información sobre el contenido o sobre quién pide | `Authorization: Bearer ...`, `Accept-Profile: horarios` |
| **Cookie** | Dato que el servidor le pide al navegador que guarde y reenvíe en cada petición. Sirve para mantener la sesión | `horarios.sesion`, `HttpOnly` |
| **HttpOnly** | Marca de una cookie que impide que el JavaScript de la página la lea. Protege contra robo de sesión vía XSS | La cookie de sesión lo tiene |
| **JWT** | *JSON Web Token* (RFC 7519). Un texto firmado que dice quién sos. El servidor lo verifica con la firma, sin consultar una base de datos | Lo emite Supabase Auth; viaja en `Authorization` |
| **Middleware** | Pieza que se intercala en el camino de una petición y hace algo antes o después. Se encadenan y **el orden importa** | `UseAuthentication()`, `UseAuthorization()`, `UseAntiforgery()` |
| **CORS / proxy inverso / TLS** | Mecanismo de permisos entre dominios / servidor que recibe el tráfico y lo reenvía / cifrado de la conexión (la S de HTTPS) | El proxy inverso motiva `UseForwardedHeaders()` |
| **Idempotencia** | Que hacer la misma operación dos veces produzca el mismo resultado que hacerla una | La columna `clave_solicitud` |

### 7.2 Bases de datos

| Término | Qué es | En este proyecto |
|---|---|---|
| **Entidad** | Una *cosa* del mundo real sobre la que se guardan datos: tiene identidad propia y existe independientemente. En el modelo relacional se implementa como una tabla | `Docente`, `Aula`, `Cohorte`, `PlanHorario` |
| **Atributo** | Una propiedad de una entidad. En la tabla es una columna | `capacidad_maxima` de un aula |
| **Tupla / fila / registro** | Una ocurrencia concreta de la entidad: un aula específica | Una fila de `horarios.aulas` |
| **Esquema (schema)** | Espacio de nombres dentro de una base de datos: una carpeta de tablas, funciones y tipos. **No confundir** con "esquema" como sinónimo de diseño de la base de datos | `horarios` es el nuestro; `auth`, `storage` son de Supabase |
| **DDL / DML** | *Data Definition Language* (crear y alterar estructuras: `CREATE`, `ALTER`) / *Data Manipulation Language* (mover datos: `SELECT`, `INSERT`, `UPDATE`, `DELETE`) | Las migraciones son DDL; las funciones RPC, DML |
| **Llave primaria (PK)** | La columna (o combinación) que identifica cada fila sin ambigüedad | `id uuid`; en las tablas puente, la pareja de ids |
| **Llave foránea (FK)** | Columna que apunta a la PK de otra tabla. La base de datos impide que apunte a algo que no existe (integridad referencial) | `sesiones.docente_id → docentes.id` |
| **`ON DELETE CASCADE` / `RESTRICT`** | Qué hacer si se borra la fila apuntada: arrastrar las que dependen / impedir el borrado | `docente_facultades`: cascade a docentes, restrict a facultades |
| **Cardinalidad** | Cuántos de un lado se relacionan con cuántos del otro: 1:1, 1:N, N:M | Docente–Facultad es N:M |
| **Tabla puente** | Tabla que existe solo para materializar una relación N:M. Sin id propio: su PK es la pareja de llaves foráneas | `docente_facultades`, `usuario_roles`, `plan_carreras` |
| **Normalización** | Organizar las tablas para que cada dato esté en un solo lugar y no haya redundancias que puedan contradecirse. Formas normales de Codd (1970) | Casi todo el esquema |
| **Desnormalización** | Repetir un dato a propósito, por rendimiento o por una restricción que lo exige. Solo es válida si algo garantiza la consistencia | `sesion_cohortes`, mantenida por triggers |
| **Índice** | Estructura auxiliar que acelera la búsqueda por ciertas columnas, a costa de espacio y de escrituras más lentas | `docente_facultades_facultad_idx` |
| **Índice único parcial** | Índice único que solo aplica a las filas que cumplen una condición | `aulas_codigo_uq ... WHERE eliminado_en IS NULL` |
| **Restricción (constraint)** | Regla que la base de datos hace cumplir siempre: `NOT NULL`, `CHECK`, `UNIQUE`, `FOREIGN KEY`, `EXCLUDE` | `CHECK (minuto_fin_dia > minuto_inicio_dia)` |
| **Restricción EXCLUDE** | Prohíbe que existan dos filas que cumplan a la vez una condición dada. Sirve para impedir solapes | `sesiones_docente_no_solapado` |
| **Columna generada** | Columna que la base de datos calcula sola a partir de otras. No se escribe | `rango_minutos`, `rango_slots` |
| **ENUM** | Tipo con lista cerrada de valores. La base de datos rechaza cualquier otro | `dia_semana`, los 21 `estado_*` y `tipo_*` |
| **Vista** | Consulta guardada con nombre, que se usa como si fuera una tabla | `api_cohortes_activas`, `vista_horarios_publicados` |
| **`security_invoker`** | Opción de una vista para que corra con los permisos de quien consulta y no de quien la creó. Sin ella, una vista evade RLS | Las cinco vistas `api_*` la llevan |
| **Función almacenada** | Código que vive en la base de datos y se ejecuta ahí. Puede hacer varias operaciones en una transacción | Las 39 funciones llamables |
| **Trigger** | Función que la base de datos dispara sola ante `INSERT`/`UPDATE`/`DELETE`. Nunca se llama a mano | Los 42 triggers; el orden es alfabético por nombre |
| **`BEFORE` / `AFTER`** | Antes de escribir la fila (sirve para modificarla o rechazarla) / después (sirve para reaccionar y tocar otras tablas) | `BEFORE` valida; `AFTER` propaga |
| **`new` / `old`** | Dentro de un trigger, la fila como va a quedar / como estaba | `new.actualizado_en = now()` |
| **Transacción** | Conjunto de operaciones que ocurren todas o ninguna | Cada función SQL corre en una |
| **ACID** | Atomicidad, Consistencia, Aislamiento, Durabilidad: las garantías de una transacción | Es el motivo de meter escrituras múltiples en funciones |
| **UPSERT** | `INSERT ... ON CONFLICT ... DO UPDATE`: insertar si no existe, actualizar si ya está, atómicamente | `activar_cohorte_periodo(...)` |
| **RLS** | *Row Level Security*: filtros por fila que PostgreSQL aplica solo, según quién consulta | Las 242 políticas |
| **`USING` / `WITH CHECK`** | En una política: filtro para leer / filtro para escribir | `USING` mira lo que está; `WITH CHECK`, lo que vas a dejar |
| **`SECURITY DEFINER`** | Función que corre con los permisos de quien la creó, saltándose RLS. Puerta trasera legítima pero peligrosa | Solo 6 funciones, todas de contexto de seguridad |
| **`search_path`** | Orden en que Postgres busca nombres sin esquema. Fijarlo es obligatorio en funciones `SECURITY DEFINER` | `SET search_path TO 'horarios', 'public'` |
| **Migración** | Archivo SQL versionado que lleva la base de datos de un estado al siguiente | `supabase/migrations/AAAAMMDDNNNN_*.sql` |
| **Seed** | Datos de ejemplo para desarrollo, nunca para producción | `supabase/seeds/` |
| **Borrado lógico (soft delete)** | Marcar la fila como borrada en vez de eliminarla | `eliminado_en` |
| **Bloqueo optimista** | Detectar ediciones simultáneas comparando una versión, en vez de bloquear | `version_fila` |
| **Advisory lock** | Candado voluntario por clave, para serializar una operación concreta | `pg_advisory_xact_lock` en `crear_version_derivada` |
| **`pg_dump`** | Herramienta que vuelca el esquema o los datos de una base de datos a un archivo SQL | `docs/database.sql` es su salida |
| **TOCTOU** | *Time-of-check to time-of-use*: comprobar algo y actuar después, cuando ya cambió. Fuente clásica de bugs de concurrencia | Lo que evitan las restricciones `EXCLUDE` y los índices únicos |

### 7.3 Arquitectura y diseño

| Término | Qué es | En este proyecto |
|---|---|---|
| **Capa** | Agrupación de código por responsabilidad, con reglas sobre quién puede llamar a quién | Dominio, Contratos, Aplicación, Scheduler, Infraestructura, Blazor |
| **Ensamblado (assembly)** | Unidad compilada de .NET: un `.dll`. Un proyecto `.csproj` produce uno | Cada capa es un ensamblado |
| **Referencia de proyecto** | Declaración de que un proyecto puede usar los tipos de otro. Lo verifica el compilador | Los `<ProjectReference>` de cada `.csproj` |
| **Dominio** | El código que representa el negocio: conceptos y reglas, sin nada técnico alrededor | `Horarios.Dominio`, sin ninguna dependencia |
| **Caso de uso** | Una operación completa que el sistema ofrece, con sus reglas y su autorización. Una clase, una acción | `CrearAula`, `CambiarEstadoPlan`, `RevisarDatosPlan` |
| **DTO** | *Data Transfer Object*: objeto plano que solo transporta datos entre capas o por la red. Sin lógica | Todo `Horarios.Contratos` |
| **Interfaz** | Contrato: dice qué operaciones existen, sin decir cómo se cumplen | `IDatosAulas`, `IContextoUsuario` |
| **Puerto / adaptador** | El puerto es la interfaz que declara la capa interna; el adaptador es la implementación concreta afuera. Cockburn (2005) | `IDatosAulas` (puerto) / `DatosAulasPostgres` (adaptador) |
| **Inversión de dependencias** | Que lo importante no dependa de lo accesorio; ambos dependen de una abstracción. Martin (1996) | Aplicación no conoce Infraestructura |
| **Inyección de dependencias** | Que una clase reciba lo que necesita en vez de fabricarlo | Constructores de todos los casos de uso |
| **Raíz de composición** | El único lugar donde se decide qué implementación concreta cumple cada interfaz | `src/Horarios.Blazor/Program.cs` |
| **Tiempo de vida (scoped/singleton/transient)** | Cuánto vive una instancia registrada: por circuito de usuario / una para toda la app / una por pedido | `AddScoped`, `AddSingleton` |
| **Monolito modular** | Un solo desplegable, pero dividido por dentro en módulos con fronteras claras. No son microservicios | La descripción del README |
| **Doble de prueba (mock/stub/fake)** | Implementación falsa de una interfaz, usada en pruebas para no depender de lo real | Los dobles de `IDatos*` en `tests/` |
| **Determinismo** | Que la misma entrada produzca siempre la misma salida | Los ids del motor, derivados por hash |
| **Defensa en profundidad** | Poner varios controles independientes, asumiendo que cualquiera puede fallar | Presentación + aplicación + RLS |
| **Fail-safe default** | Que ante la duda el sistema niegue, no permita. Saltzer y Schroeder (1975) | `VerificarPermiso` devuelve `false` con datos incompletos |
| **Máquina de estados** | Modelo donde algo está en un estado y solo puede pasar a ciertos otros | Las transiciones de `PlanHorario` |
| **Cola de trabajo** | Estructura donde se dejan tareas para que otro proceso las ejecute después | `ColaTrabajosPesados` + `ProcesadorTrabajosPesados` |
| **Servicio alojado (hosted service)** | Proceso de fondo que arranca y para con la aplicación | `ProcesadorTrabajosPesados` |
| **Contenedor / Docker Compose** | Empaquetado del sistema con todo lo que necesita para correr / herramienta para levantar varios juntos | `Dockerfile`, `compose.yaml` |
| **CI** | *Continuous Integration*: compilar y probar automáticamente en cada cambio | El workflow de `.github/` |

### 7.4 Motor y algoritmos

| Término | Qué es | En este proyecto |
|---|---|---|
| **Heurística** | Método que busca una buena solución en tiempo razonable, sin garantizar la mejor. Se juzga por resultados, no por demostración | Todo el motor: construcción voraz más búsqueda local |
| **Algoritmo voraz (greedy)** | Toma en cada paso la mejor opción disponible en ese momento y no vuelve atrás | La fase 1: la primera terna legal de cada sesión |
| **Búsqueda local** | Partir de una solución completa y explorar cambios pequeños que la mejoren | La fase 2: mover una sesión a otro bloque o aula |
| **Primera mejora / mejor mejora** | Aceptar el primer cambio que mejora / evaluar todos y quedarse con el mejor | Se usa primera mejora: más movimientos por segundo |
| **Óptimo local** | Solución que no mejora con ningún cambio pequeño, aunque exista otra mejor lejos | Donde termina la fase 2; no hay reinicios para escapar |
| **Función objetivo / costo** | El número que el algoritmo minimiza | El puntaje blando: menos es mejor |
| **Restricción dura** | Regla que no se puede incumplir: decide si la solución es válida | Colisiones, autorización, capacidad, jornada, carga |
| **Restricción blanda** | Preferencia: incumplirla penaliza pero no invalida | Ventanas, consecutividad, desplazamiento, balance |
| **CSP** | *Constraint Satisfaction Problem*: variables, dominios y restricciones entre ellas | Sesión = variable; (docente, aula, bloque) = su dominio |
| **NP-completo / NP-difícil** | Clase de problemas para los que no se conoce algoritmo eficiente y que se creen intratables en el caso general | La construcción de horarios lo es (Even, Itai y Shamir, 1976) |
| **Espacio de búsqueda** | El conjunto de todas las soluciones posibles, válidas o no | Docentes × aulas × bloques, elevado al número de sesiones |
| **Fail-first / MRV** | Decidir primero la variable con menos opciones, para chocar temprano y barato | La heurística «más restringido primero» |
| **Backtracking** | Deshacer decisiones anteriores al llegar a un callejón sin salida | **No** se usa: una colocación de la fase 1 no se revisa |
| **Poda** | Descartar de antemano opciones que no pueden llevar a una solución válida | El catálogo de candidatos y las reglas duras |
| **Evaluación incremental** | Recalcular solo la parte del costo afectada por un cambio, en vez del total | `CostoBlandoIncremental` |
| **Índice de ocupación** | Estructura que responde «¿está libre?» sin recorrer lo ya colocado | Los tableros de `OcupacionHorario` |
| **Algoritmo con presupuesto (anytime)** | El que puede detenerse en cualquier momento y devolver la mejor solución hallada | La fase de mejora, con sus 15 segundos |
| **Instantánea (snapshot)** | Copia congelada de los datos de entrada en un instante | `InstantaneaMotor`, guardada con cada generación |
| **Slot** | La unidad mínima de tiempo del horario. El motor no razona con relojes | Un período de la jornada; una sesión ocupa uno o varios seguidos |
| **Sesión** | Una clase concreta por colocar: curso, cohortes, duración | `SesionRequeridaMotor`, producida por el expansor |

---

## Fuentes citadas

Referencias técnicas usadas en las respuestas, por si alguien pide el respaldo:

- **PostgreSQL Documentation** — capítulos de *Row Security Policies*, *Constraints*
  (exclusion constraints), *Generated Columns*, *Partial Indexes*, *Trigger Behavior*,
  *Writing SECURITY DEFINER Functions Safely*, *Rules and Privileges* (`security_invoker`).
- **PostgREST Documentation** — *Schemas*, selección de esquema por `Accept-Profile` /
  `Content-Profile`.
- Codd, E. F. (1970). *A Relational Model of Data for Large Shared Data Banks.* CACM.
- Parnas, D. L. (1972). *On the Criteria To Be Used in Decomposing Systems into Modules.* CACM.
- Saltzer, J. H. & Schroeder, M. D. (1975). *The Protection of Information in Computer
  Systems.* Proceedings of the IEEE.
- Martin, R. C. (1996). *The Dependency Inversion Principle.* C++ Report.
- Fowler, M. (2002). *Patterns of Enterprise Application Architecture* — Optimistic Offline
  Lock, Data Transfer Object.
- Evans, E. (2003). *Domain-Driven Design.*
- Hohpe, G. & Woolf, B. (2003). *Enterprise Integration Patterns.*
- Cockburn, A. (2005). *Hexagonal Architecture (Ports and Adapters).*
- Seemann, M. *Dependency Injection in .NET* — Composition Root.
- Ford, N., Parsons, R. & Kua, P. (2017). *Building Evolutionary Architectures* — fitness
  functions.
- **RFC 7519** (JSON Web Token), **RFC 9562** (UUID, sucesor de RFC 4122).
- **ANSI INCITS 359** (RBAC), **NIST SP 800-162** (ABAC).
- **OWASP** — Session Management Cheat Sheet, CSV Injection, IDOR.
- **ISO/IEC/IEEE 29148** — ingeniería de requisitos y trazabilidad.
- **PATAT** — *Practice and Theory of Automated Timetabling*, literatura de referencia del
  problema de horarios.
- Even, S., Itai, A. & Shamir, A. (1976). *On the Complexity of Timetable and Multicommodity
  Flow Problems.* SIAM Journal on Computing — NP-completitud del problema de horarios.
- Cooper, T. B. & Kingston, J. H. (1996). *The Complexity of Timetable Construction
  Problems.* PATAT.
- Brélaz, D. (1979). *New Methods to Color the Vertices of a Graph.* CACM — DSATUR, el
  antecedente de «más restringido primero».
- Haralick, R. M. & Elliott, G. L. (1980). *Increasing Tree Search Efficiency for Constraint
  Satisfaction Problems.* Artificial Intelligence — principio de fallo temprano.
- Schaerf, A. (1999). *A Survey of Automated Timetabling.* Artificial Intelligence Review.
- Hoos, H. H. & Stützle, T. (2004). *Stochastic Local Search: Foundations and Applications* —
  primera mejora frente a mejor mejora.
- **Microsoft Learn** — *C# language reference*: miembros con cuerpo de expresión, `readonly`,
  modificadores de acceso, `record` y expresiones `with`.
- **The Twelve-Factor App** — factores III (configuración) y X (paridad de entornos).
