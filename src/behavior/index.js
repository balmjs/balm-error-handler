import { getConfig } from '../monitoring';
import pv from './pv';
import onPageDuration from './page-duration';
import onPageHeight from './page-height';
import onClick from './click';
import onPageChange from './page-change';
import onVueRouter from './vue-router';

function captureBehaviors() {
  const { vue } = getConfig();

  pv();
  onPageDuration();
  onPageHeight();
  onClick();
  onPageChange();
  vue.router && onVueRouter(vue.router);
}

export default captureBehaviors;
