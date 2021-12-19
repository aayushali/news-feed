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
}

export default mutations;
