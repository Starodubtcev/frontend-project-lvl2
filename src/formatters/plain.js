import _ from 'lodash';

const getStringifyValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return 'null';
  } if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const getPlainFormat = (data, itemPath = '') => {
  const result = data.map((item) => {
    switch (item.type) {
      case 'added':
        return `Property '${itemPath}${item.name}' was added with value: ${getStringifyValue(item.value)}`;
      case 'deleted':
        return `Property '${itemPath}${item.name}' was removed`;
      case 'changed':
        return `Property '${itemPath}${item.name}' was updated. From ${getStringifyValue(item.value1)} to ${getStringifyValue(item.value2)}`;
      case 'unchanged':
        return '';
      case 'nested':
        return getPlainFormat(item.value, `${itemPath}${item.name}.`);
      default:
        throw new Error(`${item.type} - is unknown active`);
    }
  });
  const filteredResult = result.filter((item) => item !== '');
  return `${filteredResult.join('\n')}`;
};

export default getPlainFormat;
