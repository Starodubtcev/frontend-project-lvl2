// import _ from 'lodash';
import { getDataParsed } from './parsers.js';
import getIter from './findDiff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const formatName = getFormatter(formatType);
  const getDiff = getIter(dataParsed1, dataParsed2);
  return formatName(getDiff);
};

export default genDiff;
