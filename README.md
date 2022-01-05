# Balm Tracking

> Javascript error tracking

## Usage

```js
import initBalmTracking from 'balm-tracking';

initBalmTracking({
  printErrors: false,
  reportRate: 1, // range: [0, 1]
  reportEndpoint: '/log' // replace your api
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
