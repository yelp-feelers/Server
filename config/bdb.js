var pg = require('pg');
pg.defaults.ssl = true;

const knex = require('knex');
const knexConfig = require('../bknexfile.js');

module.exports = knex(knexConfig);
