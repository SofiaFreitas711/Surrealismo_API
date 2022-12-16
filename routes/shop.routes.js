const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop.controller.js')
const { validationResult, body } = require('express-validator')

/**
 * @route GET /trocas/
 * @group Shop
 * @param {object} object.body - Retorna todas as trocas disponiveis - ex. {}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 500 - Algo deu errado
 */

router.get('/', (req, res) => {
    // shopController.getAll(req, res)
})

/**
 * @route GET /trocas/:id
 * @group Shop
 * @param {object} object.body - Retorna a informação de uma troca pesquisado pelo id - ex. {}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - id inválido
 * @returns {Error} 404 - id não encontrado
 * @returns {Error} 500 - Algo deu errado
 */
router.get('/:id', (req,res) => {
    // shopController.findById(req, res)
})

/**
 * @route Post /trocas/
 * @group Shop
 * @param {object} object.body - Formulário para adicionar nova troca - ex. {}
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
        //shopController.create(req,res)
    } else {
        res.status(404).json({errors: errors.array()});
    }
})

/**
 * @route Put /trocas/:id
 * @group Shop
 * @param {object} id.put - Formulário para alterar troca - ex. {}
 * @returns {object} 200 - Noticia alterada
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Troca não existe/encontrada
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */

router.put('/:id', (req, res) => {
    // shopController.update(req, res);
})

/**
 * @route DELETE /trocas/:id
 * @group Shop
 * @param {object} id.delete - Id da troca
 * @returns {object} 204 - Troca eliminada
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Troca não existe/encontrada
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.delete('/:id', (req, res) => {
    // shopController.delete(req, res);
})

module.exports = router;