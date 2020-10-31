import React, { useState } from 'react';
import { ConfigType } from '../../queryConfig';
import './QueryBuilder.css';
import QueryRow from './QueryRow';

type RhsType =  string | Array<number> | Array<string>;

interface QueryRowType {
    lhs: string,
    operator: string,
    rhs?: RhsType
}

interface Props {
    queryConfig: ConfigType
}

type OptionType = {
    value: string;
    label: string;
};

export default function QueryBuilder({queryConfig}: Props) {
    const [queryRows, setQueryRows] = useState<Array<QueryRowType>>([]);

    let lhsOptions: Array<OptionType> = Object.keys(queryConfig).map(lhs => {
        return { value: lhs, label: queryConfig[lhs].label }
    })

    const addQueryRow = () => {
        let operator = queryConfig[lhsOptions[0].value].operators[0];
        setQueryRows(queryRows.concat([{
            lhs: lhsOptions[0].value,
            operator: operator.value
        }]));
    }

    const removeRow = (index: number) => {
        setQueryRows(queryRows => {
            let rows = [...queryRows];
            rows.splice(index, 1);
            return rows;
        });
    }

    const onApply = () => {
        console.log(queryRows);
    }

    return <div className="querySelector">
        <div className="allQueries">
            <div className="where">where</div>
            <div className="queryRows">
            {queryRows.map((row, index) => {
                return <QueryRow
                    queryConfig={queryConfig[row.lhs]}
                    removeRow={removeRow}
                    key={index} index={index}
                    lhs={row.lhs} rhs={row.rhs} operator={row.operator}
                    lhsOptions={lhsOptions}
                />
            })}
            </div>
        </div>
        <div className="btn addBtn" onClick={addQueryRow}>+ Add</div>
        <div className="btn applyBtn" onClick={onApply}>Apply</div>
    </div>
}
