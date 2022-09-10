import _ from 'lodash';
import { getDataParsed } from './parsers.js';

const key = (data) => _.keys(data);

const resultKeys2 = (item, dataParsed1, dataParsed2) => {
  let result = {};
  if (_.has(dataParsed1, item) && _.has(dataParsed2, item)) {
    if (dataParsed1[item] === dataParsed2[item]) {
      result = `  ${item}: ${dataParsed1[item]}`;
    } else {
      // result = [`- ${item}: ${dataParsed1[item]}`, `+ ${item}: ${dataParsed2[item]}`];
      result = `- ${item}: ${dataParsed1[item]}\n+ ${item}: ${dataParsed2[item]}`;
    }
  }
  if (!_.has(dataParsed1, item)) {
    result = `+ ${item}: ${dataParsed2[item]}`;
  }
  if (!_.has(dataParsed2, item)) {
    result = `- ${item}: ${dataParsed1[item]}`;
  }
  //      return result;// убрать
  //    }
  return result;
};

const getIter = (dataParsedf1, dataParsedf2) => {
  const getIter2 = (dataParsed1, dataParsed2) => {
    const keys1 = key(dataParsed1);
    const keys2 = key(dataParsed2);
    const keys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(keys);
    //  let result = {};
    const resultKeys = sortedKeys.map((item) => {
    // isplainobject
      console.log(item);
      console.log(_.isObject(dataParsed1[item]));
      console.log(_.isObject(dataParsed2[item]));
      if (!_.isObject(dataParsed1[item]) && !_.isObject(dataParsed2[item])) {
        console.log(item);
        return resultKeys2(item, dataParsed1, dataParsed2);
      }
      const newDataParsed1 = dataParsed1[item];
      const newDataParsed2 = dataParsed2[item];
      return resultKeys2(item, newDataParsed1, newDataParsed2);
    });
    // return `{\n${resultKeys.flat().join('\n')}\n}`;
    return `{\n${resultKeys.join('\n')}\n}`;
  };
  return getIter2(dataParsedf1, dataParsedf2);
};

const genDiff = (filepath1, filepath2) => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  // console.log(dataParsed1);
  // console.log(dataParsed2);
  return getIter(dataParsed1, dataParsed2);
};

export default genDiff;
