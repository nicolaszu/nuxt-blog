<template>
  <div>
    <template v-if="loading && !posts.length">
      <div class="">
        <content-placeholders v-for="p in 9" :key="p" rounded class="">
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="error">
      error
    </template>
    <template v-else-if="!loading && !posts.length">
      <div class="">
        Oops...Looks like there are no matches
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col ">
        <post-feed-card-md
          v-for="(post, i) in posts"
          :key="post.id"
          v-observe-visibility="i === posts.length - 1 ? emitLoadMore : false"
          :post="post"
          class=""
        />
      </div>
    </template>

    <!-- <template v-if="loading && posts.length">
      <div class="">
        <content-placeholders
          v-for="p in 9"
          :key="p"
          rounded
          class=""
        >
          <content-placeholders-img />
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template> -->
  </div>
</template>

<script>
import PostFeedCardMd from "@/components/posts/feed/cards/PostFeedCardMd";

export default {
  components: {
    PostFeedCardMd
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
