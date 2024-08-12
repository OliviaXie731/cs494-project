const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')}); 
const {Pool} = require('pg');

//create pool here for connection
const pool = new Pool({
    connectionString: process.env.PG_URI
});

module.exports = pool;