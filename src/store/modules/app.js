import cookie from "cookie_js";
import { Login } from "@/api/login";
import { SaveToken, SaveUserEmail, GetUserEmail } from "@/utils/app";

const state = {
  isCollapse:
    cookie.get("isCollapse") != null
      ? JSON.parse(cookie.get("isCollapse"))
      : false,
  token: "",
  userEmail: GetUserEmail() != null ? GetUserEmail() : ""
};
const mutations = {
  SetCollapse(state) {
    state.isCollapse = !state.isCollapse;
    cookie.set("isCollapse", state.isCollapse);
  },
  SetToken(state, value) {
    state.token = value;
  },
  SetUserEmail(state, value) {
    state.userEmail = value;
  }
};
const actions = {
  login({ commit }, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then(res => {
          let d = res.data;
          commit("SetToken", d.token);
          commit("SetUserEmail", d.userEmail);
          SaveToken(res.data.token);
          SaveUserEmail(d.userEmail);
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
