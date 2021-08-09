import React, { useRef, useEffect, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core'; // eslint-disable-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import GeoJSON from 'geojson'

import './ParanormalMap.css';
import CreatePinForm from './CreatePinForm';
import api from '../../config/api';
// import geoJson from '../../data/paranormal-locations.json';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

// Ensure that you have the access token declared in the '.env' file.
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const ParanormalMap = () => {
  const mapContainer = useRef(null);

  const markerImageUrl = 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';

  const coordinates = {
    sydney: {
      longitude: 151.208774,
      latitude: -33.855369,
    },
  };

  const [lng, setLng] = useState(coordinates.sydney.longitude);
  const [lat, setLat] = useState(coordinates.sydney.latitude);
  const [zoom, setZoom] = useState(12);
  const [markers, setMarkers] = useState([])
  
  useEffect(() => {
    api
      .get('/locations')
      .then(({ data }) => {
        console.log('DATA', data)
        setMarkers(data)
      })
  }, [])
    
  let pins = GeoJSON.parse(markers, {Point: ['latitude', 'longitude']})

  console.log('PINS', pins.features)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nictordan/ckryyeqgzgcl817mbs5hil5se',
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', () => {
      map.loadImage(markerImageUrl, (error, image) => {
        if (error) throw error;

        map.addImage('custom-marker', image);
   
        map.addSource('locations', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: pins.features
          },
        });

        map.addLayer({
          id: 'locations',
          type: 'symbol',
          source: 'locations',
          layout: {
            'icon-image': 'custom-marker',
            'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
          },
        });

        map.on('click', 'locations', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { title, description } = e.features[0].properties;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup({ offset: 30 })
            .setLngLat(coordinates)
            .setHTML(
              `<strong>${title}</strong>` + 
              `<p>${description}</p>`)
            .addTo(map);

          map.on('mouseenter', 'locations', function () {
            map.getCanvas().style.cursor = 'pointer';
          });

          map.on('mouseleave', 'locations', function () {
            map.getCanvas().style.cursor = '';
          });
        });
      });
    });

    // Clean up when components unmounts
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid item xs={11}>
      <Paper style={{ width: '100%' }}>
        <Typography variant="h5">Paranormal Activity</Typography>
        <CreatePinForm />

        {/* This div must contain a 'ref' prop with the mapContainer
        so that the map gets rendered. */}
        <div ref={mapContainer} className="map-container" />
      </Paper>
    </Grid>
  );
};

export default ParanormalMap;
