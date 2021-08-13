import * as React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { NavigationControl, Marker, Popup } from 'react-map-gl';
import GeoJSON from 'geojson';

import 'mapbox-gl/dist/mapbox-gl.css';
import api from '../../api/api';
import { Button } from '@material-ui/core';


const mapboxApiKey = process.env.REACT_APP_MAPBOX_KEY;

const customIcon =
  'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png';

const Map = (props) => {

  const mapCoordinates = {
    sydney: {
      longitude: 151.208774,
      latitude: -33.855369,
    },
  };

  const [viewport, setViewport] = useState({
    latitude: mapCoordinates.sydney.latitude,
    longitude: mapCoordinates.sydney.longitude,
    zoom: 12,
  });

  const [locationsFromBackend, setLocationsFromBackend] = useState([]);
  const [selectedPin, setSelectedPin] = useState(null);

  useEffect(() => {
    api.get('/pins').then(({ data }) => {
      setLocationsFromBackend(data);
    });
  }, []);

  const pins = GeoJSON.parse(locationsFromBackend, {
    Point: ['latitude', 'longitude'],
  });

  useEffect(() => {
    const closePopup = (e) => {
      if (e.key === 'Escape') {
        setSelectedPin(null);
      }
    };
    window.addEventListener('keydown', closePopup);
    return () => window.removeEventListener('keydown', closePopup);
  }, []);

  const navigationControls = {
    right: 30,
    top: 30,
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="50vh"
      mapboxApiAccessToken={mapboxApiKey}
      mapStyle="mapbox://styles/nictordan/ckryyeqgzgcl817mbs5hil5se"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      <NavigationControl style={navigationControls} showCompass={false} />

      {pins.features.map((feature) => (
        <Marker
          key={feature.properties.id}
          latitude={feature.geometry.coordinates[1]}
          longitude={feature.geometry.coordinates[0]}
        >
          <button
            className="pin"
            onClick={(e) => {
              e.preventDefault();
              setSelectedPin(feature);
            }}
          >
            <img
              src={customIcon}
              alt="Icon that displays a location marker on the map"
            />
          </button>
        </Marker>
      ))}

      {selectedPin ? (
        <Popup
          className="popup"
          offsetTop={-10}
          offsetLeft={22}
          latitude={selectedPin.geometry.coordinates[1]}
          longitude={selectedPin.geometry.coordinates[0]}
          onClose={() => {
            setSelectedPin(null);
          }}
          closeOnClick={false}
        >
          <div>
            <p>
              <strong>{selectedPin.properties.title}</strong>
            </p>
            <p>{selectedPin.properties.description}</p>
            <Button >
              <Link to={"/pins/" + selectedPin.properties.id}>Go to notes</Link>
            </Button>
          </div>
        </Popup>
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
