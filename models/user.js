const db = require('../db')

let User = db.define("users", {
  id: { type: "INTEGER", primaryKey: true },
  username: { type: "TEXT", allowNull: false },
  password: { type: "TEXT", allowNull: false }
});

module.exports = User;
