import { saveBehaviorLog } from '../monitoring/logger';

export default function pv() {
  saveBehaviorLog({
    name: 'pv',
    data: {
      referrer: document.referrer
    }
  });
}
