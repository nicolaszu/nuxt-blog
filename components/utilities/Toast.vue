<template>
  <transition name="slide-fade">
    <div
      class="toast-container"
      :class="variant"
      @mouseover="stopTimer"
      @mouseleave="startTimer"
      v-if="visible"
    >
      <div class="icon">
        <component v-bind:is="icon"></component>
      </div>
      <div class="text-content">
        <h6>{{ title }}</h6>
        <p>{{ message }}</p>
      </div>
      <div class="icon">
        <close-icon class="cursor" @click="hide" />
      </div>
    </div>
  </transition>
</template>

<script>
import errorIcon from "@/assets/icons/notification/error.svg?inline";
import successIcon from "@/assets/icons/notification/checkbox-circle-fill.svg?inline";
import closeIcon from "@/assets/icons/utility/close.svg?inline";
import Utilities from "@/plugins/utility-components";

export default {
  components: {
    errorIcon,
    closeIcon,
    successIcon
  },
  data() {
    return {
      timer: null,
      visible: false,
      title: "Success",
      message: "Successfully completed",
      timeout: 4000,
      variant: "success"
    };
  },
  methods: {
    startTimer() {
      if (this.timeout !== 0) {
        this.timer = setTimeout(() => {
          this.hide();
        }, this.timeout);
      }
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    hide() {
      this.visible = false;
    },
    show(params) {
      this.startTimer();
      this.visible = true;
      this.variant = params.variant || "success";
      this.message = params.message || this.variant;
      this.title = params.title || this.variant;
    }
  },
  computed: {
    icon() {
      switch (this.variant) {
        case "success":
          return "success-icon";
        case "error":
          return "error-icon";
        default:
          return "success-icon";
      }
    }
  },
  beforeMount() {
    Utilities.EventBus.$on("show", (params) => {
      this.show(params);
    });
  }
};
</script>

<style lang="scss" scoped>
.toast-container {
  z-index: 100;
  position: fixed;
  right: 0;
  bottom: 0;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.12);
  color: $on-surface-color;
  border-radius: 2px;
  text-align: center;
  margin: 20px;
  min-width: 402px;
  height: 92px;

  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  column-gap: 14px;
  &.success {
    border-left: 0.5rem solid $primary-color;
  }

  &.error {
    border-left: 0.5rem solid red;
  }
}
.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 1rem;
  .cursor {
    cursor: pointer;
  }
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  h6 {
    font-size: $text-sm;
    text-transform: capitalize;
  }
  p {
    font-size: $text-xs;
  }
}

.slide-fade-enter-active {
  transition: all 0.2s ease !important;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1) !important;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(20px) !important;
  opacity: 0 !important;
}
</style>
