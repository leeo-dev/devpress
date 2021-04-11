const express = require("express");
const router = express.Router();
const slugfy = require("slugify");
const Category = require("../categories/Category");
const Article = require("./Article");

router.get("/admin/articles", (request, response) => {
  Article.findAll().then((articles) => {
    response.render("admin/articles/index", { articles });
  });
});


router.get("/admin/article/new", (request, response) => {
  Category.findAll().then((categories) => {
    response.render("admin/articles/new", { categories });
  });
});

router.post("/article/save", (request, response) => {
  let title = request.body.title;
  let slug = slugfy(title);
  let body = request.body.body;
  let categoryId = request.body.categoryId;

  Article.create({ title, body, slug, categoryId }).then(() => { response.redirect("/admin/articles"); });
});

router.post("/article/delete", (request, response) => {
  let id = +request.body.id;
  if (!isNaN(id)) {
    Article.destroy({ where: { id } })
  }
  response.redirect("/admin/articles");
});



module.exports = router;