import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

test("it works", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);
});
