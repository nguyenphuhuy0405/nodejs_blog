const Course = require('../models/Course')
class MeController {
    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([
            Course.find({}).lean(),
            Course.countDocumentsWithDeleted({ deleted: true }).lean(),
        ])
            .then(([courses, deletedCount]) =>
                res.render('me/stored-courses', {
                    courses,
                    deletedCount,
                }),
            )
            .catch(next)
    }
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .lean()
            .then((courses) => res.render('me/trash-courses', { courses }))
            .catch((err) => next(err))
    }
}

module.exports = new MeController()
