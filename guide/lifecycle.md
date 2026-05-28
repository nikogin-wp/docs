# Lifecycle

Understanding the boot order helps you know exactly when your code runs.

## Boot sequence

```
nikogin.php (WordPress loads the plugin)
  └── bootstrap/bootstrap.php
        ├── bootstrap/constants.php         // NIKOGIN_DIR, NIKOGIN_URL, etc.
        ├── Config::set(config/config.php)  // Seeds the framework config store
        └── Bootstrap::init()
              └── foreach config/app.php bootstraps as $class
                    └── $class::boot()
```

## Bootstrap classes

Each class in `config/app.php` implements `Bootable` — a single `static boot(): void` method that registers WordPress hooks.

```php
// config/app.php
return [
    'bootstraps' => [
        Activator::class,   // register_activation_hook
        Assets::class,      // wp_enqueue_scripts + admin_enqueue_scripts
        Router::class,      // rest_api_init → loads routes/
        Loader::class,      // plugins_loaded → runs providers & listeners
        Deactivator::class, // register_deactivation_hook
        Uninstaller::class, // register_uninstall_hook
    ],
];
```

## plugins_loaded — Loader

The `Loader` bootstrap fires on `plugins_loaded`. This is where the bulk of the plugin wires up:

```
plugins_loaded
  └── Loader::run()
        ├── ProviderManager::register()   // instantiates & calls every Provider
        └── ListenerManager::register()   // reads #[AsListener] attributes, registers hooks
```

## Hook timeline

| Hook | What runs |
|---|---|
| (immediate) | Constants defined, `Config::set()`, all `::boot()` calls |
| `register_activation_hook` | Activator |
| `rest_api_init` | Route files in `routes/` loaded |
| `plugins_loaded` | Providers instantiated, listeners registered |
| `admin_menu` | Dashboard controllers registered (from `DashboardController` constructor) |
| `wp_enqueue_scripts` / `admin_enqueue_scripts` | Assets enqueued |
