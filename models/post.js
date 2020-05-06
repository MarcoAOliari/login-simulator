const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.String,
            ref: "User"
        },
        username: String
    },
    likes: [
        {
            type: mongoose.Schema.Types.String,
            ref: "User",
        }
    ]
});

module.exports = mongoose.model("Post", postSchema);