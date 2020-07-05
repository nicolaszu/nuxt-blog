<template>
  <div class="page-wrapper">
    <error-toast v-if="error" :error="error" @close="error = null" />
    <div class="article-content-wrapper">
      <editor-block ref="editor" class="article-block" @publish="saveContent" />
      <div class="aside-username-wrapper">
        <div class="aside-username-block">
          <aside-details-block ref="meta" @publish="saveMeta" />
          <button class="publish-button" @click="publish">Publish</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditorBlock from "@/components/editor/EditorBlock";
import AsideDetailsBlock from "@/components/editor/AsideDetailsBlock";
import ErrorToast from "@/components/editor/ErrorToast";

import addPost from "~/apollo/queries/addPost";

export default {
  components: {
    EditorBlock,
    AsideDetailsBlock,
    ErrorToast
  },
  data() {
    return {
      post: {},
      error: null
    };
  },
  methods: {
    saveMeta(meta) {
      this.post = meta;
    },
    saveContent(content) {
      this.post = { ...this.post, ...content };
    },
    handleError(err) {
      this.error = err;
    },
    async publish() {
      try {
        await this.$refs.meta.emitOnPublish();
        await this.$refs.editor.emitOnPublish();
        await this.$apollo.mutate({
          mutation: addPost,
          variables: {
            post: this.post
          }
        });
      } catch (err) {
        this.handleError(err);
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
