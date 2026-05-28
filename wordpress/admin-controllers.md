# Admin Controllers

Admin controllers register WordPress admin menu pages. They hook into `admin_menu` in their constructor automatically.

## Menu controller (top-level page)

```bash
php nikogin make:controller SettingsController --type=menu
```

```php
// app/Controllers/Dashboards/Menu/SettingsController.php
class SettingsController extends MenuController
{
    protected string $menuSlug   = 'my-plugin-settings';
    protected string $pageTitle  = 'Settings';
    protected string $menuTitle  = 'Settings';
    protected string $capability = 'manage_options';
    protected string $view       = 'settings';
    protected string $dashIcon   = 'dashicons-admin-settings';

    public function processForm(): void
    {
        $this->handle('save_settings', function () {
            update_option('my_setting', sanitize_text_field($_POST['my_setting'] ?? ''));
        });
    }

    public function view(): void
    {
        View::load('settings.index', ['pageTitle' => $this->pageTitle]);
    }
}
```

## Submenu controller

```bash
php nikogin make:controller LogsController --type=submenu --parent=my-plugin-settings
```

```php
// app/Controllers/Dashboards/Submenu/LogsController.php
class LogsController extends SubmenuController
{
    protected string $parentSlug = 'my-plugin-settings'; // slug of parent menu
    protected string $menuSlug   = 'my-plugin-logs';
    protected string $pageTitle  = 'Logs';
    protected string $menuTitle  = 'Logs';
    protected string $capability = 'manage_options';
    protected string $view       = 'logs';

    public function processForm(): void {}

    public function view(): void
    {
        View::load('logs.index');
    }
}
```

## Properties reference

| Property | Description |
|---|---|
| `$menuSlug` | Unique slug for this page |
| `$pageTitle` | `<title>` tag content |
| `$menuTitle` | Label shown in the WP menu |
| `$capability` | Required WordPress capability |
| `$view` | Identifier (informational only) |
| `$dashIcon` | Dashicons class — menu only |
| `$parentSlug` | Parent menu slug — submenu only |

## Registering controllers

Dashboard controllers call `add_action('admin_menu', ...)` in their constructor. They must be instantiated via a `ServiceProvider`:

```php
protected array $services = [
    OrderRepository::class,
    SettingsController::class => [OrderRepository::class],
    LogsController::class     => [OrderRepository::class],
];
```

## Form handling

The `processForm()` method is called when `$_SERVER['REQUEST_METHOD'] === 'POST'`. Use the inherited `handle()` helper to scope processing to a specific submit button:

```php
public function processForm(): void
{
    $this->handle('save', function () {
        // only runs when $_POST['save'] is set
        update_option('key', sanitize_text_field($_POST['key']));
    });
}
```
