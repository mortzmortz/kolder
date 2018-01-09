import '../styles/styles.scss';

/**
 * https://github.com/babel/babel/tree/master/packages/babel-preset-env include only the polyfills and
 * transforms needed for the browsers we specified in kolder.config.js
 */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const app = document.getElementById('demo');
app && ReactDOM.render(<App />, app);
