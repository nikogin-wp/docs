# Jobs

Jobs are classes that register a WordPress action hook in their constructor. Under the hood they are powered by **WooCommerce Action Scheduler** — a battle-tested, database-backed job queue that runs jobs reliably in the background, survives timeouts, and retries on failure.

## Requirements

Action Scheduler must be installed and initialized in your plugin.

### 1. Install via Composer

```bash
composer require woocommerce/action-scheduler
```

### 2. Initialize in your plugin

Load Action Scheduler before WordPress finishes booting. The recommended place is the main plugin file:

```php
// nikogin.php
require_once __DIR__ . '/vendor/woocommerce/action-scheduler/action-scheduler.php';
```

::: tip
If WooCommerce is already active on the site, Action Scheduler is included with it. The `require_once` call is safe — it will not double-load.
:::

## Creating a job

```bash
php nikogin make:job SendEmailJob
```

```php
// app/Jobs/SendEmailJob.php
class SendEmailJob extends Job
{
    protected function getActionHook(): string
    {
        return 'send_email'; // → registers: ng_send_email_job
    }

    protected function getNumOfArgs(): int
    {
        return 1;
    }

    public function handle(...$args): mixed
    {
        $userId = $args[0];
        // send email logic
        return null;
    }
}
```

## Hook naming

The registered hook is `ng_{getActionHook()}_job`. Action Scheduler fires `do_action()` for the hook when the job runs, so the same `add_action` registration the `Job` constructor creates is what Action Scheduler calls.

```php
// SendEmailJob registers:
add_action('ng_send_email_job', [$this, 'handle'], 10, 1);
```

## Dispatching a job

Use Action Scheduler functions instead of `do_action()` to push work into the background queue.

### Run as soon as possible (async)

```php
as_enqueue_async_action('ng_send_email_job', [$userId]);
```

### Run once at a specific time

```php
as_schedule_single_action(time() + 300, 'ng_send_email_job', [$userId]);
```

### Run on a recurring schedule

```php
as_schedule_recurring_action(time(), HOUR_IN_SECONDS, 'ng_send_email_job', [$userId]);
```

### Cancel a scheduled action

```php
as_unschedule_action('ng_send_email_job', [$userId]);
```

## Registering a job

Jobs must be instantiated to register their `add_action` hook. Do this via a `ServiceProvider`:

```php
protected array $services = [
    SendEmailJob::class,
];
```

The service provider calls `Container::get(SendEmailJob::class)` which calls `new SendEmailJob()`, registering the hook immediately on `plugins_loaded`.

## Monitoring jobs

Action Scheduler ships with a built-in admin UI under **Tools → Scheduled Actions** where you can view pending, completed, failed, and cancelled jobs, re-run failed jobs, and inspect logs.

## Custom hook name

```bash
php nikogin make:job NotifyAdminJob --name=notify_admin
```
