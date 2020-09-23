<template>
  <view class="container" v-if="album.cover">
    <!-- 封面 -->
    <view class="album_cover_wrap">
      <view class="album_cover"><image mode="aspectFill" :src="album.cover"></image></view>
      <view class="album_cover_title">{{album.name}}</view>
      <button class="album_cover_follow">关注专辑</button>
    </view>
    <!-- 作者信息 -->
    <view class="author_info_wrap">
      <view class="author_info">
        <image mode="widthFix" :src="album.user.avatar"></image>
        <text>{{album.user.name}}</text>
      </view>
      <view class="author_info_desc">
        {{album.desc}}
      </view>
    </view>
    <!-- 专辑 -->
    <view class="wallpaper_wrap" v-if="wallpaper.length">
      <navigator class="wallpaper" v-for="item in wallpaper" :key="item.id">
        <image :src="item.thumb + item.rule.replace('$<Height>', 120)"></image>
      </navigator>
    </view>
  </view>
</template>

<script>
import { getAlbumDetail } from "@/API/getAlbumDetail";
export default {
  data() {
    return {
      // 获取专辑详情数据
      albumPrams: {
        limit: 15,
        order: "new",
        skip: 0,
        first: 1,
      },
      // 专辑信息
      album: {},
      // 专辑图片
      wallpaper: []
    };
  },
  onLoad(e) {
    // console.log(e);
    getAlbumDetail(e.id, this.albumPrams).then((res) => {
      this.album = res.album;
      this.wallpaper = res.wallpaper;
      console.log(res);
    });
  },
};
</script>
<style lang="scss" scoped>
.album_cover_wrap {
  position: relative;
  .album_cover {
    // height: 100%;
    image {
    height: 40vh;

    }
  }
.album_cover_title {
    position: absolute;
    bottom: 20rpx;
    left: 20rpx;
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
  }

  .album_cover_follow {
    position: absolute;
    bottom: 20rpx;
    right: 20rpx;
    height: 50rpx;
    font-size: 24rpx;
    line-height: 50rpx;
    background: $color;
    color: #fff;
  }
}

.author_info_wrap {
  padding: 10rpx;
  .author_info {
    display: flex;
    margin: 10rpx 0;
    image {
      width: 60rpx;
    }

    text {
      margin-left: 20rpx;
      color: #000;
      font-weight: 600;
      font-size: 26rpx;
      line-height: 60rpx;
    }
  }

  .author_info_desc {

  }
}
</style>
