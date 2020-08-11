/**
 * @fileoverview Tests for rule utils
 * @author Abdulrahman (Abdu) Assabri
 */

const assert = require('assert');
const { isOptionConfigured } = require('../../lib/utils');

describe('Utils', function () {
  describe('isOptionConfigured', function () {
    it('should return true', function () {
      assert.equal(isOptionConfigured({ key: 0 }, 'key'), true);
    });

    it('should be falsy', function () {
      assert.notEqual(isOptionConfigured(), true);
      assert.notEqual(isOptionConfigured({ key: 0 }), true);
      assert.notEqual(isOptionConfigured({ key: 0 }, 'notTheKey'), true);
    });
  });
});
