import React, { Component } from 'react';
import { SelectFilter } from './';
import { Button } from '@blueprintjs/core';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterableItems: {
        weapons: [],
        neighborhood: [],
        district: [],
        premise: [],
        inside: [],
      },
      filter: {
        filter: {}
      },
    };
  }

  componentDidMount() {
    // TODO: call REST api to get this information
    this.setState({
      filterableItems: {
        weapons: ['FIREARM', 'KNIFE'],
        neighborhood: ['PIMLICO', 'MILTON'],
      },
    });
  }

  render() {
    const { filterableItems } = this.state;

    const childrenWithProps = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { filter: this.state.filter });
    });

    return (
      <div>
        <div>
          <div>
            <h2 id="filter-header">Filters</h2>
          </div>

          <div className="filters">
            <SelectFilter title="Weapon" items={filterableItems.weapons} filterName="weapon" ref="weapon" />
            <SelectFilter title="Neighborhood" items={filterableItems.neighborhood} filterName="neighborhood" ref="neighborhood" />
            <SelectFilter title="District" items={filterableItems.district} filterName="district" ref="district" />
            <SelectFilter title="Premise" items={filterableItems.premise} filterName="premise" ref="premise" />
            <SelectFilter title="Inside/Outside" items={filterableItems.inside} filterName="inside" ref="inside" />

            <Button text="Apply Filters" intent="primary" onClick={() => {
              const { weapon, neighborhood, district, premise, inside } = this.refs;
              const options = [weapon, neighborhood, district, premise, inside];

              let filter = {};

              for (let option of options) {
                if (option && option.state.selectedItem != '') {
                  filter[option.props.filterName] = option.state.selectedItem;
                }
              }

              this.setState({
                filter: {
                  filter: filter
                }
              });
            }} />
          </div>
        </div>

        <div>{childrenWithProps}</div>
      </div>
    );
  }
}

export default Filter;