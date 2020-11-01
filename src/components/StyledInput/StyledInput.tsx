import React, { ChangeEvent } from 'react';
import "./StyledInput.css";

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    type: "text" | "number",
    options?:  { [key: string]: string },
    defaultValue?: string
}

export default function StyledInput({onChange, type, options, defaultValue}: Props) {
    return <input className="styled-input" type={type} onChange={onChange} {...options} value={defaultValue} />
}
