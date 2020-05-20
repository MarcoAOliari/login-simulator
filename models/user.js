const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    surname: String,
    email: String,
    profileIconURL: {
        type: String,
        default: "https://image.flaticon.com/icons/svg/435/435061.svg"
    },
    registeredAt: {
        type: Date,
        default: Date.now
    },
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    notifications: [
        {
            username: String,
            id: Number,
            postId: String,
            //1: like a post, 2: comment a post
            seen: {
                type: Boolean,
                default: false
            }
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);