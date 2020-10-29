<template>
  <div>
    <h3 class="font-bold text-xl mb-4">Top Post of the Month</h3>
    <template v-if="loading && !posts.length">
      <div>
        <content-placeholders
          v-for="p in 3"
          :key="p"
          rounded
          class="article-card-block"
        >
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="error">
      error
    </template>
    <template v-else-if="!loading && !posts.length">
      <div>
        Oops...Looks like there are no matches
      </div>
    </template>
    <template v-else>
      <div
        v-for="(post, index) in posts"
        :key="post.id"
        class="flex items-center gap-4 "
      >
        <p class="text-xl font-bold text-gray-600">{{ index + 1 }}</p>
        <post-feed-card-sm :post="post" />
      </div>
    </template>
  </div>
</template>

<script>
import PostFeedCardSm from "@/components/posts/feed/cards/PostFeedCardSm";

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
