import _ from 'lodash';

const getDepth = (depth) => {
  if (depth > 0) {
    return ' '.repeat(depth * 4 - 2);
  }
  return '';
};

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const items = entries.map(([key, value]) => `${getDepth(depth)}  ${key}: ${getValue(value, depth + 1)}`);
  const result = `{\n${items.join('\n')}\n${getDepth(depth - 1)}  }`;
  return result;
};

const stylish = (data, depth = 1) => {
  const result = data.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `${getDepth(depth)}  ${item.name}: ${getValue(item.value, depth + 1)}`;
      case 'added':
        return `${getDepth(depth)}+ ${item.name}: ${getValue(item.value, depth + 1)}`;
      case 'deleted':
        return `${getDepth(depth)}- ${item.name}: ${getValue(item.value, depth + 1)}`;
      case 'changed':
        return `${getDepth(depth)}- ${item.name}: ${getValue(item.value1, depth + 1)}\n${getDepth(depth)}+ ${item.name}: ${getValue(item.value2, depth + 1)}`;
      case 'nested':
        return `${getDepth(depth)}  ${item.name}: ${stylish(item.value, depth + 1)}`;
      default:
        throw new Error(`${item.type} - is unknown active`);
    }
  });
  return `{\n${result.join('\n')}\n${getDepth(depth - 1)}}`;
};

export default stylish;
