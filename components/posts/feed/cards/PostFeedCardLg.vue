<template>
  <component
    :is="el(post.type)"
    :to="{
      name: 'post-post',
      params: { post: post.id }
    }"
    :href="post.urlContent"
    class="card-wrapper w-full flex flex-col  gap-5 cursor-pointer"
  >
    <img v-if="post.coverImage" :src="post.coverImage" :alt="post.title" />
    <img
      v-else
      :src="
        `https://via.placeholder.com/1080X720.png/dfe8ef/808080?text=${imgPlaceholder}`
      "
      :alt="post.title"
    />
    <div class="flex flex-col gap-2 py-2 px-8">
      <p class="text-gray-700 font-bold ">Techology</p>
      <h3 class="title font-bold text-2xl font-title">{{ post.title }}</h3>
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
  height: 350px;
  object-fit: cover;
}
.card-wrapper {
  @apply bg-white rounded-xl flex flex-col overflow-hidden flex-auto no-underline transition-shadow duration-200 ease-in;
  box-shadow: 0 5px 10px rgba(154, 160, 185, 0.05),
    0 15px 40px rgba(166, 173, 201, 0.2);
  height: 511px;
  width: 707px;
  &:hover {
    box-shadow: 0 2px 2px rgba(154, 160, 185, 0.05),
      0 5px 20px rgba(166, 173, 201, 0.2);
  }
}
</style>
