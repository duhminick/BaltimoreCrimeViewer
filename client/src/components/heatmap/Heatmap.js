import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { Card, H5, MenuItem } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';
import './heatmap.css'

class Heatmap extends Component {
  static defaultProps = {
    center: {lat: 39.2904, lng: -76.6122},
    zoom: 13
  };

  static mapStyle = {
    width: '100%',
    height: '100%'
  };

  constructor(props) {
    super(props);
    // this.state = {items: ['a', 'b', 'c']};
  }

  // itemRenderer(item, { modifiers, handleClick }) {
  //   if (!modifiers.matchesPredicate) {
  //     return null;
  //   }

  //   return (
  //     <MenuItem
  //       active={modifiers.active}
  //       text={item}
  //       onClick={handleClick} />
  //   );
  // }

  // tagRenderer(item) {
  //   return item;
  // }

  render() {
    return (
      <div className="container">
        <div className="controls">
          <Card elevation={1}>
            <H5>Options</H5>
            {/* <MultiSelect
              itemRenderer={this.itemRenderer}
              items={this.state.items}
              onItemSelect={console.log('clicked')}
              tagRenderer={this.tagRenderer} /> */}
          </Card>
        </div>

        <div className="map">
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            style={this.mapStyle} />
        </div>
      </div>
    )
  }
}

export default Heatmap;