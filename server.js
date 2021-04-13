const express = require("express");
const connection = require("./database/database");
const server = express();
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");

//View Engine
server.set('view engine', 'ejs');
server.use(express.static('public'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());

//Database

connection.authenticate().then(() => {
  console.log("Conexão feita com sucesso!")
}).catch((error) => {
  console.log(`Erro ao se conectar com o Banco de Dados ${error}`)
});

server.use("/", categoriesController);
server.use("/", articlesController);

server.get("/", (request, response) => {
  Article.findAll({ order: [['createdAt', 'DESC']], limit: 4 }).then((articles) => {
    Category.findAll().then((categories) => {
      if (categories != undefined) {
        response.render("index", { articles, categories });
      } else {
        response.redirect("/");
      }
    });
  });
});

server.get("/:slug", (request, response) => {
  let slug = request.params.slug;
  Article.findOne({ where: { slug } })
    .then((article) => {
      if (article != undefined) {
        Category.findAll().then((categories) => {
          if (categories != undefined) {
            response.render("article", { article, categories });

          } else {
            response.redirect("/");

          }
        });
      } else {
        response.redirect("/");
      }
    }).catch((error) => {
      response.redirect("/");
    });
});

server.get("/categoria/:slug", (request, response) => {
  let slug = request.params.slug;
  Category.findOne({

    where: { slug },
    include: [{ model: Article }]
  }).then((category) => {
    if (category != undefined) {
      Category.findAll()
        .then((categories) => {
          console.log(category.articles)
          response.render("category", { articles: category.articles, categories });
        });
    } else {
      response.redirect("/");
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running");
});