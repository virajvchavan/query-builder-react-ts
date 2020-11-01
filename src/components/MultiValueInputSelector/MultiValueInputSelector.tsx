import React, { useEffect, useState } from 'react';
import {ReactComponent as CloseBtnSvg} from './closeBtn.svg';
import './MultiValueInputSelector.css';

interface Props {
    defaultValues?: Array<number>,
    onChange: (newRhs: Array<number>) => void
}

const MultiValueInputSelector = (props: Props) => {
    const [values, setValues] = useState<Array<number>>(props.defaultValues || []);
    const [currentValue, setCurrentValue] = useState<number>();

    useEffect(() => {
       props.onChange(values);
    }, [values]);

    const addValue = (valueToAdd: number) => {
        setValues(values => {
            return [...values, valueToAdd];
        });
    }

    const removeValue = (valueToRemove: number) => {
        setValues(values => {
            let newValues = [...values];
            return newValues.filter(value => value !== valueToRemove);
        });
    }

    const removeAllValues = () => {
        setValues([]);
    }

    const onAddBtnClick = () => {
        if (currentValue) {
            addValue(currentValue);
        }
        if (currentValue !== null) {
            setCurrentValue(undefined);
        }
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== null) {
            setCurrentValue(parseInt(event.target.value));
        }
    };

    return (
        <div className="multi-input-container">
            <div className="multi-input-control">
                <div className="multi-select-valueContainer">
                    {values.map(value => {
                        return <div className="multi-select-value">
                            <div className="multi-select-value-text">{value}</div>
                            <div className="multi-select-value-closeBtn" data-value={value} onClick={() => { removeValue(value) }}>
                                <CloseBtnSvg />
                            </div>
                        </div>
                    })}
                    <div className="multi-select-inputBox">
                        <div style={{display: "inline-block", width: "100%"}}>
                            <input onChange={onInputChange} placeholder="Enter values (1-1000)" type="number" min="0" max="1000" value={currentValue || ""} />
                        </div>
                    </div>
                </div>
                <div className="multi-select-BtnContainer">
                    {values.length > 0 && (
                        <div className="multi-select-btn">
                            <CloseBtnSvg onClick={removeAllValues} />
                        </div>
                    )}
                    <div className="multi-select-btnSeparator"></div>
                    <div className="multi-select-btn" onClick={onAddBtnClick}>
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiValueInputSelector;
