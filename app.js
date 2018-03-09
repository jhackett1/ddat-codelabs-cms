const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const logger = require('morgan');
const db = require('./db')

const app = express();

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRouter = require('./routes/adminRouter')(express);
const router = require('./routes/router')(express);
app.use('/admin', adminRouter);
app.use('/', router);

// Listen
let port = process.env.PORT || '4000';
app.set('port', port);
app.listen(port, ()=>{
  console.log('\x1b[36m%s\x1b[0m', `Server listening on port ${port}.\nCtrl+C to quit.`)
});
