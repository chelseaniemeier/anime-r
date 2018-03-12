// src/server.js

//I used dotenv npm package to password protect my database, so in README must tell people to create a .env file in the root to link and password protect their own database
require('dotenv').config()

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const router = require('./routes');

const mongoose = require('mongoose');


// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// Import all models
require('./models/file.model.js');



const app = express();
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);



app.listen(config.port, function() {
console.log(`${config.appName} is listening on port ${config.port}`);
});

