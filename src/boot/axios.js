import axios from "axios";
import qs from "qs";

const axiosInstance = axios.create({
  paramsSerializer: params => {
    return qs.stringify(params, {arrayFormat: "repeat"});
  },
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  },
  baseURL: 'http://127.0.0.1:8000/'
});

axiosInstance.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
);
export default ({Vue}) => {
  Vue.prototype.$axios = axiosInstance;
};

export {axiosInstance};
