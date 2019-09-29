import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer } from 'react-map-gl';
import { heatmapLayer } from './map-style';
import './heatmap.css'

const MAP_TOKEN = '';

class Heatmap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: {
        // Baltimore coordinates
        latitude: 39.2904,
        longitude: -76.6122,

        zoom: 13,
        bearing: 0,
        pitch: 0
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

  render() {
    const { viewport, coordinates } = this.state;

    return (
      <div className="map">
        <MapGL
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/dark-v10"
          onViewportChange={this._onViewportChange}
          mapboxApiAccessToken={MAP_TOKEN}>
            {coordinates && (
              <Source type="geojson" data={coordinates}>
                <Layer {...heatmapLayer} />
              </Source>
            )}
        </MapGL>
      </div>
    )
  }
}

export default Heatmap;