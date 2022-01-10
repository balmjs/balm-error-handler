import { saveBehaviorLog } from '../monitoring';
import { onBeforeunload } from '../utils';

export default function onPageDuration() {
  onBeforeunload(() => {
    saveBehaviorLog({
      name: 'page-duration'
    });
  });
}
