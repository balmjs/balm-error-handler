import initBalmTracking from '../../src';
import { isIE, killIE } from '@/kill-ie';
import createApp from '@/main';

initBalmTracking({
  debug: true
  // printErrors: true
});
isIE ? killIE() : createApp();
