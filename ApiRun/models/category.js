var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    id: { type: String },
    raceId: { type: String },
    name: { type: String },
    genre: { type: String },
    minYear: { type: Number },
    maxYear: { type: Number },
    isValid: { type: Boolean }
});

module.exports = mongoose.model('Category', categorySchema);