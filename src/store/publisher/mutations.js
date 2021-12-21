const mutations = {
  FETCH_PUBLISHERS(state, publishers) {
    return state.publishers = publishers;
  },
  CREATE_PUBLISHER(state, publisher) {
    return state.publishers.unshift(publisher.data);
  },
  DELETE_PUBLISHER(state, id) {
    let index = state.publishers.findIndex(item => item.id === id);
    state.publishers.splice(index, 1);
  },
  UPDATE_PUBLISHER(state, publisher){
    let index = state.publishers.findIndex( item => item.id === publisher.id);
    return state.publishers.splice(index, 1, publisher);
  }
}

export default mutations;
