$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  console.log(options.url);
  // 统一为有权限的接口，设置 headers 请求头
  if (options.url.indexOf("/my/") !== -1) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      localStorage.removeItem("token");
      //强制跳转到登陆页面
      location.href = "/login.html";
    }
  };
});
