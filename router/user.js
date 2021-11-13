const querystring = require("querystring");
const getCurrentTime = require("../util/getCurrentTime");
const {
  getList,
  getDetail,
  createUser,
  editUser,
  deleteUser,
  login,
} = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const { setRedis, getRedis } = require("../exec/execRedis");
const userRouterHandle = (req, res) => {
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  console.log("req.body", req.body);
  const method = req.method;
  const postData = req.body;

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

  //用户注册
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
    console.log("getData", getData);
    const username = getData.username;
    const password = getData.password;
    const currentTime = getCurrentTime();
    const promise = login(username, password);
    return promise.then((sqlData) => {
      console.log("sqlData", sqlData);
      if (sqlData.length > 0) {
        console.log("session", req.session);
        req.session.username = username;
        req.session.password = password;
        res.setHeader("Set-Cookie", `userId=${req.userId};httpOnly;path=/`);
        setRedis(req.userId, req.session);
        //设置cookie
        // res.setHeader("Set-Cookie", [
        //   `username=${username};httpOnly;path=/`,
        //   `password=${password};httpOnly;path=/`,
        // ]);

        return new SuccessModel(
          {
            tip: "登录成功，id为：" + sqlData.insertId,
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
      req.session.username
        ? new SuccessModel(
            {
              tip: req.session.username + "登录成功",
              checkTime: currentTime,
            },
            "ok"
          )
        : new ErrorModel(
            {
              tip: req.session.username + "登录失败",
              checkTime: currentTime,
            },
            "error"
          )
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
