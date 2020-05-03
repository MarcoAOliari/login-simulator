const mongoose = require("mongoose");
      passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    firstName: String,
    surname: String,
    birth: {
        type: Date,
        min: '1910-01-01'
    },
    username: String,
    password: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);