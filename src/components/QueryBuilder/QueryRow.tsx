import React, { ReactNode } from 'react';
import { Row } from '../../queryConfig';
import Select, { ValueType } from 'react-select';
import StyledInput from '../StyledInput/StyledInput';

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
    onRhsChange: Function
}

type OptionType = {
    value: string;
    label: string;
};

export default function QueryRow({ lhs, rhs, operator, index, queryConfig, removeRow, lhsOptions, onLhsChange, onOperatorChange, onRhsChange }: Props) {
    const onRemoveClick = () => removeRow(index);

    const onNormalRhsChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        onRhsChange(index, evt.target.value);
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
            RhsElement = <input type="text" />
            break;
        case "multi-select-numbers":
            RhsElement = <input type="text" />
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
