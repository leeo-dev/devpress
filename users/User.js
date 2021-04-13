const Sequelize = require("sequelize");
const { use } = require("../categories/CategoriesController");
const connection = require("../database/database");

const User = connection.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;