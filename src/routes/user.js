const express = require('express')
const router = express.Router()
const userController = require('../app/controllers/UserController')
const { VerifyToken, isAdmin } = require('../app/middlewares/VerifyToken')

//Role User
router.get('/info', [VerifyToken], userController.info)
router.put('/update', [VerifyToken], userController.update)
//Role Admin
router.get('/list', [VerifyToken, isAdmin], userController.list)
router.put(
    '/update-user/:id',
    [VerifyToken, isAdmin],
    userController.updateUser,
)
router.delete('/:id', [VerifyToken, isAdmin], userController.delete)

module.exports = router
