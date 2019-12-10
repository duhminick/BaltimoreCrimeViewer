import React, { Component } from 'react';
import { MenuItem, Button } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
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
          itemRenderer={(item, { modifiers, handleClick }) => {
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