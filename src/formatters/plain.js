import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  } if (value === null) {
    return 'null';
  } if (_.isObject(value)) {
    return '[complex value]';
  }
  return `${value}`;
};

const plain = (data, newName = '') => {
  const result = data.map((item) => {
    // const {
    //   name, type, value, value1, value2,
    // } = item;
    switch (item.type) {
      case 'added':
        return `Property '${newName}${item.name}' was added with value: ${getValue(item.value)}`;
      case 'deleted':
        return `Property '${newName}${item.name}' was removed`;
      case 'changed':
        return `Property '${newName}${item.name}' was updated. From ${getValue(item.value1)} to ${getValue(item.value2)}`;
      case 'unchanged':
        return '';
      case 'nested':
        return plain(item.value, `${newName}${item.name}.`);
      default:
        throw new Error(`${item.type} - is unknown active`);
    }
  });
  const filteredResult = result.filter((item) => item !== '');
  return `${filteredResult.join('\n')}`;
};

export default plain;
