const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Article = require('../models/article');
const upload = multer({dest: '../upload'});

// Get a list of articles from the db
router.get('/articles', function(req, res) {
    res.send({type: 'GET'});
});

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
        res.send(article)
    }).catch((err) => {
        console.log(err.message);
        res.status(422).send(err.message)
    });
    
    
});

// update article in the db
router.put('/articles/:id', function(req, res) {
    res.send({type: 'PUT'});
});

// delete article from the db
router.delete('/articles/:id', function(req, res) {
    Article.findByIdAndRemove({_id: req.params.id}).then(function(article) {
        // Article.findOne({_id: req.params.id}).then(function(article) {
        //   res.send(article);
        // })
        res.send('this post has been deleted')
    });
});

module.exports = router;
