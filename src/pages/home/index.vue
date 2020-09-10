<template>
  <view>
    <view class="home_tab">
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
        <view class="iconfont iconsearch"></view>
      </view>

      <view class="content">
        <view v-if="current === 0">
          <home-recommend
            ref="recommend"
            :scrollTop="scrollTop"
          ></home-recommend>
        </view>
        <view v-if="current === 1">
          <home-category>分类</home-category>
        </view>
        <view v-if="current === 2">
          <home-new>最新</home-new>
        </view>
        <view v-if="current === 3">
          <home-album>专辑</home-album>
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
      items: ["推荐", "分类", "最新", "专辑"],
      // tab选中索引
      current: 0,
      // 顶部距离
      scrollTop: 0,
      // hotLength: 0,
    };
  },
  onLoad() {},
  onReady() {
  },

  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
  },
  onPageScroll({ scrollTop }) {
    // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
    this.scrollTop = scrollTop;
  },
  // 下拉触顶事件
  onPullDownRefresh() {
    // 根据标签的索引执行相应的数据更新
    setTimeout(() => {
      switch (this.current) {
        case 0:
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
          // 获取更多推荐数据
          // let hotLength = this.$refs.recommend.vertical.length;
          // console.log(this.hotLength);
          let recommendPrams = this.$refs.recommend.recommendPrams;
          recommendPrams.limit += 6;
          this.$refs.recommend.getRecommendData(recommendPrams);
          // hotLength === this.$refs.recommend.vertical.length? uni.showToast({
          //   title: '已加载全部图片',
          //   icon: 'none',
          //   duration: 1500,
          // }): nill
          // console.log(this.$refs.recommend.vertical.length);
          break;
      }
      console.log("recommend组件上拉触底事件触发");
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.home_tab {
  .home_title_wrap {
    position: relative;
    .title_inner {
      width: 60%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .content {
  }
}
</style>
