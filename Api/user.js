var express = require('express')
var router = express.Router()
var db = require('./db')
const bcrypt = require('bcrypt');

function tokenToUid(req, res, next) {
	var token = req.body.token
	db.query("SELECT uid FROM token WHERE token = ?", [token], function (err, result) {
		if (result[0]) {
			var uid = result[0].uid
			req.uid = uid
			next()
		} else {
			return res.send({ code: 400, message: "Please login" })
		}
	})
}


router.post("/getUserProfile", function (req, res) {
	if (!req.body.username) {
		return res.send({ code: 400, message: "Username  is empty" })
	}

	db.query("SELECT * FROM user WHERE uname = ? AND status = 1", [req.body.username], function (err, result) {

		if (!result[0]) {
			return res.send({ code: 400, message: "User not found" })
		}

		if (err) {
			return res.send({ code: 400, message: "DB error login " + err })
		}

		var user = {
			username: result[0].uname,
			created_at: result[0].created_at,
			bio: result[0].bio,
			profession: result[0].profession,
			avatar_url: result[0].avatar_url,
			socialMedia: []
		}

		db.query("SELECT * FROM user_socialmedia WHERE user_id = ?", [result[0].id], function (err, ress) {
			if (err) {
				return res.send({ code: 400, message: "DB error login " + err })
			}
			user.socialMedia = ress
			return res.send({ code: 200, message: user })
		})
	})
})


router.post("/getSettings", tokenToUid, function (req, res) {

	db.query("SELECT uname,uemail,created_at,avatar_url,bio,profession FROM user WHERE id = ? AND status = 1", [req.uid], function (err, result) {

		if (!result[0] == null) {
			return res.send({ code: 400, message: "User not found" })
		}

		if (err) {
			return res.send({ code: 400, message: "DB error login " + err })
		}

		var user = {
			username: result[0].uname,
			bio: result[0].bio,
			profession: result[0].profession,
			avatar_url: result[0].avatar_url,
			email: result[0].uemail,
			socialMedia: []
		}

		db.query("SELECT * FROM user_socialmedia WHERE user_id = ?", [req.uid], function (err, ress) {
			if (err) {
				return res.send({ code: 400, message: "DB error login " + err })
			}
			user.socialMedia = ress
			return res.send({ code: 200, user: user })
		})
	})
})

router.post("/settings", tokenToUid, function (req, res) {
	if (!req.body.upass) {
		return res.send({ code: 400, message: "Password  is empty" })
	}

	db.query("SELECT * FROM user WHERE uname = ? AND status = 1", [req.body.username], function (err, result) {

		if (!result[0]) {
			return res.send({ code: 400, message: "User not found" })
		}

		if (err) {
			return res.send({ code: 400, message: "DB error login " + err })
		}

		var user = {
			username: result[0].uname,
			created_at: result[0].created_at,
			bio: result[0].bio,
			profession: result[0].profession,
			avatar_url: result[0].avatar_url,
		}

		res.send({ code: 200, message: user })
	})

})

router.post("/updateSettings", tokenToUid, function (req, res) {

	db.query("SELECT * FROM user WHERE id = ? AND status = 1", [req.uid], function (err, result) {
		if (err) {
			return res.send({ code: 400, message: "DB error " + err })
		}
		if (!result[0]) {
			return res.send({ code: 400, message: "User account not found" })
		}

		bcrypt.compare(req.body.currentPassword, result[0].upass, function (err, ressh) {
			if (!ressh) {
				return res.send({ code: 400, message: "Wrong current password" })
			}

			db.query("UPDATE user SET bio = ?, profession = ? WHERE id = ?", [req.body.bio, req.body.profession, result[0].id], function (err, ress) {
				if (err) {
					return res.send({ code: 400, message: "DB error " + err })
				}

				if (req.body.newPassword != null) {
					bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
						db.query("UPDATE user SET upass = ? WHERE id = ?", [hash, req.uid], function (err, result) {
							if (err) {
								return res.send({ code: 400, message: "DB error " + err })
							}
						})
					})
				}

				var user = {
					username: result[0].uname,
					bio: req.body.bio,
					profession: req.body.profession,
					avatar_url: result[0].avatar_url,
					email: result[0].uemail,
					socialMedia: []
				}

				db.query("SELECT * FROM user_socialmedia WHERE user_id = ?", [req.uid], function (err, ress) {
					if (err) {
						return res.send({ code: 400, message: "DB error login " + err })
					}
					user.socialMedia = ress
					return res.send({ code: 200, user: user })
				})
			})
		});
	})
})

router.post("/removeSocialMedia", tokenToUid, function (req, res) {

	db.query("DELETE FROM user_socialmedia WHERE id = ? AND user_id = ?", [req.body.socialMediaId, req.uid], function (err, result) {

		if (err) {
			return res.send({ code: 400, message: "DB error remove " + err })
		}

		res.send({ code: 200, message: "SocialMedia removed" })
	})
})

router.post("/addSocialMedia", tokenToUid, function (req, res) {

	if (req.body.socialMediaType === null && req.body.nick === null) {
		res.send({ code: 400, message: "nick or type null" })
	}
	if (validateUsername(req.body.nick) === false) {
		return res.send({ code: 400, message: "Username is wrong format" })
	}

	db.query("SELECT count(*) as Count FROM user_socialmedia WHERE user_id = ?", [req.uid], function (err, result) {
		if (err) {
			return res.send({ code: 400, message: "DB error " + err })
		}

		if (result[0] != null && result[0].Count >= SOCIAL_MEDIA_ACCOUNT_LIMIT) {
			return res.send({ code: 400, message: "Social media account limit exceeded" })
		}

		db.query("INSERT INTO user_socialmedia (user_id, social_media_type, nick) VALUES (?, ?, ?)", [req.uid, req.body.socialMediaType, req.body.nick], function (err, result) {

			if (err) {
				return res.send({ code: 400, message: "DB error " + err })
			}

			return res.send({ code: 200, message: "SocialMedia added" })
		})

	})


})

function validateUsername(username) {
	var re = /^[a-zA-Z0-9\\-_$@*!]{3,30}$/;
	return re.test(String(username).toLowerCase());
}


module.exports = router
