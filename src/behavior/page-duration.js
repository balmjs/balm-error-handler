import { saveBehaviorLog } from '../monitoring/logger';
import { onBeforeunload } from '../utils';

export default function onPageDuration() {
  onBeforeunload(() => {
    saveBehaviorLog({
      name: 'page-duration'
    });
  });
}
