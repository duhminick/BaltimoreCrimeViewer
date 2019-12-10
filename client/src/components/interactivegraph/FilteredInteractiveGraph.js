import React, { Component } from 'react';
import { Filter } from '../filter';
import { InteractiveGraph } from './';
import { Button } from '@blueprintjs/core';
import './interactivegraph.css'

class FilteredInteractiveGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attribute: 'weapon'
    };

    this._update.bind(this);
  }

  _update(type) {
    console.log('set state');
    this.setState({attribute: type});
  }

  render() {
    return (
      <div className="filtered-interactive-graph">
        <div className="graph-selector">
          <h2 id="selector-title">Graph Type</h2>
          <div className="graph-types">
            <Button className="graph-button" text="Weapon" onClick={() => this._update('weapon')} />
            <Button className="graph-button" text="Neighborhood" onClick={() => this._update('neighborhood')} />
            <Button className="graph-button" text="District" onClick={() => this._update('district')} />
            <Button className="graph-button" text="Premise" onClick={() => this._update('premise')} />
          </div>

        </div>
        <Filter>
          <InteractiveGraph attribute={this.state.attribute} />
        </Filter>
      </div>
    );
  }
}

export default FilteredInteractiveGraph;