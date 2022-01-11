const express = require('express')
const app = express()
const request = require('request')

//const mongoose = require("mongoose");


const DATABASE_URL = 'mongodb://localhost:27017/air_quality_db';

var url = 'http://api.waqi.info/feed/paris/?token=dc1344cd36c9cafe553b59a89e93636b4ee004eb' ;//ici avec api-key 


const pollutionDataByCityTimer = setInterval(getPollutionDataByCity, 5000); //toutes les 5000ms / 5s

// recuperation depuios l'api des donnees de pollution pour la ville de paris
var pollutionDataByCity;

function getPollutionDataByCity(){
request(url, function(error, response, body){
    if(response.statusCode==200){
        pollutionDataByCity = body;
    }
});
	}
app.get('/pollutionDataByCity', (req, res) => {
	console.log(' entre dans pollutionDataByCity');
    res.setHeader('Content-type', 'application/json; charset= utf-8');
    res.setHeader('Access-control-Allow-Origin', '*'); 
    res.send(pollutionDataByCity);
});


/*
apiRouter.route('/pollutionDataByCity')
.get( function(req , res  , next ) {

	//URL API externe:
	let url = "http://api.waqi.info/feed/paris/?token=dc1344cd36c9cafe553b59a89e93636b4ee004eb" ;//ici avec api-key 
	request(url, function(error, response, body) {
		if(response.statusCode==200){
			res.setHeader('Content-Type', 'application/json');
			console.log("statut 200 ok requete api")


			 pollutionDataByCity = body;
			 res.send(pollutionDataByCity);
				}
			});
		});

*/
app.use(express.json())

app.listen(8282 , function () {
	console.log("http://localhost:8282");
  });
