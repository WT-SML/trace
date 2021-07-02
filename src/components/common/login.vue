<template>
  <myMask :isShow="isShow">
    <template #content>
      <div class="login">
        <i @click="$emit('closeLoginComponent')" class="fa fa-close"></i>
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
              <span class="get-check-code cp text-primary">
                获取短信验证码
              </span>
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
          <button
            class="btn btn-primary text-white"
            type="button"
            @click="submit()"
          >
            {{ tabs.active === 0 ? "注册/" : "" }}登录
          </button>
        </div>
        <div class="mt-4 small">
          未注册手机验证后自动登录，注册/登录即代表同意
          <router-link class="link text-primary" to="/terms" target="_blank">
            《痕迹社区用户服务协议》
          </router-link>
          <router-link class="link text-primary" to="/privacy" target="_blank">
            《痕迹社区个人信息及隐私保护政策》
          </router-link>
        </div>
      </div>
    </template>
  </myMask>
</template>

<script>
import { reactive, toRefs } from "vue";
import myMask from "./mask.vue";
import { safetyVerification } from "../../utils";

export default {
  name: "login",
  components: {
    myMask,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      tabs: {
        active: 0,
        0: {
          form: {},
        },
        1: {
          form: {},
        },
      },
    });
    const methods = {
      async submit() {
        // 进行安全验证
        await safetyVerification();
      },
    };
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  padding: 30px;
  border-radius: 4px;
  background-color: #fff;
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
</style>
