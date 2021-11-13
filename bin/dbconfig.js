/**
 * 数据库配置
 */
// const mysql = require("mysql");
let MYSQL_CONF;
let REDIS_CONF = {};

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
  REDIS_CONF = {
    host: "192.168.152.131",
    port: "6379",
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
  REDIS_CONF = {
    host: "192.168.152.131",
    port: "6379",
  };
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
};
