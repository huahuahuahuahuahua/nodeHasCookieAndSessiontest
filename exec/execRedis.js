/**
 * 操作数据库封装
 */
const { REDIS_CONF } = require("../bin/dbconfig");
const redis = require("redis");
const redisCon = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

const setRedis = (key, val) => {
  if (!key) return;
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisCon.set(key, val);
};
const getRedis = (key) => {
  const promise = new Promise((resolve, reject) => {
    redisCon.get(key, (err, redisStr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log("redisStr", redisStr);
      resolve(redisStr);
    });
  });
  return promise;
};
module.exports = {
  setRedis,
  getRedis,
};
