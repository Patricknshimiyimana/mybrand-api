
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const createToken = function(id){
    return jwt.sign( {id}, 'ttest123', { expiresIn: 1000*60*60*24 });
};

// logging out a user
const logout = function(req, res){
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
}

// creating a user
const signup = function(req, res) {
    User.create(req.body).then((user) => {
        const token = createToken(user._id);
        res.cookie('jwt', token);
        res.send(user);

    })
}

const login_get = (req, res) => {
    res.send('login page');
}

const login_post = async (req, res) => {
    let { email, password } = req.body;
   
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true});
        res.status(200).send({user: user })
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports = {signup, login_get, login_post, logout};



