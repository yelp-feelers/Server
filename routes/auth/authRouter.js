const router = require('express').Router();
const bcrypt = require('bcryptjs');

const { createToken } = require('./tokenFunctions.js');
const Users = require('../../data/helpers/usersModel');

// Signup endpoint === `/api/auth/signup`
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide a valid email and password."})
    }
    const userFound = await Users.getReviewerByUserName(username);
    if (userFound) {
        return res.status(404).json({errorMessage: "Username is taken."})
    }
    try {
        const hash = bcrypt.hashSync(password, 12);
        if (!hash) {
            res.status(404).json({errorMessage: "Could not create user"})
        } else {
            const newUser = {username, hash}
            Users.addReviewer(newUser).then(saved => {
                const token = createToken(saved);
                const userToSend = {...saved, token, tokenExpiration: 1440}
                res.status(201).json(userToSend);
            }).catch((err) => {
                console.log(err)
            });;
        }
    } catch (error) {
        console.log(err)
    }
});

// Login endpoint === `/api/auth/login`
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(404).json({errorMessage: "Please provide a valid email and password."})
    }
    Users.getReviewerByUserName(username)
        .then(user => {
            if(user && bcrypt.compareSync(password, user.hash)) {
                const token = createToken(user);
                const userToSend = {id: user.id, username: user.username, token, tokenExpiration: 1440}
                res.status(200).json(userToSend);
            } else {
                res.status(401).json({ errorMessage: 'Not authorized'});
            }
        })
        .catch(err =>
            res.status(500).json(err)
        );
});

module.exports = router;