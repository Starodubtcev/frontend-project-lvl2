import _ from 'lodash';

const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (data, newName = '') => {
  const result = data.map((item) => {
    const {
      name, value, value1, value2, type,
    } = item;
    switch (type) {
      case 'added':
        return `Property '${newName}${name}' was added with value: ${getValue(value)}`;
      case 'deleted':
        return `Property '${newName}${name}' was removed`;
      case 'changed':
        return `Property '${newName}${name}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;
      case 'unchanged':
        return '';
      case 'nested':
        return plain(value, `${newName}${name}.`);
      default:
        // console.log(name);
        // console.log(type);
        throw new Error(`${type} - is unknown active`);
    }
  });
  const filteredResult = result.filter((item) => item !== '');
  return `${filteredResult.join('\n')}`;
};

export default plain;
