<template>
  <transition name="slide-fade">
    <div class="tooltip" v-bind="$attrs">
      <slot></slot>
      <span class="tooltiptext">{{ tip }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    tip: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  font-size: $text-ss;

  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 20%;
  margin-left: -60px;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}

/* Tooltip arrow */
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 20%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
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
