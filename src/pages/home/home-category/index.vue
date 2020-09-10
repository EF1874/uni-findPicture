<template>
  <view>
    分类
  </view>
</template>

<script>
import { getCategory } from "@/API/getCategory";
export default {
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
};
</script>

<style lang="sass" scoped></style>
