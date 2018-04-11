/**
 * Created by jtgaulin on 3/26/18.
 */



YELP_API_KEY = "r8KrGCJBLtuOlFc5tVjy_wsGdxm7fmKfq7GaLIAfpMzevLOOmjd7rv0z8Y4m_uGL_vq0hUaZBzgxXzwWS4GpcirIPLKzjmXkfAVUWqHHfbMDxGnegJD84L7YUdqyWnYx";

const fusion = require('yelp-fusion');



var yelp = function () {
    yelp.client = fusion.client(YELP_API_KEY);

};

yelp.search = function (term, location, callback) {

    yelp.client.search({
        term: term,
        location: location
    }).then(response => {
        console.log(response.jsonBody.businesses[0]);
        callback(response.jsonBody.businesses[0])
    }).catch(e => {
        console.log(e);
    });

};

yelp.autocomplete =  function (term, long, lat, callback) {

    yelp.client.autocomplete({
        text: term,
        latitude: lat,
        longitude: long
    }).then(response => {
        relevantTerms = [];

        //businesses
        response.jsonBody.businesses.forEach(function(el){
            relevantTerms.push(el.name)
        });

        //categories
        response.jsonBody.categories.forEach(function(el){
            relevantTerms.push(el.title)
        });

        //text
        response.jsonBody.terms.forEach(function(el){
            relevantTerms.push(el.text)
        });

        callback(relevantTerms)
    }).catch(e => {
        console.log(e);
    });

};

module.exports = yelp;
