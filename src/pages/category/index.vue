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
      </view>

      <!-- 内容区 -->
      <view class="content">
        <!-- 最新图片 -->
        <view v-if="current === 0">
          <view class="vertical_content">
            <view
              class="vertical_content_item"
              @tap="clickPic(index1, verticalNew)"
              v-for="(item1, index1) of verticalNew"
              :key="item1.id"
            >
              <easy-loadimage
                mode="widthFix"
                :scroll-top="scrollTop"
                :image-src="item1.thumb"
              ></easy-loadimage>
              <!-- <text>{{ item.tag[index] }}</text> -->
            </view>
          </view>
        </view>
        <!-- 热门图片 -->
        <view v-if="current === 1">
          <view class="vertical_content">
            <view
              class="vertical_content_item"
              @tap="clickPic(index2, verticalHot)"
              v-for="(item2, index2) of verticalHot"
              :key="item2.id"
            >
              <easy-loadimage
                mode="widthFix"
                :scroll-top="scrollTop"
                :image-src="item2.thumb"
              ></easy-loadimage>
              <!-- <text>{{ item.tag[index] }}</text> -->
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";
import { getCategoryPic } from "../../API/getCategoryPic";
import easyLoadimage from "@/components/easy-loadimage/easy-loadimage.vue";

export default {
  components: {
    uniSegmentedControl,
    easyLoadimage,
  },
  data() {
    return {
      // tab栏数据
      items: ["最新", "热门"],
      // tab选中索引
      current: 0,
      // 获取分类最新图片
      catePramsNew: {
        limit: 15,
        skip: 0,
        order: "new",
      },
      // 获取分类热门图片
      catePramsHot: {
        limit: 15,
        skip: 0,
        order: "hot",
      },
      // 图片列表
      verticalNew: [],
      verticalHot: [],
      // 滚动高度
      scrollTop: 0,
      // 分类id
      id: "",
      // 定时
      timer: false,
      // 更多图片
      hasMore: true,
    };
  },
  // 页面加载事件
  onLoad(e) {
    this.id = e.id;
    console.log(this.id, this.catePramsNew);
    // 按分类获取图片列表
    this.getPic(this.id, this.catePramsNew);
    this.getPic(this.id, this.catePramsHot);
  },
  destroyed() {
    uni.removeStorageSync("currentImgIndex");
    uni.removeStorageSync("imgPreviewPicList");
  },
  // 函数
  methods: {
    // tabs栏点击事件
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        // 修改点击的tab索引
        this.current = e.currentIndex;
      }
      
      // this.current === 0
      //   ? this.verticalNew = [] && this.getPic(this.id, this.catePramsNew)
      //   : this.verticalHot = [] && this.getPic(this.id, this.catePramsHot);
    },
    // 按分类获取图片
    getPic(id, parms) {
      getCategoryPic(id, parms).then((res) => {
        // 判断返回的更多数据是否为空，为空则表示没有更多
        res.vertical.length === 0
          ? (this.hasMore = false)
          : (this.hasMore = true);
        // 判断请求参数是否为new，是则获取最新列表，否则获取热门列表
        parms.order === "new"
          ? (this.verticalNew = [...this.verticalNew, ...res.vertical])
          : (this.verticalHot = [...this.verticalHot, ...res.vertical]);
      });
    },
     // 点击图片的时候，将图片和索引存起来，并跳转到大图预览界面
    clickPic(index, moment) {
      uni.setStorageSync("imgPreviewPicList", moment);
      uni.setStorageSync("currentImgIndex", index);
      uni.navigateTo({
        url: `/pages/imgPreview/imgPreview?id=${moment[index].id}`,
      });
    },
  },
  // 滚动屏幕事件
  onPageScroll({ scrollTop }) {
    // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.scrollTop = scrollTop;
      console.log("滚动事件");
    }, 500);
  },
  // 上拉触底事件
  onReachBottom() {
    let timer = null;
    clearTimeout(timer);
    // 设置防抖防止不断触发触底事件
    timer = setTimeout(() => {
      // 判断是否有更多数据
      if (!this.hasMore) {
        uni.showToast({
          title: "好像没有图片了哦~",
          duration: 2000,
          icon: "none",
        });
      }
      // 判断当前是最新还是热门列表
      switch (this.current) {
        case 0:
          let catePramsNew = this.catePramsNew;
          catePramsNew.skip += catePramsNew.limit;
          this.getPic(this.id, catePramsNew);
          console.log("最新列表触底事件", this.current);
          break;
        case 1:
          let catePramsHot = this.catePramsHot;
          catePramsHot.skip += catePramsHot.limit;
          this.getPic(this.id, catePramsHot);
          console.log("热门列表触底事件", this.current);
          break;
      }
    }, 500);
  },
};
</script>

<style lang="scss" scoped>
.home_tab {
  position: relative;
  .home_title_wrap {
    width: 100%;
    position: fixed;
    background: #fff;
    // height: 90rpx;
    z-index: 10;
    top: 0;
    left: 0;
    .title_inner {
      width: 60%;
      height: 100%;
      margin: 0 auto;
    }
    .iconsearch {
      position: absolute;
      right: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.content {
  margin-top: 90rpx;
}
.vertical_content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10rpx;
  background: #fff;
  .vertical_content_item {
    width: 32.5%;
    height: 370rpx;
    background: #fff;
    // margin-bottom: 80rpx;
    margin-bottom: 10rpx;
    border-radius: 20rpx;
  }
}
</style>
