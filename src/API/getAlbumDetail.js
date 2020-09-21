import request from "@/utils/request";

// 请求专辑详情数据
export const getAlbumDetail = (id,data) => {
  return request({
    method: "get", // 请求方式
    // url:`v1/wallpaper/album/${id}/wallpaper`,
    // 备用接口
    url:  `https://service.picasso.adesk.com/v1/wallpaper/album/${id}/wallpaper`,
    data: data,
    // header: {
    //   "user-agent": 'picasso,276,360'
    // }
  });
};
