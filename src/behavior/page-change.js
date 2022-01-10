import { saveBehaviorLog } from '../monitoring';

export default function onPageChange() {
  let from = '';
  window.addEventListener(
    'popstate',
    () => {
      const to = location.href;

      saveBehaviorLog({
        name: 'popstate',
        data: {
          from,
          to
        }
      });

      from = to;
    },
    true
  );

  let oldURL = '';
  window.addEventListener(
    'hashchange',
    (event) => {
      const newURL = event.newURL;

      saveBehaviorLog({
        name: 'hashchange',
        data: {
          from: oldURL,
          to: newURL
        }
      });

      oldURL = newURL;
    },
    true
  );
}
