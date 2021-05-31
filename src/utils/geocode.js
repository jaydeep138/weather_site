const request=require('request')

// const url='http://api.weatherstack.com/current?access_key=80d8ebf6736a81ddf7643fa9ac4fe922&query=37.8267,-122.4233&units=f'


const geocode= (address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5ZGVlcDIwMjQiLCJhIjoiY2twM2oxa25tMDBzbjJ2b3V5dzJuN3U0ciJ9.xuAuUvQ8PCZMfno4iNKjfA&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location Services!',undefined)
        }
        else if(body.features.length===0){
            callback('Unable to find location , Try another location',undefined)
        }
        else{
            // console.log(body)
            callback(undefined,{
                address:body.features[0].place_name,
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1]
            })
        }
    })

}

module.exports=geocode