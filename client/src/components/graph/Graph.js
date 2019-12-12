import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  HorizontalBarSeries
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
          if (this.props.horizontal) {
            return {
              y: attr.attribute, x: attr.count
            };
          } else {
            return {
              x: attr.attribute, y: attr.count
            };
          }
        })

        if (this.props.limit) {
          c.length = this.props.limit;
        }

        this.setState({ count: c })
      });
  }
  
  render() {
    const { count } = this.state;

    const BarSeries = this.props.horizontal
      ? HorizontalBarSeries
      : VerticalBarSeries;

    const xyPlotProps = {
      className: 'graph',
      xType: this.props.horizontal ? 'linear' : 'ordinal',
      yType: this.props.horizontal ? 'ordinal' : 'linear',
      width: this.props.width,
      height: this.props.height
    };

    return (
      <div>
        <h2>{this.props.title ? this.props.title : ''}</h2>
        <XYPlot {...xyPlotProps}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis title={this.props.xAxisTitle ? this.props.xAxisTyle : ''} tickLabelAngle={this.props.horizontal ? 0 : -45} />
          <YAxis title={this.props.yAxisTitle ? this.props.yAxisTitle : ''} tickLabelAngle={this.props.horizontal ? -45 : 0} />
          <BarSeries data={count} barWidth={0.4} />
        </XYPlot>
      </div>
    );
  }
}
  
export default Graph;