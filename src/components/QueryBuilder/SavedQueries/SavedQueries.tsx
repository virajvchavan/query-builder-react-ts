import React from 'react';
import Select, { ValueType } from 'react-select';
import { SavedQueryRow } from '../QueryBuilder';
import { OptionType } from '../QueryRow';
import './SavedQueries.css';

interface Props {
    savedQueries: string | null,
    removeSavedQuery: (index: number) => void,
    applySavedQuery: (index: number) => void
}

export default function SavedQueries({savedQueries, applySavedQuery}: Props) {

    let savedQueriesList: Array<SavedQueryRow> = [];
    if (savedQueries) {
        savedQueriesList = JSON.parse(savedQueries);
    }
    let options: Array<OptionType> = savedQueriesList.map((query, index) => {
        return { label: query.name, value: `${index}` }
    });

    const onChange = ((value: ValueType<OptionType>) => {
        let newValue = value as OptionType;
        applySavedQuery(parseInt(newValue.value));
    });

    // always send `null` value to Select so that when a new value is selected, it applies, and then the Select is reset immediately
    return <div className="savedQueries">
        <label htmlFor="savedQueries-input" className="savedQueries-title">Saved filters: </label>
        <div className="savedQueries-inputContainer">
            <Select id="savedQueries-input" options={options} placeholder="Select to Apply" onChange={onChange} value={null} />
        </div>
    </div>;
}
