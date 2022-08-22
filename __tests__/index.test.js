import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const expectedData12 = '{\n- follow: false\n  host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n+ timeout: 20\n+ verbose: true\n}';
const expectedData13 = '{\n- follow: false\n- host: hexlet.io\n- proxy: 123.234.53.22\n- timeout: 50\n}';
const expectedData32 = '{\n+ host: hexlet.io\n+ timeout: 20\n+ verbose: true\n}';

// test('empty check', () => {
//   expect(genDiff('', '')).toEqual('');
// });

test('.json 1st level deep check', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedData12);
  expect(genDiff('file1.json', 'file3.json')).toEqual(expectedData13);
  expect(genDiff('file3.json', 'file2.json')).toEqual(expectedData32);
});
