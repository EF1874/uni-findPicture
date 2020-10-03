// 保存二维码
export const longPressSave = (url) =>{
  wx.showLoading({
    title: "保存中...",
  });
  uni.downloadFile({
    url: url,
    success: function(res) {
      console.log("saveImg", res);
      //图片保存到本地
      uni.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success: function(data) {
          uni.hideLoading();
          uni.showModal({
            title: "提示",
            content: "图片已存入手机相册，赶快分享给好友吧",
            showCancel: false,
            // success(res) {
            //   if (res.confirm) {
            //     _this.setData({
            //       shareModelShow: false,
            //     });
            //   }
            // },
          });
        },
        fail: function(err) {
          if (
            err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
            err.errMsg === "saveImageToPhotosAlbum:fail auth deny"
          ) {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            uni.showModal({
              title: "提示",
              content: "需要您授权保存相册",
              showCancel: false,
              success: (modalSuccess) => {
                uni.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata);
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      uni.showModal({
                        title: "提示",
                        content: "获取权限成功,再次点击图片即可保存",
                        showCancel: false,
                      });
                    } else {
                      uni.showModal({
                        title: "提示",
                        content: "获取权限失败，将无法保存到相册哦~",
                        showCancel: false,
                      });
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData);
                  },
                  complete(finishData) {
                    console.log("finishData", finishData);
                  },
                });
              },
            });
          }
        },
        complete(res) {
          uni.hideLoading();
        },
      });
    },
  });
}