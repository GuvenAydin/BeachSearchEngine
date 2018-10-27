var express = require('express')
var router = express.Router()
var db = require("./db")

function tokenToUid(req,res,next){
	var token = req.body.token
	db.query("SELECT uid FROM token WHERE token = ?",[token], function(err,result){
		if (result[0]) {
			var uid = result[0].uid
			req.uid = uid
			next()
		}else{
			return res.send({code:400,message:"Please login"})
		}
	})
}

router.post("/list",tokenToUid,function(req,res){
	db.query("SELECT * FROM note WHERE uid = ?",[req.uid],function(err,result){
			if (err) {
				return res.send({code:400,message:"db error"})
			}
			res.send({code:200,notes:result})
		})

	})

router.post("/create",tokenToUid,function(req,res){

	var content = req.body.content


	db.query("INSERT INTO note(uid,content,created_at) VALUES(?,?,NOW())",[req.uid,content],
		function(err,result){

			if (err) {
				return res.send({code:400,message:"db error note"})
			}

			res.send({code:200,message:"not kaydedildi"})

		})
	
})

router.post("/edit",tokenToUid,function(req,res){

var id = req.body.id
var content = req.body.content


	db.query("UPDATE note SET content = ? WHERE id = ? AND uid = ? ",[content,id,req.uid],function(err,result){
		if (err) {
				return res.send({code:400,message:"db error edit"})
		}
		res.send({code:200,message:"not başarıyla düzenlendi"})
	})
})

router.post("/delete",tokenToUid,function(req,res){
	var id = req.body.id

	db.query("DELETE FROM note WHERE id = ? AND uid = ?",[id,req.uid],function(err,result){
		if (err) {
				return res.send({code:400,message:"db hatası delete"})
		}
		res.send({code:200,message:"not başarıyla silindi"})
	})
})


module.exports = router
