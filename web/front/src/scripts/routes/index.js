import CoreLayout from '../layouts/CoreLayout'
import DashBoard from '../redux/DashBoard/container'
import {baseRoute, notFound} from '../config'
import {requireAll, requireAuth} from '../global/services'
import {nowLocation} from '../global/action'

import '../../css/index.less'


/*  Note: 使用Plain Object 方式去配置路由,便于协作 */
export const createRoutes = (store) => {
  let containers = requireAll(require.context('../redux', true, /index\.js$/));
  let childRoutes = containers.map(ctx=>ctx(store));
  // 增加登录校验权限
  childRoutes.forEach(route=> {
    route.onEnter = (nextState, replace)=> {
      requireAuth(nextState, replace);
    }
  });
  let route = {
    path: baseRoute,
    component: CoreLayout,
    indexRoute: {
      component: DashBoard
    },
    onEnter: (nextState, replace)=> {
      store.dispatch(nowLocation(nextState.location.pathname));
      requireAuth(nextState, replace);
    },
    // 路由规则不匹配时,目前逻辑为 重定向到根路径
    childRoutes: childRoutes.concat([{
      path: '*',
      onEnter: ({}, replace)=> {
        replace(notFound);
      }
    }]),
    onChange: function (prevState, nextState, replace) {
      store.dispatch(nowLocation(nextState.location.pathname));
    }
  };
  return route;
};
export default createRoutes
