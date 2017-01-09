var key = require('../utils/key');
var request = require('request');
var _ = require('underscore');

// The API that returns the in-email representation.
module.exports = function(req, res) {
    var content = req.query.text.trim();
    content     = content.split("|");   // separate pipe-delimited user input and font name
    text = content[0];
    if (content.length > 1) {
        font = content[1];
    } else {
        font = "big";       // default font
    }
    getAsciiArt(text, font, req, res);
};

function getAsciiArt(text, font, req, res) {
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

        var html = '<pre>' + response.body + '</pre>';
        res.json({
            body: html,
            raw: true
        });
    });
}
