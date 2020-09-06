<template>
  <div class="page-wrapper">
    <div class="article-content-wrapper">
      <text-editor
        ref="editor"
        class="article-block"
        @save="saveContent"
        :editContent="editContent.post"
      />
      <div class="aside-username-wrapper">
        <div class="aside-username-block">
          <aside-details-block
            ref="meta"
            @save="saveMeta"
            :editContent="editContent.post"
          />
          <button
            v-if="!editContent.post"
            class="publish-button"
            @click="publish"
          >
            Publish
          </button>
          <button v-else class="publish-button" @click="edit">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import textEditor from "@/components/create/write/TextEditor";
import AsideDetailsBlock from "@/components/create/AsideDetailsBlock";

import addPost from "~/apollo/queries/addPost";
import editPost from "~/apollo/queries/editPost";

import post from "~/apollo/queries/post";

export default {
  components: {
    textEditor,
    AsideDetailsBlock
  },
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
  data() {
    return {
      post: {},
      skipEditQuery: true,
      editPostId: this.$route.query.edit,
      editContent: {}
    };
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
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}
.article-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 2rem;
  justify-content: center;
  @media (min-width: $screen-lg) {
    align-items: normal;
    flex-direction: row;
  }
  .article-block {
    width: 100%;
    max-width: 880px;
    @media (min-width: $screen-lg) {
      margin-right: 1rem;
      width: 66.66666%;
      margin-bottom: 2rem;
    }
  }
  .aside-username-wrapper {
    padding-top: 10px;
    max-width: 880px;
    width: 100%;
    @media (min-width: $screen-lg) {
      display: block;
      width: 33.33333%;
    }
    position: relative;
    .aside-username-block {
      position: sticky;
      top: 1rem;
      // margin: 0.5rem;
    }
  }
}

.publish-button {
  display: block;
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  letter-spacing: $-ls2;
  margin-top: 1rem;
  background: $primary-color;
  color: #ffffff;
  font-size: $text-sm;

  &:hover {
    background: $hovered-surface-color;
  }
  &:active {
    box-shadow: $small-inner-shadow-active;
  }
  &:focus {
    outline: none;
  }
}
</style>
