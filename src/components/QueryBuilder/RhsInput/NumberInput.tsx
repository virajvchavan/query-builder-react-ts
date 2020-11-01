import React from 'react';
import StyledInput from '../../StyledInput/StyledInput';
import { JsonType } from '../QueryRow';
import { rulesType } from './RhsInput';

interface NumberInputProps {
    rules: rulesType;
    onNormalRhsChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    rhs: string;
}
export function NumberInput({ rules, rhs, onNormalRhsChange }: NumberInputProps) {
    let options: JsonType = {};
    rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "precision") {
            options.step = ruleValue;
        }
    });
    return <StyledInput type="number" onChange={onNormalRhsChange} options={options} defaultValue={rhs} />;
}
