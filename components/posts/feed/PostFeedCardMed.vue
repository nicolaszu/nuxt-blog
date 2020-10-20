<template>
  <div
    class="card-wrapper w-full flex flex-row py-4 px-4 gap-5 hover:shadow-xs hover:bg-gray-100 cursor-pointer"
  >
    <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" />
    <img
      v-else
      :src="
        `https://via.placeholder.com/1080X720.png/dfe8ef/808080?text=${imgPlaceholder}`
      "
      :alt="post.title"
    />
    <div class="flex flex-col gap-2">
      <p class="text-gray-700 font-bold text-xs">Techology</p>
      <h3 class="title font-bold text-xl">{{ post.title }}</h3>
      <p class="description text-xs overflow-hidden">
        {{ post.description }}
      </p>
      <p class="text-gray-700 text-xs">
        <strong>{{ post.author }}</strong> on
        <time>{{ $moment(post.dateCreated).format("MMM Do, YYYY ") }}</time>
      </p>
    </div>
  </div>
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
$max-height: 10.5rem;

img {
  width: 396px;
  height: auto;
  object-fit: cover;
}
.card-wrapper {
  height: $max-height;

  &:hover {
    .title {
      @apply text-blue-700;
    }
  }
}
.description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
