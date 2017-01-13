var mongoose = require('mongoose');
var Finisher = mongoose.model('Finisher');

//GET - Return all timestarts from race
exports.findTimestartsByRace = function (req, res) {
    Finisher.distinct( 'timestart', { "raceId": req.params.id } ).exec(function (err, finishers) {
        if (err) res.send(500, err.message);
        console.log('GET /timestarts by race/' + req.params.id);
        res.status(200).jsonp(finishers);
    });
};



//GET - Return all finishers from race and timestart
exports.findFinishersByRaceAndTimestart = function (req, res) {
    Finisher.find({ "raceId": req.params.raceId, "timestart": req.params.timestart }).sort( { timeraceStr: 1 } ).exec(function (err, finishers) {
        if (err) res.send(500, err.message);
        console.log('GET /finishers by race and timestart/' + req.params.raceId);
        res.status(200).jsonp(finishers);
    });
};

//GET - Return a finisher with specified ID
exports.findById = function (req, res) {
    Finisher.findById(req.params.id, function (err, finisher) {
        if (err) return res.send(500, err.message);
        console.log('GET /finisher by id/' + req.params.id);
        res.status(200).jsonp(finisher);
    });
};

//POST - Insert a new register
exports.add = function (req, res) {
    console.log('SERVER ADD FINISHER');
    console.log(req.body);

    var finisher = new Finisher({
        dorsal: req.body.dorsal,
        runnerId: req.body.runnerId,
        runnerFullname: req.body.runnerFullname,
        runnerClub: req.body.runnerClub,
        runnerLocalidad: req.body.runnerLocalidad,
        runnerYear: req.body.runnerYear,
        runnerCategory: req.body.runnerCategory,
        raceId: req.body.raceId,
        timestart: req.body.timestart,
        timestamp: req.body.timestamp,
        timestampStr: req.body.timestampStr,
        timerace: req.body.timerace,
        timeraceStr: req.body.timeraceStr
    });

    console.log("Server Adding: ", finisher);

    finisher.save(function (err, finisher) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(finisher);
    });
};

//PUT - Update a finisher already exists
exports.update = function (req, res) {
    console.log('SERVER UPDATE FINISHER');
    Finisher.findById(req.params.id, function (err, finisher) {
        finisher.dorsal = req.body.dorsal;
        finisher.runnerId = req.body.runnerId;
        finisher.runnerFullname = req.body.runnerFullname;
        finisher.runnerClub = req.body.runnerClub;
        finisher.runnerLocalidad = req.body.runnerLocalidad;
        finisher.runnerYear = req.body.runnerYear;
        finisher.runnerCategory = req.body.runnerCategory;
        finisher.raceId = req.body.raceId;
        finisher.timestart = req.body.timestart;
        finisher.timestamp = req.body.timestamp;
        finisher.timestampStr = req.body.timestampStr;
        finisher.timerace = req.body.timerace;
        finisher.timeraceStr = req.body.timeraceStr;

        finisher.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(finisher);
        });
    });
};

//DELETE - Delete a finisher with specified ID
exports.delete = function (req, res) {
    console.log('SERVER DELETE FINISHER');
    Finisher.findById(req.params.id, function (err, finisher) {
        finisher.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'Finisher Successfully deleted' });
        });
    });
};
