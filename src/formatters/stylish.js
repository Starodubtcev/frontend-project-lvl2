const stylish = (data) => {
  const result = data.map((item) => {
    const {
      name, value, value1, value2, type,
    } = item;
    switch (type) {
      case 'unchanged':
        return `  ${name}: ${value}`;
      case 'added':
        return `+ ${name}: ${value}`;
      case 'deleted':
        return `- ${name}: ${value}`;
      case 'changed':
        return `- ${name}: ${value1}\n+ ${name}: ${value2}`;
      default:
        throw new Error(`${type} - is unknown active`);
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export { stylish };
