<template>
  <div class="common-page row">
    <div class="col-9">
      <div class="content">
        <h1 class="title mb-4">快应用如何实现密码明文和密文切换显示</h1>
        <div class="desc mb-4">2021年06月30日 阅读 3569</div>
        <div v-html="content.content" class="rich-text"></div>
      </div>
    </div>
    <div class="col-3">
      <div class="author d-flex">
        <div class="left">
          <img
            class="avatar border rounded-circle"
            width="50"
            height="50"
            src="https://img-static.mihoyo.com/communityweb/upload/137c3489ca6a781e212652251d8e7ae0.png"
            alt="avatar"
          />
        </div>
        <div class="right ms-2">
          <div class="name-box">
            <span class="name">崩坏3</span>
            <img
              class="level"
              src="https://img-static.mihoyo.com/level/level16.png"
              alt="level"
            />
          </div>
          <div class="desc mt-1">米游社大boss</div>
          <div class="follow mt-1">
            <button class="btn btn-outline-primary btn-sm">关注</button>
          </div>
        </div>
      </div>
      <div class="top">
        <div class="title">推荐</div>
        <div class="content">
          <div class="item" v-for="item in 10" :key="item.id">
            <span class="item-title">永不言弃的丘丘人永不言弃的丘丘人</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 悬挂 -->
    <div class="data">
      <div class="item">
        <i class="fa fa-thumbs-up"></i>
      </div>
      <div class="item">
        <i class="fa fa-comments"></i>
      </div>
      <div class="item">
        <i class="fa fa-star"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, toRefs } from "vue";
import { getContent } from "../../apis";
export default {
  name: "content",
  props: {
    cid: {
      type: String,
    },
  },
  setup(props, ctx) {
    const state = reactive({
      content: {},
    });
    const methods = {
      async init() {
        const res = await getContent(props.cid);
        state.content = res;
      },
    };
    onMounted(() => {
      methods.init();
    });
    return {
      ...toRefs(state),
      ...methods,
    };
  },
};
</script>

<style lang="scss" scoped>
.data {
  position: fixed;
  margin-left: -70px;
  top: 90px;
  width: 36px;
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    margin-bottom: 9px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 4%);
    cursor: pointer;
    border-radius: 50%;
    color: #b2bac2;
  }
}
.content {
  background-color: #fff;
  border-radius: 4px;
  padding: 40px 50px;
  .title {
    font-size: 22px;
  }
  .desc {
    font-size: 13.8px;
    color: #909090;
  }
}
.author {
  background-color: #fff;
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  .right {
    .name-box {
      cursor: pointer;
      .name {
        color: #666666;
        font-weight: bold;
        margin-right: 6px;
        &:hover {
          color: var(--bs-primary);
        }
      }
      .level {
        height: 15px;
      }
    }
    .desc {
      font-size: 12px;
      color: #999999;
    }
    .follow {
      .btn {
        font-size: 15px;
        width: 90px;
        &:hover {
          background-color: var(--bs-primary);
          color: #fff;
        }
      }
    }
  }
}
.top {
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 24px;
  position: sticky;
  top: 90px;
  .title {
    font-size: 15px;
    padding: 10px 20px;
    border-bottom: 1px solid #ebebeb;
    font-weight: bold;
  }
  .content {
    padding: 10px 20px;
    .item {
      font-size: 12px;
      color: #333333;
      padding: 5px 0;
      cursor: pointer;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      .item-title {
        &:hover {
          color: var(--bs-primary);
        }
      }
    }
  }
}
</style>
<style lang="scss">
.rich-text {
  font-size: 15px;
  img {
    border-radius: 2px;
    width: 100%;
  }
}
</style>