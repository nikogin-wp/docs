# make:module

Scaffolds a self-contained [module](/essentials/modules) folder under `app/Modules/`.

## Signature

```bash
php nikogin make:module {ModuleName}
```

## Example

```bash
php nikogin make:module Crm
```

## Generated output

```
app/Modules/Crm/
├── Controllers/.gitkeep
├── Repository/.gitkeep
├── Listeners/.gitkeep
├── Providers/
│   └── CrmServiceProvider.php
└── routes/
    └── routes.php
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

    protected array $services = [];

    public function boot(): void
    {
    }
}
```

```php
// app/Modules/Crm/routes/routes.php
<?php

// Routes for the crm module.
```

## Naming

- Folder name (`app/Modules/{ModuleName}`) uses the class name exactly as typed — `Crm` stays `Crm`.
- The `#[AsModule(name: ...)]` value is the snake_case of the class name (same conversion `make:listener` uses for its hook name) — `Crm` → `crm`, `BigFeature` → `big_feature`. This is the key you use in `config/modules.php` to enable/disable the module, so it doesn't have to match the folder name if you rename one later.

## Next steps

1. Add services to `$services` — see [Service Providers](/essentials/service-providers) for the full syntax.
2. Add routes to `routes/routes.php` — see [Routing](/essentials/routing).
3. Add controllers/repositories/listeners into the module's own subfolders; wire them through `$services` like you would in `app/Providers/`.

## Error handling

```bash
# Missing class name
Error: Class name is required. Usage: make:module {ModuleName}

# Module already exists — never overwritten
Error: Module already exists: app/Modules/Crm
```
