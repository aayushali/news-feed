let getters = {
  getUsers: state => {
    return state.users;
  },
  loading: state => {
    return state.loading;
  },
  errors: state => {
    return _.flatten( Object.values (state.errors));
  },
};
export default getters;
