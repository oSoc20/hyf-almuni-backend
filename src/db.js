const mongoose = require('mongoose');

require('dotenv').config();

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.toxef.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

const db = mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(db => console.log('Db Connected'))
  .catch(err => console.log(err));
