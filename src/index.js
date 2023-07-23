const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars').engine
const methodOverride = require('method-override')

const db = require('./config/db')

const app = express()
const port = 3000

const route = require('./routes')

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
        },
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources', 'views'))

// For parsing application/json
app.use(express.json())
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// override with POST having ?_method=PUT
app.use(methodOverride('_method'))

//Connect to DB
db.connect()
//Routes init
route(app)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
