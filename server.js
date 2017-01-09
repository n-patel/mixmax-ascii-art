var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');
var request = require('request');


// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
	origin: /^[^.\s]+\.mixmax\.com$/,
	credentials: true
};


app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 9145);

// Get list of all available fonts on startup
/*
request({
    url: 'http://artii.herokuapp.com/fonts_list',
    timeout: 15 * 1000
}, function(err, response) {
    if (err || response.statusCode !== 200 || !response.body || !response.body.data) {
        res.status(500).send('Error');
    }
    global.fonts = response.body.split('\n').slice(0, 15);      // Only grab a few of the fonts
});
*/
