import { GetData, Key, SaveData } from "@/utils/app";

const state = {
  category: null || JSON.parse(GetData(Key.category))
};
const getters = {
  category: state => state.category
};
const mutations = {
  SetCategory(state, value) {
    state.category = value;
    SaveData(Key.category, value);
  }
};
const actions = {};

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};
