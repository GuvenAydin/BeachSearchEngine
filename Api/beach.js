var express = require('express')
var router = express.Router()
var db = require('./db')

router.post("/getAll", function (req, res) {
    
	var page = (BEACH_LIST_PAGE_SIZE * req.body.page);
	
	console.log("page " + req.body.page)

	db.query("SELECT * FROM beaches LIMIT ? OFFSET ?", [BEACH_LIST_PAGE_SIZE,page], function (err, result) {
    
        if (err) {
			return res.send({ code: 400, message: "DB error login " + err })
		}
		if (result[0].lengt == 0) {
			return res.send({ code: 400, message: "Beach not found" })
		}

        // var beachList = result;

        // beachList.forEach(item => {
            
        // });

		// var beach = {
		// 	description: result[0].description,
		// 	title: result[0].title,
		// 	beachImages: [],
		// 	beachComments: []
		// }

		// db.query("SELECT * FROM beach_images WHERE beach_id = ? AND status = 1", [result[0].id], function (err, ress) {
		// 	if (err) {
		// 		return res.send({ code: 400, message: "DB error login " + err })
		// 	}
		// 	user.socialMedia = ress
		// 	return res.send({ code: 200, message: user })
        // })
        
        res.send({ code: 200, beaches: result })
	})
})



module.exports = router
