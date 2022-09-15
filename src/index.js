import _ from 'lodash';
import { getDataParsed, getFormattedFilePath } from './parsers.js';
import { getIter } from './findDiff.js';
import { stylish } from './formatters/stylish.js';

// const key = (data) => _.keys(data);

// const resultKeys2 = (item, dataParsed1, dataParsed2) => {
//   let result = {};
//   if (_.has(dataParsed1, item) && _.has(dataParsed2, item)) {
//     if (dataParsed1[item] === dataParsed2[item]) {
//       result = `  ${item}: ${dataParsed1[item]}`;
//     } else {
//       result = `- ${item}: ${dataParsed1[item]}\n+ ${item}: ${dataParsed2[item]}`;
//     }
//   }
//   if (!_.has(dataParsed1, item)) {
//     result = `+ ${item}: ${dataParsed2[item]}`;
//   }
//   if (!_.has(dataParsed2, item)) {
//     result = `- ${item}: ${dataParsed1[item]}`;
//   }
//   return result;
// };

// const getIter = (dataParsedf1, dataParsedf2) => {
//   const getIter2 = (dataParsed1, dataParsed2) => {
//     const keys1 = key(dataParsed1);
//     const keys2 = key(dataParsed2);
//     const keys = _.union(keys1, keys2);
//     const sortedKeys = _.sortBy(keys);
//     const resultKeys = sortedKeys.map((item) => {
//       console.log(item);
//       console.log(_.isObject(dataParsed1[item]));
//       console.log(_.isObject(dataParsed2[item]));
//       if (!_.isObject(dataParsed1[item]) && !_.isObject(dataParsed2[item])) {
//         console.log(item);
//         return resultKeys2(item, dataParsed1, dataParsed2);
//       }
//       const newDataParsed1 = dataParsed1[item];
//       const newDataParsed2 = dataParsed2[item];
//       console.log(newDataParsed1);
//       console.log(newDataParsed2);
//       return getIter2(item, newDataParsed1, newDataParsed2);
//     });
//     return `{\n${resultKeys.join('\n')}\n}`;
//   };
//   return getIter2(dataParsedf1, dataParsedf2);
// };

const genDiff = (filepath1, filepath2) => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const getDiff = getIter(dataParsed1, dataParsed2);
  // console.log(getDiff);
  return stylish(getDiff);
};

export default genDiff;
