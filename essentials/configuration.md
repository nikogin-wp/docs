# Configuration

## Config store

The framework provides a central, static key-value store via `Config`. It is seeded once during bootstrap from `config/config.php` before anything else runs.

```php
// bootstrap/bootstrap.php
Config::set(require NIKOGIN_CONFIG_DIR . 'config.php');
```

## config/config.php

```php
return [
    'namespace'      => NIKOGIN_NAMESPACE,   // REST API namespace  e.g. 'ng/v1'
    'slug'           => NIKOGIN_SLUG,        // Plugin slug         e.g. 'nikogin'
    'version'        => NIKOGIN_VERSION,     // Plugin version      e.g. '1.0.0'
    'prefix'         => NIKOGIN_PREFIX,      // DB table prefix     e.g. 'ng'
    'resources_path' => NIKOGIN_DIR . 'resources',
    'build_path'     => NIKOGIN_DIR . 'build',
    'build_url'      => NIKOGIN_URL . 'build',
];
```

## Reading values

```php
use Nikogin\Framework\Support\Config;

$version   = Config::get('version');
$namespace = Config::get('namespace');
$custom    = Config::get('my_key', 'default_value');
```

## Adding custom keys

Add any key to `config/config.php`. It will be available anywhere via `Config::get()`.

```php
return [
    // ...existing keys...
    'api_key' => defined('MY_API_KEY') ? MY_API_KEY : '',
];
```

## Reserved keys

| Key | Used by |
|---|---|
| `namespace` | `Router` — REST API namespace |
| `slug` | `Updater` — DB version option key |
| `version` | `Updater`, `Assets` — version string |
| `resources_path` | `View` — base path for dot-notation views |
| `build_path` | `Assets` — path to Vite manifest |
| `build_url` | `Assets` — base URL for compiled assets |
