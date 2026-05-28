# Routing

Routes are defined in PHP files inside the `routes/` directory and loaded on the `rest_api_init` hook via `View::loadDir()`.

## Defining a route

```php
// routes/api.php
use Nikogin\Framework\Support\Router;
use Nikogin\Framework\Support\Container;
use WP_REST_Server;

Router::add('/articles', [
    'methods'             => WP_REST_Server::READABLE,
    'callback'            => [Container::get(ArticleController::class), 'index'],
    'permission_callback' => '__return_true',
]);
```

The namespace (e.g. `ng/v1`) is read from `Config::get('namespace')` automatically.

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
    public function verify(\WP_REST_Request $request): bool|\WP_Error
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
