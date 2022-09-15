// import _ from 'lodash';
import { getDataParsed } from './parsers.js';
import getIter from './findDiff.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2) => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const getDiff = getIter(dataParsed1, dataParsed2);
  // console.log(getDiff);
  return stylish(getDiff);
};

export default genDiff;
