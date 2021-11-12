class Base {
  constructor(data, msg) {
    this.data = data;
    this.msg = msg;
  }
}
class SuccessModel extends Base {
  constructor(data, msg) {
    super(data, msg);
    this.errno = true;
  }
}
class ErrorModel extends Base {
  constructor(data, msg) {
    //调用父类构造函数
    super(data, msg);
    this.errno = false;
  }
}
module.exports = {
  ErrorModel,
  SuccessModel,
};
