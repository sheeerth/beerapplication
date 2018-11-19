const express = require('express');
const request = require('request');
const app = express();
const port = 3000;


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const API_KEY = 'd85ef16247cf303c4f153f0b7f8d86f8';
const URL = 'https://api.brewerydb.com/v2/brewery';

app.get('/brewery', (req, res) => { 
    request(URL + '/random?key=' + API_KEY, function (error, response, body) {
        res.send(body);  
     }); 
  });

app.get('/beer', (req, res) => { 
  request(`${URL}/${req.query.id}/beers?key=${API_KEY}`, function (error, response, body) {
      res.send(body);  
   }); 
});

 app.listen(port, () => console.log('start'));
