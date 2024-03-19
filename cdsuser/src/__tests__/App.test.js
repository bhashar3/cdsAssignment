import React from "react";
import App from "../App";
import { render } from "@testing-library/react";

describe("App component", () => {
  it("App Component unit test case 1", () => {
    const { getByTestId } = render(<App />);
    const card = getByTestId("description-card");
    expect(card).toBeInTheDocument();
  });
  it("App Component unit test case 2", () => {
    const { getByText } = render(<App />);
    const Heading = getByText("CODE-IT");
    expect(Heading).toBeInTheDocument();
  });
});
