import {axiosInstance} from "boot/axios";
import {Loading, Notify} from "quasar";

const FETCH_PUBLISHERS = "/api/auth/publishers";
const CREATE_PUBLISHER = "/api/auth/store_publisher";
const UPDATE_PUBLISHER = "/api/auth/publisher/update/";
const DELETE_PUBLISHER = "/api/auth/publisher/delete/";

let actions = {
  fetch_publishers({commit}) {
    Loading.show({
      message: "Loading categories list..."
    });
    axiosInstance.get(FETCH_PUBLISHERS)
      .then( res=> {
        commit('FETCH_PUBLISHERS', res.data.data);
        Loading.hide();
      })
      .catch(error => {
        commit( "RECORD_ERRORS", error.message.data.errors );
        Loading.hide();
      });
  },
  delete_publisher({commit}, id) {
    Loading.show({
      message: "Deleting Tag..."
    });
    axiosInstance.get(`${DELETE_PUBLISHER}${id}`)
      .then(res => {
        commit("DELETE_PUBLISHER", id );
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: 'Publisher deleted successfully',
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
  create_publisher({commit}, publisher) {
    Loading.show({
      message: "Creating New Category..."
    });
    axiosInstance.post(CREATE_PUBLISHER, publisher)
      .then(res => {
        commit("CREATE_PUBLISHER", res.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Publisher created',
          position: 'bottom-right'
        });
      }).catch(error => {
      if (error.message.status === 422) {
        commit('RECORD_ERRORS', error.response.data.errors);
      }
      Loading.hide();
    });
  },
  update_publisher({commit}, [publisher, id]){
    Loading.show({
      message: "Updating Category..."
    });
    axiosInstance.post(`${UPDATE_PUBLISHER}${id}`, publisher)
      .then(res=> {
        commit("UPDATE_PUBLISHER", res.data.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Publisher Updated',
          position: 'bottom-right'
        })
      })
      .catch(error => {
        if (error.message.status === 422) {
          commit('RECORD_ERRORS', error.response.data.errors);
        }
        Loading.hide();
      });

  }
}
export default actions;
