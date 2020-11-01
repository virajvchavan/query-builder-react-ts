import React, { ReactNode } from 'react';
import { Row } from '../../queryConfig/queryConfig';
import Select, { ValueType } from 'react-select';
import StyledInput from '../StyledInput/StyledInput';
import MultiValueInputSelector from '../MultiValueInputSelector/MultiValueInputSelector';

interface Props {
    lhs: string,
    operator: string,
    rhs?: string | Array<number> | Array<string>,
    index: number,
    removeRow: Function,
    queryConfig: Row,
    lhsOptions: Array<OptionType>,
    onLhsChange: Function,
    onOperatorChange: Function,
    onRhsChange: Function,
    onCustomSelectRhsChange: Function
}

type OptionType = {
    value: string;
    label: string;
};

type JsonType = {
    [key: string]: string
}

export default function QueryRow({ lhs, rhs, operator, index, queryConfig, removeRow, lhsOptions, onLhsChange, onOperatorChange, onRhsChange, onCustomSelectRhsChange }: Props) {
    const onRemoveClick = () => removeRow(index);

    const onNormalRhsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        onRhsChange(index, evt.target.value);
    }

    const onSelectRhsChange = (newElement: ValueType<OptionType>) => {
        onCustomSelectRhsChange(index, newElement)
    }

    const onMultiSelectNumbersRhsChange = (newRhs: Array<number>) => {
        onRhsChange(index, newRhs);
    }

    let lhsValue: OptionType = {
        label: queryConfig.label,
        value: lhs
    };

    let operatorOptions: Array<{ value: string, label: string }> = [];
    queryConfig.operators.forEach((operator, index) => {
        operatorOptions.push({ value: operator.value, label: operator.text });
    });

    let operatorValue: OptionType = {
        label: operatorOptions.find(item => item.value === operator)?.label || operator,
        value: operator
    }

    let RhsElement: ReactNode;
    let rules = queryConfig.rhs.config?.split(";");
    switch (queryConfig.rhs.type) {
        case "text":
            RhsElement = <StyledInput type="text" onChange={onNormalRhsChange} defaultValue={rhs?.toString() || ""} />
            break;
        case "number":
            let options: JsonType = {};
            rules?.forEach(rule => {
                let [ruleName, ruleValue] = rule.split(":");
                if (ruleName === "precision") {
                    options.step = ruleValue;
                }
            });
            RhsElement = <StyledInput type="number" onChange={onNormalRhsChange} options={options} defaultValue={rhs?.toString() || ""} />
            break;
        case "multi-select-list":
            let values: Array<OptionType> = [];
            let optionsList: Array<OptionType> = [];
            rules?.forEach(rule => {
                let [ruleName, ruleValue] = rule.split(":");
                if (ruleName === "file") {
                    let optionsJson: JsonType = require("../../queryConfig/" + ruleValue);
                    if (Array.isArray(rhs) && typeof rhs[0] === "string") {
                        rhs?.forEach((item: string | number) => {
                            values.push({label: optionsJson[item], value: item.toString()});
                        })
                    }
                    optionsList = Object.keys(optionsJson).map(key => { return {value: key, label: optionsJson[key] }});
                }
            });
            RhsElement = <Select options={optionsList} onChange={onSelectRhsChange} isMulti={true} defaultValue={values} />
            break;
        case "multi-select-numbers":
            let numberValues: Array<number> = [];
            if (Array.isArray(rhs) && typeof rhs[0] === "number") {
                rhs?.forEach((item: number | string) => numberValues.push(Number(item)));
            }
            RhsElement = <MultiValueInputSelector onChange={onMultiSelectNumbersRhsChange} defaultValues={numberValues} />
            break;
        default:
            break;
    }

    return <div className="row">
        <div className="lhs">
            <Select
                options={lhsOptions}
                onChange={(newValue: ValueType<OptionType>) => onLhsChange(index, newValue)}
                defaultValue={lhsOptions[0]} value={lhsValue}
            />
        </div>
        <div className="operator">
            <Select
                options={operatorOptions}
                onChange={(newValue: ValueType<OptionType>) => onOperatorChange(index, newValue)}
                value={operatorValue}
            />
        </div>
        <div className="rhs">
            {RhsElement}
        </div>
        <div className="btn removeBtn" onClick={onRemoveClick}>X</div>
    </div>;
}
