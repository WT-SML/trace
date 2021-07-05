<template>
  <div class="no-data">
    <img class="img" :src="noDataImage" alt="暂无数据" width="200" />
    <div class="no-data-text">抱歉，暂无数据</div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import noDataImage from "../../assets/imgs/no-data.png";

export default {
  name: "noData",
  setup(props, ctx) {
    const state = reactive({
      noDataImage,
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.no-data {
  margin: 30px 0;
  .img {
    margin: 0 auto;
    display: block;
  }
  .no-data-text {
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
    color: #999999;
  }
}
</style>