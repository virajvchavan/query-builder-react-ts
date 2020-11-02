import { render } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import { NumberInput } from "../NumberInput";
import { rulesType } from '../RhsInput';

test("it should render an input with type=number", () => {
    const { getByTestId } = render(<NumberInput rules={[]} value="" options={{placeholder: "Type a number"}} onNormalRhsChange={jest.fn()} />);
    expect(getByTestId("rhsInput")).toHaveAttribute("type", "number");
});

test("it should apply options specified as attributed", () => {
    const { getByTestId } = render(<NumberInput rules={[]} value="" options={{placeholder: "Type a number"}} onNormalRhsChange={jest.fn()} />);
    expect(getByTestId("rhsInput")).toHaveAttribute("placeholder", "Type a number");
});

test("it should apply correct precision values for number input", () => {
    let rules: rulesType = ["precision:0.01"];
    const { getByPlaceholderText } = render(<NumberInput rules={rules} value="" options={{placeholder: "Type a number"}} onNormalRhsChange={jest.fn()} />);
    let inputElement = getByPlaceholderText("Type a number");
    expect(inputElement).toHaveAttribute("step", "0.01");
});

test("it should call onChange function when user types", () => {
    let onChange = jest.fn();
    const { getByTestId } = render(<NumberInput rules={[]} value="" options={{placeholder: "Type a number"}} onNormalRhsChange={onChange} />);
    let inputElement = getByTestId("rhsInput");
    userEvent.type(inputElement, "5");
    expect(onChange).toHaveBeenCalledTimes(1);
});
