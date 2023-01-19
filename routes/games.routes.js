const express = require('express');
const router = express.Router();
const gameController = require('../controllers/games.controller.js')
const { validationResult, body } = require('express-validator')
const utilities = require('../utilities/utilities.js');

/**
 * @route POST /games/
 * @group Games
 * @param {object} object.body - Formulario para criar o jogo - ex. {"name":"game", "image":"image.jpeg", "questions": [{"question": "question example", "alternatives": ['a1', 'a2', 'a3', 'a4'], "answer": "a1"}], "points": 150} 
 * @returns {object} 201 - Jogo criado
 * @returns {Error} 400 - Dados em falta
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.post('/', 
utilities.isAdmin,
[
    body('name').notEmpty().escape(),
    body('image').notEmpty().escape(),
    body('questions').notEmpty(),
    body('points').notEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        gameController.create(req, res);
    } else {
        res.status(404).json({errors: errors.array()});
    }
})

/**
 * @route GET /games/
 * @group Games
 * @returns {object} 200 - Lista de jogos
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.get('/', utilities.validateToken, (req, res) => {
    gameController.getAll(req, res);
})

/**
 * @route GET /games/:gameID
 * @group Games
 * @param {object} id.patch - Id do jogo
 * @returns {object} 200 - Jogo
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 404 - Jogo não existe/encontrado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.get('/:gameID', utilities.validateToken, (req, res) => {
    gameController.findGame(req, res);
})

/**
 * @route GET /games/type/:type
 * @group Games
 * @param {object} object.body - Retorna uma lista de jogos pesquisado pelo tipo
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Tipo inválido
 * @returns {Error} 404 - Tipo não encontrado
 * @returns {Error} 500 - Algo deu errado
 */
router.get('/type/:type', (req,res) => {
    gameController.findByType(req,res)
})

/**
 * @route PATCH /games/:gameID
 * @group Games
 * @param {object} object.body - Alterar alguma informação do jogo - ex. {"name":"game", "image":"image.jpeg", "questions": [{"question": "question example", "alternatives": ['b1', 'b2', 'b3', 'b4'], "answer": "b1"}], "points": 200} 
 * @param {object} id.patch - Id do jogo
 * @returns {object} 200 - Jogo alterado
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Jogo não existe/encontrado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.patch('/:gameID', utilities.validateToken, (req, res) => {
    gameController.update(req, res);
})

/**
 * @route DELETE /games/:gameID
 * @group Games
 * @param {object} id.patch - Id do jogo
 * @returns {object} 204 - Jogo eliminado
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Jogo não existe/encontrado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.delete('/:gameID', utilities.isAdmin, (req, res) => {
    gameController.delete(req, res);
})

module.exports = router;