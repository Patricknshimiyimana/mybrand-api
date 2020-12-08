const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    // author: {
    //     type: String,
    //     required: true
    // },

    summary: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },

    comments:[{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],

    commentsCount:{
        type: Number,
        default: 0
    }


    
}, { timestamps: true });

const Article = mongoose.model('article', articleSchema);
module.exports = Article;

 