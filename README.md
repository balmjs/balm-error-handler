# Balm Tracking

> Javascript error tracking

## Usage

```js
import balmTracking from 'balm-tracking';

balmTracking({
  printErrors: false,
  reportEndpoint: '/log', // replace your api,
  reportRate: 1.0, // range: [0, 1]
  reportThreshold: 1000,
  vue: {
    app, // Vue app
    router // Vue router
  }
});
```

```js
import { saveErrorLog } from 'balm-tracking';

saveErrorLog({
  name: 'http',
  message: 'request error',
  error: 'error stack'
});
```
