<template>
  <div class="page-wrapper">
    <div class="article-content-wrapper">
      <linkEditor
        ref="editor"
        class="article-block"
        @save="saveContent"
        :editContent="editContent.post"
      />
      <div class="aside-username-wrapper">
        <div class="aside-username-block">
          <side-details
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
import linkEditor from "@/components/create/share-link/linkEditor";
import sideDetails from "@/components/create/SideDetails";

import createPostMixin from "@/mixins/createPost";

export default {
  mixins: [createPostMixin],
  components: {
    sideDetails,
    linkEditor
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
