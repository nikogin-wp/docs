# Directory Structure

```
my-plugin/
├── app/                        # All PHP application code
│   ├── Bootstrap.php           # Entry point — reads config/app.php and boots each class
│   ├── Bootstraps/             # Boot classes (Loader, Router, Assets, Activator…)
│   ├── Controllers/
│   │   ├── Api/                # REST API controllers
│   │   └── Dashboards/
│   │       ├── Menu/           # Top-level admin menu controllers
│   │       └── Submenu/        # Admin submenu controllers
│   ├── Jobs/                   # Background/deferred action jobs
│   ├── Listeners/
│   │   ├── Action/             # WordPress action listeners
│   │   └── Filter/             # WordPress filter listeners
│   ├── Managers/
│   │   ├── ListenerManager.php # Scans Listeners/ and registers them
│   │   └── ProviderManager.php # Scans Providers/ and registers them
│   ├── Migrations/             # Database schema definitions
│   ├── Providers/              # Service providers (wire up DI bindings)
│   ├── Repository/
│   │   ├── Db/                 # Custom DB table repositories
│   │   ├── Wp/                 # WordPress post-type repositories
│   │   └── Taxonomy/           # WordPress taxonomy repositories
│   └── Shortcodes/             # WordPress shortcodes
│
├── bootstrap/
│   ├── bootstrap.php           # Loads constants, sets Config, calls Bootstrap::init()
│   └── constants.php           # NIKOGIN_DIR, NIKOGIN_URL, NIKOGIN_SLUG, etc.
│
├── config/
│   ├── app.php                 # Bootstrap class list
│   └── config.php              # Framework config (namespace, slug, version, paths)
│
├── resources/
│   ├── ts/                     # TypeScript source files
│   ├── scss/                   # SCSS source files
│   └── {view}/                 # PHP view files loaded via View::load()
│
├── routes/
│   └── api.php                 # REST API route definitions
│
├── assets/                     # Compiled frontend output (git-ignored)
│   └── .vite/manifest.json
│
├── nikogin                     # CLI entry point
├── nikogin.php                 # WordPress plugin header
├── vite.config.js
├── tsconfig.json
└── package.json
```
