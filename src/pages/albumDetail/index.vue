<template>
  <h1>详情</h1>
</template>

<script>
import { getAlbumDetail } from "@/API/getAlbumDetail";
export default {
  data() {
    return {
      data: {
        limit: 15,
        order: "new",
        skip: 0,
        first: 1,
      },
    };
  },
  onLoad(e) {
    // console.log(e);
    getAlbumDetail(e.id, this.data).then((res) => {
      console.log(res);
    });
  },
};
</script>
