import React, { ChangeEvent } from 'react';
import "./StyledInput.css";

interface Props {
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    type: "text" | "number"
}

export default function StyledInput({onChange, type}: Props) {
    return <input className="styled-input" type={type} onChange={onChange} />
}
