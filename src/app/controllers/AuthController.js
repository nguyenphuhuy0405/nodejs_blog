const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidator } = require('./../../validations/auth')
require('dotenv').config()
class AuthController {
    // [GET] /auth/register-page
    registerPage(req, res, next) {
        res.render('auth/register')
    }

    // [POST] /auth/register
    async register(req, res, next) {
        //Check validator
        const { error } = registerValidator(req.body)
        if (error)
            return res.status(400).json({
                isSuccess: false,
                message: error.details[0].message,
            })

        //Check email exist
        const isCheckedEmailExist = await User.findOne({
            email: req.body.email,
        }).lean()
        if (isCheckedEmailExist)
            return res.status(400).json({
                isSuccess: false,
                message: 'Email is already exist',
            })

        // Hash password
        const bcrypt = require('bcryptjs')
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        //Create new user
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
        })

        //Render
        const newUser = await user
            .save()
            .then(() => res.render('auth/login'))
            .catch((err) => next(err))

        //API
        // try{
        //     const newUser = await user.save()
        //     return res.status(200).json({
        //         isSuccess: true,
        //         message: 'Register success',
        //         data: newUser
        //     })
        // }catch(error){
        //     return res.status(400).json({
        //         isSuccess: false,
        //         message: error
        //     })
        // }
    }

    // [GET] /auth/login-page
    loginPage(req, res, next) {
        res.render('auth/login')
    }

    // [POST] /auth/login
    async login(req, res, next) {
        //Check user
        const user = await User.findOne({ email: req.body.email }).lean()
        if (!user)
            return res.status(400).json({
                isLogin: false,
                isSuccess: false,
                message: 'User is not exist',
            })

        //Check password
        const isCheckPassword = await bcrypt.compare(
            req.body.password,
            user.password,
        )
        if (!isCheckPassword)
            return res.status(400).json({
                isLogin: false,
                isSuccess: false,
                message: 'Password is not correct',
            })

        //Create token
        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.TOKEN_SECRET,
            { expiresIn: '1d' },
        )
        console.log('token:', token)
        const isLogin = true
        //Render
        res.render('home', { user, isLogin, token })

        //API
        // return res.json({
        //     isLogin: true,
        //     accessToken: token,
        //     isSuccess: true,
        //     message: `${user.name} is login`,
        //     data: user,
        // });
    }
}

module.exports = new AuthController()
