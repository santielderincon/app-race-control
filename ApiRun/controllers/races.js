var mongoose = require('mongoose');
var Race = mongoose.model('Race');

//GET - Return all registers
exports.findAll = function (req, res) {
    Race.find().sort( '-date' ).exec(function (err, races) {
        if (err) res.send(500, err.message);
        console.log('GET /races')
        res.status(200).jsonp(races);
    });
};

//GET - Return a race with specified ID
exports.findById = function (req, res) {
    Race.findById(req.params.id, function (err, race) {
        if (err) return res.send(500, err.message);
        console.log('GET /Races by id/' + req.params.id);
        res.status(200).jsonp(race);
    });
};

//POST - Insert a new register
exports.add = function (req, res) {
    console.log('SERVER ADD RACE');

    var race = new Race({
        name: req.body.name,
        date: req.body.date,
        place: req.body.place,

        distance: req.body.distance,
        dist00: req.body.dist00,
        dist01: req.body.dist01,
        dist03: req.body.dist03,
        dist05: req.body.dist05,
        dist07: req.body.dist07,
        dist10: req.body.dist10,
        dist15: req.body.dist15,
        dist21: req.body.dist21,
        dist30: req.body.dist30,
        dist42: req.body.dist42,
        dist50: req.body.dist50,

        typeUrban: req.body.typeUrban,
        typeCross: req.body.typeCross,
        typeTrail: req.body.typeTrail,

        timestart: req.body.timestart,
        nFinishers: req.body.nFinishers
    });

    console.log("Server Adding: ", race);

    race.save(function (err, race) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(race);
    });
};

//PUT - Update a race already exists
exports.update = function (req, res) {
    console.log('SERVER UPDATE RACE');

    Race.findById(req.params.id, function (err, race) {
        race.name = req.body.name;
        race.date = req.body.date;
        race.place = req.body.place;

        race.distance = req.body.distance;
        race.dist00 = req.body.dist00;
        race.dist01 = req.body.dist01;
        race.dist03 = req.body.dist03;
        race.dist05 = req.body.dist05;
        race.dist07 = req.body.dist07;
        race.dist10 = req.body.dist10;
        race.dist15 = req.body.dist15;
        race.dist21 = req.body.dist21;
        race.dist30 = req.body.dist30;
        race.dist42 = req.body.dist42;
        race.dist50 = req.body.dist50;

        race.typeUrban = req.body.typeUrban;
        race.typeCross = req.body.typeCross;
        race.typeTrail = req.body.typeTrail;

        race.timestart = req.body.timestart;
        race.nFinishers = req.body.nFinishers;

        race.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(race);
        });
    });
};

//PUT - Update the image of a race that already exists
exports.updateImageSrc = function (req, res) {
    console.log('SERVER UPDATE IMAGE RACE');

    Race.findById(req.params.id, function (err, race) {
        race.imageSrc = req.body.imageSrc;

        race.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(race);
        });
    });
};


//PUT - Update the timestart/nFinishers of a race that already exists
exports.updateCompetitionDetails = function (req, res) {
    console.log('SERVER UPDATE COMPETITION DETAILS (TIMESTART/NFINISHERS) RACE');

    Race.findById(req.params.id, function (err, race) {
        race.timestart = req.body.timestart;
        race.nFinishers = req.body.nFinishers;

        race.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(race);
        });
    });
};


//DELETE - Delete a register with specified ID
exports.delete = function (req, res) {
    console.log('SERVER DELETE RACE');
    Race.findById(req.params.id, function (err, race) {
        race.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'race Successfully deleted' });
        });
    });
};