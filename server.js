var mongoclient = require('mongodb').MongoClient;
var path = require('path');
var express = require('express');
var https = require('https');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/getit', function(req, res){
    var options = {
        protocol: 'https:',
        hostname: 'www.google.com',
        path: '/search?hl=en&as_st=y&site=imghp&tbm=isch&q=lol%20cat',
        method: 'GET'
    }
    var httpsReq = https.request(options, function(httpsRes){ 
        var concatData = [];
        
        httpsRes.on('data', function(chunk){ 
            concatData.push(chunk.toString());
        })
        
        httpsRes.on('end', function(){
            res.json(concatData.join(''));
            console.log(concatData.join(''));
            res.end()
        })
    });
    httpsReq.on('error', function(e){
        console.log('error: ' + e);
    })
    httpsReq.end();
})

app.get('/*', function(req, res){
    res.write('default');
    res.end();
})

app.listen(8080, function(){
    console.log('listener added');
});