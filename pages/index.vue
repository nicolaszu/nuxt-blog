<template>
  <div class="page-wrapper">
    <post-feed-card-med />
    <post-feed
      :posts="posts"
      :error="error"
      :loading="$apollo.queries.posts.loading"
      @loadMore="lazyLoadPosts"
    />
  </div>
</template>

<script>
import postFeed from "@/components/posts/feed/PostFeed";
import postFeedCardMed from "@/components/posts/feed/PostFeedCardMed";

import posts from "~/apollo/queries/posts";
const limit = 6;
export default {
  components: {
    postFeed,
    postFeedCardMed
  },
  apollo: {
    posts: {
      prefetch: true,
      query: posts,
      variables: {
        limit,
        offset: 0
      },
      update(data) {
        this.totalCount = data.posts.totalCount;
        return data.posts.posts;
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  },
  data() {
    return {
      offset: 0,
      totalCount: 0,
      posts: [],
      error: null
    };
  },
  computed: {
    lastPostReached() {
      if (this.posts.length === this.totalCount) {
        return true;
      }
      return false;
    }
  },
  created() {
    this.$apollo.queries.posts.refetch();
  },
  methods: {
    async lazyLoadPosts() {
      if (!this.lastPostReached) {
        this.offset += limit;
        try {
          await this.$apollo.queries.posts.fetchMore({
            // New variables
            variables: {
              limit,
              offset: this.offset
            },
            // Transform the previous result with new data
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newTags = fetchMoreResult.posts.posts;
              const totalCount = fetchMoreResult.posts.totalCount;
              this.totalCount = totalCount;
              return {
                posts: {
                  __typename: previousResult.posts.__typename,
                  // Merging the post list
                  posts: [...previousResult.posts.posts, ...newTags],
                  totalCount
                }
              };
            }
          });
        } catch (e) {
          this.$toast.show({ message: e, variant: "error" });
        }
      }
    }
  },
  head() {
    return {
      title: "New article"
    };
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}
</style>
