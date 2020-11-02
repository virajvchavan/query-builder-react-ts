import React, { useEffect, useState } from 'react';
import './MultiValueInputSelector.css';
import { CloseIcon } from '../shared/icons';
import { rulesType } from '../QueryBuilder/RhsInput/RhsInput';

interface Props {
    values?: Array<number>,
    onChange?: (newRhs: Array<number>) => void,
    type: "number", // can add support for other types later
    rules?: rulesType
}

const MultiValueInputSelector = (props: Props) => {
    const [values, setValues] = useState<Array<number>>(props.values || []);
    const [currentValue, setCurrentValue] = useState<number>();

    useEffect(() => {
        if (props.values) {
            setValues(props.values);
        }
    }, [props.values]);

    useEffect(() => {
        if (props.onChange) {
            props.onChange(values);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

    const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onAddBtnClick();
        }
    }

    let min = 0, max = 1000;
    props.rules?.forEach(rule => {
        let [ruleName, ruleValue] = rule.split(":");
        if (ruleName === "range") {
            [min, max] = ruleValue.split("-").map(item => parseInt(item));
        }
    });

    return (
        <div className="multi-input-container">
            <div className="multi-input-control">
                <div className="multi-select-valueContainer">
                    {values.map((value, index) => {
                        return <div key={index} className="multi-select-value">
                            <div className="multi-select-value-text">{value}</div>
                            <div className="multi-select-value-closeBtn" data-testid="removeBtn" data-value={value} onClick={() => { removeValue(value) }}>
                                <CloseIcon size="14" />
                            </div>
                        </div>
                    })}
                    <div className="multi-select-inputBox">
                        <div style={{display: "inline-block", width: "100%"}}>
                            <label htmlFor="multi-value-input" style={{display: "none"}}>Enter values</label>
                            <input id="multi-value-input" onChange={onInputChange} onKeyPress={onInputKeyPress} placeholder={`Enter values (${min}-${max})`} type={props.type} min={min} max={max} value={currentValue || ""} />
                        </div>
                    </div>
                </div>
                <div className="multi-select-BtnContainer">
                    {values.length > 0 && (
                        <div className="multi-select-btn" data-testid="removeAllBtn" onClick={removeAllValues}>
                            <CloseIcon size="20" />
                        </div>
                    )}
                    <div className="multi-select-btnSeparator"></div>
                    <div className="multi-select-btn add-all-btn" onClick={onAddBtnClick}>
                        +
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiValueInputSelector;
