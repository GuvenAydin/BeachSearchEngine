var express = require('express')
var helpers = require('./helpers')
var router = express.Router()
const request = require('request');


router.get("/", function (req, res) {

    const options = {
        method: 'POST',
        uri: API_URL + '/beach/getAll',
        body: {
            page: 0,
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


module.exports = router