const express = require("express"),
      User = require("../models/user"),
      Post = require("../models/post");

let router = express.Router();

//CRIA NOVO POST NO BD
router.post("/profile/:id/posts/new", function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err)
        } else {
            Post.create(req.body.post, function(err, post){
                if(err){
                    console.log(err)
                } else {
                    post.author.id = req.user._id
                    post.author.username = req.user.username
                    post.save()
                    user.posts.push(post)
                    user.save()
                    res.redirect("/profile/" + req.params.id + "/posts")
                }
            })
        }
    })
})

//MOSTRA POST COM COMENTÁRIOS
router.get("/profile/:user_id/posts/:post_id", function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.render("posts/show", {post: post, pageUser: req.params.user_id})
        }
    })
})

//REGISTRA LIKE NO POST
router.post("/profile/:user_id/posts/:post_id/like", function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        } else {
            User.findById(req.user._id, function(err, user){
                if(err){
                    console.log(err)
                } else {
                    user.likes.push(post)
                    post.likes.push(user)
                    user.save()
                    post.save()
                    res.redirect("/profile/" + req.params.user_id + "/posts/" + req.params.post_id)
                }
            })
        }
    })
})

//EXIBE FORMULÁRIO PARA EDITAR POST
router.get("/profile/:user_id/posts/:post_id/edit", function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.render("posts/edit", {post: post, pageUser: req.params.user_id})
        }
    })
})

//EDITA POST
router.put("/profile/:user_id/posts/:post_id/edit", function(req, res){
    Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile/" + req.params.user_id + "/posts")
        }
    })
})

//DELETA POST
router.delete("/profile/:user_id/posts/:post_id", function(req, res){
    Post.findByIdAndRemove(req.params.post_id, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile/" + req.params.user_id + "/posts")
        }
    })
})

module.exports = router;