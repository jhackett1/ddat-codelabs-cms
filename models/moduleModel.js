var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var moduleModel = new Schema({
  number: {type: Number, required: true},
  title: {type: String, required: true},
  description: {type: String},
  availableFrom: {type: Date},
  availableTo: {type: Date}
}, { versionKey: false });

module.exports = mongoose.model('module', moduleModel);
