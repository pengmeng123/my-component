import _ from "lodash";
const sourceToNumberRange = (source) => {
    if (_.isPlainObject(source)) {
        const { max, min } = source;
        return [min, max];
    }
    return [];
};
const numberRangeToSource = (value) => {
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
//# sourceMappingURL=parser.js.map