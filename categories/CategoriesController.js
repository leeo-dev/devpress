const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (request, response) => {
  response.render("admin/categories/new");
});


router.post("/admin/categories/save", (request, response) => {
  let title = request.body.title;
  let slug = slugify(title);
  if (title != undefined) {
    Category.create({ title, slug }).then(() => { response.redirect("/") });
  } else {
    response.redirect("admin/categories/new");

  }
});

router.get("/admin/categories", (request, response) => {
  response.render("");
});

module.exports = router;