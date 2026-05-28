# Available Commands

The `nikogin` CLI is available at the root of your plugin. All commands follow the `make:*` convention and scaffold classes from stubs.

## Running commands

```bash
# Using Lando
lando php wp-content/plugins/my-plugin/nikogin make:{command} {ClassName} [options]
```

## All commands

| Command | Generates | Output path |
|---|---|---|
| `make:repository` | Repository class | `app/Repository/{Type}/{Name}.php` |
| `make:listener` | Listener class | `app/Listeners/{Type}/{Name}.php` |
| `make:controller` | Controller class | `app/Controllers/{Type}/{Name}.php` |
| `make:migration` | Migration class | `app/Migrations/{Name}.php` |
| `make:job` | Job class | `app/Jobs/{Name}.php` |
| `make:shortcode` | Shortcode class | `app/Shortcodes/{Name}.php` |
| `make:provider` | Service provider | `app/Providers/{Name}.php` |

## Common options

| Option | Commands | Description |
|---|---|---|
| `--type` | repository, listener, controller | Determines parent class and output subdirectory |
| `--name` | listener, shortcode, job | Sets the hook/tag/shortcode name (auto-derived if omitted) |
| `--parent` | controller (submenu) | Sets the parent menu slug |

## Error handling

```bash
# Missing class name
Error: Class name is required.

# Missing --type
Error: --type is required. Available types: db, wp, taxonomy

# Unknown type
Error: Unknown type "custom". Available: db, wp, taxonomy

# File already exists
Error: File already exists: app/Repository/Db/UserRepository.php
```
