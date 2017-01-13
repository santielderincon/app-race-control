var mongoose = require('mongoose');
var Starting = mongoose.model('Starting');

//GET - Return all startings
exports.findAll = function (req, res) {
    Starting.find().sort( '-timestart' ).exec(function (err, startings) {
        if (err) res.send(500, err.message);
        console.log('GET /startings')
        res.status(200).jsonp(startings);
    });
};

//GET - Return all timestarts from race
exports.findTimestartsByRace = function (req, res) {
    //Starting.distinct( 'timestart', { "raceId": req.params.id } ).exec(function (err, startings) {
    Starting.find( { "raceId": req.params.id } ).exec(function (err, startings) {
        if (err) res.send(500, err.message);
        console.log('GET /startings by race/' + req.params.id);
        res.status(200).jsonp(startings);
    });
};

//GET - Return a starting with specified ID
/*
exports.findById = function (req, res) {
    Starting.findById(req.params.id, function (err, starting) {
        if (err) return res.send(500, err.message);
        console.log('GET /Starting by id/' + req.params.id);
        res.status(200).jsonp(starting);
    });
};
*/
//GET - Return a starting with specified ID
exports.findByTimestart = function (req, res) {
    Starting.findOne({ "timestart": req.params.timestart }).exec( function (err, starting) {
        if (err) return res.send(500, err.message);
        console.log('GET /Starting by timestart/' + req.params.timestart);
        res.status(200).jsonp(starting);
    });
};

//POST - Insert a new register
exports.add = function (req, res) {
    console.log('SERVER ADD STARTING');
    console.log(req.body);

    var starting = new Starting({
        isValid: req.body.isValid,
        name: req.body.name,
        raceId: req.body.raceId,
        timestart: req.body.timestart,
        nFinishers: req.body.nFinishers
    });

    console.log("Server Adding: ", starting);
    starting.save(function (err, starting) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(starting);
    });
};

//PUT - Update a register already exists
exports.update = function (req, res) {
    console.log('SERVER UPDATE STARTING');
    Starting.findOne({ "timestart": req.params.timestart }).exec( function (err, starting) {
        starting.isValid = req.body.isValid;
        starting.name = req.body.name;
        starting.raceId = req.body.raceId;
        starting.timestart = req.body.timestart;
        starting.nFinishers = req.body.nFinishers;

        starting.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(starting);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function (req, res) {
    console.log('SERVER DELETE STARTING');
    Starting.findOne({ "timestart": req.params.timestart }).exec( function (err, starting) {
        starting.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'starting successfully deleted' });
        });
    });
};