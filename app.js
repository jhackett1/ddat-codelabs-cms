const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes in here


let port = process.env.PORT || '4000';
app.set('port', port);
app.listen(port);
