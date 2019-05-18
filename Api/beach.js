var express = require('express')
var router = express.Router()
var db = require('./db')

router.post("/getBeaches", function (req, res) {
    
	var page = (BEACH_LIST_PAGE_SIZE * req.body.pageIndex);
	if(!req.body.searchString){
		db.query("SELECT * FROM beaches LIMIT ? OFFSET ?", [BEACH_LIST_PAGE_SIZE,page], function (err, result) {
			if (err) {
				return res.send({ code: 400, message: "DB error login " + err })
			}
			if (result[0] == 0 && result[0].lengt == 0) {
				return res.send({ code: 400, message: "Beach not found" })
			}
			res.send({ code: 200, beaches: result })
		})
	}else
	{
		console.log("search")
		db.query("SELECT * FROM beaches WHERE title LIKE ? LIMIT ? OFFSET ?", ["%"+req.body.searchString+"%",BEACH_LIST_PAGE_SIZE,page], function (err, result) {
			if (err) {
				return res.send({ code: 400, message: "DB error login " + err })
			}
			if (result[0] == 0 && result[0].lengt == 0) {
				return res.send({ code: 400, message: "Beach not found" })
			}
			res.send({ code: 200, beaches: result })
		})
	}
})

module.exports = router
