<template>
  <transition name="slide-fade">
    <div
      class="toast-container"
      @mouseover="stopTimer"
      @mouseleave="startTimer"
    >
      <div class="icon">
        <error-icon class="error" />
      </div>
      <div class="text-content">
        <h6>Error</h6>
        <p>{{ error }}</p>
      </div>
      <div class="icon">
        <close-icon class="cursor" @click="emitClose" />
      </div>
    </div>
  </transition>
</template>

<script>
import errorIcon from "@/assets/icons/error.svg?inline";
import closeIcon from "@/assets/icons/close.svg?inline";

export default {
  components: {
    errorIcon,
    closeIcon
  },
  props: {
    error: {
      type: String,
      default: "An error has occured"
    },
    timeout: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      timer: null
    };
  },
  created() {
    this.startTimer();
  },
  methods: {
    emitClose() {
      this.$emit("close");
    },
    startTimer() {
      if (this.timeout !== 0) {
        this.timer = setTimeout(() => {
          this.emitClose();
        }, this.timeout);
      }
    },
    stopTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
    }
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
  border-left: 0.5rem solid red;

  display: grid;
  grid-template-columns: 1fr 7fr 1fr;
  column-gap: 14px;
}
.icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  .error {
    margin-left: 1rem;
  }
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
