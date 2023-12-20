require("dotenv").config();
const express = require("express");
const postRoutes = require("./routes/posts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//express app
const app = express();

//middleware

// app.use(
//   cors({
//     origin: ["https://opinio-nest-client.vercel.app"],
//     method: ["POST", "GET"],
//     credentials: true,
//   })
// );

app.use(express.json()); //necessary for post and patch where we are requesting data
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/posts", postRoutes);

mongoose
  .connect(
    "mongodb+srv://mansinagaria:post123@cluster0.v4gc0dm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to db & Listening at port ${process.env.PORT}...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//connect to database
