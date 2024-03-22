const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Import Router
const userRoute = require('./routes/userRoute');

app.use(bodyParser.json());

//Routes
app.use('/auth', userRoute);

module.exports = app