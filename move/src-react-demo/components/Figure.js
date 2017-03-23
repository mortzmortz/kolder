import React, { Component } from 'react';

class Figure extends Component {

  static get propTypes() {
    return {
      url: React.PropTypes.string.isRequired,
      imgMargin: React.PropTypes.number.isRequired
    };
  }

  constructor() {
    super();
    this.styles = {
      figure: {
        backgroundColor: '#E8E8E8'
      },
      img: {
        width: '100%'
      }
    };
  }

  render() {
    const figureStyles = {
      ...this.styles.figure,
      marginBottom: this.props.imgMargin
    };
    return (
      <figure className="loaded" style={figureStyles}>
        <img src={this.props.url} alt="" style={this.styles.img} />
      </figure>
    );
  }
}

export default Figure;
