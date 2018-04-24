/**
 * Created by jtgaulin on 3/21/18.
 */

var express = require('express');
var router = express.Router();
var natural = require('natural');
var TfIdf = natural.TfIdf;
var sw = require('stopword')

var yelp = require('./yelp.js');
var google = require('./google_places.js');
yelp()
google()

// Average function
function combined_ratings(rating1, rating2) {
	return (rating1 + rating2) / 2
}

function uniqueTokens(tokens) {
    var unique = [];
    tokens.forEach(t => {
        if(unique.indexOf(t) == -1){
            unique.push(t);
        }
    });
    return unique;
}

// return top k terms with highest tf-idf values
function computeTfIdf(reviewTexts, k = 5) {
    var tfidf = new TfIdf();
    reviewTexts = reviewTexts.toLowerCase();
    var tokenizer = new natural.WordTokenizer();
    var tokens = tokenizer.tokenize(reviewTexts);
    tokens = sw.removeStopwords(tokens);
    tokens = uniqueTokens(tokens);
    tfidf.addDocument(reviewTexts);
    var arr = []; // array of objects (token, measure) 
    var highTfIdf = []; // k tokens with highest td-idf 
    tokens.forEach(function (token) {
        tfidf.tfidfs(token, function(i, measure) {
            arr.push({word: token, val: measure});
        });
    });
    arr = arr.sort(function (pair1, pair2) {
        return pair2.val - pair1.val;
    })
    for (var i = 0; i < k; i++) {
        highTfIdf.push(arr[i]);
    }
    return highTfIdf;
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

                //Remove duplicate and compute similarAvgRating
                var similarAvgRating = 0;
                var similarAvgRatingLen = 0;
                sim_results.forEach(function(sim_result, index, object){
                    if(sim_result.id == result.id){
                        object.splice(index, 1);
                    }else{
                        similarAvgRating += sim_result.rating;
                        similarAvgRatingLen += 1;
                    }
                });
                result.similarAvgRating = (similarAvgRating / similarAvgRatingLen).toFixed(1);


                // var combineSimilar = false;
                // if(combineSimilar == true) { //If we want to search google for each similar business
                //     sim_results.forEach(function (sim_result, index, object) {
                //         // Search google
                //         google.search(sim_result.name, sim_result.coordinates.latitude, sim_result.coordinates.longitude, function (g_result) {
                //             if (g_result !== null) {
                //                 google_result_rating = g_result.rating;
                //                 final_rating = combined_ratings(sim_result.rating, google_result_rating);
                //                 sim_result.rating = final_rating;
                //                 asyncForEachCallback();
                //             }
                //         });
                //     });

                //     //Get combined rating with each of google's results
                //     var len = sim_results.length;
                //     var cnt = 0;
                //     var asyncForEachCallback = function () {
                //         cnt++;
                //         if (cnt == len) { //Check if all the calls have returns
                //             //If they all have, then return results
                //             result.similar = sim_results;
                //             res.send(result);
                //         }
                //     };
                // }else{ //If we don't want to search google for each similar business
                    result.googleReviews = g_result.googleReviews;
                    result.similar = sim_results;

                    // combine and extract review texts
                    var allReviews = result.yelpReviews.concat(result.googleReviews);
                    var reviewTexts = "";
                    // combine all review texts into one document
                    allReviews.forEach(function (review) {
                        reviewTexts += " " + review.text;
                    });
                    result.topTfIdf = computeTfIdf(reviewTexts);
                    res.send(result);
                // }
            });
    	});
    });
});

router.get('/autocomplete', function(req, res, next) {

    yelp.autocomplete(req.query.name, req.query.long, req.query.lat, function (result) {
        // console.log("result: " + result);
        if(result == null){
            result = {};
        }
        res.send(result);
    })
});

module.exports = router;
