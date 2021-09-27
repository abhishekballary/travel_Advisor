import axios from 'axios'


export const getPlacesdata = async (type,sw,ne) => {
    try{
        const { data:{ data }} = await axios.get( `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            tr_latitude: ne.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': process.env.REACT_APP_TRAVEL_API_KEY
          }
        })
        
        return data
    }catch(err){
        console.log(err)

    }
}


export const getWeatherMapData = async (lat,lng) => {
  try{
    const { data } = await axios.get(`https://community-open-weather-map.p.rapidapi.com/find`,{
      params: {
        lon: lng,
        lat: lat,
      },
      headers: {
        'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
        'x-rapidapi-key': process.env.REACT_APP_WEATHER_API_KEY
      }
    })
    console.log(data,12788)
    return data
  }catch(err){
    console.log(err)
  }
 
}
