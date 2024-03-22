const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Import Router
const userRoute = require('./routes/userRoute');
const verificatorRoute = require('./routes/verificatorRoute');

app.use(bodyParser.json());

//Routes
app.use('/auth', userRoute);
app.use('/verificator', verificatorRoute);


module.exports = app