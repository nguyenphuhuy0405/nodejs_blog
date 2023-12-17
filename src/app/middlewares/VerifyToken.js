const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

function VerifyToken(req, res, next) {
    const token = req.header('access-token')
    if (!token) return res.status(401).send('Access denied')
    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
            if (err)
                return res.status(401).json({
                    isSuccess: false,
                    message: 'Invalid Token',
                })
            console.log('decoded: ', decode)
            req.user = decode
            next()
        })
    } catch (error) {
        return res.status(400).json({
            isSuccess: false,
            message: 'Invalid Token',
        })
    }
}

function isAdmin(req, res, next) {
    if (req.user.role !== 'admin')
        return res.status(401).json({
            isSuccess: false,
            message: 'Required admin role',
        })
    next()
}
module.exports = {
    VerifyToken,
    isAdmin,
}
