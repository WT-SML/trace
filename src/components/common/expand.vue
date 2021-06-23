<template>
  <div class="expand">
    <span @click="$router.push('/g')" :class="`title ${customClass}`">
      <span>{{ title }}</span>
      <i class="fa fa-angle-down ms-1"></i>
    </span>
    <div class="main">
      <i class="arrow-top"></i>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "expand",
  props: {
    title: {
      type: String,
      default: "",
    },
    customClass: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.nav-list {
  $active-bgc: #ffffff2e;
  .nav-item {
    width: 68px;
    height: 62px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
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
}
.expand {
  position: relative;
  &:hover {
    .title {
      .fa-angle-down {
        transform: rotate(180deg);
      }
    }
    .main {
      display: block;
    }
  }
  .title {
    .fa-angle-down {
      transition: all ease 0.3s;
    }
  }
  .main {
    position: absolute;
    left: -109px;
    width: 280px;
    padding: 15px;
    background-color: #fff;
    border-top: 2px solid #00c3ff;
    box-shadow: 0 3px 8px 2px rgb(1 1 1 / 20%);
    border-radius: 8px 6px;
    z-index: 9999;
    // display: none;
    .arrow-top {
      position: absolute;
      top: -12px;
      left: calc(50% - 6px);
      width: 0;
      height: 0;
      display: inline-block;
      border: 6px solid #00c3ff;
      border-left-color: rgba(0, 0, 0, 0);
      border-right-color: rgba(0, 0, 0, 0);
      border-top-color: rgba(0, 0, 0, 0);
    }
  }
}
</style>
