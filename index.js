var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var QRCode = require('qrcode');

app.use(bodyParser.json());

app.get('/health-check', function (req, res) {
    res.send({
        status: 'live'
    });
});

app.post('/qrcode', function (req, res) {
    if(typeof req.body.content == 'undefined'){
        res.status(500).jsonp({
            error: 'Null content.'
        });
    } else {
        var message = req.body.content;
        QRCode.toDataURL(message, function(err, url){
            res.send({
                code: url
            });
        });
    }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

