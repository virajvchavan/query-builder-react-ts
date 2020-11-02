import React from 'react';
import StyledInput from '../../StyledInput/StyledInput';
import { JsonType } from '../QueryRow';
import { rulesType } from './RhsInput';

interface NumberInputProps {
    rules: rulesType;
    onNormalRhsChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    options?: JsonType
}
export function NumberInput({ rules, value, onNormalRhsChange, options }: NumberInputProps) {
    let optionProps: JsonType = options || {};
    rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "precision") {
            optionProps.step = ruleValue;
        }
    });
    return <StyledInput testId="rhsInput" type="number" onChange={onNormalRhsChange} options={optionProps} value={value} />;
}
