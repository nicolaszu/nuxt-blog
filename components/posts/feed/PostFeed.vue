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
          class="article-card-block border-t  border-gray-300 "
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

<style lang="scss" scoped></style>
