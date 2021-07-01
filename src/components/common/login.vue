<template>
  <div class="login" v-show="isComponentShow">
    <div :class="`mask ${isMaskShow ? 'mask-show' : ''}`">
      <div :class="`box ${isLoginBoxShow ? 'box-show' : ''} `">
        <i @click="$emit('close')" class="fa fa-close"></i>
        <div class="tabs mb-4">
          <div
            :class="`tab-item ${tabs.active === 0 ? 'active' : ''}`"
            @click="tabs.active = 0"
          >
            短信登录
          </div>
          <div
            :class="`tab-item ${tabs.active === 1 ? 'active' : ''}`"
            @click="tabs.active = 1"
          >
            密码登录
          </div>
        </div>
        <div v-if="tabs.active === 0">
          <div class="form">
            <input type="text" class="form-control" placeholder="手机号" />
            <div class="position-relative">
              <input
                type="text"
                class="form-control"
                placeholder="短信验证码"
                maxlength="6"
              />
              <span
                class="get-check-code cp text-primary"
                @click="isSlideToUnlockShow = true"
                >获取短信验证码</span
              >
            </div>
          </div>
        </div>
        <div v-else>
          <div class="form">
            <input
              type="text"
              class="form-control"
              placeholder="手机号/邮箱/UID"
            />
            <div class="position-relative">
              <input
                type="password"
                class="form-control"
                placeholder="密码"
                maxlength="18"
              />
              <span class="forgot-password cp text-primary">忘记密码？</span>
            </div>
          </div>
        </div>
        <div class="d-grid my-4">
          <button class="btn btn-primary text-white" type="button">
            {{ tabs.active === 0 ? "注册/" : "" }}登录
          </button>
        </div>
        <div class="mt-4">
          未注册手机验证后自动登录，注册即代表同意
          <router-link class="link text-primary" to="/terms" target="_blank">
            《痕迹社区用户服务协议》
          </router-link>
          <router-link class="link text-primary" to="/privacy" target="_blank">
            《痕迹社区个人信息及隐私保护政策》
          </router-link>
        </div>
      </div>
    </div>
    <!-- 安全验证 -->
    <slideToUnlock
      :isShow="isSlideToUnlockShow"
      @close="isSlideToUnlockShow = false"
    />
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
import slideToUnlock from "../safety/slide-to-unlock.vue";
export default {
  name: "login",
  components: {
    slideToUnlock,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      isComponentShow: false,
      isMaskShow: false,
      isLoginBoxShow: false,
      tabs: {
        active: 0,
        0: {
          form: {},
        },
        1: {
          form: {},
        },
      },
      isUnlock: false,
      isSlideToUnlockShow: true,
    });
    watch(
      () => props.isShow,
      (newVal, oldVal) => {
        if (newVal) {
          state.isComponentShow = true;
          setTimeout(() => {
            state.isMaskShow = true;
            state.isLoginBoxShow = true;
          });
          document.body.style.overflowY = "hidden";
        } else {
          state.isMaskShow = false;
          state.isLoginBoxShow = false;
          setTimeout(() => {
            state.isComponentShow = false;
          }, 300);
          document.body.style.overflowY = "auto";
        }
      }
    );
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  z-index: 100000;
  .mask-show {
    background-color: rgba($color: #000000, $alpha: 0.5) !important;
  }
  .mask {
    background-color: rgba($color: #000000, $alpha: 0);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all ease 0.3s;
    .box {
      width: 400px;
      padding: 30px;
      border-radius: 4px;
      background-color: #fff;
      transform: scale(0);
      transition: all ease 0.3s;
      color: #333333;
      position: relative;
      .fa-close {
        position: absolute;
        cursor: pointer;
        right: 13px;
        top: 13px;
      }
      .tabs {
        .tab-item {
          display: inline-block;
          font-size: 16px;
          margin-right: 24px;
          cursor: pointer;
          padding-bottom: 6px;
        }
        .active {
          font-weight: bold;
          border-bottom: 3px var(--bs-primary) solid;
        }
      }
      .form-control {
        border-radius: 0;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        padding: 8px 0;
        margin-bottom: 16px;
        font-size: 14px;
        &:focus {
          box-shadow: none;
        }
      }
      .get-check-code,
      .forgot-password {
        position: absolute;
        right: 0;
        top: 12px;
      }
      .link {
        text-decoration: none;
      }
    }

    .box-show {
      transform: scale(1);
    }
  }
}
</style>
