import React from "react";
import { act, render, fireEvent, waitFor } from "@testing-library/react";
import Appmain from "../Appmain";
import "@testing-library/jest-dom";

describe("App main component unit test cases", () => {
  it("save button is clicked", async () => {
    const { getByTestId } = render(<Appmain />);
    expect(getByTestId("container-main")).toBeInTheDocument();
  });
});
