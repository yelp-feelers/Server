const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviewers').del()
    .then(function () {
      const reviewers = [];
      for (let i = 1; i < 10; i++) {
        reviewers.push({
          username: faker.fake('{{name.firstName}} {{name.lastName}}'),
          hash: 'placeholder'
        })
      }
      // Inserts seed entries
      return knex('reviewers').insert(reviewers);
    });
};
