import { render } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import MultiSelectList from "../MultiSelectList";
import { rulesType } from '../RhsInput';

test("it should render correct list specified in a json file", () => {
    let rules: rulesType = ["file:countries.json"];
    let onChange = jest.fn();
    const { getByText } = render(<MultiSelectList rhs={["val1", "val2"]} rules={rules} onSelectRhsChange={onChange} />);
    userEvent.click(getByText("Select..."));
});
