import cookie from "cookie_js";
import { Login } from "@/api/login";

const state = {
  isCollapse:
    cookie.get("isCollapse") != null
      ? JSON.parse(cookie.get("isCollapse"))
      : false
};
const mutations = {
  SetCollapse(state) {
    state.isCollapse = !state.isCollapse;
    cookie.set("isCollapse", state.isCollapse);
  }
};
const actions = {
  login(content, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
