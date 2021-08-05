import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import './ParanormalMap.css';

import { Grid, Paper, Typography } from '@material-ui/core'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const ParanormalMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const coordinates = {
    sydney: {
      latitude: -33.855369,
      longitude: 151.208774,
    },
  };

  const [lng, setLng] = useState(coordinates.sydney.longitude);
  const [lat, setLat] = useState(coordinates.sydney.latitude);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) {
      return; // initialize map only once
    }

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nictordan/ckryudubn0un717pcu6v16nf3',
      center: [lng, lat],
      zoom,
    });
  });

  useEffect(() => {
    if (!map.current) {
      return; // wait for map to initialize
    }

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <Grid item xs={11}>
      <Paper style={{ width: '100%' }}>
        <Typography variant="h5">Paranormal Activity</Typography>
        <div ref={mapContainer} className="map-container" />
      </Paper>
    </Grid>
  );
};

export default ParanormalMap;
