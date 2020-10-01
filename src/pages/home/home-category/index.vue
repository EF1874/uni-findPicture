<template>
  <view>
    <view class="cate_container">
      <navigator
        class="cate_content"
        v-for="item in category"
        :key="item.id"
        :url="'/pages/category/index?id=' + item.id"
        ><easy-loadimage mode="widthFix" 
        :scroll-top="scrollTop"
        :image-src="item.cover"
        loading-mode="looming-gray" /><text>{{
          item.name
        }}</text></navigator
      >
    </view>
  </view>
</template>

<script>
import { getCategory } from "@/API/getCategory";
import easyLoadimage from "@/components/easy-loadimage/easy-loadimage.vue";
export default {
  components: { easyLoadimage },
  props: {
    scrollTop: Number,
  },
  data() {
    return {
      category: [],
    };
  },
  mounted() {
    getCategory().then((res) => {
      this.category = res.category;
      console.log(this.category);
    });
  },
  // methods: {
  //   handleClick(e) {
  //     uni.navigateTo({
  //       url:"/pages/home/categoryList/index?id="+e.id
  //     });
  //     console.log(e);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.cate_container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // justify-content: start;
  padding: 0 10rpx;
  margin-top: 20rpx;
  // :nth-child(2),
  // :nth-child(5),
  //  :nth-child(8),
  //  :nth-child(11),
  //  :nth-child(14)
  :nth-last-child(3n + 1) {
    margin: 0 11.5rpx;
  }
  .cate_content {
    width: 32.3%;
    position: relative;
    margin-bottom: 10rpx;
    // margin-left: 10rpx;
    image {
      border-radius: 10rpx;
      margin-bottom: 8rpx;
    }
    text {
      position: absolute;
      left: 10rpx;
      bottom: 10rpx;
      color: #fff;
    }
  }
}
</style>
