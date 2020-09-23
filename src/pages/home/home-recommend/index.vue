<template>
  <view v-if="recommend.length">
    <!-- 首页推荐轮播图区域 -->
    <view class="slideshow">
      <ls-swiper
        :list="recommend"
        imgKey="thumb"
        :crown="true"
        :loop="true"
        :shadow="true"
        :autoplay="true"
        interval="5000"
        duration="1000"
        height="130"
        previousMargin="120"
        nextMargin="120"
        imgRadius="5"
        @click-item = "clickItem"
      />
    </view>
    <!-- 每日推荐区域 -->
    <view class="home_moment">
      <!-- 标题 -->
      <view class="moment_title_content">
        <view class="moment_title_date">
          <view class="moment_title_month"
            >{{ date.DD }}/<text>{{ date.MM }}月</text></view
          >
          <view class="moment_title">永远年轻 永远热泪盈眶</view>
        </view>
        <view class="moment_title_more">更多></view>
      </view>
      <!-- 图片 -->
      <view class="moment_content">
        <view
          class="moment_content_item"
          @tap="clickPic(index, moment)"
          v-for="(item, index) of moment"
          :key="item.id"
        >
          <easy-loadimage
            mode="aspectFill"
            :scroll-top="scrollTop"
            :image-src="item.thumb + item.rule.replace('$<Height>', 240)"
            loading-mode="spin-circle looming-gray"
          ></easy-loadimage>
          <!-- <text>{{ item.tag[index] }}</text> -->
        </view>
      </view>
    </view>
    <!-- 热门推荐区 -->
    <view class="vertical">
      <view class="vertical_title">热门</view>
      <view class="vertical_content">
        <view
          class="vertical_content_item"
          @tap="clickPic(index, vertical)"
          v-for="(item, index) of vertical"
          :key="item.id"
        >
          <easy-loadimage
            mode="heightFix"
            :scroll-top="scrollTop"
            :image-src="item.thumb"
            loading-mode="spin-circle looming-gray"
          ></easy-loadimage>
          <!-- <text>{{ item.tag[index] }}</text> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { lsSwiper } from "../../../components/ls-swiper";
import easyLoadimage from "@/components/easy-loadimage/easy-loadimage.vue";
import { getRecommend } from "@/API/getRecommend";
import moment from "moment";

export default {
  components: { lsSwiper, easyLoadimage },
  props: {
    scrollTop: Number,
  },
  data() {
    return {
      // 获取首页推荐图片参数
      recommendPrams: {
        limit: 15,
        order: "hot",
        skip: 0,
      },
      // 推荐列表
      recommend: [],
      // 月份推荐
      moment: [],
      // 转换后的日期
      date: {},
      // 热门推荐
      vertical: [],
      // 是否还有更多数据
      hasMore: true,
    };
  },

  mounted() {
    // 获取推荐数据
    this.getRecommendData(this.recommendPrams);
    // 转换时间戳
    this.date.MM = moment().format("MM");
    this.date.DD = moment().format("DD");
    // console.log("时间戳", this.moment);
    // 将图片缓存
  },
  // 销毁
  destroyed() {
    uni.removeStorageSync("currentImgIndex");
    uni.removeStorageSync("imgPreviewPicList");
  },
  methods: {
    // 获取首页推荐图片函数
    getRecommendData(data) {
      getRecommend(data).then((res) => {
        if (res.vertical.length === 0) {
          this.hasMore = false;
        }
        if (this.recommend.length === 0) {
          // 将推荐、月份、热门等数据保存
          this.recommend = res.homepage[1].items;
          this.moment = res.homepage[2].items;
        }

        this.vertical = [...this.vertical, ...res.vertical];
        console.log(res);
      });
    },
    // 点击轮播图图片事件
    clickItem(e) {
      uni.navigateTo({
        url: `/pages/albumDetail/index?id=${e.target}`,
      });
    },
    // 点击列表图片的时候，将图片和索引存起来，并跳转到大图预览界面
    clickPic(index, moment) {
      uni.setStorageSync("imgPreviewPicList", moment);
      uni.setStorageSync("currentImgIndex", index);
      uni.navigateTo({
        url: `/pages/imgPreview/imgPreview?id=${moment[index].id}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home_moment {
  margin-top: 30rpx;
  .moment_title_content {
    height: 70rpx;
    padding: 0 10rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    .moment_title_date {
      display: flex;
      align-items: center;
      font-size: 34rpx;
      color: $color;
      .moment_title_date_month {
        text {
          font-size: 30rpx;
        }
      }

      .moment_title {
        color: black;
        margin-left: 20rpx;
      }
    }

    .moment_title_more {
      color: $color;
    }
  }

  .moment_content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10rpx;
    background: #fff;
    .moment_content_item {
      width: 49%;
      height: 240rpx;
      background: #fff;
      // margin-bottom: 80rpx;
      margin-bottom: 10rpx;
      border-radius: 20rpx;
      image {
        height: 240rpx;
      }
    }
  }
}
// .moment_content_item ::v-deep .loadfail-img,
// .moment_content_item ::v-deep .loading-img {
//   height: 360rpx;
// }
.vertical {
  .vertical_title {
    color: $color;
    font-size: 34rpx;
    font-weight: 600;
    margin: 0 0 15rpx 20rpx;
  }
  .vertical_content {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10rpx;
    background: #fff;
    .vertical_content_item {
      width: 32.5%;
      height: 360rpx;
      background: #fff;
      // margin-bottom: 80rpx;
      margin-bottom: 10rpx;
      border-radius: 20rpx;
    }
  }
}
</style>
