import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';
import './Graph.css';

class Graph extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      count: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/count/' + this.props.attribute)
      .then(response => response.json())
      .then(data => {
        let c = data.count.map((attr) => {
          return {
            x: attr.attribute, y: attr.count
          }
        })

        this.setState({ count: c })
      });
  }
  
  render() {
    const { count } = this.state;

    return (
      <div>
        <XYPlot className="graph" xType="ordinal" width={this.props.width} height={this.props.height}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title={this.props.xAxisTitle ? this.props.xAxisTyle : ''} />
          <YAxis title={this.props.yAxisTitle ? this.props.yAxisTitle : ''} />
          <VerticalBarSeries data={count} />
        </XYPlot>
      </div>
    );
  }
}
  
export default Graph;