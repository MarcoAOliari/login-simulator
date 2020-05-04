const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Post", postSchema);