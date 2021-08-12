import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl';
import GeoJSON from 'geojson';

import api from '../../api/api';

const mapboxApiKey = process.env.REACT_APP_MAPBOX_KEY

const Map = () => {

  const mapCoordinates = {
    sydney: {
      longitude: 151.208774,
      latitude: -33.855369,
    },
  };

  // This is the zoom level of the map. The smaller the number,
  // the farther away it will be.
  const [zoom, setZoom] = useState(12);
  const [lat, setLat] = useState(mapCoordinates.sydney.latitude);
  const [lng, setLng] = useState(mapCoordinates.sydney.longitude);
  const [locationsFromBackend, setLocationsFromBackend] = useState([]);

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: lat,
    longitude: lng,
    zoom: zoom
  });

  const [locationsFromApi, setLocationsFromApi] = useState([]);

  useEffect(() => {
    api.get('/pins').then(({ data }) => {
      setLocationsFromApi(data);
    });
  }, []);
  
  const pins = GeoJSON.parse(locationsFromApi, {
    Point: ['latitude', 'longitude'],
  });

  const geojson = {
    type: 'FeatureCollection',
    features: pins.features
  }

  const layerStyle = {
    id: 'point',
    type: 'circle',
    paint: {
      'circle-radius': 10,
      'circle-color': '#007cbf'
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={mapboxApiKey}
      mapStyle="mapbox://styles/nictordan/ckryyeqgzgcl817mbs5hil5se"
      onViewportChange={nextViewport => setViewport(nextViewport)}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>
    </ReactMapGL>
  );
}

export default Map;