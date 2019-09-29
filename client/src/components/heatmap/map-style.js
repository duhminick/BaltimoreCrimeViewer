// https://github.com/uber/react-map-gl/blob/master/examples/heatmap/src/map-style.js

const MAX_ZOOM_LEVEL = 20;

const heatmapLayer = {
  maxzoom: MAX_ZOOM_LEVEL,
  type: 'heatmap',
  paint: {
    'heatmap-color': [
      'interpolate',
      ['linear'],
      ['heatmap-density'],
      0,
      'rgba(33,102,172,0)',
      0.2,
      'rgb(103,169,207)',
      0.4,
      'rgb(209,229,240)',
      0.6,
      'rgb(253,219,199)',
      0.8,
      'rgb(239,138,98)',
      0.9,
      'rgb(255,201,101)'
    ],
    'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, MAX_ZOOM_LEVEL, 20],
    'heatmap-opacity': {
      default: 0.4,
      stops: [
        [16, 0.4],
        [17, 0]
      ]
    }
  }
};

const circleLayer = {
  type: 'circle',
  paint: {
    'circle-radius': 8,
    'circle-color': 'red',
    'circle-opacity': {
      default: 1,
      stops: [
        [16, 0],
        [17, 1]
      ]
    }
  }
};

export { heatmapLayer, circleLayer };