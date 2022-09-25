import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFormattedFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getReadedFile = (obj) => fs.readFileSync(getFormattedFilePath(obj), 'utf-8');

const expectedData12 = getReadedFile(('__fixtures__/expectedData12.txt'), 'utf-8');
const expectedData45 = getReadedFile(('__fixtures__/expectedData45.txt'), 'utf-8');
const expectedDataPlain45 = getReadedFile(('__fixtures__/expectedDataPlain45.txt'), 'utf-8');
const expectedDataJSON45 = getReadedFile(('__fixtures__/expectedDataJSON45.txt'), 'utf-8');

test('.json 1st level deep test', () => {
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expectedData12);
});

test('.yml 1st level deep test', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expectedData12);
});

test('.yaml 1st level deep test', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(expectedData12);
});

test('.json nested levels deep test', () => {
  expect(genDiff('__fixtures__/file4.json', '__fixtures__/file5.json')).toEqual(expectedData45);
});

test('.json plain test', () => {
  expect(genDiff('__fixtures__/file4.json', '__fixtures__/file5.json', 'plain')).toEqual(expectedDataPlain45);
});

test('.yml plain test', () => {
  expect(genDiff('__fixtures__/file4.yml', '__fixtures__/file5.yml', 'plain')).toEqual(expectedDataPlain45);
});

test('.yaml plain test', () => {
  expect(genDiff('__fixtures__/file4.yaml', '__fixtures__/file5.yaml', 'plain')).toEqual(expectedDataPlain45);
});

test('incorrect style format test', () => {
  expect(() => genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml', 'anyFormat')).toThrowError(new Error('anyFormat - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.'));
});

test('.json JSON test', () => {
  expect(genDiff('__fixtures__/file4.json', '__fixtures__/file5.json', 'json')).toEqual(expectedDataJSON45);
});

test('.yml JSON test', () => {
  expect(genDiff('__fixtures__/file4.yml', '__fixtures__/file5.yml', 'json')).toEqual(expectedDataJSON45);
});

test('.yaml JSON test', () => {
  expect(genDiff('__fixtures__/file4.yaml', '__fixtures__/file5.yaml', 'json')).toEqual(expectedDataJSON45);
});
