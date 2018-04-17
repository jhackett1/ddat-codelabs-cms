const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const session = require('express-session');


// Initialise express
const app = express();

// Set up Sentry
var Raven = require('raven');
Raven.config(process.env.SENTRY_DSN).install();
app.use(Raven.requestHandler());

// Set app local variables
app.locals.htmlLang = false,
app.locals.govukTemplateAssetPath = "/",
app.locals.bodyClasses = false,
app.locals.skipLinkMessage = false,
app.locals.headerClass = "with-proposition",
app.locals.homepageUrl = "/",
app.locals.logoLinkTitle = false,
app.locals.globalHeaderText = "DDaT Codelabs",
app.locals.crownCopyrightMessage = false

// Middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'))
app.use(session({
  secret: 'cohinkeydink',
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const adminRouter = require('./routes/adminRouter')(express);
const router = require('./routes/router')(express);
app.use('/admin', adminRouter);
app.use('/', router);

// Error handler
app.use(function(req, res, next){
  // TODO: Add some logic here to find database connection errors and split out from 404s
  res.status(404).render('404')
})

// Listen
let port = process.env.PORT || '4000';
app.set('port', port);
app.listen(port, ()=>{
  console.log('\x1b[36m%s\x1b[0m', `Server listening on port ${port}.\nCtrl+C to quit.`)
});
