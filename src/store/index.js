import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth,
  },

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: false
});

export default store;
