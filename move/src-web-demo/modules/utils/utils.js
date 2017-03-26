export const closest = (el, selector) => {
  let matchesFn = '';
  let elm = el;

  // find vendor prefix
  ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some((fn) => {
    if (typeof document.body[fn] === 'function') {
      matchesFn = fn;
      return true;
    }
    return false;
  });

  let parent;

  // traverse parents
  while (elm) {
    parent = el.parentElement;
    if (parent && parent[matchesFn](selector)) {
      return parent;
    }
    elm = parent;
  }

  return null;
};

export const noEmptyStringInArray = arr => arr.every(elm => elm !== '');

export const travelObject = (obj, path = []) => {
  let newObj = { ...obj };

  if (path.length > 1 && noEmptyStringInArray(path)) {
    newObj = path.reduce((str, key) => str[key], newObj);
  }
  return newObj;
};
