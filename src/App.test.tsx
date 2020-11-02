import { render } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders without errors", () => {
  const { getByText } = render(<App />);
  expect(getByText("where")).not.toBeNull();
});
