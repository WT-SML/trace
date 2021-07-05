<template>
  <div class="loading">
    <i class="fa fa-cog fa-spin fa-2x"></i>
    <div class="loading-text">加载中...</div>
  </div>
</template>

<script>
export default {
  name: "loading",
};
</script>

<style lang="scss" scoped>
.loading {
  color: #666;
  text-align: center;
  margin: 0 auto;
  .loading-text {
    margin-top: 10px;
    font-size: 14px;
    transform: translateX(4px);
  }
}
</style>
