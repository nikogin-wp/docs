# Service Providers

Service providers are the central place to register services into the container. Every class your plugin needs — controllers, repositories, shortcodes, jobs — should be wired up through a provider.

## Creating a provider

```bash
php nikogin make:provider OrderServiceProvider
```

```php
// app/Providers/OrderServiceProvider.php
class OrderServiceProvider extends ServiceProvider
{
    public function priority(): int
    {
        return 10;
    }

    protected array $services = [
        OrderRepository::class,
        OrderController::class => [OrderRepository::class],
    ];
}
```

## Services array syntax

| Syntax | Behaviour |
|---|---|
| `MyClass::class` | Instantiated with no arguments |
| `MyClass::class => []` | Instantiated with no arguments (explicit) |
| `MyClass::class => [Dep::class]` | Instantiated with resolved dependency |
| `MyClass::class => [DepA::class, DepB::class]` | Multiple dependencies resolved in order |

## Priority

Lower numbers run first. Providers are sorted by `priority()` before `register()` is called.

```php
public function priority(): int
{
    return 5; // runs before priority 10
}
```

## Auto-discovery

`ProviderManager` scans `app/Providers/` (including subfolders) automatically — any concrete class that extends `Provider` is registered. You do not need to list providers anywhere.

After all providers have run, the plugin version (`Config::get('version')`) is stored in the `{slug}_version` option. Migration providers (`MProvider`) therefore run their migrations once per version bump, not on every request. If a provider throws, the version is not stored and migrations run again on the next request.

## How ServiceProvider works internally

```php
// ServiceProvider::register() resolves each entry:
Container::bind(MyClass::class, fn() => new MyClass(Container::get(Dep::class)));
Container::get(MyClass::class); // instantiates immediately
```

This means side-effects in the constructor (like `add_action`, `add_shortcode`) fire at `plugins_loaded` time.
