const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://mahdiy:mahdiy1234@cluster0.8toeb.mongodb.net/test', {
    useNewUrlParser: true
}, (e) => {
    if (e) {
        console.log(e);
    } else {
        console.log('database connected');
    }
})

const userSchema = new mongoose.Schema({
    email: String,
    fname: String,
    username: String,
    password: String
})

const postSchema = new mongoose.Schema({
    username: String,
    content: String,
    postName: String,
    type: String
})

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };