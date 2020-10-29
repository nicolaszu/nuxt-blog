<template>
  <component
    :is="el(post.type)"
    :to="{
      name: 'post-post',
      params: { post: post.id }
    }"
    :href="post.urlContent"
    class="card-wrapper w-full flex flex-row  p-4 gap-5 rounded-xl  cursor-pointer overflow-hidden"
  >
    <img
      v-if="post.coverImage"
      :src="post.coverImage"
      :alt="post.title"
      class="rounded-xl"
    />
    <img
      v-else
      :src="
        `https://via.placeholder.com/1080X720.png/dfe8ef/808080?text=${imgPlaceholder}`
      "
      :alt="post.title"
      class="rounded-xl"
    />
    <div class="flex flex-col gap-2">
      <p class="text-gray-700 font-bold text-xs">Techology</p>
      <h3 class="title font-bold text-xl font-title">{{ post.title }}</h3>
      <p class="description text-xs overflow-hidden">
        {{ post.description }}
      </p>
      <meta-info :author="post.author" :date="post.dateCreated" />
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
  @apply transition-shadow duration-100 ease-in;
  &:hover {
    box-shadow: 0 2px 2px rgba(154, 160, 185, 0.05),
      0 5px 20px rgba(166, 173, 201, 0.2);
  }
}
.description {
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
