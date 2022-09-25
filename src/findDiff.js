import _ from 'lodash';

const getOneLevelDiff = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(keys);
  const difference = sortedKeys.map((item) => {
    if (_.isPlainObject(data1[item]) && _.isPlainObject(data2[item])) {
      return { name: item, value: getOneLevelDiff(data1[item], data2[item]), type: 'nested' };
    } if (!_.isEqual(data1[item], data2[item])
    && _.has(data1, item) && _.has(data2, item)) {
      return {
        name: item, value1: data1[item], value2: data2[item], type: 'changed',
      };
    } if (!_.has(data1, item)) {
      return { name: item, value: data2[item], type: 'added' };
    } if (!_.has(data2, item)) {
      return { name: item, value: data1[item], type: 'deleted' };
    }
    return { name: item, value: data1[item], type: 'unchanged' };
  });
  return difference;
};

const findDifference = (dataParsed1, dataParsed2) => getOneLevelDiff(dataParsed1, dataParsed2);

export default findDifference;
