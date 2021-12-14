let getters = {
  user: state => {
    console.log(state);
    return state.user;
  },
  authenticated(state){
    return state.token && state.user;
  },
  errors: state => {
    return state.errors;
  },
};

export default getters;
