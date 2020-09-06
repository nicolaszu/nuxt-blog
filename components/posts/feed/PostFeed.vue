<template>
  <div>
    <template v-if="loading && !posts.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 9"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="error">
      error
    </template>
    <template v-else-if="!loading && !posts.length">
      <div class="article-cards-wrapper">
        Oops...Looks like there are no matches
      </div>
    </template>
    <template v-else>
      <div class="article-cards-wrapper">
        <post-feed-card-wrapper
          v-for="(post, i) in posts"
          :key="post.id"
          :post="post"
          class="article-card-block"
          v-observe-visibility="i === posts.length - 1 ? emitLoadMore : false"
        />
      </div>
    </template>

    <!-- <template v-if="loading && posts.length">
      <div class="article-cards-wrapper">
        <content-placeholders
          v-for="p in 9"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template> -->
  </div>
</template>

<script>
import PostFeedCardWrapper from "@/components/posts/feed/PostFeedCardWrapper";

export default {
  components: {
    PostFeedCardWrapper
  },
  props: {
    posts: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    }
  },
  methods: {
    emitLoadMore(visible) {
      if (visible) {
        this.$emit("loadMore");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.article-cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  .article-card-block {
    width: calc(100% - 2 * 1rem);
    margin: 1rem;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
    @media (min-width: $screen-sm) {
      width: calc(50% - 2 * 1rem);
    }
    @media (min-width: $screen-lg) {
      width: calc(33.33333% - 2 * 1rem);
    }
  }
}
</style>
