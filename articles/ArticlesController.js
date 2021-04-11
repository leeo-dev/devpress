const express = require("express");
const router = express.Router();

router.get("/admin/article/new", (request, response) => {
  response.render("admin/articles/new");
});

module.exports = router;