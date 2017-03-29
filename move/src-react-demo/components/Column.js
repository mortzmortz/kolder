import React, { Component } from 'react';
import Figure from './Figure';

class Column extends Component {

  static get propTypes() {
    return {
      column: React.PropTypes.array.isRequired,
      columnWidth: React.PropTypes.number.isRequired,
      margin: React.PropTypes.number.isRequired,
      imgMargin: React.PropTypes.number.isRequired
    };
  }

  render() {
    const listStyles = {
      width: this.props.columnWidth,
      marginRight: this.props.margin
    };
    return (
      <div className="grid-column" style={listStyles}>
        {
          this.props.column.map((image, index) => {
            return (
              <Figure
                key={`fig-${index}`}
                url={image.url}
                width={image.width}
                height={image.height}
                webp={image.webp}
                imgMargin={this.props.imgMargin}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Column;
