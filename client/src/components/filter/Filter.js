import React, { Component } from 'react';
import { SelectFilter, DateFilter } from './';
import { Button } from '@blueprintjs/core';

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterableItems: {
        weapons: [],
        neighborhood: [],
        description: [],
        district: [],
        premise: [],
        inside: [],
      },
      // TODO: find a more elegant solution than this
      filter: {
        filter: {}
      },
    };
  }

  _setDefaultDate() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const today = new Date();

    this.setState({filter: {
      filter: {
        from: lastMonth,
        to: today,
      }
    }});
  }

  componentDidMount() {
    fetch('http://localhost:5000/items')
      .then(response => response.json())
      .then(data => {
          this.setState({filterableItems: data});
      });

    // There appears to be a problem with BlueprintJS?
    // this._setDefaultDate();
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
            <SelectFilter title="Description" items={filterableItems.description} filterName="description" ref="description" />
            <SelectFilter title="District" items={filterableItems.district} filterName="district" ref="district" />
            <SelectFilter title="Premise" items={filterableItems.premise} filterName="premise" ref="premise" />
            {/* <SelectFilter title="Inside/Outside" items={filterableItems.inside} filterName="inside" ref="inside" /> */}
            <DateFilter title="Date" ref="date" />

            <Button text="Apply Filters" intent="primary" onClick={() => {
              const { weapon, neighborhood, description, district, premise, inside, date} = this.refs;
              const options = [weapon, neighborhood, description, district, premise, inside];

              let filter = {};

              for (let option of options) {
                if (option && option.state.selectedItem != '') {
                  filter[option.props.filterName] = option.state.selectedItem;
                }
              }

              if (date.state.from && date.state.to) {
                filter['from'] = date.state.from;
                filter['to'] = date.state.to;
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