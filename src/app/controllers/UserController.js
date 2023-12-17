const User = require('../models/User')
class UserController {
    // [GET] /user/list
    async list(req, res, next) {
        const users = await User.find({})
        return res.json({
            isSuccess: true,
            message: 'Get user list success',
            data: users,
        })
    }

    // [GET] /user/info
    async info(req, res, next) {
        //Find user
        const user = await User.findOne({ _id: req.user._id })
        return res.json({
            isSuccess: true,
            message: 'Get user info success',
            data: {
                name: user.name,
                email: user.email,
            },
        })
    }

    // [DELETE] /user/:id
    async delete(req, res, next) {
        const user = await User.deleteOne({ _id: req.params.id })
        return res.json({
            isSuccess: true,
            message: 'Delete user success',
            data: user,
        })
    }

    // [PUT] /user/:id
    async update(req, res, next) {
        //Update user
        await User.updateOne(
            {
                _id: req.user._id,
            },
            {
                name: req.body.name,
            },
        )

        //Find user
        const user = await User.findOne({ _id: req.user._id })

        return res.json({
            isSuccess: true,
            message: 'Update user success',
            data: {
                name: user.name,
                email: user.email,
            },
        })
    }

    // [PUT] /user/update-user/:id
    async updateUser(req, res, next) {
        //Update user
        await User.updateOne(
            {
                _id: Number(req.params.id),
            },
            {
                name: req.body.name,
            },
        )
            .then(() => next())
            .catch((err) => next(err))

        //Find user
        const user = await User.findOne({ _id: Number(req.params.id) })
            .then(() =>
                res.json({
                    isSuccess: true,
                    message: 'Update user success',
                    data: user,
                }),
            )
            .catch((err) => next(err))
    }
}

module.exports = new UserController()
