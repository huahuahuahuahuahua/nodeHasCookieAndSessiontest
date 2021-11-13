/**
 * 对应应路由对数据库操作的语句
 */

const execSql = require("../exec/execSql");

const getList = (keyword) => {
  let sql = `select * from users where 1=1 `;

  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }

  sql += `order by createtime desc;`;
  return execSql(sql);
};

const getDetail = (id) => {
  let sql = `select * from users where id='${id}';`;
  return execSql(sql);
};

const createUser = (username, realname, password, createtime, updatetime) => {
  let sql = `insert into users(username, realname, password, createtime, updatetime) values('${username}', '${realname}', '${password}', '${createtime}', '${updatetime}');`;
  return execSql(sql);
};

const editUser = (username, realname, password, updatetime, id) => {
  let sql = `update users set username='${username}', realname='${realname}', password='${password}', updatetime='${updatetime}' where id='${id}';`;
  return execSql(sql);
};

const deleteUser = (id) => {
  let sql = `delete from users where id='${id}';`;
  return execSql(sql);
};

const login = (username, password) => {
  let sql = `select * from users where username = "${username}" and password= "${password}";`;
  return execSql(sql);
};

module.exports = {
  getList,
  getDetail,
  createUser,
  editUser,
  deleteUser,
  login,
};
