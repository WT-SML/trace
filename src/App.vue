<template>
  <div class="app">
    <div class="my-header">
      <myHeader />
    </div>
    <div class="my-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </div>
    <div class="my-footer">
      <myFooter />
    </div>
  </div>
  <!-- 全局安全验证组件：滑动验证 -->
  <slideToUnlock />
  <!-- 全局提示组件 -->
  <msg />
  <!-- 回到顶部 -->
  <backtop />
</template>

<script>
import myHeader from "../src/components/common/header.vue";
import myFooter from "../src/components/common/footer.vue";
import slideToUnlock from "../src/components/safety/slide-to-unlock.vue";
import backtop from "../src/components/common/backtop.vue";
import msg from "../src/components/feedback/msg.vue";
export default {
  name: "App",
  components: { myHeader, myFooter, slideToUnlock, msg, backtop },
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
    z-index: 999;
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
