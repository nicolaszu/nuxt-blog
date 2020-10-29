import MetaInfo from "@/components/posts/feed/cards/card-parts/MetaInfo";
export default {
  components: { MetaInfo },
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  computed: {
    imgPlaceholder() {
      const maxLenght = 4;
      if (this.post.title && this.post.title.split(" ").length > maxLenght) {
        const shortened = this.post.title
          .split(" ")
          .slice(0, maxLenght)
          .join(" ")
          .concat("...");
        return shortened;
      }
      return this.post.title;
    }
  },
  methods: {
    el(type) {
      return type === "LINK" ? "a" : "nuxt-link";
    }
  }
};
