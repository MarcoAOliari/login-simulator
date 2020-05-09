const express = require("express"),
      User = require("../models/user"),
      Post = require("../models/post"),
      Comment = require("../models/comment");

let router = express.Router();

router.post("/profile/:user_id/posts/:post_id/comments/new", function(req, res){
    User.findById(req.user._id, function(err, user){
        if(err){
            console.log(err)
        } else {
            Post.findById(req.params.post_id, function(err, post){
                if(err){
                    console.log(err)
                } else {
                    Comment.create(req.body.comment, function(err, comment){
                        if(err){
                            console.log(err)
                        } else {
                            comment.author.id = req.user._id
                            comment.author.username = req.user._id
                            comment.post = post
                            comment.save()
                            user.comments.push(comment)
                            user.save()
                            post.comments.push(comment)
                            post.save()
                            res.redirect("/profile/" + req.params.user_id + "/posts/" + req.params.post_id)
                        }
                    })
                }
            }
        )}
    })
})

module.exports = router