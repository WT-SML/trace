<template>
  <div class="expand">
    <div class="title d-inline-block">
      <slot name="title" />
    </div>
    <div class="main">
      <i class="arrow-top"></i>
      <slot name="main" />
    </div>
  </div>
</template>

<script>
export default {
  name: "expand",
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.expand {
  position: relative;
  &:hover {
    .main {
      display: block;
      transform: translateY(0px);
      visibility: visible;
      transition: all ease 0.3s;
    }
  }
  .main {
    transform: translateY(20px);
    position: absolute;
    left: calc(-160px + 50%);
    width: 320px;
    padding: 15px;
    background-color: #fff;
    border-top: 2px solid var(--bs-primary);
    box-shadow: 0 3px 8px 2px rgb(1 1 1 / 20%);
    border-radius: 8px 6px;
    visibility: hidden;
    .arrow-top {
      position: absolute;
      top: -12px;
      left: calc(50% - 6px);
      width: 0;
      height: 0;
      display: inline-block;
      border: 6px solid var(--bs-primary);
      border-left-color: rgba(0, 0, 0, 0);
      border-right-color: rgba(0, 0, 0, 0);
      border-top-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>
