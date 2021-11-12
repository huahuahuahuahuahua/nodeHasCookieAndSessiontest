const querystring = require("querystring");
const {
  getList,
  getDetail,
  createBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const blogRouterHandle = (req, res) => {
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  const method = req.method;
  // console.log(getData);
  if (path === "/api/blog/list" && method === "GET") {
    const { author, keyword } = getData;
    promise = getList(author, keyword);
    return promise
      .then((data) => {
        // console.log("data", data);
        return new SuccessModel(data, "ok");
      })
      .catch((err) => {
        console.log(err);
      });

    // return res.then((sqlData) => {
    //   return new SuccessModel();
    // });
    // res.end("博客列表");
  }
  if (path === "/api/blog/detail" && method === "GET") {
    const { id } = getData;
    promise = getDetail(id);
    return promise
      .then((data) => {
        // console.log("data", data);
        return new SuccessModel(data, "ok");
      })
      .catch((err) => {
        console.log(err);
      });
    // res.send("博客细节");
  }
  if (path === "/api/blog/create" && method === "POST") {
    res.send("新建博客");
  }
  if (path === "/api/blog/edit" && method === "POST") {
    res.send("编辑博客");
  }
  if (path === "/api/blog/delete" && method === "POST") {
    res.send("删除博客");
  }
};
module.exports = blogRouterHandle;
