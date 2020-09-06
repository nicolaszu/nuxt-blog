import addPost from "~/apollo/queries/addPost";
import editPost from "~/apollo/queries/editPost";
import post from "~/apollo/queries/post";

export default {
  data() {
    return {
      post: {},
      skipEditQuery: true,
      editPostId: this.$route.query.edit,
      editContent: {}
    };
  },
  computed: {},
  apollo: {
    editContent: {
      prefetch: false,
      query: post,
      variables() {
        return {
          id: this.editPostId
        };
      },
      skip() {
        return this.skipEditQuery;
      },
      update: (data) => data,
      error(error) {
        this.$toast.show({ message: error, variant: "error" });
      }
    }
  },
  mounted() {
    if (this.editPostId) {
      this.$apollo.queries.editContent.skip = false;
      this.$apollo.queries.editContent.refetch();
    }
  },
  methods: {
    saveMeta(meta) {
      this.post = meta;
    },
    saveContent(content) {
      this.post = { ...this.post, ...content };
    },
    handleError(err) {
      this.$toast.show({ message: err, variant: "error" });
    },
    async publish() {
      try {
        this.$root.$loading.start();
        await this.$refs.meta.emitOnSave();
        await this.$refs.editor.emitOnSave();
        const postResp = await this.$apollo.mutate({
          mutation: addPost,
          variables: {
            post: this.post
          }
        });
        this.$toast.show({ message: "Post Created", variant: "success" });
        this.$router.push({
          name: "post",
          params: { post: postResp.data.addPost.id }
        });
      } catch (err) {
        this.handleError(err);
      } finally {
        this.$root.$loading.finish();
      }
    },
    async edit() {
      try {
        this.$root.$loading.start();
        await this.$refs.meta.emitOnSave();
        await this.$refs.editor.emitOnSave();
        const postResp = await this.$apollo.mutate({
          mutation: editPost,
          variables: {
            post: this.post,
            id: this.editPostId
          }
        });

        this.$toast.show({ message: "Post Updated", variant: "success" });
        this.$router.push({
          name: "post",
          params: { post: postResp.data.editPost.id }
        });
      } catch (err) {
        this.handleError(err);
      } finally {
        this.$root.$loading.finish();
      }
    }
  }
};
