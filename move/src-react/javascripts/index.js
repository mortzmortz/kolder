import '../styles/styles.scss';

/**
 * https://github.com/babel/babel/tree/master/packages/babel-preset-env include only the polyfills and
 * transforms needed for the browsers we specified in kolder.config.js
 */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './components/Demo';

ReactDOM.render(<Demo />, document.getElementById('demo'));
