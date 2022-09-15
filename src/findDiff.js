import _ from 'lodash';

const key = (data) => _.keys(data);

const getIter = (dataParsedf1, dataParsedf2) => {
  const getIter2 = (dataParsed1, dataParsed2) => {
    const keys1 = key(dataParsed1);
    const keys2 = key(dataParsed2);
    const keys = _.union(keys1, keys2);
    const sortedKeys = _.sortBy(keys);
    const resultKeys = sortedKeys.map((item) => {
      if (_.isObject(dataParsed1[item]) && _.isObject(dataParsed2[item])) {
        return {
          name: item,
          value: getIter2(dataParsed1[item], dataParsed2[item]),
          type: 'nested',
        };
      }
      // if (_.has(dataParsed1, item) && _.has(dataParsed2, item)) {
      // if (dataParsed1[item] === dataParsed2[item]) {
      if (!_.isEqual(dataParsed1[item], dataParsed2[item])
      && _.has(dataParsed1, item) && _.has(dataParsed2, item)) {
        return {
          name: item,
          // value: dataParsed1[item],
          value1: dataParsed1[item],
          value2: dataParsed2[item],
          // type: 'unchanged',
          type: 'changed',
        };
        // }
        // else {
        //   result = {
        //     name: item,
        //     value1: dataParsed1[item],
        //     value2: dataParsed2[item],
        //     type: 'changed',
        //   };
        // }
      }
      if (!_.has(dataParsed1, item)) {
        return {
          name: item,
          value: dataParsed2[item],
          type: 'added',
        };
      }
      if (!_.has(dataParsed2, item)) {
        return {
          name: item,
          value: dataParsed1[item],
          type: 'deleted',
        };
      }
      return {
        name: item,
        value: dataParsed1[item],
        type: 'unchanged',
      };
    });
    return resultKeys;
  };
  return getIter2(dataParsedf1, dataParsedf2);
};

export default getIter;
