const faker = require('faker');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reviews').del()
    .then(function () {
      const reviews = [];
      for (let i = 1; i < 130; i++){
        const restaurantId = Math.floor(Math.random() * 12 + 1)
        let numOfWords = Math.floor(Math.random() * 125 + 50)
        let newReview = {
          reviewText: faker.lorem.words(numOfWords),
          restaurant_id: restaurantId,
          reviewer_id: Math.floor(Math.random()*10 + 1),
          score: Math.floor(Math.random() * 6)
        }
        reviews.push(newReview);
      }

      return knex('reviews').insert(reviews);
    });
};
