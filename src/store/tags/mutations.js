let mutations ={
  FETCH_TAGS(state, tags) {
return state.tags = tags;
  }
  ,
  DELETE_TAG(state, id){
    let index = state.tags.findIndex(item => item.id === id);
    state.tags.splice(index, 1);
  },
};
export default mutations;
