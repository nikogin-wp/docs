# WP Repository

`WpRepository` wraps WordPress post functions for a specific custom post type. Use it whenever your data is stored as WordPress posts.

## Creating a repository

```bash
php nikogin make:repository ProductRepository --type=wp
```

```php
// app/Repository/Wp/ProductRepository.php
class ProductRepository extends WpRepository
{
    public function __construct()
    {
        parent::__construct('product'); // post type slug
    }
}
```

## Available methods

### insert

```php
$postId = $repository->insert([
    'post_title'   => 'New Product',
    'post_content' => 'Description here.',
    'post_status'  => 'publish',
]);
```

### update

```php
$repository->update(42, [
    'post_title' => 'Updated Title',
]);
```

### delete

```php
$repository->delete(42); // wp_delete_post, force = true
```

### getOne

```php
$post = $repository->getOne(42); // WP_Post|null
```

### getAll

```php
$query = $repository->getAll();                         // WP_Query, all published
$query = $repository->getAll(['posts_per_page' => 5]);  // with overrides
$query = $repository->getAll(['language' => 'en']);     // WPML support
```

### findByTitle / findBySlug

```php
$post = $repository->findByTitle('Hello World');
$post = $repository->findBySlug('hello-world');
```

### findByMetaFields

```php
$posts = $repository->findByMetaFields([
    'featured' => '1',
    'color'    => 'blue',
]);
```

### filter

```php
$query = $repository->filter([
    'per_page' => 10,
    'page'     => 2,
    'search'   => 'keyword',
    'meta'     => [['key' => 'featured', 'value' => '1']],
    'tax'      => [['taxonomy' => 'product_cat', 'terms' => [5]]],
]);
```
