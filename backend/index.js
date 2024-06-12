require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./route/router');

const db_url = process.env.DATABASE_URL;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

mongoose.connect(db_url);
const database = mongoose.connection;

database.on('error', (err) => console.log(err));
database.on('connected', () => console.log('database connected'));


app.listen(3001, () => {
    console.log("Server started at localhost:3001");
});
