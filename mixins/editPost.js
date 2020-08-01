export default {
  data() {
    return {
      mutableContent: { ...this.editContent }
    };
  },

  props: {
    editContent: {
      type: Object,
      required: false
    }
  },
  watch: {
    editContent() {
      this.mutableContent = JSON.parse(JSON.stringify(this.editContent));
    }
  }
};
