var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var finisherSchema = new Schema({
 dorsal: { type: Number }, 
 runnerId: { type: String }, 
 runnerFullname: { type: String },
 runnerClub: { type: String }, 
 runnerLocalidad: { type: String }, 
 runnerYear: { type: Number },
 runnerCategory: { type: String },
 raceId: { type: String },
 timestart: { type: Number }, 
 timestamp: { type: Number }, 
 timestampStr: { type: String }, 
 timerace: { type: Number }, 
 timeraceStr: { type: String }
});

module.exports = mongoose.model('Finisher', finisherSchema);
