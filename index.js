const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

// setup express app
const app = express();

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));


// // connect to mongodb
// const dbURI = 'mongodb+srv://patrick:rwanda@cluster0.4qk2g.mongodb.net/mybrand?retryWrites=true&w=majority';
// mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true }).then((result) => // listen for requests
// app.listen(process.env.port || 3000, () => {
//     console.log('server is listening to port 3000');
// })).catch((err) => console.log(err));

// mongoose.Promise = global.Promise;



// database connection for tests
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





