<template>
  <div>
    <a v-if="post.type === 'LINK'" :href="post.urlContent">
      <post-feed-card-med :post="post" />
    </a>

    <nuxt-link
      v-else
      :to="{
        name: 'post-post',
        params: { post: post.id }
      }"
      tag="a"
    >
      <post-feed-card-med :post="post" />
    </nuxt-link>
  </div>
</template>

<script>
import postFeedCardMed from "@/components/posts/feed/PostFeedCardMed";

export default {
  components: {
    postFeedCardMed
  },
  props: {
    post: {
      type: Object,
      default: null
    }
  }
};
</script>

<style></style>
