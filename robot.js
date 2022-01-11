const express = require('express');
const app = express();
const request = require('request');
const mongoose = require("mongoose");

// Modeles de donnees mongoose
const PollutionCity = require('./models/m-PollutionCity');

//URL API externe: (ici pollution pour la ville de paris)
const url = "http://api.waqi.info/feed/paris/?token=dc1344cd36c9cafe553b59a89e93636b4ee004eb" ;//ici avec api-key

//mongoose.connect('mongodb+srv://isikaal10:Naturel75!@cluster0.w7hnq.mongodb.net/air_quality_db?retryWrites=true&w=majority',
mongoose.connect('mongodb://localhost:27017/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 // requetes api externe toutes les ... ms 
const PollutionDataByCityTimer = setInterval(getPollutionDataByCity, 5000); //toutes les 5heures = 18000000

// recuperation depuis l'api des donnees de pollution pour la ville de paris
function getPollutionDataByCity(){
	request(url, function(error, response, body) {
		if(response.statusCode==200){
			console.log("statut 200 ok requete api");
			let respValue = JSON.parse(body);
			console.log("index Q air => " + JSON.stringify(respValue.data.iaqi.pm25["v"] ));
			console.log("ville Q air => " + JSON.stringify(respValue.data.city.name));
			console.log(JSON.stringify(respValue.data.time["s"]));
		
			// champs à insérer
			const city = respValue.data.city.name;
			const pollutionIndex = respValue.data.iaqi.pm25["v"] ;
			const dayTime = respValue.data.time["s"];
			const cityLatitude = respValue.data.city.geo[0];
			const cityLongitude = respValue.data.city.geo[1];

			// Model mongoose de type PollutionCity
			const pollutionCity = new PollutionCity({
				cityName : city, 
				pollutionIndex : pollutionIndex,
				day: dayTime,
				cityGeoLatitude: cityLatitude,
				cityGeoLongitude: cityLongitude
			});
			// Enregistrement des champs dans mongodb
			pollutionCity.save();
				}
			});
	}
	
	app.listen(8282 , function () {
		console.log("http://localhost:8282");
	  });