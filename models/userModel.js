// var mongoose = require('mongoose'),
//   Schema = mongoose.Schema;
//
// var userModel = new Schema({
//   username: {type: String, required: true},
//   password: {type: String, required: true},
//   email: {type: String, required: true},
// }, { versionKey: false });
//
// module.exports = mongoose.model('user', userModel);

const sequelize = require('sequelize');

const User = sequelize.define('user', {
  username: {type: sequelize.String, required: true},
  password: {type: sequelize.String, required: true},
  email: {type: sequelize.String, required: true},
});

module.exports = User;
