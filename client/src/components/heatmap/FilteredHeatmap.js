import React, { Component } from 'react';
import { Filter } from '../filter';
import { Heatmap } from './';

class FilteredHeatmap extends Component {
  render() {
    return (
      <div className="filtered-heatmap">
        <Filter>
          <Heatmap />
        </Filter>
      </div>
    );
  }
}

export default FilteredHeatmap;