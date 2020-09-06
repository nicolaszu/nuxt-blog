import Vue from "vue";
import Toast from "@/components/utilities/Toast";
import ToolTip from "@/components/utilities/ToolTip";

const Modal = {
  install(Vue) {
    this.EventBus = new Vue();

    Vue.component("toast", Toast);
    Vue.component("tooltip", ToolTip);

    Vue.prototype.$toast = {
      show(params) {
        Modal.EventBus.$emit("show", params);
      }
    };
  }
};

Vue.use(Modal);

export default Modal;
