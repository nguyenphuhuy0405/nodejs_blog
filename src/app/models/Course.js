const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

const Course = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        timestamps: true,
    },
)
// Add plugin
mongoose.plugin(slug)
Course.plugin(mongooseDelete, {
    deletedBy: true,
    deletedByType: String,
    deletedAt: true,
    overrideMethods: 'all',
})

module.exports = mongoose.model('Course', Course)
