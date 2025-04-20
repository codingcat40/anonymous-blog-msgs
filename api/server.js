require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/User')
const BlogModel = require('./models/Blogs')

const app = express()
app.use(express.json())

// middleware 
app.use(cors())



mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('MongoDB connected')
}).catch((err) => console.log(err))

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email:  email}).then(
        (user) => {
            if(user.password == password){
                res.json("Success")
            }
            else{
                res.json("Incorrect Password")
            }
        }
    )
})


app.post('/register', (req, res) => {
    UserModel.create(req.body).then(users =>  {
        res.json(users)
    }).catch(err =>  res.json(err))
})

app.post('/home', (req, res) => {
    BlogModel.create(req.body).then(blogs => {
        res.json(blogs)
    }).catch(err => res.json(err))
})

// retrieve blogs
app.get('/getPosts', async (req,res) => {
    const BlogData = await BlogModel.find()

    if(!BlogData){
        return res.status(404).json({message:  'There is No Blogs to display'})
    }
    BlogData.then((blogs) => res.json(blogs))
    .catch((err) => res.json(err))
})


// read a blog
app.get('/:id', async (req, res) => {
    const {id} = req.params

    try{
        const blog = await BlogModel.findById(id)
        if(!blog){
            return res.status(404).json({message: 'Blog not found'})
        }
        res.json(blog)
    }catch(err){
        res.status(400).json({message: 'Invalid Blog ID'})
    }
})


const PORT = 3000
app.listen(PORT, () =>  {
    console.log("Server is running")
})