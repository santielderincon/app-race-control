var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var methodOverride = require("method-override");
var app = express();

// Connection to DB
//mongoose.connect('mongodb://localhost/clients', function (err, res) {
mongoose.connect('mongodb://localhost/running-db', function (err, res) {
    if (err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
  'http://localhost:4200',      //this is my front-end url for development
   'http://www.myproductionurl.com'
];
var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  },
  credentials:true
}
//here is the magic
app.use(cors(corsOptions));


// Import Models and Controllers
var models = require('./models/client')(app, mongoose);
var ClientCtrl = require('./controllers/clients');

var models2 = require('./models/runner')(app, mongoose);
var RunnerCtrl = require('./controllers/runners');

var models3 = require('./models/race')(app, mongoose);
var RaceCtrl = require('./controllers/races');

var models4 = require('./models/finisher')(app, mongoose);
var FinisherCtrl = require('./controllers/finishers');

var models5 = require('./models/starting')(app, mongoose);
var StartingCtrl = require('./controllers/startings');

var models6 = require('./models/category')(app, mongoose);
var CategoryCtrl = require('./controllers/categories');


var router = express.Router();

// Index - Route
router.get('/', function (req, res) {
    res.send("Hola Mundo - Api conectada");
});

app.use(router);

// API routes
var api = express.Router();

api.route('/clients')
    .get(ClientCtrl.findAll)
    .post(ClientCtrl.add);

api.route('/clients/:id')
    .get(ClientCtrl.findById)
    .put(ClientCtrl.update)
    .delete(ClientCtrl.delete);



api.route('/runners/max-dorsal/:raceId')
    .get(RunnerCtrl.findMaxDorsal); // Obtiene el número de dorsal máximo asignado hasta ahora

api.route('/runners')
    .get(RunnerCtrl.findAll)
    .post(RunnerCtrl.add);

api.route('/runners/race/:id')
    .get(RunnerCtrl.findAllByRace); // Obtiene el listado de corredores de una carrera (ordenados por dorsal)

api.route('/runners/:id')
    .get(RunnerCtrl.findById)
    .put(RunnerCtrl.update)
    .delete(RunnerCtrl.delete);

api.route('/runners/dato/:id')
    .get(RunnerCtrl.findByDato);


api.route('/races')
    .get(RaceCtrl.findAll)
    .post(RaceCtrl.add);

api.route('/races/:id')
    .get(RaceCtrl.findById) 
    .put(RaceCtrl.update)
    .delete(RaceCtrl.delete);

api.route('/races/:id/image')
    .put(RaceCtrl.updateImageSrc);

api.route('/races/:id/competition-details')
    .put(RaceCtrl.updateCompetitionDetails);

api.route('/races/:raceId/dorsal/:id')
    .get(RunnerCtrl.findByDorsal);  // Obtiene los datos de un RUNNER dentro de una carrera a partir de su dorsal

api.route('/races/:id/timestarts')
    .get(FinisherCtrl.findTimestartsByRace); // Obtiene los timestarts de una carrera

api.route('/races/:id/timestarts2')
    .get(StartingCtrl.findTimestartsByRace); // Obtiene los timestarts de una carrera

api.route('/races/:raceId/categories')
    .get(CategoryCtrl.findAllByRaceId);


api.route('/categories')
    .get(CategoryCtrl.findAll)
    .post(CategoryCtrl.add);

api.route('/categories/:id')
    .get(CategoryCtrl.findById) 
    .put(CategoryCtrl.update)
    .delete(CategoryCtrl.delete);


api.route('/startings')
    .get(StartingCtrl.findAll)
    .post(StartingCtrl.add);

api.route('/startings/:timestart')
    .get(StartingCtrl.findByTimestart)
    .put(StartingCtrl.update)
    .delete(StartingCtrl.delete);



api.route('/finishers')
    .post(FinisherCtrl.add); // Añadimos un nuevo finisher (incluyendo carrera y timestart)

api.route('/finishers/:raceId/timestarts/:timestart')
    .get(FinisherCtrl.findFinishersByRaceAndTimestart); // Obtiene los finishers de una carrera y su timestarts

api.route('/finishers/:id')
    .get(FinisherCtrl.findById) 
    .put(FinisherCtrl.update)
    .delete(FinisherCtrl.delete);


app.use('/api', api);

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

// Turn on that server!
app.listen(port, () => {
  console.log('App listening on port ' + port);
});