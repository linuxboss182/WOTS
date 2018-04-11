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

router.get('/geocode', function(req, res, next) {
    let zipcode = req.query.zipcode;

    google.getLatLong(zipcode, function(location){
        res.send({lat: location.lat, long: location.lng});
    });
});

// router.get('/reversegeocode', function(req, res, next) {
//     let lat = req.query.lat;
//     let long = req.query.long;

//     google.getAddress(lat, long, function(address){
//         res.send(address);
//     });
// });

router.get('/search', function(req, res, next) {
    let business = req.query.name;
    let lat = req.query.lat;
    let long = req.query.long;
    let zipcode = req.query.zipcode;
    if(zipcode == undefined || zipcode == ""){
        zipcode = "01609";
    }

    var yelp_result_rating;
    var google_result_rating;
    var name;

	// search yelp
    yelp.search(business, zipcode, 1, function (result) {
        yelp_result_rating = result.rating;
       	name = result.name;

        // search google
       	google.search(business, lat, long, function (g_result){

       	    // Combine rating
            if(g_result !== null){
                google_result_rating = g_result.rating;
                final_rating = combined_ratings(yelp_result_rating, google_result_rating);
                result.rating = final_rating;
            }

            // Find similar business
            yelp.search(result.categories[0].title, zipcode, 5, function (sim_results) {
                //Remove duplicate
                sim_results.forEach(function(sim_result, index, object){
                    if(sim_result.id == result.id){
                        object.splice(index, 1);
                    }
                });

                result.similar = sim_results;

                // Find nearby business

                // Send result
                res.send(result);
            });
    	});
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
