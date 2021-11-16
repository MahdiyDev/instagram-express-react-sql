require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const serverless = require('serverless-http')
const { v4: UUID } = require('uuid')
const { User, Post } = require('../database/mangodb_schema')
const Users = require('../patterns/users')
const Posts = require('../patterns/post')

const app = express()
const router = express.Router()

app.use(require('cors')())
app.use(require('express-fileupload')())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', (req, res) => {
    res.json({
        hello: "hi"
    })
})

function authToken(req, res, next) {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, users) => {
        if (err) return res.sendStatus(403)
        req.users = users
        next()
    })
}

router.get('/signup', authToken, async (req,res) => {
    User.find({}, (err, data) => {
        if (err) return console.log(err)
        else {
            const foundUser = data.find(user => user.username === req.users.username || user.email === req.users.email)

            res.json(
                { 
                    email: foundUser.email,
                    fname: foundUser.fname,
                    username: foundUser.username
                })
        }
    })
})

router.post('/signup', async (req, res) => {
    const { email, fname, username, password } = req.body   

    const users = new Users(email, fname, username, password)

    User.find({email: email}, (e, data) => {
        if(e) {
            console.log(e)
        } else {            
            if (users && !data.length) {
                User.create(users, (e, data) => {
                    if (e) return console.log(e)
                    return data
                })
                const token = jwt.sign(JSON.parse(JSON.stringify({ 
                    email: users.email,
                    username: users.username
                })), process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: 604800
                });

                res.json({ accessToken: token })
            } else {
                res.send("user founded")
            }
        }
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    User.find({email: email, password: password}, (e, data) => {
        if(e) return console.log(e.message) 
        else {
            const foundUser = data.find(u => u.email === email)
            
            if (foundUser) {      
                const token = jwt.sign(JSON.parse(JSON.stringify({ 
                    email: foundUser.email,
                    fname: foundUser.fname,
                    username: foundUser.username
                })), process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: 604800
                });

                res.json({ accessToken: token })
            } else {
                res.status(401).send('Unauthorized')
            }
        }
    })
})

router.post('/posts', async (req, res) => {
    const { username, content } = req.body
    const { poster } = req.files ? req.files : ''

    if (username && content && poster) {
        const type = poster.mimetype.split('/')[1]
        const newName = `${UUID()}.${type}`

        poster.mv(__dirname + '/uploads/' + newName, (_) => {})
        
        const posts = new Posts(username, content, newName, type)

        Post.create(posts, (e, data) => {
            if (e) return console.log(e)
            return data
        })
        res.end()
    } else {
        res.send('error')
    }
})

router.get('/posts', async (req, res) => {
    Post.find({}, (err, data) => {
        if (err) return console.log(err)
        else {
            res.json(data)
        }
    })
})

router.get('/image/:imageName', (req, res) => {
    const { imageName } = req.params

    const newImage = imageName ? imageName.split(' ')[1] : ''

    res.sendFile(__dirname + '/uploads/' + newImage)
})

app.use('/.netlify/functions/api',router)

//olib tashalnadigan  
// app.listen(9000)

module.exports= app
module.exports.handler = serverless(app)