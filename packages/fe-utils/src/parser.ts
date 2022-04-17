import _ from "lodash";
type NumberRangeSource = { max?: number; min?: number };
type NumberRangeValue = Array<number | undefined>;

const sourceToNumberRange = (source: NumberRangeSource): NumberRangeValue => {
  if (_.isPlainObject(source)) {
    const { max, min } = source;
    return [min, max];
  }
  return [];
};
const numberRangeToSource = (
  value: NumberRangeValue
): NumberRangeSource | void => {
  if (!Array.isArray(value)) {
    return undefined;
  }
  const [min, max] = value.map((v) => (_.isNumber(v) ? v : undefined));
  if (_.isNil(min) && _.isNil(max)) {
    return undefined;
  }
  return { min, max };
};
export const defaultParser = {
  "number-range": {
    toValue: sourceToNumberRange,
    toSource: numberRangeToSource,
  },
};
