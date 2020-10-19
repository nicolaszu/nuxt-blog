<template>
  <div
    class="card-wrapper w-full flex flex-row py-4 px-4 gap-5 hover:shadow-xs hover:bg-gray-100 cursor-pointer"
  >
    <img
      :src="`https://via.placeholder.com/1080X720.png/dfe8ef/808080?text=Hello`"
    />
    <div class="flex flex-col gap-2">
      <p class="text-gray-700 font-bold text-xs">Techology</p>
      <h3 class="title font-bold text-xl">How do we</h3>
      <p class="description text-xs overflow-hidden">
        Let’s dive deep into how you can keep safe from neural data breaches and
        other scary stuff like that.Let’s dive deep into how you can keep safe
        from neural data breaches and othe from neural data breaches and other
        scary stuff like that.nto how you can keep safe from neural data
        breaches and other scary stuff like that.Let’s dive deep into how you
        can keep safe from neural data breaches and othe from neural data
        breaches and other scary stuff like that.
      </p>
      <p class="text-gray-700 text-xs">
        <strong>By Nicolas</strong> on september 24 2020
      </p>
    </div>
  </div>
</template>

<script>
export default {};
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
