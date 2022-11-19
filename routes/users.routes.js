const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller.js')
const { validationResult, body } = require('express-validator')

router.post('/login', (req, res) => {
    userController.login(req, res)
})

router.post('/register', [
    body('username').notEmpty().escape(),
    body('password').notEmpty().escape(),
], (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        userController.register(req, res);
    } else {
        res.status(404).json({errors: errors.array()});
    }
})

router.get('/', (req, res) => {
    userController.getAll(req, res);
})

router.get('/:id', (req, res) => {
    userController.findUser(req, res);
})

router.patch('/:id', (req, res) => {
    userController.update(req, res);
})

router.delete('/:id', (req, res) => {
    userController.delete(req, res);
})

module.exports = router;