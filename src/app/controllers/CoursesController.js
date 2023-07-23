const Course = require('../models/Course')
class CoursesController {
    // [GET] /courses/:slug
    show(req, res, next) {
        // res.send('Course Detail:' + req.params.slug)
        Course.findOne({ slug: req.params.slug })
            .lean()
            .then((courses) => res.render('courses/show', { courses }))
            .catch((err) => next(err))
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    async store(req, res, next) {
        const formData = req.body
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(formData)
        await course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((err) => next(err))
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .lean()
            .then((courses) => res.render('courses/edit', { courses }))
            .catch((err) => next(err))
    }

    // [PUT] /courses/:id
    async update(req, res, next) {
        await Course.updateOne(
            { _id: req.params.id },
            {
                ...req.body,
                image: `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`,
            },
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch((err) => next(err))
    }

    // [DELETE] /courses/:id
    async delete(req, res, next) {
        await Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((err) => next(err))
    }

    // [PATCH] /courses/:id/restore
    async restore(req, res, next) {
        await Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((err) => next(err))
    }

    // [DELETE] /courses/:id/force
    async forceDelete(req, res, next) {
        await Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch((err) => next(err))
    }
}

module.exports = new CoursesController()
