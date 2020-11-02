import React, { ChangeEvent } from 'react';
import "./StyledInput.css";

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    type: "text" | "number",
    options?:  { [key: string]: string },
    value?: string,
    testId?: string,
    onKeyPress?: (Event: React.KeyboardEvent<HTMLInputElement>) => void
}

export default function StyledInput({onChange, type, options, value, testId, onKeyPress}: Props) {
    return <input data-testid={testId} className="styled-input" type={type} onChange={onChange} onKeyPress={onKeyPress} {...options} value={value} />
}
