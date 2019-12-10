import React, { Component } from 'react';
import { Filter } from '../filter';
import { InteractiveGraph } from './';

class FilteredInteractiveGraph extends Component {
  render() {
    return (
      <div className="filtered-interactive-graph">
        <Filter>
          <InteractiveGraph />
        </Filter>
      </div>
    );
  }
}

export default FilteredInteractiveGraph;