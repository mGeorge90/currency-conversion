const express = require('express');
const app = express();
require('dotenv').config();
const apiRoutes = require('./apiRoutes');

app.use(express.json());
app.use('/api', apiRoutes);

module.exports = app;