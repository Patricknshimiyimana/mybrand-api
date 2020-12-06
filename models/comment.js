const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        default: "Unknown"
    },

    comment: {
        type: String
    }
}, {timestamps: true});


const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;