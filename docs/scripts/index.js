import initBalmErrorTracking from '../../src';
import { isIE, killIE } from '@/kill-ie';
import createApp from '@/main';

initBalmErrorTracking();
isIE ? killIE() : createApp();
