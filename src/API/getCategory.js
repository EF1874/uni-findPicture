import request from "@/utils/request";

// 请求分类数据
export const getCategory = () => {
  return request({
    method: "get", // 请求方式
    url: "v1/vertical/category", // 请求url
  });
};
