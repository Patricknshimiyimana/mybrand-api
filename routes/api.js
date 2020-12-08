const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Article = require('../models/article');
const Queries = require('../models/queries');
const Comment = require('../models/comment');
const upload = multer({dest: '../upload'});

// Get a list of articles from the db
router.get('/articles', function(req, res) {
    Article.find({}).then(function(articles) {
        res.send(articles)
    })
});

// Get a single post

router.get('/articles/:id', function(req, res) {
    Article.findOne({_id: req.params.id}).then(function(article){
        if (article) {
            res.send(article)
        } else {
           res.send('Post Not Found') 
        }
    }).catch((err) => {
        console.log(err.message)
    })
})

// add a new article to the db
router.post('/articles', upload.single('image'), function(req, res) {
    let article = new Article({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        summary: req.body.summary,
        body: req.body.body,
        image: req.file.path
    });
    article.save().then(function(article){
        res.status(201).send(article + 'post created')
    }).catch((err) => {
        console.log(err.message);
        res.status(422).send(err.message)
    });
    
    
});

// update article in the db
router.put('/articles/:id', upload.single('image'), function(req, res) {
    Article.findByIdAndUpdate({_id: req.params.id}, {
        title: req.body.title,
        summary: req.body.summary,
        body: req.body.body,
        image: req.file.path
    }).then(function() {
        Article.findOne({_id: req.params.id}).then(function(article) {
            res.send(article + 'post updated');
        }).catch((err) => {
            console.log(err.message)
        })
    });
});

// delete article from the db
router.delete('/articles/:id', function(req, res) {
    Article.findByIdAndRemove({_id: req.params.id}).then(function(article) {
        // Article.findOne({_id: req.params.id}).then(function(article) {
        //   res.send(article);
        // })
        res.send(article + 'this post has been deleted')
    });
});

// get user queries from the database
router.get('/queries', function(req, res) {
    Queries.find({}).then(function(queries) {
        res.send(queries)
    })
});

// add queries to the db
router.post('/queries', function(req, res) {

    let query = new Queries({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    });
    query.save().then(function(query){
        res.send(query + 'message sent')
    }).catch((err) => {
        console.log(err.message);
        res.status(422).send(err.message)
    });
    
    
});

// delete queries from the db
router.delete('/queries/:id', function(req, res) {
    Queries.findByIdAndRemove({_id: req.params.id}).then(function(queries) {
        res.send(queries + 'this message has been deleted')
    });
});


// comments route
const getComments = require('../controllers/comments controller');
// let comment = new Comment;

router.post('/articles/:id/comment', async(req, res) => {
    let comment = await new Comment({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save().then(async(comment) => {
        const article = await Article.findById(req.params.id);
        console.log(article);
        if (article) {
            article.comments.push(comment._id);
            article.commentsCount += 1;
           await article.save() 
        } else {
            res.status(404).send('article not found')
        }
        res.status(201).send(comment + 'comment posted')
    }).catch((err) => {
        console.log(err.message);
        res.status(422).send(err.message)
    });
    
    
});

// getting comments
router.get('/articles/:id/comment', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id).populate('comments');
        res.status(200).send(article.comments)
    } catch (err) {
        console.log(err);
        res.status(404).send(err)
    }
});


module.exports = router;



