const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artists.controller.js')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /artists/
 * @group Artists
 * @param {object} object.body - Retorna todas as informações dos artistas - ex. {}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 500 - Algo deu errado
 */

router.get('/', (req, res) => {
    artistsController.getAll(req, res)
})

/**
 * @route GET /artists/:id
 * @group Artists
 * @param {object} object.body - Retorna a informação de um artista pesquisado pelo id - ex. {}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - id inválido
 * @returns {Error} 404 - id não encontrado
 * @returns {Error} 500 - Algo deu errado
 */
router.get('/:id', (req,res) => {
    artistsController.findById(req, res)
})

/**
 * @route Post /artists/
 * @group Artists
 * @param {object} object.body - Formulário para adicionar novo artista - ex. {}
 * @returns {object} 201 - Criado com sucesso
 * @returns {Error} 400 - Dados em falta
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.post('/', [
    body('name').notEmpty().escape(),
    body('image').notEmpty().escape(),
    body('info').notEmpty().escape(),
] ,(req,res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        artistsController.create(req,res)
    } else {
        res.status(404).json({errors: errors.array()});
    }
})

/**
 * @route Put /artists/:id
 * @group Artists
 * @param {object} id.put - Formulário para alterar artista - ex. {}
 * @returns {object} 200 - Noticia alterada
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Noticia não existe/encontrada
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */

router.put('/:id', (req, res) => {
    artistsController.update(req, res);
})

/**
 * @route DELETE /artists/:id
 * @group Artists
 * @param {object} id.delete - Id da noticia
 * @returns {object} 204 - noticia eliminada
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Noticia não existe/encontrada
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.delete('/:id', (req, res) => {
    artistsController.delete(req, res);
})

module.exports = router;