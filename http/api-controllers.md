# API Controllers

API controllers extend `ApiController` and handle WordPress REST API requests. They provide `success()` and `failed()` response helpers.

## Creating a controller

```bash
php nikogin make:controller ArticleController --type=api
```

```php
// app/Controllers/Api/ArticleController.php
class ArticleController extends ApiController
{
    public function __construct(private ArticleRepository $repository) {}

    public function index(): WP_REST_Response
    {
        return $this->success($this->repository->getAll());
    }

    public function show(WP_REST_Request $request): WP_REST_Response
    {
        $article = $this->repository->getOne(['id' => $request->get_param('id')]);

        if (!$article) {
            return $this->failed('Article not found.', 404);
        }

        return $this->success($article);
    }

    public function store(WP_REST_Request $request): WP_REST_Response
    {
        $id = $this->repository->insert([
            'title'   => sanitize_text_field($request->get_param('title')),
            'content' => wp_kses_post($request->get_param('content') ?? ''),
            'status'  => 'published',
        ]);

        return $id
            ? $this->success(['id' => $id], 'Created.', 201)
            : $this->failed('Could not create article.');
    }
}
```

## Response helpers

### success

```php
$this->success($data, 'Message.', 200);
// {"success": true, "message": "Message.", "data": {...}}
```

### failed

```php
$this->failed('Something went wrong.', 400, ['field' => 'required']);
// {"success": false, "message": "...", "errors": {...}}
```

## Registering in a route

```php
Router::add('/articles', [
    'methods'  => WP_REST_Server::READABLE,
    'callback' => [Container::get(ArticleController::class), 'index'],
]);
```

Or use `Router::resource()` to register all CRUD routes at once:

```php
Router::resource('/articles', ArticleController::class);
```
