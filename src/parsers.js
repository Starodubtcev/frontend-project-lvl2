import yaml from 'js-yaml';

const getDataParsed = (filePath, fileType) => {
  if (fileType === 'json') {
    return JSON.parse(filePath);
  }
  if (fileType === 'yml' || fileType === 'yaml') {
    return yaml.load(filePath);
  }
  throw new Error('Incorrect file format, you can use only .json, .yml, .yaml formats');
};

export default getDataParsed;
