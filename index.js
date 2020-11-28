const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

// setup express app
const app = express();

app.use(bodyParser.json());

// initialize routes
app.use('/api', require('./routes/api'));


// connect to mongodb
const dbURI = 'mongodb+srv://patrick:rwanda@cluster0.4qk2g.mongodb.net/mybrand?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true }).then((result) => // listen for requests
app.listen(process.env.port || 3000, () => {
    console.log('server is listening to port 3000');
})).catch((err) => console.log(err));
mongoose.Promise = global.Promise;

//to init update post





