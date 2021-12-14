
import {LocalStorage} from "quasar";

// const LOGIN_ROUTE = "api/auth/login";
const LOGIN_ROUTE = "oauth/token";
const FETCH_USER_ROUTE = "/api/auth/user";
import {axiosInstance} from "boot/axios";

let actions = {
  login({commit}, data) {
    let params = {
      username: data.email,
      password: data.password,
    };

    const LOGIN_CREDENTIALS = {
      grant_type: "password",
      client_id: 2,
      client_secret: '2WACPCOv0IhjvLEZ7chagE4pnxekCkTrDNeDRdCY',
      scope: "*"
    };
    Object.assign(params, LOGIN_CREDENTIALS);
    console.log(params);

    return axiosInstance.post(LOGIN_ROUTE, params)
      .then(res => {
        commit('SET_TOKEN', res.data);
        window.location.reload("/admin");
      })
  },
  fetch({commit, state}) {
    let token = LocalStorage.getItem("access_token");
    if (token) {
      const user = state.user;
      if (user) {
        return {
          status: 200,
          data: {
            data: user
          }
        };
      }
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token;
      return axiosInstance.get(FETCH_USER_ROUTE).then(response => {
        commit("SET_USER", response.data);
        return response;
      });
    }
  },
  logout({commit}, state) {
    LocalStorage.remove("access_token");
    LocalStorage.remove("refresh_token");
    window.location.reload("/");
    commit("SET_USER", null);
  }
};

export default actions;
