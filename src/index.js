const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine
const methodOverride = require('method-override')
const db = require('./config/db/connectDB')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const app = express()
const route = require('./routes/route')
const { VerifyToken, isAdmin } = require('./app/middlewares/VerifyToken')
require('dotenv').config()

//Static File
app.use(express.static(path.join(__dirname, '/public')))

// HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                let sortType = field === sort.column ? sort.type : 'default'
                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `
                <a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>
                `
            },
            handleRegister: (isSuccess, message) => {
                if (!isSuccess) {
                    console.log('isSuccess: ', isSuccess)
                    console.log('message: ', message)
                    return `<p id="message" class="form-text text-danger">${message}</p>`
                } else {
                    return ``
                }
            },
            handleLogin: (user, isLogin) => {
                if (isLogin) {
                    if (user.role == 'user') {
                        return `<li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <img class="user-avatar" src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/134350477_2489792431313320_5722535323206280313_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ISs3zKyAHO4AX-IPg_v&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCdpf0wcUsqIt_sm9JIq7K7mgcjyBW-Db2ult1lGGLS8g&oe=64DA167E" alt="">
                                    ${user.name}
                                    </a>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="/courses/create">Đăng khoá học</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/me/stored/courses">Khoá học của tôi</a>
                                    <a class="dropdown-item" href="/me/stored/news">Bài viết của tôi</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Đăng xuất</a>
                                    </div>
                                </li>`
                    } else if (user.role == 'admin') {
                        return `<li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                    <img class="user-avatar" src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/134350477_2489792431313320_5722535323206280313_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=ISs3zKyAHO4AX-IPg_v&_nc_ht=scontent.fsgn2-6.fna&oh=00_AfCdpf0wcUsqIt_sm9JIq7K7mgcjyBW-Db2ult1lGGLS8g&oe=64DA167E" alt="">
                                    ${user.name}
                                    </a>
                                    <div class="dropdown-menu">
                                    <a class="dropdown-item" href="/courses/create">Đăng khoá học</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="/me/stored/courses">Khoá học của tôi</a>
                                    <a class="dropdown-item" href="/me/stored/news">Bài viết của tôi</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Quản lý trang</a>
                                    <div class="dropdown-divider"></div>
                                    <a class="dropdown-item" href="#">Đăng xuất</a>
                                    </div>
                                </li>`
                    }
                } else {
                    return `<li class="nav-item">
                                <a class="nav-link" href="/auth/login-page">Đăng nhập</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/auth/register-page">Đăng ký</a>
                            </li>`
                }
            },
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// For parsing application/json
app.use(express.json())
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Custom middleware
app.use(SortMiddleware)

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))

//Connect to DB
db.connect()
//Routes init
route(app)

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})
