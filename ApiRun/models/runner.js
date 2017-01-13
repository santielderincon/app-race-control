var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var runnerSchema = new Schema({
 dorsal: { type: Number }, 
 nombre: { type: String },
 apellidos: { type: String },
 year: { type: Number },
 sexo: { type: String },
 club: { type: String },
 localidad: { type: String },
 raceId: { type: String },
 category: { type: String }
});

module.exports = mongoose.model('Runner', runnerSchema);