import { saveBehaviorLog } from '../monitoring';

export default function pv() {
  saveBehaviorLog({
    name: 'pv',
    data: {
      referrer: document.referrer
    }
  });
}
