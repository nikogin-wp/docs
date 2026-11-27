# Routing

Routes are defined in PHP files inside the `routes/` directory and loaded on the `rest_api_init` hook via `View::loadDir()`.

## Defining a route

```php
// routes/api.php
use Nikogin\Framework\Support\Router;
use Nikogin\Framework\Support\Container;

Router::add('/articles', [
    'methods'             => \WP_REST_Server::READABLE,
    'callback'            => [Container::get(ArticleController::class), 'index'],
    'permission_callback' => '__return_true',
]);
```

The namespace (e.g. `ng/v1`) is read from `Config::get('namespace')` automatically.

## Route options

The second argument mirrors `register_rest_route()` and is typed as a PHPStan array shape (`RouteArgs`), so IDEs and static analysis can autocomplete and check it:

| Key | Type | Notes |
|---|---|---|
| `methods` | `string\|list<string>` | e.g. `WP_REST_Server::READABLE` |
| `callback` | `callable` | **required** |
| `permission_callback` | `callable` | defaults to `__return_true` |
| `args` | `array<string, RouteArgSchema>` | `default`, `required`, `type`, `enum`, `validate_callback`, `sanitize_callback`, ... |
| `show_in_index` | `bool` | |
| `allow_batch` | `array{v1?: bool}` | |
| `schema` | `callable` | |

`Router::add()` throws an `InvalidArgumentException` when `callback` (or a given `permission_callback`) isn't callable, so typos fail at registration rather than on the first request.

Several endpoints can share one path by passing a list (route-level keys such as `schema` can sit next to them):

```php
Router::add('/articles', [
    ['methods' => \WP_REST_Server::READABLE,  'callback' => [$controller, 'index']],
    ['methods' => \WP_REST_Server::CREATABLE, 'callback' => [$controller, 'store'], 'permission_callback' => 'is_user_logged_in'],
]);
```

## HTTP methods

```php
WP_REST_Server::READABLE   // GET
WP_REST_Server::CREATABLE  // POST
WP_REST_Server::EDITABLE   // PUT / PATCH
WP_REST_Server::DELETABLE  // DELETE
```

## Route groups

```php
Router::group('/v2', function () {
    Router::add('/articles', [...]);
    Router::add('/users', [...]);
});
```

## Resource routes

Registers `index`, `show`, `store`, `update`, `destroy` in one call:

```php
Router::resource('/articles', ArticleController::class);
```

| Method | Endpoint | Controller method |
|---|---|---|
| GET | `/articles` | `index` |
| GET | `/articles/{id}` | `show` |
| POST | `/articles` | `store` |
| PUT/PATCH | `/articles/{id}` | `update` |
| DELETE | `/articles/{id}` | `destroy` |

`index` and `show` are public. If the controller defines `storePermission()`, `updatePermission()` or `destroyPermission()`, that method is the endpoint's permission callback. Without it, the write endpoint requires the `manage_options` capability (`Router::canManage()`), so it is never public by default.

## Middleware / permissions

```php
Router::middleware(AuthMiddleware::class, '/articles', [
    'methods'  => WP_REST_Server::CREATABLE,
    'callback' => [Container::get(ArticleController::class), 'store'],
]);
```

`AuthMiddleware` must implement the `Middleware` contract:

```php
class AuthMiddleware implements Middleware
{
    public static function verify(\WP_REST_Request $request): bool|\WP_Error
    {
        return is_user_logged_in() ?: new \WP_Error('unauthorized', 'Login required.', ['status' => 401]);
    }
}
```

## Multiple route files

Every `*.php` file in `routes/` is loaded automatically. Split routes by domain:

```
routes/
├── api.php
└── admin.php
```
