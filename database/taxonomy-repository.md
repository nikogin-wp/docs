# Taxonomy Repository

`TaxonomyRepository` wraps WordPress taxonomy functions for a specific taxonomy.

## Creating a repository

```bash
php nikogin make:repository CategoryRepository --type=taxonomy
```

```php
// app/Repository/Taxonomy/CategoryRepository.php
class CategoryRepository extends TaxonomyRepository
{
    public function __construct()
    {
        parent::__construct('category'); // or 'post_tag', 'product_cat', etc.
    }
}
```

## Available methods

### getAll

```php
$terms = $repository->getAll();                         // all terms
$terms = $repository->getAll(['hide_empty' => true]);   // with overrides
// Returns WP_Term[]|WP_Error
```

### getById / getBySlug / getByName

```php
$term = $repository->getById(5);
$term = $repository->getBySlug('uncategorized');
$term = $repository->getByName('Uncategorized');
```

### getChildren

```php
$children = $repository->getChildren(5); // WP_Term[]|WP_Error
```

### create / update / delete

```php
$result = $repository->create('New Category', ['slug' => 'new-cat']);
$result = $repository->update(5, ['name' => 'Renamed']);
$result = $repository->delete(5);
```

### count

```php
$total = $repository->count(); // int
```

### Post relationships

```php
// Get terms attached to a post
$terms = $repository->getForPost(42);

// Append terms to a post (keeps existing)
$repository->attachToPost(42, [5, 6]);

// Replace all terms on a post
$repository->syncToPost(42, [7]);

// Remove specific terms from a post
$repository->detachFromPost(42, [5]);
```
