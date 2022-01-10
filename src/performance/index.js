import { getConfig } from '../monitoring';
import captureStuck from './stuck';

function capturePerformances() {
  const { vue } = getConfig();

  captureStuck();
}

export default capturePerformances;
