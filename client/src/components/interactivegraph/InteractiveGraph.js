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
  HorizontalBarSeries,
  Crosshair
} from 'react-vis';
import './interactivegraph.css';

const FlexibleXYPlot = makeVisFlexible(XYPlot);

class InteractiveGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: null,
      hovering: null
    };
  }

  componentDidUpdate(previousProps) {
    // This is to prevent constant hammering on the API
    if (previousProps.filter == this.props.filter 
        && this.state.count != null
        && previousProps.attribute == this.props.attribute) {
      return;
    }

    fetch('http://localhost:5000/count/' + this.props.attribute, {
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
    const { count, hover } = this.state;

    const xyPlotProps = {
      className: 'graph',
      xType: this.props.horizontal ? 'linear' : 'ordinal',
      yType: this.props.horizontal ? 'ordinal' : 'linear',
      margin: {left: 70},
    };

    return (
      <div className="interactive-graph">
        <FlexibleXYPlot {...xyPlotProps} onMouseLeave={() => this.setState({hover: null})}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis title="Count" />
          <VerticalBarSeries
            data={count}
            barWidth={0.3}
            onNearestX={(datapoint) => {
              this.setState({hover: datapoint})
            }} />

            {hover &&
              <Crosshair values={[hover]} />            
            }
        </FlexibleXYPlot>
      </div>
    );
  }
}

export default InteractiveGraph;