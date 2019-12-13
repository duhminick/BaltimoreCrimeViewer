import React, { Component } from 'react';
import { Filter } from '../filter';
import { InteractiveGraph } from './';
import { Heatmap } from '../heatmap';
import { Table } from '../table';
import { Button } from '@blueprintjs/core';
import './interactivegraph.css'

const GRAPH = 1;
const HEATMAP = 2;
const TABLE = 3;

class FilteredInteractiveGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attribute: 'weapon',
      view: GRAPH
    };

    this._update.bind(this);
  }

  _update(type) {
    this.setState({
      attribute: type,
      view: GRAPH
    });
    this.forceUpdate();
  }

  render() {
    const { view, attribute } = this.state;

    let DataView = InteractiveGraph;
    if (view == HEATMAP) {
      DataView = Heatmap;
    } else if (view == TABLE) {
      DataView = Table;
    }

    return (
      <div className="filtered-interactive-graph">
        <div className="graph-selector">
          <h2 id="selector-title">Graph Type</h2>
          <div className="graph-types">
            <Button className="graph-button" text="Weapon" onClick={() => this._update('weapon')} />
            <Button className="graph-button" text="Neighborhood" onClick={() => this._update('neighborhood')} />
            <Button className="graph-button" text="Description" onClick={() => this._update('description')} />
            <Button className="graph-button" text="District" onClick={() => this._update('district')} />
            <Button className="graph-button" text="Premise" onClick={() => this._update('premise')} />
            <Button className="graph-button" text="Heatmap" onClick={() => this.setState({view: HEATMAP})} />
            <Button className="graph-button" text="Table" onClick={() => this.setState({view: TABLE})} />
          </div>

        </div>

        <Filter>
          <DataView attribute={attribute} />
        </Filter>
      </div>
    );
  }
}

export default FilteredInteractiveGraph;