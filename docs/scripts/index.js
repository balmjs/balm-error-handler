import '@/polyfill';
import { isIE, killIE } from '@/kill-ie';
import createBalmTrackingApp from '@/main';

isIE ? killIE() : createBalmTrackingApp();
