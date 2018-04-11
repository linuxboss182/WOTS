/**
 * Created by jtgaulin on 3/21/18.
 */

var express = require('express');
var router = express.Router();

var yelp = require('./yelp.js');
var google = require('./google_places.js');
yelp()
google()

// Average function
function combined_ratings(rating1, rating2) {
	return (rating1 + rating2) / 2
}

//Test call
router.get('/', function(req, res, next) {
    res.send({ express: 'Hello From API.js' });
});

router.get('/search', function(req, res, next) {
    let business = req.query.name;

    var yelp_result_rating;
    var google_result_rating;
    var name;

    yelp.search(business, "worcester, ma", function (result) {
        yelp_result_rating = result.rating;
       	name = result.name;
       	console.log(yelp_result_rating)
    });

    google.search(business, function (result){
    	google_result_rating = result.rating;
    	console.log(google_result_rating)
    });

    final_rating = combined_ratings(yelp_result_rating, google_result_rating)
    console.log(final_rating)
    res.send({name: name, rating: final_rating});
});

\

module.exports = router;
