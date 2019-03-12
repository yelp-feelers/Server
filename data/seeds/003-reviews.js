const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      const reviews = [];
      for (let i = 1; i < 125; i++){
        const restaurantId = Math.floor(Math.random() * 23 + 1)
        let newReview = {
          reviewText: faker.lorem.paragraph(sentenceCount[3]),
          restaurant_id: restaurantId
        }
        reviews.push(newReview);
      }

      return knex('reviews').insert(reviews);
    });
};
