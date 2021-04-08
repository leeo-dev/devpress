const express = require("express");
const router = express.Router();

router.get("/articles", (request, response) => {
  response.send("Rota de Articles");
});

module.exports = router;