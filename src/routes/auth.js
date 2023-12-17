const express = require('express')
const router = express.Router()
const authController = require('../app/controllers/AuthController')

router.get('/register-page', authController.registerPage)
router.post('/register', authController.register)
router.get('/login-page', authController.loginPage)
router.post('/login', authController.login)
module.exports = router
