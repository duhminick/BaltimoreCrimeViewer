import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import './table.css';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidUpdate(previousProps) {
    // This is to prevent constant hammering on the API
    if (previousProps.filter == this.props.filter
      && this.state.data != null) {
      return;
    }

    fetch('http://localhost:5000/all', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: this.props.filter ? JSON.stringify(this.props.filter) : JSON.stringify({filter: {}}),
    }).then(response => response.json())
      .then(data => {
        console.log(1);
        this.setState({data: data.info});
      });
  }

  render() {
    const columns = [
      { key: 'id', name: 'ID', width: 80},
      { key: 'crimedate', name: 'Date', width: 140},
      { key: 'longitude', name: 'Longitude'},
      { key: 'latitude', name: 'Latitude'},
      { key: 'crimehour', name: 'Hour', width: 80},
      { key: 'location', name: 'Location'},
      { key: 'description', name: 'Description'},
      { key: 'inside', name: 'Inside/Outside', width: 130},
      { key: 'weapon', name: 'Weapon', width: 100},
      { key: 'district', name: 'District', width: 140},
      { key: 'neighborhood', name: 'Neighborhood'},
      { key: 'premise', name: 'Premise'},
    ];

    const { data } = this.state;
    const count = data ? data.length : 0;

    return (
      <div className="table">
        {data &&
          <ReactDataGrid 
            columns={columns}
            rowGetter={i => data[i]}
            rowsCount={count}
            // minHeight={800}
          />
        }
      </div>
    );
  }
}

export default Table;