import path from 'path';
import fs from 'fs';
import process from 'process';
import getDataParsed from './parsers.js';
import findDifference from './findDiff.js';
import getFormatedData from './formatters/index.js';

const getExtName = (filePath) => path.extname(filePath);
const getFormattedFilePath = (filePath) => path.resolve(process.cwd(), filePath);
const getReadedFile = (obj) => fs.readFileSync(getFormattedFilePath(obj), 'utf-8');

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const readedFile1 = getReadedFile(filepath1);
  const readedFile2 = getReadedFile(filepath2);
  const dataParsed1 = getDataParsed(readedFile1, getExtName(filepath1));
  const dataParsed2 = getDataParsed(readedFile2, getExtName(filepath2));
  const difference = findDifference(dataParsed1, dataParsed2);
  const differenceFormatted = getFormatedData(difference, formatType);
  return differenceFormatted;
};

export default genDiff;
