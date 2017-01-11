var mongoclient = require('mongodb').MongoClient;
var path = require('path');
var express = require('express');
var https = require('https');
var url = require('url');
var key = require('./api-key.js');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/test', function(req, res){
   res.redirect('test.html');
   res.end();
});

app.get('/api/:searchquery', function(req, res){
    //format the api request into the google query
    var searchquery = req.params.searchquery.replace(' ', '%20');
    var query = url.parse(req.url, true).query;
    console.log(query)
    var offset = (query.hasOwnProperty('offset'))? query.offset : 1;
    var options = {
        protocol: 'https:',
        hostname: 'www.googleapis.com',
        path: '/customsearch/v1?key=' + key.key + '&cx=004593805646146666066:0ys9didd2sq&q=' + searchquery + '&start=' + offset,
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
            //put the response together and parse for our own return
            var data = JSON.parse(concatData.join(''));
            var results = [];
            for (var i=0,l=data.items.length; i<l; i++) {
                results.push({
                    title: data.items[i].title,
                    url: data.items[i].pagemap.cse_image[0].src,
                    snippet: data.items[i].snippet,
                    thumbnail: data.items[i].pagemap.cse_thumbnail[0].src,
                    context: data.items[i].link
                });
            }
            res.json(results);
            
            res.end()
        })
    });
    httpsReq.on('error', function(e){
        console.log('error: ' + e);
    })
    httpsReq.end();
})

app.get('/*', function(req, res){
    res.write('this is not a real place');
    res.end();
})

app.listen(8080, function(){
    console.log('listener added');
});