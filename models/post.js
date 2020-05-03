const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
});

module.exports = mongoose.model("Post", postSchema);