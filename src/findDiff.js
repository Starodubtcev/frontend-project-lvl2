import _ from 'lodash';

const key = (data) => _.keys(data);

// const makeTree = (obj, item) => {
//   console.log(obj);
//   console.log(item);
//   const newValue = obj[item];
//   console.log(newValue);
//   if (!_.isObject(obj[item])) {
//     return {
//       name: item,
//       value: obj[item],
//       // type: 'added',
//     };
//   }
//   console.log('- - - - - -');
//   return makeTree(obj[item], 'foo');
// };

const getIter = (dataParsedf1, dataParsedf2) => {
  const getIter2 = (dataParsed1, dataParsed2) => {
    const keys1 = key(dataParsed1);
    const keys2 = key(dataParsed2);
    const keys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(keys);
    const resultKeys = sortedKeys.map((item) => {
      let result = {};
      // console.log(_.isObject(dataParsed1[item]));
      if (_.isObject(dataParsed1[item]) && _.isObject(dataParsed2[item])) {
        // console.log('nested');
        // console.log(dataParsed1[item]);
        // console.log(dataParsed2[item]);
        result = {
          name: item,
          value: getIter2(dataParsed1[item], dataParsed2[item]),
          type: 'nested',
        };
      }
      if (_.has(dataParsed1, item) && _.has(dataParsed2, item)) {
        if (dataParsed1[item] === dataParsed2[item]) {
          // result = { ...makeTree(dataParsed1, item), type: 'unchanged' };
          result = {
            name: item,
            value: dataParsed1[item],
            type: 'unchanged',
          };
        } else {
          result = {
            name: item,
            value1: dataParsed1[item],
            value2: dataParsed2[item],
            type: 'changed',
          };
        }
      }
      if (!_.has(dataParsed1, item)) {
        // console.log(dataParsed1[item])
        // result = { ...makeTree(dataParsed2, item), type: 'added' };
        result = {
          name: item,
          value: dataParsed2[item],
          type: 'added',
        };
      }
      if (!_.has(dataParsed2, item)) {
        // result = { ...makeTree(dataParsed1, item), type: 'deleted' };
        result = {
          name: item,
          value: dataParsed1[item],
          type: 'deleted',
        };
      }
      return result;
    });
    return resultKeys;
  };
  // console.log(getIter2(dataParsedf1, dataParsedf2));
  return getIter2(dataParsedf1, dataParsedf2);
};

export { getIter };
