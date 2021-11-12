// const { sqlConnect, SySqlconnect } = require("../bin/dbconfig");
const execSql = require("../exec/execSql");
const getList = async (author, keyword) => {
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and keyword like "%${keyword}%" `;
  }
  sql += `order by createtime desc;`;
  return execSql(sql);
};

const getDetail = (id) => {
  let sql = `select * from blogs where id='${id}';`;
  return execSql(sql);
};

const createBlog = (title, content, author, createtime, updatetime) => {
  let sql = `insert into blogs(title, content, author, createtime, updatetime) values('${title}', '${content}', '${author}', '${createtime}', '${updatetime}');`;
  return execSql(sql);
};

const editBlog = (title, content, author, updatetime, id) => {
  let sql = `update blogs set title='${title}', content='${content}', author='${author}', updatetime='${updatetime}' where id='${id}';`;
  return execSql(sql);
};

const deleteBlog = (id) => {
  let sql = `delete from blogs where id='${id}';`;
  return execSql(sql);
};
module.exports = {
  getList,
  getDetail,
  createBlog,
  editBlog,
  deleteBlog,
};
