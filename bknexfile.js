require('dotenv').config({path: '../.env'});

module.exports = {
  client: 'pg',
  connection: process.env.BUSINESS_DATABASE_URL,
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
};
