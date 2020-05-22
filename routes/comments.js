const express = require("express"),
      User = require("../models/user"),
      Post = require("../models/post"),
      Comment = require("../models/comment"),
      Notification = require("../models/notification"),
      middleware = require("../middleware");

let router = express.Router();

//CRIA NOVO COMENTÁRIO
router.post("/profile/:user_id/posts/:post_id/comments/new", middleware.isLoggedIn, function(req, res){
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
                            User.findById(req.params.user_id, function(err, author){
                                if(err) {
                                    console.log(err)
                                } else {
                                    let notification = {
                                        commentPost: comment,
                                        index: 2,
                                        username: req.user.username
                                    }

                                    Notification.create(notification, function(err, notification){
                                        if(err) {
                                            console.log(err)
                                        } else {
                                            author.notifications.push(notification)
                                            author.save()
                                            comment.author.id = req.user._id
                                            comment.author.username = req.user.username
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
                            })
                        }
                    })
                }
            }
        )}
    })
})

//MOSTRA FORMULÁRIO PARA EDIÇÃO DE COMENTÁRIO
router.get("/profile/:user_id/posts/:post_id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err){
            console.log(err)
        } else {
            res.render("comments/edit", {pageUser: req.params.user_id, post: req.params.post_id, comment: comment})
        }
    })
})

//EDITA FORMULÁRIO
router.put("/profile/:user_id/posts/:post_id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile/" + req.params.user_id +"/posts/" + req.params.post_id)
        }
    })
})

//REGISTRA LIKE NO COMENTÁRIO
router.post("/profile/:user_id/posts/:post_id/comments/:comment_id/like", function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment){
        if(err) {
            console.log(err)
        } else {
            User.findById(req.params.user_id, function(err, postAuthor){
                if(err) {
                    console.log(err)
                } else {
                    let notification = {
                        commentLiked: comment,
                        index: 3,
                        username: req.user.username,
                    }

                    Notification.create(notification, function(err, notification){
                        if(err) {
                            console.log(err)
                        } else {
                            postAuthor.notifications.push(notification)
                            comment.likes.push(req.user)
                            postAuthor.save()
                            comment.save()

                            res.redirect("/profile/" + req.params.user_id + "/posts/" + req.params.post_id)
                        }
                    })
                }
            })
        }
    })
})

//REMOVE COMENTÁRIO
router.delete("/profile/:user_id/posts/:post_id/comments/:comment_id/delete", middleware.checkCommentOwnership, function(req, res){
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