const express = require("express");
const server = express();

server.get("/", (request, response) => {
  response.send("foi");
});

server.listen(3000, (request, response) => {
  console.log("Server is running");
});