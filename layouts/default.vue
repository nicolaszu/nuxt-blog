<template>
  <div>
    <toast :error="'error'" @close="error = null" />

    <the-header />
    <nuxt keep-alive class="relative" />
    <the-footer />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>
<style lang="scss" scoped>
.relative {
  position: relative;
  top: 128px;
}
</style>
