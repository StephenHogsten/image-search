var mongoclient = require('mongodb').MongoClient;
var path = require('path');
var express = require('express');
var https = require('https');
var url = require('url');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function(req, res){
   res.redirect('test.html');
   res.end();
});

//practice for parsing the google result
app.get('/api/:searchquery', function(req, res){
    var query = url.parse(req.url, true).query;
    console.log(query)
    var offset = (query.hasOwnProperty('offset'))? query.offset : 1;
    var options = {
        protocol: 'https:',
        hostname: 'www.googleapis.com',
        path: '/customsearch/v1?key=AIzaSyCNHybXpvSstGLgoaavycOUvB4pP5Oi6h0&cx=004593805646146666066:0ys9didd2sq&q=' + req.params.searchquery + '&start=' + offset,
        method: 'GET',
        searchType: 'image'
    };
    console.log(options);
    var httpsReq = https.request(options, function(httpsRes){ 
        var concatData = [];
        
        httpsRes.on('data', function(chunk){ 
            concatData.push(chunk.toString());
        })
        
        httpsRes.on('end', function(){
            res.json(JSON.parse(concatData.join('')));
            //console.log(concatData.join(''));
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