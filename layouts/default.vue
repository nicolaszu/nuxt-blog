<template>
  <div>
    <toast :error="'error'" @close="error = null" />
    <the-header />
    <nuxt class="relative" />
    <the-footer />
  </div>
</template>

<script>
import theHeader from "@/components/layout/Header";
import theFooter from "@/components/layout/Footer";

export default {
  components: {
    theHeader,
    theFooter
  }
};
</script>
<style lang="scss" scoped>
.relative {
  position: relative;
  top: 128px;
}
</style>
