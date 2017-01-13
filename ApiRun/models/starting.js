var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var startingSchema = new Schema({ 
    isValid: { type: Boolean },
    name: { type: String },
    raceId: { type: String },
    timestart: { type: Number }, 
    nFinishers: { type: Number }
});

module.exports = mongoose.model('Starting', startingSchema);