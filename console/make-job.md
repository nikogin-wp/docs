# make:job

Generates a job class that registers a namespaced WordPress action hook.

## Signature

```bash
php nikogin make:job {ClassName} [--name={hook}]
```

## Example

```bash
php nikogin make:job SendEmailJob
php nikogin make:job ProcessPaymentJob --name=process_payment
```

## Hook naming

The registered hook is `ng_{hook}_job`. The hook name is auto-derived from the class name (strip `Job`, `snake_case`) unless `--name` is provided.

| Class name | Auto hook | Registered action |
|---|---|---|
| `SendEmailJob` | `send_email` | `ng_send_email_job` |
| `ProcessPaymentJob` | `process_payment` | `ng_process_payment_job` |

## Generated output

```php
class SendEmailJob extends Job
{
    protected function getActionHook(): string
    {
        return 'send_email';
    }

    protected function getNumOfArgs(): int
    {
        return 1;
    }

    public function handle(...$args): mixed
    {
        //
    }
}
```

## Dispatching

Jobs are dispatched via **Action Scheduler** — not `do_action()` directly.

```php
as_enqueue_async_action('ng_send_email_job', [$userId]);          // ASAP
as_schedule_single_action(time() + 60, 'ng_send_email_job', [$userId]); // delayed
```

See [Jobs](/wordpress/jobs) for setup instructions and the full dispatching API.
