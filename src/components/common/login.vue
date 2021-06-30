<template>
  <div class="login" v-show="isComponentShow">
    <div
      :class="`mask ${isMaskShow ? 'mask-show' : ''}`"
      @click.self="$emit('close')"
    >
      <div :class="`box ${isLoginBoxShow ? 'box-show' : ''}`"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from "vue";
export default {
  name: "login",
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
  z-index: 99999;
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
      width: 300px;
      height: 300px;
      background-color: #fff;
      transform: scale(0);
      transition: all ease 0.3s;
    }
    .box-show {
      transform: scale(1) !important;
    }
  }
}
</style>
