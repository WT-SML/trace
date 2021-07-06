<template>
  <div class="common-page">
    <div class="filter">
      <div
        v-for="item in typeMap"
        :key="item.type"
        @click="setFilterType(item.type)"
        :class="`cate-item ${filter.type === item.type ? 'active' : ''}`"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="games row">
      <div v-for="item in filteredGameList" :key="item.id" class="col-2">
        <div class="game-item wow fadeInUp" @click="handleGameItemClick(item)">
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
import { loadScript } from "../../utils/index.js";

// 首页
export default {
  name: "index",
  components: { loading, noData },
  setup(props, ctx) {
    const state = reactive({
      filteredGameList: [],
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
        try {
          const res = await getGameList();
          state.gameList = res;
          state.filteredGameList = res;
          state.isLoading = false;
        } catch {
          state.isLoading = false;
        }
      },
      setFilterType(type) {
        state.filter.type = type;
        state.filteredGameList = [];
        state.isLoading = true;
        setTimeout(() => {
          if (type === -1) {
            state.filteredGameList = state.gameList;
          } else {
            state.filteredGameList = state.gameList.filter(
              (item) => item.type === type
            );
          }
          state.isLoading = false;
        }, 300);
      },
      handleGameItemClick(item) {
        localStorage.setItem("currentGame", JSON.stringify(item));
        window.location.href = `/g/${item.gid}`;
      },
    };
    onMounted(async () => {
      await loadScript(
        "https://cdn.bootcdn.net/ajax/libs/wow/1.1.2/wow.min.js"
      );
      await loadScript(
        "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css",
        "link"
      );
      new window.WOW().init();
      await methods.init();
    });
    return {
      ...toRefs(state),
      ...methods,
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
      width: 90px;
      height: 90px;
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
