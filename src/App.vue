<template>
  <div class="app">
    <div class="my-header">
      <my-header />
    </div>
    <div class="my-main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </div>
    <div class="my-footer">
      <my-footer />
    </div>
  </div>
</template>

<script>
import myHeader from "../src/components/common/header.vue";
import myFooter from "../src/components/common/footer.vue";
export default {
  name: "App",
  components: { myHeader, myFooter },
  setup() {},
};
</script>
<style lang="scss" scoped>
.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  .my-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99999;
  }
  .my-footer {
    flex-shrink: 0;
  }
  .my-main {
    flex: 1 0 auto;
    margin-top: 62px;
  }
}
</style>
