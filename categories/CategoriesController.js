const express = require("express");
const router = express.Router();

router.get("/categories", (request, response) => {
  response.send("Rota de Categorias");
});

module.exports = router;