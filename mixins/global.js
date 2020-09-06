export default {
  computed: {
    appName() {
      return process.env.NUXT_ENV_APPNAME;
    }
  }
};
