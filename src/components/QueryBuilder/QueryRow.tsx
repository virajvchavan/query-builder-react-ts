import React, { ReactNode } from 'react';
import { Row } from '../../queryConfig';

interface Props {
    lhs: string,
    operator: string,
    rhs?: string | Array<number> | Array<string>,
    index: number,
    removeRow: Function,
    queryConfig: Row
}

export default function QueryRow({lhs, rhs, operator, index, queryConfig, removeRow}: Props) {
    const onRemoveClick = () => removeRow(index);

    return <div className="row">
        <div className="lhs">
            <div>LHS</div>
        </div>
        <div className="operator">
            <div>Operator</div>
        </div>
        <div className="rhs">
            <div>RHS</div>
        </div>
        <div className="btn removeBtn" onClick={onRemoveClick}>X</div>
    </div>;
}
