const express = require('express');
const app = express();
const request = require('request');
const PollutionCity = require('./models/PollutionCity');

const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

//const dailyPollution = require('dailyPollutionIndex.js')

// ajout middleware ( à partir v4.16 d'express plus besoin de body-parser)
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/test');

/*const url_mongo_db = 'mongodb://localhost:27017/air_quality_db';
mongoose.connect(url_mongo_db);
const db = mongoose.connection;
db.once('open', function(){

	console.log("connexion a la base ok");
});*/


/*const Cat = mongoose.model('Cat', {_id: String, name: String });

const kitty = new Cat({ _id: 'ZO', name: 'Zildjian' });
//kitty._id = 'Zo';
kitty.save().then(() => console.log('meow'));*/

//  {"co":{"v":0.1},"h":{"v":95},"no2":{"v":33.3},"o3":{"v":9},"p":{"v":1015.7},"pm10":{"v":22},"pm25":{"v":70},"so2":{"v":0.6},"t":{"v":3.5},"w":{"v":3}}
/*const dailyPollutionSchema = new Schema({
    cityName : String,
    pollutionIndex:  String,
    day:   String,
    //classes: [{ body: String, date: Date }],
    //enrolled: { type: Date, default: Date.now }
  });*/

  //const DailyPollution = mongoose.model('DailyPollution', dailyPollutionSchema)


//URL API externe: (ici pollution pour la ville de paris)
const url = "http://api.waqi.info/feed/paris/?token=dc1344cd36c9cafe553b59a89e93636b4ee004eb" ;//ici avec api-key 


const PollutionDataByCityTimer = setInterval(getPollutionDataByCity, 5000); //toutes les 5000ms / 5s

// recuperation depuis l'api des donnees de pollution pour la ville de paris
var pollutionDataByCity;
var pollutionDataByCity
function getPollutionDataByCity(){
app.route('/pollutionDataByCity')
.get( function(req , res  , next ) {
	if (res.getHeader == null){res.setHeader('Content-type', 'application/json; charset= utf-8');}
	

	request(url, function(error, response, body) {
		if(response.statusCode==200){
			console.log("statut 200 ok requete api");

			let respValue = JSON.parse(body);
			console.log("index Q air => " + JSON.stringify(respValue.data.iaqi.pm25["v"] ));
			//console.log(JSON.stringify(respValue.data.time["s"] + " -- "+ respValue.data.time["tz"])); 
			const pollutionIndex = JSON.stringify(respValue.data.iaqi.pm25["v"] );
			const pollutionCity = new PollutionCity({
				
				cityName : 'paris', 
				pollutionIndex : pollutionIndex
			});
			pollutionCity.save();
				//  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
				  //.catch(error => res.status(400).json({ error }));
			  
			
			/*var dailyPollution = new DailyPollution();
			var paris = "paris";
			dailyPollution.cityName = "paris"; 
			dailyPollution.pollutionIndex = respValue.data.iaqi.pm25 ;
			dailyPollution.day = respValue.data.time["s"];

			dailyPollution.save(function(err){
				if(err){
				  res.send(err);
				}
				res.json({message : 'Bravo, mise à jour des données OK'});
			  }); */
 
			  

			 pollutionDataByCity = body;
			 res.send(pollutionDataByCity);
			//res.send(JSON.stringify(respValue));
				}
			});
		});
	}



/* //  {"co":{"v":0.1},"h":{"v":95},"no2":{"v":33.3},"o3":{"v":9},"p":{"v":1015.7},"pm10":{"v":22},"pm25":{"v":70},"so2":{"v":0.6},"t":{"v":3.5},"w":{"v":3}}
	const studentSchema = new Schema({
		cityName : String,
		pollutionIndex:  Number,
		day:   Date,
		//classes: [{ body: String, date: Date }],
		//enrolled: { type: Date, default: Date.now }
	  });
*/
	app.listen(8282 , function () {
		console.log("http://localhost:8282");
	  });