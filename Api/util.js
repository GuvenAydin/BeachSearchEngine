var crypto = require('crypto')

exports.randomString = function() {
	return crypto.randomBytes(15).toString('hex')
}