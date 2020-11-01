import React from 'react';
import { Row } from '../../queryConfig/queryConfig';
import Select, { ValueType } from 'react-select';
import StyledInput from '../StyledInput';
import MultiValueInputSelector from '../MultiValueInputSelector';
import { OptionType, JsonType } from './QueryRow';

type rulesType = string[] | undefined;
type rhsType = string | number[] | string[] | undefined;

interface Props {
    rhs: rhsType,
    queryConfig: Row,
    onNormalRhsChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
    onSelectRhsChange: (newElement: ValueType<OptionType>) => void,
    onMultiSelectNumbersRhsChange: (newRhs: Array<number>) => void
}

export default function RhsInput({rhs, queryConfig, onMultiSelectNumbersRhsChange, onNormalRhsChange, onSelectRhsChange}: Props) {
    let rules = queryConfig.rhs.config?.split(";");
    switch (queryConfig.rhs.type) {
        case "text":
            let stringValue = rhs as string;
            return <StyledInput type="text" onChange={onNormalRhsChange} defaultValue={stringValue} />;
        case "number":
            let value = rhs as string;
            return <NumberInput rules={rules} rhs={value} onNormalRhsChange={onNormalRhsChange} />
        case "multi-select-list":
            let stringArrValue = rhs as Array<string>;
            return <MultiSelectList rhs={stringArrValue} rules={rules} onSelectRhsChange={onSelectRhsChange} />
        case "multi-select-numbers":
            let numbersArrayValue = rhs as Array<number>;
            return <MultiValueInputSelector onChange={onMultiSelectNumbersRhsChange} defaultValues={numbersArrayValue} />;
        default:
            return null;
    }
}

interface MultiSelectListProps {
    rules: rulesType,
    rhs: Array<string>,
    onSelectRhsChange: (newElement: ValueType<OptionType>) => void
}

function MultiSelectList({rules, rhs, onSelectRhsChange}: MultiSelectListProps) {
    let values: Array<OptionType> = [];
    let optionsList: Array<OptionType> = [];
    rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "file") {
            let optionsJson: JsonType = require("../../queryConfig/" + ruleValue);
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

interface NumberInputProps {
    rules: rulesType,
    onNormalRhsChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
    rhs: string
}

function NumberInput({rules, rhs, onNormalRhsChange}: NumberInputProps) {
    let options: JsonType = {};
    rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "precision") {
            options.step = ruleValue;
        }
    });
    return <StyledInput type="number" onChange={onNormalRhsChange} options={options} defaultValue={rhs} />;
}
