// import fs from 'fs';
// import path from 'path';
import _ from 'lodash';
// import process from 'process';
import { getDataParsed } from './parsers.js';

// console.log(fs.readFileSync('./work_files/file1.json', 'utf-8'));

// const getData = (filePath) => fs.readFileSync(filePath, 'utf-8');
// const getDataParsed = (filePath) => JSON.parse(filePath);
const key = (data) => _.keys(data);
// const getFormattedFilePath =
// (filePath) => path.resolve(process.cwd(), './__fixtures__/', path.basename(filePath));

const genDiff = (filepath1, filepath2) => {
  // const formattedFilePath1 = getFormattedFilePath(filepath1);
  // const formattedFilePath2 = getFormattedFilePath(filepath2);
  // const data1 = getData(formattedFilePath1);
  // const data2 = getData(formattedFilePath2);
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const keys1 = key(dataParsed1);
  const keys2 = key(dataParsed2);
  const keys = _.union(keys1, keys2);
  let result = {};
  const resultKeys = keys.map((item) => {
    if (_.has(dataParsed1, item) && _.has(dataParsed2, item)) {
      if (dataParsed1[item] === dataParsed2[item]) {
        result = `  ${item}: ${dataParsed1[item]}`;
      } else {
        result = [`- ${item}: ${dataParsed1[item]}`, `+ ${item}: ${dataParsed2[item]}`];
      }
    }
    if (!_.has(dataParsed1, item)) {
      result = `+ ${item}: ${dataParsed2[item]}`;
    }
    if (!_.has(dataParsed2, item)) {
      result = `- ${item}: ${dataParsed1[item]}`;
    }

    return result;
  });
  const sortedResult = _.sortBy(resultKeys.flat(), [(symbol) => symbol[2]]);

  return `{\n${sortedResult.join('\n')}\n}`;
};

// export { genDiff, getData, getFormattedFilePath };
export default genDiff;
