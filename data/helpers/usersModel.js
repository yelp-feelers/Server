const db = require('../dbConfig');

const getReviewerById = (id) => {
    return db('reviewers').where({id}).first();
}

const getReviewerByUserName = (username) => {
    return db('reviewers').where({username: username}).first();
}

const normalizeReviewer = (reviewer) => {
    return {
        id: reviewer.id,
        username: reviewer.username
    }
}

const addReviewer = async (newReviewer) => {
    const [id] = await db('reviewers').insert(newReviewer);
    const fetchedReviewer = await getReviewerById(id);
    return normalizeReviewer(fetchedReviewer);
}


module.exports = {
    getReviewerByUserName,
    getReviewerById,
    addReviewer
}