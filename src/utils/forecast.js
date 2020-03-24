const request = require('request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'https://api.darksky.net/forecast/fff050e74230c420a668dc9c48831236/'+latitude+','+longitude+'?units=si'

    request({url , json:true}, (error,{body}) =>{
        

        if(error){
            callback('Unable to connect to weathe forecast,Try Again',undefined,undefined)
        } else if(body.error){
            callback('The coordinates does not match,please check',undefined,undefined)
        } else {
            temp = body.currently.temperature
            perc = body.currently.precipProbability*100
            maxTemp = body.daily.data[0].temperatureHigh
            minTemp = body.daily.data[0].temperatureLow
            maxTemp = body.daily.data[0].temperatureHigh
            minTemp = body.daily.data[0].temperatureLow
            news = " It is currently "+temp+" degrees out. There is "+perc+"% chance of rain"
            callback(undefined, body.daily.data[0].summary + news,'Maximum Temperature = '+maxTemp+'and Minimum Temperature '+ minTemp)
        }

        
    })
}
module.exports = forecast