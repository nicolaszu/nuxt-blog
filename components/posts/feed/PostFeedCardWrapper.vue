<template>
  <div>
    <a v-if="post.type === 'LINK'" :href="post.urlContent">
      <post-feed-card :post="post" />
    </a>

    <nuxt-link
      v-else
      :to="{
        name: 'post',
        params: { post: post.id }
      }"
      tag="a"
    >
      <post-feed-card :post="post" />
    </nuxt-link>
  </div>
</template>

<script>
import postFeedCard from "@/components/posts/feed/PostFeedCard";
export default {
  components: {
    postFeedCard
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
