<template>
  <div :class="`backtop ${isShow ? 'scale-1' : ''}`" @click="backtop()">
    <i class="fa fa-caret-up"></i>
  </div>
</template>

<script>
import $ from "jquery";
import { reactive, onMounted, toRefs } from "vue";

export default {
  name: "backtop",
  setup(props, ctx) {
    const state = reactive({
      isShow: false,
    });
    const methods = {
      backtop() {
        $("html,body").animate({ scrollTop: "0px" }, 0);
      },
    };
    onMounted(() => {
      window.onscroll = () => {
        const t = document.documentElement.scrollTop || document.body.scrollTop;
        state.isShow = t > 500;
      };
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.scale-1 {
  transform: scale(1) !important;
}
.backtop {
  transform: scale(0);
  right: 40px;
  bottom: 40px;
  position: fixed;
  background-color: #fff;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  color: var(--bs-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  transition: all ease 0.3s;
  &:hover {
    background-color: #f2f6fc;
  }
}
</style>