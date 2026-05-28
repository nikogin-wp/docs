# make:provider

Generates a service provider class that extends `ServiceProvider`.

## Signature

```bash
php nikogin make:provider {ClassName}
```

## Example

```bash
php nikogin make:provider OrderServiceProvider
```

## Generated output

```php
class OrderServiceProvider extends ServiceProvider
{
    public function priority(): int
    {
        return 10;
    }

    protected array $services = [];
}
```

## Next steps

1. Add your services to `$services`
2. The provider is auto-discovered from `app/Providers/` — no registration required

```php
protected array $services = [
    OrderRepository::class,
    OrderController::class   => [OrderRepository::class],
    OrderShortcode::class    => [OrderRepository::class],
    ProcessOrderJob::class,
];
```

See [Service Providers](/essentials/service-providers) for the full `$services` syntax reference.
