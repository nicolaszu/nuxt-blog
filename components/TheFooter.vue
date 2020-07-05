<template>
  <footer>
    <span>And then there were none</span>
  </footer>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss" scoped>
footer {
  padding: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 128px;
  color: $dark-gray-color;
  span {
    display: inline-block;
    line-height: 1;
    text-transform: uppercase;
    letter-spacing: $-ls2;
    font-size: $text-xs;
    font-weight: $bold-body-font-weight;
  }
  a {
    svg {
      width: 3rem;
      height: 3rem;
      margin: 0 0.5rem;
    }
    .nuxt-icon {
      width: 2.5rem;
      height: 2.5rem;
      margin: 0 0.25rem;
    }
  }
}
</style>
