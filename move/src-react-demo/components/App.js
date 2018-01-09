import React, { Component } from 'react';
import Grid from './Grid';

class App extends Component {
  render() {
    return (
      <Grid
        margin={48}
        imgWidth={300}
        imgMargin={24}
        url="http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC"
      />
    );
  }
}

export default App;
