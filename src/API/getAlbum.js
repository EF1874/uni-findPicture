import request from "@/utils/request";

// 请求分类数据
export const getAlbum = (data) => {
  return request({
    method: "get", // 请求方式
    // url: "v1/wallpaper/album", // 请求url
    url: 'https://service.picasso.adesk.com/v1/wallpaper/album',
    data: data
  });
};
