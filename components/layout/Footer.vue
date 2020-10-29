<template>
  <footer class="grid-container px-40">
    <tooltip :tip="version" class="websiteName">
      {{ appName }}
    </tooltip>
    <a href="https://github.com/nicolaszu/nuxt-blog" class="contributeLink"
      >Contribute on <githubIcon
    /></a>
    <!-- <a class="contactUs">Contact Us</a> -->
  </footer>
</template>

<script>
import githubIcon from "@/assets/icons/logos/github.svg?inline";
export default {
  components: { githubIcon },
  computed: {
    version() {
      return process.env.version;
    }
  }
};
</script>

<style lang="scss" scoped>
footer {
  position: relative;
  z-index: 1;

  &:before,
  &:after {
    background: #f6f9fc;
    content: "";
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    z-index: -1;
  }

  &:before {
    top: 0;
    transform: skewY(-4deg);
    transform-origin: 0% 0;
  }

  &:after {
    bottom: 0;
    transform: skewY(0deg);
    transform-origin: 100%;
  }
}
footer {
  padding: 1.5rem 2rem 1rem 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 128px;
  display: inline-block;
  line-height: 1;
  letter-spacing: $-ls2;
  font-size: $text-xs;
  &.dark {
    background: #16161a;
    color: white;
  }
  &.light {
    background: #f4f4f4;
    color: #16161a;
  }
}
.grid-container {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "websiteName . contactUs" "contributeLink . contactUs";
  height: 105px;
}

.websiteName {
  grid-area: websiteName;
  text-align: left;
  font-weight: 700;
}

.contributeLink {
  grid-area: contributeLink;
  font-weight: 700;
  color: $gray-color;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 6px;
}

.contactUs {
  grid-area: contactUs;
  font-weight: 300;
  color: #1e96e7;
  text-align: right;
}
</style>
