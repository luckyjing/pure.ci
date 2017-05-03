import * as Services from '../services/home';
import {message} from 'antd';
export default {

  namespace : 'project',

  state : {
    // 用户项目列表
    list: [],
    // 关联的代码仓库列表
    repositories: [],
    // 项目详情
    projectDetail: {
      job: [],
      repository_url: '',
      repository_name: '',
      name: '',
      id: '',
      workflow: '',
      branches: []
    },
    jobDetail: {
      id: '',
      workflow: '',
      commit_msg: '',
      branch: '',
      status: 0,
      duration: 0,
      start_time: Date.now(),
      log: ''
    }
  },

  subscriptions : {
    setup({dispatch, history}) {}
  },

  effects : {
    // 获取用户的代码仓库列表
    *fetchRepository(action, {call, put}) {
      const repositories = yield call(Services.fetchCodingRepositories);
      yield put({type: 'setRepositories', payload: repositories});
    },
    // 创建新项目
    *create(action, {call, put}) {
      try {
        const res = yield call(Services.createProject, action.payload);
        message.success('创建成功');
        location.href = '#/project';
      } catch (e) {}
    },
    *deleteProject(action, {call, put}) {
      try {
        yield call(Services.deleteProject, action.payload.id);
        message.success('删除成功');
        location.href = '#/project';
      } catch (error) {}
    },
    // 项目列表
    *projectList(action, {call, put}) {
      try {
        const res = yield call(Services.getProjectList);
        yield put({type: 'setProjectList', payload: res.data})
      } catch (error) {}
    },
    // 获取项目详细信息
    *projectDetail(action, {call, put}) {
      try {
        const res = yield call(Services.getProjectDetail, action.payload.id);
        yield put({type: 'setDetailInfo', payload: res.data})
      } catch (error) {}
    },
    // 启动一个新的作业
    *startJob(action, {call, put}) {
      try {
        yield call(Services.startJob, action.payload);
        yield put({
          type: 'jobList',
          payload: {
            id: action.payload.project_id
          }
        })
      } catch (error) {}
    },
    // 获取作业列表
    *jobList(action, {call, put}) {
      try {
        const res = yield call(Services.getProjectJobList, action.payload.id);
        yield put({type: 'setJobList', payload: res.data});
      } catch (error) {}
    },
    *saveWorkFlow(action, {call, put}) {
      try {
        yield call(Services.saveWorkFlow, action.payload);
        message.success('保存成功');
        // 改变model
        yield put({type: 'setWorkFlow', payload: action.payload.workflow})
      } catch (error) {}
    },
    *jobDetail(action, {call, put}) {
      try {
        const jobDetail = yield call(Services.jobDetail, action.payload);
        yield put({type: 'setJobDetail', payload: jobDetail.data})
      } catch (error) {}
    }
  },

  reducers : {
    setRepositories(state, action) {
      return {
        ...state,
        repositories: action.payload || []
      }
    },
    setProjectList(state, action) {
      return {
        ...state,
        list: (action.payload || []).map((item, index) => {
          item.index = index;
          return item;
        })
      }
    },
    setDetailInfo(state, action) {
      return {
        ...state,
        projectDetail: {
          ...state.projectDetail,
          ...action.payload
        }
      }
    },
    setJobList(state, action) {
      return {
        ...state,
        projectDetail: {
          ...state.projectDetail,
          job: action.payload
        }
      }
    },
    setJobDetail(state, action) {
      return {
        ...state,
        jobDetail: {
          ...state.jobDetail,
          ...action.payload
        }
      }
    },
    setWorkFlow(state, action) {
      return {
        ...state,
        projectDetail: {
          ...state.projectDetail,
          workflow: action.payload
        }
      }
    }
  }
};
