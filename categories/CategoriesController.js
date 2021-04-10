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
    Category.create({ title, slug }).then(() => { response.redirect("/admin/categories/") });
  } else {
    response.redirect("/admin/categories/new");

  }
});

router.get("/admin/categories", (request, response) => {
  Category.findAll().then((categories) => {
    response.render("admin/categories/index", { categories });
  });
});

router.post("/categories/delete", (request, response) => {
  let id = request.body.id;
  if (id != undefined) {
    if (!isNaN(id)) {
      Category.findOne({ where: { id } })
        .then(() => {
          Category.destroy({ where: { id } })
        });
    }
  }
  response.redirect("/admin/categories");

});

module.exports = router;