const User = require('../models/users.model');
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    try {
        let user = await User.findOne({name: req.body.name});

        if (!user) {
            return res.status(404).json({success: false, msg: "Utilizador não encontrado"});
        }

        const check = req.body.password = user.password;

        if (!check) {
            return res.status(401).json({
                success: false,
                accessToken: null,
                msg: "Palavra-passe esta incorreta"
            })
        }

        // Token

        return res.status(200).json({
            success: true,
            // accessToken: token,
            id: user._id,
            role: user.type,
        })
    } catch (err) {
        res.status(500).json({ success: false, msg: err.message || "Ocorreu algum erro no login." });
    };
}

exports.register = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        birthDate: req.body.birthDate,
        locality: req.body.locality,
        type: 'user',
        active: { type: Boolean, default: true},
        points: 0,
        gamesPlayed: [],
        exchanges: [],
        favorites: [],
    });

    try {
        await user.save();
        res.status(201).json({success: true, msg: "Novo Utilizador criado com sucesso.", URL: `/user/${user._id}`})
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({success: false, msgs: errors});
        } else {
            res.status(500).json({success: false, msg: err.message || "Ocorreu algum erro ao criar o utilizador!"})
        }
    }
}