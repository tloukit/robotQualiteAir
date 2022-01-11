const express = require('express')
const app = express()
const request = require('request')

//const mongoose = require("mongoose");

// ajout middleware ( à partir v4.16 d'express plus besoin de body-parser)
app.use(express.json())

const DATABASE_URL = 'mongodb://localhost:27017/air_quality_db';

//URL API externe: (ici pollution pour la ville de paris)
const url = "http://api.waqi.info/feed/paris/?token=dc1344cd36c9cafe553b59a89e93636b4ee004eb" ;//ici avec api-key 


const PollutionDataByCityTimer = setInterval(getPollutionDataByCity, 5000); //toutes les 5000ms / 5s

// recuperation depuis l'api des donnees de pollution pour la ville de paris
var pollutionDataByCity;
var pollutionDataByCity	
function getPollutionDataByCity(){
app.route('/pollutionDataByCity')
.get( function(req , res  , next ) {

	request(url, function(error, response, body) {
		if(response.statusCode==200){
			res.setHeader('Content-type', 'application/json; charset= utf-8');
			console.log("statut 200 ok requete api");

			let respValue = JSON.parse(body);
			respValue.data;
			 pollutionDataByCity = body;
			 res.send(pollutionDataByCity);
				}
			});
		});
	}


	app.listen(8282 , function () {
		console.log("http://localhost:8282");
	  });