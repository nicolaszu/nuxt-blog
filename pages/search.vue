<template>
  <div class="page-wrapper">
    <div class="search-wrapper">
      <h2>Search:</h2>
      <input
        v-model="searchInput"
        placeholder="Search Blok..."
        type="text"
        ref="search"
        @keyup.enter="newSearch"
      />
    </div>
    <post-feed
      :posts="posts"
      :error="error"
      :loading="$apollo.queries.posts.loading"
      @loadMore="lazyLoadPosts"
    />
  </div>
</template>

<script>
import postFeed from "@/components/posts/PostFeed";

import searchPosts from "~/apollo/queries/searchPosts";
const limit = 6;
export default {
  components: {
    postFeed
  },
  apollo: {
    posts: {
      prefetch: true,
      query: searchPosts,
      variables() {
        return {
          limit,
          offset: 0,
          filter: this.searchQuery
        };
      },
      update(data) {
        this.totalCount = data.searchPosts.totalCount;
        return data.searchPosts.posts;
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
      error: null,
      searchInput: ""
    };
  },
  created() {
    this.intialSkip = false;
    this.searchInput = this.searchQuery;
  },
  computed: {
    lastPostReached() {
      if (this.posts.length === this.totalCount) {
        return true;
      }
      return false;
    },
    searchQuery() {
      return this.$route.query.search;
    }
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
              offset: this.offset,
              filter: this.searchQuery
            },
            // Transform the previous result with new data
            updateQuery: (previousResult, { fetchMoreResult }) => {
              const newTags = fetchMoreResult.searchPosts.posts;
              const totalCount = fetchMoreResult.searchPosts.totalCount;
              this.totalCount = totalCount;
              return {
                searchPosts: {
                  __typename: previousResult.searchPosts.__typename,
                  // Merging the post list
                  posts: [...previousResult.searchPosts.posts, ...newTags],
                  totalCount
                }
              };
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    },
    newSearch() {
      this.$router.push({
        name: "search",
        query: { search: this.searchInput }
      });
    }
  },
  head() {
    return {
      title: "Search"
    };
  }
};
</script>
<style lang="scss" scoped>
.search-wrapper {
  width: 100%;
  display: flex;
  margin-bottom: 28px;
  input {
    border-bottom: 1px solid $gray-color;
    margin-bottom: 16px;
    font-weight: $display-font-weight;
    font-size: $text-4xl;
  }
  h2 {
    color: $gray-color;
    padding-right: 16px;
    align-self: center;
  }
}

.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
  min-height: 100vh;
}
</style>
