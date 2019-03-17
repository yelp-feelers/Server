const express = require('express');
const router = express.Router();
const Restaurants = require('../../data/helpers/restaurantsModel');


router.get('/restaurants', async (_, res) => {
    try {
        const restaurants = await Restaurants.getAllRestaurants();
        if (!restaurants) {
            return res.status(400).json({errorMessage: "Sorry could not get any restaurants."})
        }
        res.status(200).json(restaurants)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})


// Gets reviews for specific restaurants
router.get('/restaurants/:id/reviews', async (req, res) => {
    const { id } = req.params;
    // console.log(`start id ${id}`)
    if(Number.isNaN(+id)) {
        return res.status(404).json({errorMessage: 'id must be of type number.'})
    }
    const restaurantExists = await Restaurants.getRestaurantById(+id);
    if (!restaurantExists) {
        return res.status(404).json({errorMessage: `Store with that id ${id} does not exist`})
    }
    // console.log('restaurantExists')
    try {
        const reviewList = await Restaurants.getReviewsWithRestaurant(+id);
        if (reviewList) {
            res.status(200).json(reviewList);
        } else {
            res.status(404).json({ msg: 'No reviews available' });
        }
    } catch(err) {
        res.sendStatus(500);
    }
})


module.exports = router;