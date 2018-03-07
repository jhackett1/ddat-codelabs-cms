const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Sequelize = require('sequelize');

// Connect to DB and verify connection
const sequelize = new Sequelize(process.env.DB_URI, {
  "dialect": "postgres",
  "ssl": true,
  "dialectOptions": {
      "ssl": true
  }
})
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Import and initialise routes
const adminRouter = require('./routes/adminRouter')(express);
const router = require('./routes/router')(express);
app.use('/admin', adminRouter);
app.use('/', router);

// Listen
let port = process.env.PORT || '4000';
app.set('port', port);
app.listen(port, ()=>{
  console.log(`Server listening on port ${port}.\nCtrl+C to quit.`)
});
