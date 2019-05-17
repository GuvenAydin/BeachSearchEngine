var express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var app = express()
global.DEFAULT_AVATAR = "default.png";
global.SOCIAL_MEDIA_ACCOUNT_LIMIT = 8;
global.BEACH_LIST_PAGE_SIZE = 10;

app.use('/static', express.static('public'))

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
	res.send("merhaba")
})

app.use("/v1/auth",require("./auth.js"))
app.use("/v1/note",require("./note.js"))
app.use("/v1/user",require("./user.js"))
app.use("/v1/beach",require("./beach.js"))


app.listen(3333)