<template>
  <article>
    <template v-if="$apollo.queries.post.loading">
      <content-placeholders rounded>
        <content-placeholders-heading />
        <content-placeholders-img />
        <content-placeholders-text :lines="50" />
      </content-placeholders>
    </template>
    <template v-else-if="error">
      error
    </template>
    <template v-else>
      <header>
        <h1>{{ post.title }}</h1>
        <div class="info">
          <span class="item">{{ post.author }} •</span>
          <time class="item">
            {{ $moment(post.dateCreated).format("MMM Do, YYYY ") }}
          </time>
          <!-- <dropdown
            :options="settingsDropdown"
            class="item"
            @selected="dropdownAction"
          >
            <template #options>
              <div class="option danger" @click="deletePost">
                <delete-icon />
                <p>Delete Post</p>
              </div>
            </template>
          </dropdown> -->
        </div>
        <div class="tags">
          <nuxt-link
            v-for="tag in post.tags"
            :key="tag"
            class="tag"
            :to="{ name: 'search', query: { search: tag } }"
          >
            #{{ tag }}
          </nuxt-link>
        </div>
        <div v-if="post.coverImage" class="image-wrapper">
          <img :src="post.coverImage" :alt="post.title" />
        </div>
      </header>
      <div class="content" v-highlightjs v-html="post.htmlContent" />
    </template>
  </article>
</template>

<script>
import post from "~/apollo/queries/post";
import deletePost from "~/apollo/queries/deletePost";
// import dropdown from "~/components/utilities/Dropdown";
// import deleteIcon from "@/assets/icons/utility/delete.svg?inline";

export default {
  // components: { dropdown, deleteIcon },
  apollo: {
    post: {
      prefetch: true,
      query: post,
      variables() {
        return {
          id: this.routeId
        };
      },
      error(error) {
        this.error = JSON.stringify(error.message);
      }
    }
  },
  data() {
    return {
      post: {},
      routeId: this.$route.params.post,
      error: null,
      settingsDropdown: {
        Edit: "editPost"
      }
    };
  },
  methods: {
    dropdownAction(functionName) {
      this[functionName]();
    },
    async deletePost() {
      try {
        await this.$apollo.mutate({
          mutation: deletePost,
          variables: {
            id: this.$route.params.post
          }
        });
        this.$toast.show({ message: "Post Deleted", variant: "success" });
        this.$router.push({
          name: "index"
        });
      } catch (e) {
        this.$toast.show({ message: e, variant: "error" });
      }
    },
    editPost() {
      this.$router.push({
        name: "create-write",
        query: { edit: this.$route.params.post }
      });
    }
  },

  head() {
    return {
      title: this.post.title
    };
  }
};
</script>

<style lang="scss" scoped>
article {
  padding: 0.5rem;
  border-radius: 1rem;
}
header {
  margin-bottom: 1rem;
  h1 {
    font-size: $text-4xl;
    letter-spacing: $-ls2;
    margin-bottom: 0.5rem;
  }
  .info {
    display: flex;
    color: $dark-gray-color;
    font-size: $text-sm;
    margin-bottom: 1rem;
    span {
      font-weight: $display-font-weight;
    }
    .item {
      margin: 3px;
    }
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    font-size: $text-xs;
    .tag {
      padding: 2px 10px;
      background-color: $primary-light;
      line-height: 1;
      padding: 0.5rem 0.5rem;
      margin: 0 0.5rem 0.5rem 0;
      &:hover {
        background: $primary-dark;
      }
      &:active {
        background: transparent;
        box-shadow: $small-inner-shadow;
      }
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $primary-dark;
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    overflow: hidden;
    @media (min-width: $screen-md) {
      margin-bottom: 2rem;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: white;
    }
  }
}

.danger {
  color: #eb5757 !important;
  fill: #eb5757 !important;
  &:hover {
    background: #ffe6e6 !important;
    color: #eb5757 !important;
    svg {
      fill: #eb5757 !important;
    }
  }
}
</style>
