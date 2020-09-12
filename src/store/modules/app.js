import cookie from "cookie_js";
import { Login } from "@/api/login";
import { SaveUserData, GetUserEmail, GetUserId } from "@/utils/app";

const state = {
  isCollapse:
    cookie.get("isCollapse") != null
      ? JSON.parse(cookie.get("isCollapse"))
      : false,
  token: "",
  userEmail: GetUserEmail() != null ? GetUserEmail() : "",
  userId: GetUserId() != null ? GetUserId() : ""
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
  },
  SetUserId(state, value) {
    state.userId = value;
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
          commit("SetUserId", d.userId);
          SaveUserData(d);
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
