<template>
  <div class="page-wrapper">
    <div class="article-content-wrapper">
      <post-content class="article-block" />
    </div>
  </div>
</template>

<script>
import PostContent from "@/components/posts/PostContent";
export default {
  components: {
    PostContent
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  max-width: $screen-xl;
  margin: auto;
  padding: 1rem;
}
.article-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  margin-bottom: 2rem;
  justify-content: center;
  @media (min-width: $screen-lg) {
    align-items: normal;
    flex-direction: row;
  }
  .article-block {
    width: 100%;
    max-width: 880px;
    @media (min-width: $screen-lg) {
      margin-right: 1rem;
      width: 66.66666%;
      margin-bottom: 2rem;
    }
  }
}
</style>
