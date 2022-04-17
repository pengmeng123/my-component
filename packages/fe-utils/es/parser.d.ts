declare type NumberRangeSource = {
    max?: number;
    min?: number;
};
declare type NumberRangeValue = Array<number | undefined>;
export declare const defaultParser: {
    "number-range": {
        toValue: (source: NumberRangeSource) => NumberRangeValue;
        toSource: (value: NumberRangeValue) => NumberRangeSource | void;
    };
};
export {};
