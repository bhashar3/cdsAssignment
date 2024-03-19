import React from "react";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import Signin from "../Signin";
import "@testing-library/jest-dom";

describe("Signin component unit test cases", () => {
  it("signin page is rendered", async () => {
    const { getByTestId } = render(<Signin />);
    expect(getByTestId("signin-container")).toBeInTheDocument();
  });
});