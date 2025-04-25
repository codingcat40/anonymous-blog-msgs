const mongoose = require('mongoose')
const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    email: String,
    // createdAtData: new Date()
})

const BlogModel = mongoose.model("blogs", BlogSchema)
module.exports = BlogModel
