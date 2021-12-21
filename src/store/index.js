import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import users from './users';
import tags from './tags';
import category from './category';
import publisher from './publisher';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,users, tags, category, publisher
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false
});

export default store;
