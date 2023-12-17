const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const courseSchema = new Schema(
    {
        _id: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
        videoId: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            slug: 'name',
            unique: true,
        },
    },
    {
        _id: false,
        timestamps: true,
    },
)
// Add plugin
mongoose.set('strictQuery', false)
mongoose.plugin(slug)
courseSchema.plugin(AutoIncrement)
courseSchema.plugin(mongooseDelete, {
    deletedBy: true,
    deletedByType: String,
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', courseSchema)
