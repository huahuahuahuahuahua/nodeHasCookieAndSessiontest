const { method } = require("lodash");
const querystring = require("querystring");
const blogRouterHandle = require("./router/blogRouterHandle");
const userRouterHandle = require("./router/userRouterHandle");
const httpServerHandle = (req, res) => {
  blogRouterHandle(req, res);
  blogRouterHandle(req, res);
  //   const myURL = new URL(req.url);
  //   console.log(myURL.hostname);
  //   console.log(myURL.search);
  //   console.log(req.url);
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  console.log(getData);
  const method = req.method;

  res.end("hello");
};
module.exports = httpServerHandle;
