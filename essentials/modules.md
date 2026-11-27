# Modules

Modules are an **optional, additive** way to group a feature into a self-contained folder instead of spreading it across `app/Controllers`, `app/Repository`, `app/Providers`, etc. They're for in-house plugins that grow large enough that a flat `app/` structure stops telling you which files belong to which feature (e.g. CRM + Reporting + Booking in one plugin).

If you don't create an `app/Modules/` folder, none of this applies — the framework boots exactly as it did before modules existed.

## Directory shape

A module is a sibling of `app/Controllers`, `app/Repository`, etc. — not a replacement for them:

```
app/
├── Controllers/                 # unaffected, keeps working as-is
├── Repository/                  # unaffected, keeps working as-is
├── Providers/                   # unaffected, keeps working as-is
└── Modules/
    └── Crm/
        ├── Controllers/
        ├── Repository/
        ├── Listeners/
        ├── Providers/
        │   └── CrmServiceProvider.php
        └── routes/
            └── routes.php
```

## Creating a module

```bash
php nikogin make:module Crm
```

```php
// app/Modules/Crm/Providers/CrmServiceProvider.php
namespace Nikogin\Modules\Crm\Providers;

use Nikogin\Framework\Abstracts\ServiceProvider;
use Nikogin\Framework\Attributes\AsModule;

#[AsModule(name: 'crm')]
class CrmServiceProvider extends ServiceProvider
{
    public function priority(): int
    {
        return 10;
    }

    protected array $services = [
        ContactRepository::class,
    ];

    public function boot(): void
    {
    }
}
```

`#[AsModule]` is what tells `ModuleManager` this ServiceProvider belongs to a module and gives it a name (used for the enable/disable lookup below):

```php
#[Attribute(Attribute::TARGET_CLASS)]
class AsModule
{
    public function __construct(
        public string $name,
        public bool $enabled = true,
    ) {}
}
```

A ServiceProvider inside a module with no `#[AsModule]` attribute is silently skipped — it's never registered, booted, or treated as an error.

## Auto-discovery

`ModuleManager` recursively scans each `app/Modules/{Module}/` folder for a `ServiceProvider` carrying `#[AsModule]` — `Providers/CrmServiceProvider.php` is the convention `make:module` uses, but the class can live anywhere inside the module. Nothing needs to be registered by hand.

Listeners inside an enabled module (e.g. `app/Modules/Crm/Listeners/`) are discovered by `ListenerManager` too. A disabled module's listeners are skipped, together with its routes. It runs from `app/Bootstraps/Loader.php`, immediately after the regular `ProviderManager`:

```php
(new ProviderManager())->register();
(new ModuleManager())->register();
(new ListenerManager())->register();
```

If `app/Modules/` doesn't exist, `ModuleManager` no-ops — no errors, no warnings.

## `register()` and `boot()`

Both are called on an enabled module's ServiceProvider, in order:

1. `register()` — inherited from `ServiceProvider`, binds `$services` into the `Container` (same as any other provider)
2. `boot()` — new lifecycle hook, empty by default, meant for setup that needs services already bound

`boot()` is defined on the base `ServiceProvider` class as a no-op, so it's opt-in and doesn't affect existing non-module providers.

## Routes

A module's `routes/routes.php` is loaded the same way the root `routes/` folder is — via `View::loadDir()` on `rest_api_init` — from `app/Bootstraps/Router.php`:

```php
public static function run(): void
{
    View::loadDir(NIKOGIN_DIR . 'routes');

    foreach ((new ModuleManager())->enabledRouteDirs() as $routesDir) {
        View::loadDir($routesDir);
    }
}
```

Only **enabled** modules' route files are loaded. Write routes exactly like you would in `routes/api.php` — see [Routing](/essentials/routing).

## Enabling / disabling a module

Add an entry to `config/modules.php`, keyed by the module's `#[AsModule]` name (not the folder name, though `make:module` sets them to match by default):

```php
// config/modules.php
return [
    'modules' => [
        'crm' => false, // disable a module without deleting it
    ],
];
```

Resolution order:

1. An entry under `modules` in `config/modules.php` wins. `true`/`false` and boolean-like strings (`'false'`, `'0'`, `'off'`, ...) are accepted; any other value is ignored
2. Otherwise, the `enabled` value on `#[AsModule]` is used (defaults to `true`)

::: tip Upgrading
The old flat format (`return ['crm' => false];`) still works, but only for real booleans. A module named after another config key such as `slug` or `namespace` is no longer switched on by that key's value.
:::

A disabled module's ServiceProvider is never registered or booted, and its `routes/routes.php` is never loaded.

## What modules don't do

- They don't change how `app/Controllers`, `app/Repository`, `app/Managers`, `app/Providers` work — those are untouched.
- There's no wp-admin UI for toggling modules — `config/modules.php` only.
- `make:module` never overwrites an existing module folder — it fails with a clear error instead.
