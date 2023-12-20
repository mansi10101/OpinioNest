require("dotenv").config();
const express = require("express");
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//express app
const app = express();

//middleware

app.use(
  cors({
    origin: ["https://opinio-nest-client.vercel.app"],
    method: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.json()); //necessary for post and patch where we are requesting data
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

mongoose
  .connect(process.env.MONGO_URI)
  // .then(() => {
  //   //listen for requests
  //   app.listen(process.env.PORT, () => {
  //     console.log(`Connected to db & Listening at port ${process.env.PORT}...`);
  //   });
  // })
  .catch((error) => {
    console.log(error);
  });

//routes
app.use("/api/posts", postRoutes);

//connect to database
