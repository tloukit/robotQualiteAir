const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    firstName:  String,
    lastName: String,
    cursus:   String,
    classes: [{ body: String, date: Date }],
    enrolled: { type: Date, default: Date.now }
  });


//  {"co":{"v":0.1},"h":{"v":95},"no2":{"v":33.3},"o3":{"v":9},"p":{"v":1015.7},"pm10":{"v":22},"pm25":{"v":70},"so2":{"v":0.6},"t":{"v":3.5},"w":{"v":3}}
const dailyPollutionSchema = new Schema({
    cityName : String,
    pollutionIndex:  Number,
    day:   Date,
    //classes: [{ body: String, date: Date }],
    //enrolled: { type: Date, default: Date.now }
  });

const DailyPollution = mongoose.model('DailyPollution', dailyPollutionSchema)

module.exports = DailyPollution