# Installation

## Clone the skeleton

```bash
cd wp-content/plugins
git clone https://github.com/nikoginwp/nikogin my-plugin
cd my-plugin
composer install
```

The skeleton already includes `nikoginwp/framework` as a local path repository dependency.

## PHP setup

The framework is autoloaded via Composer PSR-4:

| Namespace | Maps to |
|---|---|
| `Nikogin\Framework\` | `framework/src/` |
| `Nikogin\` | `my-plugin/app/` |

## Frontend setup

```bash
npm install
npm run dev    # development server with live reload
npm run build  # production build
```

## Rename the plugin

1. Rename the plugin folder
2. Update `nikogin.php` — change `Plugin Name`, `NIKOGIN_PLUGIN_FILE`
3. Update `bootstrap/constants.php` — change `NIKOGIN_SLUG`, `NIKOGIN_NAMESPACE`, `NIKOGIN_PREFIX`
4. Update `composer.json` — change `name` and the `"Nikogin\\"` autoload key to your namespace
5. Run `composer dump-autoload`
