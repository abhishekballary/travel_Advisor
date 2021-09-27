import React, { useState ,useEffect } from 'react'
import {CssBaseline, Grid} from '@material-ui/core'
import Header from './components/Headers/Headers'
import List from './components/List/List'
import Map from './components/Map/Map'
import { getPlacesdata, getWeatherMapData } from './api/index'


const App = () => {
    const [places, setPlaces] = useState([])
    const [weatherMapData, setWeatherMapData] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildChecked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [filteredPlaces, setFilteredPlaces] = useState([])

    useEffect(() => {
       navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude}}) => {
           setCoordinates( {lat: latitude, lng: longitude})
       })
    },[])

    useEffect(() => {
    if(bounds.sw && bounds.ne){
        setIsLoading(true)
        // console.log(places)
        getWeatherMapData(coordinates.lat,coordinates.lng)
        .then((data)=> setWeatherMapData(data))
        
          getPlacesdata(type, bounds.sw, bounds.ne)
          .then((data) => {
            setPlaces(data)
            setFilteredPlaces([])
            setIsLoading(false)
          })
    }
    },[type,bounds])

    useEffect(() => {
     const filterdArray = places.filter((el) => el.rating > rating)
     setFilteredPlaces(filterdArray)
    },[rating])
    return (
        <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates}/>
        <Grid container spacing={3} style={{width:'100%'}}>
            <Grid item xs={12} md={4}>
                <List 
                places={filteredPlaces.length?filteredPlaces:places}
                childClicked={childClicked}
                type={type}
                setType={setType}
                rating={rating}
                setRating={setRating}
                isLoading={isLoading}/>
            </Grid>
            <Grid item xs={12} md={8}>
                <Map
                setCoordinates={setCoordinates}
                setBounds={setBounds}
                coordinates={coordinates}
                places={filteredPlaces.length?filteredPlaces:places} 
                setChildChecked={setChildChecked}
                weatherData={weatherMapData}/>
            </Grid>
        </Grid>
        </>
    )
}

export default App