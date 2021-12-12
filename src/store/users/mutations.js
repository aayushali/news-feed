let mutations = {
  FETCH_USERS (state, users){
    return state.users = users;
  },
  CREATE_USER(state, users){
    return state.users.unshift( users.data );
  },
  DELETE_USER(state, id){
    let index = state.users.findIndex(item => item.id === id);
    state.users.splice(index, 1);
  },
  UPDATE_USER(state, data){
    let index = state.users.findIndex( item => item.id === data.id);
    return state.users.splice(index, 1, data);
  },
  LOADING (state, loading) {
    state.loading = loading;
  },
  RECORD_ERRORS(state, errors) {
    state.errors.length = 0;
    state.errors = errors;
  }
};

export default mutations;
