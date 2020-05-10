const express = require("express"),
      User = require("../models/user"),
      Post = require("../models/post"),
      Comment = require("../models/comment");

let router = express.Router();

//CRIA NOVO COMENTÁRIO
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

//REMOVE COMENTÁRIO
router.delete("/profile/:user_id/posts/:post_id/comments/:comment_id/delete", function(req, res){
    User.findByIdAndUpdate(req.user._id, {$pull: {comments: req.params.comment_id}}, function(err, user){
        if(err){
            console.log(err)
        } else {
            Post.findByIdAndUpdate(req.params.post_id, {$pull: {comments: req.params.comment_id}}, function(user, post){
                if(err){
                    console.log(err)
                } else {
                    Comment.findByIdAndRemove(req.params.comment_id, function(err){
                        if(err){
                            console.log(err)
                        } else {
                            res.redirect("/profile/" + req.params.user_id + "/posts/" + req.params.post_id)
                        }
                    })
                }
            })
        }
    })
})

module.exports = router