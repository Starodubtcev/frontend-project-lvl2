import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';

const getExtName = (filePath) => path.extname(filePath);
const getFormattedFilePath = (filePath) => path.resolve(process.cwd(), './__fixtures__/', path.basename(filePath));
const getReadedFile = (obj) => fs.readFileSync(getFormattedFilePath(obj), 'utf-8');
const getDataParsed = (filePath) => {
  let result = '';
  if (getExtName(getFormattedFilePath(filePath)) === '.json') {
    result = JSON.parse(getReadedFile(filePath));
  } else if (getExtName(getFormattedFilePath(filePath)) === '.yml' || getExtName(getFormattedFilePath(filePath)) === '.yaml') {
    result = yaml.load(getReadedFile(filePath));
  } else {
    throw new Error('Incorrect format, you can use only .json, .yml, .yaml formats');
  }
  return result;
};

export { getDataParsed, getReadedFile, getFormattedFilePath };
