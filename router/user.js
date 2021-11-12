const querystring = require("querystring");

const userRouterHandle = (req, res) => {
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  // console.log(getData);
  const method = req.method;
  if (path === "/api/user/list" && method === "GET") {
    res.end("用户列表");
  }
  if (path === "/api/user/detail" && method === "GET") {
    res.end("用户细节");
  }
  if (method === "GET" && path === "/api/user/login") {
    res.send("用户登录");
  }
  if (method === "GET" && path === "/api/user/login-test") {
    res.send("login-test");
  }

  if (method === "POST" && path === "/api/user/login") {
    res.end("用户登录");
  }
  if (method === "POST" && path === "/api/user/delete") {
    res.send("删除用户");
  }
  if (path === "/api/blog/create" && method === "GEPOSTT") {
    res.send("注册用户");
  }
  if (path === "/api/blog/edit" && method === "POST") {
    res.send("编辑用户");
  }
};
module.exports = userRouterHandle;
