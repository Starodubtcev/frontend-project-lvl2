import _ from 'lodash';

const getDepth = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const getValue = (data, depth = 0) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const entries = Object.entries(data);
  const items = entries.map(([key, value]) => `${getDepth(depth)}  ${key}: ${getValue(value, depth + 1)}`);
  const result = `{\n${items.join('\n')}\n${getDepth(depth - 1)}  }`;
  return result;
};

const stylish = (body) => {
  const iter = (data, depth) => data.map((item) => {
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
        return `${getDepth(depth)}  ${item.name}: {\n${iter(item.value, depth + 1).join('\n')}\n${getDepth(depth)}  }`;
      default:
        throw new Error(`${item.type} - is unknown active`);
    }
  });
  return `{\n${iter(body, 1).join('\n')}\n}`;
};

export default stylish;
