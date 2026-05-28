# make:controller

Generates a controller class for the REST API or WordPress admin.

## Signature

```bash
php nikogin make:controller {ClassName} --type={api|menu|submenu} [--parent={slug}]
```

## Types

| `--type` | Extends | Output path |
|---|---|---|
| `api` | `ApiController` | `app/Controllers/Api/` |
| `menu` | `MenuController` | `app/Controllers/Dashboards/Menu/` |
| `submenu` | `SubmenuController` | `app/Controllers/Dashboards/Submenu/` |

## Examples

```bash
# REST API controller
php nikogin make:controller ArticleController --type=api

# Admin top-level menu page
php nikogin make:controller SettingsController --type=menu

# Admin submenu page (under Settings)
php nikogin make:controller LogsController --type=submenu --parent=my-plugin-settings
```

## Generated output (menu)

```php
class SettingsController extends MenuController
{
    protected string $menuSlug   = 'settings';        // auto-derived
    protected string $pageTitle  = 'Settings';         // auto-derived
    protected string $menuTitle  = 'Settings';
    protected string $capability = 'manage_options';
    protected string $view       = 'settings';
    protected string $dashIcon   = 'dashicons-admin-generic';

    public function processForm(): void { }

    public function view(): void
    {
        echo '<div class="wrap"><h1>' . esc_html($this->pageTitle) . '</h1></div>';
    }
}
```

::: tip
For submenu controllers, use `--parent` to set `$parentSlug` to the `$menuSlug` of the parent menu controller. If omitted, `$parentSlug` defaults to an empty string.
:::
