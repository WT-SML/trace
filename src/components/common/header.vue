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
          <!-- 首页 -->
          <router-link
            v-for="item in navList"
            :to="item.path"
            :key="item.path"
            :class="`nav-item ${$route.path === item.path ? 'active' : ''}`"
          >
            {{ item.name }}
          </router-link>
          <!-- 游戏 -->
          <!-- <expand>
            <template #title>
              <router-link
                to="/g"
                :class="`nav-item  ${$route.path === '/g' ? 'active' : ''}`"
              >
                <span>游戏</span>
                <i class="fa fa-angle-down ms-1"></i>
              </router-link>
            </template>
            <template #main>
              <div class="hot-games">热门游戏</div>
              <div class="row px-2">
                <div v-for="item in 12" :key="item" class="col-4 px-1">
                  <router-link class="game-item" to="/g/wzry">
                    王者荣耀
                  </router-link>
                </div>
              </div>
              <router-link target="_blank" to="/g" class="more">
                <span>更多</span>
                <i class="fa fa-angle-right ms-1"></i>
              </router-link>
            </template>
          </expand> -->
        </div>
      </div>
      <!-- right -->
      <div class="right">
        <!-- search box -->
        <div class="search">
          <input type="text" class="input" placeholder="搜索" />
          <i class="fa fa-search icon"></i>
        </div>
        <!-- user -->
        <div v-if="user" class="user">
          <expand>
            <template #title>
              <router-link :to="`/u/${user.id}`" class="nav-item">
                <img
                  class="rounded-circle border bg-white"
                  width="36"
                  height="36"
                  :src="user.avatar"
                  alt="avatar"
                />
              </router-link>
            </template>
            <template #main>
              <div class="text-success">个人中心</div>
            </template>
          </expand>
        </div>
        <!-- login -->
        <div v-else class="login">
          <span class="login-btn" @click="handleLoginBtnClick()">登录</span>
          <login
            :isShow="isLoginComponentShow"
            @close-login-component="isLoginComponentShow = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, toRefs } from "vue";
import logo from "../../assets/imgs/logo.png";
import expand from "./expand.vue";
import login from "./login.vue";

export default {
  name: "myHeader",
  components: {
    expand,
    login,
  },
  setup() {
    // 状态
    const state = reactive({
      isLoginComponentShow: false,
      logo,
      user: null,
      // user: {
      //   id: 10001,
      //   name: "飞翔的丘丘人",
      //   avatar: "https://img-static.mihoyo.com/avatar/avatar1.png",
      // },
      navList: [
        {
          name: "首页",
          path: "/index",
          isExpand: false,
        },
      ],
    });
    // 方法
    const methods = {
      handleLoginBtnClick() {
        state.isLoginComponentShow = true;
      },
    };
    onMounted(() => {
      if (localStorage.getItem("currentGame")) {
        const currentGame = JSON.parse(localStorage.getItem("currentGame"));
        state.navList.push({
          name: currentGame.name,
          path: `/g/${currentGame.gid}`,
          isExpand: false,
        });
      }
    });
    // 返回
    return {
      ...toRefs(state),
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
    $active-bgc: #ffffff2e;
    .left {
      .logo {
        height: 45px;
      }
      .nav-list {
        .nav-item {
          min-width: 68px;
          padding: 0 20px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          .fa-angle-down {
            transition: all ease 0.3s;
          }
          &:hover {
            background-color: $active-bgc;
            .fa-angle-down {
              transform: rotate(180deg);
            }
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
          padding: 0 10px;
          display: inline-block;
          width: 100%;
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
            background-color: var(--bs-primary);
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
            background-color: var(--bs-primary);
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      .search {
        .input {
          height: 30px;
          border-radius: 15px;
          border: none;
          padding: 0 36px 0 15px;
          background-color: #ffffff38;
          color: #fff;
          width: 130px;
          transition: all ease 0.3s;
          &:focus {
            outline: none;
            width: 190px;
          }
          &::-webkit-input-placeholder {
            color: #fff;
          }
        }
        .icon {
          transform: translateX(-37px) translateY(-1px);
          cursor: pointer;
          padding: 9px 12px;
        }
      }
      .user {
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
          }
        }
      }
      .login {
        display: flex;
        align-items: center;
        .login-btn {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
