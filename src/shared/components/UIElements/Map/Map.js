import React, { useRef, useEffect } from 'react';

import './Map.css';

const Map = props => {
  /*
        1. Import google map api key in head of index
        2. Make the mapRef to get a consistent pointer for the map
        3. Use Google API constructor and pass ref and arguments
        4. Use ref property for your return jsx
     */
  const mapRef = useRef();
  const { center, zoom } = props;
  // Not even using this code but keeping it for the useEffect example
  // useEffect will call the function when either of the two dependencies change
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    });
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    />
  );
};

export default Map;
