import '../styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const app = document.getElementById('demo');
app && ReactDOM.render(<App />, app);
