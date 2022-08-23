import { test, expect } from '@jest/globals';
import { genDiff, getData, getFormattedFilePath } from '../src/index.js';

const expectedData12 = getData(getFormattedFilePath('expectedData12.txt'), 'utf-8');
const expectedData13 = getData(getFormattedFilePath('expectedData13.txt'), 'utf-8');
const expectedData32 = getData(getFormattedFilePath('expectedData32.txt'), 'utf-8');

test('.json 1st level deep check', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedData12);
  expect(genDiff('file1.json', 'file3.json')).toEqual(expectedData13);
  expect(genDiff('file3.json', 'file2.json')).toEqual(expectedData32);
});
