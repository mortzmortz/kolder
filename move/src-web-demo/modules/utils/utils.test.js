/**
 * Start writing more unit test with Jest
 * https://facebook.github.io/jest/
 */

import { travelObject } from './utils';

it('travels object', () => {
  const obj = {
    images: {
      original: {
        url: 'you got me',
      },
    },
  };
  const path = ['images', 'original', 'url'];
  const result = travelObject(obj, path);
  expect(result).toBe('you got me');
});
