import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles'
import mapStyles from './mapStyles'
let lag,lng

const Map = ({setCoordinates, setBounds, coordinates, places,setChildChecked, weatherData}) => {
    const classes = useStyles()
    const isDesktop = useMediaQuery('(min-width:600px)')
    // const coordinates = { lat:0, lng:0}
    return(
        <div className={classes.mapContainer}>
            <GoogleMapReact 
                bootstrapURLKeys={{key:process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
                // defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={14}
                margin={[50,50,50,50]}
                options={{ disableDefaultUI:true, zoomControl:true, styles:mapStyles}}
                onChange={(e) => {
                    console.log(e,2555555)
                    setCoordinates({ lat:e.center.lat,lng:e.center.lng })
                    setBounds({ ne:e.marginBounds.ne, sw:e.marginBounds.sw})
                }}
                onChildClick={(child)=>setChildChecked(child)}>
        
                    { places?.map((place,i) => (
                        <div
                           className={classes.markerContainer}
                           lat={place.latitude?Number(place.latitude):''}
                           lng={place.longitude?Number(place.longitude):''}
                           key={i}
                        >
                            {
                                !isDesktop ? (
                                    <LocationOnIcon color='primary' fontsize='large'/>
                                ) : (
                                    <Paper elevetion={3} className={classes.paper}>
                                        <Typography className={classes.typography} variant='subtitle2' gutterBottom>
                                            {place.name}
                                        </Typography>
                                        <img 
                                           className={classes.pointer}
                                           src={place.photo?place.photo.images.large.url:'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                                           alt={place.name} />
                                           <Rating size='small' value={Number(place.rating)} readOnly />
                                    </Paper>
                                )
                            }

                        </div>
                    ))

                    }
                {
                    weatherData?.list?.map((data,i) =>(
                        <div key={i} lat={data.coord.lat} lng={data.coord.lng}>
                            <img height={80} src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`} />

                        </div>
                    ))
                }    

            </GoogleMapReact>

        </div>
    )
}

export default Map