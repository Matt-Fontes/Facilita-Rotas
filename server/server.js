const express = require('express');

const dotenv = require('dotenv');
dotenv.config();

const { createInitialDatabaseStructure } = require('./setup');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

createInitialDatabaseStructure();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users', userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));