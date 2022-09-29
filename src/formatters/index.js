import getStylishFormat from './stylish.js';
import getPlainFormat from './plain.js';
import getJsonFormat from './json.js';

const getFormatedData = (data, format) => {
  switch (format) {
    case 'stylish':
      return getStylishFormat(data);
    case 'plain':
      return getPlainFormat(data);
    case 'json':
      return getJsonFormat(data);
    default:
      throw new Error(`${format} - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.`);
  }
};

export default getFormatedData;
