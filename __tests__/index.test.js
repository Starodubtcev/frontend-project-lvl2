import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getReadedFile, getFormattedFilePath } from '../src/parsers.js';

const expectedData12 = getReadedFile(getFormattedFilePath('expectedData12.txt'), 'utf-8');
const expectedData13 = getReadedFile(getFormattedFilePath('expectedData13.txt'), 'utf-8');
const expectedData32 = getReadedFile(getFormattedFilePath('expectedData32.txt'), 'utf-8');

test('.json 1st level deep check', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedData12);
  expect(genDiff('file1.json', 'file3.json')).toEqual(expectedData13);
  expect(genDiff('file3.json', 'file2.json')).toEqual(expectedData32);
});

test('.yml 1st level deep check', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expectedData12);
  expect(genDiff('file1.yml', 'file3.yml')).toEqual(expectedData13);
  expect(genDiff('file3.yml', 'file2.yml')).toEqual(expectedData32);
});

test('.yaml 1st level deep check', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedData12);
  expect(genDiff('file1.yaml', 'file3.yaml')).toEqual(expectedData13);
  expect(genDiff('file3.yaml', 'file2.yaml')).toEqual(expectedData32);
});

test('incorrect format check', () => {
  expect(() => genDiff('file1.yaml', 'file2.ym')).toThrowError(new Error('Incorrect format, you can use only .json, .yml, .yaml formats'));
});
