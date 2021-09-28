var express = require('express');
var user = require('./router/user')
var db = require('./router/db')
const cors = require("cors");
const auth = require('./router/auth')
const register = require('./router/register')
const login = require('./router/login')

var app = express()
var corsOptions = {
  origin: "http://localhost:3001"
};

app.use('/user', cors(), user)
app.set('views', './views')
app.set('view engine', 'ejs');
app.use('/api/auth', auth)
app.use('/register', register)
app.use('/login', login)
app.use(cors)

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(db, function(req, res) {
  console.log(res)
})
app.get('/', (req, res) => {
  res.render('index')
})
app.listen(3001)