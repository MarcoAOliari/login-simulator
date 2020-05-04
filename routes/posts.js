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
                    res.redirect("/profile/posts/" + req.params.id)
                }
            })
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
                    res.redirect("/profile/" + req.params.user_id + "/posts")
                }
            })
        }
    })
})

module.exports = router;