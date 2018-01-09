import '../styles/styles.scss';

/**
 * https://github.com/babel/babel/tree/master/packages/babel-preset-env include only the polyfills and
 * transforms needed for the browsers we specified in kolder.config.js
 */
import 'babel-polyfill';

import Grid from './modules/grid';

const imageGrid = new Grid({
  images: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
  pathToImages: 'data',
  pathToSource: 'images.original.url',
  horizontalMargin: 40,
  imageWidth: 300,
  imgMargin: 24,
});

const demoNode = document.getElementById('demo');
if (demoNode) imageGrid.init('#demo');
