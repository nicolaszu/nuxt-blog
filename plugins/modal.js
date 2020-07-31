import Vue from "vue";
import Toast from "@/components/Toast";

const Modal = {
  install(Vue) {
    this.EventBus = new Vue();
    Vue.component("toast", Toast);
    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit("show", params);
      }
    };
  }
};

Vue.use(Modal);

export default Modal;
