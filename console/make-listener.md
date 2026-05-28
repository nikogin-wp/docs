# make:listener

Generates a listener class decorated with `#[AsListener]`.

## Signature

```bash
php nikogin make:listener {ClassName} --type={action|filter} [--name={hook}]
```

## Types

| `--type` | Registers as | Output path |
|---|---|---|
| `action` | `add_action()` | `app/Listeners/Action/` |
| `filter` | `add_filter()` | `app/Listeners/Filter/` |

## Examples

```bash
# Action listener — hook auto-derived from class name
php nikogin make:listener SavePostListener --type=action

# Filter listener — explicit hook name
php nikogin make:listener TheContentListener --type=filter --name=the_content
```

## Hook name derivation

If `--name` is omitted, the hook name is derived from the class name by stripping the `Listener` suffix and converting to `snake_case`:

| Class name | Auto-derived hook |
|---|---|
| `SavePostListener` | `save_post` |
| `AdminInitListener` | `admin_init` |
| `TheContentListener` | `the_content` |

## Generated output

```php
#[AsListener(name: 'save_post', type: 'action')]
class SavePostListener extends Listener
{
    public function handle(mixed ...$args): mixed
    {
        //
    }
}
```
