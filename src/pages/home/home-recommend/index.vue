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
      />
    </view>
    <!-- 每日推荐区域 -->
    <view class="home_moment">
      <!-- 标题 -->
      <view class="moment_title">
        <view class="moment_title_text">
          <view class="moment_title_date"
            >{{ date.DD }}/<text>{{ date.MM }}月</text></view
          >
          <view class="moment_title">永远年轻 永远热泪盈眶</view>
        </view>
        <view class="moment_title_more">更多></view>
      </view>
      <!-- 图片 -->
      <view class="moment_content">
        <view class="moment_content_item" v-for="item of moment" :key="item.id">
          <easy-loadimage
            mode="widthFix"
            :scroll-top="scrollTop"
            :image-src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></easy-loadimage>
          <!-- <text>{{ item.tag[index] }}</text> -->
        </view>
      </view>
    </view>
    <!-- 热门 -->
    <view class="vertical">
      <view class="vertical_title">热门</view>
      <view class="vertical_content">
        <view
          class="vertical_content_item"
          v-for="item of vertical"
          :key="item.id"
        >
          <easy-loadimage
            mode="widthFix"
            :scroll-top="scrollTop"
            :image-src="item.thumb"
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
        limit: 6,
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
    };
  },

  mounted() {
    // 获取推荐数据
    this.getRecommendData(this.recommendPrams);
    // 转换时间戳
    this.date.MM = moment().format("MM");
    this.date.DD = moment().format("DD");
    // console.log("时间戳", this.moment);
  },
  methods: {
    // 获取首页推荐图片函数
    getRecommendData(data) {
      getRecommend(data).then((res) => {
        // 将推荐、月份、热门等数据保存
        this.recommend = res.homepage[1].items;
        this.moment = res.homepage[2].items;
        this.vertical = res.vertical;
        console.log(res);
        // console.log(
        //   "推荐:",
        //   this.recommend,
        //   "月份：",
        //   this.moment,
        //   "热门 ",
        //   this.vertical
        // );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.home_moment {
  margin-top: 30rpx;
  .moment_title {
    height: 70rpx;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    .moment_title_text {
      display: flex;
      align-items: center;
      font-size: 34rpx;
      color: $color;
      .moment_title_date {
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
      background: #fff;
      // margin-bottom: 80rpx;
      margin-bottom: 10rpx;
      border-radius: 20rpx;
    }
  }
}
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
      width: 32%;
      background: #fff;
      // margin-bottom: 80rpx;
      margin-bottom: 10rpx;
      border-radius: 20rpx;
    }
  }
}
</style>
