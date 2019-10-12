import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { NavigationBar,
  WrappedLink } from './components/navigation';
import { Heatmap } from './components/heatmap';
import { Graph } from './components/graph';
import './index.css';

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

const graphWidth = 800;
const graphHeight = 400;

let Home = () => (
  <div className="graphs">
    <Graph title="Weapon" attribute="weapon" yAxisTitle="Count" width={graphWidth} height={graphHeight} />
    <Graph title="Neighborhood" attribute="neighborhood" yAxisTitle="Count" width={graphWidth} height={graphHeight} />
    <Graph title="District" attribute="district" yAxisTitle="Count" width={graphWidth} height={graphHeight} />
    <Graph title="Inside (vs. Outside)" attribute="inside" yAxisTitle="Count" width={graphWidth} height={graphHeight} />
    <Graph title="Premise" attribute="premise" yAxisTitle="Count" width={graphWidth} height={graphHeight} />
  </div>
);

const App = () => (
  <div>
    <NavigationBar name="Baltimore Crime Viewer">
      <WrappedLink to="/" text="Home" icon="home" />
      <WrappedLink to="heatmap" text="Heatmap" icon="heatmap" />
    </NavigationBar>

    <Router>
      <Home path="/" />
      <Heatmap path="heatmap" />
    </Router>
  </div>
);

render(<App />, document.getElementById('root'));
