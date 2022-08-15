import fs from 'fs';
// import path from 'path';
import _ from 'lodash';
// import process from 'process';

// console.log(fs.readFileSync('./work_files/file1.json', 'utf-8'));

const getData = (filepath) => fs.readFileSync(filepath, 'utf-8');
const getDataParsed = (filepath) => JSON.parse(filepath);
const key = (data) => _.keys(data);

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const dataParsed1 = getDataParsed(data1);
  const dataParsed2 = getDataParsed(data2);
  const keys1 = key(dataParsed1);
  const keys2 = key(dataParsed2);
  const keys = _.union(keys1, keys2);
  let result = {};
  const resultKeys = keys.map((key) => {
    if (_.has(dataParsed1, key) && _.has(dataParsed2, key)) {
      if (dataParsed1[key] === dataParsed2[key]) {
        result = `  ${key}: ${dataParsed1[key]}`;
      } else {
        result = [`- ${key}: ${dataParsed1[key]}`, `+ ${key}: ${dataParsed2[key]}`];
      }
    }
    if (!_.has(dataParsed1, key)) {
      result = `+ ${key}: ${dataParsed2[key]}`;
    }
    if (!_.has(dataParsed2, key)) {
      result = `- ${key}: ${dataParsed1[key]}`;
    }

    return result;
  });
  const sortedResult = _.sortBy(resultKeys.flat(), [(symbol) => symbol[2]]);

  return `{\n${sortedResult.join('\n')}\n}`;
};

export default genDiff;
