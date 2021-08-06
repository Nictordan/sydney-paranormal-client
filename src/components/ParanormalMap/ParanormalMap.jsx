import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

import './ParanormalMap.css';
import { Grid, Paper, Typography } from '@material-ui/core'; // eslint-disable-line import/no-webpack-loader-syntax
import geoJson from '../../data/paranormal-locations.json';

// Ensure that you have the access token declared in the '.env' file.
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const ParanormalMap = () => {
  const mapContainer = useRef(null);

  const coordinates = {
    sydney: {
      longitude: 151.208774,
      latitude: -33.855369,
    },
  };

  const [lng, setLng] = useState(coordinates.sydney.longitude);
  const [lat, setLat] = useState(coordinates.sydney.latitude);
  // This is the zoom level of the map. The smaller the number, 
  // the farther away it will be. 
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/nictordan/ckryyeqgzgcl817mbs5hil5se',
      center: [lng, lat],
      zoom: zoom,
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Updates state when you move navigate the map. 
    // toFixed round to x decimal places.
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

  
    map.on('load', () => {
      // Once the map loads, load an image from this URL (or whatever source we pass in)
      map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error, image) => {
        if (error) throw error;

        // Then add the image with a title.
        // In this case, 'custom-marker'
        map.addImage('custom-marker', image);

        // Add a source to the map. 
        // Since it comes from a JSON file with geographic data, 
        // the type must be 'geojson'.
        map.addSource('locations', {
          type: 'geojson',
          data: {
            // Every point registered is interpreted as a 'feature'
            type: 'FeatureCollection',
            features: geoJson.features,
          }
        });

        // Then add a layer to the map based on the source added above.
        // The type here is a symbol because that's how the markers are specified
        // on Mapbox Studio (at least I suppose it is the reason why)
        map.addLayer({
          id: 'locations',
          type: 'symbol',
          source: 'locations',
          // Specify what will the icon related to the marked location look like.
          // In this case, it's that image loaded as 'custom-marker'.
          // The font family can be customized too apparently.
          layout: {
            'icon-image': 'custom-marker',
            'text-font': ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
          },
        });

        // This event listener will fire only when the locations are clicked.
        // If we click anywhere else in the map, the popups won't show up.
        // The 'locations' here is the source that we added above.
        map.on('click', 'locations', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { title, description } = e.features[0].properties
       
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          // Honestly, I don't understand this math, 
          // but the docs recommend to include it.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
           
          // This offset exists to set the position where the popup with appear.
          // If set to 0, it will appear right at the marker.
          // The offset is for the vertical axis. Positive goes up, negative down.
          new mapboxgl.Popup({ offset: 30 })
            .setLngLat(coordinates)
            .setHTML(
              `<strong>${title}</strong>` +
              `<p>${description}</p>`
            )
            .addTo(map);
        
           
          // Change the cursor to a pointer when the mouse is over the locations layer.
          map.on('mouseenter', 'locations', function () {
            map.getCanvas().style.cursor = 'pointer';
          });
           
          // Change it back to normal when it leaves the locations layer.
          map.on('mouseleave', 'locations', function () {
            map.getCanvas().style.cursor = '';
          });
        });  
      })
    })

   
    // Clean up when components unmounts
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Grid item xs={11}>
      <Paper style={{ width: '100%' }}>
        <Typography variant="h5">Paranormal Activity</Typography>

        {/* This div must contain a 'ref' prop with the mapContainer
        so that the map gets rendered. */}
        <div ref={mapContainer} className="map-container" />
      </Paper>
    </Grid>
  );
};

export default ParanormalMap;
