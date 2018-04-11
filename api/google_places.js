GOOGLE_API_KEY = "AIzaSyCyQGiLW5zlcFMLYvwgXRA5DEa5ASoi3kQ"

var google = function() {
	google.client = require('@google/maps').createClient({
    	key: GOOGLE_API_KEY,
    	Promise: Promise
	});
};


google.search = function (term, callback) {

    google.client.places({
        query: term,
        location: [42.274, -78.806],
        radius: 5000
    })
    .asPromise()
    .then(response => {
        console.log(response.json.results[0]);
        callback(response.json.results[0])
    }).catch(e => {
        console.log(e);
    });

};

google.getNearby = function (term, callback) {
    google.client.placesNearby({
        location: [42.274, -78.806],
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