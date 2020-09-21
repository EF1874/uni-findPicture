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
              v-for="item of verticalNew"
              :key="item.id"
            >
              <easy-loadimage
                mode="widthFix"
                :scroll-top="scrollTop"
                :image-src="item.thumb"
                loading-mode="spin-circle looming-gray"
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
              v-for="item of verticalHot"
              :key="item.id"
            >
              <easy-loadimage
                mode="widthFix"
                :scroll-top="scrollTop"
                :image-src="item.thumb"
                loading-mode="spin-circle looming-gray"
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
      // 获取详细分类图片列表参数
      catePramsNew: {
        limit: 15,
        skip: 0,
        order: "new",
      },
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
    this.getPicNew(this.id, this.catePramsNew);
  },
  // 函数
  methods: {
    // tabs栏点击事件
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        // 修改点击的tab索引
        this.current = e.currentIndex;
        // 判断点击的是热门还是最新，并获取数据
        switch (this.current) {
          case 0:
            this.getPicNew(this.id, this.catePramsNew);
            break;
          case 1:
            this.getPicHot(this.id, this.catePramsHot);
            break;
        }
      }
      console.log(this.catePrams);
    },
    // 按分类获取图片
    getPicNew(id, parms) {
      getCategoryPic(id, parms).then((res) => {
        if (res.vertical.length === 0) {
          this.hasMore = false;
        }
        console.log(res);
        this.verticalNew = [...this.verticalNew, ...res.vertical];
        console.log(this.verticalNew);
      });
    },
    getPicHot(id, parms) {
      getCategoryPic(id, parms).then((res) => {
        if (res.vertical.length === 0) {
          this.hasMore = false;
        }
        console.log(res);
        this.verticalHot = [...this.verticalHot, ...res.vertical];
        console.log(this.verticalNew);
      });
    },
  },
  // 滚动屏幕事件
  onPageScroll({ scrollTop }) {
    // 传入scrollTop值并触发所有easy-loadimage组件下的滚动监听事件
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.scrollTop = scrollTop;
    }, 500);
  },
  // 上拉触底事件
  onReachBottom() {
    // switch (this.current) {
    //   case 0:
    //     if (!this.hasMore) {
    //       uni.showToast({
    //         title: "好像没有数据哦~",
    //         duration: 2000,
    //         icon: "none",
    //       });
    //     } else {
    //       let catePrams = this.catePrams;
    //       catePrams.skip += catePrams.limit;
    //       this.getPic(this.id, catePrams);
    //       console.log(catePrams);
    //     }
    // }
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
  padding: 20rpx;
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
</style>
