import request from "@/utils/request";

// 请求首页推荐图片API
export const getRecommend = (data) => {
  return request({
    method: "get", // 请求方式
    url: "v3/homepage/vertical", // 请求url
    data: data, // 参数
  });
};
