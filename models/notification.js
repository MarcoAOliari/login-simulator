const mongoose = require("mongoose")

var notificationSchema = new mongoose.Schema({
    postLiked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },
    commentPost: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },
    commentLiked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    },

    seen : {
        type: Boolean,
        default: false
    },

    //1: postLiked 2:commentPost 3:commentLiked
    index: Number,
    username: String,

    registeredAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Notification", notificationSchema)