const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Falta o nome']
    },
    image: {
        type: String,
        required: [true, 'Falta a imagem']
    },
    date: {
        type: Date,
        required: [true, 'Falta a data']
    },
    info: {
        type: String,
        required: [true, 'Falta uma descrição']
    },
    artist: {
        type: mongoose.ObjectId
    },
    location: {
        type: String,
        required: [true, 'Falta a sua localização']
    }
});
const Art = mongoose.model("arts", schema);

module.exports = Art;