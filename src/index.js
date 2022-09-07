import _ from 'lodash';
import { getDataParsed } from './parsers.js';

const key = (data) => _.keys(data);

const genDiff = (filepath1, filepath2) => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const keys1 = key(dataParsed1);
  const keys2 = key(dataParsed2);
  const keys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(keys);
  let result = {};
  const resultKeys = sortedKeys.map((item) => {
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
  return `{\n${resultKeys.flat().join('\n')}\n}`;
};

export default genDiff;
