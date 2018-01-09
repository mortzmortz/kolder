import Lazer from './lazer';
import { travelObject } from './utils/utils';

const defaults = {
  horizontalMargin: 48,
  imageWidth: 300,
  imgMargin: 24,
};

export default class Grid {
  constructor(options) {
    this.options = { ...defaults, ...options };

    if (!this.options.images) {
      throw new Error(
        'option missing: Providing an url or object of images is a must to initialize the grid!',
      );
    }

    this.margin = this.options.horizontalMargin;
    this.imgWidth = this.options.imageWidth;
    this.imgMargin = this.options.imgMargin;
    this.outerWidth = this.imgWidth + this.imgMargin;
    this.type = typeof this.options.images;
    this.pathToImages = this.options.pathToImages.split('.');
    this.pathToSource = this.options.pathToSource.split('.');
    this.columns = 0;
    this.columnWidth = 0;
  }

  init(selector) {
    if (!selector) {
      throw new Error(
        'option missing: Providing a selector is a must to initialize the grid!',
      );
    }
    this.container = document.querySelector(selector);

    switch (this.type) {
      case 'string':
        this.getImages(this.options.images);
        break;
      case 'object':
        this.images = this.options.images;
        this.initGrid();
        break;
      default:
        throw new Error(
          'wrong type: Type must be an url (string) or an array of images (object)',
        );
    }
  }

  initGrid() {
    this.getColumns();
    this.bindResizeHandler();
  }

  getImages(url) {
    fetch(url)
      .then(blob => blob.json())
      .then(images => {
        this.images = travelObject(images, this.pathToImages);
        this.initGrid();
      })
      .catch(error => {
        console.error('Could not fetch the images.', error);
      });
  }

  getColumns() {
    /**
     * calculate the maximum columns we can set
     * based on grid margin and image settings (width and margin)
     */
    const maxW = window.innerWidth - this.margin;
    // avoid columns being zero
    const columns = Math.floor(maxW / this.outerWidth) || 1;
    // reset grid only if there is more/less space for one column
    if (this.columns !== columns) {
      this.setColumns(columns);
      this.setContainer(columns);
      this.columns = columns;
    }
  }

  setColumns(columns) {
    // handle mobile: 1 column
    this.columnWidth = columns === 1 ? this.imgWidth * 2 : this.imgWidth;
    let html = '';
    // clear grid
    while (this.container.firstChild)
      this.container.removeChild(this.container.firstChild);
    // build columns
    let i = 0;
    while (i < columns) {
      if (i < columns - 1) html += this.getColumnHTML(false);
      else html += this.getColumnHTML(true); // build last column
      i += 1;
    }
    // append new columns
    this.container.innerHTML = html;
    // put images in new columns
    this.distributeImages();
  }

  setContainer(columns) {
    // handle mobile: 1 column
    const w = columns === 1 ? this.outerWidth * 2 : this.outerWidth;
    const containerW =
      columns === 1 ? this.imgWidth * 2 : columns * w - this.imgMargin;
    // give container a fixed width
    this.container.style.width = `${containerW}px`;
  }

  bindResizeHandler() {
    window.addEventListener('resize', () => {
      clearTimeout(this.resized);
      this.resized = setTimeout(() => {
        this.getColumns();
      }, 0);
    });
  }

  distributeImages() {
    const targets = Array.from(this.container.querySelectorAll('li'));
    let listCount = 0;
    // distribute image elements to lists from left to right line by line
    this.images.forEach(image => {
      const html = this.getImageHTML(image);
      if (listCount < targets.length - 1) {
        targets[listCount].innerHTML += html;
        listCount += 1;
      } else {
        targets[listCount].innerHTML += html;
        listCount = 0;
      }
    });

    /**
     * TODO write new load plugin
     * with data-src, data-srcset or check if image is in cache or ...
     * https://medium.com/alistapart/how-to-build-simple-and-powerful-lazyload-javascript-plugin-34f9f02543c9#.gd4cmcrq2
     */
    // show image when loaded
    const lazyLoad = new Lazer({
      selector: this.container,
      parent: 'figure',
      time: 1000,
    });
    lazyLoad.init();
  }

  getColumnHTML(last) {
    const marginRight = last ? 0 : this.imgMargin;
    return `<li class="grid-column" style="width:${
      this.columnWidth
    }px;margin-right:${marginRight}px;"></li>`;
  }

  getImageHTML(image) {
    const source = travelObject(image, this.pathToSource);
    return `
      <figure style="margin-bottom:${this.imgMargin}px">
          <img src="${source}" width="${this.imgWidth}">
      </figure>`;
  }
}
