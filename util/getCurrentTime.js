const getCurrentTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let min = date.getMinutes();
  let seconds = date.getSeconds();
  month = dealData(month);
  day = dealData(day);
  hour = dealData(hour);
  min = dealData(min);
  seconds = dealData(seconds);
  const currentTime =
    year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + seconds;
  // console.log('currentTime', currentTime)
  return currentTime;
};

const dealData = (num) => {
  num = num < 10 ? "0" + num : num;
  return num;
};

module.exports = getCurrentTime;
