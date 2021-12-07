import store from "../../store";

export default async function (to, from, next) {
  store
    .dispatch("auth/fetch")
    .then(r => {
      if (r.status === 200) {
        next("/dashboard");
      } else {
        next();
      }
    })
    .catch(() => {
      next();
    });
}
