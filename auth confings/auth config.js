
const jwt = require('jsonwebtoken');

const auth = function(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'ttest123', (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
                console.log(err.message);
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports = auth;
