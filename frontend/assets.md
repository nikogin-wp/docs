# Assets

The framework provides a Vite manifest-based asset loader. Compiled files use content hashes in their filenames; the PHP `Assets` class reads the manifest to enqueue the correct URLs.

## How it works

```
resources/ts/app.ts    ──Vite build──►  build/ts/app.abc123.js
resources/scss/app.scss ──Vite build──►  build/scss/app.def456.css
                                          build/.vite/manifest.json
```

The manifest maps source entry paths to their compiled filenames:

```json
{
  "resources/ts/app.ts": {
    "file": "ts/app.abc123.js",
    "isEntry": true
  },
  "resources/scss/app.scss": {
    "file": "scss/app.def456.css",
    "isEntry": true
  }
}
```

## Enqueueing assets

```php
// app/Bootstraps/Assets.php
class Assets implements Bootable
{
    public static function boot(): void
    {
        add_action('wp_enqueue_scripts',    [self::class, 'enqueue']);
        add_action('admin_enqueue_scripts', [self::class, 'enqueue']);
    }

    public static function enqueue(): void
    {
        FrameworkAssets::enqueue('my-plugin-css', 'resources/scss/app.scss');
        FrameworkAssets::enqueue('my-plugin-js',  'resources/ts/app.ts');
    }
}
```

`Assets::enqueue()` auto-detects the type from the entry extension:
- `.css` / `.scss` → `wp_enqueue_style()`
- `.ts` / `.js` → `wp_enqueue_script()` (loaded in footer)

## Config keys

| Key | Description |
|---|---|
| `build_path` | Filesystem path to the `build/` directory |
| `build_url` | Public URL to the `build/` directory |
| `version` | Used as the cache-busting version string |

## Vite setup

```js
// vite.config.js
build: {
    outDir: 'build',
    manifest: true,
    rollupOptions: {
        input: {
            'ts/app':   'resources/ts/app.ts',
            'scss/app': 'resources/scss/app.scss',
        },
        output: {
            entryFileNames: '[name].[hash].js',
            assetFileNames: '[name].[hash][extname]',
        },
    },
},
```

## Commands

```bash
npm run dev    # start Vite dev server (live reload on PHP changes)
npm run build  # production build with hashed filenames
```
