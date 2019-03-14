const db = require('../dbConfig');

const bdb = require('../../config/bdb');
const rdb = require('../../config/rdb.js');




const getRestaurantById = (id) => {
    return bdb('business').where({id}).first();
}

const getAllRestaurants = (req, _) => {
    const { postal_code } = req.params;
    console.log('postal_code', postal_code)
  
    return bdb('business')
      .where('postal_code', postal_code)
      .limit(24)
      .then(function(records) {
        return records
      })
      .catch(function(err) {
        throw { error: `${err} No businesses have that postal code ${postal_code}` };
      });
}

// Added by Orlando

const normalizeReview = (review) => {
    return {
        id: review.review_id,
        reviewer: { id: review.reviewer_id, username: review.username },
        review: review.reviewText,
        score: review.score,
        adju_score: 5,
        created_at: `${new Date(review.created_at).toLocaleDateString()}`
    }
}

const normalizeReviews = (reviews) => {
    return {
        id: reviews[0].restaurant_id,
        name: reviews[0].name,
        description: reviews[0].description,
        true_score: reviews[0].true_score,
        adju_score: reviews[0].adju_score,
        reviews: reviews.map(normalizeReview)
    }
}

// const getReviewsWithRestaurant = async (id) => {
//     const reviews = await db('restaurants as r')
//                             .where({'r.id': id})
//                             .join('reviews as rv', {'r.id':'rv.restaurant_id'})
//                             .join('reviewers as rvr', {'rv.reviewer_id' : 'rvr.id'})
//                             .select('rvr.username', 'rvr.id as reviewer_id', 'rv.id as review_id', 'rv.restaurant_id', 'r.name', 'r.description', 'r.true_score', 'r.adju_score', 'rv.reviewText', 'rv.score', 'rv.created_at')
//     const transformedReviews = normalizeReviews(reviews)
//     return transformedReviews
// }

const getReviewsWithRestaurant = async (business_id) => {
    rdb('review')
      .where('business_id', business_id)
      .limit(24)
      .then(function(records) {
        //console.log(records)
        return records
      })
      .catch(function(err) {
        throw { error: `${err} No reviews have that business id ${business_id}` };
      });
}



module.exports = {
    getRestaurantById,
    getAllRestaurants,
    getReviewsWithRestaurant,
};