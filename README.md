# PresentacionSprint04

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Información de base de datos

El diagrama y el catálogo usan la misma instantánea: `docs/database.sql`, exportada el
2026-09-09 desde `supabase_db_horarios`, la base local de `HORARIOS/Horarios-develop`.
Contiene únicamente la estructura del esquema `horarios`, sin filas, propietarios ni
permisos GRANT. Refleja la base local consultada; no acredita el estado del servidor remoto.

Para actualizarla, exportar primero a un archivo temporal y reemplazar la instantánea
solo si el comando termina correctamente:

```bash
docker exec supabase_db_horarios pg_dump --schema-only --no-owner --no-privileges --quote-all-identifiers -n horarios -U postgres postgres > /tmp/horarios-esquema.sql
```

Conservar en `docs/database.sql` la cabecera de procedencia y actualizar su fecha al
incorporar el nuevo volcado. Después regenerar los datos de las diapositivas:

```bash
python3 scripts/gen-erd.py
python3 scripts/gen-catalogo.py
```

Revisar también las cifras y explicaciones de `docs/preguntas-respuestas.md`, y ejecutar:

```bash
python3 scripts/gen-preguntas.py
pnpm build
```

Los generadores escriben en este proyecto y se detienen si encuentran tablas sin
clasificar o funciones sin explicar. Las migraciones se mantienen en el proyecto de referencia.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
