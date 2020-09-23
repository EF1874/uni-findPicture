<template>
  <view class="">
    <view class="mask">
      <swiper
        @change="changeSwiper"
        class="my_swiper"
        :current="current"
        :circular="circular"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :duration="duration"
        autoHeight
      >
        <swiper-item v-for="(x, y) in picList" :key="x.id">
          <view v-if="isShowSwiper">
            <view class="author_wrap">
              <image
                class="author_avatar"
                src="@/static/avatar/header-logo1.png"
              ></image>
              <view class="author_info">
                <view class="author_name">陈年风褛</view>
                <view class="author_time">7小时前</view>
              </view>
            </view>
            <view class="pic_icon_wrap">
              <view class="pic_icon_like"
                ><image src="@/static/avatar/点赞.png"></image
                ><text>17</text></view
              >
              <view class="pic_icon_like"
                ><image src="@/static/avatar/评论.png"></image
                ><text>评论</text></view
              >
              <view class="pic_icon_like"
                ><image src="@/static/avatar/收藏.png"></image
                ><text>17</text></view
              >
              <view class="pic_icon_like"
                ><image src="@/static/avatar/分享.png"></image
                ><text>分享</text></view
              >
            </view>
          </view>
          <view
            class="bg_img"
            :style="{ backgroundImage: 'url(' + x.img + ')' }"
            @click="clickPic(y)"
          ></view>
        </swiper-item>
      </swiper>
    </view>
    <view class="page" v-if="picList.length > 0"
      >{{ current + 1 }} / {{ picList.length }}</view
    >
  </view>
</template>

<script>
import { getComment } from "@/API/getComment";
export default {
  data() {
    return {
      picList: [],
      indicatorDots: false,
      autoplay: false,
      duration: 500,
      circular: true,
      // 当前图片索引
      current: 0,
      // 是否显示文字
      isShowSwiper: false,
      // 评论列表
      comment: {},
    };
  },
  onLoad(e) {
    console.log(e);
    this.picListInit();
    this.getCommentInfo(e.id);
  },
  methods: {
    // 点击图片事件
    clickPic(index) {
      this.current = index;
      this.isShowSwiper = !this.isShowSwiper;
    },
    // 保存图片列表
    async picListInit() {
      this.current = uni.getStorageSync("currentImgIndex");
      this.picList = uni.getStorageSync("imgPreviewPicList");
    },
    // 轮播图改变事件
    changeSwiper(e) {
      this.current = e.target.current;
      this.getCommentInfo(this.picList[this.current].id);
      console.log(this.comment);
    },
    // 获取图片评论
    getCommentInfo(id) {
      getComment(id).then((res) => {
        this.commnet = res;
        console.log("评论列表", this.commnet);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  position: fixed;
  z-index: 6;
  color: #fff;
  bottom: 20rpx;
  text-align: center;
  width: 100%;
}
.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  z-index: 5;
  > .my_swiper {
    width: 100%;
    height: 100vh;
    .author_wrap {
      color: #fff;
      display: flex;
      position: absolute;
      top: 0rpx;
      left: 50%;
      transform: translateX(-50%);
      .author_avatar {
        width: 80rpx;
        height: 80rpx;
        border-radius: 50%;
        background-color: #fff;
      }

      .author_info {
        margin-left: 20rpx;
        .author_name {
          font-size: 32rpx;
        }

        .author_time {
          font-size: 30rpx;
        }
      }
    }
    .pic_icon_wrap {
      width: 100%;
      height: 120rpx;
      display: flex;
      justify-content: space-around;
      position: absolute;
      bottom: 80rpx;
      left: 50%;
      transform: translateX(-50%);
      view {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        image {
          width: 60rpx;
          height: 60rpx;
          color: #fff;
          font-weight: 600;
        }
        text {
          margin-top: 10rpx;
          color: #fff;
          font-size: 30rpx;
        }
      }
    }
    .bg_img {
      background-size: 100% auto;
      background-repeat: no-repeat;
      background-position: center;
      width: 100%;
      height: 100%;
    }
  }
}

.pic_list {
  display: flex;
  flex-flow: row wrap;
  > view {
    flex: 0 0 33.3vw;
    height: 33.3vw;
    padding: 1vw;
    > image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
