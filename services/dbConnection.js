const mongoose = require('mongoose');
var moment = require('moment');

const {dbUri, dbName} = require('../config.js'); // import the environment variables

// Connect to DB
function dbConnection() {
    mongoose.connect(
        `${dbUri}`,
        { useNewUrlParser: true, useUnifiedTopology: true, dbName: `${dbName}` },
        () => {
            try {
                console.log("Connected to: " + `${dbName}` + ", timestamp: "+ moment(new Date()).toDate())
            } catch (error) {
                console.log(error);
            }
        }
    );
}

module.exports = dbConnection;