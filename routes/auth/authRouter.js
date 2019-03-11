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

