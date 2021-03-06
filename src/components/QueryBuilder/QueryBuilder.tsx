import React, { useEffect, useState } from 'react';
import { ValueType } from 'react-select';
import { ConfigType } from '../../queryConfig/queryConfig';
import StyledInput from '../StyledInput/StyledInput';
import './QueryBuilder.css';
import QueryRow from './QueryRow';
import SavedQueries from './SavedQueries/SavedQueries';
import { OptionType } from './QueryRow';

export type RhsType = string | Array<number> | Array<string>;

export interface QueryRowType {
    lhs: string,
    operator: string,
    rhs?: RhsType
}

interface Props {
    queryConfig: ConfigType
}

export type SavedQueryRow = {
    name: string;
    rows: Array<QueryRowType>
}

export default function QueryBuilder({ queryConfig }: Props) {
    let lhsOptions: Array<OptionType> = Object.keys(queryConfig).map(lhs => {
        return { value: lhs, label: queryConfig[lhs].label }
    });

    const createNewQueryRow: () => QueryRowType = () => {
        let operator = queryConfig[lhsOptions[0].value].operators[0];
        return {
            lhs: lhsOptions[0].value,
            operator: operator.value
        }
    }

    const [queryRows, setQueryRows] = useState<Array<QueryRowType>>([createNewQueryRow()]);
    const [savedQueries, setSavedQueries] = useState<string | null>(null);
    const [queryName, setQueryName] = useState<string>("");

    useEffect(() => {
        setSavedQueries(localStorage.getItem("savedQueries"));
    }, []);

    useEffect(() => {
        if (savedQueries) {
            localStorage.setItem("savedQueries", savedQueries);
        }
    }, [savedQueries]);

    function getSavedQueriesList() {
        let savedQueriesList: Array<SavedQueryRow> = [];
        if (savedQueries) {
            savedQueriesList = JSON.parse(savedQueries);
        }
        return savedQueriesList;
    }

    const addSavedQuery = () => {
        if (queryName && queryRows.length > 0) {
            setSavedQueries(JSON.stringify(
                getSavedQueriesList().concat([{
                    name: queryName,
                    rows: [...queryRows]
                }])
            ));
            setQueryName("");
        }
    }

    const onSavedQueryInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addSavedQuery();
        }
    }

    const removeSavedQuery = (index: number) => {
        let savedQueriesList = getSavedQueriesList();
        savedQueriesList.splice(index, 1);
        setSavedQueries(JSON.stringify(savedQueriesList));
    }

    const applySavedQuery = (index: number) => {
        let newRows = getSavedQueriesList()[index].rows;
        if (newRows) {
            setQueryRows(newRows);
        }
    }

    const onLhsChange = (index: number, lhs: ValueType<OptionType>) => {
        let newValue = lhs as OptionType;
        let newRows = [...queryRows];
        let operator = queryConfig[newValue.value].operators[0];
        newRows[index] = {
            lhs: newValue.value,
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

    const onOperatorChange = (index: number, operator: ValueType<OptionType>) => {
        let newValue = operator as OptionType;
        let newRows = [...queryRows];
        newRows[index].operator = newValue.value;
        setQueryRows(newRows);
    }

    const addQueryRow = () => {
        setQueryRows(queryRows.concat([createNewQueryRow()]));
    }

    const removeRow = (index: number) => {
        setQueryRows(queryRows => {
            let rows = [...queryRows];
            rows.splice(index, 1);
            return rows;
        });
    }

    const clearAllRows = () => {
        setQueryRows([]);
    }

    const onApply = () => {
        console.log(queryRows);
    }

    const onQueryNameChange = ((event: React.ChangeEvent<HTMLInputElement>) => {
        setQueryName(event.target.value);
    });

    let NoQueriesYetElement = queryRows.length === 0 ? <div className="noQueriesNotice">Click on `+ Add` to add a query.</div> : null;
    return <div className="querySelector">
        <SavedQueries savedQueries={savedQueries} removeSavedQuery={removeSavedQuery} applySavedQuery={applySavedQuery} />
        <div className="allQueries">
            <div className="where">where</div>
            <div className="queryRows">
                {NoQueriesYetElement}
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
        <button className="btn clearAll" onClick={clearAllRows}>Clear</button>
        <button className="btn applyBtn" onClick={onApply}>Apply</button>
        <button className={"btn saveBtn" + (queryName ? "" : " disabled")} onClick={addSavedQuery}>Save for later</button>
        <div className="queryNameInputContainer">
            <StyledInput onKeyPress={onSavedQueryInputKeyPress} type="text" options={{placeholder: "Name your query"}} onChange={onQueryNameChange} value={queryName} />
        </div>
    </div>
}
