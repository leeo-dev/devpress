const express = require("express");
const router = express.Router();

router.get("/admin/article/new", (request, response) => {
  response.send("Rota de Articles");
});

module.exports = router;