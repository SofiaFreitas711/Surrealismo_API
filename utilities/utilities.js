var jwt = require('jsonwebtoken');
let secret = process.env.SECRET; 

exports.generateToken = (user_info) => {
    let token = jwt.sign({
        data: user_info,
    }, secret, {expiresIn: '24h'});
    return token; 
}

exports.validateToken = (req, res, next) => {
    const header = req.headers['x-access-token'] || req.headers.authorization;
    if (typeof header === 'undefined') {
        return res.status(401).json({success: false, message: 'Nenhum token fornecido!'})
    }
    const bearer = header.split(' ');
    const token = bearer[1];
    try {
        let decoded = jwt.verify(token, secret);
        req.userID = decoded.data.id;
        req.userType = decoded.data.type;
        return next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({success: false, message: "Ops, seu token expirou! Por favor faça login novamente"})
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({success: false, message: "JWT mal formado"});
        } else {
            return res.status(401).json({success: false, message: "Não autorizado!"})
        }
    }
}

exports.isAdmin = (req, res, next) => {
    if (req.userType === 'admin') {
      return next();
    } else {
        return res.status(401).json({success: false, message: "Utilizador sem premissão!"})
    }
    
  };