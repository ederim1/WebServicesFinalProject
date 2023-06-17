const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const env = require('dotenv').config();
const createError = require('http-errors');

bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

const port = process.env.PORT;
const host = process.env.HOST;
const mongodb = process.env.MONGO_URI;

mongoose
  .connect(mongodb, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running at http://${host}:${port}`);
    });
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB', err);
  });

app.use('/', require('./routes'));

// 404 handler and pass to error handler
app.use((req, res, next) => {next(createError(404, "Not Found"))});

// Error Handler
app.use((err, req,res,next)=>{
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
});

