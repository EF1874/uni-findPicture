<template>
  <view>
    <!-- 轮播图区 -->
    <view class="slideshow">
      <ls-swiper
        :list="banner"
        imgKey="thumb"
        :loop="true"
        :dots="true"
        :autoplay="true"
        interval="5000"
        duration="1000"
        height="180"
        imgRadius="5"
      />
    </view>

    <!-- 专辑列表区域 -->
    <view class="album_container">
      <navigator :url="`/pages/albumDetail/index?id=${item.id}`" class="album_list" v-for="item of album" :key="item.id">
        <view class="album_list_pic"
          ><image mode="aspectFill" :src="item.cover"
        /></view>
        <view class="album_list_content">
          <view class="album_list_content_title">{{ item.name }}</view>
          <view class="album_list_content_text"
            ><text>{{ item.desc }}</text></view
          >
        </view>
        <button class="album_list_follow">+ 关注</button>
      </navigator>
    </view>
  </view>
</template>

<script>
import { getAlbum } from "@/API/getAlbum";
import { lsSwiper } from "@/components/ls-swiper";
export default {
  components: { lsSwiper },
  data() {
    return {
      // 获取数据的请求参数
      albumPrams: {
        limit: 15,
        order: "new",
        skip: 0,
      },
      // 轮播图列表
      banner: [],
      // 专辑列表
      album: [],
      // 更多
      hasMore: true,
    };
  },
  mounted() {
    this.getAlbumDate(this.albumPrams);
  },
  methods: {
    // 获取数据
    getAlbumDate(prams) {
      getAlbum(prams).then((res) => {
        // 判断是否有轮播图，有则不赋值
        if (this.banner.length === 0) this.banner = res.banner;
        // 判断最新获取的专辑列表是否为空，为空则没用更多
        if (res.album.length === 0) {
          this.hasMore = false;
        }
        this.album = [...this.album, ...res.album];
        console.log(this.banner, this.album);
      });
    },
  },
  // // 上拉触底事件
  // onReachBottom() {
  //   // 修改请求参数并发送请求
  //   this.albumPrams.skip += this.albumPrams.limit;
  //   console.log(this.albumPrams);
  //   this.getAlbumDate(this.albumPrams);
  //   if (!this.hasMore) {
  //     uni.showToast({
  //       title: "没用更多了~~",
  //       icon: "none"
  //     })
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.slideshow {
  padding: 0 20rpx;
}

.album_container {
  padding: 10rpx;
  .album_list {
    position: relative;
    padding: 10rpx 0;
    display: flex;
    border-bottom: 1px solid #ccc;
    // flex-wrap: wrap;
    .album_list_pic {
      padding: 10rpx;
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 10rpx;
      }
    }

    .album_list_content {
      // flex: 1;
      padding: 10rpx;
      .album_list_content_title {
        color: black;
        font-size: 36rpx;
        font-weight: 600;
        // height: 36rpx;
      }

      .album_list_content_text {
        width: 100%;

        text {
          display: -webkit-box;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
      }
    }
    .album_list_follow {
      width: 100rpx;
      height: 50rpx;
      padding: 0;
      line-height: 50rpx;
      font-size: 24rpx;
      color: $color;
      border: 1rpx solid $color;
      background: #fff;
      position: absolute;
      right: 10rpx;
      bottom: 40rpx;
    }
  }
}
</style>
