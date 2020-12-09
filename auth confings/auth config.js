
const jwt = require('jsonwebtoken');

const auth = function(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, 'ttest123', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.send('login first')
                // res.redirect('/login')
            } else {
                console.log(decodedToken);
                next()
            }
        })
    } else {
        res.send('login first')
        // res.redirect('/login');
        
    }
}

module.exports = { auth };
