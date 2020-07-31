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
  }
};
