const Shop = require('../models/shop.model.js');

exports.create = async(req, res) => {

    const shop = new Shop({
        name: req.body.name,
        discount: req.body.discount,
        amountPoints: req.body.amountPoints,
        info: req.body.info
    })

    try {
        await shop.save()
        res.status(201).json({success: true, msg: "Nova troca criada com sucesso!", URL: `/shop/${shop._id}`});
    } catch (err){
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: err.message || "Ocorreu algum erro ao criar a nova troca."})
        }

    }
}

exports.getAll = async (req, res) => {
    try {
        let data = await Shop
            .find()
            .select('name discount amountPoints')
            .exec();
        res.status(200).json({ success: true, shop: data });
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({ success: false, msg: err.message || "Ocorreu algum erro ao recuperar as ofertas."})
        }
    }
}

exports.findById = async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.shopID).exec();

        if (shop === null) {
            res.status(404).json({success: false, msg: `Não foi possível encontrar nenhuma oferta com o ID ${req.params.shopID}`})
        }

        res.json({success: true, shop: shop})
    } catch (err) {
        if (err.name === "ValidationError") {
            let errors = [];
            Object.keys(err.errors).forEach(key => {
                errors.push(err.errors[key].message);
            });
            return res.status(400).json({success: false, msg: `Erro ao recuperar a oferta com ID ${req.params.shopID}.`})
        }
    }
}

exports.update = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndUpdate(req.params.shopID, req.body).exec();

        if (!shop) {
            return res.status(404).json({message: `Não é possível atualizar a oferta com id=${req.params.shopID}. Verifica se esta oferta existe!`});
        }
        res.status(200).json({message: `Oferta atualizada com sucesso!`});
    } catch (err) {
        res.status(500).json({message: `Erro ao atualizar a oferta`});
    }   
}

exports.delete = async (req, res) => {
    try {
        const shop = await Shop.findByIdAndRemove(req.params.shopID).exec()
        
        if (!shop) {
            res.status(404).json({message: `Não é possivel excluir a oferta com id=${req.params.shopID}.`});
        } else {
            res.status(200).json({message: `Oferta com id=${req.params.shopID} foi excluída com sucesso`})
        }
    } catch (err) {
        res.status(500).json({message: `Erro ao excluir a oferta com o id=${req.params.shopID}`});
    };
}