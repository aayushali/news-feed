let mutations = {
  FETCH_USERS (state, users){
    return state.users = users;
  },
  CREATE_USER(state, users){
    return state.users.unshift( users.data );
  },
  DELETE_USER(state, user){
    let index = state.users.findIndex(item => item.id === user);
    state.users.splice(index, 1);
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
