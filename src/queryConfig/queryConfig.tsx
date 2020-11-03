interface Operator {
    value: string;
    text: string;
}

export interface Row {
    label: string,
    operators: Array<Operator>;
    rhs: {
        type: "text" | "number" | "multi-select-list" | "multi-select-numbers-in-a-range";
        config?: string;
    }
}

export interface ConfigType {
    [key: string]: Row;
}

const queryConfig: ConfigType = {
    account: {
        label: "Account",
        operators: [
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs: { type: "multi-select-numbers-in-a-range", config: "range:1-1000" }
    },
    country: {
        label: "Country",
        operators: [
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs:{ type: "multi-select-list", config: "file:countries.json" }
    },
    campaign: {
        label: "Campaign",
        operators: [
            { value: "starts-with", text: "starts with" },
            { value: "contains", text: "contains" },
            { value: "not-contains", text: "not contains" }
        ],
        rhs: { type: "text" }
    },
    revenue: {
        label: "Revenue",
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
