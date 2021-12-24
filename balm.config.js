const getConfig = require('./config/balmrc');
const api = require('./config/balm.api');
const getAfterTask = require('./config/balm.after-task');
const getBeforeTask = require('./config/balm.before-task');

module.exports = (balm) => {
  return {
    config: getConfig(balm),
    api,
    afterTask: getAfterTask(balm),
    beforeTask: getBeforeTask(balm)
  };
};
