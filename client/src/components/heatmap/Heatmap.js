import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Heatmap extends Component {
  static defaultProps = {
    center: {lat: 39.2904, lng: -76.6122},
    zoom: 13
  };

  static mapStyle = {
    width: '100%',
    height: '100%'
  };

  render() {
    return (
      <div style={{height: '900px', width: '1400px'}}>
        <h1>Google Map</h1>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom} 
          style={this.mapStyle} />
      </div>
    )
  }
}

export default Heatmap;