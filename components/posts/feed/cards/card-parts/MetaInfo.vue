<template>
  <p class="text-gray-700 text-xs">
    <strong>By {{ author }}</strong> on
    <time>{{ $moment(date).format("MMM Do, YYYY ") }}</time>
  </p>
</template>

<script>
export default {
  props: {
    author: {
      type: String,
      required: true
    },
    date: {
      type: Number,
      required: true
    }
  }
};
</script>
