let mutations = {
  FETCH_TAGS(state, tags) {
    return state.tags = tags;
  },
  CREATE_TAG(state, tag){
    return state.tags.unshift(tag.data);
  },
  UPDATE_TAG(state, tag){
    let index = state.tags.findIndex( item => item.id === tag.id);
    return state.tags.splice(index, 1, tag);
  }
  ,
  DELETE_TAG(state, id) {
    let index = state.tags.findIndex(item => item.id === id);
    state.tags.splice(index, 1);
  },
};
export default mutations;
