/**
 * 数据库配置
 */
// const mysql = require("mysql");
let MYSQL_CONF;
const env = process.env.NODE_ENV;
//数据库配置
if (env === "dev") {
  MYSQL_CONF = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "blogstest",
  };
}
if (env === "production") {
  MYSQL_CONF = {
    host: "localhost",
    port: "3306",
    user: "root",
    password: "123456",
    database: "blogstest",
  };
}

module.exports = {
  MYSQL_CONF,
};
