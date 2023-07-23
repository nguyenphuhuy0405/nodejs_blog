const Course = require('../models/Course')
class SiteController {
    // [GET] /
    home(req, res, next) {
        Course.find({})
            .lean()
            .then((courses) => res.render('home', { courses }))
            .catch((err) => next(err))
    }

    // [GET] /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController()
