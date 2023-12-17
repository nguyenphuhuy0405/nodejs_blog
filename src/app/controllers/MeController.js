const Course = require('../models/Course')
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        let courseFind = Course.find({}).lean()
        if (req.query.hasOwnProperty('_sort')) {
            courseFind = courseFind.sort({
                [req.query.column]: req.query.type,
            })
        }

        Promise.all([
            courseFind,
            Course.countDocumentsWithDeleted({ deleted: true }).lean(),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses,
                    deletedCount,
                }),
            )
            .catch((err) => next(err))
    }
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((courses) => res.render('me/trash-courses', { courses }))
            .catch((err) => next(err))
    }
}

module.exports = new MeController()
