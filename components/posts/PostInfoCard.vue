<template>
  <nuxt-link
    :to="{
      name: 'post',
      params: { post: post.id }
    }"
    tag="article"
  >
    <div class="image-wrapper">
      <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" />
      <img
        v-else
        :src="
          `https://via.placeholder.com/1080X720.png/E5E5E5/808080?text=${imgPlaceholder}`
        "
        :alt="post.title"
      />
    </div>
    <div class="content">
      <div class="meta">
        <time>{{ $moment(post.dateCreated).format("MMM Do, YYYY ") }}</time>
      </div>
      <h1>{{ post.title }}</h1>
      <div class="description">
        <p>
          {{ post.description }}
        </p>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  components: {},
  props: {
    post: {
      type: Object,
      default: null
    }
  },
  computed: {
    imgPlaceholder() {
      const maxLenght = 4;
      if (this.post.title && this.post.title.split(" ").length > maxLenght) {
        const shortened = this.post.title
          .split(" ")
          .slice(0, maxLenght)
          .join(" ")
          .concat("...");
        return shortened;
      }
      return this.post.title;
    }
  }
};
</script>

<style lang="scss" scoped>
article {
  overflow: hidden;
  cursor: pointer;
  padding: 1%;
  &:hover {
    box-shadow: $small-shadow;
    .content {
      box-shadow: none;
    }

    h1 {
      color: $primary-color;
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $elevated-surface-color;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.06);
    min-height: 200px;
    h1 {
      font-size: $text-lg;
      padding-top: 0.5rem;
      letter-spacing: $-ls2;
      margin-bottom: 0.5rem;
    }
    .description {
      font-size: $text-xs;
      letter-spacing: $-ls2;
      line-height: 1.3rem;
      color: $gray-color;
      span {
        margin-top: 0.5rem;
        color: $primary-color;
        display: flex;
        &:hover {
          color: #027fff;
        }
        svg {
          align-self: center;
        }
      }
    }
  }
  .meta {
    font-size: $text-ss;
    letter-spacing: $-ls2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 0.2rem;
    time {
      color: $gray-color;
      margin-right: auto;
    }
  }
}
</style>
