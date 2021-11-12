const { method, reject } = require("lodash");
const { resolve } = require("path/posix");
const querystring = require("querystring");
const blogRouterHandle = require("./router/blog");
const userRouterHandle = require("./router/user");

//处理url上传的参数为json格式
const getPostData = (req) => {
  const method = req.method;
  const contentType = req.headers["content-type"];
  // console.log(contentType);
  const promise = new Promise((resolve, reject) => {
    if (
      method !== "POST" ||
      contentType !== "application/x-www-form-urlencoded"
    ) {
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
  // console.log(contentType);
};

const httpServerHandle = (req, res) => {
  getPostData(req).then((result) => {
    req.body = result;
    const blogRouter = blogRouterHandle(req, res);
    if (blogRouter) {
      blogRouter.then((data) => {
        res.end(JSON.stringify(data));
      });
    }
    userRouterHandle(req, res);
  });
};
module.exports = httpServerHandle;
