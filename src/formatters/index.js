import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatter = (format) => {
  switch (format) {
    case 'stylish':
      return stylish;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`${format} - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.`);
  }
};

export default getFormatter;
