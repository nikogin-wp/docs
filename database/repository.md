# DB Repository

`Repository` is the base class for interacting with custom database tables. It wraps `$wpdb` and provides common CRUD operations.

## Creating a repository

```bash
php nikogin make:repository OrderRepository --type=db
```

```php
// app/Repository/Db/OrderRepository.php
class OrderRepository extends Repository
{
    public function __construct()
    {
        parent::__construct('ng_orders'); // table: {wpdb->prefix}ng_orders
    }
}
```

## Available methods

### insert

```php
$id = $repository->insert([
    'title'  => 'My Order',
    'status' => 'pending',
]);
// Returns int (new ID) or false on failure
```

### update

```php
$repository->update(
    ['status' => 'completed'],  // data
    ['id' => 42]                // where
);
```

### delete

```php
$repository->delete('id = %d', [42]);
```

### getAll

```php
$rows = $repository->getAll();             // all rows
$rows = $repository->getAll('created_at DESC'); // with ORDER BY
```

### getAllWhere

```php
$rows = $repository->getAllWhere(
    ['status' => 'published'],         // WHERE conditions
    ['id', 'title', 'status']          // SELECT columns (null = *)
);

// LIKE operator
$rows = $repository->getAllWhere(['title LIKE' => '%foo%']);
```

### getOne

```php
$row = $repository->getOne(['id' => 42]);
// Returns stdClass|null
```

### paginateWhere

```php
$result = $repository->paginateWhere(
    page: 1,
    perPage: 10,
    where: ['status' => 'published'],
    searchColumn: 'title',
    searchTerm: 'foo',
    orderBy: 'created_at DESC'
);

// $result['data']         — array of rows
// $result['total']        — total matching rows
// $result['total_pages']  — number of pages
// $result['current_page'] — current page
```

## Table naming

The constructor argument is appended to `$wpdb->prefix`:

```php
parent::__construct('ng_orders');
// → wp_ng_orders
```

::: tip
Use the same prefix convention as your `Migration` — both `Migration::getFullTableName()` and `Repository` prepend `$wpdb->prefix`, so pass `tc_orders` (not `orders`) to both.
:::
