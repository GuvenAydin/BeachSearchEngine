const express = require('express');
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const engine = require('ejs-locals');
const session = require('express-session')
const request = require('request');

const app = express()
app.use(cookieParser())
global.API_URL = "http://127.0.0.1:3333/v1";
global.STATIC_URL = "http://127.0.0.1:3333";
app.locals.title = "Plaj Ara";
global.SOCIAL_MEDIA_TYPES = [
  {type:1,name:"Facebook",prefix:"https://www.facebook.com/",icon: "fa fa-facebook-square"},
  {type:2,name:"Instagram",prefix:"https://www.instagram.com/",icon: "fa fa-instagram"},
  {type:3,name:"Twitter",prefix:"https://www.twitter.com/",icon: "fa fa-twitter"},
  {type:4,name:"LinkedIn",prefix:"https://www.linkedin.com/in/",icon: "fa fa-linkedin"},
];



app.set('trust proxy', 1)
app.use(session({
  key: 'user_sid',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
  //cookie: { secure: true } SSL only!
}))

// middleware to make 'user' available to all templates 
app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');        
  }
  app.locals.localUser = req.session.user;
  next();
});


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.engine('ejs', engine);
app.set('view engine', 'ejs');



app.use("/home", require("./routes/home.js"));
app.use("/auth", require("./routes/auth.js"));
app.use("/user", require("./routes/user.js"));
app.use("/beach", require("./routes/beach.js"));



app.get('/', function (req, res) {
   const options = {
        method: 'POST',
        uri: API_URL + '/beach/getAll',
        body: {
            page: 1,
        },
        json: true
    }

    request(options, function (error, response, body) {
        if (error) {
            return console.error('post failed:', error);
        }

        console.log(body.beaches)
        
        if (body.code == 200) {
            res.render('./home/beach', { beach: body.beaches });
        }
        else if (body.code == 400) {
            res.render('./shared/404', { message: body.message, code: 400 });
        }
    })

})




app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
