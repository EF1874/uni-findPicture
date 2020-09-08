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
            :date="DD"
            :month="MM"
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
import moment from "moment";
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
      // 转换后的时间，在组件内传值会有延时
      DD: '',
      MM: '',
    };
  },
  onLoad() {
    // 转换时间戳
    this.MM = moment().format("MM");
    this.DD = moment().format("DD");
    console.log("时间戳", this.moment);
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
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
