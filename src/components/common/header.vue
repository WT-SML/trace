<template>
  <div class="header">
    <div
      class="
        main
        mx-auto
        d-flex
        justify-content-between
        align-items-center
        h-100
      "
    >
      <!-- left -->
      <div class="left d-flex align-items-center">
        <img class="logo" :src="logo" alt="logo" />
        <span class="mx-2 text-muted">|</span>
        <div class="fw-bold me-5">苏墨璃 · 痕迹</div>
        <!-- 菜单 -->
        <div class="nav-list h-100 d-flex">
          <div :class="`nav-item ${$route.path === '/' ? 'active' : ''}`">
            首页
          </div>
          <expand
            title="游戏"
            :customClass="`nav-item ${$route.path === '/g' ? 'active' : ''}`"
          >
            <div>loading</div>
          </expand>
        </div>
      </div>
      <!-- right -->
      <div class="right">登录</div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import logo from "../../assets/imgs/logo.png";
import expand from "./expand.vue";
export default {
  name: "myHeader",
  components: {
    expand,
  },
  setup() {
    // 状态
    const state = reactive({
      logo,
      navList: [
        {
          name: "首页",
          path: "/",
          isExpand: false,
        },
        {
          name: "游戏",
          path: "/g",
          isExpand: true,
        },
      ],
    });
    // 方法
    const methods = {};
    // 返回
    return {
      ...state,
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 62px;
  background-color: #2d2f33;
  font-size: 14px;
  color: #ffffff;
  .main {
    width: 1200px;
    background-color: #2d2f33;
    .left {
      .logo {
        height: 45px;
      }
      .nav-list {
        $active-bgc: #ffffff2e;
        .nav-item {
          width: 68px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          &:hover {
            background-color: $active-bgc;
            transition: all ease 0.3s;
          }
        }
        .active {
          background-color: $active-bgc;
          transition: all ease 0.3s;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
