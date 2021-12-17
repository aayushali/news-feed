import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users';
import tags from './tags';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,users, tags
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false
});

export default store;
