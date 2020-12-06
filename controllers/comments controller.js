
const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/article');
const Comment = require('../models/comment');

const successHandler = require('../handlers/success handler');
const errorRes = require('../handlers/error handler');

// get comments

const getComments = async (req, res)=>{

    try{
        let post = await Article.findById(req.params.id)
        .populate('comments');
            
        return successHandler(res, 200, 'Successfully got all comments', 
                post.comments
                );

        }catch(error){
            console.log(error);
            return errorRes(res, 500, 'Error getting comments', error);
        };
                
}

module.exports = getComments;