<template>
  <div v-show="isShow" class="slide-to-unlock-mask">
    <div class="main rounded">
      <div class="title d-flex justify-content-between p-3 border-bottom">
        <span>请完成安全验证</span>
        <span>
          <i class="fa fa-close cp" @click="$emit('close')"></i>
        </span>
      </div>
      <div class="slide-to-unlock my-4 mx-5">
        <div
          :class="`slider-box ${statusMap[status].class}`"
          :style="`width:${slideWidth}px`"
        >
          <div v-show="status === 2" class="tip">
            {{ statusMap[status].tip }}
          </div>
          <span
            class="slider"
            @mousedown="handleMousedown"
            @mouseup="handleMouseup"
          >
            <i :class="`fa fa-${statusMap[status].icon}`"></i>
          </span>
        </div>
        <span class="tip">{{ statusMap[status].tip }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import $ from "jquery";
export default {
  name: "slideToUnlock",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      practicalWidth: 340, // 实际宽度
      slideWidth: 40, // 划过区域的宽度
      // status : 0=>初始 1=>滑动中 2=>成功 3=>失败
      status: 0,
      statusMap: {
        0: {
          icon: "arrow-right",
          class: "",
          tip: "向右拖动滑块完成验证",
        },
        1: {
          icon: "arrow-right",
          class: "moving",
          tip: "向右拖动滑块完成验证",
        },
        2: {
          icon: "check",
          class: "success",
          tip: "验证成功",
        },
        3: {
          icon: "close",
          class: "error",
          tip: "验证失败",
        },
      },
    });
    const methods = {
      handleMousedown(e) {
        if (state.status === 2) {
          return false;
        }
        state.status = 1;
        // 获取x坐标
        const x = e.clientX;
        // 获取组件实际宽度
        const practicalWidth = $(".slide-to-unlock").outerWidth();
        state.practicalWidth = practicalWidth;
        // 监听 document 的鼠标移动事件
        $(document).on("mousemove", (e) => {
          let dv = e.clientX - x; // 差值
          let newWidth = 40 + dv;
          if (newWidth < 40) {
            state.slideWidth = 40;
          } else if (newWidth > practicalWidth) {
            state.slideWidth = practicalWidth;
          } else {
            state.slideWidth = newWidth;
          }
        });
      },
      handleMouseup(e) {
        if (state.status === 0 || state.status === 2 || state.status === 3) {
          return false;
        }
        $(document).off("mousemove");
        if (state.slideWidth < state.practicalWidth) {
          // 失败
          state.status = 3;
          setTimeout(() => {
            state.status = 0;
            state.slideWidth = 40;
          }, 100);
        } else {
          // 成功
          state.status = 2;
          setTimeout(() => {
            ctx.emit("close");
          }, 300);
        }
      },
      reset() {
        state.width = 40;
        state.status = 0;
      },
    };
    onMounted(() => {
      $(document).on("mouseup", methods.handleMouseup);
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.slide-to-unlock-mask {
  z-index: 100001;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    background-color: #fff;
    .title {
      color: #666;
    }
    .slide-to-unlock {
      width: 340px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      border-radius: 2px;
      color: #fff;
      background-color: #d0d0d0;
      .tip {
        user-select: none;
      }
      .slider-box {
        background-color: #d0d0d0;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        .tip {
          width: 100%;
          transform: translateX(20px);
          user-select: none;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .slider {
          width: 40px;
          border-radius: 2px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #666;
          border: 1px solid #ccc;
          background-color: #fff;
          cursor: pointer;
        }
      }
      .success {
        background-color: var(--bs-green);
        .slider {
          border-color: var(--bs-green);
          .fa {
            color: var(--bs-green);
          }
        }
      }
      .error {
        background-color: var(--bs-red);
        .slider {
          border-color: var(--bs-red);
          .fa {
            color: var(--bs-red);
          }
        }
      }
      .moving {
        background-color: var(--bs-primary);
      }
    }
  }
}
</style>