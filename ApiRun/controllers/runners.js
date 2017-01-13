var mongoose = require('mongoose');
var Runner = mongoose.model('Runner');

//GET - Return all registers
exports.findAll = function (req, res) {
    Runner.find(function (err, races) {
        if (err) res.send(500, err.message);
        console.log('GET /runners all/' + req.params.id);
        res.status(200).jsonp(runners);
    });
};

//GET - Return all registers (de una carrera)
exports.findAllByRace = function (req, res) {
    Runner.find({ "raceId": req.params.id }).sort( { dorsal: 1 } ).exec(function (err, runners) {
        if (err) res.send(500, err.message);
        console.log('GET /runners by race/' + req.params.id);
        res.status(200).jsonp(runners);
    });
};

//GET - Return a runner with specified ID
exports.findById = function (req, res) {
    Runner.findById(req.params.id, function (err, runner) {
        if (err) return res.send(500, err.message);
        console.log('GET /runners by raceId/' + req.params.id);
        res.status(200).jsonp(runner);
    });
};

//GET - Return a runner with specified Dorsal in a specified Race
exports.findByDorsal = function (req, res) {
    Runner.findOne({ "dorsal": req.params.id, "raceId": req.params.raceId }).exec(function (err, runner) {
        if (err) return res.send(500, err.message);

        console.log('GET /dorsal by raceId/' + req.params.raceId);
        //res.status(200).jsonp(runner); //? qué devolvemos
        res.writeHead(200, {
            'content-type':'text/plain'
        });

        var data = JSON.stringify({
            runner:runner
        });

        res.end(data);
    });
};

//GET - Return a runner with any similar dato
exports.findByDato = function (req, res) {
    Runner.findByDato(req.params.id, function (err, runner) {
        if (err) return res.send(500, err.message);
        console.log('GET /runners by dato/' + req.params.id);
        res.status(200).jsonp(runner);
    });
};

//GET - Return the max dorsal assigned
exports.findMaxDorsal = function (req, res) {
    Runner.findOne({ "raceId": req.params.raceId }, {_id:0, dorsal:1} ).sort( { dorsal: -1 } ).limit(1).exec(function (err, runner) {
        if (err) return res.send(500, err.message);

        console.log('GET /max-dorsal' + req.params.raceId);

        res.writeHead(200, {
            'content-type':'text/plain'
        });

        var data = JSON.stringify({
            runner:runner
        });

        res.end(data);
    });
};


//POST - Insert a new register
exports.add = function (req, res) {
    console.log('SERVER ADD RUNNER');
    console.log(req.body);

    var runner = new Runner({
        dorsal: req.body.dorsal,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        year: req.body.year,
        sexo: req.body.sexo,
        club: req.body.club,
        localidad: req.body.localidad,
        raceId: req.body.raceId,
        category: req.body.category
    });

    console.log("Server Adding: ", runner);

    runner.save(function (err, runner) {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(runner);
    });
};

//PUT - Update a register already exists
exports.update = function (req, res) {
    console.log('SERVER UPDATE RUNNER');
    Runner.findById(req.params.id, function (err, runner) {
        runner.dorsal = req.body.dorsal;
        runner.nombre = req.body.nombre;
        runner.apellidos = req.body.apellidos;
        runner.year = req.body.year;
        runner.sexo = req.body.sexo;
        runner.club = req.body.club;
        runner.localidad = req.body.localidad;
        runner.raceId = req.body.raceId;
        runner.category = req.body.category;

        runner.save(function (err) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(runner);
        });
    });
};

//DELETE - Delete a register with specified ID
exports.delete = function (req, res) {
    console.log('SERVER DELETE RUNNER');
    Runner.findById(req.params.id, function (err, runner) {
        runner.remove(function (err) {
            if (err) return res.send(500, err.message);
            res.json({ message: 'Runner Successfully deleted' });
        });
    });
};