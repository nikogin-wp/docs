# Introduction

Nikogin Framework is a lightweight, opinionated foundation for building WordPress plugins. It brings structure to plugin development by providing a service container, repository pattern, listener system, admin controllers, and a CLI — inspired by Laravel, designed for WordPress.

## What it provides

| Layer | What you get |
|---|---|
| **Architecture** | Service container, service providers, bootstrap lifecycle |
| **Database** | Repository pattern for custom tables, post types, and taxonomies |
| **WordPress** | Listeners for actions/filters, jobs, shortcodes, admin controllers |
| **HTTP** | REST API controllers and routing |
| **Frontend** | Vite-based asset pipeline with TypeScript and SCSS |
| **Console** | `php nikogin make:*` commands to scaffold any class |

## Two packages

| Package | Composer name | Role |
|---|---|---|
| **Framework** | `nikoginwp/framework` | Abstractions, support classes, console commands |
| **Nikogin** | `nikoginwp/nikogin` | Plugin skeleton — bootstraps, managers, routes, config |

The **framework** is the engine. The **nikogin** skeleton is the starting point for every new plugin.

## Requirements

- PHP **8.3+**
- WordPress **6.0+**
- Composer
- Node **20+** (for frontend)
