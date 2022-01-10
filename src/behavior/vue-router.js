import { saveBehaviorLog } from '../monitoring';

function onVueRouter(router) {
  router.beforeEach((to, from, next) => {
    // 首次加载页面不用统计
    if (!from.name) {
      return next();
    }

    const data = {
      routeName: to.name || to.path,
      from: from.fullPath,
      to: to.fullPath,
      params: to.params,
      query: to.query
    };

    saveBehaviorLog({
      name: 'vue-router',
      data
    });

    next();
  });
}

export default onVueRouter;
