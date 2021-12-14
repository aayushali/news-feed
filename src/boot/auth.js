import auth from "../store/auth";
import { axiosInstance } from "boot/axios";
import { jsonapiModule } from 'jsonapi-vuex';


export default ( { app , router, store, Vue})=> {
  axiosInstance.interceptors.response.use(
    response => {
      return response;
    },
  );

  store.registerModule("authentication", auth);

  store.registerModule("jv", jsonapiModule( axiosInstance, {
    preserveJson: true
    })
  );

  // set authentication routes
  let { routes } = router.options;
  let routeData = routes.find( r => r.path === "/auth");
  routeData.children = [
    {
      path: "/login",
      name: "login",
      component: () => import( "pages/auth/Login")
    },

  ];

  router.addRoutes([ routeData]);

  let helper = {};
  helper.login = async data => {
    return store.dispatch("auth/login", data);
  };
  helper.register = async data=> {
    return store.dispatch("auth/register", data);
  };
  Vue.prototype.$oauth = helper;

}
