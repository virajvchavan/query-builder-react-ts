import React, { useState } from 'react';
import { ConfigType } from '../../queryConfig/queryConfig';
import './QueryBuilder.css';
import QueryRow from './QueryRow';

type RhsType = string | Array<number> | Array<string>;

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

export default function QueryBuilder({ queryConfig }: Props) {
    const [queryRows, setQueryRows] = useState<Array<QueryRowType>>([]);

    let lhsOptions: Array<OptionType> = Object.keys(queryConfig).map(lhs => {
        return { value: lhs, label: queryConfig[lhs].label }
    });

    const onLhsChange = (index: number, lhs: OptionType) => {
        let newRows = [...queryRows];
        let operator = queryConfig[lhs.value].operators[0];
        newRows[index] = {
            lhs: lhs.value,
            operator: operator.value,
            rhs: ""
        }
        setQueryRows(newRows);
    }

    const onRhsChange = (index: number, rhs: RhsType) => {
        let newRows = [...queryRows];
        newRows[index].rhs = rhs;
        setQueryRows(newRows);
    }

    const onCustomSelectRhsChange = (index: number, rhs: Array<OptionType>) => {
        let newRows = [...queryRows];
        newRows[index].rhs = rhs?.map(item => item.value) || [];
        setQueryRows(newRows);
    }

    const onOperatorChange = (index: number, operator: OptionType) => {
        let newRows = [...queryRows];
        newRows[index].operator = operator.value;
        setQueryRows(newRows);
    }

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
                        onLhsChange={onLhsChange}
                        onOperatorChange={onOperatorChange}
                        onRhsChange={onRhsChange}
                        onCustomSelectRhsChange={onCustomSelectRhsChange}
                    />
                })}
            </div>
        </div>
        <button className="btn addBtn" onClick={addQueryRow}>+ Add</button>
        <button className="btn applyBtn" onClick={onApply}>Apply</button>
    </div>
}
