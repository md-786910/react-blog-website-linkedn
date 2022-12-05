const { Schema, model, models } = require("mongoose");

const blogShema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
  },
});

const blogModel = models.blogModel || new model("blogModel", blogShema);

module.exports = blogModel;
