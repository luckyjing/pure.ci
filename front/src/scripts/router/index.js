import React from 'react';
import {Router, Route, IndexRoute} from 'dva/router';
import Layout from '../components/Layout';
import DashBoard from '../containers/DashBoard';
import Computer from '../containers/Computer';
import Project from '../containers/Project';
import ProjectList from '../containers/Project/components/ProjectList';
import ProjectCreate from '../containers/Project/components/ProjectCreate';
import ProjectDetail from '../containers/Project/components/ProjectDetail';

import Profile from '../containers/Profile';
import NotFound from '../containers/NotFound';
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={DashBoard}/>
        <Route path="/project" component={Project}>
          <IndexRoute component={ProjectList}/>
          <Route path="create" component={ProjectCreate}/>
          <Route path=":id" component={ProjectDetail}/>
        </Route>
        <Route path="/profile" component={Profile}></Route>
        <Route path="/computer" component={Computer}></Route>
        <Route path="*" component={NotFound}></Route>
      </Route>
    </Router>
  );
}
export default RouterConfig;
