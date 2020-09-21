const request = (config) => {
  // 处理 apiUrl
  if (config.url.indexOf("http") === -1) {
    config.url = "http://157.122.54.189:9088/image/" + config.url;
  }
  if (!config.data) {
    config.data = {};
  }
  console.log(JSON.stringify(config.data));
  uni.showToast({
    //请求数据时的loading
    title: "",
    // duration: 2000,
    icon: "loading",
    mask: true,
  });
  let promise = new Promise(function(resolve, reject) {
    uni.request(config).then((responses) => {
      // console.log(responses);
      // 异常
      if (responses[0]) {
        uni.showToast({
          //请求数据时的loading
          title: responses[0].errMsg,
          duration: 2000,
          image: "/static/alert-error.png",
        });
      } else if (responses[1].data.code === 1) {
        console.log(responses[1].data.msg);
        uni.showToast({
          title: responses[1].data.msg,
          image: "/static/alert-warn.png",
          duration: 20000,
        });
      } else {
        // uni.showToast({
        //   //请求数据时的loading
        //   title: "加载成功！",
        //   duration: 2000,
        //   icon: "success",
        // });
        uni.hideToast();
        let { res } = responses[1].data; // 如果返回的结果是data.data的，嫌麻烦可以用这个，return res,这样只返回一个data
        resolve(res);
      }
    });
  });
  return promise;
};
export default request;
