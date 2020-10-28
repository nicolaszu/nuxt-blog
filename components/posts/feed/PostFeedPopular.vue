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
        <post-feed-card-sm
          v-for="post in posts"
          :key="post.id"
          :post="post"
          class="article-card-block  "
        />
      </div>
    </template>
  </div>
</template>

<script>
import PostFeedCardSm from "@/components/posts/feed/PostFeedCardSm";

export default {
  components: {
    PostFeedCardSm
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
  }
};
</script>

<style lang="scss" scoped></style>
