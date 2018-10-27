var express = require('express')
var router = express.Router()
var db = require('./db')
var util = require('./util')
const bcrypt = require('bcrypt');

router.post("/register",function(req,res){
	
	if (!req.body.username) {
		return res.send({code:400, message:"Username is empty"})
	}
	
	if (!req.body.uemail) {
		return res.send({code:400,message:"Email is empty"})
	}

	if (!req.body.upass) {
		return res.send({code:400,message:"Password is empty"})
	}

	var uname = req.body.username.toLowerCase()
	var uemail = req.body.uemail.toLowerCase()
	var upass = req.body.upass

	if (uemail.length < 5 && validateEmail(uemail) === false) {
		return res.send({code:400,message:"Email is wrong"})
	}

	if (uname.length < 3 && validateUsername(uname) === false) {
		return res.send({code:400,message:"Username is wrong"})
	}

	if (uname.upass < 8 ) {
		return res.send({code:400,message:"Password too short"})
	}

	bcrypt.hash(upass, 10, function(err, hash) {

		db.query("SELECT * FROM user WHERE uname = ?",[uname],function(err,result){

			if (err) {
				return res.send({code:400, message:"Db error" })
			}

			if (result[0]) {
				return res.send({code:400, message:"Username not available" })
			}

			db.query("SELECT * FROM user WHERE uemail = ?",[uemail],function(err,result){

			if (err) {
				return res.send({code:400, message:"db error" })
			}

			if (result[0]) {
				return res.send({code:400, message:"Email not available" })
			}		

			db.query("INSERT INTO user(uname,upass,uemail,created_at,avatar_url,status) VALUES(?,?,?,NOW(),?,1)",[uname,hash,uemail,DEFAULT_AVATAR],
				function(err,result){

					if (err) {
						return res.send({code:400,message:"DB error " + err})
					}
					
					var uid = result.insertId
					var token = util.randomString()
					var user = {
						username: req.body.username,
						token:token
					}
					//insert token
					db.query("INSERT INTO token(uid, token, created_at) VALUES(?,?,NOW())",[uid,token],
						function(err,result){
							if (err) {
								return res.send({code:400,message:"db error token"})
							}
							res.send({code:200,user:user})
					})
				})
			})
		})
	});
})

router.post("/login",function(req,res){

	var upass = req.body.upass


	if (!req.body.usernameOrEmail) {
		return res.send({code:400, message:"Username is empty"})
	}
	var usernameOrEmail = req.body.usernameOrEmail.toLowerCase()

	if (!upass) {
		return res.send({code:400,message:"Password  is empty"})
	}

	db.query("SELECT * FROM user WHERE uname = ? OR uemail = ?",[usernameOrEmail,usernameOrEmail],function(err,result){

		if (!result[0]) {
			return res.send({code:400,message:"User account not found"})
		}

		if (err) {
			return res.send({code:400,message:"DB error login " + err})
		}

		bcrypt.compare(upass, result[0].upass, function(err, ressh) {

			if(!ressh) {
				return res.send({code:400,message:"User account not found"})
			} 

				var user = result[0]
				var uid = user.id
				var token = util.randomString()
				var user = {
					username: user.uname,
					created_at: user.created_at,
					bio: user.bio,
					profession: user.profession,
					avatar_url: user.avatar_url,
					token:token
				}
					//insert token
				db.query("INSERT INTO token(uid, token, created_at) VALUES(?,?,NOW())",[uid,token], function(err,result){
					if (err) {
							return res.send({code:400,message:"Db error token"})
					 	}
					res.send({code:200,user:user})
				})
		});
	})

})

router.post("/logout",function(req,res){
	var userToken = req.body.token;
	if (!userToken) {
		return res.send({code:400, message:"Token not found"})
	}
	db.query("DELETE FROM token WHERE token = ?",[userToken],function(err,result){
		if (err) {
			return res.send({code:400,message:"DB error login " + err})
		}
		res.send({code:200,message:"Token Deleted"})
	})
})


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function validateUsername(username) {
    var re = /^[a-zA-Z0-9\\-_$@*!]{3,30}$/;
    return re.test(String(username).toLowerCase());
}

module.exports = router
