const express = require("express"),
      User = require("../models/user"),
      passport = require("passport");

let router = express.Router();

/*
LOGIN
*/

//Mostra página inicial com login
router.get("/", function(req, res){
    res.render("login");
});

//Realiza o login
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/profile",
        failureRedirect: "/",
    }), function(req, res){
});

//Pagina inicial de perfil
router.get("/profile", function(req, res){
    res.render("user/welcome");
})

/*
CADASTRO
*/

//Mostra formulário de cadastro
router.get("/register", function(req, res){
    res.render("register");
});

//Registra novo usuário no bd
router.post("/register/new", function(req, res){
    let newUser = new User({
        firstName: req.body.firstName,
        surname: req.body.surname,
        username: req.body.username,
        birth: req.body.birth
    });

    if(req.body.password !== req.body.repeatedPassword){
        req.flash("error", "Senhas diferentes");
        return res.redirect("/");
    }

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            if(err.name === "UserExistsError"){
                req.flash("error", "Usuário já existe!");
                return res.redirect("/");
            }
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect("/");
            });
        }
    });
});

module.exports = router;