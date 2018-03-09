const Sequelize = require('sequelize');

// DB connect
let sequelize = new Sequelize(process.env.DB_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
})

// Confirm connection
sequelize.authenticate()
  .then(() => {
    console.log('\x1b[36m%s\x1b[0m', 'DB connection established');
  })
  .catch(err => {
    console.error(err);
  });

module.exports = sequelize
