const mutations = {
  FETCH_CATEGORIES(state, categories) {
    return state.categories = categories;
  },
  CREATE_CATEGORY(state, category) {
    return state.categories.unshift(category.data);
  },
  DELETE_CATEGORY(state, id) {
    let index = state.categories.findIndex(item => item.id === id);
    state.categories.splice(index, 1);
  },
  UPDATE_CATEGORY(state, category){
    let index = state.categories.findIndex( item => item.id === category.id);
    return state.categories.splice(index, 1, category);
  }
}

export default mutations;
