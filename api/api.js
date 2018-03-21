/**
 * Created by jtgaulin on 3/21/18.
 */

var express = require('express');
var router = express.Router();


//Test call
router.get('/', function(req, res, next) {
    res.send({ express: 'Hello From API.js' });
});

module.exports = router;
