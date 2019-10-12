import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer, Marker, Popup } from 'react-map-gl';
import { heatmapLayer, circleLayer } from './map-style';
import './heatmap.css'

const MAP_TOKEN = 'pk.eyJ1IjoicmFzaGJhbGFzaCIsImEiOiJjazE2b3Z1engwNXB6M25rdzhsaGthczc2In0.MQXvx9LrRR6zaP1yLrQGFQ';

class Heatmap extends Component {
  constructor(props) {
    super(props);

    this._ref = null;

    this.state = {
      viewport: {
        // Baltimore coordinates
        latitude: 39.2904,
        longitude: -76.6122,

        zoom: 13,
        bearing: 0,
        pitch: 0,
      },
      coordinates: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/coordinates')
      .then(response => response.json())
      .then(data => {
        let d = {
          type: 'FeatureCollection',
          features: data.positions.map(coord => {
            return {
              type: 'Feature',
              properties: {
                dbh: 1
              },
              geometry: {
                type: 'Point',
                coordinates: [coord.lng, coord.lat]
              }
            }
          })
        };

        this.setState({coordinates: d});
      });
  }

  _onViewportChange = viewport => this.setState({viewport});

  _onClick = e => {
    // <Popup longitude={} latitude={} />
  };

  render() {
    const { viewport, coordinates } = this.state;

    return (
      <div className="map">
        <MapGL
          {...viewport}
          ref={this._ref}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onViewportChange={this._onViewportChange}
          minZoom={11}
          maxZoom={18}
          onClick={this._onClick}
          mapboxApiAccessToken={MAP_TOKEN}>
            {coordinates && (
              <Source type="geojson" data={coordinates}>
                <Layer {...heatmapLayer} />
                <Layer {...circleLayer} />
              </Source>
            )}
        </MapGL>
      </div>
    )
  }
}

export default Heatmap;