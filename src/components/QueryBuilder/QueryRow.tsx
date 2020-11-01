import React, { ReactNode } from 'react';
import { Row } from '../../queryConfig/queryConfig';
import Select, { ValueType } from 'react-select';
import StyledInput from '../StyledInput/StyledInput';
import { JsonObjectExpression } from 'typescript';
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
        label: lhsOptions.find(item => item.value === lhs)?.label || lhs,
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
    switch (queryConfig.rhs.type) {
        case "text":
            RhsElement = <StyledInput type="text" onChange={onNormalRhsChange} />
            break;
        case "number":
            RhsElement = <StyledInput type="number" onChange={onNormalRhsChange} />
            break;
        case "multi-select-list":
            let optionsList: Array<OptionType> = [];
            let rules = queryConfig.rhs.config?.split(";");
            rules?.forEach(rule => {
                let [ruleName, ruleValue] = rule.split(":");
                if (ruleName === "file") {
                    let optionsJson: JsonType = require("../../queryConfig/" + ruleValue);
                    optionsList = Object.keys(optionsJson).map(key => { return {value: key, label: optionsJson[key] }});
                }
            });
            RhsElement = <Select options={optionsList} onChange={onSelectRhsChange} isMulti={true} />
            break;
        case "multi-select-numbers":
            RhsElement = <MultiValueInputSelector onChange={onMultiSelectNumbersRhsChange} />
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
