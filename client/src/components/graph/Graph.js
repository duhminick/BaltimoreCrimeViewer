import React, { Component } from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  HorizontalBarSeries,
  HorizontalBarSeriesCanvas
} from 'react-vis';
import './Graph.css';

class Graph extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      useCanvas: false,
      countArr: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/count/' + this.props.attribute)
      .then(response => response.json())
      .then(data => {
        let c = data.count.map((attr) => {
          return {
            y: attr.attribute, x: attr.count
          }
        })

        this.setState({ countArr: c })
      });
  }
  
  render() {
    const { useCanvas, countArr } = this.state;

    const BarSeries = useCanvas
      ? HorizontalBarSeriesCanvas
      : HorizontalBarSeries;

    return (
      <div>
        <XYPlot className="graph" yType="ordinal" width={1000} height={700}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title={this.props.xAxisTitle} />
          <YAxis title={this.props.yAxisTitle} />
          <BarSeries data={countArr} barWidth={.3} />
        </XYPlot>
      </div>
    );
  }
}
  
export default Graph;