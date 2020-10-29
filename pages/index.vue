<template>
  <div class="px-40 pb-40 grid grid-rows-2 grid-cols-3 gap-4 ">
    <post-feed-card-lg :post="posts[3]" class="col-span-2 row-span-2 mb-24" />
    <post-feed-popular :posts="popularPosts" class="col-span-1 row-span-2" />
    <post-feed
      :posts="posts"
      :error="error"
      :loading="$apollo.queries.posts.loading"
      class="col-span-3 row-span-1"
      @loadMore="lazyLoadPosts"
    />
  </div>
</template>

<script>
import postFeed from "@/components/posts/feed/PostFeed";
import postFeedPopular from "@/components/posts/feed/PostFeedPopular";

import postFeedCardLg from "@/components/posts/feed/cards/postFeedCardLg";

import posts from "~/apollo/queries/posts";
const limit = 6;
export default {
  components: {
    postFeed,
    postFeedCardLg,
    postFeedPopular
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
    },
    popularPosts() {
      return this.posts.slice(0, 4);
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

<style lang="scss" scoped></style>
