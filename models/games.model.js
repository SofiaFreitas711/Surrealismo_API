const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Falta o nome!']},
        image: { type: String, required: [true, 'Falta a imagem!']},
        questions: { type: Array, required: [true, 'Falta as perguntas!']},
        leaderbord: { type: Array},
        points: {type: Number, required: [true, 'Falta a pontuação total!']}
    }
);
const Game = mongoose.model("games", schema);

module.exports = Game;