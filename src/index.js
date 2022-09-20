import { getDataParsed } from './parsers.js';
import findDifference from './findDiff.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatType = 'stylish') => {
  const dataParsed1 = getDataParsed(filepath1);
  const dataParsed2 = getDataParsed(filepath2);
  const formatName = getFormatter(formatType);
  const difference = findDifference(dataParsed1, dataParsed2);
  const differenceFormatted = formatName(difference);
  return differenceFormatted;
};

export default genDiff;
