var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var raceSchema = new Schema({
 id: { type: String },
 name: { type: String }, 
 date: { type: String },
 place: { type: String },
 imageSrc: { type: String },

 distance: { type: String },
 dist00: { type: Boolean },
 dist01: { type: Boolean },
 dist03: { type: Boolean },
 dist05: { type: Boolean },
 dist07: { type: Boolean },
 dist10: { type: Boolean },
 dist15: { type: Boolean },
 dist21: { type: Boolean },
 dist30: { type: Boolean },
 dist42: { type: Boolean },
 dist50: { type: Boolean },

 typeUrban: { type: Boolean },
 typeCross: { type: Boolean },
 typeTrail: { type: Boolean },

 timestart: { type: Number },
 nFinishers: { type: Number }

});

module.exports = mongoose.model('Race', raceSchema);