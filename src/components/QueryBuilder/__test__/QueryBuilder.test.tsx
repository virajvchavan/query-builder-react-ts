import { cleanup, render } from '@testing-library/react';
import React from "react";
import userEvent from '@testing-library/user-event'
import QueryBuilder from "../QueryBuilder";
import queryConfig from '../../../queryConfig/queryConfig';

// Mostly integration tests

afterEach(cleanup)

test("it should have mandatory elements", () => {
    const { getByText } = render(<QueryBuilder queryConfig={queryConfig} />);

    expect(getByText("+ Add")).not.toBeNull();
    expect(getByText("Apply")).not.toBeNull();
});

test("add-button click should add a new row", () => {
    const { getByText, queryAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    expect(queryAllByTestId("queryRow").length).toBe(1);
    userEvent.click(getByText("+ Add"));
    expect(queryAllByTestId("queryRow").length).toBe(2);
    userEvent.click(getByText("+ Add"));
    expect(queryAllByTestId("queryRow").length).toBe(3);
});

test("remove-row-button click should remove a row", () => {
    const { getByText, queryAllByTestId, getAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    userEvent.click(getByText("+ Add"));
    userEvent.click(getAllByTestId("removeRowBtn")[0]);
    expect(queryAllByTestId("queryRow").length).toBe(2);
});

test("it should remove all rows when Clear All button is clicked", () => {
    const { getByText, queryAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText("+ Add"));
    userEvent.click(getByText("+ Add"));
    userEvent.click(getByText("Clear"));
    expect(queryAllByTestId("queryRow").length).toBe(0);
});

test("it should show notice when no rows are added", () => {
    const { getByText, getAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getAllByTestId("removeRowBtn")[0]);
    expect(getByText("Click on `+ Add` to add a query.")).not.toBeNull();
});

test("it should render correct LHS options", () => {
    const { getByText, queryAllByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    userEvent.click(getByText(queryConfig[Object.keys(queryConfig)[0]].label)); // this opens up the dropdown

    Object.keys(queryConfig).forEach(key => {
        expect(queryAllByText(queryConfig[key].label)[0]).toBeInTheDocument();
    });
});

test("correct operator list is rendered based on LHS", () => {
    const { queryAllByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.operators[0].text)[0]); // this opens up the dropdown
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

test("correct RHS element is rendered when RHS type in the provided config is text", () => {
    const { queryAllByText, getByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Campaign")[0]);

    let rhsElement = getByTestId("rhsInput");
    expect(rhsElement.getAttribute("type")).toBe("text");
});

test("correct RHS element is rendered when RHS type in the provided config is number", () => {
    const { queryAllByText, getByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Revenue")[0]);

    let rhsElement = getByTestId("rhsInput");
    expect(rhsElement.getAttribute("type")).toBe("number");
});

test("correct RHS element is rendered when RHS type in the provided config is multi-select-numbers-in-a-range", () => {
    const { queryAllByText, getByLabelText } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Account")[0]);

    let rhsElement = getByLabelText("Enter values");
    expect(rhsElement.getAttribute("type")).toBe("number");
});

test("correct RHS element is rendered when RHS type in the provided config is multi-select-list", () => {
    const { getByText, queryAllByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Country")[0]);

    expect(getByText("Select...")).not.toBeNull();
});

test("it should save a query with a name", () => {
    window.localStorage.clear();
    const { getByTestId, queryAllByText, getByText, getByPlaceholderText } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Campaign")[0]);

    userEvent.type(getByTestId("rhsInput"), "bangalore");

    let queryNameInput = getByPlaceholderText("Name your query");
    userEvent.type(queryNameInput, "query1");
    userEvent.click(getByText("Save for later"));

    // value should clear after saving the query
    expect(queryNameInput).toHaveValue("");

    // check if the newly created query is in the savedQueries dropdown
    userEvent.click(getByText("Select to Apply"));
    expect(getByText("query1")).not.toBeNull();
    cleanup();
});

test("it should apply a saved query correctly", () => {
    window.localStorage.clear();
    const { getByTestId, queryAllByText, getByText, getByPlaceholderText, queryAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Campaign")[0]);

    userEvent.type(getByTestId("rhsInput"), "bangalore");

    let queryNameInput = getByPlaceholderText("Name your query");
    userEvent.type(queryNameInput, "query1");
    userEvent.click(getByText("Save for later"));

    // value should clear after saving the query
    expect(queryNameInput).toHaveValue("");

    // now remove all rows
    userEvent.click(getByText("Clear"));

    // select the newly created query from savedQueries dropdown
    userEvent.click(getByText("Select to Apply"));
    expect(getByText("query1")).not.toBeNull();
    userEvent.click(getByText("query1"));

    // now the rows should be added from the saved query
    expect(queryAllByTestId("queryRow").length).toBe(1);
    expect(getByTestId("rhsInput")).toHaveValue("bangalore");
});

test("it should call console.log with correct json when apply btn is clicked", () => {
    console.log = jest.fn();

    const { getByTestId, queryAllByText, getByText } = render(<QueryBuilder queryConfig={queryConfig} />);
    let rowConfig1 = queryConfig[Object.keys(queryConfig)[0]];
    userEvent.click(queryAllByText(rowConfig1.label)[0]);
    userEvent.click(queryAllByText("Campaign")[0]);

    userEvent.type(getByTestId("rhsInput"), "bangalore");

    userEvent.click(getByText("Apply"));

    let rowConfig = queryConfig["campaign"];
    expect(console.log).toHaveBeenCalledWith([{
        lhs: "campaign",
        operator: rowConfig.operators[0].value,
        rhs: "bangalore"
    }]);
});

test("it should match snapshot for the first render", () => {
    const { asFragment } = render(<QueryBuilder queryConfig={queryConfig} />)
    expect(asFragment()).toMatchSnapshot()
});

test("it should match snapshot when a new row is added", () => {
    const { asFragment, getByText, queryAllByTestId } = render(<QueryBuilder queryConfig={queryConfig} />);
    expect(queryAllByTestId("queryRow").length).toBe(1);
    userEvent.click(getByText("+ Add"));
    expect(asFragment()).toMatchSnapshot();
});
