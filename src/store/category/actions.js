import {axiosInstance} from "boot/axios";
import {Loading, Notify} from "quasar";

const FETCH_CATEGORIES = "/api/auth/category/categories";
const CREATE_CATEGORY = "/api/auth/category/store_category";
const UPDATE_CATEGORY = "/api/auth/category/update/";
const DELETE_CATEGORY = "/api/auth/category/delete/";

let actions = {
  fetch_categories({commit}) {
    Loading.show({
      message: "Loading categories list..."
    });
    axiosInstance.get(FETCH_CATEGORIES)
      .then( res=> {
        commit('FETCH_CATEGORIES', res.data);
        Loading.hide();
      })
      .catch(error => {
        commit( "RECORD_ERRORS", error.message.data.errors );
        Loading.hide();
      });
  },
  delete_category({commit}, id) {
    Loading.show({
      message: "Deleting Tag..."
    });
    axiosInstance.get(`${DELETE_CATEGORY}${id}`)
      .then(res => {
        commit("DELETE_CATEGORY", id );
        Loading.hide();
        Notify.create({
          type: 'negative',
          message: 'Category deleted successfully',
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
  create_category({commit}, category) {
    Loading.show({
      message: "Creating New Category..."
    });
    axiosInstance.post(CREATE_CATEGORY, category)
      .then(res => {
        commit("CREATE_CATEGORY", res.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Category created',
          position: 'bottom-right'
        });
      }).catch(error => {
      if (error.message.status === 422) {
        commit('RECORD_ERRORS', error.response.data.errors);
      }
      Loading.hide();
    });
  },
  update_category({commit}, [category, id]){
    Loading.show({
      message: "Updating Category..."
    });
    axiosInstance.post(`${UPDATE_CATEGORY}${id}`, category)
      .then(res=> {
        commit("UPDATE_CATEGORY", res.data.data);
        Loading.hide();
        Notify.create({
          type: 'positive',
          message: 'Category Updated',
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
