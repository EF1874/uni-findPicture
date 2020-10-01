<template>
  <view class="">
    <!-- 顶部返回按钮 -->
    <view
      v-if="height > 0"
      @click="navBack"
      class="iconfont icon-fanhui"
      :style="{ top: `${height}px` }"
    ></view>
    <!-- 内容区 -->
    <view class="mask">
      <!-- 头像作者显示区 -->
      <view v-if="isShowSwiper">
        <view class="author_wrap" :style="{ top: `${height}px` }">
          <image
            class="author_avatar"
            src="@/static/avatar/header-logo1.png"
          ></image>
          <view class="author_info">
            <view class="author_name">陈年风褛</view>
            <view class="author_time">7小时前</view>
          </view>
        </view>
        <!-- 底部点赞评论按钮区 -->
        <view class="pic_icon_wrap">
          <view class="pic_icon_like"
            ><button class="iconfont icon-dianzan"></button
            ><text>17</text></view
          >
          <view class="pic_icon_like"
            ><button
              class="iconfont icon-pinglun"
              @click="openComment(true)"
            ></button
            ><text>评论</text></view
          >
          <view class="pic_icon_like"
            ><button class="iconfont icon-shoucang"></button
            ><text>17</text></view
          >
          <view class="pic_icon_like"
            ><button class="iconfont icon-fenxiang" open-type="share"></button
            ><text>分享</text></view
          >
        </view>
      </view>
      <!-- 图片区 -->
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
        <swiper-item v-for="x in picList" :key="x.id">
          <!-- <view
            class="bg_img"
            :style="{ backgroundImage: 'url(' + x.preview + ')' }"
            @click="clickPic(y)"
          ></view> -->
          <image
            mode="widthFix"
            class="bg_img"
            @click="clickPic"
            :src="x.preview"
            lazy-load
          ></image>
        </swiper-item>
      </swiper>
    </view>
    <!-- 底部图片索引区 -->
    <view class="page" v-if="picList.length > 0"
      >{{ current + 1 }} / {{ picList.length }}</view
    >
    <!-- 评论区 -->
    <view class="comment_wrap" v-show="isOpened">
      <view class="comment_content_wrap">
        <!-- 评论头部 -->
        <view class="comment_content_title">
          <view
            @click="openComment(false)"
            class="iconfont icon-guanbi_huaban1"
          ></view>
          <text>赞 1</text><text>回复 {{ comment.length }}</text>
        </view>
        <!-- 评论列表 -->
        <view class="comment_content_container">
          <view
            class="comment_content"
            v-for="item1 in comment"
            :key="item1.id"
          >
            <image
              class="comment_user_avatar"
              mode="widthFix"
              :src="item1.user.avatar"
            />
            <view class="comment_list_wrap">
              <p class="comment_user_name">{{ item1.user.name }}</p>
              <p class="comment">{{ item1.content }}</p>
              <view class="comment_time_wrap">
                <p class="comment_time">
                  {{ item1.atime | formatTimeUntilNow }}
                </p>
                <view class="comment_icon">
                  <i class="iconfont icon-dianzan"></i>
                  <i class="iconfont icon-pinglun"></i>
                </view>
              </view>
            </view> </view
        ></view>
      </view>
      <view class="comment_content_footer">
        <input type="text" placeholder="写回复" />
        <view class="footer_icon">
          <button class="iconfont icon-pinglun"></button>
          <button class="iconfont icon-dianzan"></button>
          <button class="iconfont icon-shoucang"></button>
          <button class="iconfont icon-fenxiang" open-type="share"></button>
        </view>
      </view>
    </view>
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
      isShowSwiper: true,
      // 评论列表
      comment: [],
      // 状态栏高度
      height: 0,
      // 是否打开评论页
      isOpened: false,
    };
  },
  onLoad(e) {
    // console.log(e);
    this.picListInit();
    this.getCommentInfo(e.id);
    console.log("评论", e, this.comment);
    // 获取状态栏高度自适应返回和头像高度
    uni.getSystemInfo({
      success: (res) => {
        this.height = res.statusBarHeight;
      },
    });
    console.log(this.height);
  },
  // 关闭页面事件
  onUnLoad() {
    // 清空缓存
    uni.removeStorageSync("currentImgIndex");
    uni.removeStorageSync("imgPreviewPicList");
  },
  methods: {
    // 点击图片事件
    clickPic() {
      // this.current = index;
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
      // 获取图片评论数据
      this.getCommentInfo(this.picList[this.current].id);
      // console.log(this.comment);
    },
    // 获取图片评论
    getCommentInfo(id) {
      getComment(id).then((res) => {
        // this.commnet = res;
        this.comment = res.comment;
        console.log("评论列表", this.comment);
      });
    },
    // 导航栏返回按钮
    navBack() {
      uni.navigateBack();
    },
    // 打开评论区
    openComment(bool) {
      this.isOpened = bool;
      console.log(this.isOpened);
    },
    // 分享按钮
    onShareAppMessage(res) {
      console.log(res);
      return {
        title: "微信小程序分享",
        path: "/pages/home/index",
      };
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
.icon-fanhui {
  width: 60rpx;
  height: 60rpx;
  position: fixed;
  // top: 40rpx;
  left: 20rpx;
  font-size: 50rpx;
  color: #fff;
  z-index: 20;
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
  .author_wrap {
    z-index: 10;
    color: #fff;
    display: flex;
    position: absolute;
    // top: 50rpx;
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
    z-index: 10;

    width: 100%;
    height: 120rpx;
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 60rpx;
    left: 50%;
    transform: translateX(-50%);
    view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      button {
        color: #fff;
        background-color:transparent;
        // font-weight: 100;
        font-size: 50rpx;
      }
      text {
        // margin-top: 10rpx;
        color: #fff;
        font-size: 28rpx;
      }
    }
  }
  > .my_swiper {
    width: 100%;
    height: 100%;
    swiper-item {
      display: flex;
      align-items: center;
    }
    .bg_img {
      // background-size: 100% auto;
      // background-repeat: no-repeat;
      // background-position: center;
      // position: absolute;
      // top: 50%;
      // transform: translateY(-50%);
      // width: 100%;
      // height: 100%;
    }
  }
}

.comment_wrap {
  z-index: 100;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  border-radius: 20rpx;
  font-size: 28rpx;
  .comment_content_wrap {
    height: 94%;
    .comment_content_title {
      height: 10%;
      border-bottom: 15rpx solid rgb(243, 240, 240);
      display: flex;
      // justify-content: start;
      align-items: flex-end;
      padding: 20rpx;
      font-size: 30rpx;
      .iconfont {
        font-size: 45rpx;
      }

      text {
        margin-left: 40rpx;
      }
    }
    .comment_content_container {
      height: 90%;
      padding: 10rpx;
      overflow: scroll;
      .comment_content {
        display: flex;
        padding: 10rpx;
        border-bottom: 2rpx solid rgb(243, 240, 240);
        .comment_user_avatar {
          // flex: 1;
          width: 60rpx;
          border-radius: 50%;
        }

        .comment_list_wrap {
          flex: 5;
          padding-left: 20rpx;
          // height: 150rpx;
          .comment_user_name {
            padding-bottom: 15rpx;
            color: rgb(55, 139, 100);
          }

          .comment {
            padding-bottom: 15rpx;
          }

          .comment_time_wrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .comment_time {
              color: rgb(170, 162, 162);
              font-size: 24rpx;
            }

            .comment_icon {
              display: flex;
              margin-right: 10rpx;
              .iconfont {
                font-size: 40rpx;
                margin-left: 10rpx;
                color: rgb(170, 162, 162);
              }
            }
          }
        }
      }
    }
  }

  .comment_content_footer {
    height: 6%;
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // border: 1px solid #000;
    border-top: 1px solid rgb(243, 240, 240);
    input {
      height: 100%;
      // border: 1px solid #000;
    }
    .footer_icon {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .iconfont {
        font-size: 40rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
