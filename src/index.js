require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
console.log(process.cwd())
app.use(express.static('public'))

app.get('/', (req,res,next) => {
    res.json({ msg: "Health Check"})
})

app.get('/home', (req,res,next) => {
    res.render('index', { pageTitle: "Welcome to HomePage!" })
})

app.post('/login', (req, res, next) => {
    //retrieve the form data from the req.body
    const { name, password } = req.body // { name: "abc", password: "123"}

    if(name === "admin" && password === "admin"){
        res.render('success', { username: name })
    }else{
        res.render('failure')
    }
})

app.listen(process.env.PORT)