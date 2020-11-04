import { cleanup, render } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import MultiSelectList from "../MultiSelectList";
import { rulesType } from '../RhsInput';
import { JsonType } from '../../QueryRow';

afterEach(cleanup);

test("it should render correct list specified in a json file", () => {
    let rules: rulesType = ["file:countries.test.json"];
    let onChange = jest.fn();
    const { getByText } = render(<MultiSelectList rhs={[]} rules={rules} onSelectRhsChange={onChange} />);
    userEvent.click(getByText("Select...")); // opens the dropdown

    // when dropdown is open, all the provided values should be rendered
    let optionsJson: JsonType = require("../../../../queryConfig/" + rules[0].split(":")[1]);
    Object.values(optionsJson).forEach(value => {
        expect(getByText(`${value}`)).not.toBeNull();
    });
});

test("it should display correct defaultValues when provided", () => {
    let rules: rulesType = ["file:countries.test.json"];
    let onChange = jest.fn();
    let optionsJson: JsonType = require("../../../../queryConfig/" + rules[0].split(":")[1]);
    let defaultValues = Object.keys(optionsJson).slice(0, 2);

    const { getByText } = render(<MultiSelectList rhs={defaultValues} rules={rules} onSelectRhsChange={onChange} />);

    // when dropdown is not open, the default values should already be displayed
    defaultValues.forEach(key => {
        expect(getByText(`${optionsJson[key]}`)).not.toBeNull();
    });
});

test("it should match snapshot for the first render", () => {
    let rules: rulesType = ["file:countries.test.json"];
    let onChange = jest.fn();
    const { asFragment } = render(<MultiSelectList rhs={[]} rules={rules} onSelectRhsChange={onChange} />);
    expect(asFragment()).toMatchSnapshot()
});
