const querystring = require("querystring");
const getCurrentTime = require("../util/getCurrentTime");

const userRouterHandle = (req, res) => {
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  // console.log(getData);
  const method = req.method;
  const postData = req.body;
  console.log("postData", postData);
  if (path === "/api/user/list" && method === "GET") {
    const keyword = getData.keyword;
    const promise = getList(keyword);
    return promise.then((sqlData) => {
      return new SuccessModel(sqlData, "ok");
    });
  }
  if (path === "/api/user/detail" && method === "GET") {
    const id = getData.id;
    const promise = getDetail(id);
    return promise.then((sqlData) => {
      return new SuccessModel(sqlData[0], "ok");
    });
  }
  if (path === "/api/blog/create" && method === "POST") {
    const username = postData.username;
    const realname = postData.realname;
    const password = postData.password;
    const currentTime = getCurrentTime();
    const promise = createUser(
      username,
      realname,
      password,
      currentTime,
      currentTime
    );
    return promise.then((sqlData) => {
      if (sqlData.affectedRows && sqlData.insertId) {
        return new SuccessModel(
          {
            tip: "注册成功，id为：" + sqlData.insertId,
            createTime: currentTime,
          },
          "ok"
        );
      } else {
        return new ErrorModel(
          {
            tip: "注册失败",
            failTime: currentTime,
          },
          "fail"
        );
      }
    });
  }
  if (method === "POST" && path === "/api/user/login") {
    const username = postData.username;
    const password = postData.password;
    const currentTime = getCurrentTime();

    const promise = login(username, password);
    return promise.then((sqlData) => {
      if (sqlData.length > 0) {
        return new SuccessModel(
          {
            tip: "注册成功，id为：" + sqlData.insertId,
            createTime: currentTime,
          },
          "ok"
        );
      } else {
        return new ErrorModel(
          {
            tip: "注册失败",
            failTime: currentTime,
          },
          "fail"
        );
      }
    });
  }
  //用户登录
  if (method === "GET" && path === "/api/user/login") {
    const username = postData.username;
    const password = postData.password;
    const currentTime = getCurrentTime();

    const promise = login(username, password);
    return promise.then((sqlData) => {
      if (sqlData.length > 0) {
        return new SuccessModel(
          {
            tip: "注册成功，id为：" + sqlData.insertId,
            createTime: currentTime,
          },
          "ok"
        );
      } else {
        return new ErrorModel(
          {
            tip: "注册失败",
            failTime: currentTime,
          },
          "fail"
        );
      }
    });
  }
  if (method === "GET" && path === "/api/user/login-test") {
    // res.end("login-test");
    const currentTime = getCurrentTime();
    return Promise.resolve(
      {
        tip: "登录验证",
        checkTime: currentTime,
      },
      "ok"
    );
  }

  if (method === "POST" && path === "/api/user/delete") {
    res.send("删除用户");
  }

  if (path === "/api/blog/edit" && method === "POST") {
    res.send("编辑用户");
  }
};
module.exports = userRouterHandle;
