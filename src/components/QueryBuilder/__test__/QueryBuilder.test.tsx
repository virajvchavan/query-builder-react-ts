import { render, getByTestId, queryByText } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import QueryBuilder from "../QueryBuilder";
import queryConfig from '../../../queryConfig/queryConfig';

// - "correct operator list is renderd"
// - "operator should changed based on lhs"
// - "rhs should change based on lhs"

test("it should have mandatory elements", () => {
    const { getByText } = render(<QueryBuilder queryConfig={queryConfig} />);

    expect(getByText("+ Add")).not.toBeNull();
    expect(getByText("Apply")).not.toBeNull();
});

test("add-button click should add a new row", () => {
    const { getByText, queryAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    expect(queryAllByTestId("queryRow").length).toBe(0);
    userEvent.click(getByText("+ Add"));
    expect(queryAllByTestId("queryRow").length).toBe(1);
    userEvent.click(getByText("+ Add"));
    expect(queryAllByTestId("queryRow").length).toBe(2);
});

test("remove-row-button click should remove a row", () => {
    const { getByText, queryAllByTestId, getAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    userEvent.click(getByText("+ Add"));
    userEvent.click(getAllByTestId("removeRowBtn")[0]);
    expect(queryAllByTestId("queryRow").length).toBe(1);
});

test("it should render correct LHS options", () => {
    const { getByText, queryByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    expect(queryByText(queryConfig[Object.keys(queryConfig)[0]].label)).toBeInTheDocument();
});
