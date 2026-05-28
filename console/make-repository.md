# make:repository

Generates a repository class that extends one of the three repository abstractions.

## Signature

```bash
php nikogin make:repository {ClassName} --type={db|wp|taxonomy}
```

## Types

| `--type` | Extends | Output path |
|---|---|---|
| `db` | `Repository` | `app/Repository/Db/` |
| `wp` | `WpRepository` | `app/Repository/Wp/` |
| `taxonomy` | `TaxonomyRepository` | `app/Repository/Taxonomy/` |

## Examples

```bash
# Custom DB table repository
php nikogin make:repository OrderRepository --type=db

# WordPress post-type repository
php nikogin make:repository ProductRepository --type=wp

# WordPress taxonomy repository
php nikogin make:repository TagRepository --type=taxonomy
```

## Generated output (db)

```php
namespace Nikogin\Repository\Db;

use Nikogin\Framework\Abstracts\Repository;

class OrderRepository extends Repository
{
    public function __construct()
    {
        parent::__construct('order'); // auto-derived from class name
    }
}
```

::: tip
The constructor argument is auto-derived by stripping the `Repository` suffix and converting to `snake_case`. Update it to match your actual table name (including the `tc_` prefix if using Migration).
:::
