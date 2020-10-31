interface Operator {
    value: string;
    text: string;
}

export interface Row {
    operators: Array<Operator>;
    rhs: {
        type: string;
        config?: string;
    }
}
export interface ConfigType {
    [key: string]: Row;
}

const queryConfig: ConfigType = {
    account: {
        operators: [
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs: { type: "multi-select-numbers", config: "range:1-1000" }
    },
    country: {
        operators: [
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs:{ type: "multi-select-list", config: "file:countries.json" }
    },
    campaign: {
        operators: [
            { value: "starts-with", text: "starts with" },
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs: { type: "text" }
    },
    revenue: {
        operators: [
            { value: ">", text: "is greater than" },
            { value: "<", text: "is less than" },
            { value: "<=", text: "is greater than or equal to" },
            { value: ">=", text: "is less than or equal to" },
            { value: "=", text: "equals" },
            { value: "!=", text: "not equals" }
        ],
        rhs: { type: "number", config: "precision:0.01" }
    }
};

export default queryConfig;
