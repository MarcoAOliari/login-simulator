const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    post: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("Comment", commentSchema);