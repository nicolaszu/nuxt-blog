<template>
  <component
    :is="el(post.type)"
    :to="{
      name: 'post-post',
      params: { post: post.id }
    }"
    :href="post.urlContent"
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
  </component>
</template>

<script>
import postCardsMixin from "@/mixins/postCards";

export default {
  mixins: [postCardsMixin]
};
</script>

<style lang="scss" scoped>
img {
  width: 400px;
  height: 200px;
  object-fit: cover;
}
.card-wrapper {
  height: fit-content;

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
