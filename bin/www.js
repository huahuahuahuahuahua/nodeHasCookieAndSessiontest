const http = require("http");
const PORT = 8888;

const httpServerHandle = require("../app.js");

const server = http.createServer(httpServerHandle);

server.listen(PORT);
console.log("127.0.0.1:" + PORT);
