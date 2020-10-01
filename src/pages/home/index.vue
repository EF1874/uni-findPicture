<template>
  <view>
    <!-- tabs -->
    <view class="home_tab">
      <view class="home_tabs">
        <view class="home_title_wrap">
          <view class="title_inner">
            <uni-segmented-control
              :current="current"
              :values="items"
              @clickItem="onClickItem"
              style-type="text"
              active-color="#d4237a"
            >
            </uni-segmented-control>
          </view>
          <view class="iconfont icon-search"></view>
        </view>
      </view>

      <!-- 内容区 -->
      <view
        class="content"
        @touchmove="handleTouchmove"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
      >
        <view v-if="current === 0">
          <home-recommend
            ref="recommend"
            :scrollTop="scrollTop"
          ></home-recommend>
        </view>
        <view v-if="current === 1">
          <home-category></home-category>
        </view>
        <view v-if="current === 2">
          <home-album></home-album>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import homeRecommend from "./home-recommend/index";
import homeCategory from "./home-category/index";
import homeNew from "./home-new/index";
import homeAlbum from "./home-album/index";
export default {
  components: {
    uniSegmentedControl,
    homeRecommend,
    homeCategory,
    homeNew,
    homeAlbum,
  },

  data() {
    return {
      // tab栏数据
      items: ["推荐", "分类", "专辑"],
      // tab选中索引
      current: 0,
      // 顶部距离
      scrollTop: 0,
      // hotLength: 0,
      timer: null,
      // 屏幕坐标
      touchS: [0, 0],
      touchE: [0, 0],
    };
  },
  onLoad() {},
  onReady() {},

  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    // 滑动屏幕事件
    handleTouchmove(e) {
      // 在 touchMove 方法中持续监听触摸点的位置（x, y
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.touchE = [sx, sy];
    },
    // 滑动开始
    handleTouchStart(e) {
      // touchstart 时，监听到触摸开始时的 （x, y）位置
      let sx = e.touches[0].pageX;
      let sy = e.touches[0].pageY;
      this.touchS = [sx, sy];
    },
    // 滑动结束
    handleTouchEnd(e) {
      // 在 touchEnd 方法中对开始的触摸位置和结束的触摸位置进行判断，如果移动距离大于 50 则判定为发生触摸滑动事件。
      let start = this.touchS;
      let end = this.touchE;
      console.log(start);
      console.log(end);
      if (start[0] < end[0] - 50) {
        console.log("右滑");
        // 右滑时修改tab索引
        this.current === 2 ? (this.current = 0) : this.current++;
      } else if (start[0] > end[0] + 50) {
        console.log("左滑");
        // 左右滑时修改tab索引
        this.current === 0 ? (this.current = 2) : this.current--;
      } else {
        console.log("静止");
      }
    },
  },
  onPageScroll({ scrollTop }) {
    // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
    clearTimeout(this.timer);
    // 保存屏幕滚动高度
    this.timer = setTimeout(() => {
      this.scrollTop = scrollTop;
    }, 500);
  },
  // 下拉触顶事件
  onPullDownRefresh() {
    // 根据标签的索引执行相应的数据更新
    setTimeout(() => {
      switch (this.current) {
        case 0:
          // 清空旧数据
          this.$refs.recommend.recommend = [];
          this.$refs.recommend.moment = [];
          this.$refs.recommend.vertical = [];
          // 更新推荐数据
          this.$refs.recommend.getRecommendData(
            this.$refs.recommend.recommendPrams
          );
          console.log("recommend组件下拉触底事件触发");
          break;
      }
      uni.stopPullDownRefresh();
    }, 500);
  },
  // 上拉触底事件
  onReachBottom() {
    // 根据标签的索引执行相应的数据更新
    setTimeout(() => {
      switch (this.current) {
        case 0:
          // 推荐页获取更多推荐数据
          if (this.$refs.recommend.hasMore) {
            // 获取请求参数
            let recommendPrams = this.$refs.recommend.recommendPrams;
            // 每次上拉触底就将请求参数的skip+limit，就可以加载下一页
            recommendPrams.skip += recommendPrams.limit;
            // 将新参数作为请求参数
            this.$refs.recommend.getRecommendData(recommendPrams);
          } else {
            // 如果没有更多数据就弹出提示信息
            uni.showToast({
              title: "没有更多数据了",
              icon: "none",
            });
          }
          break;
        case 2:
      }
      console.log("recommend组件上拉触底事件触发");
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.home_tab {
  .home_tabs {
    // height: 90rpx;
    position: relative;
    .home_title_wrap {
      width: 100%;
      position: fixed;
      background: #fff;
      // height: 90rpx;
      z-index: 10;
      top: 0;
      left: 0;
      .title_inner {
        width: 60%;
        height: 100%;
        margin: 0 auto;
      }
      .icon-search {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
  .content {
    margin-top: 90rpx;
  }
}
</style>
