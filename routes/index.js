const express = require("express"),
      User = require("../models/user"),
      passport = require("passport"),
      middleware = require("../middleware");

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
        failureRedirect: "/"
    }), function(req, res){
        res.redirect("/profile/" + req.user._id + "/posts")
});

//Pagina inicial de perfil
router.get("/profile/:id/posts", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id).populate({path: "posts", options: {sort: {registerAt: -1}}}).exec(function(err, user){
        if(err){
            console.log(err)
        } else {
            res.render("user/profile", {pageUser: user});
        }
    })
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
        email: req.body.email,
        _id: req.body.username,
        username: req.body.username,
        birth: req.body.birth
    });

    if(req.body.password !== req.body.repeatedPassword){
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

/*
EDITA PERFIL
*/

//Exibe form de edição
router.get("/profile/:id/edit", function(req, res){
    res.render("user/edit"); 
})

//Edita usuário
router.put("/profile/:id/edit", function(req, res){
    User.findByIdAndUpdate(req.user.id, req.body.user, function(err, user){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile/" + user.id + "/posts")
        }
    })
})

/*
LOGOUT
*/

//Faz logout
router.get("/logout", middleware.isLoggedIn, function(req, res){
    req.logout()
    res.redirect("/")
})

module.exports = router;