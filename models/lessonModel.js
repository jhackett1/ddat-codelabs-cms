var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var lessonModel = new Schema({
  number: {type: Number, required: true},
  title: {type: String, required: true},
  lessonType: {type: String, required: true},
  module: {type: Number},
  content: {type: String},
  difficulty: {type: String},
  externalLinks: {type: Array}
}, { versionKey: false });

module.exports = mongoose.model('lesson', lessonModel);
