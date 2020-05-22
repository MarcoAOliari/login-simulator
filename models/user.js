const mongoose = require("mongoose"),
      Notification = require("../models/notification").schema,
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
    notifications: [Notification]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);