<template>
  <div
    :class="`mask ${isMaskShow ? 'mask-show' : ''}`"
    @click.self="$emit('closeMask')"
    v-show="isComponentShow"
  >
    <div :class="`content ${isContentShow ? 'content-show' : ''} `">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
import { reactive, watch, toRefs, onMounted } from "vue";
export default {
  name: "myMask",
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
      isContentShow: false,
    });

    const methods = {
      setShow() {
        state.isComponentShow = true;
        setTimeout(() => {
          state.isMaskShow = true;
          state.isContentShow = true;
        });
        document.body.style.overflowY = "hidden";
      },
      setHidden() {
        state.isMaskShow = false;
        state.isContentShow = false;
        setTimeout(() => {
          state.isComponentShow = false;
        }, 300);
        document.body.style.overflowY = "auto";
      },
    };
    onMounted(() => {
      if (props.isShow) {
        methods.setShow();
      }
    });
    watch(
      () => props.isShow,
      (newVal, oldVal) => {
        if (newVal) {
          methods.setShow();
        } else {
          methods.setHidden();
        }
      }
    );
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
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
  z-index: 1000;
  .content {
    transform: scale(0);
    transition: all ease 0.3s;
  }
  .content-show {
    transform: scale(1);
  }
}
</style>
