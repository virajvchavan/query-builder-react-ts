import React, { ChangeEvent } from 'react';
import "./StyledInput.css";

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    type: "text" | "number",
    options?:  { [key: string]: string },
    defaultValue?: string,
    testId?: string
}

export default function StyledInput({onChange, type, options, defaultValue, testId}: Props) {
    return <input data-testid={testId} className="styled-input" type={type} onChange={onChange} {...options} value={defaultValue} />
}
