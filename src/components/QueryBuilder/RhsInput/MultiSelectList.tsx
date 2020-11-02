import React from 'react';
import Select, { ValueType } from 'react-select';
import { OptionType, JsonType } from '../QueryRow';
import { rulesType } from './RhsInput';

interface MultiSelectListProps {
    rules: rulesType;
    rhs: Array<string>;
    onSelectRhsChange: (newElement: ValueType<OptionType>) => void;
}

export default function MultiSelectList({ rules, rhs, onSelectRhsChange }: MultiSelectListProps) {
    let values: Array<OptionType> = [];
    let optionsList: Array<OptionType> = [];
    rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "file") {
            let optionsJson: JsonType = require("../../../queryConfig/" + ruleValue);
            if (Array.isArray(rhs) && typeof rhs[0] === "string") {
                rhs?.forEach((item: string | number) => {
                    values.push({ label: optionsJson[item], value: item.toString() });
                });
            }
            optionsList = Object.keys(optionsJson).map(key => { return { value: key, label: optionsJson[key] }; });
        }
    });

    return <Select options={optionsList} onChange={onSelectRhsChange} isMulti={true} defaultValue={values} />;
}
