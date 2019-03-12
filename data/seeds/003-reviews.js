const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      const reviews = [];
      for (let i = 1; i < 25; i++){
        let newReview = {
          reviewText: faker.lorem.paragraph(sentenceCount[3])
        }
        reviews.push(newReview);
      }

      return knex('reviews').insert(reviews);
    });
};
