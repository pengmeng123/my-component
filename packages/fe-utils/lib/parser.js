"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultParser = void 0;
const lodash_1 = __importDefault(require("lodash"));
const sourceToNumberRange = (source) => {
    if (lodash_1.default.isPlainObject(source)) {
        const { max, min } = source;
        return [min, max];
    }
    return [];
};
const numberRangeToSource = (value) => {
    if (!Array.isArray(value)) {
        return undefined;
    }
    const [min, max] = value.map((v) => (lodash_1.default.isNumber(v) ? v : undefined));
    if (lodash_1.default.isNil(min) && lodash_1.default.isNil(max)) {
        return undefined;
    }
    return { min, max };
};
exports.defaultParser = {
    "number-range": {
        toValue: sourceToNumberRange,
        toSource: numberRangeToSource,
    },
};
//# sourceMappingURL=parser.js.map