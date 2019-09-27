const dotenv = require('dotenv');

// Configure the dotenv to handle environment variables
dotenv.config();

module.exports = {
    dbUri: process.env.DATABASE_URI,
    dbName: process.env.DATABASE_NAME
};