import yaml from 'js-yaml';

const getDataParsed = (filePath, extension) => {
  if (extension === '.json') {
    return JSON.parse(filePath);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(filePath);
  }
  throw new Error('Incorrect file format, you can use only .json, .yml, .yaml formats');
};

export default getDataParsed;
