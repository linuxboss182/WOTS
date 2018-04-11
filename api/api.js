/**
 * Created by jtgaulin on 3/21/18.
 */

var express = require('express');
var router = express.Router();

var yelp = require('./yelp.js');
yelp()

//Test call
router.get('/', function(req, res, next) {
    res.send({ express: 'Hello From API.js' });
});

router.get('/search', function(req, res, next) {
    let business = req.query.name;
    let zipcode = req.query.zipcode;
    if(zipcode == undefined || zipcode == ""){
        zipcode = "01609";
    }
    yelp.search(business, zipcode, function (result) {
        // res.send({ name: result.name, rating: result.rating});

        //Search google

        //Search category


        res.send(result);
    });
});

router.get('/autocomplete', function(req, res, next) {

    yelp.autocomplete(req.query.name, req.query.long, req.query.lat, function (result) {
        console.log("result: " + result);
        if(result == null){
            result = {};
        }
        res.send(result);
    })
});

module.exports = router;
