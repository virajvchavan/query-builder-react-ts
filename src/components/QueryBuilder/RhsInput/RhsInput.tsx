import React from 'react';
import { Row } from '../../../queryConfig/queryConfig';
import { ValueType } from 'react-select';
import StyledInput from '../../StyledInput/StyledInput';
import MultiValueInputSelector from '../../MultiValueInputSelector/MultiValueInputSelector';
import { OptionType } from '../QueryRow';
import { MultiSelectList } from './MultiSelectList';
import { NumberInput } from './NumberInput';

export type rulesType = string[] | undefined;
type rhsType = string | number[] | string[] | undefined;

interface Props {
    rhs: rhsType,
    queryConfig: Row,
    onNormalRhsChange: (evt: React.ChangeEvent<HTMLInputElement>) => void,
    onSelectRhsChange: (newElement: ValueType<OptionType>) => void,
    onMultiSelectNumbersRhsChange: (newRhs: Array<number>) => void
}

function RhsInput({rhs, queryConfig, onMultiSelectNumbersRhsChange, onNormalRhsChange, onSelectRhsChange}: Props) {
    let rules = queryConfig.rhs.config?.split(";");
    switch (queryConfig.rhs.type) {
        case "text":
            let stringValue = rhs as string;
            return <StyledInput type="text" onChange={onNormalRhsChange} defaultValue={stringValue} />;
        case "number":
            let value = rhs as string;
            return <NumberInput rules={rules} rhs={value} onNormalRhsChange={onNormalRhsChange} />
        case "multi-select-list":
            let stringArrValue = rhs as Array<string>;
            return <MultiSelectList rhs={stringArrValue} rules={rules} onSelectRhsChange={onSelectRhsChange} />
        case "multi-select-numbers-in-a-range":
            let numbersArrayValue = rhs as Array<number>;
            return <MultiValueInputSelector type="number" onChange={onMultiSelectNumbersRhsChange} defaultValues={numbersArrayValue} />;
        default:
            return null;
    }
}

export default RhsInput;
