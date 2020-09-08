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
    <view class="home_moment">
      <view class="moment_title">
        <view class="moment_title_text">
          <view class="moment_title_date"
            >{{ date }}/<text>{{ month }}月</text></view
          >
          <view class="moment_title">永远年轻 永远热泪盈眶</view>
        </view>
        <view class="moment_title_more">更多></view>
      </view>
      <view class="moment_content"></view>
    </view>
  </view>
</template>

<script>
import { getRecommend } from "../../../API/getRecommend";
import { lsSwiper } from "../../../components/ls-swiper";

export default {
  components: { lsSwiper },
  props:{date:String, month:String},
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
      this.moment = res.homepage[2];
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
  methods: {},
};
</script>

<style lang="scss" scoped>
.home_moment {
  margin-top: 30rpx;
  .moment_title {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    .moment_title_text {
      display: flex;
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
  }
}
</style>
