const mongoose = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    _id: String,
    username: String,
    firstName: String,
    surname: String,
    email: String,
    registerAt: {
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
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);