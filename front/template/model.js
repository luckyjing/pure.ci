async function fetchUserListServices() {
  return await get('/user/list.json');
}
export default {

  namespace : 'dashboard',

  state : {},

  subscriptions : {
    setup({dispatch, history}) {}
  },

  effects : {
    *fetch({
      payload: {
        page
      }
    }, {call, put}) {
      try {
        let response = call(fetchUserListServices);
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  },

  reducers : {
    save(state, payload) {
      return {
        ...state
      };
    }
  }
};
