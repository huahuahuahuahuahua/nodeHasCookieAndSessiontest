const mysql = require("mysql");
const { MYSQL_CONF } = require("../bin/dbconfig");
const createSql = mysql.createConnection(MYSQL_CONF);

const execSql = (sql) => {
  const promise = new Promise((resolve, reject) => {
    createSql.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return;
      } else {
        resolve(data);
      }
      return execSql;
    });
  });
  return promise;
};
module.exports = execSql;
