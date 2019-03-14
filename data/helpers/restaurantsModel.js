const db = require('../dbConfig');

const getRestaurantById = (id) => {
    return db('restaurants').where({id}).first();
}

const getAllRestaurants = () => {
    return db('restaurants');
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

const getReviewsWithRestaurant = async (id) => {
    const reviews = await db('restaurants as r')
                            .where({'r.id': id})
                            .join('reviews as rv', {'r.id':'rv.restaurant_id'})
                            .join('reviewers as rvr', {'rv.reviewer_id' : 'rvr.id'})
                            .select('rvr.username', 'rvr.id as reviewer_id', 'rv.id as review_id', 'rv.restaurant_id', 'r.name', 'r.description', 'r.true_score', 'r.adju_score', 'rv.reviewText', 'rv.score', 'rv.created_at')
    const transformedReviews = normalizeReviews(reviews)
    return transformedReviews
}


module.exports = {
    getRestaurantById,
    getAllRestaurants,
    getReviewsWithRestaurant,
};