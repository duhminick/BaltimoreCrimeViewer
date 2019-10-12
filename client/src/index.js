import React from 'react';
import { render } from 'react-dom';
import { Router } from '@reach/router';
import { NavigationBar,
  WrappedLink } from './components/navigation';
import { Heatmap } from './components/heatmap';
import Graph from './components/graph/Graph';
import './index.css';

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

let Home = () => (
  <div>
    <Graph />
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
