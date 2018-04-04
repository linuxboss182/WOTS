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
    yelp.search(business, 'worcester, ma', function (result) {
        res.send({ name: result.name, rating: result.rating});
    });
});

module.exports = router;
