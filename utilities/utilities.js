var jwt = require('jsonwebtoken');

let secret = process.env.SECRET; 

const generateToken = (user_info, callback) => {
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return callback(token); 
}

const validateToken = (token, callback) => {
    if(!token) {
        return callback(false); 
    } 
    jwt.verify(token.replace('Bearer ', ''), secret, function(error, decoded) {
        if(error) {
            return callback(false);
        } else {
            return callback(true)
        }
    })
}

const isAdmin = (req, res, next) => {
    if (req.user.roles === 'admin') {
      return next();
    }
    res.redirect('/');
  };

exports.generateToken = generateToken
exports.validateToken = validateToken
exports.isAdmin = isAdmin