# HTTP Client

`HTTP` is a static wrapper around `wp_remote_request()` that provides a clean API for outgoing HTTP requests.

## Methods

```php
use Nikogin\Framework\Support\HTTP;

$response = HTTP::get('https://api.example.com/users');
$response = HTTP::post('https://api.example.com/users', ['name' => 'John']);
$response = HTTP::put('https://api.example.com/users/1', ['name' => 'Jane']);
$response = HTTP::delete('https://api.example.com/users/1');
```

## Response structure

Every method returns an array:

```php
[
    'success'    => true,           // bool: status 2xx
    'code'       => 200,            // int: HTTP status code
    'body'       => [...],          // mixed: JSON decoded body
    'raw'        => '{"id":1}',     // string: raw response body
    'json_error' => null,           // string|null: JSON parse error message
]
```

On WP error:

```php
[
    'success' => false,
    'error'   => 'cURL error 7: ...',
    'code'    => 'http_request_failed',
]
```

## Custom headers

```php
$response = HTTP::post(
    'https://api.example.com/data',
    ['key' => 'value'],
    ['Authorization' => 'Bearer ' . $token]
);
```

## Timeout

```php
$response = HTTP::get('https://slow-api.example.com', [], timeout: 30);
```

## Example — consuming an external API

```php
class ExternalApiService
{
    public function fetchUsers(): array
    {
        $response = HTTP::get('https://jsonplaceholder.typicode.com/users');

        if (!$response['success']) {
            return [];
        }

        return $response['body'] ?? [];
    }
}
```
