# make:migration

Generates a migration class for creating a custom database table.

## Signature

```bash
php nikogin make:migration {ClassName}
```

## Convention

Class names follow the `Create{TableName}Table` pattern. The table name is auto-derived by stripping `Create` and `Table`.

| Class name | Table name | Full table name   |
|---|---|-------------------|
| `CreateOrdersTable` | `orders` | `wp_ng_orders`    |
| `CreatePostMetaTable` | `post_meta` | `wp_ng_post_meta` |

## Example

```bash
php nikogin make:migration CreateOrdersTable
```

## Generated output

```php
class CreateOrdersTable extends Migration
{
    public function getTableName(): string
    {
        return 'orders';
    }

    public function getSchema(): string
    {
        $table = $this->getFullTableName();

        return "CREATE TABLE {$table} (
            id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        ) {$this->charsetCollate};";
    }
}
```

Add your columns to `getSchema()` and create the matching `Repository` with `--type=db`.
