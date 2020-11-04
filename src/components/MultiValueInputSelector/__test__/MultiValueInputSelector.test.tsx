import { cleanup, render } from "@testing-library/react";
import React from "react";
import userEvent from '@testing-library/user-event'
import MultiValueInputSelector from "../MultiValueInputSelector";

afterEach(cleanup);

test("it should have mandatory elements", () => {
    const { getByLabelText, getByText } = render(<MultiValueInputSelector type="number" />);

    expect(getByLabelText("Enter values")).not.toBeNull();
    expect(getByText("+")).not.toBeNull();
});

test("add button click should add an item", () => {
    const { container, getByLabelText, getByText } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");
    userEvent.type(input, "102");
    userEvent.click(addBtn);
    expect(getByText("102")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);

    userEvent.type(input, "67");
    userEvent.click(addBtn);
    expect(getByText("67")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(2);
});

test("keypress Enter on input should add an item", () => {
    const { container, getByLabelText, getByText } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    userEvent.type(input, "102");
    userEvent.type(input, '{enter}');
    expect(getByText("102")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);

    userEvent.type(input, "67");
    userEvent.type(input, '{enter}');
    expect(getByText("67")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(2);
});

test("input should be empty right after adding an element", () => {
    const { getByLabelText } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    userEvent.type(input, "102");
    userEvent.type(input, '{enter}');
    expect(input).toHaveValue(null);
});

test("remove btn click should remove an item", () => {
    const { getByLabelText, getByText, getAllByTestId, queryByText } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    userEvent.type(input, "102");
    userEvent.type(input, '{enter}');
    expect(getByText("102")).not.toBeNull();
    userEvent.click(getAllByTestId("removeBtn")[0]);
    expect(queryByText("102")).toBeNull();
});

test("remove-all button is shown only if there is at least one element added", () => {
    const { getByLabelText, getByText, queryByTestId, getAllByTestId } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");

    expect(queryByTestId("removeAllBtn")).not.toBeInTheDocument();

    userEvent.type(input, "102");
    userEvent.click(addBtn);

    expect(queryByTestId("removeAllBtn")).toBeInTheDocument();

    userEvent.click(getAllByTestId("removeBtn")[0]);

    expect(queryByTestId("removeAllBtn")).not.toBeInTheDocument();
});

test("remove-all btn should remove all items", () => {
    const { container, getByLabelText, getByText, getByTestId } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");

    userEvent.type(input, "102");
    userEvent.click(addBtn);
    userEvent.type(input, "67");
    userEvent.click(addBtn);

    userEvent.click(getByTestId("removeAllBtn"));
    expect(container.querySelectorAll(".multi-select-value").length).toBe(0);
});


test("it should call onChange method with correct params", () => {
    const onChange = jest.fn();
    const { getByLabelText, getByText } = render(<MultiValueInputSelector type="number" onChange={onChange} />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");

    userEvent.type(input, "102");
    userEvent.click(addBtn);
    expect(onChange).toHaveBeenLastCalledWith([102]);

    userEvent.type(input, "67");
    userEvent.click(addBtn);
    expect(onChange).toHaveBeenLastCalledWith([102, 67]);
});

test("it should follow min max validations if provided through rules prop", () => {
    const { getByLabelText, getByText, container, queryByText } = render(<MultiValueInputSelector type="number" rules={["range:1-1000"]} />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");
    userEvent.type(input, "102");
    userEvent.click(addBtn);
    expect(getByText("102")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);

    // add a number greater than max
    userEvent.type(input, "1200");
    userEvent.click(addBtn);
    expect(queryByText("1200")).toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);

    // value should not be cleared
    expect(input).toHaveValue(1200);

    // clear the input
    userEvent.clear(input);

    userEvent.type(input, "-24");
    userEvent.click(addBtn);
    expect(queryByText("-24")).toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);
});

test("it should match snapshot when type is number; for first render", () => {
    const { asFragment } = render(<MultiValueInputSelector type="number"  />)
    expect(asFragment()).toMatchSnapshot();
});

test("it should match snapshot when type is number & range is specified; for first render", () => {
    const { asFragment } = render(<MultiValueInputSelector type="number" rules={["range:1-1000"]} />)
    expect(asFragment()).toMatchSnapshot();
});

test("it should match snapshot when an element is added", () => {
    const { asFragment, container, getByLabelText, getByText } = render(<MultiValueInputSelector type="number" />);
    let input = getByLabelText("Enter values");
    let addBtn = getByText("+");
    userEvent.type(input, "102");
    userEvent.click(addBtn);
    expect(getByText("102")).not.toBeNull();
    expect(container.querySelectorAll(".multi-select-value").length).toBe(1);
    expect(asFragment()).toMatchSnapshot();
});
