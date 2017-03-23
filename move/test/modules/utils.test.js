import test from 'ava';
<%_ if (webDemo) { -%>
import { travelObject } from '../../src/javascripts/modules/utils/utils';

test('travel object', async (t) => {
  const obj = {
    images: {
      original: {
        url: 'you got me'
      }
    }
  };
  const path = ['images', 'original', 'url'];
  const result = Promise.resolve(travelObject(obj, path));
  t.is(await result, 'you got me');
});
<%_ } else { -%>

/**
 * Start writing your unit test with AVA
 * https://github.com/avajs/ava
 */
<%_ } -%>
