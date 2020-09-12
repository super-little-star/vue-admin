import { MessageBox } from "element-ui";
export default {
  install(Vue, options) {
    Vue.prototype.MsgBoxTips = function(content) {
      return MessageBox.confirm(content, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      });
    };
  }
};
