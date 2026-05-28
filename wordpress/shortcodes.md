# Shortcodes

Shortcodes extend the `Shortcode` abstract class. The shortcode tag is registered in the constructor via `add_shortcode()`.

## Creating a shortcode

```bash
php nikogin make:shortcode ProductListShortcode
```

The tag is auto-derived: `ProductListShortcode` → `product_list`. Override with `--name`:

```bash
php nikogin make:shortcode ProductListShortcode --name=products
```

```php
// app/Shortcodes/ProductListShortcode.php
class ProductListShortcode extends Shortcode
{
    public function __construct(private ProductRepository $repository)
    {
        parent::__construct('product_list');
    }

    public function handle(array $attrs = [], string $content = null): mixed
    {
        $attrs = shortcode_atts(['limit' => 10], $attrs);
        $posts = $this->repository->getAll(['posts_per_page' => (int) $attrs['limit']]);

        $html = '<ul class="products">';
        foreach ($posts->posts as $post) {
            $html .= '<li>' . esc_html($post->post_title) . '</li>';
        }
        return $html . '</ul>';
    }
}
```

## Usage in content

```
[product_list limit="5"]
```

## Registering shortcodes

Shortcodes must be instantiated to call `add_shortcode()`. Wire them up in a `ServiceProvider`:

```php
protected array $services = [
    ProductRepository::class,
    ProductListShortcode::class => [ProductRepository::class],
];
```

::: tip
The `handle()` method must **return** a string — never `echo`. WordPress replaces the shortcode tag with the return value.
:::
