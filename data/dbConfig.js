const knex = require('knex')
const config = require('../knexfile');

const dbMode = process.env.DB_MODE || 'development';

module.exports = knex(config[dbMode])