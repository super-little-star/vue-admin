import Vue from "vue";
import svgIcon from "./svgIcon.vue";

Vue.component("svg-icon", svgIcon);
/*
参数
目录
是否遍历子级目录
遍历文件规则
*/
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);
