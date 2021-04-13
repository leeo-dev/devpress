const express = require("express");
const router = express.Router();
const slugfy = require("slugify");
const Category = require("../categories/Category");
const Article = require("./Article");

router.get("/admin/articles", (request, response) => {
  Article.findAll({ include: [{ model: Category }] }).then((articles) => {
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
  if (id != undefined && !isNaN(id)) {
    Article.destroy({ where: { id } })
  }
  response.redirect("/admin/articles");
});

router.get("/admin/article/edit/:id", (request, response) => {
  let id = request.params.id;
  if (!isNaN(id) && id != undefined) {
    Article.findByPk(id).then((article) => {
      Category.findAll().then((categories) => {
        response.render("admin/articles/edit", { article, categories });
      });
    });
  }
});

router.post("/article/update", (request, response) => {
  let id = request.body.id;
  let title = request.body.title;
  let slug = slugfy(title);
  let body = request.body.body;
  let categoryId = request.body.categoryId;

  Article.update({ title, slug, body, categoryId }, { where: { id } })
    .then(() => {
      response.redirect("/admin/articles");
    });

});

router.get("/articles/page/:page", (request, response)=>{
  let page = Number(request.params.page);
  let offset = 0;
  const limit = 4;
  
  if(isNaN(page) || page == 1){
    offset = 0;
  }else{
  offset = ((limit * page) - limit);
  }


  Article.findAndCountAll({order: [['createdAt', 'DESC']], limit, offset}).then((articles)=>{
    let next;
    if(offset + 4 >= articles.count){
      next = false;
    }else{
      next = true;
    }

    let result = {
      next, articles, page
    };

          Category.findAll().then((categories) => {
            console.log(result.next)
      response.render("page", {result, categories});
      });


  });
});



module.exports = router;