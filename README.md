# ATA.JS Javascript life cycle system

## Overview

ata.js is a Node.js-based module that enables the creation and management of complex project structures with modular components, executing tasks within a root and restricted context. This system allows developers to easily initiate, configure, and execute projects in a highly modular and efficient way, leveraging a flexible core system.

The architecture is designed to support different project "modes" and component-based loading, providing a robust environment where different parts of the system are modular and can depend on each other.

## Features

- Modular Components: The system is organized into various modules such as App, Controller, Config, Core, Service, DB, and others.

- Project Modes: Projects are initialized with an environment variable defining the mode (default: "Run").

- Component Hierarchy: Modules are loaded and initialized in a hierarchical structure. Each module can expose its own functions, and depending on the mode, they can be initialized or configured differently.

- Root and Restricted Access: Certain modules like Controller have root-level access, allowing them to execute commands freely. Other modules like Service have restricted access, with the capability to use only certain functions exposed by higher-level modules.

- Promise-based Execution: Each module can handle asynchronous tasks using promises, providing a way to manage success (OK()) and failure (NO()) outcomes.


## Installation

To install and use ata.js, run the following command in your terminal:

```bash
npm install -g ata.js
```

### Create a Project

```bash
npx ata.init
```

This will initialize the project and set up the necessary configuration files.
During the initialization process, you will be prompted to enter the project and a few other details.

## An Example Project Structure

Once initialized, your project will follow a modular structure. The base project will look like the following:

```mathematica

my-project/
├── App/
├── Application/
├── Config/
├── Constant/
├── Controller/
├── Core/
├── DataBase/
├── Document/
├── Extension/
├── InterFace/
├── Job/
├── Library/
├── Log/
├── Mod/
├── Service/
└── Source/

```

Here are the main directories and their purposes:

- App: Contains the core application logic.

- Config: Holds configuration files and environment settings.

- Constant: Stores constant values used throughout the application.

- Core: The central system, including execution and multi-threading management.

- Controller: Manages the logic for specific components, can have root access to the system.

- Service: Provides additional services, often used for external computations or handling specific logic.

- Log: Logging system for keeping track of events and errors.

- DB: Database interactions and management.

- Extension: Additional functionality that can be added to the system.

- Interface: Holds the interfaces for communication between components.

- Library: Core utilities and shared resources.

- Source: The source files of the project.