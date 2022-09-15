import _ from 'lodash';

const getDepth = (depth) => {
  const blank = ' ';
  return blank.repeat(depth * 2);
};

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const items = entries.map(([key, value]) => `${getDepth(depth + 1)}  ${key}: ${getValue(value, depth + 2)}`);

  const body = `{\n${items.join('\n')}\n${getDepth(depth)}}`;
  return body;
};

const stylish = (data, depth = 0) => {
  const result = data.map((item) => {
    const {
      name, value, value1, value2, type,
    } = item;
    switch (type) {
      case 'unchanged':
        return `${getDepth(depth + 1)}  ${name}: ${getValue(value, depth + 2)}`;
      case 'added':
        return `${getDepth(depth + 1)}+ ${name}: ${getValue(value, depth + 2)}`;
      case 'deleted':
        return `${getDepth(depth + 1)}- ${name}: ${getValue(value, depth + 2)}`;
      case 'changed':
        return `${getDepth(depth + 1)}- ${name}: ${getValue(value1, depth + 2)}\n${getDepth(depth + 1)}+ ${name}: ${getValue(value2, depth + 2)}`;
      case 'nested':
        return `${getDepth(depth + 1)}  ${name}: ${stylish(value, depth + 2)}`;
      default:
        // console.log(name);
        // console.log(type);
        throw new Error(`${type} - is unknown active`);
        // return `${getDepth(depth + 1)}  ${name}: ${stylish(value, depth + 2)}`;
    }
  });
  return `{\n${result.join('\n')}\n${getDepth(depth)}}`;
};

export default stylish;
