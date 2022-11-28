const User = require('../models/users.model');
const bcrypt = require('bcrypt')

// exports.login = async (req, res) => {
//     try{
//        let user = await User.findOne({name: req.body.name})

//        if (!user) {
//         return res.status(400).json({
//             success: false,
//             msg: "Utilizador não encontrado"
//         })
//        }
//     }
// }