const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Article = require('../models/article');
const upload = require('../upload/articles image');

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
        console.log(req.file.path);
        res.send(err.message)
    });
    
    
});

// update article in the db
router.put('/articles/:id', function(req, res) {
    res.send({type: 'PUT'});
});

// delete article from the db
router.delete('/articles/:id', function(req, res) {
    res.send({type: 'DELETE'});
});

module.exports = router;
