import request from "@/utils/request";

// 请求分类数据
export const getCategoryPic = (id,data) => {
  return request({
    method: "get", // 请求方式
    // url: "v1/vertical/category/${id}/vertical",
    // 备用接口
    url: `https://service.picasso.adesk.com/v1/vertical/category/${id}/vertical`,
    data: data
  });
};
