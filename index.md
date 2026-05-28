---
layout: home

hero:
  name: Nikogin
  text: WordPress Plugin Framework
  tagline: Build structured, maintainable WordPress plugins with a Laravel-inspired architecture.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: View on GitHub
      link: https://github.com/nikogin-wp

features:
  - title: Service Container
    details: Lightweight dependency injection container. Bind services once, resolve them anywhere.
  - title: Repository Pattern
    details: Three repository types — custom DB tables, WordPress post types, and taxonomies — all with a consistent API.
  - title: Listeners
    details: Replace add_action() and add_filter() calls with PHP 8 attributes. Decorate any class with [AsListener(name, type, priority)] and the ListenerManager auto-discovers and registers it on plugins_loaded — zero manual registration.
  - title: Controllers
    details: Three controller types in one framework. ApiController handles REST endpoints with built-in success/failed response helpers. MenuController and SubmenuController scaffold WordPress admin pages — all properties pre-filled from the class name.
  - title: Vite + TypeScript + SCSS
    details: First-class frontend tooling. Separate TS and SCSS entries compiled via Vite with a manifest-based asset loader.
  - title: Console Commands
    details: Scaffold any class from the command line — repositories, listeners, controllers, migrations, jobs, shortcodes, and providers.
---
