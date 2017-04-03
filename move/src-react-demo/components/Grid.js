import React, { Component } from 'react';
import Column from './Column';

class Grid extends Component {

  static get propTypes() {
    return {
      margin: React.PropTypes.number,
      imgWidth: React.PropTypes.number,
      imgMargin: React.PropTypes.number,
      url: React.PropTypes.string.isRequired
    };
  }

  static get defaultProps() {
    return {
      margin: 48,
      imgWidth: 300,
      imgMargin: 24,
    };
  }

  constructor() {
    super();
    this.images = [];
    this.outerWidth = 0;
    this.columnCount = 0;
    this.columnWidth = 0;
    this.style = {
      display: 'flex',
      maxWidth: '100%',
      margin: '0 auto',
      padding: 0,
      paddingTop: '80px',
      listStyle: 'none'
    };
  }

  state = {
    columns: [],
    containerWidth: 0
  };

  componentDidMount() {
    this.outerWidth = this.props.imgWidth + this.props.imgMargin;
    fetch(this.props.url)
      .then(blob => blob.json())
      .then((data) => {
        const images = data.data;
        this.images = images;
        this.setColumns();
        window.addEventListener('resize', this.setColumns);
      });
  }

  setColumns = () => {
    /**
    * calculate the maximum columns we can set
    * based on grid margin and image settings (width and margin)
    */
    const maxW = window.innerWidth - this.props.margin;
    // avoid columns being zero
    const newColumns = Math.floor(maxW / this.outerWidth) || 1;
    if (this.columnCount !== newColumns) {
      this.columnCount = newColumns;
      this.columnWidth = newColumns === 1 ? this.props.imgWidth * 2 : this.props.imgWidth;
      // handle mobile: 1 column
      const w = newColumns === 1 ? this.outerWidth * 2 : this.outerWidth;
      const newContainerWidth = newColumns === 1 ? this.props.imgWidth * 2 : (newColumns * w) - this.props.imgMargin;
      this.setState({
        containerWidth: newContainerWidth
      });

      this.state.columns = [];
      this.updateImageArr();
    }
  }

  updateImageArr = () => {
    const newColArr = [...this.state.columns];

    let i = this.columnCount;

    while (i !== 0) {
      const emptyArr = [];
      newColArr.push(emptyArr);
      i -= 1;
    }

    this.images.forEach((image, j) => {
      const target = image.images.original;
      const imageObj = {
        url: target.url,
        webp: target.webp,
        width: target.width,
        height: target.height,
      };
      const columnIndex = j % this.columnCount;
      newColArr[columnIndex].push(imageObj);
    });

    this.setState({
      columns: newColArr
    });
  }

  render() {
    const containerStyle = {
      ...this.style,
      width: this.state.containerWidth
    };
    return (
      <div style={containerStyle}>
        {
          this.state.columns.map((column, index) => {
            const margin = index !== (this.columnCount - 1) ? this.props.imgMargin : 0;
            return (
              <Column
                key={`col-${index}`}
                column={column}
                columnWidth={this.columnWidth}
                margin={margin}
                imgMargin={this.props.imgMargin}
              />
            );
          })
        }
      </div>
    );
  }
}

export default Grid;
