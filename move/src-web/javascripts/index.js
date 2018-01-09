import '../styles/styles.scss';

/**
 * https://github.com/babel/babel/tree/master/packages/babel-preset-env include only the polyfills and
 * transforms needed for the browsers we specified in kolder.config.js
 */
import 'babel-polyfill';

import demo from './modules/demo';

const demoNode = document.getElementById('demo');
demoNode.innerHTML = demo;
