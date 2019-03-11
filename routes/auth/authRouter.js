const router = require('express').Router();
const bcrypt = require('bcryptjs');

// Users will call users db after its creation
const Users = require('');

// Signup endpoint === `/api/auth/signup`
router.post('/signup', (req, res) => {
    let user = req.bodt;
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;

    Users
        .insert(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => 
            res.status(400).json(error)
        );
});

// Login endpoint === `/api/auth/login`
router.post('/login', (req, res) => {
    let { username, password } = req.body;

    // assuming a findBy() will be included in usersModel - else change name to reflect correct fn
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)) {
                const token = tokenFunctions.createToken(user);
                res.status(200).json(token);
            } else {
                res.status(401).json({ msg: 'Not authorized'});
            }
        })
        .catch(err =>
            res.status(500).json(err)
        );
});

module.exports = router;