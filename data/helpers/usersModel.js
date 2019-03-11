const db = require('../dbConfig');

const getReviewerById = (id) => {
    return db('reviewers').where({id}).first();
}

const normalizeReviewer = (reviewer) => {
    return {
        id: reviewer.id,
        username: reviewer.usernanme
    }
}

const addReviewer = (newReviewer) => {
    const [id] = db('reviewers').insert(newReviewer);
    const fetchedReviewer = getReviewerById(id);
    return normalizeReviewer(fetchedReviewer);
}

module.exports = {
    getReviewerById,
    addReviewer
}