<template>
  <view>
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
            >{{ date }}/<text>{{ month }}月</text></view
          >
          <view class="moment_title">永远年轻 永远热泪盈眶</view>
        </view>
        <view class="moment_title_more">更多></view>
      </view>
      <!-- 图片 -->
      <view class="moment_content">
        <view class="item" v-for="(item, index) of moment" :key="item.id">
          <easy-loadimage
            mode="widthFix"
            :scroll-top="scrollTop"
            :image-src="item.thumb + item.rule.replace('$<Height>', 360)"
          ></easy-loadimage>
          <!-- <text>{{ item.tag[index] }}</text> -->
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getRecommend } from "../../../API/getRecommend";
import { lsSwiper } from "../../../components/ls-swiper";
import easyLoadimage from "@/components/easy-loadimage/easy-loadimage.vue";

export default {
  components: { lsSwiper, easyLoadimage },
  props: { date: String, month: String, scrollTop: Number },
  data() {
    return {
      // 获取首页推荐图片参数
      data: {
        limit: 6,
        order: "hot",
        skip: 0,
      },
      // 推荐列表
      recommend: [],
      // 月份推荐
      moment: {},
      // 热门推荐
      vertical: [],
    };
  },

  mounted() {
    // 获取推荐
    getRecommend(this.data).then((res) => {
      // 将推荐、月份、热门等数据保存
      this.recommend = res.homepage[1].items;
      this.moment = res.homepage[2].items;
      this.vertical = res.vertical;
      console.log(res);
      console.log(
        "推荐:",
        this.recommend,
        "月份：",
        this.moment,
        "热门 ",
        this.vertical
      );
    });
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
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 20rpx;
    background: #fff;
    .item {
      width: 49%;
      background: #fff;
      // margin-bottom: 80rpx;
      margin: 10rpx 0;
      border-radius: 20rpx;
    }
  }
}
</style>
