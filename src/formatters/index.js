import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const getFormatedData = (data, format) => {
  switch (format) {
    case 'stylish':
      return stylish(data);
    case 'plain':
      return plain(data);
    case 'json':
      return json(data);
    default:
      throw new Error(`${format} - is unknown format, you can use only plain and stylish formats. Please launch gendiff -h to see all options.`);
  }
};

export default getFormatedData;
