const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Import Router
const userRoute = require('./routes/userRoute');
const verificatorRoute = require('./routes/verificatorRoute');
const adminRoute = require('./routes/adminRoute');
const permissionRoute = require('./routes/permissionRoute');
// const perm

app.use(bodyParser.json());

//Routes
app.use('/auth', userRoute);
app.use('/verificator', verificatorRoute);
app.use('/admin', adminRoute);
app.use('/permission', permissionRoute);

module.exports = app