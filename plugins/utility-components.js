import Vue from "vue";
import Toast from "@/components/utilities/Toast";
import ToolTip from "@/components/utilities/ToolTip";

const Utilities = {
  install(Vue) {
    this.EventBus = new Vue();

    Vue.component("toast", Toast);
    Vue.component("tooltip", ToolTip);

    Vue.prototype.$toast = {
      show(params) {
        Utilities.EventBus.$emit("show", params);
      }
    };
  }
};

Vue.use(Utilities);

export default Utilities;
