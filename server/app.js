const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./connection/conn");

const blogModel = require("./model/blog");

// config
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser());
dotenv.config({});
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("<h1>hi i am blogger</h1>");
});

app.get("/getAllBlog", async (req, res) => {
  try {
    const blog = await blogModel.find({}).sort();
    if (blog) {
      res.status(200).json({ blog: blog });
    } else {
      res.status(404).json({ blog: "no blog" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

app.post("/publishBlog", async (req, res) => {
  try {
    const { title, content } = req.body;
    const blogData = new blogModel({
      title: title,
      content: content,
    });
    const saveBlog = await blogData.save();
    if (saveBlog) {
      res.status(200).json({ data: "successfully save" });
    } else {
      res.status(404).json({ data: "error occured" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});
app.post("/getBlogById", async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await blogModel.findById({ _id: id });
    if (blog) {
      res.status(200).json({ data: blog });
    } else {
      res.status(404).json({ data: "error occured" });
    }
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

app.listen(port, () => {
  console.log("app is running at ", port);
});
