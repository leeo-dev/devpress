const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (request, response)=>{
  response.send("Página de Usuários");
});

router.get("/login", (request, response)=>{
  response.render("admin/admin/login");
});

router.post("/authenticate", (request, response)=>{
  let email = request.body.email;
  let password = request.body.password;

  User.findOne({where: {email}})
  .then((user)=>{
    if(user != undefined){
      let correct = bcrypt.compareSync(password, user.password);
      if(correct){
        request.session.user = {
          id: user.id,
          email: user.email
        }

        response.json(request.session.user);
      }else{
        response.redirect("/login");
      }
    }else{
      response.redirect("/login");
    }
  });
});

router.get("/admin/users/create", (request, response)=>{
  response.render("admin/admin/create");
});

router.post("/users/create", (request, response)=>{
  let email =  request.body.email;
  let password = request.body.password;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  User.create({email, password: hash})
  .then(()=>{
    response.redirect("/admin/users");
  }).catch((err)=>{
    response.redirect("/admin/users");
  });

});

module.exports = router;