import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import { getReadedFile, getFormattedFilePath } from '../src/parsers.js';

const expectedData12 = getReadedFile(getFormattedFilePath('expectedData12.txt'), 'utf-8');
const expectedData45 = getReadedFile(getFormattedFilePath('expectedData45.txt'), 'utf-8');
const expectedDataPlain45 = getReadedFile(getFormattedFilePath('expectedDataPlain45.txt'), 'utf-8');
const expectedDataJSON45 = getReadedFile(getFormattedFilePath('expectedDataJSON45.txt'), 'utf-8');

test('.json 1st level deep test', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual(expectedData12);
});

test('.yml 1st level deep test', () => {
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expectedData12);
});

test('.yaml 1st level deep test', () => {
  expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedData12);
});

test('incorrect file format test', () => {
  expect(() => genDiff('file1.yaml', 'file2.ym')).toThrowError(new Error('Incorrect file format, you can use only .json, .yml, .yaml formats'));
});

test('.json nested levels deep test', () => {
  expect(genDiff('file4.json', 'file5.json')).toEqual(expectedData45);
});

test('.json plain test', () => {
  expect(genDiff('file4.json', 'file5.json', 'plain')).toEqual(expectedDataPlain45);
});

test('.yml plain test', () => {
  expect(genDiff('file4.yml', 'file5.yml', 'plain')).toEqual(expectedDataPlain45);
});

test('.yaml plain test', () => {
  expect(genDiff('file4.yaml', 'file5.yaml', 'plain')).toEqual(expectedDataPlain45);
});

test('incorrect style format test', () => {
  expect(() => genDiff('file1.yaml', 'file2.yml', 'anyFormat')).toThrowError(new Error('anyFormat - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.'));
});

test('.json JSON test', () => {
  expect(genDiff('file4.json', 'file5.json', 'json')).toEqual(expectedDataJSON45);
});

test('.yml JSON test', () => {
  expect(genDiff('file4.yml', 'file5.yml', 'json')).toEqual(expectedDataJSON45);
});

test('.yaml JSON test', () => {
  expect(genDiff('file4.yaml', 'file5.yaml', 'json')).toEqual(expectedDataJSON45);
});
