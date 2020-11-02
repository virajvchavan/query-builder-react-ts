import { render } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import QueryBuilder from "../QueryBuilder";
import queryConfig from '../../../queryConfig/queryConfig';

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
    const { getByText, queryAllByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    userEvent.click(getByText(queryConfig[Object.keys(queryConfig)[0]].label));

    Object.keys(queryConfig).forEach(key => {
        expect(queryAllByText(queryConfig[key].label)[0]).toBeInTheDocument();
    });
});

test("correct operator list is rendered based on LHS", () => {
    const { getByText, queryAllByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.operators[0].text)[0]);
    rowConfig1.operators.forEach(operator => {
        expect(queryAllByText(operator.text)[0]).toBeInTheDocument();
    });

    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    let rowConfig2 = queryConfig[Object.keys(queryConfig)[1]];
    userEvent.click(queryAllByText(rowConfig2.label)[0]);

    userEvent.click(queryAllByText(rowConfig2.operators[0].text)[0]);
    rowConfig2.operators.forEach(operator => {
        expect(queryAllByText(operator.text)[0]).toBeInTheDocument();
    });
});
