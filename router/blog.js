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
  console.log(req.body);
  const postData = req.body;
  // console.log(getData);
  if (path === "/api/blog/list" && method === "GET") {
    const { author, keyword } = getData;
    promise = getList(author, keyword);
    return promise
      .then((data) => {
        return new SuccessModel(data, "ok");
      })
      .catch((err) => {
        console.log(err);
      });
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
    const title = postData.title;
    const content = postData.content;
    const author = postData.author;
    const currentTime = getCurrentTime();
    const promise = createBlog(
      title,
      content,
      author,
      currentTime,
      currentTime
    );
    return promise.then((sqlData) => {
      if (sqlData.affectedRows && sqlData.insertId) {
        return new SuccessModel(
          {
            tip: "新建成功，id为：" + sqlData.insertId,
            createTime: currentTime,
          },
          "ok"
        );
      } else {
        return new ErrorModel(
          {
            tip: "新建失败",
            failTime: currentTime,
          },
          "fail"
        );
      }
    });
  }
  if (path === "/api/blog/edit" && method === "POST") {
    if (loginCheck(req)) {
      return loginCheck(req);
    }
    const title = postData.title;
    const content = postData.content;
    const author = postData.author;
    const currentTime = getCurrentTime();
    const id = getData.id;
    const promise = editBlog(title, content, author, currentTime, id);
    return promise.then((sqlData) => {
      if (sqlData.affectedRows) {
        return new SuccessModel(
          {
            tip: "修改成功",
            updateTime: currentTime,
          },
          "ok"
        );
      } else {
        return new SuccessModel(
          {
            tip: "修改失败",
            failTime: currentTime,
          },
          "fail"
        );
      }
    });
  }
  if (path === "/api/blog/delete" && method === "POST") {
    res.send("删除博客");
  }
};
module.exports = blogRouterHandle;
