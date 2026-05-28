# Views

The `View` class loads PHP files from the `resources/` directory using dot notation. Variables are injected into the file's local scope via `extract()`.

## Loading a view

```php
View::load('settings.index', [
    'pageTitle' => 'Settings',
    'options'   => get_option('my_options', []),
]);
```

`'settings.index'` resolves to `resources/settings/index.php`.

## Dot notation

```
'example'              → resources/example.php
'settings.index'       → resources/settings/index.php
'admin.users.list'     → resources/admin/users/list.php
```

## Creating a view file

```php
<?php
/** @var string $pageTitle */
/** @var array  $options  */
?>
<div class="wrap">
    <h1><?= esc_html($pageTitle) ?></h1>
    <form method="post">
        <!-- form fields -->
    </form>
</div>
```

::: tip
The `/** @var */` docblock at the top declares the variables your IDE can auto-complete. It has no runtime effect.
:::

## Base path configuration

The base path is read from `Config::get('resources_path')`, which is set in `config/config.php`:

```php
'resources_path' => NIKOGIN_DIR . 'resources',
```

You can override it at runtime:

```php
View::setBasePath('/custom/path/to/views');
```

## Passing data from a controller

```php
class SettingsController extends MenuController
{
    public function view(): void
    {
        View::load('settings.index', [
            'pageTitle' => $this->pageTitle,
            'saved'     => get_option('my_option'),
        ]);
    }
}
```
