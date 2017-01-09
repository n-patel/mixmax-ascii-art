var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');
var async = require('async');


// The Type Ahead API.
module.exports = function(req, res) {
    var text = req.query.text.trim();
    if (!text) {
        res.json([{
            title: '<i>Loading preview...</i>',
            text: ''
        }]);
        return;
    }

    var results = [];

    // I picked a few of the most readable/interesting fonts from http://artii.herokuapp.com/fonts_list
    // See server.js for a commented-out query of all available fonts.
    fonts = ["gothic","roman","alligator","banner3","basic","xsbook","big","bubble","cyberlarge","digital"];

    async.eachSeries(fonts, function(font, done) {
        request({
            url: 'http://artii.herokuapp.com/make',
            qs: {
              text: text,
              font: font
            },
            timeout: 15 * 1000
        }, function(err, response) {
            if (err) {
                res.status(500).send('Error');
            }

            if (response != undefined) {
                results.push({
                    title: '<pre>' + response.body + '</pre>',  // preview the ascii art
                    text: text + "|" + font                     // send pipe-delimited user input and font name to resolver
                });
            }

            done();
        });
    }, function(err) {

        // Populate the popup suggestion box
        res.json(results);
    });
};
