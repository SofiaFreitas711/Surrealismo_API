const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js')
const { validationResult, body } = require('express-validator')

/**
 * @route POST /users/login
 * @group Users
 * @param {object} object.body - Credenciais do utilizador - ex. {"name":"admin", "password":"12345"}
 * @returns {object} 200 - Bearer Token
 * @returns {Error} 400 - Credenciais em falta
 * @returns {Error} 401 - Credenciais incorretas 
 * @returns {Error} 500 - Algo deu errado
 */
router.post('/login', (req, res) => {
    // userController.login(req, res)
})

/**
 * @route POST /users/register
 * @group Users
 * @param {object} object.body - Formulario para criar o utilizador - ex. {"name":"admin", "email": "user@example.com", "password":"1234", "birthDate": "AAAA-MM-DD", "locality": "Porto"} 
 * @returns {object} 201 - Utilizador criado
 * @returns {Error} 400 - Dados em falta
 * @returns {Error} 500 - Algo deu errado
 */
router.post('/register', [
    body('name').notEmpty().escape(),
    body('password').notEmpty().escape(),
    body('email').isEmail(),
    body('birthDate').notEmpty().escape(),
    body('locality').notEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        userController.register(req, res);
    } else {
        res.status(404).json({errors: errors.array()});
    }
})

/**
 * @route GET /users/
 * @group Users
 * @returns {object} 200 - Lista de utilizadores
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.get('/', (req, res) => {
    // userController.getAll(req, res);
})

/**
 * @route GET /users/:id
 * @group Users
 * @param {object} id.patch - Id do utilizador
 * @returns {object} 200 - User info
 * @returns {Error} 401 - Unauthorized
 * @returns {Error} 403 - Forbidden
 * @returns {Error} 404 - Not Found
 * @returns {Error} 500 - Internal server error
 * @security Bearer
 */
router.get('/:id', (req, res) => {
    // userController.findUser(req, res);
})

/**
 * @route PATCH /users/:id
 * @group Users
 * @param {object} object.body - Altera as informações do utilizador - ex. {"password": "123456", "email": "adim@example.com", "image": "image.jpg", "locality": "Gaia", "type": "admin"}
 * @param {object} id.patch - Id do utilizador
 * @returns {object} 200 - Utilizador alterado
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Utilizador não existe/encontrado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.patch('/:id', (req, res) => {
    // userController.update(req, res);
})

/**
 * @route DELETE /users/:id
 * @group Users
 * @param {object} id.patch - Id do utilizador
 * @returns {object} 204 - Utilizador eliminado
 * @returns {Error} 401 - É preciso estar autenticado
 * @returns {Error} 403 - Utilizador sem permissão
 * @returns {Error} 404 - Utilizador não existe/encontrado
 * @returns {Error} 500 - Algo deu errado
 * @security Bearer
 */
router.delete('/:id', (req, res) => {
    // userController.delete(req, res);
})

module.exports = router;