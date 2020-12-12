const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const Article = require('../models/article');
const upload = multer({dest: '../upload'});


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
        res.status(201).send(article)
    }).catch((err) => {
        res.status(500).send(err.message)
    });
    
    
});



module.exports = router;
