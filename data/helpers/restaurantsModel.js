const db = require('../../config/rdb');

// console.log(db)

const getRestaurantById = (id) => {
    // console.log('ById', id)
    return db('ebusiness').where({ id }).first();
}

const getAllRestaurants = () => {
    return db('ebusiness').limit(20);
}

// Added by Orlando
// added review.reviewer_name to reviewer
// set adju_score to review.review_adjo_score
// added cleaned_review
const normalizeReview = (review) => {
    return {
        id: review.review_id,
        reviewer: { name: review.reviewer_name, id: review.reviewer_id, username: review.username },
        review: review.reviewText,
        score: review.score,
        adju_score: review.review_adju_score,
        created_at: `${new Date(review.created_at).toLocaleDateString()}`,
        cleaned_review: review.cleaned_text
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
// reviewer id is the row number in the table, the reviewer user_id is 22 character key code, 
// added reviewer average_stars
// added review review_adju_score
// added review cleaned_text
const getReviewsWithRestaurant = async (id) => {
    // console.log(`getR id ${id}`)
    const reviews = await db('ebusiness as r')
        .where({ 'r.id': id })
        .join('review as rv', { 'r.business_id': 'rv.business_id' })
        .join('reviewer as rvr', { 'rv.user_id': 'rvr.user_id' })
        .select('r.name', 'rvr.user_id as username', 'rvr.id as reviewer_id', 'rvr.average_stars', 'rv.review_id', 
            'r.business_id as restaurant_id', 'rvr.name as reviewer_name', 'r.categories as description',
            'r.business_stars as true_score', 'r.average_pstars as adju_score',
            'rv.text as reviewText', 'rv.stars as score', 'rv.pstars as review_adju_score',
            'rv.date as created_at', 'rv.ctext as cleaned_text')
    // try {
    //     const reviews = await db('ebusiness as r')
    //         .where({ 'r.id': id })
    //         .join('review as rv', { 'r.business_id': 'rv.business_id' })
    //         .select('r.id')
    //     console.log(`got reviews ${reviews}`)
    // }
    // catch (e) {
    //     console.log(`error ${e}`)
    // }
    // console.log(`got reviews length ${reviews.length}`)
    const transformedReviews = normalizeReviews(reviews)
    return transformedReviews
}


module.exports = {
    getRestaurantById,
    getAllRestaurants,
    getReviewsWithRestaurant,
};