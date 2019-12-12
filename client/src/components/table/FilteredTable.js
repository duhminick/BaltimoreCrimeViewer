import React, { Component } from 'react';
import { Filter } from '../filter';
import { Table } from './';

class FilteredTable extends Component {
  render() {
    return (
      <Filter>
        <Table />
      </Filter>
    );
  }
}

export default FilteredTable;