GOOGLE_API_KEY = "AIzaSyCyQGiLW5zlcFMLYvwgXRA5DEa5ASoi3kQ"

var GooglePlaces = require('google-places');
var places = new GooglePlaces(GOOGLE_API_KEY);

var google = function() {
	google.client = require('@google/maps').createClient({
    	key: GOOGLE_API_KEY,
    	Promise: Promise
	});
};

// Call Google Geocoding API
google.getLatLong = function(address, callback) {
    google.client
        .geocode({address: address})
        .asPromise()
        .then((response) => {
            console.log(response.json.results[0].geometry.location.lat);
            console.log(response.json.results[0].geometry.location.lng);
            callback(response.json.results[0].geometry.location);
        })
        .catch((err) => {
            console.log(err);
        });
};

// reverse geocoding
// google.getAddress = function(lat, long, callback) {
//     console.log("in getAddress");
//     google.client
//         .geocode({location: [lat, long]})
//         .asPromise()
//         .then((response) => {
//             if(response.json.results.length == 0){
//                 callback(null);
//             }
//             else{
//                 callback(response.json.results[0]);
//             }
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     console.log("finishing getAddress");
// };


google.search = function (term, lat, long, callback) {

    google.client.places({
        query: term,
        location: [lat, long],
        radius: 5000
    })
    .asPromise()
    .then(response => {
        if(response.json.results.length == 0){
            callback(null);
        }
        else{
            // console.log(response.json.results[0]);
            places.details({reference: response.json.results[0].reference}, function(err, details) {
                response.json.results[0].googleReviews = details.result.reviews;
                callback(response.json.results[0]);
            });
        }
    }).catch(e => {
        console.log(e);
    });

};

google.getNearby = function (term, lat, long, callback) {
    google.client.placesNearby({
        location: [lat, long],
        radius: 5000
    })
    .asPromise()
    .then(response => {
        console.log(response.json.results);
        callback(response.json.results)
    }).catch(e => {
        console.log(e);
    });

};

module.exports = google;