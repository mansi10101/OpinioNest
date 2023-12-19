require('dotenv').config();

const express = require('express');
const postRoutes = require('./routes/posts');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//express app
const app = express();

//middleware
app.use(express.json()); //necessary for post and patch where we are requesting data
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use('/api/posts', postRoutes);

// mongoose.set('debug', true);
//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & Listening at port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
