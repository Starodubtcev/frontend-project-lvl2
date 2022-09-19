import { test, expect } from '@jest/globals';
// import plain from '../src/formatters/plain.js';
import genDiff from '../src/index.js';
import { getReadedFile, getFormattedFilePath } from '../src/parsers.js';

const expectedData12 = getReadedFile(getFormattedFilePath('expectedData12.txt'), 'utf-8');
const expectedData13 = getReadedFile(getFormattedFilePath('expectedData13.txt'), 'utf-8');
const expectedData32 = getReadedFile(getFormattedFilePath('expectedData32.txt'), 'utf-8');
const expectedData45 = getReadedFile(getFormattedFilePath('expectedData45.txt'), 'utf-8');
const expectedDataPlain45 = getReadedFile(getFormattedFilePath('expectedDataPlain45.txt'), 'utf-8');

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

test('incorrect file format check', () => {
  expect(() => genDiff('file1.yaml', 'file2.ym')).toThrowError(new Error('Incorrect file format, you can use only .json, .yml, .yaml formats'));
});

test('.json nested levels deep check', () => {
  expect(genDiff('file4.json', 'file5.json')).toEqual(expectedData45);
});

test('.json plain check', () => {
  expect(genDiff('file4.json', 'file5.json', 'plain')).toEqual(expectedDataPlain45);
});

test('.yml plain check', () => {
  expect(genDiff('file4.yml', 'file5.yml', 'plain')).toEqual(expectedDataPlain45);
});

test('.yaml plain check', () => {
  expect(genDiff('file4.yaml', 'file5.yaml', 'plain')).toEqual(expectedDataPlain45);
});

test('incorrect style format check', () => {
  expect(() => genDiff('file1.yaml', 'file2.yml', 'anyFormat')).toThrowError(new Error('anyFormat - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.'));
});
