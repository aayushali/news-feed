import {axiosInstance} from "boot/axios";
import {Loading, Notify} from "quasar";

const FETCH_TAGS = "/api/auth/tags-list";
const DELETE_TAG = "/api/auth/tag_delete/";
const CREATE_TAG = "/api/auth/store_tag";
let actions = {
  fetch_tags({commit}) {
    Loading.show({
      message: "Loading Tags List"
    });
    axiosInstance.get(FETCH_TAGS)
      .then(res => {
        commit('FETCH_TAGS', res.data.data);
        Loading.hide();
      })
      .catch(error => {
        commit("RECORD_ERRORS", error.response.data.errors);
        Loading.hide();
      });
  },
  delete_tag({commit}, id) {
    Loading.show({
      message: "Deleting Tag..."
    });
    axiosInstance.get(`${DELETE_TAG}${id}`)
      .then(res => {
        commit("DELETE_TAG", id);
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: 'Tag deleted successfully',
          position: 'bottom-right'
        });
      }).catch(
      error => {
        if (error.message.status === 422) {
          commit('RECORD_ERRORS', error.response.data.errors);
        }
        Loading.hide();
      }
    );
  },
  create_tag({commit}, tag) {
    Loading.show({
      message: "Creating New tag..."
    });
    axiosInstance.post(CREATE_TAG, user)
      .then(res => {
        commit("CREATE_TAG", res.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Tag created',
          position: 'bottom-right'
        });
      }).catch(error => {
      if (error.message.status === 422) {
        commit('RECORD_ERRORS', error.response.data.errors);
      }
      Loading.hide();
    });
  }
}
export default actions;
