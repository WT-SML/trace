<template>
  <div class="common-page row">
    <div class="col-10">
      <!-- 文章列表 -->
      <div class="a-list">
        <div class="a-item" v-for="item in 10" :key="item.id">
          <div class="author">
            <span class="cp">
              <img
                class="avatar"
                src="https://img-static.mihoyo.com/avatar/avatar10015.png"
                alt=""
              />
              <span class="name">飞翔的丘丘人</span>
              <img
                class="level"
                src="https://img-static.mihoyo.com/level/level7.png"
                alt=""
              />
            </span>
            <span class="date">06-23</span>
          </div>
          <div class="title">
            中考到一半有人突然疯了，起来把你答题卡撕了怎么办？
          </div>
          <div class="content">
            在吉隆坡 大概09
            10年，有几个考生被困电梯里，错过了第一堂考试。其中一个考生留下来继续考，坐了好几堂，直到有一堂来了个女监考员.
          </div>
          <div class="imgs">
            <img
              src="https://upload-bbs.mihoyo.com/upload/2021/06/23/5bd147f395a306359db6707b7e0bbb1a.png"
              alt=""
            />
            <img
              src="https://upload-bbs.mihoyo.com/upload/2021/06/14/db396a286b3bddde03f6c188974fb89b.jpeg"
              alt=""
            />
            <img
              src="https://upload-bbs.mihoyo.com/upload/2021/06/23/4ccb045a8ba07698f64f2a103e25db6d.jpeg"
              alt=""
            />
          </div>
          <div class="data">
            <div class="tags">
              <span class="tag">同人</span>
              <span class="tag">cos</span>
              <span class="tag">分析</span>
              <span class="tag">攻略</span>
            </div>
            <div class="data-nums">
              <span class="data-nums-item">
                <i class="fa fa-eye fa-fw me-1"></i>
                <span>61w+</span>
              </span>
              <span class="data-nums-item">
                <i class="fa fa-comments fa-fw me-1"></i>
                <span>1674</span>
              </span>
              <span class="data-nums-item">
                <i class="fa fa-thumbs-up fa-fw me-1"></i>
                <span>3w+</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2">2</div>
    123
  </div>
</template>

<script>
// 首页 or 某游戏的首页
export default {};
</script>

<style lang="scss" scoped>
.a-list {
  background-color: #fff;
  border-radius: 4px;
  .a-item {
    padding: 24px 30px;
    border-bottom: 1px solid #ebebeb;
    .author {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      margin-bottom: 10px;
      .avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
      .name {
        margin-left: 10px;
      }
      .level {
        margin-left: 6px;
        height: 15px;
      }
      .date {
        margin-left: 10px;
        color: #cccccc;
      }
    }
    .title {
      color: #333333;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      cursor: pointer;
      &:hover {
        color: var(--bs-primary);
      }
    }
    .content {
      color: #999999;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 8px;
    }
    .imgs {
      margin-bottom: 8px;
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 6px;
        cursor: pointer;
        margin-right: 5px;
      }
    }
    .data {
      display: flex;
      justify-content: space-between;
      .tags {
        .tag {
          color: #666;
          border-radius: 12px;
          margin-right: 10px;
          height: 24px;
          display: inline-flex;
          align-items: center;
          background-color: #f5f5f5;
          padding: 0 12px;
          font-size: 12px;
          cursor: pointer;
        }
      }
      .data-nums {
        color: #cccccc;
        font-size: 14px;
        .data-nums-item {
          margin-right: 15px;
        }
      }
    }
  }
}
</style>
