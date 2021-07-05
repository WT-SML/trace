<template>
  <div class="common-page">
    <div class="filter">
      <div
        v-for="item in typeMap"
        :key="item.type"
        @click="filter.type = item.type"
        :class="`cate-item ${filter.type === item.type ? 'active' : ''}`"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="games row">
      <div v-for="item in filteredGameList" :key="item.id" class="col-3">
        <div class="game-item" @click="handleGameItemClick(item)">
          <img class="logo" v-lazy="item.logo" :alt="item.name" />
          <div class="name">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <loading v-if="isLoading" />
    <noData v-else-if="filteredGameList.length === 0" />
  </div>
</template>

<script>
import { computed, onMounted, reactive, toRefs } from "vue";
import { getGameList } from "../../apis/index.js";
import loading from "../../components/common/loading.vue";
import noData from "../../components/common/no-data.vue";

// 首页
export default {
  name: "index",
  components: { loading, noData },
  setup(props, ctx) {
    const state = reactive({
      gameList: [],
      isLoading: false,
      // 筛选
      filter: {
        type: -1, // -1 => 全部;0 => 网游; 1 => 主机; 2 => 手游;
      },
      typeMap: [
        { type: -1, name: "全部" },
        { type: 0, name: "网游" },
        { type: 1, name: "主机" },
        { type: 2, name: "手游" },
      ],
    });
    const methods = {
      async init() {
        state.isLoading = true;
        const res = await getGameList();
        state.gameList = res;
        state.isLoading = false;
      },
      handleGameItemClick(item) {
        localStorage.setItem("currentGame", JSON.stringify(item));
        window.location.href = `/g/${item.gid}`;
      },
    };
    onMounted(() => {
      methods.init();
    });
    const computedState = {
      filteredGameList: computed({
        get: () => {
          if (state.filter.type === -1) {
            return state.gameList;
          }
          return state.gameList.filter(
            (item) => item.type === state.filter.type
          );
        },
        set: (val) => {},
      }),
    };
    return {
      ...toRefs(state),
      ...methods,
      ...computedState,
    };
  },
};
</script>

<style lang="scss" scoped>
.filter {
  margin-bottom: 20px;
  .cate-item {
    padding: 0 10px;
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #e3e7e8;
    text-align: center;
    border-radius: 13px;
    color: #333;
    text-decoration: none;
    font-size: 12px;
    white-space: nowrap;
    word-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
    cursor: pointer;
    margin-right: 15px;
    &:hover {
      color: #fff;
      background-color: var(--bs-primary);
    }
  }
  .active {
    color: #fff;
    background-color: var(--bs-primary);
  }
}
.games {
  .game-item {
    background-color: #fff;
    border-radius: 4px;
    margin-bottom: 24px;
    padding: 15px;
    cursor: pointer;
    &:hover {
      color: var(--bs-primary);
      box-shadow: 0 3px 8px rgb(34 34 34 / 12%);
    }
    .logo {
      width: 140px;
      height: 140px;
      border-radius: 2px;
      display: block;
      margin: 0 auto;
    }
    .name {
      margin-top: 15px;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
