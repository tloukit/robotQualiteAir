const request = require('request');
const mongoose = require("mongoose");

// Modeles de donnees mongoose
const PollutionCity = require('./models/m-PollutionCity');

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PWD = process.env.MONGO_PWD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;

const INSERT_EACH_5_HOURS = 18000000;
const INSERT_EACH_5_SECONDS = 5000;

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PWD}@${MONGO_CLUSTER}?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 // requetes api externe toutes les ... en ms 
const PollutionDataByCityTimer = setInterval(getPollutionDataByCity, INSERT_EACH_5_SECONDS);

// recuperation depuis l'api des donnees de pollution pour la ville de paris
	request(url, function(error, response, body) {
		if(response.statusCode==200){
			console.log("statut 200 ok requete api");
			let respValue = JSON.parse(body);
		
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