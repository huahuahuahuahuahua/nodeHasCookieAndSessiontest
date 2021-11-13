const querystring = require("querystring");
const blogRouterHandle = require("./router/blog");
const userRouterHandle = require("./router/user");
const { setRedis, getRedis } = require("./exec/execRedis");
const { reject } = require("lodash");
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
  }).catch((err) => reject(err));
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
  let userId = req.cookie.userId || "";
  console.log("userId", userId);
  if (!userId) {
    userId = `${Date.now()}_${Math.random()}`;
    //设置session到redis
    setRedis(userId, {});
    // SESSION_DATA[userId] = {};
    // console.log("SESSION_DATA[userId]", SESSION_DATA[userId]);
  }
  req.userId = userId;
  //在redis获取session
  getRedis(userId)
    .then((redisStr) => {
      if (!redisStr) {
        setRedis(userId, {});
        req.session = {};
      } else {
        req.session = JSON.parse(redisStr);
      }
      return getPostData(req);
    })
    .then((result) => {
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
      res.writeHead(404, { "Content-type": "text/plain" });
      res.write("404 not found");
      res.end();
    });
  //session设置在本服务器
  // req.session = SESSION_DATA[userId] ? SESSION_DATA[userId] : {};

  // getPostData(req).then((result) => {
  //   req.body = result;
  //   const blogRouter = blogRouterHandle(req, res);
  //   if (blogRouter) {
  //     blogRouter.then((data) => {
  //       res.end(JSON.stringify(data));
  //     });
  //     return;
  //   }
  //   const userRouter = userRouterHandle(req, res);
  //   if (userRouter) {
  //     userRouter.then((sqlData) => {
  //       res.end(JSON.stringify(sqlData));
  //     });
  //     return;
  //   }
  // });
};
module.exports = httpServerHandle;
