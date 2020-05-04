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

module.exports = router;