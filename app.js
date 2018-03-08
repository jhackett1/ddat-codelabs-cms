const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pg = require('pg');

const app = express();

// Connect to DB
var pool = new pg.Pool({
  connectionString: process.env.DB_URI,
  ssl: true
})
pool.connect(function(err, client, done) {
  if(err) return console.error(err);
  console.log("DB connection successful.")
  done()
})

// pool shutdown
pool.end()

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
