<template>
  <div class="msg-component">
    <div class="msg-box" v-for="item in msgs" :key="item.id">
      <div :class="`msg msg-${item.type} ${item.customClass}`">
        {{ item.msg }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, onMounted } from "vue";
import emitter from "../../utils/emitter";
export default {
  name: "msg",
  setup(props, ctx) {
    const state = reactive({
      msgs: [],
    });
    const methods = {};
    onMounted(() => {
      // 监听
      emitter.on("showMsg", (msg) => {
        let id = new Date().getTime();
        let msgObj = {
          id,
          msg: msg.msg,
          type: msg.type,
          delay: msg.delay,
          customClass: "",
        };
        state.msgs.push(msgObj);
        setTimeout(() => {
          for (let k in state.msgs) {
            if (state.msgs[k].id === id) {
              state.msgs[k].customClass = "msg-enter";
            }
          }
        });
        setTimeout(() => {
          for (let k in state.msgs) {
            if (state.msgs[k].id === id) {
              state.msgs[k].customClass = "msg-leave";
            }
          }
        }, msgObj.delay - 300);
        setTimeout(() => {
          for (let k in state.msgs) {
            if (state.msgs[k].id === id) {
              state.msgs.splice(k, 1);
            }
          }
        }, msgObj.delay);
      });
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.msg-component {
  z-index: 1001;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  .msg-box {
    &:first-child {
      margin-top: 90px;
    }
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .msg {
      margin: 0 auto;
      border-radius: 4px;
      color: #fff;
      padding: 10px 20px;
      font-size: 14px;
      display: inline-block;
      transition: all ease 0.3s;
      max-width: 800px;
      opacity: 0;
      transform: translateY(30px);
    }
    .msg-enter {
      opacity: 1;
      transform: translateY(0px);
    }
    .msg-leave {
      transform: translateY(-30px);
      opacity: 0;
    }
    .msg-info {
      background-color: var(--bs-primary);
    }
    .msg-success {
      background-color: var(--bs-green);
    }
    .msg-warning {
      background-color: var(--bs-yellow);
    }
    .msg-error {
      background-color: var(--bs-red);
    }
  }
}
</style>