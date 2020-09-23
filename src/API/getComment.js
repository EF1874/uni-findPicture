import request from "@/utils/request";

// 请求专辑详情数据
export const getComment = (id) => {
  return request({
    method: "get", // 请求方式
    // url:`v1/wallpaper/album/${id}/wallpaper`,
    // 备用接口
    url:  `https://service.picasso.adesk.com/v2/wallpaper/wallpaper/${id}/comment`
    // header: {
    //   "user-agent": 'picasso,276,360'
    // }
  });
};
