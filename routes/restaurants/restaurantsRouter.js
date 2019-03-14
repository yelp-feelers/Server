const express = require('express');
const router = express.Router();
const Restaurants = require('../../data/helpers/restaurantsModel');
const rdb = require('../../config/rdb');

router.get('/restaurants/:postal_code', async (req, res) => {
    try {
        const restaurants = await Restaurants.getAllRestaurants(req, res);
        if (!restaurants) {
            return res.status(400).json({ errorMessage: "Sorry could not get any restaurants." })
        }
        res.status(200).json(restaurants)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


// Gets reviews for specific restaurants
// router.get('/restaurants/:id/reviews', async (req, res) => {
//     const { id } = req.params;
//     if (Number.isNaN(+id)) {
//         return res.status(404).json({ errorMessage: 'id must be of type number.' })
//     }
//     await Restaurants.getRestaurantById(+id)
//         .then(function (restaurantExists) {
//             if (!restaurantExists) {
//                 return res.status(404).json({ errorMessage: 'Store with that id does not exist' })
//             }
//             try {
//                 Restaurants.getReviewsWithRestaurant(restaurantExists.business_id)
//                     .then(function (reviewList) {
//                         if (reviewList) {
//                             res.status(200).json(reviewList);
//                         } else {
//                             res.status(404).json({ msg: 'No reviews available' });
//                         }
//                     })
//             }
//             catch (err) {
//                 res.sendStatus(500);
//             }
//         })
// })

// Gets reviews for specific restaurants
// router.get('/restaurants/:business_id/reviews', async (req, res) => {
//     const { business_id } = req.params;
//     console.log(business_id)
//     await Restaurants.getReviewsWithRestaurant(business_id)
//         .then(function (reviewList) {
//             console.log(reviewList)
//             if (reviewList) {
//                 res.status(200).json(reviewList);
//             } else {
//                 res.status(404).json({ msg: 'No reviews available' });
//             }
//         })

// })

router.get('/restaurants/:business_id/reviews', async (req, res) => {
    const { business_id } = req.params;
    rdb('review')
      .where('business_id', business_id)
      .limit(24)
      .then(function(records) {
        //console.log(records)
        res.status(200).json(records);
      })
      .catch(function(err) {
        throw { error: `${err} No reviews have that business id ${business_id}` };
      });
})


module.exports = router;