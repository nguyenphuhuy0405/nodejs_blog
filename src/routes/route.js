const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const authRouter = require('./auth')
const userRouter = require('./user')

function route(app) {
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/me', meRouter)
    app.use('/courses', coursesRouter)
    app.use('/news', newsRouter)
    app.use('/', siteRouter)
}

module.exports = route
