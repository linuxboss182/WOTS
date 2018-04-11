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

	//Search yelp
    yelp.search(business, "worcester, ma", function (result) {
        yelp_result_rating = result.rating;
       	name = result.name;

       	google.search(business, function (g_result){
    		google_result_rating = g_result.rating;

    		final_rating = combined_ratings(yelp_result_rating, google_result_rating)
    		result.rating = final_rating
    		res.send(result);
    	});
    });




});

router.get('/autocomplete', function(req, res, next) {

    yelp.autocomplete(req.query.name, req.query.long, req.query.lat, function (result) {

        res.send(result);
    })
});

module.exports = router;
