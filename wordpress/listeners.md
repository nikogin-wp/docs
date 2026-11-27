# Listeners

Listeners are classes that respond to WordPress actions and filters. Instead of calling `add_action()` and `add_filter()` manually, you decorate your class with the `#[AsListener]` PHP attribute.

## Creating a listener

```bash
php nikogin make:listener SavePostListener --type=action --name=save_post
php nikogin make:listener TheContentListener --type=filter --name=the_content
```

## Action listener

```php
// app/Listeners/Action/SavePostListener.php
#[AsListener(name: 'save_post', type: 'action')]
class SavePostListener extends Listener
{
    public function handle(mixed ...$args): mixed
    {
        $postId = $args[0];
        // do something when a post is saved
        return null;
    }
}
```

## Filter listener

```php
// app/Listeners/Filter/TheContentListener.php
#[AsListener(name: 'the_content', type: 'filter')]
class TheContentListener extends Listener
{
    public function handle(mixed ...$args): mixed
    {
        $content = $args[0] ?? '';
        return $content . '<p>Appended by Nikogin.</p>';
    }
}
```

## #[AsListener] parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `name` | string | required | The WordPress hook name |
| `type` | string | required | `'action'` or `'filter'` |
| `priority` | int | `10` | Hook priority |
| `argsCount` | int | `1` | Number of arguments passed to handle() |

```php
#[AsListener(name: 'save_post', type: 'action', priority: 20, argsCount: 3)]
```

## Auto-discovery

`ListenerManager` recursively scans the whole `app/` directory — any concrete class that extends `Listener` and has the `#[AsListener]` attribute is registered automatically, no matter which folder it lives in. No manual registration needed.

```
app/
├── Listeners/
│   ├── Action/        ← scanned
│   └── Filter/        ← scanned
├── Services/Billing/  ← scanned too
└── Modules/Crm/       ← scanned only while the module is enabled
```

Only files that look like PSR-4 classes are loaded: lowercase folders (such as a module's `routes/`) and plain scripts are never included, and only files that mention `AsListener` are autoloaded.

::: warning
The `handle()` method receives arguments via variadic spread (`...$args`). Access them by index: `$args[0]`, `$args[1]`, etc.
:::
