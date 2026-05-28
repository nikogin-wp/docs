# make:shortcode

Generates a shortcode class that registers a WordPress shortcode tag.

## Signature

```bash
php nikogin make:shortcode {ClassName} [--name={tag}]
```

## Example

```bash
php nikogin make:shortcode ProductListShortcode
php nikogin make:shortcode ProductListShortcode --name=products
```

## Tag name derivation

Strips the `Shortcode` suffix and converts to `snake_case`:

| Class name | Auto tag |
|---|---|
| `GalleryShortcode` | `gallery` |
| `ProductListShortcode` | `product_list` |
| `ContactFormShortcode` | `contact_form` |

## Generated output

```php
class GalleryShortcode extends Shortcode
{
    public function __construct()
    {
        parent::__construct('gallery');
    }

    public function handle(array $attrs = [], string $content = null): mixed
    {
        return '';
    }
}
```

## Usage in WordPress content

```
[gallery]
[product_list limit="5"]
```
