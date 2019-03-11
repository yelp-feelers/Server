const jwt = require('jsonwebtoken');

const secret = 'Update to dotenv secret';

module.exports = {
    createToken,
};

function createToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options);
}