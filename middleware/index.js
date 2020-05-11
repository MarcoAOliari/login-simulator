let Post = require("../models/post")
let Comment = require("../models/comment")

let middlewareObj = {}

//VERIFICA SE O POST PERTENCE AO USUÁRIO
middlewareObj.checkPostOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Post.findById(req.params.post_id, function(err, post){
            if(err){
                console.log(err)
            } else {
                if(post.author.id === req.user._id){
                    next()
                } else {
                    res.redirect("/")
                }
            }
        })
    } else {
        res.redirect("/")
    }
}

//VERIFICA SE O COMENTÁRIO PERTENCE AO USUÁRIO
middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                console.log(err)
            } else {
                if(comment.author.id === req.user_id){
                    next()
                } else {
                    res.redirect("/")
                }
            }
        })
    } else {
        res.redirect("/")
    }
}

//VERIFICA SE O USUÁRIO ESTÁ LOGADO
middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        next()
    } else {
        res.redirect("/")
    }
}

module.exports = middlewareObj