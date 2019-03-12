const db = require('../dbConfig');

module.exports = {
    getRestaurantById,
    getAllRestaurants
};

const getRestaurantById = (id) => {
    return db('restaurants').where({id}).first();
}

const getAllRestaurants = () => {
    return db('restaurants').select('name', 'description');
}