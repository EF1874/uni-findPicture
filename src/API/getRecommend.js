import request from "@/utils/request";

// 按分类获取图片列表
export const getRecommend = (data) => {
  return request({
    method: "get", // 请求方式
    // url: "v3/homepage/vertical", // 请求url
    // 备用接口
    url: "https://service.picasso.adesk.com/v3/homepage/vertical",
    data: data, // 参数
  });
};
