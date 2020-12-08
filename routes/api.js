const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Article = require('../models/article');
const Queries = require('../models/queries');
const upload = multer({dest: '../upload'});

// Get a list of articles from the db
router.get('/articles', function(req, res) {
    Article.find({}).then(function(articles){
        if(articles){
        res.status(200).send(articles)
        }else{
            res.status(404).json('Articles not found');
        }
    }).catch((error)=>{
        res.status(500).send(err.message)
    });
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
        res.status(200).send(queries)
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
        res.status(201).send(query + 'message sent')
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


module.exports = router;



