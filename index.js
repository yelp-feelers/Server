const express = require('express');
const helmet = require('helmet');
const server = express();
var dotenv = require('dotenv');
dotenv.config();
// Route Imports
const authRouter = require('./routes/auth/authRouter');
const restaurantRouter = require('./routes/restaurants/restaurantsRouter');


server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: false }));

//==============================================================// CORS setup
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Origin, Accept, Content-Type, Authorization, X-Requested-With");
    res.setHeader('Access-Control-Allow-Methods', "POST,GET,OPTIONS,DELETE,PUT");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
})
//==============================================================// ROUTES
server.use('/api/auth', authRouter);
server.use('/api', restaurantRouter);

const PORT = process.env.PORT || '4200';
server.listen(PORT, () => {console.log(`Listening on port ${PORT}...`)})