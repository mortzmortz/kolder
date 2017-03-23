import { closest } from './utils/utils';

const defaults = {
  target: 'img',
  parent: 'div',
  classToAdd: 'loaded',
  time: 1000,
};

export default class Lazer {
  constructor(options) {
    this.options = { ...defaults, ...options };
  }

  init() {
    this.container = this.options.selector;
    this.targets = Array.from(this.container.querySelectorAll(this.options.target));
    this.parent = this.options.parent;
    this.classToAdd = this.options.classToAdd;
    this.time = this.options.time;
    this.addClassOnLoad();
  }

  addClassOnLoad() {
    const parent = this.parent;
    const classToAdd = this.classToAdd;
    const time = this.time;

    this.targets.forEach((target) => {
      target.addEventListener('load', () => {
        const parentElm = closest(target, parent);
        setTimeout(() => {
          parentElm.classList.add(classToAdd);
        }, time);
      });
    });
  }
}
