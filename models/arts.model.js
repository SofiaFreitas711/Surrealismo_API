const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome em falta.']
    },
    image: {
        type: String,
        required: [true, 'Imagem em falta.']
    },
    artist: {
        type: mongoose.ObjectId
    },
    info: {
        type: String,
        required: [true, 'Descrição em falta.']
    },
    date: {
        type: Date,
        required: [true, 'Data em falta.']
    },
    technique: {
        type: Date,
        required: [true, 'Técnica em falta.']
    },
    location: {
        type: String,
        required: [true, 'Localização em falta.']
    }
});
const Art = mongoose.model("arts", schema);

module.exports = Art;