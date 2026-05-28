# Container

The service container is a lightweight static registry that binds class resolvers and resolves them on demand.

## Binding a service

```php
use Nikogin\Framework\Support\Container;

Container::bind(MyService::class, fn() => new MyService());
```

## Resolving a service

```php
$service = Container::get(MyService::class);
```

If the key has not been bound, `Container::get()` throws an `Exception`.

## Binding with dependencies

```php
Container::bind(OrderController::class, function () {
    return new OrderController(
        Container::get(OrderRepository::class)
    );
});
```

## Typical usage — route files

Controllers are already bound by their `ServiceProvider`. In route files you resolve them directly:

```php
// routes/api.php
Router::add('/orders', [
    'methods'  => WP_REST_Server::READABLE,
    'callback' => [Container::get(OrderController::class), 'index'],
]);
```

## Typical usage — inside a provider

You rarely call `Container::bind()` directly. The `ServiceProvider` `$services` array handles it for you. Use `Container::get()` when you need to resolve a service in a context where DI is not available (route files, view files).
