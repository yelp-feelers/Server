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

router.get('/restaurants/:id/reviews', async (req, res) => {
    try {
        const reviewList = await db('reviews')
            .where({ restaurant_id: req.paramds.id});
        if (reviewList.length) {
            res.status(200).json(reviewList);
        } else {
            res.status(404).json({ msg: 'No reviews available' });
        }
    } catch(err) {
        res.sendStatus(500);
    }
})




module.exports = router;