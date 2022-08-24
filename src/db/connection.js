const mongoose = require("mongoose");

// const DB = "mongodb://127.0.0.1:27017/hire_me_private";
// mongodb+srv://hire_Me_Private:mongohiremeprivate2022@cluster0.7pgjzbz.mongodb.net/test

mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB successfully connected!");
  })
  .catch((err) => {
    console.log(err);
  });
