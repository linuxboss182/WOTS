
//Import Libraries
const express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

//Import modules
var api = require('./api/api');

//Register express
const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Hello World API test call
app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

//Register API calls
app.use('/', api);

//Catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send('Error in node server: ' +  err.message);
});

//Start server
let server = app.listen(8000, function () {
    let host = "localhost";
    let port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
