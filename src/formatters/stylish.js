import _ from 'lodash';

const getDepth = (depth) => ' '.repeat(depth * 2);

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const items = entries.map(([key, value]) => `${getDepth(depth + 1)}  ${key}: ${getValue(value, depth + 2)}`);
  const result = `{\n${items.join('\n')}\n${getDepth(depth)}}`;
  return result;
};

const stylish = (data, depth = 0) => {
  const result = data.map((item) => {
    switch (item.type) {
      case 'unchanged':
        return `${getDepth(depth + 1)}  ${item.name}: ${getValue(item.value, depth + 2)}`;
      case 'added':
        return `${getDepth(depth + 1)}+ ${item.name}: ${getValue(item.value, depth + 2)}`;
      case 'deleted':
        return `${getDepth(depth + 1)}- ${item.name}: ${getValue(item.value, depth + 2)}`;
      case 'changed':
        return `${getDepth(depth + 1)}- ${item.name}: ${getValue(item.value1, depth + 2)}\n${getDepth(depth + 1)}+ ${item.name}: ${getValue(item.value2, depth + 2)}`;
      case 'nested':
        return `${getDepth(depth + 1)}  ${item.name}: ${stylish(item.value, depth + 2)}`;
      default:
        throw new Error(`${item.type} - is unknown active`);
    }
  });
  return `{\n${result.join('\n')}\n${getDepth(depth)}}`;
};

export default stylish;
