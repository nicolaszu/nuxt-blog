<template>
  <component
    :is="el(post.type)"
    :to="{
      name: 'post-post',
      params: { post: post.id }
    }"
    :href="post.urlContent"
    class="card-wrapper w-full flex flex-col py-4 px-4 gap-5 rounded-xl hover:bg-gray-100 cursor-pointer"
  >
    <div class="flex flex-col gap-2">
      <p class="text-gray-700 font-bold text-xs">Science</p>
      <h3 class="title font-bold text-lg font-title ">{{ post.title }}</h3>

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
  width: auto;
  height: auto;
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
