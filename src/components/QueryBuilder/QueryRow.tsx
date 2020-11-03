import React, { useEffect, useState } from 'react';
import { Row } from '../../queryConfig/queryConfig';
import Select, { ValueType } from 'react-select';
import RhsInput from './RhsInput/RhsInput';
import { RhsType } from './QueryBuilder';

interface Props {
    lhs: string,
    operator: string,
    rhs?: string | Array<number> | Array<string>,
    index: number,
    removeRow: (index: number) => void,
    queryConfig: Row,
    lhsOptions: Array<OptionType>,
    onLhsChange: (index: number, lhs: ValueType<OptionType>) => void,
    onOperatorChange: (index: number, operator: ValueType<OptionType>) => void,
    onRhsChange: (index: number, rhs: RhsType) => void,
    onCustomSelectRhsChange: Function
}

export type OptionType = {
    value: string;
    label: string | number;
};

export type JsonType = {
    [key: string]: string | number
}

export default function QueryRow({ lhs, rhs, operator, index, queryConfig, removeRow, lhsOptions, onLhsChange, onOperatorChange, onRhsChange, onCustomSelectRhsChange }: Props) {
    const [operatorOptions, setOperatorOptions] = useState<Array<{ value: string, label: string }>>();
    const [operatorValue, setOperatorValue] = useState<OptionType>();

    useEffect(() => {
        let operatorOptions: Array<{ value: string, label: string }> = [];
        queryConfig.operators.forEach((operator, index) => {
            operatorOptions.push({ value: operator.value, label: operator.text });
        });
    
        setOperatorOptions(operatorOptions);
        setOperatorValue({
            label: operatorOptions?.find(item => item.value === operator)?.label || operator,
            value: operator
        });
    }, [operator, queryConfig]);

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

    return <div className="row" data-testid="queryRow">
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
            <RhsInput rhs={rhs} queryConfig={queryConfig} onNormalRhsChange={onNormalRhsChange} onSelectRhsChange={onSelectRhsChange} onMultiSelectNumbersRhsChange={onMultiSelectNumbersRhsChange} />
        </div>
        <div className="btn removeBtn" data-testid="removeRowBtn" onClick={onRemoveClick}>X</div>
    </div>;
}
