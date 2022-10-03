import fs from 'fs';
import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

const getFormattedFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getReadedFile = (obj) => fs.readFileSync(getFormattedFilePath(obj), 'utf-8');
const getFilePath = (file) => `__fixtures__/${file}`;
const getExpectedData = (expectedFile) => getReadedFile(getFilePath(expectedFile), 'utf-8');

test.each([
  {
    file1: 'file1.json', file2: 'file2.json', format: 'stylish', expectedFile: 'expectedData12.txt',
  },
  {
    file1: 'file1.yaml', file2: 'file2.yaml', format: 'stylish', expectedFile: 'expectedData12.txt',
  },
  {
    file1: 'file1.yml', file2: 'file2.yml', format: 'stylish', expectedFile: 'expectedData12.txt',
  },
  {
    file1: 'file4.json', file2: 'file5.json', format: 'stylish', expectedFile: 'expectedData45.txt',
  },
  {
    file1: 'file4.yaml', file2: 'file5.yaml', format: 'stylish', expectedFile: 'expectedData45.txt',
  },
  {
    file1: 'file4.yml', file2: 'file5.yml', format: 'stylish', expectedFile: 'expectedData45.txt',
  },
  {
    file1: 'file4.json', file2: 'file5.json', format: 'plain', expectedFile: 'expectedDataPlain45.txt',
  },
  {
    file1: 'file4.yaml', file2: 'file5.yaml', format: 'plain', expectedFile: 'expectedDataPlain45.txt',
  },
  {
    file1: 'file4.yml', file2: 'file5.yml', format: 'plain', expectedFile: 'expectedDataPlain45.txt',
  },
  {
    file1: 'file4.json', file2: 'file5.json', format: 'json', expectedFile: 'expectedDataJSON45.txt',
  },
  {
    file1: 'file4.yaml', file2: 'file5.yaml', format: 'json', expectedFile: 'expectedDataJSON45.txt',
  },
  {
    file1: 'file4.yml', file2: 'file5.yml', format: 'json', expectedFile: 'expectedDataJSON45.txt',
  },
])('stylish, plain, json 1st level and nested test', ({
  file1, file2, format, expectedFile,
}) => {
  const filePath1 = getFilePath(file1);
  const filePath2 = getFilePath(file2);
  const expectedData = getExpectedData(expectedFile);
  expect(genDiff(filePath1, filePath2, format)).toEqual(expectedData);
});

test('incorrect style format test', () => {
  expect(() => genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yml', 'anyFormat')).toThrowError(new Error('anyFormat - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.'));
});
