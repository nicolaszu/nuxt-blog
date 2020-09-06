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
  },
  computed: {
    isEditing() {
      if (Object.keys(this.mutableContent).length === 0) {
        return false;
      }
      return true;
    }
  }
};
