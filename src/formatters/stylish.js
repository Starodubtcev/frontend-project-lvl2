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
        console.log(`name ${name}`);
        console.log(`value ${value}`);
        console.log(`value1 ${value1}`);
        console.log(`value2 ${value2}`);
        console.log(`type ${type}`);
        throw new Error(`${type} - is unknown active`);
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export { stylish };
