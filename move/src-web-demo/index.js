import '../styles/styles.scss';

import Grid from './modules/grid';

const imageGrid = new Grid(
  {
    images: 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC',
    pathToImages: 'data',
    pathToSource: 'images.original.url',
    horizontalMargin: 40,
    imageWidth: 300,
    imgMargin: 24,
  }
);

const demoNode = document.getElementById('demo');
if (demoNode) imageGrid.init('#demo');
