# Migrations

Migrations define custom database table schemas using WordPress's `dbDelta()` function, which safely creates or updates tables.

## Creating a migration

```bash
php nikogin make:migration CreateOrdersTable
```

The class name follows the convention `Create{TableName}Table`. The table name is derived automatically.

```php
// app/Migrations/CreateOrdersTable.php
class CreateOrdersTable extends Migration
{
    public function getTableName(): string
    {
        return 'orders'; // → wp_ng_orders (with prefix)
    }

    public function getSchema(): string
    {
        $table = $this->getFullTableName();

        return "CREATE TABLE {$table} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id BIGINT(20) UNSIGNED NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'pending',
            total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id)
        ) {$this->charsetCollate};";
    }
}
```

## Table naming

| What | Example        |
|---|----------------|
| `getTableName()` returns | `orders`       |
| Migration prefix | `ng_`          |
| `$wpdb->prefix` | `wp_`          |
| Final table name | `wp_ng_orders` |

The `ng_` prefix is defined in `Migration::$prefix`. Override it per migration if needed.

## Running migrations

The recommended place to run migrations is the `AdminInitListener` (fires on every admin page load — `dbDelta` is idempotent):

```php
#[AsListener(name: 'admin_init', type: 'action')]
class AdminInitListener extends Listener
{
    public function handle(mixed ...$args): mixed
    {
        (new CreateOrdersTable())->up();
        return null;
    }
}
```

Or run on activation:

```php
class Activator implements Bootable
{
    public static function boot(): void
    {
        register_activation_hook(NIKOGIN_FILE, [self::class, 'run']);
    }

    public static function run(): void
    {
        (new CreateOrdersTable())->up();
    }
}
```

## Dropping a table

```php
(new CreateOrdersTable())->down(); // DROP TABLE IF EXISTS wp_ng_orders
```

## Using with Repository

Use the same table name (with the `ng_` prefix) in your repository:

```php
class OrderRepository extends Repository
{
    public function __construct()
    {
        parent::__construct('ng_orders'); // matches getFullTableName()
    }
}
```
