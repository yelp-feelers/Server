const db = require('../dbConfig');

const getRestaurantById = (id) => {
    return db('restaurants').where({id}).first();
}

const getAllRestaurants = () => {
    return db('restaurants').select('name', 'description');
}

// Added by Orlando

const normalizeReview = (review) => {
    return {
        id: review.id,
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
                            .join('reviews as rr', {'r.id':'rr.restaurant_id'})
                            .join('reviewers as rrr', {'rrr.id' : 'rr.reviewer_id'})
    const transformedReviews = normalizeReviews(reviews)
    return transformedReviews
}


module.exports = {
    getRestaurantById,
    getAllRestaurants,
    getReviewsWithRestaurant,
};