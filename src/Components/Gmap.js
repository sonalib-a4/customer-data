import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import LOS_ANGELES_CENTER from '../const/la_center';
import MapDataTable from './MapDataTable'
import Marker from './Marker';

export const Gmap = () => {
  const [places, setPlaces] = useState([])

  const fetchPlaces = async () => {
    fetch('places.json')
    .then((response) => response.json())
    .then((data) => setPlaces(data.results))
  }

  useEffect(() => {
    fetchPlaces();
  }, [])

  if (!places || places.length === 0) {
    return null;
  }

  return (
    <div id="gmap-div" style={{ height: '50vh', width: '70%', paddingLeft: '180px' }}>
      <GoogleMapReact
        defaultZoom={10}
        bootstrapURLKeys={{ key: 'AIzaSyARfN2cPiVH7ccV-LjIw0_TpoitbnwA9Z4' }}
        defaultCenter={LOS_ANGELES_CENTER}
      >
        {places.map((place, index) => (
          <Marker
            key={place.id}
            text={place.name}
            lat={place.geometry.location.lat}
            lng={place.geometry.location.lng}
            color="blue"
            number={index+1}
          />
        ))}
      </GoogleMapReact>
      <MapDataTable places={places} />
    </div>
  )
}

export default Gmap;