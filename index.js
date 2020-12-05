const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();

// setup express app
const app = express();

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));


// connect to mongodb

mongoose.connect(process.env.NODE_ENV==='test' ?  process.env.dbURItest : process.env.dbURI, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true })
.then(function(){
    console.log('connected to the database');
}).catch((err)=>{
    console.log(err.message);
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log('listening to port 3000 for requests!');
});

module.exports = app;




