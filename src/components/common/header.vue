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
        <router-link to="/">
          <img class="logo" :src="logo" alt="logo" />
        </router-link>
        <span class="mx-2 text-muted">|</span>
        <div class="fw-bold me-5">苏墨璃 · 痕迹</div>
        <!-- 菜单 -->
        <div class="nav-list h-100 d-flex">
          <router-link
            to="/"
            :class="`nav-item ${$route.path === '/' ? 'active' : ''}`"
          >
            首页
          </router-link>
          <expand
            title="游戏"
            :customClass="`nav-item ${$route.path === '/g' ? 'active' : ''}`"
            titleLink="/g"
          >
            <div>
              <div class="hot-games">热门游戏</div>
              <div class="row">
                <div v-for="item in 12" :key="item" class="col-4">
                  <router-link class="game-item" to="/g/wzry">
                    王者荣耀
                  </router-link>
                </div>
              </div>
              <router-link target="_blank" to="/g" class="more">
                <span>更多</span>
                <i class="fa fa-angle-right ms-1"></i>
              </router-link>
            </div>
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
          color: #fff;
          text-decoration: none;
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
        .hot-games {
          color: #333;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .game-item {
          display: inline-block;
          width: 80px;
          height: 30px;
          line-height: 30px;
          border: 1px solid #e3e7e8;
          text-align: center;
          border-radius: 13px;
          color: #333;
          text-decoration: none;
          font-size: 12px;
          white-space: nowrap;
          word-wrap: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 8px;
          cursor: pointer;
          &:hover {
            color: #fff;
            background-color: #00c3ff;
          }
        }
        .more {
          display: block;
          text-decoration: none;
          font-size: 12px;
          height: 28px;
          line-height: 28px;
          border-radius: 14px;
          color: #555;
          background-color: #f1f2f4;
          text-align: center;
          &:hover {
            color: #fff;
            background-color: #00c3ff;
          }
        }
      }
    }
  }
}
</style>
