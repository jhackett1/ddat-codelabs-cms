const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');
const logger = require('morgan');

const app = express();

// // Connect to DB
var pool = new pg.Pool({
  connectionString: process.env.DB_URI,
  ssl: true
})


// EXAMPLE PG POOLED QUERY
// Connect to pool
pool.connect(function(err,client,done) {
  if(err)console.log(err)
  // Make query
  client.query('SELECT * FROM students' ,function(err,result) {
    // Close connection
    done()
    if(err) console.log(err)
    console.log(result.rows)
  });
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'))
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
  console.log('\x1b[36m%s\x1b[0m', `Server listening on port ${port}.\nCtrl+C to quit.`)
});
