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
          <span>Nicolas Zuluaga •</span>
          <time>
            {{ $moment(post.dateCreated).format("MMM Do, YYYY ") }}
          </time>
        </div>
        <div class="tags">
          <nuxt-link
            v-for="tag in post.tags"
            :key="tag"
            class="tag"
            :to="{ name: 'index', query: { tag, filter: 'top=365' } }"
          >
            #{{ tag }}
          </nuxt-link>
        </div>
        <div v-if="post.coverImage" class="image-wrapper">
          <img :src="post.coverImage" :alt="post.title" />
        </div>
      </header>
      <div class="content" v-html="post.htmlContent" />
    </template>
  </article>
</template>

<script>
import post from "~/apollo/queries/post";

export default {
  components: {},
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
      error: null
    };
  },
  // activated() {
  //   if (this.$fetchState.timestamp <= Date.now() - 60000) {
  //     this.$fetch();
  //   }
  // },
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
    color: $dark-gray-color;
    font-size: $text-sm;
    margin-bottom: 1rem;
    span {
      font-weight: $display-font-weight;
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
      object-fit: cover;
    }
  }
}
::v-deep .content {
  .ltag__user {
    display: none;
  }
  iframe {
    max-width: 100%;
  }
  h1 {
    font-size: $text-3xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h2 {
    font-size: $text-2xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h3 {
    font-size: $text-xl;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  h4 {
    font-size: $text-base;
    margin-top: 2rem;
    margin-bottom: 1rem;
    letter-spacing: $-ls2;
  }
  a {
    color: $primary-color;
  }
  p {
    margin-bottom: 1rem;
    line-height: 1.4;
    code {
      background-color: #d2f3e1;
      border-radius: 0.25rem;
      padding: 0.25rem;
    }
  }
  img {
    width: 100%;
    border-radius: 0.5rem;
  }
  .highlight {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
  }
  ul {
    list-style: numeral;
    margin-bottom: 1rem;
    li p {
      margin-bottom: 0;
    }
  }
  ol {
    margin-bottom: 1rem;
  }
}
</style>
