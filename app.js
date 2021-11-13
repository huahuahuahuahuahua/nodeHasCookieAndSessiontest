const { method, reject } = require("lodash");
const { resolve } = require("path/posix");
const querystring = require("querystring");
const blogRouterHandle = require("./router/blog");
const userRouterHandle = require("./router/user");
//处理url上传的参数为json格式
const getPostData = (req) => {
  const method = req.method;
  const contentType = req.headers["content-type"];
  const promise = new Promise((resolve, reject) => {
    if (method !== "POST" || contentType !== "application/json") {
      // || contentType !== "application/json"
      resolve({});
      return;
    } else {
      let postData = "";
      req.on("data", (chunk) => {
        postData += chunk;
      });
      req.on("end", () => {
        if (!postData) {
          resolve({});
          return;
        }
        resolve(JSON.parse(postData));
        // console.log("postData", postData);
      });
    }
  });
  return promise;
};

const httpServerHandle = (req, res) => {
  //设置cookie登录验证，处理cookie
  res.setHeader("Content-type", "application/json");
  //解析cookie
  let cookie = {};
  let cookieStr = req.headers["cookie"] || "";
  let cookieArr = cookieStr.split("; ");
  console.log("cookie", cookie);
  cookieArr.forEach((item) => {
    if (!item) return;
    let key = item.split("=")[0];
    let val = item.split("=")[1];
    cookie[key] = val;
  });
  req.cookie = cookie;

  getPostData(req).then((result) => {
    req.body = result;
    const blogRouter = blogRouterHandle(req, res);
    if (blogRouter) {
      blogRouter.then((data) => {
        res.end(JSON.stringify(data));
      });
      return;
    }
    const userRouter = userRouterHandle(req, res);
    if (userRouter) {
      userRouter.then((sqlData) => {
        res.end(JSON.stringify(sqlData));
      });
      return;
    }
  });
};
module.exports = httpServerHandle;
