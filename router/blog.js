const blogRouterHandle = (req, res) => {
  const path = req.url.split("?")[0];
  const getStr = req.url.split("?")[1];
  const getData = querystring.parse(getStr);
  const method = req.method;
  //   console.log(getData);
  if (path === "/api/blog/list" && method === "GET") {
    res.send("博客列表");
  }
  if (path === "/api/blog/detail" && method === "GET") {
    res.send("博客细节");
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
