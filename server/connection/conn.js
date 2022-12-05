const mongoose = require("mongoose");
const database = process.env.DATABASE_URI;
console.log(database);
const url = "mongodb://localhost:27017/react-blog-app";

mongoose
  .connect(url, {})
  .then(() => console.log("Db conencted"))
  .catch((error) => {
    console.log("error");
  });
