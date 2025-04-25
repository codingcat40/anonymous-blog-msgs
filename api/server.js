require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const BlogModel = require("./models/Blogs");

const app = express();
app.use(express.json());

// middleware
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user.password == password) {
      res.json("Success");
    } else {
      res.json("Incorrect Password");
    }
  });
});

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => {
      res.json(users);
    })
    .catch((err) => res.json(err));
});

app.post("/home", async (req, res) => {
  const {title, description, email} = req.body

  try{
    const newPost = await BlogModel.create({title, description, email})
    res.status(201).json(newPost)

  }catch(err){
    res.json(err)
    console.log(err)
  }
  
});

// retrieve blogs
app.get("/getPosts", async (req, res) => {
  await BlogModel.find()
    .then((blogs) => res.json(blogs))
    .catch((err) => res.json(err));
});

// read a blog
app.get("/home/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (err) {
    res.status(400).json({ message: "Invalid Blog ID" });
  }
});


// Delete a blog
// Now I only wanna able to delete a blog with the logged in user email
app.delete('/home/:id', async (req, res)  => {
    const {id} = req.params;
    const {email} = req.body

    try{
      const blog = await BlogModel.findById(id)
      if(!blog){
        return res.status(404).json({message:  'POst not found'})
      }
      if(blog.email!==email){
        console.log(email)
        return res.status(403).json({message: 'Unauthorized'})
      }
        await BlogModel.findByIdAndDelete(id).then(() =>  {
            res.sendStatus(200)
        })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
}}
)

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running");
});
