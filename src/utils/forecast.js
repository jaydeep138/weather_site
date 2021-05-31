const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=80d8ebf6736a81ddf7643fa9ac4fe922&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location Services!', undefined)
        }
        else if (body.error) {
            callback('Unable to find location , Try another location', undefined)
        }
        else {
            // console.log(body)
            callback(undefined, {
                forecast:body.current.weather_descriptions[0]+' in the sky. It is currently '+body.current.temperature+' degrees out. There is '+body.current.precip*100+'% chances of rain',
                weatherIcon:body.current.weather_icons[0]
                
            })
        }
    })
}

module.exports = forecast