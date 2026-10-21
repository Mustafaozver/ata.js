# AI Agent Instructions for ata.js

## Purpose
This is the real ata.js project. The workspace root (`/home/mustafa/Desktop/Projeler/BOSH`) is only a demo/test folder; use `/home/mustafa/Desktop/Projeler/BOSH/node_modules/ata.js` for all code work and guidance.

This repository is an npm package and framework designed to provide a more disciplined, more secure working environment for Node.js projects.

## Key project facts
- `package.json` defines:
  - `main`: `./Core/Ata.js`
  - `scripts`: `npm test` → `npx mocha`
  - `bin` commands: `ata.init`, `ata.run`, `ata.test`, `ata.electron`, `ata.add`, `ata.dev`, `ata.update`, `ata.upgrade`
- Node version: `>=18.0.0`
- `ata.js` is a custom lifecycle framework using `Project.*` runtime globals.
- Do not modify files outside `/node_modules/ata.js` unless the user explicitly asks for BOSH wrapper changes.

## Primary runtime entrypoints
- `App/Run.js` — main runtime launch.
- `App/Test.js` — test execution entrypoint.
- `App/Initialize.js` — project initialization.
- `Core/Ata.js` — core runtime engine.
- `App/Run.Electron.js` — Electron launch support.

## Project conventions
- The code relies on custom `Project`, `Module`, `Setup`, `Loop`, `OK`, `NO`, and promise-style execution patterns.
- The system builds a sandbox environment so project code runs safely in a restricted context.
- `ata.js` manages projects using two lifecycle hooks: `Setup` and `Loop`.
  - `Setup` functions run once at startup and prepare the system.
  - `Loop` functions run each cycle (default ~1 second) and perform routine checks.
- The runtime exposes two global objects: `ATA` and `ANA`.
  - `ATA()` returns the global ATA object.
  - `ANA` is a global system object under development and may be available in sandboxed contexts.
- Modules frequently use self-invoking function wrappers: `return(()=>{ ... })();`.
- The system uses modular folders like `App`, `Config`, `Constant`, `Controller`, `Core`, `Library`, `Service`, `Document`, `Extension`, `InterFace`, `Job`, `Log`, `Source`, and `Mod`.
- `Controller` modules can have root-level command access, while `Service` modules are more restricted.
- `Library` modules are loaded early and can define shared utilities used by other modules.
- `Config` modules are data sources for runtime settings; `Constant` modules are JSON-only constants with optional `isWrite` semantics.
- `Application`/`App` is the bootstrap layer: it sets the runtime mode and loads modules in the correct order.
- Asynchronous control uses `OK(...)` and `NO(...)` callbacks as part of the framework flow.
- `App/` files expose CLI or runtime behaviors; `Mod/` files define environment wiring and startup configuration.

## ATA sandbox usage
Use the ATA wrapper to establish an isolated scope and register lifecycle callbacks:

```javascript
((ATA)=>{
    ATA.Setups.push(()=>{
        // one-time initialization
    });
    ATA.Loops.push(()=>{
        // periodic checks and routines
    });
})(ATA());
```

## README insights
- The root `README.md` confirms the module list and the ata.js lifecycle approach.
- Default runtime mode is `Run`; mode selection is driven by environment variables.
- Boot order is generally: `Library` → `Config` / `Constant` → `Controller` → `Service` / other dependent modules.
- `Project.*` globals are used to load and access modules across the system.
- The `Application` module does not execute business logic itself; it orchestrates module loading and mode selection.

## Document folder mapping
The `Document/` folder provides module-specific documentation. Each `Document/*.md` file describes an example project module with the same name.
- `Document/Application.md` — Application/App bootstrap and runtime mode loading.
- `Document/App.md` — currently empty stub; same area as `Application`.
- `Document/Config.md` — Config module behavior and access patterns.
- `Document/Constant.md` — Constant module JSON-only data and `isWrite` rules.
- `Document/Controller.md` — Controller module (placeholder document).
- `Document/Core.md` — Core engine / runtime services (placeholder document).
- `Document/DataBase.md` — Database module (placeholder document).
- `Document/Document.md` — Document module / docs generation (placeholder document).
- `Document/Extension.md` — Extension module (placeholder document).
- `Document/InterFace.md` — InterFace module (placeholder document).
- `Document/Job.md` — Job module / thread starter scripts (placeholder document).
- `Document/Library.md` — Library module utilities (placeholder document).
- `Document/Log.md` — Log module (placeholder document).
- `Document/Mod.md` — Mod wiring and startup configuration (placeholder document).
- `Document/Project.md` — Project-level system behavior (placeholder document).
- `Document/Service.md` — Service module behavior (placeholder document).
- `Document/Source.md` — Source module files (placeholder document).
- `Document/Version.md` — Version metadata module (placeholder document).
- `Document/ata.js.md` — General ata.js project overview (placeholder document).

## Working guidance
- Treat `/node_modules/ata.js` as the authoritative project root.
- Prefer changes inside `App/`, `Core/`, `Controller/`, `Config/`, `Service/`, and `Document/`.
- Use `npx ata.run`, `npx ata.test`, and `npx ata.init` for validation rather than assuming standard Node frameworks.
- If editing configuration or module wiring, verify the corresponding `Mod/` and `Config/` files.
- Avoid editing the outer BOSH workspace unless the change is explicitly about the demo/test wrapper.

## Notes
- The `README.md` in `/node_modules/ata.js` explains the module structure and command usage.
- This project is not a standard Express/Electron app; it is a custom lifecycle system with its own execution model.
- Keep agent guidance minimal and target the custom ata.js runtime patterns.
