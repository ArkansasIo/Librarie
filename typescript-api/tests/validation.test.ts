import assert from 'node:assert/strict';
import { positiveInt } from '../src/validation';
assert.equal(positiveInt(5,'count'),5);
console.log('library validation tests passed');
