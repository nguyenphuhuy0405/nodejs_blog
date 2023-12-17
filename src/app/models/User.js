const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose)

const userSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        email: {
            type: String,
            required: true,
            min: 6,
            max: 225,
        },
        password: {
            type: String,
            required: true,
            min: 6,
            max: 255,
        },
        role: {
            type: String,
            required: true,
            default: 'user',
        },
    },
    {
        _id: false,
        timestamps: true,
    },
)
mongoose.set('strictQuery', false)
userSchema.plugin(AutoIncrement, { id: 'idUser' })

module.exports = mongoose.model('User', userSchema)
