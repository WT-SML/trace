<template>
  <div class="send">
    <sendComment />
  </div>
</template>

<script>
import sendComment from "./send-comment.vue";
export default {
  name: "comment",
  components: {
    sendComment,
  },
};
</script>

<style lang="scss" scoped>
</style>
