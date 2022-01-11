const mongoose = require ('mongoose');

const PollutionCitiesSchema = mongoose.Schema ({
    
    cityName: {type: String, require: true},
    pollutionIndex: {type: Number},
    day:   {type: Date},
    cityGeoLatitude: {type: Number},
    cityGeoLongitude: {type: Number}
});

module.exports = mongoose.model('PollutionCity', PollutionCitiesSchema);



