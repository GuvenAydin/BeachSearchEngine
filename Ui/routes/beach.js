var express = require('express')
var helpers = require('./helpers')
var router = express.Router()
const request = require('request');


router.get("/", function (req, res) {

    var searchString = "";
    var page = 0; 

    if(req.query.searchString !== "" && req.query.searchString){
        searchString = req.query.searchString;
    }

    if(req.query.pageIndex && req.query.pageIndex != 0){
        page = req.query.pageIndex;
    }
    const options = {
        method: 'POST',
        uri: API_URL + '/beach/getBeaches',
        body: {
            pageIndex: page,   
            searchString: searchString,   
        },
        json: true
    }

    request(options, function (error, response, body) {

        if (error) {
            return console.error('post failed:', error);
        }
        
        if (body.code == 200) {

            if(page == 0 && searchString == ""){
                res.render('./home/beach', { beach: body.beaches });
            }else{
                res.render('./shared/_beaches', { beach: body.beaches});
            }   

        }
        else if (body.code == 400) {
            res.render('./shared/404', { message: body.message, code: 400 });
        }
    })
})

module.exports = router