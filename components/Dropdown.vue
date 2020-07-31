<template>
  <div class="dropdown">
    <down-arrow-icon class="dropbtn" />
    <div class="dropdown-content">
      <div
        v-for="(option, name, index) in options"
        :key="index"
        class="option"
        @click="onClick(option)"
      >
        <p>{{ name }}</p>
      </div>
      <div>
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import downArrowIcon from "@/assets/icons/down-arrow.svg?inline";

export default {
  components: { downArrowIcon },
  props: {
    options: {
      type: Object,
      required: false
    }
  },
  methods: {
    onClick(option) {
      this.$emit("selected", option);
    }
  }
};
</script>

<style lang="scss" scoped>
.dropbtn {
  background-color: $primary-light;
  fill: $dark-gray-color;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #ffffff;
  min-width: 160px;
  box-shadow: 0 15px 30px -10px transparentize(#000, 0.9);
  z-index: 1;
}

.dropdown-content .option {
  color: black;
  font-size: $text-xs;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  cursor: pointer;
  align-items: center;
  svg {
    margin-right: 5px;
    width: 18px;
  }
}

.dropdown-content .option:hover {
  color: $primary-color;
  background-color: #e5f2ff;
  svg {
    fill: $primary-color;
  }
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: $gray-color;
}
</style>
