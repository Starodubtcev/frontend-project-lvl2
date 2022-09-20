import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';

const getExtName = (filePath) => path.extname(filePath);
const getFormattedFilePath = (filePath) => path.resolve(process.cwd(), './__fixtures__/', path.basename(filePath));
const getReadedFile = (obj) => fs.readFileSync(getFormattedFilePath(obj), 'utf-8');
const getDataParsed = (filePath) => {
  if (getExtName(getFormattedFilePath(filePath)) === '.json') {
    return JSON.parse(getReadedFile(filePath));
  }
  if (getExtName(getFormattedFilePath(filePath)) === '.yml' || getExtName(getFormattedFilePath(filePath)) === '.yaml') {
    return yaml.load(getReadedFile(filePath));
  }
  throw new Error('Incorrect file format, you can use only .json, .yml, .yaml formats');
};

export { getDataParsed, getReadedFile, getFormattedFilePath };
