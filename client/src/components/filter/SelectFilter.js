import React, { Component } from 'react';
import { MenuItem, Button } from '@blueprintjs/core';
import { Select, QueryList } from '@blueprintjs/select';
import './filter.css';

class SelectFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: ''
    };
  }

  render() {
    const { title } = this.props;
    const { selectedItem } = this.state;

    const items = this.props.items ? this.props.items : [''];
    const disabled = this.props.items ? false : true;

    return (
      <div className="select-filter">
        {title &&
          <span className="select-filter-title">{title}:</span>
        }

        <Select
          items={items}
          disabled={disabled}
          onItemSelect={(item) => {
            this.setState({selectedItem: item});
          }}
          itemPredicate={(query, item, _index, exactMatch) => {
            const normalizedValue = item.toLowerCase();
            const normalizedQuery = query.toLowerCase();

            if (exactMatch) {
              return normalizedQuery == normalizedValue;
            } else {
              return normalizedValue.indexOf(normalizedQuery) >= 0;
            }
          }}
          itemRenderer={(item, { modifiers, handleClick }) => {
            if (!modifiers.matchesPredicate) {
              return null;
            }

            return (
              <MenuItem 
                key={item}
                text={item}
                onClick={handleClick}
                active={modifiers.active}
                disabled={disabled}
              />
            );
          }}
        >
          <Button text={selectedItem} rightIcon="caret-down" />
        </Select>
      </div>
    );
  }
}

export default SelectFilter;