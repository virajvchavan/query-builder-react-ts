import React, { ReactNode } from 'react';
import { Row } from '../../queryConfig';
import Select from 'react-select';

interface Props {
    lhs: string,
    operator: string,
    rhs?: string | Array<number> | Array<string>,
    index: number,
    removeRow: Function,
    queryConfig: Row,
    lhsOptions: Array<OptionType>
}

type OptionType = {
    value: string;
    label: string;
};

export default function QueryRow({lhs, rhs, operator, index, queryConfig, removeRow, lhsOptions}: Props) {
    const onRemoveClick = () => removeRow(index);

    let lhsValue: OptionType = {
        label: lhsOptions.find(item => item.value === lhs)?.label || lhs,
        value: lhs
    };

    let operatorOptions: Array<{value: string, label: string}> = [];
    queryConfig.operators.forEach((operator, index) => {
        operatorOptions.push({value: operator.value, label: operator.text});
    });

    let operatorValue: OptionType = {
        label: operatorOptions.find(item => item.value === operator)?.label || operator,
        value: operator
    }

    return <div className="row">
        <div className="lhs">
            <Select options={lhsOptions} defaultValue={lhsOptions[0]} value={lhsValue} />
        </div>
        <div className="operator">
            <Select options={operatorOptions} value={operatorValue} />
        </div>
        <div className="rhs">
            <div>RHS</div>
        </div>
        <div className="btn removeBtn" onClick={onRemoveClick}>X</div>
    </div>;
}
