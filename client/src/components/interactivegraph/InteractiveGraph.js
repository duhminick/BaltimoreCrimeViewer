import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {
  XYPlot,
  makeVisFlexible,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  HorizontalBarSeries
} from 'react-vis';
import './interactivegraph.css';

const FlexibleXYPlot = makeVisFlexible(XYPlot);

class InteractiveGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: null
    };
  }

  componentDidUpdate(previousProps) {
    // This is to prevent constant hammering on the API
    if (previousProps.filter == this.props.filter && this.state.count != null) {
      return;
    }

    fetch('http://localhost:5000/count/weapon', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: this.props.filter ? JSON.stringify(this.props.filter) : JSON.stringify({filter: {}}),
    }).then(response => response.json())
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

        this.setState({ count: c })
      });
  }

  render() {
    const { count } = this.state;

    const xyPlotProps = {
      className: 'graph',
      xType: this.props.horizontal ? 'linear' : 'ordinal',
      yType: this.props.horizontal ? 'ordinal' : 'linear',
    };

    return (
      <div className="interactive-graph">
        <FlexibleXYPlot {...xyPlotProps}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries data={count} barWidth={0.3} />
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default InteractiveGraph;