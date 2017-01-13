var mongoose = require('mongoose');
var Category = mongoose.model('Category');

//GET - Return all categories
exports.findAll = function (req, res) {
    Category.find().exec(function (err, categories) {
        if (err) res.send(500, err.message);
        console.log('GET /categories')
        res.status(200).jsonp(categories);
    });
};

//GET - Return all categories by RaceId
exports.findAllByRaceId = function (req, res) {
    Category.find({ "raceId": req.params.raceId }).exec(function (err, categories) {
        if (err) res.send(500, err.message);
        console.log('GET /Categories by RaceId')
        res.status(200).jsonp(categories);
    });
};

//GET - Return a category with specified ID
exports.findById = function (req, res) {
    Category.findById(req.params.id, function (err, category) {
        if (err) return res.send(500, err.message);
        console.log('GET /Categories by id/' + req.params.id);
        res.status(200).jsonp(category);
    });
};

//POST - Insert a new register
exports.add = function (req, res) {
    console.log('SERVER ADD CATEGORY');

    var category = new Category({
        raceId: req.body.raceId,
        name: req.body.name,
        genre: req.body.genre,
        minYear: req.body.minYear,
        maxYear: req.body.maxYear,
        isValid: req.body.isValid
    });

    console.log("Server Adding: ", category);

    category.save(function (err, category) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(category);
    });
};

//PUT - Update a category already exists
exports.update = function (req, res) {
    console.log('SERVER UPDATE CATEGORY');

    Category.findById(req.params.id, function (err, category) {
        category.raceId = req.body.raceId;
        category.name = req.body.name;
        category.genre = req.body.genre;
        category.minYear = req.body.minYear;
        category.maxYear = req.body.maxYear;
        category.isValid = req.body.isValid;

        category.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(category);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function (req, res) {
    console.log('SERVER DELETE CATEGORY');
    Category.findById(req.params.id, function (err, category) {
        category.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'Category successfully deleted' });
        });
    });
};