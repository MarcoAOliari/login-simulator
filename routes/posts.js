const express = require("express"),
      User = require("../models/user"),
      Post = require("../models/post"),
      Comment = require("../models/comment"),
      Notification = require("../models/notification"),
      middleware = require("../middleware"),
      async = require("async")

let router = express.Router();

//CRIA NOVO POST NO BD
router.post("/profile/:id/posts/new", middleware.isLoggedIn,function(req, res){
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
router.get("/profile/:user_id/posts/:post_id", middleware.isLoggedIn, function(req, res){

    Post
    .findById(req.params.post_id)
    .populate({
        path: "comments",
        options: {
            sort: {
                updatedAt: -1
            }
        },
        populate: {
            path: "author.id"
        }
    })
    .exec(function(err, post){

        if(err){
            console.log(err)
        } else {
            User.findById(req.params.user_id, function(err, user){
                if(err) {
                    console.log(err)
                } else {
                    res.render("posts/show", {post: post, pageUser: user})
                }
            })
        }
    })
})

//REGISTRA LIKE NO POST
router.post("/profile/:user_id/posts/:post_id/like", middleware.isLoggedIn, function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        } else {
            if(post.likes.indexOf(req.user._id) === -1){
                User.findById(req.user._id, function(err, user){
                    if(err){
                        console.log(err)
                    } else {
                        User.findById(req.params.user_id, function(err, author){
                            if(err) {
                                console.log(err)
                            } else {

                                if(!req.user._id.equals(author._id)) {

                                    let notification = {
                                        postLiked: post,
                                        index: 1,
                                        username: req.user.username
                                    }

                                    Notification.create(notification, function(err, notification){
                                        if(err) {
                                            console.log(err)
                                        } else {
                                            author.notifications.push(notification)
                                            author.save()
                                        }
                                    })
                                }

                                user.likes.push(post)
                                post.likes.push(user)
                                user.save()
                                post.save()
                                res.redirect("/profile/" + req.params.user_id + "/posts/" + req.params.post_id)
                            }
                        })
                    }
                })
            }
        }
    })
})

//EXIBE FORMULÁRIO PARA EDITAR POST
router.get("/profile/:user_id/posts/:post_id/edit", middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.render("posts/edit", {post: post, pageUser: req.params.user_id})
        }
    })
})

//EDITA POST
router.put("/profile/:user_id/posts/:post_id/edit", middleware.checkPostOwnership, function(req, res){
    Post.findByIdAndUpdate(req.params.post_id, req.body.post, function(err, post){
        if(err){
            console.log(err)
        } else {
            res.redirect("/profile/" + req.params.user_id + "/posts")
        }
    })
})

//DELETA POST
router.delete("/profile/:user_id/posts/:post_id", middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.post_id, function(err, post){
        if(err){
            console.log(err)
        }
        User.findOneAndUpdate(post.author.id, {$pull: {posts: post._id}}, function(err, user){
            if(err){
                console.log(err)
            }
            user.save();
        })
        Comment.deleteMany({
            "_id": {
                $in: post.comments
            }
        }, function(err){
            if(err){
                console.log(err)
            } else {
                post.remove();
                res.redirect("/profile/" + req.params.user_id + "/posts")
            }
        })
    })
})
    

module.exports = router;